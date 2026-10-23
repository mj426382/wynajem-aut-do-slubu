import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from './googleTag'

/** GA4 page_view on the first render and on every client-side route change (the <title> is updated by Helmet a moment later). */
export default function PageViewTracker() {
  const { pathname, search } = useLocation()
  useEffect(() => {
    const timer = window.setTimeout(trackPageView, 100)
    return () => window.clearTimeout(timer)
  }, [pathname, search])
  return null
}
