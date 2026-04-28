# Interview template for /content-audit

The Skill body invokes `AskUserQuestion` with these 3 questions in order.
Do not collapse them into one combined prompt — the structure is the
interview pattern's value.

## Q1 — Focus dimensions (multi-select)

**Question:** What focus dimensions for this audit? (Multi-select.)

**Options:**

- `Terminology drift` — `docs/glossary.md` violations, mixed Japanese/English variants
- `Content freshness` — upstream doc changes (Anthropic / Cloudflare / OpenAI / etc.) not yet reflected; MDX files untouched for ≥6 months
- `Coverage rules` — `docs/content-coverage.md` greps that no longer match what they should
- `Structural integrity` — heading hierarchy, sidebar order, anchor link rot
- `Other` (free text follow-up)

**Intent:** Multi-select keeps the enum as a spec; `Other` is the escape
hatch. If `Other` is chosen ≥30% of the time across audits (visible by
reading the `docs/audits/` history), the enum is wrong — flag as a Phase
2 design issue.

## Q2 — Time anchor (single-select)

**Question:** What is the audit's starting point?

**Options:**

- `Since last audit` — read `docs/audits/` most-recent file; only flag
  issues that arose after that date
- `Triggered by upstream event` — free text follow-up for the event name
  (e.g., "Anthropic Claude 5 release", "Cloudflare Workers Builds spec
  change"); audit scope is content potentially affected by that event
- `Whole-repo rebaseline` — ignore prior audits, sweep everything

**Intent:** Q1 scope changes *what* to look at; Q2 scope changes *how
much*. Most quarterly runs should pick `Since last audit` — rebaselines
are expensive and rarely justified.

## Q3 — Known concerns (free text, optional)

**Question:** Any specific hypothesis, concern, or area you want
explicitly checked? (Skip if none.)

**Intent:** This is the inquiry-step of the interview pattern, beyond
enum scoping. Use it to surface user knowledge the agent doesn't have
(e.g., "I think section X is now stale because Y") that should bias the
Discover sweeps. Empty answer is acceptable.
