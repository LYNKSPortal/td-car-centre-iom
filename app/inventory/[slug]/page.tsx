import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Gauge, Fuel, Cog, Palette, Users, DoorClosed, FileText, User } from 'lucide-react';
import { getVehicleBySlug, getSimilarVehicles } from '@/lib/queries';
import { formatPrice, formatMileage } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { VehicleCard } from '@/components/vehicle-card';
import { VehicleGallery } from '@/components/vehicle-gallery';
import { EnquiryForm } from '@/components/enquiry-form';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) {
    return {
      title: 'Vehicle Not Found',
    };
  }

  return {
    title: `${vehicle.title} - TD Car Centre`,
    description: vehicle.description || `${vehicle.title} for sale at TD Car Centre`,
  };
}

export default async function VehicleDetailPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const vehicle = await getVehicleBySlug(slug);

  if (!vehicle) {
    notFound();
  }

  const similarVehicles = await getSimilarVehicles(vehicle.id, vehicle.make, vehicle.bodyType);

  return (
    <div className="bg-black min-h-screen">
      <div className="container mx-auto px-4 py-12">
        <div>
          <VehicleGallery images={vehicle.images} title={vehicle.title} />

            <div className="mt-12">
              <h1 className="text-4xl font-bold mb-4">{vehicle.title}</h1>
              <div className="text-3xl font-bold text-red-600 mb-8">
                {formatPrice(parseFloat(vehicle.price))}
              </div>

              {vehicle.financeMonthly && (
                <div className="bg-gradient-to-r from-red-600/10 to-red-600/10 border border-red-600/20 p-6 mb-8">
                  <p className="text-sm text-zinc-400 mb-1">Finance from</p>
                  <p className="text-2xl font-bold text-red-600">
                    {formatPrice(parseFloat(vehicle.financeMonthly))}/month
                  </p>
                  <p className="text-xs text-zinc-500 mt-2">
                    Representative example. Subject to status and affordability.
                  </p>
                </div>
              )}

              {vehicle.description && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-4">Description</h2>
                  <p className="text-zinc-300 leading-relaxed">{vehicle.description}</p>
                </div>
              )}

              <div className="mb-12">
                <h2 className="text-2xl font-bold mb-6">Specification</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 p-4">
                    <Calendar className="w-6 h-6 text-red-600" />
                    <div>
                      <p className="text-xs text-zinc-500">Year</p>
                      <p className="font-semibold">{vehicle.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 p-4">
                    <Gauge className="w-6 h-6 text-red-600" />
                    <div>
                      <p className="text-xs text-zinc-500">Mileage</p>
                      <p className="font-semibold">{formatMileage(vehicle.mileage)}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 p-4">
                    <Cog className="w-6 h-6 text-red-600" />
                    <div>
                      <p className="text-xs text-zinc-500">Transmission</p>
                      <p className="font-semibold">{vehicle.transmission}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 p-4">
                    <Fuel className="w-6 h-6 text-red-600" />
                    <div>
                      <p className="text-xs text-zinc-500">Fuel Type</p>
                      <p className="font-semibold">{vehicle.fuelType}</p>
                    </div>
                  </div>
                  {vehicle.colour && (
                    <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 p-4">
                      <Palette className="w-6 h-6 text-red-600" />
                      <div>
                        <p className="text-xs text-zinc-500">External Colour</p>
                        <p className="font-semibold">{vehicle.colour}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.interiorColour && (
                    <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 p-4">
                      <Palette className="w-6 h-6 text-red-600" />
                      <div>
                        <p className="text-xs text-zinc-500">Internal Colour</p>
                        <p className="font-semibold">{vehicle.interiorColour}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.engineSize && (
                    <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 p-4">
                      <Cog className="w-6 h-6 text-red-600" />
                      <div>
                        <p className="text-xs text-zinc-500">Engine</p>
                        <p className="font-semibold">{vehicle.engineSize}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.doors && (
                    <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 p-4">
                      <DoorClosed className="w-6 h-6 text-red-600" />
                      <div>
                        <p className="text-xs text-zinc-500">Doors</p>
                        <p className="font-semibold">{vehicle.doors}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.seats && (
                    <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 p-4">
                      <Users className="w-6 h-6 text-red-600" />
                      <div>
                        <p className="text-xs text-zinc-500">Seats</p>
                        <p className="font-semibold">{vehicle.seats}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.registration && (
                    <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 p-4">
                      <FileText className="w-6 h-6 text-red-600" />
                      <div>
                        <p className="text-xs text-zinc-500">Registration</p>
                        <p className="font-semibold">{vehicle.registration}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.previousOwners !== null && (
                    <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 p-4">
                      <User className="w-6 h-6 text-red-600" />
                      <div>
                        <p className="text-xs text-zinc-500">Previous Owners</p>
                        <p className="font-semibold">{vehicle.previousOwners}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.bodyType && (
                    <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 p-4">
                      <Cog className="w-6 h-6 text-red-600" />
                      <div>
                        <p className="text-xs text-zinc-500">Body Type</p>
                        <p className="font-semibold">{vehicle.bodyType}</p>
                      </div>
                    </div>
                  )}
                  {vehicle.drivetrain && (
                    <div className="flex items-center gap-3 bg-zinc-900/50 border border-white/10 p-4">
                      <Cog className="w-6 h-6 text-red-600" />
                      <div>
                        <p className="text-xs text-zinc-500">Drivetrain</p>
                        <p className="font-semibold">{vehicle.drivetrain}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {vehicle.features && vehicle.features.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">Features & Equipment</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {vehicle.features.map((feature) => (
                      <div key={feature.id} className="flex items-center gap-2 text-zinc-300">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full" />
                        <span>{feature.featureName}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
        </div>

        <div id="enquire" className="mt-16 scroll-mt-24">
          <EnquiryForm vehicleId={vehicle.id} vehicleTitle={vehicle.title} />
        </div>

        {similarVehicles.length > 0 && (
          <div className="mt-24">
            <h2 className="text-3xl font-bold mb-8">Similar Vehicles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {similarVehicles.map((similarVehicle) => (
                <VehicleCard key={similarVehicle.id} vehicle={similarVehicle} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
