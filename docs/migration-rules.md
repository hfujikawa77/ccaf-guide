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

SVG figures in the original HTML are inlined verbatim inside MDX. Wrap each with the `.diagram` div + `.dtitle` caption (CSS lives in `app/globals.css`). Convert HTML attributes to JSX form (camelCase: `viewBox`, `textAnchor`, `fontSize`, `strokeWidth`, `markerEnd`, etc.).

```mdx
<div className="diagram">
  <div className="dtitle">図1-1: 正しいエージェンティックループ制御フロー</div>
  <svg viewBox="0 0 680 320" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', maxWidth: '680px' }}>
    <rect x="250" y="10" width="180" height="44" rx="8" fill="var(--d1b)" stroke="var(--d1m)" strokeWidth="1.5"/>
    <text x="340" y="28" textAnchor="middle" fontSize="12" fontWeight="600" fill="var(--d1)">Claude APIリクエスト</text>
    ...
  </svg>
</div>
```

### Escape MDX-special characters in SVG `<text>`

MDX with GFM treats some characters specially even inside JSX children:

| Character | Trigger | Fix |
|---|---|---|
| `~/path` | If two `~` appear in the same diagram, GFM pairs them as strikethrough delimiters and `</text>` parsing fails | Wrap the path in `{'~/path'}` (JSX expression) |
| `{`, `}` | Treated as JSX expression delimiters | Wrap literal braces in `{'{example}'}` form |
| `<`, `>` | Treated as JSX tag delimiters | Use HTML entities `&lt;` / `&gt;` or wrap in `{'<x>'}` |

### `<defs>` markers must have unique `id`s

Because every MDX page renders into the same DOM tree on a multi-page site, two SVGs that both define `<marker id="arr">` will collide and one set of arrowheads will render incorrectly. Prefix every `<marker id="...">` with the figure's identifier (e.g. `id="d12arr"`, `id="d31arr"`). Update both the `<marker id>` and the corresponding `markerEnd="url(#...)"`.

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

### Run build separately from commit

**Do not** chain build with the commit step using `&&` after a pipeline:

```bash
# BAD — pipefail is off by default; tail's exit 0 masks the build failure
npm run build 2>&1 | tail -8 && git commit -m '...'
```

Instead:

```bash
# GOOD — run build to a log and check the actual exit code
rm -rf .next && npm run build > /tmp/build.log 2>&1
echo "EXIT_CODE=$?"  # must be 0 before committing
tail -10 /tmp/build.log
git commit -m '...'
```

Or simply: run `npm run build` on its own first, eyeball the result, then commit. This is the lesson from the broken `4fbd7ca` commit, which shipped a `<text>~/.claude/...</text>` pair that failed MDX compilation but slipped through because the build's failure exit code was swallowed by the trailing `tail` in the pipeline.
