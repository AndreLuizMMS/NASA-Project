const request = require('supertest');

const app = require('../../app');

describe('Test GET /launches ', () => {
  test('respond with 200 status code', async () => {
    await request(app).get('/v1/launches').expect('Content-Type', /json/).expect(200);
  });
});

describe('Test POST /launch ', () => {
  const completeLaunchData = {
    mission: 'Kepler Mission 2012',
    rocket: 'Deds 023',
    launchDate: 'June 17, 2030',
    target: 'Kepler 420 B'
  };
  const launchDataInvalidDate = {
    mission: 'Kepler Mission 2012',
    rocket: 'Deds 023',
    launchDate: 'invalid date',
    target: 'Kepler 420 B'
  };

  const launchDataWithNoDate = {
    mission: 'Kepler Mission 2012',
    rocket: 'Deds 023',
    target: 'Kepler 420 B'
  };

  test('respond with 201 created ', async () => {
    const response = await request(app)
      .post('/v1/launches')
      .send(completeLaunchData)
      .expect('Content-Type', /json/)
      .expect(201);

    const requestDate = new Date(completeLaunchData.launchDate).valueOf();
    const responseDate = new Date(response.body.launchDate).valueOf();
    expect(requestDate).toBe(responseDate);

    expect(response.body).toMatchObject(launchDataWithNoDate);
  });

  test('catch missing required properties', async () => {
    const response = await request(app)
      .post('/v1/launches')
      .send(launchDataWithNoDate)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Missing launch data'
    });
  });

  test('catch invalid dates', async () => {
    const response = await request(app)
      .post('/v1/launches')
      .send(launchDataInvalidDate)
      .expect('Content-Type', /json/)
      .expect(400);

    expect(response.body).toStrictEqual({
      error: 'Invalid launch date'
    });
  });
});
