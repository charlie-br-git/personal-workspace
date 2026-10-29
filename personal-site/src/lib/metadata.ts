import type { Metadata } from "next";

const siteUrl = "https://charlie-br-git.github.io/personal-workspace";

export const siteMetadata: Metadata = {
  title: {
    default:
      "Charlie Bittner-Rossmiller — Product Leadership in Regulated Fintech & Applied AI",
    template: "%s | Charlie Bittner-Rossmiller",
  },
  description:
    "Director of Product Management in regulated private-markets fintech. Led a company-wide Claude Enterprise rollout. Writing about MCP architecture, AI governance, and bridging product and engineering.",
  keywords: [
    "director of product management",
    "fintech product management",
    "alternative investments",
    "private markets",
    "SEC FINRA regulated products",
    "enterprise AI adoption",
    "MCP architecture",
    "AI governance",
    "Claude deployment",
  ],
  authors: [{ name: "Charlie Bittner-Rossmiller" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Charlie Bittner-Rossmiller",
    title:
      "Charlie Bittner-Rossmiller — Product Leadership in Regulated Fintech & Applied AI",
    description:
      "Director of Product Management in regulated private-markets fintech. Led a company-wide Claude Enterprise rollout. Writing about MCP architecture, AI governance, and bridging product and engineering.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Charlie Bittner-Rossmiller — Product Leadership in Regulated Fintech & Applied AI",
    description:
      "Regulated fintech product leadership and enterprise AI adoption. Writing about MCP architecture and AI governance.",
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
      "Product Management",
      "Fintech",
      "Alternative Investments",
      "Private Markets",
      "SEC and FINRA Regulated Products",
      "Enterprise AI Adoption",
      "AI Governance",
      "Model Context Protocol (MCP)",
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
