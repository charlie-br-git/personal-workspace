import type { ReactNode, CSSProperties } from 'react';

const C = { text: '#e2e8f0' };

interface MonoProps {
  children: ReactNode;
  size?: number;
  color?: string;
  style?: CSSProperties;
}

export default function Mono({ children, size = 16, color = C.text, style }: MonoProps) {
  return (
    <div
      style={{
        fontFamily: 'ui-monospace, "Courier New", monospace',
        fontSize: size,
        color,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
