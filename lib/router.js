'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _client = require('./client');

var _client2 = _interopRequireDefault(_client);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Router = function () {
  function Router(baseRoutingKey) {
    (0, _classCallCheck3.default)(this, Router);

    this.baseRoutingKey = baseRoutingKey;
  }

  Router.prototype.transformPath = function transformPath(route) {
    var routePath = ('' + this.baseRoutingKey + route).replace(/^\//, '');

    return routePath.replace(/\//g, '.');
  };

  Router.prototype.process = function process(handlers) {
    var _this = this;

    return function () {
      var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(result) {
        var next;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                next = function () {
                  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
                    var handler;
                    return _regenerator2.default.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            handler = handlers.shift();

                            if (handler) {
                              _context.next = 3;
                              break;
                            }

                            return _context.abrupt('return', null);

                          case 3:
                            _context.next = 5;
                            return handler(result, next);

                          case 5:
                            return _context.abrupt('return', _context.sent);

                          case 6:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this);
                  }));

                  return function next() {
                    return _ref2.apply(this, arguments);
                  };
                }();

                _context2.next = 3;
                return next();

              case 3:
                return _context2.abrupt('return', _context2.sent);

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, _this);
      }));

      return function (_x) {
        return _ref.apply(this, arguments);
      };
    }();
  };

  Router.prototype.direct = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref4, handlers) {
      var exchange = _ref4.exchange;
      var queue = _ref4.queue;
      var route = _ref4.route;
      var options = _ref4.options;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return _client2.default.consumeDirect({
                exchange: exchange,
                queue: queue,
                routingKey: this.transformPath
              }, this.process(handlers), options);

            case 2:
              return _context3.abrupt('return', _context3.sent);

            case 3:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this);
    }));

    function direct(_x2, _x3) {
      return _ref3.apply(this, arguments);
    }

    return direct;
  }();

  Router.prototype.fanout = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref6, handlers) {
      var exchange = _ref6.exchange;
      var queue = _ref6.queue;
      var options = _ref6.options;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return _client2.default.consumeDirect({
                exchange: exchange,
                queue: queue
              }, this.process(handlers), options);

            case 2:
              return _context4.abrupt('return', _context4.sent);

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function fanout(_x4, _x5) {
      return _ref5.apply(this, arguments);
    }

    return fanout;
  }();

  Router.prototype.topic = function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(_ref8, handlers) {
      var exchange = _ref8.exchange;
      var queue = _ref8.queue;
      var route = _ref8.route;
      var options = _ref8.options;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return _client2.default.consumeDirect({
                exchange: exchange,
                queue: queue,
                routingKey: this.transformPath
              }, this.process(handlers), options);

            case 2:
              return _context5.abrupt('return', _context5.sent);

            case 3:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function topic(_x6, _x7) {
      return _ref7.apply(this, arguments);
    }

    return topic;
  }();

  return Router;
}();

