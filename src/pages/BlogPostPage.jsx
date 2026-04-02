import { useParams, Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { articles } from '../blog/index.js'

export default function BlogPostPage() {
  const { slug } = useParams()
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return (
      <section className="blog-post">
        <div className="container">
          <div className="breadcrumbs">
            <Link to="/">Strona główna</Link>
            <span>›</span>
            <Link to="/blog">Blog</Link>
            <span>›</span>
            <span>Artykuł nie znaleziony</span>
          </div>
          <h1 style={{ textAlign: 'center', marginTop: '4rem' }}>
            Artykuł nie istnieje
          </h1>
          <p style={{ textAlign: 'center', color: '#666', marginTop: '1rem' }}>
            Przepraszamy, szukany artykuł nie został znaleziony.
          </p>
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link to="/blog" className="btn btn-primary">Wróć do bloga</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <SEO
        title={article.title}
        description={article.excerpt}
        canonical={`https://autodoslubuwarszawa.pl/blog/${article.slug}`}
      />
      <article className="blog-post">
        <div className="container">
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link to="/">Strona główna</Link>
            <span>›</span>
            <Link to="/blog">Blog</Link>
            <span>›</span>
            <span>{article.title}</span>
          </nav>

          <header className="blog-post__header">
            <div className="blog-post__meta">
              <span className="blog-card__category">{article.category}</span>
              <span className="blog-card__date">{article.date}</span>
              <span className="blog-card__readtime">⏱ {article.readTime}</span>
            </div>
            <h1 className="blog-post__title">{article.title}</h1>
            <p style={{ color: '#666', fontSize: '1.05rem', fontStyle: 'italic' }}>
              {article.excerpt}
            </p>
          </header>

          <div
            className="blog-post__content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          <div className="blog-post__cta">
            <h3>Zarezerwuj auto do ślubu już dziś</h3>
            <p>Skontaktuj się z nami i zarezerwuj swoje wymarzone auto. Terminy wyprzedają się szybko!</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link to="/kontakt" className="btn btn-primary">✉️ Zapytaj o dostępność</Link>
              <a href="tel:+48881358838" className="btn btn-outline">📞 +48 881 358 838</a>
            </div>
          </div>

          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link to="/blog" className="btn btn-gold-outline">← Wróć do bloga</Link>
          </div>
        </div>
      </article>
    </>
  )
}
