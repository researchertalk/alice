
import _ from 'lodash';
import amqplib from 'amqplib';

let connection = null;
let consumerMiddlewares = [];

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

  static getConsumerMiddlewares() {
    return consumerMiddlewares;
  }

  static setConsumerMiddlewares(middlewares) {
    consumerMiddlewares = middlewares;

    return consumerMiddlewares;
  }

  static registerConsumerMiddleware(middlewares) {
    if (_.isArray(middlewares)) {
      consumerMiddlewares = consumerMiddlewares.concat(middlewares);

      return consumerMiddlewares;
    }

    consumerMiddlewares.push(middlewares);

    return consumerMiddlewares;
  }

  static process(handlers) {
    const resultInjector = async (result) => {
      const fns = handlers || [];
      const next = async () => {
        const fn = fns.shift();

        if (!fn) {
          return null;
        }

        return await fn(result, next);
      };

      return await next();
    };

    return resultInjector;
  }

  static async consume({ exchange, type, queue, routingKey }, handler, options) {
    try {
      const channel = await connection.createChannel();

      await channel.assertExchange(exchange, type);
      await channel.assertQueue(queue);
      await channel.bindQueue(queue, exchange, routingKey);

      const message = await channel.consume(queue, options);

      const context = {};
      context.content = JSON.parse(message.content.toString());
      context.fields = message.fields;
      context.properties = message.properties;
      context.channel = channel;

      Object.assign(context, this);

      return this.process(consumerMiddlewares.concat(handler))(context);
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
