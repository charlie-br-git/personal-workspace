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
      "Run the company\u2019s enterprise AI platform end to end as its Claude Enterprise administrator: the 2025 Claude Enterprise rollout, then, since mid-2026, AI enablement, governance, and infrastructure org-wide \u2014 release gating, measurement, agentic delivery. Also lead Willow 360 managed portfolios, registered funds and the embedded-brokerage integration, and manage three PMs.",
    bullets: [
      "Go/no-go authority for AI and agentic deployments under a three-tier capability framework I ratified, extended, and operate; codified ship bar: read-only by construction, human-gated with no auto-merge, no money/KYC/PII, approval \u2260 go-live, investor-facing output gated behind FINRA 2210 review.",
      "Led the company-wide Claude Enterprise rollout (2025) with MCP integrations and an agent registry; built the weekly measurement pipeline behind 90%+ weekly active use at peak across ~120 seats, technical and non-technical teams including the leadership team; AI-assisted code on ~4 of 5 merged engineering PRs; caught a >2\u00d7 vendor metric-definition error before it reached leadership.",
      "Agentic CI/governance platform, co-developed with the platform engineering lead, that never auto-merges: a PR quality gate for AI-produced changes, scheduled agentic workflows running unattended in production, and fail-closed schema validation hardened against adversarial input.",
      "Deployed nine custom agents across the organization with model routing and multi-agent chains: from an AI spend monitor that proposes governance improvements and new agents from actual usage, to a small-model utility kept cheap for other agents to call, to automated project management that writes weekly updates to an org-wide knowledge repository.",
      "Shipped AI agents whose output reaches customers: copywriting and Figma-to-landing-page agents for top-of-funnel experimentation, reducing the time from idea to test (late 2026). The platform\u2019s users are employees.",
      "Triage agent riding engineering\u2019s existing Datadog alerts: scoped read-only access and production-error mining into a scored, evidence-carrying backlog. Set up the managed agent, provisioned its keys and ran the CI pipeline; a platform engineer built the in-thread triage skills on top.",
      "Administer the company\u2019s Claude API and Console keys, each scoped to one process and its users and tagged by department and workflow, spend reviewed per key, revocation wired into IT offboarding; modeled spend and enacted cost controls by department, team and initiative. Evolving the out-of-the-box AI service toward a self-hosted, multi-provider, multi-model AI gateway (a work in progress, not yet in production).",
      "Product: Willow 360 managed portfolios ($10M+ AUM, allocations advised by an independent institutional adviser); registered funds ($6M AUM in two months); an embedded-brokerage integration running dual-tenant RIA and broker-dealer programs; a distribution-model shift co-driven with the founder.",
      "Co-led the company\u2019s SOC 2 and ISO 27001 programs, supplying control evidence to auditors and running vendor security reviews.",
    ],
  },
  {
    era: "product",
    period: "Sep 2021 — Mar 2024",
    title: "Senior Product Manager",
    company: "Yieldstreet",
    scope: "Retirement platform, custodial partnerships, and product discovery.",
    bullets: [
      "Moved retirement custody to a new custodian (May 2023) through its account-link integration, choosing white-labeled, redirect, or shared-middleware models partner by partner.",
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
      "Launched the IRA product with a trust-company custodian and iterated account setup from 31 days to 7, eliminating 1,200+ hours a year of manual work. Added a rollover partner for 401(k)-to-IRA transfers.",
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
