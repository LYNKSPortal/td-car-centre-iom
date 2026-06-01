import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { vehicles } from '@/lib/db/schema';

export async function POST() {
  try {
    console.log('Starting vehicle insert test...');
    
    const testVehicle = {
      title: 'Audi RS5',
      slug: 'audi-rs5',
      make: 'Audi',
      model: 'RS5',
      year: 2020,
      price: '45000',
      mileage: 25000,
      transmission: 'Automatic' as const,
      fuelType: 'Petrol' as const,
      bodyType: 'Coupe' as const,
      drivetrain: 'AWD' as const,
      colour: 'Black',
      engineSize: '2.9L',
      doors: 2,
      seats: 4,
      description: 'Stunning Audi RS5 with powerful performance and luxury features.',
      status: 'available' as const,
      featured: false,
      published: true,
    };

    console.log('Inserting vehicle:', testVehicle);

    const [newVehicle] = await db.insert(vehicles).values(testVehicle).returning();

    console.log('Vehicle created successfully:', newVehicle);

    return NextResponse.json({
      success: true,
      vehicle: newVehicle,
    });
  } catch (error: any) {
    console.error('Full error object:', error);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);
    console.error('Error cause:', error.cause);
    
    return NextResponse.json(
      { 
        error: 'Failed to create vehicle', 
        message: error.message,
        cause: error.cause?.toString(),
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}
