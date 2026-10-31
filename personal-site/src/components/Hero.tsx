import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex items-center overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/8 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent/8 rounded-full blur-[128px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
        <p className="text-base md:text-lg font-semibold text-foreground mb-2">
          Charlie Bittner-Rossmiller
        </p>
        <p className="text-sm font-medium tracking-wider text-primary-light uppercase mb-6">
          Director of Product Management &middot; Willow Wealth &middot; New York, NY
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          Product leadership for regulated fintech,
          <span className="gradient-text block">built for the AI era.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed mb-10">
          Engineer to Director on one SEC- and FINRA-regulated private-markets platform since
          2017, now managing three PMs. Since mid-2026 I own AI enablement, governance, and
          infrastructure org-wide: go/no-go authority under a capability framework I ratified,
          extended, and operate; the measurement pipeline behind 90%+ weekly active adoption at
          peak across ~120 internal seats; and a release gate for AI and agentic deployments.
        </p>
        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/case-studies/"
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white gradient-bg hover:opacity-90 transition-opacity"
          >
            View Case Studies
          </Link>
          <Link
            href="/projects/"
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-foreground border border-border hover:bg-surface transition-colors"
          >
            See What I&apos;ve Built
          </Link>
          <a
            href="https://www.linkedin.com/in/charliebr/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-2 py-3 text-sm font-semibold text-foreground underline-offset-4 hover:underline"
          >
            Connect on LinkedIn <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
