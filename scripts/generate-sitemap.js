/**
 * The only source of public/sitemap.xml. Every <lastmod> is the date the content changed – never the build date:
 * posts use modifiedAt (or date), static pages the `updated` date in src/data/site.js, the home page and /blog
 * the newer of their own date and the newest post (both list the latest posts).
 * Run: node scripts/generate-sitemap.js  (automatically called by `npm run build` and by the blog bot)
 */
import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { SITE_URL, STATIC_PAGES } from '../src/data/site.js'
import { allPostMeta } from './generate-blog-index.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const posts = allPostMeta()
const newestPost = posts.map((p) => p.modifiedAt).sort().reverse()[0] ?? '1970-01-01'
const later = (a, b) => (a > b ? a : b)

const entries = []
for (const page of STATIC_PAGES) {
  const lastmod = page.path === '/' || page.path === '/blog' ? later(page.updated, newestPost) : page.updated
  entries.push({ loc: `${SITE_URL}${page.path === '/' ? '/' : page.path}`, lastmod, changefreq: page.changefreq, priority: page.priority })
}
for (const post of posts) {
  entries.push({ loc: `${SITE_URL}/blog/${post.slug}`, lastmod: post.modifiedAt, changefreq: 'monthly', priority: '0.7' })
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (e) => `  <url>
    <loc>${e.loc}</loc>
    <lastmod>${e.lastmod}</lastmod>
    <changefreq>${e.changefreq}</changefreq>
    <priority>${e.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`
writeFileSync(resolve(__dirname, '../public/sitemap.xml'), xml, 'utf-8')
console.log(`✅ public/sitemap.xml – ${STATIC_PAGES.length} static pages + ${posts.length} blog posts`)
