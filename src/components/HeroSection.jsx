import { Link } from 'react-router-dom'

export default function HeroSection() {
  return (
    <section className="hero" aria-label="Sekcja główna">
      <div className="hero__content">
        <span className="hero__diamond">💍</span>
        <span className="hero__eyebrow">Radom &amp; Warszawa</span>
        <h1 className="hero__title">
          Twój Wymarzony Ślub<br />
          <span className="gold-text">Zasługuje na Wyjątkowe Auto</span>
        </h1>
        <p className="hero__subtitle">
          Luksusowa flota aut ślubnych do wynajęcia w Radomiu, Warszawie i okolicach.
          Mercedes S-Class, BMW 7, Rolls-Royce, Bentley – spraw, by ten dzień był niezapomniany.
        </p>
        <div className="hero__cta">
          <a href="#flota" className="btn btn-primary">✨ Sprawdź naszą flotę</a>
          <a href="tel:+48501234567" className="btn btn-outline">📞 Zadzwoń teraz</a>
        </div>
      </div>
      <div className="hero__scroll" aria-hidden="true">Przewiń</div>
    </section>
  )
}
