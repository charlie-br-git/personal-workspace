import type { Metadata } from "next";
import Link from "next/link";
import { siteUrl } from "@/lib/metadata";

// The post moved to /blog/making-a-design-system-ai-readable/ when its title changed.
// Static export has no server redirects, so this stub sends visitors on
// with a meta refresh and points search engines at the new URL.
const target = `${siteUrl}/blog/making-a-design-system-ai-readable/`;

export const metadata: Metadata = {
  title: "Making a Design System AI-Readable: The Whole Library, One Publish Decision",
  robots: { index: false, follow: true },
  alternates: { canonical: target },
};

export default function MovedPost() {
  return (
    <div className="site-container py-16">
      <meta httpEquiv="refresh" content={`0; url=${target}`} />
      <p className="text-lg text-muted">
        This post has moved:{" "}
        <Link href="/blog/making-a-design-system-ai-readable/" className="link text-fg">
          Making a Design System AI-Readable
        </Link>
        .
      </p>
    </div>
  );
}
