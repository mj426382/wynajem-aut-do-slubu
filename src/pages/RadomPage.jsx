import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://autodoslubuwarszawa.pl' },
    { '@type': 'ListItem', position: 2, name: 'Auto do ślubu Radom', item: 'https://autodoslubuwarszawa.pl/auto-do-slubu-radom' },
  ],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://autodoslubuwarszawa.pl/auto-do-slubu-radom#business',
  name: 'Złota Kareta — Auto do Ślubu Radom',
  description: 'Wynajem luksusowego auta do ślubu w Radomiu — BMW 650i xDrive Gran Coupé F06 i BMW 4 Cabrio G23 z szoferem. Obsługujemy Radom i okolice.',
  url: 'https://autodoslubuwarszawa.pl/auto-do-slubu-radom',
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
  areaServed: ['Radom', 'Kozienice', 'Białobrzegi', 'Zwoleń', 'Pionki', 'Grójec', 'Nowe Miasto nad Pilicą'],
  priceRange: '$$',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '14:00' },
  ],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '47', bestRating: '5', worstRating: '1' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Ile kosztuje wynajem auta do ślubu w Radomiu?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ceny wynajmu auta do ślubu w Radomiu zaczynają się od 800 zł za pakiet podstawowy (3 godziny z szoferem). W cenie zawsze zawarta jest dekoracja florystyczna i postój na sesję zdjęciową.',
      },
    },
    {
      '@type': 'Question',
      name: 'Jakie auta do ślubu oferujecie w Radomiu?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'W Radomiu oferujemy wynajem BMW 650i xDrive Gran Coupé (F06) z silnikiem V8 450 KM oraz BMW 4 Cabrio (G23) — elegancki kabriolet idealny na ciepłe wesela.',
      },
    },
    {
      '@type': 'Question',
      name: 'Jaki obszar obejmuje wynajem auta do ślubu z Radomia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Obsługujemy wynajem auta do ślubu z Radomia w promieniu 50 km bez dopłat — Kozienice, Białobrzegi, Zwoleń, Pionki, Grójec, Nowe Miasto nad Pilicą i okolice.',
      },
    },
  ],
}

const radomCities = [
  'Kozienice', 'Białobrzegi', 'Zwoleń', 'Pionki', 'Grójec',
  'Nowe Miasto nad Pilicą', 'Przysucha', 'Szydłowiec', 'Lipsko', 'Iłża',
]

