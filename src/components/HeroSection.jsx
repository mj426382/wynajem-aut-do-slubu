import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="hero" aria-label="Sekcja główna">
      <div className="hero__content">
        <span className="hero__diamond">💍</span>
        <span className="hero__eyebrow">Auto do ślubu — Radom &amp; Warszawa</span>
        <h1 className="hero__title">
          Luksusowe Auto do Ślubu<br />
          <span className="gold-text">w Radomiu i Warszawie</span>
        </h1>
        <p className="hero__subtitle">
          Wynajem auta do ślubu w Radomiu, Warszawie i całym Mazowszu.
          BMW 650i xDrive Gran Coupé lub BMW 4 Cabrio z szoferem — spraw, by Twój ślub był niezapomniany.
        </p>
        <div className="hero__cta">
          <a href="#flota" className="btn btn-primary">✨ Zobacz nasze samochody</a>
          <a href="tel:+48881358838" className="btn btn-outline">📞 Zadzwoń teraz</a>
        </div>
      </div>
      <div className="hero__scroll" aria-hidden="true">Przewiń</div>
    </section>
  )
}
