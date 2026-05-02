import React from 'react';

const C = { amber2: '#fbbf24', muted: '#64748b', text2: '#94a3b8' };

interface SliderControlProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  format: (v: number) => string;
}

export default function SliderControl({ label, value, min, max, step, onChange, format }: SliderControlProps) {
  return (
    <div style={{ marginBottom: 18 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
        <span style={{ fontSize: 11, color: C.muted, textTransform: 'uppercase', letterSpacing: '1.5px', fontFamily: 'ui-monospace, monospace' }}>
          {label}
        </span>
        <span style={{ fontSize: 13, color: C.amber2, fontFamily: 'ui-monospace, monospace', fontWeight: 500 }}>
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min} max={max} step={step} value={value}
        onChange={e => onChange(parseFloat(e.target.value))}
        aria-label={label}
        aria-valuetext={format(value)}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 3 }}>
        <span style={{ fontSize: 10, color: C.text2, fontFamily: 'ui-monospace, monospace' }}>{format(min)}</span>
        <span style={{ fontSize: 10, color: C.text2, fontFamily: 'ui-monospace, monospace' }}>{format(max)}</span>
      </div>
    </div>
  );
}
