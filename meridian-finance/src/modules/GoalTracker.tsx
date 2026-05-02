import React, { useState, useEffect } from 'react';
import { monthsToGoal } from '../lib/calculations';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import Card from '../components/Card';
import Label from '../components/Label';
import Mono from '../components/Mono';
import CustomTooltip from '../components/CustomTooltip';
import { Goal } from '../data/initialData';
import { downloadCsv } from '../lib/exportCsv';
import { C } from '../lib/theme';
import { fmt, fmtFull } from '../lib/format';
import { useIsMobile } from '../hooks/useIsMobile';
import { Trash2, Plus, Target, Download } from 'lucide-react';

const SENSITIVITY_AMOUNTS = [500, 1000, 1500, 2000, 3000, 5000, 7500, 10000];

function reachYear(months: number): string {
  if (months >= 600) return 'N/A';
  return String(new Date().getFullYear() + Math.floor(months / 12));
}

function buildGrowthCurve(current: number, target: number, monthly: number, annualRate: number) {
  const totalMonths = Math.min(monthsToGoal(current, target, monthly, annualRate) + 12, 600);
  const monthlyRate = annualRate / 12;
  const points: { year: number; balance: number }[] = [];
  let balance = current;
  for (let m = 0; m <= totalMonths; m++) {
    if (m % 6 === 0 || m === totalMonths) {
      points.push({ year: parseFloat((m / 12).toFixed(2)), balance: Math.round(balance) });
    }
    balance = balance * (1 + monthlyRate) + monthly;
  }
  return points;
}

function GoalCard({ goal, active, onClick, onDelete }: {
  goal: Goal;
  active: boolean;
  onClick: () => void;
  onDelete: () => void;
}) {
  const pct    = Math.min(100, (goal.current / goal.target) * 100);
  const months = monthsToGoal(goal.current, goal.target, goal.monthly, goal.rate);
  const yrs    = (months / 12).toFixed(1);

  return (
    <Card style={{ border: active ? `1px solid ${C.amber}` : `1px solid ${C.border}`, position: 'relative' }}>
      <div
        role="button"
        tabIndex={0}
        aria-pressed={active}
        aria-label={`Select goal: ${goal.name}`}
        onClick={onClick}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
        style={{ cursor: 'pointer' }}
      >
        {active && (
          <div style={{ position: 'absolute', top: 14, right: 14, width: 8, height: 8, borderRadius: '50%', background: C.amber }} />
        )}
        <div style={{ marginRight: 20 }}>
          <div style={{ fontSize: 13, color: C.text, fontWeight: 500, marginBottom: 4, lineHeight: 1.3 }}>{goal.name}</div>
          <div style={{ fontSize: 11, color: C.muted, fontFamily: 'ui-monospace, monospace', marginBottom: 12 }}>Target: {fmtFull(goal.target)}</div>
        </div>
        <div style={{ height: 5, background: C.border, borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
          <div style={{ width: pct + '%', height: '100%', background: C.amber, borderRadius: 3, transition: 'width 0.3s' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <Mono size={14}>{fmtFull(goal.current)}</Mono>
          <span style={{ fontSize: 11, color: C.amber, fontFamily: 'ui-monospace, monospace' }}>{pct.toFixed(1)}%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: C.text2, fontFamily: 'ui-monospace, monospace' }}>Est. {yrs} yrs</span>
          <button
            onClick={e => { e.stopPropagation(); onDelete(); }}
            aria-label={`Delete goal: ${goal.name}`}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: 2, display: 'flex' }}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </Card>
  );
}

interface Props {
  goals: Goal[];
  onAddGoal: (goal: Omit<Goal, 'id'>) => void;
  onDeleteGoal: (id: number) => void;
}

