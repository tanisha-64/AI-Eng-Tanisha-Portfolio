# Tanisha Gupta — Portfolio

A production Next.js (App Router + TypeScript + Tailwind + Framer Motion + Three.js WebGL) portfolio built around the "Intelligence in Motion" creative direction: obsidian black + warm white + inferno orange, editorial typography, interactive scroll-driven Portal Hero, global WebGL Liquid Ether fluid background, macOS Magnification Dock navigation, an AI Twin chat assistant, interactive motion, detailed project case studies, and a real contact form.

## What's fully working right now

- **Global Liquid Ether WebGL Fluid Background**: Real-time fluid dynamics simulation using Three.js, double-buffered ping-pong FBOs, BFECC advection, vorticity confinement, autonomous idle flow (`autoDemo`), obsidian & inferno orange palette, and cursor interaction.
- **Interactive Portal Hero**: Center-parting black portal panels with scroll-driven reveal, symmetrical side-by-side **TANISHA GUPTA** typography with equal margins from the center line, medium portrait presentation, and live achievement badges.
- **macOS Magnification Dock Navigation**: Desktop navigation bar with physics-based proximity magnification on hover.
- **AI Twin Chat Assistant**: AI assistant powered by Groq and a curated portfolio knowledge base (`data/knowledge-base/*.md`) with strict privacy protection (direct email & LinkedIn sharing only).
- **Comprehensive Routes**: Home, About, Work, Research, Journey, Contact, Resume, and 3 project detail case studies (`/projects/ragtrack`, `/projects/codementor-ai`, `/projects/ai-video-intelligence`).
- **Interactive Motion**: Sticky-stacking project cards, scroll-reveal text, magnetic buttons, custom cursor, and dynamic ambient glows.
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

## WebGL Liquid Ether Background

The background fluid simulation is implemented in:

```text
components/background/LiquidEtherBackground.tsx
```

### Features:
- **Simulation Pipeline**: Advection (BFECC) → Vorticity Confinement → Divergence → Jacobi Pressure Solve (18 iterations) → Gradient Subtraction → Color Display.
- **Palette Tokens**: Obsidian black base (`#050505`), deep ember (`#5B170E`), inferno orange (`#FF5A1F`), amber glow (`#FF8A3D`), and subtle warm highlight (`#F3F0EA`).
- **Performance**: Managed through `IntersectionObserver` and `visibilitychange` (pauses rendering when tab is hidden or offscreen), responsive resolution scaling (Desktop ~0.55, Tablet ~0.45, Mobile ~0.35).
- **Z-Index Layering**: Runs on `pointer-events: none` at `z-0` beneath all interactive elements.

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
  background/                     Global WebGL Liquid Ether fluid background
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