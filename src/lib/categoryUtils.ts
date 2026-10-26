/**
 * Standard Category Normalization and Routing Utilities for Pacific Products & Solutions
 */

export type CanonicalProductCategorySlug =
  | 'restroom-cubicles'
  | 'lockers'
  | 'urinal-partitions'
  | 'kids-cubicles';

/**
 * Maps any database category string or human-readable label to its canonical route slug.
 */
export function toCategorySlug(category: string | undefined): CanonicalProductCategorySlug {
  if (!category) return 'restroom-cubicles';
  const cat = category.toLowerCase().trim();

  // 1. Kids Cubicles / Kids Toilet
  if (cat.includes('kid') || cat.includes('child')) {
    return 'kids-cubicles';
  }

  // 2. Lockers
  if (cat.includes('locker')) {
    return 'lockers';
  }

  // 3. Urinal Partitions
  if (cat.includes('urinal')) {
    return 'urinal-partitions';
  }

  // 4. Default: Restroom Cubicles (includes 'Cubicle', 'Toilet Partition', 'Shower Cubicle', etc.)
  return 'restroom-cubicles';
}

/**
 * Normalizes URL path segments, query parameters, or aliases into one of the 4 canonical category slugs.
 */
export function normalizeCategorySlug(raw?: string): CanonicalProductCategorySlug | null {
  if (!raw) return null;
  const s = raw.toLowerCase().trim();

  // Exact canonical matches
  if (s === 'restroom-cubicles') return 'restroom-cubicles';
  if (s === 'lockers') return 'lockers';
  if (s === 'urinal-partitions') return 'urinal-partitions';
  if (s === 'kids-cubicles') return 'kids-cubicles';

  // Common aliases & redirects
  if (
    s === 'cubicle' ||
    s === 'cubicles' ||
    s === 'toilet-partitions' ||
    s === 'toilet-cubicles' ||
    s === 'shower-cubicles' ||
    s === 'restroom-cubicle'
  ) {
    return 'restroom-cubicles';
  }

  if (
    s === 'locker' ||
    s === 'modular-lockers' ||
    s === 'hpl-lockers' ||
    s === 'locker-systems' ||
    s === 'locker-solution'
  ) {
    return 'lockers';
  }

  if (
    s === 'urinal' ||
    s === 'urinals' ||
    s === 'urinal-partition' ||
    s === 'urinal-screens' ||
    s === 'modesty-screens'
  ) {
    return 'urinal-partitions';
  }

  if (
    s === 'kids-toilet' ||
    s === 'kids-cubicle' ||
    s === 'kids' ||
    s === 'kids-toilet-cubicles' ||
    s === 'school-cubicles'
  ) {
    return 'kids-cubicles';
  }

  // Substring fallback
  if (s.includes('kid') || s.includes('child')) return 'kids-cubicles';
  if (s.includes('locker')) return 'lockers';
  if (s.includes('urinal')) return 'urinal-partitions';
  if (s.includes('cubicle') || s.includes('partition') || s.includes('restroom')) return 'restroom-cubicles';

  return null;
}
