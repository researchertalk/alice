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

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _amqplib = require('amqplib');

var _amqplib2 = _interopRequireDefault(_amqplib);

var _momentTimezone = require('moment-timezone');

var _momentTimezone2 = _interopRequireDefault(_momentTimezone);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_momentTimezone2.default.tz.setDefault(process.env.TIMEZONE || 'Asia/Jakarta');

/**
 * Class representing amqp client
 */

var Client = function () {

  /**
   * Constructor
   * @param {string} url - AMQP url (e.g amqp://url)
   */
  function Client() {
    var url = arguments.length <= 0 || arguments[0] === undefined ? process.env.AMQP_URL : arguments[0];
    (0, _classCallCheck3.default)(this, Client);

    var amqpUrl = url || 'amqp://localhost';
    this.connection = _amqplib2.default.connect(amqpUrl);
  }

  /**
   * Payload wrapper
   * @param {string} options.qId - Auto generated queue id (using uuid version 4).
   * @param {string} options.queue - Queue name.
   * @param {string} options.payload - Message payload.
   * @return {object} - Wrapped payload with qId and timestamp.
   */


  Client.prototype.wrapper = function wrapper(_ref) {
    var qId = _ref.qId;
    var queue = _ref.queue;
    var payload = _ref.payload;

    return {
      qId: qId,
      queue: queue,
      data: payload,
      sentAt: _momentTimezone2.default.now(),
      timezone: _momentTimezone2.default.defaultZone
    };
  };

  /**
   * Produce direct exchange.
   * @param {string} options.qId - Auto generated queue id (using uuid version 4).
   * @param {queue} options.queue - Queue name.
   * @param {payload} options.payload - Message payload.
   * @return {boolean} Acknowledgement status.
   */


  Client.prototype.produceDirectExchange = function () {
    var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref3) {
      var qId = _ref3.qId;
      var queue = _ref3.queue;
      var payload = _ref3.payload;
      var client, channel, queueName, wrapped, buffer, ack;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return this.connection;

            case 3:
              client = _context.sent;
              _context.next = 6;
              return client.createChannel();

            case 6:
              channel = _context.sent;
              queueName = queue + _lodash2.default.isEmpty(qId) ? '' : '.' + qId;
              _context.next = 10;
              return channel.assertQueue(queueName);

            case 10:
              wrapped = JSON.stringify(this.wrapper({ qId: qId, queue: queue, payload: payload }));
              buffer = new Buffer(wrapped);
              _context.next = 14;
              return channel.sendToQueue(queueName, buffer);

            case 14:
              ack = _context.sent;
              return _context.abrupt('return', ack);

            case 18:
              _context.prev = 18;
              _context.t0 = _context['catch'](0);
              return _context.abrupt('return', _context.t0);

            case 21:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[0, 18]]);
    }));

    function produceDirectExchange(_x2) {
      return _ref2.apply(this, arguments);
    }

    return produceDirectExchange;
  }();

  /**
   * Consumer direct exchange
   * @param {string} options.qId - Auto generated queue id (using uuid version 4).
   * @param {queue} options.queue - Queue name.
   * @return {object} Message payload with parsed content.
   */


  Client.prototype.consumeDirectExchange = function () {
    var _ref4 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(_ref5) {
      var qId = _ref5.qId;
      var queue = _ref5.queue;
      var client, channel, queueName, message;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              _context2.next = 3;
              return this.connection;

            case 3:
              client = _context2.sent;
              _context2.next = 6;
              return client.createChannel();

            case 6:
              channel = _context2.sent;
              queueName = queue + (_lodash2.default.isEmpty(qId) ? '' : '.' + qId);
              _context2.next = 10;
              return channel.assertQueue(queueName);

            case 10:
              _context2.next = 12;
              return channel.consume(queueName);

            case 12:
              message = _context2.sent;

              // NOTICEME: Should we do this?
              message.content = JSON.parse(message.content.toString());

              return _context2.abrupt('return', message);

            case 17:
              _context2.prev = 17;
              _context2.t0 = _context2['catch'](0);
              return _context2.abrupt('return', _context2.t0);

            case 20:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, this, [[0, 17]]);
    }));

    function consumeDirectExchange(_x3) {
      return _ref4.apply(this, arguments);
    }

    return consumeDirectExchange;
  }();

  // FIXME: should have better semantic
  /**
   * Dynamic producer binding. Produce message and wait for the response binding.
   * @param {queue} options.queue - Queue name.
   * @param {payload} options.payload - Message payload.
   * @return {object} Message payload with parsed content.
   */


  Client.prototype.dynamicProducerBinding = function () {
    var _ref6 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee3(_ref7) {
      var queue = _ref7.queue;
      var payload = _ref7.payload;
      var qId, message;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              qId = _uuid2.default.v4();
              // FIXME: should we wait or dispatch immediately without acknowledgement?

              this.produceDirectExchange({ qId: qId, queue: queue, payload: payload });
              _context3.next = 5;
              return this.consumeDirectExchange({ qId: qId, queue: queue });

            case 5:
              message = _context3.sent;
              return _context3.abrupt('return', message);

            case 9:
              _context3.prev = 9;
              _context3.t0 = _context3['catch'](0);
              return _context3.abrupt('return', _context3.t0);

            case 12:
            case 'end':
              return _context3.stop();
          }
        }
      }, _callee3, this, [[0, 9]]);
    }));

    function dynamicProducerBinding(_x4) {
      return _ref6.apply(this, arguments);
    }

    return dynamicProducerBinding;
  }();

  // FIXME: should have better semantic
  /**
   * Dynamic consumer binding. It is like tradionation http route binding.
   * @param {queue} options.queue - Queue name.
   * @param {payload} options.payload - Message payload.
   * @param {function} options.fn - Payload producer function. Must return promise.
   * @return {boolean} Acknowledgement status
   */


  Client.prototype.dynamicConsumerBinding = function () {
    var _ref8 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee4(_ref9) {
      var queue = _ref9.queue;
      var payload = _ref9.payload;
      var fn = _ref9.fn;
      var message, data, ack;
      return _regenerator2.default.wrap(function _callee4$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.prev = 0;
              _context4.next = 3;
              return this.consumeDirectExchange({ queue: queue });

            case 3:
              message = _context4.sent;
              data = payload;

              if (!_lodash2.default.isFunction(fn)) {
                _context4.next = 9;
                break;
              }

              _context4.next = 8;
              return fn(message);

            case 8:
              data = _context4.sent;

            case 9:
              _context4.next = 11;
              return this.produceDirectExchange({
                queue: queue,
                payload: data,
                qId: message.content.qId
              });

            case 11:
              ack = _context4.sent;
              return _context4.abrupt('return', ack);

            case 15:
              _context4.prev = 15;
              _context4.t0 = _context4['catch'](0);
              return _context4.abrupt('return', _context4.t0);

            case 18:
            case 'end':
              return _context4.stop();
          }
        }
      }, _callee4, this, [[0, 15]]);
    }));

    function dynamicConsumerBinding(_x5) {
      return _ref8.apply(this, arguments);
    }

    return dynamicConsumerBinding;
  }();

  return Client;
}();

