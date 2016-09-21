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
              return _client2.default.consumeDirect({
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
              return _client2.default.consumeDirect({
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXIuanMiXSwibmFtZXMiOlsiUm91dGVyIiwiYmFzZVJvdXRpbmdLZXkiLCJtaWRkbGV3YXJlcyIsInVzZSIsImlzQXJyYXkiLCJjb25jYXQiLCJwdXNoIiwidHJhbnNmb3JtUGF0aCIsInJvdXRlIiwicm91dGVQYXRoIiwicmVwbGFjZSIsImRpcmVjdCIsImhhbmRsZXJzIiwiZXhjaGFuZ2UiLCJxdWV1ZSIsIm9wdGlvbnMiLCJjb25zdW1lRGlyZWN0Iiwicm91dGluZ0tleSIsInByb2Nlc3MiLCJmYW5vdXQiLCJ0b3BpYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7OztJQUVxQkEsTTtBQUNuQixrQkFBWUMsY0FBWixFQUE0QjtBQUFBOztBQUMxQixTQUFLQSxjQUFMLEdBQXNCQSxjQUF0QjtBQUNBLFNBQUtDLFdBQUwsR0FBbUIsRUFBbkI7QUFDRDs7bUJBRURDLEcsZ0JBQUlELFcsRUFBYTtBQUNmLFFBQUksaUJBQUVFLE9BQUYsQ0FBVUYsV0FBVixDQUFKLEVBQTRCO0FBQzFCLFdBQUtBLFdBQUwsR0FBbUIsS0FBS0EsV0FBTCxDQUFpQkcsTUFBakIsQ0FBd0JILFdBQXhCLENBQW5COztBQUVBLGFBQU8sS0FBS0EsV0FBWjtBQUNEOztBQUVELFNBQUtBLFdBQUwsQ0FBaUJJLElBQWpCLENBQXNCSixXQUF0Qjs7QUFFQSxXQUFPLEtBQUtBLFdBQVo7QUFDRCxHOzttQkFFREssYSwwQkFBY0MsSyxFQUFPO0FBQ25CLFFBQU1DLFlBQVksTUFBRyxLQUFLUixjQUFSLEdBQXlCTyxLQUF6QixFQUFpQ0UsT0FBakMsQ0FBeUMsS0FBekMsRUFBZ0QsRUFBaEQsQ0FBbEI7O0FBRUEsV0FBT0QsVUFBVUMsT0FBVixDQUFrQixLQUFsQixFQUF5QixHQUF6QixDQUFQO0FBQ0QsRzs7bUJBRUtDLE07a0dBQTRDQyxRO1VBQW5DQyxRLFNBQUFBLFE7VUFBVUMsSyxTQUFBQSxLO1VBQU9OLEssU0FBQUEsSztVQUFPTyxPLFNBQUFBLE87Ozs7OztxQkFDeEIsaUJBQU9DLGFBQVAsQ0FBcUI7QUFDaENILGtDQURnQztBQUVoQ0MsNEJBRmdDO0FBR2hDRyw0QkFBWSxLQUFLVjtBQUhlLGVBQXJCLEVBSVYsaUJBQU9XLE9BQVAsQ0FBZSxLQUFLaEIsV0FBTCxDQUFpQkcsTUFBakIsQ0FBd0JPLFFBQXhCLENBQWYsQ0FKVSxFQUl5Q0csT0FKekMsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7bUJBT1RJLE07b0dBQXFDUCxRO1VBQTVCQyxRLFNBQUFBLFE7VUFBVUMsSyxTQUFBQSxLO1VBQU9DLE8sU0FBQUEsTzs7Ozs7O3FCQUNqQixpQkFBT0MsYUFBUCxDQUFxQjtBQUNoQ0gsa0NBRGdDO0FBRWhDQztBQUZnQyxlQUFyQixFQUdWLGlCQUFPSSxPQUFQLENBQWUsS0FBS2hCLFdBQUwsQ0FBaUJHLE1BQWpCLENBQXdCTyxRQUF4QixDQUFmLENBSFUsRUFHeUNHLE9BSHpDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQU1USyxLO29HQUEyQ1IsUTtVQUFuQ0MsUSxTQUFBQSxRO1VBQVVDLEssU0FBQUEsSztVQUFPTixLLFNBQUFBLEs7VUFBT08sTyxTQUFBQSxPOzs7Ozs7cUJBQ3ZCLGlCQUFPQyxhQUFQLENBQXFCO0FBQ2hDSCxrQ0FEZ0M7QUFFaENDLDRCQUZnQztBQUdoQ0csNEJBQVksS0FBS1Y7QUFIZSxlQUFyQixFQUlWLGlCQUFPVyxPQUFQLENBQWUsS0FBS2hCLFdBQUwsQ0FBaUJHLE1BQWpCLENBQXdCTyxRQUF4QixDQUFmLENBSlUsRUFJeUNHLE9BSnpDLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQXhDSWYsTSIsImZpbGUiOiJyb3V0ZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBfIGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgQ2xpZW50IGZyb20gJy4vY2xpZW50JztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgUm91dGVyIHtcbiAgY29uc3RydWN0b3IoYmFzZVJvdXRpbmdLZXkpIHtcbiAgICB0aGlzLmJhc2VSb3V0aW5nS2V5ID0gYmFzZVJvdXRpbmdLZXk7XG4gICAgdGhpcy5taWRkbGV3YXJlcyA9IFtdO1xuICB9XG5cbiAgdXNlKG1pZGRsZXdhcmVzKSB7XG4gICAgaWYgKF8uaXNBcnJheShtaWRkbGV3YXJlcykpIHtcbiAgICAgIHRoaXMubWlkZGxld2FyZXMgPSB0aGlzLm1pZGRsZXdhcmVzLmNvbmNhdChtaWRkbGV3YXJlcyk7XG5cbiAgICAgIHJldHVybiB0aGlzLm1pZGRsZXdhcmVzO1xuICAgIH1cblxuICAgIHRoaXMubWlkZGxld2FyZXMucHVzaChtaWRkbGV3YXJlcyk7XG5cbiAgICByZXR1cm4gdGhpcy5taWRkbGV3YXJlcztcbiAgfVxuXG4gIHRyYW5zZm9ybVBhdGgocm91dGUpIHtcbiAgICBjb25zdCByb3V0ZVBhdGggPSBgJHt0aGlzLmJhc2VSb3V0aW5nS2V5fSR7cm91dGV9YC5yZXBsYWNlKC9eXFwvLywgJycpO1xuXG4gICAgcmV0dXJuIHJvdXRlUGF0aC5yZXBsYWNlKC9cXC8vZywgJy4nKTtcbiAgfVxuXG4gIGFzeW5jIGRpcmVjdCh7IGV4Y2hhbmdlLCBxdWV1ZSwgcm91dGUsIG9wdGlvbnMgfSwgaGFuZGxlcnMpIHtcbiAgICByZXR1cm4gYXdhaXQgQ2xpZW50LmNvbnN1bWVEaXJlY3Qoe1xuICAgICAgZXhjaGFuZ2UsXG4gICAgICBxdWV1ZSxcbiAgICAgIHJvdXRpbmdLZXk6IHRoaXMudHJhbnNmb3JtUGF0aCxcbiAgICB9LCBDbGllbnQucHJvY2Vzcyh0aGlzLm1pZGRsZXdhcmVzLmNvbmNhdChoYW5kbGVycykpLCBvcHRpb25zKTtcbiAgfVxuXG4gIGFzeW5jIGZhbm91dCh7IGV4Y2hhbmdlLCBxdWV1ZSwgb3B0aW9ucyB9LCBoYW5kbGVycykge1xuICAgIHJldHVybiBhd2FpdCBDbGllbnQuY29uc3VtZURpcmVjdCh7XG4gICAgICBleGNoYW5nZSxcbiAgICAgIHF1ZXVlLFxuICAgIH0sIENsaWVudC5wcm9jZXNzKHRoaXMubWlkZGxld2FyZXMuY29uY2F0KGhhbmRsZXJzKSksIG9wdGlvbnMpO1xuICB9XG5cbiAgYXN5bmMgdG9waWMoeyBleGNoYW5nZSwgcXVldWUsIHJvdXRlLCBvcHRpb25zIH0sIGhhbmRsZXJzKSB7XG4gICAgcmV0dXJuIGF3YWl0IENsaWVudC5jb25zdW1lRGlyZWN0KHtcbiAgICAgIGV4Y2hhbmdlLFxuICAgICAgcXVldWUsXG4gICAgICByb3V0aW5nS2V5OiB0aGlzLnRyYW5zZm9ybVBhdGgsXG4gICAgfSwgQ2xpZW50LnByb2Nlc3ModGhpcy5taWRkbGV3YXJlcy5jb25jYXQoaGFuZGxlcnMpKSwgb3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==