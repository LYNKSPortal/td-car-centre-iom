'use client';

import { useEffect, useState } from 'react';
import { ClipboardList, ChevronDown, ChevronUp, ExternalLink } from 'lucide-react';

type HealthCheck = { ok: boolean; attention: boolean; notes: string };
type PartRow = { description: string; quantity: string; supplier: string; orderedBy: string; deliveryEta: string };
type WorkRow = { mechanicName: string; workPerformed: string; hoursWorked: string; date: string };

type JobCard = {
  id: string;
  jobCardNo: string;
  date: string;
  customerName: string;
  customerPhone: string | null;
  customerEmail: string | null;
  vehicleMake: string | null;
  vehicleModel: string | null;
  registration: string | null;
  vin: string | null;
  mileage: string | null;
  colour: string | null;
  fuelType: string | null;
  workRequested: string | null;
  healthChecks: string | null;
  partsRequired: string | null;
  workCarriedOut: string | null;
  additionalRepairs: string | null;
  comments: string | null;
  valeted: boolean;
  roadTested: boolean;
  qualityCheck: boolean;
  customerSignature: string | null;
  customerApprovalDate: string | null;
  completedBy: string | null;
  dateCompleted: string | null;
  finalInvoiceAmount: string | null;
  status: string;
  createdAt: string;
};

const HEALTH_LABELS: Record<string, string> = {
  engineOil: 'Engine Oil Level', coolant: 'Coolant Level', brakeFluid: 'Brake Fluid',
  tyres: 'Tyres Condition', brakes: 'Brakes', suspension: 'Suspension',
  battery: 'Battery', lights: 'Lights', wipers: 'Wipers', exhaust: 'Exhaust', airConditioning: 'Air Conditioning',
};

