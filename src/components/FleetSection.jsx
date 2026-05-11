import { Link } from 'react-router-dom'

const cars = [
  {
    id: 1,
    slug: 'bmw-650i-gran-coupe',
    image: 'https://github.com/user-attachments/assets/6c36b836-e7fb-4ee4-8de3-a218fe13ee09',
    imageAlt: 'BMW 650i xDrive Gran Coupé – luksusowe auto do ślubu udekorowane białymi kwiatami przed kościołem',
    name: 'BMW 650i xDrive Gran Coupé (F06)',
    subtitle: 'Auto do ślubu Radom i Warszawa',
    description:
      'Majestatyczny BMW 650i xDrive Gran Coupé to kwintesencja luksusu i sportowej elegancji. Czterodrzwiowe coupé napędzane potężnym silnikiem V8 o mocy 450 KM z układem xDrive gwarantuje niezapomniane wejście w każdych warunkach pogodowych. Brązowa skórzana tapicerka, podgrzewane fotele i hipnotyzujący dźwięk sportowego wydechu sprawią, że Wasza droga do ołtarza stanie się wyjątkowym przeżyciem.',
    features: [
      'Silnik V8 450 KM – napęd xDrive 4×4',
      'Ekskluzywna skórzana tapicerka w kolorze brązowym',
      'Podgrzewane fotele przednie i tylne',
      'Sportowy wydech – niepowtarzalny, głęboki dźwięk V8',
      'System audio Harman Kardon',
      'Bezpłatna dekoracja florystyczna w cenie',
    ],
  },
  {
    id: 2,
    slug: 'bmw-4-cabrio',
    image: 'https://github.com/user-attachments/assets/eaa61a2e-36d7-4787-8f85-37ab038848ff',
    imageAlt: 'BMW 4 Cabrio G23 – białe auto ślubne z odkrytym dachem przed kościołem',
    name: 'BMW 4 Cabrio (G23)',
    subtitle: 'Romantyczne auto ślubne – kabriolet',
    description:
      'BMW 4 Cabrio G23 to ucieleśnienie romantyzmu i prestiżu – idealne dla Par, które pragną wyróżnić się w wielkim dniu. Elektryczny miękki dach otwiera się w zaledwie 18 sekund, a ekskluzywna koniakowa tapicerka skórzana tworzy wyjątkową, ciepłą atmosferę w kabinie. Stylowy pakiet zewnętrzny Maxton Design nadaje kabrioletowi agresywnego, sportowego charakteru, który zachwyci każdego gościa i zagwarantuje zjawiskowe zdjęcia ślubne.',
    features: [
      'Elektryczny dach miękki – otwiera się w 18 sek.',
      'Luksusowa tapicerka skórzana w kolorze koniaku',
      'Pakiet aerodynamiczny Maxton Design',
      'Jazda z odkrytym dachem do 50 km/h',
      'Podgrzewane fotele i ogrzewanie szyi',
      'System audio Hi-Fi BMW',
    ],
  },
]

export default function FleetSection() {
  return (
    <section className="fleet" id="flota" aria-labelledby="fleet-title">
      <div className="container">
        <h2 className="section-title" id="fleet-title">Samochody do Ślubu — Radom i Warszawa</h2>
        <div className="section-divider" aria-hidden="true"></div>
        <p className="section-subtitle">
          Dwa ekskluzywne BMW do wynajęcia na ślub — eleganckie Gran Coupé lub romantyczne Cabrio.
          Obsługujemy Radom, Warszawę i całe Mazowsze. Każde auto starannie przygotowane i udekorowane na Twój wielki dzień.
        </p>
        <div className="fleet__grid">
          {cars.map((car) => (
            <article className="fleet-card" key={car.id}>
              <div className="fleet-card__image-wrap">
                <img
                  src={car.image}
                  alt={car.imageAlt}
                  className="fleet-card__image"
                  loading="lazy"
                  width="800"
                  height="534"
                />
              </div>
              <div className="fleet-card__body">
                <p className="fleet-card__subtitle">{car.subtitle}</p>
                <h3 className="fleet-card__title">{car.name}</h3>
                <p className="fleet-card__desc">{car.description}</p>
                <ul className="fleet-card__features" aria-label={`Cechy: ${car.name}`}>
                  {car.features.map((f, i) => (
                    <li className="fleet-card__feature" key={i}>{f}</li>
                  ))}
                </ul>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <Link to={`/flota/${car.slug}`} className="btn btn-outline" style={{ display: 'block', textAlign: 'center' }}>
                    📸 Zobacz galerię
                  </Link>
                  <Link to="/kontakt" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>
                    Zapytaj o dostępność
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
