# Phase 1 — Discover

*Read-only investigation of current state, before any change is proposed.*

Survey the actual state across all content files **before proposing changes**. Use `grep -rn` (not full-file reads) to keep the survey cheap. Large grep sweeps are delegated to the `discover-sweep` sub-agent (see `.claude/agents/discover-sweep.md`).

For each suspected issue, report:
- Files + line numbers
- Total occurrence count per variant
- **Surprises** — variants the proposal didn't anticipate, or proposed targets that don't exist

Discover's job is to **prove or disprove the assumed problem** before any code changes. In the 2026-04 terminology cleanup, this phase collapsed 17 hypothesized inconsistencies down to 1 real one — and surfaced a different problem (English-form prose terms) the original proposal missed.

**Assumes:** the agent cannot reliably summarize a multi-file `grep` sweep without dropping low-frequency variants, and a planner working from chat-only context will under-count surprises. As context-handling and structured-output reliability improve, this phase may collapse into a single planner call.
