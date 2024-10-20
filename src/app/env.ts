import { resolve } from 'node:path';
import dotenv from 'dotenv';

dotenv.config({ path: resolve(__dirname, '../../.env') });

import { cleanEnv, num, port, str } from 'envalid';

// Validate and clean the environment variables
const env = cleanEnv(process.env, {
  PORT: num({ default: 3000 }),
  PGHOST: str({ devDefault: 'localhost' }),
  PGPORT: port({ default: 5432 }),
  PGUSER: str(),
  PGPASSWORD: str(),
  PGDATABASE: str(),
});

export default env;
