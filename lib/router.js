'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = function () {
  function Router(baseRoutingKey) {
    (0, _classCallCheck3.default)(this, Router);

    this.baseRoutingKey = baseRoutingKey;
    this.middlewares = [];
  }

  Router.prototype.use = function use(middlewares) {
    if (_lodash2.default.isArray(middlewares)) {
      this.middlewares = this.middlewares.concat(middlewares);

      return this.middlewares;
    }

    this.middlewares.push(middlewares);

    return this.middlewares;
  };

  Router.prototype.transformPath = function transformPath(route) {
    var routePath = ('' + this.baseRoutingKey + route).replace(/^\//, '');

    return routePath.replace(/\//g, '.');
  };

  Router.prototype.direct = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref2, handlers) {
      var exchange = _ref2.exchange;
      var queue = _ref2.queue;
      var route = _ref2.route;
      var options = _ref2.options;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _client2.default.consumeDirect({
                exchange: exchange,
                queue: queue,
                routingKey: this.transformPath
              }, _client2.default.process(this.middlewares.concat(handlers)), options);

            case 2:
              return _context.abrupt('return', _context.sent);

            case 3:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this);
    }));

    function direct(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return direct;
  }();

  Router.prototype.fanout = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref4, handlers) {
      var exchange = _ref4.exchange;
      var queue = _ref4.queue;
      var options = _ref4.options;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return _client2.default.consumeFanout({
                exchange: exchange,
                queue: queue
              }, _client2.default.process(this.middlewares.concat(handlers)), options);

            case 2:
              return _context2.abrupt('return', _context2.sent);

            case 3:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this);
    }));

    function fanout(_x3, _x4) {
      return _ref3.apply(this, arguments);
    }

    return fanout;
  }();

  Router.prototype.topic = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref6, handlers) {
      var exchange = _ref6.exchange;
      var queue = _ref6.queue;
      var route = _ref6.route;
      var options = _ref6.options;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _client2.default.consumeTopic({
                exchange: exchange,
                queue: queue,
                routingKey: this.transformPath
              }, _client2.default.process(this.middlewares.concat(handlers)), options);

            case 2:
              return _context3.abrupt('return', _context3.sent);

            case 3:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function topic(_x5, _x6) {
      return _ref5.apply(this, arguments);
    }

    return topic;
  }();

  return Router;
}();

