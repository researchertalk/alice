
/**
 * Class representing router.
 */
export default class Router {

  /**
   * Constructor
   * @param {string} baseQueueName - Base queue name.
   */
  constructor(baseQueueName) {
    this.baseQueueName = baseQueueName;
    this.routes = [];
  }

  /**
   * Bind a queue path. Like a traditional route path binding.
   * @param {string} queue - Queue path (e.g /context/topic or context.topic).
   * Queue path then will be transformed to use standard dot path separator (.)
   * @param {string} handler - Function handler when queue path recieved a message.
   * It is payload producer in client.dynamicConsumerBinding
   */
  bind(queue, handler) {
    this.routes.push({ queue, handler });
  }

  /**
   * Transform path separator. Ex. /context/topic into context.topic
   * @param {string} queue - Queue path (e.g /context/topic or context.topic).
   * @return {string} Transformed path separator.
   */
  transformPath(queue) {
    const queuePath = queue.replace(/^\//, '');
    return queuePath.replace(/\//g, '.');
  }

  /**
   * Register/hook to client connection. Other means register route to exchange.
   * @param {object} client - Alice client instance object.
   */
  registerTo(client) {
    for (const route of this.routes) {
      const routePath = this.transformPath(`${this.baseQueueName}` +
        `${route.queue}`);
      client.dynamicConsumerBinding({
        queue: routePath,
        fn: route.handler,
      });
    }
  }
}
