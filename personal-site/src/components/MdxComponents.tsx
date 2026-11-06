import Link from "next/link";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";

// Internal links must go through next/link so the configured basePath is
// applied in the static export; plain <a> tags from markdown skip it.
function MdxAnchor({ href = "", children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href.startsWith("/")) {
    return (
      <Link href={href} {...props}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
}

// The closing "Context:" paragraph is set as a footnote, under a hairline.
function MdxParagraph({ children, ...props }: HTMLAttributes<HTMLParagraphElement>) {
  const first = Array.isArray(children) ? children[0] : children;
  const isNote = typeof first === "string" && first.startsWith("Context:");
  return (
    <p className={isNote ? "prose-note" : undefined} {...props}>
      {children}
    </p>
  );
}

export const mdxComponents = {
  a: MdxAnchor,
  p: MdxParagraph,
};
