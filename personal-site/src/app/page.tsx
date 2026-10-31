import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import CaseStudyCard from "@/components/CaseStudyCard";
import BlogPostCard from "@/components/BlogPostCard";
import { getContentBySlug } from "@/lib/content";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const FEATURED_CASE_STUDIES = ["fintech-alt-investments", "owning-the-ai-ship-decision"];
const FEATURED_POSTS = [
  "measuring-enterprise-ai-value",
  "instrumenting-ai-in-a-regulated-org",
  "building-a-triage-agent-on-existing-datadog-alerts",
];

export default function Home() {
  // Curated, not date-sorted: the regulated-products story leads, then the AI release gate.
  const caseStudies = FEATURED_CASE_STUDIES.map(
    (slug) => getContentBySlug("case-studies", slug).meta
  );
  const blogPosts = FEATURED_POSTS.map((slug) => getContentBySlug("blog", slug).meta);

  return (
    <>
      <Hero />
      <div className="section-divider" />

      <About />
      <div className="section-divider" />

      <Experience />
      <div className="section-divider" />

      {/* Case Studies */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-medium tracking-wider text-secondary uppercase mb-3">
                Case Studies
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">
                Selected <span className="gradient-text">deep dives.</span>
              </h2>
            </div>
            <Link
              href="/case-studies/"
              className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-secondary hover:text-secondary/80 transition-colors"
            >
              View all <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {caseStudies.map((meta) => (
              <CaseStudyCard key={meta.slug} meta={meta} />
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Blog */}
      {blogPosts.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-5xl px-6">
            <div className="flex items-end justify-between mb-8">
              <div>
                <p className="text-sm font-medium tracking-wider text-accent uppercase mb-3">
                  Blog
                </p>
                <h2 className="text-3xl md:text-4xl font-bold">
                  Selected <span className="gradient-text">writing.</span>
                </h2>
              </div>
              <Link
                href="/blog/"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-accent hover:text-accent/80 transition-colors"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((meta) => (
                <BlogPostCard key={meta.slug} meta={meta} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="section-divider" />

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Let&apos;s <span className="gradient-text">compare notes.</span>
          </h2>
          <p className="text-lg text-muted max-w-xl mx-auto mb-8">
            I&apos;m glad to talk about regulated fintech product strategy,
            enterprise AI governance and measurement, and what it takes to build
            products that hold up under scrutiny. LinkedIn is the fastest way to
            reach me.
          </p>
          <a
            href="https://www.linkedin.com/in/charliebr/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white gradient-bg hover:opacity-90 transition-opacity"
          >
            Message me on LinkedIn
          </a>
        </div>
      </section>
    </>
  );
}
