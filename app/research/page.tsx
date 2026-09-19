import type { Metadata } from "next";

import ResearchNetworkSection from "@/components/sections/ResearchNetwork";

export const metadata: Metadata = {
  title: "Research — Tanisha Gupta",
  description:
    "Explore Tanisha Gupta's research interests, experiments, and work in artificial intelligence, computer vision, and related areas.",
};

export default function ResearchPage() {
  return (
    <main className="relative z-10">
      <section
        aria-labelledby="research-heading"
        className="pt-8"
      >
        <h1 id="research-heading" className="sr-only">
          Tanisha Gupta — Research
        </h1>

        <ResearchNetworkSection />
      </section>
    </main>
  );
}
