"use client";

import { useMemo, useState } from "react";
import type { Post } from "@/types/post";
import { PostCard } from "@/components/blog/post-card";

type BlogFiltersProps = {
  posts: Post[];
  tags: string[];
};

export function BlogFilters({ posts, tags }: BlogFiltersProps) {
  const [query, setQuery] = useState("");
  const [activeTag, setActiveTag] = useState<string>("all");

  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      const matchesTag = activeTag === "all" ? true : post.tags.includes(activeTag);
      const q = query.trim().toLowerCase();
      const matchesSearch =
        q.length === 0
          ? true
          : post.title.toLowerCase().includes(q) ||
            post.excerpt.toLowerCase().includes(q) ||
            post.tags.some((tag) => tag.includes(q));
      return matchesTag && matchesSearch;
    });
  }, [activeTag, posts, query]);

  return (
    <section className="space-y-6">
      <div className="space-y-4 rounded-2xl border border-border bg-surface p-4 sm:p-5">
        <label htmlFor="search" className="block text-sm font-medium text-textPrimary">
          Yazilarda ara
        </label>
        <input
          id="search"
          type="text"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Konuya, etkinlige veya etikete gore ara"
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-textPrimary outline-none transition focus:border-accent"
        />

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTag("all")}
            className={`rounded-full border px-3 py-1.5 text-xs transition ${
              activeTag === "all"
                ? "border-accent bg-accentSoft text-textPrimary"
                : "border-border text-textMuted hover:border-accentSoft hover:text-textPrimary"
            }`}
          >
            tum konular
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={`rounded-full border px-3 py-1.5 text-xs transition ${
                activeTag === tag
                  ? "border-accent bg-accentSoft text-textPrimary"
                  : "border-border text-textMuted hover:border-accentSoft hover:text-textPrimary"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-surface p-8 text-center">
          <h2 className="text-lg font-semibold text-textPrimary">Yazi bulunamadi</h2>
          <p className="mt-2 text-sm text-textMuted">
            Daha fazla topluluk hikayesi bulmak icin farkli bir arama veya etiket deneyin.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}
