"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/case-studies/", label: "Case Studies" },
  { href: "/projects/", label: "Projects" },
  { href: "/blog/", label: "Blog" },
  { href: "/contact/", label: "Contact" },
];

const linkedInUrl = "https://www.linkedin.com/in/charliebr/";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-border">
      <nav className="mx-auto max-w-5xl flex items-center justify-between px-6 h-16">
        <Link
          href="/"
          aria-label="Charlie Bittner-Rossmiller, home"
          className="text-lg font-bold tracking-tight"
        >
          <span className="gradient-text hidden sm:inline">Charlie Bittner-Rossmiller</span>
          <span className="gradient-text sm:hidden">Charlie B-R</span>
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-foreground hover:text-primary-light transition-colors"
          >
            LinkedIn ↗
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-muted hover:text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-surface border-t border-border">
          <div className="flex flex-col px-6 py-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-foreground transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-foreground hover:text-primary-light transition-colors"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
