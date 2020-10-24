import { escape } from 'influx';
import moment from 'moment';
import { DB } from './lib/DB';

import { sanitizeHumidity, sanitizeTemperature, extractExtrema, emptyData } from './utils';
import { LatestOutputData } from '../../types';

const db = DB.connect();

export const getLatest = async (): Promise<LatestOutputData> => {
  try {
    const measurement = process.env.INFLUX_MEASUREMENT ? process.env.INFLUX_MEASUREMENT : '';
    const output = emptyData();
    // Get latest temperature, humidity and time
    let query = await db.queryRaw(
      `SELECT temperature, humidity, time FROM "${escape.measurement(measurement)}" GROUP BY * ORDER BY DESC LIMIT 1`,
    );

    if ('series' in query.results[0] === false) {
      throw new Error('Empty SQL result');
    }

    const data = query.results[0].series[0].values[0];

    output.latest.temp = sanitizeTemperature(data[1]);
    output.latest.humidity = sanitizeHumidity(data[2]);
    output.latest.time = data[0];

    // Get min/max from the day of latest data
    const lastTime = moment(data[0]).set('hour', 0).set('minute', 0).set('second', 0).format('YYYY-MM-DD HH:mm:ss');

    query = await db.queryRaw(
      `SELECT * FROM (SELECT MAX(temperature) AS a FROM "${escape.measurement(
        measurement,
      )}" WHERE time >= ${escape.stringLit(lastTime)}),(SELECT MIN(temperature) AS b FROM "${escape.measurement(
        measurement,
      )}" WHERE time >= ${escape.stringLit(lastTime)}),(SELECT MAX(humidity) AS c FROM "${escape.measurement(
        measurement,
      )}" WHERE time >= ${escape.stringLit(lastTime)}),(SELECT MIN(humidity) AS d FROM "${escape.measurement(
        measurement,
      )}" WHERE time >= ${escape.stringLit(lastTime)})`,
    );

    return extractExtrema(query.results[0].series[0].values, output);
  } catch (err) {
    console.error(err);
    return emptyData();
  }
};
