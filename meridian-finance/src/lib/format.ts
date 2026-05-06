/** Compact: $1.23M / $456.7k / $1,234 — handles negatives */
export function fmt(n: number): string {
  const abs = Math.abs(n);
  const sign = n < 0 ? '-' : '';
  if (abs >= 1_000_000) return sign + '$' + (abs / 1_000_000).toFixed(2) + 'M';
  if (abs >= 1_000)     return sign + '$' + (abs / 1_000).toFixed(1) + 'k';
  return (n < 0 ? '-$' : '$') + Math.abs(Math.round(n)).toLocaleString('en-US');
}

/** Full dollar with sign: -$1,234,567 or $1,234,567 */
export function fmtFull(n: number): string {
  return (n < 0 ? '-$' : '$') + Math.abs(Math.round(n)).toLocaleString('en-US');
}

/** Decimal to percent: 0.153 → "15.3%" */
export function fmtPct(n: number): string {
  return (n * 100).toFixed(1) + '%';
}
