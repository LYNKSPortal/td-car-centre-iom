import { db } from '@/lib/db';
import { vehicles } from '@/lib/db/schema';
import { desc } from 'drizzle-orm';

export default async function DebugVehiclesPage() {
  const allVehicles = await db.select({
    id: vehicles.id,
    title: vehicles.title,
    make: vehicles.make,
    model: vehicles.model,
  }).from(vehicles).orderBy(desc(vehicles.createdAt)).limit(5);

  return (
    <div className="bg-black min-h-screen text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Vehicle Data Debug</h1>
      <div className="space-y-6">
        {allVehicles.map((vehicle) => (
          <div key={vehicle.id} className="bg-zinc-900 p-6 rounded-lg border border-white/10">
            <p><strong>Title:</strong> {vehicle.title}</p>
            <p><strong>Make:</strong> {vehicle.make}</p>
            <p><strong>Model:</strong> {vehicle.model || '(empty)'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
