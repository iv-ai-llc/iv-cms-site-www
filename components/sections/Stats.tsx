interface Stat {
  value: string;
  label: string;
}

interface StatsProps {
  title?: string;
  description?: string;
  stats: Stat[];
}

export function Stats({ title, description, stats }: StatsProps) {
  return (
    <section className="section">
      <div className="container-wide">
        {(title || description) && (
          <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            {title && (
              <h2 className="text-display-2 font-bold mb-4">{title}</h2>
            )}
            {description && (
              <p className="text-xl text-[rgb(var(--muted))]">{description}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-[rgb(var(--muted))]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
