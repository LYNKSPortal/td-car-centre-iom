'use client';

import { useState } from 'react';
import { Plus, Trash2, CheckCircle } from 'lucide-react';

const HEALTH_CHECK_ITEMS = [
  { key: 'engineOil', label: 'Engine Oil Level' },
  { key: 'coolant', label: 'Coolant Level' },
  { key: 'brakeFluid', label: 'Brake Fluid' },
  { key: 'tyres', label: 'Tyres Condition' },
  { key: 'brakes', label: 'Brakes' },
  { key: 'suspension', label: 'Suspension' },
  { key: 'battery', label: 'Battery' },
  { key: 'lights', label: 'Lights' },
  { key: 'wipers', label: 'Wipers' },
  { key: 'exhaust', label: 'Exhaust' },
  { key: 'airConditioning', label: 'Air Conditioning' },
];

type HealthCheck = { ok: boolean; attention: boolean; notes: string };
type PartRow = { description: string; quantity: string; supplier: string; orderedBy: string; deliveryEta: string };
type WorkRow = { mechanicName: string; workPerformed: string; hoursWorked: string; date: string };

export default function WorkshopJobCardPage() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [jobCardNo, setJobCardNo] = useState('');

  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    submittedBy: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    vehicleMake: '',
    vehicleModel: '',
    registration: '',
    vin: '',
    mileage: '',
    colour: '',
    fuelType: '',
    workRequested: '',
    additionalRepairs: '',
    comments: '',
    valeted: false,
    roadTested: false,
    qualityCheck: false,
    customerSignature: '',
    customerApprovalDate: '',
    completedBy: '',
    dateCompleted: '',
    finalInvoiceAmount: '',
  });

  const [healthChecks, setHealthChecks] = useState<Record<string, HealthCheck>>(
    Object.fromEntries(HEALTH_CHECK_ITEMS.map(i => [i.key, { ok: false, attention: false, notes: '' }]))
  );

  const [parts, setParts] = useState<PartRow[]>([
    { description: '', quantity: '', supplier: '', orderedBy: '', deliveryEta: '' },
  ]);

  const [workRows, setWorkRows] = useState<WorkRow[]>([
    { mechanicName: '', workPerformed: '', hoursWorked: '', date: '' },
  ]);

  const setField = (key: string, value: string | boolean) =>
    setForm(prev => ({ ...prev, [key]: value }));

  const setHealthCheck = (key: string, field: keyof HealthCheck, value: boolean | string) =>
    setHealthChecks(prev => ({ ...prev, [key]: { ...prev[key], [field]: value } }));

  const addPart = () => setParts(p => [...p, { description: '', quantity: '', supplier: '', orderedBy: '', deliveryEta: '' }]);
  const removePart = (i: number) => setParts(p => p.filter((_, idx) => idx !== i));
  const updatePart = (i: number, key: keyof PartRow, val: string) =>
    setParts(p => p.map((row, idx) => idx === i ? { ...row, [key]: val } : row));

  const addWork = () => setWorkRows(w => [...w, { mechanicName: '', workPerformed: '', hoursWorked: '', date: '' }]);
  const removeWork = (i: number) => setWorkRows(w => w.filter((_, idx) => idx !== i));
  const updateWork = (i: number, key: keyof WorkRow, val: string) =>
    setWorkRows(w => w.map((row, idx) => idx === i ? { ...row, [key]: val } : row));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/job-cards', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, healthChecks, partsRequired: parts, workCarriedOut: workRows }),
      });
      const data = await res.json();
      if (data.success) {
        setJobCardNo(data.jobCard.jobCardNo);
        setSubmitted(true);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const inputCls = 'w-full bg-zinc-800 border border-white/10 rounded px-3 py-2 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-red-600';
  const labelCls = 'block text-xs font-medium text-zinc-400 mb-1';
  const sectionCls = 'bg-zinc-900/50 border border-white/10 rounded-lg p-6 mb-6';
  const sectionTitle = 'text-lg font-bold text-white mb-4 pb-2 border-b border-white/10';

  if (submitted) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <CheckCircle className="w-16 h-16 text-red-600 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Thank you{form.submittedBy ? `, ${form.submittedBy}` : ''}!</h1>
          <p className="text-zinc-300 mb-4">This job card has been sent to <strong>Tony</strong> and <strong>Tomasz</strong> for approval.</p>
          <p className="text-zinc-400 mb-2">Job Card No: <span className="text-white font-mono font-semibold">{jobCardNo}</span></p>
          <button
            onClick={() => { setSubmitted(false); window.location.reload(); }}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
          >
            New Job Card
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <div className="bg-zinc-950 border-b border-white/10 py-8 md:py-12 lg:py-16">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 uppercase tracking-wider rounded">
              Staff Only
            </span>
          </div>
          <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-3">
            Workshop Job Card
          </h1>
          <p className="text-base md:text-lg text-zinc-400 max-w-2xl">
            TD Car Centre – Repair Order Form. Complete all relevant sections and submit to save to the dashboard.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="container mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12 max-w-4xl">

        {/* Header Info */}
        <div className={sectionCls}>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Your Name (Submitting Mechanic) *</label>
              <input required className={inputCls} placeholder="Your full name" value={form.submittedBy} onChange={e => setField('submittedBy', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Date</label>
              <input type="date" className={inputCls} value={form.date} onChange={e => setField('date', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Job Card No (auto-assigned on submit)</label>
              <input type="text" className={`${inputCls} opacity-50`} value="Auto-generated" readOnly />
            </div>
          </div>
        </div>

        {/* Customer Details */}
        <div className={sectionCls}>
          <h2 className={sectionTitle}>Customer Details</h2>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Customer Name *</label>
              <input required className={inputCls} placeholder="Full name" value={form.customerName} onChange={e => setField('customerName', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Phone Number</label>
              <input className={inputCls} placeholder="01624 000 000" value={form.customerPhone} onChange={e => setField('customerPhone', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Email Address</label>
              <input type="email" className={inputCls} placeholder="customer@example.com" value={form.customerEmail} onChange={e => setField('customerEmail', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className={sectionCls}>
          <h2 className={sectionTitle}>Vehicle Details</h2>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Make</label>
              <input className={inputCls} placeholder="e.g. Ford" value={form.vehicleMake} onChange={e => setField('vehicleMake', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Model</label>
              <input className={inputCls} placeholder="e.g. Focus" value={form.vehicleModel} onChange={e => setField('vehicleModel', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Registration Number</label>
              <input className={`${inputCls} uppercase`} placeholder="e.g. AB12 CDE" value={form.registration} onChange={e => setField('registration', e.target.value.toUpperCase())} />
            </div>
            <div>
              <label className={labelCls}>VIN / Chassis Number</label>
              <input className={inputCls} placeholder="17-character VIN" value={form.vin} onChange={e => setField('vin', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Mileage / Odometer</label>
              <input className={inputCls} placeholder="e.g. 45,230" value={form.mileage} onChange={e => setField('mileage', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Colour</label>
              <input className={inputCls} placeholder="e.g. Silver" value={form.colour} onChange={e => setField('colour', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Fuel Type</label>
              <select className={inputCls} value={form.fuelType} onChange={e => setField('fuelType', e.target.value)}>
                <option value="">Select...</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>Hybrid</option>
                <option>Electric</option>
                <option>Plug-in Hybrid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Work Requested */}
        <div className={sectionCls}>
          <h2 className={sectionTitle}>Work Requested / Customer Complaint</h2>
          <textarea
            rows={10}
            className={inputCls}
            placeholder="Describe the work requested or customer complaint..."
            value={form.workRequested}
            onChange={e => setField('workRequested', e.target.value)}
          />
        </div>

        {/* Vehicle Health Check */}
        <div className={sectionCls}>
          <h2 className={sectionTitle}>Vehicle Health Check</h2>
          <div className="space-y-3">
            {HEALTH_CHECK_ITEMS.map(item => (
              <div key={item.key} className="bg-zinc-800/50 border border-white/10 rounded-lg p-4">
                <p className="text-sm font-medium text-white mb-3">{item.label}</p>
                <div className="flex gap-6 mb-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-red-600"
                      checked={healthChecks[item.key].ok}
                      onChange={e => setHealthCheck(item.key, 'ok', e.target.checked)}
                    />
                    <span className="text-sm text-zinc-300">OK</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-5 h-5 accent-red-600"
                      checked={healthChecks[item.key].attention}
                      onChange={e => setHealthCheck(item.key, 'attention', e.target.checked)}
                    />
                    <span className="text-sm text-zinc-300">Attention Required</span>
                  </label>
                </div>
                <textarea
                  rows={5}
                  className={inputCls}
                  placeholder="Notes..."
                  value={healthChecks[item.key].notes}
                  onChange={e => setHealthCheck(item.key, 'notes', e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Parts Required */}
        <div className={sectionCls}>
          <h2 className={sectionTitle}>Parts Required / To Be Ordered</h2>
          <div className="space-y-4">
            {parts.map((row, i) => (
              <div key={i} className="bg-zinc-800/50 border border-white/10 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Part {i + 1}</span>
                  <button type="button" onClick={() => removePart(i)} className="text-zinc-600 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <label className={labelCls}>Part Description</label>
                  <input className={inputCls} placeholder="e.g. Oil filter" value={row.description} onChange={e => updatePart(i, 'description', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Quantity</label>
                  <input className={inputCls} placeholder="e.g. 2" value={row.quantity} onChange={e => updatePart(i, 'quantity', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Supplier</label>
                  <input className={inputCls} placeholder="e.g. Euro Car Parts" value={row.supplier} onChange={e => updatePart(i, 'supplier', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Ordered By</label>
                  <input className={inputCls} placeholder="Name" value={row.orderedBy} onChange={e => updatePart(i, 'orderedBy', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Delivery ETA</label>
                  <input className={inputCls} placeholder="e.g. Tomorrow AM" value={row.deliveryEta} onChange={e => updatePart(i, 'deliveryEta', e.target.value)} />
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={addPart} className="flex items-center gap-1 text-sm text-red-500 hover:text-red-400 transition-colors mt-4">
            <Plus className="w-4 h-4" /> Add Part
          </button>
        </div>

        {/* Work Carried Out */}
        <div className={sectionCls}>
          <h2 className={sectionTitle}>Work Carried Out</h2>
          <div className="space-y-4">
            {workRows.map((row, i) => (
              <div key={i} className="bg-zinc-800/50 border border-white/10 rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Entry {i + 1}</span>
                  <button type="button" onClick={() => removeWork(i)} className="text-zinc-600 hover:text-red-500 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <label className={labelCls}>Mechanic Name</label>
                  <input className={inputCls} placeholder="Name" value={row.mechanicName} onChange={e => updateWork(i, 'mechanicName', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Work Performed</label>
                  <textarea rows={5} className={inputCls} placeholder="Describe work done" value={row.workPerformed} onChange={e => updateWork(i, 'workPerformed', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Hours Worked</label>
                  <input className={inputCls} placeholder="e.g. 2.5" value={row.hoursWorked} onChange={e => updateWork(i, 'hoursWorked', e.target.value)} />
                </div>
                <div>
                  <label className={labelCls}>Date</label>
                  <input type="date" className={inputCls} value={row.date} onChange={e => updateWork(i, 'date', e.target.value)} />
                </div>
              </div>
            ))}
          </div>
          <button type="button" onClick={addWork} className="flex items-center gap-1 text-sm text-red-500 hover:text-red-400 transition-colors mt-4">
            <Plus className="w-4 h-4" /> Add Row
          </button>
        </div>

        {/* Additional Repairs */}
        <div className={sectionCls}>
          <h2 className={sectionTitle}>Additional Repairs Required / Recommendations</h2>
          <textarea rows={5} className={inputCls} placeholder="List any additional repairs recommended..." value={form.additionalRepairs} onChange={e => setField('additionalRepairs', e.target.value)} />
        </div>

        {/* Comments */}
        <div className={sectionCls}>
          <h2 className={sectionTitle}>Comments / Issues Found</h2>
          <textarea rows={5} className={inputCls} placeholder="Any additional comments or issues found..." value={form.comments} onChange={e => setField('comments', e.target.value)} />
        </div>

        {/* Valeting & Preparation */}
        <div className={sectionCls}>
          <h2 className={sectionTitle}>Valeting &amp; Preparation</h2>
          <div className="flex flex-col gap-4">
            {[
              { key: 'valeted', label: 'Vehicle Valeted' },
              { key: 'roadTested', label: 'Road Tested' },
              { key: 'qualityCheck', label: 'Final Quality Check Completed' },
            ].map(({ key, label }) => (
              <div key={key} className="flex items-center gap-6">
                <span className="text-sm text-zinc-200 w-52">{label}</span>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name={key} checked={form[key as keyof typeof form] === true} onChange={() => setField(key, true)} className="accent-red-600" />
                  <span className="text-sm text-zinc-300">YES</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name={key} checked={form[key as keyof typeof form] === false} onChange={() => setField(key, false)} className="accent-red-600" />
                  <span className="text-sm text-zinc-300">NO</span>
                </label>
              </div>
            ))}
          </div>
        </div>


        {/* Workshop Completion */}
        <div className={sectionCls}>
          <h2 className={sectionTitle}>Workshop Completion</h2>
          <div className="space-y-4">
            <div>
              <label className={labelCls}>Completed By</label>
              <input className={inputCls} placeholder="Mechanic name" value={form.completedBy} onChange={e => setField('completedBy', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Date Completed</label>
              <input type="date" className={inputCls} value={form.dateCompleted} onChange={e => setField('dateCompleted', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Final Invoice Amount (£)</label>
              <input className={inputCls} placeholder="0.00" value={form.finalInvoiceAmount} onChange={e => setField('finalInvoiceAmount', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pb-8">
          <button
            type="submit"
            disabled={submitting}
            className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-semibold px-8 py-3 rounded-lg transition-colors text-sm"
          >
            {submitting ? 'Submitting...' : 'Submit Job Card'}
          </button>
        </div>
      </form>
    </div>
  );
}
