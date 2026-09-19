import type { Metadata } from "next";

import JourneyTimeline from "@/components/sections/JourneyTimeline";

export const metadata: Metadata = {
  title: "Journey — Tanisha Gupta",
  description:
    "Explore Tanisha Gupta's learning journey, experience, research, and growth in AI and software engineering.",
};

export default function JourneyPage() {
  return (
    <main className="relative z-10">
      <section
        aria-labelledby="journey-heading"
        className="pt-8"
      >
        <h1 id="journey-heading" className="sr-only">
          Tanisha Gupta — Journey
        </h1>

        <JourneyTimeline />
      </section>
    </main>
  );
}