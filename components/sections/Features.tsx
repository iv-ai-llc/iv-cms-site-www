import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import {
  Zap,
  TrendingUp,
  Brain,
  Layers,
  Target,
  Rocket,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
}

const iconMap: Record<string, LucideIcon> = {
  automate: Zap,
  accelerate: Rocket,
  augment: Brain,
  transform: Layers,
  anticipate: Target,
  amplify: TrendingUp,
  default: Zap,
};

function getIcon(iconName: string): LucideIcon {
  return iconMap[iconName.toLowerCase()] || iconMap.default;
}

export function Features({ title, subtitle, features }: FeaturesProps) {
  return (
    <section className="section bg-[rgb(var(--surface))]">
      <div className="container-wide">
        {(title || subtitle) && (
          <div className="text-center mb-12 md:mb-16">
            {subtitle && (
              <p className="text-primary-500 font-medium mb-2">{subtitle}</p>
            )}
            {title && (
              <h2 className="text-display-2 font-bold">{title}</h2>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const Icon = getIcon(feature.icon);
            return (
              <Card key={index} hover className="group">
                <CardHeader>
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardDescription>{feature.description}</CardDescription>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
