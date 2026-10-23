import { Link } from 'react-router-dom'
import LocationPage from '../components/LocationPage'
import { EXTRA_KM_PRICE, FREE_RADIUS_KM, PACKAGE_HOURS, PRICE_MAX, PRICE_MIN } from '../data/site'

const cities = [
  { city: 'Warszawa', href: '/auto-do-slubu-warszawa' },
  { city: 'Radom', href: '/auto-do-slubu-radom' },
  { city: 'Grójec', href: '/blog/wynajem-auta-do-slubu-grojec' },
  { city: 'Kozienice', href: '/blog/wynajem-auta-do-slubu-kozienice' },
  { city: 'Białobrzegi', href: '/blog/wynajem-auta-do-slubu-bialobrzegi' },
  { city: 'Zwoleń', href: '/blog/wynajem-auta-do-slubu-zwolen' },
  { city: 'Pionki', href: '/blog/wynajem-auta-do-slubu-w-pionkach' },
  { city: 'Piaseczno', href: '/blog/wynajem-auta-do-slubu-piaseczno' },
  { city: 'Pruszków', href: '/blog/wynajem-auta-do-slubu-pruszkow' },
  { city: 'Otwock', href: '/blog/wynajem-auta-do-slubu-otwock' },
  { city: 'Legionowo', href: '/blog/wynajem-auta-do-slubu-legionowo' },
  { city: 'Siedlce', href: '/blog/wynajem-auta-do-slubu-w-siedlcach' },
  { city: 'Płońsk', href: '/blog/wynajem-auta-do-slubu-w-plonsku' },
  { city: 'Ciechanów', href: '/blog/wynajem-auta-do-slubu-w-ciechanowie' },
  { city: 'Garwolin', href: '/blog/wynajem-auta-do-slubu-w-garwolinie' },
  { city: 'Mińsk Mazowiecki', href: '/blog/wynajem-auta-do-slubu-w-minsku-mazowieckim' },
  { city: 'Żyrardów', href: '/blog/wynajem-auta-do-slubu-w-zyrardowie' },
  { city: 'Sochaczew', href: '/blog/wynajem-auta-do-slubu-sochaczew' },
  { city: 'Wyszków', href: '/blog/wynajem-auta-do-slubu-w-wyszkowie' },
  { city: 'Nowy Dwór Mazowiecki', href: '/blog/wynajem-auta-do-slubu-w-nowym-dworze-mazowieckim' },
  { city: 'Grodzisk Mazowiecki', href: '/blog/wynajem-auta-do-slubu-w-grodzisku-mazowieckim' },
  { city: 'Szydłowiec', href: null },
  { city: 'Przysucha', href: null },
  { city: 'Lipsko', href: null },
  { city: 'Ostrołęka', href: null },
  { city: 'Płock', href: null },
]

