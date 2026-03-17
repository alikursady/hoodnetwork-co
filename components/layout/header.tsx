"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { navLinks, siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/container";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="inline-flex items-center text-base font-semibold tracking-tight text-textPrimary">
            <span className="mr-2 h-2 w-2 rounded-full bg-accent" aria-hidden />
            {siteConfig.shortName}
          </Link>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Ana menu">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition hover:text-textPrimary ${
                  pathname === link.href ? "text-textPrimary" : "text-textMuted"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            className="inline-flex items-center rounded-lg border border-border px-3 py-2 text-sm text-textMuted md:hidden"
            onClick={() => setOpen((prev) => !prev)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Gezinme menusunu ac veya kapat"
          >
            Menu
          </button>
        </div>

        {open ? (
          <nav id="mobile-nav" className="border-t border-border bg-surface py-3 md:hidden" aria-label="Mobil menu">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`block rounded-lg px-3 py-2 text-sm transition hover:bg-background hover:text-textPrimary ${
                      pathname === link.href ? "bg-background text-textPrimary" : "text-textMuted"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </Container>
    </header>
  );
}
