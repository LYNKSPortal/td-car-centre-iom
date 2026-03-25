import { db } from '../lib/db';
import { sql } from 'drizzle-orm';

async function addInteriorColour() {
  try {
    console.log('Adding interior_colour column to vehicles table...');
    
    await db.execute(sql`ALTER TABLE vehicles ADD COLUMN IF NOT EXISTS interior_colour VARCHAR(50)`);
    
    console.log('✅ Successfully added interior_colour column');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding column:', error);
    process.exit(1);
  }
}

addInteriorColour();
