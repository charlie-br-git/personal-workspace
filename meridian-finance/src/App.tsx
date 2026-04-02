import { useState } from 'react';
import { LayoutDashboard, Home, TrendingUp, Target, Layers } from 'lucide-react';
import { INIT, FinancialProfile, Expense } from './data/initialData';
import BudgetSnapshot from './modules/BudgetSnapshot';
import ScenarioComparison from './modules/ScenarioComparison';
import TimelineProjection from './modules/TimelineProjection';
import GoalTracker from './modules/GoalTracker';
import Projects from './modules/Projects';

const C = {
  bg: '#0a1628',
  bg2: '#112240',
  border: '#1e3a5f',
  amber: '#f59e0b',
  amber2: '#fbbf24',
  green: '#10b981',
  red: '#ef4444',
  muted: '#64748b',
  text: '#e2e8f0',
};

const TABS = [
  { id: 'budget', label: 'Budget Snapshot', icon: LayoutDashboard },
  { id: 'scenario', label: 'Scenario Comparison', icon: Home },
  { id: 'timeline', label: 'Timeline Projection', icon: TrendingUp },
  { id: 'goals', label: 'Goal Tracker', icon: Target },
  { id: 'projects', label: 'Projects', icon: Layers },
] as const;

type TabId = typeof TABS[number]['id'];

function fmt(n: number) {
  return '$' + Math.round(n).toLocaleString('en-US');
}

export default function App() {
  const [profile, setProfile] = useState<FinancialProfile>(INIT);
  const [activeTab, setActiveTab] = useState<TabId>('budget');

  const updateExpense = (type: 'fixed' | 'variable', id: number, amount: number) => {
    setProfile(p => ({
      ...p,
      expenses: {
        ...p.expenses,
        [type]: p.expenses[type].map(e => e.id === id ? { ...e, amount } : e),
      },
    }));
  };

  const addExpense = (type: 'fixed' | 'variable', expense: Omit<Expense, 'id'>) => {
    const maxId = Math.max(0, ...profile.expenses.fixed.map(e => e.id), ...profile.expenses.variable.map(e => e.id));
    setProfile(p => ({
      ...p,
      expenses: {
        ...p.expenses,
        [type]: [...p.expenses[type], { ...expense, id: maxId + 1 }],
      },
    }));
  };

  const removeExpense = (type: 'fixed' | 'variable', id: number) => {
    setProfile(p => ({
      ...p,
      expenses: {
        ...p.expenses,
        [type]: p.expenses[type].filter(e => e.id !== id),
      },
    }));
  };

  const updateIncome = (field: 'gross_annual' | 'net_monthly', value: number) => {
    setProfile(p => ({ ...p, income: { ...p.income, [field]: value } }));
  };

  const totalFixed = profile.expenses.fixed.reduce((s, e) => s + e.amount, 0);
  const totalVariable = profile.expenses.variable.reduce((s, e) => s + e.amount, 0);
  const totalExpenses = totalFixed + totalVariable;
  const cashFlow = profile.income.net_monthly - totalExpenses;

  return (
    <>
      {/* Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: C.bg,
          borderBottom: `1px solid ${C.border}`,
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 60,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 20, fontWeight: 700, color: C.amber2 }}>
            Meridian
          </span>
          <span style={{ fontFamily: 'ui-monospace, "Courier New", monospace', fontSize: 10, color: C.muted, letterSpacing: '2.5px', textTransform: 'uppercase' }}>
            Financial Planner
          </span>
        </div>

        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {[
            { label: 'Gross Annual', value: fmt(profile.income.gross_annual), color: C.text },
            { label: 'Net Monthly', value: fmt(profile.income.net_monthly), color: C.text },
            { label: 'Total Expenses', value: fmt(totalExpenses), color: C.text },
            { label: 'Cash Flow', value: fmt(cashFlow), color: cashFlow >= 0 ? C.green : C.red },
          ].map(stat => (
            <div key={stat.label} style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: C.muted, letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'ui-monospace, monospace', marginBottom: 2 }}>
                {stat.label}
              </div>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 16, color: stat.color }}>
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Tab Bar */}
      <nav
        style={{
          background: C.bg,
          borderBottom: `1px solid ${C.border}`,
          display: 'flex',
          padding: '0 32px',
        }}
      >
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 7,
                padding: '14px 20px',
                background: 'none',
                border: 'none',
                borderBottom: isActive ? `2px solid ${C.amber}` : '2px solid transparent',
                color: isActive ? C.amber2 : C.muted,
                cursor: 'pointer',
                fontSize: 13,
                fontFamily: 'system-ui, sans-serif',
                fontWeight: isActive ? 600 : 400,
                marginBottom: -1,
              }}
            >
              <Icon size={15} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      {/* Content */}
      <main style={{ padding: '24px 32px', maxWidth: 1400, margin: '0 auto' }}>
        {activeTab === 'budget' && (
          <BudgetSnapshot
            profile={profile}
            onUpdateExpense={updateExpense}
            onAddExpense={addExpense}
            onRemoveExpense={removeExpense}
            onUpdateIncome={updateIncome}
          />
        )}
        {activeTab === 'scenario' && <ScenarioComparison profile={profile} />}
        {activeTab === 'timeline' && <TimelineProjection profile={profile} />}
        {activeTab === 'goals' && <GoalTracker profile={profile} />}
        {activeTab === 'projects' && <Projects />}
      </main>
    </>
  );
}
