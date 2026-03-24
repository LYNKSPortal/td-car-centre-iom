import { NextRequest, NextResponse } from 'next/server';
import { createEnquiry } from '@/lib/queries';
import { enquirySchema } from '@/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = enquirySchema.parse(body);

    const enquiry = await createEnquiry(validatedData);

    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create enquiry' },
      { status: 400 }
    );
  }
}
