import { useState, useEffect, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [locOpen, setLocOpen] = useState(false)
  const locRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClick = (e) => {
      if (locRef.current && !locRef.current.contains(e.target)) setLocOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const close = () => { setMenuOpen(false); setLocOpen(false) }

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <Link to="/" className="navbar__logo" onClick={close}>
          <span className="navbar__logo-icon">♛</span>
          <div>
            <span className="navbar__logo-main">AutoDoŚlubu</span>
            <span className="navbar__logo-sub">Warszawa &amp; Radom</span>
          </div>
        </Link>
        <nav className={`navbar__nav${menuOpen ? ' navbar__nav--open' : ''}`} aria-label="Główna nawigacja">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
            onClick={close}
            end
          >
            Strona główna
          </NavLink>
          <a href="/#flota" className="navbar__link" onClick={close}>Flota</a>

          {/* Locations dropdown */}
          <div className="navbar__dropdown" ref={locRef}>
            <button
              className="navbar__link navbar__dropdown-btn"
              onClick={() => setLocOpen(!locOpen)}
              aria-expanded={locOpen}
              aria-haspopup="true"
            >
              Lokalizacje <span className="navbar__dropdown-arrow" aria-hidden="true">{locOpen ? '▲' : '▼'}</span>
            </button>
            {locOpen && (
              <ul className="navbar__dropdown-menu" role="menu">
                <li role="menuitem">
                  <NavLink to="/auto-do-slubu-radom" className="navbar__dropdown-item" onClick={close}>
                    📍 Auto do ślubu Radom
                  </NavLink>
                </li>
                <li role="menuitem">
                  <NavLink to="/auto-do-slubu-warszawa" className="navbar__dropdown-item" onClick={close}>
                    📍 Auto do ślubu Warszawa
                  </NavLink>
                </li>
                <li role="menuitem">
                  <NavLink to="/auto-do-slubu-mazowieckie" className="navbar__dropdown-item" onClick={close}>
                    📍 Auto do ślubu Mazowieckie
                  </NavLink>
                </li>
              </ul>
            )}
          </div>

          <NavLink
            to="/blog"
            className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
            onClick={close}
          >
            Blog
          </NavLink>
          <NavLink
            to="/kontakt"
            className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
            onClick={close}
          >
            Kontakt
          </NavLink>
          <a href="tel:+48881358838" className="navbar__phone">📞 +48 881 358 838</a>
        </nav>
        <button
          className="navbar__hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Otwórz menu"
          aria-expanded={menuOpen}
        >
          <span className={`hamburger-line${menuOpen ? ' open' : ''}`}></span>
          <span className={`hamburger-line${menuOpen ? ' open' : ''}`}></span>
          <span className={`hamburger-line${menuOpen ? ' open' : ''}`}></span>
        </button>
      </div>
    </header>
  )
}
