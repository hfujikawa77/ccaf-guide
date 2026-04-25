# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

`ccaf-guide` is an unofficial study guide for the **Claude Certified Architect – Foundations (CCA-F)** exam. It is hosted at [ccaf.dev](https://ccaf.dev) on Cloudflare Pages as a fully static site.

> Not affiliated with or endorsed by Anthropic, PBC.

## Stack

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | Nextra v4.6.1 | App Router + MDX, opinionated docs theme |
| Runtime | Next.js 15.5.15 + React 19 | Latest stable, App Router required by Nextra v4 |
| Build | `output: 'export'` (static) | Pure static for Cloudflare Pages, no SSR |
| Hosting | Cloudflare Pages | Free CDN, zero-config GitHub integration |
| Search | FlexSearch (Nextra default) | Built-in. Japanese tokenizer config in Step 5 |
| Domain | ccaf.dev (Cloudflare Registrar) | Short, exam-code-direct, HTTPS-enforced TLD |

Versions are **fully pinned** (no caret ranges) to avoid surprise updates. Renovate manages upgrades.

## Development

```bash
npm install          # one-time
npm run dev          # local dev (http://localhost:3000)
npm run build        # static export to out/
npm run preview      # serve out/ via npx serve
npm run preview:cf   # serve out/ via wrangler (Cloudflare Pages emulation)
npm run typecheck    # tsc --noEmit
```

## Repository Layout

```
.
├── app/                       Next.js App Router entry
│   ├── layout.tsx             root layout (banner / navbar / footer)
│   └── [[...mdxPath]]/        catch-all MDX route
├── content/                   MDX content (one file per page)
│   ├── index.mdx              home
│   └── _meta.ts               sidebar order / display
├── docs/                      engineering harness (this repo's source of truth)
│   ├── architecture.md        stack rationale + verification log
│   └── migration-rules.md     HTML → MDX conversion rules
├── public/                    static assets (favicon, OG image)
├── mdx-components.tsx         theme MDX components shim
├── next.config.mjs            Nextra wrapper + static export config
├── tsconfig.json              TS config (paths: @/* → ./*)
├── package.json               pinned dependencies
├── CLAUDE.md                  this file
├── README.md                  public-facing summary
├── LICENSE                    MIT (code)
└── LICENSE-CONTENT.md         CC BY 4.0 (content)
```

## Conventions

### Commits

Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `test:`, `build:`, `ci:`).
One commit per logical work unit. Run `npm run typecheck` and `npm run build` before committing changes that touch `app/`, `content/`, or `next.config.mjs`.

### MDX content rules

See `docs/migration-rules.md` for the full HTML → MDX conversion table. Highlights:

- Frontmatter required: `title`, `description`
- Headings start at `#` (page title); use `##` for sections, `###` for subsections
- SVG diagrams from the original HTML may be inlined as-is in MDX
- Code blocks use fenced ` ```language ` syntax
- Domain-specific tag/box components (custom CSS in original HTML) are intentionally **dropped** — Nextra theme is used as-is for MVP

### Disclaimer placement

The unofficial-disclaimer copy must appear in:

1. The dismissible banner (`app/layout.tsx`)
2. The footer (`app/layout.tsx`)
3. The home page body (`content/index.mdx`)
4. `README.md` and `/about` (when added)

Both Japanese and English disclaimers are required where space allows.

### Sidebar / `_meta.ts`

- Hide pages from the sidebar with `display: 'hidden'`
- Group related pages by ordering them in the same `_meta.ts` block
- One `_meta.ts` per directory; do not nest

### Static export gotchas

- Never use `next/image` with remote sources without `images.unoptimized: true`
- Never add Server Actions or route handlers (`app/api/`) — they break `output: 'export'`
- Never add `getServerSideProps`-equivalent dynamic logic in App Router pages

## Harness Engineering Notes

This repository follows the harness engineering principles outlined by OpenAI: the repository itself is the source of truth, agent-readable documentation lives in `docs/`, and all conventions are mechanical / verifiable.

- **Constrain & Inform**: rules are in `CLAUDE.md` and `docs/`, not in chat
- **Verify**: `npm run typecheck` + `npm run build` are the gates
- **Correct**: each commit must pass the gates; failed gates trigger a fix commit, not an amend
- **Human in the loop**: checkpoints are recorded in `docs/architecture.md`

## Out of Scope (do not do)

- Authentication / user accounts (Phase 2; will use Cloudflare Access)
- Server-side rendering / Server Actions
- Quiz / scoring features
- Comments / FAQ
- PDF generation
- Custom theming that diverges from Nextra defaults (until MVP is stable)
