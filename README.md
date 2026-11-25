# CadetPath 360

A complete NCC preparation system for Indian cadets: the full syllabus for
Certificates A, B and C, a map reading lab with marked drills, timed exam
papers, practical material for the parade ground, an in-app reference library,
and Cadet AI — an assistant that answers from the lessons held in the app.

Everything a cadet needs is inside this platform. Every library book opens full
screen, prints to PDF and downloads for offline study, the official copy of a
publication is linked wherever it is published free, and the assistant runs on
an in-app engine with no external AI service.

Built with React 19, Vite, Hono on Cloudflare Workers, D1 and Freebuff auth.

## What is inside

| Room | What it does |
| --- | --- |
| **Learn** | 20 lessons across 19 subjects, exam marks for every certificate and wing, practical drill and first aid reference, a camps and careers guide, a private notebook, and the in-app library |
| **Library** | 21 reference books — the NCC Act, certificate regulations, the Special NCC Order, board syllabi and marking schemes, question banks, the MoD report, drill, weapon, map, naval, air, first aid, adventure, fitness, SSB and dress references — each readable in the app, openable full screen, printable and downloadable |
| **Map lab** | Six-figure grid drill, grid-to-magnetic bearing drill, conventional signs, contour shapes and scale conversions |
| **Exam room** | Timed papers of 5–30 questions, instant marking with an explanation per answer, scores saved to your progress |
| **Cadet AI** | First-party answer engine: retrieves lesson passages, composes the answer and links the source lesson. No API, no key, no network call |
| **Progress** | Lessons read, papers sat, average score, subject accuracy and recent attempts |

## Run locally

```bash
bun install
bun run dev        # http://localhost:5173, local preview identity
bun test           # Miniflare D1 + route tests
bun run typecheck
bun run build
```

Local preview uses a single preview identity so the notebook, exam history and
Cadet AI work before auth is provisioned. On a hosted origin the app uses
Sign in with Freebuff.

## Cadet AI

`POST /api/chat` runs in the Cloudflare Worker (`src/worker/knowledge.ts`). It
indexes the full NCC syllabus (27 lessons, weapons training, 10 obstacles, SSB
guide, drill commands, PYQs, and the 21-book library) and scores passages against
each question.

- **With Groq API (`GROQ_API_KEY`)**: Sends the retrieved syllabus context and
  conversation turns to Groq (`qwen/qwen3.8-27b` by default, configurable
  via `GROQ_MODEL`) for bilingual, grounded answers.
- **Fallback / Offline**: If `GROQ_API_KEY` is unset or the Groq API is
  unreachable, it automatically falls back to the deterministic in-app engine.

To enable Groq locally, copy `.dev.vars.example` to `.dev.vars` and set
`GROQ_API_KEY`. For Cloudflare deployment, run `npx wrangler secret put GROQ_API_KEY`.

## Data

D1 tables created on first use: `notes`, `attempts`, `read_lessons`. Every query
is scoped by the authenticated `sub`, and write routes check same-origin.

## Content sources

The syllabus, marks tables, eligibility and camps follow published DGNCC,
state directorate, CBSE and Ministry of Defence material, digested for study in
the in-app library. CadetPath 360 is a study companion, not an official DGNCC
publication; unit dates, camp allotments and results remain with the ANO and
state directorate.
