import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'

const gallery = [
  {
    src: '/images/bmw4/bmw4-front-villa.jpg',
    alt: 'BMW 4 Cabrio G23 — widok frontowy, białe luksusowe auto ślubne przy Villa Renard',
    caption: 'BMW 4 Cabrio — koniakowa tapicerka i sportowy pakiet Maxton Design',
  },
  {
    src: '/images/bmw4/bmw4-front-angle.jpg',
    alt: 'BMW 4 Cabrio G23 — widok 3/4 frontowy przy Villa Renard, białe auto ślubne',
    caption: 'BMW 4 Cabrio — idealne do zdjęć ślubnych i efektownego wjazdu pary młodej',
  },
  {
    src: '/images/bmw4/bmw4-original.jpg',
    alt: 'BMW 4 Cabrio G23 — białe auto ślubne z odkrytym dachem udekorowane kwiatami',
    caption: 'BMW 4 Cabrio — romantyczny kabriolet na Twój wymarzony ślub',
  },
]

const features = [
  { icon: '🌬️', label: 'Elektryczny dach — otwiera się w 18 sek.' },
  { icon: '🪑', label: 'Luksusowa tapicerka skórzana (koniakowa)' },
  { icon: '🔥', label: 'Podgrzewane fotele i ogrzewanie szyi' },
  { icon: '🎵', label: 'System audio Hi-Fi BMW' },
  { icon: '🏎️', label: 'Pakiet aerodynamiczny Maxton Design' },
  { icon: '💐', label: 'Bezpłatna dekoracja florystyczna w cenie' },
  { icon: '👨‍✈️', label: 'Elegancki szofer w cenie wynajmu' },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://autodoslubuwarszawa.pl' },
    { '@type': 'ListItem', position: 2, name: 'BMW 4 Cabrio G23', item: 'https://autodoslubuwarszawa.pl/flota/bmw-4-cabrio' },
  ],
}

