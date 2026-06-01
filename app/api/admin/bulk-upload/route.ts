import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { vehicles, vehicleImages } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import cloudinary from '@/lib/cloudinary';
import fs from 'fs';
import path from 'path';

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

async function processVehicleFolder(folderName: string, results: any[]) {
  const folderPath = path.join(VEHICLES_DIR, folderName);
  const vehicleInfo = vehicleMapping[folderName];

  if (!vehicleInfo) {
    results.push({ folder: folderName, status: 'skipped', reason: 'no mapping found' });
    return;
  }

  // Read folder contents
  const files = fs.readdirSync(folderPath);
  const imageFiles = files.filter(f => /\.(jpg|jpeg|png|webp)$/i.test(f));

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
    results.push({ 
      folder: folderName, 
      status: 'error', 
      reason: 'no matching vehicle in database',
      make: vehicleInfo.make,
      model: vehicleInfo.model
    });
    return;
  }

  // Delete existing images for this vehicle
  const existingImages = await db
    .select()
    .from(vehicleImages)
    .where(eq(vehicleImages.vehicleId, matchingVehicle.id));

  for (const img of existingImages) {
    try {
      if (img.publicId) {
        await cloudinary.uploader.destroy(img.publicId);
      }
    } catch (error) {
      console.error(`Error deleting old image ${img.publicId}:`, error);
    }
  }

  await db.delete(vehicleImages).where(eq(vehicleImages.vehicleId, matchingVehicle.id));

  // Upload new images
  let uploadedCount = 0;
  const errors: string[] = [];
  
  for (let i = 0; i < imageFiles.length; i++) {
    const imageFile = imageFiles[i];
    const imagePath = path.join(folderPath, imageFile);

    try {
      const result = await uploadImageToCloudinary(imagePath, folderName);

      await db.insert(vehicleImages).values({
        vehicleId: matchingVehicle.id,
        imageUrl: result.secure_url,
        publicId: result.public_id,
        sortOrder: i,
      });

      uploadedCount++;
    } catch (error) {
      errors.push(`${imageFile}: ${error}`);
    }
  }

  results.push({
    folder: folderName,
    status: 'success',
    vehicleId: matchingVehicle.id,
    vehicleName: `${matchingVehicle.make} ${matchingVehicle.model}`,
    imagesFound: imageFiles.length,
    imagesUploaded: uploadedCount,
    deletedOldImages: existingImages.length,
    errors: errors.length > 0 ? errors : undefined,
  });
}

export async function POST(request: NextRequest) {
  try {
    const results: any[] = [];

    const folders = fs.readdirSync(VEHICLES_DIR).filter(f => {
      const fullPath = path.join(VEHICLES_DIR, f);
      return fs.statSync(fullPath).isDirectory();
    });

    for (const folder of folders) {
      try {
        await processVehicleFolder(folder, results);
      } catch (error) {
        results.push({
          folder,
          status: 'error',
          error: String(error),
        });
      }
    }

    return NextResponse.json({
      success: true,
      totalFolders: folders.length,
      results,
    });
  } catch (error) {
    console.error('Bulk upload error:', error);
    return NextResponse.json(
      { error: 'Failed to process bulk upload', details: String(error) },
      { status: 500 }
    );
  }
}
