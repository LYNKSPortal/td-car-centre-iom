import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { vehicles } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const make = searchParams.get('make');

  if (!make) {
    return NextResponse.json({ models: [] });
  }

  try {
    // Get distinct models for the selected make
    const result = await db
      .selectDistinct({ model: vehicles.model })
      .from(vehicles)
      .where(
        and(
          eq(vehicles.make, make),
          eq(vehicles.published, true)
        )
      );

    const models = result.map(r => r.model).filter(Boolean);

    return NextResponse.json({ models });
  } catch (error) {
    console.error('Error fetching models:', error);
    return NextResponse.json({ models: [] });
  }
}
