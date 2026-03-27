'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

interface EnquiryFormProps {
  vehicleId?: string;
  vehicleTitle?: string;
}

export function EnquiryForm({ vehicleId, vehicleTitle }: EnquiryFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const data = {
      vehicleId,
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      message: formData.get('message'),
      enquiryType: vehicleId ? 'vehicle' : 'general',
    };

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true);
        e.currentTarget.reset();
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-zinc-900/50 border border-white/10 p-8">
      {isSuccess ? (
        <div className="bg-red-600/10 border border-red-600/20 p-6 text-center">
          <p className="text-lg font-semibold text-red-600 mb-2">Thank you for your enquiry!</p>
          <p className="text-zinc-300">We'll be in touch shortly.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-2 text-zinc-300">
              Name *
            </label>
            <Input id="name" name="name" required />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-2 text-zinc-300">
              Email *
            </label>
            <Input id="email" name="email" type="email" required />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-2 text-zinc-300">
              Phone
            </label>
            <Input id="phone" name="phone" type="tel" />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-2 text-zinc-300">
              Message *
            </label>
            <Textarea id="message" name="message" required rows={6} />
          </div>

          <Button type="submit" variant="primary" size="lg" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send Enquiry'}
          </Button>
        </form>
      )}
    </div>
  );
}
