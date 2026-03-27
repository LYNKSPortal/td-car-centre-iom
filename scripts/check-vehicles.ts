import postgres from 'postgres';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
});

async function checkVehicles() {
  try {
    console.log('Checking all vehicles in database...\n');
    
    const allVehicles = await sql`
      SELECT id, title, published, status, featured, created_at 
      FROM vehicles 
      ORDER BY created_at DESC
    `;

    console.log(`Total vehicles: ${allVehicles.length}\n`);

    allVehicles.forEach((vehicle: any, index: number) => {
      console.log(`${index + 1}. ${vehicle.title}`);
      console.log(`   Published: ${vehicle.published}`);
      console.log(`   Status: ${vehicle.status}`);
      console.log(`   Featured: ${vehicle.featured}`);
      console.log(`   Created: ${vehicle.created_at}`);
      console.log('');
    });

    await sql.end();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await sql.end();
    process.exit(1);
  }
}

checkVehicles();
