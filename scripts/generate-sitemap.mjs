// scripts/generate-sitemap.mjs
// Uruchamiany przed każdym buildem: generuje public/sitemap.xml
// na podstawie faktycznych plików w src/blog/*.jsx

import { readFileSync, readdirSync, writeFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const DOMAIN = 'https://autodoslubuwarszawa.pl'
const TODAY = new Date().toISOString().split('T')[0]

// ── Statyczne strony ─────────────────────────────────────────────────────────
const staticPages = [
  { path: '/',                          priority: '1.0', changefreq: 'monthly', lastmod: TODAY },
  { path: '/auto-do-slubu-radom',       priority: '0.9', changefreq: 'monthly', lastmod: TODAY },
  { path: '/auto-do-slubu-warszawa',    priority: '0.9', changefreq: 'monthly', lastmod: TODAY },
  { path: '/auto-do-slubu-mazowieckie', priority: '0.8', changefreq: 'monthly', lastmod: TODAY },
  { path: '/kontakt',                   priority: '0.7', changefreq: 'yearly',  lastmod: TODAY },
  { path: '/blog',                      priority: '0.7', changefreq: 'weekly',  lastmod: TODAY },
]

// ── Dynamiczne wpisy bloga ────────────────────────────────────────────────────
const blogDir = join(ROOT, 'src', 'blog')
const blogFiles = readdirSync(blogDir)
  .filter(f => f.endsWith('.jsx'))
  .sort()

const blogPages = []
for (const file of blogFiles) {
  const text = readFileSync(join(blogDir, file), 'utf-8')
  const slugMatch = text.match(/export\s+const\s+slug\s*=\s*['"]([^'"]+)['"]/)
  const dateMatch = text.match(/export\s+const\s+date\s*=\s*['"]([^'"]+)['"]/)
  if (slugMatch) {
    blogPages.push({
      path: `/blog/${slugMatch[1]}`,
      priority: '0.6',
      changefreq: 'yearly',
      lastmod: dateMatch ? dateMatch[1] : TODAY,
    })
  }
}

// ── Budowanie XML ─────────────────────────────────────────────────────────────
const toUrl = ({ path, priority, changefreq, lastmod }) => `  <url>
    <loc>${DOMAIN}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">

${[...staticPages, ...blogPages].map(toUrl).join('\n\n')}

</urlset>
`

const outPath = join(ROOT, 'public', 'sitemap.xml')
writeFileSync(outPath, xml, 'utf-8')
console.log(`✅ sitemap.xml generated — ${staticPages.length} static + ${blogPages.length} blog URLs`)
