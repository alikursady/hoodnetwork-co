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
              Real People. Real Connection.
            </p>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-textPrimary sm:text-4xl md:text-5xl">
              Meeting new people should feel natural, not random.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-textMuted sm:text-lg">
              Hood Network is a community for people who want a more meaningful social life through
              thoughtful events, good conversations, and shared moments that actually last.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/blog"
                className="rounded-xl border border-accent bg-accentSoft px-5 py-3 text-sm font-medium text-textPrimary hover:opacity-90"
              >
                See Community Stories
              </Link>
              <Link
                href="/about"
                className="rounded-xl border border-border px-5 py-3 text-sm font-medium text-textMuted hover:border-accentSoft hover:text-textPrimary"
              >
                How Hood Works
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-14">
        <Container>
          <div className="grid gap-6 rounded-3xl border border-border/80 bg-surface/80 p-6 sm:grid-cols-2 sm:gap-8 sm:p-8">
            <div>
              <h2 className="text-2xl font-semibold text-textPrimary">Why Hood Network exists</h2>
              <p className="mt-3 text-sm leading-relaxed text-textMuted sm:text-base">
                Good communities do not happen by accident. We bring together people who care about
                friendship, shared experiences, and showing up for one another in real life.
              </p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-textPrimary">What it feels like here</h3>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-textMuted">
                <li>Welcoming, but intentional</li>
                <li>Events that make meeting people easier</li>
                <li>Conversations that go beyond small talk</li>
                <li>A social circle built on trust and consistency</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-4">
        <Container>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-textPrimary">Stories from the community</h2>
              <p className="mt-2 text-sm text-textMuted">
                Highlights from gatherings, reflections, and people-first updates.
              </p>
            </div>
          </div>
          {featuredPosts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
              <p className="text-textMuted">No featured posts yet.</p>
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
              <h2 className="text-2xl font-semibold text-textPrimary">Latest from Hood Network</h2>
              <p className="mt-2 text-sm text-textMuted">
                New event recaps, social reflections, and community notes.
              </p>
            </div>
            <Link href="/blog" className="text-sm font-medium text-accent hover:text-textPrimary">
              See all posts
            </Link>
          </div>
          {recentPosts.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
              <p className="text-textMuted">No posts published yet.</p>
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
              Read more stories
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
