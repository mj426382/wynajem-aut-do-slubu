import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'

const gallery = [
  {
    src: 'https://github.com/user-attachments/assets/6c36b836-e7fb-4ee4-8de3-a218fe13ee09',
    alt: 'BMW 650i xDrive Gran Coupé z dekoracją ślubną przed kościołem – widok z przodu',
    caption: 'BMW 650i Gran Coupé — elegancja i moc na Twój ślub',
  },
  {
    src: 'https://github.com/user-attachments/assets/377f8ea3-0177-4a87-9cdf-f73ca58b73dd',
    alt: 'BMW 650i xDrive Gran Coupé udekorowane białymi kwiatami – bok auta ślubnego',
    caption: 'Piękna dekoracja florystyczna w cenie wynajmu',
  },
]

const features = [
  { icon: '🏎️', label: 'Silnik V8 450 KM — napęd xDrive 4×4' },
  { icon: '🪑', label: 'Ekskluzywna skórzana tapicerka (brąz)' },
  { icon: '🔥', label: 'Podgrzewane fotele przednie i tylne' },
  { icon: '🎵', label: 'System audio Harman Kardon' },
  { icon: '💨', label: 'Sportowy wydech — głęboki dźwięk V8' },
  { icon: '💐', label: 'Bezpłatna dekoracja florystyczna w cenie' },
  { icon: '📸', label: 'Postój na sesję zdjęciową' },
  { icon: '👨‍✈️', label: 'Elegancki szofer w cenie wynajmu' },
]

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://autodoslubuwarszawa.pl' },
    { '@type': 'ListItem', position: 2, name: 'BMW 650i xDrive Gran Coupé', item: 'https://autodoslubuwarszawa.pl/flota/bmw-650i-gran-coupe' },
  ],
}

export default function BMW650iPage() {
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
        title="BMW 650i xDrive Gran Coupé — Auto do Ślubu | Galeria zdjęć"
        description="BMW 650i xDrive Gran Coupé F06 — luksusowe auto do ślubu z silnikiem V8 450 KM i napędem 4×4. Zobacz galerię zdjęć i zarezerwuj termin w Radomiu lub Warszawie."
        canonical="https://autodoslubuwarszawa.pl/flota/bmw-650i-gran-coupe"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* HERO */}
      <section className="car-page-hero" aria-label="BMW 650i Gran Coupé">
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
              <li aria-current="page">BMW 650i Gran Coupé</li>
            </ol>
          </nav>
          <span className="hero__eyebrow">Luksusowe auto ślubne — Radom &amp; Warszawa</span>
          <h1 className="car-page-hero__title">
            BMW 650i xDrive <span className="gold-text">Gran Coupé</span>
          </h1>
          <p className="car-page-hero__subtitle">
            Czterodrzwiowe coupé z silnikiem V8 450 KM i napędem xDrive 4×4 — majestatyczne wejście na Twój najważniejszy dzień.
          </p>
          <div className="hero__cta">
            <a href="tel:+48881358838" className="btn btn-primary">📞 Zarezerwuj termin</a>
            <Link to="/kontakt" className="btn btn-outline">✉️ Zapytaj o dostępność</Link>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="car-gallery" aria-labelledby="gallery-title">
        <div className="container">
          <h2 className="section-title" id="gallery-title">Galeria zdjęć — BMW 650i Gran Coupé</h2>
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
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); prevPhoto() }}
            aria-label="Poprzednie zdjęcie"
          >‹</button>
          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img
              src={gallery[lightbox].src}
              alt={gallery[lightbox].alt}
              className="lightbox__img"
            />
            <p className="lightbox__caption">{gallery[lightbox].caption}</p>
            <p className="lightbox__counter">{lightbox + 1} / {gallery.length}</p>
          </div>
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => { e.stopPropagation(); nextPhoto() }}
            aria-label="Następne zdjęcie"
          >›</button>
        </div>
      )}

      {/* SPECS */}
      <section className="car-specs" aria-labelledby="specs-title">
        <div className="container">
          <div className="car-specs__grid">
            <div className="car-specs__info">
              <h2 id="specs-title">BMW 650i xDrive Gran Coupé (F06)</h2>
              <p>
                <strong>BMW 650i xDrive Gran Coupé</strong> to kwintesencja luksusu i sportowej elegancji.
                Czterodrzwiowe coupé napędzane potężnym silnikiem V8 4,4 l o mocy <strong>450 KM</strong>
                z układem <strong>xDrive 4×4</strong> gwarantuje niezapomniane wejście w każdych warunkach
                pogodowych — zarówno wiosną, latem, jak i jesienią.
              </p>
              <p>
                Brązowa skórzana tapicerka, podgrzewane fotele przednie i tylne, panoramiczny szklany dach
                oraz hipnotyzujący dźwięk sportowego wydechu sprawiają, że droga do ołtarza staje się
                wyjątkowym przeżyciem, zapamiętanym przez całe życie.
              </p>
              <p>
                Oferujemy <strong>bezpłatną dekorację florystyczną</strong> białymi różami i wstążkami
                ślubnym oraz postój na sesję zdjęciową w wybranym przez Was miejscu.
                Obsługujemy Radom, Warszawę i całe Mazowsze.
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
      <section className="cta" aria-labelledby="bmw650i-cta-title">
        <div className="container">
          <span className="cta__eyebrow">Wolne terminy 2026 / 2027</span>
          <h2 className="cta__title" id="bmw650i-cta-title">Zarezerwuj BMW 650i Gran Coupé</h2>
          <p className="cta__subtitle">
            Terminy wyprzedają się z dużym wyprzedzeniem — szczególnie w sezonie maj–wrzesień.
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
