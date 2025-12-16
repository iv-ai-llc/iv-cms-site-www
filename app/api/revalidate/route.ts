/**
 * On-Demand Revalidation API
 *
 * Called by IV-CMS when content changes to invalidate cached pages.
 * Supports tag-based and path-based revalidation.
 *
 * POST /api/revalidate
 * Headers:
 *   x-revalidate-secret: <secret>
 * Body:
 *   { event, type, slug, collectionSlug, locale }
 */

import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

// Webhook event types from CMS
type WebhookEvent =
  | "page.created"
  | "page.updated"
  | "page.published"
  | "page.deleted"
  | "collection.created"
  | "collection.updated"
  | "collection.deleted"
  | "item.created"
  | "item.updated"
  | "item.published"
  | "item.deleted"
  | "settings.updated";

interface RevalidatePayload {
  event: WebhookEvent;
  siteId: string;
  timestamp: string;
  data: {
    id: string;
    type: "page" | "collection" | "item" | "settings";
    slug?: string;
    collectionSlug?: string;
    locale?: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    // Verify secret - FAIL CLOSED: reject if secret is not configured
    const secret = request.headers.get("x-revalidate-secret");
    const expectedSecret = process.env.REVALIDATE_SECRET;

    if (!expectedSecret) {
      console.error("[Revalidate] REVALIDATE_SECRET not configured - rejecting request");
      return NextResponse.json(
        { error: "Revalidation not configured" },
        { status: 503 }
      );
    }

    if (secret !== expectedSecret) {
      return NextResponse.json(
        { error: "Invalid secret" },
        { status: 401 }
      );
    }

    const payload: RevalidatePayload = await request.json();
    const { event, data } = payload;
    const { type, slug, collectionSlug } = data;

    const revalidated: string[] = [];

    // Handle different content types
    if (type === "page") {
      // Revalidate specific page path
      if (slug) {
        if (slug === "home") {
          revalidatePath("/");
          revalidated.push("/");
        } else {
          revalidatePath(`/${slug}`);
          revalidated.push(`/${slug}`);
        }
      }
      // Always revalidate home for navigation changes
      revalidatePath("/");
      if (!revalidated.includes("/")) revalidated.push("/");

    } else if (type === "item" && collectionSlug) {
      // Collection item (perspectives, solutions, etc.)
      switch (collectionSlug) {
        case "perspectives":
          // Revalidate perspectives list and specific article
          revalidatePath("/perspectives");
          revalidated.push("/perspectives");
          if (slug) {
            revalidatePath(`/perspectives/${slug}`);
            revalidated.push(`/perspectives/${slug}`);
          }
          break;

        case "solutions":
          // Revalidate solutions page
          revalidatePath("/solutions");
          revalidated.push("/solutions");
          break;

        default:
          // Generic collection - revalidate by tag if available
          revalidateTag(collectionSlug, "max");
          revalidated.push(`tag:${collectionSlug}`);
      }

    } else if (type === "collection") {
      // Collection schema changed - revalidate all items
      if (collectionSlug) {
        revalidateTag(collectionSlug, "max");
        revalidated.push(`tag:${collectionSlug}`);
      }

    } else if (type === "settings") {
      // Site settings changed - revalidate everything
      revalidatePath("/", "layout");
      revalidated.push("/ (layout)");
    }

    console.log(`[Revalidate] Event: ${event}, Revalidated: ${revalidated.join(", ")}`);

    return NextResponse.json({
      revalidated: true,
      paths: revalidated,
      timestamp: Date.now(),
    });

  } catch (error) {
    console.error("[Revalidate] Error:", error);
    return NextResponse.json(
      {
        error: "Revalidation failed",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// Also support GET for health checks
export async function GET() {
  return NextResponse.json({
    status: "ok",
    endpoint: "revalidate",
  });
}
