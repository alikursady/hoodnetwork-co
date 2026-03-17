export const siteConfig = {
  name: "Hood Network",
  shortName: "Hood Network",
  title: "Hood Network - Friendship, gatherings, and community stories",
  description:
    "A warm community space for meeting the right people, joining meaningful gatherings, and building real friendships.",
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
