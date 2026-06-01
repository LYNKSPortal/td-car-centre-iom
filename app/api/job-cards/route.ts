import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { jobCards } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

function generateJobCardNo(): string {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const rand = String(Math.floor(1000 + Math.random() * 9000));
  return `JC-${yy}${mm}${dd}-${rand}`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const [card] = await db.insert(jobCards).values({
      jobCardNo: generateJobCardNo(),
      date: body.date || new Date().toISOString().split('T')[0],
      customerName: body.customerName,
      customerPhone: body.customerPhone || null,
      customerEmail: body.customerEmail || null,
      vehicleMake: body.vehicleMake || null,
      vehicleModel: body.vehicleModel || null,
      registration: body.registration || null,
      vin: body.vin || null,
      mileage: body.mileage || null,
      colour: body.colour || null,
      fuelType: body.fuelType || null,
      workRequested: body.workRequested || null,
      healthChecks: body.healthChecks ? JSON.stringify(body.healthChecks) : null,
      partsRequired: body.partsRequired ? JSON.stringify(body.partsRequired) : null,
      workCarriedOut: body.workCarriedOut ? JSON.stringify(body.workCarriedOut) : null,
      additionalRepairs: body.additionalRepairs || null,
      comments: body.comments || null,
      valeted: body.valeted || false,
      roadTested: body.roadTested || false,
      qualityCheck: body.qualityCheck || false,
      customerSignature: body.customerSignature || null,
      customerApprovalDate: body.customerApprovalDate || null,
      completedBy: body.completedBy || null,
      dateCompleted: body.dateCompleted || null,
      finalInvoiceAmount: body.finalInvoiceAmount || null,
      status: 'open',
    }).returning();

    return NextResponse.json({ success: true, jobCard: card }, { status: 201 });
  } catch (error) {
    console.error('Error creating job card:', error);
    return NextResponse.json({ success: false, error: 'Failed to create job card' }, { status: 500 });
  }
}

export async function GET() {
  try {
    const cards = await db.select().from(jobCards).orderBy(desc(jobCards.createdAt));
    return NextResponse.json({ success: true, jobCards: cards });
  } catch (error) {
    console.error('Error fetching job cards:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch job cards' }, { status: 500 });
  }
}
