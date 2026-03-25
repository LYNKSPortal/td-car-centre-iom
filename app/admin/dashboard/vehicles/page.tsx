import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { vehicles, vehicleImages } from '@/lib/db/schema';
import { desc, eq, asc } from 'drizzle-orm';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/utils';
import { Plus, Edit, Trash2 } from 'lucide-react';

export default async function VehiclesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  const allVehicles = await db.query.vehicles.findMany({
    orderBy: [desc(vehicles.createdAt)],
    with: {
      images: {
        orderBy: [asc(vehicleImages.sortOrder)],
        limit: 1,
      },
    },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Vehicles</h1>
          <p className="text-zinc-400 mt-1">Manage your vehicle inventory</p>
        </div>
        <Button variant="primary" asChild>
          <Link href="/admin/dashboard/vehicles/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Vehicle
          </Link>
        </Button>
      </div>

      <div className="bg-zinc-900 border border-white/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-950 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Vehicle</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Year</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Mileage</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {allVehicles.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-400">
                    No vehicles found. Add your first vehicle to get started.
                  </td>
                </tr>
              ) : (
                allVehicles.map((vehicle) => (
                  <tr key={vehicle.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 bg-zinc-950 rounded overflow-hidden flex-shrink-0">
                          {vehicle.images[0]?.imageUrl ? (
                            <Image
                              src={vehicle.images[0].imageUrl}
                              alt={vehicle.title}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
                              <span className="text-2xl">🚗</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-white">{vehicle.title}</p>
                          <p className="text-sm text-zinc-400">
                            {vehicle.make} {vehicle.model}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-white">
                      {formatPrice(parseFloat(vehicle.price))}
                    </td>
                    <td className="px-6 py-4 text-zinc-400">{vehicle.year}</td>
                    <td className="px-6 py-4 text-zinc-400">
                      {vehicle.mileage.toLocaleString()} miles
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          vehicle.status === 'available'
                            ? 'bg-green-500/10 text-green-500'
                            : vehicle.status === 'reserved'
                            ? 'bg-yellow-500/10 text-yellow-500'
                            : 'bg-red-500/10 text-red-500'
                        }`}
                      >
                        {vehicle.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/dashboard/vehicles/${vehicle.id}/edit`}>
                            <Edit className="w-4 h-4" />
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/dashboard/vehicles/${vehicle.id}/delete`}>
                            <Trash2 className="w-4 h-4" />
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
