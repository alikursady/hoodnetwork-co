import type { Metadata } from "next";
import { BlogFilters } from "@/components/blog/blog-filters";
import { Container } from "@/components/ui/container";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Yazilar",
  description: "Hood Network toplulugundan hikayeler, etkinlik ozetleri ve guncellemeler."
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <Container>
      <section className="py-12 sm:py-14">
        <h1 className="text-3xl font-semibold tracking-tight text-textPrimary sm:text-4xl">Yazilar</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-textMuted sm:text-base">
          Hood Network ile gercek baglar kuran insanlardan hikayeler, etkinlik ozetleri ve
          guncellemeler.
        </p>
      </section>

      {posts.length === 0 ? (
        <section className="pb-16">
          <div className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
            <h2 className="text-lg font-semibold text-textPrimary">Henuz yazi yok</h2>
            <p className="mt-2 text-sm text-textMuted">
              <code>content/posts</code> klasorune markdown dosyasi eklediginizde burada
              gorunecekler.
            </p>
          </div>
        </section>
      ) : (
        <section className="pb-16 sm:pb-20">
          <BlogFilters posts={posts} tags={tags} />
        </section>
      )}
    </Container>
  );
}
