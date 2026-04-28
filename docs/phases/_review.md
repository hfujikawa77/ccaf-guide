# Hand-off and meta-review

## Hand-off to the next agent

The next agent landing on `content/*.mdx` (whether human or scheduled refresh) should be able to:
1. Read this directory's `README.md` + the relevant policy doc(s) in `docs/` and know the rules
2. Run the [Phase 1 (Discover)](01-discover.md) pattern with no further instruction
3. Find the previous tracking issues via `gh issue list --state all --label content` (when labels are introduced) or by searching the closed-issue history

If you discover a step is unclear or a rule is missing, **update the relevant phase doc as part of your PR**. The loop improves itself.

## Reviewing the loop itself

Every `Assumes:` line in the phase docs encodes a current model-capability gap — a crutch the harness adds because the agent of the day cannot do that thing reliably on its own. Crutches go stale as models improve.

The quarterly auto-refresh routine should, before starting content work, spend ~30 minutes auditing those assumptions against the current model generation. For each phase, ask: *is this still load-bearing?* Drop crutches that aren't (a fix commit removing the assumption is itself a valid cleanup), keep the ones that are. This is the harness's anti-fragility hook — without it, the loop accumulates dead weight indefinitely.
