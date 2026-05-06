export interface Expense {
  id: number;
  name: string;
  amount: number;
  category: string;
}

export interface Goal {
  id: number;
  name: string;
  target: number;
  current: number;
  monthly: number;
  rate: number;
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
  goals: Goal[];
}

export const INIT_GOALS: Goal[] = [
  { id: 1, name: '6-Month Emergency Fund',   target: 147_000, current:  50_000, monthly: 1_500, rate: 0.045 },
  { id: 2, name: 'Home Down Payment (20%)',  target: 280_000, current:  25_000, monthly: 3_000, rate: 0.055 },
  { id: 3, name: 'Retirement at Age 60',     target: 3_500_000, current: 125_000, monthly: 5_000, rate: 0.07  },
];

export const INIT: FinancialProfile = {
  income: {
    gross_annual: 410_000,
    net_monthly: 24_500,
  },
  expenses: {
    fixed: [
      { id: 1, name: 'Rent',                  amount: 2_950, category: 'Housing'   },
      { id: 2, name: 'Car Payment',            amount:   850, category: 'Transport' },
      { id: 3, name: 'Health / Life Insurance',amount:   650, category: 'Insurance' },
      { id: 4, name: 'Car Insurance',          amount:   280, category: 'Insurance' },
      { id: 5, name: 'Internet & Phone',       amount:   220, category: 'Utilities' },
      { id: 6, name: 'Subscriptions',          amount:   180, category: 'Lifestyle' },
    ],
    variable: [
      { id:  7, name: 'Groceries',      amount: 1_200, category: 'Food'      },
      { id:  8, name: 'Dining Out',     amount:   900, category: 'Food'      },
      { id:  9, name: 'Transportation', amount:   350, category: 'Transport' },
      { id: 10, name: 'Shopping',       amount:   600, category: 'Lifestyle' },
      { id: 11, name: 'Entertainment',  amount:   500, category: 'Lifestyle' },
      { id: 12, name: 'Personal Care',  amount:   300, category: 'Lifestyle' },
      { id: 13, name: 'Miscellaneous',  amount:   400, category: 'Other'     },
    ],
  },
  savings: {
    current:     125_000,
    emergency:    50_000,
    return_rate:   0.07,
    inflation:     0.025,
  },
  buy: {
    home_price:       1_400_000,
    down_pct:         0.20,
    rate:             0.0675,
    years:           30,
    tax_rate:         0.01,
    maintenance_pct:  0.01,
    hoa:            200,
    appreciation:     0.04,
  },
  goals: INIT_GOALS,
};
