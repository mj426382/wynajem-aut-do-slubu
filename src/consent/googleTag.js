/**
 * Google Analytics 4 behind an explicit cookie consent (Consent Mode v2, basic mode): nothing from Google loads
 * before the visitor grants the analytics category, and withdrawing it stops GA4 and deletes its cookies.
 *
 * GA4 web stream "autodoslubuwarszawa.pl (strona)" in the jan-mat account – a public identifier. VITE_GA4_ID overrides
 * it at build time; any non "G-…" value (e.g. "off") disables GA4 and the banner.
 */
const GA4_DEFAULT_ID = 'G-ZRKLNE3SNS'
const GA4_CANDIDATE = String(import.meta.env.VITE_GA4_ID ?? GA4_DEFAULT_ID).trim()
export const GA4_ID = /^G-[A-Z0-9]+$/.test(GA4_CANDIDATE) ? GA4_CANDIDATE : ''

/** Build-time flag – identical on the server (prerender) and in the browser, safe for rendering. */
export const GA4_CONFIGURED = GA4_ID !== ''

export const CONSENT_COOKIE = 'ads_consent'
export const COOKIE_SETTINGS_EVENT = 'autodoslubu:cookie-settings'
const MAX_AGE_SECONDS = 180 * 24 * 60 * 60
/** _ga cookies live at most 400 days (the browser cap). */
const GA_COOKIE_SECONDS = 400 * 24 * 60 * 60

export function consentEnabled() {
  return GA4_CONFIGURED && typeof window !== 'undefined'
}

/** Stored decision: true / false, or null when the visitor was never asked. */
export function readConsent() {
  if (typeof document === 'undefined') return null
  const raw = document.cookie.match(/(?:^|;\s*)ads_consent=([^;]*)/)?.[1]
  if (!raw) return null
  const value = new URLSearchParams(raw).get('analytics')
  return value === '1' ? true : value === '0' ? false : null
}

export function analyticsGranted() {
  return consentEnabled() && readConsent() === true
}

export function needsDecision() {
  return consentEnabled() && readConsent() === null
}

function writeConsent(analytics) {
  const secure = window.location.protocol === 'https:' ? '; Secure' : ''
  document.cookie = `${CONSENT_COOKIE}=analytics=${analytics ? 1 : 0}&v=1; max-age=${MAX_AGE_SECONDS}; path=/; SameSite=Lax${secure}`
}

// gtag.js reads the `arguments` object from dataLayer – a rest array would not work.
function gtag() {
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(arguments)
}

/** Query parameters Google needs for attribution; everything else never leaves the page. */
const ATTRIBUTION_PARAM = /^(utm_[a-z_]+|gclid|gbraid|wbraid|dclid|gad_source|gad_campaignid|srsltid)$/

export function pageLocation() {
  const { origin, pathname, search } = window.location
  const kept = new URLSearchParams()
  new URLSearchParams(search).forEach((value, key) => {
    if (ATTRIBUTION_PARAM.test(key)) kept.append(key, value)
  })
  const query = kept.toString()
  return `${origin}${pathname}${query ? `?${query}` : ''}`
}

let tagLoaded = false
let configured = false
let currentPage = null
let lastPageView = null

function applyConsent(granted) {
  if (GA4_CONFIGURED && typeof window !== 'undefined') window[`ga-disable-${GA4_ID}`] = !granted
  if (!granted) {
    lastPageView = null
    if (tagLoaded) gtag('consent', 'update', { analytics_storage: 'denied' })
    return
  }
  if (!tagLoaded) {
    tagLoaded = true
    gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' })
    gtag('consent', 'update', { analytics_storage: 'granted' })
    gtag('set', { page_location: pageLocation() })
    gtag('js', new Date())
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_ID)}`
    script.setAttribute('data-google-tag', '1')
    document.head.appendChild(script)
  } else {
    gtag('consent', 'update', { analytics_storage: 'granted' })
  }
  if (!configured) {
    configured = true
    // Page views are sent by trackPageView() with a cleaned URL, also on client-side route changes.
    gtag('config', GA4_ID, { send_page_view: false, cookie_expires: GA_COOKIE_SECONDS })
  }
  sendPageView()
}

function deleteGaCookies() {
  for (const part of document.cookie.split(';')) {
    const name = part.split('=')[0].trim()
    if (!/^_ga(_|$)/.test(name)) continue
    document.cookie = `${name}=; max-age=0; path=/`
    document.cookie = `${name}=; max-age=0; path=/; domain=.autodoslubuwarszawa.pl`
  }
}

/** Call once at start-up: loads the tag only for visitors who already granted analytics. */
export function initGoogleTag() {
  if (consentEnabled()) applyConsent(analyticsGranted())
}

/** Saves the visitor's choice; withdrawing stops GA4 and deletes its cookies. */
export function setConsent(analytics) {
  if (!consentEnabled()) return
  writeConsent(analytics)
  if (!analytics) deleteGaCookies()
  applyConsent(analytics)
}

/** Reopens the banner („Ustawienia cookies” in the footer). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT))
}

function sendPageView() {
  if (!configured || !analyticsGranted() || currentPage === null || currentPage === lastPageView) return
  lastPageView = currentPage
  gtag('set', { page_location: currentPage })
  gtag('event', 'page_view', { send_to: GA4_ID, page_location: currentPage, page_title: document.title })
}

/** GA4 page_view for the current route (called on every route change); sent only with consent. */
export function trackPageView() {
  if (!consentEnabled()) return
  currentPage = pageLocation()
  sendPageView()
}

/** GA4 event – only with consent, never with personal data. */
export function trackEvent(name, params = {}) {
  if (!analyticsGranted()) return
  if (!tagLoaded || !configured) applyConsent(true)
  gtag('event', name, { ...params, send_to: GA4_ID })
}

/** Lead events: a phone click or a sent form is the conversion of this site. */
export function trackLead(kind, location) {
  trackEvent(kind === 'phone' ? 'phone_click' : 'generate_lead', { location })
}
