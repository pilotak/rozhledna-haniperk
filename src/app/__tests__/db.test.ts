import { getLatest } from '../getData';
import { DB } from '../lib/DB';

describe('Database', () => {
  it('getLatest', async () => {
    const res = await getLatest();
    expect(res.latest.temp).not.toBe(null);
    expect(res.extrema.temp.max.value).not.toBe(null);
  });

  it('test static DB class', async () => {
    const one = DB.connect();
    const two = DB.connect();
    expect(one).toEqual(two);
  });
});

describe('Database with different ENV', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // most important - it clears the cache
    process.env = { ...OLD_ENV }; // make a copy
  });

  afterAll(() => {
    process.env = OLD_ENV; // restore old env
  });

  it('Invalid measurement', async () => {
    process.env.INFLUX_MEASUREMENT = 'random';

    const res = await getLatest();
    expect(res.latest.temp).toBe(null);
    expect(res.extrema.temp.max.value).toBe(null);
  });

  it('Undefined measurement', async () => {
    process.env.INFLUX_MEASUREMENT = undefined;

    const res = await getLatest();
    expect(res.latest.temp).toBe(null);
    expect(res.extrema.temp.max.value).toBe(null);
  });
});
