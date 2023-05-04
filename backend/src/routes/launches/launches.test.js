const request = require('supertest');

const app = require('../../app');

describe('Test GET /launches ', () => {
  test('respond with 200 status code', async () => {
    const response = await request(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200); 
  });
});

describe('Test POST /launch ', () => {
  test('respond with 200 status code ', () => {});

  test('catch missing required properties', () => {});

  test('catch invalid dates', () => {});
});
