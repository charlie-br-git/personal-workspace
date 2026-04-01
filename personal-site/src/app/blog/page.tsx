import { getAllContent } from "@/lib/content";
import BlogPostCard from "@/components/BlogPostCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Writing about AI platform engineering, MCP architecture, enterprise Claude deployment, and bridging product and engineering.",
};

export default function BlogPage() {
  const posts = getAllContent("blog");

  return (
    <div className="mx-auto max-w-6xl px-6 py-24">
      <h1 className="mb-4 text-sm font-semibold tracking-widest text-accent uppercase">
        Blog
      </h1>
      <h2 className="mb-4 text-4xl font-bold md:text-5xl">
        Thinking out loud about{" "}
        <span className="gradient-text">AI platforms.</span>
      </h2>
      <p className="mb-12 max-w-2xl text-lg text-muted">
        Practical insights from building enterprise AI systems — architecture
        patterns, security decisions, and lessons learned.
      </p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((meta) => (
          <BlogPostCard key={meta.slug} meta={meta} />
        ))}
      </div>
    </div>
  );
}
