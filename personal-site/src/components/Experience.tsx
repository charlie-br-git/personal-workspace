type Era = "ai" | "product" | "engineering" | "foundation";

type Role = {
  era: Era;
  period: string;
  title: string;
  company: string;
  /** One-line summary of scope, shown in full-contrast text under the company. */
  scope?: string;
  bullets: string[];
};

const experiences: Role[] = [
  {
    era: "ai",
    period: "Mar 2024 — Present",
    title: "Director of Product Management",
    company: "Willow Wealth (fka Yieldstreet)",
    scope:
      "Manage three PMs across private-markets products \u2014 managed portfolios, registered funds, embedded brokerage. Since mid-2026, also own AI enablement, governance, and infrastructure org-wide as the company\u2019s Claude Enterprise administrator.",
    bullets: [
      "Product: Willow 360 managed portfolios ($10M+ AUM, allocations advised by Wilshire); registered funds ($6M AUM in two months); the Atomic integration (embedded brokerage running dual-tenant RIA and broker-dealer programs); a distribution-model shift co-driven with the founder.",
      "Co-led the company\u2019s SOC 2 and ISO 27001 programs, supplying control evidence to auditors and running vendor security reviews.",
      "Led the company-wide Claude Enterprise rollout (2025) with MCP integrations and an agent registry.",
      "Go/no-go authority for AI and agentic deployments under a three-tier capability framework I ratified, extended, and operate.",
      "Measurement pipeline behind 90%+ weekly active AI use at peak across ~120 seats; every user is an internal employee.",
      "Agentic CI platform, co-developed with the platform engineering lead, that never auto-merges.",
      "Administer the company\u2019s Claude API and Console keys: each scoped to one process and its users, spend reviewed per key, revocation wired into IT offboarding. Built a proof of concept for an in-house AI gateway.",
    ],
  },
  {
    era: "product",
    period: "Sep 2021 — Mar 2024",
    title: "Senior Product Manager",
    company: "Yieldstreet",
    scope: "Retirement platform, custodial partnerships, and product discovery.",
    bullets: [
      "Moved retirement custody to Equity Trust (May 2023) through its WealthBridge integration, choosing white-labeled, redirect, or shared-middleware models partner by partner.",
      "Established the product discovery process and first user research, leading to a dedicated UX research team.",
      "Data-driven build-vs-buy frameworks for the retirement platform.",
    ],
  },
  {
    era: "product",
    period: "May 2018 — Sep 2021",
    title: "Product Manager",
    company: "Yieldstreet",
    scope: "IRA and retirement products, the first 0-to-1 launch, and internal platform tooling.",
    bullets: [
      "Launched the IRA product with custodian Pensco Trust and iterated account setup from 31 days to 7, eliminating 1,200+ hours a year of manual work. Added Capitalize for 401(k)-to-IRA rollovers.",
      "When a planned two-day custodian migration became a month-long outage, escalated to its CEO, set the partnership’s first SLAs and SLOs, and built retries and audits into our platform.",
      "Led the first 0-to-1 product: a savings account that scaled to 19K accounts and $100M+ in deposits within six months.",
      "Built an internal no-code admin platform for audience segmentation, A/B tests, and campaign automation. Partnered with the CTO on the monolith-to-SOA platform strategy.",
    ],
  },
  {
    era: "engineering",
    period: "May 2017 — May 2018",
    title: "Software Engineer (employee #13)",
    company: "Yieldstreet",
    bullets: [
      "Led the frontend migration from Angular to React.",
      "Designed the Banking-as-a-Service integration for account onboarding and funding.",
    ],
  },
  {
    era: "engineering",
    period: "Feb 2016 — Jan 2017",
    title: "Junior Software Engineer (employee #5)",
    company: "Self Lender",
    bullets: [
      "First engineering role after General Assembly (2015), at a regulated credit-building fintech.",
      "Built MVP account workflows that scaled from an 11-user pilot to 25K+ active accounts.",
    ],
  },
  {
    era: "foundation",
    period: "2011 — 2015",
    title: "Associate → Manager, Business Solutions",
    company: "Robin Hood Foundation; New Leaders for New Schools",
    bullets: [
      "Robin Hood (2011–2014): Salesforce integration and automated processing for ~3,500 annual donations.",
      "New Leaders (2014–2015): requirements, roadmaps, and platforms for 150 staff and 600 participants across 13 cities.",
    ],
  },
];

const eraConfig: Record<Era, { color: string; label: string }> = {
  ai: { color: "bg-secondary", label: "Product + AI" },
  product: { color: "bg-primary", label: "Product" },
  engineering: { color: "bg-accent", label: "Engineering" },
  foundation: { color: "bg-green-500", label: "Foundation" },
};

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-sm font-medium tracking-wider text-accent uppercase mb-3">
          Experience
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          From analytics to{" "}
          <span className="gradient-text">regulated product and AI leadership.</span>
        </h2>

        <div className="space-y-6">
          {experiences.map((exp) => {
            const era = eraConfig[exp.era];
            return (
              <div
                key={`${exp.title}-${exp.period}`}
                className="rounded-xl bg-surface border border-border p-6 hover:border-primary/30 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${era.color}`}>
                    {era.label}
                  </span>
                  <span className="text-sm text-muted">{exp.period}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                <p className="text-sm font-medium text-primary-light mb-2">{exp.company}</p>
                {exp.scope && (
                  <p className="text-sm text-foreground leading-relaxed mb-3">{exp.scope}</p>
                )}
                <ul className="list-disc pl-5 space-y-1.5 text-sm text-muted leading-relaxed">
                  {exp.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
