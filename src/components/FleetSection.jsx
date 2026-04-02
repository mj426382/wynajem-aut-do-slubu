import { Link } from 'react-router-dom'

const cars = [
  {
    id: 1,
    emoji: '🏆',
    name: 'BMW 650i xDrive Gran Coupé (F06)',
    subtitle: 'Auto do ślubu Radom i Warszawa',
    description:
      'Szukasz luksusowego auta do ślubu w Radomiu lub Warszawie? BMW 650i xDrive Gran Coupé (F06) to czterodrzwiowe coupé z silnikiem V8 450 KM i napędem xDrive. Imponujące i eleganckie – idealne jako samochód ślubny na każdą pogodę, zarówno wiosną, jak i jesienią.',
    features: [
      'Silnik V8 450 KM – napęd xDrive 4×4',
      'Skórzana tapicerka Merino w kolorze kości słoniowej',
      'Panoramiczny szklany dach',
      'System audio Harman Kardon',
      'Bezpłatna dekoracja florystyczna w cenie',
    ],
  },
  {
    id: 2,
    emoji: '🌹',
    name: 'BMW 4 Cabrio (G23)',
    subtitle: 'Romantyczne auto ślubne – kabriolet',
    description:
      'Wynajmij kabriolet na ślub w Radomiu lub Warszawie! BMW 4 Cabrio G23 z elektrycznym miękkim dachem otwierającym się w 18 sekund to najromantyczniejszy wybór na ciepłe wesela. Przyjedź pod kościół lub plener z wiatrem we włosach – zdjęcia będą zachwycające.',
    features: [
      'Elektryczny dach miękki – otwiera się w 18 sek.',
      'Jazda z odkrytym dachem do 50 km/h',
      'Skórzana tapicerka w jasnym kolorze',
      'System audio Hi-Fi BMW',
      'Podgrzewane fotele i ogrzewanie szyi',
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
              <div className="fleet-card__emoji" aria-hidden="true">{car.emoji}</div>
              <div className="fleet-card__body">
                <p className="fleet-card__subtitle">{car.subtitle}</p>
                <h3 className="fleet-card__title">{car.name}</h3>
                <p className="fleet-card__desc">{car.description}</p>
                <ul className="fleet-card__features" aria-label={`Cechy: ${car.name}`}>
                  {car.features.map((f, i) => (
                    <li className="fleet-card__feature" key={i}>{f}</li>
                  ))}
                </ul>
                <Link to="/kontakt" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>
                  Zapytaj o dostępność
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