export default function BMW4CabrioPage() {
  const [lightbox, setLightbox] = useState(null)

  const openLightbox = (index) => setLightbox(index)
  const closeLightbox = () => setLightbox(null)
  const prevPhoto = () => setLightbox((i) => (i - 1 + gallery.length) % gallery.length)
  const nextPhoto = () => setLightbox((i) => (i + 1) % gallery.length)

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') closeLightbox()
    if (e.key === 'ArrowLeft') prevPhoto()
    if (e.key === 'ArrowRight') nextPhoto()
  }

  return (
    <>
      <SEO
        title="BMW 4 Cabrio G23 — Romantyczne Auto do Ślubu | Galeria zdjęć"
        description="BMW 4 Cabrio G23 — elegancki kabriolet na ślub z elektrycznym dachem otwieranym w 18 sekund. Koniakowa tapicerka, pakiet Maxton Design. Galeria zdjęć i rezerwacja w Radomiu lub Warszawie."
        canonical="https://autodoslubuwarszawa.pl/flota/bmw-4-cabrio"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* HERO */}
      <section className="car-page-hero" aria-label="BMW 4 Cabrio G23">
        <div
          className="car-page-hero__bg"
          style={{ backgroundImage: `url(${gallery[0].src})` }}
          aria-hidden="true"
        />
        <div className="car-page-hero__overlay" aria-hidden="true" />
        <div className="container car-page-hero__content">
          <nav className="breadcrumb breadcrumb--light" aria-label="Breadcrumb">
            <ol className="breadcrumb__list">
              <li><Link to="/">Strona główna</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page">BMW 4 Cabrio</li>
            </ol>
          </nav>
          <span className="hero__eyebrow">Romantyczny kabriolet ślubny — Radom &amp; Warszawa</span>
          <h1 className="car-page-hero__title">
            BMW 4 Cabrio <span className="gold-text">G23</span>
          </h1>
          <p className="car-page-hero__subtitle">
            Elektryczny dach otwierany w 18 sekund, koniakowa tapicerka i pakiet Maxton Design — ucieleśnienie romantyzmu i prestiżu na Twój wielki dzień.
          </p>
          <div className="hero__cta">
            <a href="tel:+48881358838" className="btn btn-primary">📞 Zarezerwuj termin</a>
            <Link to="/kontakt" className="btn btn-outline">✉️ Zapytaj o dostępność</Link>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="car-gallery" aria-labelledby="gallery-cabrio-title">
        <div className="container">
          <h2 className="section-title" id="gallery-cabrio-title">Galeria zdjęć — BMW 4 Cabrio</h2>
          <div className="section-divider" aria-hidden="true" />
          <p className="section-subtitle">
            Kliknij na zdjęcie, aby zobaczyć je w pełnym rozmiarze. Każde auto starannie przygotowywane i dekorowane przed wynajmem.
          </p>
          <div className="gallery__grid">
            {gallery.map((photo, index) => (
              <button
                key={index}
                className="gallery__item"
                onClick={() => openLightbox(index)}
                aria-label={`Otwórz zdjęcie: ${photo.alt}`}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  className="gallery__img"
                  loading={index === 0 ? 'eager' : 'lazy'}
                  width="800"
                  height="534"
                />
                <div className="gallery__overlay" aria-hidden="true">
                  <span className="gallery__zoom">🔍</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* LIGHTBOX */}
      {lightbox !== null && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Podgląd zdjęcia"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <button className="lightbox__close" onClick={closeLightbox} aria-label="Zamknij">✕</button>
          {gallery.length > 1 && (
            <button
              className="lightbox__nav lightbox__nav--prev"
              onClick={(e) => { e.stopPropagation(); prevPhoto() }}
              aria-label="Poprzednie zdjęcie"
            >‹</button>
          )}
          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img
              src={gallery[lightbox].src}
              alt={gallery[lightbox].alt}
              className="lightbox__img"
            />
            <p className="lightbox__caption">{gallery[lightbox].caption}</p>
            {gallery.length > 1 && (
              <p className="lightbox__counter">{lightbox + 1} / {gallery.length}</p>
            )}
          </div>
          {gallery.length > 1 && (
            <button
              className="lightbox__nav lightbox__nav--next"
              onClick={(e) => { e.stopPropagation(); nextPhoto() }}
              aria-label="Następne zdjęcie"
            >›</button>
          )}
        </div>
      )}

      {/* SPECS */}
      <section className="car-specs" aria-labelledby="cabrio-specs-title">
        <div className="container">
          <div className="car-specs__grid">
            <div className="car-specs__info">
              <h2 id="cabrio-specs-title">BMW 4 Cabrio (G23)</h2>
              <p>
                <strong>BMW 4 Cabrio G23</strong> to ucieleśnienie romantyzmu i prestiżu — idealne dla Par,
                które pragną wyróżnić się w wielkim dniu. Elektryczny miękki dach otwiera się w zaledwie
                <strong> 18 sekund</strong>, a ekskluzywna koniakowa tapicerka skórzana tworzy wyjątkową,
                ciepłą atmosferę w kabinie.
              </p>
              <p>
                Stylowy pakiet zewnętrzny <strong>Maxton Design</strong> nadaje kabrioletowi agresywnego,
                sportowego charakteru, który zachwyci każdego gościa i zagwarantuje zjawiskowe zdjęcia ślubne.
                Możliwość jazdy z odkrytym dachem do 50 km/h — idealne na ciepłe letnie wesela.
              </p>
              <p>
                W cenie wynajmu: <strong>bezpłatna dekoracja florystyczna</strong> białymi różami,
                postój na sesję zdjęciową i elegancki szofer. Obsługujemy Radom, Warszawę i całe Mazowsze.
              </p>
              <div className="hero__cta" style={{ marginTop: '2rem' }}>
                <a href="tel:+48881358838" className="btn btn-primary">📞 +48 881 358 838</a>
                <Link to="/kontakt" className="btn btn-gold-outline">✉️ Formularz kontaktowy</Link>
              </div>
            </div>
            <div className="car-specs__features">
              <h3>Wyposażenie &amp; cechy</h3>
              <ul className="car-features-list">
                {features.map((f, i) => (
                  <li key={i} className="car-features-list__item">
                    <span className="car-features-list__icon" aria-hidden="true">{f.icon}</span>
                    {f.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" aria-labelledby="cabrio-cta-title">
        <div className="container">
          <span className="cta__eyebrow">Wolne terminy 2026 / 2027</span>
          <h2 className="cta__title" id="cabrio-cta-title">Zarezerwuj BMW 4 Cabrio na Ślub</h2>
          <p className="cta__subtitle">
            Terminy na kabriolet wyprzedają się szybko — szczególnie w sezonie letnim.
            Zadzwoń lub napisz już teraz, zanim Twój termin zostanie zajęty.
          </p>
          <a className="cta__phone" href="tel:+48881358838">📞 +48 881 358 838</a>
          <div className="cta__actions">
            <Link to="/kontakt" className="btn btn-dark">✉️ Napisz do nas</Link>
            <a href="tel:+48881358838" className="btn btn-dark">📞 Zadzwoń teraz</a>
          </div>
        </div>
      </section>
    </>
  )
}
