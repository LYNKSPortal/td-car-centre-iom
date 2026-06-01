import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { vehicleImages } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id: vehicleId } = await context.params;
    const body = await request.json();
    const { imageId } = body;

    // Get all images for this vehicle
    const allImages = await db
      .select()
      .from(vehicleImages)
      .where(eq(vehicleImages.vehicleId, vehicleId));

    // Find the image to move to first position
    const targetImage = allImages.find(img => img.id === imageId);
    if (!targetImage) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    // Reorder: move target to 0, shift others down
    const updates = allImages.map((img, index) => {
      if (img.id === imageId) {
        return { id: img.id, sortOrder: 0 };
      } else if (img.sortOrder < targetImage.sortOrder) {
        return { id: img.id, sortOrder: img.sortOrder + 1 };
      } else {
        return { id: img.id, sortOrder: img.sortOrder };
      }
    });

    // Apply updates
    await Promise.all(
      updates.map(update =>
        db
          .update(vehicleImages)
          .set({ sortOrder: update.sortOrder })
          .where(eq(vehicleImages.id, update.id))
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reorder error:', error);
    return NextResponse.json(
      { error: 'Failed to reorder images' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { images } = body;

    if (!Array.isArray(images)) {
      return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
    }

    // Update sort order for each image
    await Promise.all(
      images.map((img: { id: string; sortOrder: number }) =>
        db
          .update(vehicleImages)
          .set({ sortOrder: img.sortOrder })
          .where(eq(vehicleImages.id, img.id))
      )
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Reorder error:', error);
    return NextResponse.json(
      { error: 'Failed to reorder images' },
      { status: 500 }
    );
  }
}
