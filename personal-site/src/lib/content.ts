import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content");

export interface ContentMeta {
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  slug: string;
  readingTime?: string;
}

function estimateReadingTime(content: string): string {
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / 200);
  return `${minutes} min read`;
}

export function getContentBySlug(
  type: "blog" | "case-studies",
  slug: string
): { meta: ContentMeta; content: string } {
  const filePath = path.join(contentDirectory, type, `${slug}.mdx`);
  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    meta: {
      ...(data as Omit<ContentMeta, "slug" | "readingTime">),
      slug,
      readingTime: estimateReadingTime(content),
    },
    content,
  };
}

export function getAllContent(type: "blog" | "case-studies"): ContentMeta[] {
  const dir = path.join(contentDirectory, type);
  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  return files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const { meta } = getContentBySlug(type, slug);
      return meta;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
