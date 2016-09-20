'use strict';

exports.__esModule = true;

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _amqplib = require('amqplib');

var _amqplib2 = _interopRequireDefault(_amqplib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _connection = null;

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

  Client.consume = function () {
    var _ref3 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref4, handler, options) {
      var exchange = _ref4.exchange;
      var type = _ref4.type;
      var queue = _ref4.queue;
      var routingKey = _ref4.routingKey;
      var channel, message, context;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              _context3.next = 3;
              return _connection.createChannel();

            case 3:
              channel = _context3.sent;
              _context3.next = 6;
              return channel.assertExchange(exchange, type);

            case 6:
              _context3.next = 8;
              return channel.assertQueue(queue);

            case 8:
              _context3.next = 10;
              return channel.bindQueue(queue, exchange, routingKey);

            case 10:
              _context3.next = 12;
              return channel.consume(queue, options);

            case 12:
              message = _context3.sent;
              context = {};

              context.body = JSON.parse(message.content.toString());
              context.fields = message.fields;
              context.properties = message.properties;

              Object.assign(context, this);

              _context3.next = 20;
              return handler(context);

            case 20:
              return _context3.abrupt('return', _context3.sent);

            case 23:
              _context3.prev = 23;
              _context3.t0 = _context3['catch'](0);
              throw _context3.t0;

            case 26:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 23]]);
    }));

    function consume(_x3, _x4, _x5) {
      return _ref3.apply(this, arguments);
    }

    return consume;
  }();

  Client.consumeDirect = function () {
    var _ref5 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref6, handler, options) {
      var exchange = _ref6.exchange;
      var queue = _ref6.queue;
      var routingKey = _ref6.routingKey;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return this.consume({ exchange: exchange, queue: queue, routingKey: routingKey, type: 'direct' }, handler, options);

            case 2:
              return _context4.abrupt('return', _context4.sent);

            case 3:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this);
    }));

    function consumeDirect(_x6, _x7, _x8) {
      return _ref5.apply(this, arguments);
    }

    return consumeDirect;
  }();

  Client.consumeFanout = function () {
    var _ref7 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee5(_ref8, handler, options) {
      var exchange = _ref8.exchange;
      var queue = _ref8.queue;
      return _regenerator2.default.wrap(function _callee5$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return this.consume({ exchange: exchange, queue: queue, type: 'fanout' }, handler, options);

            case 2:
              return _context5.abrupt('return', _context5.sent);

            case 3:
            case 'end':
              return _context5.stop();
          }
        }
      }, _callee5, this);
    }));

    function consumeFanout(_x9, _x10, _x11) {
      return _ref7.apply(this, arguments);
    }

    return consumeFanout;
  }();

  Client.consumeTopic = function () {
    var _ref9 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee6(_ref10, handler, options) {
      var exchange = _ref10.exchange;
      var queue = _ref10.queue;
      var routingKey = _ref10.routingKey;
      return _regenerator2.default.wrap(function _callee6$(_context6) {
        while (1) {
          switch (_context6.prev = _context6.next) {
            case 0:
              _context6.next = 2;
              return this.consume({ exchange: exchange, queue: queue, routingKey: routingKey, type: 'topic' }, handler, options);

            case 2:
              return _context6.abrupt('return', _context6.sent);

            case 3:
            case 'end':
              return _context6.stop();
          }
        }
      }, _callee6, this);
    }));

    function consumeTopic(_x12, _x13, _x14) {
      return _ref9.apply(this, arguments);
    }

    return consumeTopic;
  }();

  // missing exchange durable options


  Client.publish = function () {
    var _ref11 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee7(_ref12, options) {
      var exchange = _ref12.exchange;
      var type = _ref12.type;
      var routingKey = _ref12.routingKey;
      var content = _ref12.content;
      var channel, contentBuffer;
      return _regenerator2.default.wrap(function _callee7$(_context7) {
        while (1) {
          switch (_context7.prev = _context7.next) {
            case 0:
              _context7.prev = 0;
              _context7.next = 3;
              return _connection.createChannel();

            case 3:
              channel = _context7.sent;
              _context7.next = 6;
              return channel.assertExchange(exchange, type);

            case 6:
              contentBuffer = new Buffer(JSON.stringify(content));

              channel.publish(exchange, routingKey, contentBuffer, options);

              return _context7.abrupt('return', channel.close());

            case 11:
              _context7.prev = 11;
              _context7.t0 = _context7['catch'](0);
              throw _context7.t0;

            case 14:
            case 'end':
              return _context7.stop();
          }
        }
      }, _callee7, this, [[0, 11]]);
    }));

    function publish(_x15, _x16) {
      return _ref11.apply(this, arguments);
    }

    return publish;
  }();

  Client.publishDirect = function () {
    var _ref13 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee8(_ref14, options) {
      var exchange = _ref14.exchange;
      var routingKey = _ref14.routingKey;
      var content = _ref14.content;
      return _regenerator2.default.wrap(function _callee8$(_context8) {
        while (1) {
          switch (_context8.prev = _context8.next) {
            case 0:
              _context8.next = 2;
              return this.publish({ exchange: exchange, routingKey: routingKey, content: content, type: 'direct' }, options);

            case 2:
              return _context8.abrupt('return', _context8.sent);

            case 3:
            case 'end':
              return _context8.stop();
          }
        }
      }, _callee8, this);
    }));

    function publishDirect(_x17, _x18) {
      return _ref13.apply(this, arguments);
    }

    return publishDirect;
  }();

  Client.publishFanout = function () {
    var _ref15 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee9(_ref16, options) {
      var exchange = _ref16.exchange;
      var content = _ref16.content;
      return _regenerator2.default.wrap(function _callee9$(_context9) {
        while (1) {
          switch (_context9.prev = _context9.next) {
            case 0:
              _context9.next = 2;
              return this.publish({ exchange: exchange, content: content, type: 'fanout', routingKey: '' }, options);

            case 2:
              return _context9.abrupt('return', _context9.sent);

            case 3:
            case 'end':
              return _context9.stop();
          }
        }
      }, _callee9, this);
    }));

    function publishFanout(_x19, _x20) {
      return _ref15.apply(this, arguments);
    }

    return publishFanout;
  }();

  Client.publishTopic = function () {
    var _ref17 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee10(_ref18, options) {
      var exchange = _ref18.exchange;
      var routingKey = _ref18.routingKey;
      var content = _ref18.content;
      return _regenerator2.default.wrap(function _callee10$(_context10) {
        while (1) {
          switch (_context10.prev = _context10.next) {
            case 0:
              _context10.next = 2;
              return this.publish({ exchange: exchange, routingKey: routingKey, content: content, type: 'topic' }, options);

            case 2:
              return _context10.abrupt('return', _context10.sent);

            case 3:
            case 'end':
              return _context10.stop();
          }
        }
      }, _callee10, this);
    }));

    function publishTopic(_x21, _x22) {
      return _ref17.apply(this, arguments);
    }

    return publishTopic;
  }();

  return Client;
}();

exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGllbnQuanMiXSwibmFtZXMiOlsiY29ubmVjdGlvbiIsIkNsaWVudCIsImNvbm5lY3QiLCJ1cmwiLCJwcm9jZXNzIiwiZW52IiwiQU1RUF9VUkwiLCJhbXFwdXJsIiwiZGlzY29ubmVjdCIsImNsb3NlIiwiY29uc3VtZSIsImhhbmRsZXIiLCJvcHRpb25zIiwiZXhjaGFuZ2UiLCJ0eXBlIiwicXVldWUiLCJyb3V0aW5nS2V5IiwiY3JlYXRlQ2hhbm5lbCIsImNoYW5uZWwiLCJhc3NlcnRFeGNoYW5nZSIsImFzc2VydFF1ZXVlIiwiYmluZFF1ZXVlIiwibWVzc2FnZSIsImNvbnRleHQiLCJib2R5IiwiSlNPTiIsInBhcnNlIiwiY29udGVudCIsInRvU3RyaW5nIiwiZmllbGRzIiwicHJvcGVydGllcyIsIk9iamVjdCIsImFzc2lnbiIsImNvbnN1bWVEaXJlY3QiLCJjb25zdW1lRmFub3V0IiwiY29uc3VtZVRvcGljIiwicHVibGlzaCIsImNvbnRlbnRCdWZmZXIiLCJCdWZmZXIiLCJzdHJpbmdpZnkiLCJwdWJsaXNoRGlyZWN0IiwicHVibGlzaEZhbm91dCIsInB1Ymxpc2hUb3BpYyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7Ozs7QUFFQSxJQUFJQSxjQUFhLElBQWpCOztJQUVxQkMsTTs7Ozs7U0FDTkMsTzs7VUFBUUMsRyx5REFBTUMsUUFBUUMsR0FBUixDQUFZQyxROzs7Ozs7O0FBRTdCQyxxQixHQUFVSixPQUFPLGtCOztxQkFDSixrQkFBUUQsT0FBUixDQUFnQkssT0FBaEIsQzs7O0FBQW5CUCx5QjsrQ0FFT0EsVzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQU1KQSxVLHlCQUFhO0FBQ2xCLFdBQU9BLFdBQVA7QUFDRCxHOztTQUVZUSxVOzs7Ozs7OztxQkFFSFIsWUFBV1MsS0FBWCxFOzs7O0FBRU5ULDRCQUFhLElBQWI7O2dEQUVPQSxXOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBTUVVLE87b0dBQStDQyxPLEVB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LEtBQUtTLE9BQUwsQ0FBYSxFQUFFdkIsa0JBQUYsRUFBWWMsZ0JBQVosRUFBcUJiLE1BQU0sUUFBM0IsRUFBcUNFLFlBQVksRUFBakQsRUFBYixFQUFvRUosT0FBcEUsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FHRjhCLFk7dUdBQWdEOUIsTztVQUFqQ0MsUSxVQUFBQSxRO1VBQVVHLFUsVUFBQUEsVTtVQUFZVyxPLFVBQUFBLE87Ozs7OztxQkFDbkMsS0FBS1MsT0FBTCxDQUFhLEVBQUV2QixrQkFBRixFQUFZRyxzQkFBWixFQUF3QlcsZ0JBQXhCLEVBQWlDYixNQUFNLE9BQXZDLEVBQWIsRUFBK0RGLE9BQS9ELEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQXhGSVgsTSIsImZpbGUiOiJjbGllbnQuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcbmltcG9ydCBhbXFwbGliIGZyb20gJ2FtcXBsaWInO1xuXG5sZXQgY29ubmVjdGlvbiA9IG51bGw7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIENsaWVudCB7XG4gIHN0YXRpYyBhc3luYyBjb25uZWN0KHVybCA9IHByb2Nlc3MuZW52LkFNUVBfVVJMKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGFtcXB1cmwgPSB1cmwgfHwgJ2FtcXA6Ly9sb2NhbGhvc3QnO1xuICAgICAgY29ubmVjdGlvbiA9IGF3YWl0IGFtcXBsaWIuY29ubmVjdChhbXFwdXJsKTtcblxuICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGNvbm5lY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNvbm5lY3Rpb247XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgZGlzY29ubmVjdCgpIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgY29ubmVjdGlvbi5jbG9zZSgpO1xuXG4gICAgICBjb25uZWN0aW9uID0gbnVsbDtcblxuICAgICAgcmV0dXJuIGNvbm5lY3Rpb247XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGFzeW5jIGNvbnN1bWUoeyBleGNoYW5nZSwgdHlwZSwgcXVldWUsIHJvdXRpbmdLZXkgfSwgaGFuZGxlciwgb3B0aW9ucykge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjaGFubmVsID0gYXdhaXQgY29ubmVjdGlvbi5jcmVhdGVDaGFubmVsKCk7XG5cbiAgICAgIGF3YWl0IGNoYW5uZWwuYXNzZXJ0RXhjaGFuZ2UoZXhjaGFuZ2UsIHR5cGUpO1xuICAgICAgYXdhaXQgY2hhbm5lbC5hc3NlcnRRdWV1ZShxdWV1ZSk7XG4gICAgICBhd2FpdCBjaGFubmVsLmJpbmRRdWV1ZShxdWV1ZSwgZXhjaGFuZ2UsIHJvdXRpbmdLZXkpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlID0gYXdhaXQgY2hhbm5lbC5jb25zdW1lKHF1ZXVlLCBvcHRpb25zKTtcblxuICAgICAgY29uc3QgY29udGV4dCA9IHt9O1xuICAgICAgY29udGV4dC5ib2R5ID0gSlNPTi5wYXJzZShtZXNzYWdlLmNvbnRlbnQudG9TdHJpbmcoKSk7XG4gICAgICBjb250ZXh0LmZpZWxkcyA9IG1lc3NhZ2UuZmllbGRzO1xuICAgICAgY29udGV4dC5wcm9wZXJ0aWVzID0gbWVzc2FnZS5wcm9wZXJ0aWVzO1xuXG4gICAgICBPYmplY3QuYXNzaWduKGNvbnRleHQsIHRoaXMpO1xuXG4gICAgICByZXR1cm4gYXdhaXQgaGFuZGxlcihjb250ZXh0KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgY29uc3VtZURpcmVjdCh7IGV4Y2hhbmdlLCBxdWV1ZSwgcm91dGluZ0tleSB9LCBoYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuY29uc3VtZSh7IGV4Y2hhbmdlLCBxdWV1ZSwgcm91dGluZ0tleSwgdHlwZTogJ2RpcmVjdCcgfSwgaGFuZGxlciwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgY29uc3VtZUZhbm91dCh7IGV4Y2hhbmdlLCBxdWV1ZSB9LCBoYW5kbGVyLCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMuY29uc3VtZSh7IGV4Y2hhbmdlLCBxdWV1ZSwgdHlwZTogJ2Zhbm91dCcgfSwgaGFuZGxlciwgb3B0aW9ucyk7XG4gIH1cblxuICBzdGF0aWMgYXN5bmMgY29uc3VtZVRvcGljKHsgZXhjaGFuZ2UsIHF1ZXVlLCByb3V0aW5nS2V5IH0sIGhhbmRsZXIsIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5jb25zdW1lKHsgZXhjaGFuZ2UsIHF1ZXVlLCByb3V0aW5nS2V5LCB0eXBlOiAndG9waWMnIH0sIGhhbmRsZXIsIG9wdGlvbnMpO1xuICB9XG5cbiAgLy8gbWlzc2luZyBleGNoYW5nZSBkdXJhYmxlIG9wdGlvbnNcbiAgc3RhdGljIGFzeW5jIHB1Ymxpc2goeyBleGNoYW5nZSwgdHlwZSwgcm91dGluZ0tleSwgY29udGVudCB9LCBvcHRpb25zKSB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNoYW5uZWwgPSBhd2FpdCBjb25uZWN0aW9uLmNyZWF0ZUNoYW5uZWwoKTtcblxuICAgICAgYXdhaXQgY2hhbm5lbC5hc3NlcnRFeGNoYW5nZShleGNoYW5nZSwgdHlwZSk7XG5cbiAgICAgIGNvbnN0IGNvbnRlbnRCdWZmZXIgPSBuZXcgQnVmZmVyKEpTT04uc3RyaW5naWZ5KGNvbnRlbnQpKTtcbiAgICAgIGNoYW5uZWwucHVibGlzaChleGNoYW5nZSwgcm91dGluZ0tleSwgY29udGVudEJ1ZmZlciwgb3B0aW9ucyk7XG5cbiAgICAgIHJldHVybiBjaGFubmVsLmNsb3NlKCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICB9XG5cbiAgc3RhdGljIGFzeW5jIHB1Ymxpc2hEaXJlY3QoeyBleGNoYW5nZSwgcm91dGluZ0tleSwgY29udGVudCB9LCBvcHRpb25zKSB7XG4gICAgcmV0dXJuIGF3YWl0IHRoaXMucHVibGlzaCh7IGV4Y2hhbmdlLCByb3V0aW5nS2V5LCBjb250ZW50LCB0eXBlOiAnZGlyZWN0JyB9LCBvcHRpb25zKTtcbiAgfVxuXG4gIHN0YXRpYyBhc3luYyBwdWJsaXNoRmFub3V0KHsgZXhjaGFuZ2UsIGNvbnRlbnQgfSwgb3B0aW9ucykge1xuICAgIHJldHVybiBhd2FpdCB0aGlzLnB1Ymxpc2goeyBleGNoYW5nZSwgY29udGVudCwgdHlwZTogJ2Zhbm91dCcsIHJvdXRpbmdLZXk6ICcnIH0sIG9wdGlvbnMpO1xuICB9XG5cbiAgc3RhdGljIGFzeW5jIHB1Ymxpc2hUb3BpYyh7IGV4Y2hhbmdlLCByb3V0aW5nS2V5LCBjb250ZW50IH0sIG9wdGlvbnMpIHtcbiAgICByZXR1cm4gYXdhaXQgdGhpcy5wdWJsaXNoKHsgZXhjaGFuZ2UsIHJvdXRpbmdLZXksIGNvbnRlbnQsIHR5cGU6ICd0b3BpYycgfSwgb3B0aW9ucyk7XG4gIH1cbn1cbiJdfQ==