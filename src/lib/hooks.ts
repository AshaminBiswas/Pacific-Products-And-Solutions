/**
 * React hooks for fetching data from Supabase with demo-data fallback.
 */
import { useState, useEffect, useCallback, useRef } from "react";
import { supabase, isSupabaseConfigured } from "./supabase";
import type { Product, Blog, Solution, GalleryImage, HeroImage, CoreService, PageBanner, Catalog } from "./database.types";
import {
  demoProducts,
  demoBlogs,
  demoSolutions,
  demoGalleryImages,
} from "./demo-data";

// ── In-memory request cache ───────────────────────────────────
// Stores already-fetched data so navigating back to a page is instant.
// Cache is busted only when `refetch()` is explicitly called.
const memCache = new Map<string, { data: unknown; timestamp: number }>();
const inFlight = new Map<string, Promise<any>>();
const CACHE_TTL_MS = 20 * 1000; // 20 seconds for responsive CMS updates

function getCached<T>(key: string): T[] | null {
  const entry = memCache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.timestamp > CACHE_TTL_MS) {
    memCache.delete(key);
    return null;
  }
  return entry.data as T[];
}

function setCache<T>(key: string, data: T[]): void {
  memCache.set(key, { data, timestamp: Date.now() });
}


// ── Generic helpers ──────────────────────────────────────────

interface UseDataResult<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

interface UseSingleResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

// ── Products ─────────────────────────────────────────────────

export function useProducts(featuredOnly = false): UseDataResult<Product> {
  const cacheKey = `products:${featuredOnly}`;
  const [data, setData] = useState<Product[]>(() => {
    const direct = getCached<Product>(cacheKey);
    if (direct) return direct;
    if (featuredOnly) {
      const all = getCached<Product>("products:false");
      if (all) return all.filter((p) => p.is_featured);
    }
    return [];
  });
  const [loading, setLoading] = useState(() => {
    if (getCached<Product>(cacheKey)) return false;
    if (featuredOnly && getCached<Product>("products:false")) return false;
    return true;
  });
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (bust = false) => {
    if (!bust) {
      const cached = getCached<Product>(cacheKey);
      if (cached) { setData(cached); setLoading(false); return; }
      if (featuredOnly) {
        const all = getCached<Product>("products:false");
        if (all) {
          const featured = all.filter((p) => p.is_featured);
          setCache(cacheKey, featured);
          setData(featured);
          setLoading(false);
          return;
        }
      }
      if (inFlight.has(cacheKey)) {
        try {
          const result = await inFlight.get(cacheKey)!;
          setData(result);
        } catch (e: any) {
          setError(e.message);
        } finally {
          setLoading(false);
        }
        return;
      }
    }
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      const demo = featuredOnly
        ? demoProducts.filter((p) => p.is_featured)
        : demoProducts;
      setCache(cacheKey, demo);
      setData(demo);
      setLoading(false);
      return;
    }

    const fetchPromise = (async () => {
      let query = supabase
        .from("products")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });

      if (featuredOnly) {
        query = query.eq("is_featured", true);
      }

      const { data: rows, error: err } = await query;
      if (err) throw err;
      const result = (rows as Product[]) || [];
      setCache(cacheKey, result);
      if (!featuredOnly) {
        setCache("products:true", result.filter((p) => p.is_featured));
      }
      return result;
    })();

    inFlight.set(cacheKey, fetchPromise);
    try {
      const result = await fetchPromise;
      setData(result);
    } catch (e: any) {
      console.error("Failed to fetch products:", e);
      setError(e.message);
      setData([]);
    } finally {
      inFlight.delete(cacheKey);
      setLoading(false);
    }
  }, [featuredOnly, cacheKey]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: () => fetchData(true) };
}

export function useProduct(slug: string | undefined): UseSingleResult<Product> {
  const [data, setData] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    async function fetch() {
      setLoading(true);

      if (!isSupabaseConfigured()) {
        setData(demoProducts.find((p) => p.slug === slug) || null);
        setLoading(false);
        return;
      }

      try {
        const { data: row, error: err } = await supabase
          .from("products")
          .select("*")
          .eq("slug", slug!)
          .single();
        if (err || !row || row.published === false) {
          setData(null);
        } else {
          setData(row as Product);
        }
      } catch (e: any) {
        console.error("Failed to fetch product from DB:", e);
        setData(null);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }

    fetch();
  }, [slug]);

  return { data, loading, error };
}

// ── Solutions ────────────────────────────────────────────────

