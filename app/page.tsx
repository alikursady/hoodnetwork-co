import Link from "next/link";
import { Container } from "@/components/ui/container";
import { PostCard } from "@/components/blog/post-card";
import { getFeaturedPosts, getRecentPosts } from "@/lib/posts";

export default function HomePage() {
  const featuredPosts = getFeaturedPosts(3);
  const recentPosts = getRecentPosts(6);

  return (
    <>
      <section className="border-b border-border bg-background">
        <Container>
          <div className="py-16 sm:py-20 md:py-24">
            <p className="mb-4 inline-flex rounded-full border border-accentSoft bg-surface px-3 py-1 text-xs text-textMuted">
              Gercek Insanlar. Gercek Baglar.
            </p>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-textPrimary sm:text-4xl md:text-5xl">
              Yeni insanlarla tanismak sans isi degil, dogal bir deneyim olmali.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-textMuted sm:text-lg">
              Hood Network; anlamli etkinlikler, iyi sohbetler ve kalici ortak anilar sayesinde
              daha guclu bir sosyal hayat kurmak isteyen insanlarin toplulugudur.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/blog"
                className="rounded-xl border border-accent bg-accentSoft px-5 py-3 text-sm font-medium text-textPrimary hover:opacity-90"
              >
                Topluluktan Hikayeler
              </Link>
              <Link
                href="/about"
                className="rounded-xl border border-border px-5 py-3 text-sm font-medium text-textMuted hover:border-accentSoft hover:text-textPrimary"
              >
                Hood Network Nedir?
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-14">
        <Container>
          <div className="grid gap-6 rounded-3xl border border-border/80 bg-surface/80 p-6 sm:grid-cols-2 sm:gap-8 sm:p-8">
            <div>
              <h2 className="text-2xl font-semibold text-textPrimary">Neden variz?</h2>
              <p className="mt-3 text-sm leading-relaxed text-textMuted sm:text-base">
                Iyi topluluklar kendiliginden olusmaz. Biz, dostluga, ortak deneyimlere ve gercek
                hayatta birbirine vakit ayirmaya onem veren insanlari bir araya getiriyoruz.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-textPrimary">Burada nasil bir ortam var?</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-textMuted">
                <li>Samimi ama ozenli bir topluluk</li>
                <li>Yeni insanlarla tanismayi kolaylastiran bulusmalar</li>
                <li>Kisa tanismalarin otesine gecen sohbetler</li>
                <li>Guven ve sureklilikle buyuyen bir arkadas cevresi</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-4">
        <Container>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-textPrimary">Topluluktan secili hikayeler</h2>
              <p className="mt-2 text-sm text-textMuted">
                Etkinliklerden anlar, topluluk notlari ve samimi paylasimlar.
              </p>
            </div>
          </div>
          {featuredPosts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
              <p className="text-textMuted">Henuz one cikan yazi yok.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </Container>
      </section>

      <section className="pb-16 pt-10 sm:pb-20">
        <Container>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-textPrimary">Hood Network&apos;ten son paylasimlar</h2>
              <p className="mt-2 text-sm text-textMuted">
                Yeni etkinlik ozetleri, topluluk guncellemeleri ve sosyal notlar.
              </p>
            </div>
            <Link href="/blog" className="text-sm font-medium text-accent hover:text-textPrimary">
              Tum yazilar
            </Link>
          </div>
          {recentPosts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
              <p className="text-textMuted">Henuz yayinlanan yazi yok.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          )}
          <div className="mt-10 text-center">
            <Link
              href="/blog"
              className="rounded-xl border border-border px-5 py-3 text-sm text-textMuted hover:border-accentSoft hover:text-textPrimary"
            >
              Daha fazla oku
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
