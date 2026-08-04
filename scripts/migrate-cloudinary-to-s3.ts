import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

import { eq } from 'drizzle-orm';
import { randomUUID } from 'crypto';

function extensionFromUrl(url: string) {
  const match = url.match(/\.[a-zA-Z0-9]+(?:\?.*)?$/);
  if (!match) return '.jpg';
  return match[0].split('?')[0];
}

function contentTypeFromExtension(ext: string) {
  switch (ext.toLowerCase()) {
    case '.png':
      return 'image/png';
    case '.webp':
      return 'image/webp';
    case '.gif':
      return 'image/gif';
    case '.pdf':
      return 'application/pdf';
    default:
      return 'image/jpeg';
  }
}

async function migrateUrl(
  sourceUrl: string,
  folder: string,
  s3: typeof import('../lib/s3')
): Promise<{ url: string; key: string } | null> {
  if (!sourceUrl.includes('res.cloudinary.com')) {
    return null; // already migrated or not a Cloudinary URL
  }

  const response = await fetch(sourceUrl);
  if (!response.ok) {
    throw new Error(`Failed to download ${sourceUrl}: ${response.status}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const ext = extensionFromUrl(sourceUrl);
  const key = `td-car-centre/${folder}/${randomUUID()}${ext}`;

  await s3.uploadBuffer(buffer, key, contentTypeFromExtension(ext));

  return { url: s3.getPublicUrl(key), key };
}

async function migrateVehicleImages(
  db: typeof import('../lib/db').db,
  vehicleImages: typeof import('../lib/db/schema').vehicleImages,
  s3: typeof import('../lib/s3')
) {
  console.log('📦 Migrating vehicle images...');

  const allImages = await db.select().from(vehicleImages);
  console.log(`Found ${allImages.length} vehicle image records`);

  let migrated = 0;
  let skipped = 0;
  let failed = 0;

  for (const image of allImages) {
    try {
      const result = await migrateUrl(image.imageUrl, `vehicles/${image.vehicleId}`, s3);

      if (!result) {
        skipped++;
        continue;
      }

      await db
        .update(vehicleImages)
        .set({ imageUrl: result.url, publicId: result.key })
        .where(eq(vehicleImages.id, image.id));

      migrated++;
      console.log(`  ✅ Migrated image ${image.id}`);
    } catch (error) {
      failed++;
      console.error(`  ❌ Failed to migrate image ${image.id} (${image.imageUrl}):`, error);
    }
  }

  console.log(`\nVehicle images: ${migrated} migrated, ${skipped} skipped (already S3/non-Cloudinary), ${failed} failed`);
}

async function migrateDealershipLogo(
  db: typeof import('../lib/db').db,
  dealershipSettings: typeof import('../lib/db/schema').dealershipSettings
) {
  console.log('\n🏢 Checking dealership settings for Cloudinary assets...');

  const settingsRows = await db.select().from(dealershipSettings).limit(1);
  const settings = settingsRows[0];

  if (!settings) {
    console.log('No dealership settings found, skipping.');
    return;
  }

  // No image/logo fields currently exist on dealershipSettings; placeholder for future assets.
  console.log('No dealership-level image fields to migrate.');
}

async function main() {
  console.log('🚀 Starting Cloudinary → S3 migration...\n');

  const { db } = await import('../lib/db');
  const { vehicleImages, dealershipSettings } = await import('../lib/db/schema');
  const s3 = await import('../lib/s3');

  await migrateVehicleImages(db, vehicleImages, s3);
  await migrateDealershipLogo(db, dealershipSettings);

  console.log('\n✅ Migration complete!');
  process.exit(0);
}

main().catch((error) => {
  console.error('Fatal migration error:', error);
  process.exit(1);
});
