# Content coverage policy

What each `content/*.mdx` page must contain to be considered complete. Use this as the audit checklist during the quarterly refresh routine and before adding/removing any domain page.

This policy was created during the 2026-04 enrichment cleanup, after auditing the gaps surfaced by an external comparison against `paullarionov/claude-certified-architect/guide_ja.md`. The audit collapsed the original five proposed gaps down to four real ones; the resolved gap (structured-error JSON) is recorded in "Skipped items" below so future audits don't re-propose it.

## Coverage rules

Each rule maps to a grep pattern that an audit can run against the listed file. A page satisfies the rule when **at least one** match exists.

| ID | Rule | Where | Grep pattern |
|---|---|---|---|
| C-1 | A "Foundation" entry point page exists for readers without 6-month production experience, covering Claude API basics, `tool_use` syntax-vs-semantic distinction, and context-window primer | `content/foundation.mdx` | `grep -l "Foundation" content/_meta.ts` and file presence |
| C-2 | D4 contains **at least 5 concrete few-shot pattern examples** (not just a category table) — ambiguous-scenario, output-format, code accept/reject, document-structure extraction, informal-measurement | `content/d4-prompt-eng.mdx` | `grep -cE '###?.*Few-shot|パターン [1-5]' content/d4-prompt-eng.mdx` ≥ 5 |
| C-3 | D5.2 escalation enumerates **4 escalation timings** (即時 / 解決試行後 / 段階的 / ポリシーギャップ) with at least one structured-handoff JSON skeleton | `content/d5-context.mdx` | `grep -cE '即時\|解決試行後\|段階的\|ポリシーギャップ' content/d5-context.mdx` ≥ 4 |
| C-4 | D4.5 Batch API includes **at least one numeric SLA-window calculation example** (e.g. "30h needed − 24h batch = 6h submission window") | `content/d4-prompt-eng.mdx` | `grep -E '送信ウィンドウ\|SLA.*計算\|24 時間' content/d4-prompt-eng.mdx` |

## Out of scope (deliberately not enforced)

These were considered during the 2026-04 audit and **intentionally left as-is**. Future audits should not re-propose them.

| Item | Why skipped |
|---|---|
| A complete structured-error JSON example in domain pages | Already covered: `errorCategory`/`isRetryable` schema in D2.2, full TypeScript ErrorResult in `exercises.mdx` (演習 1, 演習 4), summary in `cheatsheet.mdx`. Adding another redundant JSON would duplicate without clarifying. |
| 76-question practice exam matching paullarionov volume | The site's `practice-exam.mdx` deliberately points to the official Skilljar Practice Exam rather than reimplementing it. The Top-10 traps in `index.mdx` plus the 4 exercises serve as ccaf-guide's question-style coverage. |
| Per-domain "exam notes" section separate from the domain pages | Redundant with the existing 5 domain pages — the domain pages already serve this purpose. Splitting would create two-locations-for-one-fact maintenance burden. |
| Translating paullarionov content under CC BY 4.0 | License compatibility exists, but mass-import would dilute ccaf-guide's value (terse exam-prep) into encyclopedic territory. Reference-link only. |

## Adding a new coverage rule

Each rule must be:

1. **Mechanical** — derivable from a grep pattern or file-existence check, no judgment call
2. **Tied to a specific exam-domain claim** — not a stylistic preference
3. **Audited by the quarterly refresh** — if a rule can't be checked in <5 minutes via grep, it doesn't belong here

When you add a rule, also add the corresponding grep command to the audit log in `docs/architecture.md` so the next refresh runs it automatically.

## See also

- `docs/improvement-loop.md` — the six-phase content cleanup loop this policy plugs into
- `docs/glossary.md` — terminology that all content must follow
- `docs/migration-rules.md` — HTML → MDX conversion rules
