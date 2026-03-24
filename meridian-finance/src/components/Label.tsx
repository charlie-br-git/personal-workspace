import React from 'react';

const C = { muted: '#64748b' };

interface LabelProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function Label({ children, style }: LabelProps) {
  return (
    <div
      style={{
        fontSize: 10,
        color: C.muted,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        fontFamily: '"DM Mono", monospace',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
