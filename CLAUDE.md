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
| Hosting | Cloudflare Workers + Static Assets | New-project default since Cloudflare folded Pages into Workers in 2025–2026 (see migrate-from-pages docs); the `out/` directory is served via the `assets` binding in `wrangler.jsonc` |
| Search | Pagefind (Nextra v4 default) | Native CJK segmentation; postbuild step generates `out/_pagefind/` |
| Domain | ccaf.dev (Cloudflare Registrar) | Short, exam-code-direct, HTTPS-enforced TLD |

Versions are **fully pinned** (no caret ranges) to avoid surprise updates. Renovate manages upgrades.

## Development

```bash
npm install          # one-time
npm run dev          # local dev (http://localhost:3000)
npm run build        # static export to out/ (+ prebuild SEO + postbuild Pagefind)
npm run preview      # serve out/ via npx serve
npm run preview:cf   # serve out/ via wrangler dev (Workers + Static Assets emulation)
npm run typecheck    # tsc --noEmit
npm run deploy       # wrangler deploy — manual deploy bypassing Workers Builds
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
├── wrangler.jsonc             Workers + Static Assets deploy config
├── tsconfig.json              TS config (paths: @/* → ./*)
├── package.json               pinned dependencies
├── CLAUDE.md                  this file
├── README.md                  public-facing summary
├── LICENSE                    MIT (code)
└── LICENSE-CONTENT.md         CC BY 4.0 (content)
```

## Conventions

### Issue-first workflow

Every PR in this repo opens with `Closes #N`, where `#N` is an existing **open** issue created **before** the branch was started. Do not create the issue retroactively after opening the PR. Chat-only Discover/Design does not satisfy this rule — the issue is the versioned artifact, not the conversation. See `docs/improvement-loop.md` (Cardinal rule) for the why.

This is mechanically enforced by `.github/workflows/issue-first-check.yml`. The GHA fails the PR if no `Closes/Fixes/Resolves #N` reference is found in the body, or if the referenced issue does not exist or is not open. Bot PRs (`dependabot[bot]`, `renovate[bot]`) are exempt.

The check must be registered as a required status check on `main` branch protection. Verify with:

```bash
gh api repos/yokoto/ccaf-guide/branches/main/protection \
  --jq '.required_status_checks.contexts[]?' 2>/dev/null | grep -i 'check-linked-issue' \
  || echo "WARNING: issue-first check is not a required check on main"
```

If missing, register via Settings → Branches → Branch protection rules → `main` → Require status checks → add `check-linked-issue`. The check name appears in the dropdown after the workflow has run at least once.

### Claude Code settings

Two files live under `.claude/`:

- **`.claude/settings.json`** (committed) — team-shared pre-approval list. Anything every contributor needs to do routine work (typecheck, build, `gh pr/repo` reads, `npx git-cliff`, the verify-phase `/tmp/*.log` reads, and `WebFetch` for vendor doc domains used in research) belongs here. Adding to this file is a normal PR.
- **`.claude/settings.local.json`** (gitignored via `~/.config/git/ignore` pattern `**/.claude/settings.local.json`) — personal-only entries: absolute paths under a specific user's home directory, machine-specific tools, in-progress experiments. Never commit and never reference from `settings.json`.

Hard rule: **absolute paths to a user's home directory must never appear in `settings.json`**. They make the shared file useless on every other machine and tend to encode personal sensitive paths. If in doubt, put it in `settings.local.json` first; promote it later if a second contributor needs it.

This split is the same trap `content/d3-claude-code.mdx` §3.1 calls out as a quiz question — putting team rules in `~/.claude/CLAUDE.md` (or in `settings.local.json`) means a fresh clone never inherits them.

`.claude/settings.json` also wires a `PostToolUse` hook (`.claude/hooks/typecheck-on-tsx-edit.sh`) on `Edit|Write|MultiEdit`. The hook runs `npm run typecheck` only when the edited path matches `app/**/*.{ts,tsx}`, `next.config.mjs`, or `mdx-components.tsx`; on failure it exits non-zero, surfacing the error back to the agent. Output is captured to `/tmp/typecheck-hook.log`. MDX files are intentionally *not* in the path filter — `tsc --noEmit` does not validate MDX semantics, so the build-time gate in Phase 5 of `docs/improvement-loop.md` stays as the MDX validator. This is the canonical "保存後に走らせたい処理は `PostToolUse` hook" pattern from `content/d3-claude-code.mdx` §3.3 applied to the repo itself.

