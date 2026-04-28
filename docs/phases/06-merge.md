# Phase 6 — Merge

*Ship the verified work; close the planning loop.*

PR description must include:
- `Closes #N` to auto-close the tracking issue
- Per-commit summary
- Verification log: typecheck + build exit codes from Phase 5

After merge, confirm the Cloudflare auto-deploy succeeded and the tracking issue closed correctly.

**Assumes:** the agent does not autonomously merge to `main`; merge is a human-in-the-loop checkpoint by design (see global git guidelines in `CLAUDE.md`). When agent autonomy is extended, this phase may absorb automated post-merge checks (smoke test, deploy verification) but the human gate stays.
