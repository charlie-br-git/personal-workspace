import { getAllContent } from "@/lib/content";
import CaseStudyCard from "@/components/CaseStudyCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Deep dives into regulated fintech product work, enterprise AI governance, and the decisions behind them.",
};

const PINNED = "fintech-alt-investments";

export default function CaseStudiesPage() {
  // The regulated-products overview leads; the AI studies keep their date order after it.
  const all = getAllContent("case-studies");
  const caseStudies = [
    ...all.filter((c) => c.slug === PINNED),
    ...all.filter((c) => c.slug !== PINNED),
  ];

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <p className="text-sm font-medium tracking-wider text-secondary uppercase mb-3">Case Studies</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Regulated products and <span className="gradient-text">governed AI.</span>
      </h1>
      <p className="text-lg text-muted max-w-2xl mb-12">
        Breakdowns of real platform challenges — the product decisions, governance patterns, and architecture that made them work.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {caseStudies.map((meta) => (
          <CaseStudyCard key={meta.slug} meta={meta} />
        ))}
      </div>
    </div>
  );
}
