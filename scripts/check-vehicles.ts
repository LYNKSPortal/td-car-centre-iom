import { db } from '../lib/db';
import { vehicles } from '../lib/db/schema';
import { desc } from 'drizzle-orm';

async function checkVehicles() {
  console.log('Checking all vehicles in database...\n');
  
  const allVehicles = await db.query.vehicles.findMany({
    orderBy: desc(vehicles.createdAt),
  });

  console.log(`Total vehicles: ${allVehicles.length}\n`);

  allVehicles.forEach((vehicle, index) => {
    console.log(`${index + 1}. ${vehicle.title}`);
    console.log(`   ID: ${vehicle.id}`);
    console.log(`   Published: ${vehicle.published}`);
    console.log(`   Status: ${vehicle.status}`);
    console.log(`   Created: ${vehicle.createdAt}`);
    console.log('');
  });

  process.exit(0);
}

checkVehicles().catch(console.error);
