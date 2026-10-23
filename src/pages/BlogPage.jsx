import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { blogIndex } from '../blog/index.js'
import { BLOG_CATEGORIES, BLOG_OG_IMAGE, ORG_ID, SITE_URL, formatPlDate } from '../data/site'
import BlogCardCover, { coversForList } from '../components/BlogCardCover'

export default function BlogPage() {
  const [category, setCategory] = useState('Wszystkie')
  const posts = category === 'Wszystkie' ? blogIndex : blogIndex.filter((p) => p.category === category)
  const categories = ['Wszystkie', ...BLOG_CATEGORIES.filter((c) => blogIndex.some((p) => p.category === c))]

  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      '@id': `${SITE_URL}/blog#blog`,
      url: `${SITE_URL}/blog`,
      name: 'Blog ślubny AutoDoŚlubu Warszawa & Radom',
      description: 'Porady o transporcie ślubnym, planowaniu dnia ślubu i organizacji wesela w Warszawie, Radomiu i na Mazowszu.',
      inLanguage: 'pl-PL',
      publisher: { '@id': ORG_ID },
      blogPost: blogIndex.slice(0, 20).map((p) => ({ '@type': 'BlogPosting', headline: p.title, url: `${SITE_URL}/blog/${p.slug}`, datePublished: p.date })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Strona główna', item: `${SITE_URL}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      ],
    },
  ]

  const covers = coversForList(posts)
  return (
    <>
      <SEO
        title="Blog ślubny – porady o aucie do ślubu i organizacji dnia"
        description="Ile kosztuje auto do ślubu, jak zaplanować trasę i kortez, gdzie zrobić zdjęcia z autem w Warszawie i Radomiu. Porady dla Par Młodych z Mazowsza."
        path="/blog"
        image={BLOG_OG_IMAGE}
        jsonLd={jsonLd}
      />
      <section className="blog-page">
        <div className="container">
          <div className="blog-page__header">
            <h1 className="section-title">Blog ślubny</h1>
            <div className="section-divider"></div>
            <p className="section-subtitle">
              Praktyczne porady o transporcie ślubnym, planowaniu dnia i miejscach na ślub w Warszawie, Radomiu i na Mazowszu.
            </p>
            <div className="blog-filters" role="group" aria-label="Filtruj kategorie">
              {categories.map((c) => (
                <button key={c} type="button" className={`blog-filter${category === c ? ' blog-filter--active' : ''}`} onClick={() => setCategory(c)} aria-pressed={category === c}>
                  {c}
                </button>
              ))}
            </div>
          </div>
          <div className="blog-grid">
            {posts.map((post, i) => (
              <article className="blog-card" key={post.slug}>
                <BlogCardCover post={post} cover={covers[i]} />
                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    <span className="blog-card__category">{post.category}</span>
                    <time className="blog-card__date" dateTime={post.date}>{formatPlDate(post.date)}</time>
                    <span className="blog-card__readtime">⏱ {post.readTime} min</span>
                  </div>
                  <h2 className="blog-card__title">
                    <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                  </h2>
                  <p className="blog-card__excerpt">{post.excerpt}</p>
                  <Link to={`/blog/${post.slug}`} className="blog-card__link" aria-label={`Czytaj: ${post.title}`}>
                    Czytaj więcej →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
