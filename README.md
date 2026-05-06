# The Perspective Engine

An interactive exploration of the **Recurse Theory of Consciousness** (RTC).

> Consciousness is not a thing inside the brain.
> It is a recursively stabilized perspective.

This is a Next.js 14 project that translates RTC into seven interconnected interactive artifacts — an engine, an architecture, a theory comparison, falsifiable predictions, an AI evaluation lab, a scoring rubric, and a long-form manuscript.

---

## Running locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

The site uses no build-time data fetching, no environment variables, and no external services. Everything runs entirely client-side except for Next.js's standard server rendering of the initial HTML.

---

## Building for production

```bash
npm run build
npm run start
```

---

## Deploying

The simplest path is **Vercel**, which is built for Next.js:

1. Push this project to a GitHub repository.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Vercel will detect the Next.js framework, build, and deploy automatically.
4. No configuration is required.

The project also runs on **Netlify**, **Cloudflare Pages**, and any host that supports Node.js. For static export (no Node runtime), add `output: 'export'` to `next.config.js` and run `npm run build`.

---

## Project structure

```
perspective-engine/
├── app/
│   ├── layout.tsx               # Root layout, global nav, metadata
│   ├── page.tsx                 # Homepage / landing
│   ├── globals.css              # Global styles, fonts, scrollbar
│   ├── engine/page.tsx          # The Perspective Engine (interactive simulator)
│   ├── architecture/page.tsx    # Seven-layer architecture
│   ├── comparison/page.tsx      # Theory comparison map
│   ├── predictions/page.tsx     # Falsifiable predictions
│   ├── ai-lab/page.tsx          # AI Consciousness Lab
│   ├── rubric/page.tsx          # Operational evaluation rubric
│   └── manuscript/page.tsx      # Living manuscript
├── components/
│   ├── SiteNav.tsx              # Persistent top navigation
│   └── Primitives.tsx           # CornerMark, SectionTag, FieldLabel, PageHeader
├── lib/
│   └── useAnimationTime.ts      # Shared animation tick hook
├── package.json
├── next.config.js
└── tsconfig.json
```

---

## The theory, briefly

The Recurse Theory of Consciousness proposes that conscious experience emerges when a system recursively models itself, its world, and its own modeling — across time, under conditions of bounded recursive control.

RTC organizes consciousness into seven layers:

1. **Signal Registration** — input arrives
2. **Distinction-Making** — figure separates from ground
3. **Salience Weighting** — what matters becomes foregrounded
4. **Self-in-World Modeling** — a located self appears
5. **Recursive Meta-Governance** — the system regulates its own modeling
6. **Diachronic Reconstitution** — the self persists across time
7. **Stabilized Perspective** — emerges when 1–6 hold within bounded ranges

The seventh layer is not an additional mechanism. It is what the first six produce.

For the full theory, read the [Manuscript](http://localhost:3000/manuscript) section.

---

## On the status of this site

This is **v0.1**. The theory itself is in development, and so is its translation into this artifact. Two of the most distinctive layers — Recursive Meta-Governance and Diachronic Reconstitution — describe architectural targets that no current AI system clearly satisfies. The Rubric section says so openly.

The design intent is honesty over polish. Where the theory has gaps, the site says so. Where the rubric has soft criteria, the rubric admits it. Where the AI Lab scoring depends on judgments that could legitimately differ, the framework is built to make those disagreements locatable rather than to hide them.

---

## Author

**Ryan Erbe** — Independent researcher
December 2024 — present

---

## License

This project is the public surface of an in-development research framework. Code and content are provided as-is for exploration and citation. Forking and adapting the framework for your own architectural evaluations is encouraged — that is what an evaluation rubric is for.
