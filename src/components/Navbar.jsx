import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={`navbar${scrolled ? ' navbar--scrolled' : ''}`}>
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">♛</span>
          <div>
            <span className="navbar__logo-main">Złota</span>
            <span className="navbar__logo-sub">Kareta</span>
          </div>
        </Link>
        <nav className={`navbar__nav${menuOpen ? ' navbar__nav--open' : ''}`} aria-label="Główna nawigacja">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
            onClick={() => setMenuOpen(false)}
            end
          >
            Strona główna
          </NavLink>
          <a href="/#flota" className="navbar__link" onClick={() => setMenuOpen(false)}>Flota</a>
          <NavLink
            to="/blog"
            className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
            onClick={() => setMenuOpen(false)}
          >
            Blog
          </NavLink>
          <NavLink
            to="/kontakt"
            className={({ isActive }) => isActive ? 'navbar__link navbar__link--active' : 'navbar__link'}
            onClick={() => setMenuOpen(false)}
          >
            Kontakt
          </NavLink>
          <a href="tel:+48501234567" className="navbar__phone">📞 +48 501 234 567</a>
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
