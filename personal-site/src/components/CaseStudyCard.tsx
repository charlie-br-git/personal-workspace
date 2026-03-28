import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ContentMeta } from "@/lib/content";

export default function CaseStudyCard({ meta }: { meta: ContentMeta }) {
  return (
    <Link
      href={`/case-studies/${meta.slug}/`}
      className="group gradient-border block rounded-xl bg-surface p-6 transition-colors hover:bg-surface-light"
    >
      <div className="mb-3 flex flex-wrap gap-2">
        {meta.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary-light"
          >
            {tag}
          </span>
        ))}
      </div>
      <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary-light">
        {meta.title}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-muted">{meta.excerpt}</p>
      <div className="flex items-center gap-2 text-sm font-medium text-secondary">
        Read case study
        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
