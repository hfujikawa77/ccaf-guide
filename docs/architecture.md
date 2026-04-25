# Architecture

This document records the stack rationale, verification checkpoints, and known issues for the `ccaf-guide` site. It is the source of truth for "why this is built the way it is."

## Stack rationale

| Decision | Choice | Alternatives considered | Why this won |
|---|---|---|---|
| Framework | Nextra v4 | Astro Starlight, VitePress, raw HTML | Tightest fit for an MDX docs site with built-in sidebar / search / TOC; React/Next.js ecosystem signals reusability for future tools |
| Build mode | `output: 'export'` (static) | SSR via `@cloudflare/next-on-pages` | No dynamic data; static export is simplest and fastest; SSR is optional later if auth requires it |
| Hosting | Cloudflare Pages | Vercel, GitHub Pages, Netlify | Free custom domains, generous limits, free Web Analytics, free Cloudflare Access (Phase 2 auth) |
| Search | Pagefind (Nextra v4 bundles `<Search>` for Pagefind) | FlexSearch (Nextra v3-era), Algolia DocSearch | Pagefind has native CJK segmentation, runs entirely client-side, no API key. Originally we planned FlexSearch with `tokenize:'forward'` for Japanese, but Nextra v4 had already migrated to Pagefind, so the Step 5 work was a postbuild integration instead of a tokenizer tweak |
| Domain | ccaf.dev (Cloudflare Registrar) | ccaf.com, cca-prep.dev | 4-char, exam-code-direct, `.dev` enforces HTTPS, registrar at cost |
| Auth (Phase 2) | Cloudflare Access | Workers-based custom auth | Edge-level gate, no code change required to enable |

## Static export decisions

- `next.config.mjs` sets `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`.
- The catch-all route `app/[[...mdxPath]]/page.tsx` is paired with `generateStaticParamsFor('mdxPath')` so every MDX file under `content/` is pre-rendered at build time.
- No `app/api/`, no Server Actions, no `revalidate` settings. Anything that requires a running Node server is forbidden.

## Pagefind integration notes

Nextra v4's `<Search>` component fetches `/_pagefind/pagefind.js` at runtime, but Pagefind's CLI writes to `/pagefind/` by default. We override with `--output-subdir _pagefind` in the `postbuild` script, so the artefact paths line up.

Pagefind is run after `next build`, scans `out/**/*.html`, looks at `<html lang>` to pick a language (we ship `lang="ja"` from `app/layout.tsx`), and only indexes elements with `data-pagefind-body="true"` — Nextra adds this attribute to the article body and `data-pagefind-ignore="all"` on `<pre>` blocks (because we set `search.codeblocks: false` in `next.config.mjs`).

The `<Search>` component is not serialisable across the React server-component boundary, so a `'use client'` wrapper (`components/localized-search.tsx`) carries the Japanese UI strings.

## Verification checkpoints

### Checkpoint 1 — Step 1.4 (cleared 2026-04-26)

Goal: prove that Nextra v4 + Next.js 15 + React 19 produces a fully static build that Cloudflare Pages can serve without Functions.

| Check | Command | Result |
|---|---|---|
| Build succeeds | `npm run build` | ✅ Compiled in 12.0s, 4/4 pages prerendered, 2/2 exported |
| Static output exists | `ls out/` | ✅ `index.html`, `404.html`, `_next/`, `index.txt` generated |
| Local serve works | `npm run preview` (port 3001) | ✅ HTTP 200, disclaimer rendered 4× in HTML |
| Cloudflare emulation works | `npm run preview:cf` (port 3002) | ✅ HTTP 200, "No Functions. Shimming…", `env.CF_PAGES_*` recognized |
| Search UI renders | grep `nextra-search` in `out/index.html` | ✅ Search input + CTRL K kbd present |

**Outcome**: no need to fall back to Plan A (Nextra v3 / Pages Router) or Plan B (Fumadocs). Proceed with Nextra v4.

**Known carry-overs (recorded for later commits)**:

1. Index page title duplicates (`CCA-F 完全対策教科書 | CCA-F 完全対策教科書`) — fix in Step 4 (metadata). Cause: Nextra applies the title template to the index page even though the index title equals the site title.
2. Search placeholder is English (`Search documentation…`) — fix in Step 5 (Japanese search).
3. Sidebar appears empty because the only page so far (`index`) is hidden via `_meta.ts` — resolves naturally in Step 2 when domain pages are added.

### Checkpoint 2 — after Step 5

Goal: prove that the full content + Japanese search + SEO setup is production-ready before pushing to GitHub.

To be filled in when reached.

### Checkpoint 3 — before Step 7

Goal: confirm the GitHub repository state (commit history, README accuracy, license files) is publish-ready before connecting Cloudflare Pages and the custom domain.

To be filled in when reached.

## Trade-offs explicitly accepted

- **Original HTML's custom design is dropped**. The v3 HTML had domain-specific colors, custom SVG diagrams, and a single-page scroll layout. We accept Nextra's default theme to minimize implementation cost. Re-skinning is a Phase 3 concern.
- **MVP is single-language (Japanese)**. English translation lands in Phase 2 via Nextra i18n (`/en/` prefix).
- **No quizzes / scoring / accounts**. The site is reading-only at MVP. These are Phase 3 concerns.
- **Versions are pinned**. Renovate handles upgrades intentionally; we never accept a `^` range that could shift Nextra/Next.js out from under the harness.

## Risks and mitigations

| Risk | Mitigation |
|---|---|
| Nextra v4 breaking change in a minor version | Versions pinned; Renovate PRs reviewed manually |
| Cloudflare Pages build limit exceeded | Personal-use volume well under the 500 builds/month free quota |
| `.dev` domain renewal lapse | Auto-renew enabled at Cloudflare Registrar; payment card expiry monitored |
| Anthropic exam updates obsolete the content | Quarterly review noted in CLAUDE.md `Out of Scope` review schedule |
