import React, { useState, useRef } from 'react';
import { LayoutDashboard, Home, TrendingUp, Target, Download, Upload } from 'lucide-react';
import { INIT, FinancialProfile, Expense, Goal } from './data/initialData';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useIsMobile } from './hooks/useIsMobile';
import { C } from './lib/theme';
import { fmtFull } from './lib/format';
import ErrorBoundary from './components/ErrorBoundary';
import BudgetSnapshot from './modules/BudgetSnapshot';
import ScenarioComparison from './modules/ScenarioComparison';
import TimelineProjection from './modules/TimelineProjection';
import GoalTracker from './modules/GoalTracker';

const TABS = [
  { id: 'budget',   label: 'Budget Snapshot',    icon: LayoutDashboard },
  { id: 'scenario', label: 'Scenario Comparison', icon: Home },
  { id: 'timeline', label: 'Timeline Projection', icon: TrendingUp },
  { id: 'goals',    label: 'Goal Tracker',        icon: Target },
] as const;

type TabId = typeof TABS[number]['id'];

function isFinancialProfile(v: unknown): v is FinancialProfile {
  if (!v || typeof v !== 'object') return false;
  const p = v as Record<string, unknown>;
  if (typeof p.income !== 'object' || p.income === null) return false;
  const inc = p.income as Record<string, unknown>;
  if (typeof inc.gross_annual !== 'number' || typeof inc.net_monthly !== 'number') return false;
  if (typeof p.expenses !== 'object' || p.expenses === null) return false;
  const exp = p.expenses as Record<string, unknown>;
  if (!Array.isArray(exp.fixed) || !Array.isArray(exp.variable)) return false;
  if (typeof p.savings !== 'object' || p.savings === null) return false;
  if (typeof p.buy !== 'object' || p.buy === null) return false;
  if (!Array.isArray(p.goals)) return false;
  return true;
}

