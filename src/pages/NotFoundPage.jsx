import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import Icon from '../components/Icon'

export default function NotFoundPage() {
  return (
    <>
      <SEO title="Strona nie istnieje (404)" description="Strona, której szukasz, nie istnieje. Wróć na stronę główną AutoDoŚlubu Warszawa & Radom." path="/404" noindex />
      <section className="not-found">
        <div className="not-found__content">
          <p className="not-found__code">404</p>
          <h1 className="not-found__title">Strona nie istnieje</h1>
          <p className="not-found__text">
            Adres mógł się zmienić albo wpis został połączony z innym. Zobacz ofertę, blog albo napisz do nas.
          </p>
          <div className="not-found__actions">
            <Link to="/" className="btn btn-primary"><Icon name="home" /> Strona główna</Link>
            <Link to="/blog" className="btn btn-outline"><Icon name="book" /> Blog</Link>
            <Link to="/kontakt" className="btn btn-outline"><Icon name="mail" /> Kontakt</Link>
          </div>
        </div>
      </section>
    </>
  )
}
