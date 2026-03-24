import postgres from 'postgres';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

async function migrate() {
  const sql = postgres(process.env.DATABASE_URL!, { max: 1 });

  try {
    console.log('🔄 Running database migration...');
    
    const migrationFile = path.join(process.cwd(), 'drizzle/0000_violet_steel_serpent.sql');
    const migration = fs.readFileSync(migrationFile, 'utf-8');
    
    const statements = migration
      .split('--> statement-breakpoint')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    for (const statement of statements) {
      await sql.unsafe(statement);
    }

    console.log('✅ Migration completed successfully!');
    console.log('📊 Created 7 tables:');
    console.log('   - vehicles');
    console.log('   - vehicle_images');
    console.log('   - vehicle_features');
    console.log('   - enquiries');
    console.log('   - dealership_settings');
    console.log('   - service_pages');
    console.log('   - users');
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

migrate();
