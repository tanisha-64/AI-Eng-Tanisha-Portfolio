import type { Metadata } from "next";

import { Reveal, RevealText } from "@/components/motion/Reveal";
import {
  achievements,
  certifications,
  education,
  profile,
} from "@/data/profile";
import { skillGroups } from "@/data/skills";

export const metadata: Metadata = {
  title: "About — Tanisha Gupta",
  description:
    "Learn more about Tanisha Gupta, her background, technical skills, education, achievements, and certifications.",
};

const sectionLabelClass =
  "font-mono-label mb-6 text-[11px] tracking-[0.2em]";

const sectionStyle = {
  color: "var(--accent)",
};

const cardStyle = {
  borderColor: "var(--line)",
  background: "var(--surface)",
};

const mutedTextStyle = {
  color: "var(--text-muted)",
};

export default function AboutPage() {
  return (
    <main className="relative z-10">
      <section
        aria-labelledby="about-heading"
        className="mx-auto max-w-5xl px-5 pb-28 pt-32 md:px-10 md:pt-40"
      >
        {/* ───────────────────── Intro ───────────────────── */}
        <Reveal>
          <p className={sectionLabelClass} style={sectionStyle}>
            ABOUT
          </p>
        </Reveal>

        <h1
          id="about-heading"
          className="display mb-10 max-w-4xl text-balance text-[10vw] font-semibold leading-[1.08] md:text-[4.4vw]"
        >
          <RevealText text="I build intelligent systems at the intersection of AI research, software engineering, and real-world problems." />
        </h1>

        <Reveal delay={0.2}>
          <p
            className="mb-20 max-w-2xl text-[16px] leading-relaxed md:text-[18px]"
            style={mutedTextStyle}
          >
            {profile.summary}
          </p>
        </Reveal>

        {/* ───────────────────── Education + Achievements ───────────────────── */}
        <div className="mb-20 grid gap-6 md:grid-cols-2 md:gap-10">
          <Reveal>
            <article
              className="h-full rounded-2xl border p-7"
              style={cardStyle}
            >
              <p className={sectionLabelClass} style={sectionStyle}>
                EDUCATION
              </p>

              <h2 className="display mb-1 text-xl font-semibold">
                {education.degree}
              </h2>

              <p className="mb-4 text-sm" style={mutedTextStyle}>
                {education.school}
              </p>

              <div
                className="flex items-center justify-between border-t pt-4 text-sm"
                style={{
                  borderColor: "var(--line)",
                  color: "var(--text-muted)",
                }}
              >
                <span>{education.period}</span>

                <span
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {education.detail}
                </span>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.1}>
            <article
              className="h-full rounded-2xl border p-7"
              style={cardStyle}
            >
              <p className={sectionLabelClass} style={sectionStyle}>
                ACHIEVEMENTS
              </p>

              {achievements.length > 0 ? (
                <ul className="space-y-3">
                  {achievements.map((achievement) => (
                    <li
                      key={achievement}
                      className="flex gap-3 text-[14.5px] leading-relaxed"
                      style={{
                        color: "var(--text-primary)",
                      }}
                    >
                      <span
                        aria-hidden="true"
                        className="shrink-0"
                        style={sectionStyle}
                      >
                        —
                      </span>

                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm" style={mutedTextStyle}>
                  Achievements will be added soon.
                </p>
              )}
            </article>
          </Reveal>
        </div>

        {/* ───────────────────── Technical Skills ───────────────────── */}
        <section aria-labelledby="skills-heading" className="mb-20">
          <Reveal>
            <p
              id="skills-heading"
              className={sectionLabelClass}
              style={sectionStyle}
            >
              TECHNICAL SKILLS
            </p>
          </Reveal>

          <div className="grid gap-x-12 gap-y-8 md:grid-cols-2">
            {skillGroups.map((group, index) => (
              <Reveal key={group.group} delay={index * 0.05}>
                <div>
                  <h2
                    className="mb-3 text-sm font-semibold"
                    style={{ color: "var(--technical)" }}
                  >
                    {group.group}
                  </h2>

                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono-label rounded-full border px-3 py-1.5 text-[11px] tracking-wide transition-colors duration-300"
                        style={{
                          borderColor: "var(--line)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ───────────────────── Certifications ───────────────────── */}
        <section aria-labelledby="certifications-heading">
          <Reveal>
            <p
              id="certifications-heading"
              className={sectionLabelClass}
              style={sectionStyle}
            >
              CERTIFICATIONS
            </p>
          </Reveal>

          {certifications.length > 0 ? (
            <div className="grid md:grid-cols-2 md:gap-x-10">
              {certifications.map((certification, index) => (
                <Reveal key={certification.name} delay={index * 0.05}>
                  <article
                    className="flex items-center justify-between gap-6 border-t py-4"
                    style={{ borderColor: "var(--line)" }}
                  >
                    <div className="min-w-0">
                      <h2 className="truncate text-[15px] font-medium">
                        {certification.name}
                      </h2>

                      <p
                        className="text-[13px]"
                        style={mutedTextStyle}
                      >
                        {certification.org}
                      </p>
                    </div>

                    <time
                      className="font-mono-label shrink-0 text-[11px]"
                      style={mutedTextStyle}
                    >
                      {certification.year}
                    </time>
                  </article>
                </Reveal>
              ))}
            </div>
          ) : (
            <Reveal>
              <p className="text-sm" style={mutedTextStyle}>
                Certifications will be added soon.
              </p>
            </Reveal>
          )}
        </section>
      </section>
    </main>
  );
}