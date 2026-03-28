import { getAllContent } from "@/lib/content";
import CaseStudyCard from "@/components/CaseStudyCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Deep dives into enterprise AI deployment, fintech platform architecture, and the product decisions behind them.",
};

export default function CaseStudiesPage() {
  const caseStudies = getAllContent("case-studies");

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="mb-4 text-sm font-semibold tracking-widest text-secondary uppercase">
        Case Studies
      </h1>
      <h2 className="mb-4 text-4xl font-bold md:text-5xl">
        Building at the intersection of{" "}
        <span className="gradient-text">AI and product.</span>
      </h2>
      <p className="mb-12 max-w-2xl text-lg text-muted">
        Detailed breakdowns of real platform challenges — the architecture
        decisions, security patterns, and product strategies that made them work.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {caseStudies.map((meta) => (
          <CaseStudyCard key={meta.slug} meta={meta} />
        ))}
      </div>
    </div>
  );
}
