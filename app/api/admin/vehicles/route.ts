import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { vehicles } from '@/lib/db/schema';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Generate slug from title
    const slug = body.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');

    const [newVehicle] = await db
      .insert(vehicles)
      .values({
        title: body.title,
        slug,
        make: body.make,
        model: body.model,
        variant: body.variant || null,
        year: body.year,
        price: body.price,
        financeMonthly: body.financeMonthly || null,
        mileage: body.mileage,
        transmission: body.transmission,
        fuelType: body.fuelType,
        bodyType: body.bodyType,
        drivetrain: body.drivetrain || null,
        colour: body.colour || null,
        interiorColour: body.interiorColour || null,
        engineSize: body.engineSize || null,
        doors: body.doors || null,
        seats: body.seats || null,
        registration: body.registration || null,
        previousOwners: body.previousOwners || null,
        height: body.height || null,
        length: body.length || null,
        width: body.width || null,
        description: body.description || null,
        status: body.status,
        published: true,
      })
      .returning();

    return NextResponse.json(newVehicle);
  } catch (error) {
    console.error('Create vehicle error:', error);
    return NextResponse.json(
      { error: 'Failed to create vehicle' },
      { status: 500 }
    );
  }
}
