export default function About() {
  const stats = [
    { value: "8+", label: "Years in Fintech" },
    { value: "3", label: "Career Transitions" },
    { value: "4", label: "Teams Enabled with AI" },
    { value: "500K+", label: "Platform Users" },
  ];

  return (
    <section id="about" className="py-24">
      <div className="mx-auto max-w-5xl px-6">
        <p className="text-sm font-medium tracking-wider text-secondary uppercase mb-3">
          About
        </p>
        <h2 className="text-3xl md:text-4xl font-bold mb-10">
          A non-traditional path to{" "}
          <span className="gradient-text">AI platform leadership.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-10 mb-14">
          <div className="space-y-5 text-muted leading-relaxed">
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
          <div className="space-y-5 text-muted leading-relaxed">
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
