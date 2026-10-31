import type { MetadataRoute } from "next";
import { getAllContent } from "@/lib/content";
import { siteUrl } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const caseStudies = getAllContent("case-studies");
  const posts = getAllContent("blog");
  const newest = [...caseStudies, ...posts]
    .map((m) => m.date)
    .sort()
    .at(-1);

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${siteUrl}/`, lastModified: newest, changeFrequency: "monthly", priority: 1 },
    { url: `${siteUrl}/case-studies/`, lastModified: newest, changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteUrl}/blog/`, lastModified: newest, changeFrequency: "weekly", priority: 0.8 },
    { url: `${siteUrl}/projects/`, changeFrequency: "yearly", priority: 0.5 },
    { url: `${siteUrl}/contact/`, changeFrequency: "yearly", priority: 0.4 },
  ];

  return [
    ...staticPages,
    ...caseStudies.map((m) => ({
      url: `${siteUrl}/case-studies/${m.slug}/`,
      lastModified: m.date,
      changeFrequency: "yearly" as const,
      priority: 0.8,
    })),
    ...posts.map((m) => ({
      url: `${siteUrl}/blog/${m.slug}/`,
      lastModified: m.date,
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
