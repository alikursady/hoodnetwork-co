import Link from "next/link";
import { Container } from "@/components/ui/container";

export default function NotFoundPage() {
  return (
    <Container>
      <section className="flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
        <p className="mb-3 rounded-full border border-border px-3 py-1 text-xs text-textMuted">404</p>
        <h1 className="text-3xl font-semibold tracking-tight text-textPrimary sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-3 max-w-md text-sm text-textMuted sm:text-base">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Link
          href="/"
          className="mt-8 rounded-xl border border-border px-5 py-3 text-sm text-textMuted hover:border-accentSoft hover:text-textPrimary"
        >
          Back to home
        </Link>
      </section>
    </Container>
  );
}
