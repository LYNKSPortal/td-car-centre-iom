'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

export function MarkAsHandledButton({
  enquiryId,
  isHandled,
}: {
  enquiryId: string;
  isHandled: boolean;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/enquiries/${enquiryId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ handled: !isHandled }),
      });

      if (response.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error('Error updating enquiry:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      variant={isHandled ? 'outline' : 'primary'}
      className="w-full"
      onClick={handleToggle}
      disabled={loading}
    >
      <Check className="w-4 h-4 mr-2" />
      {loading ? 'Updating...' : isHandled ? 'Mark as Pending' : 'Mark as Handled'}
    </Button>
  );
}
