import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { vehicles, vehicleImages } from '@/lib/db/schema';
import cloudinary from '@/lib/cloudinary';
import fs from 'fs';
import path from 'path';

const VEHICLES_DIR = '/Users/user/CascadeProjects/td-car-centre/public/New website';

// Vehicle data for the 16 missing vehicles
const missingVehicles = [
  {
    folder: 'Audi RS5',
    make: 'Audi',
    model: 'RS5',
    year: 2020,
    price: 45000,
    mileage: 25000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    bodyType: 'Coupe',
    drivetrain: 'AWD',
    colour: 'Black',
    engineSize: 2.9,
    doors: 2,
    seats: 4,
    description: 'Stunning Audi RS5 with powerful performance and luxury features.',
  },
  {
    folder: 'BMW 220D M SPORT',
    make: 'BMW',
    model: '220D M Sport',
    year: 2020,
    price: 28000,
    mileage: 30000,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    bodyType: 'Coupe',
    drivetrain: 'RWD',
    colour: 'White',
    engineSize: 2.0,
    doors: 2,
    seats: 4,
    description: 'BMW 220D M Sport with excellent fuel economy and sporty styling.',
  },
  {
    folder: 'BMW 220I GT lux',
    make: 'BMW',
    model: '220i Gran Tourer Luxury',
    year: 2020,
    price: 26000,
    mileage: 28000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    bodyType: 'MPV',
    drivetrain: 'FWD',
    colour: 'Silver',
    engineSize: 2.0,
    doors: 5,
    seats: 7,
    description: 'Spacious BMW 220i Gran Tourer with luxury features and 7 seats.',
  },
  {
    folder: 'BMW 42Oi',
    make: 'BMW',
    model: '420i',
    year: 2020,
    price: 32000,
    mileage: 22000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    bodyType: 'Coupe',
    drivetrain: 'RWD',
    colour: 'Blue',
    engineSize: 2.0,
    doors: 2,
    seats: 4,
    description: 'Elegant BMW 420i Coupe with refined performance.',
  },
  {
    folder: 'BMW 530d',
    make: 'BMW',
    model: '530d',
    year: 2020,
    price: 38000,
    mileage: 35000,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    bodyType: 'Saloon',
    drivetrain: 'RWD',
    colour: 'Black',
    engineSize: 3.0,
    doors: 4,
    seats: 5,
    description: 'Luxurious BMW 530d with powerful diesel engine and premium features.',
  },
  {
    folder: 'BMW I3',
    make: 'BMW',
    model: 'i3',
    year: 2020,
    price: 24000,
    mileage: 18000,
    transmission: 'Automatic',
    fuelType: 'Electric',
    bodyType: 'Hatchback',
    drivetrain: 'RWD',
    colour: 'White',
    engineSize: 0.0,
    doors: 4,
    seats: 4,
    description: 'Innovative BMW i3 electric vehicle with zero emissions.',
  },
  {
    folder: 'Bmw 335i',
    make: 'BMW',
    model: '335i',
    year: 2020,
    price: 35000,
    mileage: 32000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    bodyType: 'Saloon',
    drivetrain: 'RWD',
    colour: 'Grey',
    engineSize: 3.0,
    doors: 4,
    seats: 5,
    description: 'Powerful BMW 335i with turbocharged performance.',
  },
  {
    folder: 'Merc 220d',
    make: 'Mercedes-Benz',
    model: 'C220d',
    year: 2020,
    price: 32000,
    mileage: 28000,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    bodyType: 'Saloon',
    drivetrain: 'RWD',
    colour: 'Silver',
    engineSize: 2.0,
    doors: 4,
    seats: 5,
    description: 'Mercedes-Benz C220d with refined luxury and efficiency.',
  },
  {
    folder: 'Merc A180',
    make: 'Mercedes-Benz',
    model: 'A180',
    year: 2020,
    price: 24000,
    mileage: 25000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    bodyType: 'Hatchback',
    drivetrain: 'FWD',
    colour: 'White',
    engineSize: 1.3,
    doors: 5,
    seats: 5,
    description: 'Compact Mercedes-Benz A180 with premium features.',
  },
  {
    folder: 'Merc c43',
    make: 'Mercedes-Benz',
    model: 'C43 AMG',
    year: 2020,
    price: 48000,
    mileage: 20000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    bodyType: 'Saloon',
    drivetrain: 'AWD',
    colour: 'Black',
    engineSize: 3.0,
    doors: 4,
    seats: 5,
    description: 'High-performance Mercedes-Benz C43 AMG with exceptional power.',
  },
  {
    folder: 'Mercedes 220A',
    make: 'Mercedes-Benz',
    model: 'A220',
    year: 2020,
    price: 28000,
    mileage: 22000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    bodyType: 'Hatchback',
    drivetrain: 'FWD',
    colour: 'Red',
    engineSize: 2.0,
    doors: 5,
    seats: 5,
    description: 'Sporty Mercedes-Benz A220 with modern technology.',
  },
  {
    folder: 'Mitsubishi ASX',
    make: 'Mitsubishi',
    model: 'ASX',
    year: 2020,
    price: 18000,
    mileage: 35000,
    transmission: 'Manual',
    fuelType: 'Petrol',
    bodyType: 'SUV',
    drivetrain: 'FWD',
    colour: 'Silver',
    engineSize: 1.6,
    doors: 5,
    seats: 5,
    description: 'Practical Mitsubishi ASX compact SUV.',
  },
  {
    folder: 'Mustang',
    make: 'Ford',
    model: 'Mustang',
    year: 2020,
    price: 42000,
    mileage: 15000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    bodyType: 'Coupe',
    drivetrain: 'RWD',
    colour: 'Red',
    engineSize: 5.0,
    doors: 2,
    seats: 4,
    description: 'Iconic Ford Mustang with V8 power and American muscle.',
  },
  {
    folder: 'Range rover evoque convertible',
    make: 'Land Rover',
    model: 'Range Rover Evoque Convertible',
    year: 2020,
    price: 45000,
    mileage: 20000,
    transmission: 'Automatic',
    fuelType: 'Petrol',
    bodyType: 'Convertible',
    drivetrain: 'AWD',
    colour: 'White',
    engineSize: 2.0,
    doors: 2,
    seats: 4,
    description: 'Unique Range Rover Evoque Convertible with luxury and open-air driving.',
  },
  {
    folder: 'RR Velar - White',
    make: 'Land Rover',
    model: 'Range Rover Velar',
    year: 2020,
    price: 52000,
    mileage: 18000,
    transmission: 'Automatic',
    fuelType: 'Diesel',
    bodyType: 'SUV',
    drivetrain: 'AWD',
    colour: 'White',
    engineSize: 3.0,
    doors: 5,
    seats: 5,
    description: 'Stunning Range Rover Velar with cutting-edge design and technology.',
  },
  {
    folder: 'VW Transporter - camper',
    make: 'Volkswagen',
    model: 'Transporter Camper',
    year: 2020,
    price: 38000,
    mileage: 25000,
    transmission: 'Manual',
    fuelType: 'Diesel',
    bodyType: 'Van',
    drivetrain: 'FWD',
    colour: 'White',
    engineSize: 2.0,
    doors: 4,
    seats: 4,
    description: 'Volkswagen Transporter converted to camper van, perfect for adventures.',
  },
];

