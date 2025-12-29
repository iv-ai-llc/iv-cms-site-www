/**
 * BlockRenderer Component
 *
 * Renders block-based content from IV-CMS.
 * Uses pre-rendered HTML when available, with fallback rendering.
 */

import React from "react";
import type { Block } from "@/lib/cms-client";

interface BlockRendererProps {
  /** Array of blocks to render */
  blocks?: Block[];
  /** Pre-rendered HTML from CMS (preferred) */
  renderedHtml?: string | null;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Render block-based content
 *
 * Priority:
 * 1. Pre-rendered HTML from CMS (fastest, XSS-sanitized)
 * 2. Fallback to basic HTML rendering if blocks provided
 * 3. Empty if neither available
 */
export function BlockRenderer({
  blocks,
  renderedHtml,
  className = "",
}: BlockRendererProps) {
  // Prefer pre-rendered HTML (already sanitized by CMS)
  if (renderedHtml) {
    return (
      <div
        className={`block-content ${className}`.trim()}
        dangerouslySetInnerHTML={{ __html: renderedHtml }}
      />
    );
  }

  // Fallback: render blocks with basic styling
  if (blocks && blocks.length > 0) {
    return (
      <div className={`block-content ${className}`.trim()}>
        {blocks.map((block) => (
          <BlockFallback key={block.id} block={block} />
        ))}
      </div>
    );
  }

  // No content
  return null;
}

/**
 * Basic fallback renderer for individual blocks
 * Used when pre-rendered HTML is not available
 */
function BlockFallback({ block }: { block: Block }) {
  const { type, data } = block;

  switch (type) {
    case "hero/v1":
      return (
        <section className="block-hero py-16 text-center bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
          {data.title && (
            <h1 className="text-4xl font-bold mb-4">{String(data.title)}</h1>
          )}
          {data.subtitle && (
            <p className="text-xl opacity-90 mb-6">{String(data.subtitle)}</p>
          )}
          {data.description && (
            <p className="max-w-2xl mx-auto opacity-80">
              {String(data.description)}
            </p>
          )}
        </section>
      );

    case "features/v1":
      const features = Array.isArray(data.features) ? data.features : [];
      return (
        <section className="block-features py-12">
          {data.title && (
            <h2 className="text-3xl font-bold text-center mb-8">
              {String(data.title)}
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature: { title?: string; description?: string }, i: number) => (
              <div key={i} className="p-6 bg-white rounded-lg shadow-sm border">
                {feature.title && (
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                )}
                {feature.description && (
                  <p className="text-gray-600">{feature.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      );

    case "stats/v1":
      const stats = Array.isArray(data.stats) ? data.stats : [];
      return (
        <section className="block-stats py-12 bg-gray-50">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat: { value?: string; label?: string }, i: number) => (
              <div key={i}>
                <div className="text-3xl font-bold text-blue-600">
                  {stat.value}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      );

    case "cta/v1":
      return (
        <section className="block-cta py-12 text-center bg-gray-900 text-white">
          {data.title && (
            <h2 className="text-3xl font-bold mb-4">{String(data.title)}</h2>
          )}
          {data.description && (
            <p className="mb-6 opacity-80">{String(data.description)}</p>
          )}
        </section>
      );

    case "rich-text/v1":
      return (
        <section className="block-rich-text py-8 prose max-w-none">
          {data.html ? (
            <div dangerouslySetInnerHTML={{ __html: String(data.html) }} />
          ) : data.content ? (
            <p>{String(data.content)}</p>
          ) : null}
        </section>
      );

    default:
      // Unknown block type - render as JSON for debugging
      if (process.env.NODE_ENV === "development") {
        return (
          <div className="p-4 bg-yellow-50 border border-yellow-200 rounded">
            <p className="text-sm text-yellow-800">
              Unknown block type: {type}
            </p>
            <pre className="text-xs mt-2 overflow-auto">
              {JSON.stringify(data, null, 2)}
            </pre>
          </div>
        );
      }
      return null;
  }
}

export default BlockRenderer;
