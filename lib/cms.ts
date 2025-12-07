/**
 * CMS Client Configuration
 *
 * The CMS client is optional - if environment variables are not set,
 * the site will use static content. Once CMS_URL and CMS_API_KEY are
 * configured, content will be fetched from the CMS API.
 *
 * Caching Strategy:
 * - Uses Next.js ISR with 60-second revalidation as fallback
 * - Tag-based caching allows instant invalidation via /api/revalidate
 * - CMS sends webhooks on content changes to trigger revalidation
 */

/** Whether CMS is configured */
export const isCMSConfigured = !!(process.env.CMS_URL && process.env.CMS_API_KEY);

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
