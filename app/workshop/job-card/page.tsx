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
          <h1 className="text-2xl font-bold text-white mb-2">Job Card Submitted</h1>
          <p className="text-zinc-400 mb-2">Job Card No: <span className="text-white font-mono font-semibold">{jobCardNo}</span></p>
          <p className="text-zinc-400 mb-6">The job card has been saved to the dashboard.</p>
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
      <div className="border-b border-white/10 bg-zinc-950 px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">TD Car Centre – Workshop Job Card</h1>
            <p className="text-sm text-zinc-400">Repair Order Form</p>
          </div>
          <span className="text-xs text-zinc-500 bg-zinc-800 px-3 py-1 rounded-full">Staff Only</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto px-6 py-8">

        {/* Header Info */}
        <div className={sectionCls}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
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
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
            <div className="sm:col-span-2">
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
            rows={4}
            className={inputCls}
            placeholder="Describe the work requested or customer complaint..."
            value={form.workRequested}
            onChange={e => setField('workRequested', e.target.value)}
          />
        </div>

        {/* Vehicle Health Check */}
        <div className={sectionCls}>
          <h2 className={sectionTitle}>Vehicle Health Check</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-zinc-400 border-b border-white/10">
                  <th className="text-left py-2 pr-4 font-medium">Check Item</th>
                  <th className="text-center py-2 px-3 font-medium w-16">OK</th>
                  <th className="text-center py-2 px-3 font-medium w-32">Attention Required</th>
                  <th className="text-left py-2 pl-4 font-medium">Notes</th>
                </tr>
              </thead>
              <tbody>
                {HEALTH_CHECK_ITEMS.map(item => (
                  <tr key={item.key} className="border-b border-white/5">
                    <td className="py-2 pr-4 text-zinc-200">{item.label}</td>
                    <td className="text-center py-2 px-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-red-600"
                        checked={healthChecks[item.key].ok}
                        onChange={e => setHealthCheck(item.key, 'ok', e.target.checked)}
                      />
                    </td>
                    <td className="text-center py-2 px-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 accent-red-600"
                        checked={healthChecks[item.key].attention}
                        onChange={e => setHealthCheck(item.key, 'attention', e.target.checked)}
                      />
                    </td>
                    <td className="py-2 pl-4">
                      <input
                        className="w-full bg-zinc-800 border border-white/10 rounded px-2 py-1 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-red-600"
                        placeholder="Notes..."
                        value={healthChecks[item.key].notes}
                        onChange={e => setHealthCheck(item.key, 'notes', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Parts Required */}
        <div className={sectionCls}>
          <h2 className={sectionTitle}>Parts Required / To Be Ordered</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm mb-3">
              <thead>
                <tr className="text-zinc-400 border-b border-white/10">
                  <th className="text-left py-2 pr-2 font-medium">Part Description</th>
                  <th className="text-left py-2 px-2 font-medium w-20">Qty</th>
                  <th className="text-left py-2 px-2 font-medium">Supplier</th>
                  <th className="text-left py-2 px-2 font-medium">Ordered By</th>
                  <th className="text-left py-2 px-2 font-medium">Delivery ETA</th>
                  <th className="w-8" />
                </tr>
              </thead>
              <tbody>
                {parts.map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    {(['description', 'quantity', 'supplier', 'orderedBy', 'deliveryEta'] as (keyof PartRow)[]).map(key => (
                      <td key={key} className="py-1 px-1">
                        <input
                          className="w-full bg-zinc-800 border border-white/10 rounded px-2 py-1.5 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-red-600"
                          value={row[key]}
                          onChange={e => updatePart(i, key, e.target.value)}
                        />
                      </td>
                    ))}
                    <td className="py-1 pl-1">
                      <button type="button" onClick={() => removePart(i)} className="text-zinc-600 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="button" onClick={addPart} className="flex items-center gap-1 text-sm text-red-500 hover:text-red-400 transition-colors">
            <Plus className="w-4 h-4" /> Add Part
          </button>
        </div>

        {/* Work Carried Out */}
        <div className={sectionCls}>
          <h2 className={sectionTitle}>Work Carried Out</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm mb-3">
              <thead>
                <tr className="text-zinc-400 border-b border-white/10">
                  <th className="text-left py-2 pr-2 font-medium">Mechanic Name</th>
                  <th className="text-left py-2 px-2 font-medium">Work Performed</th>
                  <th className="text-left py-2 px-2 font-medium w-24">Hours Worked</th>
                  <th className="text-left py-2 px-2 font-medium w-32">Date</th>
                  <th className="w-8" />
                </tr>
              </thead>
              <tbody>
                {workRows.map((row, i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-1 pr-1">
                      <input className="w-full bg-zinc-800 border border-white/10 rounded px-2 py-1.5 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-red-600" value={row.mechanicName} onChange={e => updateWork(i, 'mechanicName', e.target.value)} />
                    </td>
                    <td className="py-1 px-1">
                      <input className="w-full bg-zinc-800 border border-white/10 rounded px-2 py-1.5 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-red-600" value={row.workPerformed} onChange={e => updateWork(i, 'workPerformed', e.target.value)} />
                    </td>
                    <td className="py-1 px-1">
                      <input className="w-full bg-zinc-800 border border-white/10 rounded px-2 py-1.5 text-white text-xs placeholder-zinc-600 focus:outline-none focus:border-red-600" value={row.hoursWorked} onChange={e => updateWork(i, 'hoursWorked', e.target.value)} />
                    </td>
                    <td className="py-1 px-1">
                      <input type="date" className="w-full bg-zinc-800 border border-white/10 rounded px-2 py-1.5 text-white text-xs focus:outline-none focus:border-red-600" value={row.date} onChange={e => updateWork(i, 'date', e.target.value)} />
                    </td>
                    <td className="py-1 pl-1">
                      <button type="button" onClick={() => removeWork(i)} className="text-zinc-600 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button type="button" onClick={addWork} className="flex items-center gap-1 text-sm text-red-500 hover:text-red-400 transition-colors">
            <Plus className="w-4 h-4" /> Add Row
          </button>
        </div>

        {/* Additional Repairs */}
        <div className={sectionCls}>
          <h2 className={sectionTitle}>Additional Repairs Required / Recommendations</h2>
          <textarea rows={3} className={inputCls} placeholder="List any additional repairs recommended..." value={form.additionalRepairs} onChange={e => setField('additionalRepairs', e.target.value)} />
        </div>

        {/* Comments */}
        <div className={sectionCls}>
          <h2 className={sectionTitle}>Comments / Issues Found</h2>
          <textarea rows={3} className={inputCls} placeholder="Any additional comments or issues found..." value={form.comments} onChange={e => setField('comments', e.target.value)} />
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

        {/* Customer Approval */}
        <div className={sectionCls}>
          <h2 className={sectionTitle}>Customer Approval</h2>
          <p className="text-sm text-zinc-400 mb-4">I authorise TD Car Centre to carry out the above work and understand that additional repairs may require further approval.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Customer Signature (printed name)</label>
              <input className={inputCls} placeholder="Customer full name" value={form.customerSignature} onChange={e => setField('customerSignature', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>Date</label>
              <input type="date" className={inputCls} value={form.customerApprovalDate} onChange={e => setField('customerApprovalDate', e.target.value)} />
            </div>
          </div>
        </div>

        {/* Workshop Completion */}
        <div className={sectionCls}>
          <h2 className={sectionTitle}>Workshop Completion</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