### Commits

Conventional Commits (`feat:`, `fix:`, `chore:`, `docs:`, `style:`, `refactor:`, `test:`, `build:`, `ci:`).
One commit per logical work unit. Run `npm run typecheck` and `npm run build` before committing changes that touch `app/`, `content/`, or `next.config.mjs`.

### Build flakiness

If `next build` fails with `Cannot find module for page: /_document` during "Collecting page data", it's a stale cache, not a real error. Clear and retry:

```bash
rm -rf .next out node_modules/.cache && npm run build
```

This is a known intermittent issue with the Nextra v4 + Next.js 15 + App Router combination — the cache occasionally references a Pages-Router-era `_document` shape that doesn't exist on disk.

### Never chain `npm run build` with `git commit` through a pipeline

```bash
# BAD — `tail`'s exit code masks the build failure
npm run build 2>&1 | tail -8 && git commit -m '...'

# GOOD — capture exit code explicitly
rm -rf .next && npm run build > /tmp/build.log 2>&1
echo "EXIT_CODE=$?"  # must be 0
tail -10 /tmp/build.log
git commit -m '...'
```

This rule comes from a real broken commit (`4fbd7ca`) that shipped a failing MDX file because the trailing `tail` returned 0.

### MDX content rules

See `docs/migration-rules.md` for the full HTML → MDX conversion table. Highlights:

- Frontmatter required: `title`, `description`
- Headings start at `#` (page title); use `##` for sections, `###` for subsections
- SVG diagrams from the original HTML may be inlined as-is in MDX
- Code blocks use fenced ` ```language ` syntax
- Domain-specific tag/box components (custom CSS in original HTML) are intentionally **dropped** — Nextra theme is used as-is for MVP

### Terminology

See `docs/glossary.md` for canonical Japanese terminology and the rule for when prose should keep English (code-literal counterparts) vs use Japanese (no code counterpart).

### Content improvement process

For any content cleanup touching more than ~5 files (terminology, accuracy, freshness, structural), follow the six-phase loop in `docs/improvement-loop.md` (Discover → Design → Plan → Implement → Verify → Merge). The loop applies equally to user-initiated work and the quarterly auto-refresh routine.

### Content coverage policy

`docs/content-coverage.md` defines the mechanical "what each page must contain" rules used during the quarterly audit. Update it when adding/removing a coverage rule, not in chat.

### Changelog

`CHANGELOG.md` is a **derived artifact** auto-generated from Conventional Commits via `git-cliff`. The single source of truth is the git log; the file exists only so readers don't have to run a tool to see what changed.

Operating rules:

- **Source of truth**: git log filtered to `content/**` (configured in `cliff.toml`).
- **Surfaced types**: `feat:` → Added, `fix:` → Fixed, `refactor:` / `perf:` → Changed. All other types (`docs:`, `test:`, `chore:`, `style:`, `ci:`, `build:`) are dropped — they are not user-facing.
- **When to regenerate**: any PR that adds a `feat(content)`, `fix(content)`, `refactor(content)`, or `perf(content)` commit must run `npm run changelog` and stage the updated `CHANGELOG.md` in the same PR. Do not hand-edit the file.
- **Mechanical enforcement**: `.github/workflows/changelog-staleness-check.yml` regenerates the changelog on every PR and fails the check if the committed file drifts from git-cliff's output. This catches forgotten `npm run changelog` invocations before merge.
- **Cutting a release**: when `[Unreleased]` has accumulated enough to bundle (typically aligned with the quarterly auto-refresh), tag the current `HEAD` with `git tag vYYYY-MM-DD` and re-run `npm run changelog` — the tag becomes a dated section header.
- **Merge-commit warnings** from `git-cliff` (`N commit(s) skipped`) are harmless and refer to PR merge commits, which carry no conventional type. Real PR content is captured via the underlying commits on the branch.

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

- Authentication / user accounts (Phase 2; will use Cloudflare Access at the edge — independent of Workers Static Assets, no code change required to enable)
- Server-side rendering / Server Actions
- Quiz / scoring features
- Comments / FAQ
- PDF generation
- Custom theming that diverges from Nextra defaults (until MVP is stable)
