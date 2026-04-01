import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { articles } from '../blog/index.js'

export default function BlogPage() {
  return (
    <>
      <SEO
        title="Blog – Porady o Wynajmie Aut Ślubnych"
        description="Porady, poradniki i inspiracje dotyczące wynajmu aut do ślubu w Radomiu i Warszawie. Dowiedz się jak wybrać idealne auto na Twój wielki dzień."
        canonical="https://zlota-kareta.pl/blog"
      />
      <section className="blog-page">
        <div className="container">
          <div className="blog-page__header">
            <h1 className="section-title">Blog ślubny</h1>
            <div className="section-divider"></div>
            <p className="section-subtitle">
              Porady, inspiracje i poradniki dla Pary Młodej planującej ślub w Radomiu i Warszawie.
            </p>
          </div>
          <div className="blog-grid">
            {articles.map((article) => (
              <article className="blog-card" key={article.slug}>
                <div className="blog-card__image" aria-hidden="true">
                  <span style={{ fontSize: '4rem' }}>{article.emoji}</span>
                </div>
                <div className="blog-card__body">
                  <div className="blog-card__meta">
                    <span className="blog-card__category">{article.category}</span>
                    <span className="blog-card__date">{article.date}</span>
                    <span className="blog-card__readtime">⏱ {article.readTime}</span>
                  </div>
                  <h2 className="blog-card__title">{article.title}</h2>
                  <p className="blog-card__excerpt">{article.excerpt}</p>
                  <Link to={`/blog/${article.slug}`} className="blog-card__link">
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
