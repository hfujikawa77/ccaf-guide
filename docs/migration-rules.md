# HTML → MDX migration rules

Mechanical rules for converting the original `cca_textbook_v3.html` content into Nextra v4 MDX pages. Apply consistently so future agents and humans produce identical output.

## File mapping

The original HTML is one long page; it splits into one MDX file per logical section.

| Source section in HTML | Target MDX | Slug |
|---|---|---|
| `#cover`, `#overview`, `#three-rules`, `#common-traps` | `content/index.mdx` | `/` |
| `#academy` | `content/academy.mdx` | `/academy` |
| `#scenarios` | `content/scenarios.mdx` | `/scenarios` |
| `#d1` and `#d1-*` subsections | `content/d1-agentic.mdx` | `/d1-agentic` |
| `#d2` and `#d2-*` subsections | `content/d2-tool-mcp.mdx` | `/d2-tool-mcp` |
| `#d3` and `#d3-*` subsections | `content/d3-claude-code.mdx` | `/d3-claude-code` |
| `#d4` and `#d4-*` subsections | `content/d4-prompt-eng.mdx` | `/d4-prompt-eng` |
| `#d5` and `#d5-*` subsections | `content/d5-context.mdx` | `/d5-context` |
| `#ex1`〜`#ex4` | `content/exercises.mdx` | `/exercises` |
| `#practice-exam` | `content/practice-exam.mdx` | `/practice-exam` |
| `#cheatsheet` | `content/cheatsheet.mdx` | `/cheatsheet` |
| `#antipatterns` | `content/antipatterns.mdx` | `/antipatterns` |
| (new) | `content/about.mdx` | `/about` |

## Frontmatter

Every MDX file starts with:

```yaml
---
title: <ページのタイトル>
description: <SEO 用 1 行説明・全角 60 文字以内>
---
```

Nextra picks up `title` and `description` for both the document `<head>` and the search index.

## Heading hierarchy

| HTML | MDX |
|---|---|
| `<h1>` (page title) | `#` (one per page; Nextra also derives the title from frontmatter) |
| `<h2>` (section) | `##` |
| `<h3>` (subsection) | `###` |
| `<h4>` (label/eyebrow) | `####` |

Each `##` becomes a TOC entry on the right rail. Use a flat structure: avoid going deeper than `###`.

## Tables

HTML `<table>` becomes GitHub-flavored Markdown tables. Multi-line cell content is allowed via `<br>` only when Markdown line breaks would not work. Prefer concise cells; offload long content to surrounding paragraphs.

```markdown
| 列1 | 列2 |
|-----|-----|
| 値  | 値  |
```

## Code blocks

Use fenced code blocks with a language tag. The original `<pre><code>` syntax-highlight markup (`<span class="kw">`, `<span class="str">`, etc.) is **dropped**; rely on Nextra's built-in Shiki highlighter.

````markdown
```ts
const x = 1;
```
````

## Boxes / callouts

The original HTML defined custom CSS classes (`.bk`, `.bt`, `.bw`, `.bi`). Replace each with the closest Nextra `Callout` component.

| Original class | Meaning | Nextra equivalent |
|---|---|---|
| `.bk` (yellow rule box) | "重要・原則" | `<Callout type="warning">` |
| `.bt` (green tip box) | "ヒント・推奨" | `<Callout type="info">` |
| `.bw` (red warning box) | "罠・anti-pattern" | `<Callout type="error">` |
| `.bi` (blue info box) | "補足・参考" | `<Callout type="default">` |

Import via:

```mdx
import { Callout } from 'nextra/components'
```

## Comparison panels (`.cmp` / `.cb` / `.cg`)

The original "❌ 悪い例 / ✅ 良い例" two-column blocks become a Markdown table or two adjacent Callouts. Prefer the table form unless visual separation is strongly desired.

```markdown
| ❌ 悪い例 | ✅ 良い例 |
|---|---|
| ... | ... |
```

## SVG diagrams

SVG figures in the original HTML are inlined verbatim inside MDX. Wrap each with a short caption above and a horizontal rule below for visual separation. Do not modify the SVG markup; do not extract to a separate file unless reuse is needed.

```mdx
**図1-1: 正しいアジェンティックループ制御フロー**

<svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg">
  ...
</svg>
```

## Tags / badges (`.tag d1`, `.v3new`, etc.)

Drop them. Domain affiliation can be expressed in headings or breadcrumbs; "v3 NEW / v3 修正" markers belong in `content/changelog.mdx` (future), not inline.

## Anchors / cross-links

Original `<a href="#d1-loop">` style intra-page links become `[テキスト](/d1-agentic#1-1-ループ設計)` cross-page links. Anchor IDs are auto-generated from headings (lowercase, spaces → `-`).

## Skip / drop list

These elements from the source HTML are **not** carried over:

- `.cover` gradient hero — replaced by Nextra's standard h1 + frontmatter
- `.cover-grid` numeric stats panel — moved into a regular table on the home page
- `.dh` domain header pill — replaced by the Nextra page title
- `.changelog` callout block — split into its own `content/changelog.mdx` (future)
- All inline `style=""` attributes — Nextra theme classes only
- `<div class="layout">`, `<nav class="sidebar">`, `<main class="main">` — provided by Nextra layout

## Verification per migrated page

After migrating each page:

1. `npm run typecheck` — must pass
2. `npm run build` — must pass with no new warnings (a `Failed to get the last modified timestamp` warning is fine for un-committed files)
3. Visit the page locally via `npm run dev` and confirm:
   - Title and description render
   - TOC populates from `##` headings
   - At least one Callout / table / code block renders correctly
   - No raw HTML class names leak into the rendered output

If any check fails, fix in the same commit; do not advance to the next page.
