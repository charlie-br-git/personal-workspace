export default function About() {
  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-4 text-sm font-semibold tracking-widest text-secondary uppercase">
          About
        </h2>
        <h3 className="mb-8 text-3xl font-bold md:text-4xl">
          A non-traditional path to{" "}
          <span className="gradient-text">AI platform leadership.</span>
        </h3>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              My path to building AI platforms started in an unlikely place —
              environmental studies at WashU, then years of data analytics and
              donor systems at organizations like the Robin Hood Foundation. That
              foundation in systems thinking and stakeholder management turned out
              to be the perfect preparation for what came next.
            </p>
            <p>
              After completing General Assembly&apos;s Web Development Immersive, I
              went from junior engineer to software engineer to product manager at
              Yieldstreet (now Willow Wealth), where I&apos;ve spent the last 8+
              years scaling a fintech platform from startup to industry leader in
              alternative investments.
            </p>
          </div>
          <div className="space-y-4 text-muted leading-relaxed">
            <p>
              Today, as Director of Product Management, I lead our enterprise AI
              initiatives — deploying Claude across product, design, marketing, and
              engineering teams. This means architecting MCP integrations, building
              API connectors, implementing strict RBAC protocols, and creating
              custom plugins tailored to each team&apos;s workflow.
            </p>
            <p>
              The through-line of my career has always been the same:{" "}
              <span className="text-foreground font-medium">
                making complex systems accessible to the people who need them.
              </span>{" "}
              Whether it&apos;s alternative investments for retail investors or AI
              tooling for cross-functional teams, I build platforms that ship.
            </p>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { label: "Years in Fintech", value: "8+" },
            { label: "Career Transitions", value: "3" },
            { label: "Teams Enabled with AI", value: "4" },
            { label: "Platform Users", value: "500K+" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="gradient-border rounded-xl p-6 text-center"
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
