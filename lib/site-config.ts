export const siteConfig = {
  name: "Hood Network",
  shortName: "Hood Network",
  title: "Hood Network - Community stories, gatherings, and ideas",
  description:
    "A curated community and editorial platform focused on meaningful social connection, gatherings, and thoughtful local culture.",
  url: "https://hoodnetwork.co",
  author: "Hood Network",
  email: "hello@hoodnetwork.co",
  social: {
    github: "https://github.com/hoodnetwork",
    x: "https://x.com/hoodnetwork",
    linkedin: "https://linkedin.com/company/hoodnetwork"
  }
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" }
] as const;
