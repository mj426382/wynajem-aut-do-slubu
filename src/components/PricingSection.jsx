import { Link } from 'react-router-dom'
import { DEPOSIT_PERCENT, EXTRA_KM_PRICE, FREE_RADIUS_KM, PACKAGE_HOURS, PRICE_MAX, PRICE_MIN } from '../data/site'

/** Honest price table from src/data/site.js – the same numbers appear in FAQ answers, schema and the blog bot prompt. */
export default function PricingSection() {
  return (
    <section className="pricing" id="cennik" aria-labelledby="pricing-title">
      <div className="container">
        <h2 className="section-title" id="pricing-title">Ile kosztuje auto do ślubu?</h2>
        <div className="section-divider" aria-hidden="true"></div>
        <p className="section-subtitle">
          Pakiet podstawowy to {PACKAGE_HOURS} godziny z szoferem. Cena zależy od auta, miasta i terminu: od {PRICE_MIN} zł do {PRICE_MAX} zł.
        </p>
        <div className="pricing__table-wrap">
          <table className="pricing__table">
            <thead>
              <tr>
                <th scope="col">Co obejmuje pakiet</th>
                <th scope="col">W cenie</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{PACKAGE_HOURS} godziny z eleganckim szoferem (dojazd po Parę, kościół lub USC, sesja, sala)</td>
                <td>✅ tak</td>
              </tr>
              <tr>
                <td>Dekoracja florystyczna auta (wstążki, bukiet na masce, wnętrze)</td>
                <td>✅ tak</td>
              </tr>
              <tr>
                <td>Postój na sesję zdjęciową w wybranym miejscu</td>
                <td>✅ tak</td>
              </tr>
              <tr>
                <td>Dojazd w promieniu {FREE_RADIUS_KM} km od Warszawy lub Radomia</td>
                <td>✅ tak</td>
              </tr>
              <tr>
                <td>Każda dodatkowa godzina lub kilometry poza {FREE_RADIUS_KM} km</td>
                <td>wycena indywidualna ({EXTRA_KM_PRICE} zł/km)</td>
              </tr>
              <tr>
                <td>Rezerwacja terminu</td>
                <td>zadatek {DEPOSIT_PERCENT}% ceny, reszta w dniu ślubu</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="pricing__note">
          Dokładną cenę dla Waszej daty i trasy podajemy w ciągu kilku godzin od zapytania. <Link to="/kontakt">Napiszcie, kiedy i gdzie bierzecie ślub</Link>.
        </p>
      </div>
    </section>
  )
}
