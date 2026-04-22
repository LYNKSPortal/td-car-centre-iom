import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Use a dummy connection string during build if DATABASE_URL is not set
const connectionString = process.env.DATABASE_URL || 'postgresql://user:pass@localhost:5432/db';

const client = postgres(connectionString, {
  ssl: connectionString.includes('localhost') ? false : 'require',
  max: 1,
  // Prevent connection during build
  connect_timeout: 10,
  idle_timeout: 20,
  max_lifetime: 60 * 30,
});

export const db = drizzle(client, { schema });
