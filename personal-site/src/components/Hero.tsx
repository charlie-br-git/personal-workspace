import { ArrowDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 gradient-bg animate-gradient opacity-10" />
      <div className="absolute top-20 -left-32 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
      <div className="absolute top-40 -right-32 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute -bottom-20 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-24">
        <p className="mb-4 text-sm font-semibold tracking-widest text-accent uppercase">
          AI Platform Engineering & Product Leadership
        </p>
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight md:text-7xl">
          Building AI Platforms
          <br />
          <span className="gradient-text">That Ship.</span>
        </h1>
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-muted md:text-xl">
          I bridge product strategy and engineering execution to deploy enterprise
          AI systems — from MCP architecture and RBAC to cross-functional tooling
          that teams actually use.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <a
            href="/case-studies/"
            className="gradient-bg inline-flex items-center justify-center rounded-lg px-8 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            View Case Studies
          </a>
          <a
            href="/blog/"
            className="gradient-border inline-flex items-center justify-center rounded-lg px-8 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface"
          >
            Read the Blog
          </a>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-muted">
        <ArrowDown size={24} />
      </div>
    </section>
  );
}
