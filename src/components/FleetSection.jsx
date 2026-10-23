import { Link } from 'react-router-dom'
import { CARS } from '../data/site'

const DETAILS = {
  'bmw-650i-gran-coupe': {
    subtitle: 'Prestiż i moc — na każdą porę roku',
    description:
      'Czterodrzwiowe coupé z silnikiem V8 450 KM i napędem xDrive. Brązowa skórzana tapicerka, podgrzewane fotele i głęboki dźwięk sportowego wydechu. Wygląda imponująco pod każdym kościołem i w każdym kadrze, a 4×4 daje pewność jazdy także w deszczu i zimą.',
    features: ['Silnik V8 450 KM, napęd xDrive 4×4', 'Skórzana tapicerka, podgrzewane fotele', 'System audio Harman Kardon', 'Panoramiczny szklany dach'],
  },
  'bmw-4-cabrio': {
    subtitle: 'Romantyczny kabriolet — na ciepłe miesiące',
    description:
      'Elektryczny miękki dach otwiera się w 18 sekund, koniakowa skóra i pakiet Maxton Design robią wrażenie na gościach i na zdjęciach. Wjazd pod kościół z otwartym dachem to kadr, który Para Młoda zapamiętuje na zawsze.',
    features: ['Elektryczny dach — 18 sekund', 'Koniakowa tapicerka skórzana', 'Podgrzewane fotele i ogrzewanie szyi', 'Pakiet aerodynamiczny Maxton Design'],
  },
}

export default function FleetSection({ title = 'Samochody do ślubu — BMW z szoferem', subtitle }) {
  return (
    <section className="fleet" id="flota" aria-labelledby="fleet-title">
      <div className="container">
        <h2 className="section-title" id="fleet-title">{title}</h2>
        <div className="section-divider" aria-hidden="true"></div>
        <p className="section-subtitle">
          {subtitle ?? 'Dwa BMW do wyboru: eleganckie Gran Coupé albo romantyczne Cabrio. Każde auto przyjeżdża umyte, udekorowane i z szoferem, który zna trasę.'}
        </p>
        <div className="fleet__grid">
          {CARS.map((car) => {
            const d = DETAILS[car.slug]
            return (
              <article className="fleet-card" key={car.slug}>
                <Link to={car.path} className="fleet-card__image-wrap" aria-label={`Zobacz ${car.name}`}>
                  <picture>
                    <source srcSet={car.imageWebp} type="image/webp" />
                    <img src={car.image} alt={car.imageAlt} className="fleet-card__image" loading="lazy" width="1600" height="1067" />
                  </picture>
                </Link>
                <div className="fleet-card__body">
                  <p className="fleet-card__subtitle">{d.subtitle}</p>
                  <h3 className="fleet-card__title">
                    <Link to={car.path}>{car.name}</Link>
                  </h3>
                  <p className="fleet-card__desc">{d.description}</p>
                  <ul className="fleet-card__features" aria-label={`Cechy: ${car.name}`}>
                    {d.features.map((f) => (
                      <li className="fleet-card__feature" key={f}>{f}</li>
                    ))}
                  </ul>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    <Link to={car.path} className="btn btn-gold-outline" style={{ display: 'block', textAlign: 'center' }}>
                      📸 Zdjęcia i szczegóły
                    </Link>
                    <Link to="/kontakt" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>
                      Zapytaj o dostępność
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
