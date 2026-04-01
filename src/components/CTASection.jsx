import { Link } from 'react-router-dom'

export default function CTASection() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="container">
        <span className="cta__eyebrow">Dostępne terminy 2024 / 2025</span>
        <h2 className="cta__title" id="cta-title">Zarezerwuj Auto Już Dziś</h2>
        <p className="cta__subtitle">
          Nie czekaj – terminy weselne wyprzedają się z dużym wyprzedzeniem.
          Skontaktuj się z nami i zarezerwuj swoje wymarzone auto na wielki dzień.
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
