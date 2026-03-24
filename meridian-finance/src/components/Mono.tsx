import React from 'react';

const C = { text: '#e2e8f0' };

interface MonoProps {
  children: React.ReactNode;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}

export default function Mono({ children, size = 16, color = C.text, style }: MonoProps) {
  return (
    <div
      style={{
        fontFamily: '"DM Mono", monospace',
        fontSize: size,
        color,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