const page = {
  path: '/auto-do-slubu-mazowieckie',
  breadcrumb: 'Auto do ślubu Mazowieckie',
  metaTitle: 'Auto do Ślubu Mazowieckie – BMW z Szoferem w Całym Regionie',
  metaDescription: `Auto do ślubu na całym Mazowszu: BMW z szoferem, dekoracją i postojem na sesję. Pakiety ${PRICE_MIN}–${PRICE_MAX} zł, ${FREE_RADIUS_KM} km gratis od Warszawy lub Radomia.`,
  eyebrow: 'Wynajem auta ślubnego — całe Mazowsze',
  h1: 'Auto do Ślubu',
  h1Accent: 'Mazowieckie',
  lead: `Od Radomia i Warszawy po Siedlce, Płock i Ostrołękę: luksusowe BMW z szoferem dojedzie na ślub w każdej gminie Mazowsza. Pakiet ${PACKAGE_HOURS} h to ${PRICE_MIN}–${PRICE_MAX} zł, do ${FREE_RADIUS_KM} km od obu miast bez dopłat, dalej ${EXTRA_KM_PRICE} zł za kilometr.`,
  serviceName: 'Wynajem auta do ślubu w województwie mazowieckim',
  areaServed: cities.map((c) => c.city),
  sidebarTitle: 'Zapytaj o termin na Mazowszu',
  related: [
    { to: '/auto-do-slubu-warszawa', label: 'Auto do ślubu Warszawa' },
    { to: '/auto-do-slubu-radom', label: 'Auto do ślubu Radom' },
    { to: '/blog/kortez-weselny-planowanie', label: 'Jak zaplanować kortez weselny' },
  ],
  fleetTitle: 'Samochody do ślubu na całe Mazowsze',
  fleetSubtitle: 'BMW 650i Gran Coupé na każdą pogodę albo BMW 4 Cabrio na lato. Oba auta dojeżdżają w każdy zakątek województwa.',
  faqTitle: 'Pytania o auto do ślubu na Mazowszu',
  blogCategory: 'Mazowsze',
  blogTitle: 'Ślub na Mazowszu — porady z bloga',
  ctaEyebrow: 'Obsługujemy całe Mazowsze — 2026 / 2027',
  ctaTitle: 'Zarezerwuj auto do ślubu na Mazowszu',
  ctaText: 'Napiszcie miejscowość ślubu i wesela, a policzymy dokładną cenę z dojazdem. Odpowiadamy tego samego dnia.',
  faqs: [
    {
      question: 'Czy obsługujecie wynajem auta do ślubu poza Radomiem i Warszawą?',
      answer: `Tak, jeździmy na śluby w całym województwie mazowieckim: Grójec, Kozienice, Białobrzegi, Siedlce, Płońsk, Ciechanów, Żyrardów, Sochaczew i mniejsze gminy. Dojazd do ${FREE_RADIUS_KM} km od Radomia lub Warszawy jest w cenie pakietu.`,
    },
    {
      question: `Ile kosztuje dojazd poza ${FREE_RADIUS_KM} km od Radomia lub Warszawy?`,
      answer: `Poza promieniem ${FREE_RADIUS_KM} km doliczamy ${EXTRA_KM_PRICE} zł za każdy kilometr trasy dojazdowej. Przy ślubach w sąsiednich województwach (łódzkie, świętokrzyskie, lubelskie) podajemy jedną cenę za całość po zapytaniu.`,
    },
    {
      question: 'Czy można zamówić kortez weselny na Mazowszu?',
      answer: 'Tak. Dysponujemy dwoma BMW, które możemy uzupełnić autami zaprzyjaźnionych firm. Koordynujemy szoferów, kolejność aut i trasę, tak aby orszak dojechał razem pod kościół i na salę.',
    },
    {
      question: 'Jak wcześnie rezerwować auto na ślub pod Warszawą lub Radomiem?',
      answer: 'Na soboty od maja do września najlepiej pół roku do roku wcześniej. Śluby w piątki, niedziele i poza sezonem można rezerwować bliżej terminu. Sprawdzenie dostępności jest bezpłatne i niezobowiązujące.',
    },
  ],
  content: (
    <>
      <h2>Wynajem auta do ślubu na Mazowszu</h2>
      <p>
        Województwo mazowieckie to tysiące kościołów, dworków i stodół weselnych, często kilkadziesiąt kilometrów od większego miasta. Nasze dwa
        BMW z szoferem dojeżdżają wszędzie tam, gdzie planujecie ślub: do wiejskiej parafii pod Kozienicami, pałacu w Radziejowicach czy sali
        weselnej pod Siedlcami.
      </p>
      <p>
        Auta stacjonują w Radomiu i obsługują także Warszawę, więc cały południowy i środkowy region jest w zasięgu bezpłatnego dojazdu. Dalsze
        trasy wyceniamy jasno: {EXTRA_KM_PRICE} zł za kilometr poza {FREE_RADIUS_KM} km, bez ukrytych opłat.
      </p>

      <h3>Co oferujemy Parom Młodym na Mazowszu</h3>
      <ul className="location-list">
        <li>✅ <Link to="/flota/bmw-650i-gran-coupe">BMW 650i Gran Coupé</Link> lub <Link to="/flota/bmw-4-cabrio">BMW 4 Cabrio</Link> z szoferem</li>
        <li>✅ Dekoracja florystyczna w każdym pakiecie</li>
        <li>✅ Postój na sesję w plenerze: nad Pilicą, w Kampinosie, w pałacowym parku</li>
        <li>✅ Dojazd gratis do {FREE_RADIUS_KM} km od Radomia lub Warszawy</li>
        <li>✅ Kortez weselny z kilku aut</li>
        <li>✅ Wesela w sąsiednich województwach po jednej, ustalonej cenie</li>
      </ul>

      <h3>Popularne miejsca ślubów na Mazowszu</h3>
      <ul className="location-list">
        <li>🏰 Pałace i dworki: Wilanów, Radziejowice, Jabłonna, Opinogóra, Chlewiska</li>
        <li>⛪ Sanktuaria i kościoły: Niepokalanów, Czerwińsk, Studzianna, Wysokie Koło</li>
        <li>🌿 Śluby plenerowe: nad Wisłą, nad Pilicą, w Puszczy Kampinoskiej i Kozienickiej</li>
        <li>🏨 Stodoły weselne, winnice i hotele w całym województwie</li>
      </ul>

      <h3>Miasta i gminy, do których jeździmy</h3>
      <div className="location-cities">
        {cities.map(({ city, href }) =>
          href ? (
            <Link key={city} to={href} className="location-city-tag location-city-tag--link">📍 {city}</Link>
          ) : (
            <span key={city} className="location-city-tag">📍 {city}</span>
          ),
        )}
      </div>

      <h3>Sąsiednie województwa</h3>
      <p>
        Obsługujemy też wesela w województwach łódzkim, świętokrzyskim i lubelskim, na przykład w Skarżysku-Kamiennej, Starachowicach, Ostrowcu
        Świętokrzyskim, Puławach czy Tomaszowie Mazowieckim. Cena obejmuje wtedy cały dojazd i jest znana przed rezerwacją.
      </p>
    </>
  ),
}

export default function MazowieckiePage() {
  return <LocationPage page={page} />
}
