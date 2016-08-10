/* global describe, before, beforeEach, after, afterEach, it, chai, assert */

const mockery = require('mockery');
const mockingRabbit = require('mocking-rabbit').default;

const mockAmqplib = mockingRabbit.Amqplib;
const tracker = mockingRabbit.hook.tracker;

mockery.enable({ warnOnReplace: false, warnOnUnregistered: false });
mockery.registerAllowable('./../../lib/client', true);
mockery.registerMock('amqplib', mockAmqplib);

const Client = require('./../../lib/client').default;

describe('client', function testCase() {
  before(function setup(done) {
    done();
  });

  after(function teardown(done) {
    done();
  });

  it('can be instantiated', function assertion(done) {
    const client = new Client('amqp://localhost');
    assert.instanceOf(client, Client);
    done();
  });

  it('should have promisable connection as initial property',
    function assertion(done) {
      const client = new Client('amqp://localhost');
      assert.isFunction(client.connection.then);
      done();
    });

  it('wrapper() should have give wrapped object', function assertion(done) {
    const client = new Client('amqp://localhost');
    const result = client.wrapper({
      qId: 'queue-id',
      queue: 'queue',
      payload: 'payload',
    });

    assert.property(result, 'qId');
    assert.property(result, 'queue');
    assert.property(result, 'data');
    assert.property(result, 'sentAt');
    assert.property(result, 'timezone');
    done();
  });

  it('produceDirectExchange() should publish message and wait for acknowledge',
    function assertion(done) {
      const client = new Client('amqp://localhost');
      const data = {
        qId: 'queue-id',
        queue: 'queue',
        payload: 'payload',
      };

      client.produceDirectExchange(data)
        .then(function waitingForAcknowledgement(result) {
          assert.isTrue(result);
          done();
        })
        .catch(done);
    });

  it('consumeDirectExchange() should subscribe and wait for incoming message',
    function assertion(done) {
      const client = new Client('amqp://localhost');
      const data = {
        qId: 'queue-id',
        queue: 'queue',
        payload: 'payload',
      };

      tracker.install();
      tracker.on('consume', function tracking(consume) {
        assert.equal(consume.queue, 'aQueue');
        consume.response({
          content: new Buffer(JSON.stringify(data)),
        });
      });

      client.consumeDirectExchange({ queue: 'aQueue' })
        .then(function waitingForMessage(message) {
          assert.equal(message.content.payload, 'payload');
          tracker.uninstall();
          done();
        })
        .catch(done);
    });

  it('dynamicProducerBinding() should publish and waiting for incoming message',
    function assertion(done) {
      const client = new Client('amqp://localhost');
      const data = {
        qId: 'queue-id',
        queue: 'aQueue',
        payload: 'payload',
      };

      tracker.install();
      tracker.on('consume', function tracking(consume) {
        assert.match(consume.queue, /^aQueue/);
        consume.response({
          content: new Buffer(JSON.stringify(data)),
        });
      });

      client.dynamicProducerBinding(data)
        .then(function waitingForMessage(message) {
          assert.isString(message.content.qId);
          assert.equal(message.content.payload, 'payload');
          tracker.uninstall();
          done();
        })
        .catch(done);
    });

  it('dynamicConsumerBinding() should publish and waiting for incoming message',
    function assertion(done) {
      const client = new Client('amqp://localhost');
      const data = {
        qId: 'queue-id',
        queue: 'aQueue',
        payload: 'payload',
      };

      tracker.install();
      tracker.on('consume', function tracking(consume) {
        assert.match(consume.queue, /^aQueue/);
        consume.response({
          content: new Buffer(JSON.stringify(data)),
        });
      });

      client.dynamicConsumerBinding(data)
        .then(function waitingForAcknowledgement(result) {
          assert.isTrue(result);
          tracker.uninstall();
          done();
        })
        .catch(done);
    });

  it('dynamicConsumerBinding() with payload producer function',
    function assertion(done) {
      const client = new Client('amqp://localhost');
      const data = {
        qId: 'queue-id',
        queue: 'aQueue',
        payload: 'payload',
      };

      tracker.install();
      tracker.on('consume', function tracking(consume) {
        assert.match(consume.queue, /^aQueue/);
        consume.response({
          content: new Buffer(JSON.stringify(data)),
        });
      });

      client.dynamicConsumerBinding({
        queue: data.queue,
        fn: function payloadProducer(message) {
          return message;
        },
      })
        .then(function waitingForAcknowledgement(result) {
          assert.isTrue(result);
          tracker.uninstall();
          done();
        })
        .catch(done);
    });
});
