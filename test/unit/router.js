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
  it('can be instantiated', function assertion(done) {
    const router = new Router();
    assert.instanceOf(router, Router);
    done();
  });

  it('should have base queue name', function assertion(done) {
    const router = new Router('base');
    assert.equal(router.baseQueueName, 'base');
    done();
  });

  it('should have empty routers list', function assertion(done) {
    const router = new Router('base');
    assert.lengthOf(router.routes, 0);
    done();
  });

  it('bind() should add object to routers list', function assertion(done) {
    const router = new Router('base');
    router.bind('path', function handler() {});
    assert.lengthOf(router.routes, 1);
    done();
  });

  it('transformPath() should transform slash separator to dot',
    function assertion(done) {
      const router = new Router('base');
      const transformed = router.transformPath('/path/add');
      assert.equal(transformed, 'path.add');
      done();
    });

  it('registerTo() should bind queue path to client', function assertion(done) {
    const client = new Client('amqp://localhost');
    const router = new Router('base');

    tracker.install();
    tracker.on('consume', function consuming(consume) {
      try {
        assert.equal(consume.queue, 'base.add');
        done();
      } catch (err) {
        done(err);
      } finally {
        tracker.uninstall();
      }
    });

    router.bind('/add', function handler(message) { return message; });
    router.registerTo(client);
  });
});

