import dotenv from 'dotenv';
import { db } from '../lib/db';
import { vehicles } from '../lib/db/schema';

// Load environment variables
dotenv.config({ path: '.env.local' });

const vehicleMapping: Record<string, { make: string; model: string }> = {
  'BMW 220D M SPORT': { make: 'BMW', model: '220D M Sport' },
  'Audi RS5': { make: 'Audi', model: 'RS5' },
  'BMW 12Od': { make: 'BMW', model: '120d' },
  'BMW 42Oi': { make: 'BMW', model: '420i' },
  'BMW 220I GT lux': { make: 'BMW', model: '220i Gran Tourer Luxury' },
  'Bmw 335i': { make: 'BMW', model: '335i' },
  'BMW 530d': { make: 'BMW', model: '530d' },
  'BMW I3': { make: 'BMW', model: 'i3' },
  'Ferrai - Convertible': { make: 'Ferrari', model: 'Mondial Convertible' },
  'Fiesta st-2': { make: 'Ford', model: 'Fiesta ST-2' },
  'Ford focus': { make: 'Ford', model: 'Focus' },
  'Ford kuga': { make: 'Ford', model: 'Kuga' },
  'Honda civic - grey': { make: 'Honda', model: 'Civic' },
  'Mclaren 570S': { make: 'McLaren', model: '570S' },
  'Merc 220d': { make: 'Mercedes-Benz', model: 'C220d' },
  'Merc A35': { make: 'Mercedes-Benz', model: 'A35 AMG' },
  'Merc A180': { make: 'Mercedes-Benz', model: 'A180' },
  'Merc c43': { make: 'Mercedes-Benz', model: 'C43 AMG' },
  'Merc GLA 45': { make: 'Mercedes-Benz', model: 'GLA 45 AMG' },
  'Mercedes 220A': { make: 'Mercedes-Benz', model: 'A220' },
  'Mini - white - B stripe': { make: 'MINI', model: 'Cooper' },
  'MINI cooper': { make: 'MINI', model: 'Cooper' },
  'Mitsubishi ASX': { make: 'Mitsubishi', model: 'ASX' },
  'Mustang': { make: 'Ford', model: 'Mustang' },
  'Nissan NV200': { make: 'Nissan', model: 'NV200' },
  'Porsche - Cayenne': { make: 'Porsche', model: 'Cayenne' },
  'Range rover evoque convertible': { make: 'Land Rover', model: 'Range Rover Evoque Convertible' },
  'RR Velar - White': { make: 'Land Rover', model: 'Range Rover Velar' },
  'Ssangyong Tavoli': { make: 'SsangYong', model: 'Tivoli' },
  'Ssangyong tavoli - silver': { make: 'SsangYong', model: 'Tivoli' },
  'Susuki Jimny': { make: 'Suzuki', model: 'Jimny' },
  'Toyota corolla': { make: 'Toyota', model: 'Corolla' },
  'VW Amarok': { make: 'Volkswagen', model: 'Amarok' },
  'VW caddy': { make: 'Volkswagen', model: 'Caddy' },
  'vw golf - Black': { make: 'Volkswagen', model: 'Golf' },
  'VW Transporter - camper': { make: 'Volkswagen', model: 'Transporter Camper' },
};

async function main() {
  console.log('🔍 Verifying vehicle mappings...\n');

  // Get all vehicles from database
  const allVehicles = await db.select().from(vehicles);
  
  console.log(`📊 Found ${allVehicles.length} vehicles in database:\n`);
  
  // Group by make
  const byMake: Record<string, any[]> = {};
  allVehicles.forEach(v => {
    if (!byMake[v.make]) byMake[v.make] = [];
    byMake[v.make].push(v);
  });

  // Display all vehicles
  Object.keys(byMake).sort().forEach(make => {
    console.log(`\n${make}:`);
    byMake[make].forEach(v => {
      console.log(`  - ${v.model} (${v.year})`);
    });
  });

  console.log('\n\n🔗 Checking folder mappings:\n');

  // Check each folder mapping
  for (const [folderName, info] of Object.entries(vehicleMapping)) {
    const matchingVehicles = allVehicles.filter(v => v.make === info.make);
    
    const exactMatch = matchingVehicles.find(v => 
      v.model.toLowerCase().includes(info.model.toLowerCase()) ||
      info.model.toLowerCase().includes(v.model.toLowerCase())
    );

    if (exactMatch) {
      console.log(`✅ ${folderName}`);
      console.log(`   → ${exactMatch.make} ${exactMatch.model} (${exactMatch.year})`);
    } else {
      console.log(`❌ ${folderName}`);
      console.log(`   Looking for: ${info.make} ${info.model}`);
      if (matchingVehicles.length > 0) {
        console.log(`   Available ${info.make} models:`);
        matchingVehicles.forEach(v => console.log(`     - ${v.model}`));
      } else {
        console.log(`   No ${info.make} vehicles in database`);
      }
    }
    console.log('');
  }

  process.exit(0);
}

main().catch(error => {
  console.error('Error:', error);
  process.exit(1);
});
