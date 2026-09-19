import type { Metadata } from "next";

import { Reveal, RevealText } from "@/components/motion/Reveal";
import ProjectStack from "@/components/projects/ProjectStack";
import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Work — Tanisha Gupta",
  description:
    "Explore Tanisha Gupta's selected AI, machine learning, generative AI, and computer vision projects.",
};

export default function WorkPage() {
  return (
    <main className="relative z-10">
      <section
        aria-labelledby="work-heading"
        className="mx-auto max-w-6xl px-5 pb-10 pt-32 md:px-10 md:pt-40"
      >
        <Reveal>
          <p
            className="font-mono-label mb-6 text-[11px] tracking-[0.2em]"
            style={{ color: "var(--accent)" }}
          >
            SELECTED WORK
          </p>
        </Reveal>

        <h1
          id="work-heading"
          className="display max-w-4xl text-[10vw] font-semibold leading-[1.05] md:text-[4.4vw]"
        >
          <RevealText text="Research explored. Systems built." />
        </h1>
      </section>

      <section
        aria-label="Tanisha Gupta selected projects"
        className="mx-auto max-w-6xl px-5 pb-20 md:px-10"
      >
        <ProjectStack projects={projects} />
      </section>
    </main>
  );
}