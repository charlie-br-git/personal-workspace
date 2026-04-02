import { useState, type CSSProperties } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, ReferenceLine,
} from 'recharts';
import Card from '../components/Card';
import Label from '../components/Label';
import Mono from '../components/Mono';
import CustomTooltip from '../components/CustomTooltip';
import { FinancialProfile } from '../data/initialData';
import { Trash2, Plus, Target } from 'lucide-react';

const C = {
  bg3: '#1a3a5c',
  border: '#1e3a5f',
  amber: '#f59e0b',
  amber2: '#fbbf24',
  green: '#10b981',
  red: '#ef4444',
  blue: '#3b82f6',
  muted: '#64748b',
  text: '#e2e8f0',
  text2: '#94a3b8',
};

interface Goal {
  id: number;
  name: string;
  target: number;
  current: number;
  monthly: number;
  rate: number; // annual rate as decimal
}

const INIT_GOALS: Goal[] = [
  { id: 1, name: '6-Month Emergency Fund', target: 147000, current: 50000, monthly: 1500, rate: 0.045 },
  { id: 2, name: 'Home Down Payment (20%)', target: 280000, current: 25000, monthly: 3000, rate: 0.055 },
  { id: 3, name: 'Retirement at Age 60', target: 3500000, current: 125000, monthly: 5000, rate: 0.07 },
];

const SENSITIVITY_AMOUNTS = [500, 1000, 1500, 2000, 3000, 5000, 7500, 10000];

function fmt(n: number) {
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(2) + 'M';
  return '$' + Math.round(n).toLocaleString();
}

function fmtFull(n: number) {
  return '$' + Math.round(n).toLocaleString();
}

function monthsToGoal(current: number, target: number, monthly: number, annualRate: number): number {
  if (current >= target) return 0;
  if (monthly <= 0 && annualRate <= 0) return 600;
  const monthlyRate = annualRate / 12;
  let balance = current;
  for (let m = 1; m <= 600; m++) {
    balance = balance * (1 + monthlyRate) + monthly;
    if (balance >= target) return m;
  }
  return 600;
}

function yearsToGoal(current: number, target: number, monthly: number, annualRate: number): number {
  return monthsToGoal(current, target, monthly, annualRate) / 12;
}

function reachYear(months: number): string {
  if (months >= 600) return 'N/A';
  const yr = new Date().getFullYear() + Math.floor(months / 12);
  return String(yr);
}

