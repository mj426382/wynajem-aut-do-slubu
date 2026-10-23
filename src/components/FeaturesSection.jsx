import { FREE_RADIUS_KM } from '../data/site'

const features = [
  {
    icon: '💎',
    title: 'Dwa luksusowe BMW',
    desc: 'BMW 650i xDrive Gran Coupé (V8, 4×4) i BMW 4 Cabrio z elektrycznym dachem. Oba auta serwisowane, umyte i przygotowane dzień przed ślubem.',
  },
  {
    icon: '👨‍✈️',
    title: 'Szofer w cenie',
    desc: 'Elegancko ubrany, punktualny i dyskretny kierowca, który zna trasy w Warszawie i Radomiu i przyjeżdża z zapasem czasu.',
  },
  {
    icon: '🌹',
    title: 'Dekoracja florystyczna gratis',
    desc: 'Białe wstążki, bukiet na masce i dekoracja wnętrza w każdym pakiecie. Kolory dopasowujemy do motywu Waszego wesela.',
  },
  {
    icon: '📸',
    title: 'Postój na sesję zdjęciową',
    desc: 'Zatrzymujemy się tam, gdzie chce fotograf: Stare Miasto, Łazienki, Wilanów albo park w Radomiu. Bez pośpiechu.',
  },
  {
    icon: '📍',
    title: `Dojazd gratis do ${FREE_RADIUS_KM} km`,
    desc: `Warszawa, Radom i okolice do ${FREE_RADIUS_KM} km bez dopłat. Dalej na Mazowszu i w sąsiednich województwach — wycena indywidualna.`,
  },
  {
    icon: '🕐',
    title: 'Jasne zasady rezerwacji',
    desc: 'Potwierdzony termin, zadatek i umowa. Jeden pakiet 3-godzinny obejmuje dojazd, kościół lub USC, sesję i przyjazd na salę.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="features" id="cechy" aria-labelledby="features-title">
      <div className="container">
        <h2 className="section-title" id="features-title">Co dostajecie w cenie wynajmu</h2>
        <div className="section-divider" aria-hidden="true"></div>
        <p className="section-subtitle">
          Wynajem auta do ślubu bez niespodzianek: wszystko, co ważne w dniu ślubu, jest w pakiecie.
        </p>
        <div className="features__grid">
          {features.map((f) => (
            <article className="feature-card" key={f.title}>
              <span className="feature-card__icon" aria-hidden="true">{f.icon}</span>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
