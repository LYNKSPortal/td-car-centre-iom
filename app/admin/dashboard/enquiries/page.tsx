import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { enquiries, vehicles } from '@/lib/db/schema';
import { desc, eq } from 'drizzle-orm';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquare, ExternalLink } from 'lucide-react';

export default async function EnquiriesPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/admin/login');
  }

  const allEnquiries = await db
    .select({
      enquiry: enquiries,
      vehicle: vehicles,
    })
    .from(enquiries)
    .leftJoin(vehicles, eq(enquiries.vehicleId, vehicles.id))
    .orderBy(desc(enquiries.createdAt));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Enquiries</h1>
          <p className="text-zinc-400 mt-1">Manage customer enquiries</p>
        </div>
      </div>

      <div className="bg-zinc-900 border border-white/10 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-zinc-950 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Customer</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Vehicle</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Date</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Status</th>
                <th className="px-6 py-4 text-right text-sm font-semibold text-white">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {allEnquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-zinc-400">
                    No enquiries yet.
                  </td>
                </tr>
              ) : (
                allEnquiries.map(({ enquiry, vehicle }) => (
                  <tr key={enquiry.id} className="hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-white">{enquiry.name}</p>
                        <p className="text-sm text-zinc-400">{enquiry.email}</p>
                        {enquiry.phone && (
                          <p className="text-sm text-zinc-400">{enquiry.phone}</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/10 text-blue-500">
                        {enquiry.enquiryType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {vehicle ? (
                        <Link
                          href={`/inventory/${vehicle.slug}`}
                          className="text-red-600 hover:text-red-500 flex items-center gap-1"
                        >
                          {vehicle.title}
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      ) : (
                        <span className="text-zinc-500">General</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-zinc-400">
                      {new Date(enquiry.createdAt).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          enquiry.handled
                            ? 'bg-green-500/10 text-green-500'
                            : 'bg-yellow-500/10 text-yellow-500'
                        }`}
                      >
                        {enquiry.handled ? 'Handled' : 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/admin/dashboard/enquiries/${enquiry.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
