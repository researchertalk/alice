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
  afterEach(function setup(done) {
    if (Client.connection()) {
      return Client.disconnect()
        .then(done)
        .catch(done);
    }

    return done();
  });

  it('Client is static class', function assertion(done) {
    assert.isFunction(Client);
    assert.isFunction(Client.connect);

    done();
  });

  it('connect(): connection is shared when succeed', function assertion(done) {
    assert.isFunction(Client.connect);

    // eslint-disable-next-line global-require
    const ClientReRequire = require('./../../lib/client').default;

    assert.isNull(ClientReRequire.connection());

    Client.connect()
      .then(function successResult(connection) {
        assert.deepEqual(connection, ClientReRequire.connection());

        done();
      })
      .catch(done);
  });

  it('publish()', function assertion(done) {
    assert.isFunction(Client.publish);

    Client.connect()
      .then(function connected() {
        return Client.publish({
          exchange: 'exchange',
          type: 'direct',
          routingKey: 'route',
          content: 'content',
        });
      })
      .then(function published(result) {
        assert.isTrue(result);

        done();
      })
      .catch(done);
  });

  it('publishDirect()', function assertion(done) {
    assert.isFunction(Client.publishDirect);

    Client.connect()
      .then(function connected() {
        return Client.publishDirect({
          exchange: 'exchange',
          routingKey: 'route',
          content: 'content',
        });
      })
      .then(function publishedDirect(result) {
        assert.isTrue(result);

        done();
      })
      .catch(done);
  });

  it('publishFanout()', function assertion(done) {
    assert.isFunction(Client.publishFanout);

    Client.connect()
      .then(function connected() {
        return Client.publishFanout({
          exchange: 'exchange',
          content: 'content',
        });
      })
      .then(function publishedFanout(result) {
        assert.isTrue(result);

        done();
      })
      .catch(done);
  });

  it('publishTopic()', function assertion(done) {
    assert.isFunction(Client.publishTopic);

    Client.connect()
      .then(function connected() {
        return Client.publishTopic({
          exchange: 'exchange',
          routingKey: 'route',
          content: 'content',
        });
      })
      .then(function publishedTopic(result) {
        assert.isTrue(result);

        done();
      })
      .catch(done);
  });

  it('consume()', function assertion(done) {
    assert.isFunction(Client.consume);

    const data = {
      qId: 'queue-id',
      queue: 'queue',
      payload: 'payload',
    };

    tracker.install();
    tracker.on('consume', function tracking(consume) {
      assert.equal(consume.queue, 'queue');
      consume.response({
        content: new Buffer(JSON.stringify(data)),
        fields: {},
        properties: {},
      });
    });

    Client.connect()
      .then(function connected() {
        return Client.consume({
          exchange: 'exchange',
          type: 'direct',
          queue: 'queue',
          routingKey: 'route',
        }, function handler(context) {
          assert.deepEqual(data, context.body);
          assert.isFunction(context.publish);

          done();
        });
      })
      .catch(done);
  });

  it('consumeDirect()', function assertion(done) {
    assert.isFunction(Client.consumeDirect);

    const data = {
      qId: 'queue-id',
      queue: 'queue',
      payload: 'payload',
    };

    tracker.install();
    tracker.on('consume', function tracking(consume) {
      assert.equal(consume.queue, 'queue');
      consume.response({
        content: new Buffer(JSON.stringify(data)),
        fields: {},
        properties: {},
      });
    });

    Client.connect()
      .then(function connected() {
        return Client.consumeDirect({
          exchange: 'exchange',
          type: 'direct',
          queue: 'queue',
          routingKey: 'route',
        }, function handler(context) {
          assert.deepEqual(data, context.body);
          assert.isFunction(context.publish);

          tracker.uninstall();

          done();
        });
      })
      .catch(done);
  });

  it('consumeFanout()', function assertion(done) {
    assert.isFunction(Client.consumeFanout);

    const data = {
      qId: 'queue-id',
      queue: 'queue',
      payload: 'payload',
    };

    tracker.install();
    tracker.on('consume', function tracking(consume) {
      assert.equal(consume.queue, 'queue');
      consume.response({
        content: new Buffer(JSON.stringify(data)),
        fields: {},
        properties: {},
      });
    });

    Client.connect()
      .then(function connected() {
        return Client.consumeFanout({
          exchange: 'exchange',
          queue: 'queue',
        }, function handler(context) {
          assert.deepEqual(data, context.body);
          assert.isFunction(context.publish);

          tracker.uninstall();

          done();
        });
      })
      .catch(done);
  });

  it('consumeTopic()', function assertion(done) {
    assert.isFunction(Client.consumeTopic);

    const data = {
      qId: 'queue-id',
      queue: 'queue',
      payload: 'payload',
    };

    tracker.install();
    tracker.on('consume', function tracking(consume) {
      assert.equal(consume.queue, 'queue');
      consume.response({
        content: new Buffer(JSON.stringify(data)),
        fields: {},
        properties: {},
      });
    });

    Client.connect()
      .then(function connected() {
        return Client.consumeTopic({
          exchange: 'exchange',
          queue: 'queue',
          routingKey: 'route',
        }, function handler(context) {
          assert.deepEqual(data, context.body);
          assert.isFunction(context.publish);

          tracker.uninstall();

          done();
        });
      })
      .catch(done);
  });
});
