import { ExternalLink, Github } from 'lucide-react';

const C = {
  bg: '#0a1628',
  bg2: '#112240',
  bg3: '#0d1b2e',
  border: '#1e3a5f',
  amber: '#f59e0b',
  amber2: '#fbbf24',
  muted: '#64748b',
  muted2: '#94a3b8',
  text: '#e2e8f0',
};

interface Project {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
  approach: string;
  liveUrl?: string;
  sourceUrl?: string;
}

const PROJECTS: Project[] = [
  {
    name: 'Meridian',
    tagline: 'Financial Planner',
    description:
      'Interactive personal finance dashboard for budgeting, scenario planning, and long-term projections. Built entirely with Claude in a single session — spec to working app.',
    tags: ['React', 'TypeScript', 'Vite', 'Recharts', 'Tailwind'],
    approach: 'Claude Code — single-session, spec-first',
    liveUrl: 'https://charlie-br-git.github.io/personal-workspace/meridian-finance/',
    sourceUrl: 'https://github.com/charlie-br-git/personal-workspace/tree/main/meridian-finance',
  },
];

function TagPill({ label }: { label: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        padding: '2px 9px',
        borderRadius: 4,
        background: '#0a1e3d',
        border: `1px solid ${C.border}`,
        fontSize: 11,
        fontFamily: 'ui-monospace, monospace',
        color: C.muted2,
        letterSpacing: '0.5px',
      }}
    >
      {label}
    </span>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div
      style={{
        background: C.bg2,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding: '28px 32px',
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        maxWidth: 560,
      }}
    >
      {/* Name + tagline */}
      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
          <span
            style={{
              fontFamily: 'Georgia, "Times New Roman", serif',
              fontSize: 22,
              fontWeight: 700,
              color: C.amber2,
            }}
          >
            {project.name}
          </span>
          <span
            style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: 10,
              color: C.muted,
              letterSpacing: '2.5px',
              textTransform: 'uppercase',
            }}
          >
            {project.tagline}
          </span>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: 14, color: C.muted2, lineHeight: 1.7, margin: 0 }}>
        {project.description}
      </p>

      {/* Approach badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '7px 12px',
          background: C.bg3,
          border: `1px solid ${C.border}`,
          borderRadius: 6,
          width: 'fit-content',
        }}
      >
        <span style={{ fontSize: 10, color: C.muted, fontFamily: 'ui-monospace, monospace', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
          Approach
        </span>
        <span style={{ fontSize: 12, color: C.amber, fontFamily: 'ui-monospace, monospace' }}>
          {project.approach}
        </span>
      </div>

      {/* Tags */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {project.tags.map(t => <TagPill key={t} label={t} />)}
      </div>

      {/* Links */}
      <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              background: C.amber,
              color: '#0a1628',
              borderRadius: 6,
              fontSize: 13,
              fontWeight: 600,
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <ExternalLink size={13} />
            View Project
          </a>
        )}
        {project.sourceUrl && (
          <a
            href={project.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '8px 16px',
              background: 'none',
              border: `1px solid ${C.border}`,
              color: C.muted2,
              borderRadius: 6,
              fontSize: 13,
              textDecoration: 'none',
              cursor: 'pointer',
            }}
          >
            <Github size={13} />
            Source
          </a>
        )}
      </div>
    </div>
  );
}

export default function Projects() {
  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Page header */}
      <div style={{ marginBottom: 40 }}>
        <h1
          style={{
            fontFamily: 'Georgia, "Times New Roman", serif',
            fontSize: 28,
            fontWeight: 700,
            color: C.text,
            margin: '0 0 10px',
          }}
        >
          Projects
        </h1>
        <p style={{ fontSize: 14, color: C.muted2, lineHeight: 1.7, maxWidth: 560, margin: 0 }}>
          A collection of apps exploring different approaches to building and tooling with AI —
          varying in method, stack, and how much of the work the model owns.
        </p>
      </div>

      {/* Project grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(480px, 1fr))', gap: 20 }}>
        {PROJECTS.map(p => <ProjectCard key={p.name} project={p} />)}
      </div>
    </div>
  );
}
