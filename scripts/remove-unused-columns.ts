import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
});

async function removeUnusedColumns() {
  try {
    console.log('Removing unused columns from vehicles table...\n');

    // Drop variant column
    await sql`ALTER TABLE vehicles DROP COLUMN IF EXISTS variant`;
    console.log('✓ Dropped variant column');

    // Drop finance_monthly column
    await sql`ALTER TABLE vehicles DROP COLUMN IF EXISTS finance_monthly`;
    console.log('✓ Dropped finance_monthly column');

    // Drop registration column
    await sql`ALTER TABLE vehicles DROP COLUMN IF EXISTS registration`;
    console.log('✓ Dropped registration column');

    console.log('\n✓ Successfully removed all unused columns from vehicles table!');
    
    await sql.end();
    process.exit(0);
  } catch (error) {
    console.error('Error removing columns:', error);
    await sql.end();
    process.exit(1);
  }
}

removeUnusedColumns();