export default function GoalTracker({ goals, onAddGoal, onDeleteGoal }: Props) {
  const [activeId,     setActiveId]     = useState<number>(goals[0]?.id ?? 0);
  const [showAddForm,  setShowAddForm]  = useState(false);
  const [form,         setForm]         = useState({ name: '', target: '', current: '', monthly: '', rate: '' });
  const [formError,    setFormError]    = useState('');
  const isMobile = useIsMobile();

  // Keep active selection valid when goals change (deletion, profile import)
  useEffect(() => {
    if (goals.length > 0 && !goals.find(g => g.id === activeId)) {
      setActiveId(goals[0].id);
    }
  }, [goals, activeId]);

  const activeGoal  = goals.find(g => g.id === activeId);
  const months      = activeGoal ? monthsToGoal(activeGoal.current, activeGoal.target, activeGoal.monthly, activeGoal.rate) : 0;
  const growthCurve = activeGoal ? buildGrowthCurve(activeGoal.current, activeGoal.target, activeGoal.monthly, activeGoal.rate) : [];

  const handleDeleteGoal = (id: number) => {
    const remaining = goals.filter(g => g.id !== id);
    onDeleteGoal(id);
    if (id === activeId && remaining.length > 0) setActiveId(remaining[0].id);
  };

  const setField = (field: keyof typeof form, value: string) => {
    setForm(f => ({ ...f, [field]: value }));
    setFormError('');
  };

  const handleAddGoal = () => {
    const target  = parseFloat(form.target.replace(/[$,]/g, ''));
    const current = parseFloat(form.current.replace(/[$,]/g, '')) || 0;
    const monthly = parseFloat(form.monthly.replace(/[$,]/g, '')) || 0;
    const rate    = parseFloat(form.rate) / 100;
    if (!form.name.trim())                       { setFormError('Goal name is required.'); return; }
    if (isNaN(target) || target <= 0)            { setFormError('Target must be a positive dollar amount.'); return; }
    if (isNaN(current) || current < 0)           { setFormError('Current amount must be ≥ 0.'); return; }
    if (current >= target)                       { setFormError('Current amount must be less than the target.'); return; }
    if (isNaN(monthly) || monthly < 0)           { setFormError('Monthly contribution must be ≥ 0.'); return; }
    if (isNaN(rate) || rate < 0 || rate > 1)     { setFormError('Return rate must be between 0% and 100%.'); return; }
    // Compute newId optimistically (matches App.tsx logic — both use max+1)
    const newId = goals.reduce((m, g) => Math.max(m, g.id), 0) + 1;
    onAddGoal({ name: form.name.trim(), target, current, monthly, rate });
    setActiveId(newId);
    setForm({ name: '', target: '', current: '', monthly: '', rate: '' });
    setFormError('');
    setShowAddForm(false);
  };

  const handleExportGoals = () => {
    const rows: (string | number)[][] = [
      ['Goal', 'Target', 'Current', 'Still Needed', 'Monthly Contribution', 'Return Rate', 'Est. Years', 'Reach Year'],
      ...goals.map(g => {
        const m = monthsToGoal(g.current, g.target, g.monthly, g.rate);
        return [
          g.name, g.target, g.current, Math.max(0, g.target - g.current),
          g.monthly, (g.rate * 100).toFixed(2) + '%',
          m >= 600 ? 'N/A' : (m / 12).toFixed(1),
          m >= 600 ? 'N/A' : String(new Date().getFullYear() + Math.floor(m / 12)),
        ];
      }),
    ];
    downloadCsv('meridian-goals.csv', rows);
  };

  const inputStyle: React.CSSProperties = {
    background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 4,
    color: C.text, padding: '6px 10px', fontSize: 13,
    fontFamily: 'system-ui, sans-serif', outline: 'none', width: '100%',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Section 1 — Goal Cards + Add Button */}
      <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr) 160px', gap: 16 }}>
        {goals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            active={goal.id === activeId}
            onClick={() => setActiveId(goal.id)}
            onDelete={() => handleDeleteGoal(goal.id)}
          />
        ))}
        <button
          onClick={() => setShowAddForm(s => !s)}
          style={{
            background: 'transparent', border: `1px dashed ${C.border}`,
            borderRadius: 8, color: C.muted, cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'center', gap: 8, fontSize: 12,
            fontFamily: 'system-ui, sans-serif', transition: 'border-color 0.2s',
            minHeight: 140,
          }}
        >
          <Plus size={20} />
          Add Goal
        </button>
      </div>

      {/* Empty state */}
      {goals.length === 0 && !showAddForm && (
        <Card>
          <div style={{ textAlign: 'center', padding: '32px 0', color: C.muted, fontFamily: 'ui-monospace, monospace', fontSize: 13 }}>
            No goals yet. Click "Add Goal" to create your first financial goal.
          </div>
        </Card>
      )}

      {/* Section 2 — Add Goal Form */}
      {showAddForm && (
        <Card>
          <div style={{ color: C.amber2, fontWeight: 600, fontSize: 13, marginBottom: 16 }}>New Goal</div>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '2fr 1fr 1fr 1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <Label style={{ marginBottom: 4 }}>Goal Name *</Label>
              <input style={inputStyle} placeholder="e.g. College Fund" value={form.name}
                onChange={e => setField('name', e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddGoal()} />
            </div>
            <div>
              <Label style={{ marginBottom: 4 }}>Target ($) *</Label>
              <input style={inputStyle} placeholder="e.g. 100000" value={form.target}
                onChange={e => setField('target', e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddGoal()} />
            </div>
            <div>
              <Label style={{ marginBottom: 4 }}>Current ($)</Label>
              <input style={inputStyle} placeholder="e.g. 5000" value={form.current}
                onChange={e => setField('current', e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddGoal()} />
            </div>
            <div>
              <Label style={{ marginBottom: 4 }}>Monthly ($)</Label>
              <input style={inputStyle} placeholder="e.g. 500" value={form.monthly}
                onChange={e => setField('monthly', e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddGoal()} />
            </div>
            <div>
              <Label style={{ marginBottom: 4 }}>Return Rate (%)</Label>
              <input style={inputStyle} placeholder="e.g. 5.5" value={form.rate}
                onChange={e => setField('rate', e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddGoal()} />
            </div>
          </div>
          {formError && (
            <div style={{ marginBottom: 10, fontSize: 11, color: C.red, fontFamily: 'ui-monospace, monospace' }}>
              {formError}
            </div>
          )}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={handleAddGoal}
              style={{ background: C.amber, color: '#000', border: 'none', borderRadius: 5, padding: '7px 18px', fontFamily: 'system-ui, sans-serif', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}>
              Add Goal
            </button>
            <button onClick={() => { setShowAddForm(false); setFormError(''); }}
              style={{ background: C.bg3, color: C.text2, border: `1px solid ${C.border}`, borderRadius: 5, padding: '7px 18px', fontFamily: 'system-ui, sans-serif', cursor: 'pointer', fontSize: 13 }}>
              Cancel
            </button>
          </div>
        </Card>
      )}

      {/* Section 3 — Active Goal Analysis */}
      {activeGoal && (
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20 }}>
          {/* Left — Contribution Sensitivity */}
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <div style={{ color: C.amber2, fontWeight: 600, fontSize: 13 }}>Contribution Sensitivity</div>
              <button onClick={handleExportGoals}
                style={{ display: 'flex', alignItems: 'center', gap: 5, background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 4, color: C.muted, cursor: 'pointer', padding: '4px 10px', fontSize: 11, fontFamily: 'ui-monospace, monospace' }}>
                <Download size={11} /> Export CSV
              </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'ui-monospace, monospace', fontSize: 12 }}>
              <thead>
                <tr>
                  {['Monthly', 'Years', 'Reach Year', 'Delta'].map(h => (
                    <th key={h} style={{ textAlign: 'right', padding: '5px 8px', color: C.muted, fontSize: 10, textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: `1px solid ${C.border}` }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {SENSITIVITY_AMOUNTS.map(amt => {
                  const m       = monthsToGoal(activeGoal.current, activeGoal.target, amt, activeGoal.rate);
                  const yrs     = m / 12;
                  const delta   = months / 12 - yrs;
                  const isSelected = amt === activeGoal.monthly;
                  return (
                    <tr key={amt} style={{ background: isSelected ? C.bg3 : 'transparent' }}>
                      <td style={{ textAlign: 'right', padding: '7px 8px', color: isSelected ? C.amber : C.text, borderBottom: `1px solid ${C.border}` }}>{fmtFull(amt)}</td>
                      <td style={{ textAlign: 'right', padding: '7px 8px', color: C.text2, borderBottom: `1px solid ${C.border}` }}>{m >= 600 ? 'N/A' : yrs.toFixed(1)}</td>
                      <td style={{ textAlign: 'right', padding: '7px 8px', color: C.text2, borderBottom: `1px solid ${C.border}` }}>{reachYear(m)}</td>
                      <td style={{ textAlign: 'right', padding: '7px 8px', color: isSelected ? C.muted : (delta > 0 ? C.green : C.red), borderBottom: `1px solid ${C.border}` }}>
                        {isSelected ? '—' : (delta > 0 ? '+' : '') + delta.toFixed(1) + ' yr'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>

          {/* Right — Goal Progress */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Target size={16} color={C.amber} />
              <span style={{ color: C.amber2, fontWeight: 600, fontSize: 13 }}>{activeGoal.name}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              {[
                { label: 'Still Needed',          value: fmtFull(Math.max(0, activeGoal.target - activeGoal.current)) },
                { label: 'Monthly Contribution',  value: fmtFull(activeGoal.monthly) },
                { label: 'Estimated Years',        value: months >= 600 ? 'N/A' : (months / 12).toFixed(1) },
                { label: 'Reach Date',             value: reachYear(months) },
              ].map(s => (
                <div key={s.label} style={{ background: C.bg3, borderRadius: 6, padding: '10px 12px' }}>
                  <Label style={{ marginBottom: 4 }}>{s.label}</Label>
                  <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 14, color: C.text }}>{s.value}</div>
                </div>
              ))}
            </div>

            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={growthCurve} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <defs>
                  <linearGradient id="goalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={C.amber} stopOpacity={0.20} />
                    <stop offset="95%" stopColor={C.amber} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
                <XAxis dataKey="year" tick={{ fill: C.muted, fontSize: 10, fontFamily: 'ui-monospace, monospace' }} axisLine={false} tickLine={false} tickFormatter={v => `Yr ${v}`} />
                <YAxis tick={{ fill: C.muted, fontSize: 10, fontFamily: 'ui-monospace, monospace' }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v)} />
                <Tooltip content={<CustomTooltip formatter={fmtFull} />} />
                <ReferenceLine y={activeGoal.target} stroke={C.green} strokeDasharray="6 3" strokeWidth={1.5}
                  label={{ value: 'Target', fill: C.green, fontSize: 10, fontFamily: 'ui-monospace, monospace' }} />
                <Area type="monotone" dataKey="balance" stroke={C.amber} strokeWidth={2} fill="url(#goalGrad)" name="Balance" />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}
    </div>
  );
}
