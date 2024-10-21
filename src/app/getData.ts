import { Pool, types, PoolClient } from 'pg';
import { LatestOutputData, Extrema, LatestData } from './types';
import env from './env';

const pool = new Pool({
  host: env.PGHOST,
  user: env.PGUSER,
  port: env.PGPORT,
  password: env.PGPASSWORD,
  database: env.PGDATABASE,
  max: 2,
  idleTimeoutMillis: 30000,
});

types.setTypeParser(types.builtins.NUMERIC, (val: string) => parseFloat(val));
types.setTypeParser(types.builtins.FLOAT4, (val: string) => parseFloat(val));
types.setTypeParser(types.builtins.FLOAT8, (val: string) => parseFloat(val));

export const getLatest = async (): Promise<LatestOutputData> => {
  let client: PoolClient | undefined = undefined;

  try {
    client = await pool.connect();
    // Get latest temperature, humidity and time
    const latest = await client.query<LatestData>(
      `SELECT
        CASE
          WHEN temperature > 125 OR temperature < -55 THEN NULL
          ELSE ROUND(temperature::numeric, 1)
        END AS temp,
        CASE
          WHEN humidity > 100 OR humidity < 0 THEN NULL
          ELSE ROUND(humidity::numeric, 1)
        END AS humidity,
        timestamp AS time
      FROM sensors
      ORDER BY
        timestamp DESC
      LIMIT 1`,
    );

    if (latest.rowCount === 0) {
      throw new Error('Empty SQL result');
    }

    // Get min/max from the day of latest data
    const extrema = await client.query<{ extrema: Extrema }>(
      `SELECT
        JSONB_BUILD_OBJECT(
          'temp',
          JSONB_BUILD_OBJECT(
            'min',
            JSONB_BUILD_OBJECT(
              'value',
              min_temp.temperature,
              'time',
              min_temp.timestamp
            ),
            'max',
            JSONB_BUILD_OBJECT(
              'value',
              max_temp.temperature,
              'time',
              max_temp.timestamp
            )
          ),
          'humidity',
          JSONB_BUILD_OBJECT(
            'min',
            JSONB_BUILD_OBJECT(
              'value',
              min_humidity.humidity,
              'time',
              min_humidity.timestamp
            ),
            'max',
            JSONB_BUILD_OBJECT(
              'value',
              max_humidity.humidity,
              'time',
              max_humidity.timestamp
            )
          )
        ) AS extrema
      FROM
        (SELECT timestamp, temperature FROM sensors WHERE timestamp >= date_trunc('day', $1::TIMESTAMP) AND temperature is not NULL AND temperature < 125 AND temperature > -55 ORDER BY temperature DESC LIMIT 1) AS max_temp,
        (SELECT timestamp, temperature FROM sensors WHERE timestamp >= date_trunc('day', $1::TIMESTAMP) AND temperature is not NULL AND temperature < 125 AND temperature > -55 ORDER BY temperature ASC LIMIT 1) AS min_temp,
        (SELECT timestamp, humidity FROM sensors WHERE timestamp >= date_trunc('day', $1::TIMESTAMP) AND humidity is not NULL AND humidity <= 100 AND humidity > 0 ORDER BY humidity DESC LIMIT 1) AS max_humidity,
        (SELECT timestamp, humidity FROM sensors WHERE timestamp >= date_trunc('day', $1::TIMESTAMP) AND humidity is not NULL AND humidity <= 100 AND humidity > 0 ORDER BY humidity ASC LIMIT 1) AS min_humidity`,
      [(latest.rows[0].time as unknown as Date).toISOString()],
    );
    return { extrema: extrema.rows[0].extrema, latest: latest.rows[0] };
  } catch (err) {
    console.error(err);
    return {
      latest: {
        temp: null,
        humidity: null,
        time: '',
      },
      extrema: {
        temp: {
          max: {
            value: null,
            time: '',
          },
          min: {
            value: null,
            time: '',
          },
        },
        humidity: {
          max: {
            value: null,
            time: '',
          },
          min: {
            value: null,
            time: '',
          },
        },
      },
    };
  } finally {
    if (client) {
      client.release();
    }
  }
};
