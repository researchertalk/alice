
import amqplib from 'amqplib';

let connection = null;

export default class Client {
  static async connect(url = process.env.AMQP_URL) {
    try {
      const amqpurl = url || 'amqp://localhost';
      connection = await amqplib.connect(amqpurl);

      return connection;
    } catch (err) {
      throw err;
    }
  }

  static connection() {
    return connection;
  }

  static async disconnect() {
    try {
      await connection.close();

      connection = null;

      return connection;
    } catch (err) {
      throw err;
    }
  }

  static async consume({ exchange, type, queue, routingKey }, handler, options) {
    try {
      const channel = await connection.createChannel();

      await channel.assertExchange(exchange, type);
      await channel.assertQueue(queue);
      await channel.bindQueue(queue, exchange, routingKey);

      const message = await channel.consume(queue, options);

      const context = {};
      context.body = JSON.parse(message.content.toString());
      context.fields = message.fields;
      context.properties = message.properties;

      Object.assign(context, this);

      return await handler(context);
    } catch (err) {
      throw err;
    }
  }

  static async consumeDirect({ exchange, queue, routingKey }, handler, options) {
    return await this.consume({ exchange, queue, routingKey, type: 'direct' }, handler, options);
  }

  static async consumeFanout({ exchange, queue }, handler, options) {
    return await this.consume({ exchange, queue, type: 'fanout' }, handler, options);
  }

  static async consumeTopic({ exchange, queue, routingKey }, handler, options) {
    return await this.consume({ exchange, queue, routingKey, type: 'topic' }, handler, options);
  }

  // missing exchange durable options
  static async publish({ exchange, type, routingKey, content }, options) {
    try {
      const channel = await connection.createChannel();

      await channel.assertExchange(exchange, type);

      const contentBuffer = new Buffer(JSON.stringify(content));
      channel.publish(exchange, routingKey, contentBuffer, options);

      return channel.close();
    } catch (err) {
      throw err;
    }
  }

  static async publishDirect({ exchange, routingKey, content }, options) {
    return await this.publish({ exchange, routingKey, content, type: 'direct' }, options);
  }

  static async publishFanout({ exchange, content }, options) {
    return await this.publish({ exchange, content, type: 'fanout', routingKey: '' }, options);
  }

  static async publishTopic({ exchange, routingKey, content }, options) {
    return await this.publish({ exchange, routingKey, content, type: 'topic' }, options);
  }
}
