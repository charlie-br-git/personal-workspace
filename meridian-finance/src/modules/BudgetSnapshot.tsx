import React, { useState } from 'react';
import {
  PieChart, Pie, Cell, Tooltip,
  BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend,
} from 'recharts';
import Card from '../components/Card';
import Label from '../components/Label';
import Mono from '../components/Mono';
import EditableAmount from '../components/EditableAmount';
import CustomTooltip from '../components/CustomTooltip';
import { FinancialProfile, Expense } from '../data/initialData';
import { downloadCsv } from '../lib/exportCsv';
import { C } from '../lib/theme';
import { fmtFull, fmtPct } from '../lib/format';
import { useIsMobile } from '../hooks/useIsMobile';
import { Trash2, Plus, Download } from 'lucide-react';

const PIE_COLORS = ['#f59e0b','#3b82f6','#10b981','#8b5cf6','#ef4444','#06b6d4','#f97316','#a855f7'];
const MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

function monthVariance(base: number, idx: number): number {
  const factors = [0.97, 1.05, 1.12, 0.93, 1.02, 1.00];
  return Math.round(base * factors[idx]);
}

interface Props {
  profile: FinancialProfile;
  onUpdateExpense: (type: 'fixed' | 'variable', id: number, amount: number) => void;
  onAddExpense:    (type: 'fixed' | 'variable', expense: Omit<Expense, 'id'>) => void;
  onRemoveExpense: (type: 'fixed' | 'variable', id: number) => void;
  onUpdateIncome:  (field: 'gross_annual' | 'net_monthly', value: number) => void;
}

