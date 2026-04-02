import type { ReactNode, CSSProperties } from 'react';

const C = { muted: '#64748b' };

interface LabelProps {
  children: ReactNode;
  style?: CSSProperties;
}

export default function Label({ children, style }: LabelProps) {
  return (
    <div
      style={{
        fontSize: 10,
        color: C.muted,
        letterSpacing: '2px',
        textTransform: 'uppercase',
        fontFamily: 'ui-monospace, "Courier New", monospace',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
