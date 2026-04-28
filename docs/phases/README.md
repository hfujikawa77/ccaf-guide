# Content cleanup phases

How to improve `content/*.mdx` quality (terminology, accuracy, freshness, structure) without breaking what already works. Future agents and humans should follow this loop for any cleanup that touches more than ~5 files.

This is the harness's autonomous-improvement contract: the same process applies whether the work is user-initiated, triggered by the quarterly refresh routine, or surfaced by an external review.

The cardinal rule (issue-first) lives in [`CLAUDE.md` § Issue-first workflow](../../CLAUDE.md). Read that first; the phase docs below assume it.

## When to apply

- User-reported inconsistency that may extend beyond the reported example
- The quarterly content refresh (scheduled routine `trig_01ELFDs2Yigxq6BeAZwBphrh`, fires 26th Jan/Apr/Jul/Oct 09:00 JST)
- Anthropic / Claude product updates requiring terminology or content alignment
- Pre-release validation before adding a new exam-domain page

For trivial single-file fixes (typos, a missing comma), the per-phase effort scales down — Phase 1 (Discover) may be a single grep, Phase 2 (Design) may be skipped if no rule is implied — but **the issue + PR + `Closes #N` chain is non-negotiable** (see the cardinal rule in CLAUDE.md).

## File layout

Phase names map to standard SDLC vocabulary: **Discover → Design → Plan → Implement → Verify → Merge**. Each phase doc carries an `**Assumes:**` line documenting the agent-capability gap it currently fills — these are the crutches the harness encodes today, and they should be re-evaluated against the current model generation (see [`_review.md`](_review.md)).

Files in this directory follow the convention:

- `0X-*.md` are phase-specific docs, run in order: Discover → Design → Plan → Implement → Verify → Merge.
- `_*.md` are cross-cutting concerns, consulted at any phase.

## Phase index

1. [`01-discover.md`](01-discover.md) — read-only investigation of current state
2. [`02-design.md`](02-design.md) — translate findings into mechanical policy
3. [`03-plan.md`](03-plan.md) — break work into a tracked, reviewable unit
4. [`04-implement.md`](04-implement.md) — make changes, one logical unit per commit
5. [`05-verify.md`](05-verify.md) — run all mechanical checks; the merge gate
6. [`06-merge.md`](06-merge.md) — ship; close the planning loop

Cross-cutting:

- [`_anti-patterns.md`](_anti-patterns.md) — failure modes to avoid
- [`_review.md`](_review.md) — hand-off to the next agent + meta-review of the loop itself
