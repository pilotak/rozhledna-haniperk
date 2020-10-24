import request from 'supertest';
import app from '../app';

describe('HTTP', () => {
  it('GET /', async () => {
    await request(app).get('/').expect(200);
  });

  it('GET /favicon.ico', async () => {
    await request(app).get('/favicon.ico').expect(200);
  });

  it('GET /random-url', async () => {
    await request(app).get('/random-url').expect(404);
  });

  it('GET /healthcheck', async () => {
    const res = await request(app).get('/healthcheck').expect(200);
    expect(res.body.uptime).toBeGreaterThan(0);
  });
});
