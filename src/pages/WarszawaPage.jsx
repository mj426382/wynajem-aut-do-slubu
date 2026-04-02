import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Strona główna', item: 'https://autodoslubuwarszawa.pl' },
    { '@type': 'ListItem', position: 2, name: 'Auto do ślubu Warszawa', item: 'https://autodoslubuwarszawa.pl/auto-do-slubu-warszawa' },
  ],
}

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://autodoslubuwarszawa.pl/auto-do-slubu-warszawa#business',
  name: 'AutoDoŚlubu Warszawa & Radom — Auto do Ślubu Warszawa',
  description: 'Wynajem luksusowego auta do ślubu w Warszawie — BMW 650i xDrive Gran Coupé F06 i BMW 4 Cabrio G23 z szoferem. Obsługujemy całą Warszawę i aglomerację.',
  url: 'https://autodoslubuwarszawa.pl/auto-do-slubu-warszawa',
  telephone: '+48881358838',
  email: 'janmat.jdg@gmail.com',
  areaServed: ['Warszawa', 'Mokotów', 'Wilanów', 'Żoliborz', 'Ursynów', 'Praga', 'Wola', 'Białołęka', 'Pruszków', 'Piaseczno', 'Legionowo'],
  priceRange: '$$',
  openingHoursSpecification: [
    { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday'], opens: '09:00', closes: '18:00' },
    { '@type': 'OpeningHoursSpecification', dayOfWeek: 'Saturday', opens: '10:00', closes: '14:00' },
  ],
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '38', bestRating: '5', worstRating: '1' },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Ile kosztuje wynajem auta do ślubu w Warszawie?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ceny wynajmu auta do ślubu w Warszawie zaczynają się od 1000 zł za pakiet podstawowy (3 godziny z szoferem). W cenie zawarta jest dekoracja florystyczna i postój na sesję zdjęciową.',
      },
    },
    {
      '@type': 'Question',
      name: 'Czy obsługujecie śluby we wszystkich dzielnicach Warszawy?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tak, obsługujemy śluby we wszystkich dzielnicach Warszawy — Mokotów, Wilanów, Żoliborz, Ursynów, Praga, Wola, Białołęka i inne. Nasz szofer zna Warszawę i trasy alternatywne przy korkach.',
      },
    },
    {
      '@type': 'Question',
      name: 'Jakie miejsca na sesję zdjęciową w Warszawie polecacie?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Polecamy Stare Miasto, Łazienki Królewskie, Wilanów, Plac Zamkowy i bulwary wiślane. Nasz szofer zatrzyma się w wybranym przez Was miejscu bez pośpiechu.',
      },
    },
  ],
}

const warsawCities = [
  'Mokotów', 'Wilanów', 'Ursynów', 'Żoliborz', 'Wola', 'Praga Południe',
  'Pruszków', 'Piaseczno', 'Legionowo', 'Łomianki', 'Marki', 'Ząbki',
]

