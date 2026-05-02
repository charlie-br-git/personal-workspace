import { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Card from '../components/Card';
import Mono from '../components/Mono';
import CustomTooltip from '../components/CustomTooltip';
import SliderControl from '../components/SliderControl';
import { FinancialProfile } from '../data/initialData';
import { calcFV, realReturn } from '../lib/calculations';
import { C } from '../lib/theme';
import { fmt, fmtFull } from '../lib/format';
import { useIsMobile } from '../hooks/useIsMobile';

const HORIZON_OPTIONS = [5, 10, 15, 20, 25] as const;

function getTableYears(h: number): number[] {
  if (h === 5)  return [1, 2, 3, 4, 5];
  if (h === 10) return [1, 2, 3, 5, 7, 10];
  if (h === 15) return [1, 3, 5, 7, 10, 15];
  if (h === 20) return [1, 3, 5, 10, 15, 20];
  return [1, 5, 10, 15, 20, 25];
}

function HorizonPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div style={{ display: 'flex', gap: 2, background: C.bg3, borderRadius: 5, padding: 2 }}>
      {HORIZON_OPTIONS.map(yr => (
        <button
          key={yr}
          onClick={() => onChange(yr)}
          aria-pressed={value === yr}
          style={{
            background: value === yr ? C.amber : 'transparent',
            color: value === yr ? '#000' : C.muted,
            border: 'none', borderRadius: 3,
            padding: '4px 10px', fontSize: 11,
            fontFamily: 'ui-monospace, monospace',
            cursor: 'pointer',
            fontWeight: value === yr ? 600 : 400,
            transition: 'background 0.15s',
          }}
        >
          {yr}yr
        </button>
      ))}
    </div>
  );
}

interface Props {
  profile: FinancialProfile;
}

export default function TimelineProjection({ profile }: Props) {
  const isMobile = useIsMobile();

  const totalFixed    = profile.expenses.fixed.reduce((s, e) => s + e.amount, 0);
  const totalVariable = profile.expenses.variable.reduce((s, e) => s + e.amount, 0);
  const cashFlow      = profile.income.net_monthly - totalFixed - totalVariable;
  const initSavingsRate = profile.income.net_monthly > 0
    ? Math.max(0, Math.min(50, (cashFlow / profile.income.net_monthly) * 100))
    : 10;

  const [savingsRatePct, setSavingsRatePct] = useState(Math.round(initSavingsRate));
  const [returnPct,      setReturnPct]      = useState(profile.savings.return_rate * 100);
  const [inflationPct,   setInflationPct]   = useState(profile.savings.inflation * 100);
  const [horizon,        setHorizon]        = useState(10);

  const monthlySavings = profile.income.net_monthly * (savingsRatePct / 100);
  const annualSavings  = monthlySavings * 12;
  const base           = profile.savings.current + profile.savings.emergency;

  const scenarios = [
    { label: 'Conservative', nominalReturn: returnPct / 100 - 0.025, inflation: inflationPct / 100 + 0.01,  color: C.blue,  gradId: 'gradConservative' },
    { label: 'Moderate',     nominalReturn: returnPct / 100,         inflation: inflationPct / 100,          color: C.amber, gradId: 'gradModerate'     },
    { label: 'Optimistic',   nominalReturn: returnPct / 100 + 0.025, inflation: inflationPct / 100 - 0.005, color: C.green, gradId: 'gradOptimistic'   },
  ];

  const chartData = Array.from({ length: horizon + 1 }, (_, yr) => {
    const row: Record<string, number | string> = { year: yr };
    scenarios.forEach(sc => {
      const r = realReturn(sc.nominalReturn, sc.inflation);
      row[sc.label] = Math.round(calcFV(base, annualSavings, r, yr));
    });
    return row;
  });

  const yrFinal    = (label: string) => (chartData[horizon][label] as number) ?? 0;
  const tableYears = getTableYears(horizon);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '280px 1fr', gap: 20 }}>
      {/* LEFT */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <Card>
          <div style={{ color: C.amber2, fontWeight: 600, fontSize: 13, marginBottom: 18 }}>Projection Controls</div>
          <SliderControl label="Monthly Savings Rate" value={savingsRatePct} min={0}  max={50} step={1}   onChange={setSavingsRatePct} format={v => v.toFixed(0) + '%'} />
          <SliderControl label="Expected Return"      value={returnPct}      min={3}  max={14} step={0.5} onChange={setReturnPct}      format={v => v.toFixed(1) + '%'} />
          <SliderControl label="Inflation Rate"       value={inflationPct}   min={1}  max={6}  step={0.5} onChange={setInflationPct}   format={v => v.toFixed(1) + '%'} />
          <div style={{ marginTop: 12, borderTop: `1px solid ${C.border}`, paddingTop: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 12, color: C.muted, fontFamily: 'ui-monospace, monospace' }}>Monthly Savings</span>
              <span style={{ fontSize: 12, color: C.text,  fontFamily: 'ui-monospace, monospace' }}>{fmtFull(monthlySavings)}</span>
            </div>
            {scenarios.map(sc => (
              <div key={sc.label} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                <span style={{ fontSize: 11, color: sc.color, fontFamily: 'ui-monospace, monospace' }}>{sc.label} (Yr {horizon})</span>
                <span style={{ fontSize: 11, color: sc.color, fontFamily: 'ui-monospace, monospace' }}>{fmt(yrFinal(sc.label))}</span>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
            <div style={{ color: C.amber2, fontWeight: 600, fontSize: 13 }}>
              Savings Growth Projection (Real, Inflation-Adjusted)
            </div>
            <HorizonPicker value={horizon} onChange={setHorizon} />
          </div>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14, flexWrap: 'wrap', gap: 8 }}>
            <div style={{ color: C.amber2, fontWeight: 600, fontSize: 13 }}>Year-by-Year Breakdown</div>
            <HorizonPicker value={horizon} onChange={setHorizon} />
          </div>
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
                {tableYears.map(yr => (
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
