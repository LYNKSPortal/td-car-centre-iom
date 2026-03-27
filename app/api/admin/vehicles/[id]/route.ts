import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { vehicles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const params = await context.params;

  try {
    const body = await request.json();

    await db
      .update(vehicles)
      .set({
        title: body.title,
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
      })
      .where(eq(vehicles.id, params.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Vehicle update error:', error);
    return NextResponse.json(
      { error: 'Failed to update vehicle', details: error instanceof Error ? error.message : 'Unknown error' },
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

  const params = await context.params;

  try {
    await db
      .delete(vehicles)
      .where(eq(vehicles.id, params.id));

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete vehicle' },
      { status: 500 }
    );
  }
}
