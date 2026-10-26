/**
 * Vercel Edge Function — Dynamic Open Graph Preview Generator
 *
 * Serves optimized Open Graph / Twitter Card HTML to social crawlers
 * (WhatsApp, Facebook, Twitter/X, LinkedIn, Telegram, Discord, Slack, iMessage)
 * so that shared product and blog URLs display rich previews with the actual
 * product photo, custom SEO title, and meta description.
 */

export const config = { runtime: "edge" };

const CANONICAL_SUPABASE_URL = "https://bcbswbzbtskvmdqmgrjm.supabase.co";
const CANONICAL_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJjYnN3YnpidHNrdm1kcW1ncmptIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTIwMzc3NjUsImV4cCI6MjEwNzYxMzc2NX0.7-xzYBDeqNgRURx62bIJTf8pNA__L-MtT0UVtJxJ--U";
const SITE_URL = "https://www.pacificproduct.in";
const DEFAULT_OG_IMAGE = "https://www.pacificproduct.in/og-image.png";

function formatOgImage(url?: string | null): string {
  if (!url) return DEFAULT_OG_IMAGE;
  const trimmed = url.trim();
  if (trimmed.includes("ik.imagekit.io")) {
    const clean = trimmed.split("?")[0];
    return `${clean}?tr=w-1200,h-630,cm-pad_resize,bg-030213,f-jpg,q-85`;
  }
  return trimmed;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export default async function handler(req: Request): Promise<Response> {
  const reqUrl = new URL(req.url);
  const rawPath = reqUrl.searchParams.get("path") || reqUrl.pathname || "";
  const cleanPath = rawPath.replace(/^\/api\/og-preview/, "") || rawPath;

  // Extract path segments
  const segments = cleanPath.split("/").filter(Boolean);
  const isBlog = segments[0] === "blog";
  const rawSlug = segments[segments.length - 1] || "";
  const slug = rawSlug === "plarina-wave" || rawSlug === "cubicle-platina-wave" ? "platina-wave" : rawSlug;

  let title = "Pacific® Restroom Cubicles & Toilet Partitions Manufacturer in India";
  let description = "India's premier manufacturer of HPL restroom cubicles, modular lockers & urinal partitions. ISO 9001 certified. Get direct factory pricing & turnkey BOQ today.";
  let imageUrl = DEFAULT_OG_IMAGE;
  let canonicalUrl = `${SITE_URL}${cleanPath.startsWith("/") ? cleanPath : "/" + cleanPath}`;
  let ogType = "website";

  if (slug && !isBlog) {
    try {
      const endpoint = `${CANONICAL_SUPABASE_URL}/rest/v1/products?select=id,title,slug,category,image_url,description,metadata&or=(slug.eq.${encodeURIComponent(slug)},id.eq.${encodeURIComponent(slug)})&limit=1`;
      const res = await fetch(endpoint, {
        headers: {
          apikey: CANONICAL_ANON_KEY,
          Authorization: `Bearer ${CANONICAL_ANON_KEY}`,
        },
      });

      if (res.ok) {
        const rows = await res.json();
        if (rows && rows.length > 0) {
          const product = rows[0];
          const meta = product.metadata || {};
          const configuredTitle = (meta.metaTitle || "").trim();
          const configuredDesc = (meta.metaDescription || "").trim();

          title = configuredTitle || `${product.title} | Commercial Restroom Cubicle | Pacific Products & Solutions`;
          description = configuredDesc || (product.description ? product.description.replace(/<[^>]+>/g, "").slice(0, 160) : "") || `Explore Pacific ${product.title} restroom cubicles with premium compact laminate panels and durable hardware.`;
          imageUrl = formatOgImage(product.image_url);
          ogType = "product";
          
          const cat = (product.category || "").toLowerCase();
          const catSlug = cat.includes("cubicle") && !cat.includes("kid")
            ? "restroom-cubicles"
            : cat.includes("locker")
            ? "lockers"
            : cat.includes("urinal") || cat.includes("partition")
            ? "urinal-partitions"
            : cat.includes("kid")
            ? "kids-cubicles"
            : "restroom-cubicles";

          canonicalUrl = `${SITE_URL}/products/${catSlug}/${product.slug}`;
        }
      }
    } catch (e) {
      console.error("[og-preview] Error fetching product:", e);
    }
  } else if (slug && isBlog) {
    try {
      const endpoint = `${CANONICAL_SUPABASE_URL}/rest/v1/blogs?select=id,title,slug,excerpt,cover_image_url,seo_title,meta_title,meta_description&slug=eq.${encodeURIComponent(slug)}&limit=1`;
      const res = await fetch(endpoint, {
        headers: {
          apikey: CANONICAL_ANON_KEY,
          Authorization: `Bearer ${CANONICAL_ANON_KEY}`,
        },
      });

      if (res.ok) {
        const rows = await res.json();
        if (rows && rows.length > 0) {
          const blog = rows[0];
          title = blog.meta_title || blog.seo_title || `${blog.title} | Pacific Knowledge Hub`;
          description = blog.meta_description || blog.excerpt || description;
          imageUrl = formatOgImage(blog.cover_image_url);
          ogType = "article";
          canonicalUrl = `${SITE_URL}/blog/${blog.slug}`;
        }
      }
    } catch (e) {
      console.error("[og-preview] Error fetching blog:", e);
    }
  }

  const safeTitle = escapeHtml(title);
  const safeDesc = escapeHtml(description);
  const safeImage = escapeHtml(imageUrl);
  const safeUrl = escapeHtml(canonicalUrl);

  const html = `<!DOCTYPE html>
<html lang="en-IN">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${safeTitle}</title>
  <meta name="description" content="${safeDesc}">
  <link rel="canonical" href="${safeUrl}">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

  <!-- Open Graph / WhatsApp / Facebook -->
  <meta property="og:type" content="${ogType}">
  <meta property="og:site_name" content="Pacific Products &amp; Solutions">
  <meta property="og:locale" content="en_IN">
  <meta property="og:url" content="${safeUrl}">
  <meta property="og:title" content="${safeTitle}">
  <meta property="og:description" content="${safeDesc}">
  <meta property="og:image" content="${safeImage}">
  <meta property="og:image:secure_url" content="${safeImage}">
  <meta property="og:image:type" content="image/jpeg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="${safeTitle}">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@pacificcubicles">
  <meta name="twitter:creator" content="@pacificcubicles">
  <meta name="twitter:title" content="${safeTitle}">
  <meta name="twitter:description" content="${safeDesc}">
  <meta name="twitter:image" content="${safeImage}">
  <meta name="twitter:image:alt" content="${safeTitle}">

  <!-- Instant Browser Redirect for regular users -->
  <meta http-equiv="refresh" content="0;url=${safeUrl}">
  <script>window.location.replace("${safeUrl}");</script>
</head>
<body style="background:#030213;color:#ffffff;font-family:-apple-system,BlinkMacSystemFont,sans-serif;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:24px;box-sizing:border-box;">
  <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(127,183,6,0.3);border-radius:16px;padding:32px;max-width:540px;text-align:center;">
    <h1 style="font-size:20px;color:#ffffff;margin:0 0 12px 0;">${safeTitle}</h1>
    <p style="font-size:14px;color:#a0a0a0;margin:0 0 20px 0;line-height:1.5;">${safeDesc}</p>
    <a href="${safeUrl}" style="display:inline-block;background:#7FB706;color:#030213;font-weight:700;padding:10px 20px;border-radius:10px;text-decoration:none;font-size:14px;">View on Pacific Website &rarr;</a>
  </div>
</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      "X-Robots-Tag": "all",
    },
  });
}