exports.default = Client;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9jbGllbnQuanMiXSwibmFtZXMiOlsidHoiLCJzZXREZWZhdWx0IiwicHJvY2VzcyIsImVudiIsIlRJTUVaT05FIiwiQ2xpZW50IiwidXJsIiwiQU1RUF9VUkwiLCJhbXFwVXJsIiwiY29ubmVjdGlvbiIsImNvbm5lY3QiLCJ3cmFwcGVyIiwicUlkIiwicXVldWUiLCJwYXlsb2FkIiwiZGF0YSIsInNlbnRBdCIsIm5vdyIsInRpbWV6b25lIiwiZGVmYXVsdFpvbmUiLCJwcm9kdWNlRGlyZWN0RXhjaGFuZ2UiLCJjbGllbnQiLCJjcmVhdGVDaGFubmVsIiwiY2hhbm5lbCIsInF1ZXVlTmFtZSIsImlzRW1wdHkiLCJhc3NlcnRRdWV1ZSIsIndyYXBwZWQiLCJKU09OIiwic3RyaW5naWZ5IiwiYnVmZmVyIiwiQnVmZmVyIiwic2VuZFRvUXVldWUiLCJhY2siLCJjb25zdW1lRGlyZWN0RXhjaGFuZ2UiLCJjb25zdW1lIiwibWVzc2FnZSIsImNvbnRlbnQiLCJwYXJzZSIsInRvU3RyaW5nIiwiZHluYW1pY1Byb2R1Y2VyQmluZGluZyIsInY0IiwiZHluYW1pY0NvbnN1bWVyQmluZGluZyIsImZuIiwiaXNGdW5jdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUNBOzs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7Ozs7QUFFQSx5QkFBT0EsRUFBUCxDQUFVQyxVQUFWLENBQXFCQyxRQUFRQyxHQUFSLENBQVlDLFFBQVosSUFBd0IsY0FBN0M7O0FBRUE7Ozs7SUFHcUJDLE07O0FBRW5COzs7O0FBSUEsb0JBQXdDO0FBQUEsUUFBNUJDLEdBQTRCLHlEQUF0QkosUUFBUUMsR0FBUixDQUFZSSxRQUFVO0FBQUE7O0FBQ3RDLFFBQU1DLFVBQVVGLE9BQU8sa0JBQXZCO0FBQ0EsU0FBS0csVUFBTCxHQUFrQixrQkFBUUMsT0FBUixDQUFnQkYsT0FBaEIsQ0FBbEI7QUFDRDs7QUFFRDs7Ozs7Ozs7O21CQU9BRyxPLDBCQUFpQztBQUFBLFFBQXZCQyxHQUF1QixRQUF2QkEsR0FBdUI7QUFBQSxRQUFsQkMsS0FBa0IsUUFBbEJBLEtBQWtCO0FBQUEsUUFBWEMsT0FBVyxRQUFYQSxPQUFXOztBQUMvQixXQUFPO0FBQ0xGLGNBREs7QUFFTEMsa0JBRks7QUFHTEUsWUFBTUQsT0FIRDtBQUlMRSxjQUFRLHlCQUFPQyxHQUFQLEVBSkg7QUFLTEMsZ0JBQVUseUJBQU9DO0FBTFosS0FBUDtBQU9ELEc7O0FBRUQ7Ozs7Ozs7OzttQkFPTUMscUI7O1VBQXdCUixHLFNBQUFBLEc7VUFBS0MsSyxTQUFBQSxLO1VBQU9DLE8sU0FBQUEsTzs7Ozs7Ozs7cUJBRWpCLEtBQUtMLFU7OztBQUFwQlksb0I7O3FCQUNnQkEsT0FBT0MsYUFBUCxFOzs7QUFBaEJDLHFCO0FBQ0FDLHVCLEdBQVlYLFFBQVEsaUJBQUVZLE9BQUYsQ0FBVWIsR0FBVixDQUFSLEdBQXlCLEVBQXpCLFNBQWtDQSxHOztxQkFFOUNXLFFBQVFHLFdBQVIsQ0FBb0JGLFNBQXBCLEM7OztBQUVBRyxxQixHQUFVQyxLQUFLQyxTQUFMLENBQWUsS0FBS2xCLE9BQUwsQ0FBYSxFQUFFQyxRQUFGLEVBQU9DLFlBQVAsRUFBY0MsZ0JBQWQsRUFBYixDQUFmLEM7QUFDVmdCLG9CLEdBQVMsSUFBSUMsTUFBSixDQUFXSixPQUFYLEM7O3FCQUNHSixRQUFRUyxXQUFSLENBQW9CUixTQUFwQixFQUErQk0sTUFBL0IsQzs7O0FBQVpHLGlCOytDQUVDQSxHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTVg7Ozs7Ozs7O21CQU1NQyxxQjs7VUFBd0J0QixHLFNBQUFBLEc7VUFBS0MsSyxTQUFBQSxLOzs7Ozs7OztxQkFFVixLQUFLSixVOzs7QUFBcEJZLG9COztxQkFDZ0JBLE9BQU9DLGFBQVAsRTs7O0FBQWhCQyxxQjtBQUNBQyx1QixHQUFZWCxTQUFTLGlCQUFFWSxPQUFGLENBQVViLEdBQVYsSUFBaUIsRUFBakIsU0FBMEJBLEdBQW5DLEM7O3FCQUVaVyxRQUFRRyxXQUFSLENBQW9CRixTQUFwQixDOzs7O3FCQUVnQkQsUUFBUVksT0FBUixDQUFnQlgsU0FBaEIsQzs7O0FBQWhCWSxxQjs7QUFDTjtBQUNBQSxzQkFBUUMsT0FBUixHQUFrQlQsS0FBS1UsS0FBTCxDQUFXRixRQUFRQyxPQUFSLENBQWdCRSxRQUFoQixFQUFYLENBQWxCOztnREFFT0gsTzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQU1YO0FBQ0E7Ozs7Ozs7O21CQU1NSSxzQjs7VUFBeUIzQixLLFNBQUFBLEs7VUFBT0MsTyxTQUFBQSxPOzs7Ozs7O0FBRTVCRixpQixHQUFNLGVBQUs2QixFQUFMLEU7QUFDWjs7QUFDQSxtQkFBS3JCLHFCQUFMLENBQTJCLEVBQUVSLFFBQUYsRUFBT0MsWUFBUCxFQUFjQyxnQkFBZCxFQUEzQjs7cUJBQ3NCLEtBQUtvQixxQkFBTCxDQUEyQixFQUFFdEIsUUFBRixFQUFPQyxZQUFQLEVBQTNCLEM7OztBQUFoQnVCLHFCO2dEQUVDQSxPOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBTVg7QUFDQTs7Ozs7Ozs7O21CQU9NTSxzQjs7VUFBeUI3QixLLFNBQUFBLEs7VUFBT0MsTyxTQUFBQSxPO1VBQVM2QixFLFNBQUFBLEU7Ozs7Ozs7O3FCQUVyQixLQUFLVCxxQkFBTCxDQUEyQixFQUFFckIsWUFBRixFQUEzQixDOzs7QUFBaEJ1QixxQjtBQUVGckIsa0IsR0FBT0QsTzs7bUJBQ1AsaUJBQUU4QixVQUFGLENBQWFELEVBQWIsQzs7Ozs7O3FCQUNXQSxHQUFHUCxPQUFILEM7OztBQUFickIsa0I7Ozs7cUJBR2dCLEtBQUtLLHFCQUFMLENBQTJCO0FBQzNDUCw0QkFEMkM7QUFFM0NDLHlCQUFTQyxJQUZrQztBQUczQ0gscUJBQUt3QixRQUFRQyxPQUFSLENBQWdCekI7QUFIc0IsZUFBM0IsQzs7O0FBQVpxQixpQjtnREFNQ0EsRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztrQkF4SFE1QixNIiwiZmlsZSI6ImNsaWVudC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB1dWlkIGZyb20gJ3V1aWQnO1xuaW1wb3J0IGFtcXBsaWIgZnJvbSAnYW1xcGxpYic7XG5pbXBvcnQgbW9tZW50IGZyb20gJ21vbWVudC10aW1lem9uZSc7XG5cbm1vbWVudC50ei5zZXREZWZhdWx0KHByb2Nlc3MuZW52LlRJTUVaT05FIHx8ICdBc2lhL0pha2FydGEnKTtcblxuLyoqXG4gKiBDbGFzcyByZXByZXNlbnRpbmcgYW1xcCBjbGllbnRcbiAqL1xuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQ2xpZW50IHtcblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICogQHBhcmFtIHtzdHJpbmd9IHVybCAtIEFNUVAgdXJsIChlLmcgYW1xcDovL3VybClcbiAgICovXG4gIGNvbnN0cnVjdG9yKHVybCA9IHByb2Nlc3MuZW52LkFNUVBfVVJMKSB7XG4gICAgY29uc3QgYW1xcFVybCA9IHVybCB8fCAnYW1xcDovL2xvY2FsaG9zdCc7XG4gICAgdGhpcy5jb25uZWN0aW9uID0gYW1xcGxpYi5jb25uZWN0KGFtcXBVcmwpO1xuICB9XG5cbiAgLyoqXG4gICAqIFBheWxvYWQgd3JhcHBlclxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5xSWQgLSBBdXRvIGdlbmVyYXRlZCBxdWV1ZSBpZCAodXNpbmcgdXVpZCB2ZXJzaW9uIDQpLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0aW9ucy5xdWV1ZSAtIFF1ZXVlIG5hbWUuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnBheWxvYWQgLSBNZXNzYWdlIHBheWxvYWQuXG4gICAqIEByZXR1cm4ge29iamVjdH0gLSBXcmFwcGVkIHBheWxvYWQgd2l0aCBxSWQgYW5kIHRpbWVzdGFtcC5cbiAgICovXG4gIHdyYXBwZXIoeyBxSWQsIHF1ZXVlLCBwYXlsb2FkIH0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcUlkLFxuICAgICAgcXVldWUsXG4gICAgICBkYXRhOiBwYXlsb2FkLFxuICAgICAgc2VudEF0OiBtb21lbnQubm93KCksXG4gICAgICB0aW1lem9uZTogbW9tZW50LmRlZmF1bHRab25lLFxuICAgIH07XG4gIH1cblxuICAvKipcbiAgICogUHJvZHVjZSBkaXJlY3QgZXhjaGFuZ2UuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRpb25zLnFJZCAtIEF1dG8gZ2VuZXJhdGVkIHF1ZXVlIGlkICh1c2luZyB1dWlkIHZlcnNpb24gNCkuXG4gICAqIEBwYXJhbSB7cXVldWV9IG9wdGlvbnMucXVldWUgLSBRdWV1ZSBuYW1lLlxuICAgKiBAcGFyYW0ge3BheWxvYWR9IG9wdGlvbnMucGF5bG9hZCAtIE1lc3NhZ2UgcGF5bG9hZC5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gQWNrbm93bGVkZ2VtZW50IHN0YXR1cy5cbiAgICovXG4gIGFzeW5jIHByb2R1Y2VEaXJlY3RFeGNoYW5nZSh7IHFJZCwgcXVldWUsIHBheWxvYWQgfSkge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjbGllbnQgPSBhd2FpdCB0aGlzLmNvbm5lY3Rpb247XG4gICAgICBjb25zdCBjaGFubmVsID0gYXdhaXQgY2xpZW50LmNyZWF0ZUNoYW5uZWwoKTtcbiAgICAgIGNvbnN0IHF1ZXVlTmFtZSA9IHF1ZXVlICsgXy5pc0VtcHR5KHFJZCkgPyAnJyA6IGAuJHtxSWR9YDtcblxuICAgICAgYXdhaXQgY2hhbm5lbC5hc3NlcnRRdWV1ZShxdWV1ZU5hbWUpO1xuXG4gICAgICBjb25zdCB3cmFwcGVkID0gSlNPTi5zdHJpbmdpZnkodGhpcy53cmFwcGVyKHsgcUlkLCBxdWV1ZSwgcGF5bG9hZCB9KSk7XG4gICAgICBjb25zdCBidWZmZXIgPSBuZXcgQnVmZmVyKHdyYXBwZWQpO1xuICAgICAgY29uc3QgYWNrID0gYXdhaXQgY2hhbm5lbC5zZW5kVG9RdWV1ZShxdWV1ZU5hbWUsIGJ1ZmZlcik7XG5cbiAgICAgIHJldHVybiBhY2s7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gZXJyO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDb25zdW1lciBkaXJlY3QgZXhjaGFuZ2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdGlvbnMucUlkIC0gQXV0byBnZW5lcmF0ZWQgcXVldWUgaWQgKHVzaW5nIHV1aWQgdmVyc2lvbiA0KS5cbiAgICogQHBhcmFtIHtxdWV1ZX0gb3B0aW9ucy5xdWV1ZSAtIFF1ZXVlIG5hbWUuXG4gICAqIEByZXR1cm4ge29iamVjdH0gTWVzc2FnZSBwYXlsb2FkIHdpdGggcGFyc2VkIGNvbnRlbnQuXG4gICAqL1xuICBhc3luYyBjb25zdW1lRGlyZWN0RXhjaGFuZ2UoeyBxSWQsIHF1ZXVlIH0pIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgY2xpZW50ID0gYXdhaXQgdGhpcy5jb25uZWN0aW9uO1xuICAgICAgY29uc3QgY2hhbm5lbCA9IGF3YWl0IGNsaWVudC5jcmVhdGVDaGFubmVsKCk7XG4gICAgICBjb25zdCBxdWV1ZU5hbWUgPSBxdWV1ZSArIChfLmlzRW1wdHkocUlkKSA/ICcnIDogYC4ke3FJZH1gKTtcblxuICAgICAgYXdhaXQgY2hhbm5lbC5hc3NlcnRRdWV1ZShxdWV1ZU5hbWUpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlID0gYXdhaXQgY2hhbm5lbC5jb25zdW1lKHF1ZXVlTmFtZSk7XG4gICAgICAvLyBOT1RJQ0VNRTogU2hvdWxkIHdlIGRvIHRoaXM/XG4gICAgICBtZXNzYWdlLmNvbnRlbnQgPSBKU09OLnBhcnNlKG1lc3NhZ2UuY29udGVudC50b1N0cmluZygpKTtcblxuICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gZXJyO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZJWE1FOiBzaG91bGQgaGF2ZSBiZXR0ZXIgc2VtYW50aWNcbiAgLyoqXG4gICAqIER5bmFtaWMgcHJvZHVjZXIgYmluZGluZy4gUHJvZHVjZSBtZXNzYWdlIGFuZCB3YWl0IGZvciB0aGUgcmVzcG9uc2UgYmluZGluZy5cbiAgICogQHBhcmFtIHtxdWV1ZX0gb3B0aW9ucy5xdWV1ZSAtIFF1ZXVlIG5hbWUuXG4gICAqIEBwYXJhbSB7cGF5bG9hZH0gb3B0aW9ucy5wYXlsb2FkIC0gTWVzc2FnZSBwYXlsb2FkLlxuICAgKiBAcmV0dXJuIHtvYmplY3R9IE1lc3NhZ2UgcGF5bG9hZCB3aXRoIHBhcnNlZCBjb250ZW50LlxuICAgKi9cbiAgYXN5bmMgZHluYW1pY1Byb2R1Y2VyQmluZGluZyh7IHF1ZXVlLCBwYXlsb2FkIH0pIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgcUlkID0gdXVpZC52NCgpO1xuICAgICAgLy8gRklYTUU6IHNob3VsZCB3ZSB3YWl0IG9yIGRpc3BhdGNoIGltbWVkaWF0ZWx5IHdpdGhvdXQgYWNrbm93bGVkZ2VtZW50P1xuICAgICAgdGhpcy5wcm9kdWNlRGlyZWN0RXhjaGFuZ2UoeyBxSWQsIHF1ZXVlLCBwYXlsb2FkIH0pO1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IHRoaXMuY29uc3VtZURpcmVjdEV4Y2hhbmdlKHsgcUlkLCBxdWV1ZSB9KTtcblxuICAgICAgcmV0dXJuIG1lc3NhZ2U7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gZXJyO1xuICAgIH1cbiAgfVxuXG4gIC8vIEZJWE1FOiBzaG91bGQgaGF2ZSBiZXR0ZXIgc2VtYW50aWNcbiAgLyoqXG4gICAqIER5bmFtaWMgY29uc3VtZXIgYmluZGluZy4gSXQgaXMgbGlrZSB0cmFkaW9uYXRpb24gaHR0cCByb3V0ZSBiaW5kaW5nLlxuICAgKiBAcGFyYW0ge3F1ZXVlfSBvcHRpb25zLnF1ZXVlIC0gUXVldWUgbmFtZS5cbiAgICogQHBhcmFtIHtwYXlsb2FkfSBvcHRpb25zLnBheWxvYWQgLSBNZXNzYWdlIHBheWxvYWQuXG4gICAqIEBwYXJhbSB7ZnVuY3Rpb259IG9wdGlvbnMuZm4gLSBQYXlsb2FkIHByb2R1Y2VyIGZ1bmN0aW9uLiBNdXN0IHJldHVybiBwcm9taXNlLlxuICAgKiBAcmV0dXJuIHtib29sZWFufSBBY2tub3dsZWRnZW1lbnQgc3RhdHVzXG4gICAqL1xuICBhc3luYyBkeW5hbWljQ29uc3VtZXJCaW5kaW5nKHsgcXVldWUsIHBheWxvYWQsIGZuIH0pIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IHRoaXMuY29uc3VtZURpcmVjdEV4Y2hhbmdlKHsgcXVldWUgfSk7XG5cbiAgICAgIGxldCBkYXRhID0gcGF5bG9hZDtcbiAgICAgIGlmIChfLmlzRnVuY3Rpb24oZm4pKSB7XG4gICAgICAgIGRhdGEgPSBhd2FpdCBmbihtZXNzYWdlKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYWNrID0gYXdhaXQgdGhpcy5wcm9kdWNlRGlyZWN0RXhjaGFuZ2Uoe1xuICAgICAgICBxdWV1ZSxcbiAgICAgICAgcGF5bG9hZDogZGF0YSxcbiAgICAgICAgcUlkOiBtZXNzYWdlLmNvbnRlbnQucUlkLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBhY2s7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gZXJyO1xuICAgIH1cbiAgfVxufVxuIl19