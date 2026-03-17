import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Container } from "@/components/ui/container";
import { TagBadge } from "@/components/blog/tag-badge";
import { PostCard } from "@/components/blog/post-card";
import { getAdjacentPosts, getAllPostSlugs, getPostBySlug, getRelatedPosts } from "@/lib/posts";
import { siteConfig } from "@/lib/site-config";
import { formatDate } from "@/lib/utils";

type PageParams = {
  slug: string;
};

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: PageParams;
}): Promise<Metadata> {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post not found"
    };
  }

  const postUrl = `${siteConfig.url}/blog/${post.slug}`;
  const imageUrl = post.coverImage.startsWith("http")
    ? post.coverImage
    : `${siteConfig.url}${post.coverImage}`;

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: postUrl,
      publishedTime: post.date,
      tags: post.tags,
      images: [{ url: imageUrl, alt: post.title }]
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl]
    }
  };
}

export default function PostPage({ params }: { params: PageParams }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const relatedPosts = getRelatedPosts(post, 3);
  const { previous, next } = getAdjacentPosts(post.slug);

  return (
    <Container>
      <article className="mx-auto max-w-proseWide py-10 sm:py-14">
        <Link href="/blog" className="text-sm text-accent hover:text-textPrimary">
          ← Back to blog
        </Link>

        <header className="mt-6 space-y-4">
          <h1 className="text-3xl font-semibold leading-tight text-textPrimary sm:text-4xl">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-2 text-sm text-textMuted">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden>•</span>
            <span>{post.readingTime}</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={`${post.slug}-${tag}`} tag={tag} />
            ))}
          </div>
        </header>

        <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-border">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 1024px) 100vw, 900px"
          />
        </div>

        <div className="prose prose-invert mt-10">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[
              rehypeSlug,
              [rehypeAutolinkHeadings, { behavior: "append", properties: { className: ["anchor"] } }]
            ]}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>

      <section className="mx-auto grid max-w-proseWide grid-cols-1 gap-4 border-t border-border py-10 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-textMuted">Previous</p>
          {previous ? (
            <Link href={`/blog/${previous.slug}`} className="mt-2 block font-medium hover:text-accent">
              {previous.title}
            </Link>
          ) : (
            <p className="mt-2 text-sm text-textMuted">No older post</p>
          )}
        </div>
        <div className="rounded-xl border border-border bg-surface p-4">
          <p className="text-xs uppercase tracking-wide text-textMuted">Next</p>
          {next ? (
            <Link href={`/blog/${next.slug}`} className="mt-2 block font-medium hover:text-accent">
              {next.title}
            </Link>
          ) : (
            <p className="mt-2 text-sm text-textMuted">No newer post</p>
          )}
        </div>
      </section>

      {relatedPosts.length > 0 ? (
        <section className="pb-16 sm:pb-20">
          <h2 className="mb-6 text-2xl font-semibold text-textPrimary">Related posts</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <PostCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </section>
      ) : null}
    </Container>
  );
}
