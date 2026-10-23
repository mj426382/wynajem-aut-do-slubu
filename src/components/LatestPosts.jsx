import { Link } from 'react-router-dom'
import { blogIndex } from '../blog/index.js'
import { formatPlDate } from '../data/site'

/** Newest posts (optionally one category first) – internal links from the money pages into the blog and back. */
export default function LatestPosts({ category, limit = 3, title = 'Z bloga ślubnego' }) {
  const preferred = category ? blogIndex.filter((p) => p.category === category) : []
  const rest = blogIndex.filter((p) => !preferred.includes(p))
  const posts = [...preferred, ...rest].slice(0, limit)
  if (posts.length === 0) return null
  return (
    <section className="latest-posts" aria-labelledby="latest-posts-title">
      <div className="container">
        <h2 className="section-title" id="latest-posts-title">{title}</h2>
        <div className="section-divider" aria-hidden="true"></div>
        <div className="blog-grid">
          {posts.map((post) => (
            <article className="blog-card" key={post.slug}>
              <div className="blog-card__image" aria-hidden="true">
                <span style={{ fontSize: '3rem' }}>{post.emoji}</span>
              </div>
              <div className="blog-card__body">
                <div className="blog-card__meta">
                  <span className="blog-card__category">{post.category}</span>
                  <time className="blog-card__date" dateTime={post.date}>{formatPlDate(post.date)}</time>
                </div>
                <h3 className="blog-card__title">
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p className="blog-card__excerpt">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
        <p style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link to="/blog" className="btn btn-gold-outline">Wszystkie porady ślubne →</Link>
        </p>
      </div>
    </section>
  )
}
