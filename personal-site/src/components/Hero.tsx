export default function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden">
      {/* Subtle ambient glow */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-primary/8 rounded-full blur-[128px]" />
      <div className="absolute bottom-1/4 -right-48 w-96 h-96 bg-accent/8 rounded-full blur-[128px]" />

      <div className="relative mx-auto max-w-5xl px-6 py-24">
        <p className="text-sm font-medium tracking-wider text-primary-light uppercase mb-6">
          AI Platform Engineering &amp; Product Leadership
        </p>
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
          Building AI Platforms<br />
          <span className="gradient-text">That Ship.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted max-w-2xl leading-relaxed mb-10">
          I bridge product strategy and engineering execution to deploy enterprise
          AI systems — from MCP architecture and RBAC to cross-functional tooling
          that teams actually use.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="/personal-workspace/case-studies/"
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white gradient-bg hover:opacity-90 transition-opacity"
          >
            View Case Studies
          </a>
          <a
            href="/personal-workspace/blog/"
            className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-foreground border border-border hover:bg-surface transition-colors"
          >
            Read the Blog
          </a>
        </div>
      </div>
    </section>
  );
}