export function useSolutions(): UseDataResult<Solution> {
  const cacheKey = 'solutions';
  const [data, setData] = useState<Solution[]>(() => getCached<Solution>(cacheKey) ?? []);
  const [loading, setLoading] = useState(() => !getCached<Solution>(cacheKey));
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (bust = false) => {
    if (!bust) {
      const cached = getCached<Solution>(cacheKey);
      if (cached) { setData(cached); setLoading(false); return; }
    }
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setCache(cacheKey, demoSolutions);
      setData(demoSolutions);
      setLoading(false);
      return;
    }

    try {
      const { data: rows, error: err } = await supabase
        .from("solutions")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (err) throw err;
      const result = (rows as Solution[]) || [];
      setCache(cacheKey, result);
      setData(result);
    } catch (e: any) {
      setError(e.message);
      setData(demoSolutions);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: () => fetchData(true) };
}

export function useSolution(slug: string | undefined): UseSingleResult<Solution> {
  const [data, setData] = useState<Solution | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    async function fetch() {
      setLoading(true);

      if (!isSupabaseConfigured()) {
        setData(demoSolutions.find((s) => s.slug === slug) || null);
        setLoading(false);
        return;
      }

      try {
        const { data: row, error: err } = await supabase
          .from("solutions")
          .select("*")
          .eq("slug", slug!)
          .single();
        if (err) throw err;
        setData(row as Solution);
      } catch (e: any) {
        setError(e.message);
        setData(demoSolutions.find((s) => s.slug === slug) || null);
      } finally {
        setLoading(false);
      }
    }

    fetch();
  }, [slug]);

  return { data, loading, error };
}

// ── Blogs ────────────────────────────────────────────────────

export function useBlogs(): UseDataResult<Blog> {
  const cacheKey = 'blogs';
  const [data, setData] = useState<Blog[]>(() => getCached<Blog>(cacheKey) ?? []);
  const [loading, setLoading] = useState(() => !getCached<Blog>(cacheKey));
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (bust = false) => {
    if (!bust) {
      const cached = getCached<Blog>(cacheKey);
      if (cached) { setData(cached); setLoading(false); return; }
    }
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setCache(cacheKey, demoBlogs);
      setData(demoBlogs);
      setLoading(false);
      return;
    }

    try {
      const { data: rows, error: err } = await supabase
        .from("blogs")
        .select("*")
        .eq("published", true)
        .order("published_at", { ascending: false });
      if (err) throw err;
      const result = (rows as Blog[]) || [];
      setCache(cacheKey, result);
      setData(result);
    } catch (e: any) {
      setError(e.message);
      setData(demoBlogs);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: () => fetchData(true) };
}

export function useBlog(slug: string | undefined): UseSingleResult<Blog> {
  const [data, setData] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      return;
    }

    async function fetch() {
      setLoading(true);

      if (!isSupabaseConfigured()) {
        setData(demoBlogs.find((b) => b.slug === slug) || null);
        setLoading(false);
        return;
      }

      try {
        const { data: row, error: err } = await supabase
          .from("blogs")
          .select("*")
          .eq("slug", slug!)
          .single();
        if (err) throw err;
        setData(row as Blog);
      } catch (e: any) {
        setError(e.message);
        setData(demoBlogs.find((b) => b.slug === slug) || null);
      } finally {
        setLoading(false);
      }
    }

    fetch();
  }, [slug]);

  return { data, loading, error };
}

// ── Gallery ──────────────────────────────────────────────────

