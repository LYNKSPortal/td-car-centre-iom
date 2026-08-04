import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { db } from '../lib/db';
import { vehicles, vehicleImages } from '../lib/db/schema';
import { eq } from 'drizzle-orm';
import fsPromises from 'fs/promises';
import { uploadBuffer, getPublicUrl, deleteImage } from '../lib/s3';
import { randomUUID } from 'crypto';

// Load environment variables from .env.local
dotenv.config({ path: '.env.local' });

const VEHICLES_DIR = '/Users/user/CascadeProjects/td-car-centre/public/New website';

// Mapping of folder names to vehicle identifiers
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

async function uploadImageToS3(imagePath: string, vehicleName: string): Promise<any> {
  try {
    const buffer = await fsPromises.readFile(imagePath);
    const ext = path.extname(imagePath);
    const key = `td-car-centre/vehicles/${vehicleName}/${randomUUID()}${ext}`;
    const contentType = ext === '.png' ? 'image/png' : ext === '.webp' ? 'image/webp' : 'image/jpeg';
    await uploadBuffer(buffer, key, contentType);
    return { secure_url: getPublicUrl(key), public_id: key };
  } catch (error) {
    console.error(`Error uploading ${imagePath}:`, error);
    throw error;
  }
}

async function processVehicleFolder(folderName: string) {
  const folderPath = path.join(VEHICLES_DIR, folderName);
  const vehicleInfo = vehicleMapping[folderName];

  if (!vehicleInfo) {
    console.log(`⚠️  Skipping ${folderName} - no mapping found`);
    return;
  }

  console.log(`\n📁 Processing: ${folderName}`);
  console.log(`   Make: ${vehicleInfo.make}, Model: ${vehicleInfo.model}`);

  // Read folder contents
  const files = fs.readdirSync(folderPath);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));
  const txtFiles = files.filter(f => f.endsWith('.txt'));

  console.log(`   Found ${imageFiles.length} images`);

  // Find existing vehicle in database
  const existingVehicles = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.make, vehicleInfo.make))
    .limit(100);

  const matchingVehicle = existingVehicles.find(v => 
    v.model.toLowerCase().includes(vehicleInfo.model.toLowerCase()) ||
    vehicleInfo.model.toLowerCase().includes(v.model.toLowerCase())
  );

  if (!matchingVehicle) {
    console.log(`   ❌ No matching vehicle found in database`);
    return;
  }

  console.log(`   ✅ Found vehicle: ${matchingVehicle.make} ${matchingVehicle.model} (ID: ${matchingVehicle.id})`);

  // Delete existing images for this vehicle
  const existingImages = await db
    .select()
    .from(vehicleImages)
    .where(eq(vehicleImages.vehicleId, matchingVehicle.id));

  for (const img of existingImages) {
    try {
      if (img.publicId) {
        await deleteImage(img.publicId);
      }
    } catch (error) {
      console.error(`   Error deleting old image ${img.publicId}:`, error);
    }
  }

  await db.delete(vehicleImages).where(eq(vehicleImages.vehicleId, matchingVehicle.id));
  console.log(`   🗑️  Deleted ${existingImages.length} old images`);

  // Upload new images
  let uploadedCount = 0;
  for (let i = 0; i < imageFiles.length; i++) {
    const imageFile = imageFiles[i];
    const imagePath = path.join(folderPath, imageFile);

    try {
      console.log(`   ⬆️  Uploading ${i + 1}/${imageFiles.length}: ${imageFile}`);
      const result = await uploadImageToS3(imagePath, folderName);

      await db.insert(vehicleImages).values({
        vehicleId: matchingVehicle.id,
        imageUrl: result.secure_url,
        publicId: result.public_id,
        sortOrder: i,
      });

      uploadedCount++;
    } catch (error) {
      console.error(`   ❌ Failed to upload ${imageFile}:`, error);
    }
  }

  console.log(`   ✅ Uploaded ${uploadedCount}/${imageFiles.length} images successfully`);
}

async function main() {
  console.log('🚀 Starting bulk vehicle image upload...\n');

  const folders = fs.readdirSync(VEHICLES_DIR).filter(f => {
    const fullPath = path.join(VEHICLES_DIR, f);
    return fs.statSync(fullPath).isDirectory();
  });

  console.log(`Found ${folders.length} vehicle folders\n`);

  for (const folder of folders) {
    try {
      await processVehicleFolder(folder);
    } catch (error) {
      console.error(`❌ Error processing ${folder}:`, error);
    }
  }

  console.log('\n✅ Bulk upload complete!');
  process.exit(0);
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