exports.default = Router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXIuanMiXSwibmFtZXMiOlsiUm91dGVyIiwiYmFzZVJvdXRpbmdLZXkiLCJtaWRkbGV3YXJlcyIsInVzZSIsImlzQXJyYXkiLCJjb25jYXQiLCJwdXNoIiwidHJhbnNmb3JtUGF0aCIsInJvdXRlIiwicm91dGVQYXRoIiwicmVwbGFjZSIsImRpcmVjdCIsImhhbmRsZXJzIiwiZXhjaGFuZ2UiLCJxdWV1ZSIsIm9wdGlvbnMiLCJjb25zdW1lRGlyZWN0Iiwicm91dGluZ0tleSIsInByb2Nlc3MiLCJmYW5vdXQiLCJjb25zdW1lRmFub3V0IiwidG9waWMiLCJjb25zdW1lVG9waWMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7SUFFcUJBLE07QUFDbkIsa0JBQVlDLGNBQVosRUFBNEI7QUFBQTs7QUFDMUIsU0FBS0EsY0FBTCxHQUFzQkEsY0FBdEI7QUFDQSxTQUFLQyxXQUFMLEdBQW1CLEVBQW5CO0FBQ0Q7O21CQUVEQyxHLGdCQUFJRCxXLEVBQWE7QUFDZixRQUFJLGlCQUFFRSxPQUFGLENBQVVGLFdBQVYsQ0FBSixFQUE0QjtBQUMxQixXQUFLQSxXQUFMLEdBQW1CLEtBQUtBLFdBQUwsQ0FBaUJHLE1BQWpCLENBQXdCSCxXQUF4QixDQUFuQjs7QUFFQSxhQUFPLEtBQUtBLFdBQVo7QUFDRDs7QUFFRCxTQUFLQSxXQUFMLENBQWlCSSxJQUFqQixDQUFzQkosV0FBdEI7O0FBRUEsV0FBTyxLQUFLQSxXQUFaO0FBQ0QsRzs7bUJBRURLLGEsMEJBQWNDLEssRUFBTztBQUNuQixRQUFNQyxZQUFZLE1BQUcsS0FBS1IsY0FBUixHQUF5Qk8sS0FBekIsRUFBaUNFLE9BQWpDLENBQXlDLEtBQXpDLEVBQWdELEVBQWhELENBQWxCOztBQUVBLFdBQU9ELFVBQVVDLE9BQVYsQ0FBa0IsS0FBbEIsRUFBeUIsR0FBekIsQ0FBUDtBQUNELEc7O21CQUVLQyxNO2tHQUE0Q0MsUTtVQUFuQ0MsUSxTQUFBQSxRO1VBQVVDLEssU0FBQUEsSztVQUFPTixLLFNBQUFBLEs7VUFBT08sTyxTQUFBQSxPOzs7Ozs7cUJBQ3hCLGlCQUFPQyxhQUFQLENBQXFCO0FBQ2hDSCxrQ0FEZ0M7QUFFaENDLDRCQUZnQztBQUdoQ0csNEJBQVksS0FBS1Y7QUFIZSxlQUFyQixFQUlWLGlCQUFPVyxPQUFQLENBQWUsS0FBS2hCLFdBQUwsQ0FBaUJHLE1BQWpCLENBQXdCTyxRQUF4QixDQUFmLENBSlUsRUFJeUNHLE9BSnpDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQU9USSxNO29HQUFxQ1AsUTtVQUE1QkMsUSxTQUFBQSxRO1VBQVVDLEssU0FBQUEsSztVQUFPQyxPLFNBQUFBLE87Ozs7OztxQkFDakIsaUJBQU9LLGFBQVAsQ0FBcUI7QUFDaENQLGtDQURnQztBQUVoQ0M7QUFGZ0MsZUFBckIsRUFHVixpQkFBT0ksT0FBUCxDQUFlLEtBQUtoQixXQUFMLENBQWlCRyxNQUFqQixDQUF3Qk8sUUFBeEIsQ0FBZixDQUhVLEVBR3lDRyxPQUh6QyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OzttQkFNVE0sSztvR0FBMkNULFE7VUFBbkNDLFEsU0FBQUEsUTtVQUFVQyxLLFNBQUFBLEs7VUFBT04sSyxTQUFBQSxLO1VBQU9PLE8sU0FBQUEsTzs7Ozs7O3FCQUN2QixpQkFBT08sWUFBUCxDQUFvQjtBQUMvQlQsa0NBRCtCO0FBRS9CQyw0QkFGK0I7QUFHL0JHLDRCQUFZLEtBQUtWO0FBSGMsZUFBcEIsRUFJVixpQkFBT1csT0FBUCxDQUFlLEtBQUtoQixXQUFMLENBQWlCRyxNQUFqQixDQUF3Qk8sUUFBeEIsQ0FBZixDQUpVLEVBSXlDRyxPQUp6QyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkF4Q0lmLE0iLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IENsaWVudCBmcm9tICcuL2NsaWVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlciB7XG4gIGNvbnN0cnVjdG9yKGJhc2VSb3V0aW5nS2V5KSB7XG4gICAgdGhpcy5iYXNlUm91dGluZ0tleSA9IGJhc2VSb3V0aW5nS2V5O1xuICAgIHRoaXMubWlkZGxld2FyZXMgPSBbXTtcbiAgfVxuXG4gIHVzZShtaWRkbGV3YXJlcykge1xuICAgIGlmIChfLmlzQXJyYXkobWlkZGxld2FyZXMpKSB7XG4gICAgICB0aGlzLm1pZGRsZXdhcmVzID0gdGhpcy5taWRkbGV3YXJlcy5jb25jYXQobWlkZGxld2FyZXMpO1xuXG4gICAgICByZXR1cm4gdGhpcy5taWRkbGV3YXJlcztcbiAgICB9XG5cbiAgICB0aGlzLm1pZGRsZXdhcmVzLnB1c2gobWlkZGxld2FyZXMpO1xuXG4gICAgcmV0dXJuIHRoaXMubWlkZGxld2FyZXM7XG4gIH1cblxuICB0cmFuc2Zvcm1QYXRoKHJvdXRlKSB7XG4gICAgY29uc3Qgcm91dGVQYXRoID0gYCR7dGhpcy5iYXNlUm91dGluZ0tleX0ke3JvdXRlfWAucmVwbGFjZSgvXlxcLy8sICcnKTtcblxuICAgIHJldHVybiByb3V0ZVBhdGgucmVwbGFjZSgvXFwvL2csICcuJyk7XG4gIH1cblxuICBhc3luYyBkaXJlY3QoeyBleGNoYW5nZSwgcXVldWUsIHJvdXRlLCBvcHRpb25zIH0sIGhhbmRsZXJzKSB7XG4gICAgcmV0dXJuIGF3YWl0IENsaWVudC5jb25zdW1lRGlyZWN0KHtcbiAgICAgIGV4Y2hhbmdlLFxuICAgICAgcXVldWUsXG4gICAgICByb3V0aW5nS2V5OiB0aGlzLnRyYW5zZm9ybVBhdGgsXG4gICAgfSwgQ2xpZW50LnByb2Nlc3ModGhpcy5taWRkbGV3YXJlcy5jb25jYXQoaGFuZGxlcnMpKSwgb3B0aW9ucyk7XG4gIH1cblxuICBhc3luYyBmYW5vdXQoeyBleGNoYW5nZSwgcXVldWUsIG9wdGlvbnMgfSwgaGFuZGxlcnMpIHtcbiAgICByZXR1cm4gYXdhaXQgQ2xpZW50LmNvbnN1bWVGYW5vdXQoe1xuICAgICAgZXhjaGFuZ2UsXG4gICAgICBxdWV1ZSxcbiAgICB9LCBDbGllbnQucHJvY2Vzcyh0aGlzLm1pZGRsZXdhcmVzLmNvbmNhdChoYW5kbGVycykpLCBvcHRpb25zKTtcbiAgfVxuXG4gIGFzeW5jIHRvcGljKHsgZXhjaGFuZ2UsIHF1ZXVlLCByb3V0ZSwgb3B0aW9ucyB9LCBoYW5kbGVycykge1xuICAgIHJldHVybiBhd2FpdCBDbGllbnQuY29uc3VtZVRvcGljKHtcbiAgICAgIGV4Y2hhbmdlLFxuICAgICAgcXVldWUsXG4gICAgICByb3V0aW5nS2V5OiB0aGlzLnRyYW5zZm9ybVBhdGgsXG4gICAgfSwgQ2xpZW50LnByb2Nlc3ModGhpcy5taWRkbGV3YXJlcy5jb25jYXQoaGFuZGxlcnMpKSwgb3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==