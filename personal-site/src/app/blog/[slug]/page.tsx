import { getAllContent, getContentBySlug } from "@/lib/content";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ArrowLeft, Clock } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

export function generateStaticParams() {
  const posts = getAllContent("blog");
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = getContentBySlug("blog", slug);
  return {
    title: meta.title,
    description: meta.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { meta, content } = getContentBySlug("blog", slug);

  return (
    <article className="mx-auto max-w-3xl px-6 py-24">
      <Link
        href="/blog/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <ArrowLeft size={14} />
        Back to Blog
      </Link>

      <div className="mb-4 flex items-center gap-3 text-sm text-muted">
        <time>{meta.date}</time>
        {meta.readingTime && (
          <>
            <span>&#183;</span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {meta.readingTime}
            </span>
          </>
        )}
      </div>

      <h1 className="mb-4 text-4xl font-bold leading-tight md:text-5xl">
        {meta.title}
      </h1>

      <div className="mb-8 flex flex-wrap gap-2">
        {meta.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent-light"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="section-divider mb-12" />

      <div className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted prose-p:leading-relaxed prose-a:text-primary-light prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-ul:text-muted prose-ol:text-muted prose-li:text-muted prose-code:text-accent-light prose-code:bg-surface prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none prose-pre:bg-surface prose-pre:border prose-pre:border-surface-light/50 prose-h2:mt-12 prose-h2:mb-4 prose-h3:mt-8 prose-h3:mb-3 prose-blockquote:border-primary prose-blockquote:text-muted">
        <MDXRemote source={content} />
      </div>
    </article>
  );
}
