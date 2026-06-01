'use client';

import { useState } from 'react';
import { Car, Shield, Key, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function TTRentalsPage() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    accommodation: '',
    arrivalDate: '',
    departureDate: '',
    preferredCar: '',
    licenceCountry: '',
    additionalDrivers: '',
    message: '',
    hasValidLicence: false,
    willBringLicence: false,
    agreeTerms: false,
  });

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    if (!formData.hasValidLicence) {
      setStatus('error');
      setErrorMessage('You must hold a valid driving licence to rent with us.');
      return;
    }

    if (!formData.agreeTerms) {
      setStatus('error');
      setErrorMessage('Please agree to the terms and conditions to proceed.');
      return;
    }

    try {
      const message = `
TT RENTAL ENQUIRY

Accommodation: ${formData.accommodation}
Arrival Date: ${formData.arrivalDate}
Departure Date: ${formData.departureDate}
Preferred Car: ${formData.preferredCar || 'No preference'}
Licence Country: ${formData.licenceCountry}
Additional Drivers: ${formData.additionalDrivers || 'None'}
Will Bring Licence: ${formData.willBringLicence ? 'Yes' : 'No'}

Additional Notes: ${formData.message || 'None'}
      `.trim();

      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          message,
          enquiryType: 'general',
        }),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        throw new Error('Failed to submit');
      }
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong. Please call us directly on 01624 670590.');
    }
  };

  return (
    <div className="bg-black min-h-screen">
      {/* Hero */}
      <div className="bg-zinc-950 border-b border-white/10 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded">
              TT 2026
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3 lg:mb-4">
            TD Rentals
          </h1>
          <p className="text-base md:text-lg lg:text-xl text-zinc-400 max-w-2xl">
            Experience the Isle of Man TT in style. Rent one of our premium vehicles for the duration of the TT fortnight.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 lg:py-16">

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">

          {/* Right: Info */}
          <div className="lg:col-span-1 lg:order-2">
            <div className="sticky top-24 space-y-6">
              <div className="bg-zinc-900/50 border border-white/10 p-5 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">What's Included</h3>
                <ul className="space-y-3">
                  {[
                    'Full TT fortnight rental',
                    'Comprehensive insurance',
                    'Breakdown cover',
                    'Unlimited mileage on island',
                    'Full tank on collection',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                      <CheckCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-zinc-900/50 border border-white/10 p-5 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Requirements</h3>
                <ul className="space-y-3">
                  {[
                    'Valid driving licence (must be presented on collection)',
                    'Minimum 2 years driving experience',
                    'Must be 21 or over',
                    'No major convictions in last 5 years',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                      <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-zinc-900/50 border border-white/10 p-5 rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Need Help?</h3>
                <p className="text-sm text-zinc-400 mb-3">Call us directly to discuss availability and car options.</p>
                <a
                  href="tel:01624670590"
                  className="flex items-center gap-2 text-white font-semibold hover:text-red-600 transition-colors"
                >
                  <Phone className="w-4 h-4 text-red-600" />
                  01624 670590
                </a>
              </div>
            </div>
          </div>

          {/* Left: Form */}
          <div className="lg:col-span-2 lg:order-1">
            <div className="bg-zinc-900/50 border border-white/10 p-6 md:p-8 rounded-lg">
              <h2 className="text-2xl font-bold mb-2">Book Your Rental</h2>
              <p className="text-zinc-400 text-sm mb-8">
                Fill in your details below and we'll be in touch to confirm availability and arrange payment.
              </p>

              {status === 'success' ? (
                <div className="text-center py-10">
                  <CheckCircle className="w-14 h-14 text-red-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Enquiry Received!</h3>
                  <p className="text-zinc-400 mb-2">
                    Thanks for your interest in TD Rentals. We'll be in touch shortly to confirm your booking.
                  </p>
                  <p className="text-zinc-500 text-sm">
                    If you need to speak to us urgently, call{' '}
                    <a href="tel:01624670590" className="text-red-600 hover:underline">01624 670590</a>
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8">

                  {status === 'error' && (
                    <div className="bg-red-600/10 border border-red-600/20 text-red-500 px-4 py-3 rounded text-sm">
                      {errorMessage}
                    </div>
                  )}

                  {/* Personal Details */}
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4 pb-2 border-b border-white/10">Your Details</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white mb-1.5">
                          Full Name <span className="text-red-600">*</span>
                        </label>
                        <Input
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Smith"
                          required
                          className="bg-zinc-950 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-1.5">
                          Phone Number <span className="text-red-600">*</span>
                        </label>
                        <Input
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+44 7700 000000"
                          required
                          className="bg-zinc-950 border-white/10 text-white"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-white mb-1.5">
                          Email Address <span className="text-red-600">*</span>
                        </label>
                        <Input
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                          className="bg-zinc-950 border-white/10 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Stay Details */}
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4 pb-2 border-b border-white/10">Your Stay</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="sm:col-span-2">
                        <label className="block text-sm font-medium text-white mb-1.5">
                          Where are you staying on the island? <span className="text-red-600">*</span>
                        </label>
                        <Input
                          name="accommodation"
                          value={formData.accommodation}
                          onChange={handleChange}
                          placeholder="e.g. The Sefton Hotel, Douglas / Private house, Ramsey"
                          required
                          className="bg-zinc-950 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-1.5">
                          Arrival Date <span className="text-red-600">*</span>
                        </label>
                        <Input
                          name="arrivalDate"
                          type="date"
                          value={formData.arrivalDate}
                          onChange={handleChange}
                          required
                          className="bg-zinc-950 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-1.5">
                          Departure Date <span className="text-red-600">*</span>
                        </label>
                        <Input
                          name="departureDate"
                          type="date"
                          value={formData.departureDate}
                          onChange={handleChange}
                          required
                          className="bg-zinc-950 border-white/10 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Rental Preferences */}
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4 pb-2 border-b border-white/10">Rental Preferences</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white mb-1.5">
                          Preferred Car (if any)
                        </label>
                        <Input
                          name="preferredCar"
                          value={formData.preferredCar}
                          onChange={handleChange}
                          placeholder="e.g. BMW, Mercedes, any"
                          className="bg-zinc-950 border-white/10 text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white mb-1.5">
                          Additional Drivers
                        </label>
                        <Input
                          name="additionalDrivers"
                          value={formData.additionalDrivers}
                          onChange={handleChange}
                          placeholder="Number of additional drivers"
                          className="bg-zinc-950 border-white/10 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Licence Details */}
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4 pb-2 border-b border-white/10">Driving Licence</h3>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-white mb-1.5">
                          Country your licence was issued in <span className="text-red-600">*</span>
                        </label>
                        <Input
                          name="licenceCountry"
                          value={formData.licenceCountry}
                          onChange={handleChange}
                          placeholder="e.g. United Kingdom, Ireland, USA"
                          required
                          className="bg-zinc-950 border-white/10 text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <label className="block text-sm font-medium text-white mb-1.5">
                      Anything else we should know?
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Any additional requirements or questions..."
                      className="w-full bg-zinc-950 border border-white/10 text-white rounded-md px-3 py-2 text-sm placeholder:text-zinc-500 focus:outline-none focus:ring-1 focus:ring-red-600 resize-none"
                    />
                  </div>

                  {/* Checkboxes */}
                  <div className="space-y-4 pt-4 border-t border-white/10">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="hasValidLicence"
                        checked={formData.hasValidLicence}
                        onChange={handleChange}
                        className="mt-0.5 w-4 h-4 accent-red-600 flex-shrink-0"
                      />
                      <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                        I confirm I hold a <strong className="text-white">valid driving licence</strong> <span className="text-red-600">*</span>
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="willBringLicence"
                        checked={formData.willBringLicence}
                        onChange={handleChange}
                        className="mt-0.5 w-4 h-4 accent-red-600 flex-shrink-0"
                      />
                      <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                        I will bring my driving licence with me on collection
                      </span>
                    </label>
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="mt-0.5 w-4 h-4 accent-red-600 flex-shrink-0"
                      />
                      <span className="text-sm text-zinc-300 group-hover:text-white transition-colors">
                        I agree to the rental terms & conditions. I understand the total cost is{' '}
                        <strong className="text-white">£500</strong> plus a refundable{' '}
                        <strong className="text-white">£250 deposit</strong> payable on collection. <span className="text-red-600">*</span>
                      </span>
                    </label>
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Submitting...' : 'Submit Rental Enquiry'}
                  </Button>

                  <p className="text-xs text-zinc-500 text-center">
                    By submitting you agree to be contacted by TD Car Centre regarding your rental enquiry.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-10 md:mt-16">
          <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-lg text-center">
            <Car className="w-8 h-8 text-red-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-1">Rental Fee</h3>
            <p className="text-3xl font-bold text-red-600 mb-1">£500</p>
            <p className="text-sm text-zinc-400">Full TT Fortnight</p>
          </div>
          <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-lg text-center">
            <Shield className="w-8 h-8 text-red-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-1">Refundable Deposit</h3>
            <p className="text-3xl font-bold text-red-600 mb-1">£250</p>
            <p className="text-sm text-zinc-400">Returned on collection</p>
          </div>
          <div className="bg-zinc-900/50 border border-white/10 p-6 rounded-lg text-center">
            <Key className="w-8 h-8 text-red-600 mx-auto mb-3" />
            <h3 className="text-lg font-semibold mb-1">Total on Collection</h3>
            <p className="text-3xl font-bold text-white mb-1">£750</p>
            <p className="text-sm text-zinc-400">£500 rental + £250 deposit</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 md:mt-16 bg-gradient-to-r from-zinc-900 to-black border border-white/10 p-6 md:p-10 text-center rounded-lg">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Questions About Our Rental Service?</h2>
          <p className="text-zinc-400 mb-6 max-w-xl mx-auto">
            Our team is on hand to help you find the perfect car for your TT experience. Give us a call or drop in to the showroom.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" size="lg" asChild>
              <a href="tel:01624670590">
                <Phone className="w-4 h-4 mr-2" />
                Call 01624 670590
              </a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="mailto:tony@tdcar.im">Email Us</a>
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
}
