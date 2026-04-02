import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import ContactPage from './pages/ContactPage'
import RadomPage from './pages/RadomPage'
import WarszawaPage from './pages/WarszawaPage'
import MazowieckiePage from './pages/MazowieckiePage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auto-do-slubu-radom" element={<RadomPage />} />
          <Route path="/auto-do-slubu-warszawa" element={<WarszawaPage />} />
          <Route path="/auto-do-slubu-mazowieckie" element={<MazowieckiePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