export default function WarszawaPage() {
  return (
    <>
      <SEO
        title="Auto do Ślubu Warszawa — Luksusowe BMW z Szoferem | AutoDoŚlubu Warszawa & Radom"
        description="Wynajem luksusowego auta do ślubu w Warszawie. BMW 650i Gran Coupé i BMW 4 Cabrio z profesjonalnym szoferem. Wszystkie dzielnice Warszawy. Bezpłatna dekoracja. ☎ +48 881 358 838"
        canonical="https://autodoslubuwarszawa.pl/auto-do-slubu-warszawa"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(localBusinessSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      {/* HERO */}
      <section className="location-hero" aria-label="Auto do ślubu Warszawa">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <ol className="breadcrumb__list">
              <li><Link to="/">Strona główna</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page">Auto do ślubu Warszawa</li>
            </ol>
          </nav>
          <span className="hero__eyebrow">Wynajem auta ślubnego — Warszawa i aglomeracja</span>
          <h1 className="location-hero__title">
            Auto do Ślubu <span className="gold-text">Warszawa</span>
          </h1>
          <p className="location-hero__subtitle">
            Wynajem luksusowego samochodu do ślubu w Warszawie — BMW z eleganckim szoferem,
            który zna stolicę i zaplanuje trasę bez stresu o korki. Bezpłatna dekoracja florystyczna
            i postój na sesję zdjęciową w najpiękniejszych miejscach Warszawy.
          </p>
          <div className="hero__cta">
            <a href="tel:+48881358838" className="btn btn-primary">📞 Zadzwoń teraz</a>
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
              <h2>Luksusowy samochód ślubny w Warszawie</h2>
              <p>
                Warszawa to wyjątkowe miejsce na ślub — historyczne kościoły, piękne pałace, nowoczesne sale.
                <strong> AutoDoŚlubu Warszawa & Radom</strong> zapewni Wam luksusowe auto do ślubu w Warszawie,
                które dopełni ten wyjątkowy dzień. Nasz szofer doskonale zna stolicę — dzielnice,
                trasy alternatywne i miejsca na piękne zdjęcia.
              </p>
              <p>
                Wynajem samochodu do ślubu w Warszawie to decyzja, która wpływa na cały klimat uroczystości.
                Efektowne BMW przy wejściu do kościoła, elegancki przyjazd na wesele i niezapomniane ujęcia
                fotograficzne — to wszystko oferujemy w pakiecie.
              </p>

              <h3>Dlaczego AutoDoŚlubu Warszawa & Radom to najlepsze auto do ślubu w Warszawie?</h3>
              <ul className="location-list">
                <li>✅ Szofer znający Warszawę — alternatywne trasy przy korkach</li>
                <li>✅ Bezpłatna elegancka dekoracja florystyczna</li>
                <li>✅ Postój w Łazienkach, Starówce lub innym wybranym miejscu</li>
                <li>✅ Dwa BMW do wyboru — Gran Coupé lub Cabrio</li>
                <li>✅ Obsługa wszystkich dzielnic Warszawy</li>
                <li>✅ Organizacja kortezów weselnych</li>
              </ul>

              <h3>Popularne kościoły ślubne w Warszawie</h3>
              <p>
                Obsługujemy śluby w Warszawie we wszystkich głównych kościołach i miejscach ceremonii:
                Kościół Świętego Krzyża na Krakowskim Przedmieściu, Katedra Świętego Jana na Starym Mieście,
                Kościół Wizytek, Basilica Świętej Anny, Urząd Stanu Cywilnego przy placu Zamkowym,
                a także w kościołach w Wilanowie, Mokotowie, Żoliborzu i innych dzielnicach.
              </p>

              <h3>Sale weselne w Warszawie — nasz obszar obsługi</h3>
              <p>
                Dowozimy Pary Młode do wszystkich prestiżowych miejsc w Warszawie: Hotel Bristol,
                Hotel Sheraton, restauracje na Starym Mieście, Pałac Wilanów, obiekty na Mokotowie,
                Ursynowie, Woli i Pradze. Nasz szofer jest punktualny i dotrze zawsze z wyprzedzeniem.
              </p>

              <h3>Sesja zdjęciowa z autem ślubnym w Warszawie</h3>
              <p>
                Warszawa oferuje niezliczone ikony na zdjęcia ślubne. Zatrzymamy się w wybranym miejscu,
                aby fotograf miał czas na idealne kadry:
              </p>
              <ul className="location-list">
                <li>📸 Stare Miasto — brukowane uliczki i kolorowe kamienice</li>
                <li>📸 Łazienki Królewskie — pałac na wodzie i park</li>
                <li>📸 Plac Zamkowy — Kolumna Zygmunta i Zamek Królewski</li>
                <li>📸 Wilanów — barokowy pałac i ogrody</li>
                <li>📸 Bulwary Wiślane — panorama Warszawy</li>
              </ul>

              <h3>Obszar obsługi — Warszawa i okolice</h3>
              <p>
                Obsługujemy wynajem auta do ślubu w całej Warszawie i aglomeracji bez dopłat w promieniu 50 km:
              </p>
              <div className="location-cities">
                {warsawCities.map((city) => (
                  <span key={city} className="location-city-tag">📍 {city}</span>
                ))}
              </div>
            </div>

            {/* RIGHT: Contact card */}
            <aside className="location-sidebar">
              <div className="location-sidebar__card">
                <h3>Zapytaj o termin w Warszawie</h3>
                <p>Wolne terminy 2026 / 2027 — rezerwuj z wyprzedzeniem!</p>
                <a href="tel:+48881358838" className="btn btn-primary" style={{ display: 'block', textAlign: 'center', marginBottom: '1rem' }}>
                  📞 +48 881 358 838
                </a>
                <Link to="/kontakt" className="btn btn-outline" style={{ display: 'block', textAlign: 'center' }}>
                  ✉️ Formularz kontaktowy
                </Link>
                <hr style={{ margin: '1.5rem 0', borderColor: 'var(--gold)', opacity: 0.3 }} />
                <ul className="location-sidebar__features">
                  <li>🚗 BMW 650i Gran Coupé lub BMW 4 Cabrio</li>
                  <li>💐 Bezpłatna dekoracja kwiatowa</li>
                  <li>📸 Postój na sesję zdjęciową</li>
                  <li>👨‍✈️ Szofer znający Warszawę</li>
                  <li>🏙️ Wszystkie dzielnice Warszawy</li>
                </ul>
              </div>
              <div className="location-sidebar__rating">
                <div className="location-sidebar__stars">★★★★★</div>
                <p><strong>5,0/5</strong> — na podstawie 38 opinii par z Warszawy</p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FLEET */}
      <section className="fleet" aria-labelledby="warsaw-fleet-title" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container">
          <h2 className="section-title" id="warsaw-fleet-title">Samochody do Ślubu dostępne w Warszawie</h2>
          <div className="section-divider" aria-hidden="true"></div>
          <div className="fleet__grid">
            <article className="fleet-card">
              <div className="fleet-card__emoji" aria-hidden="true">🏆</div>
              <div className="fleet-card__body">
                <p className="fleet-card__subtitle">Ekskluzywne auto ślubne — Warszawa</p>
                <h3 className="fleet-card__title">BMW 650i xDrive Gran Coupé (F06)</h3>
                <p className="fleet-card__desc">
                  Prestiżowe luksusowe auto do ślubu w Warszawie — czterodrzwiowe coupé z silnikiem V8 450 KM.
                  Robi wrażenie przy każdym kościele w stolicy i jest doskonałym tłem do zdjęć
                  przy zabytkach Warszawy. Elegancja przez cały rok.
                </p>
                <ul className="fleet-card__features">
                  <li>Silnik V8 450 KM — napęd xDrive 4×4</li>
                  <li>Skórzana tapicerka Merino (kość słoniowa)</li>
                  <li>Panoramiczny szklany dach</li>
                  <li>Bezpłatna dekoracja florystyczna</li>
                </ul>
                <Link to="/kontakt" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>
                  Zapytaj o dostępność w Warszawie
                </Link>
              </div>
            </article>
            <article className="fleet-card">
              <div className="fleet-card__emoji" aria-hidden="true">🌹</div>
              <div className="fleet-card__body">
                <p className="fleet-card__subtitle">Romantyczny kabriolet — ślub w Warszawie</p>
                <h3 className="fleet-card__title">BMW 4 Cabrio (G23)</h3>
                <p className="fleet-card__desc">
                  Wynajmij kabriolet na ślub w Warszawie — idealny na letnie uroczystości.
                  Przyjazd pod kościół z otwartym dachem przy Krakowskim Przedmieściu
                  to widok, który Wasi goście zapamiętają na zawsze.
                </p>
                <ul className="fleet-card__features">
                  <li>Elektryczny dach — otwiera się w 18 sek.</li>
                  <li>Jazda z odkrytym dachem do 50 km/h</li>
                  <li>Skórzana tapicerka w jasnym kolorze</li>
                  <li>Podgrzewane fotele i ogrzewanie szyi</li>
                </ul>
                <Link to="/kontakt" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>
                  Zapytaj o dostępność w Warszawie
                </Link>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq" aria-labelledby="warsaw-faq-title" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container">
          <h2 className="section-title" id="warsaw-faq-title">Często zadawane pytania — auto do ślubu Warszawa</h2>
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
      <section className="cta" aria-labelledby="warsaw-cta-title">
        <div className="container">
          <span className="cta__eyebrow">Wolne terminy 2026 / 2027 — Warszawa</span>
          <h2 className="cta__title" id="warsaw-cta-title">Zarezerwuj Auto do Ślubu w Warszawie</h2>
          <p className="cta__subtitle">
            Terminy na wynajem auta do ślubu w Warszawie wyprzedają się szybko — szczególnie popularne soboty
            w sezonie letnim. Zarezerwuj swój termin już dziś.
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
