import React from 'react';

interface Props {
  children: React.ReactNode;
  label?: string;
}

interface State {
  error: Error | null;
}

const S = {
  wrap: {
    display: 'flex', flexDirection: 'column' as const, alignItems: 'center',
    justifyContent: 'center', padding: 48, gap: 12,
  },
  title: { fontFamily: 'ui-monospace, monospace', fontSize: 13, color: '#ef4444' },
  msg:   { fontFamily: 'ui-monospace, monospace', fontSize: 11, color: '#64748b' },
  btn: {
    marginTop: 8, padding: '6px 16px', background: '#1a3a5c',
    border: '1px solid #1e3a5f', borderRadius: 4, color: '#e2e8f0',
    cursor: 'pointer', fontSize: 12, fontFamily: 'ui-monospace, monospace',
  },
};

export default class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    const { error } = this.state;
    if (error) {
      return (
        <div style={S.wrap}>
          <div style={S.title}>{this.props.label ?? 'Module'} encountered an error.</div>
          <div style={S.msg}>{error.message}</div>
          <button style={S.btn} onClick={() => this.setState({ error: null })}>
            Retry
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
