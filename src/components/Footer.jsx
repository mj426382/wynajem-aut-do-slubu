import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <div className="footer__logo">
              <span className="footer__logo-icon">♛</span>
              <div>
                <span className="footer__logo-main">Prestige</span>
                <span className="footer__logo-sub">Wedding Cars</span>
              </div>
            </div>
            <p className="footer__tagline">
              Luksusowe auta do ślubu w Radomiu i Warszawie. Twój wyjątkowy dzień zasługuje na wyjątkowe auto. Służymy Państwu od 2010 roku.
            </p>
            <div className="footer__social">
              <a
                href="https://facebook.com"
                className="footer__social-link"
                aria-label="Facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                f
              </a>
              <a
                href="https://instagram.com"
                className="footer__social-link"
                aria-label="Instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                ✦
              </a>
            </div>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">Nawigacja</h3>
            <nav className="footer__nav">
              <Link to="/" className="footer__nav-link">Strona główna</Link>
              <a href="/#flota" className="footer__nav-link">Nasza flota</a>
              <a href="/#cechy" className="footer__nav-link">Dlaczego my?</a>
              <a href="/#opinie" className="footer__nav-link">Opinie</a>
              <Link to="/blog" className="footer__nav-link">Blog</Link>
              <Link to="/kontakt" className="footer__nav-link">Kontakt</Link>
            </nav>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">Nasza flota</h3>
            <nav className="footer__nav">
              <a href="/#flota" className="footer__nav-link">Mercedes S-Class</a>
              <a href="/#flota" className="footer__nav-link">BMW 7 Series</a>
              <a href="/#flota" className="footer__nav-link">Rolls-Royce Phantom</a>
              <a href="/#flota" className="footer__nav-link">Bentley Flying Spur</a>
              <a href="/#flota" className="footer__nav-link">Lincoln Town Car</a>
            </nav>
          </div>

          <div className="footer__col">
            <h3 className="footer__col-title">Kontakt</h3>
            <address style={{ fontStyle: 'normal' }}>
              <div className="footer__contact-item">
                <span>📍</span>
                <span>ul. Żeromskiego 1<br />26-600 Radom</span>
              </div>
              <div className="footer__contact-item">
                <span>📞</span>
                <a href="tel:+48501234567">+48 501 234 567</a>
              </div>
              <div className="footer__contact-item">
                <span>✉️</span>
                <a href="mailto:kontakt@prestige-wedding-cars.pl">kontakt@prestige-wedding-cars.pl</a>
              </div>
              <div className="footer__contact-item">
                <span>🕐</span>
                <span>Pon–Pt: 9:00–18:00<br />Sob: 10:00–14:00</span>
              </div>
            </address>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; 2024 Prestige Wedding Cars. Wszelkie prawa zastrzeżone.
          </p>
          <p className="footer__love">
            Made with ❤️ for your special day
          </p>
        </div>
      </div>
    </footer>
  )
}
