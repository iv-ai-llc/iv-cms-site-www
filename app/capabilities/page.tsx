import type { Metadata } from "next";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { siteConfig } from "@/lib/config";
import {
  Zap,
  TrendingUp,
  Brain,
  Layers,
  Target,
  Rocket,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Capabilities",
  description: `Explore the capabilities and services offered by ${siteConfig.name}.`,
};

const capabilities = [
  {
    icon: Brain,
    title: "AI-Powered Editor",
    description: "Write better content faster with built-in AI assistance powered by OpenAI and Anthropic.",
    features: ["Content generation", "Grammar & style fixes", "Multi-language translation"],
  },
  {
    icon: Layers,
    title: "Multi-Site Management",
    description: "Manage content for unlimited websites from a single dashboard with shared or separate content.",
    features: ["Centralized dashboard", "Per-site permissions", "Shared collections"],
  },
  {
    icon: Zap,
    title: "Headless API",
    description: "Deliver content to any frontend via our RESTful API with TypeScript SDK support.",
    features: ["REST API", "TypeScript SDK", "Webhook notifications"],
  },
  {
    icon: Rocket,
    title: "Instant Publishing",
    description: "Publish content instantly with automatic cache invalidation and real-time preview.",
    features: ["One-click publish", "Live preview", "Scheduled publishing"],
  },
  {
    icon: Target,
    title: "Flexible Content Models",
    description: "Define custom content types with rich field types - no code required.",
    features: ["Custom collections", "Rich text fields", "Media & file uploads"],
  },
  {
    icon: TrendingUp,
    title: "Analytics & Insights",
    description: "Track content performance and team productivity with built-in analytics.",
    features: ["Content analytics", "API usage metrics", "Team activity logs"],
  },
];

export default function CapabilitiesPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section bg-gradient-to-b from-primary-500/5 via-transparent to-transparent">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary-500 font-medium mb-2">Platform Features</p>
            <h1 className="text-display-1 font-bold mb-6">
              <span className="gradient-text">Powerful Capabilities</span>
            </h1>
            <p className="text-xl text-[rgb(var(--muted))]">
              Everything you need to create, manage, and deliver content
              across all your digital properties.
            </p>
          </div>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((cap, index) => {
              const Icon = cap.icon;
              return (
                <Card key={index} hover className="group">
                  <CardHeader>
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <CardTitle className="text-xl">{cap.title}</CardTitle>
                  </CardHeader>
                  <CardDescription className="mb-4">{cap.description}</CardDescription>
                  <ul className="space-y-2">
                    {cap.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[rgb(var(--muted))]">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section bg-[rgb(var(--surface))]">
        <div className="container-wide">
          <h2 className="text-display-2 font-bold text-center mb-12">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Create", description: "Define your content structure" },
                { step: "02", title: "Edit", description: "Write with AI assistance" },
                { step: "03", title: "Publish", description: "Go live instantly" },
                { step: "04", title: "Deliver", description: "Fetch via API" },
              ].map((phase, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl font-bold gradient-text mb-2">{phase.step}</div>
                  <h3 className="text-lg font-semibold mb-1">{phase.title}</h3>
                  <p className="text-sm text-[rgb(var(--muted))]">{phase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
