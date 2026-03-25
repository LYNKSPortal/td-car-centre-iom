import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect, notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { vehicles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { VehicleEditForm } from '@/components/admin/vehicle-edit-form';

export const dynamic = 'force-dynamic';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditVehiclePage(props: Props) {
  const params = await props.params;
  
  if (!params || !params.id) {
    notFound();
  }

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  const vehicle = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, params.id))
    .limit(1);

  if (!vehicle || vehicle.length === 0) {
    notFound();
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
        <h1 className="text-2xl font-bold text-white mb-6">Edit Vehicle</h1>
        <VehicleEditForm vehicle={vehicle[0]} />
      </div>
    </div>
  );
}
