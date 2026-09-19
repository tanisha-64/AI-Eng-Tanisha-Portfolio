export interface ResearchNode {
  id: string;
  label: string;
  connectsTo: string[];
}

export const researchNetwork: ResearchNode[] = [
  {
    id: "cv",
    label: "COMPUTER VISION",
    connectsTo: ["transformers"],
  },
  {
    id: "transformers",
    label: "TRANSFORMERS",
    connectsTo: ["multimodal"],
  },
  {
    id: "multimodal",
    label: "MULTIMODAL AI",
    connectsTo: ["rag"],
  },
  {
    id: "rag",
    label: "RAG & RETRIEVAL",
    connectsTo: ["crag_self_rag"],
  },
  {
    id: "crag_self_rag",
    label: "CRAG / SELF-RAG",
    connectsTo: ["llms"],
  },
  {
    id: "llms",
    label: "LLMs & AGENTS",
    connectsTo: ["systems"],
  },
  {
    id: "systems",
    label: "AI SYSTEMS",
    connectsTo: [],
  },
];

export const researchStatement =
  "I don't just consume AI tools. I build, benchmark, and research intelligent systems across RAG, CRAG, Self-RAG, and Multimodal Vision-Language models.";

export interface ActiveResearch {
  title: string;
  venue: string;
  description: string;
}

export const activeResearch: ActiveResearch = {
  title: "RAGTrack (CVPR 2026) — Language-Aware RGB-Thermal Object Tracking & RAG Reasoning",
  venue: "Research Intern — IIT (BHU), Varanasi (May 2026 – Present)",
  description:
    "Reproducing CVPR 2026 vision-language tracking in PyTorch with Multi-modal Transformer Encoders, Adaptive Token Fusion, and Context-aware Reasoning Modules across RAG, CRAG (Corrective RAG), and Self-RAG architectures on LasHeR & RGBT210 (86.16% Precision PR@20px).",
};

export interface JourneyStage {
  stage: string;
  title: string;
  period: string;
  description: string;
}

export const journey = [
  {
    stage: "EDUCATION",
    title: "B.Tech, Computer Science Engineering (AI & ML)",
    period: "Oct 2023 – June 2027",
    description:
      "Ashoka Institute of Technology and Management, Varanasi. SGPA: 8.71 / 10. Core focus in AI, Machine Learning, Deep Learning, and Computer Vision.",
  },
  {
    stage: "RESEARCH",
    title: "Research Intern — IIT (BHU), Varanasi",
    period: "May 2026 – Present",
    description:
      "RAGTrack (CVPR 2026) language-aware RGB-Thermal tracking. PyTorch implementation, LasHeR benchmark evaluation (86.16% Precision PR@20px), Adaptive Token Fusion, CRAG & Self-RAG research.",
  },
  {
    stage: "LEADERSHIP",
    title: "Team Lead — Generative AI & Full-Stack, The Wall of Dreams",
    period: "Jan 2026 – Mar 2026",
    description:
      "Led cross-functional dev team on client-facing engagements, architecting full-stack GenAI web apps. Formally recognized in a client Letter of Recommendation.",
  },
  {
    stage: "PROJECTS",
    title: "CodeMentor AI & AI Video Intelligence Platform",
    period: "Production Builds",
    description:
      "Built 20+ module full-stack AI SWE platform with custom sys.settrace tracing, ChromaDB RAG, FastAPI, and Whisper video intelligence pipeline.",
  },
  {
    stage: "ACHIEVEMENTS",
    title: "Competitive Programming & UnvibeCode Top 100",
    period: "National & Global Ranks",
    description:
      "Ranked 92nd in UnvibeCode Engineering Challenge 2026 (Alphashots.ai), Global Rank 7907 in TCS CodeVita Season 13, and 200+ DSA problems solved.",
  },
  {
    stage: "NEXT",
    title: "AI / GenAI Engineer & Full-Stack Engineer",
    period: "Looking Ahead",
    description:
      "Seeking opportunities to build production-grade AI systems at the intersection of research and software engineering.",
  },
] satisfies readonly JourneyStage[];