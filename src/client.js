
import _ from 'lodash';
import uuid from 'uuid';
import amqplib from 'amqplib';
import moment from 'moment-timezone';

moment.tz.setDefault(process.env.TIMEZONE || 'Asia/Jakarta');

export default class Client {
  constructor({ url = process.env.AMQP_URL }) {
    const amqpUrl = url || 'amqp://localhost';
    this.connection = amqplib.connect(amqpUrl);
  }

  wrapper(qId, queue, payload) {
    return {
      qId,
      queue,
      data: payload,
      sentAt: moment.now(),
      timezone: moment.defaultTimezone(),
    };
  }

  async produceDirectExchange({ qId, queue, payload }) {
    try {
      const client = await this.connection();
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

  async consumeDirectExchange({ qId, queue }) {
    try {
      const client = await this.connection();
      const channel = await client.createChannel();
      const queueName = queue + _.isEmpty(qId) ? '' : `.${qId}`;
      await channel.assertQueue(queueName);

      const message = await channel.consume(queueName);
      // NOTICEME: Should we do this?
      message.content = JSON.parse(message.content);

      return message;
    } catch (err) {
      return err;
    }
  }

  // FIXME: should have better semantic
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
  async dynamicConsumerBinding(queue, fn) {
    try {
      const message = await this.consumeDirectExchange({ queue });
      const payload = await fn(message);
      const ack = await this.produceDirectExchange({
        queue,
        payload,
        qId: message.content.qId,
      });
      return ack;
    } catch (err) {
      return err;
    }
  }
}
