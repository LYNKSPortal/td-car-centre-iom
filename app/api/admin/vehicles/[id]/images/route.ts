import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { vehicleImages } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { uploadImage, deleteImage } from '@/lib/s3';

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const params = await context.params;

  // Check AWS S3 env vars are present
  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_REGION || !process.env.AWS_S3_BUCKET_NAME) {
    console.error('Missing AWS S3 environment variables:', {
      access_key_id: !!process.env.AWS_ACCESS_KEY_ID,
      secret_access_key: !!process.env.AWS_SECRET_ACCESS_KEY,
      region: !!process.env.AWS_REGION,
      bucket_name: !!process.env.AWS_S3_BUCKET_NAME,
    });
    return NextResponse.json({ error: 'Server misconfiguration: AWS S3 credentials not set' }, { status: 500 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const result = await uploadImage(file, `vehicles/${params.id}`);

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
      await deleteImage(image.publicId);
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
