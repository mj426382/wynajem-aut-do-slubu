import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import MobileCtaBar from './components/MobileCtaBar'
import CookieBanner from './consent/CookieBanner'
import PageViewTracker from './consent/PageViewTracker'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import ContactPage from './pages/ContactPage'
import RadomPage from './pages/RadomPage'
import WarszawaPage from './pages/WarszawaPage'
import MazowieckiePage from './pages/MazowieckiePage'
import BMW650iPage from './pages/BMW650iPage'
import BMW4CabrioPage from './pages/BMW4CabrioPage'
import PolitykaPrywatnosciPage from './pages/PolitykaPrywatnosciPage'
import NotFoundPage from './pages/NotFoundPage'

/** Routes without a router – rendered by the browser (BrowserRouter) and by the prerender (StaticRouter). */
export function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <PageViewTracker />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auto-do-slubu-radom" element={<RadomPage />} />
          <Route path="/auto-do-slubu-warszawa" element={<WarszawaPage />} />
          <Route path="/auto-do-slubu-mazowieckie" element={<MazowieckiePage />} />
          <Route path="/flota/bmw-650i-gran-coupe" element={<BMW650iPage />} />
          <Route path="/flota/bmw-4-cabrio" element={<BMW4CabrioPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/polityka-prywatnosci" element={<PolitykaPrywatnosciPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
      <MobileCtaBar />
      <CookieBanner />
    </>
  )
}

export default AppRoutes
