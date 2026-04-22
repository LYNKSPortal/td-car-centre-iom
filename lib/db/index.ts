import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Ensure DATABASE_URL is available, use dummy value for build-time
const getDatabaseUrl = () => {
  const url = process.env.DATABASE_URL;
  if (!url || url.trim() === '') {
    // Return a valid dummy URL for build time
    return 'postgresql://dummy:dummy@localhost:5432/dummy';
  }
  return url;
};

const connectionString = getDatabaseUrl();

const client = postgres(connectionString, {
  ssl: connectionString.includes('localhost') ? false : 'require',
  max: 1,
  connect_timeout: 10,
  idle_timeout: 20,
  max_lifetime: 60 * 30,
});

export const db = drizzle(client, { schema });