exports.default = Router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9yb3V0ZXIuanMiXSwibmFtZXMiOlsiUm91dGVyIiwiYmFzZVJvdXRpbmdLZXkiLCJ0cmFuc2Zvcm1QYXRoIiwicm91dGUiLCJyb3V0ZVBhdGgiLCJyZXBsYWNlIiwicHJvY2VzcyIsImhhbmRsZXJzIiwicmVzdWx0IiwibmV4dCIsImhhbmRsZXIiLCJzaGlmdCIsImRpcmVjdCIsImV4Y2hhbmdlIiwicXVldWUiLCJvcHRpb25zIiwiY29uc3VtZURpcmVjdCIsInJvdXRpbmdLZXkiLCJmYW5vdXQiLCJ0b3BpYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7Ozs7SUFFcUJBLE07QUFDbkIsa0JBQVlDLGNBQVosRUFBNEI7QUFBQTs7QUFDMUIsU0FBS0EsY0FBTCxHQUFzQkEsY0FBdEI7QUFDRDs7bUJBRURDLGEsMEJBQWNDLEssRUFBTztBQUNuQixRQUFNQyxZQUFZLE1BQUcsS0FBS0gsY0FBUixHQUF5QkUsS0FBekIsRUFBaUNFLE9BQWpDLENBQXlDLEtBQXpDLEVBQWdELEVBQWhELENBQWxCOztBQUVBLFdBQU9ELFVBQVVDLE9BQVYsQ0FBa0IsS0FBbEIsRUFBeUIsR0FBekIsQ0FBUDtBQUNELEc7O21CQUVEQyxPLG9CQUFRQyxRLEVBQVU7QUFBQTs7QUFDaEI7QUFBQSw0RUFBTyxrQkFBT0MsTUFBUDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQ0Msb0JBREQ7QUFBQSx5RkFDUTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDTEMsbUNBREssR0FDS0gsU0FBU0ksS0FBVCxFQURMOztBQUFBLGdDQUdORCxPQUhNO0FBQUE7QUFBQTtBQUFBOztBQUFBLDZEQUlGLElBSkU7O0FBQUE7QUFBQTtBQUFBLG1DQU9FQSxRQUFRRixNQUFSLEVBQWdCQyxJQUFoQixDQVBGOztBQUFBO0FBQUE7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsbUJBRFI7O0FBQUEsa0NBQ0NBLElBREQ7QUFBQTtBQUFBO0FBQUE7O0FBQUE7QUFBQSx1QkFXUUEsTUFYUjs7QUFBQTtBQUFBOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BQVA7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFhRCxHOzttQkFFS0csTTtvR0FBNENMLFE7VUFBbkNNLFEsU0FBQUEsUTtVQUFVQyxLLFNBQUFBLEs7VUFBT1gsSyxTQUFBQSxLO1VBQU9ZLE8sU0FBQUEsTzs7Ozs7O3FCQUN4QixpQkFBT0MsYUFBUCxDQUFxQjtBQUNoQ0gsa0NBRGdDO0FBRWhDQyw0QkFGZ0M7QUFHaENHLDRCQUFZLEtBQUtmO0FBSGUsZUFBckIsRUFJVixLQUFLSSxPQUFMLENBQWFDLFFBQWIsQ0FKVSxFQUljUSxPQUpkLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQU9URyxNO29HQUFxQ1gsUTtVQUE1Qk0sUSxTQUFBQSxRO1VBQVVDLEssU0FBQUEsSztVQUFPQyxPLFNBQUFBLE87Ozs7OztxQkFDakIsaUJBQU9DLGFBQVAsQ0FBcUI7QUFDaENILGtDQURnQztBQUVoQ0M7QUFGZ0MsZUFBckIsRUFHVixLQUFLUixPQUFMLENBQWFDLFFBQWIsQ0FIVSxFQUdjUSxPQUhkLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O21CQU1USSxLO29HQUEyQ1osUTtVQUFuQ00sUSxTQUFBQSxRO1VBQVVDLEssU0FBQUEsSztVQUFPWCxLLFNBQUFBLEs7VUFBT1ksTyxTQUFBQSxPOzs7Ozs7cUJBQ3ZCLGlCQUFPQyxhQUFQLENBQXFCO0FBQ2hDSCxrQ0FEZ0M7QUFFaENDLDRCQUZnQztBQUdoQ0csNEJBQVksS0FBS2Y7QUFIZSxlQUFyQixFQUlWLEtBQUtJLE9BQUwsQ0FBYUMsUUFBYixDQUpVLEVBSWNRLE9BSmQsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JBM0NJZixNIiwiZmlsZSI6InJvdXRlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IENsaWVudCBmcm9tICcuL2NsaWVudCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJvdXRlciB7XG4gIGNvbnN0cnVjdG9yKGJhc2VSb3V0aW5nS2V5KSB7XG4gICAgdGhpcy5iYXNlUm91dGluZ0tleSA9IGJhc2VSb3V0aW5nS2V5O1xuICB9XG5cbiAgdHJhbnNmb3JtUGF0aChyb3V0ZSkge1xuICAgIGNvbnN0IHJvdXRlUGF0aCA9IGAke3RoaXMuYmFzZVJvdXRpbmdLZXl9JHtyb3V0ZX1gLnJlcGxhY2UoL15cXC8vLCAnJyk7XG5cbiAgICByZXR1cm4gcm91dGVQYXRoLnJlcGxhY2UoL1xcLy9nLCAnLicpO1xuICB9XG5cbiAgcHJvY2VzcyhoYW5kbGVycykge1xuICAgIHJldHVybiBhc3luYyAocmVzdWx0KSA9PiB7XG4gICAgICBjb25zdCBuZXh0ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBoYW5kbGVyID0gaGFuZGxlcnMuc2hpZnQoKTtcblxuICAgICAgICBpZiAoIWhhbmRsZXIpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBhd2FpdCBoYW5kbGVyKHJlc3VsdCwgbmV4dCk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gYXdhaXQgbmV4dCgpO1xuICAgIH07XG4gIH1cblxuICBhc3luYyBkaXJlY3QoeyBleGNoYW5nZSwgcXVldWUsIHJvdXRlLCBvcHRpb25zIH0sIGhhbmRsZXJzKSB7XG4gICAgcmV0dXJuIGF3YWl0IENsaWVudC5jb25zdW1lRGlyZWN0KHtcbiAgICAgIGV4Y2hhbmdlLFxuICAgICAgcXVldWUsXG4gICAgICByb3V0aW5nS2V5OiB0aGlzLnRyYW5zZm9ybVBhdGgsXG4gICAgfSwgdGhpcy5wcm9jZXNzKGhhbmRsZXJzKSwgb3B0aW9ucyk7XG4gIH1cblxuICBhc3luYyBmYW5vdXQoeyBleGNoYW5nZSwgcXVldWUsIG9wdGlvbnMgfSwgaGFuZGxlcnMpIHtcbiAgICByZXR1cm4gYXdhaXQgQ2xpZW50LmNvbnN1bWVEaXJlY3Qoe1xuICAgICAgZXhjaGFuZ2UsXG4gICAgICBxdWV1ZSxcbiAgICB9LCB0aGlzLnByb2Nlc3MoaGFuZGxlcnMpLCBvcHRpb25zKTtcbiAgfVxuXG4gIGFzeW5jIHRvcGljKHsgZXhjaGFuZ2UsIHF1ZXVlLCByb3V0ZSwgb3B0aW9ucyB9LCBoYW5kbGVycykge1xuICAgIHJldHVybiBhd2FpdCBDbGllbnQuY29uc3VtZURpcmVjdCh7XG4gICAgICBleGNoYW5nZSxcbiAgICAgIHF1ZXVlLFxuICAgICAgcm91dGluZ0tleTogdGhpcy50cmFuc2Zvcm1QYXRoLFxuICAgIH0sIHRoaXMucHJvY2VzcyhoYW5kbGVycyksIG9wdGlvbnMpO1xuICB9XG59XG4iXX0=