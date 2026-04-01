import { getAllContent } from "@/lib/content";
import CaseStudyCard from "@/components/CaseStudyCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Deep dives into enterprise AI deployment, fintech platform architecture, and the product decisions behind them.",
};

export default function CaseStudiesPage() {
  const caseStudies = getAllContent("case-studies");

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <p className="text-sm font-medium tracking-wider text-secondary uppercase mb-3">Case Studies</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Building at the intersection of <span className="gradient-text">AI and product.</span>
      </h1>
      <p className="text-lg text-muted max-w-2xl mb-12">
        Detailed breakdowns of real platform challenges — the architecture decisions, security patterns, and product strategies that made them work.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {caseStudies.map((meta) => (
          <CaseStudyCard key={meta.slug} meta={meta} />
        ))}
      </div>
    </div>
  );
}
