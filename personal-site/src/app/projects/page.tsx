import SectionHeading from "@/components/SectionHeading";
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
    <div className="site-container fade-in py-16 md:py-24">
      <SectionHeading
        label="Projects"
        numbered={false}
        as="h1"
        aside={
          <p className="mt-4 max-w-lede text-lg text-muted">
            I prototype with the Claude API, React, Python, Twilio and MCP, using Claude Code. These
            are personal projects, built to learn and to think through products. They are not
            production systems or shipped products.
          </p>
        }
      >
        Product leader who builds.
      </SectionHeading>

      <div className="mt-14 border-t border-rule">
        {projects.map((p) => (
          <article key={p.name} className="grid grid-cols-12 gap-x-6 gap-y-3 border-b border-rule py-8 md:py-10">
            <div className="col-span-12 md:col-span-3">
              <ul className="tags" aria-label="Stack">
                {p.stack.map((t) => (
                  <li key={t} className="tag">
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-span-12 md:col-span-9 lg:col-span-8">
              <h2 className="font-display text-xl">{p.name}</h2>
              <p className="mt-2 max-w-prose text-md text-muted">{p.description}</p>
              {p.links.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  {p.links.map((l) => (
                    <li key={l.label}>
                      <a href={l.href} className="link print-url text-fg">
                        {l.label} ↗
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
