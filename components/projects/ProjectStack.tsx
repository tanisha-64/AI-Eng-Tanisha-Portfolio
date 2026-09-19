"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  type MotionStyle,
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

import type { Project } from "@/data/projects";

const ACCENT_MAP: Record<string, string> = {
  completed: "var(--accent)",
  research: "var(--technical)",
  prototype: "var(--accent-soft)",
  concept: "var(--text-muted)",
  planned: "var(--text-muted)",
};

function getStatusColor(status: string) {
  return ACCENT_MAP[status.toLowerCase()] ?? "var(--accent)";
}

interface ProjectCardProps {
  project: Project;
  index: number;
  total: number;
}

function ProjectCard({
  project,
  index,
  total,
}: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start start", "end start"],
  });

  const isLast = index === total - 1;

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    [1, isLast ? 1 : 0.92]
  );

  const opacity = useTransform(
    scrollYProgress,
    [0.7, 1],
    [1, isLast ? 1 : 0.55]
  );

  const cardStyle: MotionStyle = {
    scale,
    opacity,
    background:
      "linear-gradient(160deg, var(--surface), #0c0c0c)",
    border: "1px solid var(--line)",
  };

  return (
    <div
      ref={cardRef}
      className="sticky top-20 flex min-h-[calc(100svh-5rem)] items-center md:top-24 md:min-h-[calc(100svh-6rem)]"
      style={{
        zIndex: index + 1,
      }}
    >
      <motion.article
        style={cardStyle}
        className="grid w-full gap-8 overflow-hidden rounded-[28px] p-6 md:grid-cols-[auto_1fr] md:gap-16 md:p-14"
      >
        {/* Project number */}
        <div className="flex items-start">
          <span
            className="display select-none text-[18vw] font-semibold leading-none tracking-[-0.06em] md:text-[6vw]"
            style={{ color: "var(--line)" }}
            aria-hidden="true"
          >
            {project.number}
          </span>
        </div>

        {/* Project content */}
        <div className="flex min-w-0 flex-col justify-between">
          <div>
            {/* Metadata */}
            <div className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span
                className="font-mono-label text-[11px] tracking-[0.15em]"
                style={{
                  color: getStatusColor(project.status),
                }}
              >
                {project.category}
              </span>

              <span
                aria-hidden="true"
                style={{ color: "var(--line)" }}
              >
                •
              </span>

              <span
                className="font-mono-label text-[11px] tracking-[0.15em]"
                style={{ color: "var(--text-muted)" }}
              >
                {project.statusLabel}
              </span>
            </div>

            {/* Title */}
            <h2 className="display mb-3 max-w-3xl text-[9vw] font-semibold leading-[0.92] tracking-[-0.04em] md:text-[3.6vw]">
              {project.name}
            </h2>

            {/* Subtitle */}
            <p
              className="font-mono-label mb-6 text-[13px] tracking-wide md:text-[15px]"
              style={{ color: "var(--text-muted)" }}
            >
              {project.subtitle}
            </p>

            {/* Description */}
            <p
              className="mb-6 max-w-xl text-[15px] leading-relaxed"
              style={{ color: "var(--text-primary)" }}
            >
              {project.description}
            </p>

            {/* Technology */}
            {project.tech.length > 0 && (
              <div className="mb-8 flex flex-wrap gap-2">
                {project.tech.map((technology) => (
                  <span
                    key={technology}
                    className="font-mono-label rounded-full border px-3 py-1.5 text-[10.5px] tracking-wide"
                    style={{
                      borderColor: "var(--line)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {technology}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-4">
            <Link
              href={`/projects/${project.slug}`}
              data-cursor="link"
              className="group flex items-center gap-2 font-mono-label text-[12px] tracking-[0.15em]"
              style={{ color: "var(--accent)" }}
            >
              <span>VIEW CASE STUDY</span>

              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </Link>

            {project.links.map((link) => (
              <a
                key={`${link.label}-${link.url}`}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="link"
                className="link-underline font-mono-label text-[12px] tracking-[0.15em]"
                style={{ color: "var(--text-muted)" }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </motion.article>
    </div>
  );
}

interface ProjectStackProps {
  projects: Project[];
}

export default function ProjectStack({
  projects,
}: ProjectStackProps) {
  if (projects.length === 0) {
    return (
      <div
        className="flex min-h-[40vh] items-center justify-center rounded-[28px] border"
        style={{
          borderColor: "var(--line)",
          color: "var(--text-muted)",
        }}
      >
        <p className="font-mono-label text-[11px] tracking-[0.15em]">
          NO PROJECTS AVAILABLE
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {projects.map((project, index) => (
        <ProjectCard
          key={project.slug}
          project={project}
          index={index}
          total={projects.length}
        />
      ))}
    </div>
  );
}