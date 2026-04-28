# ccaf-guide

Unofficial study guide for the **Claude Certified Architect – Foundations (CCA-F)** exam.

> **Disclaimer** — This is an unofficial study guide. Not affiliated with or endorsed by Anthropic, PBC.
> 本サイトは Anthropic, PBC と関係のない非公式の学習ガイドです。

Live site: [ccaf.dev](https://ccaf.dev) *(deploys after Step 7)*

Recent changes: [`CHANGELOG.md`](./CHANGELOG.md) (auto-generated from Conventional Commits via `git-cliff`).

## Stack

- **Framework**: [Nextra](https://nextra.site) v4 — Next.js 15 App Router + MDX
- **Hosting**: Cloudflare Workers + Static Assets (`output: 'export'` → `out/` served via `wrangler.jsonc`)
- **Search**: FlexSearch (Nextra default; Japanese tokenizer planned for Step 5)
- **Analytics**: Cloudflare Web Analytics
- **Domain**: ccaf.dev (Cloudflare Registrar)

See [`docs/architecture.md`](./docs/architecture.md) for the full rationale.

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # tsc --noEmit
npm run build        # static export to out/
npm run preview      # serve out/ via npx serve
npm run preview:cf   # serve out/ via wrangler dev (Workers + Static Assets emulation)
npm run deploy       # wrangler deploy — manual deploy outside Workers Builds
npm run changelog    # regenerate CHANGELOG.md from Conventional Commits
```

## Project Layout

```
.
├── app/                       Next.js App Router entry (layout + catch-all MDX route)
├── content/                   MDX content (one file per page) + _meta.ts
├── docs/                      Engineering harness (architecture, migration rules)
├── mdx-components.tsx         Theme MDX components shim
├── next.config.mjs            Nextra wrapper + static export config
├── wrangler.jsonc             Workers + Static Assets deploy config
├── tsconfig.json              TypeScript config
├── package.json               Pinned dependencies
├── CLAUDE.md                  Project conventions for Claude Code
├── CHANGELOG.md               User-facing change log (auto-generated)
├── cliff.toml                 git-cliff config for CHANGELOG.md generation
├── README.md                  This file
├── LICENSE                    MIT (code)
└── LICENSE-CONTENT.md         CC BY 4.0 (educational content)
```

## Contributing

Project conventions live in [`CLAUDE.md`](./CLAUDE.md). Follow Conventional Commits and run `npm run typecheck` + `npm run build` before pushing.

## License

- **Code** — MIT, see [`LICENSE`](./LICENSE)
- **Content** — CC BY 4.0, see [`LICENSE-CONTENT.md`](./LICENSE-CONTENT.md)

References to "Claude," "Claude Code," "MCP," and the CCA-F exam are made under nominative fair use. All product names are trademarks of their respective owners.
