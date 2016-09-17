'use strict';

exports.__esModule = true;

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Class representing router.
 */
var Router = function () {

  /**
   * Constructor
   * @param {string} baseQueueName - Base queue name.
   */
  function Router(baseQueueName) {
    (0, _classCallCheck3.default)(this, Router);

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


  Router.prototype.bind = function bind(queue, handler) {
    this.routes.push({ queue: queue, handler: handler });
  };

  /**
   * Transform path separator. Ex. /context/topic into context.topic
   * @param {string} queue - Queue path (e.g /context/topic or context.topic).
   * @return {string} Transformed path separator.
   */


  Router.prototype.transformPath = function transformPath(queue) {
    var queuePath = queue.replace(/^\//, '');
    return queuePath.replace(/\//g, '.');
  };

  /**
   * Register/hook to client connection. Other means register route to exchange.
   * @param {object} client - Alice client instance object.
   */


  Router.prototype.registerTo = function registerTo(client) {
    for (var _iterator = this.routes, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
      var _ref;

      if (_isArray) {
        if (_i >= _iterator.length) break;
        _ref = _iterator[_i++];
      } else {
        _i = _iterator.next();
        if (_i.done) break;
        _ref = _i.value;
      }

      var route = _ref;

      var routePath = this.transformPath('' + this.baseQueueName + ('' + route.queue));
      client.dynamicConsumerBinding({
        queue: routePath,
        fn: route.handler
      });
    }
  };

  return Router;
}();

exports.default = Router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXIuanMiXSwibmFtZXMiOlsiUm91dGVyIiwiYmFzZVF1ZXVlTmFtZSIsInJvdXRlcyIsImJpbmQiLCJxdWV1ZSIsImhhbmRsZXIiLCJwdXNoIiwidHJhbnNmb3JtUGF0aCIsInF1ZXVlUGF0aCIsInJlcGxhY2UiLCJyZWdpc3RlclRvIiwiY2xpZW50Iiwicm91dGUiLCJyb3V0ZVBhdGgiLCJkeW5hbWljQ29uc3VtZXJCaW5kaW5nIiwiZm4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQTs7O0lBR3FCQSxNOztBQUVuQjs7OztBQUlBLGtCQUFZQyxhQUFaLEVBQTJCO0FBQUE7O0FBQ3pCLFNBQUtBLGFBQUwsR0FBcUJBLGFBQXJCO0FBQ0EsU0FBS0MsTUFBTCxHQUFjLEVBQWQ7QUFDRDs7QUFFRDs7Ozs7Ozs7O21CQU9BQyxJLGlCQUFLQyxLLEVBQU9DLE8sRUFBUztBQUNuQixTQUFLSCxNQUFMLENBQVlJLElBQVosQ0FBaUIsRUFBRUYsWUFBRixFQUFTQyxnQkFBVCxFQUFqQjtBQUNELEc7O0FBRUQ7Ozs7Ozs7bUJBS0FFLGEsMEJBQWNILEssRUFBTztBQUNuQixRQUFNSSxZQUFZSixNQUFNSyxPQUFOLENBQWMsS0FBZCxFQUFxQixFQUFyQixDQUFsQjtBQUNBLFdBQU9ELFVBQVVDLE9BQVYsQ0FBa0IsS0FBbEIsRUFBeUIsR0FBekIsQ0FBUDtBQUNELEc7O0FBRUQ7Ozs7OzttQkFJQUMsVSx1QkFBV0MsTSxFQUFRO0FBQ2pCLHlCQUFvQixLQUFLVCxNQUF6QixrSEFBaUM7QUFBQTs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBOztBQUFBLFVBQXRCVSxLQUFzQjs7QUFDL0IsVUFBTUMsWUFBWSxLQUFLTixhQUFMLENBQW1CLEtBQUcsS0FBS04sYUFBUixTQUNoQ1csTUFBTVIsS0FEMEIsQ0FBbkIsQ0FBbEI7QUFFQU8sYUFBT0csc0JBQVAsQ0FBOEI7QUFDNUJWLGVBQU9TLFNBRHFCO0FBRTVCRSxZQUFJSCxNQUFNUDtBQUZrQixPQUE5QjtBQUlEO0FBQ0YsRzs7Ozs7a0JBN0NrQkwsTSIsImZpbGUiOiJyb3V0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbi8qKlxuICogQ2xhc3MgcmVwcmVzZW50aW5nIHJvdXRlci5cbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVyIHtcblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtzdHJpbmd9IGJhc2VRdWV1ZU5hbWUgLSBCYXNlIHF1ZXVlIG5hbWUuXG4gICAqL1xuICBjb25zdHJ1Y3RvcihiYXNlUXVldWVOYW1lKSB7XG4gICAgdGhpcy5iYXNlUXVldWVOYW1lID0gYmFzZVF1ZXVlTmFtZTtcbiAgICB0aGlzLnJvdXRlcyA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIEJpbmQgYSBxdWV1ZSBwYXRoLiBMaWtlIGEgdHJhZGl0aW9uYWwgcm91dGUgcGF0aCBiaW5kaW5nLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcXVldWUgLSBRdWV1ZSBwYXRoIChlLmcgL2NvbnRleHQvdG9waWMgb3IgY29udGV4dC50b3BpYykuXG4gICAqIFF1ZXVlIHBhdGggdGhlbiB3aWxsIGJlIHRyYW5zZm9ybWVkIHRvIHVzZSBzdGFuZGFyZCBkb3QgcGF0aCBzZXBhcmF0b3IgKC4pXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBoYW5kbGVyIC0gRnVuY3Rpb24gaGFuZGxlciB3aGVuIHF1ZXVlIHBhdGggcmVjaWV2ZWQgYSBtZXNzYWdlLlxuICAgKiBJdCBpcyBwYXlsb2FkIHByb2R1Y2VyIGluIGNsaWVudC5keW5hbWljQ29uc3VtZXJCaW5kaW5nXG4gICAqL1xuICBiaW5kKHF1ZXVlLCBoYW5kbGVyKSB7XG4gICAgdGhpcy5yb3V0ZXMucHVzaCh7IHF1ZXVlLCBoYW5kbGVyIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIFRyYW5zZm9ybSBwYXRoIHNlcGFyYXRvci4gRXguIC9jb250ZXh0L3RvcGljIGludG8gY29udGV4dC50b3BpY1xuICAgKiBAcGFyYW0ge3N0cmluZ30gcXVldWUgLSBRdWV1ZSBwYXRoIChlLmcgL2NvbnRleHQvdG9waWMgb3IgY29udGV4dC50b3BpYykuXG4gICAqIEByZXR1cm4ge3N0cmluZ30gVHJhbnNmb3JtZWQgcGF0aCBzZXBhcmF0b3IuXG4gICAqL1xuICB0cmFuc2Zvcm1QYXRoKHF1ZXVlKSB7XG4gICAgY29uc3QgcXVldWVQYXRoID0gcXVldWUucmVwbGFjZSgvXlxcLy8sICcnKTtcbiAgICByZXR1cm4gcXVldWVQYXRoLnJlcGxhY2UoL1xcLy9nLCAnLicpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlZ2lzdGVyL2hvb2sgdG8gY2xpZW50IGNvbm5lY3Rpb24uIE90aGVyIG1lYW5zIHJlZ2lzdGVyIHJvdXRlIHRvIGV4Y2hhbmdlLlxuICAgKiBAcGFyYW0ge29iamVjdH0gY2xpZW50IC0gQWxpY2UgY2xpZW50IGluc3RhbmNlIG9iamVjdC5cbiAgICovXG4gIHJlZ2lzdGVyVG8oY2xpZW50KSB7XG4gICAgZm9yIChjb25zdCByb3V0ZSBvZiB0aGlzLnJvdXRlcykge1xuICAgICAgY29uc3Qgcm91dGVQYXRoID0gdGhpcy50cmFuc2Zvcm1QYXRoKGAke3RoaXMuYmFzZVF1ZXVlTmFtZX1gICtcbiAgICAgICAgYCR7cm91dGUucXVldWV9YCk7XG4gICAgICBjbGllbnQuZHluYW1pY0NvbnN1bWVyQmluZGluZyh7XG4gICAgICAgIHF1ZXVlOiByb3V0ZVBhdGgsXG4gICAgICAgIGZuOiByb3V0ZS5oYW5kbGVyLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=