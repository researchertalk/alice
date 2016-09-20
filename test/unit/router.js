/* global describe, before, beforeEach, after, afterEach, it, chai, assert */

const mockery = require('mockery');
const mockingRabbit = require('mocking-rabbit').default;

const mockAmqplib = mockingRabbit.Amqplib;
const tracker = mockingRabbit.hook.tracker;

mockery.enable({ warnOnReplace: false, warnOnUnregistered: false });
mockery.registerAllowable('./../../lib/client', true);
mockery.registerAllowable('./../../lib/router', true);
mockery.registerMock('amqplib', mockAmqplib);

const Client = require('./../../lib/client').default;
const Router = require('./../../lib/router').default;

describe('router', function testCase() {
  before(function setup(done) {
    Client.connect()
      .then(function successResult() {
        done();
      })
      .catch(done);
  });

  it('can be instantiated', function assertion(done) {
    const router = new Router('base');

    assert.instanceOf(router, Router);
    assert.equal(router.baseRoutingKey, 'base');

    done();
  });

  it('transformPath()', function assertion(done) {
    const router = new Router('base');

    assert.isFunction(router.transformPath);

    const path = router.transformPath('/path');

    assert.equal(path, 'base.path');

    done();
  });

  it('process()', function assertion(done) {
    const router = new Router('base');

    assert.isFunction(router.process);

    const proceed = [];

    const fnA = function fnA(result, next) {
      const fnAPromisified = new Promise(function promise(resolve) {
        setTimeout(function timeout() {
          resolve(`A: ${result}`);
        }, 300);
      });

      return fnAPromisified
        .then(function successResult() {
          assert.deepEqual(proceed, []);
          proceed.push('A');

          return next();
        });
    };

    const fnB = function fnB(result, next) {
      const fnBPromisified = new Promise(function promise(resolve) {
        setTimeout(function timeout() {
          resolve(`B: ${result}`);
        }, 200);
      });

      return fnBPromisified
        .then(function successResult() {
          assert.deepEqual(proceed, ['A']);
          proceed.push('B');

          return next();
        });
    };

    const fnC = function fnC(result, next) {
      const fnCPromisified = new Promise(function promise(resolve) {
        setTimeout(function timeout() {
          resolve(`C: ${result}`);
        }, 100);
      });

      return fnCPromisified
        .then(function successResult() {
          assert.deepEqual(proceed, ['A', 'B']);
          proceed.push('C');

          return next();
        });
    };

    router.process([fnA, fnB, fnC])('result')
      .then(function successResult(result) {
        assert.isNull(result);
        assert.deepEqual(proceed, ['A', 'B', 'C']);

        done();
      })
      .catch(done);
  });

  it('direct()', function assertion(done) {
    const router = new Router('base');

    assert.isFunction(router.direct);

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

    router.direct({
      exchange: 'exchange',
      queue: 'queue',
      routingKey: 'route',
    }, [
      function handler(context, next) {
        assert.deepEqual(data, context.body);
        assert.isFunction(context.publish);

        tracker.uninstall();

        return next();
      },
    ])
    .then(done)
    .catch(done);
  });

  it('fanout()', function assertion(done) {
    const router = new Router('base');

    assert.isFunction(router.direct);

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

    router.fanout({
      exchange: 'exchange',
      queue: 'queue',
    }, [
      function handler(context, next) {
        assert.deepEqual(data, context.body);
        assert.isFunction(context.publish);

        tracker.uninstall();

        return next();
      },
    ])
    .then(done)
    .catch(done);
  });

  it('topic()', function assertion(done) {
    const router = new Router('base');

    assert.isFunction(router.direct);

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

    router.topic({
      exchange: 'exchange',
      queue: 'queue',
      routingKey: 'route',
    }, [
      function handler(context, next) {
        assert.deepEqual(data, context.body);
        assert.isFunction(context.publish);

        tracker.uninstall();

        return next();
      },
    ])
    .then(done)
    .catch(done);
  });
});
