import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { siteConfig } from "@/lib/config";
import { fetchCollectionItems, isCMSConfigured } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Perspectives",
  description: `Insights and articles from ${siteConfig.name}.`,
};

// Static fallback content
const staticPerspectives = [
  {
    slug: "article-1",
    title: "Article One",
    description: "A brief summary of your first article or thought leadership piece.",
    category: "Insights",
    date: "2024-01-15",
  },
  {
    slug: "article-2",
    title: "Article Two",
    description: "A brief summary of your second article discussing industry trends.",
    category: "Trends",
    date: "2024-01-10",
  },
  {
    slug: "article-3",
    title: "Article Three",
    description: "A brief summary of your third article sharing best practices.",
    category: "Best Practices",
    date: "2024-01-05",
  },
];

export default async function PerspectivesPage() {
  // Try to fetch from CMS
  let perspectives = staticPerspectives;

  if (isCMSConfigured) {
    try {
      const cmsData = await fetchCollectionItems("perspectives");
      if (cmsData?.items?.length > 0) {
        perspectives = cmsData.items;
      }
    } catch (error) {
      console.error("Failed to fetch perspectives:", error);
    }
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section bg-gradient-to-b from-primary-500/5 via-transparent to-transparent">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary-500 font-medium mb-2">Blog</p>
            <h1 className="text-display-1 font-bold mb-6">
              <span className="gradient-text">Perspectives</span>
            </h1>
            <p className="text-xl text-[rgb(var(--muted))]">
              Insights, ideas, and expert perspectives from our team.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {perspectives.map((article, index) => (
              <Card key={index} hover className="group flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-xs font-medium">
                      {article.category || "Article"}
                    </span>
                    {article.date && (
                      <span className="text-xs text-[rgb(var(--muted))]">
                        {new Date(article.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary-500 transition-colors">
                    {article.title}
                  </CardTitle>
                </CardHeader>
                <CardDescription className="flex-1">{article.description}</CardDescription>
                <div className="mt-4 pt-4 border-t border-[rgb(var(--border))]">
                  <Link
                    href={`/perspectives/${article.slug}`}
                    className="inline-flex items-center text-primary-500 font-medium hover:underline"
                  >
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
