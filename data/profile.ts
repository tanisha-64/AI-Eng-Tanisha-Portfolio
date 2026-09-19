export interface ProfileStat {
  label: string;
  value: string;
}

export interface Education {
  degree: string;
  school: string;
  period: string;
  detail: string;
}

export interface Certification {
  name: string;
  org: string;
  year?: string;
}

export const profile = {
  name: "Tanisha Gupta",
  firstName: "Tanisha",
  lastName: "Gupta",
  title: "AI / GenAI Engineer | Full-Stack & Software Engineering",

  roles: [
    "AI / GENAI ENGINEER",
    "FULL-STACK DEVELOPER",
    "SOFTWARE ENGINEER",
    "MACHINE LEARNING",
  ] as const,

  statusLine: "OPEN TO AI / ML & SOFTWARE ENGINEERING ROLES",

  positioningStatement:
    "Building intelligent systems at the intersection of Generative AI, Full-Stack Development, and Software Engineering.",

  summary:
    "AI/ML undergraduate specializing in Generative AI, LLMs, RAG, and Computer Vision. Research Intern at IIT (BHU), reproducing CVPR 2026 vision-language tracking research, with experience leading Generative AI and full-stack initiatives at The Wall of Dreams. Built AI systems spanning agentic LLM workflows, RAG & multimodal intelligence using Python, PyTorch, FastAPI & React.",

  location: "India",
  phone: "+91-6306662997",
  email: "mitanisha74@gmail.com",

  linkedin: "https://www.linkedin.com/in/tanishagupta71/",
  github: "https://github.com/tanisha-64",

  photoPath: "/images/tanisha-profile.jpg",

  stats: [
    {
      label: "UnvibeCode 2026 Rank",
      value: "Top 100 (92nd)",
    },
    {
      label: "TCS CodeVita Rank",
      value: "7907 Global",
    },
    {
      label: "RAGTrack Precision",
      value: "86.16%",
    },
    {
      label: "DSA Problems Solved",
      value: "200+",
    },
  ] satisfies readonly ProfileStat[],
} as const;

export const education: Education = {
  degree: "B.Tech, Computer Science Engineering (AI & ML)",
  school: "Ashoka Institute of Technology and Management, Varanasi",
  period: "Oct 2023 – June 2027",
  detail: "SGPA: 8.71 / 10",
};

export const achievements = [
  "Ranked in the Top 100 (92nd) in the UnvibeCode Engineering Challenge 2026 (Alphashots.ai) — evaluating complex codebases through business workflows and risk analysis.",
  "Secured Global Rank 7907 in TCS CodeVita Season 13 (cleared Round 1), a national-level competitive programming contest.",
  "200+ Data Structures & Algorithms problems solved across LeetCode, CodeChef, and Blind 75.",
  "Leadership & technical ownership formally recognized in a client Letter of Recommendation at The Wall of Dreams.",
] as const;

export const certifications: readonly Certification[] = [
  {
    name: "Data Analytics Simulation",
    org: "Tata Group via Forage",
    year: "2026",
  },
  {
    name: "Claude 101",
    org: "Anthropic",
    year: "2026",
  },
  {
    name: "AI & Data Science",
    org: "Infosys Springboard",
  },
  {
    name: "Microsoft Power Apps & Dataverse",
    org: "Microsoft",
    year: "2025",
  },
];