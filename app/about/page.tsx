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
              <span className="gradient-text">About Us</span>
            </h1>
            <p className="text-xl text-[rgb(var(--muted))]">
              Learn about our mission, values, and the team behind {siteConfig.name}.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="section">
        <div className="container-wide">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <h2 className="text-display-2 font-bold mb-6">Our Story</h2>
              <p className="text-[rgb(var(--muted))] text-lg leading-relaxed mb-6">
                Add your company story here. Describe how your organization was founded,
                what problems you set out to solve, and what drives your team every day.
              </p>
              <p className="text-[rgb(var(--muted))] text-lg leading-relaxed mb-6">
                Share your vision for the future and how you plan to continue delivering
                value to your customers and stakeholders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="section bg-[rgb(var(--surface))]">
        <div className="container-wide">
          <h2 className="text-display-2 font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                title: "Value One",
                description: "Description of your first core value that guides your organization.",
              },
              {
                title: "Value Two",
                description: "Description of your second core value that shapes your culture.",
              },
              {
                title: "Value Three",
                description: "Description of your third core value that drives excellence.",
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

      {/* Team Section */}
      <section className="section">
        <div className="container-wide">
          <h2 className="text-display-2 font-bold text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { name: "Team Member 1", role: "Founder & CEO" },
              { name: "Team Member 2", role: "Head of Product" },
              { name: "Team Member 3", role: "Lead Engineer" },
            ].map((member, index) => (
              <div key={index} className="card text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-primary-500">
                    {member.name.charAt(0)}
                  </span>
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-[rgb(var(--muted))]">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
