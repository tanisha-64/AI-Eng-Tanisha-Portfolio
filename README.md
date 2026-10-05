# Tanisha Gupta — Portfolio

A production Next.js (App Router + TypeScript + Tailwind + Framer Motion) portfolio built around the "Intelligence in Motion" creative direction: obsidian black + warm white + inferno orange, editorial typography, interactive scroll-driven Portal Hero, macOS Magnification Dock navigation, an AI Twin chat assistant, interactive motion, detailed project case studies, and a real contact form.

## What's fully working right now

- **Interactive Portal Hero**: Center-parting black portal panels with scroll-driven reveal, symmetrical side-by-side **TANISHA GUPTA** typography, medium portrait presentation, and live achievement badges (**UNVIBECODE 2026 Top 100** & **TCS CODEVITA S13 Rank 7907**).
- **macOS Magnification Dock**: Desktop navigation menu with smooth physics-based cursor proximity magnification.
- **AI Twin Chat Assistant**: AI assistant powered by Groq and a curated portfolio knowledge base (`data/knowledge-base/*.md`) with privacy protection (direct email & LinkedIn sharing).
- **Pages & Routes**: Home, About, Work, Research, Journey, Contact, Resume, and 3 project detail pages (`/projects/ragtrack`, `/projects/codementor-ai`, `/projects/ai-video-intelligence`).
- **Motion & Interactions**: Sticky-stacking project cards, scroll-reveal text, magnetic buttons, custom cursor, and dynamic ambient glows.
- **Contact Form**: Client-side and server-side validation with Resend integration for real email delivery.
- **Accessibility & Responsiveness**: Fully responsive layout with mobile drawer, reduced-motion support, and keyboard accessibility.
- **Production Deployment**: Optimized for Vercel deployment with 100% build & TypeScript validation.

## Personal Assets

### 1. Profile photo

The portfolio uses the real profile image at:

```text
public/images/tanisha-profile.jpg
```

The image is framed and revealed dynamically in the Portal Hero.

### 2. Resume PDF

The portfolio uses the resume PDF at:

```text
public/resume/Tanisha_Gupta_Resume.pdf
```

The `/resume` page and header/hero quick links provide access to view and download the resume.

## AI Twin & Privacy Architecture

The AI Twin is powered by a curated knowledge base plus a Groq LLM (with local fallback).

### How it works

```text
User
  ↓
AI Twin UI (Header Modal / Direct Chat)
  ↓
POST /api/chat
  ↓
Knowledge Retrieval (data/knowledge-base/*.md)
  ↓
Privacy Layer (Strict Email & LinkedIn sharing only)
  ↓
Groq LLM
  ↓
Portfolio-Grounded Response
```

The AI Twin uses information stored in:

```text
data/knowledge-base/
├── about.md
├── journey.md
├── projects.md
└── skills.md
```

### AI provider architecture

The provider layer is abstracted through:

```text
lib/ai/
├── provider.ts
├── groq.ts
└── local.ts
```

## Contact Form

The portfolio includes a backend contact form with:

- Client-side validation
- Server-side validation
- Email validation & input limits
- Loading, success, and error states
- Resend integration for real email delivery

Backend endpoint:

```text
POST /api/contact
```

Production email configuration uses:

```text
RESEND_API_KEY
CONTACT_RECEIVER_EMAIL
```

## Making the AI Twin Work Locally

Create a local environment file in the project root:

```text
.env.local
```

Add:

```env
GROQ_API_KEY=your_groq_api_key
```

Restart the development server after adding or changing environment variables.

## Making the Contact Form Send Real Emails

Configure these environment variables locally or in Vercel:

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_RECEIVER_EMAIL=mitanisha74@gmail.com
```

## Running locally

```bash
npm install
npm run dev
```

Visit:

```text
http://localhost:3000
```

## Production validation

```bash
npm run lint
npm run build
```

The project compiles with zero errors across all static and dynamic routes.

## Deploying

The portfolio is deployed on Vercel and connected to the GitHub `main` branch.

### Live website

```text
https://ai-eng-tanisha-portfolio.vercel.app/
```

## Project structure

```text
app/                              Routes and backend endpoints
  page.tsx                        Home (Portal Hero + Marquee + Previews)
  about/                          About page
  work/                           Work / projects page
  research/                       Research page
  journey/                        Journey page
  contact/                        Contact page
  resume/                         Resume page
  projects/[slug]/                Dynamic project case-study pages
  api/chat/                       AI Twin backend
  api/contact/                    Contact form backend
  robots.ts                       Robots configuration
  sitemap.ts                      Sitemap configuration

components/
  navigation/                     Navigation (with macOS Magnification Dock)
  hero/                           PortalHero with scroll-reveal & side-by-side wordmark
  motion/                         Scroll / text reveal animations
  projects/                       Project presentation
  ai-twin/                        AI Twin interface
  sections/                       Portfolio sections
  ui/                             Interactive UI utilities

data/
  profile.ts                      Profile information
  projects.ts                     Project data and case studies
  research.ts                     Research and journey content
  skills.ts                       Skills and capabilities
  knowledge-base/
    about.md                      AI Twin profile context
    journey.md                    AI Twin journey context
    projects.md                   AI Twin project context
    skills.md                     AI Twin skills context

lib/
  ai/
    provider.ts                   AI provider abstraction
    groq.ts                       Groq implementation
    local.ts                      Local fallback
  rag/
    retrieval.ts                  Knowledge retrieval
  config.ts                       Shared configuration

public/
  images/
    tanisha-profile.jpg           Profile image
  resume/
    Tanisha_Gupta_Resume.pdf      Resume
```

## Key Achievements & Highlights

- **UNVIBECODE 2026**: Top 100 (92nd Rank) in Engineering Challenge (Alphashots.ai)
- **TCS CODEVITA Season 13**: Global Rank 7907
- **Research Intern @ IIT (BHU)**: Computer Vision & Language-guided multimodal AI
- **200+ DSA Problems Solved**: LeetCode & GeeksforGeeks

## Repository

GitHub:

```text
https://github.com/tanisha-64/AI-Eng-Tanisha-Portfolio
```

## Author

### Tanisha Gupta

**AI/ML & Full-Stack Engineer**

- **Email**: mitanisha74@gmail.com
- **Portfolio**: [https://ai-eng-tanisha-portfolio.vercel.app/](https://ai-eng-tanisha-portfolio.vercel.app/)
- **GitHub**: [https://github.com/tanisha-64](https://github.com/tanisha-64)
- **LinkedIn**: [https://www.linkedin.com/in/tanishagupta71/](https://www.linkedin.com/in/tanishagupta71/)

## License

This repository is primarily a personal portfolio project.
Please contact the author before reusing personal content, resume material, portfolio assets, or branding.