export default function RadomPage() {
  return (
    <>
      <SEO
        title="Auto do Ślubu Radom — BMW z Szoferem | Złota Kareta"
        description="Wynajem luksusowego auta do ślubu w Radomiu. BMW 650i Gran Coupé i BMW 4 Cabrio z eleganckim szoferem. Bezpłatna dekoracja kwiatowa. Obsługujemy Radom i okolice 50 km. ☎ +48 501 234 567"
        canonical="https://autodoslubuwarszawa.pl/auto-do-slubu-radom"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* HERO */}
      <section className="location-hero" aria-label="Auto do ślubu Radom">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol className="breadcrumb__list">
              <li><Link to="/">Strona główna</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page">Auto do ślubu Radom</li>
            </ol>
          </nav>
          <span className="hero__eyebrow">Wynajem auta ślubnego — Radom i okolice</span>
          <h1 className="location-hero__title">
            Auto do Ślubu <span className="gold-text">Radom</span>
          </h1>
          <p className="location-hero__subtitle">
            Oferujemy eleganckie auto do ślubu w Radomiu i okolicach — luksusowe BMW z profesjonalnym szoferem,
            bezpłatną dekoracją kwiatową i postojem na sesję zdjęciową. Twój wymarzony dzień zasługuje na wyjątkowy samochód.
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
              <h2>Luksusowe auto do ślubu w Radomiu</h2>
              <p>
                Szukasz eleganckiego samochodu na swój ślub w Radomiu? <strong>Złota Kareta</strong> to radomska firma
                specjalizująca się w wynajmie luksusowych BMW do ślubu. Od ponad 14 lat dowozimy Pary Młode
                do największych kościołów i sal weselnych w Radomiu i całym regionie.
              </p>
              <p>
                Nasz samochód ślubny w Radomiu to coś więcej niż tylko transport — to element uroczystości,
                który zostanie zapamiętany przez wszystkich gości. Piękne BMW przy wejściu do kościoła,
                efektowny przyjazd na wesele i niezapomniane zdjęcia z luksusowym autem w tle.
              </p>

              <h3>Dlaczego warto wybrać nasze auto do ślubu w Radomiu?</h3>
              <ul className="location-list">
                <li>✅ Profesjonalny szofer — elegancki, punktualny, dyskretny</li>
                <li>✅ Bezpłatna dekoracja florystyczna w cenie wynajmu</li>
                <li>✅ Postój na sesję zdjęciową — bez pośpiechu</li>
                <li>✅ Dwa luksusowe BMW do wyboru</li>
                <li>✅ Bezpłatny dojazd w promieniu 50 km od Radomia</li>
                <li>✅ Rezerwacja z potwierdzeniem zadatkiem</li>
              </ul>

              <h3>Popularne kościoły ślubne w Radomiu</h3>
              <p>
                Obsługujemy śluby w Radomiu we wszystkich głównych kościołach — Katedra Opieki NMP,
                Bazylika Świętego Kazimierza, Kościół Świętego Krzyża, Kościół Garnizonowy,
                Parafia Najświętszego Serca Jezusowego. Znamy każdą trasę i zaplanujemy dojazd
                z odpowiednim buforem czasowym, abyś nie musiał się o nic martwić.
              </p>

              <h3>Sale weselne obsługiwane w Radomiu i okolicach</h3>
              <p>
                Dowozimy Pary Młode do sal weselnych w Radomiu i okolicach: Dworek pod Różami,
                Villa Palma, Hotel Aviator, Stara Mleczarnia, a także do obiektów w Kozienicach,
                Białobrzegach i Grójcu. Znamy wszystkie trasy i zadbamy o Wasz komfort i punktualność.
              </p>

              <h3>Sesja zdjęciowa z autem ślubnym w Radomiu</h3>
              <p>
                Radom oferuje piękne miejsca na sesję zdjęciową z luksusowym autem ślubnym.
                Polecamy Park Leśniczówka, Skansen nad Łączną, okolice Katedry, a także malownicze
                tereny podmiejskie. Nasz szofer zatrzyma się dokładnie tam, gdzie chcecie — dając
                fotografowi czas na idealne ujęcia.
              </p>

              <h3>Obszar obsługi — Radom i okolice</h3>
              <p>
                Wynajem auta do ślubu z Radomia obejmuje całą okolicę bez dopłat w promieniu 50 km.
                Obsługujemy między innymi:
              </p>
              <div className="location-cities">
                {radomCities.map((city) => (
                  <span key={city} className="location-city-tag">📍 {city}</span>
                ))}
              </div>
            </div>

            {/* RIGHT: Contact card */}
            <aside className="location-sidebar">
              <div className="location-sidebar__card">
                <h3>Zapytaj o termin w Radomiu</h3>
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
                  <li>📍 50 km od Radomia bez dopłat</li>
                </ul>
              </div>
              <div className="location-sidebar__rating">
                <div className="location-sidebar__stars">★★★★★</div>
                <p><strong>5,0/5</strong> — na podstawie 47 opinii par z Radomia</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section className="fleet" aria-labelledby="radom-fleet-title" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container">
          <h2 className="section-title" id="radom-fleet-title">Samochody do Ślubu dostępne w Radomiu</h2>
          <div className="section-divider" aria-hidden="true"></div>
          <div className="fleet__grid">
            <article className="fleet-card">
              <div className="fleet-card__emoji" aria-hidden="true">🏆</div>
              <div className="fleet-card__body">
                <p className="fleet-card__subtitle">Ekskluzywne auto ślubne — Radom</p>
                <h3 className="fleet-card__title">BMW 650i xDrive Gran Coupé (F06)</h3>
                <p className="fleet-card__desc">
                  Idealne luksusowe auto do ślubu w Radomiu — czterodrzwiowe coupé z silnikiem V8 450 KM
                  i napędem 4×4. Eleganckie przez cały rok, zarówno wiosną jak i jesienią. Imponujące przy wejściu
                  do kościoła i niezapomniane w kadrach fotograficznych.
                </p>
                <ul className="fleet-card__features">
                  <li>Silnik V8 450 KM — napęd xDrive 4×4</li>
                  <li>Skórzana tapicerka Merino (kość słoniowa)</li>
                  <li>Panoramiczny szklany dach</li>
                  <li>Bezpłatna dekoracja florystyczna</li>
                </ul>
                <Link to="/kontakt" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>
                  Zapytaj o dostępność w Radomiu
                </Link>
              </div>
            </article>
            <article className="fleet-card">
              <div className="fleet-card__emoji" aria-hidden="true">🌹</div>
              <div className="fleet-card__body">
                <p className="fleet-card__subtitle">Romantyczny kabriolet — ślub w Radomiu</p>
                <h3 className="fleet-card__title">BMW 4 Cabrio (G23)</h3>
                <p className="fleet-card__desc">
                  Wynajmij kabriolet na ślub w Radomiu — elektryczny miękki dach otwiera się w 18 sekund.
                  Idealny na letnie wesela. Przyjedź pod kościół z wiatrem we włosach i zrób zdjęcia,
                  które będą olśniewać przez lata.
                </p>
                <ul className="fleet-card__features">
                  <li>Elektryczny dach — otwiera się w 18 sek.</li>
                  <li>Jazda z odkrytym dachem do 50 km/h</li>
                  <li>Skórzana tapicerka w jasnym kolorze</li>
                  <li>Podgrzewane fotele i ogrzewanie szyi</li>
                </ul>
                <Link to="/kontakt" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>
                  Zapytaj o dostępność w Radomiu
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" aria-labelledby="radom-faq-title" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container">
          <h2 className="section-title" id="radom-faq-title">Często zadawane pytania — auto do ślubu Radom</h2>
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
      <section className="cta" aria-labelledby="radom-cta-title">
        <div className="container">
          <span className="cta__eyebrow">Wolne terminy 2026 / 2027 — Radom</span>
          <h2 className="cta__title" id="radom-cta-title">Zarezerwuj Auto do Ślubu w Radomiu</h2>
          <p className="cta__subtitle">
            Terminy na wynajem auta do ślubu w Radomiu wyprzedają się z dużym wyprzedzeniem — szczególnie w sezonie maj–wrzesień.
            Zadzwoń lub napisz, zanim Twój termin zostanie zajęty.
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
