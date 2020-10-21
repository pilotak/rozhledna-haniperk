import request from 'supertest';
import app from '../app';

describe('GET', () => {
  it('GET /', async () => {
    const result = await request(app).get('/');
    expect(result.status).toBe(200);
  });

  it('GET /favicon.ico', async () => {
    const result = await request(app).get('/favicon.ico');
    expect(result.status).toBe(200);
  });

  it('GET /random-url', async () => {
    const result = await request(app).get('/random-url');
    expect(result.status).toBe(404);
  });
});
