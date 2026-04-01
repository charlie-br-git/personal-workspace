import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ContentMeta } from "@/lib/content";

export default function CaseStudyCard({ meta }: { meta: ContentMeta }) {
  return (
    <Link
      href={`/case-studies/${meta.slug}/`}
      className="group block rounded-xl bg-surface border border-border p-6 hover:border-primary/30 transition-colors"
    >
      <div className="flex flex-wrap gap-2 mb-3">
        {meta.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary-light"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary-light transition-colors">
        {meta.title}
      </h3>
      <p className="text-sm text-muted leading-relaxed mb-4">{meta.excerpt}</p>
      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-secondary">
        Read case study
        <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
      </span>
    </Link>
  );
}
