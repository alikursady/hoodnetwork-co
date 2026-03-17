export function formatDate(input: string): string {
  const date = new Date(input);
  return new Intl.DateTimeFormat("tr-TR", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(date);
}

export function normalizeTag(tag: string): string {
  return tag.trim().toLowerCase();
}
