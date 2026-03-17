import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: "Learn what Hood Network is and why this community platform exists."
};

export default function AboutPage() {
  return (
    <Container>
      <section className="mx-auto max-w-3xl py-14 sm:py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-textPrimary sm:text-4xl">About</h1>
        <p className="mt-6 leading-8 text-textMuted">
          {siteConfig.name} is a curated community platform focused on helping people build real
          social connection through gatherings, shared experiences, and thoughtful conversation.
        </p>
        <p className="mt-4 leading-8 text-textMuted">
          We created this space because modern social feeds often reward noise over depth. Hood
          Network takes the opposite approach: intentional circles, meaningful context, and quality
          over randomness.
        </p>
        <p className="mt-4 leading-8 text-textMuted">
          This journal is where we publish event recaps, community stories, local culture notes,
          and updates that reflect the spirit of belonging in a modern urban community.
        </p>
      </section>
    </Container>
  );
}
