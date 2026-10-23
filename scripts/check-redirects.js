/**
 * SEO safety net for merged blog posts. Every blog URL that ever existed must either still be a post or be a
 * permanent redirect to a live page. The build fails when:
 *   - a redirect points to a slug or page that no longer exists (would 404 → lost rankings)
 *   - a redirect source still exists as a post (shadowed content)
 *   - redirects chain (A → B → C)
 *   - a redirect is not permanent (301/308)
 *   - a slug listed in src/blog/retired-slugs.json has neither a post nor a redirect
 * Run: node scripts/check-redirects.js  (part of `npm run build` and CI)
 */
import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { STATIC_PAGES } from '../src/data/site.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = resolve(__dirname, '..')
const vercel = JSON.parse(readFileSync(resolve(root, 'vercel.json'), 'utf-8'))
const postsDir = resolve(root, 'src/blog/posts')
const retiredFile = resolve(root, 'src/blog/retired-slugs.json')

const posts = new Set(readdirSync(postsDir).filter((f) => f.endsWith('.js')).map((f) => f.replace(/\.js$/, '')))
const livePaths = new Set([...STATIC_PAGES.map((p) => p.path), ...[...posts].map((s) => `/blog/${s}`)])

const redirects = (vercel.redirects ?? []).filter((r) => !r.has && !r.source.includes('(') && !r.source.includes(':'))
const map = new Map(redirects.map((r) => [r.source, r.destination]))

const errors = []
const seen = new Set()
for (const r of redirects) {
  if (seen.has(r.source)) errors.push(`${r.source}: duplicate redirect source (Vercel uses the first one)`)
  seen.add(r.source)
  const permanent = r.statusCode === 301 || r.statusCode === 308 || r.permanent === true
  if (!permanent) errors.push(`${r.source}: must be a permanent redirect (statusCode 301)`)
  if (!livePaths.has(r.destination)) errors.push(`${r.source} → ${r.destination}: target page does not exist`)
  if (livePaths.has(r.source)) errors.push(`${r.source}: source still exists as a page (remove the redirect or the file)`)
  if (map.has(r.destination)) errors.push(`${r.source} → ${r.destination}: redirect chain (target is itself redirected to ${map.get(r.destination)})`)
  if (r.source === r.destination) errors.push(`${r.source}: redirects to itself`)
}

// Ledger of every blog slug that was ever published so a future cleanup cannot silently drop one.
let retired = []
if (existsSync(retiredFile)) retired = JSON.parse(readFileSync(retiredFile, 'utf-8'))
for (const slug of retired) {
  if (!posts.has(slug) && !map.has(`/blog/${slug}`)) errors.push(`/blog/${slug} was published before but now has neither a post nor a redirect`)
}
const nextRetired = [...new Set([...retired, ...[...map.keys()].filter((s) => s.startsWith('/blog/')).map((s) => s.replace('/blog/', ''))])].sort()
if (JSON.stringify(nextRetired) !== JSON.stringify(retired)) {
  if (process.env.CI || process.env.VERCEL) {
    errors.push('src/blog/retired-slugs.json is out of date – run "npm run check:redirects" locally and commit it')
  } else {
    writeFileSync(retiredFile, JSON.stringify(nextRetired, null, 2) + '\n', 'utf-8')
  }
}

if (errors.length) {
  console.error('❌ Redirect check failed:\n - ' + errors.join('\n - '))
  process.exit(1)
}
console.log(`✅ Redirects OK (${redirects.length} permanent redirects, ${posts.size} posts, ${nextRetired.length} retired slugs tracked)`)
