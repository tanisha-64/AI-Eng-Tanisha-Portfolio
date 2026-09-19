"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

import { profile } from "@/data/profile";
import { MagneticButton } from "@/components/ui/MagneticButton";

const RAIL = [
  { num: "01", label: "RAGTrack (CVPR 2026)", href: "/projects/ragtrack" },
  { num: "02", label: "CodeMentor AI", href: "/projects/codementor-ai" },
  {
    num: "03",
    label: "AI Video Intelligence",
    href: "/projects/ai-video-intelligence",
  },
];

export default function Hero() {
  const router = useRouter();
  const containerRef = useRef<HTMLElement>(null);
  const [photoError, setPhotoError] = useState(false);
  const [isHoveredName, setIsHoveredName] = useState(false);

  /* ───────────────────── 2.5D / 3D Motion Tracking ───────────────────── */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 28, stiffness: 130 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  // 3D Tilt rotations
  const rotateX = useTransform(springY, [-1, 1], [12, -12]);
  const rotateY = useTransform(springX, [-1, 1], [-14, 14]);

  // Parallax layers
  const portraitX = useTransform(springX, [-1, 1], [-12, 12]);
  const portraitY = useTransform(springY, [-1, 1], [-12, 12]);

  const glowX = useTransform(springX, [-1, 1], [-30, 30]);
  const glowY = useTransform(springY, [-1, 1], [-30, 30]);

  const sheenX = useTransform(springX, [-1, 1], ["-100%", "100%"]);
  const sheenOpacity = useTransform(springX, [-1, 1], [0.2, 0.6]);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();

      const relativeX = (event.clientX - rect.left) / rect.width - 0.5;
      const relativeY = (event.clientY - rect.top) / rect.height - 0.5;

      mouseX.set(relativeX * 2);
      mouseY.set(relativeY * 2);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section
      ref={containerRef}
      aria-label="Hero Overview"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden px-5 pb-6 pt-24 md:px-12 md:pt-28"
    >
      {/* ───────────────────── 3D Lightning & Inferno Atmosphere ───────────────────── */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* Main inferno core radial ambient glow */}
        <motion.div
          className="absolute left-1/2 top-1/3 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            x: glowX,
            y: glowY,
            background:
              "radial-gradient(circle, rgba(255,90,31,0.22) 0%, rgba(91,23,14,0.15) 50%, transparent 75%)",
            filter: "blur(50px)",
          }}
        />

        {/* Secondary electric cyan accent orb */}
        <div
          className="absolute -right-20 top-20 h-[380px] w-[380px] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, rgba(125,249,255,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* Dynamic 3D Lightning & Energy Spark Paths SVG */}
        <svg
          className="absolute inset-0 h-full w-full opacity-30"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="lightning-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ff5a1f" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#7df9ff" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#ff8a3d" stopOpacity="0" />
            </linearGradient>

            <filter id="glow-filter">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Electric lightning bolt 1 */}
          <motion.path
            d="M 100 120 Q 300 80, 500 220 T 900 180 T 1300 400"
            fill="none"
            stroke="url(#lightning-grad-1)"
            strokeWidth="1.5"
            strokeDasharray="8 6"
            filter="url(#glow-filter)"
            animate={{
              strokeDashoffset: [0, -100],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Electric lightning bolt 2 */}
          <motion.path
            d="M 800 600 Q 600 450, 400 520 T 100 350"
            fill="none"
            stroke="url(#lightning-grad-1)"
            strokeWidth="1.2"
            strokeDasharray="6 4"
            filter="url(#glow-filter)"
            animate={{
              strokeDashoffset: [0, 100],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </svg>
      </div>

      {/* ───────────────────── 2-Column Hero Layout ───────────────────── */}

      <div className="relative z-10 mx-auto grid w-full max-w-7xl flex-1 items-center gap-10 py-4 lg:grid-cols-[1.2fr_1fr] lg:gap-14">
        {/* LEFT COLUMN — Identity & Dynamic Stylish Name */}

        <div className="flex flex-col justify-center">
          {/* Status line */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-5 flex flex-wrap items-center gap-2.5 font-mono-label text-[11px] tracking-[0.16em]"
            style={{ color: "var(--accent)" }}
          >
            <span className="relative flex h-2.5 w-2.5">
              <span
                aria-hidden="true"
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ background: "var(--accent)" }}
              />
              <span
                aria-hidden="true"
                className="relative inline-flex h-2.5 w-2.5 rounded-full"
                style={{ background: "var(--accent)" }}
              />
            </span>

            <span>{profile.statusLine}</span>
          </motion.div>

          {/* Dynamic & Stylish Name Headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            onMouseEnter={() => setIsHoveredName(true)}
            onMouseLeave={() => setIsHoveredName(false)}
            className="group relative cursor-default"
          >
            <h1 className="display text-[13vw] font-extrabold leading-[0.88] tracking-[-0.04em] sm:text-[11vw] lg:text-[5.6vw]">
              {/* TANISHA with kinetic gradient */}
              <span className="relative inline-block">
                <span
                  className="bg-gradient-to-r from-[#F3F0EA] via-[#FF8A3D] to-[#F3F0EA] bg-clip-text text-transparent transition-all duration-500 group-hover:from-[#FF5A1F] group-hover:via-[#7DF9FF] group-hover:to-[#FF5A1F]"
                  style={{
                    textShadow: isHoveredName
                      ? "0 0 35px rgba(255,90,31,0.6)"
                      : "0 0 15px rgba(255,90,31,0.2)",
                  }}
                >
                  TANISHA
                </span>
              </span>

              <br />

              {/* GUPTA with metallic glowing outline & fill */}
              <span className="relative inline-block">
                <span
                  className="bg-gradient-to-r from-[#FF5A1F] via-[#F3F0EA] to-[#FF8A3D] bg-clip-text text-transparent transition-all duration-500"
                  style={{
                    textShadow: "0 0 30px rgba(255,90,31,0.4)",
                  }}
                >
                  GUPTA
                </span>
              </span>
            </h1>

            {/* Subtitle pill */}
            <div className="mt-3 flex items-center gap-2 font-mono-label text-[12px] tracking-[0.15em] text-[var(--accent-soft)]">
              <span className="h-px w-6 bg-[var(--accent)]" />
              <span>AI / GENAI ENGINEER · FULL-STACK DEVELOPER</span>
            </div>
          </motion.div>

          {/* Updated Roles list tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-6 flex flex-wrap items-center gap-2 font-mono-label text-[11px] tracking-[0.12em]"
          >
            {profile.roles.map((role) => (
              <span
                key={role}
                className="rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-1 text-[var(--text-muted)] transition-colors hover:border-[var(--accent)] hover:text-[var(--text-primary)]"
              >
                {role}
              </span>
            ))}
          </motion.div>

          {/* Positioning statement */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-6 max-w-lg text-[16px] leading-relaxed text-[var(--text-primary)] lg:text-[18px]"
          >
            {profile.positioningStatement}
          </motion.p>

          {/* Achievements Summary Badges from Resume */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-6 grid grid-cols-2 gap-3 max-w-md"
          >
            <div className="rounded-xl border border-[rgba(255,90,31,0.2)] bg-[rgba(16,16,16,0.6)] p-3 backdrop-blur-sm">
              <p className="font-mono-label text-[10px] text-[var(--text-muted)]">UNVIBECODE 2026</p>
              <p className="font-semibold text-[14px] text-[var(--accent)]">Top 100 (92nd Rank)</p>
            </div>
            <div className="rounded-xl border border-[rgba(243,240,234,0.1)] bg-[rgba(16,16,16,0.6)] p-3 backdrop-blur-sm">
              <p className="font-mono-label text-[10px] text-[var(--text-muted)]">TCS CODEVITA S13</p>
              <p className="font-semibold text-[14px] text-[var(--text-primary)]">Rank 7907 Global</p>
            </div>
          </motion.div>

          {/* Call to action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <MagneticButton
              as="button"
              onClick={() => router.push("/work")}
            >
              <span
                className="block rounded-full px-8 py-4 font-mono-label text-[12px] tracking-[0.15em] transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,90,31,0.5)]"
                style={{
                  background: "var(--accent)",
                  color: "var(--bg-primary)",
                  fontWeight: 600,
                }}
              >
                EXPLORE MY WORK →
              </span>
            </MagneticButton>

            <Link
              href="/resume"
              data-cursor="link"
              className="link-underline font-mono-label px-3 py-3 text-[12px] tracking-[0.15em] transition-opacity hover:opacity-80"
              style={{ color: "var(--text-muted)" }}
            >
              VIEW RESUME PDF
            </Link>
          </motion.div>
        </div>

        {/* RIGHT COLUMN — Elegant Floating OVAL Sticker Portrait */}

        <div className="relative mx-auto flex items-center justify-center py-4 lg:py-0">
          <div
            className="relative h-[380px] w-[280px] sm:h-[440px] sm:w-[320px] lg:h-[490px] lg:w-[350px]"
            style={{ perspective: "1200px" }}
          >
            {/* Ambient Oval Glow behind portrait */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -inset-6 rounded-full opacity-80"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,90,31,0.32) 0%, rgba(125,249,255,0.12) 45%, transparent 75%)",
                filter: "blur(30px)",
              }}
            />

            {/* Oval Dashed Orbital Ring */}
            <motion.div
              aria-hidden="true"
              style={{
                x: portraitX,
                y: portraitY,
              }}
              className="pointer-events-none absolute -inset-6 rounded-full border border-dashed border-[rgba(255,90,31,0.35)] opacity-80"
            >
              {/* Geographic Pin */}
              <div
                className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border px-3 py-0.5 font-mono-label text-[9px] tracking-wider"
                style={{
                  background: "var(--bg-primary)",
                  borderColor: "rgba(255,90,31,0.5)",
                  color: "var(--accent-soft)",
                }}
              >
                INDIA · AI / FULL-STACK
              </div>
            </motion.div>

            {/* 3D Tilt Wrapper — Sleek Oval Sticker Portrait */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                x: portraitX,
                y: portraitY,
                transformStyle: "preserve-3d",
              }}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.25,
                duration: 0.8,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group relative h-full w-full overflow-hidden rounded-[180px] border-[3px] border-[#F3F0EA] bg-[#0c0c0c] shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(255,90,31,0.35)] transition-shadow duration-500 hover:shadow-[0_30px_70px_rgba(0,0,0,0.95),0_0_50px_rgba(255,90,31,0.5)]"
            >
              {/* Base background */}
              <div
                className="absolute inset-0 z-0"
                style={{
                  background:
                    "linear-gradient(145deg, #1f1a18 0%, #121010 50%, #070707 100%)",
                }}
              />

              {/* Photo Image Cutout */}
              {!photoError ? (
                <Image
                  src={profile.photoPath}
                  alt={`${profile.name} — AI & Full-Stack Engineer`}
                  fill
                  priority
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 320px, 350px"
                  className="relative z-10 object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  onError={() => setPhotoError(true)}
                />
              ) : (
                <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-3 p-6 text-center">
                  <div
                    className="flex h-20 w-20 items-center justify-center rounded-full font-mono-label text-2xl font-bold"
                    style={{
                      border: "2px solid var(--accent)",
                      color: "var(--accent)",
                    }}
                  >
                    TG
                  </div>
                  <p
                    className="font-mono-label text-[12px] tracking-[0.15em]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    TANISHA GUPTA
                  </p>
                </div>
              )}

              {/* Vignette bottom gradient */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-20"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(7,7,7,0) 45%, rgba(7,7,7,0.85) 100%)",
                }}
              />

              {/* Dynamic Interactive Sheen Overlay */}
              <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-30"
                style={{
                  x: sheenX,
                  opacity: sheenOpacity,
                  background:
                    "linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.25) 50%, transparent 80%)",
                }}
              />



              {/* Floating Bottom Status Bar */}
              <div className="absolute bottom-6 left-6 right-6 z-40">
                <div
                  className="flex items-center justify-center rounded-2xl border border-[var(--line)] px-4 py-2 font-mono-label text-[10px] tracking-wider backdrop-blur-md"
                  style={{
                    background: "rgba(8, 8, 8, 0.88)",
                  }}
                >
                  <span className="flex items-center gap-1.5 text-[var(--accent)]">
                    <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
                    AI & FULL-STACK ENGINEER
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ───────────────────── Bottom Rail ───────────────────── */}

      <div className="relative z-10 mx-auto mt-6 w-full max-w-7xl">
        <div className="mb-3 flex items-center justify-between">
          <motion.p
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.2, repeat: Infinity }}
            className="font-mono-label text-[11px] tracking-[0.16em]"
            style={{ color: "var(--accent)" }}
          >
            SCROLL TO EXPLORE ↓
          </motion.p>

          <span className="font-mono-label text-[10px] tracking-widest text-[var(--text-muted)]">
            FEATURED PROJECTS
          </span>
        </div>

        <div
          className="grid grid-cols-1 gap-2 border-t pt-3 sm:grid-cols-3 sm:gap-4"
          style={{ borderColor: "var(--line)" }}
        >
          {RAIL.map((project) => (
            <Link
              key={project.href}
              href={project.href}
              data-cursor="link"
              className="group flex items-center justify-between rounded-xl border border-transparent px-4 py-3 transition-all duration-300 hover:border-[var(--line)] hover:bg-[var(--surface)]"
            >
              <span className="flex items-center gap-3 font-mono-label text-[11px] tracking-[0.14em]">
                <span style={{ color: "var(--accent)" }}>
                  {project.num}
                </span>

                <span className="inline-block text-[var(--text-primary)] transition-transform duration-300 group-hover:translate-x-1">
                  {project.label}
                </span>
              </span>

              <span
                className="opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100"
                style={{ color: "var(--accent)" }}
                aria-hidden="true"
              >
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}