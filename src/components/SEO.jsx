import { Helmet } from 'react-helmet-async'
import { DEFAULT_OG_ALT, DEFAULT_OG_IMAGE, OG_IMAGE_HEIGHT, OG_IMAGE_WIDTH, SITE_NAME, SITE_SHORT_NAME, SITE_URL } from '../data/site'

const BRAND_SUFFIX = ` | ${SITE_SHORT_NAME}`
const MAX_TITLE = 62

/** Appends the brand once, only when the title stays within the width Google shows (about 60 characters). */
export function pageTitle(title) {
  if (title.includes(SITE_SHORT_NAME)) return title
  return title.length + BRAND_SUFFIX.length <= MAX_TITLE ? `${title}${BRAND_SUFFIX}` : title
}

/**
 * The per-route <head> shared by every page: title, description, canonical, Open Graph, Twitter, JSON-LD.
 * `path` is the route ("/blog"); the canonical and og:url are built from it, so no page can get them wrong.
 */
export default function SEO({ title, description, path, image = DEFAULT_OG_IMAGE, imageAlt = DEFAULT_OG_ALT, type = 'website', jsonLd = [], noindex = false, children }) {
  const url = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`
  const fullTitle = pageTitle(title)
  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, follow' : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="pl_PL" />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content={OG_IMAGE_WIDTH} />
      <meta property="og:image:height" content={OG_IMAGE_HEIGHT} />
      <meta property="og:image:alt" content={imageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:image:alt" content={imageAlt} />
      {children}
      {jsonLd.map((block, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(block)}
        </script>
      ))}
    </Helmet>
  )
}
