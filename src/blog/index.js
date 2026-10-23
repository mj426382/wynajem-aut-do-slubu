/**
 * Blog data access.
 *
 * - Metadata of every post comes from the generated index (titles, excerpts, dates – no bodies).
 * - Bodies: in the browser each post is its own chunk, fetched only when its page opens; before hydrating a
 *   prerendered article main.jsx preloads that one post so the markup equals the static HTML.
 * - Prerender (SSR): entry-server.jsx fills the cache eagerly from content.server.js.
 */
import { blogIndex } from './index.generated.js'

export { blogIndex }

const cache = new Map()
const loaders = import.meta.glob('./posts/*.js')

export function normalizePost(mod) {
  return {
    slug: mod.slug,
    title: mod.title,
    metaTitle: mod.metaTitle ?? mod.title,
    metaDescription: mod.metaDescription ?? mod.excerpt ?? '',
    excerpt: mod.excerpt ?? '',
    date: mod.date,
    modifiedAt: mod.modifiedAt ?? mod.date,
    readTime: Number(mod.readTime ?? 5),
    category: mod.category ?? 'Porady',
    emoji: mod.emoji ?? '💍',
    tags: mod.tags ?? [],
    content: mod.content ?? '',
  }
}

export function getCachedPost(slug) {
  return cache.get(slug)
}

export function primePostCache(posts) {
  for (const post of posts) cache.set(post.slug, post)
}

export async function loadPost(slug) {
  const cached = cache.get(slug)
  if (cached) return cached
  const loader = loaders[`./posts/${slug}.js`]
  if (!loader) return null
  const post = normalizePost(await loader())
  cache.set(slug, post)
  return post
}

export function postExists(slug) {
  return `./posts/${slug}.js` in loaders
}

export function findPostMeta(slug) {
  return blogIndex.find((p) => p.slug === slug)
}
