import request from 'supertest';
import app from '../app';

describe('Healthcheck', () => {
  it('returns 200 if server is healthy', async () => {
    const res = await request(app).get('/healthcheck').expect(200);
    expect(res.body.uptime).toBeGreaterThan(0);
  });
});
