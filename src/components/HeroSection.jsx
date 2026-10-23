import { Link } from 'react-router-dom'
import { FREE_RADIUS_KM, PHONE_E164, PRICE_RANGE_TEXT } from '../data/site'
import { trackLead } from '../consent/googleTag'

export default function HeroSection() {
  return (
    <section className="hero" aria-label="Sekcja główna">
      <div className="hero__content">
        <span className="hero__diamond" aria-hidden="true">💍</span>
        <span className="hero__eyebrow">Auto do ślubu z szoferem — Warszawa, Radom, Mazowsze</span>
        <h1 className="hero__title">
          Auto do Ślubu Warszawa i Radom
          <br />
          <span className="gold-text">BMW z szoferem, dekoracją i postojem na sesję</span>
        </h1>
        <p className="hero__subtitle">
          BMW 650i xDrive Gran Coupé lub BMW 4 Cabrio na Wasz ślub. Pakiety {PRICE_RANGE_TEXT} za 3 godziny z eleganckim
          szoferem, bezpłatną dekoracją florystyczną i dojazdem gratis do {FREE_RADIUS_KM} km od Warszawy lub Radomia.
        </p>
        <div className="hero__cta">
          <Link to="/kontakt" className="btn btn-primary">✉️ Sprawdź wolny termin</Link>
          <a href={`tel:${PHONE_E164}`} className="btn btn-outline" onClick={() => trackLead('phone', 'hero')}>📞 Zadzwoń teraz</a>
        </div>
        <ul className="hero__badges" aria-label="Najważniejsze fakty">
          <li>🚗 2 luksusowe BMW</li>
          <li>👨‍✈️ Szofer w cenie</li>
          <li>💐 Dekoracja gratis</li>
          <li>📸 Postój na sesję</li>
        </ul>
      </div>
      <a href="#flota" className="hero__scroll" aria-label="Przewiń do floty">Przewiń</a>
    </section>
  )
}
