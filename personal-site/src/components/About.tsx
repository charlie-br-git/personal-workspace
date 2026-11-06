export default function About() {
  const stats = [
    { value: "90%+", label: "Weekly active AI adoption at peak, ~120 internal seats" },
    { value: "9 agents", label: "Custom agents deployed org-wide, with evals, model routing and multi-agent chains" },
    { value: "Since 2017", label: "Engineer to Director on one SEC/FINRA-regulated platform" },
    { value: "31 → 7 days", label: "IRA account setup, from launch to scale" },
  ];

  const capabilities = [
    {
      lead: "Governing and measuring enterprise AI",
      rest: " — written decision rights, a release gate I operate, and numbers that reconcile to the invoice.",
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
      rest: " — prototypes with the Claude API, MCP, Python, React Native and Twilio that test an idea before it goes on a roadmap.",
    },
  ];

  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-sm font-medium tracking-wider text-secondary uppercase mb-3">
          About
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          An engineer who became a product leader, and now runs{" "}
          <span className="gradient-text">enterprise AI in regulated private markets.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-10 mb-10">
          <div className="space-y-5 text-muted leading-relaxed">
            <p>
              I&apos;m Director of Product Management at Willow Wealth (formerly
              Yieldstreet), a private-markets investment platform operating under
              SEC and FINRA rules, and I run its enterprise AI platform end to end.
              I led the company-wide Claude Enterprise rollout in 2025, and since
              mid-2026 I own AI enablement, governance, and infrastructure org-wide
              as our Claude Enterprise administrator: written decision rights and a
              release gate I operate, the measurement behind 90%+ weekly active use
              at peak across ~120 seats, and agentic delivery &mdash; from a
              co-developed CI platform that never merges its own work to nine custom
              agents deployed across the organization with evals, model routing
              and multi-agent chains.
            </p>
            <p>
              The platform&apos;s users are employees; as of late 2026 its agents
              also produce customer-facing work &mdash; copy and Figma-to-landing-page
              builds for top-of-funnel experiments, cutting the time from idea to
              test. The out-of-the-box AI service is being evolved toward a
              self-hosted, multi-provider, multi-model gateway (a work in progress,
              not yet in production). In practice that is privacy and access
              governance for AI inside a FINRA/SEC firm: role-based access, scoped
              read-only service accounts, audit logging of AI activity,
              aggregate-only reporting with per-user detail restricted to
              administrators, and written PII rules as ship conditions for new
              automations.
            </p>
          </div>
          <div className="space-y-5 text-muted leading-relaxed">
            <p>
              I got here from the inside: employee #13, a software engineer, in
              2017, then product management and senior product management, into
              the Director role, where I also lead Willow 360 managed portfolios,
              registered funds and the embedded-brokerage integration, and manage
              three PMs. The work is regulated by nature &mdash; an IRA launch with a
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
              Python, Twilio and MCP.{" "}
              <span className="text-foreground font-medium">
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

        <ul className="mb-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4 text-sm text-muted leading-relaxed">
          {capabilities.map((c) => (
            <li key={c.lead}>
              <span className="text-foreground font-medium">{c.lead}</span>
              {c.rest}
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl bg-surface border border-border p-6 text-center"
            >
              <div className="text-3xl font-bold gradient-text">{stat.value}</div>
              <div className="mt-1 text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mt-10 space-y-2 text-sm text-muted leading-relaxed">
          <p>
            <span className="text-foreground font-medium">Hands-on:</span> Claude
            Enterprise administration · Claude API · Claude Code · Model Context
            Protocol (MCP) · custom agents with evals, model routing and multi-agent chains ·
            agentic CI on GitHub Actions · AI usage telemetry (OTLP into the existing
            observability stack) · versioned org-wide prompt and skill layer · Python ·
            React / React Native · Twilio · SQLite
          </p>
          <p>
            <span className="text-foreground font-medium">Governance and compliance:</span>{" "}
            AI release gating (go/no-go) · API-key lifecycle and scoped read-only
            service accounts · PII and aggregate-only data rules · FINRA 2210 review ·
            SOC 2 and ISO 27001 programs (co-led)
          </p>
        </div>
      </div>
    </section>
  );
}
