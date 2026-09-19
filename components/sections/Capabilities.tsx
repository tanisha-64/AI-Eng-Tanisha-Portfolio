"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Reveal, RevealText } from "@/components/motion/Reveal";
import { capabilities } from "@/data/skills";

export default function Capabilities() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      aria-labelledby="capabilities-heading"
      className="relative z-10 mx-auto max-w-6xl px-5 py-28 md:px-10 md:py-36"
    >
      <Reveal>
        <p
          className="font-mono-label mb-4 text-[11px] tracking-[0.2em]"
          style={{ color: "var(--accent)" }}
        >
          CAPABILITIES
        </p>
      </Reveal>

      <h2
        id="capabilities-heading"
        className="display mb-16 max-w-3xl text-[9vw] font-semibold leading-[1.05] md:text-[3.4vw]"
      >
        <RevealText text="What I actually build with." />
      </h2>

      <div>
        {capabilities.map((capability) => {
          const isHovered = hovered === capability.number;

          return (
            <motion.article
              key={capability.number}
              onMouseEnter={() => setHovered(capability.number)}
              onMouseLeave={() => setHovered(null)}
              className="grid cursor-default items-start gap-5 border-t py-8 md:grid-cols-[100px_1fr_1fr] md:gap-10 md:py-10"
              style={{ borderColor: "var(--line)" }}
              whileHover={{ y: -2 }}
              transition={{
                duration: 0.25,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {/* Number */}
              <motion.span
                animate={{
                  x: isHovered ? 8 : 0,
                  color: isHovered
                    ? "var(--accent)"
                    : "var(--text-muted)",
                }}
                transition={{
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="font-mono-label text-sm"
                aria-hidden="true"
              >
                {capability.number}
              </motion.span>

              {/* Title */}
              <div>
                <h3 className="display text-2xl font-semibold tracking-[-0.02em] md:text-3xl">
                  {capability.title}
                </h3>

                <motion.div
                  aria-hidden="true"
                  className="mt-3 h-[2px]"
                  style={{ background: "var(--accent)" }}
                  initial={false}
                  animate={{
                    width: isHovered ? "60%" : "0%",
                  }}
                  transition={{
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                />
              </div>

              {/* Description + technologies */}
              <div>
                <p
                  className="mb-4 max-w-xl text-[15px] leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {capability.description}
                </p>

                {capability.tech.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {capability.tech.map((technology) => (
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
            </motion.article>
          );
        })}

        <div
          className="border-t"
          style={{ borderColor: "var(--line)" }}
        />
      </div>
    </section>
  );
}