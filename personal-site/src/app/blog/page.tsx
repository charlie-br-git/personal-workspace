import { getAllContent } from "@/lib/content";
import BlogPostCard from "@/components/BlogPostCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing about AI platform engineering, MCP architecture, enterprise Claude deployment, and bridging product and engineering.",
};

export default function BlogPage() {
  const posts = getAllContent("blog");

  return (
    <div className="mx-auto max-w-5xl px-6 py-24">
      <p className="text-sm font-medium tracking-wider text-accent uppercase mb-3">Blog</p>
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        Thinking out loud about <span className="gradient-text">AI platforms.</span>
      </h1>
      <p className="text-lg text-muted max-w-2xl mb-12">
        Practical insights from building enterprise AI systems — architecture patterns, security decisions, and lessons learned.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((meta) => (
          <BlogPostCard key={meta.slug} meta={meta} />
        ))}
      </div>
    </div>
  );
}
