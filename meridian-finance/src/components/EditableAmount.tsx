import React, { useState, useRef, useEffect } from 'react';

const C = { amber: '#f59e0b', text: '#e2e8f0', bg3: '#1a3a5c' };

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

interface EditableAmountProps {
  value: number;
  onChange: (v: number) => void;
  size?: number;
  color?: string;
}

export default function EditableAmount({ value, onChange, size = 14, color = C.text }: EditableAmountProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const commit = () => {
    const parsed = parseFloat(draft.replace(/[$,]/g, ''));
    if (!isNaN(parsed) && parsed >= 0) onChange(parsed);
    setEditing(false);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={e => { if (e.key === 'Enter') commit(); if (e.key === 'Escape') setEditing(false); }}
        style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: size,
          color: C.text,
          background: C.bg3,
          border: `1.5px solid ${C.amber}`,
          borderRadius: 4,
          padding: '2px 6px',
          width: 110,
          outline: 'none',
        }}
      />
    );
  }

  return (
    <span
      onClick={() => { setDraft(String(value)); setEditing(true); }}
      style={{
        fontFamily: 'ui-monospace, monospace',
        fontSize: size,
        color,
        cursor: 'pointer',
        borderBottom: `1px dashed ${C.amber}`,
        paddingBottom: 1,
      }}
    >
      {fmt(value)}
    </span>
  );
}
