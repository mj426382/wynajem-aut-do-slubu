import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://autodoslubuwarszawa.pl' },
    { '@type': 'ListItem', position: 2, name: 'Auto do ślubu Mazowieckie', item: 'https://autodoslubuwarszawa.pl/auto-do-slubu-mazowieckie' },
  ],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://autodoslubuwarszawa.pl/auto-do-slubu-mazowieckie#business',
  name: 'Złota Kareta — Auto do Ślubu Mazowieckie',
  description: 'Wynajem auta do ślubu w całym województwie mazowieckim — BMW z szoferem. Radom, Warszawa, Grójec, Kozienice, Białobrzegi i cały region.',
  url: 'https://autodoslubuwarszawa.pl/auto-do-slubu-mazowieckie',
  telephone: '+48501234567',
  email: 'kontakt@autodoslubuwarszawa.pl',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ul. Żeromskiego 1',
    addressLocality: 'Radom',
    postalCode: '26-600',
    addressCountry: 'PL',
  },
  geo: { '@type': 'GeoCoordinates', latitude: 51.4027, longitude: 21.1471 },
  areaServed: [
    'Mazowsze', 'Radom', 'Warszawa', 'Grójec', 'Kozienice', 'Białobrzegi',
    'Zwoleń', 'Pionki', 'Szydłowiec', 'Przysucha', 'Nowe Miasto nad Pilicą',
    'Lipsko', 'Iłża', 'Pruszków', 'Piaseczno', 'Ostrołęka', 'Siedlce', 'Płock',
  ],
  priceRange: '$$',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '14:00' },
  ],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '85', bestRating: '5', worstRating: '1' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Czy obsługujecie wynajem auta do ślubu poza Radomiem i Warszawą?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak! Obsługujemy wynajem auta do ślubu w całym województwie mazowieckim — Grójec, Kozienice, Białobrzegi, Zwoleń, Pionki, Szydłowiec, Przysucha i wiele innych miast. Bezpłatny dojazd w promieniu 50 km od Radomia lub Warszawy.',
      },
    },
    {
      '@type': 'Question',
      name: 'Jakie są koszty dojazdu poza 50 km od Radomia lub Warszawy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Poza promieniem 50 km naliczamy opłatę 3 zł/km. Obsługujemy też województwa sąsiednie: łódzkie, świętokrzyskie i lubelskie. Skontaktuj się z nami po indywidualną wycenę.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy można zamówić kortez weselny na Mazowszu?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak, organizujemy korteze weselne na całym Mazowszu. Dysponujemy dwoma BMW i możemy uzupełnić flotę o zaprzyjaźnione pojazdy. Zapewniamy koordynację szoferów i synchronizację tras.',
      },
    },
  ],
}

const mazowieckieCities = [
  { city: 'Radom', href: '/auto-do-slubu-radom' },
  { city: 'Warszawa', href: '/auto-do-slubu-warszawa' },
  { city: 'Grójec', href: null },
  { city: 'Kozienice', href: null },
  { city: 'Białobrzegi', href: null },
  { city: 'Zwoleń', href: null },
  { city: 'Pionki', href: null },
  { city: 'Szydłowiec', href: null },
  { city: 'Przysucha', href: null },
  { city: 'Nowe Miasto nad Pilicą', href: null },
  { city: 'Lipsko', href: null },
  { city: 'Iłża', href: null },
  { city: 'Pruszków', href: null },
  { city: 'Piaseczno', href: null },
  { city: 'Płońsk', href: null },
  { city: 'Ciechanów', href: null },
  { city: 'Siedlce', href: null },
  { city: 'Garwolin', href: null },
]