function generateSlug(make: string, model: string): string {
  return `${make}-${model}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

async function uploadImageToCloudinary(imagePath: string, vehicleName: string): Promise<any> {
  try {
    const result = await cloudinary.uploader.upload(imagePath, {
      folder: `td-car-centre/vehicles/${vehicleName}`,
      resource_type: 'auto',
    });
    return result;
  } catch (error) {
    console.error(`Error uploading ${imagePath}:`, error);
    throw error;
  }
}

async function createVehicleWithImages(vehicleData: typeof missingVehicles[0]) {
  const folderPath = path.join(VEHICLES_DIR, vehicleData.folder);
  
  // Read folder contents
  const files = fs.readdirSync(folderPath);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

  // Create vehicle
  const slug = generateSlug(vehicleData.make, vehicleData.model);
  const title = `${vehicleData.make} ${vehicleData.model}`;

  const [newVehicle] = await db.insert(vehicles).values({
    title,
    slug,
    make: vehicleData.make,
    model: vehicleData.model,
    year: vehicleData.year,
    price: vehicleData.price.toString(),
    mileage: vehicleData.mileage,
    transmission: vehicleData.transmission,
    fuelType: vehicleData.fuelType,
    bodyType: vehicleData.bodyType,
    drivetrain: vehicleData.drivetrain,
    colour: vehicleData.colour,
    engineSize: vehicleData.engineSize > 0 ? `${vehicleData.engineSize}L` : 'Electric',
    doors: vehicleData.doors,
    seats: vehicleData.seats,
    description: vehicleData.description,
    status: 'available',
    featured: false,
    published: true,
  }).returning();

  // Upload images
  let uploadedCount = 0;
  const errors: string[] = [];

  for (let i = 0; i < imageFiles.length; i++) {
    const imageFile = imageFiles[i];
    const imagePath = path.join(folderPath, imageFile);

    try {
      const result = await uploadImageToCloudinary(imagePath, vehicleData.folder);

      await db.insert(vehicleImages).values({
        vehicleId: newVehicle.id,
        imageUrl: result.secure_url,
        publicId: result.public_id,
        sortOrder: i,
      });

      uploadedCount++;
    } catch (error) {
      errors.push(`${imageFile}: ${error}`);
    }
  }

  return {
    folder: vehicleData.folder,
    vehicleId: newVehicle.id,
    vehicleName: title,
    imagesFound: imageFiles.length,
    imagesUploaded: uploadedCount,
    errors: errors.length > 0 ? errors : undefined,
  };
}

export async function POST() {
  try {
    const results = [];

    for (const vehicleData of missingVehicles) {
      try {
        const result = await createVehicleWithImages(vehicleData);
        results.push({ ...result, status: 'success' });
      } catch (error) {
        results.push({
          folder: vehicleData.folder,
          status: 'error',
          error: String(error),
        });
      }
    }

    return NextResponse.json({
      success: true,
      totalVehicles: missingVehicles.length,
      results,
    });
  } catch (error) {
    console.error('Add missing vehicles error:', error);
    return NextResponse.json(
      { error: 'Failed to add missing vehicles', details: String(error) },
      { status: 500 }
    );
  }
}
