# Plan template (issue body skeleton)

Use this skeleton to draft each issue surfaced by the audit. Each `##`
heading maps to a section that must be present. The "Out of scope"
section is mandatory — it is how scope drift becomes visible as a diff in
subsequent issues.

---

## Background

[1–3 paragraphs: what Discover found (`file:line` counts), why this
matters, what triggered the audit (link to the relevant
`docs/audits/YYYY-QN.md` if applicable).]

## Decisions

- [Bullet: a choice made about scope, naming, approach. Each bullet is
  reviewable independently.]
- [Bullet: include rejected alternatives so future surveys do not
  re-propose them.]

## Acceptance criteria

- [ ] [Concrete, mechanically-checkable change with `file:line` reference]
- [ ] [Verification gate: typecheck / build / grep pattern that confirms
      the change landed]

## Out of scope

[Mandatory section. Explicit list of things considered during planning
and intentionally excluded from this issue. Scope drift becomes visible
as a diff when later issues silently re-include items listed here.]

## Skipped items

[Items considered during Plan and dropped, with one-line reasons.
Distinct from "Out of scope": skipped items were considered as part of
*this* problem class; out-of-scope items belong to other problem classes
the audit found.]
