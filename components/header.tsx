'use client';

import Link from 'next/link';
import { Phone, Mail, MapPin, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-zinc-950 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-xs text-zinc-400">
            <div className="flex items-center gap-6">
              <a href="tel:+441234567890" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-3 h-3" />
                <span className="hidden sm:inline">+44 1234 567890</span>
              </a>
              <a href="mailto:sales@tdcarcentre.co.uk" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-3 h-3" />
                <span className="hidden md:inline">sales@tdcarcentre.co.uk</span>
              </a>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <MapPin className="w-3 h-3" />
              <span className="hidden lg:inline">123 Premium Drive, London, SW1A 1AA</span>
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <Link href="/" className="text-2xl font-bold tracking-tight">
              <span className="text-white">TD</span>
              <span className="text-amber-500"> CAR CENTRE</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-8">
              <Link href="/" className="text-sm text-zinc-300 hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/inventory" className="text-sm text-zinc-300 hover:text-white transition-colors">
                View Stock
              </Link>
              <Link href="/finance" className="text-sm text-zinc-300 hover:text-white transition-colors">
                Finance
              </Link>
              <Link href="/services/warranty" className="text-sm text-zinc-300 hover:text-white transition-colors">
                Warranty
              </Link>
              <Link href="/services/part-exchange" className="text-sm text-zinc-300 hover:text-white transition-colors">
                Part Exchange
              </Link>
              <Link href="/about" className="text-sm text-zinc-300 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-sm text-zinc-300 hover:text-white transition-colors">
                Contact
              </Link>
            </nav>

            <div className="hidden lg:flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link href="/services/sell-your-car">Sell Your Car</Link>
              </Button>
              <Button variant="primary" size="sm" asChild>
                <Link href="/inventory">View Stock</Link>
              </Button>
            </div>

            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-white/10 bg-black">
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <Link href="/" className="text-sm text-zinc-300 hover:text-white transition-colors py-2">
                Home
              </Link>
              <Link href="/inventory" className="text-sm text-zinc-300 hover:text-white transition-colors py-2">
                View Stock
              </Link>
              <Link href="/finance" className="text-sm text-zinc-300 hover:text-white transition-colors py-2">
                Finance
              </Link>
              <Link href="/services/warranty" className="text-sm text-zinc-300 hover:text-white transition-colors py-2">
                Warranty
              </Link>
              <Link href="/services/part-exchange" className="text-sm text-zinc-300 hover:text-white transition-colors py-2">
                Part Exchange
              </Link>
              <Link href="/about" className="text-sm text-zinc-300 hover:text-white transition-colors py-2">
                About
              </Link>
              <Link href="/contact" className="text-sm text-zinc-300 hover:text-white transition-colors py-2">
                Contact
              </Link>
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <Button variant="outline" size="sm" asChild>
                  <Link href="/services/sell-your-car">Sell Your Car</Link>
                </Button>
                <Button variant="primary" size="sm" asChild>
                  <Link href="/inventory">View Stock</Link>
                </Button>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
