'use client';

import { useRouter, useSearchParams } from 'next/navigation';

interface InventorySearchProps {
  totalCount: number;
  currentSort?: string;
}

export function InventorySearch({ totalCount, currentSort }: InventorySearchProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateSort = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
    params.delete('page');
    router.push(`/inventory?${params.toString()}`);
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
      <p className="text-zinc-400">
        Showing <span className="text-white font-semibold">{totalCount}</span> vehicles
      </p>

      <div className="flex items-center gap-3">
        <label className="text-sm text-zinc-400">Sort by:</label>
        <select
          value={currentSort || 'newest'}
          onChange={(e) => updateSort(e.target.value)}
          className="bg-zinc-900 border border-white/10 text-white px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        >
          <option value="newest">Newest Added</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="mileage-asc">Mileage: Low to High</option>
          <option value="year-desc">Year: Newest First</option>
        </select>
      </div>
    </div>
  );
}
