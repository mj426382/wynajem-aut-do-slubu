import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function NotFoundPage() {
  return (
    <>
      <SEO
        title="404 – Strona nie istnieje"
        description="Strona, której szukasz, nie istnieje. Wróć na stronę główną Prestige Wedding Cars."
      />
      <section className="not-found">
        <div className="not-found__content">
          <p className="not-found__code">404</p>
          <h1 className="not-found__title">Strona nie istnieje</h1>
          <p className="not-found__text">
            Przepraszamy – strona, której szukasz, nie została odnaleziona. Być może adres został zmieniony lub strona nie istnieje.
            Skorzystaj z poniższych odnośników, aby wrócić na właściwą ścieżkę.
          </p>
          <div className="not-found__actions">
            <Link to="/" className="btn btn-primary">🏠 Strona główna</Link>
            <Link to="/kontakt" className="btn btn-outline">✉️ Kontakt</Link>
          </div>
        </div>
      </section>
    </>
  )
}
