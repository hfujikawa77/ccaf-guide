# Phase 3 — Plan

*Break the work into a tracked, reviewable unit with explicit acceptance criteria.*

Open a tracking issue containing:
- **Background** — Discover summary, why this matters
- **Acceptance criteria** — every change as a checkbox, with `file:line` references
- **Spec link** — the relevant policy doc in `docs/`
- **Skipped items** — what was considered and intentionally not done (so future surveys don't re-propose them)

The issue is the historical record: future "why did we make this change?" questions are answered by reading the issue body, not by archaeology on commit messages.

**Acceptance criteria are negotiable.** The implementer (human or agent) may challenge any criterion in the issue thread before Phase 4 begins — propose a different scope, surface an implementation constraint the planner missed, or flag a criterion that conflicts with the spec. Update the issue with the resolution before proceeding. One-way criteria from planner to implementer is an anti-pattern; the negotiation is what catches planner errors before they propagate into Implement.

**Assumes:** the agent cannot self-track multi-step progress across a long-running task without an external checklist. As todo-tracking becomes native (cf. early Claude Code todo reminders that were removed in later models), the per-checkbox structure may simplify into a single goal statement plus a spec reference.
