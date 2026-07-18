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
  const warrantyJobs = [
    {
      id: 'test-warranty-001',
      vehicleMake: 'Land Rover',
      vehicleModel: 'Range Rover Sport',
      registration: 'MN24 TDC',
      customerName: 'James Kelly',
      customerPhone: '07624 555001',
      issue: 'Engine management warning light and reduced performance message.',
      status: 'Urgent',
      trafficLight: 'red',
      dateIn: '2026-07-18',
    },
    {
      id: 'test-warranty-002',
      vehicleMake: 'Porsche',
      vehicleModel: '911 Carrera',
      registration: 'MN23 TDC',
      customerName: 'Sarah Moore',
      customerPhone: '07624 555002',
      issue: 'Intermittent PCM screen fault. Diagnostic work in progress.',
      status: 'In Progress',
      trafficLight: 'amber',
      dateIn: '2026-07-17',
    },
    {
      id: 'test-warranty-003',
      vehicleMake: 'BMW',
      vehicleModel: 'X5 M Sport',
      registration: 'MN22 TDC',
      customerName: 'David Quayle',
      customerPhone: '07624 555003',
      issue: 'Rear parking camera replacement booked under warranty.',
      status: 'Booked In',
      trafficLight: 'green',
      dateIn: '2026-07-16',
    },
    {
      id: 'test-warranty-004',
      vehicleMake: 'Mercedes-Benz',
      vehicleModel: 'GLE 450',
      registration: 'MN21 TDC',
      customerName: 'Emma Clark',
      customerPhone: '07624 555004',
      issue: 'Suspension warning light. Awaiting replacement sensor.',
      status: 'Awaiting Parts',
      trafficLight: 'amber',
      dateIn: '2026-07-15',
    },
    {
      id: 'test-warranty-005',
      vehicleMake: 'Audi',
      vehicleModel: 'RS6 Avant',
      registration: 'MN20 TDC',
      customerName: 'Mark Teare',
      customerPhone: '07624 555005',
      issue: 'Door lock actuator replaced and ready for collection.',
      status: 'Ready to Collect',
      trafficLight: 'green',
      dateIn: '2026-07-14',
    },
  ];

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
                  <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                    job.trafficLight === 'red'
                      ? 'bg-red-500/10 text-red-400'
                      : job.trafficLight === 'amber'
                      ? 'bg-amber-500/10 text-amber-400'
                      : 'bg-green-500/10 text-green-400'
                  }`}>
                    <span className={`w-2 h-2 rounded-full ${
                      job.trafficLight === 'red'
                        ? 'bg-red-500'
                        : job.trafficLight === 'amber'
                        ? 'bg-amber-400'
                        : 'bg-green-500'
                    }`} />
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
