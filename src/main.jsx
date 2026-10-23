import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { AppRoutes } from './App.jsx'
import { loadPost } from './blog/index.js'
import { initGoogleTag } from './consent/googleTag'
import './index.css'

initGoogleTag()

const container = document.getElementById('root')
const app = (
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
)

// Production pages are prerendered (SSG) – hydrate instead of rendering from scratch.
// An article page first fetches its body chunk so the hydrated tree equals the static HTML.
const path = window.location.pathname.replace(/\/$/, '') || '/'
const articleSlug = path.match(/^\/blog\/([a-z0-9-]+)$/)?.[1]
const ready = articleSlug ? loadPost(articleSlug).catch(() => null) : Promise.resolve(null)

ready.then(() => {
  if (container.hasChildNodes()) {
    ReactDOM.hydrateRoot(container, app, {
      onRecoverableError: (error, info) => {
        const stack = (info?.componentStack || '').split('\n').filter(Boolean).slice(0, 6).join(' > ')
        console.error('[hydration]', String(error).slice(0, 160), stack)
      },
    })
  } else {
    ReactDOM.createRoot(container).render(app)
  }
})
