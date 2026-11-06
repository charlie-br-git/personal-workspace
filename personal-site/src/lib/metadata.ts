import type { Metadata } from "next";

export const siteUrl = "https://charlie-br-git.github.io/personal-workspace";
export const siteName = "Charlie Bittner-Rossmiller";
export const personId = `${siteUrl}/#person`;

const defaultTitle = "Charlie Bittner-Rossmiller | Director of Product Management";
const defaultDescription =
  "Director of Product Management at Willow Wealth, New York. Runs the enterprise AI platform end to end: rollout, governance, measurement, agents. Regulated fintech.";

// Absolute URL on purpose: Next ignores metadataBase for absolute URLs, which
// sidesteps the basePath being applied twice to a relative image path.
export const ogImage = {
  url: `${siteUrl}/og-image.png`,
  width: 1200,
  height: 630,
  alt: "Charlie Bittner-Rossmiller — Director of Product Management, regulated fintech and applied AI",
};

export const siteMetadata: Metadata = {
  metadataBase: new URL(`${siteUrl}/`),
  title: {
    default: defaultTitle,
    template: "%s | Charlie Bittner-Rossmiller",
  },
  description: defaultDescription,
  keywords: [
    "director of product management",
    "fintech product management",
    "alternative investments",
    "private markets",
    "SEC FINRA regulated products",
    "registered funds",
    "custodial integrations",
    "enterprise AI adoption",
    "AI governance",
    "MCP architecture",
    "Claude Enterprise",
    "New York",
  ],
  authors: [{ name: siteName, url: `${siteUrl}/` }],
  creator: siteName,
  alternates: { canonical: "./" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "./",
    siteName,
    title: "Charlie Bittner-Rossmiller — Enterprise AI Platform Leadership on Regulated Fintech",
    description: defaultDescription,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: "Charlie Bittner-Rossmiller — Enterprise AI Platform Leadership on Regulated Fintech",
    description: defaultDescription,
    images: [ogImage.url],
  },
  robots: {
    index: true,
    follow: true,
  },
};

/** Per-post / per-case-study metadata: own title, description, canonical and share card. */
export function articleMetadata({
  title,
  description,
  path,
  date,
}: {
  title: string;
  description: string;
  path: string;
  date: string;
}): Metadata {
  const url = `${siteUrl}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      locale: "en_US",
      url,
      siteName,
      title,
      description,
      publishedTime: date,
      authors: [`${siteUrl}/`],
      images: [ogImage],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage.url],
    },
  };
}

export function articleJsonLd({
  type,
  title,
  description,
  path,
  date,
  tags,
}: {
  type: "BlogPosting" | "Article";
  title: string;
  description: string;
  path: string;
  date: string;
  tags: string[];
}) {
  const url = `${siteUrl}${path}`;
  return {
    "@context": "https://schema.org",
    "@type": type,
    headline: title,
    description,
    datePublished: date,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: ogImage.url,
    keywords: tags.join(", "),
    inLanguage: "en-US",
    author: { "@type": "Person", "@id": personId, name: siteName, url: `${siteUrl}/` },
    publisher: { "@type": "Person", "@id": personId, name: siteName },
  };
}

export function generateJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: siteName,
    alternateName: ["Charles Bittner-Rossmiller"],
    jobTitle: "Director of Product Management",
    description:
      "Director of Product Management at Willow Wealth, New York. Runs the company's enterprise AI platform end to end (rollout, governance, measurement, agentic delivery) on nine years of regulated private-markets fintech product work.",
    worksFor: {
      "@type": "Organization",
      name: "Willow Wealth",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "New York",
      addressRegion: "NY",
      addressCountry: "US",
    },
    knowsAbout: [
      "Product Management",
      "Fintech",
      "Alternative Investments",
      "Private Markets",
      "Registered Funds",
      "Managed Portfolios",
      "Custodial Integrations",
      "SEC and FINRA Regulated Products",
      "SOC 2 and ISO 27001 Compliance Programs",
      "Vendor Security Review",
      "Enterprise AI Adoption",
      "AI Governance",
      "Agentic Workflows",
      "AI Agents for Growth Experimentation",
      "Model Routing",
      "Multi-Agent Systems",
      "AI Observability",
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
    url: `${siteUrl}/`,
  };
}
