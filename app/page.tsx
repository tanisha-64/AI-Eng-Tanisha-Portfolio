import Link from "next/link";
import { Reveal, RevealText } from "@/components/motion/Reveal";
import Capabilities from "@/components/sections/Capabilities";
import Marquee from "@/components/sections/Marquee";
import PortalHero from "@/components/hero/PortalHero";
import { profile } from "@/data/profile";

export default function HomePage() {
  return (
    <main className="relative z-10">
      {/* ───────────────────── Portal Hero ───────────────────── */}
      <PortalHero />

      {/* ───────────────────── Tech / Visual Marquee ───────────────────── */}
      <Marquee />

      {/* ───────────────────── About Preview ───────────────────── */}
      <section
        aria-labelledby="about-preview-heading"
        className="mx-auto max-w-4xl px-5 py-28 text-center md:px-10 md:py-40"
      >
        <Reveal>
          <p
            className="font-mono-label mb-6 text-[11px] tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            WHO IS TANISHA?
          </p>
        </Reveal>

        <h2
          id="about-preview-heading"
          className="display text-balance text-[9vw] font-semibold leading-[1.1] md:text-[3.6vw]"
        >
          <RevealText text={profile.positioningStatement} />
        </h2>

        <Reveal delay={0.2} className="mt-10">
          <Link
            href="/about"
            data-cursor="link"
            className="link-underline font-mono-label text-[12px] tracking-[0.15em] transition-opacity duration-300 hover:opacity-70"
            style={{ color: "var(--text-muted)" }}
          >
            MORE ABOUT ME →
          </Link>
        </Reveal>
      </section>

      {/* ───────────────────── Capabilities ───────────────────── */}
      <Capabilities />

      {/* ───────────────────── Work Preview ───────────────────── */}
      <section
        aria-labelledby="work-preview-heading"
        className="mx-auto max-w-6xl px-5 py-28 text-center md:px-10 md:py-36"
      >
        <Reveal>
          <p
            className="font-mono-label mb-6 text-[11px] tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            SELECTED WORK
          </p>
        </Reveal>

        <h2
          id="work-preview-heading"
          className="display mb-10 text-[9vw] font-semibold leading-[1.05] md:text-[3.6vw]"
        >
          <RevealText text="Three builds. One thread: ideas built, not just imagined." />
        </h2>

        <Reveal delay={0.15}>
          <Link
            href="/work"
            data-cursor="link"
            className="inline-flex rounded-full px-8 py-4 font-mono-label text-[12px] tracking-[0.15em] transition-all duration-300 hover:opacity-80"
            style={{
              background: "var(--accent)",
              color: "var(--bg-primary)",
            }}
          >
            VIEW ALL WORK →
          </Link>
        </Reveal>
      </section>
    </main>
  );
}