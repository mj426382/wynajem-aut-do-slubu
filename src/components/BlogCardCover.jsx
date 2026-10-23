import { Link } from 'react-router-dom'
import { coverFor } from '../blog/covers'

/** Cover ids for a list of posts, so that neighbouring cards never show the same photo. */
export function coversForList(posts) {
  const out = []
  for (const post of posts) out.push(coverFor(post, out.at(-1)?.id))
  return out
}

/** 3:2 photo cover of a blog card, linked to the post. */
export default function BlogCardCover({ post, cover = coverFor(post) }) {
  return (
    <Link to={`/blog/${post.slug}`} className="blog-card__image blog-card__image--photo" tabIndex={-1} aria-hidden="true">
      <picture>
        <source srcSet={cover.smallWebp} type="image/webp" />
        <img src={cover.small} alt="" loading="lazy" decoding="async" width="600" height="400" />
      </picture>
    </Link>
  )
}
