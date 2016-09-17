
import _ from 'lodash';
import uuid from 'uuid';
import amqplib from 'amqplib';
import moment from 'moment-timezone';

moment.tz.setDefault(process.env.TIMEZONE || 'Asia/Jakarta');

/**
 * Class representing amqp client
 */
export default class Client {

  /**
   * Constructor
   * @param {string} url - AMQP url (e.g amqp://url)
   */
  constructor(url = process.env.AMQP_URL) {
    const amqpUrl = url || 'amqp://localhost';
    this.connection = amqplib.connect(amqpUrl);
  }

  /**
   * Payload wrapper
   * @param {string} options.qId - Auto generated queue id (using uuid version 4).
   * @param {string} options.queue - Queue name.
   * @param {string} options.payload - Message payload.
   * @return {object} - Wrapped payload with qId and timestamp.
   */
  wrapper({ qId, queue, payload }) {
    return {
      qId,
      queue,
      data: payload,
      sentAt: moment.now(),
      timezone: moment.defaultZone,
    };
  }

  /**
   * Produce direct exchange.
   * @param {string} options.qId - Auto generated queue id (using uuid version 4).
   * @param {queue} options.queue - Queue name.
   * @param {payload} options.payload - Message payload.
   * @return {boolean} Acknowledgement status.
   */
  async produceDirectExchange({ qId, queue, payload }) {
    try {
      const client = await this.connection;
      const channel = await client.createChannel();
      const queueName = queue + _.isEmpty(qId) ? '' : `.${qId}`;

      await channel.assertQueue(queueName);

      const wrapped = JSON.stringify(this.wrapper({ qId, queue, payload }));
      const buffer = new Buffer(wrapped);
      const ack = await channel.sendToQueue(queueName, buffer);

      return ack;
    } catch (err) {
      return err;
    }
  }

  /**
   * Consumer direct exchange
   * @param {string} options.qId - Auto generated queue id (using uuid version 4).
   * @param {queue} options.queue - Queue name.
   * @return {object} Message payload with parsed content.
   */
  async consumeDirectExchange({ qId, queue }) {
    try {
      const client = await this.connection;
      const channel = await client.createChannel();
      const queueName = queue + (_.isEmpty(qId) ? '' : `.${qId}`);

      await channel.assertQueue(queueName);

      const message = await channel.consume(queueName);
      // NOTICEME: Should we do this?
      message.content = JSON.parse(message.content.toString());

      return message;
    } catch (err) {
      return err;
    }
  }

  // FIXME: should have better semantic
  /**
   * Dynamic producer binding. Produce message and wait for the response binding.
   * @param {queue} options.queue - Queue name.
   * @param {payload} options.payload - Message payload.
   * @return {object} Message payload with parsed content.
   */
  async dynamicProducerBinding({ queue, payload }) {
    try {
      const qId = uuid.v4();
      // FIXME: should we wait or dispatch immediately without acknowledgement?
      this.produceDirectExchange({ qId, queue, payload });
      const message = await this.consumeDirectExchange({ qId, queue });

      return message;
    } catch (err) {
      return err;
    }
  }

  // FIXME: should have better semantic
  /**
   * Dynamic consumer binding. It is like tradionation http route binding.
   * @param {queue} options.queue - Queue name.
   * @param {payload} options.payload - Message payload.
   * @param {function} options.fn - Payload producer function. Must return promise.
   * @return {boolean} Acknowledgement status
   */
  async dynamicConsumerBinding({ queue, payload, fn }) {
    try {
      const message = await this.consumeDirectExchange({ queue });

      let data = payload;
      if (_.isFunction(fn)) {
        data = await fn(message);
      }

      const ack = await this.produceDirectExchange({
        queue,
        payload: data,
        qId: message.content.qId,
      });

      return ack;
    } catch (err) {
      return err;
    }
  }
}
