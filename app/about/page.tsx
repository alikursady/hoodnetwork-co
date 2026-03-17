import type { Metadata } from "next";
import { Container } from "@/components/ui/container";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Hakkimizda",
  description: "Hood Network'un ne oldugunu ve gercek dostluklar kurmaya nasil katkida bulundugunu kesfedin."
};

export default function AboutPage() {
  return (
    <Container>
      <section className="mx-auto max-w-3xl py-14 sm:py-16">
        <h1 className="text-3xl font-semibold tracking-tight text-textPrimary sm:text-4xl">Hakkimizda</h1>
        <p className="mt-6 leading-8 text-textMuted">
          {siteConfig.name}, tek bir fikrin etrafinda olusan sosyal bir topluluktur: dogru insanlar
          dogru ortamda bulustugunda gercek dostluklar dogar.
        </p>
        <p className="mt-4 leading-8 text-textMuted">
          Hood&apos;u kurma sebebimiz netti: yeni insanlarla tanismak cogu zaman sansa bagli ve zor
          hissediliyor. Bizim bulusmalarimiz, bu sureci daha kolay, dogal ve samimi hale getirmek
          icin tasarlaniyor.
        </p>
        <p className="mt-4 leading-8 text-textMuted">
          Bu sitede topluluktan hikayeler, etkinlik ozetleri, guncellemeler ve daha anlamli bir
          sosyal hayat isteyenler icin sosyal notlar paylasiyoruz.
        </p>
      </section>
    </Container>
  );
}
