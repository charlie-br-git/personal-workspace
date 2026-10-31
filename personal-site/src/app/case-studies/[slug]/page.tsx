import { getAllContent, getContentBySlug } from "@/lib/content";
import { formatDate } from "@/lib/format";
import { articleJsonLd, articleMetadata } from "@/lib/metadata";
import { mdxComponents } from "@/components/MdxComponents";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft } from "lucide-react";
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
    <article className="mx-auto max-w-3xl px-6 py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/case-studies/"
        className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft size={14} /> Back to Case Studies
      </Link>

      <div className="flex items-center gap-3 text-sm text-muted mb-4">
        <span>Case study</span>
        <span>·</span>
        <time dateTime={meta.date}>{formatDate(meta.date)}</time>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {meta.tags.map((tag) => (
          <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary-light">
            {tag}
          </span>
        ))}
      </div>

      <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">{meta.title}</h1>
      <p className="text-lg text-muted mb-8">{meta.excerpt}</p>

      <div className="section-divider mb-10" />

      <div className="prose-custom">
        <MDXRemote source={content} components={mdxComponents} />
      </div>
    </article>
  );
}
