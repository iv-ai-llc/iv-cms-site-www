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
    icon: Zap,
    title: "Capability One",
    description: "Detailed description of your first capability and the value it delivers.",
    features: ["Feature A", "Feature B", "Feature C"],
  },
  {
    icon: Rocket,
    title: "Capability Two",
    description: "Detailed description of your second capability and how it helps customers.",
    features: ["Feature D", "Feature E", "Feature F"],
  },
  {
    icon: Brain,
    title: "Capability Three",
    description: "Detailed description of your third capability and its benefits.",
    features: ["Feature G", "Feature H", "Feature I"],
  },
  {
    icon: Layers,
    title: "Capability Four",
    description: "Detailed description of your fourth capability and outcomes.",
    features: ["Feature J", "Feature K", "Feature L"],
  },
  {
    icon: Target,
    title: "Capability Five",
    description: "Detailed description of your fifth capability and expertise.",
    features: ["Feature M", "Feature N", "Feature O"],
  },
  {
    icon: TrendingUp,
    title: "Capability Six",
    description: "Detailed description of your sixth capability and results.",
    features: ["Feature P", "Feature Q", "Feature R"],
  },
];

export default function CapabilitiesPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="section bg-gradient-to-b from-primary-500/5 via-transparent to-transparent">
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-primary-500 font-medium mb-2">What We Do</p>
            <h1 className="text-display-1 font-bold mb-6">
              <span className="gradient-text">Our Capabilities</span>
            </h1>
            <p className="text-xl text-[rgb(var(--muted))]">
              Comprehensive solutions designed to help you achieve your goals
              and drive meaningful results.
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
          <h2 className="text-display-2 font-bold text-center mb-12">Our Process</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "01", title: "Discover", description: "Understand your needs" },
                { step: "02", title: "Design", description: "Create the solution" },
                { step: "03", title: "Develop", description: "Build and iterate" },
                { step: "04", title: "Deliver", description: "Launch and support" },
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
