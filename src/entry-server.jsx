import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { HelmetProvider } from 'react-helmet-async'
import { AppRoutes } from './App.jsx'
import { primePostCache } from './blog/index.js'
import { allPosts } from './blog/content.server.js'

primePostCache(allPosts)

/**
 * Server-side render used by scripts/prerender.js to produce static HTML for every route (SSG).
 * Crawlers and visitors get the full content without JavaScript; the client bundle then hydrates.
 */
export function render(url) {
  const helmetContext = {}
  const html = renderToString(
    <HelmetProvider context={helmetContext}>
      <StaticRouter location={url}>
        <AppRoutes />
      </StaticRouter>
    </HelmetProvider>,
  )
  // React 19: react-helmet-async renders native <title>/<meta>/<link>, which React hoists to the start of the
  // output (and into document.head in the browser). Move that leading block into <head>; JSON-LD <script> tags
  // stay where they are rendered, so the hydrated tree matches the static HTML.
  const lead = html.match(/^(?:<(?:title|meta|link)\b[^>]*>(?:[^<]*<\/title>)?)+/)?.[0] ?? ''
  const helmet = helmetContext.helmet
  const legacyHead = helmet ? [helmet.title, helmet.meta, helmet.link, helmet.script].map((h) => h?.toString() ?? '').filter(Boolean).join('\n') : ''
  return { html: html.slice(lead.length), head: lead.replace(/></g, '>\n    <') + legacyHead }
}

export const postSlugs = allPosts.map((p) => p.slug)
