import { ArrowUpRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Hands-on builds: financial planning tools and Claude API prototypes, built with Claude Code.",
};

const projects = [
  {
    name: "Meridian",
    stack: ["React", "TypeScript", "Tailwind", "Vite"],
    description:
      "A personal financial planning app: budget snapshot, goal tracking, scenario comparison, and timeline projection. The live demo runs on illustrative sample data.",
    links: [
      { label: "Live demo", href: "/personal-workspace/meridian-finance/" },
      {
        label: "Source",
        href: "https://github.com/charlie-br-git/personal-workspace/tree/main/meridian-finance",
      },
    ],
  },
  {
    name: "SMS Wellness Bot",
    stack: ["Python", "Twilio", "Claude API", "SQLite"],
    description:
      "A text-message wellness assistant built on the Claude API, with SQLite analytics and rate limiting. A personal prototype, not publicly hosted.",
    links: [],
  },
];

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <p className="text-sm font-medium tracking-wider text-accent uppercase mb-3">Projects</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Product leader who <span className="gradient-text">builds.</span>
      </h1>
      <p className="text-lg text-muted max-w-2xl mb-12">
        I prototype with the Claude API, React, Python, Twilio and MCP, using Claude Code. These
        are personal projects, built to learn and to think through products. They are not
        production systems or shipped products.
      </p>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p) => (
          <div key={p.name} className="rounded-xl bg-surface border border-border p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              {p.stack.map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary-light"
                >
                  {t}
                </span>
              ))}
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{p.name}</h3>
            <p className="text-sm text-muted leading-relaxed mb-4">{p.description}</p>
            <div className="flex gap-4">
              {p.links.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="inline-flex items-center gap-1 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors"
                >
                  {l.label} <ArrowUpRight size={14} />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
