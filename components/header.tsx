'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Menu, X, Search } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-black border-b border-white/10">
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-8">
            {/* Left: Contact Info */}
            <div className="hidden lg:flex items-center gap-6 text-sm text-white">
              <a href="tel:01624670590" className="flex items-center gap-2 hover:text-zinc-300 transition-colors">
                <Phone className="w-4 h-4" />
                <span>01624 670590</span>
              </a>
              <div className="h-8 w-px bg-white/20"></div>
              <a href="mailto:tony@tdcar.im" className="flex items-center gap-2 hover:text-zinc-300 transition-colors">
                <Mail className="w-4 h-4" />
                <span>Sales</span>
              </a>
              <a href="mailto:tony@tdcar.im" className="flex items-center gap-2 hover:text-zinc-300 transition-colors">
                <Mail className="w-4 h-4" />
                <span>Aftersales</span>
              </a>
              <div className="h-8 w-px bg-white/20"></div>
              <a href="#" className="flex items-center gap-2 hover:text-zinc-300 transition-colors">
                <Mail className="w-4 h-4" />
                <span>Chat</span>
              </a>
            </div>

            {/* Center: Logo */}
            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
              <Image
                src="/images/logo-white-and-red.png"
                alt="TD Car Centre"
                width={300}
                height={100}
                className="w-[300px] h-auto"
                priority
              />
            </Link>

            {/* Right: Action Buttons */}
            <div className="hidden lg:flex items-center gap-8 text-sm">
              <Link href="/inventory" className="text-white hover:text-zinc-300 transition-colors">
                Buy
              </Link>
              <Link href="/finance" className="text-white hover:text-zinc-300 transition-colors">
                Finance
              </Link>
              <Link href="/services/sell-your-car" className="text-white hover:text-zinc-300 transition-colors">
                Sell
              </Link>
              <div className="h-8 w-px bg-white/20"></div>
              <Link href="/inventory" className="text-white hover:text-zinc-300 transition-colors">
                <Search className="w-5 h-5" />
              </Link>
              <button
                className="text-white hover:text-zinc-300 transition-colors flex items-center gap-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span>Menu</span>
                <Menu className="w-5 h-5" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="xl:hidden border-t border-white/10 bg-black">
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
