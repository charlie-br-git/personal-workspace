
const C = { bg2: '#112240', border: '#1e3a5f', text: '#e2e8f0', muted: '#64748b' };

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color: string }>;
  label?: string;
  formatter?: (value: number, name: string) => string;
}

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

export default function CustomTooltip({ active, payload, label, formatter }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  return (
    <div
      style={{
        background: C.bg2,
        border: `1px solid ${C.border}`,
        borderRadius: 6,
        padding: '10px 14px',
        fontFamily: 'ui-monospace, monospace',
        fontSize: 12,
      }}
    >
      {label && <div style={{ color: C.muted, marginBottom: 6, fontSize: 11 }}>{label}</div>}
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color || C.text, marginBottom: 2 }}>
          {p.name}: {formatter ? formatter(p.value, p.name) : fmt(p.value)}
        </div>
      ))}
    </div>
  );
}
