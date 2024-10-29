const assert = require('assert');
const app = require('../../src/app');

describe('\'pelulusStage1\' service', () => {
  it('registered the service', () => {
    const service = app.service('pelulusStage1');

    assert.ok(service, 'Registered the service (pelulusStage1)');
  });
});
