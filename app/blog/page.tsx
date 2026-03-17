import type { Metadata } from "next";
import { BlogFilters } from "@/components/blog/blog-filters";
import { Container } from "@/components/ui/container";
import { getAllPosts, getAllTags } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog",
  description: "All articles sorted by date with search and tag filtering."
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <Container>
      <section className="py-12 sm:py-14">
        <h1 className="text-3xl font-semibold tracking-tight text-textPrimary sm:text-4xl">Blog</h1>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-textMuted sm:text-base">
          Browse all posts. Filter by tag or search quickly to find a specific article.
        </p>
      </section>

      {posts.length === 0 ? (
        <section className="pb-16">
          <div className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
            <h2 className="text-lg font-semibold text-textPrimary">No posts yet</h2>
            <p className="mt-2 text-sm text-textMuted">
              Add markdown files inside <code>content/posts</code> and they will appear here.
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
