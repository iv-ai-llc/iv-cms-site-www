/**
 * CMS Client Configuration
 *
 * Content Source (prioritized):
 * 1. KV Storage - Fast, local reads from Upstash KV (populated by CMS publish)
 * 2. CMS API - Fallback when KV is empty or not configured
 *
 * Caching Strategy:
 * - Uses Next.js ISR with 60-second revalidation as fallback
 * - Tag-based caching allows instant invalidation via /api/revalidate
 * - CMS sends webhooks on content changes to trigger revalidation
 */

import * as kvContent from "./kv-content";

/** Whether CMS is configured */
export const isCMSConfigured = !!(process.env.CMS_URL && process.env.CMS_API_KEY);

/** Whether to use KV storage (faster) */
const USE_KV_STORAGE = kvContent.isKvConfigured();

/** CMS API base URL */
export const CMS_URL = process.env.CMS_URL || "";
export const CMS_API_KEY = process.env.CMS_API_KEY || "";
export const CMS_SITE_ID = process.env.CMS_SITE_ID || "";

/**
 * Build fetch options with caching strategy
 * - tags: For on-demand revalidation via revalidateTag()
 * - revalidate: Fallback TTL if webhook fails
 */
function buildFetchOptions(tags: string[]) {
  return {
    headers: {
      "x-api-key": CMS_API_KEY,
      "x-site-id": CMS_SITE_ID,
    },
    next: {
      revalidate: 60, // Fallback: revalidate every 60 seconds
      tags,           // Enable on-demand revalidation
    },
  };
}

/** Fetch collection items from the CMS */
export async function fetchCollectionItems(collectionSlug: string) {
  // Try KV first if configured
  if (USE_KV_STORAGE) {
    const items = await kvContent.getCollectionItems(collectionSlug);
    if (items.length > 0) return items;
    // Fall through to API if KV is empty
  }

  if (!isCMSConfigured) return null;

  try {
    const response = await fetch(
      `${CMS_URL}/api/v1/content/collections/${collectionSlug}/items`,
      buildFetchOptions([collectionSlug, `collection:${collectionSlug}`])
    );

    if (!response.ok) return null;
    return response.json();
  } catch {
    // CMS not reachable
    return null;
  }
}

/** Fetch a single collection item by slug */
export async function fetchCollectionItem(collectionSlug: string, itemSlug: string) {
  // Try KV first if configured
  if (USE_KV_STORAGE) {
    const item = await kvContent.getCollectionItem(collectionSlug, itemSlug);
    if (item) return item;
    // Fall through to API if not found
  }

  if (!isCMSConfigured) return null;

  try {
    const response = await fetch(
      `${CMS_URL}/api/v1/content/collections/${collectionSlug}/items/${itemSlug}`,
      buildFetchOptions([collectionSlug, `item:${collectionSlug}:${itemSlug}`])
    );

    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

/** Fetch pages from the CMS */
export async function fetchPages() {
  // Try KV first if configured
  if (USE_KV_STORAGE) {
    const pages = await kvContent.getPages();
    if (pages.length > 0) return pages;
    // Fall through to API if KV is empty
  }

  if (!isCMSConfigured) return null;

  try {
    const response = await fetch(
      `${CMS_URL}/api/v1/content/pages`,
      buildFetchOptions(["pages", "navigation"])
    );

    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}

/** Fetch a single page by slug */
export async function fetchPage(slug: string) {
  // Try KV first if configured
  if (USE_KV_STORAGE) {
    const page = await kvContent.getPageBySlug(slug);
    if (page) return page;
    // Fall through to API if not found
  }

  if (!isCMSConfigured) return null;

  try {
    const response = await fetch(
      `${CMS_URL}/api/v1/content/pages/${slug}`,
      buildFetchOptions(["pages", `page:${slug}`])
    );

    if (!response.ok) return null;
    return response.json();
  } catch {
    return null;
  }
}
