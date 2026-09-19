import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Reveal, RevealText } from "@/components/motion/Reveal";
import { projects } from "@/data/projects";

type ProjectPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const SECTION_LABELS = [
  ["01", "OVERVIEW", "overview"],
  ["02", "PROBLEM", "problem"],
  ["03", "WHY IT MATTERS", "whyItMatters"],
  ["04", "APPROACH", "approach"],
  ["05", "ARCHITECTURE", "architecture"],
] as const;

const labelClass =
  "font-mono-label mb-3 flex items-center gap-3 text-[11px] tracking-[0.2em]";

const mutedStyle = {
  color: "var(--text-muted)",
};

const accentStyle = {
  color: "var(--accent)",
};

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Project Not Found — Tanisha Gupta",
    };
  }

  return {
    title: `${project.name} — Tanisha Gupta`,
    description: project.subtitle,
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectPageProps) {
  const { slug } = await params;

  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const caseStudy = project.caseStudy;

  return (
    <main className="relative z-10">
      <article className="mx-auto max-w-4xl px-5 pb-28 pt-32 md:px-10 md:pt-40">
        {/* Back navigation */}
        <Reveal>
          <Link
            href="/work"
            data-cursor="link"
            className="link-underline font-mono-label text-[11px] tracking-[0.2em]"
            style={mutedStyle}
          >
            ← ALL WORK
          </Link>
        </Reveal>

        {/* Project metadata */}
        <div className="mb-4 mt-8 flex flex-wrap items-center gap-3">
          <span
            className="font-mono-label text-[11px] tracking-[0.2em]"
            style={accentStyle}
          >
            {project.category}
          </span>

          <span aria-hidden="true" style={{ color: "var(--line)" }}>
            •
          </span>

          <span
            className="font-mono-label text-[11px] tracking-[0.2em]"
            style={mutedStyle}
          >
            {project.statusLabel}
          </span>
        </div>

        {/* Project title */}
        <h1 className="display mb-3 text-[11vw] font-semibold leading-[0.95] md:text-[5vw]">
          <RevealText text={project.name} />
        </h1>

        <p
          className="font-mono-label mb-10 text-[14px] tracking-wide"
          style={mutedStyle}
        >
          {project.subtitle}
        </p>

        {/* External links */}
        {project.links.length > 0 && (
          <div className="mb-14 flex flex-wrap gap-4 md:gap-6">
            {project.links.map((link) => (
              <a
                key={`${link.label}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="link-underline rounded-full border px-5 py-2.5 font-mono-label text-[12px] tracking-[0.15em] transition-opacity duration-300 hover:opacity-70"
                style={{
                  borderColor: "var(--accent)",
                  color: "var(--accent)",
                }}
              >
                {link.label} →
              </a>
            ))}
          </div>
        )}

        {/* Case study */}
        <div className="space-y-14">
          {SECTION_LABELS.map(([number, label, key]) => (
            <Reveal key={key}>
              <section aria-labelledby={`${key}-heading`}>
                <h2
                  id={`${key}-heading`}
                  className={labelClass}
                >
                  <span style={accentStyle}>{number}</span>
                  <span style={mutedStyle}>{label}</span>
                </h2>

                <p
                  className="max-w-2xl text-[16px] leading-relaxed"
                  style={{ color: "var(--text-primary)" }}
                >
                  {caseStudy[key as keyof typeof caseStudy]}
                </p>
              </section>
            </Reveal>
          ))}

          {/* Technology */}
          <Reveal>
            <section aria-labelledby="technology-heading">
              <h2 id="technology-heading" className={labelClass}>
                <span style={accentStyle}>06</span>
                <span style={mutedStyle}>TECHNOLOGY</span>
              </h2>

              <div className="flex flex-wrap gap-2">
                {caseStudy.technology.map((technology) => (
                  <span
                    key={technology}
                    className="font-mono-label rounded-full border px-3 py-1.5 text-[11px] tracking-wide"
                    style={{
                      borderColor: "var(--line)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </section>
          </Reveal>

          {/* Implementation */}
          <Reveal>
            <section aria-labelledby="implementation-heading">
              <h2 id="implementation-heading" className={labelClass}>
                <span style={accentStyle}>07</span>
                <span style={mutedStyle}>IMPLEMENTATION</span>
              </h2>

              <ul className="space-y-2.5">
                {caseStudy.implementation.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-[15px] leading-relaxed"
                    style={{ color: "var(--text-primary)" }}
                  >
                    <span aria-hidden="true" style={accentStyle}>
                      —
                    </span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>
          </Reveal>

          {/* Results */}
          <Reveal>
            <section aria-labelledby="results-heading">
              <h2 id="results-heading" className={labelClass}>
                <span style={accentStyle}>08</span>
                <span style={mutedStyle}>RESULTS / STATUS</span>
              </h2>

              <p
                className="max-w-2xl text-[16px] font-medium leading-relaxed"
                style={{ color: "var(--accent-soft)" }}
              >
                {caseStudy.results}
              </p>
            </section>
          </Reveal>

          {/* Learnings */}
          <Reveal>
            <section aria-labelledby="learnings-heading">
              <h2 id="learnings-heading" className={labelClass}>
                <span style={accentStyle}>09</span>
                <span style={mutedStyle}>LEARNINGS</span>
              </h2>

              <p
                className="max-w-2xl text-[16px] leading-relaxed"
                style={{ color: "var(--text-primary)" }}
              >
                {caseStudy.learnings}
              </p>
            </section>
          </Reveal>

          {/* Future work */}
          <Reveal>
            <section aria-labelledby="future-work-heading">
              <h2 id="future-work-heading" className={labelClass}>
                <span style={accentStyle}>10</span>
                <span style={mutedStyle}>FUTURE WORK</span>
              </h2>

              <p
                className="max-w-2xl text-[16px] leading-relaxed"
                style={{ color: "var(--text-primary)" }}
              >
                {caseStudy.futureWork}
              </p>
            </section>
          </Reveal>
        </div>
      </article>
    </main>
  );
}