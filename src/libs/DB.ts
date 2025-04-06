import * as schema from '@/models/Schema';
import { drizzle as drizzlePg } from 'drizzle-orm/node-postgres';
import { migrate as migratePg } from 'drizzle-orm/node-postgres/migrator';
import pg from 'pg';
import { Env } from './Env';

const { Client } = pg;

let client;
let drizzle;

const isProduction = Env.NODE_ENV === 'production';
const isTest = Env.NODE_ENV === 'test';

if (!isTest && Env.DATABASE_URL) {
  client = new Client({
    connectionString: Env.DATABASE_URL,
  });
  await client.connect();

  drizzle = drizzlePg(client, { schema });

  if (!isProduction) {
    await migratePg(drizzle, {
      migrationsFolder: './migrations',
    });
  }
} else {
  throw new Error('DATABASE_URL is missing. Make sure to set it in your .env files.');
}

export const db = drizzle;
export const dbClient = client;
