/**
 * IV-CMS Client - Full-featured client for CMS integration
 *
 * This is an inlined version of @iv-cms/client for standalone deployment.
 * Use this for more advanced CMS integrations beyond the simple helpers in cms.ts
 */

// Types
export interface CMSClientConfig {
  baseUrl: string;
  apiKey: string;
  defaultLocale?: string;
  timeout?: number;
  fetch?: typeof fetch;
}

export interface FetchOptions {
  locale?: string;
  draft?: boolean;
  headers?: Record<string, string>;
  timeout?: number;
  cache?: RequestCache;
  revalidate?: number | false;
  tags?: string[];
}

export interface ListOptions extends FetchOptions {
  limit?: number;
  offset?: number;
  status?: "published" | "draft" | "archived";
}

export interface PageListItem {
  id: string;
  slug: string;
  title: string;
  status: string;
  locale: string;
  path?: string;
  parentId?: string | null;
  updatedAt: string;
}

/**
 * Block definition for block-based content
 */
export interface Block {
  id: string;
  type: string;
  data: Record<string, unknown>;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: unknown;
  html?: string;
  status: string;
  locale: string;
  path?: string;
  parentId?: string | null;
  depth?: number;
  seo?: {
    title?: string;
    description?: string;
    image?: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
  // Block-based content (v1)
  blocks?: Block[];
  renderedHtml?: string | null;
}

export interface CollectionListItem {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  itemCount: number;
}

export interface Collection {
  id: string;
  slug: string;
  name: string;
  description?: string;
  icon?: string;
  itemSchema?: {
    fields: Array<{
      name: string;
      type: string;
      required?: boolean;
    }>;
  };
  createdAt: string;
  updatedAt: string;
}

export interface CollectionItemListItem {
  id: string;
  slug: string;
  title: string;
  status: string;
  locale: string;
  metadata?: Record<string, unknown>;
  updatedAt: string;
}

export interface CollectionItem {
  id: string;
  collectionId: string;
  slug: string;
  title: string;
  content: unknown;
  html?: string;
  status: string;
  locale: string;
  metadata?: Record<string, unknown>;
  seo?: {
    title?: string;
    description?: string;
    image?: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt?: string | null;
}

export interface NavigationItem {
  id: string;
  slug: string;
  title: string;
  path: string;
  depth: number;
  children?: NavigationItem[];
}

export interface ListResult<T> {
  items: T[];
  nextOffset: number | null;
}

export interface CMSError extends Error {
  status: number;
  code?: string;
}

// Client Implementation
export class CMSClient {
  private config: Required<Omit<CMSClientConfig, "fetch">> & { fetch: typeof fetch };

  constructor(config: CMSClientConfig) {
    this.config = {
      baseUrl: config.baseUrl.replace(/\/$/, ""),
      apiKey: config.apiKey,
      defaultLocale: config.defaultLocale || "en",
      timeout: config.timeout || 10000,
      fetch: config.fetch || globalThis.fetch.bind(globalThis),
    };
  }

  private buildUrl(path: string, params?: Record<string, string | number | boolean | undefined>): string {
    const url = new URL(`${this.config.baseUrl}/api/v1/content${path}`);

    if (params) {
      for (const [key, value] of Object.entries(params)) {
        if (value !== undefined) {
          url.searchParams.set(key, String(value));
        }
      }
    }

    return url.toString();
  }

  private async request<T>(
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
    options?: FetchOptions
  ): Promise<T> {
    const url = this.buildUrl(path, {
      ...params,
      locale: options?.locale || this.config.defaultLocale,
      draft: options?.draft,
    });

    const controller = new AbortController();
    const timeoutId = setTimeout(
      () => controller.abort(),
      options?.timeout || this.config.timeout
    );

    try {
      const fetchOptions: RequestInit = {
        method: "GET",
        headers: {
          Authorization: `Bearer ${this.config.apiKey}`,
          "Content-Type": "application/json",
          ...options?.headers,
        },
        signal: controller.signal,
      };

      // Next.js specific cache options
      if (options?.cache) {
        (fetchOptions as Record<string, unknown>).cache = options.cache;
      }
      if (options?.revalidate !== undefined) {
        (fetchOptions as Record<string, unknown>).next = {
          ...((fetchOptions as Record<string, unknown>).next as object || {}),
          revalidate: options.revalidate,
        };
      }
      if (options?.tags) {
        (fetchOptions as Record<string, unknown>).next = {
          ...((fetchOptions as Record<string, unknown>).next as object || {}),
          tags: options.tags,
        };
      }

      const response = await this.config.fetch(url, fetchOptions);

      if (!response.ok) {
        const error = new Error() as CMSError;
        error.status = response.status;

        try {
          const data = await response.json();
          error.message = data.error || `Request failed with status ${response.status}`;
          error.code = data.code;
        } catch {
          error.message = `Request failed with status ${response.status}`;
        }

        throw error;
      }

      return response.json();
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async listPages(options?: ListOptions): Promise<ListResult<PageListItem>> {
    return this.request<ListResult<PageListItem>>("/pages", {
      limit: options?.limit,
      offset: options?.offset,
      status: options?.status,
    }, options);
  }

  async getPage(slug: string, options?: FetchOptions): Promise<Page> {
    return this.request<Page>(`/pages/${encodeURIComponent(slug)}`, undefined, options);
  }

  async getPageByPath(path: string, options?: FetchOptions): Promise<Page> {
    return this.request<Page>("/pages/by-path", { path }, options);
  }

  async listCollections(options?: ListOptions): Promise<ListResult<CollectionListItem>> {
    return this.request<ListResult<CollectionListItem>>("/collections", {
      limit: options?.limit,
      offset: options?.offset,
    }, options);
  }

  async getCollection(slug: string, options?: FetchOptions): Promise<Collection> {
    return this.request<Collection>(`/collections/${encodeURIComponent(slug)}`, undefined, options);
  }

  async listCollectionItems(
    collectionSlug: string,
    options?: ListOptions
  ): Promise<ListResult<CollectionItemListItem>> {
    return this.request<ListResult<CollectionItemListItem>>(
      `/collections/${encodeURIComponent(collectionSlug)}/items`,
      {
        limit: options?.limit,
        offset: options?.offset,
        status: options?.status,
      },
      options
    );
  }

  async getCollectionItem(
    collectionSlug: string,
    itemSlug: string,
    options?: FetchOptions
  ): Promise<CollectionItem> {
    return this.request<CollectionItem>(
      `/collections/${encodeURIComponent(collectionSlug)}/items/${encodeURIComponent(itemSlug)}`,
      undefined,
      options
    );
  }

  async getNavigation(options?: FetchOptions & { maxDepth?: number }): Promise<NavigationItem[]> {
    return this.request<NavigationItem[]>("/navigation", {
      maxDepth: options?.maxDepth,
    }, options);
  }

  withLocale(locale: string): CMSClient {
    return new CMSClient({
      ...this.config,
      defaultLocale: locale,
    });
  }

  get baseUrl(): string {
    return this.config.baseUrl;
  }

  get defaultLocale(): string {
    return this.config.defaultLocale;
  }
}

export function createCMSClient(config: CMSClientConfig): CMSClient {
  return new CMSClient(config);
}