export function useGallery(): UseDataResult<GalleryImage> {
  const [data, setData] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setData(demoGalleryImages);
      setLoading(false);
      return;
    }

    try {
      const { data: rows, error: err } = await supabase
        .from("gallery_images")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });
      if (err) throw err;
      setData((rows as GalleryImage[]) || []);
    } catch (e: any) {
      setError(e.message);
      setData(demoGalleryImages);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export function useLocationGallery(locationSlug: string | undefined): UseDataResult<GalleryImage> {
  const [data, setData] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!locationSlug) {
      setData([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setData([]);
      setLoading(false);
      return;
    }

    try {
      const { data: rows, error: err } = await supabase
        .from("gallery_images")
        .select("*")
        .eq("published", true)
        .eq("location_slug", locationSlug)
        .order("sort_order", { ascending: true });
      if (err) throw err;
      setData((rows as GalleryImage[]) || []);
    } catch (e: any) {
      console.error("Failed to fetch location gallery images:", e);
      setError(e.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [locationSlug]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// ── Admin hooks (all items, including unpublished) ───────────

export function useAdminProducts(): UseDataResult<Product> {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: rows, error: err } = await supabase
        .from("products")
        .select("*")
        .order("sort_order", { ascending: true });
      if (err) throw err;
      setData((rows as Product[]) || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export function useAdminBlogs(): UseDataResult<Blog> {
  const [data, setData] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: rows, error: err } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });
      if (err) throw err;
      setData((rows as Blog[]) || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export function useAdminSolutions(): UseDataResult<Solution> {
  const [data, setData] = useState<Solution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: rows, error: err } = await supabase
        .from("solutions")
        .select("*")
        .order("sort_order", { ascending: true });
      if (err) throw err;
      setData((rows as Solution[]) || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export function useAdminGallery(): UseDataResult<GalleryImage> {
  const [data, setData] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: rows, error: err } = await supabase
        .from("gallery_images")
        .select("*")
        .order("sort_order", { ascending: true });
      if (err) throw err;
      setData((rows as GalleryImage[]) || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// ── Hero Images ──────────────────────────────────────────────

export const defaultHeroImages: HeroImage[] = [
  {
    id: "bf7e19dc-c710-4327-a13f-a442bd5c3f99",
    url: "https://ik.imagekit.io/1r254icf2/hero/1790678119404_ChatGPT_Image_Sep_29__2026__04_04_34_PM_slOnbmkY6.webp",
    description: "Platina Wave Cubicle Model",
    sort_order: 0,
    created_at: "2026-09-29T10:35:24.101109+00:00",
    alt_text: "Platina Wave Restroom Cubicle System by Pacific",
  },
  {
    id: "e2e24d1c-98ee-4b5f-84fa-e6b21733c246",
    url: "https://ik.imagekit.io/1r254icf2/hero/1790680561247_ChatGPT_Image_Sep_29__2026__04_44_04_PM_59UFAEMlu.webp",
    description: "Skylight Cubicle Model",
    sort_order: 1,
    created_at: "2026-09-29T11:16:05.802076+00:00",
    alt_text: "Skylight Architectural Restroom Cubicle System by Pacific",
  },
  {
    id: "7579a141-3885-4eb2-b95d-1c11ab21ef2c",
    url: "https://ik.imagekit.io/1r254icf2/hero/1791018379465_SAFFRON_UCYGGym91.webp",
    description: "Saffron Cubicle Model",
    sort_order: 2,
    created_at: "2026-10-03T09:06:25.557076+00:00",
    alt_text: "Saffron Commercial Restroom Cubicle System by Pacific",
  },
  {
    id: "009ee36d-906f-4dbe-8d3f-a1d2a494f62e",
    url: "https://ik.imagekit.io/1r254icf2/hero/1791791921262_Modern_Symmetrical_Restroom_Stalls_udx-2kJnzH.webp",
    description: "Gusto Shoe Box Cubicle Model",
    sort_order: 3,
    created_at: "2026-10-12T07:58:47.038945+00:00",
    alt_text: "Gusto Shoe Box Commercial Toilet Cubicle by Pacific",
  },
];

export function useHeroImages(): UseDataResult<HeroImage> {
  const cacheKey = "hero_images";
  const [data, setData] = useState<HeroImage[]>(() => getCached<HeroImage>(cacheKey) ?? defaultHeroImages);
  const [loading, setLoading] = useState(() => !getCached<HeroImage>(cacheKey));
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (bust = false) => {
    if (!bust) {
      const cached = getCached<HeroImage>(cacheKey);
      if (cached) { setData(cached); setLoading(false); return; }
    }
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setCache(cacheKey, defaultHeroImages);
      setData(defaultHeroImages);
      setLoading(false);
      return;
    }

    try {
      const { data: rows, error: err } = await supabase
        .from("hero_images")
        .select("*")
        .order("sort_order", { ascending: true });
      if (err) throw err;
      const result = (rows as HeroImage[]) || [];
      const finalData = result.length > 0 ? result : defaultHeroImages;
      setCache(cacheKey, finalData);
      setData(finalData);
    } catch (e: any) {
      setError(e.message);
      setData(defaultHeroImages);
    } finally {
      setLoading(false);
    }
  }, [cacheKey]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: () => fetchData(true) };
}

export function useAdminHeroImages(): UseDataResult<HeroImage> {
  const [data, setData] = useState<HeroImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: rows, error: err } = await supabase
        .from("hero_images")
        .select("*")
        .order("sort_order", { ascending: true });
      if (err) throw err;
      setData((rows as HeroImage[]) || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// ── Core Services ────────────────────────────────────────────

export function useCoreServices(): UseDataResult<CoreService> {
  const [data, setData] = useState<CoreService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setData([]);
      setLoading(false);
      return;
    }

    try {
      const { data: rows, error: err } = await supabase
        .from("core_services")
        .select("*")
        .order("sort_order", { ascending: true });
      if (err) throw err;
      setData((rows as CoreService[]) || []);
    } catch (e: any) {
      setError(e.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

export function useAdminCoreServices(): UseDataResult<CoreService> {
  const [data, setData] = useState<CoreService[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: rows, error: err } = await supabase
        .from("core_services")
        .select("*")
        .order("sort_order", { ascending: true });
      if (err) throw err;
      setData((rows as CoreService[]) || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// ── Page Banners ──────────────────────────────────────────────

export function usePageBanner(pageSlug: string): UseSingleResult<PageBanner> {
  const cacheKey = `page_banner:${pageSlug}`;
  const [data, setData] = useState<PageBanner | null>(() => {
    if (!pageSlug) return null;
    const cached = memCache.get(`page_banner:${pageSlug}`);
    return (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) ? (cached.data as PageBanner) : null;
  });
  const [loading, setLoading] = useState(() => {
    if (!pageSlug) return false;
    const cached = memCache.get(`page_banner:${pageSlug}`);
    return !(cached && Date.now() - cached.timestamp < CACHE_TTL_MS);
  });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pageSlug) { setLoading(false); return; }

    const cached = memCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      setData(cached.data as PageBanner);
      setLoading(false);
      return;
    }

    async function fetch() {
      setLoading(true);
      if (!isSupabaseConfigured()) { setLoading(false); return; }
      try {
        let allBannersPromise = inFlight.get("all_page_banners");
        if (!allBannersPromise) {
          allBannersPromise = (async () => {
            const { data: rows, error: err } = await supabase
              .from("page_banners")
              .select("*");
            if (err) throw err;
            const banners = (rows as unknown as PageBanner[]) || [];
            banners.forEach((b) => {
              if (b.page_slug) {
                memCache.set(`page_banner:${b.page_slug}`, { data: b, timestamp: Date.now() });
              }
            });
            return banners;
          })();
          inFlight.set("all_page_banners", allBannersPromise);
        }

        const banners = await allBannersPromise;
        const banner = banners.find((b: PageBanner) => b.page_slug === pageSlug) || null;
        memCache.set(cacheKey, { data: banner, timestamp: Date.now() });
        setData(banner);
      } catch (e: any) {
        setError(e.message);
      } finally {
        inFlight.delete("all_page_banners");
        setLoading(false);
      }
    }
    fetch();
  }, [pageSlug]);

  return { data, loading, error };
}

export function useAdminPageBanners(): UseDataResult<PageBanner> {
  const [data, setData] = useState<PageBanner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: rows, error: err } = await supabase
        .from("page_banners")
        .select("*")
        .order("page_slug", { ascending: true });
      if (err) throw err;
      setData((rows as PageBanner[]) || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}

// ── Catalogs ─────────────────────────────────────────────────

export function useCatalogs(productId?: string): UseDataResult<Catalog> {
  const cacheKey = `catalogs:${productId || 'all'}`;
  const [data, setData] = useState<Catalog[]>(() => getCached<Catalog>(cacheKey) ?? []);
  const [loading, setLoading] = useState(() => !getCached<Catalog>(cacheKey));
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async (bust = false) => {
    if (!bust) {
      const cached = getCached<Catalog>(cacheKey);
      if (cached) { setData(cached); setLoading(false); return; }
    }
    setLoading(true);
    setError(null);

    if (!isSupabaseConfigured()) {
      setData([]);
      setLoading(false);
      return;
    }

    try {
      let query = supabase
        .from("catalogs")
        .select("*")
        .eq("published", true)
        .order("sort_order", { ascending: true });

      if (productId) {
        query = query.eq("product_id", productId);
      }

      const { data: rows, error: err } = await query;
      if (err) throw err;
      const result = (rows as Catalog[]) || [];
      setCache(cacheKey, result);
      setData(result);
    } catch (e: any) {
      console.error("Failed to fetch catalogs:", e);
      setError(e.message);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [productId, cacheKey]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: () => fetchData(true) };
}

export function useAdminCatalogs(): UseDataResult<Catalog> {
  const [data, setData] = useState<Catalog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const { data: rows, error: err } = await supabase
        .from("catalogs")
        .select("*")
        .order("sort_order", { ascending: true });
      if (err) throw err;
      setData((rows as Catalog[]) || []);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
