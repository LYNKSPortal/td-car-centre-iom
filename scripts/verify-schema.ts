import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
});

async function verifySchema() {
  try {
    console.log('Checking vehicles table columns...\n');

    const columns = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'vehicles' 
      ORDER BY ordinal_position
    `;

    console.log('Current columns in vehicles table:');
    columns.forEach(col => {
      console.log(`  - ${col.column_name} (${col.data_type})`);
    });

    const removedColumns = ['variant', 'finance_monthly', 'registration'];
    const foundRemoved = columns.filter(col => 
      removedColumns.includes(col.column_name)
    );

    if (foundRemoved.length > 0) {
      console.log('\n⚠️  WARNING: Found columns that should have been removed:');
      foundRemoved.forEach(col => console.log(`  - ${col.column_name}`));
    } else {
      console.log('\n✓ All removed columns are gone from database');
    }

    await sql.end();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await sql.end();
    process.exit(1);
  }
}

verifySchema();
