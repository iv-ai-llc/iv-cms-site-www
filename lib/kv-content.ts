/**
 * KV Content Client
 *
 * Direct KV-based content fetching.
 * Reads from site-specific Upstash KV store (pushed by CMS).
 *
 * KV Key Schema (populated by CMS publish-service):
 * - page:{slug}              -> Page JSON
 * - page:{locale}:{slug}     -> Locale-specific page
 * - pages:list               -> Sorted set of slugs (by sortIndex)
 * - pages:navigation         -> Set of navigation page slugs
 * - collection:{slug}        -> Collection metadata
 * - collection:{slug}:items  -> Sorted set of item slugs
 * - item:{collection}:{slug} -> Item JSON
 * - site:last-sync           -> Last sync timestamp
 */

import { Redis } from "@upstash/redis";
import type { Page, Collection, CollectionItem } from "./cms-client";

// =============================================================================
// KV CLIENT SINGLETON
// =============================================================================

let redis: Redis | null = null;

function getKvClient(): Redis | null {
  if (!redis) {
    const url = process.env.KV_REST_API_URL;
    const token = process.env.KV_REST_API_TOKEN;

    if (!url || !token) {
      console.warn("KV_REST_API_URL or KV_REST_API_TOKEN not configured");
      return null;
    }

    redis = new Redis({ url, token });
  }
  return redis;
}

/**
 * Check if KV storage is configured
 */
export function isKvConfigured(): boolean {
  return !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);
}

// =============================================================================
// PAGES
// =============================================================================

/**
 * Get all published pages from KV
 */
export async function getPages(): Promise<Page[]> {
  const kv = getKvClient();
  if (!kv) return [];

  try {
    // Get all page slugs from sorted set
    const slugs = await kv.zrange<string[]>("pages:list", 0, -1);
    if (!slugs || slugs.length === 0) return [];

    // Fetch all pages in parallel
    const pages = await Promise.all(
      slugs.map(async (slug) => {
        try {
          return await kv.json.get<Page>(`page:${slug}`);
        } catch {
          return null;
        }
      })
    );

    return pages.filter((p): p is Page => p !== null);
  } catch (error) {
    console.error("Error fetching pages from KV:", error);
    return [];
  }
}

/**
 * Get a single page by slug from KV
 */
export async function getPageBySlug(
  slug: string,
  locale: string = "en"
): Promise<Page | null> {
  const kv = getKvClient();
  if (!kv) return null;

  try {
    // Try locale-specific first
    let page = await kv.json.get<Page>(`page:${locale}:${slug}`);
    if (page) return page;

    // Fall back to default
    page = await kv.json.get<Page>(`page:${slug}`);
    return page;
  } catch (error) {
    console.error(`Error fetching page ${slug} from KV:`, error);
    return null;
  }
}

/**
 * Get navigation pages from KV
 */
export async function getNavigationPages(): Promise<Page[]> {
  const kv = getKvClient();
  if (!kv) return [];

  try {
    // Get navigation page slugs from set
    const slugs = await kv.smembers<string[]>("pages:navigation");
    if (!slugs || slugs.length === 0) return [];

    // Fetch pages and get their sortIndex
    const pagesWithIndex = await Promise.all(
      slugs.map(async (slug) => {
        try {
          const page = await kv.json.get<Page>(`page:${slug}`);
          return page;
        } catch {
          return null;
        }
      })
    );

    // Filter nulls and sort by sortIndex
    return pagesWithIndex
      .filter((p): p is Page => p !== null && p.slug !== "home")
      .sort((a, b) => ((a as unknown as { sortIndex?: number }).sortIndex ?? 0) - ((b as unknown as { sortIndex?: number }).sortIndex ?? 0));
  } catch (error) {
    console.error("Error fetching navigation pages from KV:", error);
    return [];
  }
}

// =============================================================================
// COLLECTIONS
// =============================================================================

/**
 * Get a collection by slug from KV
 */
export async function getCollectionBySlug(
  slug: string
): Promise<Collection | null> {
  const kv = getKvClient();
  if (!kv) return null;

  try {
    return await kv.json.get<Collection>(`collection:${slug}`);
  } catch (error) {
    console.error(`Error fetching collection ${slug} from KV:`, error);
    return null;
  }
}

/**
 * Get all items in a collection from KV
 */
export async function getCollectionItems(
  collectionSlug: string
): Promise<CollectionItem[]> {
  const kv = getKvClient();
  if (!kv) return [];

  try {
    // Get item slugs from sorted set
    const slugs = await kv.zrange<string[]>(
      `collection:${collectionSlug}:items`,
      0,
      -1,
      { rev: true } // Most recent first
    );
    if (!slugs || slugs.length === 0) return [];

    // Fetch all items
    const items = await Promise.all(
      slugs.map(async (slug) => {
        try {
          return await kv.json.get<CollectionItem>(
            `item:${collectionSlug}:${slug}`
          );
        } catch {
          return null;
        }
      })
    );

    return items.filter((i): i is CollectionItem => i !== null);
  } catch (error) {
    console.error(
      `Error fetching collection items for ${collectionSlug} from KV:`,
      error
    );
    return [];
  }
}

/**
 * Get a single collection item from KV
 */
export async function getCollectionItem(
  collectionSlug: string,
  itemSlug: string
): Promise<CollectionItem | null> {
  const kv = getKvClient();
  if (!kv) return null;

  try {
    return await kv.json.get<CollectionItem>(
      `item:${collectionSlug}:${itemSlug}`
    );
  } catch (error) {
    console.error(
      `Error fetching item ${collectionSlug}/${itemSlug} from KV:`,
      error
    );
    return null;
  }
}

// =============================================================================
// SITE METADATA
// =============================================================================

/**
 * Get the last sync timestamp from KV
 */
export async function getLastSyncTime(): Promise<string | null> {
  const kv = getKvClient();
  if (!kv) return null;

  try {
    return await kv.get<string>("site:last-sync");
  } catch {
    return null;
  }
}

/**
 * Check if KV is healthy (can connect)
 */
export async function checkKvHealth(): Promise<{
  healthy: boolean;
  latencyMs?: number;
  error?: string;
}> {
  const kv = getKvClient();
  if (!kv) {
    return { healthy: false, error: "KV not configured" };
  }

  const start = Date.now();
  try {
    await kv.ping();
    return { healthy: true, latencyMs: Date.now() - start };
  } catch (error) {
    return {
      healthy: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
