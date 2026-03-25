import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function migrate() {
  const sql = postgres(process.env.DATABASE_URL!, { max: 1 });

  try {
    console.log('🔄 Adding public_id column to vehicle_images...');
    
    await sql.unsafe(`
      ALTER TABLE vehicle_images ADD COLUMN IF NOT EXISTS public_id TEXT;
    `);

    console.log('✅ Migration completed successfully!');
    console.log('📊 Added public_id column to vehicle_images table');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

migrate();
