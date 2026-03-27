import postgres from 'postgres';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
});

async function updateVehicles() {
  try {
    console.log('Updating all vehicles to set featured = true...\n');
    
    const result = await sql`
      UPDATE vehicles 
      SET featured = true 
      WHERE featured = false OR featured IS NULL
    `;
    
    console.log(`✓ Updated ${result.count} vehicles`);
    console.log('All vehicles are now set to show on homepage\n');
    
    await sql.end();
    process.exit(0);
  } catch (error) {
    console.error('Error updating vehicles:', error);
    await sql.end();
    process.exit(1);
  }
}

updateVehicles();
