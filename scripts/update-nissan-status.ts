import postgres from 'postgres';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
});

async function updateNissan() {
  try {
    console.log('Updating Nissan status to available...\n');
    
    const result = await sql`
      UPDATE vehicles 
      SET status = 'available' 
      WHERE title LIKE '%Nissan%' AND status = 'reserved'
    `;
    
    console.log(`✓ Updated ${result.count} vehicle(s)`);
    console.log('Nissan is now set to available and will show on homepage\n');
    
    await sql.end();
    process.exit(0);
  } catch (error) {
    console.error('Error updating vehicle:', error);
    await sql.end();
    process.exit(1);
  }
}

updateNissan();
