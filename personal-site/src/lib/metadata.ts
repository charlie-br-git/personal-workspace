import type { Metadata } from "next";

const siteUrl = "https://charliebr.com";

export const siteMetadata: Metadata = {
  title: {
    default:
      "Charlie Bittner-Rossmiller — AI Platform Engineering & Product Leadership",
    template: "%s | Charlie Bittner-Rossmiller",
  },
  description:
    "Director of Product Management building enterprise AI platforms. Writing about MCP architecture, Claude deployment, and bridging product and engineering.",
  keywords: [
    "AI platform engineer",
    "enterprise AI",
    "MCP architecture",
    "AI product leader",
    "Claude deployment",
    "fintech product management",
    "AI platform engineering",
  ],
  authors: [{ name: "Charlie Bittner-Rossmiller" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Charlie Bittner-Rossmiller",
    title:
      "Charlie Bittner-Rossmiller — AI Platform Engineering & Product Leadership",
    description:
      "Director of Product Management building enterprise AI platforms. Writing about MCP architecture, Claude deployment, and bridging product and engineering.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Charlie Bittner-Rossmiller — AI Platform Engineering",
    description:
      "Building enterprise AI platforms. Writing about MCP architecture, Claude deployment, and bridging product and engineering.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generateJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Charlie Bittner-Rossmiller",
    jobTitle: "Director of Product Management",
    worksFor: {
      "@type": "Organization",
      name: "Willow Wealth",
    },
    knowsAbout: [
      "AI Platform Engineering",
      "Model Context Protocol (MCP)",
      "Enterprise AI Deployment",
      "Product Management",
      "Fintech",
      "Alternative Investments",
      "RBAC Systems",
      "API Architecture",
    ],
    alumniOf: {
      "@type": "EducationalOrganization",
      name: "Washington University in St. Louis",
    },
    sameAs: [
      "https://www.linkedin.com/in/charliebr/",
      "https://github.com/charlie-br-git",
    ],
    url: siteUrl,
  };
}
