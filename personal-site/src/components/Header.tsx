"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/case-studies/", label: "Case Studies" },
  { href: "/projects/", label: "Projects" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Contact" },
];

const linkedInUrl = "https://www.linkedin.com/in/charliebr/";

function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname() ?? "/";

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bg/95 backdrop-blur-sm print:static">
      <nav className="site-container flex h-16 items-center justify-between" aria-label="Primary">
        <Link
          href="/"
          aria-label="Charlie Bittner-Rossmiller, home"
          className="font-display text-lg text-fg no-underline"
        >
          <span className="hidden sm:inline">Charlie Bittner-Rossmiller</span>
          <span className="sm:hidden">Charlie B-R</span>
        </Link>

        {/* Desktop */}
        <div className="no-print hidden md:flex items-center gap-7">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="link-nav text-sm"
              aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link text-sm text-fg"
          >
            LinkedIn ↗
          </a>
          <ThemeToggle />
        </div>

        {/* Phone */}
        <div className="no-print flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className="label no-print px-2 py-2 text-fg"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="site-menu"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {isOpen && (
        <div id="site-menu" className="border-t border-rule bg-bg md:hidden">
          <div className="site-container flex flex-col gap-1 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="link-nav inline-block self-start py-2 text-base"
                aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link mt-2 self-start py-2 text-base text-fg"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
