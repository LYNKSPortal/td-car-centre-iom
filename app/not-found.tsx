import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const dynamic = 'force-dynamic';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-zinc-400 mb-8">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <Button variant="primary" size="lg" asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </div>
  );
}
