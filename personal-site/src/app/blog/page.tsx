import { getAllContent } from "@/lib/content";
import BlogPostCard from "@/components/BlogPostCard";
import SectionHeading from "@/components/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Writing about enterprise AI adoption, MCP architecture, AI governance, and bridging product and engineering.",
};

export default function BlogPage() {
  const posts = getAllContent("blog");

  return (
    <div className="site-container fade-in py-16 md:py-24">
      <SectionHeading
        label="Blog"
        numbered={false}
        as="h1"
        aside={
          <p className="mt-4 max-w-lede text-lg text-muted">
            Practical insights from building enterprise AI systems — architecture patterns, security decisions, and lessons learned.
          </p>
        }
      >
        Thinking out loud about governed AI.
      </SectionHeading>
      <div className="mt-14 border-t border-rule">
        {posts.map((meta) => (
          <BlogPostCard key={meta.slug} meta={meta} headingLevel="h2" />
        ))}
      </div>
    </div>
  );
}
