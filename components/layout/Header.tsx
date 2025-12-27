"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Moon, Sun, Globe } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Check for saved theme preference or system preference
    const saved = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = saved ? saved === "dark" : prefersDark;
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle("dark", newIsDark);
    localStorage.setItem("theme", newIsDark ? "dark" : "light");
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-[rgb(var(--background))]/80 backdrop-blur-lg shadow-sm"
          : "bg-transparent"
      )}
    >
      <div className="container-wide">
        <nav className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">
                {siteConfig.name.substring(0, 2).toUpperCase()}
              </span>
            </div>
            <div className="hidden sm:block">
              <span className="font-display font-bold text-lg">{siteConfig.name}</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {siteConfig.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                  pathname === item.href
                    ? "text-primary-500 bg-primary-500/10"
                    : "text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--foreground))]/5"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-[rgb(var(--foreground))]/5 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <button
              className="p-2 rounded-lg hover:bg-[rgb(var(--foreground))]/5 transition-colors"
              aria-label="Change language"
            >
              <Globe className="w-5 h-5" />
            </button>

            {/* Auth buttons - link to platform */}
            {siteConfig.platform.signIn && (
              <a
                href={siteConfig.platform.signIn}
                className="hidden md:inline-flex px-4 py-2 text-sm font-medium text-[rgb(var(--foreground))] hover:text-primary-500 transition-colors"
              >
                Sign In
              </a>
            )}
            {siteConfig.platform.signUp && (
              <a
                href={siteConfig.platform.signUp}
                className="hidden md:inline-flex px-4 py-2 text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
              >
                Get Started
              </a>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[rgb(var(--foreground))]/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Navigation */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 md:top-20 bg-[rgb(var(--background))] border-b border-[rgb(var(--border))] transition-all duration-300",
          isMobileMenuOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}
      >
        <div className="container-wide py-4">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                pathname === item.href
                  ? "text-primary-500 bg-primary-500/10"
                  : "text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--foreground))]/5"
              )}
            >
              {item.label}
            </Link>
          ))}

          {/* Mobile auth buttons */}
          {(siteConfig.platform.signIn || siteConfig.platform.signUp) && (
            <div className="mt-4 pt-4 border-t border-[rgb(var(--border))] flex flex-col gap-2">
              {siteConfig.platform.signIn && (
                <a
                  href={siteConfig.platform.signIn}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))] hover:bg-[rgb(var(--foreground))]/5 transition-colors"
                >
                  Sign In
                </a>
              )}
              {siteConfig.platform.signUp && (
                <a
                  href={siteConfig.platform.signUp}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 rounded-lg text-base font-medium text-white bg-primary-500 hover:bg-primary-600 text-center transition-colors"
                >
                  Get Started
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
