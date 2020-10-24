import { InfluxDB } from 'influx';

export class DB {
  static instance: InfluxDB;

  static connect(): InfluxDB {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new InfluxDB({
      host: process.env.INFLUX_HOST,
      database: process.env.INFLUX_DB,
      port: process.env.INFLUX_PORT ? parseInt(process.env.INFLUX_PORT) : undefined,
      username: process.env.INFLUX_USER,
      password: process.env.INFLUX_PASSWORD,
    });

    return this.instance;
  }
}