function buildGrowthCurve(current: number, target: number, monthly: number, annualRate: number) {
  const months = Math.min(monthsToGoal(current, target, monthly, annualRate) + 12, 600);
  const monthlyRate = annualRate / 12;
  const points: { year: number; balance: number }[] = [];
  let balance = current;
  for (let m = 0; m <= months; m++) {
    if (m % 6 === 0 || m === months) {
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
  const pct = Math.min(100, (goal.current / goal.target) * 100);
  const months = monthsToGoal(goal.current, goal.target, goal.monthly, goal.rate);
  const yrs = (months / 12).toFixed(1);

  return (
    <Card
      style={{
        border: active ? `1px solid ${C.amber}` : `1px solid ${C.border}`,
        cursor: 'pointer',
        position: 'relative',
      }}
    >
      <div onClick={onClick} style={{ cursor: 'pointer' }}>
        {active && (
          <div style={{ position: 'absolute', top: 14, right: 14, width: 8, height: 8, borderRadius: '50%', background: C.amber }} />
        )}
        <div style={{ marginRight: 20 }}>
          <div style={{ fontSize: 13, color: C.text, fontWeight: 500, marginBottom: 4, lineHeight: 1.3 }}>{goal.name}</div>
          <div style={{ fontSize: 11, color: C.muted, fontFamily: '"DM Mono", monospace', marginBottom: 12 }}>Target: {fmtFull(goal.target)}</div>
        </div>
        {/* Progress Bar */}
        <div style={{ height: 5, background: C.border, borderRadius: 3, overflow: 'hidden', marginBottom: 8 }}>
          <div style={{ width: pct + '%', height: '100%', background: C.amber, borderRadius: 3, transition: 'width 0.3s' }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <Mono size={14}>{fmtFull(goal.current)}</Mono>
          <span style={{ fontSize: 11, color: C.amber, fontFamily: '"DM Mono", monospace' }}>{pct.toFixed(1)}%</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, color: C.text2, fontFamily: '"DM Mono", monospace' }}>Est. {yrs} yrs</span>
          <button
            onClick={e => { e.stopPropagation(); onDelete(); }}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: 2, display: 'flex' }}
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>
    </Card>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export default function GoalTracker({ profile: _profile }: { profile: FinancialProfile }) {
  const [goals, setGoals] = useState<Goal[]>(INIT_GOALS);
  const [activeId, setActiveId] = useState<number>(INIT_GOALS[0].id);
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ name: '', target: '', current: '', monthly: '', rate: '' });

  const activeGoal = goals.find(g => g.id === activeId) ?? goals[0];

  const deleteGoal = (id: number) => {
    const next = goals.filter(g => g.id !== id);
    setGoals(next);
    if (id === activeId && next.length > 0) setActiveId(next[0].id);
  };

  const addGoal = () => {
    const target = parseFloat(form.target.replace(/[$,]/g, ''));
    const current = parseFloat(form.current.replace(/[$,]/g, ''));
    const monthly = parseFloat(form.monthly.replace(/[$,]/g, ''));
    const rate = parseFloat(form.rate) / 100;
    if (!form.name || isNaN(target) || isNaN(current) || isNaN(monthly) || isNaN(rate)) return;
    const newId = Math.max(0, ...goals.map(g => g.id)) + 1;
    const newGoal = { id: newId, name: form.name, target, current, monthly, rate };
    setGoals(g => [...g, newGoal]);
    setActiveId(newId);
    setForm({ name: '', target: '', current: '', monthly: '', rate: '' });
    setShowAddForm(false);
  };

  const months = activeGoal ? monthsToGoal(activeGoal.current, activeGoal.target, activeGoal.monthly, activeGoal.rate) : 0;
  const growthCurve = activeGoal ? buildGrowthCurve(activeGoal.current, activeGoal.target, activeGoal.monthly, activeGoal.rate) : [];

  const inputStyle: CSSProperties = {
    background: C.bg3,
    border: `1px solid ${C.border}`,
    borderRadius: 4,
    color: C.text,
    padding: '6px 10px',
    fontSize: 13,
    fontFamily: '"DM Sans", sans-serif',
    outline: 'none',
    width: '100%',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Section 1 — Goal Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr) 160px', gap: 16 }}>
        {goals.map(goal => (
          <GoalCard
            key={goal.id}
            goal={goal}
            active={goal.id === activeId}
            onClick={() => setActiveId(goal.id)}
            onDelete={() => deleteGoal(goal.id)}
          />
        ))}
        {/* Add Goal Button */}
        <button
          onClick={() => setShowAddForm(s => !s)}
          style={{
            background: 'transparent',
            border: `1px dashed ${C.border}`,
            borderRadius: 8,
            color: C.muted,
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            fontSize: 12,
            fontFamily: '"DM Sans", sans-serif',
            transition: 'border-color 0.2s',
            minHeight: 140,
          }}
        >
          <Plus size={20} />
          Add Goal
        </button>
      </div>

      {/* Section 2 — Add Goal Form */}
      {showAddForm && (
        <Card>
          <div style={{ color: C.amber2, fontWeight: 600, fontSize: 13, marginBottom: 16 }}>New Goal</div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <Label style={{ marginBottom: 4 }}>Goal Name</Label>
              <input style={inputStyle} placeholder="e.g. College Fund" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <Label style={{ marginBottom: 4 }}>Target ($)</Label>
              <input style={inputStyle} placeholder="e.g. 100000" value={form.target} onChange={e => setForm(f => ({ ...f, target: e.target.value }))} />
            </div>
            <div>
              <Label style={{ marginBottom: 4 }}>Current ($)</Label>
              <input style={inputStyle} placeholder="e.g. 5000" value={form.current} onChange={e => setForm(f => ({ ...f, current: e.target.value }))} />
            </div>
            <div>
              <Label style={{ marginBottom: 4 }}>Monthly ($)</Label>
              <input style={inputStyle} placeholder="e.g. 500" value={form.monthly} onChange={e => setForm(f => ({ ...f, monthly: e.target.value }))} />
            </div>
            <div>
              <Label style={{ marginBottom: 4 }}>Return Rate (%)</Label>
              <input style={inputStyle} placeholder="e.g. 5.5" value={form.rate} onChange={e => setForm(f => ({ ...f, rate: e.target.value }))} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={addGoal}
              style={{ background: C.amber, color: '#000', border: 'none', borderRadius: 5, padding: '7px 18px', fontFamily: '"DM Sans", sans-serif', fontWeight: 600, cursor: 'pointer', fontSize: 13 }}
            >
              Add Goal
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              style={{ background: C.bg3, color: C.text2, border: `1px solid ${C.border}`, borderRadius: 5, padding: '7px 18px', fontFamily: '"DM Sans", sans-serif', cursor: 'pointer', fontSize: 13 }}
            >
              Cancel
            </button>
          </div>
        </Card>
      )}

      {/* Section 3 — Active Goal Analysis */}
      {activeGoal && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {/* Left — Contribution Sensitivity Table */}
          <Card>
            <div style={{ color: C.amber2, fontWeight: 600, fontSize: 13, marginBottom: 14 }}>Contribution Sensitivity</div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: '"DM Mono", monospace', fontSize: 12 }}>
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
                  const m = monthsToGoal(activeGoal.current, activeGoal.target, amt, activeGoal.rate);
                  const yrs = m / 12;
                  const baseYrs = months / 12;
                  const delta = baseYrs - yrs; // positive means fewer years (better)
                  const isActive = amt === activeGoal.monthly;
                  return (
                    <tr key={amt} style={{ background: isActive ? C.bg3 : 'transparent' }}>
                      <td style={{ textAlign: 'right', padding: '7px 8px', color: isActive ? C.amber : C.text, borderBottom: `1px solid ${C.border}` }}>
                        {fmtFull(amt)}
                      </td>
                      <td style={{ textAlign: 'right', padding: '7px 8px', color: C.text2, borderBottom: `1px solid ${C.border}` }}>
                        {m >= 600 ? 'N/A' : yrs.toFixed(1)}
                      </td>
                      <td style={{ textAlign: 'right', padding: '7px 8px', color: C.text2, borderBottom: `1px solid ${C.border}` }}>
                        {reachYear(m)}
                      </td>
                      <td style={{
                        textAlign: 'right', padding: '7px 8px',
                        color: isActive ? C.muted : (delta > 0 ? C.green : C.red),
                        borderBottom: `1px solid ${C.border}`,
                      }}>
                        {isActive ? '—' : (delta > 0 ? '+' : '') + delta.toFixed(1) + ' yr'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </Card>

          {/* Right — Goal Progress Card */}
          <Card>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <Target size={16} color={C.amber} />
              <span style={{ color: C.amber2, fontWeight: 600, fontSize: 13 }}>{activeGoal.name}</span>
            </div>

            {/* Stat cells */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 16 }}>
              {[
                { label: 'Still Needed', value: fmtFull(Math.max(0, activeGoal.target - activeGoal.current)) },
                { label: 'Monthly Contribution', value: fmtFull(activeGoal.monthly) },
                { label: 'Estimated Years', value: months >= 600 ? 'N/A' : yearsToGoal(activeGoal.current, activeGoal.target, activeGoal.monthly, activeGoal.rate).toFixed(1) },
                { label: 'Reach Date', value: reachYear(months) },
              ].map(s => (
                <div key={s.label} style={{ background: C.bg3, borderRadius: 6, padding: '10px 12px' }}>
                  <Label style={{ marginBottom: 4 }}>{s.label}</Label>
                  <div style={{ fontFamily: '"DM Mono", monospace', fontSize: 14, color: C.text }}>{s.value}</div>
                </div>
              ))}
            </div>

            {/* Area Chart */}
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={growthCurve} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                <defs>
                  <linearGradient id="goalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={C.amber} stopOpacity={0.20} />
                    <stop offset="95%" stopColor={C.amber} stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
                <XAxis
                  dataKey="year"
                  tick={{ fill: C.muted, fontSize: 10, fontFamily: '"DM Mono", monospace' }}
                  axisLine={false} tickLine={false}
                  tickFormatter={v => `Yr ${v}`}
                />
                <YAxis
                  tick={{ fill: C.muted, fontSize: 10, fontFamily: '"DM Mono", monospace' }}
                  axisLine={false} tickLine={false}
                  tickFormatter={v => fmt(v)}
                />
                <Tooltip content={<CustomTooltip formatter={fmtFull} />} />
                <ReferenceLine
                  y={activeGoal.target}
                  stroke={C.green}
                  strokeDasharray="6 3"
                  strokeWidth={1.5}
                  label={{ value: 'Target', fill: C.green, fontSize: 10, fontFamily: '"DM Mono", monospace' }}
                />
                <Area
                  type="monotone"
                  dataKey="balance"
                  stroke={C.amber}
                  strokeWidth={2}
                  fill="url(#goalGrad)"
                  name="Balance"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
      )}
    </div>
  );
}
