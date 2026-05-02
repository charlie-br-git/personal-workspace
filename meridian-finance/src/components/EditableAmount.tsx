import React, { useState, useRef, useEffect } from 'react';
import { C } from '../lib/theme';

function fmt(n: number) {
  return '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function parseDraft(s: string): number {
  return parseFloat(s.replace(/[$,\s]/g, ''));
}

interface EditableAmountProps {
  value: number;
  onChange: (v: number) => void;
  size?: number;
  color?: string;
}

export default function EditableAmount({ value, onChange, size = 14, color = C.text }: EditableAmountProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft]     = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [editing]);

  const isValid = (s: string) => {
    const n = parseDraft(s);
    return !isNaN(n) && n >= 0;
  };

  const startEditing = () => { setDraft(String(value)); setEditing(true); };

  const commitAndClose = () => {
    const n = parseDraft(draft);
    if (!isNaN(n) && n >= 0) onChange(n);
    setEditing(false);
  };

  const handleBlur = () => {
    // Always close on blur; save only if valid
    const n = parseDraft(draft);
    if (!isNaN(n) && n >= 0) onChange(n);
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (isValid(draft)) commitAndClose();
      // If invalid: stay open so user can fix it
    } else if (e.key === 'Escape') {
      setEditing(false);
    }
  };

  const invalid = draft !== '' && !isValid(draft);

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={e => setDraft(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        aria-label="Edit amount"
        aria-invalid={invalid}
        style={{
          fontFamily: 'ui-monospace, monospace',
          fontSize: size,
          color: C.text,
          background: C.bg3,
          border: `1.5px solid ${invalid ? C.red : C.amber}`,
          borderRadius: 4,
          padding: '2px 6px',
          width: 110,
          outline: 'none',
          transition: 'border-color 0.15s',
        }}
      />
    );
  }

  return (
    <span
      role="button"
      tabIndex={0}
      aria-label={`Edit amount: ${fmt(value)}`}
      onClick={startEditing}
      onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startEditing(); } }}
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
