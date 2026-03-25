'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <div className="bg-zinc-950 border-b border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-zinc-400">
            <div className="flex items-center gap-6">
              <a href="tel:01624670590" className="flex items-center gap-2 hover:text-white transition-colors">
                <Phone className="w-3 h-3" />
                <span className="hidden sm:inline">01624 670590</span>
              </a>
              <a href="mailto:tony@tdcar.im" className="flex items-center gap-2 hover:text-white transition-colors">
                <Mail className="w-3 h-3" />
                <span className="hidden md:inline">tony@tdcar.im</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-3 h-3" />
              <span className="hidden lg:inline">Unit 02, Hills Meadow Industrial Estate, Peel Road, Douglas, Isle of Man, IM1 5EA</span>
            </div>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-50 bg-black/95 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-6">
            <Link href="/" className="flex items-center">
              <Image
                src="/images/white-logo.png"
                alt="TD Car Centre"
                width={150}
                height={50}
                className="w-[150px] h-auto"
                priority
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-4">
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
              <Link href="/" className="text-sm text-zinc-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                Home
              </Link>
              <Link href="/inventory" className="text-sm text-zinc-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                View Stock
              </Link>
              <Link href="/finance" className="text-sm text-zinc-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                Finance
              </Link>
              <Link href="/services/warranty" className="text-sm text-zinc-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                Warranty
              </Link>
              <Link href="/services/part-exchange" className="text-sm text-zinc-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                Part Exchange
              </Link>
              <Link href="/about" className="text-sm text-zinc-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                About
              </Link>
              <Link href="/contact" className="text-sm text-zinc-300 hover:text-white transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>
                Contact
              </Link>
              <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
                <Button variant="outline" size="sm" asChild onClick={() => setMobileMenuOpen(false)}>
                  <Link href="/services/sell-your-car">Sell Your Car</Link>
                </Button>
                <Button variant="primary" size="sm" asChild onClick={() => setMobileMenuOpen(false)}>
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
