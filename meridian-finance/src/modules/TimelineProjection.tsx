import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Card from '../components/Card';
import Label from '../components/Label';
import Mono from '../components/Mono';
import CustomTooltip from '../components/CustomTooltip';
import SliderControl from '../components/SliderControl';
import { FinancialProfile } from '../data/initialData';
import { calcFV, realReturn } from '../lib/calculations';

const C = {
  bg3: '#1a3a5c',
  border: '#1e3a5f',
  amber: '#f59e0b',
  amber2: '#fbbf24',
  green: '#10b981',
  blue: '#3b82f6',
  muted: '#64748b',
  text: '#e2e8f0',
  text2: '#94a3b8',
};

function fmt(n: number) {
  if (n >= 1000000) return '$' + (n / 1000000).toFixed(2) + 'M';
  if (n >= 1000) return '$' + (n / 1000).toFixed(1) + 'k';
  return '$' + Math.round(n).toLocaleString();
}

function fmtFull(n: number) {
  return '$' + Math.round(n).toLocaleString();
}

const TABLE_YEARS = [1, 2, 3, 5, 7, 10];

interface Props {
  profile: FinancialProfile;
}

export default function TimelineProjection({ profile }: Props) {
  const totalFixed = profile.expenses.fixed.reduce((s, e) => s + e.amount, 0);
  const totalVariable = profile.expenses.variable.reduce((s, e) => s + e.amount, 0);
  const cashFlow = profile.income.net_monthly - totalFixed - totalVariable;
  const initSavingsRate = profile.income.net_monthly > 0
    ? Math.max(0, Math.min(50, (cashFlow / profile.income.net_monthly) * 100))
    : 10;

  const [savingsRatePct, setSavingsRatePct] = useState(Math.round(initSavingsRate));
  const [returnPct, setReturnPct] = useState(profile.savings.return_rate * 100);
  const [inflationPct, setInflationPct] = useState(profile.savings.inflation * 100);

  const monthlySavings = profile.income.net_monthly * (savingsRatePct / 100);
  const annualSavings = monthlySavings * 12;
  const base = profile.savings.current + profile.savings.emergency;

  const scenarios = [
    { label: 'Conservative', nominalReturn: returnPct / 100 - 0.025, inflation: inflationPct / 100 + 0.01, color: C.blue, gradId: 'gradConservative' },
    { label: 'Moderate',     nominalReturn: returnPct / 100,         inflation: inflationPct / 100,        color: C.amber, gradId: 'gradModerate' },
    { label: 'Optimistic',   nominalReturn: returnPct / 100 + 0.025, inflation: inflationPct / 100 - 0.005, color: C.green, gradId: 'gradOptimistic' },
  ];

  const chartData = Array.from({ length: 11 }, (_, yr) => {
    const row: Record<string, number | string> = { year: yr };
    scenarios.forEach(sc => {
      const r = realReturn(sc.nominalReturn, sc.inflation);
      row[sc.label] = Math.round(calcFV(base, annualSavings, r, yr));
    });
    return row;
  });

  const yr10 = (label: string) => (chartData[10][label] as number) ?? 0;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
      {/* LEFT */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Card>
          <div style={{ color: C.amber2, fontWeight: 600, fontSize: 13, marginBottom: 18 }}>Projection Controls</div>
          <SliderControl label="Monthly Savings Rate" value={savingsRatePct} min={0} max={50} step={1} onChange={setSavingsRatePct} format={v => v.toFixed(0) + '%'} />
          <SliderControl label="Expected Return"      value={returnPct}      min={3} max={14} step={0.5} onChange={setReturnPct}      format={v => v.toFixed(1) + '%'} />
          <SliderControl label="Inflation Rate"       value={inflationPct}   min={1} max={6}  step={0.5} onChange={setInflationPct}   format={v => v.toFixed(1) + '%'} />
          <div style={{ marginTop: 12, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: C.muted, fontFamily: 'ui-monospace, monospace' }}>Monthly Savings</span>
              <span style={{ fontSize: 12, color: C.text, fontFamily: 'ui-monospace, monospace' }}>{fmtFull(monthlySavings)}</span>
            </div>
            {scenarios.map(sc => (
              <div key={sc.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 11, color: sc.color, fontFamily: 'ui-monospace, monospace' }}>{sc.label} (Yr 10)</span>
                <span style={{ fontSize: 11, color: sc.color, fontFamily: 'ui-monospace, monospace' }}>{fmt(yr10(sc.label))}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div style={{ color: C.amber2, fontWeight: 600, fontSize: 13, marginBottom: 14 }}>Starting Position</div>
          {[
            { label: 'Current Savings', value: profile.savings.current },
            { label: 'Emergency Fund',  value: profile.savings.emergency },
            { label: 'Total Base',      value: base },
          ].map((row, i) => (
            <div key={row.label}>
              {i > 0 && <div style={{ height: 1, background: C.border, margin: '8px 0' }} />}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '2px 0' }}>
                <span style={{ fontSize: 12, color: C.text2 }}>{row.label}</span>
                <Mono size={13} color={i === 2 ? C.amber2 : C.text}>{fmtFull(row.value)}</Mono>
              </div>
            </div>
          ))}
        </Card>
      </div>

      {/* RIGHT */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Card>
          <div style={{ color: C.amber2, fontWeight: 600, fontSize: 13, marginBottom: 14 }}>Savings Growth Projection (Real, Inflation-Adjusted)</div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 5 }}>
              <defs>
                {scenarios.map(sc => (
                  <linearGradient key={sc.gradId} id={sc.gradId} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%"  stopColor={sc.color} stopOpacity={0.20} />
                    <stop offset="95%" stopColor={sc.color} stopOpacity={0.02} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="year" tick={{ fill: C.muted, fontSize: 11, fontFamily: 'ui-monospace, monospace' }} axisLine={false} tickLine={false} tickFormatter={v => `Yr ${v}`} />
              <YAxis tick={{ fill: C.muted, fontSize: 10, fontFamily: 'ui-monospace, monospace' }} axisLine={false} tickLine={false} tickFormatter={v => fmt(v)} />
              <Tooltip content={<CustomTooltip formatter={fmtFull} />} />
              {scenarios.map(sc => (
                <Area key={sc.label} type="monotone" dataKey={sc.label} stroke={sc.color} strokeWidth={2} fill={`url(#${sc.gradId})`} />
              ))}
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <div style={{ color: C.amber2, fontWeight: 600, fontSize: 13, marginBottom: 14 }}>Year-by-Year Breakdown</div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'ui-monospace, monospace', fontSize: 12 }}>
              <thead>
                <tr>
                  {['Year', 'Annual Savings', ...scenarios.map(s => s.label)].map(h => (
                    <th key={h} style={{ textAlign: h === 'Year' ? 'center' : 'right', padding: '6px 10px', color: C.muted, fontSize: 10, textTransform: 'uppercase', letterSpacing: '1.5px', borderBottom: `1px solid ${C.border}` }}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TABLE_YEARS.map(yr => (
                  <tr key={yr}>
                    <td style={{ textAlign: 'center', padding: '8px 10px', color: C.text2, borderBottom: `1px solid ${C.border}` }}>{yr}</td>
                    <td style={{ textAlign: 'right',  padding: '8px 10px', color: C.text2, borderBottom: `1px solid ${C.border}` }}>{fmtFull(annualSavings)}</td>
                    {scenarios.map(sc => (
                      <td key={sc.label} style={{ textAlign: 'right', padding: '8px 10px', color: sc.color, borderBottom: `1px solid ${C.border}` }}>
                        {fmt(chartData[yr][sc.label] as number)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
