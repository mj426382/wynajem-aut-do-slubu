import SEO from '../components/SEO'

export default function ContactPage() {
  return (
    <>
      <SEO
        title="Kontakt – Wynajem Aut do Ślubu"
        description="Skontaktuj się ze Złotą Karetą. Zadzwoń: +48 501 234 567 lub napisz do nas. Obsługujemy Radom, Warszawę i okolice."
        canonical="https://autodoslubuwarszawa.pl/kontakt"
      />
      <section className="contact-page">
        <div className="container">
          <div className="contact-page__header">
            <h1 className="section-title">Kontakt</h1>
            <div className="section-divider"></div>
            <p className="section-subtitle">
              Masz pytania? Chcesz zarezerwować termin? Skontaktuj się z nami – odpowiemy najszybciej jak to możliwe.
            </p>
          </div>

          <div className="contact-page__grid">
            <div className="contact-form">
              <h2>Wyślij zapytanie</h2>
              <form
                action="https://formsubmit.co/kontakt@autodoslubuwarszawa.pl"
                method="POST"
                noValidate
              >
                <input type="hidden" name="_subject" value="Zapytanie o wynajem auta do ślubu" />
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_next" value="https://autodoslubuwarszawa.pl/kontakt?success=true" />

                <div className="form-group">
                  <label htmlFor="name">Imię i nazwisko *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="np. Anna Kowalska"
                    required
                    autoComplete="name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Adres e-mail *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="twoj@email.pl"
                    required
                    autoComplete="email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Numer telefonu</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    placeholder="+48 501 234 567"
                    autoComplete="tel"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="wedding_date">Data ślubu</label>
                  <input
                    type="date"
                    id="wedding_date"
                    name="wedding_date"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Wiadomość *</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Opisz swoje potrzeby: wybrane auto, godziny, trasa, specjalne życzenia..."
                    required
                  ></textarea>
                </div>

                <button type="submit" className="form-submit">
                  ✉️ Wyślij zapytanie
                </button>
              </form>
            </div>

            <div className="contact-info">
              <div className="contact-info-card">
                <h3>Dane kontaktowe</h3>
                <address style={{ fontStyle: 'normal' }}>
                  <div className="contact-info-item">
                    <span className="contact-info-item__icon">📍</span>
                    <span>ul. Żeromskiego 1<br />26-600 Radom</span>
                  </div>
                  <div className="contact-info-item">
                    <span className="contact-info-item__icon">📞</span>
                    <a href="tel:+48501234567">+48 501 234 567</a>
                  </div>
                  <div className="contact-info-item">
                    <span className="contact-info-item__icon">✉️</span>
                    <a href="mailto:kontakt@autodoslubuwarszawa.pl">kontakt@autodoslubuwarszawa.pl</a>
                  </div>
                </address>
              </div>

              <div className="contact-info-card">
                <h3>Godziny pracy</h3>
                <div className="contact-info-item">
                  <span className="contact-info-item__icon">🕐</span>
                  <div>
                    <p style={{ margin: 0 }}>Poniedziałek – Piątek: <strong>9:00 – 18:00</strong></p>
                    <p style={{ margin: 0 }}>Sobota: <strong>10:00 – 14:00</strong></p>
                    <p style={{ margin: 0, color: '#666' }}>Niedziela: nieczynne</p>
                  </div>
                </div>
              </div>

              <div className="contact-info-card">
                <h3>Social media</h3>
                <div className="social-links">
                  <a
                    href="https://facebook.com"
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    f Facebook
                  </a>
                  <a
                    href="https://instagram.com"
                    className="social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    ✦ Instagram
                  </a>
                </div>
              </div>

              <div className="map-placeholder">
                <div className="map-placeholder__icon">📍</div>
                <div className="map-placeholder__text">
                  <strong style={{ color: '#fff' }}>ul. Żeromskiego 1</strong><br />
                  26-600 Radom, Polska<br />
                  <small>Otwórz w Google Maps</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
