import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { VehicleCreateForm } from '@/components/admin/vehicle-create-form';

export const dynamic = 'force-dynamic';

export default async function NewVehiclePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/dashboard/vehicles">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Vehicles
          </Link>
        </Button>
      </div>

      <div className="bg-zinc-900 border border-white/10 p-6 rounded-lg">
        <h1 className="text-2xl font-bold text-white mb-6">Add New Vehicle</h1>
        <VehicleCreateForm />
      </div>
    </div>
  );
}
