<!--
Issue-first workflow: every PR must reference an existing open issue.
The `Closes #` line below is required and is mechanically checked by
.github/workflows/issue-first-check.yml. See CLAUDE.md (Issue-first
workflow) and docs/phases/03-plan.md.
-->

Closes #

## Summary

<!-- 1–3 bullets: what this PR does and why. The "why" should already
     live in the linked issue; here, summarize for reviewer context. -->

## Verification

<!-- Phase 5 (Verify) outputs. For changes touching app/, content/, or
     next.config.mjs, paste typecheck + build exit codes. Otherwise, note
     which checks are not applicable. -->

- [ ] `npm run typecheck` exits 0
- [ ] `npm run build` exits 0 (if app/, content/, or next.config.mjs touched)
- [ ] `npm run changelog` regenerated (if a content/ feat/fix/refactor/perf was added)

## Test plan

<!-- Bulleted markdown checklist of what was tested or needs testing.
     If Verification gates above fully cover the change, write this
     section as: "None — Verification gates above are sufficient."
     See CLAUDE.md § Issue and PR body length. -->
