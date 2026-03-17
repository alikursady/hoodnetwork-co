import Link from "next/link";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <Container>
        <div className="flex flex-col gap-4 py-10 text-sm text-textMuted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href={siteConfig.social.github} target="_blank" className="hover:text-textPrimary">
              GitHub
            </Link>
            <Link href={siteConfig.social.x} target="_blank" className="hover:text-textPrimary">
              X
            </Link>
            <Link
              href={siteConfig.social.linkedin}
              target="_blank"
              className="hover:text-textPrimary"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
