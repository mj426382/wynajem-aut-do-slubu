import { Link } from 'react-router-dom'
import { EMAIL, FREE_RADIUS_KM, PHONE_DISPLAY, PHONE_E164, SERVING_SINCE } from '../data/site'
import { GA4_CONFIGURED, openCookieSettings, trackLead } from '../consent/googleTag'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon" aria-hidden="true">♛</span>
              <div>
                <span className="footer__logo-main">AutoDoŚlubu</span>
                <span className="footer__logo-sub">Warszawa &amp; Radom</span>
              </div>
            </div>
            <p className="footer__tagline">
              Wynajem BMW z szoferem do ślubu w Warszawie, Radomiu i na całym Mazowszu. Dekoracja florystyczna i postój
              na sesję w cenie, dojazd gratis do {FREE_RADIUS_KM} km. Wozimy Pary Młode od {SERVING_SINCE} roku.
            </p>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">Oferta</h3>
            <nav className="footer__nav" aria-label="Oferta">
              <Link to="/flota/bmw-650i-gran-coupe" className="footer__nav-link">BMW 650i xDrive Gran Coupé</Link>
              <Link to="/flota/bmw-4-cabrio" className="footer__nav-link">BMW 4 Cabrio</Link>
              <Link to="/#cennik" className="footer__nav-link">Cennik i pakiety</Link>
              <Link to="/#faq" className="footer__nav-link">Najczęstsze pytania</Link>
              <Link to="/kontakt" className="footer__nav-link">Zapytaj o termin</Link>
            </nav>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">Obsługiwane miasta</h3>
            <nav className="footer__nav" aria-label="Obsługiwane lokalizacje">
              <Link to="/auto-do-slubu-warszawa" className="footer__nav-link">Auto do ślubu Warszawa</Link>
              <Link to="/auto-do-slubu-radom" className="footer__nav-link">Auto do ślubu Radom</Link>
              <Link to="/auto-do-slubu-mazowieckie" className="footer__nav-link">Auto do ślubu Mazowieckie</Link>
              <Link to="/blog" className="footer__nav-link">Blog ślubny</Link>
            </nav>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">Kontakt</h3>
            <address style={{ fontStyle: 'normal' }}>
              <div className="footer__contact-item">
                <span aria-hidden="true">📞</span>
                <a href={`tel:${PHONE_E164}`} onClick={() => trackLead('phone', 'footer')}>{PHONE_DISPLAY}</a>
              </div>
              <div className="footer__contact-item">
                <span aria-hidden="true">✉️</span>
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
              </div>
            </address>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">© {new Date().getFullYear()} AutoDoŚlubu Warszawa &amp; Radom. Wszelkie prawa zastrzeżone.</p>
          <p className="footer__legal">
            <Link to="/polityka-prywatnosci">Polityka prywatności</Link>
            {GA4_CONFIGURED && (
              <>
                {' · '}
                <button type="button" className="footer__link-button" onClick={openCookieSettings}>
                  Ustawienia cookies
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </footer>
  )
}
