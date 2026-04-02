import { ExternalLink, Github } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "A collection of apps exploring different approaches to building and tooling with AI.",
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
    name: "Meridian",
    tagline: "Financial Planner",
    description:
      "Interactive personal finance dashboard for budgeting, scenario planning, and long-term projections. Built entirely with Claude Code in a single session — from spec to working app.",
    tags: ["React", "TypeScript", "Vite", "Recharts", "Tailwind"],
    approach: "Claude Code — single-session, spec-first",
    liveUrl:
      "https://charlie-br-git.github.io/personal-workspace/meridian-finance/",
    sourceUrl:
      "https://github.com/charlie-br-git/personal-workspace/tree/main/meridian-finance",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-xl bg-surface border border-border p-6 hover:border-primary/30 transition-colors flex flex-col gap-4">
      {/* Name + tagline */}
      <div className="flex items-baseline gap-3">
        <span className="text-xl font-bold gradient-text">{project.name}</span>
        <span className="text-xs font-medium tracking-widest text-muted uppercase font-mono">
          {project.tagline}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-muted leading-relaxed">{project.description}</p>

      {/* Approach badge */}
      <div className="flex items-center gap-2 w-fit rounded-md bg-accent/10 border border-accent/20 px-3 py-1.5">
        <span className="text-xs font-medium tracking-wider text-muted uppercase">
          Approach
        </span>
        <span className="text-xs font-medium text-accent-light font-mono">
          {project.approach}
        </span>
      </div>

      {/* Stack tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary-light"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3 mt-auto pt-2">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-semibold text-white gradient-bg hover:opacity-90 transition-opacity"
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
            className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm text-muted hover:text-foreground hover:border-primary/30 transition-colors"
          >
            <Github size={13} />
            Source
          </a>
        )}
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <p className="text-sm font-medium tracking-wider text-accent uppercase mb-3">
        Projects
      </p>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Different approaches to{" "}
        <span className="gradient-text">building with AI.</span>
      </h1>
      <p className="text-lg text-muted max-w-2xl mb-12">
        Apps exploring how AI tooling changes the way software gets built —
        varying in method, stack, and how much of the work the model owns.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>
    </div>
  );
}
