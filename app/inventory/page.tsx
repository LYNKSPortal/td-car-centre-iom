import { Suspense } from 'react';
import { getVehicles, getFilterOptions } from '@/lib/queries';
import { vehicleFilterSchema } from '@/lib/validations';
import { VehicleCard } from '@/components/vehicle-card';
import { InventoryFilters } from '@/components/inventory-filters';
import { InventorySearch } from '@/components/inventory-search';
import { Pagination } from '@/components/pagination';

export const metadata = {
  title: 'View Our Stock - TD Car Centre',
  description: 'Browse our exceptional collection of luxury and prestige vehicles',
};

interface SearchParams {
  [key: string]: string | string[] | undefined;
}

export default async function InventoryPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const filters = vehicleFilterSchema.parse(params);
  const { vehicles, totalCount, totalPages, currentPage } = await getVehicles(filters);
  const filterOptions = await getFilterOptions();

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-zinc-950 border-b border-white/10 py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Stock</h1>
          <p className="text-xl text-zinc-400">
            Discover our curated collection of {totalCount} premium vehicles
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-96 flex-shrink-0">
            <div className="sticky top-24">
              <Suspense fallback={<div>Loading filters...</div>}>
                <InventoryFilters filterOptions={filterOptions} currentFilters={filters} />
              </Suspense>
            </div>
          </aside>

          <div className="flex-1">
            <Suspense fallback={<div>Loading...</div>}>
              <InventorySearch totalCount={totalCount} currentSort={filters.sort} />
            </Suspense>

            {vehicles.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-2xl text-zinc-400 mb-4">No vehicles found</p>
                <p className="text-zinc-500">Try adjusting your filters</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                  {vehicles.map((vehicle) => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    baseUrl="/inventory"
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
