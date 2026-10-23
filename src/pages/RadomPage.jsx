import { Link } from 'react-router-dom'
import LocationPage from '../components/LocationPage'
import { DEPOSIT_PERCENT, FREE_RADIUS_KM, PACKAGE_HOURS, PRICE_MAX, PRICE_MIN } from '../data/site'

const towns = ['Kozienice', 'Białobrzegi', 'Zwoleń', 'Pionki', 'Grójec', 'Nowe Miasto nad Pilicą', 'Przysucha', 'Szydłowiec', 'Lipsko', 'Iłża', 'Skaryszew', 'Jedlnia-Letnisko', 'Wolanów', 'Jedlińsk']

const page = {
  path: '/auto-do-slubu-radom',
  breadcrumb: 'Auto do ślubu Radom',
  metaTitle: 'Auto do Ślubu Radom – BMW z Szoferem od 800 zł',
  metaDescription: `Auto do ślubu w Radomiu: BMW Gran Coupé lub Cabrio z szoferem, dekoracją i postojem na sesję. Od ${PRICE_MIN} zł, dojazd gratis do ${FREE_RADIUS_KM} km od Radomia.`,
  eyebrow: 'Wynajem auta ślubnego — Radom i okolice',
  h1: 'Auto do Ślubu',
  h1Accent: 'Radom',
  lead: `Radomska firma z luksusowymi BMW na ślub: szofer, dekoracja florystyczna i postój na sesję w cenie. Pakiet ${PACKAGE_HOURS} h od ${PRICE_MIN} zł, dojazd gratis do ${FREE_RADIUS_KM} km od Radomia, czyli Kozienice, Białobrzegi, Zwoleń, Pionki i Grójec bez dopłat.`,
  serviceName: 'Wynajem auta do ślubu w Radomiu',
  areaServed: ['Radom', ...towns],
  sidebarTitle: 'Zapytaj o termin w Radomiu',
  related: [
    { to: '/auto-do-slubu-warszawa', label: 'Auto do ślubu Warszawa' },
    { to: '/auto-do-slubu-mazowieckie', label: 'Auto do ślubu Mazowieckie' },
    { to: '/blog/slub-w-radomiu-top-sala-weselna-i-auto', label: 'Sale weselne w Radomiu' },
  ],
  fleetTitle: 'Samochody do ślubu dostępne w Radomiu',
  fleetSubtitle: 'Oba BMW stacjonują w Radomiu, więc do każdego kościoła w mieście i powiecie przyjeżdżamy z dużym zapasem czasu.',
  faqTitle: 'Pytania o auto do ślubu w Radomiu',
  blogCategory: 'Radom',
  blogTitle: 'Ślub w Radomiu — porady z bloga',
  ctaEyebrow: 'Wolne terminy 2026 / 2027 — Radom',
  ctaTitle: 'Zarezerwuj auto do ślubu w Radomiu',
  ctaText: 'W Radomiu i okolicach sezon trwa od maja do października, a soboty znikają pierwsze. Napiszcie datę i parafię, odpowiemy tego samego dnia.',
  faqs: [
    {
      question: 'Ile kosztuje wynajem auta do ślubu w Radomiu?',
      answer: `Pakiet ${PACKAGE_HOURS}-godzinny z szoferem kosztuje od ${PRICE_MIN} zł do ${PRICE_MAX} zł, zależnie od auta i terminu. Dekoracja florystyczna, postój na sesję i dojazd w promieniu ${FREE_RADIUS_KM} km od Radomia są w cenie. Rezerwację potwierdza zadatek ${DEPOSIT_PERCENT}%.`,
    },
    {
      question: 'Jakie auta do ślubu oferujecie w Radomiu?',
      answer: 'BMW 650i xDrive Gran Coupé (V8 450 KM, napęd 4×4, cztery drzwi) oraz BMW 4 Cabrio (G23) z elektrycznie otwieranym dachem. Oba auta są białe, z jasną skórzaną tapicerką, i przyjeżdżają udekorowane.',
    },
    {
      question: 'Jaki obszar wokół Radomia obsługujecie bez dopłat?',
      answer: `Wszystko w promieniu ${FREE_RADIUS_KM} km od Radomia: Kozienice, Białobrzegi, Zwoleń, Pionki, Grójec, Skaryszew, Iłżę, Szydłowiec, Przysuchę, Jedlnię-Letnisko. Dalsze miejscowości, na przykład Lipsko czy Nowe Miasto nad Pilicą, wyceniamy indywidualnie.`,
    },
    {
      question: 'Gdzie w Radomiu zrobić zdjęcia ślubne z autem?',
      answer: 'Pary najczęściej wybierają Park Leśniczówka, Stary Ogród, skansen Muzeum Wsi Radomskiej, okolice katedry i radomski Rynek. Postój na sesję jest w pakiecie, a szofer podjeżdża tam, gdzie wskaże fotograf.',
    },
  ],
  content: (
    <>
      <h2>Luksusowe auto do ślubu w Radomiu</h2>
      <p>
        Jesteśmy firmą z Radomia i od lat wozimy Pary Młode do radomskich kościołów i sal weselnych w całym powiecie. Nasz samochód ślubny
        to część uroczystości: białe BMW udekorowane kwiatami przed katedrą, efektowny wjazd na salę i zdjęcia, które zostają na lata.
      </p>
      <p>
        Do wyboru są <Link to="/flota/bmw-650i-gran-coupe">BMW 650i xDrive Gran Coupé</Link>, czterodrzwiowe coupé z silnikiem V8 i napędem 4×4,
        oraz <Link to="/flota/bmw-4-cabrio">BMW 4 Cabrio</Link>, kabriolet idealny na ciepłe miesiące. W obu przypadkach szofer, dekoracja i postój
        na sesję są w cenie.
      </p>

      <h3>Co zawiera wynajem auta do ślubu w Radomiu</h3>
      <ul className="location-list">
        <li>✅ Elegancki, punktualny szofer w cenie wynajmu</li>
        <li>✅ Dekoracja florystyczna dopasowana do kolorów wesela</li>
        <li>✅ Postój na sesję zdjęciową bez limitu w ramach pakietu</li>
        <li>✅ Dojazd gratis do {FREE_RADIUS_KM} km od Radomia</li>
        <li>✅ Dwa luksusowe BMW do wyboru lub kortez z obu aut</li>
        <li>✅ Umowa i potwierdzony termin</li>
      </ul>

      <h3>Kościoły w Radomiu, pod które podjeżdżamy</h3>
      <p>
        Katedra Opieki NMP, kościół św. Jana Chrzciciela (fara), kościół Bernardynów, kościół św. Kazimierza, kościół Garnizonowy, parafie na
        Ustroniu, Gołębiowie, Borkach i Południu, a także USC w Radomiu przy ul. Moniuszki. Znamy miejsca, gdzie przy każdym z nich auto może
        stanąć na wyjście Pary Młodej.
      </p>

      <h3>Sale weselne w Radomiu i okolicach</h3>
      <p>
        Dowozimy na wesela w mieście i w powiecie radomskim: do dworków i hoteli w Radomiu, sal w Jedlni-Letnisku, Skaryszewie, Kozienicach,
        Białobrzegach i Grójcu. Trasę planujemy tak, aby Para była na sali przed gośćmi, a fotograf miał czas na zdjęcia po drodze.
      </p>

      <h3>Miejscowości wokół Radomia</h3>
      <div className="location-cities">
        {towns.map((t) => (
          <span key={t} className="location-city-tag">📍 {t}</span>
        ))}
      </div>
      <p>
        Ślub dalej od Radomia? Zobacz stronę <Link to="/auto-do-slubu-mazowieckie">auto do ślubu Mazowieckie</Link>, jeździmy też do województw
        świętokrzyskiego, lubelskiego i łódzkiego.
      </p>
    </>
  ),
}

export default function RadomPage() {
  return <LocationPage page={page} />
}
