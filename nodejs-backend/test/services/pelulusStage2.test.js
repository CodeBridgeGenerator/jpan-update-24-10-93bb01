const assert = require('assert');
const app = require('../../src/app');

describe('\'pelulusStage2\' service', () => {
  it('registered the service', () => {
    const service = app.service('pelulusStage2');

    assert.ok(service, 'Registered the service (pelulusStage2)');
  });
});
