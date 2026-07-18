import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

const garageJobs = {
  'test-garage-001': {
    vehicle: 'Volkswagen Golf GTI',
    registration: 'MN24 GTI',
    customer: 'Daniel Cowin',
    phone: '07624 555101',
    jobType: 'Annual Service & MOT',
    status: 'In Progress',
    dateIn: '18 July 2026',
    notes: 'Complete annual service and prepare the vehicle for its MOT inspection.',
  },
  'test-garage-002': {
    vehicle: 'BMW 330d M Sport',
    registration: 'MN23 BMW',
    customer: 'Olivia Kermode',
    phone: '07624 555102',
    jobType: 'Front Brake Discs & Pads',
    status: 'Awaiting Parts',
    dateIn: '17 July 2026',
    notes: 'Front brake discs and pads require replacement. Parts are on order.',
  },
  'test-garage-003': {
    vehicle: 'Ford Ranger Wildtrak',
    registration: 'MN22 FOR',
    customer: 'Lewis Radcliffe',
    phone: '07624 555103',
    jobType: 'Diagnostic Check',
    status: 'Booked In',
    dateIn: '16 July 2026',
    notes: 'Investigate reported intermittent engine warning light.',
  },
  'test-garage-004': {
    vehicle: 'Mercedes-Benz A200 AMG Line',
    registration: 'MN21 AMG',
    customer: 'Rachel Callister',
    phone: '07624 555104',
    jobType: 'Air Conditioning Service',
    status: 'Completed',
    dateIn: '15 July 2026',
    notes: 'Air conditioning system serviced, re-gassed, and tested.',
  },
  'test-garage-005': {
    vehicle: 'Nissan Qashqai',
    registration: 'MN20 NIS',
    customer: 'Tom Quirk',
    phone: '07624 555105',
    jobType: 'Clutch Replacement',
    status: 'In Progress',
    dateIn: '14 July 2026',
    notes: 'Replace the clutch assembly and complete a road test after fitting.',
  },
} as const;

type Props = {
  params: Promise<{ id: string }>;
};

export default async function GarageJobDetailsPage({ params }: Props) {
  const { id } = await params;
  const job = garageJobs[id as keyof typeof garageJobs];

  if (!job) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Button variant="outline" size="sm" asChild>
        <Link href="/admin/dashboard/garage">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Garage Work
        </Link>
      </Button>

      <div className="bg-zinc-900 border border-white/10 rounded-lg overflow-hidden">
        <div className="border-b border-white/10 px-6 py-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold text-white">{job.jobType}</h1>
              <p className="mt-1 text-zinc-400">{job.vehicle} · {job.registration}</p>
            </div>
            <span className="inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-400">
              {job.status}
            </span>
          </div>
        </div>

        <dl className="grid grid-cols-1 gap-px bg-white/10 md:grid-cols-2">
          <div className="bg-zinc-900 p-6">
            <dt className="text-sm text-zinc-500">Customer</dt>
            <dd className="mt-1 font-medium text-white">{job.customer}</dd>
            <dd className="text-zinc-400">{job.phone}</dd>
          </div>
          <div className="bg-zinc-900 p-6">
            <dt className="text-sm text-zinc-500">Date In</dt>
            <dd className="mt-1 font-medium text-white">{job.dateIn}</dd>
          </div>
          <div className="bg-zinc-900 p-6 md:col-span-2">
            <dt className="text-sm text-zinc-500">Job Notes</dt>
            <dd className="mt-1 leading-relaxed text-zinc-200">{job.notes}</dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
