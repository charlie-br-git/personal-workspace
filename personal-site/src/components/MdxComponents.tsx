import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

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

export const mdxComponents = {
  a: MdxAnchor,
};
