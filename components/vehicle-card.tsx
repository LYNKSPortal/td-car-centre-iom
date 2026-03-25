import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Gauge, Fuel, Cog } from 'lucide-react';
import { Button } from './ui/button';
import { formatPrice, formatMileage } from '@/lib/utils';

interface VehicleCardProps {
  vehicle: {
    id: string;
    title: string;
    slug: string;
    make: string;
    model: string;
    year: number;
    price: string;
    financeMonthly: string | null;
    mileage: number;
    transmission: string;
    fuelType: string;
    bodyType: string;
    status: string;
    images: Array<{
      imageUrl: string;
      altText: string | null;
    }>;
  };
}

export function VehicleCard({ vehicle }: VehicleCardProps) {
  const primaryImage = vehicle.images[0]?.imageUrl || '/placeholder-car.jpg';

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'sold':
        return 'bg-red-600';
      case 'available':
        return 'bg-green-600';
      case 'reserved':
        return 'bg-yellow-600';
      default:
        return 'bg-gray-600';
    }
  };

  return (
    <div className="group bg-zinc-900/50 border border-white/10 hover:border-white/20 transition-all duration-300 overflow-hidden">
      <Link href={`/inventory/${vehicle.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-zinc-950">
          <Image
            src={primaryImage}
            alt={vehicle.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute top-4 right-4">
            <div className={`${getStatusColor(vehicle.status)} text-white px-3 py-1.5 font-semibold uppercase text-sm`}>
              {vehicle.status}
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-red-600 transition-colors">
            {vehicle.title}
          </h3>
          
          <div className="text-2xl font-bold text-white mb-4">
            {formatPrice(parseFloat(vehicle.price))}
          </div>

          <div className="grid grid-cols-2 gap-3 mb-6 text-sm">
            <div className="flex items-center gap-2 text-zinc-400">
              <Calendar className="w-4 h-4 text-red-600" />
              <span>{vehicle.year}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <Gauge className="w-4 h-4 text-red-600" />
              <span>{formatMileage(vehicle.mileage)} miles</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <Cog className="w-4 h-4 text-red-600" />
              <span>{vehicle.transmission}</span>
            </div>
            <div className="flex items-center gap-2 text-zinc-400">
              <Fuel className="w-4 h-4 text-red-600" />
              <span>{vehicle.fuelType}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" size="sm" className="flex-1" asChild>
              <Link href={`/inventory/${vehicle.slug}#enquire`}>Enquire</Link>
            </Button>
            <Button variant="primary" size="sm" className="flex-1" asChild>
              <Link href={`/inventory/${vehicle.slug}`}>View Details</Link>
            </Button>
          </div>
        </div>
      </Link>
    </div>
  );
}
