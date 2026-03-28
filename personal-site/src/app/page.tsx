import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import CaseStudyCard from "@/components/CaseStudyCard";
import BlogPostCard from "@/components/BlogPostCard";
import { getAllContent } from "@/lib/content";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const caseStudies = getAllContent("case-studies").slice(0, 2);
  const blogPosts = getAllContent("blog").slice(0, 3);

  return (
    <>
      <Hero />

      <div className="section-divider" />

      <About />

      <div className="section-divider" />

      <Experience />

      <div className="section-divider" />

      {/* Featured Case Studies */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="mb-4 text-sm font-semibold tracking-widest text-secondary uppercase">
            Case Studies
          </h2>
          <div className="mb-8 flex items-end justify-between">
            <h3 className="text-3xl font-bold md:text-4xl">
              Recent <span className="gradient-text">deep dives.</span>
            </h3>
            <Link
              href="/case-studies/"
              className="hidden items-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-secondary/80 md:flex"
            >
              View all
              <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {caseStudies.map((meta) => (
              <CaseStudyCard key={meta.slug} meta={meta} />
            ))}
          </div>
          <Link
            href="/case-studies/"
            className="mt-8 flex items-center justify-center gap-2 text-sm font-medium text-secondary transition-colors hover:text-secondary/80 md:hidden"
          >
            View all case studies
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <div className="section-divider" />

      {/* Latest Blog Posts */}
      {blogPosts.length > 0 && (
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="mb-4 text-sm font-semibold tracking-widest text-accent uppercase">
              Blog
            </h2>
            <div className="mb-8 flex items-end justify-between">
              <h3 className="text-3xl font-bold md:text-4xl">
                Latest <span className="gradient-text">thinking.</span>
              </h3>
              <Link
                href="/blog/"
                className="hidden items-center gap-2 text-sm font-medium text-accent transition-colors hover:text-accent/80 md:flex"
              >
                View all
                <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((meta) => (
                <BlogPostCard key={meta.slug} meta={meta} />
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="section-divider" />

      {/* Contact CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            Interested in{" "}
            <span className="gradient-text">working together?</span>
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-lg text-muted">
            I&apos;m always up for conversations about AI platform engineering,
            product strategy, or the future of enterprise AI.
          </p>
          <a
            href="/contact/"
            className="gradient-bg inline-flex items-center justify-center rounded-lg px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            Let&apos;s Connect
          </a>
        </div>
      </section>
    </>
  );
}
