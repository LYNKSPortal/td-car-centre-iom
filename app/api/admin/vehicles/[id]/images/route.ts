import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { vehicleImages } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import cloudinary from '@/lib/cloudinary';

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const params = await context.params;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `td-car-centre/vehicles/${params.id}`,
          resource_type: 'auto',
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(buffer);
    });

    const maxSortOrder = await db
      .select({ max: vehicleImages.sortOrder })
      .from(vehicleImages)
      .where(eq(vehicleImages.vehicleId, params.id))
      .then(res => res[0]?.max || 0);

    const [newImage] = await db
      .insert(vehicleImages)
      .values({
        vehicleId: params.id,
        imageUrl: result.secure_url,
        publicId: result.public_id,
        altText: file.name,
        sortOrder: maxSortOrder + 1,
      })
      .returning();

    return NextResponse.json(newImage);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const imageId = searchParams.get('imageId');

    if (!imageId) {
      return NextResponse.json({ error: 'Image ID required' }, { status: 400 });
    }

    const [image] = await db
      .select()
      .from(vehicleImages)
      .where(eq(vehicleImages.id, imageId))
      .limit(1);

    if (!image) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 });
    }

    if (image.publicId) {
      await cloudinary.uploader.destroy(image.publicId);
    }

    await db.delete(vehicleImages).where(eq(vehicleImages.id, imageId));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
}
