import { getAllContent, getContentBySlug } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { articleJsonLd, articleMetadata } from "@/lib/metadata";
import { mdxComponents } from "@/components/MdxComponents";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { Metadata } from "next";

export function generateStaticParams() {
  const caseStudies = getAllContent("case-studies");
  return caseStudies.map((cs) => ({ slug: cs.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = getContentBySlug("case-studies", slug);
  return articleMetadata({
    title: meta.title,
    description: meta.excerpt,
    path: `/case-studies/${slug}/`,
    date: meta.date,
  });
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { meta, content } = getContentBySlug("case-studies", slug);
  const jsonLd = articleJsonLd({
    type: "Article",
    title: meta.title,
    description: meta.excerpt,
    path: `/case-studies/${slug}/`,
    date: meta.date,
    tags: meta.tags,
  });

  return (
    <article className="site-container fade-in py-16 md:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="grid grid-cols-12 gap-x-6 gap-y-10">
        <header className="col-span-12 lg:col-span-10">
          <p className="no-print text-sm">
            <Link href="/case-studies/" className="link text-muted">
              ← Back to Case Studies
            </Link>
          </p>
          <p className="label mt-12 tabular-nums">
            Case study · <time dateTime={meta.date}>{formatDate(meta.date)}</time>
          </p>
          <h1 className="font-display mt-5 text-4xl">{meta.title}</h1>
          <p className="mt-6 max-w-lede text-lg text-muted">{meta.excerpt}</p>
          <ul className="tags mt-8" aria-label="Topics">
            {meta.tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
        </header>

        <div className="col-span-12 border-t border-rule" />

        <div className="prose col-span-12 md:col-start-2 md:col-span-10 lg:col-start-4 lg:col-span-8">
          <MDXRemote source={content} components={mdxComponents} />
        </div>
      </div>
    </article>
  );
}
