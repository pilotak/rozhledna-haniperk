import request from 'supertest';
import app from '../app';

describe('HTTP', () => {
  it('GET /', async () => {
    await request(app).get('/').expect(200);
  });

  it('GET /data', async () => {
    const res = await request(app).get('/data').expect(200);
    expect(res.body).toHaveProperty('latest');
    expect(res.body.latest).toHaveProperty('temp');
    expect(res.body.latest).toHaveProperty('humidity');

    expect(res.body).toHaveProperty('extrema');
    expect(res.body.extrema).toHaveProperty('temp');
    expect(res.body.extrema.temp).toHaveProperty('max');
    expect(res.body.extrema.temp.max).toHaveProperty('value');
    expect(res.body.extrema.temp.max).toHaveProperty('time');
    expect(res.body.extrema.temp).toHaveProperty('min');
    expect(res.body.extrema.temp.min).toHaveProperty('value');
    expect(res.body.extrema.temp.min).toHaveProperty('time');

    expect(res.body.extrema).toHaveProperty('humidity');
    expect(res.body.extrema.humidity).toHaveProperty('max');
    expect(res.body.extrema.humidity.max).toHaveProperty('value');
    expect(res.body.extrema.humidity.max).toHaveProperty('time');
    expect(res.body.extrema.humidity).toHaveProperty('min');
    expect(res.body.extrema.humidity.min).toHaveProperty('value');
    expect(res.body.extrema.humidity.min).toHaveProperty('time');
  });

  it('GET /favicon.ico', async () => {
    await request(app).get('/favicon.ico').expect(200);
  });

  it('GET /random-url', async () => {
    await request(app).get('/random-url').expect(404);
  });

  it('GET /status', async () => {
    const res = await request(app).get('/status').expect(200);
    expect(res.body.status).toEqual('OK');
  });
});
