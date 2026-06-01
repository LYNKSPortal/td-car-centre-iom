import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createEnquiry } from '@/lib/queries';
import { enquirySchema } from '@/lib/validations';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = enquirySchema.parse(body);

    const enquiry = await createEnquiry(validatedData);

    if (process.env.RESEND_API_KEY) {
      try {
        await resend.emails.send({
          from: 'TD Car Centre <enquiries@tdcar.im>',
          to: 'tony@tdcar.im',
          replyTo: validatedData.email,
          subject: `New Enquiry from ${validatedData.name}`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h2 style="color: #dc2626;">New Website Enquiry</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Name</td><td style="padding: 8px 0;">${validatedData.name}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email</td><td style="padding: 8px 0;"><a href="mailto:${validatedData.email}">${validatedData.email}</a></td></tr>
                ${validatedData.phone ? `<tr><td style="padding: 8px 0; font-weight: bold;">Phone</td><td style="padding: 8px 0;"><a href="tel:${validatedData.phone}">${validatedData.phone}</a></td></tr>` : ''}
                <tr><td style="padding: 8px 0; font-weight: bold;">Type</td><td style="padding: 8px 0;">${validatedData.enquiryType.replace(/_/g, ' ')}</td></tr>
              </table>
              <hr style="margin: 16px 0; border: 1px solid #e5e7eb;" />
              <h3 style="color: #374151;">Message</h3>
              <p style="white-space: pre-wrap; color: #374151;">${validatedData.message}</p>
              <hr style="margin: 16px 0; border: 1px solid #e5e7eb;" />
              <p style="color: #6b7280; font-size: 12px;">This enquiry was submitted via <a href="https://www.tdcar.im">tdcar.im</a>. Reply directly to this email to respond to the customer.</p>
            </div>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send notification email:', emailError);
      }
    }

    return NextResponse.json({ success: true, enquiry }, { status: 201 });
  } catch (error) {
    console.error('Error creating enquiry:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create enquiry' },
      { status: 400 }
    );
  }
}
