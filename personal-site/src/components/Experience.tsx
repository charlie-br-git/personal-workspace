const experiences = [
  {
    era: "ai" as const,
    period: "Mar 2024 — Present",
    title: "Director of Product Management",
    company: "Willow Wealth (fka Yieldstreet)",
    description:
      "Own AI enablement, governance, and infrastructure org-wide (since mid-2026): go/no-go authority for AI and agentic deployments under a three-tier capability framework I ratified, extended, and operate; measurement pipeline behind 90%+ weekly active use across ~120 seats; agentic CI platform, co-developed with the platform engineering lead, that never auto-merges. Product: Managed Portfolios (YS360, $10M+ AUM), registered funds ($6M AUM in two months), the Atomic Invest partnership, and a distribution-model shift co-driven with the founder. Manage three PMs.",
  },
  {
    era: "product" as const,
    period: "Sep 2021 — Mar 2024",
    title: "Senior Product Manager",
    company: "Yieldstreet",
    description:
      "Retirement-account API integration that cut account setup from 31 days to 7 and eliminated 1,200+ hours of annual manual work. Established the product discovery process and first user research, leading to a dedicated UX research team. Data-driven build-vs-buy frameworks for the retirement platform.",
  },
  {
    era: "product" as const,
    period: "May 2018 — Sep 2021",
    title: "Product Manager",
    company: "Yieldstreet",
    description:
      "Led the first 0-to-1 product: a savings account that scaled to 19K accounts and $100M+ in deposits within six months. Built an internal no-code admin platform for audience segmentation, A/B tests, and campaign automation. Partnered with the CTO on the monolith-to-SOA platform strategy.",
  },
  {
    era: "engineering" as const,
    period: "May 2017 — May 2018",
    title: "Software Engineer (employee #13)",
    company: "Yieldstreet",
    description:
      "Led the frontend migration from Angular to React; designed the Banking-as-a-Service integration for account onboarding and funding.",
  },
  {
    era: "engineering" as const,
    period: "Feb 2016 — Jan 2017",
    title: "Junior Software Engineer (employee #5)",
    company: "Self Lender",
    description:
      "First engineering role after General Assembly (2015), at a regulated credit-building fintech. Built MVP account workflows that scaled from an 11-user pilot to 25K+ active accounts.",
  },
  {
    era: "foundation" as const,
    period: "2011 — 2015",
    title: "Associate \u2192 Manager, Business Solutions",
    company: "Robin Hood Foundation; New Leaders for New Schools",
    description:
      "Robin Hood (2011–2014): Salesforce integration and automated processing for ~3,500 annual donations. New Leaders (2014–2015): requirements, roadmaps, and platforms for 150 staff and 600 participants across 13 cities.",
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
