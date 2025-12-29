import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Stats } from "@/components/sections/Stats";
import { Pillars } from "@/components/sections/Pillars";
import { CTA } from "@/components/sections/CTA";
import { BlockRenderer } from "@/components/ui/BlockRenderer";
import { fetchPage, isCMSConfigured } from "@/lib/cms";

/**
 * Home Page Content
 *
 * This content is used as static fallback when CMS is not configured.
 * Once you connect to IV-CMS, content will be fetched dynamically.
 *
 * To customize: Edit these values or connect to your CMS.
 */
const staticContent = {
  hero: {
    subtitle: "Modern Headless CMS",
    title: "Content Management, Simplified",
    description:
      "A powerful headless CMS built for modern teams. Manage content across multiple sites with AI-powered editing, real-time collaboration, and seamless API delivery.",
    ctaText: "Get Started",
    ctaHref: "/contact",
    secondaryCta: {
      text: "View Features",
      href: "/capabilities",
    },
  },
  features: {
    title: "Everything You Need",
    subtitle: "Platform Features",
    items: [
      {
        icon: "automate",
        title: "AI-Powered Editor",
        description:
          "Write faster with AI assistance. Generate content, improve copy, and translate text with built-in AI tools.",
      },
      {
        icon: "accelerate",
        title: "Multi-Site Management",
        description:
          "Manage content for multiple websites from a single dashboard. Share collections across sites or keep them separate.",
      },
      {
        icon: "augment",
        title: "Headless API",
        description:
          "Deliver content anywhere via our REST API. Built for Next.js, React, and any frontend framework.",
      },
      {
        icon: "transform",
        title: "Real-Time Preview",
        description:
          "See changes instantly with live preview. Edit content and watch it update on your site in real-time.",
      },
      {
        icon: "anticipate",
        title: "Flexible Collections",
        description:
          "Create custom content types with flexible schemas. Blog posts, products, team members - define any structure.",
      },
      {
        icon: "amplify",
        title: "Media Management",
        description:
          "Upload, organize, and optimize images and files. Automatic resizing and CDN delivery included.",
      },
    ],
  },
  stats: {
    title: "Built for Performance",
    description:
      "IV-CMS is designed for speed, reliability, and developer experience.",
    items: [
      { value: "<50ms", label: "API Response Time" },
      { value: "99.9%", label: "Uptime SLA" },
      { value: "10+", label: "Supported Locales" },
      { value: "Unlimited", label: "API Requests" },
    ],
  },
  pillars: {
    title: "Why IV-CMS",
    subtitle: "Core Principles",
    items: [
      {
        emoji: "🎯",
        title: "Developer First",
        description:
          "Built by developers, for developers. Clean APIs, TypeScript support, and comprehensive documentation.",
      },
      {
        emoji: "🤝",
        title: "Content Team Friendly",
        description:
          "Intuitive editing experience that content teams love. No technical knowledge required to publish.",
      },
      {
        emoji: "🚀",
        title: "Scale Without Limits",
        description:
          "From startup to enterprise. Built on modern infrastructure that grows with your needs.",
      },
    ],
  },
  cta: {
    title: "Ready to Transform Your Content?",
    description:
      "Join teams who are already managing their content smarter with IV-CMS.",
    buttonText: "Get Started",
    buttonHref: "/contact",
  },
};

export default async function HomePage() {
  // Try to fetch content from CMS if configured
  let content = staticContent;
  let blocks: unknown[] | undefined;
  let renderedHtml: string | null = null;

  if (isCMSConfigured) {
    try {
      const cmsContent = await fetchPage("home");
      if (cmsContent?.metadata) {
        content = { ...staticContent, ...cmsContent.metadata };
      }
      // Check for block-based content
      if (cmsContent?.blocks && cmsContent.blocks.length > 0) {
        blocks = cmsContent.blocks;
        renderedHtml = cmsContent.renderedHtml || null;
      }
    } catch (error) {
      console.error("Failed to fetch CMS content:", error);
    }
  }

  // If blocks are available, render them instead of static components
  if (blocks && blocks.length > 0) {
    return (
      <BlockRenderer
        blocks={blocks as Parameters<typeof BlockRenderer>[0]["blocks"]}
        renderedHtml={renderedHtml}
      />
    );
  }

  // Fallback to static content
  return (
    <>
      <Hero
        title={content.hero.title}
        subtitle={content.hero.subtitle}
        description={content.hero.description}
        ctaText={content.hero.ctaText}
        ctaHref={content.hero.ctaHref}
        secondaryCta={content.hero.secondaryCta}
      />

      <Features
        title={content.features.title}
        subtitle={content.features.subtitle}
        features={content.features.items}
      />

      <Stats
        title={content.stats.title}
        description={content.stats.description}
        stats={content.stats.items}
      />

      <Pillars
        title={content.pillars.title}
        subtitle={content.pillars.subtitle}
        pillars={content.pillars.items}
      />

      <CTA
        title={content.cta.title}
        description={content.cta.description}
        buttonText={content.cta.buttonText}
        buttonHref={content.cta.buttonHref}
      />
    </>
  );
}
