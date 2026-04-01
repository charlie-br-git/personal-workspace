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

      {/* Case Studies */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex items-end justify-between mb-8">
            <div>
              <p className="text-sm font-medium tracking-wider text-secondary uppercase mb-3">
                Case Studies
              </p>
              <h2 className="text-3xl md:text-4xl font-bold">
                Recent <span className="gradient-text">deep dives.</span>
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
                  Latest <span className="gradient-text">thinking.</span>
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
            Interested in{" "}
            <span className="gradient-text">working together?</span>
          </h2>
          <p className="text-lg text-muted max-w-xl mx-auto mb-8">
            I&apos;m always up for conversations about AI platform engineering,
            product strategy, or the future of enterprise AI.
          </p>
          <a
            href="/personal-workspace/contact/"
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white gradient-bg hover:opacity-90 transition-opacity"
          >
            Let&apos;s Connect
          </a>
        </div>
      </section>
    </>
  );
}
