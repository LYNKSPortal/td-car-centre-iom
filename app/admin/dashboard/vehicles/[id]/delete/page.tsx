import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect, notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { vehicles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { DeleteVehicleButton } from '@/components/admin/delete-vehicle-button';

export default async function DeleteVehiclePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  const resolvedParams = await params;
  
  if (!resolvedParams?.id) {
    notFound();
  }

  const vehicle = await db
    .select()
    .from(vehicles)
    .where(eq(vehicles.id, resolvedParams.id))
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

      <div className="bg-zinc-900 border border-white/10 p-6 rounded-lg max-w-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-red-600/10 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Delete Vehicle</h1>
            <p className="text-zinc-400 text-sm">This action cannot be undone</p>
          </div>
        </div>

        <div className="bg-red-600/10 border border-red-600/20 text-red-400 px-4 py-3 rounded mb-6">
          <p className="font-semibold">Warning</p>
          <p className="text-sm mt-1">
            Deleting this vehicle will permanently remove it from your inventory along with all associated images and data.
          </p>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <label className="text-sm font-medium text-zinc-400">Vehicle</label>
            <p className="text-white mt-1 text-lg font-semibold">{vehicle[0].title}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-zinc-400">Price</label>
              <p className="text-white mt-1">£{parseFloat(vehicle[0].price).toLocaleString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-400">Year</label>
              <p className="text-white mt-1">{vehicle[0].year}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-400">Mileage</label>
              <p className="text-white mt-1">{vehicle[0].mileage.toLocaleString()} miles</p>
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-400">Status</label>
              <p className="text-white mt-1 capitalize">{vehicle[0].status}</p>
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-6 border-t border-white/10">
          <Button variant="outline" className="flex-1" asChild>
            <Link href="/admin/dashboard/vehicles">Cancel</Link>
          </Button>
          <DeleteVehicleButton vehicleId={vehicle[0].id} vehicleTitle={vehicle[0].title} />
        </div>
      </div>
    </div>
  );
}
