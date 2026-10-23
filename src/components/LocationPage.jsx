import { Link } from 'react-router-dom'
import SEO from './SEO'
import FleetSection from './FleetSection'
import FAQSection, { faqSchema } from './FAQSection'
import CTASection from './CTASection'
import LatestPosts from './LatestPosts'
import { CARS, FREE_RADIUS_KM, ORG_ID, PHONE_DISPLAY, PHONE_E164, PRICE_MAX, PRICE_MIN, SITE_URL } from '../data/site'
import { trackLead } from '../consent/googleTag'

/**
 * One template for the three local landing pages (Warszawa, Radom, Mazowieckie). The page object holds the copy;
 * prices and the free radius always come from src/data/site.js, so the pages cannot contradict each other.
 */
export default function LocationPage({ page }) {
  const url = `${SITE_URL}${page.path}`
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: page.breadcrumb, item: url },
    ],
  }
  const service = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: page.serviceName,
    serviceType: 'Wynajem auta do ślubu z szoferem',
    provider: { '@id': ORG_ID },
    areaServed: page.areaServed.map((name) => ({ '@type': 'City', name })),
    url,
    offers: { '@type': 'Offer', priceCurrency: 'PLN', priceSpecification: { '@type': 'PriceSpecification', minPrice: PRICE_MIN, maxPrice: PRICE_MAX, priceCurrency: 'PLN' } },
  }

  return (
    <>
      <SEO title={page.metaTitle} description={page.metaDescription} path={page.path} jsonLd={[breadcrumbs, service, faqSchema(page.faqs)]} />

      <section className="location-hero" aria-label={page.h1}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol className="breadcrumb__list">
              <li><Link to="/">Strona główna</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page">{page.breadcrumb}</li>
            </ol>
          </nav>
          <span className="hero__eyebrow">{page.eyebrow}</span>
          <h1 className="location-hero__title">
            {page.h1} <span className="gold-text">{page.h1Accent}</span>
          </h1>
          <p className="location-hero__subtitle">{page.lead}</p>
          <div className="hero__cta">
            <Link to="/kontakt" className="btn btn-primary">✉️ Zapytaj o termin</Link>
            <a href={`tel:${PHONE_E164}`} className="btn btn-outline" onClick={() => trackLead('phone', page.path)}>📞 Zadzwoń teraz</a>
          </div>
        </div>
      </section>

      <section className="location-content">
        <div className="container">
          <div className="location-content__grid">
            <div className="location-content__text">{page.content}</div>

            <aside className="location-sidebar">
              <div className="location-sidebar__card">
                <h2 style={{ fontSize: '1.25rem' }}>{page.sidebarTitle}</h2>
                <p>Pakiet {PRICE_MIN}–{PRICE_MAX} zł za 3 h z szoferem. Terminy 2026 / 2027.</p>
                <a href={`tel:${PHONE_E164}`} className="btn btn-primary" style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }} onClick={() => trackLead('phone', `${page.path}-sidebar`)}>
                  📞 {PHONE_DISPLAY}
                </a>
                <Link to="/kontakt" className="btn btn-gold-outline" style={{ display: 'block', textAlign: 'center' }}>
                  ✉️ Formularz kontaktowy
                </Link>
                <hr style={{ margin: '1.5rem 0', borderColor: 'var(--gold)', opacity: 0.3 }} />
                <ul className="location-sidebar__features">
                  <li>🚗 {CARS[0].shortName} lub {CARS[1].shortName}</li>
                  <li>💐 Dekoracja florystyczna w cenie</li>
                  <li>📸 Postój na sesję zdjęciową</li>
                  <li>👨‍✈️ Elegancki szofer w cenie</li>
                  <li>📍 Dojazd gratis do {FREE_RADIUS_KM} km</li>
                </ul>
              </div>
              <div className="location-sidebar__links">
                <h3 style={{ fontSize: '1rem' }}>Zobacz też:</h3>
                {page.related.map((r) => (
                  <Link key={r.to} to={r.to} className="location-sidebar__city-link">→ {r.label}</Link>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <FleetSection title={page.fleetTitle} subtitle={page.fleetSubtitle} />
      <FAQSection faqs={page.faqs} title={page.faqTitle} id="faq-local" />
      <LatestPosts category={page.blogCategory} title={page.blogTitle} />
      <CTASection eyebrow={page.ctaEyebrow} title={page.ctaTitle} text={page.ctaText} id="cta-local" />
    </>
  )
}
