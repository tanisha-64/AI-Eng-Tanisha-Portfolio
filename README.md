# Tanisha Gupta — Portfolio

A production Next.js (App Router + TypeScript + Tailwind + Framer Motion) portfolio built around the "Intelligence in Motion" creative direction: obsidian black + warm white + inferno orange, editorial typography, an AI Twin chat assistant, interactive motion, detailed project case studies, and a real contact form.

## What's fully working right now

- Home, About, Work, Research, Journey, Contact, Resume, and 3 project detail pages
- Sticky-stacking project cards, scroll-reveal text, magnetic buttons, custom cursor, mouse-parallax hero
- AI Twin chat powered by Groq and a curated portfolio knowledge base (`data/knowledge-base/*.md`)
- AI Twin retrieval pipeline grounded in Tanisha's portfolio information
- Contact form with client-side and server-side validation
- Resend integration for real email delivery
- Fully responsive layout with mobile-specific recomposition
- Reduced-motion support and keyboard-accessible navigation
- Production deployment on Vercel

## Personal Assets

### 1. Profile photo

The portfolio uses the real profile image at:

```text
public/images/tanisha-profile.jpg
```

The image is used directly by the hero section.

### 2. Resume PDF

The portfolio uses the resume PDF at:

```text
public/resume/Tanisha_Gupta_Resume.pdf
```

The `/resume` page provides access to view/open the resume.

## AI Twin

The AI Twin is powered by a curated knowledge base plus a Groq LLM.

### How it works

```text
User
  ↓
AI Twin UI
  ↓
POST /api/chat
  ↓
Knowledge Retrieval
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

The retrieval layer selects relevant portfolio context before sending the conversation to the configured AI provider.

### AI provider architecture

The provider layer is abstracted through:

```text
lib/ai/
├── provider.ts
├── groq.ts
└── local.ts
```

This keeps the chat backend flexible and allows a local fallback when a Groq API key is unavailable.

## Contact Form

The portfolio includes a backend contact form with:

- Client-side validation
- Server-side validation
- Email validation
- Input length limits
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

These values are configured through Vercel Environment Variables and are not committed to the repository.

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

The real API key must never be committed to GitHub.

## Making the Contact Form Send Real Emails

Configure these environment variables locally:

```env
RESEND_API_KEY=your_resend_api_key
CONTACT_RECEIVER_EMAIL=your_email@example.com
```

For production, add the same variables through Vercel's Environment Variables settings.

Never place real API keys inside:

```text
README.md
.env.example
TypeScript files
React components
public/
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

Run:

```bash
npm run lint
npm run build
```

The current project passes both checks successfully.

## Deploying

The portfolio is deployed on Vercel and connected to the GitHub `main` branch.

### Deployment flow

```text
Local Development
      ↓
Git Commit
      ↓
GitHub main
      ↓
Vercel
      ↓
Production
```

### Live website

```text
https://ai-eng-tanisha-portfolio.vercel.app/
```

Environment secrets are configured separately in Vercel.

## Project structure

```text
app/                              Routes and backend endpoints
  page.tsx                        Home
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
  navigation/                     Navigation
  hero/                           Interactive hero
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

## Architecture

```text
                         ┌─────────────────────┐
                         │     Portfolio UI    │
                         │ Next.js + React + TS│
                         └──────────┬──────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
              ▼                     ▼                     ▼
        Project Pages           AI Twin             Contact Form
              │                     │                     │
              ▼                     ▼                     ▼
       data/projects.ts        /api/chat           /api/contact
                                    │                     │
                                    ▼                     ▼
                            Knowledge Retrieval        Resend
                                    │
                                    ▼
                                 Groq LLM
```

## Project Overview

### RAGTrack

Research-focused work around language-aware RGB-Thermal object tracking, multimodal visual features, transformer-based architectures, and language-guided reasoning.

### CodeMentor AI

An AI-assisted software engineering platform exploring LLM-powered development workflows, retrieval, backend services, and full-stack application design.

### AI Video Intelligence Platform

A multimodal AI application focused on video and audio understanding, transcription, semantic retrieval, and question answering over media content.

Project definitions are maintained in:

```text
data/projects.ts
```

## Updating content later

Most portfolio content is separated from the UI.

Update:

```text
data/profile.ts
data/projects.ts
data/research.ts
data/skills.ts
```

Update AI Twin knowledge through:

```text
data/knowledge-base/
```

Adding a new project to `data/projects.ts` allows the dynamic project route to generate:

```text
/projects/your-slug
```

## Design system

The portfolio follows a cinematic editorial visual language built around:

- Obsidian black surfaces
- Warm white typography
- Inferno orange accents
- Glassmorphism
- Editorial typography
- Technical monospace labels
- Scroll-driven motion
- Mouse parallax
- Magnetic interactions
- Custom cursor
- Responsive recomposition
- Reduced-motion support

The hero uses a lightweight CSS + Framer Motion 2.5D approach instead of a heavy WebGL implementation. This keeps the dependency footprint relatively light while preserving depth, glow, parallax, and orbital visual effects.

## Accessibility

The interface includes:

- Semantic HTML
- Keyboard-accessible navigation
- Accessible labels
- Focusable interactive controls
- Responsive layouts
- Reduced-motion support
- Mobile navigation states
- Appropriate ARIA attributes

## Security & Privacy

The GitHub repository is maintained as a private repository.

Sensitive environment values are kept outside source control:

```text
GROQ_API_KEY
RESEND_API_KEY
CONTACT_RECEIVER_EMAIL
```

Local secrets are stored in:

```text
.env.local
```

and excluded through `.gitignore`.

The portfolio photo and resume are intentionally public website assets because they are displayed or linked from the public portfolio.

## What was verified before deployment

- `npm run lint` — passes with zero lint errors
- `npm run build` — successfully compiles the production application
- TypeScript type checking — passes
- All configured routes compile successfully
- Static, dynamic, project, API, robots, and sitemap routes are generated successfully
- Production deployment status on Vercel — Ready
- AI Twin live request flow — working with Groq

## Honest limitations

- The AI Twin is grounded in the portfolio knowledge base, so answers depend on the information currently maintained in `data/knowledge-base/`.
- The contact form requires valid Resend environment variables for real email delivery.
- The profile photo and resume are intentionally public assets because the website displays and links to them.
- The hero uses a CSS + Framer Motion 2.5D treatment rather than full Three.js / React Three Fiber WebGL rendering.

## Repository

GitHub:

```text
https://github.com/tanisha-64/AI-Eng-Tanisha-Portfolio
```

## Author

### Tanisha Gupta

**AI/ML Engineer**

Areas of interest:

```text
Generative AI
RAG
LLMs
Computer Vision
AI Systems
Software Engineering
```

Portfolio:

```text
https://ai-eng-tanisha-portfolio.vercel.app/
```

GitHub:

```text
https://github.com/tanisha-64
```

LinkedIn:

```text
https://www.linkedin.com/in/tanishagupta71/
```

## License

This repository is primarily a personal portfolio project.

Please contact the author before reusing personal content, resume material, portfolio assets, or branding.