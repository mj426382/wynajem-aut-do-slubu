import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from './SEO'
import CTASection from './CTASection'
import FAQSection, { faqSchema } from './FAQSection'
import LatestPosts from './LatestPosts'
import { FREE_RADIUS_KM, ORG_ID, PHONE_DISPLAY, PHONE_E164, PRICE_MAX, PRICE_MIN, SITE_URL } from '../data/site'
import { trackLead } from '../consent/googleTag'
import Icon from './Icon'

/** One template for the two fleet pages: gallery with lightbox, specs, FAQ and the Product/Vehicle structured data. */
export default function CarPage({ car }) {
  const [lightbox, setLightbox] = useState(null)
  const url = `${SITE_URL}${car.path}`

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setLightbox(null)
      if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + car.gallery.length) % car.gallery.length)
      if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % car.gallery.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightbox, car.gallery.length])

  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: car.name, item: url },
    ],
  }
  const product = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${url}#product`,
    name: `${car.name} – auto do ślubu z szoferem`,
    description: car.metaDescription,
    brand: { '@type': 'Brand', name: 'BMW' },
    image: car.gallery.map((g) => `${SITE_URL}${g.full}`),
    url,
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: PRICE_MIN,
      highPrice: PRICE_MAX,
      priceCurrency: 'PLN',
      offerCount: 2,
      availability: 'https://schema.org/InStock',
      seller: { '@id': ORG_ID },
      areaServed: ['Warszawa', 'Radom', 'województwo mazowieckie'],
    },
  }

  return (
    <>
      <SEO title={car.metaTitle} description={car.metaDescription} path={car.path} image={car.gallery[0].full} imageAlt={car.gallery[0].alt} jsonLd={[breadcrumbs, product, faqSchema(car.faqs)]} />

      <section className="hero hero--split car-hero" aria-label={car.name}>
        <div className="hero__inner">
        <picture className="hero__photo">
          {car.heroDesktop && <source media="(min-width: 900px)" srcSet={car.heroDesktop} />}
          <source srcSet={car.gallery[0].webp} type="image/webp" />
          <img src={car.gallery[0].thumb} alt={car.gallery[0].alt} fetchPriority="high" width="800" height="533" />
        </picture>
        <div className="hero__content">
          <nav className="breadcrumb breadcrumb--light" aria-label="Breadcrumb">
            <ol className="breadcrumb__list">
              <li><Link to="/">Strona główna</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page">{car.shortName}</li>
            </ol>
          </nav>
          <span className="hero__eyebrow">{car.eyebrow}</span>
          <h1 className="hero__title">
            {car.h1} <span className="gold-text">{car.h1Accent}</span>
          </h1>
          <p className="hero__subtitle">{car.lead}</p>
          <div className="hero__cta">
            <Link to="/kontakt" className="btn btn-primary"><Icon name="mail" /> Zapytaj o dostępność</Link>
            <a href={`tel:${PHONE_E164}`} className="btn btn-outline" onClick={() => trackLead('phone', car.path)}><Icon name="phone" /> {PHONE_DISPLAY}</a>
          </div>
        </div>
        </div>
      </section>

      <section className="car-gallery" aria-labelledby="gallery-title">
        <div className="container">
          <h2 className="section-title" id="gallery-title">Galeria zdjęć — {car.shortName}</h2>
          <div className="section-divider" aria-hidden="true" />
          <p className="section-subtitle">Zdjęcia naszego auta z prawdziwych ślubów. Kliknij, aby powiększyć.</p>
          <div className="gallery__grid">
            {car.gallery.map((photo, index) => (
              <button key={photo.full} className="gallery__item" onClick={() => setLightbox(index)} aria-label={`Powiększ zdjęcie: ${photo.alt}`}>
                <picture>
                  <source srcSet={photo.webp} type="image/webp" />
                  <img src={photo.thumb} alt={photo.alt} className="gallery__img" loading={index === 0 ? 'eager' : 'lazy'} width="800" height="534" />
                </picture>
                <div className="gallery__overlay" aria-hidden="true">
                  <span className="gallery__zoom"><Icon name="zoom" /></span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightbox !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label="Podgląd zdjęcia" onClick={() => setLightbox(null)}>
          <button className="lightbox__close" onClick={() => setLightbox(null)} aria-label="Zamknij"><Icon name="close" /></button>
          <button className="lightbox__nav lightbox__nav--prev" onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i - 1 + car.gallery.length) % car.gallery.length) }} aria-label="Poprzednie zdjęcie">‹</button>
          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img src={car.gallery[lightbox].full} alt={car.gallery[lightbox].alt} className="lightbox__img" />
            <p className="lightbox__caption">{car.gallery[lightbox].caption}</p>
            <p className="lightbox__counter">{lightbox + 1} / {car.gallery.length}</p>
          </div>
          <button className="lightbox__nav lightbox__nav--next" onClick={(e) => { e.stopPropagation(); setLightbox((i) => (i + 1) % car.gallery.length) }} aria-label="Następne zdjęcie">›</button>
        </div>
      )}

      <section className="car-specs" aria-labelledby="specs-title">
        <div className="container">
          <div className="car-specs__grid">
            <div className="car-specs__info">
              <h2 id="specs-title">{car.name}</h2>
              {car.description}
              <p>
                Dekoracja florystyczna, elegancki szofer i postój na sesję są w cenie pakietu ({PRICE_MIN}–{PRICE_MAX} zł za 3 h). Dojazd gratis do {FREE_RADIUS_KM} km od Warszawy lub Radomia.
                Zobacz, jak wygląda wynajem w <Link to="/auto-do-slubu-warszawa">Warszawie</Link> i w <Link to="/auto-do-slubu-radom">Radomiu</Link>.
              </p>
              <div className="hero__cta" style={{ marginTop: '2rem' }}>
                <a href={`tel:${PHONE_E164}`} className="btn btn-primary" onClick={() => trackLead('phone', `${car.path}-specs`)}><Icon name="phone" /> {PHONE_DISPLAY}</a>
                <Link to="/kontakt" className="btn btn-gold-outline"><Icon name="mail" /> Formularz kontaktowy</Link>
              </div>
            </div>
            <div className="car-specs__features">
              <h3>Wyposażenie i cechy</h3>
              <ul className="car-features-list">
                {car.features.map((f) => (
                  <li key={f.label} className="car-features-list__item">
                    <span className="car-features-list__icon" aria-hidden="true"><Icon name={f.icon} size={20} /></span>
                    {f.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FAQSection faqs={car.faqs} title={`Pytania o ${car.shortName} na ślub`} id="faq-car" />
      <LatestPosts category="BMW" title="Porady o autach do ślubu" />
      <CTASection title={`Zarezerwuj ${car.shortName} na ślub`} id="cta-car" />
    </>
  )
}
