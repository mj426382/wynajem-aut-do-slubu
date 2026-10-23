import { Link } from 'react-router-dom'
import { PHONE_DISPLAY, PHONE_E164 } from '../data/site'
import { trackLead } from '../consent/googleTag'

export default function CTASection({ eyebrow = 'Wolne terminy 2026 / 2027', title = 'Zarezerwuj auto do ślubu', text, id = 'cta' }) {
  return (
    <section className="cta" aria-labelledby={`${id}-title`}>
      <div className="container">
        <span className="cta__eyebrow">{eyebrow}</span>
        <h2 className="cta__title" id={`${id}-title`}>{title}</h2>
        <p className="cta__subtitle">
          {text ?? 'Soboty od maja do września rezerwowane są z wyprzedzeniem nawet roku. Napiszcie datę i miejsce, a tego samego dnia odpowiemy, czy auto jest wolne.'}
        </p>
        <a className="cta__phone" href={`tel:${PHONE_E164}`} onClick={() => trackLead('phone', 'cta')}>📞 {PHONE_DISPLAY}</a>
        <div className="cta__actions">
          <Link to="/kontakt" className="btn btn-dark">✉️ Napisz do nas</Link>
          <a href={`tel:${PHONE_E164}`} className="btn btn-dark" onClick={() => trackLead('phone', 'cta')}>📞 Zadzwoń teraz</a>
        </div>
      </div>
    </section>
  )
}
