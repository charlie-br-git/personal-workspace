const experiences = [
  {
    era: "ai" as const,
    period: "2024 — Present",
    title: "Director of Product Management",
    company: "Willow Wealth (fka Yieldstreet)",
    description:
      "Lead product across private-markets offerings and enterprise AI adoption. 2025 product work: Managed Portfolios (YS360, $10M+ AUM), registered funds ($6M AUM in two months), Equity Trust custodial integration (IRA setup 31 \u2192 7 days), the Atomic Invest partnership; co-drove a distribution-model strategy shift with the founder. Led the company-wide Claude Enterprise rollout: MCP integrations, RBAC, team-specific plugins, and an agent registry with governance. Mentor emerging product talent.",
  },
  {
    era: "product" as const,
    period: "2021 — 2024",
    title: "Senior Product Manager",
    company: "Yieldstreet",
    description:
      "Drove product strategy for the alternative investments platform, leading cross-functional teams on greenfield features and platform-wide initiatives.",
  },
  {
    era: "product" as const,
    period: "2018 — 2021",
    title: "Product Manager",
    company: "Yieldstreet",
    description:
      "Transitioned from engineering to product, using technical depth to bridge stakeholder needs with scalable platform architecture.",
  },
  {
    era: "engineering" as const,
    period: "2017 — 2018",
    title: "Software Engineer (employee #13)",
    company: "Yieldstreet",
    description:
      "Built core platform features for the alternative investments marketplace, including investment flows, compliance automation and data pipelines.",
  },
  {
    era: "engineering" as const,
    period: "2016 — 2017",
    title: "Junior Software Engineer (employee #5)",
    company: "Self Lender",
    description:
      "First engineering role after General Assembly (2015). Built features for a credit-building fintech product.",
  },
  {
    era: "foundation" as const,
    period: "2011 — 2014",
    title: "Associate \u2192 Manager, Business Solutions",
    company: "Robin Hood Foundation; New Leaders for New Schools",
    description:
      "Analytics, donor data systems, and business solutions. Built the systems thinking behind later platform decisions.",
  },
];

const eraConfig = {
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
          {experiences.map((exp, i) => {
            const era = eraConfig[exp.era];
            return (
              <div
                key={i}
                className="rounded-xl bg-surface border border-border p-6 hover:border-primary/30 transition-colors"
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium text-white ${era.color}`}>
                    {era.label}
                  </span>
                  <span className="text-xs text-muted">{exp.period}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                <p className="text-sm font-medium text-primary-light mb-2">{exp.company}</p>
                <p className="text-sm text-muted leading-relaxed">{exp.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
