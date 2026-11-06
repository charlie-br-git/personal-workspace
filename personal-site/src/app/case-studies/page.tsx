import { getAllContent } from "@/lib/content";
import CaseStudyCard from "@/components/CaseStudyCard";
import SectionHeading from "@/components/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Case Studies",
  description: "Deep dives into regulated fintech product work, enterprise AI governance, and the decisions behind them.",
};

const PINNED = ["ira-custodial-integration", "fintech-alt-investments"];

export default function CaseStudiesPage() {
  // The regulated-products overview leads; the AI studies keep their date order after it.
  const all = getAllContent("case-studies");
  const caseStudies = [
    ...PINNED.flatMap((slug) => all.filter((c) => c.slug === slug)),
    ...all.filter((c) => !PINNED.includes(c.slug)),
  ];

  return (
    <div className="site-container fade-in py-16 md:py-24">
      <SectionHeading
        label="Case Studies"
        numbered={false}
        as="h1"
        aside={
          <p className="mt-4 max-w-lede text-lg text-muted">
            Breakdowns of real platform challenges — the product decisions, governance patterns, and architecture that made them work.
          </p>
        }
      >
        Regulated products and governed AI.
      </SectionHeading>
      <div className="mt-14 border-t border-rule">
        {caseStudies.map((meta) => (
          <CaseStudyCard key={meta.slug} meta={meta} headingLevel="h2" />
        ))}
      </div>
    </div>
  );
}
