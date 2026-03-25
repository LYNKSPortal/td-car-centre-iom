'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FilterOptionsProps {
  filterOptions: {
    makes: string[];
    models: string[];
    transmissions: string[];
    fuelTypes: string[];
    bodyTypes: string[];
    drivetrains: (string | null)[];
  };
  currentFilters: any;
}

export function InventoryFilters({ filterOptions, currentFilters }: FilterOptionsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [availableModels, setAvailableModels] = useState<string[]>(filterOptions.models);

  useEffect(() => {
    // Filter models based on selected make
    if (currentFilters.make) {
      // Fetch models for the selected make
      fetch(`/api/vehicles/models?make=${encodeURIComponent(currentFilters.make)}`)
        .then(res => res.json())
        .then(data => setAvailableModels(data.models || []))
        .catch(() => setAvailableModels([]));
    } else {
      // Show all models if no make is selected
      setAvailableModels(filterOptions.models);
    }
  }, [currentFilters.make, filterOptions.models]);

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    
    // Clear model filter when make changes
    if (key === 'make') {
      params.delete('model');
    }
    
    params.delete('page');
    router.push(`/inventory?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/inventory');
  };

  const hasActiveFilters = Array.from(searchParams.keys()).some(
    key => !['sort', 'page'].includes(key)
  );

  return (
    <div className="bg-zinc-900/50 border border-white/10 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Filters</h2>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="w-4 h-4 mr-1" />
            Clear
          </Button>
        )}
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-300">Make</label>
          <select
            value={currentFilters.make || ''}
            onChange={(e) => updateFilter('make', e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/50"
          >
            <option value="">All Makes</option>
            {filterOptions.makes.map((make) => (
              <option key={make} value={make}>{make}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-300">Model</label>
          <select
            value={currentFilters.model || ''}
            onChange={(e) => updateFilter('model', e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/50"
            disabled={!currentFilters.make}
          >
            <option value="">All Models</option>
            {availableModels.map((model) => (
              <option key={model} value={model}>{model}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-300">Price Range</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={currentFilters.minPrice || ''}
              onChange={(e) => updateFilter('minPrice', e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/50"
            />
            <input
              type="number"
              placeholder="Max"
              value={currentFilters.maxPrice || ''}
              onChange={(e) => updateFilter('maxPrice', e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-300">Year Range</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min"
              value={currentFilters.minYear || ''}
              onChange={(e) => updateFilter('minYear', e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/50"
            />
            <input
              type="number"
              placeholder="Max"
              value={currentFilters.maxYear || ''}
              onChange={(e) => updateFilter('maxYear', e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-300">Max Mileage</label>
          <input
            type="number"
            placeholder="e.g. 50000"
            value={currentFilters.maxMileage || ''}
            onChange={(e) => updateFilter('maxMileage', e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-300">Transmission</label>
          <select
            value={currentFilters.transmission || ''}
            onChange={(e) => updateFilter('transmission', e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/50"
          >
            <option value="">All Transmissions</option>
            {filterOptions.transmissions.map((transmission) => (
              <option key={transmission} value={transmission}>{transmission}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-300">Fuel Type</label>
          <select
            value={currentFilters.fuelType || ''}
            onChange={(e) => updateFilter('fuelType', e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/50"
          >
            <option value="">All Fuel Types</option>
            {filterOptions.fuelTypes.map((fuelType) => (
              <option key={fuelType} value={fuelType}>{fuelType}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2 text-zinc-300">Body Type</label>
          <select
            value={currentFilters.bodyType || ''}
            onChange={(e) => updateFilter('bodyType', e.target.value)}
            className="w-full bg-zinc-900 border border-white/10 text-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600/50"
          >
            <option value="">All Body Types</option>
            {filterOptions.bodyTypes.map((bodyType) => (
              <option key={bodyType} value={bodyType}>{bodyType}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
