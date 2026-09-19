"use client";

import { useState } from "react";
import { motion } from "framer-motion";

import { Reveal, RevealText } from "@/components/motion/Reveal";
import {
  activeResearch,
  researchNetwork,
  researchStatement,
} from "@/data/research";

export default function ResearchNetworkSection() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section
      aria-labelledby="research-title"
      className="relative z-10 mx-auto max-w-6xl px-5 py-28 md:px-10 md:py-36"
    >
      {/* Header */}
      <Reveal>
        <p
          className="font-mono-label mb-4 text-[11px] tracking-[0.2em]"
          style={{ color: "var(--accent)" }}
        >
          RESEARCH
        </p>
      </Reveal>

      <h1
        id="research-title"
        className="display mb-6 max-w-3xl text-[8vw] font-semibold leading-[1.05] tracking-[-0.04em] md:text-[3vw]"
      >
        <RevealText text={researchStatement} />
      </h1>

      {/* Active Research */}
      <Reveal delay={0.15} className="mb-16">
        <article
          className="rounded-2xl border p-7 md:p-9"
          style={{
            borderColor: "var(--line)",
            background: "var(--surface)",
          }}
        >
          <p
            className="font-mono-label mb-3 text-[11px] tracking-[0.2em]"
            style={{ color: "var(--technical)" }}
          >
            ACTIVE RESEARCH
          </p>

          <h2 className="display mb-2 text-xl font-semibold md:text-2xl">
            {activeResearch.title}
          </h2>

          <p
            className="font-mono-label mb-4 text-[12px] tracking-wide"
            style={{ color: "var(--text-muted)" }}
          >
            {activeResearch.venue}
          </p>

          <p
            className="max-w-2xl text-[15px] leading-relaxed"
            style={{ color: "var(--text-primary)" }}
          >
            {activeResearch.description}
          </p>
        </article>
      </Reveal>

      {/* Research Network */}
      {researchNetwork.length > 0 && (
        <div
          role="list"
          aria-label="Research workflow"
          className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-0"
        >
          {researchNetwork.map((node, index) => {
            const isHovered = hovered === node.id;
            const nextNode = researchNetwork[index + 1];
            const nextIsHovered = nextNode
              ? hovered === nextNode.id
              : false;

            return (
              <div
                key={node.id}
                role="listitem"
                className="flex flex-1 flex-col items-center md:flex-row"
              >
                <motion.div
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                  whileHover={{ y: -2 }}
                  animate={{
                    borderColor: isHovered
                      ? "var(--accent)"
                      : "var(--line)",
                    scale: isHovered ? 1.03 : 1,
                  }}
                  transition={{
                    duration: 0.25,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-full cursor-default rounded-2xl border px-5 py-6 text-center"
                  style={{
                    background: "var(--bg-secondary)",
                  }}
                >
                  <p
                    className="font-mono-label text-[11px] tracking-[0.15em]"
                    style={{
                      color: isHovered
                        ? "var(--accent)"
                        : "var(--text-primary)",
                    }}
                  >
                    {node.label}
                  </p>
                </motion.div>

                {/* Connector */}
                {nextNode && (
                  <>
                    <div
                      className="h-3 w-px md:hidden"
                      style={{
                        background: "var(--line)",
                      }}
                      aria-hidden="true"
                    />

                    <motion.div
                      aria-hidden="true"
                      animate={{
                        opacity:
                          isHovered || nextIsHovered ? 1 : 0.3,
                        scaleX:
                          isHovered || nextIsHovered ? 1 : 0.7,
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                      className="hidden h-px w-8 shrink-0 origin-left bg-[var(--accent)] md:block"
                    />
                  </>
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}