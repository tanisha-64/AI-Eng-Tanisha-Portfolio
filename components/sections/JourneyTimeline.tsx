"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { Reveal, RevealText } from "@/components/motion/Reveal";
import { journey } from "@/data/research";

export default function JourneyTimeline() {
  const timelineRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 0.8", "end 0.3"],
  });

  const lineHeight = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", "100%"]
  );

  return (
    <section
      aria-labelledby="journey-title"
      className="relative z-10 mx-auto max-w-4xl px-5 py-28 md:px-10 md:py-36"
    >
      <Reveal>
        <p
          className="font-mono-label mb-4 text-[11px] tracking-[0.2em]"
          style={{ color: "var(--accent)" }}
        >
          JOURNEY
        </p>
      </Reveal>

      <h2
        id="journey-title"
        className="display mb-16 text-[9vw] font-semibold leading-[1.05] md:text-[3.4vw]"
      >
        <RevealText text="How I got here." />
      </h2>

      <div
        ref={timelineRef}
        className="relative pl-8 md:pl-12"
      >
        {/* Background timeline */}
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-0 top-0 w-px"
          style={{ background: "var(--line)" }}
        />

        {/* Animated timeline progress */}
        <motion.div
          aria-hidden="true"
          className="absolute left-0 top-0 w-px origin-top"
          style={{
            height: lineHeight,
            background: "var(--accent)",
          }}
        />

        <div className="space-y-14">
          {journey.map((stage, index) => (
            <Reveal
              key={`${stage.stage}-${stage.period}`}
              delay={index * 0.05}
              className="relative"
            >
              {/* Timeline node */}
              <span
                aria-hidden="true"
                className="absolute -left-8 top-1.5 h-3 w-3 rounded-full md:-left-12"
                style={{
                  background: "var(--bg-primary)",
                  border: "2px solid var(--accent)",
                }}
              />

              {/* Period */}
              <p
                className="font-mono-label mb-2 text-[11px] tracking-[0.15em]"
                style={{ color: "var(--accent)" }}
              >
                {stage.stage}

                <span style={{ color: "var(--text-muted)" }}>
                  {" "}
                  · {stage.period}
                </span>
              </p>

              {/* Title */}
              <h3 className="display mb-2 text-xl font-semibold tracking-[-0.02em] md:text-2xl">
                {stage.title}
              </h3>

              {/* Description */}
              <p
                className="max-w-lg text-[15px] leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {stage.description}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}