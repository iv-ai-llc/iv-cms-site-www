import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import {
  BookOpen,
  Code,
  Zap,
  Database,
  Globe,
  Key,
  Webhook,
  FileText,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Documentation",
  description: `Learn how to use ${siteConfig.name} - guides, API reference, and tutorials.`,
};

const sections = [
  {
    title: "Getting Started",
    icon: Zap,
    description: "Quick start guide to get up and running with IV-CMS.",
    items: [
      { title: "Introduction", href: "#introduction" },
      { title: "Creating Your First Site", href: "#create-site" },
      { title: "Adding Content", href: "#add-content" },
      { title: "Publishing", href: "#publishing" },
    ],
  },
  {
    title: "Content Management",
    icon: FileText,
    description: "Learn how to create and manage your content.",
    items: [
      { title: "Pages", href: "#pages" },
      { title: "Collections", href: "#collections" },
      { title: "Media Library", href: "#media" },
      { title: "Rich Text Editor", href: "#editor" },
    ],
  },
  {
    title: "API Reference",
    icon: Code,
    description: "Complete API documentation for developers.",
    items: [
      { title: "Authentication", href: "#api-auth" },
      { title: "Pages API", href: "#api-pages" },
      { title: "Collections API", href: "#api-collections" },
      { title: "Media API", href: "#api-media" },
    ],
  },
  {
    title: "Integrations",
    icon: Webhook,
    description: "Connect IV-CMS with your existing tools.",
    items: [
      { title: "Webhooks", href: "#webhooks" },
      { title: "Next.js Integration", href: "#nextjs" },
      { title: "Vercel Deployment", href: "#vercel" },
      { title: "Custom Frontends", href: "#custom" },
    ],
  },
];

