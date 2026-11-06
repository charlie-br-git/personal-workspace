import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
  alternates: { canonical: null },
};

export default function NotFound() {
  return (
    <div className="site-container fade-in py-16 md:py-24">
      <SectionHeading
        label="404"
        numbered={false}
        as="h1"
        aside={
          <>
            <p className="mt-4 max-w-lede text-lg text-muted">
              That page doesn&apos;t exist here. The case studies, writing and projects are all reachable from the home page.
            </p>
            <p className="mt-8">
              <Link href="/" className="btn btn-primary">
                Back to home
              </Link>
            </p>
          </>
        }
      >
        Page not found
      </SectionHeading>
    </div>
  );
}
