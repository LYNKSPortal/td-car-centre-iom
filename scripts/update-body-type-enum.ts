import postgres from 'postgres';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = postgres(process.env.DATABASE_URL!, {
  ssl: 'require',
});

async function updateBodyTypeEnum() {
  try {
    console.log('Updating body_type enum...');

    // Step 1: Create new enum type with all values
    await sql`
      CREATE TYPE body_type_new AS ENUM (
        'Saloon',
        'Hatchback',
        'Estate',
        'SUV',
        'Coupe',
        'Convertible',
        'MPV',
        'Crossover (CUV)',
        'Convertible SUV',
        'Coupe SUV',
        'Hatchback SUV',
        'Electric (EV)',
        'Hybrid',
        'Pickup Truck',
        'Off-road (4x4)',
        'Luxury Saloon',
        'Sports Car',
        'Supercar',
        'Hypercar',
        'Roadster',
        'Fastback',
        'Shooting Brake',
        'Microcar',
        'City Car'
      )
    `;
    console.log('✓ Created new enum type');

    // Step 2: Alter table to use new enum
    await sql`
      ALTER TABLE vehicles 
      ALTER COLUMN body_type TYPE body_type_new 
      USING body_type::text::body_type_new
    `;
    console.log('✓ Updated vehicles table column');

    // Step 3: Drop old enum
    await sql`DROP TYPE body_type`;
    console.log('✓ Dropped old enum type');

    // Step 4: Rename new enum to original name
    await sql`ALTER TYPE body_type_new RENAME TO body_type`;
    console.log('✓ Renamed new enum type');

    console.log('\n✓ Successfully updated body_type enum with all new values!');
    
    await sql.end();
    process.exit(0);
  } catch (error) {
    console.error('Error updating enum:', error);
    await sql.end();
    process.exit(1);
  }
}

updateBodyTypeEnum();
