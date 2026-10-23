import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import SEO from '../components/SEO'
import NotFoundPage from './NotFoundPage'
import { blogIndex, getCachedPost, loadPost, postExists } from '../blog/index.js'
import { LOGO_URL, ORG_ID, PHONE_DISPLAY, PHONE_E164, SITE_NAME, SITE_URL, formatPlDate } from '../data/site'
import { trackLead } from '../consent/googleTag'
import { coverFor } from '../blog/covers'
import Icon from '../components/Icon'

function stripTags(html) {
  return html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

/** "<h3>Pytanie?</h3><p>Odpowiedź</p>" pairs anywhere in the article → FAQPage rich result. */
function extractFaq(html) {
  const out = []
  for (const m of html.matchAll(/<h3[^>]*>([^<]*\?)\s*<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/g)) {
    const q = stripTags(m[1])
    const a = stripTags(m[2])
    if (q && a) out.push({ q, a })
  }
  return out
}

function wordCount(html) {
  return stripTags(html).split(' ').filter(Boolean).length
}

export default function BlogPostPage() {
  const { slug } = useParams()
  const meta = blogIndex.find((p) => p.slug === slug)
  // Body: in the cache when prerendering or after the pre-hydration preload; on client-side navigation it is fetched
  // as its own chunk and stored in state.
  const [loaded, setLoaded] = useState(null)
  const post = (slug && getCachedPost(slug)) || (loaded?.slug === slug ? loaded : undefined)

  useEffect(() => {
    if (!slug || post) return
    let cancelled = false
    loadPost(slug).then((result) => {
      if (!cancelled && result) setLoaded(result)
    })
    return () => {
      cancelled = true
    }
  }, [slug, post])

  if (!meta || !slug || !postExists(slug)) return <NotFoundPage />

  if (!post) {
    return (
      <section className="blog-post">
        <div className="container">
          <div className="blog-post__header">
            <h1 className="blog-post__title">{meta.title}</h1>
            <p style={{ color: '#666' }}>Wczytywanie artykułu…</p>
          </div>
        </div>
      </section>
    )
  }

  const canonical = `${SITE_URL}/blog/${post.slug}`
  const cover = coverFor(post)
  const faq = extractFaq(post.content)
  const others = blogIndex.filter((p) => p.slug !== post.slug)
  const related = [...others.filter((p) => p.category === post.category), ...others].filter((p, i, all) => all.indexOf(p) === i).slice(0, 3)

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${canonical}#article`,
      headline: post.title,
      description: post.metaDescription,
      datePublished: post.date,
      dateModified: post.modifiedAt,
      inLanguage: 'pl-PL',
      wordCount: wordCount(post.content),
      keywords: post.tags.join(', '),
      articleSection: post.category,
      author: { '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME, url: `${SITE_URL}/` },
      publisher: { '@type': 'Organization', '@id': ORG_ID, name: SITE_NAME, logo: { '@type': 'ImageObject', url: LOGO_URL } },
      url: canonical,
      mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
      isPartOf: { '@id': `${SITE_URL}/blog#blog` },
      image: { '@type': 'ImageObject', url: `${SITE_URL}${cover.large}`, width: 1200, height: 800 },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Strona główna', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
        { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
      ],
    },
  ]
  if (faq.length > 0) {
    jsonLd.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
    })
  }

  return (
    <>
      <SEO title={post.metaTitle} description={post.metaDescription} path={`/blog/${post.slug}`} image={cover.large} imageAlt={cover.alt} imageWidth="1200" imageHeight="800" type="article" jsonLd={jsonLd}>
        <meta property="article:published_time" content={post.date} />
        <meta property="article:modified_time" content={post.modifiedAt} />
        <meta property="article:section" content={post.category} />
      </SEO>
      <article className="blog-post">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Strona główna</Link>
            <span aria-hidden="true">›</span>
            <Link to="/blog">Blog</Link>
            <span aria-hidden="true">›</span>
            <span>{post.category}</span>
          </nav>

          <header className="blog-post__header">
            <div className="blog-post__meta">
              <span className="blog-card__category">{post.category}</span>
              <time className="blog-card__date" dateTime={post.date}>{formatPlDate(post.date)}</time>
              {post.modifiedAt !== post.date && (
                <span className="blog-card__date">
                  aktualizacja: <time dateTime={post.modifiedAt}>{formatPlDate(post.modifiedAt)}</time>
                </span>
              )}
              <span className="blog-card__readtime">⏱ {post.readTime} min czytania</span>
            </div>
            <h1 className="blog-post__title">{post.title}</h1>
            <p className="blog-post__lead">{post.excerpt}</p>
            <picture className="blog-post__cover">
              <source srcSet={cover.largeWebp} type="image/webp" />
              <img src={cover.large} alt={cover.alt} width="1200" height="800" fetchPriority="high" />
            </picture>
          </header>

          <div className="blog-post__content" dangerouslySetInnerHTML={{ __html: post.content }} />

          {post.tags.length > 0 && (
            <p className="blog-post__tags" aria-label="Tagi">
              {post.tags.map((t) => (
                <span key={t} className="blog-post__tag">#{t}</span>
              ))}
            </p>
          )}

          <div className="blog-post__cta">
            <h2 style={{ color: '#fff', fontFamily: 'var(--font-main)', marginBottom: '0.75rem', fontSize: '1.5rem' }}>Zarezerwuj auto do ślubu</h2>
            <p>BMW 650i Gran Coupé lub BMW 4 Cabrio z szoferem i dekoracją w Warszawie, Radomiu i na Mazowszu. Sprawdźcie wolny termin.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/kontakt" className="btn btn-primary"><Icon name="mail" /> Zapytaj o dostępność</Link>
              <a href={`tel:${PHONE_E164}`} className="btn btn-outline" onClick={() => trackLead('phone', 'blog-post')}><Icon name="phone" /> {PHONE_DISPLAY}</a>
            </div>
          </div>

          {related.length > 0 && (
            <aside className="blog-post__related" aria-labelledby="related-title">
              <h2 id="related-title" className="blog-post__related-title">Przeczytaj też</h2>
              <ul className="blog-post__related-list">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link to={`/blog/${p.slug}`}>{p.title}</Link>
                    <span className="blog-card__date"> · {p.category}</span>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link to="/blog" className="btn btn-gold-outline">← Wróć do bloga</Link>
          </div>
        </div>
      </article>
    </>
  )
}
