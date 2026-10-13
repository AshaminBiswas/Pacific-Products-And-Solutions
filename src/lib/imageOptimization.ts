/**
 * Image URL Optimization Utility
 *
 * Automatically generates responsive, next-gen WebP compressed image URLs for:
 * 1. ImageKit.io CDN (using transformation parameters ?tr=w-...,q-...,f-webp)
 * 2. Supabase Storage (using URL transforms ?width=...&quality=...&format=webp)
 * 3. Unsplash (using auto=format&w=...&q=...)
 */

export function getOptimizedImageUrl(
  src: string | undefined | null,
  width = 800,
  quality = 75
): string {
  if (!src) return "";
  try {
    // 1. ImageKit CDN
    if (src.includes("ik.imagekit.io")) {
      const url = new URL(src);
      url.searchParams.delete("tr");
      url.searchParams.set("tr", `w-${width},q-${quality},f-webp`);
      return url.toString();
    }

    // 2. Supabase Storage
    if (src.includes("/storage/v1/object/public/")) {
      const url = new URL(src);
      url.searchParams.set("width", String(width));
      url.searchParams.set("quality", String(quality));
      url.searchParams.set("format", "webp");
      return url.toString();
    }

    // 3. Unsplash CDN
    if (src.includes("images.unsplash.com")) {
      const url = new URL(src);
      url.searchParams.set("w", String(width));
      url.searchParams.set("q", String(quality > 70 ? 70 : quality));
      url.searchParams.set("auto", "format,compress");
      url.searchParams.set("fit", "crop");
      return url.toString();
    }

    return src;
  } catch {
    return src;
  }
}
