import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/metadata";

// The study moved to /case-studies/ai-release-readiness/ on its retitle.
// Static export has no server redirects, so this stub sends visitors on
// with a meta refresh and points search engines at the new URL.
const target = `${siteUrl}/case-studies/ai-release-readiness/`;

export const metadata: Metadata = {
  title: "AI Release Readiness in a Regulated Firm",
  robots: { index: false, follow: true },
  alternates: { canonical: target },
};

export default function MovedCaseStudy() {
  return (
    <div className="site-container py-16">
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <p className="text-lg text-muted">
        This case study has moved:{" "}
        <Link href="/case-studies/ai-release-readiness/">AI Release Readiness in a Regulated Firm</Link>.
      </p>
    </div>
  );
}
