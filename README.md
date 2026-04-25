# ccaf-guide

Unofficial CCA-F (Claude Certified Architect – Foundations) study guide.

> **Disclaimer**: This is an unofficial study guide. Not affiliated with or endorsed by Anthropic, PBC.
> 本サイトは Anthropic, PBC と関係のない非公式の学習ガイドです。

## Stack

- Framework: [Nextra](https://nextra.site) v4 (Next.js 15 App Router + MDX)
- Hosting: Cloudflare Pages
- Search: FlexSearch (built-in, Japanese tokenizer enabled)
- Domain: [ccaf.dev](https://ccaf.dev)

## Development

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # static export to out/
npm run preview      # serve out/ locally
npm run preview:cf   # serve via Cloudflare wrangler
npm run typecheck    # tsc --noEmit
```

## Project Layout

```
ccaf_guide/
├── app/                    # Next.js App Router
├── content/                # MDX content
├── docs/                   # Engineering harness docs
├── public/                 # Static assets
├── CLAUDE.md               # Project conventions
├── next.config.mjs
└── package.json
```

## License

Content: Original analysis of publicly available exam guidelines.
Code: MIT
