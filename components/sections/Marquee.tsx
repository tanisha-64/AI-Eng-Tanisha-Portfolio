"use client";

const ROW_1 = [
  "AI / GENAI ENGINEER",
  "RAG",
  "CRAG (CORRECTIVE RAG)",
  "SELF-RAG",
  "LLMs",
  "VISION-LANGUAGE MODELS",
  "PYTORCH",
  "FASTAPI",
];

const ROW_2 = [
  "TRANSFORMERS",
  "MULTIMODAL AI",
  "FULL-STACK DEVELOPER",
  "SOFTWARE ENGINEERING",
  "REACT / TYPESCRIPT",
  "CHROMADB",
  "POSTGRESQL",
  "REDIS",
];

interface MarqueeRowProps {
  items: string[];
  reverse?: boolean;
}

function MarqueeRow({ items, reverse = false }: MarqueeRowProps) {
  if (items.length === 0) return null;

  // Duplicated only to create seamless infinite loop animation
  const duplicatedItems = [...items, ...items];

  return (
    <div
      className="overflow-hidden border-y py-4"
      style={{ borderColor: "var(--line)" }}
      aria-hidden="true"
    >
      <div
        className="marquee-track flex items-center w-max"
        style={{
          animationName: reverse ? "marquee-reverse" : "marquee-forward",
          animationDuration: "35s",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
        }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item}-${index}`}
            className="group relative mx-4 inline-flex items-center"
          >
            <span
              className="relative rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-2 font-mono-label text-[12px] tracking-[0.15em] transition-all duration-300 hover:scale-110 hover:border-[var(--accent)] hover:bg-[rgba(255,90,31,0.18)] hover:text-white hover:shadow-[0_0_25px_rgba(255,90,31,0.7),0_0_40px_rgba(125,249,255,0.4)] md:text-[14px]"
              style={{
                color: "var(--text-primary)",
              }}
            >
              {item}
            </span>

            <span
              className="mx-3 text-[var(--line)] text-xs"
              aria-hidden="true"
            >
              ✦
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Marquee() {
  return (
    <section
      aria-label="Technical areas and technologies"
      className="relative z-10 py-6"
    >
      <MarqueeRow items={ROW_1} />
      <MarqueeRow items={ROW_2} reverse />

      <style jsx>{`
        @keyframes marquee-forward {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        @keyframes marquee-reverse {
          from {
            transform: translateX(-50%);
          }
          to {
            transform: translateX(0);
          }
        }

        .marquee-track:hover {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-track {
            animation: none !important;
            transform: translateX(0) !important;
          }
        }
      `}</style>
    </section>
  );
}