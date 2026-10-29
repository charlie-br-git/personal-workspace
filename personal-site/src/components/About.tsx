export default function About() {
  const stats = [
    { value: "8+ yrs", label: "Engineer to Director on one regulated platform" },
    { value: "$10M+", label: "AUM — Managed Portfolios (YS360)" },
    { value: "$6M", label: "AUM in 2 months — registered funds launch" },
    { value: "31 \u2192 7 days", label: "IRA setup via custodial integration" },
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
              studies at WashU, and became a software engineer after General
              Assembly&apos;s Web Development Immersive in 2015. I joined
              Yieldstreet (now Willow Wealth) as an engineer in 2017 and moved
              through product management, senior product management, and into
              my current Director role.
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
              Since 2024 I have also led enterprise AI adoption at Willow:
              a company-wide Claude Enterprise rollout with MCP integrations,
              API connectors, role-based access, team-specific plugins, and an
              agent registry with governance. It is an internal platform, built
              with engineering and governance partners.
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
