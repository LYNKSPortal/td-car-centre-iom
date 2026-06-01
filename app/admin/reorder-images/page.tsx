'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

interface VehicleImage {
  id: string;
  imageUrl: string;
  sortOrder: number;
}

interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  images: VehicleImage[];
}

export default function ReorderImagesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    fetchVehicles();
  }, []);

  const fetchVehicles = async () => {
    try {
      const response = await fetch('/api/admin/vehicles');
      const data = await response.json();
      setVehicles(data);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    } finally {
      setLoading(false);
    }
  };

  const setAsFirstImage = async (vehicleId: string, imageId: string) => {
    setSaving(vehicleId);
    try {
      const response = await fetch(`/api/admin/vehicles/${vehicleId}/images/reorder`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageId, position: 0 }),
      });

      if (response.ok) {
        // Refresh vehicles
        await fetchVehicles();
      } else {
        alert('Failed to reorder images');
      }
    } catch (error) {
      console.error('Error reordering images:', error);
      alert('Failed to reorder images');
    } finally {
      setSaving(null);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Reorder Vehicle Images</h1>
          <p className="mt-2 text-gray-600">
            Click on an image to set it as the first image (front-facing) for that vehicle.
          </p>
        </div>

        <div className="space-y-8">
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">
                {vehicle.make} {vehicle.model} ({vehicle.year})
              </h2>

              {vehicle.images && vehicle.images.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {vehicle.images
                    .sort((a, b) => a.sortOrder - b.sortOrder)
                    .map((image, index) => (
                      <div
                        key={image.id}
                        className={`relative group cursor-pointer rounded-lg overflow-hidden border-4 ${
                          index === 0
                            ? 'border-green-500'
                            : 'border-gray-200 hover:border-blue-500'
                        }`}
                        onClick={() => {
                          if (index !== 0) {
                            setAsFirstImage(vehicle.id, image.id);
                          }
                        }}
                      >
                        <div className="aspect-video relative">
                          <Image
                            src={image.imageUrl}
                            alt={`${vehicle.make} ${vehicle.model} - Image ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                        
                        {index === 0 && (
                          <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                            FIRST
                          </div>
                        )}
                        
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-1 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          {index === 0 ? 'Current First' : 'Set as First'}
                        </div>

                        {saving === vehicle.id && (
                          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
                            <div className="text-sm font-semibold">Saving...</div>
                          </div>
                        )}
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-gray-500">No images available</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
