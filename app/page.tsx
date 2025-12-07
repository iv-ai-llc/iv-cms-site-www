import { Hero } from "@/components/sections/Hero";
import { Features } from "@/components/sections/Features";
import { Stats } from "@/components/sections/Stats";
import { Pillars } from "@/components/sections/Pillars";
import { CTA } from "@/components/sections/CTA";
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
    subtitle: "Your Tagline Here",
    title: "Your Main Headline Goes Here",
    description:
      "A compelling description of your value proposition that resonates with your target audience.",
    ctaText: "Get Started",
    ctaHref: "/contact",
    secondaryCta: {
      text: "Learn More",
      href: "/capabilities",
    },
  },
  features: {
    title: "What We Deliver",
    subtitle: "Capabilities",
    items: [
      {
        icon: "automate",
        title: "Feature One",
        description:
          "Description of your first key feature or capability that provides value to customers.",
      },
      {
        icon: "accelerate",
        title: "Feature Two",
        description:
          "Description of your second key feature that differentiates you from competitors.",
      },
      {
        icon: "augment",
        title: "Feature Three",
        description:
          "Description of your third feature that addresses customer pain points.",
      },
      {
        icon: "transform",
        title: "Feature Four",
        description:
          "Description of your fourth feature that showcases innovation.",
      },
      {
        icon: "anticipate",
        title: "Feature Five",
        description:
          "Description of your fifth feature that demonstrates expertise.",
      },
      {
        icon: "amplify",
        title: "Feature Six",
        description:
          "Description of your sixth feature that drives results.",
      },
    ],
  },
  stats: {
    title: "Results That Matter",
    description:
      "Key metrics that demonstrate the impact of our solutions.",
    items: [
      { value: "40%", label: "Metric One" },
      { value: "60%", label: "Metric Two" },
      { value: "3x", label: "Metric Three" },
      { value: "99%", label: "Metric Four" },
    ],
  },
  pillars: {
    title: "Our Approach",
    subtitle: "Three Pillars",
    items: [
      {
        emoji: "🎯",
        title: "Pillar One",
        description:
          "Description of your first core principle or approach that guides your work.",
      },
      {
        emoji: "🤝",
        title: "Pillar Two",
        description:
          "Description of your second principle that builds trust with customers.",
      },
      {
        emoji: "🚀",
        title: "Pillar Three",
        description:
          "Description of your third principle that drives innovation.",
      },
    ],
  },
  cta: {
    title: "Ready to Get Started?",
    description:
      "Let's discuss how we can help you achieve your goals.",
    buttonText: "Contact Us",
    buttonHref: "/contact",
  },
};

export default async function HomePage() {
  // Try to fetch content from CMS if configured
  let content = staticContent;

  if (isCMSConfigured) {
    try {
      const cmsContent = await fetchPage("home");
      if (cmsContent?.metadata) {
        content = { ...staticContent, ...cmsContent.metadata };
      }
    } catch (error) {
      console.error("Failed to fetch CMS content:", error);
    }
  }

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