export default function DocsPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section bg-gradient-to-b from-primary-500/5 via-transparent to-transparent">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Documentation
            </div>
            <h1 className="text-display-1 font-bold mb-6">
              <span className="gradient-text">Learn IV-CMS</span>
            </h1>
            <p className="text-xl text-[rgb(var(--muted))]">
              Everything you need to build, manage, and deliver content with IV-CMS.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <div key={section.title} className="card group hover:border-primary-500/50 transition-colors">
                  <div className="w-12 h-12 rounded-lg bg-primary-500/10 flex items-center justify-center mb-4 group-hover:bg-primary-500/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{section.title}</h3>
                  <p className="text-sm text-[rgb(var(--muted))] mb-4">{section.description}</p>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          className="text-sm text-primary-500 hover:underline"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section id="introduction" className="section bg-[rgb(var(--surface))]">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-display-2 font-bold mb-8">Getting Started</h2>

            <div className="prose prose-lg dark:prose-invert max-w-none space-y-8">
              <div id="introduction" className="scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4">Introduction</h3>
                <p className="text-[rgb(var(--muted))] mb-4">
                  IV-CMS is a modern headless content management system designed for developers and content teams.
                  It provides a powerful API-first approach to content management while offering an intuitive
                  editing experience with AI-powered assistance.
                </p>
                <div className="bg-[rgb(var(--background))] rounded-lg p-6 border border-[rgb(var(--border))]">
                  <h4 className="font-semibold mb-2">Key Features</h4>
                  <ul className="list-disc list-inside text-[rgb(var(--muted))] space-y-1">
                    <li>Multi-site management from a single dashboard</li>
                    <li>AI-powered content editor with OpenAI and Anthropic</li>
                    <li>Flexible content models with custom collections</li>
                    <li>RESTful API with TypeScript support</li>
                    <li>Real-time preview and instant publishing</li>
                    <li>Built-in media management</li>
                  </ul>
                </div>
              </div>

              <div id="create-site" className="scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4">Creating Your First Site</h3>
                <ol className="list-decimal list-inside text-[rgb(var(--muted))] space-y-3">
                  <li><strong>Sign in</strong> to your IV-CMS dashboard</li>
                  <li>Click <strong>"New Site"</strong> from the sites overview</li>
                  <li>Enter your site name and configure settings</li>
                  <li>Generate an <strong>API key</strong> for your frontend</li>
                </ol>
              </div>

              <div id="add-content" className="scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4">Adding Content</h3>
                <p className="text-[rgb(var(--muted))] mb-4">
                  IV-CMS supports two main content types:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-[rgb(var(--background))] rounded-lg p-4 border border-[rgb(var(--border))]">
                    <h4 className="font-semibold mb-2">Pages</h4>
                    <p className="text-sm text-[rgb(var(--muted))]">
                      Standalone content pages like Home, About, Contact. Each page has a unique slug and rich content.
                    </p>
                  </div>
                  <div className="bg-[rgb(var(--background))] rounded-lg p-4 border border-[rgb(var(--border))]">
                    <h4 className="font-semibold mb-2">Collections</h4>
                    <p className="text-sm text-[rgb(var(--muted))]">
                      Repeatable content types like Blog Posts, Products, Team Members. Define a schema once, create many items.
                    </p>
                  </div>
                </div>
              </div>

              <div id="publishing" className="scroll-mt-24">
                <h3 className="text-2xl font-semibold mb-4">Publishing</h3>
                <p className="text-[rgb(var(--muted))] mb-4">
                  Content in IV-CMS can be in one of three states:
                </p>
                <ul className="list-disc list-inside text-[rgb(var(--muted))] space-y-2">
                  <li><strong>Draft</strong> - Work in progress, not visible via API</li>
                  <li><strong>Published</strong> - Live and available via API</li>
                  <li><strong>Scheduled</strong> - Will be published at a future date</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference */}
      <section id="api-auth" className="section">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-display-2 font-bold mb-8">API Reference</h2>

            <div className="space-y-8">
              <div className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <Key className="w-6 h-6 text-primary-500" />
                  <h3 className="text-2xl font-semibold">Authentication</h3>
                </div>
                <p className="text-[rgb(var(--muted))] mb-4">
                  All API requests require authentication using an API key. Include your key in the request headers:
                </p>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-slate-300">
{`curl -X GET "https://your-cms.vercel.app/api/v1/content/pages" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`}
                  </pre>
                </div>
              </div>

              <div id="api-pages" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="w-6 h-6 text-primary-500" />
                  <h3 className="text-2xl font-semibold">Pages API</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-[rgb(var(--surface))] rounded-lg p-4 border border-[rgb(var(--border))]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-mono rounded">GET</span>
                      <code className="text-sm">/api/v1/content/pages</code>
                    </div>
                    <p className="text-sm text-[rgb(var(--muted))]">List all published pages</p>
                  </div>

                  <div className="bg-[rgb(var(--surface))] rounded-lg p-4 border border-[rgb(var(--border))]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-mono rounded">GET</span>
                      <code className="text-sm">/api/v1/content/pages/:slug</code>
                    </div>
                    <p className="text-sm text-[rgb(var(--muted))]">Get a single page by slug</p>
                  </div>
                </div>
              </div>

              <div id="api-collections" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <Database className="w-6 h-6 text-primary-500" />
                  <h3 className="text-2xl font-semibold">Collections API</h3>
                </div>

                <div className="space-y-4">
                  <div className="bg-[rgb(var(--surface))] rounded-lg p-4 border border-[rgb(var(--border))]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-mono rounded">GET</span>
                      <code className="text-sm">/api/v1/content/collections/:slug/items</code>
                    </div>
                    <p className="text-sm text-[rgb(var(--muted))]">List all items in a collection</p>
                  </div>

                  <div className="bg-[rgb(var(--surface))] rounded-lg p-4 border border-[rgb(var(--border))]">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="px-2 py-1 bg-green-500/10 text-green-500 text-xs font-mono rounded">GET</span>
                      <code className="text-sm">/api/v1/content/collections/:slug/items/:itemSlug</code>
                    </div>
                    <p className="text-sm text-[rgb(var(--muted))]">Get a single collection item</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section id="webhooks" className="section bg-[rgb(var(--surface))]">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-display-2 font-bold mb-8">Integrations</h2>

            <div className="space-y-8">
              <div className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <Webhook className="w-6 h-6 text-primary-500" />
                  <h3 className="text-2xl font-semibold">Webhooks</h3>
                </div>
                <p className="text-[rgb(var(--muted))] mb-4">
                  IV-CMS can notify your application when content changes. Configure webhooks in your site settings to receive POST requests on:
                </p>
                <ul className="list-disc list-inside text-[rgb(var(--muted))] space-y-1">
                  <li><code className="text-sm bg-[rgb(var(--background))] px-1 rounded">page.published</code> - When a page is published</li>
                  <li><code className="text-sm bg-[rgb(var(--background))] px-1 rounded">page.updated</code> - When a page is updated</li>
                  <li><code className="text-sm bg-[rgb(var(--background))] px-1 rounded">item.published</code> - When a collection item is published</li>
                  <li><code className="text-sm bg-[rgb(var(--background))] px-1 rounded">item.updated</code> - When a collection item is updated</li>
                </ul>
              </div>

              <div id="nextjs" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-6 h-6 text-primary-500" />
                  <h3 className="text-2xl font-semibold">Next.js Integration</h3>
                </div>
                <p className="text-[rgb(var(--muted))] mb-4">
                  Fetch content in your Next.js app using the API:
                </p>
                <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                  <pre className="text-sm text-slate-300">
{`// lib/cms.ts
const CMS_URL = process.env.CMS_URL;
const CMS_API_KEY = process.env.CMS_API_KEY;

export async function getPage(slug: string) {
  const res = await fetch(
    \`\${CMS_URL}/api/v1/content/pages/\${slug}\`,
    {
      headers: {
        Authorization: \`Bearer \${CMS_API_KEY}\`,
      },
      next: { revalidate: 60 },
    }
  );
  return res.json();
}`}
                  </pre>
                </div>
              </div>

              <div id="vercel" className="scroll-mt-24">
                <div className="flex items-center gap-3 mb-4">
                  <Zap className="w-6 h-6 text-primary-500" />
                  <h3 className="text-2xl font-semibold">Vercel Deployment</h3>
                </div>
                <p className="text-[rgb(var(--muted))] mb-4">
                  For instant cache invalidation with Vercel, set up a revalidation webhook:
                </p>
                <ol className="list-decimal list-inside text-[rgb(var(--muted))] space-y-2">
                  <li>Create an API route at <code className="text-sm bg-[rgb(var(--background))] px-1 rounded">/api/revalidate</code></li>
                  <li>Add a <code className="text-sm bg-[rgb(var(--background))] px-1 rounded">REVALIDATE_SECRET</code> environment variable</li>
                  <li>Configure the webhook URL in IV-CMS site settings</li>
                  <li>Content updates will automatically trigger revalidation</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-display-2 font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-[rgb(var(--muted))] mb-8">
              Create your free account and start building with IV-CMS today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {siteConfig.platform.signUp && (
                <a
                  href={siteConfig.platform.signUp}
                  className="px-6 py-3 bg-primary-500 hover:bg-primary-600 text-white font-medium rounded-lg transition-colors"
                >
                  Start Free
                </a>
              )}
              <Link
                href="/contact"
                className="px-6 py-3 border border-[rgb(var(--border))] hover:bg-[rgb(var(--surface))] font-medium rounded-lg transition-colors"
              >
                Contact Sales
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
