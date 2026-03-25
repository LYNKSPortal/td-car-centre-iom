import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect, notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { vehicles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default async function EditVehiclePage(props: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }
  
  const params = await props.params;
  
  if (!params?.id) {
    notFound();
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
        
        <div className="bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 px-4 py-3 rounded mb-6">
          <p className="font-semibold">Vehicle Edit Form - Coming Soon</p>
          <p className="text-sm mt-1">
            The vehicle edit functionality is currently under development. For now, you can view the vehicle details below.
          </p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-zinc-400">Title</label>
              <p className="text-white mt-1">{vehicle[0].title}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-400">Price</label>
              <p className="text-white mt-1">£{parseFloat(vehicle[0].price).toLocaleString()}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-400">Make</label>
              <p className="text-white mt-1">{vehicle[0].make}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-400">Model</label>
              <p className="text-white mt-1">{vehicle[0].model}</p>
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
              <label className="text-sm font-medium text-zinc-400">Transmission</label>
              <p className="text-white mt-1">{vehicle[0].transmission}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-400">Fuel Type</label>
              <p className="text-white mt-1">{vehicle[0].fuelType}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-400">Body Type</label>
              <p className="text-white mt-1">{vehicle[0].bodyType}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-zinc-400">Status</label>
              <p className="text-white mt-1 capitalize">{vehicle[0].status}</p>
            </div>
          </div>

          {vehicle[0].description && (
            <div>
              <label className="text-sm font-medium text-zinc-400">Description</label>
              <p className="text-white mt-1 whitespace-pre-wrap">{vehicle[0].description}</p>
            </div>
          )}
        </div>

        <div className="flex gap-3 mt-6 pt-6 border-t border-white/10">
          <Button variant="outline" asChild>
            <Link href="/admin/dashboard/vehicles">Cancel</Link>
          </Button>
          <Button variant="primary" disabled>
            Save Changes (Coming Soon)
          </Button>
        </div>
      </div>
    </div>
  );
}
