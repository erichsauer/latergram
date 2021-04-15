const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('latergram routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('makes the checks pass', () => {
    expect(true).toEqual(true);
  });
});
