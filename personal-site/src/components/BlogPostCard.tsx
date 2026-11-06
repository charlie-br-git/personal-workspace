import Link from "next/link";
import type { ContentMeta } from "@/lib/content";
import { formatDate } from "@/lib/format";

/** One editorial listing row: date and reading time, title, summary, tags. */
export default function BlogPostCard({
  meta,
  headingLevel: Heading = "h3",
}: {
  meta: ContentMeta;
  /** h2 on index pages (under the page h1), h3 on the home page (under a section h2). */
  headingLevel?: "h2" | "h3";
}) {
  const href = `/blog/${meta.slug}/`;
  return (
    <article className="grid grid-cols-12 gap-x-6 gap-y-2 border-b border-rule py-7 md:py-8">
      <div className="col-span-12 md:col-span-3 text-sm tabular-nums text-muted">
        <time dateTime={meta.date} className="block">
          {formatDate(meta.date)}
        </time>
        {meta.readingTime && <span className="block">{meta.readingTime}</span>}
      </div>
      <div className="col-span-12 md:col-span-9 lg:col-span-8">
        <Heading className="font-display text-xl">
          <Link href={href} className="link-title">
            {meta.title}
          </Link>
        </Heading>
        <p className="mt-2 max-w-prose text-md text-muted">{meta.excerpt}</p>
        <div className="mt-4 space-y-4">
          <ul className="tags" aria-label="Topics">
            {meta.tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
          <Link href={href} className="link inline-block text-sm text-fg">
            Read more →
          </Link>
        </div>
      </div>
    </article>
  );
}
