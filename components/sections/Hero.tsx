"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaHref?: string;
  secondaryCta?: {
    text: string;
    href: string;
  };
}

export function Hero({
  title,
  subtitle,
  description,
  ctaText = "Get Started",
  ctaHref = "/contact",
  secondaryCta,
}: HeroProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 via-transparent to-transparent" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-wide">
        <div className="max-w-4xl mx-auto text-center">
          {subtitle && (
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-500 text-sm font-medium mb-6 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              {subtitle}
            </div>
          )}

          <h1 className="text-display-1 font-bold mb-6 animate-fade-in-up">
            <span className="gradient-text">{title}</span>
          </h1>

          {description && (
            <p className="text-xl md:text-2xl text-[rgb(var(--muted))] mb-10 max-w-3xl mx-auto animate-fade-in-up delay-100">
              {description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up delay-200">
            <Link href={ctaHref}>
              <Button size="lg" className="group">
                {ctaText}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            {secondaryCta && (
              <Link href={secondaryCta.href}>
                <Button variant="secondary" size="lg">
                  {secondaryCta.text}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