function StatusBadge({ status }: { status: string }) {
  const colours: Record<string, string> = { open: 'bg-yellow-500/20 text-yellow-400', completed: 'bg-green-500/20 text-green-400' };
  return <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colours[status] ?? 'bg-zinc-700 text-zinc-300'}`}>{status}</span>;
}

function JobCardRow({ card }: { card: JobCard }) {
  const [open, setOpen] = useState(false);
  const health: Record<string, HealthCheck> | null = card.healthChecks ? JSON.parse(card.healthChecks) : null;
  const parts: PartRow[] | null = card.partsRequired ? JSON.parse(card.partsRequired) : null;
  const work: WorkRow[] | null = card.workCarriedOut ? JSON.parse(card.workCarriedOut) : null;

  return (
    <div className="bg-zinc-900/50 border border-white/10 rounded-lg overflow-hidden mb-3">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/5 transition-colors text-left"
      >
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <ClipboardList className="w-5 h-5 text-red-600 flex-shrink-0" />
          <div className="min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-mono text-sm font-semibold text-white">{card.jobCardNo}</span>
              <StatusBadge status={card.status} />
              <span className="text-sm text-zinc-300">{card.customerName}</span>
              {card.registration && <span className="text-xs bg-zinc-700 text-zinc-200 px-2 py-0.5 rounded font-mono">{card.registration}</span>}
            </div>
            <p className="text-xs text-zinc-500 mt-0.5">
              {card.vehicleMake} {card.vehicleModel} &bull; {card.date} &bull; {card.mileage ? `${card.mileage} miles` : 'No mileage'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3 ml-4 flex-shrink-0">
          {card.finalInvoiceAmount && <span className="text-sm font-semibold text-white">£{card.finalInvoiceAmount}</span>}
          {open ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
        </div>
      </button>

      {open && (
        <div className="border-t border-white/10 px-5 py-5 space-y-6 text-sm">
          {/* Customer & Vehicle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-2">Customer</h3>
              <p className="text-white">{card.customerName}</p>
              {card.customerPhone && <p className="text-zinc-400">{card.customerPhone}</p>}
              {card.customerEmail && <a href={`mailto:${card.customerEmail}`} className="text-red-500 hover:underline">{card.customerEmail}</a>}
            </div>
            <div>
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-2">Vehicle</h3>
              <p className="text-white">{card.vehicleMake} {card.vehicleModel} {card.registration && `— ${card.registration}`}</p>
              <p className="text-zinc-400">{card.colour} &bull; {card.fuelType} &bull; {card.mileage} miles</p>
              {card.vin && <p className="text-zinc-500 text-xs font-mono">VIN: {card.vin}</p>}
            </div>
          </div>

          {/* Work Requested */}
          {card.workRequested && (
            <div>
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-2">Work Requested</h3>
              <p className="text-zinc-200 whitespace-pre-wrap">{card.workRequested}</p>
            </div>
          )}

          {/* Health Checks */}
          {health && (
            <div>
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-2">Vehicle Health Check</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-zinc-500 border-b border-white/10">
                      <th className="text-left py-1 pr-3 font-medium">Item</th>
                      <th className="text-center py-1 px-2 font-medium">OK</th>
                      <th className="text-center py-1 px-2 font-medium">Attention</th>
                      <th className="text-left py-1 pl-3 font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(health).map(([key, val]) => (
                      <tr key={key} className={`border-b border-white/5 ${val.attention ? 'bg-red-950/20' : ''}`}>
                        <td className="py-1.5 pr-3 text-zinc-300">{HEALTH_LABELS[key] ?? key}</td>
                        <td className="text-center py-1.5">{val.ok ? '✓' : '—'}</td>
                        <td className="text-center py-1.5">{val.attention ? <span className="text-red-400 font-semibold">!</span> : '—'}</td>
                        <td className="py-1.5 pl-3 text-zinc-400">{val.notes || '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Parts */}
          {parts && parts.some(p => p.description) && (
            <div>
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-2">Parts Required</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-zinc-500 border-b border-white/10">
                      {['Description', 'Qty', 'Supplier', 'Ordered By', 'Delivery ETA'].map(h => <th key={h} className="text-left py-1 pr-3 font-medium">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {parts.filter(p => p.description).map((p, i) => (
                      <tr key={i} className="border-b border-white/5 text-zinc-300">
                        <td className="py-1.5 pr-3">{p.description}</td>
                        <td className="py-1.5 pr-3">{p.quantity}</td>
                        <td className="py-1.5 pr-3">{p.supplier}</td>
                        <td className="py-1.5 pr-3">{p.orderedBy}</td>
                        <td className="py-1.5">{p.deliveryEta}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Work Carried Out */}
          {work && work.some(w => w.workPerformed) && (
            <div>
              <h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-2">Work Carried Out</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="text-zinc-500 border-b border-white/10">
                      {['Mechanic', 'Work Performed', 'Hours', 'Date'].map(h => <th key={h} className="text-left py-1 pr-3 font-medium">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {work.filter(w => w.workPerformed).map((w, i) => (
                      <tr key={i} className="border-b border-white/5 text-zinc-300">
                        <td className="py-1.5 pr-3">{w.mechanicName}</td>
                        <td className="py-1.5 pr-3">{w.workPerformed}</td>
                        <td className="py-1.5 pr-3">{w.hoursWorked}</td>
                        <td className="py-1.5">{w.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Additional / Comments */}
          {(card.additionalRepairs || card.comments) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {card.additionalRepairs && <div><h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Additional Repairs</h3><p className="text-zinc-300 whitespace-pre-wrap">{card.additionalRepairs}</p></div>}
              {card.comments && <div><h3 className="text-xs font-semibold text-zinc-400 uppercase tracking-wide mb-1">Comments</h3><p className="text-zinc-300 whitespace-pre-wrap">{card.comments}</p></div>}
            </div>
          )}

          {/* Completion */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2 border-t border-white/10">
            <div><p className="text-xs text-zinc-500">Valeted</p><p className={card.valeted ? 'text-green-400 font-semibold' : 'text-zinc-400'}>{card.valeted ? 'Yes' : 'No'}</p></div>
            <div><p className="text-xs text-zinc-500">Road Tested</p><p className={card.roadTested ? 'text-green-400 font-semibold' : 'text-zinc-400'}>{card.roadTested ? 'Yes' : 'No'}</p></div>
            <div><p className="text-xs text-zinc-500">Quality Check</p><p className={card.qualityCheck ? 'text-green-400 font-semibold' : 'text-zinc-400'}>{card.qualityCheck ? 'Yes' : 'No'}</p></div>
            {card.finalInvoiceAmount && <div><p className="text-xs text-zinc-500">Invoice</p><p className="text-white font-semibold">£{card.finalInvoiceAmount}</p></div>}
          </div>
          {(card.completedBy || card.customerSignature) && (
            <div className="grid grid-cols-2 gap-4">
              {card.completedBy && <div><p className="text-xs text-zinc-500">Completed By</p><p className="text-zinc-300">{card.completedBy} {card.dateCompleted && `(${card.dateCompleted})`}</p></div>}
              {card.customerSignature && <div><p className="text-xs text-zinc-500">Customer Signature</p><p className="text-zinc-300">{card.customerSignature} {card.customerApprovalDate && `(${card.customerApprovalDate})`}</p></div>}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function JobCardsPage() {
  const [cards, setCards] = useState<JobCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/job-cards')
      .then(r => r.json())
      .then(d => { if (d.success) setCards(d.jobCards); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-white">Workshop Job Cards</h1>
          <p className="text-zinc-400 text-sm mt-1">{cards.length} job card{cards.length !== 1 ? 's' : ''} on record</p>
        </div>
        <a
          href="/workshop/job-card"
          target="_blank"
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Open Job Card Form
        </a>
      </div>

      {loading ? (
        <div className="text-zinc-400 text-sm">Loading...</div>
      ) : cards.length === 0 ? (
        <div className="bg-zinc-900/50 border border-white/10 rounded-lg p-12 text-center">
          <ClipboardList className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
          <p className="text-zinc-400">No job cards yet. Share the form link with your mechanics.</p>
        </div>
      ) : (
        cards.map(card => <JobCardRow key={card.id} card={card} />)
      )}
    </div>
  );
}
