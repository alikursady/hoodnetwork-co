export const siteConfig = {
  name: "Nocturne Journal",
  shortName: "Nocturne",
  title: "Nocturne Journal - Notes on design, code, and craft",
  description:
    "A minimalist personal blog about engineering, product thinking, and building for the web.",
  url: "https://example.com",
  author: "Your Name",
  email: "hello@example.com",
  social: {
    github: "https://github.com/your-username",
    x: "https://x.com/your-username",
    linkedin: "https://linkedin.com/in/your-username"
  },
  brandHint: "Replace with Hood Network branding when ready."
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" }
] as const;
