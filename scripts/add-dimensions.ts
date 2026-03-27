import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function addDimensions() {
  const sql = postgres(process.env.DATABASE_URL!, { max: 1 });

  try {
    console.log('🔄 Adding vehicle dimension fields...');
    
    await sql`ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS height VARCHAR(50)`;
    await sql`ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS length VARCHAR(50)`;
    await sql`ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS width VARCHAR(50)`;

    console.log('✅ Vehicle dimension fields added successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

addDimensions();
