"use client";

import { useEffect, useState } from "react";

type Scheme = "light" | "dark";

function currentScheme(): Scheme {
  const pinned = document.documentElement.getAttribute("data-theme");
  if (pinned === "light" || pinned === "dark") return pinned;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function ThemeToggle() {
  const [scheme, setScheme] = useState<Scheme | null>(null);

  useEffect(() => {
    setScheme(currentScheme());
  }, []);

  const next: Scheme = scheme === "dark" ? "light" : "dark";

  function toggle() {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("color-scheme", next);
    } catch {
      // Storage may be unavailable; the scheme still applies for this page.
    }
    setScheme(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={scheme ? `Switch to ${next} colour scheme` : "Toggle colour scheme"}
      title={scheme ? `Switch to ${next} colour scheme` : "Toggle colour scheme"}
      className="no-print inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:text-fg"
    >
      {/* Half-filled disc: the only glyph on the site. */}
      <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
        <circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" strokeWidth="1.25" />
        <path d="M8 1.5a6.5 6.5 0 0 1 0 13z" fill="currentColor" />
      </svg>
    </button>
  );
}
