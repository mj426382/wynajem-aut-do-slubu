import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { COOKIE_SETTINGS_EVENT, consentEnabled, needsDecision, setConsent } from './googleTag'

/**
 * Cookie consent for Google Analytics 4. „Odrzucam” and „Akceptuję” are equally easy; the footer link
 * „Ustawienia cookies” reopens it. Renders nothing on the server and on the first client render, so the
 * prerendered HTML and hydration are unaffected. Not shown at all when GA4 is not configured.
 */
export default function CookieBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    // Shown after the first paint – the banner never delays the content (or the LCP) of the page.
    const timer = window.setTimeout(() => {
      if (needsDecision()) setOpen(true)
    }, 0)
    const reopen = () => {
      if (consentEnabled()) setOpen(true)
    }
    window.addEventListener(COOKIE_SETTINGS_EVENT, reopen)
    return () => {
      window.clearTimeout(timer)
      window.removeEventListener(COOKIE_SETTINGS_EVENT, reopen)
    }
  }, [])

  if (!open) return null

  const decide = (analytics) => {
    setConsent(analytics)
    setOpen(false)
  }

  return (
    <div className="cookie-banner" role="region" aria-label="Zgoda na pliki cookies">
      <div className="cookie-banner__inner">
        <p className="cookie-banner__text">
          Używamy plików cookies Google Analytics, aby liczyć odwiedziny i sprawdzać, które strony pomagają Parom Młodym.
          Włączymy je tylko za Twoją zgodą; niezbędne pliki działają zawsze. Decyzję zmienisz w stopce w „Ustawieniach cookies”.{' '}
          <Link to="/polityka-prywatnosci">Polityka prywatności</Link>
        </p>
        <div className="cookie-banner__actions">
          <button type="button" className="btn btn-outline cookie-banner__btn" onClick={() => decide(false)}>
            Odrzucam
          </button>
          <button type="button" className="btn btn-primary cookie-banner__btn" onClick={() => decide(true)}>
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  )
}
