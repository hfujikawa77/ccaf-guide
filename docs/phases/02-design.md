# Phase 2 — Design

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
