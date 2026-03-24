import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { EnquiryForm } from '@/components/enquiry-form';

export const metadata = {
  title: 'Contact Us - TD Car Centre',
  description: 'Get in touch with TD Car Centre. Visit our showroom, call us, or send an enquiry.',
};

export default function ContactPage() {
  return (
    <div className="bg-black min-h-screen">
      <div className="bg-zinc-950 border-b border-white/10 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-zinc-400">
            We're here to help with any questions you may have
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-8">Get In Touch</h2>

            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <a href="tel:+441234567890" className="text-zinc-400 hover:text-white transition-colors">
                    +44 1234 567890
                  </a>
                  <p className="text-sm text-zinc-500 mt-1">Mon-Fri: 9am-6pm, Sat: 10am-5pm</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <a href="mailto:sales@tdcarcentre.co.uk" className="text-zinc-400 hover:text-white transition-colors">
                    sales@tdcarcentre.co.uk
                  </a>
                  <p className="text-sm text-zinc-500 mt-1">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-amber-500/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-amber-500" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-zinc-400">
                    123 Premium Drive<br />
                    London<br />
                    SW1A 1AA
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-amber-500" />
                <h3 className="text-xl font-semibold">Opening Hours</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-zinc-400">Monday - Friday</span>
                  <span className="font-semibold">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Saturday</span>
                  <span className="font-semibold">10:00 AM - 5:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-400">Sunday</span>
                  <span className="font-semibold">Closed</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            <EnquiryForm />
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-white/10 p-4 h-[400px] flex items-center justify-center">
          <p className="text-zinc-500">Map placeholder - Integrate with Google Maps API</p>
        </div>
      </div>
    </div>
  );
}