export default function App() {
  const [profile, setProfile] = useLocalStorage<FinancialProfile>('meridian-profile', INIT, isFinancialProfile);
  const [activeTab, setActiveTab] = useState<TabId>('budget');
  const isMobile = useIsMobile();
  const importRef = useRef<HTMLInputElement>(null);

  const updateExpense = (type: 'fixed' | 'variable', id: number, amount: number) => {
    setProfile(p => ({
      ...p,
      expenses: { ...p.expenses, [type]: p.expenses[type].map(e => e.id === id ? { ...e, amount } : e) },
    }));
  };

  const addExpense = (type: 'fixed' | 'variable', expense: Omit<Expense, 'id'>) => {
    setProfile(p => {
      const maxId = [...p.expenses.fixed, ...p.expenses.variable].reduce((m, e) => Math.max(m, e.id), 0);
      return {
        ...p,
        expenses: { ...p.expenses, [type]: [...p.expenses[type], { ...expense, id: maxId + 1 }] },
      };
    });
  };

  const removeExpense = (type: 'fixed' | 'variable', id: number) => {
    setProfile(p => ({
      ...p,
      expenses: { ...p.expenses, [type]: p.expenses[type].filter(e => e.id !== id) },
    }));
  };

  const updateIncome = (field: 'gross_annual' | 'net_monthly', value: number) => {
    setProfile(p => ({ ...p, income: { ...p.income, [field]: value } }));
  };

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    setProfile(p => {
      const maxId = p.goals.reduce((m, g) => Math.max(m, g.id), 0);
      return { ...p, goals: [...p.goals, { ...goal, id: maxId + 1 }] };
    });
  };

  const deleteGoal = (id: number) => {
    setProfile(p => ({ ...p, goals: p.goals.filter(g => g.id !== id) }));
  };

  const handleExportProfile = () => {
    const json = JSON.stringify(profile, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'meridian-profile.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = evt => {
      try {
        const parsed = JSON.parse(evt.target?.result as string) as unknown;
        if (isFinancialProfile(parsed)) {
          setProfile(parsed);
        } else {
          alert('Invalid profile file: missing required fields.');
        }
      } catch {
        alert('Failed to parse profile file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const totalFixed    = profile.expenses.fixed.reduce((s, e) => s + e.amount, 0);
  const totalVariable = profile.expenses.variable.reduce((s, e) => s + e.amount, 0);
  const totalExpenses = totalFixed + totalVariable;
  const cashFlow      = profile.income.net_monthly - totalExpenses;

  const iconBtnStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', gap: 5,
    background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 4,
    color: C.muted, cursor: 'pointer', padding: '5px 10px', fontSize: 11,
    fontFamily: 'ui-monospace, monospace',
  };

  return (
    <>
      <header style={{
        position: 'sticky', top: 0, zIndex: 10,
        background: C.bg, borderBottom: `1px solid ${C.border}`,
        padding: isMobile ? '0 16px' : '0 32px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 60, gap: 16,
      }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexShrink: 0 }}>
          <span style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontSize: 20, fontWeight: 700, color: C.amber2 }}>
            Meridian
          </span>
          {!isMobile && (
            <span style={{ fontFamily: 'ui-monospace, "Courier New", monospace', fontSize: 10, color: C.muted, letterSpacing: '2.5px', textTransform: 'uppercase' }}>
              Financial Planner
            </span>
          )}
        </div>

        {!isMobile && (
          <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            {[
              { label: 'Gross Annual',    value: fmtFull(profile.income.gross_annual), color: C.text },
              { label: 'Net Monthly',     value: fmtFull(profile.income.net_monthly),  color: C.text },
              { label: 'Total Expenses',  value: fmtFull(totalExpenses),               color: C.text },
              { label: 'Cash Flow',       value: fmtFull(cashFlow),                    color: cashFlow >= 0 ? C.green : C.red },
            ].map(stat => (
              <div key={stat.label} style={{ textAlign: 'right' }}>
                <div style={{ fontSize: 10, color: C.muted, letterSpacing: '1.5px', textTransform: 'uppercase', fontFamily: 'ui-monospace, monospace', marginBottom: 2 }}>
                  {stat.label}
                </div>
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 15, color: stat.color }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>
        )}

        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0 }}>
          <button onClick={handleExportProfile} style={iconBtnStyle} title="Export profile as JSON">
            <Download size={12} />
            {!isMobile && 'Export'}
          </button>
          <button onClick={() => importRef.current?.click()} style={iconBtnStyle} title="Import profile from JSON">
            <Upload size={12} />
            {!isMobile && 'Import'}
          </button>
          <input ref={importRef} type="file" accept=".json" onChange={handleImportProfile} style={{ display: 'none' }} />
        </div>
      </header>

      <nav style={{
        background: C.bg, borderBottom: `1px solid ${C.border}`,
        display: 'flex', padding: isMobile ? '0 8px' : '0 32px',
        overflowX: 'auto',
      }}>
        {TABS.map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 7,
                padding: isMobile ? '14px 12px' : '14px 20px',
                background: 'none', border: 'none',
                borderBottom: isActive ? `2px solid ${C.amber}` : '2px solid transparent',
                color: isActive ? C.amber2 : C.muted,
                cursor: 'pointer', fontSize: isMobile ? 11 : 13,
                fontFamily: 'system-ui, sans-serif',
                fontWeight: isActive ? 600 : 400,
                marginBottom: -1, whiteSpace: 'nowrap',
              }}
            >
              <Icon size={15} />
              {!isMobile && tab.label}
            </button>
          );
        })}
      </nav>

      <main style={{ padding: isMobile ? '16px' : '24px 32px', maxWidth: 1400, margin: '0 auto' }}>
        {activeTab === 'budget' && (
          <ErrorBoundary label="Budget Snapshot">
            <BudgetSnapshot
              profile={profile}
              onUpdateExpense={updateExpense}
              onAddExpense={addExpense}
              onRemoveExpense={removeExpense}
              onUpdateIncome={updateIncome}
            />
          </ErrorBoundary>
        )}
        {activeTab === 'scenario' && (
          <ErrorBoundary label="Scenario Comparison">
            <ScenarioComparison profile={profile} />
          </ErrorBoundary>
        )}
        {activeTab === 'timeline' && (
          <ErrorBoundary label="Timeline Projection">
            <TimelineProjection profile={profile} />
          </ErrorBoundary>
        )}
        {activeTab === 'goals' && (
          <ErrorBoundary label="Goal Tracker">
            <GoalTracker
              goals={profile.goals}
              onAddGoal={addGoal}
              onDeleteGoal={deleteGoal}
            />
          </ErrorBoundary>
        )}
      </main>
    </>
  );
}
