# Phase 4 — Implement

*Make the changes, one logical unit per commit.*

- Branch: `chore/<topic>` or `fix/<topic>` — never edit `main` directly
- One commit per logical unit (per Phase / per Category)
- Commit messages explain the **why**, not the **what** — the diff shows the what
- For multi-commit cleanups under a single reviewer, prefer one PR with atomic commits over multiple PRs (single review cycle, per-commit revert still possible)

**Assumes:** the agent benefits from forced commit boundaries to avoid mixing unrelated changes in a single diff. A planner-disciplined agent that already produces atomic diffs would not need this rule explicitly.
