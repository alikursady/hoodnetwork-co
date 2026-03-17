export type PostFrontmatter = {
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  tags: string[];
  featured: boolean;
};

export type Post = PostFrontmatter & {
  content: string;
  readingTime: string;
};
