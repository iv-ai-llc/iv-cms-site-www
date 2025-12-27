import Link from "next/link";
import { Mail, Github } from "lucide-react";
import { siteConfig } from "@/lib/config";

export function Footer() {
  const isExternal = (href: string) => href.startsWith("http");

  return (
    <footer className="bg-[rgb(var(--surface))] border-t border-[rgb(var(--border))]">
      <div className="container-wide py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  {siteConfig.name.substring(0, 2).toUpperCase()}
                </span>
              </div>
              <span className="font-display font-bold text-xl">{siteConfig.name}</span>
            </Link>
            <p className="text-[rgb(var(--muted))] max-w-md mb-6">
              {siteConfig.description}
            </p>
            <div className="flex gap-4">
              <a
                href={`mailto:${siteConfig.social.email}`}
                className="p-2 rounded-lg hover:bg-[rgb(var(--foreground))]/5 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={siteConfig.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg hover:bg-[rgb(var(--foreground))]/5 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {siteConfig.footer.product.map((link) => (
                <li key={link.href}>
                  {isExternal(link.href) ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))] transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))] transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {siteConfig.footer.company.map((link) => (
                <li key={link.href}>
                  {isExternal(link.href) ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))] transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className="text-[rgb(var(--muted))] hover:text-[rgb(var(--foreground))] transition-colors"
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-[rgb(var(--border))] flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-[rgb(var(--muted))]">
            &copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <p className="text-sm text-[rgb(var(--muted))]">
            Powered by IV-CMS
          </p>
        </div>
      </div>
    </footer>
  );
}
