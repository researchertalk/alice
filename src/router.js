
import _ from 'lodash';
import Client from './client';

export default class Router {
  constructor(baseRoutingKey) {
    this.baseRoutingKey = baseRoutingKey;
    this.middlewares = [];
  }

  use(middlewares) {
    if (_.isArray(middlewares)) {
      this.middlewares = this.middlewares.concat(middlewares);

      return this.middlewares;
    }

    this.middlewares.push(middlewares);

    return this.middlewares;
  }

  transformPath(route) {
    const routePath = `${this.baseRoutingKey}${route}`.replace(/^\//, '');

    return routePath.replace(/\//g, '.');
  }

  async direct({ exchange, queue, route, options }, handlers) {
    return await Client.consumeDirect({
      exchange,
      queue,
      routingKey: this.transformPath,
    }, Client.process(this.middlewares.concat(handlers)), options);
  }

  async fanout({ exchange, queue, options }, handlers) {
    return await Client.consumeFanout({
      exchange,
      queue,
    }, Client.process(this.middlewares.concat(handlers)), options);
  }

  async topic({ exchange, queue, route, options }, handlers) {
    return await Client.consumeTopic({
      exchange,
      queue,
      routingKey: this.transformPath,
    }, Client.process(this.middlewares.concat(handlers)), options);
  }
}
