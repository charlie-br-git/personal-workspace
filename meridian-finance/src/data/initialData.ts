export interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
}

export interface SavingsConfig {
  current: number;
  emergency: number;
  return_rate: number;
  inflation: number;
}

export interface BuyScenario {
  home_price: number;
  down_pct: number;
  rate: number;
  years: number;
  tax_rate: number;
  maintenance_pct: number;
  hoa: number;
  appreciation: number;
}

export interface FinancialProfile {
  income: { gross_annual: number; net_monthly: number };
  expenses: { fixed: Expense[]; variable: Expense[] };
  savings: SavingsConfig;
  buy: BuyScenario;
}

// Illustrative sample data for demonstration only; not real financial information.
export const INIT: FinancialProfile = {
  income: {
    gross_annual: 180000,
    net_monthly: 11000,
  },
  expenses: {
    fixed: [
      { id: 1, name: 'Rent', amount: 2800, category: 'Housing' },
      { id: 2, name: 'Car Payment', amount: 500, category: 'Transport' },
      { id: 3, name: 'Health / Life Insurance', amount: 400, category: 'Insurance' },
      { id: 4, name: 'Car Insurance', amount: 150, category: 'Insurance' },
      { id: 5, name: 'Internet & Phone', amount: 150, category: 'Utilities' },
      { id: 6, name: 'Subscriptions', amount: 100, category: 'Lifestyle' },
    ],
    variable: [
      { id: 7, name: 'Groceries', amount: 700, category: 'Food' },
      { id: 8, name: 'Dining Out', amount: 500, category: 'Food' },
      { id: 9, name: 'Transportation', amount: 250, category: 'Transport' },
      { id: 10, name: 'Shopping', amount: 400, category: 'Lifestyle' },
      { id: 11, name: 'Entertainment', amount: 300, category: 'Lifestyle' },
      { id: 12, name: 'Personal Care', amount: 200, category: 'Lifestyle' },
      { id: 13, name: 'Miscellaneous', amount: 250, category: 'Other' },
    ],
  },
  savings: {
    current: 60000,
    emergency: 25000,
    return_rate: 0.07,
    inflation: 0.025,
  },
  buy: {
    home_price: 750000,
    down_pct: 0.20,
    rate: 0.0675,
    years: 30,
    tax_rate: 0.01,
    maintenance_pct: 0.01,
    hoa: 200,
    appreciation: 0.04,
  },
};
