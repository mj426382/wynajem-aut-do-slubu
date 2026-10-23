import { useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { EMAIL, FREE_RADIUS_KM, ORG_ID, PHONE_DISPLAY, PHONE_E164, PRICE_MAX, PRICE_MIN, SITE_URL } from '../data/site'
import { trackLead } from '../consent/googleTag'

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    '@id': `${SITE_URL}/kontakt#page`,
    url: `${SITE_URL}/kontakt`,
    name: 'Kontakt – AutoDoŚlubu Warszawa & Radom',
    about: { '@id': ORG_ID },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Strona główna', item: `${SITE_URL}/` },
      { '@type': 'ListItem', position: 2, name: 'Kontakt', item: `${SITE_URL}/kontakt` },
    ],
  },
]

export default function ContactPage() {
  const [status, setStatus] = useState('idle')

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    if (form.elements.website?.value) return // honeypot – a bot filled the hidden field
    setStatus('sending')
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${EMAIL}`, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      form.reset()
      setStatus('sent')
      trackLead('form', 'kontakt')
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <SEO
        title="Kontakt – zapytaj o termin auta do ślubu"
        description={`Sprawdź wolny termin BMW z szoferem na ślub w Warszawie, Radomiu i na Mazowszu. Zadzwoń: ${PHONE_DISPLAY} lub wyślij formularz. Odpowiadamy tego samego dnia.`}
        path="/kontakt"
        jsonLd={jsonLd}
      />
      <section className="contact-page">
        <div className="container">
          <div className="contact-page__header">
            <h1 className="section-title">Zapytaj o termin</h1>
            <div className="section-divider"></div>
            <p className="section-subtitle">
              Napiszcie datę i miejsce ślubu oraz wesela. Odpowiadamy tego samego dnia z ceną i potwierdzeniem, czy auto jest wolne.
            </p>
          </div>

          <div className="contact-page__grid">
            <div className="contact-form">
              <h2>Formularz rezerwacji</h2>
              <form onSubmit={handleSubmit} noValidate>
                <input type="hidden" name="_subject" value="Zapytanie o auto do ślubu – autodoslubuwarszawa.pl" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="text" name="website" tabIndex="-1" autoComplete="off" style={{ position: 'absolute', left: '-9999px' }} aria-hidden="true" />

                <div className="form-group">
                  <label htmlFor="name">Imię i nazwisko *</label>
                  <input type="text" id="name" name="name" placeholder="np. Anna Kowalska" required autoComplete="name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Adres e-mail *</label>
                  <input type="email" id="email" name="email" placeholder="twoj@email.pl" required autoComplete="email" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Numer telefonu</label>
                  <input type="tel" id="phone" name="phone" placeholder="np. 600 000 000" autoComplete="tel" />
                </div>
                <div className="form-group">
                  <label htmlFor="wedding_date">Data ślubu</label>
                  <input type="date" id="wedding_date" name="wedding_date" />
                </div>
                <div className="form-group">
                  <label htmlFor="car">Auto</label>
                  <select id="car" name="car" defaultValue="">
                    <option value="">Jeszcze nie wiemy</option>
                    <option value="BMW 650i Gran Coupé">BMW 650i xDrive Gran Coupé</option>
                    <option value="BMW 4 Cabrio">BMW 4 Cabrio</option>
                    <option value="Oba (kortez)">Oba auta (kortez)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Miejsce ślubu i wesela, godziny, trasa *</label>
                  <textarea id="message" name="message" placeholder="np. ślub o 15:00 w kościele św. Anny w Warszawie, wesele w Konstancinie, sesja na Starym Mieście" required></textarea>
                </div>
                <p className="form-consent">
                  Wysyłając formularz, zgadzasz się na kontakt w sprawie zapytania. Dane przetwarzamy zgodnie z{' '}
                  <Link to="/polityka-prywatnosci">polityką prywatności</Link>.
                </p>
                <button type="submit" className="form-submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Wysyłanie…' : '✉️ Wyślij zapytanie'}
                </button>
                {status === 'sent' && (
                  <p className="form-status form-status--ok" role="status">
                    Dziękujemy! Zapytanie dotarło, odezwiemy się najszybciej jak to możliwe.
                  </p>
                )}
                {status === 'error' && (
                  <p className="form-status form-status--error" role="alert">
                    Nie udało się wysłać formularza. Zadzwońcie pod {PHONE_DISPLAY} albo napiszcie na {EMAIL}.
                  </p>
                )}
              </form>
            </div>

            <div className="contact-info">
              <div className="contact-info-card">
                <h2 style={{ fontSize: '1.25rem' }}>Dane kontaktowe</h2>
                <address style={{ fontStyle: 'normal' }}>
                  <div className="contact-info-item">
                    <span className="contact-info-item__icon" aria-hidden="true">📞</span>
                    <a href={`tel:${PHONE_E164}`} onClick={() => trackLead('phone', 'kontakt')}>{PHONE_DISPLAY}</a>
                  </div>
                  <div className="contact-info-item">
                    <span className="contact-info-item__icon" aria-hidden="true">✉️</span>
                    <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
                  </div>
                </address>
                <p style={{ marginTop: '1rem', color: 'var(--gray)' }}>Telefon odbieramy codziennie 9:00–20:00. W dni ślubów oddzwaniamy po przejeździe.</p>
              </div>

              <div className="contact-info-card">
                <h2 style={{ fontSize: '1.25rem' }}>Zanim napiszesz</h2>
                <ul className="contact-info-list">
                  <li>💰 Pakiet 3 h z szoferem: {PRICE_MIN}–{PRICE_MAX} zł</li>
                  <li>📍 Dojazd gratis do {FREE_RADIUS_KM} km od Warszawy lub Radomia</li>
                  <li>💐 Dekoracja i postój na sesję w cenie</li>
                  <li>📅 Rezerwację potwierdza zadatek i umowa</li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  <Link to="/auto-do-slubu-warszawa">Ślub w Warszawie</Link> · <Link to="/auto-do-slubu-radom">Ślub w Radomiu</Link> ·{' '}
                  <Link to="/auto-do-slubu-mazowieckie">Mazowsze</Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