function ExpenseCard({
  title, expenses, type, onUpdate, onAdd, onRemove,
}: {
  title: string;
  expenses: Expense[];
  type: 'fixed' | 'variable';
  onUpdate: (id: number, amount: number) => void;
  onAdd: (e: Omit<Expense, 'id'>) => void;
  onRemove: (id: number) => void;
}) {
  const [adding,      setAdding]      = useState(false);
  const [newName,     setNewName]     = useState('');
  const [newAmount,   setNewAmount]   = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [formError,   setFormError]   = useState('');
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const handleAdd = () => {
    const amt = parseFloat(newAmount.replace(/[$,]/g, ''));
    if (!newName.trim())             { setFormError('Name is required.'); return; }
    if (isNaN(amt) || amt <= 0)      { setFormError('Enter a valid amount greater than $0.'); return; }
    setFormError('');
    onAdd({ name: newName.trim(), amount: amt, category: newCategory.trim() || 'Other' });
    setNewName(''); setNewAmount(''); setNewCategory('');
    setAdding(false);
  };

  const handleCancel = () => {
    setAdding(false); setFormError('');
    setNewName(''); setNewAmount(''); setNewCategory('');
  };

  const inputStyle: React.CSSProperties = {
    background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 4,
    color: C.text, padding: '4px 8px', fontSize: 12,
    fontFamily: 'system-ui, sans-serif', outline: 'none',
  };

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ color: C.amber2, fontWeight: 600, fontSize: 13 }}>{title}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Mono size={14}>{fmtFull(total)}</Mono>
          <button
            onClick={() => { setAdding(a => !a); setFormError(''); }}
            style={{ display: 'flex', alignItems: 'center', gap: 4, background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 4, color: C.amber, cursor: 'pointer', padding: '3px 8px', fontSize: 11, fontFamily: 'ui-monospace, monospace' }}
          >
            <Plus size={11} /> Add
          </button>
        </div>
      </div>

      {adding && (
        <div style={{ marginBottom: 12 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 80px auto auto', gap: 6, alignItems: 'center' }}>
            <input placeholder="Name *" value={newName} onChange={e => { setNewName(e.target.value); setFormError(''); }} onKeyDown={e => e.key === 'Enter' && handleAdd()}
              style={{ ...inputStyle, borderColor: formError && !newName.trim() ? C.red : C.border }} />
            <input placeholder="$Amount *" value={newAmount} onChange={e => { setNewAmount(e.target.value); setFormError(''); }} onKeyDown={e => e.key === 'Enter' && handleAdd()}
              style={{ ...inputStyle, borderColor: formError && !newAmount.trim() ? C.red : C.border }} />
            <input placeholder="Category" value={newCategory} onChange={e => setNewCategory(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdd()} style={inputStyle} />
            <button onClick={handleAdd}   style={{ ...inputStyle, background: C.amber, color: '#000', cursor: 'pointer', fontWeight: 600, whiteSpace: 'nowrap' }}>Add</button>
            <button onClick={handleCancel} style={{ ...inputStyle, cursor: 'pointer', color: C.muted }}>✕</button>
          </div>
          {formError && (
            <div style={{ marginTop: 5, fontSize: 11, color: C.red, fontFamily: 'ui-monospace, monospace' }}>{formError}</div>
          )}
        </div>
      )}

      {expenses.map((e, i) => (
        <div key={e.id}>
          {i > 0 && <div style={{ height: 1, background: C.border, margin: '6px 0' }} />}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
            <div>
              <div style={{ fontSize: 13, color: C.text }}>{e.name}</div>
              <div style={{ fontSize: 10, color: C.muted, fontFamily: 'ui-monospace, monospace', letterSpacing: '1px', textTransform: 'uppercase' }}>{e.category}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <EditableAmount value={e.amount} onChange={v => onUpdate(e.id, v)} />
              <button onClick={() => onRemove(e.id)} aria-label={`Remove ${e.name}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: 2, display: 'flex' }}>
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        </div>
      ))}

      {expenses.length === 0 && (
        <div style={{ fontSize: 12, color: C.muted, textAlign: 'center', padding: '12px 0', fontFamily: 'ui-monospace, monospace' }}>
          No {type} expenses. Click Add to create one.
        </div>
      )}
    </Card>
  );
}

export default function BudgetSnapshot({ profile, onUpdateExpense, onAddExpense, onRemoveExpense, onUpdateIncome }: Props) {
  const isMobile = useIsMobile();

  const totalFixed    = profile.expenses.fixed.reduce((s, e) => s + e.amount, 0);
  const totalVariable = profile.expenses.variable.reduce((s, e) => s + e.amount, 0);
  const totalExpenses = totalFixed + totalVariable;
  const cashFlow      = profile.income.net_monthly - totalExpenses;
  const savingsRate   = profile.income.net_monthly > 0 ? cashFlow / profile.income.net_monthly : 0;

  const categoryMap: Record<string, number> = {};
  [...profile.expenses.fixed, ...profile.expenses.variable].forEach(e => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
  });
  const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

  const barData = MONTHS.map((month, i) => ({
    month,
    Fixed:    monthVariance(totalFixed,    i),
    Variable: monthVariance(totalVariable, i),
  }));

  const handleExport = () => {
    const rows: (string | number)[][] = [
      ['Meridian Budget Export'],
      [],
      ['Income'],
      ['Gross Annual', profile.income.gross_annual],
      ['Net Monthly',  profile.income.net_monthly],
      [],
      ['Fixed Expenses', 'Amount', 'Category'],
      ...profile.expenses.fixed.map(e => [e.name, e.amount, e.category]),
      ['Total Fixed', totalFixed, ''],
      [],
      ['Variable Expenses', 'Amount', 'Category'],
      ...profile.expenses.variable.map(e => [e.name, e.amount, e.category]),
      ['Total Variable', totalVariable, ''],
      [],
      ['Summary'],
      ['Total Expenses', totalExpenses],
      ['Cash Flow',      cashFlow],
      ['Savings Rate',   fmtPct(savingsRate)],
    ];
    downloadCsv('meridian-budget.csv', rows);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 20 }}>
      {/* LEFT COLUMN */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Stat Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          <Card style={{ padding: '14px 16px' }}>
            <Label style={{ marginBottom: 6 }}>Gross Annual</Label>
            <EditableAmount value={profile.income.gross_annual} onChange={v => onUpdateIncome('gross_annual', v)} size={18} />
          </Card>
          <Card style={{ padding: '14px 16px' }}>
            <Label style={{ marginBottom: 6 }}>Net Monthly</Label>
            <EditableAmount value={profile.income.net_monthly} onChange={v => onUpdateIncome('net_monthly', v)} size={18} />
          </Card>
          <Card style={{ padding: '14px 16px' }}>
            <Label style={{ marginBottom: 6 }}>Cash Flow</Label>
            <Mono size={18} color={cashFlow >= 0 ? C.green : C.red}>{fmtFull(cashFlow)}</Mono>
          </Card>
        </div>

        <ExpenseCard title="Fixed Expenses"    expenses={profile.expenses.fixed}    type="fixed"
          onUpdate={(id, amt) => onUpdateExpense('fixed',    id, amt)}
          onAdd={e => onAddExpense('fixed',    e)}
          onRemove={id => onRemoveExpense('fixed',    id)} />

        <ExpenseCard title="Variable Expenses" expenses={profile.expenses.variable} type="variable"
          onUpdate={(id, amt) => onUpdateExpense('variable', id, amt)}
          onAdd={e => onAddExpense('variable', e)}
          onRemove={id => onRemoveExpense('variable', id)} />
      </div>

      {/* RIGHT COLUMN */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Card style={{ padding: '14px 16px' }}>
            <Label style={{ marginBottom: 6 }}>Monthly Expenses</Label>
            <Mono size={18}>{fmtFull(totalExpenses)}</Mono>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 4, fontFamily: 'ui-monospace, monospace' }}>
              {fmtPct(totalExpenses / profile.income.net_monthly)} of net income
            </div>
          </Card>
          <Card style={{ padding: '14px 16px', borderColor: savingsRate >= 0.20 ? C.green : C.amber }}>
            <Label style={{ marginBottom: 6 }}>Savings Rate</Label>
            <Mono size={18} color={savingsRate >= 0.20 ? C.green : C.amber}>{fmtPct(savingsRate)}</Mono>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 4, fontFamily: 'ui-monospace, monospace' }}>
              of net monthly income
            </div>
          </Card>
        </div>

        {/* Spending by Category */}
        <Card>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
            <div style={{ color: C.amber2, fontWeight: 600, fontSize: 13 }}>Spending by Category</div>
            <button onClick={handleExport}
              style={{ display: 'flex', alignItems: 'center', gap: 5, background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 4, color: C.muted, cursor: 'pointer', padding: '4px 10px', fontSize: 11, fontFamily: 'ui-monospace, monospace' }}>
              <Download size={11} /> Export CSV
            </button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <ResponsiveContainer width={190} height={190}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} dataKey="value" paddingAngle={2}>
                  {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1, minWidth: 120 }}>
              {pieData.map((d, i) => (
                <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: PIE_COLORS[i % PIE_COLORS.length] }} />
                    <span style={{ fontSize: 12, color: C.text2 }}>{d.name}</span>
                  </div>
                  <span style={{ fontSize: 12, color: C.text, fontFamily: 'ui-monospace, monospace' }}>{fmtFull(d.value)}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* 6-Month Spending Trend */}
        <Card>
          <div style={{ color: C.amber2, fontWeight: 600, fontSize: 13, marginBottom: 14 }}>6-Month Spending Trend</div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData} barCategoryGap="25%" barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 11, fontFamily: 'ui-monospace, monospace' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.muted, fontSize: 10, fontFamily: 'ui-monospace, monospace' }} axisLine={false} tickLine={false} tickFormatter={v => '$' + (v / 1000).toFixed(0) + 'k'} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 11, fontFamily: 'ui-monospace, monospace', color: C.muted }} iconType="square" iconSize={8} />
              <Bar dataKey="Fixed"    fill={C.blue}  radius={[3, 3, 0, 0]} />
              <Bar dataKey="Variable" fill={C.amber} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
