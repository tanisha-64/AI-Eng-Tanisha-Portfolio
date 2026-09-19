import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative z-10 flex min-h-[70vh] items-center justify-center px-5">
      <section
        aria-labelledby="not-found-heading"
        className="text-center"
      >
        <p
          className="font-mono-label mb-6 text-[11px] tracking-[0.2em]"
          style={{ color: "var(--accent)" }}
        >
          404
        </p>

        <h1
          id="not-found-heading"
          className="display mb-6 text-4xl font-semibold leading-tight md:text-6xl"
        >
          Page not found.
        </h1>

        <p
          className="mx-auto mb-8 max-w-md text-sm leading-relaxed md:text-base"
          style={{ color: "var(--text-muted)" }}
        >
          The page you&apos;re looking for doesn&apos;t exist or may have been
          moved.
        </p>

        <Link
          href="/"
          data-cursor="link"
          className="inline-flex rounded-full px-7 py-3.5 font-mono-label text-[12px] tracking-[0.15em] transition-all duration-300 hover:opacity-80"
          style={{
            background: "var(--accent)",
            color: "var(--bg-primary)",
          }}
        >
          BACK HOME →
        </Link>
      </section>
    </main>
  );
}