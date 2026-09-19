export type ProjectStatus =
  | "completed"
  | "prototype"
  | "research"
  | "concept"
  | "planned";

export interface ProjectLink {
  label: string;
  url: string;
}

export interface ProjectCaseStudy {
  overview: string;
  problem: string;
  whyItMatters: string;
  approach: string;
  architecture: string;
  technology: string[];
  implementation: string[];
  results: string;
  learnings: string;
  futureWork: string;
}

export interface Project {
  slug: string;
  number: string;
  category: string;
  name: string;
  subtitle: string;
  description: string;
  status: ProjectStatus;
  statusLabel: string;
  tech: string[];
  links: ProjectLink[];
  caseStudy: ProjectCaseStudy;
}

export const projects = [
  {
    slug: "ragtrack",
    number: "01",
    category: "COMPUTER VISION / RESEARCH",
    name: "RAGTrack (CVPR 2026)",
    subtitle: "Language-Aware RGB-Thermal Object Tracking at IIT (BHU)",
    description:
      "A research implementation at IIT (BHU) reproducing CVPR 2026 vision-language tracking, integrating multimodal transformer fusion and language-guided target adaptation.",
    status: "research",
    statusLabel: "RESEARCH INTERN",
    tech: [
      "PyTorch",
      "CLIP",
      "Qwen2.5-VL",
      "RAG",
      "Vision Transformers",
      "Multi-GPU Linux",
    ],
    links: [],
    caseStudy: {
      overview:
        "RAGTrack is a research implementation conducted during a Research Internship at IIT (BHU), reproducing CVPR 2026 vision-language RGB-Thermal object tracking.",
      problem:
        "Object tracking degrades under heavy occlusion, thermal noise, and illumination variations. RGB and thermal visual channels provide complementary signals.",
      whyItMatters:
        "Language-aware visual reasoning grounds target tracking across extreme lighting and noise conditions for robust multimodal perception.",
      approach:
        "Reviewed 6+ SOTA Vision-Language and RGB-Thermal tracking papers. Reproduced the RAGTrack architecture in PyTorch using Multi-modal Transformer Encoders, Adaptive Token Fusion, and Context-aware Reasoning Modules.",
      architecture:
        "Combines CLIP, Qwen2.5-VL, RAG, and Vision Transformers with multi-GPU Linux execution workflows across the LasHeR and RGBT210 benchmarks.",
      technology: [
        "PyTorch",
        "CLIP",
        "Qwen2.5-VL",
        "Vision Transformers",
        "RAG",
        "Linux Multi-GPU",
      ],
      implementation: [
        "Reviewed 6+ SOTA Vision-Language and RGB-Thermal tracking papers to identify multimodal fusion research gaps.",
        "Reproduced RAGTrack in PyTorch with Multi-modal Transformer Encoder, Adaptive Token Fusion, and Context-aware Reasoning Modules.",
        "Engineered training/inference/evaluation pipelines for LasHeR benchmark (1,224 RGB-T video pairs, 730K+ frame pairs) and RGBT210.",
        "Validated tracker on 210 sequences / 104,706 frames, achieving 86.16% Precision (PR@20px) and 58.89% Success (AUC).",
        "Proposed a Behavioral Reasoning & Adaptive Fusion enhancement to strengthen cross-modal interaction.",
      ],
      results:
        "Achieved 86.16% Precision (PR@20px) and 58.89% Success (AUC) across 210 benchmark sequences / 104,706 frames on LasHeR & RGBT210.",
      learnings:
        "Multimodal fusion requires careful token alignment, adaptive weighting, and context-aware reasoning to handle severe occlusion.",
      futureWork:
        "Further refine adaptive token fusion and extend language-guided target adaptation across real-time video streams.",
    },
  },

  {
    slug: "codementor-ai",
    number: "02",
    category: "FULL-STACK / GENERATIVE AI",
    name: "CodeMentor AI",
    subtitle: "AI-Native Software Engineering Platform",
    description:
      "A full-stack AI platform with 20+ backend modules, 25+ frontend pages, custom sys.settrace execution tracing, and RAG mentoring pipelines.",
    status: "completed",
    statusLabel: "COMPLETED",
    tech: [
      "FastAPI",
      "React",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "ChromaDB",
      "LLMs",
      "RAG",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/tanisha-64/AI-SWE-SIMULATION-PLATFORM",
      },
      {
        label: "Live Demo",
        url: "https://ai-swe-simulation-platform-two.vercel.app/",
      },
    ],
    caseStudy: {
      overview:
        "CodeMentor AI is an AI-native software engineering simulation platform designed for coding practice, automated AI code review, debugging, and personalized mentoring.",
      problem:
        "Traditional practice platforms lack interactive, line-by-line execution visualization, source-cited RAG mentoring, and automated AI code review.",
      whyItMatters:
        "Combines execution tracing with retrieval-grounded AI feedback to create a realistic software engineering mentorship environment.",
      approach:
        "Architected a full-stack system from scratch with 20+ backend modules, 25+ frontend pages, and 6+ AI-powered workflows.",
      architecture:
        "FastAPI backend with background task execution, PostgreSQL database, Redis caching/rate-limiting, ChromaDB vector storage with Cohere embeddings, and React/TypeScript frontend.",
      technology: [
        "FastAPI",
        "React",
        "TypeScript",
        "PostgreSQL",
        "Redis",
        "ChromaDB",
        "Cohere Embeddings",
        "JWT",
        "sys.settrace",
      ],
      implementation: [
        "Architected full-stack platform integrating 6+ AI workflows for practice, code review, debugging, and mentoring.",
        "Built self-populating AI content and RAG pipelines with ChromaDB and Cohere embeddings with source-cited mentoring knowledge.",
        "Developed custom Python execution tracer (sys.settrace) and asynchronous LLM code-review pipeline via FastAPI background tasks.",
        "Hardened authentication with JWT token rotation, bcrypt hashing, and Redis rate limiting; deployed on Render & Vercel.",
      ],
      results:
        "Shipped full-stack production platform with 20+ backend modules, 25+ frontend pages, and live public deployment on Render & Vercel.",
      learnings:
        "Non-blocking background tasks and line-by-line execution tracing drastically improve responsiveness for interactive LLM code reviews.",
      futureWork:
        "Expand multi-language execution tracing and integrate multi-agent pair programming workflows.",
    },
  },

  {
    slug: "ai-video-intelligence",
    number: "03",
    category: "MULTIMODAL AI",
    name: "AI Video Intelligence Platform",
    subtitle: "Multimodal RAG & Video Understanding",
    description:
      "End-to-end multimedia intelligence pipeline converting YouTube videos, podcasts, and meetings into searchable knowledge using Whisper, ChromaDB, and Mistral AI.",
    status: "completed",
    statusLabel: "COMPLETED",
    tech: [
      "Python",
      "Whisper",
      "Mistral AI",
      "LangChain",
      "ChromaDB",
      "Sentence Transformers",
      "Streamlit",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/tanisha-64/AI-Video-Intelligence-Platform",
      },
    ],
    caseStudy: {
      overview:
        "An end-to-end multimedia intelligence pipeline supporting 4+ input sources and 10+ audio/video formats to convert long-form media into structured knowledge.",
      problem:
        "Extracting actionable insights, meeting minutes, and summaries from hours of recorded video and audio is time-consuming.",
      whyItMatters:
        "Semantic vector search over multimedia transcripts makes long recordings instantly searchable and conversational.",
      approach:
        "Engineered an automated ingestion pipeline using yt-dlp and FFmpeg, Whisper speech recognition, Sentence Transformer embeddings, and ChromaDB vector search.",
      architecture:
        "Media ingestion pipeline feeds into Whisper transcription, Sentence Transformers index chunks in ChromaDB, and Mistral AI generates 8 structured outputs via LangChain.",
      technology: [
        "Python",
        "Whisper",
        "Mistral AI",
        "LangChain",
        "ChromaDB",
        "Sentence Transformers",
        "yt-dlp",
        "FFmpeg",
        "Streamlit",
      ],
      implementation: [
        "Engineered multimedia intelligence pipeline supporting 4+ input sources and 10+ audio/video formats.",
        "Built retrieval-grounded knowledge layer with Sentence Transformers and ChromaDB for semantic QA over transcribed content.",
        "Developed LLM-powered analysis generating 8 structured outputs (summaries, key insights, meeting minutes, action items) using Mistral AI.",
        "Automated media processing and audio extraction using yt-dlp and FFmpeg.",
      ],
      results:
        "Successfully processes 10+ media formats into 8 structured LLM outputs with semantic vector QA over video transcripts.",
      learnings:
        "Transcript timestamp alignment and chunk overlap are critical for retrieving exact video segments during Q&A.",
      futureWork:
        "Add speaker diarization and real-time live stream transcription indexing.",
    },
  },
] satisfies readonly Project[];