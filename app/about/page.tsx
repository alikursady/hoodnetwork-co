import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
  description: "Learn what Hood Network is and how it helps people build real friendships."
};

export default function AboutPage() {
  return (
    <Container>
      <section className="mx-auto max-w-3xl py-14 sm:py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-textPrimary sm:text-4xl">About</h1>
        <p className="mt-6 leading-8 text-textMuted">
          {siteConfig.name} is a social community built around one simple idea: meaningful
          friendships grow when the right people meet in the right setting.
        </p>
        <p className="mt-4 leading-8 text-textMuted">
          We started Hood because meeting new people can feel random and awkward. Our gatherings
          are designed to make connection easier, more natural, and more genuine.
        </p>
        <p className="mt-4 leading-8 text-textMuted">
          On this site, we share stories from the community, event recaps, updates, and social
          reflections for people who want a more intentional social life.
        </p>
      </section>
    </Container>
  );
}
