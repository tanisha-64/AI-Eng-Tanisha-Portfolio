# Tanisha Gupta — Portfolio

A production Next.js (App Router + TypeScript + Tailwind + Framer Motion) portfolio,
built from the resume/LinkedIn content and matching the "Intelligence in Motion" creative
brief: obsidian black + warm white + inferno orange, editorial typography, an AI Twin chat
assistant, and a real contact form.

## What's fully working right now (zero setup)

- All 9 pages (Home, About, Work, Research, Journey, Contact, Resume, 3x Project detail)
- Sticky-stacking project cards, scroll-reveal text, magnetic buttons, custom cursor,
  mouse-parallax hero
- AI Twin chat — answers from a real, curated knowledge base (`data/knowledge-base/*.md`)
  about Tanisha's projects, skills, research, and experience. Zero hallucination risk:
  it only ever returns retrieved, verified content or says it doesn't know.
- Contact form — validates input and returns success; ready to send real emails the
  moment you add one API key (see below).
- Fully responsive (mobile recomposes the hero, not just shrinks it), reduced-motion
  support, keyboard-accessible navigation.

## Two things ONLY you can add (by design — nothing here is faked)

### 1. Your real photo
Drop your photo at:
```
public/images/tanisha-profile.jpg
```
The hero automatically detects it and swaps out the placeholder card. No fake/AI-generated
face was used anywhere — the placeholder is intentionally plain until you add the real one.

### 2. Your resume PDF
Drop it at:
```
public/resume/resume.pdf
```
The `/resume` page's "View" and "Download" buttons point here automatically.

## Making the AI Twin use a REAL LLM (optional upgrade)

Right now the AI Twin is powered by a lightweight, dependency-free local retrieval
system — it reads the markdown files in `data/knowledge-base/` and returns the most
relevant one. This is intentional: it's honest, it can never hallucinate, and it needs
zero configuration.

If you want it to have more natural, conversational answers instead:

1. Get a **free** Groq API key: https://console.groq.com/keys (takes ~1 minute)
2. Create a file called `.env.local` in the project root:
   ```
   GROQ_API_KEY=your_key_here
   ```
3. Restart the dev server. The chat route (`app/api/chat/route.ts`) automatically
   switches to Groq once it detects the key — no code changes needed.

Want a different provider (OpenAI, Anthropic, etc.)? Add a new file next to
`lib/ai/groq.ts` implementing the same `AIProvider` interface from `lib/ai/provider.ts`,
then swap it in inside `app/api/chat/route.ts`.

## Making the Contact form send REAL emails (optional upgrade)

Right now the form validates everything correctly and returns success, but doesn't
actually deliver an email anywhere (there's nowhere honest to send it without your
own account). To activate real delivery:

1. Create a **free** Resend account: https://resend.com (takes ~2 minutes)
2. Get an API key from their dashboard
3. Add to `.env.local`:
   ```
   RESEND_API_KEY=your_key_here
   CONTACT_RECEIVER_EMAIL=mitanisha74@gmail.com
   ```
4. Restart the server. `app/api/contact/route.ts` automatically starts sending real
   emails once it detects the key.

(Alternative: skip this file entirely and point the form's submit at a Formspree
endpoint URL instead — even less setup, no code needed.)

## Running locally

```bash
npm install
npm run dev
```
Visit http://localhost:3000

## Deploying (free, ~5 minutes)

1. Push this project to a new GitHub repository
2. Go to https://vercel.com → "Add New Project" → import your GitHub repo
3. Add your environment variables (GROQ_API_KEY, RESEND_API_KEY) in Vercel's project
   settings if you set those up
4. Click Deploy — Vercel auto-detects Next.js, no configuration needed

## Project structure

```
app/                    Routes (App Router)
  page.tsx              Home
  about/ work/ research/ journey/ contact/ resume/
  projects/[slug]/      Dynamic project case-study pages
  api/chat/             AI Twin backend
  api/contact/          Contact form backend
components/
  navigation/ hero/ sections/ projects/ ai-twin/ ui/ motion/
data/
  profile.ts skills.ts projects.ts research.ts   <- edit these to update content
  knowledge-base/*.md                            <- AI Twin's source of truth
lib/
  ai/                    Provider abstraction (local fallback + Groq)
  rag/                   Lightweight keyword-based retrieval
public/
  images/                <- add tanisha-profile.jpg here
  resume/                <- add resume.pdf here
```

## Updating content later

Everything text-based lives in `data/*.ts` — no need to touch components to update
your bio, add a project, or change a skill. Add a new project by adding an entry to
`data/projects.ts`; a detail page is generated automatically at `/projects/your-slug`.

## What was verified before delivery

- `npm run build` — succeeds with zero errors, all routes compile
- `npm run lint` — zero errors (one harmless Next.js warning about font loading location)
- Full Playwright smoke test across all 9 pages + AI Twin chat flow + contact form
  submission — zero console errors, zero hydration issues, all routes return HTTP 200
- Real responsive check at both 1440px (desktop) and 390px (mobile) viewports

## Honest limitations

- The AI Twin's local fallback returns the single best-matching knowledge chunk verbatim
  rather than a fully natural conversational rewrite — add a Groq key (see above) for
  more natural phrasing.
- The contact form needs your own free Resend/Formspree account to actually deliver
  email — see above.
- The photo and resume PDF are yours to add — never faked.
- The 3D/WebGL hero treatment from the original brief was intentionally implemented as
  a CSS + Framer Motion 2.5D equivalent (parallax, orbital rings, glow) instead of
  Three.js/React Three Fiber, per the brief's own fallback allowance — this keeps the
  dependency footprint light and the build reliable without sacrificing the visual
  effect.
