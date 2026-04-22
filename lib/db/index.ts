import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Ensure DATABASE_URL is available, use dummy value for build-time
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  if (!url || url.trim() === '') {
    console.log('[DB] No DATABASE_URL found, using dummy connection for build');
    // Return a valid dummy URL for build time
    return 'postgresql://dummy:dummy@localhost:5432/dummy';
  }
  console.log('[DB] DATABASE_URL found, length:', url.length);
  return url;
};

const connectionString = getDatabaseUrl();

const client = postgres(connectionString, {
  ssl: connectionString.includes('localhost') ? false : 'require',
  max: 1,
  connect_timeout: 10,
  idle_timeout: 20,
  max_lifetime: 60 * 30,
  // Prevent postgres from trying to use individual PG* env vars
  host: undefined,
  port: undefined,
  database: undefined,
  username: undefined,
  password: undefined,
});

export const db = drizzle(client, { schema });
