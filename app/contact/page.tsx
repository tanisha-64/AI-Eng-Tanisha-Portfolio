import type { Metadata } from "next";

import ContactForm from "@/components/sections/ContactForm";
import { Reveal, RevealText } from "@/components/motion/Reveal";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Contact — Tanisha Gupta",
  description:
    "Get in touch with Tanisha Gupta for AI, GenAI, full-stack, and software engineering opportunities.",
};

const labelClass =
  "font-mono-label mb-2 text-[11px] tracking-[0.2em]";

const mutedStyle = {
  color: "var(--text-muted)",
};

const accentStyle = {
  color: "var(--accent)",
};

export default function ContactPage() {
  const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
    "Portfolio Inquiry for Tanisha Gupta"
  )}`;

  return (
    <main className="relative z-10">
      <section
        aria-labelledby="contact-heading"
        className="mx-auto max-w-5xl px-5 pb-28 pt-32 md:px-10 md:pt-40"
      >
        {/* ───────────────────── Section Label ───────────────────── */}
        <Reveal>
          <p className="font-mono-label mb-6 text-[11px] tracking-[0.2em]" style={accentStyle}>
            CONTACT & COLLABORATION
          </p>
        </Reveal>

        {/* ───────────────────── Heading ───────────────────── */}
        <h1
          id="contact-heading"
          className="display mb-16 font-semibold uppercase leading-[0.92] text-[11vw] md:text-[5vw]"
        >
          <RevealText text="Let's build" />
          <br />
          <RevealText text="something" />
          <br />
          <span style={accentStyle}>
            <RevealText text="intelligent." />
          </span>
        </h1>

        {/* ───────────────────── Contact Content ───────────────────── */}
        <div className="grid gap-14 md:grid-cols-[1fr_1.2fr] md:gap-16">
          <Reveal>
            <div className="space-y-8">
              {/* Email Direct Link */}
              <div>
                <p className={labelClass} style={mutedStyle}>
                  DIRECT EMAIL (AUTHENTICATED)
                </p>

                <a
                  href={mailtoUrl}
                  data-cursor="link"
                  className="group inline-flex items-center gap-2 break-all text-xl font-semibold text-[var(--accent)] transition-all duration-300 hover:opacity-80"
                  aria-label={`Email Tanisha directly at ${profile.email}`}
                >
                  <span className="link-underline">{profile.email}</span>
                  <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                </a>

                <p className="mt-2 text-xs text-[var(--text-muted)]">
                  Click to open your mail client directly to email Tanisha.
                </p>
              </div>

              {/* LinkedIn Linkable */}
              <div>
                <p className={labelClass} style={mutedStyle}>
                  LINKEDIN
                </p>

                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="group inline-flex items-center gap-2 text-lg text-[var(--text-primary)] transition-all duration-300 hover:text-[var(--accent)]"
                  aria-label="Open Tanisha Gupta's LinkedIn profile"
                >
                  <span className="link-underline">{formatSocialUrl(profile.linkedin)}</span>
                  <span className="inline-block transition-transform group-hover:translate-x-1" style={accentStyle}>↗</span>
                </a>
              </div>

              {/* GitHub Linkable */}
              <div>
                <p className={labelClass} style={mutedStyle}>
                  GITHUB
                </p>

                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="link"
                  className="group inline-flex items-center gap-2 text-lg text-[var(--text-primary)] transition-all duration-300 hover:text-[var(--accent)]"
                  aria-label="Open Tanisha Gupta's GitHub profile"
                >
                  <span className="link-underline">{formatSocialUrl(profile.github)}</span>
                  <span className="inline-block transition-transform group-hover:translate-x-1" style={accentStyle}>↗</span>
                </a>
              </div>

              {/* Location */}
              <div>
                <p className={labelClass} style={mutedStyle}>
                  LOCATION
                </p>

                <p className="text-lg font-medium text-[var(--text-primary)]">
                  {profile.location}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Contact Form */}
          <Reveal delay={0.15}>
            <div>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}

function formatSocialUrl(url: string) {
  try {
    const parsed = new URL(url);

    return `${parsed.hostname.replace(/^www\./, "")}${parsed.pathname.replace(/\/$/, "")}`;
  } catch {
    return url;
  }
}