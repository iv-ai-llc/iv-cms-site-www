import type { Metadata } from "next";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${siteConfig.name} and our mission.`,
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section bg-gradient-to-b from-primary-500/5 via-transparent to-transparent">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-display-1 font-bold mb-6">
              <span className="gradient-text">About IV-CMS</span>
            </h1>
            <p className="text-xl text-[rgb(var(--muted))]">
              Building the future of content management with AI-powered tools and developer-first design.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-display-2 font-bold mb-6">Our Mission</h2>
              <p className="text-[rgb(var(--muted))] text-lg leading-relaxed mb-6">
                IV-CMS was built to solve a common problem: managing content across multiple
                websites shouldn&apos;t be complicated. Traditional CMS platforms are either too
                rigid for developers or too complex for content teams.
              </p>
              <p className="text-[rgb(var(--muted))] text-lg leading-relaxed mb-6">
                We created a headless CMS that gives developers the flexibility they need while
                providing content editors with an intuitive, AI-powered writing experience.
                Whether you&apos;re managing one site or dozens, IV-CMS scales with your needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-[rgb(var(--surface))]">
        <div className="container-wide">
          <h2 className="text-display-2 font-bold text-center mb-12">Our Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Developer Experience",
                description: "Clean APIs, TypeScript support, and comprehensive docs. Build faster with tools you love.",
              },
              {
                title: "Content Freedom",
                description: "Define any content structure. No rigid templates - your content, your way.",
              },
              {
                title: "Performance First",
                description: "Edge-cached API responses under 50ms. Your users deserve fast experiences.",
              },
            ].map((value, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-[rgb(var(--muted))]">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="section">
        <div className="container-wide">
          <h2 className="text-display-2 font-bold text-center mb-12">Built With Modern Tech</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Next.js", role: "React Framework" },
              { name: "Vercel", role: "Edge Infrastructure" },
              { name: "TypeScript", role: "Type Safety" },
              { name: "Clerk", role: "Authentication" },
              { name: "Upstash", role: "Serverless Data" },
              { name: "TipTap", role: "Rich Text Editor" },
            ].map((tech, index) => (
              <div key={index} className="card text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-primary-500">
                    {tech.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{tech.name}</h3>
                <p className="text-[rgb(var(--muted))]">{tech.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
