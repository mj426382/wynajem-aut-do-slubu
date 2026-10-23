import { Link } from 'react-router-dom'
import { FREE_RADIUS_KM, PHONE_E164, PRICE_RANGE_TEXT } from '../data/site'
import { trackLead } from '../consent/googleTag'

/** First screen: a real photo of the decorated car, one clear promise and two actions (form, phone). */
export default function HeroSection() {
  return (
    <section className="hero hero--photo" aria-label="Sekcja główna">
      <picture className="hero__media" aria-hidden="true">
        <source media="(max-width: 700px)" srcSet="/images/bmw6/bmw6-front-800.webp" type="image/webp" />
        <source srcSet="/images/bmw6/bmw6-front-1600.webp" type="image/webp" />
        <img src="/images/bmw6/bmw6-front-1600.jpg" alt="" fetchPriority="high" decoding="async" width="1600" height="1067" />
      </picture>
      <div className="hero__shade" aria-hidden="true" />
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
    </section>
  )
}
