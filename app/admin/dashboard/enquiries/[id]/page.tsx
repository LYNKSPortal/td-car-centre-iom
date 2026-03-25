import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect, notFound } from 'next/navigation';
import { db } from '@/lib/db';
import { enquiries, vehicles } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Mail, Phone, MessageSquare, Car } from 'lucide-react';
import { MarkAsHandledButton } from '@/components/admin/mark-as-handled-button';

export default async function EnquiryDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }
  
  if (!params?.id) {
    notFound();
  }

  const result = await db
    .select({
      enquiry: enquiries,
      vehicle: vehicles,
    })
    .from(enquiries)
    .leftJoin(vehicles, eq(enquiries.vehicleId, vehicles.id))
    .where(eq(enquiries.id, params.id))
    .limit(1);

  if (!result || result.length === 0) {
    notFound();
  }

  const { enquiry, vehicle } = result[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="sm" asChild>
          <Link href="/admin/dashboard/enquiries">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Enquiries
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-zinc-900 border border-white/10 p-6 rounded-lg">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-white">Enquiry Details</h1>
              <span
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                  enquiry.handled
                    ? 'bg-green-500/10 text-green-500'
                    : 'bg-yellow-500/10 text-yellow-500'
                }`}
              >
                {enquiry.handled ? 'Handled' : 'Pending'}
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-zinc-400">Type</label>
                <p className="text-white mt-1 capitalize">{enquiry.enquiryType.replace('_', ' ')}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-400">Date Received</label>
                <p className="text-white mt-1">
                  {new Date(enquiry.createdAt).toLocaleString('en-GB', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-400">Message</label>
                <div className="bg-zinc-950 border border-white/5 p-4 rounded mt-2">
                  <p className="text-white whitespace-pre-wrap">{enquiry.message}</p>
                </div>
              </div>
            </div>
          </div>

          {vehicle && (
            <div className="bg-zinc-900 border border-white/10 p-6 rounded-lg">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Car className="w-5 h-5" />
                Related Vehicle
              </h2>
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-zinc-950 rounded overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-zinc-800" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-white">{vehicle.title}</h3>
                  <p className="text-zinc-400">
                    {vehicle.year} • {vehicle.mileage.toLocaleString()} miles
                  </p>
                  <Button variant="outline" size="sm" className="mt-2" asChild>
                    <Link href={`/inventory/${vehicle.slug}`} target="_blank">
                      View Vehicle
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div className="bg-zinc-900 border border-white/10 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Customer Information</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-zinc-400">Name</label>
                <p className="text-white mt-1">{enquiry.name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <a
                  href={`mailto:${enquiry.email}`}
                  className="text-red-600 hover:text-red-500 mt-1 block"
                >
                  {enquiry.email}
                </a>
              </div>

              {enquiry.phone && (
                <div>
                  <label className="text-sm font-medium text-zinc-400 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone
                  </label>
                  <a
                    href={`tel:${enquiry.phone}`}
                    className="text-red-600 hover:text-red-500 mt-1 block"
                  >
                    {enquiry.phone}
                  </a>
                </div>
              )}
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/10 p-6 rounded-lg">
            <h2 className="text-xl font-bold text-white mb-4">Actions</h2>
            <div className="space-y-3">
              <MarkAsHandledButton enquiryId={enquiry.id} isHandled={enquiry.handled} />
              <Button variant="outline" className="w-full" asChild>
                <a href={`mailto:${enquiry.email}`}>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Email
                </a>
              </Button>
              {enquiry.phone && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={`tel:${enquiry.phone}`}>
                    <Phone className="w-4 h-4 mr-2" />
                    Call Customer
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
