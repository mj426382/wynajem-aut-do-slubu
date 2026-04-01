import { Link } from 'react-router-dom'

const cars = [
  {
    id: 1,
    emoji: '🚘',
    name: 'Mercedes S-Class',
    subtitle: 'Elegancja i komfort klasy S',
    description:
      'Flagowy sedan Mercedesa to synonim luksusu i wyrafinowania. Przestronna, skórzana kabina, masujące fotele i system dźwiękowy Burmester zapewnią niezapomniane wrażenia w drodze do ołtarza. Mercedes S-Class to wybór par, które cenią sobie nowoczesność połączoną z klasyczną elegancją.',
    features: [
      'Skórzana tapicerka w kremowym kolorze',
      'Panoramiczny dach szklany',
      'System audio Burmester 3D',
      'Klimatyzacja czterostrefowa',
      'Dekoracja kwiatami w cenie',
    ],
  },
  {
    id: 2,
    emoji: '🚗',
    name: 'BMW 7 Series',
    subtitle: 'Prestiż w każdym calu',
    description:
      'BMW serii 7 łączy sportowy charakter z luksusem najwyższej klasy. Przestronny tylny salon z indywidualnym oświetleniem, masującymi fotelami i chłodziarką na szampana sprawi, że dotrzecie do ślubu w królewskim stylu. Dynamika jazdy i nienaganna elegancja – to esencja BMW 7.',
    features: [
      'Tylny salon Executive Lounge',
      'Masujące fotele tylne',
      'Chłodziarka z szampanem w zestawie',
      'System BMW Theatre Screen',
      'Elektrycznie rozkładane zasłonki',
    ],
  },
  {
    id: 3,
    emoji: '👑',
    name: 'Rolls-Royce Phantom',
    subtitle: 'Król dróg na Twój wyjątkowy dzień',
    description:
      'Rolls-Royce Phantom to absolut luksusu motoryzacyjnego – auto, które samo w sobie jest symbolem statusu i doskonałości. Ręcznie wykonane wnętrze ze szlachetnego drewna i skóry, gwiaździsty sufit i ciche jak szept silniki uczynią Wasz ślubny przejazd niezapomnianym. To więcej niż auto – to doświadczenie.',
    features: [
      'Ręcznie wykonane wnętrze z drewna i skóry',
      'Gwiaździsty sufit z tysiąca światłowodów',
      'Wejście z tylnymi drzwiami "coach"',
      'Silnik V12 – niemal bezgłośna jazda',
      'Elegancki parasol wbudowany w drzwi',
    ],
  },
  {
    id: 4,
    emoji: '🏆',
    name: 'Bentley Flying Spur',
    subtitle: 'Brytyjski luksus i klasa',
    description:
      'Bentley Flying Spur to kwintesencja brytyjskiej elegancji – ręcznie wykończone wnętrze z najlepszej skóry, fornir z orzecha i szczegóły z metalu szlachetnego. Zaawansowana technika w połączeniu ze staroświeckim rzemiosłem tworzą unikalne połączenie, idealne na najbardziej wyjątkowy dzień w życiu.',
    features: [
      'Wnętrze z ręcznie wybranej skóry Hide',
      'Fornir drewniany dobierany parami',
      'System Naim Premium Audio',
      'Podgrzewane i wentylowane fotele',
      'Monogram właściciela na zagłówkach',
    ],
  },
  {
    id: 5,
    emoji: '🌟',
    name: 'Lincoln Town Car',
    subtitle: 'Klasyczna americana dla romantycznych',
    description:
      'Kultowy Lincoln Town Car to wybór par, które kochają klasykę i ponadczasowy styl retro. Wydłużana wersja limuzyny zachwyca przestronnością i oryginalnym charakterem. Idealny dla tych, którzy pragną, aby ich ślubny przejazd wyróżniał się spośród reszty – kultowy wygląd, który zapada w pamięć.',
    features: [
      'Przedłużany model Stretch Limo',
      'Bar z napojami wewnątrz',
      'Oświetlenie LED nastrojowe',
      'Klimatyzacja i nagłośnienie premium',
      'Pojemność do 8 pasażerów',
    ],
  },
]

export default function FleetSection() {
  return (
    <section className="fleet" id="flota" aria-labelledby="fleet-title">
      <div className="container">
        <h2 className="section-title" id="fleet-title">Nasza Ekskluzywna Flota</h2>
        <div className="section-divider" aria-hidden="true"></div>
        <p className="section-subtitle">
          Wybierz spośród pięciu wyjątkowych aut luksusowych. Każde z nich jest starannie przygotowane i udekorowane na Twój wielki dzień.
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
