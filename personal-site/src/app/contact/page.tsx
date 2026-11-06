import SectionHeading from "@/components/SectionHeading";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Connect with Charlie Bittner-Rossmiller, Director of Product Management in regulated fintech, on LinkedIn or GitHub.",
};

const links = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/charliebr/",
    description: "The best way to reach me — connect or send a message",
  },
  {
    label: "GitHub",
    href: "https://github.com/charlie-br-git",
    description: "Check out what I'm building",
  },
];

export default function ContactPage() {
  return (
    <div className="site-container fade-in py-16 md:py-24">
      <SectionHeading
        label="Contact"
        numbered={false}
        as="h1"
        aside={
          <p className="mt-4 max-w-lede text-lg text-muted">
            I&apos;m always interested in conversations about regulated fintech product
            strategy, enterprise AI adoption and governance, or the intersection of product and engineering leadership.
            A LinkedIn message or connection note with one line about what you&apos;re working on is all it takes.
          </p>
        }
      >
        Let&apos;s connect.
      </SectionHeading>

      <ul className="mt-14 border-t border-rule">
        {links.map((link) => (
          <li key={link.label} className="grid grid-cols-12 gap-x-6 gap-y-2 border-b border-rule py-8 md:py-10">
            <div className="col-span-12 md:col-span-3">
              <h2 className="font-display text-2xl">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-title print-url"
                >
                  {link.label} ↗
                </a>
              </h2>
            </div>
            <p className="col-span-12 md:col-span-9 lg:col-span-6 self-center text-md text-muted">
              {link.description}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
