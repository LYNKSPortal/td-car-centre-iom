import postgres from 'postgres';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
});

const vehicles = [
  { title: 'Honda Civic Type R', price: 30795 },
  { title: 'Volkswagen Golf R', price: 23995 },
  { title: 'Bentley Turbo RT', price: 19995 },
  { title: 'Mercedes-Benz GLC', price: 19950 },
  { title: 'MINI Countryman', price: 14950 },
  { title: 'Ford Kuga', price: 14495 },
  { title: 'BMW M135i', price: 13760 },
  { title: 'Volkswagen Golf', price: 13495 },
  { title: 'Audi S3', price: 14495 },
  { title: 'Range Rover Evoque', price: 12495 },
  { title: 'Peugeot RCZ', price: 8750 },
  { title: 'Fiat 500', price: 8995 },
  { title: 'Chevrolet Corvette', price: 49995 },
  { title: 'BMW 2 Series Gran Tourer', price: 17950 },
  { title: 'Škoda Octavia', price: 7495 },
  { title: 'Ford Fiesta', price: 16750 },
  { title: 'Nissan Juke', price: 8995 },
  { title: 'Smart Fortwo Coupe', price: 7995 },
  { title: 'Volkswagen Caddy Maxi', price: 16750 },
  { title: 'McLaren 570S', price: 94995 },
  { title: 'Toyota Corolla Touring Sports', price: 18750 },
  { title: 'SsangYong Tivoli', price: 6995 },
  { title: 'Vauxhall Insignia', price: 7995 },
  { title: 'Mercedes-Benz GLC', price: 17995 },
  { title: 'MINI Cooper S', price: 6750 },
  { title: 'Volkswagen Amarok', price: 11750 },
  { title: 'Ford Focus', price: 13495 },
  { title: 'Citroën DS3', price: 8995 },
  { title: 'Dacia Duster', price: 7495 },
  { title: 'BMW 4 Series Coupe', price: 14250 },
  { title: 'Volkswagen Golf GTI', price: 16995 },
  { title: 'Audi A4', price: 17995 },
  { title: 'Suzuki Jimny', price: 19995 },
  { title: 'Honda Civic Hatchback', price: 13495 },
  { title: 'Ford Transit Custom Double Cab', price: 44995 },
  { title: 'Mercedes-Benz A35 AMG', price: 23495 },
  { title: 'Mercedes-Benz GLA 45 AMG', price: 24995 },
  { title: 'BMW 1 Series Coupe', price: 4495 },
  { title: 'Hyundai i10', price: 4995 },
  { title: 'Renault Trafic', price: 12995 },
  { title: 'BMW 5 Series Touring', price: 23995 },
  { title: 'Mercedes-Benz A-Class', price: 8495 },
  { title: 'BMW 1 Series Hatchback', price: 9500 },
  { title: 'MINI Cooper', price: 11995 },
  { title: 'Lexus NX', price: 23995 },
  { title: 'Nissan Juke', price: 8750 },
  { title: 'Citroën C4 Cactus', price: 6995 },
  { title: 'Ford Kuga', price: 7950 },
  { title: 'BMW 4 Series Coupe', price: 19995 },
  { title: 'BMW 2 Series Coupe', price: 10495 },
  { title: 'BMW X3', price: 11995 },
  { title: 'BMW 4 Series Gran Coupe', price: 19950 },
  { title: 'SsangYong Tivoli', price: 7950 },
  { title: 'Ferrari Mondial Convertible', price: 32995 },
  { title: 'Porsche Cayenne', price: 43995 },
  { title: 'Porsche 911 Carrera 4S', price: 44995 },
];

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function extractMakeAndModel(title: string): { make: string; model: string } {
  const parts = title.split(' ');
  const make = parts[0];
  const model = parts.slice(1).join(' ');
  return { make, model };
}

async function addVehicles() {
  try {
    console.log(`Adding ${vehicles.length} vehicles to the database...\n`);
    
    let successCount = 0;
    let errorCount = 0;

    for (const vehicle of vehicles) {
      try {
        const { make, model } = extractMakeAndModel(vehicle.title);
        const slug = generateSlug(vehicle.title);
        
        await sql`
          INSERT INTO vehicles (
            title, slug, make, model, year, price, mileage, 
            transmission, fuel_type, body_type, status, 
            featured, published, created_at, updated_at
          ) VALUES (
            ${vehicle.title},
            ${slug},
            ${make},
            ${model},
            2020,
            ${vehicle.price},
            50000,
            'Automatic',
            'Petrol',
            'Saloon',
            'available',
            true,
            true,
            NOW(),
            NOW()
          )
        `;
        
        successCount++;
        console.log(`✓ Added: ${vehicle.title} - £${vehicle.price.toLocaleString()}`);
      } catch (error: any) {
        errorCount++;
        console.error(`✗ Failed to add ${vehicle.title}:`, error.message);
      }
    }

    console.log(`\n✓ Successfully added ${successCount} vehicles`);
    if (errorCount > 0) {
      console.log(`✗ Failed to add ${errorCount} vehicles`);
    }
    
    await sql.end();
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    await sql.end();
    process.exit(1);
  }
}

addVehicles();
