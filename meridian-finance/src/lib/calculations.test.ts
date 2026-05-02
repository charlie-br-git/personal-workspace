import { describe, it, expect } from 'vitest';
import { monthlyPI, loanBalance, calcFV, realReturn, monthsToGoal } from './calculations';

describe('monthlyPI', () => {
  it('calculates standard P&I payment', () => {
    // $400k loan at 6.75% for 30 years
    const payment = monthlyPI(400_000, 0.0675, 30);
    expect(payment).toBeCloseTo(2594.23, 0);
  });

  it('handles zero interest rate', () => {
    expect(monthlyPI(120_000, 0, 10)).toBeCloseTo(1000, 2);
  });

  it('scales linearly with principal', () => {
    const p1 = monthlyPI(200_000, 0.06, 30);
    const p2 = monthlyPI(400_000, 0.06, 30);
    expect(p2).toBeCloseTo(p1 * 2, 2);
  });
});

describe('loanBalance', () => {
  it('returns full principal at month 0', () => {
    expect(loanBalance(400_000, 0.0675, 30, 0)).toBeCloseTo(400_000, 0);
  });

  it('decreases monotonically over time', () => {
    const b60 = loanBalance(400_000, 0.0675, 30, 60);
    const b120 = loanBalance(400_000, 0.0675, 30, 120);
    const b240 = loanBalance(400_000, 0.0675, 30, 240);
    expect(b60).toBeGreaterThan(b120);
    expect(b120).toBeGreaterThan(b240);
  });

  it('approaches zero near end of loan', () => {
    const b = loanBalance(400_000, 0.0675, 30, 359);
    expect(b).toBeLessThan(3000);
    expect(b).toBeGreaterThan(0);
  });

  it('handles zero rate', () => {
    expect(loanBalance(120_000, 0, 10, 60)).toBeCloseTo(60_000, 0);
  });
});

describe('calcFV', () => {
  it('returns pv when zero rate and no contributions', () => {
    expect(calcFV(100_000, 0, 0, 10)).toBeCloseTo(100_000, 2);
  });

  it('compounds at 7% for 10 years with no contributions', () => {
    expect(calcFV(100_000, 0, 0.07, 10)).toBeCloseTo(196_715, 0);
  });

  it('adds annual contributions correctly for n=1', () => {
    // pv=0, pmt=12000, r=0.07, n=1 → 12000 * (1.07-1)/0.07 = 12000
    expect(calcFV(0, 12_000, 0.07, 1)).toBeCloseTo(12_000, 0);
  });

  it('handles near-zero rate without division error', () => {
    expect(() => calcFV(50_000, 1_000, 1e-12, 5)).not.toThrow();
  });

  it('grows larger with higher contributions', () => {
    const low = calcFV(0, 6_000, 0.07, 10);
    const high = calcFV(0, 12_000, 0.07, 10);
    expect(high).toBeCloseTo(low * 2, 0);
  });
});

describe('realReturn', () => {
  it('computes Fisher equation correctly', () => {
    // (1.07 / 1.025) - 1 ≈ 0.04390
    expect(realReturn(0.07, 0.025)).toBeCloseTo(0.0439, 4);
  });

  it('returns zero when nominal equals inflation', () => {
    expect(realReturn(0.03, 0.03)).toBeCloseTo(0, 6);
  });

  it('returns negative when inflation exceeds nominal', () => {
    expect(realReturn(0.02, 0.05)).toBeLessThan(0);
  });
});

describe('monthsToGoal', () => {
  it('returns 0 when already at goal', () => {
    expect(monthsToGoal(50_000, 50_000, 1_000, 0.05)).toBe(0);
  });

  it('returns 0 when current exceeds target', () => {
    expect(monthsToGoal(60_000, 50_000, 1_000, 0.05)).toBe(0);
  });

  it('handles simple 1-month case', () => {
    // $0 → $1000 target, $1000/month, 0% → 1 month
    expect(monthsToGoal(0, 1_000, 1_000, 0)).toBe(1);
  });

  it('returns 600 when goal is unreachable', () => {
    expect(monthsToGoal(0, 1_000_000, 0, 0)).toBe(600);
  });

  it('fewer months with higher return rate', () => {
    const m1 = monthsToGoal(10_000, 50_000, 500, 0.04);
    const m2 = monthsToGoal(10_000, 50_000, 500, 0.08);
    expect(m2).toBeLessThan(m1);
  });

  it('fewer months with higher contribution', () => {
    const m1 = monthsToGoal(0, 100_000, 1_000, 0.05);
    const m2 = monthsToGoal(0, 100_000, 2_000, 0.05);
    expect(m2).toBeLessThan(m1);
  });
});