export default function MazowieckiePage() {
  return (
    <>
      <SEO
        title="Auto do Ślubu Mazowieckie — Wynajem BMW | Złota Kareta"
        description="Wynajem auta do ślubu w całym województwie mazowieckim. BMW z szoferem — Radom, Warszawa, Grójec, Kozienice i okolice. Bezpłatna dekoracja. ☎ +48 501 234 567"
        canonical="https://autodoslubuwarszawa.pl/auto-do-slubu-mazowieckie"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* HERO */}
      <section className="location-hero" aria-label="Auto do ślubu Mazowieckie">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol className="breadcrumb__list">
              <li><Link to="/">Strona główna</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page">Auto do ślubu Mazowieckie</li>
            </ol>
          </nav>
          <span className="hero__eyebrow">Wynajem auta ślubnego — całe Mazowsze</span>
          <h1 className="location-hero__title">
            Auto do Ślubu <span className="gold-text">Mazowieckie</span>
          </h1>
          <p className="location-hero__subtitle">
            Obsługujemy wynajem auta do ślubu w całym województwie mazowieckim — od Radomia i Warszawy,
            przez Grójec, Kozienice, Białobrzegi, aż po Siedlce i Ostrołękę. Luksusowe BMW z eleganckim
            szoferem dotrze do Ciebie, gdziekolwiek na Mazowszu organizujesz ślub.
          </p>
          <div className="hero__cta">
            <a href="tel:+48501234567" className="btn btn-primary">📞 Zadzwoń teraz</a>
            <Link to="/kontakt" className="btn btn-outline">✉️ Zapytaj o termin</Link>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="location-content">
        <div className="container">
          <div className="location-content__grid">

            {/* LEFT: Rich text content */}
            <div className="location-content__text">
              <h2>Wynajem auta do ślubu na Mazowszu</h2>
              <p>
                Województwo mazowieckie to region pełen pięknych kościołów, dworków i sali weselnych.
                <strong> Złota Kareta</strong> to jedyna firma w regionie oferująca wynajem luksusowych BMW
                z szoferem obejmujący całe Mazowsze — od Radomia na południu, przez Warszawę, aż po
                najdalsze zakątki województwa.
              </p>
              <p>
                Niezależnie od tego, czy ślub odbywa się w małej wiosce pod Kozienicami, czy w prestiżowej
                sali weselnej w centrum Warszawy — nasz kierowca dotrze punktualnie, a luksusowe BMW
                doda Waszej uroczystości wyjątkowego blasku.
              </p>

              <h3>Przewóz do ślubu Mazowieckie — co oferujemy?</h3>
              <ul className="location-list">
                <li>✅ Wynajem BMW z szoferem na całe Mazowsze</li>
                <li>✅ Bezpłatna dekoracja florystyczna w każdym pakiecie</li>
                <li>✅ Postój na sesję zdjęciową w wybranym miejscu</li>
                <li>✅ Bezpłatny dojazd w promieniu 50 km od Radomia lub Warszawy</li>
                <li>✅ Korteze weselne — kilka aut naraz</li>
                <li>✅ Obsługa wesel w województwach sąsiednich</li>
              </ul>

              <h3>Popularne lokalizacje ślubne na Mazowszu</h3>
              <p>
                Na Mazowszu nie brakuje wyjątkowych miejsc do ślubu i sesji zdjęciowych.
                Obsługujemy m.in.:
              </p>
              <ul className="location-list">
                <li>🏰 Dworki i pałace — Wilanów, Radziejowice, Opinogóra</li>
                <li>⛪ Historyczne kościoły — Radom, Warszawa, Grójec</li>
                <li>🌿 Plenerowe ceremononie — nad Wisłą, w Puszczy Kampinoskiej</li>
                <li>🏨 Sale weselne — hotel, stajnia, winnica, stodoła</li>
              </ul>

              <h3>Kortez weselny na Mazowszu</h3>
              <p>
                Organizujemy eleganckie korteze weselne na terenie całego Mazowsza.
                Nasz cortège z dwóch BMW robi niesamowite wrażenie. Zapewniamy:
                koordynację szoferów, synchronizację tras, punktualność i profesjonalizm.
                Jeśli potrzebujesz więcej niż dwóch pojazdów, skontaktuj się z nami — mamy
                zaprzyjaźnione firmy z którymi współpracujemy.
              </p>

              <h3>Wszystkie miasta w województwie mazowieckim — nasz obszar obsługi</h3>
              <p>
                Obsługujemy wynajem auta do ślubu w następujących miastach i gminach Mazowsza:
              </p>
              <div className="location-cities">
                {mazowieckieCities.map(({ city, href }) => (
                  href
                    ? <Link key={city} to={href} className="location-city-tag location-city-tag--link">📍 {city}</Link>
                    : <span key={city} className="location-city-tag">📍 {city}</span>
                ))}
              </div>

              <h3>Obsługujemy też sąsiednie województwa</h3>
              <p>
                Nie ograniczamy się tylko do Mazowsza. Obsługujemy również wesela w województwach
                łódzkim, świętokrzyskim i lubelskim. W takich przypadkach ustalamy indywidualną
                cenę zależną od trasy. Zadzwoń lub napisz po wycenę.
              </p>
            </div>

            {/* RIGHT: Contact card */}
            <aside className="location-sidebar">
              <div className="location-sidebar__card">
                <h3>Zapytaj o termin na Mazowszu</h3>
                <p>Wolne terminy 2026 / 2027 — rezerwuj z wyprzedzeniem!</p>
                <a href="tel:+48501234567" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }}>
                  📞 +48 501 234 567
                </a>
                <Link to="/kontakt" className="btn btn-outline" style={{ display: 'block', textAlign: 'center' }}>
                  ✉️ Formularz kontaktowy
                </Link>
                <hr style={{ margin: '1.5rem 0', borderColor: 'var(--gold)', opacity: 0.3 }} />
                <ul className="location-sidebar__features">
                  <li>🚗 BMW 650i Gran Coupé lub BMW 4 Cabrio</li>
                  <li>💐 Bezpłatna dekoracja kwiatowa</li>
                  <li>📸 Postój na sesję zdjęciową</li>
                  <li>👨‍✈️ Elegancki szofer w cenie</li>
                  <li>🗺️ Całe Mazowsze bez dopłat w 50 km</li>
                </ul>
              </div>
              <div className="location-sidebar__rating">
                <div className="location-sidebar__stars">★★★★★</div>
                <p><strong>5,0/5</strong> — na podstawie 85 opinii par z Mazowsza</p>
              </div>
              <div className="location-sidebar__links">
                <h4>Dedykowane strony lokalne:</h4>
                <Link to="/auto-do-slubu-radom" className="location-sidebar__city-link">
                  → Auto do ślubu Radom
                </Link>
                <Link to="/auto-do-slubu-warszawa" className="location-sidebar__city-link">
                  → Auto do ślubu Warszawa
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" aria-labelledby="mazowieckie-faq-title" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container">
          <h2 className="section-title" id="mazowieckie-faq-title">Pytania — wynajem auta do ślubu Mazowieckie</h2>
          <div className="section-divider" aria-hidden="true"></div>
          <div className="faq__list">
            {faqSchema.mainEntity.map((item, i) => (
              <div className="faq-item faq-item--open" key={i}>
                <div className="faq-item__question" style={{ cursor: 'default' }}>
                  {item.name}
                </div>
                <div className="faq-item__answer" style={{ display: 'block' }}>
                  <div className="faq-item__answer-inner">
                    <p>{item.acceptedAnswer.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta" aria-labelledby="mazowieckie-cta-title">
        <div className="container">
          <span className="cta__eyebrow">Obsługujemy całe Mazowsze — 2026 / 2027</span>
          <h2 className="cta__title" id="mazowieckie-cta-title">Zarezerwuj Auto do Ślubu na Mazowszu</h2>
          <p className="cta__subtitle">
            Gdziekolwiek na Mazowszu organizujesz swój ślub — dotrzemy do Ciebie z luksusowym BMW.
            Zadzwoń i sprawdź dostępność terminu.
          </p>
          <a className="cta__phone" href="tel:+48501234567">📞 +48 501 234 567</a>
          <div className="cta__actions">
            <Link to="/kontakt" className="btn btn-dark">✉️ Napisz do nas</Link>
            <a href="tel:+48501234567" className="btn btn-dark">📞 Zadzwoń teraz</a>
          </div>
        </div>
      </section>
    </>
  )
}
