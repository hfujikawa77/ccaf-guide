// Generates public/sitemap.xml and public/robots.txt from the content/
// directory at build time. Runs from package.json's `prebuild` hook so
// the next build picks up the latest content layout.
//
// Why this lives here instead of as `app/sitemap.ts` / `app/robots.ts`:
// adding either of those metadata files to a Nextra v4 + Next.js 15
// project triggered `Error [PageNotFoundError]: Cannot find module for
// page: /_document` during `Collecting page data`. Generating into
// public/ sidesteps that conflict and ships the same end result.

import { readdirSync, mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const contentDir = join(root, 'content')
const publicDir = join(root, 'public')

const SITE_URL = 'https://ccaf.dev'

mkdirSync(publicDir, { recursive: true })

const slugs = readdirSync(contentDir, { withFileTypes: true })
  .filter(e => e.isFile() && e.name.endsWith('.mdx'))
  .map(e => e.name.replace(/\.mdx$/, ''))

const lastmod = new Date().toISOString().split('T')[0]

const urls = slugs
  .map(slug => {
    const isHome = slug === 'index'
    const loc = isHome ? `${SITE_URL}/` : `${SITE_URL}/${slug}/`
    const priority = isHome ? '1.0' : slug.startsWith('d') ? '0.9' : '0.7'
    const changefreq = isHome ? 'weekly' : 'monthly'
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  })
  .join('\n')

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
Host: ${SITE_URL}
`

writeFileSync(join(publicDir, 'sitemap.xml'), sitemap)
writeFileSync(join(publicDir, 'robots.txt'), robots)

console.log(`[generate-seo] wrote sitemap.xml (${slugs.length} urls) and robots.txt`)
