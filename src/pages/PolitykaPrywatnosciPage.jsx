import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import { EMAIL, SITE_NAME, SITE_URL } from '../data/site'
import { GA4_CONFIGURED, openCookieSettings } from '../consent/googleTag'

const UPDATED = '23 października 2026'

export default function PolitykaPrywatnosciPage() {
  return (
    <>
      <SEO
        title="Polityka prywatności i cookies"
        description={`Jak ${SITE_NAME} przetwarza dane z formularza i telefonu oraz jakich plików cookies używa strona ${SITE_URL}.`}
        path="/polityka-prywatnosci"
        jsonLd={[
          {
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Strona główna', item: `${SITE_URL}/` },
              { '@type': 'ListItem', position: 2, name: 'Polityka prywatności', item: `${SITE_URL}/polityka-prywatnosci` },
            ],
          },
        ]}
      />
      <section className="legal-page">
        <div className="container legal-page__inner">
          <h1>Polityka prywatności i plików cookies</h1>
          <p className="legal-page__updated">Ostatnia aktualizacja: {UPDATED}</p>

          <h2>1. Administrator danych</h2>
          <p>
            Administratorem danych osobowych przekazanych przez stronę {SITE_URL} jest {SITE_NAME} (dalej „my”). Kontakt w sprawach danych
            osobowych: <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </p>

          <h2>2. Jakie dane zbieramy i po co</h2>
          <ul>
            <li>
              <strong>Formularz kontaktowy</strong>: imię i nazwisko, adres e-mail, numer telefonu (opcjonalnie), data i miejsce ślubu oraz treść
              wiadomości. Przetwarzamy je, aby odpowiedzieć na zapytanie, przygotować wycenę i zarezerwować termin (art. 6 ust. 1 lit. b RODO –
              działania przed zawarciem umowy). Formularz obsługuje usługa FormSubmit, która przekazuje wiadomość na nasz adres e-mail.
            </li>
            <li>
              <strong>Telefon i e-mail</strong>: dane podane podczas rozmowy lub w wiadomości przetwarzamy w tym samym celu.
            </li>
            <li>
              <strong>Umowa wynajmu</strong>: dane potrzebne do zawarcia i wykonania umowy oraz do rozliczeń (art. 6 ust. 1 lit. b i c RODO).
            </li>
            <li>
              <strong>Statystyki odwiedzin</strong>: wyłącznie za Twoją zgodą (art. 6 ust. 1 lit. a RODO) korzystamy z Google Analytics 4, aby
              wiedzieć, które strony są czytane. Dane są pseudonimizowane; nie łączymy ich z danymi z formularza.
            </li>
          </ul>

          <h2>3. Jak długo przechowujemy dane</h2>
          <p>
            Zapytania bez rezerwacji usuwamy po 12 miesiącach od ostatniego kontaktu. Dane z umów przechowujemy przez okres wymagany przepisami
            podatkowymi i do przedawnienia roszczeń. Dane statystyczne Google Analytics są przechowywane przez 14 miesięcy.
          </p>

          <h2>4. Komu przekazujemy dane</h2>
          <p>
            Dostawcom usług, z których korzysta strona: hosting (Vercel Inc.), obsługa formularza (FormSubmit), poczta e-mail (Google) oraz, po
            wyrażeniu zgody, Google Ireland Ltd. (Google Analytics). Dostawcy spoza Europejskiego Obszaru Gospodarczego przetwarzają dane na
            podstawie standardowych klauzul umownych lub decyzji Komisji Europejskiej o adekwatności (Data Privacy Framework).
          </p>

          <h2>5. Twoje prawa</h2>
          <p>
            Masz prawo dostępu do danych, ich sprostowania, usunięcia, ograniczenia przetwarzania, przenoszenia oraz sprzeciwu, a w przypadku
            zgody – jej wycofania w dowolnym momencie bez wpływu na wcześniejsze przetwarzanie. Masz też prawo wnieść skargę do Prezesa Urzędu
            Ochrony Danych Osobowych. Wystarczy napisać na <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          </p>

          <h2>6. Pliki cookies</h2>
          <p>Strona używa dwóch rodzajów plików cookies:</p>
          <ul>
            <li>
              <strong>Niezbędne</strong> – plik <code>ads_consent</code> zapamiętujący Twoją decyzję o cookies (180 dni). Działa zawsze, nie
              wymaga zgody.
            </li>
            <li>
              <strong>Analityczne</strong> – pliki <code>_ga</code> i <code>_ga_*</code> Google Analytics 4 (do 400 dni), ustawiane tylko po
              kliknięciu „Akceptuję” w banerze. Przed zgodą żaden skrypt Google nie jest ładowany.
            </li>
          </ul>
          <p>
            Zgodę zmienisz w każdej chwili:{' '}
            {GA4_CONFIGURED ? (
              <button type="button" className="footer__link-button" onClick={openCookieSettings}>
                otwórz ustawienia cookies
              </button>
            ) : (
              'w ustawieniach cookies w stopce strony'
            )}
            . Pliki możesz też usunąć w ustawieniach przeglądarki.
          </p>

          <h2>7. Zmiany polityki</h2>
          <p>Aktualna wersja polityki jest zawsze dostępna pod adresem {SITE_URL}/polityka-prywatnosci. O istotnych zmianach poinformujemy na tej stronie.</p>

          <p style={{ marginTop: '2rem' }}>
            <Link to="/" className="btn btn-gold-outline">← Strona główna</Link>
          </p>
        </div>
      </section>
    </>
  )
}
