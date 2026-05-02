import React, { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Card from '../components/Card';
import Label from '../components/Label';
import Mono from '../components/Mono';
import CustomTooltip from '../components/CustomTooltip';
import SliderControl from '../components/SliderControl';
import { FinancialProfile } from '../data/initialData';
import { monthlyPI, loanBalance } from '../lib/calculations';

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
  if (Math.abs(n) >= 1000000) return '$' + (n / 1000000).toFixed(2) + 'M';
  if (Math.abs(n) >= 1000) return '$' + (n / 1000).toFixed(1) + 'k';
  return '$' + Math.round(n).toLocaleString();
}

function fmtFull(n: number) {
  return (n < 0 ? '-$' : '$') + Math.abs(Math.round(n)).toLocaleString();
}

const HORIZON_OPTIONS = [5, 10, 15, 20, 25] as const;

const MILESTONE_MAP: Record<number, number[]> = {
  5:  [1, 2, 3, 5],
  10: [1, 3, 5, 10],
  15: [1, 5, 10, 15],
  20: [1, 5, 10, 20],
  25: [1, 5, 15, 25],
};

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
            border: 'none',
            borderRadius: 3,
            padding: '4px 10px',
            fontSize: 11,
            fontFamily: '"DM Mono", monospace',
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

export default function ScenarioComparison({ profile }: Props) {
  const [homePrice, setHomePrice] = useState(profile.buy.home_price);
  const [downPct, setDownPct] = useState(profile.buy.down_pct * 100);
  const [mortgageRate, setMortgageRate] = useState(profile.buy.rate * 100);
  const [appreciation, setAppreciation] = useState(profile.buy.appreciation * 100);
  const [horizon, setHorizon] = useState(10);

  const rentAmount = profile.expenses.fixed.find(e => e.name === 'Rent')?.amount ?? 2950;
  const returnRate = profile.savings.return_rate;
  const loanYears = profile.buy.years;
  const taxRate = profile.buy.tax_rate;
  const maintenancePct = profile.buy.maintenance_pct;
  const hoa = profile.buy.hoa;

  const downPayment = homePrice * (downPct / 100);
  const loanAmt = homePrice - downPayment;
  const pi = monthlyPI(loanAmt, mortgageRate / 100, loanYears);
  const monthlyTax = (homePrice * taxRate) / 12;
  const monthlyMaint = (homePrice * maintenancePct) / 12;
  const totalBuyCost = pi + monthlyTax + monthlyMaint + hoa;
  const totalRentCost = rentAmount;

  const projectionData = Array.from({ length: horizon + 1 }, (_, yr) => {
    const downInvested = downPayment * Math.pow(1 + returnRate, yr);
    const costDiff = Math.max(0, totalBuyCost - rentAmount);
    const annualDiff = costDiff * 12;
    const investedDiff = annualDiff > 0
      ? annualDiff * (Math.pow(1 + returnRate, yr) - 1) / returnRate
      : 0;
    const rentInvestTotal = downInvested + investedDiff;
    const currentValue = homePrice * Math.pow(1 + appreciation / 100, yr);
    const remainingBalance = yr === 0 ? loanAmt : loanBalance(loanAmt, mortgageRate / 100, loanYears, yr * 12);
    const buyEquity = currentValue - remainingBalance;
    return {
      year: yr,
      'Rent + Invest': Math.round(rentInvestTotal),
      'Buy (Home Equity)': Math.round(buyEquity),
    };
  });

  const deltaFinal = projectionData[horizon]['Buy (Home Equity)'] - projectionData[horizon]['Rent + Invest'];
  const buyLeads = deltaFinal > 0;
  const milestones = (MILESTONE_MAP[horizon] ?? MILESTONE_MAP[10]).map(yr => ({
    yr,
    delta: projectionData[yr]['Buy (Home Equity)'] - projectionData[yr]['Rent + Invest'],
  }));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      {/* Section 1 — Option Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
        {/* Option A */}
        <Card style={{ border: `1px solid ${C.blue}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.blue }} />
            <span style={{ color: C.blue, fontWeight: 600, fontSize: 14 }}>Option A — Continue Renting</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'Monthly Rent', value: fmtFull(rentAmount) },
              { label: 'Down Payment Invested', value: fmtFull(downPayment) },
              { label: 'Annual Rent Increase', value: '3.0%' },
              { label: 'Investment Return', value: (returnRate * 100).toFixed(1) + '%' },
            ].map(s => (
              <div key={s.label} style={{ background: C.bg3, borderRadius: 6, padding: '10px 12px' }}>
                <Label style={{ marginBottom: 4 }}>{s.label}</Label>
                <div style={{ fontFamily: '"DM Mono", monospace', fontSize: 15, color: C.text }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ background: C.bg3, borderRadius: 6, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: C.muted, fontFamily: '"DM Mono", monospace', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Monthly Housing Cost</span>
            <Mono size={18} color={C.blue}>{fmtFull(totalRentCost)}</Mono>
          </div>
        </Card>

        {/* Option B */}
        <Card style={{ border: `1px solid ${C.amber}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: C.amber }} />
            <span style={{ color: C.amber2, fontWeight: 600, fontSize: 14 }}>Option B — Purchase a Home</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
            {[
              { label: 'Monthly P&I', value: fmtFull(pi) },
              { label: 'Tax + Maint + HOA', value: fmtFull(monthlyTax + monthlyMaint + hoa) },
              { label: 'Down Payment', value: fmtFull(downPayment) },
              { label: 'Home Appreciation', value: appreciation.toFixed(1) + '%' },
            ].map(s => (
              <div key={s.label} style={{ background: C.bg3, borderRadius: 6, padding: '10px 12px' }}>
                <Label style={{ marginBottom: 4 }}>{s.label}</Label>
                <div style={{ fontFamily: '"DM Mono", monospace', fontSize: 15, color: C.text }}>{s.value}</div>
              </div>
            ))}
          </div>
          <div style={{ background: C.bg3, borderRadius: 6, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 12, color: C.muted, fontFamily: '"DM Mono", monospace', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Monthly Housing Cost</span>
            <Mono size={18} color={C.amber}>{fmtFull(totalBuyCost)}</Mono>
          </div>
        </Card>
      </div>

      {/* Section 2 — Analysis */}
      <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 20 }}>
        {/* Left — Sliders */}
        <Card>
          <div style={{ color: C.amber2, fontWeight: 600, fontSize: 13, marginBottom: 18 }}>Adjust Assumptions</div>
          <SliderControl
            label="Home Price"
            value={homePrice}
            min={800000} max={3000000} step={50000}
            onChange={setHomePrice}
            format={v => '$' + (v / 1000).toFixed(0) + 'k'}
          />
          <SliderControl
            label="Down Payment"
            value={downPct}
            min={5} max={40} step={1}
            onChange={setDownPct}
            format={v => v.toFixed(0) + '%'}
          />
          <SliderControl
            label="Mortgage Rate"
            value={mortgageRate}
            min={4} max={9} step={0.25}
            onChange={setMortgageRate}
            format={v => v.toFixed(2) + '%'}
          />
          <SliderControl
            label="Home Appreciation"
            value={appreciation}
            min={1} max={8} step={0.5}
            onChange={setAppreciation}
            format={v => v.toFixed(1) + '%'}
          />

          {/* Net Worth Delta */}
          <div style={{ marginTop: 8, background: C.bg3, borderRadius: 6, padding: '12px 14px' }}>
            <Label style={{ marginBottom: 6 }}>{horizon}-Year Net Worth Delta</Label>
            <div style={{ fontFamily: '"DM Mono", monospace', fontSize: 20, color: buyLeads ? C.amber : C.blue, marginBottom: 4 }}>
              {deltaFinal >= 0 ? '+' : ''}{fmtFull(deltaFinal)}
            </div>
            <div style={{ fontSize: 11, color: C.text2, fontFamily: '"DM Sans", sans-serif', lineHeight: 1.5 }}>
              {buyLeads
                ? `Buying leads by ${fmt(Math.abs(deltaFinal))} after ${horizon} years.`
                : `Renting + investing leads by ${fmt(Math.abs(deltaFinal))} after ${horizon} years.`}
            </div>
          </div>
        </Card>

        {/* Right — Chart */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ color: C.amber2, fontWeight: 600, fontSize: 13 }}>{horizon}-Year Wealth Projection</div>
            <HorizonPicker value={horizon} onChange={setHorizon} />
          </div>
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={projectionData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis
                dataKey="year"
                tick={{ fill: C.muted, fontSize: 11, fontFamily: '"DM Mono", monospace' }}
                axisLine={false} tickLine={false}
                tickFormatter={v => `Yr ${v}`}
              />
              <YAxis
                tick={{ fill: C.muted, fontSize: 10, fontFamily: '"DM Mono", monospace' }}
                axisLine={false} tickLine={false}
                tickFormatter={v => fmt(v)}
              />
              <Tooltip content={<CustomTooltip formatter={fmtFull} />} />
              <Line dataKey="Rent + Invest" stroke={C.blue} strokeWidth={2.5} dot={false} />
              <Line dataKey="Buy (Home Equity)" stroke={C.amber} strokeWidth={2.5} dot={false} />
            </LineChart>
          </ResponsiveContainer>

          {/* Milestones */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 16 }}>
            {milestones.map(m => (
              <div key={m.yr} style={{ background: C.bg3, borderRadius: 6, padding: '10px 12px', textAlign: 'center' }}>
                <Label style={{ marginBottom: 4, textAlign: 'center' }}>Year {m.yr}</Label>
                <div style={{ fontFamily: '"DM Mono", monospace', fontSize: 13, color: m.delta > 0 ? C.amber : C.blue }}>
                  {m.delta > 0 ? '+' : ''}{fmt(m.delta)}
                </div>
                <div style={{ fontSize: 10, color: C.text2, marginTop: 2, fontFamily: '"DM Mono", monospace' }}>
                  {m.delta > 0 ? 'Buy leads' : 'Rent leads'}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
