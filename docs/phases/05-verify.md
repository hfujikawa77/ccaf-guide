# Phase 5 — Verify

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
