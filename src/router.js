
import Client from './client';

export default class Router {
  constructor(baseRoutingKey) {
    this.baseRoutingKey = baseRoutingKey;
  }

  transformPath(route) {
    const routePath = `${this.baseRoutingKey}${route}`.replace(/^\//, '');

    return routePath.replace(/\//g, '.');
  }

  process(handlers) {
    return async (result) => {
      const next = async () => {
        const handler = handlers.shift();

        if (!handler) {
          return null;
        }

        return await handler(result, next);
      };

      return await next();
    };
  }

  async direct({ exchange, queue, route, options }, handlers) {
    return await Client.consumeDirect({
      exchange,
      queue,
      routingKey: this.transformPath,
    }, this.process(handlers), options);
  }

  async fanout({ exchange, queue, options }, handlers) {
    return await Client.consumeDirect({
      exchange,
      queue,
    }, this.process(handlers), options);
  }

  async topic({ exchange, queue, route, options }, handlers) {
    return await Client.consumeDirect({
      exchange,
      queue,
      routingKey: this.transformPath,
    }, this.process(handlers), options);
  }
}
