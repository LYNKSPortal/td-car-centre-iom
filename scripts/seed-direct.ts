import postgres from 'postgres';
import * as bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const sql = postgres(process.env.DATABASE_URL!, { max: 1 });

async function seed() {
  console.log('🌱 Seeding database...');

  try {
    console.log('Creating dealership settings...');
    await sql`
      INSERT INTO dealership_settings (
        business_name, phone, email, address, company_number, opening_hours,
        instagram_url, facebook_url
      ) VALUES (
        'TD Car Centre',
        '+44 1234 567890',
        'sales@tdcarcentre.co.uk',
        '123 Premium Drive, London, SW1A 1AA',
        '12345678',
        '{"monday":"9:00 AM - 6:00 PM","tuesday":"9:00 AM - 6:00 PM","wednesday":"9:00 AM - 6:00 PM","thursday":"9:00 AM - 6:00 PM","friday":"9:00 AM - 6:00 PM","saturday":"10:00 AM - 5:00 PM","sunday":"Closed"}',
        'https://instagram.com/tdcarcentre',
        'https://facebook.com/tdcarcentre'
      )
    `;

    console.log('Creating admin user...');
    const passwordHash = await bcrypt.hash('admin123', 10);
    await sql`
      INSERT INTO users (name, email, password_hash, role)
      VALUES ('Admin User', 'admin@tdcarcentre.co.uk', ${passwordHash}, 'admin')
    `;

    console.log('Creating luxury vehicles...');

    const vehicles = [
      {
        title: '2023 Porsche 911 Carrera S',
        slug: '2023-porsche-911-carrera-s',
        make: 'Porsche',
        model: '911',
        variant: 'Carrera S',
        year: 2023,
        price: '125000',
        finance_monthly: '1850',
        mileage: 2500,
        transmission: 'Automatic',
        fuel_type: 'Petrol',
        body_type: 'Coupe',
        drivetrain: 'RWD',
        colour: 'GT Silver Metallic',
        engine_size: '3.0L Twin-Turbo',
        doors: 2,
        seats: 4,
        registration: 'PO23 RSC',
        previous_owners: 1,
        description: 'Stunning Porsche 911 Carrera S in GT Silver Metallic. This exceptional sports car features the iconic flat-six engine, delivering breathtaking performance and precision handling. Immaculate condition with full Porsche service history.',
        status: 'available',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200&q=80',
          'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80',
        ],
        features: [
          'Sport Chrono Package',
          'Porsche Active Suspension Management',
          'Bose Surround Sound System',
          'Heated Sport Seats',
          'LED Matrix Headlights',
          'Porsche Communication Management',
          'Reversing Camera',
          'Adaptive Cruise Control',
        ],
      },
      {
        title: '2022 Ferrari Roma',
        slug: '2022-ferrari-roma',
        make: 'Ferrari',
        model: 'Roma',
        variant: null,
        year: 2022,
        price: '189950',
        finance_monthly: '2799',
        mileage: 1200,
        transmission: 'Automatic',
        fuel_type: 'Petrol',
        body_type: 'Coupe',
        drivetrain: 'RWD',
        colour: 'Rosso Corsa',
        engine_size: '3.9L V8 Twin-Turbo',
        doors: 2,
        seats: 4,
        registration: 'FE22 RRI',
        previous_owners: 1,
        description: 'Exquisite Ferrari Roma in the iconic Rosso Corsa red. This modern GT combines timeless elegance with cutting-edge performance. The 620hp V8 delivers an intoxicating soundtrack and blistering acceleration. Barely driven and in pristine condition.',
        status: 'available',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=1200&q=80',
          'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200&q=80',
        ],
        features: [
          'Carbon Ceramic Brakes',
          'Ferrari Dynamic Enhancer',
          'Premium Leather Interior',
          'Apple CarPlay',
          'Parking Sensors Front & Rear',
          'Climate Control',
          'Alcantara Steering Wheel',
          'Racing Seats',
        ],
      },
      {
        title: '2023 Lamborghini Urus Performante',
        slug: '2023-lamborghini-urus-performante',
        make: 'Lamborghini',
        model: 'Urus',
        variant: 'Performante',
        year: 2023,
        price: '215000',
        finance_monthly: '3150',
        mileage: 800,
        transmission: 'Automatic',
        fuel_type: 'Petrol',
        body_type: 'SUV',
        drivetrain: 'AWD',
        colour: 'Nero Noctis',
        engine_size: '4.0L V8 Twin-Turbo',
        doors: 5,
        seats: 5,
        registration: 'LA23 MBO',
        previous_owners: 1,
        description: 'The ultimate super SUV. This Lamborghini Urus Performante combines supercar performance with SUV practicality. Finished in sophisticated Nero Noctis with contrasting interior. Nearly new with comprehensive warranty remaining.',
        status: 'available',
        featured: true,
        images: [
          'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1200&q=80',
          'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=1200&q=80',
        ],
        features: [
          'Carbon Ceramic Brakes',
          'Akrapovic Exhaust System',
          'Panoramic Sunroof',
          'Bang & Olufsen Sound System',
          '360 Degree Camera',
          'Adaptive Air Suspension',
          'Lamborghini Infotainment System',
          'Heated & Ventilated Seats',
        ],
      },
    ];

    for (const vehicle of vehicles) {
      const { images, features, ...vehicleData } = vehicle;

      const [insertedVehicle] = await sql`
        INSERT INTO vehicles ${sql(vehicleData)}
        RETURNING id, title
      `;

      console.log(`Created vehicle: ${insertedVehicle.title}`);

      for (let i = 0; i < images.length; i++) {
        await sql`
          INSERT INTO vehicle_images (vehicle_id, image_url, alt_text, sort_order)
          VALUES (${insertedVehicle.id}, ${images[i]}, ${`${insertedVehicle.title} - Image ${i + 1}`}, ${i})
        `;
      }

      for (const feature of features) {
        await sql`
          INSERT INTO vehicle_features (vehicle_id, feature_name)
          VALUES (${insertedVehicle.id}, ${feature})
        `;
      }
    }

    console.log('✅ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log('   - 3 luxury vehicles added');
    console.log('   - Dealership settings configured');
    console.log('   - Admin user created');
    console.log('\n🔐 Admin Login:');
    console.log('   Email: admin@tdcarcentre.co.uk');
    console.log('   Password: admin123');
    console.log('\n🚀 Run "npm run dev" to start your site!');
    
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  } finally {
    await sql.end();
  }
}

seed();
