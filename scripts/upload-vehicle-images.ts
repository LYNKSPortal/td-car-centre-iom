import fs from 'fs';
import path from 'path';

const VEHICLES_DIR = '/Users/user/CascadeProjects/td-car-centre/public/New website';
const API_BASE = 'http://localhost:3000/api/admin';

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

async function getAllVehicles() {
  const response = await fetch(`${API_BASE}/vehicles`);
  if (!response.ok) {
    throw new Error(`Failed to fetch vehicles: ${response.statusText}`);
  }
  return await response.json();
}

async function uploadImage(vehicleId: string, imagePath: string, sortOrder: number) {
  const imageBuffer = fs.readFileSync(imagePath);
  const imageBlob = new Blob([imageBuffer], { type: 'image/jpeg' });
  
  const formData = new FormData();
  formData.append('image', imageBlob, path.basename(imagePath));
  formData.append('sortOrder', sortOrder.toString());

  const response = await fetch(`${API_BASE}/vehicles/${vehicleId}/images`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Failed to upload image: ${error}`);
  }

  return await response.json();
}

async function deleteVehicleImages(vehicleId: string) {
  // Get all images for the vehicle
  const response = await fetch(`${API_BASE}/vehicles/${vehicleId}`);
  if (!response.ok) return;
  
  const vehicle = await response.json();
  if (!vehicle.images || vehicle.images.length === 0) return;

  // Delete each image
  for (const image of vehicle.images) {
    try {
      await fetch(`${API_BASE}/vehicles/${vehicleId}/images?imageId=${image.id}`, {
        method: 'DELETE',
      });
    } catch (error) {
      console.error(`   Error deleting image ${image.id}:`, error);
    }
  }
}

async function processVehicleFolder(folderName: string, allVehicles: any[]) {
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

  console.log(`   Found ${imageFiles.length} images`);

  // Find matching vehicle
  const matchingVehicle = allVehicles.find(v => 
    v.make === vehicleInfo.make && (
      v.model.toLowerCase().includes(vehicleInfo.model.toLowerCase()) ||
      vehicleInfo.model.toLowerCase().includes(v.model.toLowerCase())
    )
  );

  if (!matchingVehicle) {
    console.log(`   ❌ No matching vehicle found in database`);
    return;
  }

  console.log(`   ✅ Found vehicle: ${matchingVehicle.make} ${matchingVehicle.model} (ID: ${matchingVehicle.id})`);

  // Delete existing images
  console.log(`   🗑️  Deleting old images...`);
  await deleteVehicleImages(matchingVehicle.id);

  // Upload new images
  let uploadedCount = 0;
  for (let i = 0; i < imageFiles.length; i++) {
    const imageFile = imageFiles[i];
    const imagePath = path.join(folderPath, imageFile);

    try {
      console.log(`   ⬆️  Uploading ${i + 1}/${imageFiles.length}: ${imageFile}`);
      await uploadImage(matchingVehicle.id, imagePath, i);
      uploadedCount++;
    } catch (error) {
      console.error(`   ❌ Failed to upload ${imageFile}:`, error);
    }
  }

  console.log(`   ✅ Uploaded ${uploadedCount}/${imageFiles.length} images successfully`);
}

async function main() {
  console.log('🚀 Starting bulk vehicle image upload...\n');
  console.log('⚠️  Make sure localhost:3000 is running!\n');

  // Fetch all vehicles first
  console.log('📥 Fetching all vehicles from database...');
  const allVehicles = await getAllVehicles();
  console.log(`✅ Found ${allVehicles.length} vehicles in database\n`);

  const folders = fs.readdirSync(VEHICLES_DIR).filter(f => {
    const fullPath = path.join(VEHICLES_DIR, f);
    return fs.statSync(fullPath).isDirectory();
  });

  console.log(`Found ${folders.length} vehicle folders\n`);

  for (const folder of folders) {
    try {
      await processVehicleFolder(folder, allVehicles);
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
