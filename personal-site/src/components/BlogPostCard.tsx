import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { ContentMeta } from "@/lib/content";

export default function BlogPostCard({ meta }: { meta: ContentMeta }) {
  return (
    <Link
      href={`/blog/${meta.slug}/`}
      className="group block rounded-xl border border-surface-light/50 bg-surface p-6 transition-colors hover:border-primary/30"
    >
      <div className="mb-3 flex items-center gap-3 text-xs text-muted">
        <time>{meta.date}</time>
        {meta.readingTime && (
          <>
            <span>&#183;</span>
            <span className="flex items-center gap-1">
              <Clock size={12} />
              {meta.readingTime}
            </span>
          </>
        )}
      </div>
      <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary-light">
        {meta.title}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-muted">{meta.excerpt}</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {meta.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent-light"
          >
            {tag}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-2 text-sm font-medium text-secondary">
        Read more
        <ArrowRight
          size={14}
          className="transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}
