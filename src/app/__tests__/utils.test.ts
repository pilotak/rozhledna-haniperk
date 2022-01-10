import { sanitizeHumidity, sanitizeTemperature, extractExtrema, emptyData, DbExtremaRow } from '../utils';

describe('Utils', () => {
  it('Invalid temp 150°C', () => {
    const res = sanitizeTemperature(150);
    expect(res).toBe(null);
  });

  it('Invalid temp -55.1°C', () => {
    const res = sanitizeTemperature(-55.1);
    expect(res).toBe(null);
  });

  it('Round up temp', () => {
    const res = sanitizeTemperature(20.55);
    expect(res).toBe(20.6);
  });

  it('Round down temp', () => {
    const res = sanitizeTemperature(22.31);
    expect(res).toBe(22.3);
  });

  it('Invalid humidity 101%', () => {
    const res = sanitizeHumidity(101);
    expect(res).toBe(null);
  });

  it('Invalid humidity -2%', () => {
    const res = sanitizeHumidity(-2);
    expect(res).toBe(null);
  });

  it('Round up humidity', () => {
    const res = sanitizeHumidity(85.88);
    expect(res).toBe(85.9);
  });

  it('Round down humidity', () => {
    const res = sanitizeHumidity(42.14);
    expect(res).toBe(42.1);
  });

  it('Extract extrema', () => {
    const data: DbExtremaRow[] = [
      ['2020-10-24T08:47:48.569559288Z', null, null, null, 68.7566],
      ['2020-10-24T10:10:49.120475647Z', 22.75, null, null, null],
      ['2020-10-24T11:32:54.452702601Z', null, null, 69.7566, null],
      ['2020-10-24T11:35:37.696729383Z', null, 19.75, null, null],
    ];

    const res = extractExtrema(data, emptyData());
    const output = emptyData();

    output.extrema.temp.max.value = 22.8;
    output.extrema.temp.max.time = '2020-10-24T10:10:49.120475647Z';
    output.extrema.temp.min.value = 19.8;
    output.extrema.temp.min.time = '2020-10-24T11:35:37.696729383Z';
    output.extrema.humidity.max.value = 69.8;
    output.extrema.humidity.max.time = '2020-10-24T11:32:54.452702601Z';
    output.extrema.humidity.min.value = 68.8;
    output.extrema.humidity.min.time = '2020-10-24T08:47:48.569559288Z';

    expect(res).toStrictEqual(output);
  });
});
