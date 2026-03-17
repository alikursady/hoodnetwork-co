# Personal Blog (Next.js 14 + Markdown)

A production-ready, single-author personal blog built with:

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- Markdown posts (`content/posts`)
- `gray-matter` frontmatter parsing

Dark theme is enabled by default, with a clean and responsive mobile-first UI.

## Features

- Homepage with hero, intro, featured posts, recent posts, CTA, and footer
- Blog archive page with search and tag filtering
- Dynamic post page (`/blog/[slug]`)
- Markdown rendering with `remark-gfm` and `rehype` plugins
- Reading time calculation
- Related posts by shared tags
- Previous/next post navigation
- SEO metadata per page and per post
- Open Graph + Twitter cards
- `sitemap.xml` and `robots.txt`
- Custom `not-found` page

## Folder structure

```txt
.
├─ app/
│  ├─ about/page.tsx
│  ├─ blog/
│  │  ├─ [slug]/page.tsx
│  │  └─ page.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  ├─ not-found.tsx
│  ├─ page.tsx
│  ├─ robots.ts
│  └─ sitemap.ts
├─ components/
│  ├─ blog/
│  │  ├─ blog-filters.tsx
│  │  ├─ post-card.tsx
│  │  └─ tag-badge.tsx
│  ├─ layout/
│  │  ├─ footer.tsx
│  │  └─ header.tsx
│  └─ ui/container.tsx
├─ content/
│  └─ posts/
│     ├─ design-systems-that-stay-useful.md
│     ├─ mobile-first-ui-checklist.md
│     └─ shipping-quality-in-small-steps.md
├─ lib/
│  ├─ posts.ts
│  ├─ site-config.ts
│  └─ utils.ts
├─ public/
│  └─ images/posts/
│     ├─ default-cover.svg
│     ├─ design-system-decisions.svg
│     ├─ mobile-first-checklist.svg
│     └─ shipping-quality.svg
├─ types/post.ts
├─ package.json
└─ tailwind.config.ts
```

## Getting started

### 1) Install dependencies

```bash
npm install
```

### 2) Run local development server

```bash
npm run dev
```

Open `http://localhost:3000`.

### 3) Build for production

```bash
npm run build
npm run start
```

## Deployment (Vercel)

1. Push this project to a Git repository (GitHub/GitLab/Bitbucket).
2. Import it in [Vercel](https://vercel.com/).
3. Framework preset: Next.js (auto-detected).
4. Deploy.

No special environment variables are required for this static markdown setup.

## Site branding and config

Update `lib/site-config.ts`:

- `name`
- `shortName`
- `title`
- `description`
- `url`
- `author`
- `social` links

This makes rebranding to Hood Network straightforward.

## Add a new blog post

Create a new markdown file in `content/posts`, for example:

`content/posts/my-new-post.md`

Use this exact frontmatter format:

```md
---
title: "Your Post Title"
date: "2026-03-17"
slug: "your-post-slug"
excerpt: "A short summary shown on cards and metadata."
coverImage: "/images/posts/default-cover.svg"
tags: ["tag-one", "tag-two"]
featured: false
---

Write your markdown content here...
```

### Frontmatter field rules

- `title`: post title
- `date`: ISO-like date string (`YYYY-MM-DD`)
- `slug`: unique URL path (`/blog/<slug>`)
- `excerpt`: short description for cards and SEO
- `coverImage`: path in `/public`, e.g. `/images/posts/example.svg`
- `tags`: list of lowercase tags
- `featured`: `true` or `false`

After saving the file, the post automatically appears on the site and in sitemap output.
