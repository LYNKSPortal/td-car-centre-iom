import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/5">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="mb-6">
              <Image
                src="/images/logo-white-and-red.png"
                alt="TD Car Centre"
                width={300}
                height={100}
                className="w-[300px] h-auto"
              />
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6">
              Premium luxury and prestige vehicles. Exceptional service, competitive finance, and nationwide delivery.
            </p>
            <div className="flex gap-4">
              <a href="https://facebook.com/tdcarcentre" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors text-white text-sm">
                f
              </a>
              <a href="https://instagram.com/tdcarcentre" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors text-white text-sm">
                ig
              </a>
              <a href="https://youtube.com/tdcarcentre" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center transition-colors text-white text-sm">
                yt
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/inventory" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  View Stock
                </Link>
              </li>
              <li>
                <Link href="/finance" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  Finance Options
                </Link>
              </li>
              <li>
                <Link href="/services/warranty" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  Vehicle Warranty
                </Link>
              </li>
              <li>
                <Link href="/services/part-exchange" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  Part Exchange
                </Link>
              </li>
              <li>
                <Link href="/services/sell-your-car" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  Sell Your Car
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="tel:01624670590" className="text-zinc-400 hover:text-white text-sm transition-colors">
                    01624 670590
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <a href="mailto:tony@tdcar.im" className="text-zinc-400 hover:text-white text-sm transition-colors">
                    tony@tdcar.im
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-zinc-400 text-sm">
                    Unit 02, Hills Meadow Industrial Estate<br />
                    Peel Road, Douglas<br />
                    Isle of Man, IM1 5EA
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-6">Opening Hours</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between text-zinc-400">
                <span>Monday - Friday</span>
                <span className="text-white">9:00 AM - 6:00 PM</span>
              </li>
              <li className="flex justify-between text-zinc-400">
                <span>Saturday</span>
                <span className="text-white">10:00 AM - 5:00 PM</span>
              </li>
              <li className="flex justify-between text-zinc-400">
                <span>Sunday</span>
                <span className="text-white">Closed</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/5">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
            <p>&copy; {new Date().getFullYear()} TD Car Centre. All rights reserved. Company No. 12345678</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
