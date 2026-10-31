import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm font-medium tracking-wider text-primary-light uppercase mb-3">404</p>
      <h1 className="text-3xl md:text-4xl font-bold mb-4">Page not found</h1>
      <p className="text-lg text-muted mb-8">
        That page doesn&apos;t exist here. The case studies, writing and projects are all reachable from the home page.
      </p>
      <Link
        href="/"
        className="inline-flex items-center justify-center rounded-lg px-6 py-3 text-sm font-semibold text-white gradient-bg hover:opacity-90 transition-opacity"
      >
        Back to home
      </Link>
    </div>
  );
}
