# Content improvement loop

How to improve `content/*.mdx` quality (terminology, accuracy, freshness, structure) without breaking what already works. Future agents and humans should follow this loop for any cleanup that touches more than ~5 files.

This is the harness's autonomous-improvement contract: the same process applies whether the work is user-initiated, triggered by the quarterly refresh routine, or surfaced by an external review.

## When to apply

- User-reported inconsistency that may extend beyond the reported example
- The quarterly content refresh (scheduled routine `trig_01ELFDs2Yigxq6BeAZwBphrh`, fires 26th Jan/Apr/Jul/Oct 09:00 JST)
- Anthropic / Claude product updates requiring terminology or content alignment
- Pre-release validation before adding a new exam-domain page

For trivial single-file fixes (typos, a missing comma), skip this loop and just edit + commit.

## The six-phase loop

Phase names map to standard SDLC vocabulary: **Discover → Design → Plan → Implement → Verify → Merge**. Each phase carries an `Assumes:` line that documents the agent-capability gap it currently fills — these are the crutches the harness encodes today, and they should be re-evaluated against the current model generation (see [Reviewing the loop itself](#reviewing-the-loop-itself) at the bottom).

### Phase 1 — Discover

*Read-only investigation of current state, before any change is proposed.*

Survey the actual state across all content files **before proposing changes**. Use `grep -rn` (not full-file reads) to keep the survey cheap. Delegate large grep sweeps to a subagent so the main context stays clean.

For each suspected issue, report:
- Files + line numbers
- Total occurrence count per variant
- **Surprises** — variants the proposal didn't anticipate, or proposed targets that don't exist

Discover's job is to **prove or disprove the assumed problem** before any code changes. In the 2026-04 terminology cleanup, this phase collapsed 17 hypothesized inconsistencies down to 1 real one — and surfaced a different problem (English-form prose terms) the original proposal missed.

**Assumes:** the agent cannot reliably summarize a multi-file `grep` sweep without dropping low-frequency variants, and a planner working from chat-only context will under-count surprises. As context-handling and structured-output reliability improve, this phase may collapse into a single planner call.

### Phase 2 — Design

*Translate Discover findings into a written, mechanical policy in `docs/`.*

The policy must be:
- **Mechanical** — a future reader applies it without re-deriving rationale
- **Versioned** — lives in git, not chat
- **Verifiable** — each rule maps to a grep pattern or build check

Existing policy docs in `docs/`:
- `docs/glossary.md` — terminology
- `docs/migration-rules.md` — HTML → MDX
- `docs/architecture.md` — stack and rationale

When adding a new policy doc, register a 1-line pointer from `CLAUDE.md` under `## Conventions` so it's loaded on every future session.

**Assumes:** the agent will drift from undocumented conventions across sessions; chat-resident rules don't survive context resets. A long-context, memory-equipped agent might reduce — but not eliminate — the need for explicit `docs/` policy.

### Phase 3 — Plan

*Break the work into a tracked, reviewable unit with explicit acceptance criteria.*

Open a tracking issue containing:
- **Background** — Discover summary, why this matters
- **Acceptance criteria** — every change as a checkbox, with `file:line` references
- **Spec link** — the relevant policy doc in `docs/`
- **Skipped items** — what was considered and intentionally not done (so future surveys don't re-propose them)

The issue is the historical record: future "why did we make this change?" questions are answered by reading the issue body, not by archaeology on commit messages.

**Acceptance criteria are negotiable.** The implementer (human or agent) may challenge any criterion in the issue thread before Phase 4 begins — propose a different scope, surface an implementation constraint the planner missed, or flag a criterion that conflicts with the spec. Update the issue with the resolution before proceeding. One-way criteria from planner to implementer is an anti-pattern; the negotiation is what catches planner errors before they propagate into Implement.

**Assumes:** the agent cannot self-track multi-step progress across a long-running task without an external checklist. As todo-tracking becomes native (cf. early Claude Code todo reminders that were removed in later models), the per-checkbox structure may simplify into a single goal statement plus a spec reference.

### Phase 4 — Implement

*Make the changes, one logical unit per commit.*

- Branch: `chore/<topic>` or `fix/<topic>` — never edit `main` directly
- One commit per logical unit (per Phase / per Category)
- Commit messages explain the **why**, not the **what** — the diff shows the what
- For multi-commit cleanups under a single reviewer, prefer one PR with atomic commits over multiple PRs (single review cycle, per-commit revert still possible)

**Assumes:** the agent benefits from forced commit boundaries to avoid mixing unrelated changes in a single diff. A planner-disciplined agent that already produces atomic diffs would not need this rule explicitly.

### Phase 5 — Verify

*Run all mechanical checks; the gate that decides whether the work is mergeable.*

Before opening the PR (this gate is non-negotiable for changes touching `app/`, `content/`, or `next.config.mjs`):

```bash
rm -rf .next out node_modules/.cache
npm run typecheck > /tmp/tc.log 2>&1; echo "TC=$?"
npm run build > /tmp/build.log 2>&1; echo "BUILD=$?"
```

Both must exit 0. **Never chain `npm run build` with `git commit` through a pipeline** — `tail`'s exit code masks the build failure (see `CLAUDE.md` for the broken-commit precedent).

When future content-policy lints exist (e.g. `scripts/verify-content-policy.sh` mechanically enforcing rules from `docs/glossary.md` and `docs/migration-rules.md`), they belong in this phase alongside typecheck/build.

**Iteration policy on failure.** Verify is an evaluator, not a wall. If a check fails:
- **Iteration 1** — implementer reads the failure, fixes, re-runs Phase 5. Add a fix commit; do not amend.
- **Iteration 2** — same as iteration 1, with one explicit pause to ask whether the original Phase 3 acceptance criteria need revision.
- **After iteration 2** — escalate to human review with: the failure log, what was tried, and a hypothesis for why the spec or implementation is wrong. Do not loop indefinitely; repeated failures usually indicate a bad spec, not a bad implementation.

**Assumes:** the agent cannot reliably self-detect breakage from its own diffs without an external mechanical check, and will rationalize away legitimate failures if asked to self-evaluate. As models internalize build-correctness and grow more skeptical of their own output, this phase may shrink to a single confirmation step.

### Phase 6 — Merge

*Ship the verified work; close the planning loop.*

PR description must include:
- `Closes #N` to auto-close the tracking issue
- Per-commit summary
- Verification log: typecheck + build exit codes from Phase 5

After merge, confirm the Cloudflare auto-deploy succeeded and the tracking issue closed correctly.

**Assumes:** the agent does not autonomously merge to `main`; merge is a human-in-the-loop checkpoint by design (see global git guidelines in `CLAUDE.md`). When agent autonomy is extended, this phase may absorb automated post-merge checks (smoke test, deploy verification) but the human gate stays.

## Anti-patterns

| Anti-pattern | What goes wrong |
|---|---|
| **Skipping Discover** | Editing based on the single reported symptom. The user reports the symptom; Discover finds the disease. |
| **Editing without a Design** | Making consistent-feeling changes without a `docs/` policy. The next agent will undo them when they hit a different example. |
| **One-way acceptance criteria** | Implementer can't push back on a flawed Plan. Planner errors propagate into Implement. Use the negotiation step in Phase 3. |
| **Multiple PRs per cleanup with one reviewer** | Adds review cycles without benefit. Use atomic commits inside one PR instead. |
| **Spec and content edits in the same commit** | The spec must land first (or as the first commit on the branch) so subsequent commits can be reviewed against it. |
| **Closing the issue without Verify** | The PR must show typecheck + build exit codes. Without them, the next refresh will discover the regression. |
| **Indefinite Verify retries** | Looping past iteration 2 wastes time and usually means the spec is wrong, not the implementation. Escalate. |
| **Quietly expanding scope** | If Discover surfaces an unrelated problem, open a separate issue. Don't bundle. |

## Hand-off to the next agent

The next agent landing on `content/*.mdx` (whether human or scheduled refresh) should be able to:
1. Read this file + the relevant policy doc(s) in `docs/` and know the rules
2. Run the Phase 1 (Discover) pattern with no further instruction
3. Find the previous tracking issues via `gh issue list --state all --label content` (when labels are introduced) or by searching the closed-issue history

If you discover a step is unclear or a rule is missing, **update this doc as part of your PR**. The loop improves itself.

## Reviewing the loop itself

Every `Assumes:` line in this doc encodes a current model-capability gap — a crutch the harness adds because the agent of the day cannot do that thing reliably on its own. Crutches go stale as models improve.

The quarterly auto-refresh routine should, before starting content work, spend ~30 minutes auditing those assumptions against the current model generation. For each phase, ask: *is this still load-bearing?* Drop crutches that aren't (a fix commit removing the assumption is itself a valid cleanup), keep the ones that are. This is the harness's anti-fragility hook — without it, the loop accumulates dead weight indefinitely.
