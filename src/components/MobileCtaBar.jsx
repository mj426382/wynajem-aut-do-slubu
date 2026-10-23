import { Link, useLocation } from 'react-router-dom'
import { PHONE_E164 } from '../data/site'
import { trackLead } from '../consent/googleTag'

/** Sticky bottom bar on phones: the two actions a couple takes – call or ask for a date. Hidden on the contact page. */
export default function MobileCtaBar() {
  const { pathname } = useLocation()
  if (pathname === '/kontakt') return null
  return (
    <div className="mobile-cta" role="region" aria-label="Szybki kontakt">
      <a href={`tel:${PHONE_E164}`} className="mobile-cta__btn mobile-cta__btn--call" onClick={() => trackLead('phone', 'mobile-bar')}>
        Zadzwoń
      </a>
      <a href={`sms:${PHONE_E164}`} className="mobile-cta__btn mobile-cta__btn--sms" onClick={() => trackLead('phone', 'mobile-bar-sms')}>
        SMS
      </a>
      <Link to="/kontakt" className="mobile-cta__btn mobile-cta__btn--form">
        Zapytaj o termin
      </Link>
    </div>
  )
}
