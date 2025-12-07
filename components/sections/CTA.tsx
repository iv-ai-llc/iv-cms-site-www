import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CTAProps {
  title: string;
  description?: string;
  buttonText?: string;
  buttonHref?: string;
}

export function CTA({
  title,
  description,
  buttonText = "Get Started",
  buttonHref = "/contact",
}: CTAProps) {
  return (
    <section className="section bg-gradient-to-r from-primary-500 to-accent-500">
      <div className="container-wide text-center text-white">
        <h2 className="text-display-2 font-bold mb-4">{title}</h2>
        {description && (
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {description}
          </p>
        )}
        <Link href={buttonHref}>
          <Button
            size="lg"
            className="bg-white text-primary-500 hover:bg-white/90 group"
          >
            {buttonText}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
