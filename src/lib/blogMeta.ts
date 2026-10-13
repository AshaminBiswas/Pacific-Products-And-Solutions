/**
 * Utilities for unpacking extended blog metadata serialized from the PACIFIC-Admin console.
 */

export interface BlogMetadata {
  seoTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  readingTime?: string;
  isFeatured?: boolean;
  scheduledAt?: string | null;
  status?: "DRAFT" | "PUBLISHED" | "SCHEDULED";
}

export function unpackBlogContent(content: string = ""): { html: string; meta: BlogMetadata } {
  if (!content) return { html: "", meta: {} };

  const metaRegex = /<!--PRC_BLOG_META:([\s\S]*?)-->/;
  const match = content.match(metaRegex);
  if (!match) return { html: content, meta: {} };

  try {
    const meta: BlogMetadata = JSON.parse(match[1]);
    const cleanHtml = content.replace(metaRegex, "").trim();
    return { html: cleanHtml, meta };
  } catch {
    return { html: content, meta: {} };
  }
}

export function calculateEstimatedReadingTime(html: string, wordsPerMinute = 200): string {
  const text = html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
  const words = text ? text.split(" ").length : 0;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min read`;
}
