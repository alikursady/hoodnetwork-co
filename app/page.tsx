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
              Personal Blog
            </p>
            <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-textPrimary sm:text-4xl md:text-5xl">
              Building thoughtful digital products with clarity and craft.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-textMuted sm:text-lg">
              A minimalist journal about web engineering, design systems, and the decisions that
              shape quality software.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/blog"
                className="rounded-xl border border-accent bg-accentSoft px-5 py-3 text-sm font-medium text-textPrimary hover:opacity-90"
              >
                Explore Articles
              </Link>
              <Link
                href="/about"
                className="rounded-xl border border-border px-5 py-3 text-sm font-medium text-textMuted hover:border-accentSoft hover:text-textPrimary"
              >
                About Me
              </Link>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-14">
        <Container>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-textPrimary">Featured posts</h2>
              <p className="mt-2 text-sm text-textMuted">Handpicked articles to start with.</p>
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

      <section className="pb-16 sm:pb-20">
        <Container>
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-textPrimary">Recent posts</h2>
              <p className="mt-2 text-sm text-textMuted">Latest entries from the archive.</p>
            </div>
            <Link href="/blog" className="text-sm font-medium text-accent hover:text-textPrimary">
              View all
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
              Browse full archive
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
