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

var _amqplib = require('amqplib');

var _amqplib2 = _interopRequireDefault(_amqplib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _connection = null;
var consumerMiddlewares = [];

var Client = function () {
  function Client() {
    (0, _classCallCheck3.default)(this, Client);
  }

  Client.connect = function () {
    var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee() {
      var url = arguments.length <= 0 || arguments[0] === undefined ? process.env.AMQP_URL : arguments[0];
      var amqpurl;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              amqpurl = url || 'amqp://localhost';
              _context.next = 4;
              return _amqplib2.default.connect(amqpurl);

            case 4:
              _connection = _context.sent;
              return _context.abrupt('return', _connection);

            case 8:
              _context.prev = 8;
              _context.t0 = _context['catch'](0);
              throw _context.t0;

            case 11:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 8]]);
    }));

    function connect(_x) {
      return _ref.apply(this, arguments);
    }

    return connect;
  }();

  Client.connection = function connection() {
    return _connection;
  };

  Client.disconnect = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2() {
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return _connection.close();

            case 3:

              _connection = null;

              return _context2.abrupt('return', _connection);

            case 7:
              _context2.prev = 7;
              _context2.t0 = _context2['catch'](0);
              throw _context2.t0;

            case 10:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 7]]);
    }));

    function disconnect() {
      return _ref2.apply(this, arguments);
    }

    return disconnect;
  }();

  Client.getConsumerMiddlewares = function getConsumerMiddlewares() {
    return consumerMiddlewares;
  };

  Client.setConsumerMiddlewares = function setConsumerMiddlewares(middlewares) {
    consumerMiddlewares = middlewares;

    return consumerMiddlewares;
  };

  Client.registerConsumerMiddleware = function registerConsumerMiddleware(middlewares) {
    if (_lodash2.default.isArray(middlewares)) {
      consumerMiddlewares = consumerMiddlewares.concat(middlewares);

      return consumerMiddlewares;
    }

    consumerMiddlewares.push(middlewares);

    return consumerMiddlewares;
  };

  Client.process = function process(handlers) {
    var _this = this;

    var resultInjector = function () {
      var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(result) {
        var fns, next;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                fns = handlers || [];

                next = function () {
                  var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3() {
                    var fn;
                    return _regenerator2.default.wrap(function _callee3$(_context3) {
                      while (1) {
                        switch (_context3.prev = _context3.next) {
                          case 0:
                            fn = fns.shift();

                            if (fn) {
                              _context3.next = 3;
                              break;
                            }

                            return _context3.abrupt('return', null);

                          case 3:
                            _context3.next = 5;
                            return fn(result, next);

                          case 5:
                            return _context3.abrupt('return', _context3.sent);

                          case 6:
                          case 'end':
                            return _context3.stop();
                        }
                      }
                    }, _callee3, _this);
                  }));

                  return function next() {
                    return _ref4.apply(this, arguments);
                  };
                }();

                _context4.next = 4;
                return next();

              case 4:
                return _context4.abrupt('return', _context4.sent);

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, _this);
      }));

      return function resultInjector(_x3) {
        return _ref3.apply(this, arguments);
      };
    }();

    return resultInjector;
  };

  Client.consume = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(_ref6, handler, options) {
      var exchange = _ref6.exchange;
      var type = _ref6.type;
      var queue = _ref6.queue;
      var routingKey = _ref6.routingKey;
      var channel, message, context;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              _context5.next = 3;
              return _connection.createChannel();

            case 3:
              channel = _context5.sent;
              _context5.next = 6;
              return channel.assertExchange(exchange, type);

            case 6:
              _context5.next = 8;
              return channel.assertQueue(queue);

            case 8:
              _context5.next = 10;
              return channel.bindQueue(queue, exchange, routingKey);

            case 10:
              _context5.next = 12;
              return channel.consume(queue, options);

            case 12:
              message = _context5.sent;
              context = {};

              context.content = JSON.parse(message.content.toString());
              context.fields = message.fields;
              context.properties = message.properties;
              context.channel = channel;

              Object.assign(context, this);

              return _context5.abrupt('return', this.process(consumerMiddlewares.concat(handler))(context));

            case 22:
              _context5.prev = 22;
              _context5.t0 = _context5['catch'](0);
              throw _context5.t0;

            case 25:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this, [[0, 22]]);
    }));

    function consume(_x4, _x5, _x6) {
      return _ref5.apply(this, arguments);
    }

    return consume;
  }();

  Client.consumeDirect = function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(_ref8, handler, options) {
      var exchange = _ref8.exchange;
      var queue = _ref8.queue;
      var routingKey = _ref8.routingKey;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.consume({ exchange: exchange, queue: queue, routingKey: routingKey, type: 'direct' }, handler, options);

            case 2:
              return _context6.abrupt('return', _context6.sent);

            case 3:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function consumeDirect(_x7, _x8, _x9) {
      return _ref7.apply(this, arguments);
    }

    return consumeDirect;
  }();

  Client.consumeFanout = function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(_ref10, handler, options) {
      var exchange = _ref10.exchange;
      var queue = _ref10.queue;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.next = 2;
              return this.consume({ exchange: exchange, queue: queue, type: 'fanout' }, handler, options);

            case 2:
              return _context7.abrupt('return', _context7.sent);

            case 3:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this);
    }));

    function consumeFanout(_x10, _x11, _x12) {
      return _ref9.apply(this, arguments);
    }

    return consumeFanout;
  }();

  Client.consumeTopic = function () {
    var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(_ref12, handler, options) {
      var exchange = _ref12.exchange;
      var queue = _ref12.queue;
      var routingKey = _ref12.routingKey;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this.consume({ exchange: exchange, queue: queue, routingKey: routingKey, type: 'topic' }, handler, options);

            case 2:
              return _context8.abrupt('return', _context8.sent);

            case 3:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function consumeTopic(_x13, _x14, _x15) {
      return _ref11.apply(this, arguments);
    }

    return consumeTopic;
  }();

  // missing exchange durable options


  Client.publish = function () {
    var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(_ref14, options) {
      var exchange = _ref14.exchange;
      var type = _ref14.type;
      var routingKey = _ref14.routingKey;
      var content = _ref14.content;
      var channel, contentBuffer;
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.prev = 0;
              _context9.next = 3;
              return _connection.createChannel();

            case 3:
              channel = _context9.sent;
              _context9.next = 6;
              return channel.assertExchange(exchange, type);

            case 6:
              contentBuffer = new Buffer(JSON.stringify(content));

              channel.publish(exchange, routingKey, contentBuffer, options);

              return _context9.abrupt('return', channel.close());

            case 11:
              _context9.prev = 11;
              _context9.t0 = _context9['catch'](0);
              throw _context9.t0;

            case 14:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this, [[0, 11]]);
    }));

    function publish(_x16, _x17) {
      return _ref13.apply(this, arguments);
    }

    return publish;
  }();

  Client.publishDirect = function () {
    var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(_ref16, options) {
      var exchange = _ref16.exchange;
      var routingKey = _ref16.routingKey;
      var content = _ref16.content;
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return this.publish({ exchange: exchange, routingKey: routingKey, content: content, type: 'direct' }, options);

            case 2:
              return _context10.abrupt('return', _context10.sent);

            case 3:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function publishDirect(_x18, _x19) {
      return _ref15.apply(this, arguments);
    }

    return publishDirect;
  }();

  Client.publishFanout = function () {
    var _ref17 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee11(_ref18, options) {
      var exchange = _ref18.exchange;
      var content = _ref18.content;
      return _regenerator2.default.wrap(function _callee11$(_context11) {
        while (1) {
          switch (_context11.prev = _context11.next) {
            case 0:
              _context11.next = 2;
              return this.publish({ exchange: exchange, content: content, type: 'fanout', routingKey: '' }, options);

            case 2:
              return _context11.abrupt('return', _context11.sent);

            case 3:
            case 'end':
              return _context11.stop();
          }
        }
      }, _callee11, this);
    }));

    function publishFanout(_x20, _x21) {
      return _ref17.apply(this, arguments);
    }

    return publishFanout;
  }();

  Client.publishTopic = function () {
    var _ref19 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee12(_ref20, options) {
      var exchange = _ref20.exchange;
      var routingKey = _ref20.routingKey;
      var content = _ref20.content;
      return _regenerator2.default.wrap(function _callee12$(_context12) {
        while (1) {
          switch (_context12.prev = _context12.next) {
            case 0:
              _context12.next = 2;
              return this.publish({ exchange: exchange, routingKey: routingKey, content: content, type: 'topic' }, options);

            case 2:
              return _context12.abrupt('return', _context12.sent);

            case 3:
            case 'end':
              return _context12.stop();
          }
        }
      }, _callee12, this);
    }));

    function publishTopic(_x22, _x23) {
      return _ref19.apply(this, arguments);
    }

    return publishTopic;
  }();

  return Client;
}();

exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGllbnQuanMiXSwibmFtZXMiOlsiY29ubmVjdGlvbiIsImNvbnN1bWVyTWlkZGxld2FyZXMiLCJDbGllbnQiLCJjb25uZWN0IiwidXJsIiwicHJvY2VzcyIsImVudiIsIkFNUVBfVVJMIiwiYW1xcHVybCIsImRpc2Nvbm5lY3QiLCJjbG9zZSIsImdldENvbnN1bWVyTWlkZGxld2FyZXMiLCJzZXRDb25zdW1lck1pZGRsZXdhcmVzIiwibWlkZGxld2FyZXMiLCJyZWdpc3RlckNvbnN1bWVyTWlkZGxld2FyZSIsImlzQXJyYXkiLCJjb25jYXQiLCJwdXNoIiwiaGFuZGxlcnMiLCJyZXN1bHRJbmplY3RvciIsInJlc3VsdCIsImZucyIsIm5leHQiLCJmbiIsInNoaWZ0IiwiY29uc3VtZSIsImhhbmRsZXIiLCJvcHRpb25zIiwiZXhjaGFuZ2UiLCJ0eXBlIiwicXVldWUiLCJyb3V0aW5nS2V5IiwiY3JlYXRlQ2hhbm5lbCIsImNoYW5uZWwiLCJhc3NlcnRFeGNoYW5nZSIsImFzc2VydFF1ZXVlIiwiYmluZFF1ZXVlIiwibWVzc2FnZSIsImNvbnRleHQiLCJjb250ZW50IiwiSlNPTiIsInBhcnNlIiwidG9TdHJpbmciLCJmaWVsZHMiLCJwcm9wZXJ0aWVzIiwiT2JqZWN0IiwiYXNzaWduIiwiY29uc3VtZURpcmVjdCIsImNvbnN1bWVGYW5vdXQiLCJjb25zdW1lVG9waWMiLCJwdWJsaXNoIiwiY29udGVudEJ1ZmZlciIsIkJ1ZmZlciIsInN0cmluZ2lmeSIsInB1Ymxpc2hEaXJlY3QiLCJwdWJsaXNoRmFub3V0IiwicHVibGlzaFRvcGljIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0E7Ozs7QUFDQTs7Ozs7O0FBRUEsSUFBSUEsY0FBYSxJQUFqQjtBQUNBLElBQUlDLHNCQUFzQixFQUExQjs7SUFFcUJDLE07Ozs7O1NBQ05DLE87O1VBQVFDLEcseURBQU1DLFFBQVFDLEdBQVIsQ0FBWUMsUTs7Ozs7OztBQUU3QkMscUIsR0FBVUos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VUFBakNDLFEsVUFBQUEsUTtVQUFVRyxVLFVBQUFBLFU7VUFBWVEsTyxVQUFBQSxPOzs7Ozs7cUJBQ3BDLEtBQUtXLE9BQUwsQ0FBYSxFQUFFdEIsa0JBQUYsRUFBWUcsc0JBQVosRUFBd0JRLGdCQUF4QixFQUFpQ1YsTUFBTSxRQUF2QyxFQUFiLEVBQWdFRixPQUFoRSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQUdGNEIsYTt1R0FBcUM1QixPO1VBQXJCQyxRLFVBQUFBLFE7VUFBVVcsTyxVQUFBQSxPOzs7Ozs7cUJBQ3hCLEtBQUtXLE9BQUwsQ0FBYSxFQUFFdEIsa0JBQUYsRUFBWVcsZ0JBQVosRUFBcUJWLE1BQU0sUUFBM0IsRUFBcUNFLFlBQVksRUFBakQsRUFBYixFQUFvRUosT0FBcEUsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FHRjZCLFk7dUdBQWdEN0IsTztVQUFqQ0MsUSxVQUFBQSxRO1VBQVVHLFUsVUFBQUEsVTtVQUFZUSxPLFVBQUFBLE87Ozs7OztxQkFDbkMsS0FBS1csT0FBTCxDQUFhLEVBQUV0QixrQkFBRixFQUFZRyxzQkFBWixFQUF3QlEsZ0JBQXhCLEVBQWlDVixNQUFNLE9BQXZDLEVBQWIsRUFBK0RGLE9BQS9ELEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQWxJSXpCLE0iLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGFtcXBsaWIgZnJvbSAnYW1xcGxpYic7XG5cbmxldCBjb25uZWN0aW9uID0gbnVsbDtcbmxldCBjb25zdW1lck1pZGRsZXdhcmVzID0gW107XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsaWVudCB7XG4gIHN0YXRpYyBhc3luYyBjb25uZWN0KHVybCA9IHByb2Nlc3MuZW52LkFNUVBfVVJMKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGFtcXB1cmwgPSB1cmwgfHwgJ2FtcXA6Ly9sb2NhbGhvc3QnO1xuICAgICAgY29ubmVjdGlvbiA9IGF3YWl0IGFtcXBsaWIuY29ubmVjdChhbXFwdXJsKTtcblxuICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNvbm5lY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNvbm5lY3Rpb247XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZGlzY29ubmVjdCgpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgY29ubmVjdGlvbi5jbG9zZSgpO1xuXG4gICAgICBjb25uZWN0aW9uID0gbnVsbDtcblxuICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGdldENvbnN1bWVyTWlkZGxld2FyZXMoKSB7XG4gICAgcmV0dXJuIGNvbnN1bWVyTWlkZGxld2FyZXM7XG4gIH1cblxuICBzdGF0aWMgc2V0Q29uc3VtZXJNaWRkbGV3YXJlcyhtaWRkbGV3YXJlcykge1xuICAgIGNvbnN1bWVyTWlkZGxld2FyZXMgPSBtaWRkbGV3YXJlcztcblxuICAgIHJldHVybiBjb25zdW1lck1pZGRsZXdhcmVzO1xuICB9XG5cbiAgc3RhdGljIHJlZ2lzdGVyQ29uc3VtZXJNaWRkbGV3YXJlKG1pZGRsZXdhcmVzKSB7XG4gICAgaWYgKF8uaXNBcnJheShtaWRkbGV3YXJlcykpIHtcbiAgICAgIGNvbnN1bWVyTWlkZGxld2FyZXMgPSBjb25zdW1lck1pZGRsZXdhcmVzLmNvbmNhdChtaWRkbGV3YXJlcyk7XG5cbiAgICAgIHJldHVybiBjb25zdW1lck1pZGRsZXdhcmVzO1xuICAgIH1cblxuICAgIGNvbnN1bWVyTWlkZGxld2FyZXMucHVzaChtaWRkbGV3YXJlcyk7XG5cbiAgICByZXR1cm4gY29uc3VtZXJNaWRkbGV3YXJlcztcbiAgfVxuXG4gIHN0YXRpYyBwcm9jZXNzKGhhbmRsZXJzKSB7XG4gICAgY29uc3QgcmVzdWx0SW5qZWN0b3IgPSBhc3luYyAocmVzdWx0KSA9PiB7XG4gICAgICBjb25zdCBmbnMgPSBoYW5kbGVycyB8fCBbXTtcbiAgICAgIGNvbnN0IG5leHQgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZuID0gZm5zLnNoaWZ0KCk7XG5cbiAgICAgICAgaWYgKCFmbikge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGF3YWl0IGZuKHJlc3VsdCwgbmV4dCk7XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4gYXdhaXQgbmV4dCgpO1xuICAgIH07XG5cbiAgICByZXR1cm4gcmVzdWx0SW5qZWN0b3I7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgY29uc3VtZSh7IGV4Y2hhbmdlLCB0eXBlLCBxdWV1ZSwgcm91dGluZ0tleSB9LCBoYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNoYW5uZWwgPSBhd2FpdCBjb25uZWN0aW9uLmNyZWF0ZUNoYW5uZWwoKTtcblxuICAgICAgYXdhaXQgY2hhbm5lbC5hc3NlcnRFeGNoYW5nZShleGNoYW5nZSwgdHlwZSk7XG4gICAgICBhd2FpdCBjaGFubmVsLmFzc2VydFF1ZXVlKHF1ZXVlKTtcbiAgICAgIGF3YWl0IGNoYW5uZWwuYmluZFF1ZXVlKHF1ZXVlLCBleGNoYW5nZSwgcm91dGluZ0tleSk7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBhd2FpdCBjaGFubmVsLmNvbnN1bWUocXVldWUsIG9wdGlvbnMpO1xuXG4gICAgICBjb25zdCBjb250ZXh0ID0ge307XG4gICAgICBjb250ZXh0LmNvbnRlbnQgPSBKU09OLnBhcnNlKG1lc3NhZ2UuY29udGVudC50b1N0cmluZygpKTtcbiAgICAgIGNvbnRleHQuZmllbGRzID0gbWVzc2FnZS5maWVsZHM7XG4gICAgICBjb250ZXh0LnByb3BlcnRpZXMgPSBtZXNzYWdlLnByb3BlcnRpZXM7XG4gICAgICBjb250ZXh0LmNoYW5uZWwgPSBjaGFubmVsO1xuXG4gICAgICBPYmplY3QuYXNzaWduKGNvbnRleHQsIHRoaXMpO1xuXG4gICAgICByZXR1cm4gdGhpcy5wcm9jZXNzKGNvbnN1bWVyTWlkZGxld2FyZXMuY29uY2F0KGhhbmRsZXIpKShjb250ZXh0KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgY29uc3VtZURpcmVjdCh7IGV4Y2hhbmdlLCBxdWV1ZSwgcm91dGluZ0tleSB9LCBoYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuY29uc3VtZSh7IGV4Y2hhbmdlLCBxdWV1ZSwgcm91dGluZ0tleSwgdHlwZTogJ2RpcmVjdCcgfSwgaGFuZGxlciwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgY29uc3VtZUZhbm91dCh7IGV4Y2hhbmdlLCBxdWV1ZSB9LCBoYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuY29uc3VtZSh7IGV4Y2hhbmdlLCBxdWV1ZSwgdHlwZTogJ2Zhbm91dCcgfSwgaGFuZGxlciwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgY29uc3VtZVRvcGljKHsgZXhjaGFuZ2UsIHF1ZXVlLCByb3V0aW5nS2V5IH0sIGhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5jb25zdW1lKHsgZXhjaGFuZ2UsIHF1ZXVlLCByb3V0aW5nS2V5LCB0eXBlOiAndG9waWMnIH0sIGhhbmRsZXIsIG9wdGlvbnMpO1xuICB9XG5cbiAgLy8gbWlzc2luZyBleGNoYW5nZSBkdXJhYmxlIG9wdGlvbnNcbiAgc3RhdGljIGFzeW5jIHB1Ymxpc2goeyBleGNoYW5nZSwgdHlwZSwgcm91dGluZ0tleSwgY29udGVudCB9LCBvcHRpb25zKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNoYW5uZWwgPSBhd2FpdCBjb25uZWN0aW9uLmNyZWF0ZUNoYW5uZWwoKTtcblxuICAgICAgYXdhaXQgY2hhbm5lbC5hc3NlcnRFeGNoYW5nZShleGNoYW5nZSwgdHlwZSk7XG5cbiAgICAgIGNvbnN0IGNvbnRlbnRCdWZmZXIgPSBuZXcgQnVmZmVyKEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpKTtcbiAgICAgIGNoYW5uZWwucHVibGlzaChleGNoYW5nZSwgcm91dGluZ0tleSwgY29udGVudEJ1ZmZlciwgb3B0aW9ucyk7XG5cbiAgICAgIHJldHVybiBjaGFubmVsLmNsb3NlKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGFzeW5jIHB1Ymxpc2hEaXJlY3QoeyBleGNoYW5nZSwgcm91dGluZ0tleSwgY29udGVudCB9LCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMucHVibGlzaCh7IGV4Y2hhbmdlLCByb3V0aW5nS2V5LCBjb250ZW50LCB0eXBlOiAnZGlyZWN0JyB9LCBvcHRpb25zKTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBwdWJsaXNoRmFub3V0KHsgZXhjaGFuZ2UsIGNvbnRlbnQgfSwgb3B0aW9ucykge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnB1Ymxpc2goeyBleGNoYW5nZSwgY29udGVudCwgdHlwZTogJ2Zhbm91dCcsIHJvdXRpbmdLZXk6ICcnIH0sIG9wdGlvbnMpO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIHB1Ymxpc2hUb3BpYyh7IGV4Y2hhbmdlLCByb3V0aW5nS2V5LCBjb250ZW50IH0sIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5wdWJsaXNoKHsgZXhjaGFuZ2UsIHJvdXRpbmdLZXksIGNvbnRlbnQsIHR5cGU6ICd0b3BpYycgfSwgb3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==