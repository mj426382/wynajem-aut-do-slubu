import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="container">
        <span className="cta__eyebrow">Wolne terminy 2025 / 2026</span>
        <h2 className="cta__title" id="cta-title">Zarezerwuj Auto do Ślubu w Radomiu lub Warszawie</h2>
        <p className="cta__subtitle">
          Terminy wynajmu aut do ślubu wyprzedają się z dużym wyprzedzeniem — zwłaszcza w sezonie maj–wrzesień.
          Skontaktuj się z nami i zarezerwuj swój wymarzony samochód ślubny już dziś.
        </p>
        <a className="cta__phone" href="tel:+48501234567">📞 +48 501 234 567</a>
        <div className="cta__actions">
          <Link to="/kontakt" className="btn btn-dark">✉️ Napisz do nas</Link>
          <a href="tel:+48501234567" className="btn btn-dark">📞 Zadzwoń teraz</a>
        </div>
      </div>
    </section>
  )
}
