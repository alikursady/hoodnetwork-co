import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: `Learn more about ${siteConfig.author} and this blog.`
};

export default function AboutPage() {
  return (
    <Container>
      <section className="mx-auto max-w-3xl py-14 sm:py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-textPrimary sm:text-4xl">About</h1>
        <p className="mt-6 leading-8 text-textMuted">
          Hi, I am {siteConfig.author}. This site is my personal space for writing about software
          engineering, design quality, and practical lessons from shipping products.
        </p>
        <p className="mt-4 leading-8 text-textMuted">
          The blog is intentionally simple: markdown-based content, fast performance, and a clean
          reading experience across mobile and desktop.
        </p>
        <p className="mt-4 leading-8 text-textMuted">
          You can later rebrand this project to Hood Network by updating values in{" "}
          <code className="rounded bg-surface px-1 py-0.5">lib/site-config.ts</code>.
        </p>
      </section>
    </Container>
  );
}
