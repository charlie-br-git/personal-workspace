import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import CaseStudyCard from "@/components/CaseStudyCard";
import BlogPostCard from "@/components/BlogPostCard";
import SectionHeading from "@/components/SectionHeading";
import { getContentBySlug } from "@/lib/content";
import Link from "next/link";

const FEATURED_CASE_STUDIES = [
  "ira-custodial-integration",
  "fintech-alt-investments",
  "owning-the-ai-ship-decision",
];
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
    <div className="numbered">
      <Hero />
      <About />
      <Experience />

      {/* Case studies */}
      <section className="site-container border-t border-rule py-20 md:py-28">
        <SectionHeading label="Case Studies">Selected deep dives.</SectionHeading>
        <div className="mt-12 border-t border-rule">
          {caseStudies.map((meta) => (
            <CaseStudyCard key={meta.slug} meta={meta} />
          ))}
        </div>
        <p className="mt-6 text-sm">
          <Link href="/case-studies/" className="link text-fg">
            View all →
          </Link>
        </p>
      </section>

      {/* Writing */}
      {blogPosts.length > 0 && (
        <section className="site-container border-t border-rule py-20 md:py-28">
          <SectionHeading label="Blog">Selected writing.</SectionHeading>
          <div className="mt-12 border-t border-rule">
            {blogPosts.map((meta) => (
              <BlogPostCard key={meta.slug} meta={meta} />
            ))}
          </div>
          <p className="mt-6 text-sm">
            <Link href="/blog/" className="link text-fg">
              View all →
            </Link>
          </p>
        </section>
      )}

      {/* Closing */}
      <section className="site-container border-t border-rule py-20 md:py-28">
        <div className="grid grid-cols-12 gap-x-6 gap-y-6">
          <h2 className="col-span-12 md:col-start-4 md:col-span-9 lg:col-span-8 font-display text-3xl">
            Let&apos;s compare notes.
          </h2>
          <p className="col-span-12 md:col-start-4 md:col-span-9 lg:col-span-7 max-w-lede text-lg text-muted">
            I&apos;m glad to talk about regulated fintech product strategy,
            enterprise AI governance and measurement, and what it takes to build
            products that hold up under scrutiny. LinkedIn is the fastest way to
            reach me.
          </p>
          <div className="col-span-12 md:col-start-4 md:col-span-9">
            <a
              href="https://www.linkedin.com/in/charliebr/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              Message me on LinkedIn
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
