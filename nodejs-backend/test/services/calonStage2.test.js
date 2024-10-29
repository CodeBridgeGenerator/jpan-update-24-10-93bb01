const assert = require('assert');
const app = require('../../src/app');

describe('\'calonStage2\' service', () => {
  it('registered the service', () => {
    const service = app.service('calonStage2');

    assert.ok(service, 'Registered the service (calonStage2)');
  });
});
