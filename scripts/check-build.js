/**
 * Verifies the production build the way a crawler sees it (CI and the blog bot run it after `npm run build`):
 *   - every sitemap URL has a prerendered dist/<path>/index.html with real content, one canonical equal to the
 *     sitemap URL, a title, a description and JSON-LD;
 *   - no prerendered page links to a path that is neither a page nor a redirect;
 *   - dist/404.html exists and is noindex.
 * Run: node scripts/check-build.js
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'fs'
import { resolve, dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { SITE_URL } from '../src/data/site.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const dist = resolve(root, 'dist')
const errors = []

const sitemap = readFileSync(resolve(root, 'public/sitemap.xml'), 'utf-8')
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (urls.length < 10) errors.push(`sitemap has only ${urls.length} URLs`)

const vercel = JSON.parse(readFileSync(resolve(root, 'vercel.json'), 'utf-8'))
const redirectSources = new Set((vercel.redirects ?? []).filter((r) => !r.has).map((r) => r.source))
const pagePaths = new Set(urls.map((u) => u.replace(SITE_URL, '') || '/'))

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const file = join(dir, name)
    if (statSync(file).isDirectory()) out.push(...walk(file))
    else if (name === 'index.html') out.push(file)
  }
  return out
}

for (const url of urls) {
  const path = url.replace(SITE_URL, '') || '/'
  const file = path === '/' ? resolve(dist, 'index.html') : resolve(dist, ...path.split('/').filter(Boolean), 'index.html')
  if (!existsSync(file)) {
    errors.push(`${path}: not prerendered (${file})`)
    continue
  }
  const html = readFileSync(file, 'utf-8')
  const canonicals = [...html.matchAll(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/g)].map((m) => m[1])
  if (canonicals.length !== 1) errors.push(`${path}: ${canonicals.length} canonical links`)
  else if (canonicals[0] !== url) errors.push(`${path}: canonical ${canonicals[0]} ≠ sitemap ${url}`)
  if (!/<title>[^<]{10,}<\/title>/.test(html)) errors.push(`${path}: missing <title>`)
  if (!/<meta name="description" content="[^"]{50,}"/.test(html)) errors.push(`${path}: missing or short meta description`)
  if (!html.includes('application/ld+json')) errors.push(`${path}: no JSON-LD`)
  if (!/<h1[\s>]/.test(html)) errors.push(`${path}: no <h1>`)
  const body = html.split('<div id="root">')[1] ?? ''
  if (body.replace(/<[^>]+>/g, ' ').trim().length < 400) errors.push(`${path}: prerendered body is nearly empty`)
  if (/noindex/.test(html)) errors.push(`${path}: indexable page is marked noindex`)
  for (const m of html.matchAll(/href="(\/[a-z0-9\-/]*)"/g)) {
    const target = m[1].replace(/\/$/, '') || '/'
    if (target.startsWith('/assets') || target.startsWith('/images') || target.startsWith('/og')) continue
    if (!pagePaths.has(target) && !redirectSources.has(target) && target !== '/404') errors.push(`${path}: links to ${target}, which is neither a page nor a redirect`)
  }
}

const notFound = resolve(dist, '404.html')
if (!existsSync(notFound)) errors.push('dist/404.html missing')
else if (!readFileSync(notFound, 'utf-8').includes('noindex')) errors.push('404.html must be noindex')

const prerendered = walk(dist).length
if (prerendered < urls.length) errors.push(`only ${prerendered} index.html files for ${urls.length} sitemap URLs`)

if (errors.length) {
  console.error('❌ Build check failed:\n - ' + [...new Set(errors)].join('\n - '))
  process.exit(1)
}
console.log(`✅ Build OK – ${urls.length} sitemap URLs prerendered with canonical, title, description, JSON-LD and no dead internal links`)
