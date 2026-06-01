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

        {/* Terms & Conditions */}
        <div className="mt-10 md:mt-12 bg-zinc-900/50 border border-white/10 rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-white/10">
            <h2 className="text-lg font-semibold">TD Rentals – TT 2026 Vehicle Rental Terms &amp; Conditions</h2>
          </div>

          <div className="px-6 py-8 prose prose-invert max-w-none
              prose-headings:text-white prose-headings:font-bold
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
              prose-h3:text-lg prose-h3:text-zinc-200 prose-h3:mt-6 prose-h3:mb-2
              prose-p:text-zinc-300 prose-p:leading-relaxed prose-p:mb-4
              prose-ul:text-zinc-300 prose-ul:mb-4 prose-ul:pl-6
              prose-li:mb-2
              prose-strong:text-white
              prose-a:text-red-500 prose-a:no-underline hover:prose-a:underline
              prose-hr:border-white/10 prose-hr:my-8">
              <h2>1. Introduction</h2>
              <p>These Terms &amp; Conditions govern the rental of vehicles provided by TD Rentals, a trading division of TD Car Centre ("TD Rentals", "we", "us", or "our"). By submitting a rental enquiry, making payment, or collecting a vehicle, the renter ("you" or "the Hirer") agrees to be bound by these Terms &amp; Conditions.</p>
              <hr />

              <h2>2. Rental Period</h2>
              <p>The standard TT rental package covers the Isle of Man TT 2026 fortnight as agreed at the time of booking.</p>
              <p>The vehicle must be returned on or before the agreed return date and time. Failure to return the vehicle as agreed may result in additional charges.</p>
              <hr />

              <h2>3. Rental Charges &amp; Deposit</h2>
              <ul>
                <li>Rental Fee: £500</li>
                <li>Refundable Security Deposit: £250</li>
                <li>Total Due on Collection: £750</li>
              </ul>
              <p>The security deposit will be refunded within 7 working days of vehicle return, subject to:</p>
              <ul>
                <li>The vehicle being returned in the same condition as supplied (fair wear and tear excepted);</li>
                <li>No outstanding charges, penalties, or damages;</li>
                <li>No breach of these Terms &amp; Conditions.</li>
              </ul>
              <p>TD Rentals reserves the right to retain part or all of the deposit where additional charges apply.</p>
              <hr />

              <h2>4. Driver Eligibility</h2>
              <p>To rent and drive a TD Rentals vehicle, all drivers must:</p>
              <ul>
                <li>Be at least 21 years of age;</li>
                <li>Hold a full valid driving licence;</li>
                <li>Have held a full driving licence for a minimum of two years;</li>
                <li>Present their original driving licence at vehicle collection;</li>
                <li>Have no major driving convictions, disqualifications, or dangerous driving offences within the previous five years.</li>
              </ul>
              <p>TD Rentals reserves the right to refuse rental at its sole discretion if a driver does not meet our insurance requirements.</p>
              <hr />

              <h2>5. Additional Drivers</h2>
              <p>Any additional driver must:</p>
              <ul>
                <li>Be declared before vehicle collection;</li>
                <li>Meet the same eligibility requirements as the main driver;</li>
                <li>Be approved by TD Rentals.</li>
              </ul>
              <p>Unauthorised drivers are not permitted to operate the vehicle and may invalidate insurance cover.</p>
              <hr />

              <h2>6. Insurance</h2>
              <p>Comprehensive insurance is included within the rental price, subject to the terms and conditions of our insurer.</p>
              <p>Insurance cover may be void if:</p>
              <ul>
                <li>The vehicle is driven by an unauthorised driver;</li>
                <li>The driver is under the influence of alcohol or drugs;</li>
                <li>The vehicle is used unlawfully or recklessly;</li>
                <li>False information has been provided during the booking process.</li>
              </ul>
              <p>The Hirer remains liable for any uninsured losses, insurance excesses, penalties, or damages resulting from a breach of these Terms.</p>
              <hr />

              <h2>7. Vehicle Use</h2>
              <p>The vehicle must only be used:</p>
              <ul>
                <li>On public roads within the Isle of Man;</li>
                <li>For private and lawful purposes;</li>
                <li>In accordance with all applicable traffic laws and regulations.</li>
              </ul>
              <p>The following are strictly prohibited:</p>
              <ul>
                <li>Racing, speed trials, track use, or participation in any motorsport event;</li>
                <li>Driving on closed TT race roads during official road closures;</li>
                <li>Driving under the influence of alcohol or drugs;</li>
                <li>Towing without prior written approval;</li>
                <li>Carrying passengers for hire or reward;</li>
                <li>Any illegal, dangerous, or reckless activity.</li>
              </ul>
              <hr />

              <h2>8. Fuel</h2>
              <p>Vehicles will be supplied with a full tank of fuel and should be returned with a full tank.</p>
              <p>If the vehicle is returned with less fuel than supplied, TD Rentals may charge the cost of refuelling together with an administration fee.</p>
              <hr />

              <h2>9. Mileage</h2>
              <p>Unlimited mileage is provided within the Isle of Man during the rental period.</p>
              <p>Vehicles must not be removed from the Isle of Man without prior written consent from TD Rentals.</p>
              <hr />

              <h2>10. Breakdown &amp; Recovery</h2>
              <p>Breakdown cover is included throughout the rental period.</p>
              <p>In the event of a breakdown, mechanical fault, accident, or any situation requiring vehicle recovery, the Hirer must contact TD Rentals immediately and follow any instructions provided.</p>
              <p>For breakdown and recovery assistance during the rental period, please contact:</p>
              <p><strong>Przemek (WhatsApp): <a href="https://wa.me/447624255793">+44 76 2425 5793</a></strong></p>
              <p>Repairs, recovery arrangements, or vehicle modifications must not be authorised or undertaken without the prior approval of TD Rentals, except where immediate action is required to prevent further damage or ensure safety.</p>
              <p>The Hirer must take all reasonable steps to safeguard the vehicle until assistance arrives.</p>
              <hr />

              <h2>11. Accidents &amp; Damage</h2>
              <p>The Hirer must immediately report:</p>
              <ul>
                <li>Any accident;</li>
                <li>Any theft or attempted theft;</li>
                <li>Any damage to the vehicle;</li>
                <li>Any incident involving third parties.</li>
              </ul>
              <p>The Hirer must:</p>
              <ul>
                <li>Obtain details of all parties involved;</li>
                <li>Notify the police where legally required;</li>
                <li>Cooperate fully with insurance investigations.</li>
              </ul>
              <p>The Hirer remains responsible for any damage not covered by insurance.</p>
              <hr />

              <h2>12. Parking Fines &amp; Traffic Offences</h2>
              <p>The Hirer is responsible for:</p>
              <ul>
                <li>Parking tickets;</li>
                <li>Speeding fines;</li>
                <li>Traffic offences;</li>
                <li>Any penalties incurred during the rental period.</li>
              </ul>
              <p>TD Rentals may provide driver details to relevant authorities and may charge an administration fee for processing such notices.</p>
              <hr />

              <h2>13. Cancellation Policy</h2>
              <h3>More than 14 days before collection</h3>
              <p>Full refund of any rental payments made.</p>
              <h3>7–14 days before collection</h3>
              <p>50% refund of rental payments made.</p>
              <h3>Less than 7 days before collection</h3>
              <p>No refund.</p>
              <p>TD Rentals may waive cancellation charges at its discretion.</p>
              <hr />

              <h2>14. Vehicle Condition</h2>
              <p>The vehicle will be inspected before and after the rental period.</p>
              <p>The Hirer accepts responsibility for returning the vehicle in substantially the same condition as supplied, excluding reasonable wear and tear.</p>
              <p>Additional charges may apply for:</p>
              <ul>
                <li>Excessive dirt or mud;</li>
                <li>Smoking or vaping in the vehicle;</li>
                <li>Interior staining;</li>
                <li>Pet-related damage;</li>
                <li>Lost keys;</li>
                <li>Wheel, tyre, or bodywork damage beyond normal wear and tear.</li>
              </ul>
              <hr />

              <h2>15. Refusal of Rental</h2>
              <p>TD Rentals reserves the right to refuse or cancel any rental where:</p>
              <ul>
                <li>Information provided is inaccurate or misleading;</li>
                <li>Driver eligibility requirements are not met;</li>
                <li>Insurance approval cannot be obtained;</li>
                <li>The Hirer behaves abusively, aggressively, or unlawfully.</li>
              </ul>
              <p>In such cases, TD Rentals' liability shall be limited to the return of any sums paid where appropriate.</p>
              <hr />

              <h2>16. Limitation of Liability</h2>
              <p>TD Rentals shall not be liable for:</p>
              <ul>
                <li>Missed ferry crossings;</li>
                <li>Missed TT sessions or events;</li>
                <li>Travel delays;</li>
                <li>Accommodation costs;</li>
                <li>Loss of personal belongings;</li>
                <li>Consequential or indirect losses arising from vehicle breakdown, accident, or unavailability.</li>
              </ul>
              <p>Nothing in these Terms excludes liability that cannot be excluded by law.</p>
              <hr />

              <h2>17. Data Protection</h2>
              <p>Personal information provided during the booking process will be processed in accordance with our Privacy Policy and applicable Isle of Man data protection legislation.</p>
              <p>Information may be shared with insurers, breakdown providers, recovery operators, and law enforcement authorities where required.</p>
              <hr />

              <h2>18. Governing Law</h2>
              <p>These Terms &amp; Conditions shall be governed by and construed in accordance with the laws of the Isle of Man.</p>
              <p>Any disputes arising from the rental agreement shall be subject to the exclusive jurisdiction of the Courts of the Isle of Man.</p>
              <hr />

              <h2>19. Contact Information</h2>
              <p>
                TD Rentals<br />
                TD Car Centre<br />
                Unit 02, Hills Meadow Industrial Estate<br />
                Peel Road<br />
                Douglas<br />
                Isle of Man<br />
                IM1 5EA
              </p>
              <p>Telephone: <a href="tel:01624670590">01624 670590</a></p>
              <p>Email: <a href="mailto:tony@tdcar.im">tony@tdcar.im</a></p>
              <hr />
              <p className="text-zinc-400 text-xs italic">By submitting a rental enquiry and collecting a vehicle, you confirm that you have read, understood, and agreed to these Terms &amp; Conditions.</p>
            </div>
        </div>

      </div>
    </div>
  );
}
