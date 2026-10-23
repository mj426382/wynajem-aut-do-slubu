// Server-only: imported by entry-server.jsx so the prerender has every article body synchronously.
// Never import this from client code – it would pull every post into the main bundle.
import { normalizePost } from './index.js'

const modules = import.meta.glob('./posts/*.js', { eager: true })

export const allPosts = Object.values(modules).map(normalizePost)
