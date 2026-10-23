import { Link } from 'react-router-dom'
import LocationPage from '../components/LocationPage'
import { DEPOSIT_PERCENT, FREE_RADIUS_KM, PACKAGE_HOURS, PRICE_MAX, PRICE_MIN } from '../data/site'

const districts = ['Śródmieście', 'Mokotów', 'Wilanów', 'Ursynów', 'Żoliborz', 'Bielany', 'Wola', 'Bemowo', 'Praga-Południe', 'Praga-Północ', 'Białołęka', 'Targówek', 'Wawer', 'Ochota', 'Włochy', 'Ursus']
const suburbs = ['Pruszków', 'Piaseczno', 'Legionowo', 'Łomianki', 'Marki', 'Ząbki', 'Otwock', 'Józefów', 'Konstancin-Jeziorna', 'Raszyn', 'Sulejówek', 'Wołomin']

const page = {
  path: '/auto-do-slubu-warszawa',
  breadcrumb: 'Auto do ślubu Warszawa',
  metaTitle: 'Auto do Ślubu Warszawa – BMW z Szoferem, Dekoracja Gratis',
  metaDescription: `Wynajem auta do ślubu w Warszawie: BMW 650i Gran Coupé lub BMW 4 Cabrio z szoferem, dekoracją i postojem na sesję. Pakiety ${PRICE_MIN}–${PRICE_MAX} zł, wszystkie dzielnice.`,
  eyebrow: 'Wynajem auta ślubnego — Warszawa i aglomeracja',
  h1: 'Auto do Ślubu',
  h1Accent: 'Warszawa',
  lead: `Luksusowe BMW z szoferem na ślub w Warszawie: wjazd pod kościół lub Pałac Ślubów, postój na sesję na Starym Mieście albo w Łazienkach i przyjazd na salę bez stresu o korki. Pakiet ${PACKAGE_HOURS} h kosztuje ${PRICE_MIN}–${PRICE_MAX} zł z dekoracją florystyczną w cenie.`,
  serviceName: 'Wynajem auta do ślubu w Warszawie',
  areaServed: ['Warszawa', ...suburbs],
  sidebarTitle: 'Zapytaj o termin w Warszawie',
  related: [
    { to: '/auto-do-slubu-radom', label: 'Auto do ślubu Radom' },
    { to: '/auto-do-slubu-mazowieckie', label: 'Auto do ślubu Mazowieckie' },
    { to: '/blog/najlepsze-lokalizacje-sesji-z-auto-warszawa', label: 'Miejsca na sesję z autem w Warszawie' },
  ],
  fleetTitle: 'Samochody do ślubu dostępne w Warszawie',
  fleetSubtitle: 'Oba BMW stacjonują na trasie Radom–Warszawa i przyjeżdżają do każdej dzielnicy stolicy z zapasem czasu.',
  faqTitle: 'Pytania o auto do ślubu w Warszawie',
  blogCategory: 'Warszawa',
  blogTitle: 'Ślub w Warszawie — porady z bloga',
  ctaEyebrow: 'Wolne terminy 2026 / 2027 — Warszawa',
  ctaTitle: 'Zarezerwuj auto do ślubu w Warszawie',
  ctaText: 'Soboty w sezonie w Warszawie rezerwowane są najwcześniej. Napiszcie datę i parafię lub USC, a tego samego dnia potwierdzimy dostępność.',
  faqs: [
    {
      question: 'Ile kosztuje wynajem auta do ślubu w Warszawie?',
      answer: `Pakiet ${PACKAGE_HOURS}-godzinny z szoferem kosztuje od ${PRICE_MIN} zł do ${PRICE_MAX} zł, zależnie od auta i terminu. W cenie jest dekoracja florystyczna, postój na sesję zdjęciową i dojazd w promieniu ${FREE_RADIUS_KM} km od Warszawy. Rezerwację potwierdza zadatek ${DEPOSIT_PERCENT}%.`,
    },
    {
      question: 'Czy obsługujecie wszystkie dzielnice Warszawy?',
      answer: 'Tak: Śródmieście, Mokotów, Wilanów, Ursynów, Żoliborz, Bielany, Wola, Bemowo, obie Pragi, Białołękę, Targówek, Wawer, Ochotę, Włochy i Ursus, a także miasta aglomeracji jak Pruszków, Piaseczno, Legionowo czy Otwock. Szofer planuje trasę z buforem na korki i zamknięte ulice.',
    },
    {
      question: 'Gdzie w Warszawie zatrzymać się na sesję zdjęciową z autem?',
      answer: 'Najczęściej wybierane miejsca to Stare Miasto i Plac Zamkowy, Łazienki Królewskie, Pałac w Wilanowie, bulwary wiślane i Ogród Saski. Postój na sesję jest w cenie pakietu, czas ustalamy z fotografem.',
    },
    {
      question: 'Czy auto podjedzie pod USC lub Pałac Ślubów w Warszawie?',
      answer: 'Tak. Szofer podjeżdża pod wejście Pałacu Ślubów przy placu Zamkowym, pod każdy urząd stanu cywilnego i kościół w Warszawie, a jeśli przepisy ruchu nie pozwalają na postój, zatrzymuje się w najbliższym dozwolonym miejscu i wraca na umówiony sygnał.',
    },
  ],
  content: (
    <>
      <h2>Luksusowy samochód ślubny w Warszawie</h2>
      <p>
        Warszawa daje Parom Młodym wszystko: zabytkowe kościoły na Starówce i Krakowskim Przedmieściu, Pałac Ślubów przy placu Zamkowym,
        nowoczesne sale na Wilanowie i Mokotowie. Ma też korki, remonty i strefy z zakazem zatrzymywania. Dlatego auto do ślubu w Warszawie
        to nie tylko wygląd, ale przede wszystkim szofer, który zna miasto i wie, którędy jechać w sobotnie popołudnie.
      </p>
      <p>
        Oferujemy dwa BMW z kierowcą: <Link to="/flota/bmw-650i-gran-coupe">BMW 650i xDrive Gran Coupé</Link> na każdą pogodę oraz{' '}
        <Link to="/flota/bmw-4-cabrio">BMW 4 Cabrio</Link> na letnie śluby z otwartym dachem. Oba przyjeżdżają udekorowane kwiatami i wstążkami,
        a w pakiecie jest postój na sesję zdjęciową.
      </p>

      <h3>Co zawiera wynajem auta do ślubu w Warszawie</h3>
      <ul className="location-list">
        <li>✅ Elegancki szofer znający Warszawę i trasy alternatywne</li>
        <li>✅ Dekoracja florystyczna dopasowana do kolorystyki wesela</li>
        <li>✅ Postój na sesję: Stare Miasto, Łazienki, Wilanów lub inne miejsce</li>
        <li>✅ Dojazd po Parę Młodą w dowolnej dzielnicy bez dopłat</li>
        <li>✅ Przyjazd na salę weselną w Warszawie lub pod miastem</li>
        <li>✅ Organizacja kortezu z kilku aut</li>
      </ul>

      <h3>Kościoły i urzędy, pod które podjeżdżamy najczęściej</h3>
      <p>
        Bazylika Świętego Krzyża na Krakowskim Przedmieściu, Archikatedra św. Jana Chrzciciela na Starym Mieście, kościół św. Anny, kościół
        Wizytek, kościół św. Marcina, parafie na Mokotowie, Wilanowie, Żoliborzu i Ursynowie, a z urzędów Pałac Ślubów przy placu Zamkowym
        i USC w poszczególnych dzielnicach. Przed ślubem sprawdzamy, gdzie przy kościele można się zatrzymać na wyjście Pary.
      </p>

      <h3>Sale weselne w Warszawie i okolicach</h3>
      <p>
        Dowozimy Pary Młode do hoteli i restauracji w centrum, pałaców i dworków pod miastem oraz stodół weselnych w kierunku Konstancina,
        Serocka, Otwocka i Grodziska. Po sesji szofer wybiera trasę tak, aby Para Młoda była na sali przed gośćmi.
      </p>

      <h3>Dzielnice Warszawy, które obsługujemy</h3>
      <div className="location-cities">
        {districts.map((d) => (
          <span key={d} className="location-city-tag">📍 {d}</span>
        ))}
      </div>

      <h3>Aglomeracja warszawska bez dopłat do {FREE_RADIUS_KM} km</h3>
      <div className="location-cities">
        {suburbs.map((d) => (
          <span key={d} className="location-city-tag">📍 {d}</span>
        ))}
      </div>
      <p>
        Dalsze miejscowości na Mazowszu wyceniamy indywidualnie, zobacz stronę <Link to="/auto-do-slubu-mazowieckie">auto do ślubu Mazowieckie</Link>.
      </p>
    </>
  ),
}

export default function WarszawaPage() {
  return <LocationPage page={page} />
}
