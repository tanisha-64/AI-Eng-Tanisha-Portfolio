"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { profile } from "@/data/profile";

export default function PortalHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // 1. Two solid black panels parting outward to uncover the portrait
  const leftPanelX = useTransform(scrollYProgress, [0, 0.75], ["0%", "-102%"]);
  const rightPanelX = useTransform(scrollYProgress, [0, 0.75], ["0%", "102%"]);

  // 2. Photo scale settling smoothly
  const imageScale = useTransform(scrollYProgress, [0, 0.85], [1.06, 1.0]);

  // 3. Two glowing accent dots (fiery orange and electric cyan) travelling outward
  const dotOrangeX = useTransform(scrollYProgress, [0, 0.75], ["0vw", "-36vw"]);
  const dotOrangeY = useTransform(scrollYProgress, [0, 0.75], ["0vh", "-30vh"]);
  const dotOrangeOpacity = useTransform(scrollYProgress, [0, 0.15, 0.75, 0.95], [1, 1, 0.85, 0]);

  const dotCyanX = useTransform(scrollYProgress, [0, 0.75], ["0vw", "36vw"]);
  const dotCyanY = useTransform(scrollYProgress, [0, 0.75], ["0vh", "30vh"]);
  const dotCyanOpacity = useTransform(scrollYProgress, [0, 0.15, 0.75, 0.95], [1, 1, 0.85, 0]);

  // 4. Symmetrical Wordmark animation with equal spacing on both sides of center line
  const titleScale = useTransform(scrollYProgress, [0, 0.85], [1.0, 1.14]);
  const titleTracking = useTransform(scrollYProgress, [0, 0.85], ["0.02em", "-0.04em"]);
  const spanLeftX = useTransform(scrollYProgress, [0, 0.85], ["0vw", "-28vw"]);
  const spanRightX = useTransform(scrollYProgress, [0, 0.85], ["0vw", "28vw"]);

  // 5. Corner metadata fade
  const cornerOpacity = useTransform(scrollYProgress, [0, 0.6, 0.9], [1, 0.9, 0.35]);

  return (
    <section
      ref={containerRef}
      aria-label="Portal Hero Overview"
      className="relative h-[240vh] w-full bg-[#070707]"
    >
      {/* Sticky Stage */}
      <div className="sticky top-0 flex h-screen w-full flex-col justify-between overflow-hidden isolate px-5 py-6 md:px-12 md:py-8">
        {/* Atmosphere Background Glow & Lightning SVG */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        >
          {/* Ambient Orange & Ember Core */}
          <div
            className="absolute left-1/2 top-1/2 h-[550px] w-[550px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
            style={{
              background:
                "radial-gradient(circle, rgba(255,90,31,0.28) 0%, rgba(91,23,14,0.18) 50%, transparent 75%)",
              filter: "blur(60px)",
            }}
          />

          {/* Electric Cyan Ambient Orb */}
          <div
            className="absolute right-10 top-20 h-[300px] w-[300px] rounded-full opacity-35"
            style={{
              background:
                "radial-gradient(circle, rgba(125,249,255,0.16) 0%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />

          {/* Dynamic Lightning Bolt SVGs */}
          <svg
            className="absolute inset-0 h-full w-full opacity-30"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="portal-lightning-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff5a1f" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#7df9ff" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#ff8a3d" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 80 140 Q 320 80, 520 240 T 950 180 T 1350 420"
              fill="none"
              stroke="url(#portal-lightning-grad)"
              strokeWidth="1.5"
              strokeDasharray="8 6"
            />
          </svg>
        </div>

        {/* Medium Centered Photo Stage (full face and dress clearly visible) */}
        <div className="absolute inset-0 z-10 flex items-center justify-center p-4">
          <motion.div
            style={{ scale: imageScale }}
            className="relative h-[65vh] max-h-[580px] w-[88vw] max-w-[440px] overflow-hidden rounded-[32px] border-2 border-[#ff5a1f]/40 bg-[#0c0c0c] shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_40px_rgba(255,90,31,0.35)] will-change-transform"
          >
            {/* Background base inside frame */}
            <div
              className="absolute inset-0 z-0"
              style={{
                background:
                  "linear-gradient(150deg, #181413 0%, #0f0d0d 50%, #070707 100%)",
              }}
            />

            {/* Photo with object-cover object-top so face and dress are fully visible */}
            <Image
              src={profile.photoPath}
              alt={`${profile.name} — AI & Full-Stack Engineer`}
              fill
              priority
              sizes="(max-width: 768px) 340px, 440px"
              className="relative z-10 object-cover object-top contrast-[1.06]"
            />

            {/* Subtle bottom vignette inside photo frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20"
              style={{
                background:
                  "linear-gradient(180deg, transparent 55%, rgba(7,7,7,0.85) 100%)",
              }}
            />

            {/* Status tag at bottom of portrait */}
            <div className="absolute bottom-4 left-4 right-4 z-30 flex items-center justify-center rounded-full border border-[rgba(243,240,234,0.12)] bg-[#070707]/85 px-4 py-2 backdrop-blur-md">
              <span className="flex items-center gap-2 font-mono text-[10px] tracking-wider text-[#ff8a3d]">
                <span className="h-2 w-2 rounded-full bg-[#ff5a1f] animate-pulse" />
                AI / GENAI ENGINEER · IIT (BHU)
              </span>
            </div>
          </motion.div>
        </div>

        {/* Two Solid Black Panels meeting in the center (Starts CLOSED at x=50%) */}
        <motion.div
          style={{ x: leftPanelX }}
          className="pointer-events-none absolute bottom-0 left-0 top-0 z-25 w-[50.2vw] bg-[#070707] will-change-transform"
          aria-hidden="true"
        >
          {/* Glowing orange lightning center seam edge */}
          <div className="absolute bottom-0 right-0 top-0 w-[2px] bg-gradient-to-b from-transparent via-[#ff5a1f] to-transparent shadow-[0_0_15px_#ff5a1f]" />
        </motion.div>

        <motion.div
          style={{ x: rightPanelX }}
          className="pointer-events-none absolute bottom-0 right-0 top-0 z-25 w-[50.2vw] bg-[#070707] will-change-transform"
          aria-hidden="true"
        >
          {/* Glowing orange lightning center seam edge */}
          <div className="absolute bottom-0 left-0 top-0 w-[2px] bg-gradient-to-b from-transparent via-[#ff5a1f] to-transparent shadow-[0_0_15px_#ff5a1f]" />
        </motion.div>

        {/* Center Glowing Accent Dots */}
        <motion.div
          style={{
            x: dotOrangeX,
            y: dotOrangeY,
            opacity: dotOrangeOpacity,
          }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-35 -translate-x-1/2 -translate-y-1/2 will-change-transform"
          aria-hidden="true"
        >
          <span className="block h-3 w-3 rounded-full bg-[#ff5a1f] shadow-[0_0_16px_#ff5a1f]" />
        </motion.div>

        <motion.div
          style={{
            x: dotCyanX,
            y: dotCyanY,
            opacity: dotCyanOpacity,
          }}
          className="pointer-events-none absolute left-1/2 top-1/2 z-35 -translate-x-1/2 -translate-y-1/2 will-change-transform"
          aria-hidden="true"
        >
          <span className="block h-3 w-3 rounded-full bg-[#7df9ff] shadow-[0_0_16px_#7df9ff]" />
        </motion.div>

        {/* Wordmark: Perfectly Symmetrical Side-by-Side on Either Side of the Center Line */}
        <div className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center">
          {/* LEFT HALF: TANISHA (Anchored on left side of center line with equal right padding) */}
          <div className="absolute right-1/2 flex items-center justify-end pr-5 sm:pr-8 md:pr-10 lg:pr-14 max-w-[48vw]">
            <motion.div
              style={{
                scale: titleScale,
                letterSpacing: titleTracking,
                x: spanLeftX,
              }}
              className="text-right font-extrabold uppercase leading-none will-change-transform"
            >
              <h1 className="whitespace-nowrap font-extrabold text-[8vw] sm:text-[6.8vw] md:text-[5.6vw] lg:text-[4.8vw] leading-none">
                <span
                  className="bg-gradient-to-r from-[#f3f0ea] via-[#ff8a3d] to-[#ff5a1f] bg-clip-text text-transparent"
                  style={{
                    textShadow: "0 0 32px rgba(255,90,31,0.5)",
                  }}
                >
                  TANISHA
                </span>
              </h1>
            </motion.div>
          </div>

          {/* RIGHT HALF: GUPTA (Anchored on right side of center line with equal left padding) */}
          <div className="absolute left-1/2 flex items-center justify-start pl-5 sm:pl-8 md:pl-10 lg:pl-14 max-w-[48vw]">
            <motion.div
              style={{
                scale: titleScale,
                letterSpacing: titleTracking,
                x: spanRightX,
              }}
              className="text-left font-extrabold uppercase leading-none will-change-transform"
            >
              <h1 className="whitespace-nowrap font-extrabold text-[8vw] sm:text-[6.8vw] md:text-[5.6vw] lg:text-[4.8vw] leading-none">
                <span
                  className="bg-gradient-to-r from-[#ff5a1f] via-[#ff8a3d] to-[#f3f0ea] bg-clip-text text-transparent"
                  style={{
                    textShadow: "0 0 32px rgba(255,90,31,0.5)",
                  }}
                >
                  GUPTA
                </span>
              </h1>
            </motion.div>
          </div>
        </div>

        {/* Top Edge Metadata */}
        <motion.div
          style={{ opacity: cornerOpacity }}
          className="relative z-40 mx-auto flex w-full max-w-7xl items-center justify-between border-b border-[rgba(243,240,234,0.1)] pb-3 font-mono text-[11px] uppercase tracking-[0.16em]"
        >
          <div className="flex items-center gap-2 text-[#ff5a1f]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff5a1f] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#ff5a1f]" />
            </span>
            <span>{profile.statusLine}</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-[#8c8984]">
            <span>RESEARCH INTERN @ IIT (BHU)</span>
            <span>·</span>
            <span>INDIA</span>
          </div>
        </motion.div>

        {/* Bottom Edge Metadata & Action Links */}
        <motion.div
          style={{ opacity: cornerOpacity }}
          className="relative z-40 mx-auto flex w-full max-w-7xl flex-col justify-between gap-4 border-t border-[rgba(243,240,234,0.1)] pt-3 sm:flex-row sm:items-center font-mono text-[11px] uppercase tracking-[0.14em]"
        >
          <div className="flex items-center gap-2 text-[#ff8a3d]">
            <span>SCROLL TO OPEN PORTAL</span>
            <span className="inline-block animate-bounce">↓</span>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/work"
              className="rounded-full border border-[#ff5a1f] bg-[#ff5a1f] px-4 py-1.5 font-semibold text-[#070707] transition-all hover:bg-transparent hover:text-[#ff5a1f]"
            >
              EXPLORE WORK →
            </Link>

            <Link
              href="/resume"
              className="text-[#8c8984] hover:text-[#f3f0ea] transition-colors"
            >
              RESUME PDF
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
