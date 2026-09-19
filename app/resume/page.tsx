import type { Metadata } from "next";

import { Reveal, RevealText } from "@/components/motion/Reveal";
import { achievements, certifications, education, profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { activeResearch } from "@/data/research";

export const metadata: Metadata = {
  title: "Resume — Tanisha Gupta",
  description:
    "View Tanisha Gupta's official resume, including her research at IIT BHU, engineering projects, achievements, and technical skills.",
};

const resumePath = "/resume/Tanisha_Gupta_Resume.pdf";

export default function ResumePage() {
  return (
    <main className="relative z-10">
      <section
        aria-labelledby="resume-heading"
        className="mx-auto max-w-4xl px-5 pb-28 pt-32 md:px-10 md:pt-40"
      >
        <Reveal>
          <p
            className="font-mono-label mb-6 text-[11px] tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            RESUME
          </p>
        </Reveal>

        <h1
          id="resume-heading"
          className="display mb-8 text-[9vw] font-semibold leading-tight md:text-[3.6vw]"
        >
          <RevealText text="Tanisha Gupta — Resume" />
        </h1>

        <Reveal delay={0.15}>
          <div className="mb-14">
            <a
              href={resumePath}
              target="_blank"
              rel="noopener noreferrer"
              data-cursor="link"
              className="inline-flex rounded-full px-8 py-4 font-mono-label text-[12px] tracking-[0.15em] transition-all duration-300 hover:shadow-[0_0_24px_rgba(255,90,31,0.5)]"
              style={{
                background: "var(--accent)",
                color: "var(--bg-primary)",
                fontWeight: 600,
              }}
            >
              VIEW RESUME →
            </a>
          </div>
        </Reveal>

        {/* Interactive Structured Resume Preview Document */}
        <Reveal delay={0.25}>
          <article
            className="rounded-3xl border p-8 shadow-2xl md:p-12"
            style={{
              background: "var(--surface)",
              borderColor: "var(--line)",
            }}
          >
            {/* Header */}
            <div className="border-b pb-8" style={{ borderColor: "var(--line)" }}>
              <h2 className="display text-3xl font-bold tracking-tight text-[var(--text-primary)] md:text-4xl">
                {profile.name}
              </h2>

              <p className="mt-1 font-mono-label text-sm tracking-widest text-[var(--accent)]">
                {profile.title}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-[var(--text-muted)]">
                <span>📍 {profile.location}</span>
                <a
                  href={`mailto:${profile.email}`}
                  className="text-[var(--accent-soft)] hover:underline"
                >
                  ✉️ {profile.email}
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  🔗 LinkedIn
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  💻 GitHub
                </a>
              </div>
            </div>

            {/* Summary */}
            <div className="border-b py-6" style={{ borderColor: "var(--line)" }}>
              <h3 className="font-mono-label mb-3 text-xs tracking-[0.2em] text-[var(--accent)]">
                PROFESSIONAL SUMMARY
              </h3>
              <p className="text-sm leading-relaxed text-[var(--text-primary)]">
                {profile.summary}
              </p>
            </div>

            {/* Research Experience */}
            <div className="border-b py-6" style={{ borderColor: "var(--line)" }}>
              <h3 className="font-mono-label mb-4 text-xs tracking-[0.2em] text-[var(--accent)]">
                RESEARCH EXPERIENCE
              </h3>

              <div>
                <div className="flex flex-wrap items-baseline justify-between">
                  <h4 className="font-semibold text-[var(--text-primary)] text-base">
                    Research Intern — IIT (BHU), Varanasi
                  </h4>
                  <span className="font-mono-label text-xs text-[var(--accent)]">
                    May 2026 – Present
                  </span>
                </div>

                <p className="mt-1 text-xs italic text-[var(--accent-soft)]">
                  {activeResearch.title}
                </p>

                <p className="mt-3 text-sm leading-relaxed text-[var(--text-muted)]">
                  {activeResearch.description}
                </p>
              </div>
            </div>

            {/* Professional Experience */}
            <div className="border-b py-6" style={{ borderColor: "var(--line)" }}>
              <h3 className="font-mono-label mb-4 text-xs tracking-[0.2em] text-[var(--accent)]">
                PROFESSIONAL EXPERIENCE
              </h3>

              <div>
                <div className="flex flex-wrap items-baseline justify-between">
                  <h4 className="font-semibold text-[var(--text-primary)] text-base">
                    Team Lead — Generative AI & Full-Stack Development
                  </h4>
                  <span className="font-mono-label text-xs text-[var(--text-muted)]">
                    Jan 2026 – Mar 2026
                  </span>
                </div>

                <p className="mt-1 text-xs text-[var(--text-muted)]">
                  The Wall of Dreams
                </p>

                <ul className="mt-3 space-y-2 text-sm text-[var(--text-primary)]">
                  <li className="flex gap-2">
                    <span className="text-[var(--accent)]">•</span>
                    <span>Led a cross-functional development team on client-facing engagements, architecting and deploying full-stack solutions bridging Generative AI integrations with web applications.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-[var(--accent)]">•</span>
                    <span>Directed sprint planning and technical execution across project milestones; technical ownership formally recognized in a client <strong>Letter of Recommendation</strong>.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Projects */}
            <div className="border-b py-6" style={{ borderColor: "var(--line)" }}>
              <h3 className="font-mono-label mb-4 text-xs tracking-[0.2em] text-[var(--accent)]">
                FEATURED PROJECTS
              </h3>

              <div className="space-y-6">
                {projects.map((project) => (
                  <div key={project.slug}>
                    <div className="flex flex-wrap items-baseline justify-between">
                      <h4 className="font-semibold text-[var(--text-primary)] text-base">
                        {project.name}
                      </h4>
                      <span className="font-mono-label text-xs text-[var(--accent)]">
                        {project.statusLabel}
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-[var(--text-muted)] font-mono-label">
                      {project.tech.join(" · ")}
                    </p>

                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-primary)]">
                      {project.description}
                    </p>

                    {project.links.length > 0 && (
                      <div className="mt-2 flex gap-4 text-xs">
                        {project.links.map((link) => (
                          <a
                            key={link.url}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--accent)] hover:underline"
                          >
                            {link.label} →
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="border-b py-6" style={{ borderColor: "var(--line)" }}>
              <h3 className="font-mono-label mb-4 text-xs tracking-[0.2em] text-[var(--accent)]">
                KEY ACHIEVEMENTS
              </h3>

              <ul className="space-y-3 text-sm text-[var(--text-primary)]">
                {achievements.map((achievement) => (
                  <li key={achievement} className="flex gap-3">
                    <span className="text-[var(--accent)]">—</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Education & Certifications */}
            <div className="pt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="font-mono-label mb-3 text-xs tracking-[0.2em] text-[var(--accent)]">
                  EDUCATION
                </h3>
                <h4 className="font-semibold text-[var(--text-primary)] text-sm">
                  {education.degree}
                </h4>
                <p className="text-xs text-[var(--text-muted)] mt-1">
                  {education.school}
                </p>
                <div className="mt-2 flex justify-between text-xs text-[var(--text-muted)]">
                  <span>{education.period}</span>
                  <span className="font-semibold text-[var(--text-primary)]">{education.detail}</span>
                </div>
              </div>

              <div>
                <h3 className="font-mono-label mb-3 text-xs tracking-[0.2em] text-[var(--accent)]">
                  CERTIFICATIONS
                </h3>
                <div className="space-y-2 text-xs">
                  {certifications.map((cert) => (
                    <div key={cert.name} className="flex justify-between">
                      <span className="text-[var(--text-primary)]">{cert.name} — <span className="text-[var(--text-muted)]">{cert.org}</span></span>
                      {cert.year && <span className="font-mono-label text-[var(--text-muted)]">{cert.year}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </article>
        </Reveal>
      </section>
    </main>
  );
}