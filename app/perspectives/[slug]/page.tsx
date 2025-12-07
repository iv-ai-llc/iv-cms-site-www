import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { fetchCollectionItem, fetchCollectionItems, isCMSConfigured } from "@/lib/cms";

// Static fallback articles
const staticArticles: Record<string, {
  title: string;
  description: string;
  content: string;
  category: string;
  date: string;
}> = {
  "article-1": {
    title: "Article One",
    description: "A brief summary of your first article.",
    content: `
      <h2>Introduction</h2>
      <p>This is placeholder content for your first article. Replace this with your actual content.</p>
      <p>You can write rich content here that will be displayed on the article page.</p>
      <h2>Key Points</h2>
      <ul>
        <li>Point one about the topic</li>
        <li>Point two with more details</li>
        <li>Point three with actionable insights</li>
      </ul>
      <h2>Conclusion</h2>
      <p>Wrap up your article with key takeaways and next steps.</p>
    `,
    category: "Insights",
    date: "2024-01-15",
  },
  "article-2": {
    title: "Article Two",
    description: "A brief summary of your second article.",
    content: `
      <h2>Introduction</h2>
      <p>This is placeholder content for your second article. Replace this with your actual content.</p>
    `,
    category: "Trends",
    date: "2024-01-10",
  },
  "article-3": {
    title: "Article Three",
    description: "A brief summary of your third article.",
    content: `
      <h2>Introduction</h2>
      <p>This is placeholder content for your third article. Replace this with your actual content.</p>
    `,
    category: "Best Practices",
    date: "2024-01-05",
  },
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;

  // Try CMS first
  if (isCMSConfigured) {
    try {
      const article = await fetchCollectionItem("perspectives", slug);
      if (article) {
        return {
          title: article.title,
          description: article.seo?.description || article.metadata?.description,
        };
      }
    } catch {
      // Fall through to static
    }
  }

  const article = staticArticles[slug];
  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: article.title,
    description: article.description,
  };
}

export async function generateStaticParams() {
  // Try CMS first
  if (isCMSConfigured) {
    try {
      const data = await fetchCollectionItems("perspectives");
      if (data?.items?.length > 0) {
        return data.items.map((item: { slug: string }) => ({ slug: item.slug }));
      }
    } catch {
      // Fall through to static
    }
  }

  return Object.keys(staticArticles).map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  // Try CMS first
  let article = null;

  if (isCMSConfigured) {
    try {
      article = await fetchCollectionItem("perspectives", slug);
    } catch {
      // Fall through to static
    }
  }

  // Fall back to static content
  if (!article) {
    const staticArticle = staticArticles[slug];
    if (!staticArticle) {
      notFound();
    }
    article = {
      title: staticArticle.title,
      html: staticArticle.content,
      metadata: {
        category: staticArticle.category,
        date: staticArticle.date,
      },
    };
  }

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="section bg-gradient-to-b from-primary-500/5 via-transparent to-transparent">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/perspectives"
              className="inline-flex items-center text-[rgb(var(--muted))] hover:text-primary-500 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Perspectives
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium">
                {article.metadata?.category || "Article"}
              </span>
              {article.metadata?.date && (
                <span className="text-sm text-[rgb(var(--muted))]">
                  {new Date(article.metadata.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              )}
            </div>

            <h1 className="text-display-1 font-bold mb-6">{article.title}</h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-20">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto">
            <div
              className="prose prose-lg dark:prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: article.html || "" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
