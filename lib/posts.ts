import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { normalizeTag } from "@/lib/utils";
import type { Post, PostFrontmatter } from "@/types/post";

const postsDirectory = path.join(process.cwd(), "content", "posts");

function ensurePostsDirectory() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"));
}

function parseFrontmatter(data: Partial<PostFrontmatter>): PostFrontmatter {
  return {
    title: data.title ?? "Basliksiz yazi",
    date: data.date ?? new Date().toISOString(),
    slug: data.slug ?? "",
    excerpt: data.excerpt ?? "",
    coverImage: data.coverImage ?? "/images/posts/default-cover.svg",
    tags: Array.isArray(data.tags) ? data.tags : [],
    featured: Boolean(data.featured)
  };
}

export function getAllPosts(): Post[] {
  const fileNames = ensurePostsDirectory();

  const posts = fileNames.map((fileName) => {
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);
    const frontmatter = parseFrontmatter(data as Partial<PostFrontmatter>);

    return {
      ...frontmatter,
      tags: frontmatter.tags.map(normalizeTag),
      content,
      readingTime: `${Math.max(1, Math.round(readingTime(content).minutes))} dk okuma`
    };
  });

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getAllPostSlugs(): string[] {
  return getAllPosts().map((post) => post.slug);
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export function getFeaturedPosts(limit = 3): Post[] {
  return getAllPosts()
    .filter((post) => post.featured)
    .slice(0, limit);
}

export function getRecentPosts(limit = 6): Post[] {
  return getAllPosts().slice(0, limit);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort((a, b) => a.localeCompare(b));
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const postTags = new Set(post.tags.map(normalizeTag));
  if (postTags.size === 0) return [];

  return getAllPosts()
    .filter((candidate) => candidate.slug !== post.slug)
    .map((candidate) => {
      const shared = candidate.tags.filter((tag) => postTags.has(normalizeTag(tag)));
      return { candidate, score: shared.length };
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export function getAdjacentPosts(slug: string): {
  previous: Post | null;
  next: Post | null;
} {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);

  if (index === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null
  };
}
