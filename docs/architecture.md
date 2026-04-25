# Architecture

This document records the stack rationale, verification checkpoints, and known issues for the `ccaf-guide` site. It is the source of truth for "why this is built the way it is."

## Stack rationale

| Decision | Choice | Alternatives considered | Why this won |
|---|---|---|---|
| Framework | Nextra v4 | Astro Starlight, VitePress, raw HTML | Tightest fit for an MDX docs site with built-in sidebar / search / TOC; React/Next.js ecosystem signals reusability for future tools |
| Build mode | `output: 'export'` (static) | SSR via `@cloudflare/next-on-pages` | No dynamic data; static export is simplest and fastest; SSR is optional later if auth requires it |
| Hosting | Cloudflare Workers + Static Assets | Cloudflare Pages, Vercel, GitHub Pages, Netlify | Free custom domains, generous limits, free Web Analytics, free Cloudflare Access (Phase 2 auth). Originally specced as Cloudflare Pages, but Cloudflare's official "Migrate from Pages to Workers" guide signals Workers is now the recommended default — Pages new-feature work has stalled while Workers gains Durable Objects / Cron Triggers / Workflows / Containers. Picking Workers from day 1 sidesteps a future migration |
| Search | Pagefind (Nextra v4 bundles `<Search>` for Pagefind) | FlexSearch (Nextra v3-era), Algolia DocSearch | Pagefind has native CJK segmentation, runs entirely client-side, no API key. Originally we planned FlexSearch with `tokenize:'forward'` for Japanese, but Nextra v4 had already migrated to Pagefind, so the Step 5 work was a postbuild integration instead of a tokenizer tweak |
| Domain | ccaf.dev (Cloudflare Registrar) | ccaf.com, cca-prep.dev | 4-char, exam-code-direct, `.dev` enforces HTTPS, registrar at cost |
| Auth (Phase 2) | Cloudflare Access | Workers-based custom auth | Edge-level gate, sits in front of any Workers/Pages origin; no application code change required |

## Static export decisions

- `next.config.mjs` sets `output: 'export'`, `trailingSlash: true`, `images.unoptimized: true`.
- The catch-all route `app/[[...mdxPath]]/page.tsx` is paired with `generateStaticParamsFor('mdxPath')` so every MDX file under `content/` is pre-rendered at build time.
- No `app/api/`, no Server Actions, no `revalidate` settings. Anything that requires a running Node server is forbidden.

## Workers + Static Assets deployment

`wrangler.jsonc` declares `assets.directory = "./out"` and `not_found_handling = "404-page"`. There is no `main` entry — the deployment is purely static, served by Cloudflare's asset router with no Worker bytecode in the request path. Adding Worker logic later is a one-line edit (`"main": "src/worker.ts"`).

`compatibility_date` is pinned to `2026-04-25`; bump it deliberately on a Renovate-style cadence rather than auto-rolling.

Cloudflare Workers Builds reads `wrangler.jsonc` on every push to `main`, runs `npm run build` (which transitively runs the prebuild SEO script and the postbuild Pagefind index), then `npx wrangler deploy` to publish `out/` as Static Assets.

**Why Workers, not Pages**: see Stack rationale row above. The migration guide at developers.cloudflare.com/workers/static-assets/migration-guides/migrate-from-pages/ is Cloudflare's own signal that Workers is the new-project default; Pages is in feature-freeze mode while new platform features (Durable Objects, Cron Triggers, Workflows, Containers, Secrets Store) ship Workers-only.

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

### Checkpoint 3 — Step 7 (cleared 2026-04-26)

Goal: confirm the GitHub repository state (commit history, README accuracy, license files) is publish-ready before connecting Cloudflare and the custom domain — and confirm the production deployment serves the same artefacts the local build emits.

Pre-push review surfaced and fixed:

| Issue | Fix |
|---|---|
| GitHub repo named `ccaf_guide` (underscore) but every internal reference used `ccaf-guide` (hyphen) — projectLink, docsRepositoryBase, /about license links would 404 in production | `gh repo rename ccaf-guide`; remote URL auto-updated locally |
| Five anchor links of the form `/d1-agentic#1-3-...` — Nextra strips `.` from heading IDs so the live IDs are `#13-...` | Rewrote all five anchor targets in `antipatterns.mdx` and `d3-claude-code.mdx` |
| Hosting target was Cloudflare Pages in the requirements; the Cloudflare-recommended path for new projects since 2025 is Workers + Static Assets | Added `wrangler.jsonc`, switched scripts and harness docs |

Production verification on `https://ccaf.dev`:

| Check | Result |
|---|---|
| Home `/` | HTTP 200, title `CCA-F 完全対策教科書`, disclaimer × 3 |
| `/d1-agentic/` | HTTP 200, templated title, SVG diagrams render with domain colours |
| `/_pagefind/pagefind.js` | HTTP 200, 45 KB |
| `/sitemap.xml` | HTTP 200, 13 `<loc>` entries |
| `/robots.txt` | HTTP 200, correct `User-agent` / `Allow` / `Sitemap` / `Host` |
| `/nonexistent-path/` | HTTP 404 (handled by `not_found_handling: "404-page"` → `out/404.html`) |
| TLS / HTTP/2 | Cloudflare Universal SSL, `cf-cache-status: HIT` |

Manual browser checks (sidebar grouping, search hits for "コーディネーター" and "Hub-and-Spoke", GitHub iconography, "このページを編集" link, dark mode, mobile menu): all pass.

**Outcome**: site is live at https://ccaf.dev. Phase 2 work (Cloudflare Access, English translation under `/en/`) is decoupled from this checkpoint.

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
