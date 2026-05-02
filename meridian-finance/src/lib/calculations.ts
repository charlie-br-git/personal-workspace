export function monthlyPI(principal: number, annualRate: number, years: number): number {
  const r = annualRate / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function loanBalance(
  principal: number,
  annualRate: number,
  years: number,
  monthsElapsed: number,
): number {
  const r = annualRate / 12;
  const n = years * 12;
  if (r === 0) return principal * (1 - monthsElapsed / n);
  const pmt = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  return principal * Math.pow(1 + r, monthsElapsed) - (pmt * (Math.pow(1 + r, monthsElapsed) - 1)) / r;
}

export function calcFV(pv: number, pmt: number, r: number, n: number): number {
  if (Math.abs(r) < 1e-10) return pv + pmt * n;
  return pv * Math.pow(1 + r, n) + (pmt * (Math.pow(1 + r, n) - 1)) / r;
}

export function realReturn(nominal: number, inflation: number): number {
  return (1 + nominal) / (1 + inflation) - 1;
}

export function monthsToGoal(
  current: number,
  target: number,
  monthly: number,
  annualRate: number,
): number {
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
