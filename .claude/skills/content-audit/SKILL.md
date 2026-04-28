---
name: content-audit
description: Quarterly content audit for ccaf-guide — surface terminology drift, freshness gaps, and coverage misses in content/, then plan fixes via the six-phase loop in docs/phases/. Manual trigger only.
disable-model-invocation: true
---

# /content-audit

Run the quarterly content cleanup using the six-phase loop in
@docs/phases/README.md. This is a side-effect-bearing workflow (opens
GitHub issues, drafts plans, writes an audit log), so it's manual-only via
`disable-model-invocation: true`. The triggering keywords in `description`
are forward-compat — if `disable-model-invocation` is later removed, they
give the router something to match.

## Step 0 — meta-review of the loop itself

Before any content work, read @docs/phases/_review.md and audit the
`Assumes:` lines in `docs/phases/0X-*.md` against the current model
generation. For each phase, ask: *is this still load-bearing?*

If a crutch is no longer needed, propose dropping it as a separate Phase 2
design issue (open it before starting the actual audit). Do **not** bundle
a loop-doc cleanup with content cleanup in the same PR — they have
different review surfaces.

## Step 1 — interview the user

Use `AskUserQuestion` with the 3 questions defined in
@.claude/skills/content-audit/templates/interview.md. The interview
establishes scope, time anchor, and known concerns. Do NOT compress the
3 questions into one combined prompt; the structure is the interview
pattern's value.

Reference prior audits in `docs/audits/` (if any) when constructing Q2's
"since last audit" option — read the most recent file's date header.

## Step 2 — enter Plan Mode and run Discover

Once scope is set, enter Plan Mode (read-only). Read
@docs/phases/01-discover.md and run grep sweeps for the chosen scope.
Large grep sweeps are delegated to the `discover-sweep` sub-agent
(see `.claude/agents/discover-sweep.md`).

Report findings as a table per surfaced problem class:
`file:line | variant | count | surprises`.

## Step 3 — draft plans for each problem class

For each distinct problem class, draft an issue body using the template at
@.claude/skills/content-audit/templates/plan.md. The template enforces a
mandatory "Out of scope" section so scope drift surfaces as a plan diff.

Reference recently closed issues for body-style examples:

```bash
gh issue list --repo yokoto/ccaf-guide --state closed --limit 5 \
  --json title,body --jq '.[] | "## \(.title)\n\n\(.body)"'
```

## Step 4 — review plans with the user

Present all draft plans to the user. The user can:
- Edit any plan inline
- Drop plans that are out of scope
- Reorder priority

Do NOT open issues yet. The plan-mode review IS the gate. After approval,
exit Plan Mode and `gh issue create` per approved plan.

## Step 5 — write the audit log

Write a summary to `docs/audits/YYYY-QN.md` (e.g., `2026-Q2.md`)
containing:
- Date, focus dimensions chosen (Q1), time anchor (Q2), known concerns (Q3)
- Findings table (file:line counts per problem class)
- Issues opened (with `#N` references)
- Surprises that didn't fit any planned focus dimension

The audit log is the input to the *next* quarterly run's "since last
audit" option. Commit it on its own branch in a follow-up PR (it's
spec-doc churn, separate from content fixes).

## Step 6 — stop

The implementation loop (Phases 4–6 of @docs/phases/) runs per-issue with
explicit user confirmation, following the standard branch → commit →
verify → PR workflow. The Skill does **not** auto-execute Implement.
