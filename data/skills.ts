export interface Capability {
  number: string;
  title: string;
  description: string;
  tech: string[];
}

export interface SkillGroup {
  group: string;
  items: string[];
}

export const capabilities = [
  {
    number: "01",
    title: "GENERATIVE AI",
    description:
      "Building LLM-powered applications across prompt engineering, agentic workflows, and multi-step AI pipelines.",
    tech: [
      "LLMs",
      "Prompt Engineering",
      "Agentic AI",
      "Vision-Language Models",
    ],
  },
  {
    number: "02",
    title: "RETRIEVAL-AUGMENTED GENERATION",
    description:
      "Designing advanced retrieval pipelines (RAG, Corrective RAG / CRAG, Self-RAG) that ground language-model responses in verified external context.",
    tech: [
      "RAG",
      "CRAG (Corrective RAG)",
      "Self-RAG",
      "ChromaDB",
      "Vector Embeddings",
      "LangChain",
      "Cohere",
    ],
  },
  {
    number: "03",
    title: "COMPUTER VISION & MULTIMODAL",
    description:
      "Working with deep learning, vision transformers, multimodal models, and visual understanding for research and applied AI systems.",
    tech: [
      "PyTorch",
      "Vision Transformers",
      "CLIP",
      "Qwen2.5-VL",
      "Multimodal AI",
    ],
  },
  {
    number: "04",
    title: "LLM APPLICATIONS",
    description:
      "Developing practical AI features for code assistance, content analysis, retrieval, and multimodal workflows.",
    tech: [
      "OpenAI API",
      "Mistral AI",
      "Hugging Face",
      "Whisper",
      "Sentence Transformers",
    ],
  },
  {
    number: "05",
    title: "SOFTWARE ENGINEERING",
    description:
      "Building the software layer around AI systems, including APIs, databases, authentication, frontend applications, and deployment workflows.",
    tech: [
      "FastAPI",
      "React / TypeScript",
      "PostgreSQL",
      "Redis",
      "JWT",
    ],
  },
] satisfies readonly Capability[];

export const skillGroups = [
  {
    group: "Languages",
    items: [
      "Python",
      "JavaScript",
      "TypeScript",
      "C",
    ],
  },
  {
    group: "Generative AI / LLMs",
    items: [
      "LLMs",
      "Prompt Engineering",
      "RAG",
      "CRAG (Corrective RAG)",
      "Self-RAG",
      "Vector Embeddings",
      "Agentic AI",
      "Vision-Language Models",
    ],
  },
  {
    group: "Machine Learning",
    items: [
      "Deep Learning",
      "Computer Vision",
      "Transformers",
      "PyTorch",
      "NumPy",
      "Pandas",
      "Scikit-learn",
    ],
  },
  {
    group: "Frameworks & APIs",
    items: [
      "LangChain",
      "Hugging Face",
      "OpenAI API",
      "Cohere",
      "FastAPI",
      "Flask",
      "React",
      "SQLAlchemy",
    ],
  },
  {
    group: "Web & Data",
    items: [
      "HTML",
      "CSS",
      "Web Scraping",
      "BeautifulSoup",
    ],
  },
  {
    group: "Databases & Infrastructure",
    items: [
      "PostgreSQL",
      "MySQL",
      "ChromaDB",
      "Redis",
      "Git / GitHub",
      "Linux",
      "AWS",
      "Render",
      "Vercel",
    ],
  },
] satisfies readonly SkillGroup[];