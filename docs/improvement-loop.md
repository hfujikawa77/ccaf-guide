# Content improvement loop

How to improve `content/*.mdx` quality (terminology, accuracy, freshness, structure) without breaking what already works. Future agents and humans should follow this loop for any cleanup that touches more than ~5 files.

This is the harness's autonomous-improvement contract: the same process applies whether the work is user-initiated, triggered by the quarterly refresh routine, or surfaced by an external review.

## When to apply

- User-reported inconsistency that may extend beyond the reported example
- The quarterly content refresh (scheduled routine `trig_01ELFDs2Yigxq6BeAZwBphrh`, fires 26th Jan/Apr/Jul/Oct 09:00 JST)
- Anthropic / Claude product updates requiring terminology or content alignment
- Pre-release validation before adding a new exam-domain page

For trivial single-file fixes (typos, a missing comma), skip this loop and just edit + commit.

## The five-phase loop

### Phase 1 — Audit (read-only)

Survey the actual state across all content files **before proposing changes**. Use `grep -rn` (not full-file reads) to keep the audit cheap. Delegate large grep sweeps to a subagent so the main context stays clean.

For each suspected issue, report:
- Files + line numbers
- Total occurrence count per variant
- **Surprises** — variants the proposal didn't anticipate, or proposed targets that don't exist

The audit's job is to **prove or disprove the assumed problem** before any code changes. In the 2026-04 terminology cleanup, the audit collapsed 17 hypothesized inconsistencies down to 1 real one — and surfaced a different problem (English-form prose terms) the original proposal missed.

### Phase 2 — Specify (decide once, codify in `docs/`)

Convert audit findings into a written policy in `docs/`. The policy must be:
- **Mechanical** — a future reader applies it without re-deriving rationale
- **Versioned** — lives in git, not chat
- **Verifiable** — each rule maps to a grep pattern or build check

Existing policy docs in `docs/`:
- `docs/migration-rules.md` — HTML → MDX
- `docs/architecture.md` — stack and rationale

When adding a new policy doc, register a 1-line pointer from `CLAUDE.md` under `## Conventions` so it's loaded on every future session.

### Phase 3 — Track (one issue per cleanup)

Open a tracking issue containing:
- **Background** — audit summary, why this matters
- **Acceptance criteria** — every change as a checkbox, with `file:line` references
- **Spec link** — the relevant policy doc in `docs/`
- **Skipped items** — what was considered and intentionally not done (so future audits don't re-propose them)

The issue is the historical record: future "why did we make this change?" questions are answered by reading the issue body, not by archaeology on commit messages.

### Phase 4 — Implement (atomic commits on a feature branch)

- Branch: `chore/<topic>` or `fix/<topic>` — never edit `main` directly
- One commit per logical unit (per Phase / per Category)
- Commit messages explain the **why**, not the **what** — the diff shows the what
- For multi-commit cleanups under a single reviewer, prefer one PR with atomic commits over multiple PRs (single review cycle, per-commit revert still possible)

### Phase 5 — Verify and land

Before opening the PR (this gate is non-negotiable for changes touching `app/`, `content/`, or `next.config.mjs`):

```bash
rm -rf .next out node_modules/.cache
npm run typecheck > /tmp/tc.log 2>&1; echo "TC=$?"
npm run build > /tmp/build.log 2>&1; echo "BUILD=$?"
```

Both must exit 0. **Never chain `npm run build` with `git commit` through a pipeline** — `tail`'s exit code masks the build failure (see `CLAUDE.md` for the broken-commit precedent).

PR description must include:
- `Closes #N` to auto-close the tracking issue
- Per-commit summary
- Verification log: typecheck + build exit codes

## Anti-patterns

| Anti-pattern | What goes wrong |
|---|---|
| **Skipping the audit** | Editing based on the single reported symptom. The user reports the symptom; the audit finds the disease. |
| **Editing without a spec** | Making consistent-feeling changes without a `docs/` policy. The next agent will undo them when they hit a different example. |
| **Multiple PRs per cleanup with one reviewer** | Adds review cycles without benefit. Use atomic commits inside one PR instead. |
| **Spec and content edits in the same commit** | The spec must land first (or as the first commit on the branch) so subsequent commits can be reviewed against it. |
| **Closing the issue without verification** | The PR must show typecheck + build exit codes. Without them, the next refresh will discover the regression. |
| **Quietly expanding scope** | If the audit surfaces an unrelated problem, open a separate issue. Don't bundle. |

## Hand-off to the next agent

The next agent landing on `content/*.mdx` (whether human or scheduled refresh) should be able to:
1. Read this file + the relevant policy doc(s) in `docs/` and know the rules
2. Run the Phase 1 audit pattern with no further instruction
3. Find the previous tracking issues via `gh issue list --state all --label content` (when labels are introduced) or by searching the closed-issue history

If you discover a step is unclear or a rule is missing, **update this doc as part of your PR**. The loop improves itself.
