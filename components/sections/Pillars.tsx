import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

interface Pillar {
  emoji: string;
  title: string;
  description: string;
}

interface PillarsProps {
  title?: string;
  subtitle?: string;
  pillars: Pillar[];
}

export function Pillars({ title, subtitle, pillars }: PillarsProps) {
  return (
    <section className="section">
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {pillars.map((pillar, index) => (
            <Card key={index} hover className="text-center">
              <CardHeader>
                <div className="text-5xl mb-4">{pillar.emoji}</div>
                <CardTitle className="text-2xl">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {pillar.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
