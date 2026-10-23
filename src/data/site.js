/**
 * Site-wide facts shared by pages, structured data, the blog bot prompt and the build scripts.
 * One source of truth: change a price or the free radius here and every page, FAQ and schema follows.
 * scripts/generate-sitemap.js and scripts/prerender.js import this file directly (plain ESM, no JSX).
 */
export const SITE_URL = 'https://autodoslubuwarszawa.pl'
export const SITE_NAME = 'AutoDoŚlubu Warszawa & Radom'
export const SITE_SHORT_NAME = 'AutoDoŚlubu'
export const PHONE_E164 = '+48881358838'
export const PHONE_DISPLAY = '+48 881 358 838'
export const EMAIL = 'janmat.jdg@gmail.com'

/** Offer facts (decision of 2026-10-23): packages 800–1200 zł for 3 h with a chauffeur, free travel within 30 km. */
export const PRICE_MIN = 800
export const PRICE_MAX = 1200
export const PACKAGE_HOURS = 3
export const FREE_RADIUS_KM = 30
export const EXTRA_KM_PRICE = 3
export const DEPOSIT_PERCENT = 30
export const SERVING_SINCE = 2010

export const CARS = [
  {
    slug: 'bmw-650i-gran-coupe',
    path: '/flota/bmw-650i-gran-coupe',
    name: 'BMW 650i xDrive Gran Coupé (F06)',
    shortName: 'BMW 650i Gran Coupé',
    image: '/images/bmw6/bmw6-front-1600.jpg',
    imageWebp: '/images/bmw6/bmw6-front-1600.webp',
    imageAlt: 'BMW 650i xDrive Gran Coupé – luksusowe auto do ślubu udekorowane białymi kwiatami',
  },
  {
    slug: 'bmw-4-cabrio',
    path: '/flota/bmw-4-cabrio',
    name: 'BMW 4 Cabrio (G23)',
    shortName: 'BMW 4 Cabrio',
    image: '/images/bmw4/bmw4-front-villa-1600.jpg',
    imageWebp: '/images/bmw4/bmw4-front-villa-1600.webp',
    imageAlt: 'BMW 4 Cabrio G23 – białe auto ślubne z odkrytym dachem',
  },
]

/** Stable @id values that link the JSON-LD entities across pages. */
export const ORG_ID = `${SITE_URL}/#organization`
export const WEBSITE_ID = `${SITE_URL}/#website`

export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`
export const BLOG_OG_IMAGE = `${SITE_URL}/og/blog.jpg`
export const OG_IMAGE_WIDTH = '1200'
export const OG_IMAGE_HEIGHT = '630'
export const DEFAULT_OG_ALT = 'BMW z szoferem udekorowane na ślub – AutoDoŚlubu Warszawa & Radom'
export const LOGO_URL = `${SITE_URL}/logo-512.png`

/**
 * Static pages with the date their copy last changed – the sitemap <lastmod> (never the build date) and the
 * prerender route list. Bump a date when you edit that page's content. Blog posts come from src/blog/posts.
 */
export const STATIC_PAGES = [
  { path: '/', updated: '2026-10-23', priority: '1.0', changefreq: 'weekly' },
  { path: '/auto-do-slubu-warszawa', updated: '2026-10-23', priority: '0.9', changefreq: 'monthly' },
  { path: '/auto-do-slubu-radom', updated: '2026-10-23', priority: '0.9', changefreq: 'monthly' },
  { path: '/auto-do-slubu-mazowieckie', updated: '2026-10-23', priority: '0.8', changefreq: 'monthly' },
  { path: '/flota/bmw-650i-gran-coupe', updated: '2026-10-23', priority: '0.8', changefreq: 'monthly' },
  { path: '/flota/bmw-4-cabrio', updated: '2026-10-23', priority: '0.8', changefreq: 'monthly' },
  { path: '/blog', updated: '2026-10-23', priority: '0.8', changefreq: 'weekly' },
  { path: '/kontakt', updated: '2026-10-23', priority: '0.6', changefreq: 'yearly' },
  { path: '/polityka-prywatnosci', updated: '2026-10-23', priority: '0.2', changefreq: 'yearly' },
]

/** Blog categories (the bot may only use these). */
export const BLOG_CATEGORIES = ['Porady', 'Planowanie', 'Warszawa', 'Radom', 'Mazowsze', 'Trendy', 'BMW']

/** "17 października 2026" – deterministic on the server and in the browser (no Intl differences). */
const MONTHS = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia']
export function formatPlDate(iso) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[m - 1]} ${y}`
}

/** "800–1200 zł" */
export const PRICE_RANGE_TEXT = `${PRICE_MIN}–${PRICE_MAX} zł`
