import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

/**
 * `vite preview` falls back to dist/index.html for every extension-less URL (SPA mode), which would serve the
 * prerendered home page for /blog or /kontakt. Vercel serves dist/<route>/index.html for those URLs, so the
 * preview server does the same – what you check locally is what production serves.
 */
function prerenderedRoutesPlugin() {
  return {
    name: 'vite-plugin-prerendered-routes',
    configurePreviewServer(server) {
      const outDir = path.resolve(__dirname, 'dist')
      server.middlewares.use((req, res, next) => {
        const url = (req.url ?? '/').split('?')[0]
        if (url === '/' || path.extname(url)) return next()
        const clean = url.replace(/\/+$/, '')
        const file = path.join(outDir, clean, 'index.html')
        if (fs.existsSync(file)) {
          req.url = `${clean}/index.html`
          return next()
        }
        const notFound = path.join(outDir, '404.html')
        if (fs.existsSync(notFound)) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          res.end(fs.readFileSync(notFound))
          return
        }
        next()
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), prerenderedRoutesPlugin()],
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  ssr: {
    // CommonJS packages must be bundled into the SSR entry so scripts/prerender.js can import it as ESM.
    noExternal: ['react-helmet-async'],
  },
})
