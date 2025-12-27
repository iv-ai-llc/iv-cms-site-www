/**
 * Site Configuration
 *
 * This file contains site-wide configuration that can be customized
 * for each deployment. Values can come from environment variables
 * or be hardcoded as defaults.
 */

// Platform URL for authentication redirects
const platformUrl = process.env.NEXT_PUBLIC_PLATFORM_URL || "";

export const siteConfig = {
  // Site name displayed in header, footer, and metadata
  name: process.env.NEXT_PUBLIC_SITE_NAME || "IV-CMS",

  // Short tagline for the site
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || "Modern Headless CMS",

  // Site description for SEO
  description: "A modern, headless content management system for managing content across multiple sites with AI-powered editing and real-time collaboration.",

  // Keywords for SEO
  keywords: ["cms", "headless cms", "content management", "ai editor", "multi-site", "nextjs"],

  // Platform URLs for authentication (external links to platform)
  platform: {
    url: platformUrl,
    signIn: platformUrl ? `${platformUrl}/sign-in` : null,
    signUp: platformUrl ? `${platformUrl}/sign-up` : null,
    dashboard: platformUrl ? `${platformUrl}/dashboard` : null,
  },

  // Navigation items - customize for your site
  navigation: [
    { href: "/", label: "Home" },
    { href: "/capabilities", label: "Features" },
    { href: "/docs", label: "Docs" },
    { href: "/contact", label: "Contact" },
  ],

  // Footer links
  footer: {
    product: [
      { label: "Features", href: "/capabilities" },
      { label: "Documentation", href: "/docs" },
      { label: "Pricing", href: "/contact" },
    ],
    company: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "GitHub", href: "https://github.com/iv-ai-llc/iv-cms-platform" },
    ],
  },

  // Social links
  social: {
    email: "support@iv-cms.space",
    github: "https://github.com/iv-ai-llc/iv-cms-platform",
  },
};
