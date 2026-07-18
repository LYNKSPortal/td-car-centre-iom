import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NewWarrantyJobPage() {
  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" asChild>
        <Link href="/admin/dashboard/warranty">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Warranty Work
        </Link>
      </Button>

      <div className="bg-zinc-900 border border-white/10 p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-white mb-2">Add Warranty Job</h1>
        <p className="text-zinc-400">
          Warranty job creation will be available here soon.
        </p>
      </div>
    </div>
  );
}
