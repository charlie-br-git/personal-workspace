export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/8 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent/8 rounded-full blur-[128px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-24">
        <p className="text-sm font-medium tracking-wider text-primary-light uppercase mb-6">
          Product Leadership &middot; Regulated Fintech &middot; Applied AI
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          Product leadership for regulated fintech,<br />
          <span className="gradient-text">built for the AI era.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed mb-10">
          Director of Product at Willow Wealth. Eight years building and launching private-markets
          products in an SEC- and FINRA-regulated environment — and the hands-on builder who led our company-wide Claude
          Enterprise rollout, from MCP integrations to agent governance.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="/personal-workspace/case-studies/"
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white gradient-bg hover:opacity-90 transition-opacity"
          >
            View Case Studies
          </a>
          <a
            href="/personal-workspace/projects/"
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-foreground border border-border hover:bg-surface transition-colors"
          >
            See What I&apos;ve Built
          </a>
        </div>
      </div>
    </section>
  );
}
