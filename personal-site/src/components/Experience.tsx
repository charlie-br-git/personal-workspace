import SectionHeading from "@/components/SectionHeading";

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
      "Run the company’s enterprise AI platform end to end as its Claude Enterprise administrator: the 2025 Claude Enterprise rollout, then, since mid-2026, AI enablement, governance, and infrastructure org-wide — release gating, measurement, agentic delivery. Also lead Willow 360 managed portfolios, registered funds and the embedded-brokerage integration, and manage three PMs.",
    bullets: [
      "Go/no-go authority for AI and agentic deployments under a three-tier capability framework I ratified, extended, and operate; codified ship bar: read-only by construction, human-gated with no auto-merge, no money/KYC/PII, approval ≠ go-live, investor-facing output gated behind FINRA 2210 review.",
      "Led the company-wide Claude Enterprise rollout (2025) with MCP integrations and an agent registry; built the weekly measurement pipeline behind 90%+ weekly active use at peak across ~120 seats, technical and non-technical teams including the leadership team; AI-assisted code on ~4 of 5 merged engineering PRs; caught a >2× vendor metric-definition error before it reached leadership.",
      "Agentic CI/governance platform, co-developed with the platform engineering lead, that never auto-merges: a PR quality gate for AI-produced changes, scheduled agentic workflows running unattended in production, and fail-closed schema validation hardened against adversarial input.",
      "Deployed nine custom agents across the organization with evals, model routing and multi-agent chains: from an AI spend monitor that proposes governance improvements and new agents from actual usage, to a small-model utility kept cheap for other agents to call, to automated project management that writes weekly updates to an org-wide knowledge repository.",
      "Shipped AI agents whose output reaches customers: copywriting and Figma-to-landing-page agents for top-of-funnel experimentation, reducing the time from idea to test (late 2026). The platform’s users are employees.",
      "Triage agent riding engineering’s existing Datadog alerts: scoped read-only access and production-error mining into a scored, evidence-carrying backlog. Set up the managed agent, provisioned its keys and ran the CI pipeline; a platform engineer built the in-thread triage skills on top.",
      "Administer the company’s Claude API and Console keys, each scoped to one process and its users and tagged by department and workflow, spend reviewed per key, revocation wired into IT offboarding; modeled spend and enacted cost controls by department, team and initiative. Evolving the out-of-the-box AI service toward a self-hosted, multi-provider, multi-model AI gateway (a work in progress, not yet in production).",
      "Product: Willow 360 managed portfolios ($10M+ AUM, allocations advised by an independent institutional adviser); registered funds ($6M AUM in two months); an embedded-brokerage integration running dual-tenant RIA and broker-dealer programs; a distribution-model shift co-driven with the founder.",
      "Co-led the company’s SOC 2 and ISO 27001 programs, supplying control evidence to auditors and running vendor security reviews.",
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

const eraLabel: Record<Era, string> = {
  ai: "Product + AI",
  product: "Product",
  engineering: "Engineering",
  foundation: "Foundation",
};

export default function Experience() {
  return (
    <section id="experience" className="site-container border-t border-rule py-20 md:py-28">
      <SectionHeading label="Experience">
        From analytics to regulated product and AI leadership.
      </SectionHeading>

      <ol className="mt-12 border-t border-rule">
        {experiences.map((exp) => (
          <li
            key={`${exp.title}-${exp.period}`}
            className="grid grid-cols-12 gap-x-6 gap-y-3 border-b border-rule py-8 md:py-10"
          >
            <div className="col-span-12 md:col-span-3">
              <p className="text-sm tabular-nums text-fg">{exp.period}</p>
              <p className="label mt-1.5">{eraLabel[exp.era]}</p>
            </div>
            <div className="col-span-12 md:col-span-9 lg:col-span-8">
              <h3 className="font-display text-xl">{exp.title}</h3>
              <p className="mt-1 text-md text-muted">{exp.company}</p>
              {exp.scope && <p className="mt-4 max-w-prose text-base text-fg">{exp.scope}</p>}
              <ul className="list-dash mt-5 space-y-2.5 max-w-prose text-md text-muted">
                {exp.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
