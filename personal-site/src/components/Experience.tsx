const experiences = [
  {
    era: "ai",
    period: "2024 — Present",
    title: "Director of Product Management",
    company: "Willow Wealth (fka Yieldstreet)",
    description:
      "Leading enterprise AI deployment — Claude customization with MCP architecture, API connectors, RBAC, and team-specific plugins across product, design, marketing, and engineering.",
  },
  {
    era: "product",
    period: "2021 — 2024",
    title: "Senior Product Manager",
    company: "Yieldstreet",
    description:
      "Drove product strategy for alternative investments platform, leading cross-functional teams on greenfield features and platform-wide initiatives during rapid growth.",
  },
  {
    era: "product",
    period: "2018 — 2021",
    title: "Product Manager",
    company: "Yieldstreet",
    description:
      "Transitioned from engineering to product, leveraging technical depth to bridge stakeholder needs with scalable platform architecture.",
  },
  {
    era: "engineering",
    period: "2017 — 2018",
    title: "Software Engineer",
    company: "Yieldstreet",
    description:
      "Built core platform features for the alternative investments marketplace, contributing to the engineering foundation of a high-growth fintech startup.",
  },
  {
    era: "engineering",
    period: "2016 — 2017",
    title: "Junior Software Engineer",
    company: "Self Lender",
    description:
      "First engineering role post-bootcamp. Built features for a credit-building fintech product, learning production-grade development practices.",
  },
  {
    era: "foundation",
    period: "2011 — 2014",
    title: "Associate → Manager, Business Solutions",
    company: "Robin Hood Foundation → New Leaders",
    description:
      "Analytics, donor data systems, and business solutions in the nonprofit sector. Developed the systems thinking that would later drive platform architecture decisions.",
  },
];

const eraColors: Record<string, string> = {
  ai: "bg-secondary",
  product: "bg-primary",
  engineering: "bg-accent",
  foundation: "bg-green-500",
};

const eraLabels: Record<string, string> = {
  ai: "AI Platform",
  product: "Product",
  engineering: "Engineering",
  foundation: "Foundation",
};

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="mb-4 text-sm font-semibold tracking-widest text-accent uppercase">
          Experience
        </h2>
        <h3 className="mb-12 text-3xl font-bold md:text-4xl">
          From analytics to{" "}
          <span className="gradient-text">AI platform architecture.</span>
        </h3>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute top-0 left-4 h-full w-px bg-gradient-to-b from-primary via-secondary to-accent md:left-1/2 md:-translate-x-px" />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <div
                key={i}
                className={`relative flex flex-col md:flex-row ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Dot */}
                <div className="absolute left-4 top-1 z-10 md:left-1/2 md:-translate-x-1/2">
                  <div
                    className={`h-3 w-3 rounded-full ${eraColors[exp.era]} ring-4 ring-background`}
                  />
                </div>

                {/* Content */}
                <div
                  className={`ml-12 md:ml-0 md:w-1/2 ${
                    i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <div className="rounded-xl border border-surface-light/50 bg-surface p-6 transition-colors hover:border-primary/30">
                    <div className="mb-1 flex items-center gap-2 text-xs">
                      <span
                        className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium text-white ${eraColors[exp.era]}`}
                      >
                        {eraLabels[exp.era]}
                      </span>
                      <span className="text-muted">{exp.period}</span>
                    </div>
                    <h4 className="text-lg font-semibold">{exp.title}</h4>
                    <p className="text-sm font-medium text-primary-light">
                      {exp.company}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
