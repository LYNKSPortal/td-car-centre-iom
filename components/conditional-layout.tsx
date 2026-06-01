'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export function ConditionalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith('/admin');
  const isTTRentalsPage = pathname === '/tt-rentals';

  if (isAdminRoute) {
    return <>{children}</>;
  }

  return (
    <>
      <Header />
      {!isTTRentalsPage && (
        <Link href="/tt-rentals" className="block bg-red-600 hover:bg-red-700 transition-colors">
          <div className="container mx-auto px-4 py-2.5 flex items-center justify-center gap-2 text-white text-sm font-semibold text-center">
            <span>🏁</span>
            <span>Are you here for the TT and want to rent a car?</span>
            <span className="underline underline-offset-2">Click here</span>
            <span>🏁</span>
          </div>
        </Link>
      )}
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
