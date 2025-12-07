/**
 * Site Configuration
 *
 * This file contains site-wide configuration that can be customized
 * for each deployment. Values can come from environment variables
 * or be hardcoded as defaults.
 */

export const siteConfig = {
  // Site name displayed in header, footer, and metadata
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Site Name",

  // Short tagline for the site
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || "Your tagline here",

  // Site description for SEO
  description: "Enterprise solutions that drive results.",

  // Keywords for SEO
  keywords: ["solutions", "enterprise", "consulting"],

  // Navigation items - customize for your site
  navigation: [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/capabilities", label: "Capabilities" },
    { href: "/solutions", label: "Solutions" },
    { href: "/perspectives", label: "Perspectives" },
    { href: "/contact", label: "Contact" },
  ],

  // Footer links
  footer: {
    company: [
      { label: "About", href: "/about" },
      { label: "Capabilities", href: "/capabilities" },
      { label: "Solutions", href: "/solutions" },
      { label: "Contact", href: "/contact" },
    ],
    resources: [
      { label: "Perspectives", href: "/perspectives" },
      { label: "Case Studies", href: "/solutions" },
    ],
  },

  // Social links
  social: {
    email: "contact@example.com",
    linkedin: "https://linkedin.com",
    github: "https://github.com",
  },
};
