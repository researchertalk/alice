/* global describe */
/* eslint-disable global-require */

require('source-map-support').install();

const chai = require('chai');

global.chai = chai;
global.assert = chai.assert;

describe('Unit Test', function testCase() {
  require('./unit/client');
  require('./unit/router');
});
