import { Link } from 'react-router-dom'

const cars = [
  {
    id: 1,
    emoji: '🏆',
    name: 'BMW 650i xDrive Gran Coupé (F06)',
    subtitle: 'Sportowa elegancja w czystej postaci',
    description:
      'BMW 650i xDrive Gran Coupé to czterodrzwiowe coupé, które łączy dynamizm sportowego BMW z przestronnością i prestiżem auta ślubnego. Silnik V8 o mocy 450 KM, napęd na wszystkie koła xDrive i perfekcyjnie skrojone wnętrze tworzą pojazd idealny na wyjątkowy dzień – zarówno na wiosnę, jak i jesień.',
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
    subtitle: 'Romantyczna jazda z wiatrem we włosach',
    description:
      'BMW 4 Cabrio w generacji G23 to najromantyczniejszy wybór na ślub – miękkodachowy kabriolet z elektrycznym dachem, który otwiera się w zaledwie 18 sekund. Idealne na ciepłe, słoneczne wesela wiosną i latem: Panna Młoda przyjeżdża pod kościół z wiatrem we włosach, a zdjęcia robią piorunujące wrażenie.',
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
        <h2 className="section-title" id="fleet-title">Nasza Flota Ślubna</h2>
        <div className="section-divider" aria-hidden="true"></div>
        <p className="section-subtitle">
          Dwa wyjątkowe BMW – eleganckie Gran Coupé lub romantyczne Cabrio. Każde starannie przygotowane i udekorowane na Twój wielki dzień.
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
