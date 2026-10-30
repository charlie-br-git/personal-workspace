export default function About() {
  const stats = [
    { value: "9 yrs", label: "Engineer to Director on one regulated platform" },
    { value: "$10M+", label: "AUM — Managed Portfolios (YS360)" },
    { value: "90%+", label: "Weekly active AI adoption, ~120-seat org" },
    { value: "31 \u2192 7 days", label: "Retirement account setup via API integration" },
  ];

  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-sm font-medium tracking-wider text-secondary uppercase mb-3">
          About
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          An engineer who became a product leader, in{" "}
          <span className="gradient-text">regulated private markets.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-10 mb-14">
          <div className="space-y-5 text-muted leading-relaxed">
            <p>
              I started in nonprofit analytics and donor systems (Robin Hood
              Foundation, New Leaders for New Schools), studied environmental
              science at WashU, and became a software engineer after General
              Assembly&apos;s Web Development Immersive in 2015. I joined
              Yieldstreet (now Willow Wealth) as an engineer in 2017 and moved
              through product management, senior product management, and into
              my current Director role, managing a team of three PMs.
            </p>
            <p>
              The work is regulated by nature: registered funds, managed
              portfolios, custodial integrations, and a broker-dealer context
              where compliance is a design input rather than a late-stage gate.
              Engineering first means I know what the system can and cannot do
              before I commit the roadmap to it.
            </p>
          </div>
          <div className="space-y-5 text-muted leading-relaxed">
            <p>
              Since 2025 I have led enterprise AI adoption at Willow, and since
              mid-2026 I own AI enablement, governance, and infrastructure
              org-wide: go/no-go authority under a capability framework I
              ratified, extended, and operate; the measurement pipeline behind
              90%+ weekly active use; and an agentic CI platform that never
              merges its own work. Every user is an internal employee, by design.
            </p>
            <p>
              I build to think: I prototype with the Claude API, React Native,
              Python, Twilio and MCP.{" "}
              <span className="text-foreground font-medium">
                The through-line is making complex, regulated systems usable by
                the people who depend on them.
              </span>
            </p>
          </div>
        </div>

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
      </div>
    </section>
  );
}
