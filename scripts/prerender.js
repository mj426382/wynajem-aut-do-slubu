/**
 * SSG prerender for autodoslubuwarszawa.pl
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server bundle) and writes a fully rendered HTML
 * file for every route: dist/index.html, dist/blog/index.html, dist/blog/<slug>/index.html, dist/kontakt/index.html …
 * plus dist/404.html, which Vercel serves with a real 404 status for unknown URLs (no SPA catch-all rewrite).
 *
 * Each page contains the real content (not an empty <div id="root">) and the per-route <head> produced by
 * react-helmet-async (title, description, canonical, Open Graph, JSON-LD). Crawlers index the page without
 * executing JavaScript, visitors see content before the bundle loads, and the client then hydrates.
 * The site stylesheet is inlined into every page instead of a render-blocking <link>.
 *
 * Run: node scripts/prerender.js  (automatically called by `npm run build`)
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath, pathToFileURL } from 'url'
import { STATIC_PAGES } from '../src/data/site.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, '../dist')
const ssrDir = resolve(__dirname, '../dist-ssr')

/** Removes the generic SEO tags from index.html – every route provides its own via Helmet. */
function stripVariableHeadTags(html) {
  return html
    .replace(/<title>[^<]*<\/title>\s*/i, '')
    .replace(/<meta\s+name="(description|keywords|robots|googlebot|bingbot)"[^>]*>\s*/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>\s*/i, '')
    .replace(/<meta\s+property="(og|article):[^"]*"[^>]*>\s*/gi, '')
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>\s*/gi, '')
}

/** Replaces the render-blocking <link rel="stylesheet"> of the built CSS with an inline <style>. */
function inlineStylesheet(template) {
  const link = template.match(/<link rel="stylesheet"[^>]*href="(\/assets\/[^"]+\.css)"[^>]*>/)
  if (!link) throw new Error('Built stylesheet link not found in dist/index.html')
  const css = readFileSync(resolve(distDir, link[1].slice(1)), 'utf-8').replace(/<\/style/gi, '<\\/style')
  return template.replace(link[0], () => `<style>${css}</style>`)
}

function buildPage(template, { html, head }) {
  let out = stripVariableHeadTags(template)
  const verification = process.env.VITE_GSC_VERIFICATION
  const extra = verification ? `\n    <meta name="google-site-verification" content="${verification}" />` : ''
  out = out.replace('</head>', `${head}${extra}\n  </head>`)
  out = out.replace('<div id="root"></div>', () => `<div id="root">${html}</div>`)
  return out
}

function writeRoute(routePath, html) {
  const dir = resolve(distDir, ...routePath.split('/').filter(Boolean))
  mkdirSync(dir, { recursive: true })
  writeFileSync(resolve(dir, 'index.html'), html, 'utf-8')
}

async function main() {
  const entry = resolve(ssrDir, 'entry-server.js')
  if (!existsSync(entry)) {
    throw new Error(`SSR bundle not found at ${entry}. Run "vite build --ssr src/entry-server.jsx --outDir dist-ssr" first.`)
  }
  const { render, postSlugs } = await import(pathToFileURL(entry).href)
  const template = inlineStylesheet(readFileSync(resolve(distDir, 'index.html'), 'utf-8'))

  const routes = [...STATIC_PAGES.map((p) => p.path), ...postSlugs.map((s) => `/blog/${s}`)]
  console.log(`\n🔄 Prerendering ${routes.length} routes…`)

  for (const route of routes) {
    const rendered = render(route)
    if (!rendered.html || rendered.html.length < 500) {
      throw new Error(`Route ${route} rendered suspiciously little HTML (${rendered.html.length} chars)`)
    }
    if (!rendered.head.includes('rel="canonical"')) throw new Error(`Route ${route} has no canonical link`)
    writeRoute(route, buildPage(template, rendered))
  }

  // Static 404 page: vercel.json has no SPA catch-all, so Vercel serves this with a real 404 status.
  writeFileSync(resolve(distDir, '404.html'), buildPage(template, render('/this-page-does-not-exist')), 'utf-8')

  rmSync(ssrDir, { recursive: true, force: true })
  console.log(`✅ Prerendering complete — ${routes.length} routes + 404.html\n`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
