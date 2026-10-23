import { Link } from 'react-router-dom'
import { FREE_RADIUS_KM, PHONE_E164, PRICE_RANGE_TEXT } from '../data/site'
import { trackLead } from '../consent/googleTag'

/**
 * First screen: a real wedding photo of our BMW (never covered by text), one clear promise and two actions.
 * Phones: landscape crop on top, text below. Desktop: text left, portrait crop with the fireworks right.
 */
export default function HeroSection() {
  return (
    <section className="hero hero--split" aria-label="Sekcja główna">
      <div className="hero__inner">
        <picture className="hero__photo">
          <source media="(min-width: 900px)" srcSet="/images/bmw6/bmw6-wedding-portrait-1600.webp" type="image/webp" />
          <source media="(min-width: 900px)" srcSet="/images/bmw6/bmw6-wedding-portrait-1600.jpg" />
          <source srcSet="/images/bmw6/bmw6-wedding-800.webp" type="image/webp" />
          <img
            src="/images/bmw6/bmw6-wedding-800.jpg"
            alt="Para Młoda całuje się przy białym BMW 650i Gran Coupé udekorowanym na ślub, w tle fajerwerki"
            fetchPriority="high"
            width="800"
            height="533"
          />
        </picture>
        <div className="hero__content">
          <span className="hero__eyebrow">Auto do ślubu z szoferem · Warszawa · Radom · Mazowsze</span>
          <h1 className="hero__title">
            Auto do ślubu Warszawa
            <span className="gold-text"> i Radom — BMW z szoferem</span>
          </h1>
          <p className="hero__subtitle">
            BMW 650i Gran Coupé lub BMW 4 Cabrio. Pakiet 3 h za {PRICE_RANGE_TEXT}, dekoracja kwiatowa i postój na sesję w cenie,
            dojazd gratis do {FREE_RADIUS_KM} km.
          </p>
          <div className="hero__cta">
            <Link to="/kontakt" className="btn btn-primary">Sprawdź wolny termin</Link>
            <a href={`tel:${PHONE_E164}`} className="btn btn-outline" onClick={() => trackLead('phone', 'hero')}>Zadzwoń: 881 358 838</a>
          </div>
          <ul className="hero__badges" aria-label="Najważniejsze fakty">
            <li>2 luksusowe BMW</li>
            <li>Szofer w cenie</li>
            <li>Dekoracja gratis</li>
            <li>Odpowiedź tego samego dnia</li>
          </ul>
        </div>
      </div>
    </section>
  )
}
