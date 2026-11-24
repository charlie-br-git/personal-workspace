import SectionHeading from "@/components/SectionHeading";

const stats = [
  { value: "90%+", label: "Weekly active AI adoption at peak, ~120 internal seats" },
  { value: "9 agents", label: "Custom agents deployed org-wide, with evals, model routing and multi-agent chains" },
  { value: "Since 2017", label: "Engineer to Director on one SEC/FINRA-regulated platform" },
    { value: "31 → 7 days", label: "Time to fund an IRA account, including account creation" },
];

const capabilities = [
  {
        lead: "Enabling and measuring enterprise AI",
    rest: " — onboarding and office hours, release-readiness evidence, and numbers that reconcile to the invoice.",
  },
  {
    lead: "Shipping agents that do real work",
    rest: " — nine custom agents org-wide with evals, model routing and multi-agent chains, including agents whose output reaches customers.",
  },
  {
    lead: "Launching regulated products with partners",
    rest: " — custodians, broker-dealers, advisers — with compliance review built in from the first sketch.",
  },
  {
    lead: "Building to think",
    rest: " — prototypes with the Claude API, MCP, Python and React Native that test an idea before it goes on a roadmap.",
  },
];

const specification = [
  {
    label: "Hands-on",
    items: [
      "Claude Enterprise administration",
      "Claude API",
      "Claude Code",
      "Model Context Protocol (MCP)",
      "custom agents with evals, model routing and multi-agent chains",
      "agentic CI on GitHub Actions",
      "AI usage telemetry (OTLP into the existing observability stack)",
      "versioned org-wide prompt and skill layer",
      "Python",
      "React / React Native",
    ],
  },
  {
        label: "Readiness and compliance",
    items: [
            "AI release-readiness evidence",
      "API-key lifecycle and scoped read-only service accounts",
      "PII and aggregate-only data rules",
            "FINRA 2210 review as a ship condition for investor-facing output",
      "SOC 2 and ISO 27001 programs (co-led)",
    ],
  },
];

export default function About() {
  return (
    <section id="about" className="site-container border-t border-rule py-20 md:py-28">
      <SectionHeading label="About">
        An engineer who became a product leader, and now runs enterprise AI in regulated private
        markets.
      </SectionHeading>

      {/* Stats as a hairline row with tabular numerals. */}
      <ul className="mt-12 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-rule pt-6 md:grid-cols-4">
        {stats.map((stat) => (
          <li key={stat.label}>
            <p className="font-display text-2xl tabular-nums md:text-3xl">{stat.value}</p>
            <p className="mt-2 text-sm text-muted">{stat.label}</p>
          </li>
        ))}
      </ul>

      {/* Two prose columns, set under the heading on the right nine columns. */}
      <div className="mt-16 grid grid-cols-12 gap-x-6">
        <div className="col-span-12 md:col-start-4 md:col-span-9 grid gap-x-10 gap-y-6 lg:grid-cols-2 text-md text-muted">
          <div className="space-y-5">
            <p>
              I&apos;m Director of Product Management at Willow Wealth (formerly
              Yieldstreet), a private-markets investment platform operating under
              SEC and FINRA rules, and I run its enterprise AI platform end to end.
              I led the company-wide Claude Enterprise rollout in 2025, and since
              mid-2026 I run AI enablement, readiness and the Claude platform work
              org-wide as our Claude Enterprise administrator: the measurement
              behind 90%+ weekly active use
              at peak across ~120 seats, and agentic delivery &mdash; from a
              co-developed CI platform that never merges its own work to nine custom
              agents deployed across the organization with evals, model routing
              and multi-agent chains.
            </p>
            <p>
              The platform&apos;s users are employees; as of late 2026 its agents
              also produce customer-facing work &mdash; copy and Figma-to-landing-page
              builds for top-of-funnel experiments, cutting the time from idea to
              test. A proof of concept for an in-house AI gateway is built and is being
              evolved into a self-hosted, multi-provider gateway (a work in progress,
              not in production). In practice the platform work centers on privacy and
              access for AI inside a FINRA/SEC firm: role-based access, scoped
              read-only service accounts, audit logging of AI activity,
              aggregate-only reporting with per-user detail restricted to
              administrators, and written PII rules as ship conditions for new
              automations. The governance calls sit with the control functions.
            </p>
          </div>
          <div className="space-y-5">
            <p>
              I got here from the inside: employee #13, a software engineer, in
              2017, then product management and senior product management, into
              the Director role, where I also lead Willow 360 managed portfolios,
              registered funds and the embedded-brokerage integration. From 2021 to 2024 I
              managed a team of two product managers. The work is regulated by nature &mdash; an IRA launch with a
              custodian, a 0-to-1 savings account, registered funds, managed
              portfolios, and the custodial and broker-dealer integrations behind
              them &mdash; in a context where compliance is a design input rather
              than a late-stage gate. Engineering first means I know what the
              system can and cannot do before I commit the roadmap to it. I co-led
              our SOC 2 and ISO 27001 programs, so audit evidence is part of the job
              rather than an interruption to it.
            </p>
            <p>
              I build to think: I prototype with the Claude API, React Native,
              Python and MCP. How I decide: start with the narrowest access
              that does the job, report the number I can defend over the one that
              flatters, and put the evidence in front of the people who own the risk
              so they can make the call.{" "}
              <span className="font-medium text-fg">
                The through-line is making complex, regulated systems usable by
                the people who depend on them.
              </span>
            </p>
            <p>
              Before fintech: nonprofit analytics and donor systems (Robin Hood
              Foundation, New Leaders for New Schools), environmental science at
              WashU, and General Assembly&apos;s Web Development Immersive in 2015.
            </p>
          </div>
        </div>
      </div>

      {/* Capabilities as a numbered list. */}
      <div className="mt-16 grid grid-cols-12 gap-x-6 gap-y-4">
        <p className="label col-span-12 md:col-span-3">Capabilities</p>
        <ol className="list-numbered col-span-12 md:col-span-9 grid gap-x-10 gap-y-5 lg:grid-cols-2 text-md text-muted">
          {capabilities.map((c) => (
            <li key={c.lead}>
              <span className="font-medium text-fg">{c.lead}</span>
              {c.rest}
            </li>
          ))}
        </ol>
      </div>

            {/* Hands-on and readiness strips as a specification table. */}
      <dl className="mt-14 border-t border-rule">
        {specification.map((row) => (
          <div key={row.label} className="grid grid-cols-12 gap-x-6 gap-y-2 border-b border-rule py-5">
            <dt className="label col-span-12 md:col-span-3 md:pt-0.5">{row.label}</dt>
            <dd className="col-span-12 md:col-span-9 text-md text-muted">
              <ul className="list-inline">
                {row.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
