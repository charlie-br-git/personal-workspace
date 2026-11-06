import type { ReactNode } from "react";

/**
 * Section opener: a numbered small-caps label in the left three columns and
 * the heading in the right nine. The number comes from a CSS counter.
 */
export default function SectionHeading({
  label,
  numbered = true,
  children,
  aside,
  as: Tag = "h2",
}: {
  label: string;
  numbered?: boolean;
  children: ReactNode;
  aside?: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div className="grid grid-cols-12 gap-x-6 gap-y-3">
      <div className="col-span-12 md:col-span-3">
        <p className={`label ${numbered ? "section-num" : ""}`}>{label}</p>
      </div>
      <div className="col-span-12 md:col-span-9 lg:col-span-8">
        <Tag className={`font-display ${Tag === "h1" ? "text-4xl" : "text-3xl"}`}>{children}</Tag>
      </div>
      {aside && <div className="col-span-12 md:col-start-4 md:col-span-9 lg:col-span-8">{aside}</div>}
    </div>
  );
}
