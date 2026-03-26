import { Suspense } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function WarrantyWorkPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Warranty Work</h1>
          <p className="text-zinc-400">
            Manage vehicles currently in for warranty repairs
          </p>
        </div>
        <Button variant="primary" asChild>
          <Link href="/admin/dashboard/warranty/new">
            <Plus className="w-4 h-4 mr-2" />
            Add Warranty Job
          </Link>
        </Button>
      </div>

      <Suspense fallback={<WarrantyWorkListSkeleton />}>
        <WarrantyWorkList />
      </Suspense>
    </div>
  );
}

async function WarrantyWorkList() {
  // TODO: Fetch warranty work data from database
  const warrantyJobs: any[] = [];

  if (warrantyJobs.length === 0) {
    return (
      <div className="bg-zinc-950 border border-white/10 rounded-lg p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-4">
            <Plus className="w-8 h-8 text-zinc-600" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">
            No warranty jobs yet
          </h3>
          <p className="text-zinc-400 mb-6">
            Get started by adding your first warranty repair job.
          </p>
          <Button variant="primary" asChild>
            <Link href="/admin/dashboard/warranty/new">
              <Plus className="w-4 h-4 mr-2" />
              Add Warranty Job
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-950 border border-white/10 rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-zinc-900 border-b border-white/10">
            <tr>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Vehicle
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Customer
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Issue
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Status
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Date In
              </th>
              <th className="px-6 py-4 text-left text-sm font-semibold text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {warrantyJobs.map((job) => (
              <tr key={job.id} className="hover:bg-white/5 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-white font-medium">{job.vehicleMake} {job.vehicleModel}</div>
                  <div className="text-sm text-zinc-400">{job.registration}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-white">{job.customerName}</div>
                  <div className="text-sm text-zinc-400">{job.customerPhone}</div>
                </td>
                <td className="px-6 py-4 text-zinc-300">
                  {job.issue}
                </td>
                <td className="px-6 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    job.status === 'completed' 
                      ? 'bg-green-600/20 text-green-400'
                      : job.status === 'in-progress'
                      ? 'bg-blue-600/20 text-blue-400'
                      : 'bg-yellow-600/20 text-yellow-400'
                  }`}>
                    {job.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-zinc-300">
                  {new Date(job.dateIn).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <Link
                    href={`/admin/dashboard/warranty/${job.id}`}
                    className="text-red-500 hover:text-red-400 text-sm font-medium"
                  >
                    View Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function WarrantyWorkListSkeleton() {
  return (
    <div className="bg-zinc-950 border border-white/10 rounded-lg p-8">
      <div className="animate-pulse space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-zinc-900 rounded" />
        ))}
      </div>
    </div>
  );
}
