import Link from "next/link";

export default function Hero() {
  return (
    <section className="site-container fade-in pt-14 pb-20 md:pt-24 md:pb-28">
      <div className="grid grid-cols-12 gap-x-6 gap-y-8">
        <div className="col-span-12 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <p className="label text-fg">Charlie Bittner-Rossmiller</p>
          <p className="label">
            Director of Product Management &middot; Willow Wealth &middot; New York, NY
          </p>
        </div>

        <h1 className="col-span-12 lg:col-span-11 font-display text-5xl">
          Enterprise AI, end to end,
          <span className="block">built on regulated fintech.</span>
        </h1>

        <p className="col-span-12 md:col-span-10 lg:col-span-8 max-w-lede text-lg text-muted">
          I run Willow Wealth&apos;s enterprise AI platform end to end: the company-wide Claude
          Enterprise rollout, go/no-go authority under a capability framework I ratified, extended,
          and operate, the measurement pipeline behind 90%+ weekly active use at peak across ~120
          seats, nine custom agents deployed org-wide with evals, and an agentic CI platform, co-developed with
          our platform engineering lead, that never merges its own work. As of late 2026 its agents
          also produce customer-facing work: copy and Figma-to-landing-page builds for top-of-funnel
          experiments. Underneath it, nine years on one SEC- and FINRA-regulated private-markets
          platform: engineer to Director, registered funds, managed portfolios, IRA custody and
          broker-dealer integrations, and a team of three PMs.
        </p>

        <div className="col-span-12 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link href="/case-studies/" className="btn btn-primary">
            View Case Studies
          </Link>
          <Link href="/projects/" className="btn btn-secondary">
            See What I&apos;ve Built
          </Link>
          <a
            href="https://www.linkedin.com/in/charliebr/"
            target="_blank"
            rel="noopener noreferrer"
            className="link print-url py-2 text-sm font-medium text-fg"
          >
            Connect on LinkedIn ↗
          </a>
        </div>
      </div>
    </section>
  );
}
