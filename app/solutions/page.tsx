import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";
import { fetchCollectionItems, isCMSConfigured } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Solutions",
  description: `Explore solutions and case studies from ${siteConfig.name}.`,
};

// Static fallback content
const staticSolutions = [
  {
    slug: "solution-1",
    title: "Solution One",
    description: "Description of your first solution and the problems it solves.",
    category: "Category A",
  },
  {
    slug: "solution-2",
    title: "Solution Two",
    description: "Description of your second solution and its key benefits.",
    category: "Category B",
  },
  {
    slug: "solution-3",
    title: "Solution Three",
    description: "Description of your third solution and the outcomes it delivers.",
    category: "Category A",
  },
];

export default async function SolutionsPage() {
  // Try to fetch from CMS
  let solutions = staticSolutions;

  if (isCMSConfigured) {
    try {
      const cmsData = await fetchCollectionItems("solutions");
      if (cmsData?.items?.length > 0) {
        solutions = cmsData.items;
      }
    } catch (error) {
      console.error("Failed to fetch solutions:", error);
    }
  }

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section bg-gradient-to-b from-primary-500/5 via-transparent to-transparent">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary-500 font-medium mb-2">Our Work</p>
            <h1 className="text-display-1 font-bold mb-6">
              <span className="gradient-text">Solutions</span>
            </h1>
            <p className="text-xl text-[rgb(var(--muted))]">
              Proven solutions that deliver measurable results for our clients.
            </p>
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="section">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} hover className="group flex flex-col">
                <CardHeader>
                  <div className="inline-flex px-3 py-1 rounded-full bg-primary-500/10 text-primary-500 text-xs font-medium mb-3">
                    {solution.category || "Solution"}
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary-500 transition-colors">
                    {solution.title}
                  </CardTitle>
                </CardHeader>
                <CardDescription className="flex-1">{solution.description}</CardDescription>
                <div className="mt-4 pt-4 border-t border-[rgb(var(--border))]">
                  <Link
                    href={`/solutions/${solution.slug}`}
                    className="inline-flex items-center text-primary-500 font-medium hover:underline"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-r from-primary-500 to-accent-500">
        <div className="container-wide text-center text-white">
          <h2 className="text-display-2 font-bold mb-4">Have a project in mind?</h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can help you achieve your goals.
          </p>
          <Link href="/contact">
            <Button size="lg" className="bg-white text-primary-500 hover:bg-white/90">
              Get in Touch
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
