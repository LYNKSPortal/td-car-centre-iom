'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

export function DeleteVehicleButton({
  vehicleId,
  vehicleTitle,
}: {
  vehicleId: string;
  vehicleTitle: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Are you sure you want to delete "${vehicleTitle}"? This action cannot be undone.`)) {
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/admin/vehicles/${vehicleId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        router.push('/admin/dashboard/vehicles');
        router.refresh();
      } else {
        alert('Failed to delete vehicle. Please try again.');
      }
    } catch (error) {
      console.error('Error deleting vehicle:', error);
      alert('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant="primary"
      className="flex-1 bg-red-600 hover:bg-red-700"
      onClick={handleDelete}
      disabled={loading}
    >
      <Trash2 className="w-4 h-4 mr-2" />
      {loading ? 'Deleting...' : 'Delete Vehicle'}
    </Button>
  );
}
