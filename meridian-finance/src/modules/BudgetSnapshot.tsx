import { useState, type CSSProperties } from 'react';
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
import { Trash2, Plus } from 'lucide-react';

const C = {
  bg: '#0a1628',
  bg2: '#112240',
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

const PIE_COLORS = ['#f59e0b','#3b82f6','#10b981','#8b5cf6','#ef4444','#06b6d4','#f97316','#a855f7'];

const MONTHS = ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar'];

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

function pct(n: number) {
  return (n * 100).toFixed(1) + '%';
}

// Deterministic variance seed based on month index
function monthVariance(base: number, idx: number): number {
  const factors = [0.97, 1.05, 1.12, 0.93, 1.02, 1.00];
  return Math.round(base * factors[idx]);
}

interface Props {
  profile: FinancialProfile;
  onUpdateExpense: (type: 'fixed' | 'variable', id: number, amount: number) => void;
  onAddExpense: (type: 'fixed' | 'variable', expense: Omit<Expense, 'id'>) => void;
  onRemoveExpense: (type: 'fixed' | 'variable', id: number) => void;
  onUpdateIncome: (field: 'gross_annual' | 'net_monthly', value: number) => void;
}

function ExpenseCard({
  title,
  expenses,
  onUpdate,
  onAdd,
  onRemove,
}: {
  title: string;
  expenses: Expense[];
  type: 'fixed' | 'variable';
  onUpdate: (id: number, amount: number) => void;
  onAdd: (e: Omit<Expense, 'id'>) => void;
  onRemove: (id: number) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const total = expenses.reduce((s, e) => s + e.amount, 0);

  const handleAdd = () => {
    const amt = parseFloat(newAmount.replace(/[$,]/g, ''));
    if (!newName.trim() || isNaN(amt)) return;
    onAdd({ name: newName.trim(), amount: amt, category: newCategory.trim() || 'Other' });
    setNewName(''); setNewAmount(''); setNewCategory('');
    setAdding(false);
  };

  const inputStyle: CSSProperties = {
    background: C.bg3,
    border: `1px solid ${C.border}`,
    borderRadius: 4,
    color: C.text,
    padding: '4px 8px',
    fontSize: 12,
    fontFamily: '"DM Sans", sans-serif',
    outline: 'none',
  };

  return (
    <Card>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
        <span style={{ color: C.amber2, fontWeight: 600, fontSize: 13 }}>{title}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Mono size={14}>{fmt(total)}</Mono>
          <button
            onClick={() => setAdding(a => !a)}
            style={{
              display: 'flex', alignItems: 'center', gap: 4,
              background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 4,
              color: C.amber, cursor: 'pointer', padding: '3px 8px', fontSize: 11,
              fontFamily: '"DM Mono", monospace',
            }}
          >
            <Plus size={11} /> Add
          </button>
        </div>
      </div>

      {adding && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 90px 80px auto', gap: 6, marginBottom: 12, alignItems: 'center' }}>
          <input placeholder="Name" value={newName} onChange={e => setNewName(e.target.value)} style={inputStyle} />
          <input placeholder="$Amount" value={newAmount} onChange={e => setNewAmount(e.target.value)} style={inputStyle} />
          <input placeholder="Category" value={newCategory} onChange={e => setNewCategory(e.target.value)} style={inputStyle} />
          <button onClick={handleAdd} style={{ ...inputStyle, background: C.amber, color: '#000', cursor: 'pointer', fontWeight: 600 }}>Add</button>
        </div>
      )}

      {expenses.map((e, i) => (
        <div key={e.id}>
          {i > 0 && <div style={{ height: 1, background: C.border, margin: '6px 0' }} />}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '4px 0' }}>
            <div>
              <div style={{ fontSize: 13, color: C.text }}>{e.name}</div>
              <div style={{ fontSize: 10, color: C.muted, fontFamily: '"DM Mono", monospace', letterSpacing: '1px', textTransform: 'uppercase' }}>{e.category}</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <EditableAmount value={e.amount} onChange={v => onUpdate(e.id, v)} />
              <button
                onClick={() => onRemove(e.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.muted, padding: 2, display: 'flex' }}
              >
                <Trash2 size={13} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </Card>
  );
}

export default function BudgetSnapshot({ profile, onUpdateExpense, onAddExpense, onRemoveExpense }: Props) {
  const totalFixed = profile.expenses.fixed.reduce((s, e) => s + e.amount, 0);
  const totalVariable = profile.expenses.variable.reduce((s, e) => s + e.amount, 0);
  const totalExpenses = totalFixed + totalVariable;
  const cashFlow = profile.income.net_monthly - totalExpenses;
  const savingsRate = profile.income.net_monthly > 0 ? cashFlow / profile.income.net_monthly : 0;

  // Category aggregation for pie chart
  const categoryMap: Record<string, number> = {};
  [...profile.expenses.fixed, ...profile.expenses.variable].forEach(e => {
    categoryMap[e.category] = (categoryMap[e.category] || 0) + e.amount;
  });
  const pieData = Object.entries(categoryMap).map(([name, value]) => ({ name, value }));

  // 6-month bar chart data
  const barData = MONTHS.map((month, i) => ({
    month,
    Fixed: monthVariance(totalFixed, i),
    Variable: monthVariance(totalVariable, i),
  }));

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
      {/* LEFT COLUMN */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Stat Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { label: 'Gross Annual', value: fmt(profile.income.gross_annual), color: C.text },
            { label: 'Net Monthly', value: fmt(profile.income.net_monthly), color: C.text },
            { label: 'Cash Flow', value: fmt(cashFlow), color: cashFlow >= 0 ? C.green : C.red },
          ].map(s => (
            <Card key={s.label} style={{ padding: '14px 16px' }}>
              <Label style={{ marginBottom: 6 }}>{s.label}</Label>
              <Mono size={18} color={s.color}>{s.value}</Mono>
            </Card>
          ))}
        </div>

        {/* Fixed Expenses */}
        <ExpenseCard
          title="Fixed Expenses"
          expenses={profile.expenses.fixed}
          type="fixed"
          onUpdate={(id, amt) => onUpdateExpense('fixed', id, amt)}
          onAdd={e => onAddExpense('fixed', e)}
          onRemove={id => onRemoveExpense('fixed', id)}
        />

        {/* Variable Expenses */}
        <ExpenseCard
          title="Variable Expenses"
          expenses={profile.expenses.variable}
          type="variable"
          onUpdate={(id, amt) => onUpdateExpense('variable', id, amt)}
          onAdd={e => onAddExpense('variable', e)}
          onRemove={id => onRemoveExpense('variable', id)}
        />
      </div>

      {/* RIGHT COLUMN */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {/* Monthly Expenses + Savings Rate */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <Card style={{ padding: '14px 16px' }}>
            <Label style={{ marginBottom: 6 }}>Monthly Expenses</Label>
            <Mono size={18}>{fmt(totalExpenses)}</Mono>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 4, fontFamily: '"DM Mono", monospace' }}>
              {pct(totalExpenses / profile.income.net_monthly)} of net income
            </div>
          </Card>
          <Card
            style={{
              padding: '14px 16px',
              borderColor: savingsRate >= 0.20 ? C.green : C.amber,
            }}
          >
            <Label style={{ marginBottom: 6 }}>Savings Rate</Label>
            <Mono size={18} color={savingsRate >= 0.20 ? C.green : C.amber}>{pct(savingsRate)}</Mono>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 4, fontFamily: '"DM Mono", monospace' }}>
              of net monthly income
            </div>
          </Card>
        </div>

        {/* Spending by Category */}
        <Card>
          <div style={{ color: C.amber2, fontWeight: 600, fontSize: 13, marginBottom: 14 }}>Spending by Category</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <ResponsiveContainer width={190} height={190}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%" cy="50%"
                  innerRadius={55}
                  outerRadius={85}
                  dataKey="value"
                  paddingAngle={2}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div style={{ flex: 1 }}>
              {pieData.map((d, i) => (
                <div key={d.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: PIE_COLORS[i % PIE_COLORS.length] }} />
                    <span style={{ fontSize: 12, color: C.text2 }}>{d.name}</span>
                  </div>
                  <span style={{ fontSize: 12, color: C.text, fontFamily: '"DM Mono", monospace' }}>{fmt(d.value)}</span>
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
              <XAxis dataKey="month" tick={{ fill: C.muted, fontSize: 11, fontFamily: '"DM Mono", monospace' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: C.muted, fontSize: 10, fontFamily: '"DM Mono", monospace' }} axisLine={false} tickLine={false} tickFormatter={v => '$' + (v / 1000).toFixed(0) + 'k'} />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ fontSize: 11, fontFamily: '"DM Mono", monospace', color: C.muted }}
                iconType="square"
                iconSize={8}
              />
              <Bar dataKey="Fixed" fill={C.blue} radius={[3, 3, 0, 0]} />
              <Bar dataKey="Variable" fill={C.amber} radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
}
