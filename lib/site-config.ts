export const siteConfig = {
  name: "Hood Network",
  shortName: "Hood Network",
  title: "Hood Network - Dostluklar, buluşmalar ve topluluk hikayeleri",
  description:
    "Doğru insanlarla tanışmak, anlamlı buluşmalara katılmak ve gerçek dostluklar kurmak için sıcak bir topluluk alanı.",
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
  { href: "/", label: "Ana Sayfa" },
  { href: "/blog", label: "Yazılar" },
  { href: "/about", label: "Hakkımızda" }
] as const;
