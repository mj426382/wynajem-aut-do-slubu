import CarPage from '../components/CarPage'
import { PRICE_MAX, PRICE_MIN } from '../data/site'

const car = {
  path: '/flota/bmw-4-cabrio',
  name: 'BMW 4 Cabrio (G23)',
  shortName: 'BMW 4 Cabrio',
  metaTitle: 'Kabriolet do Ślubu Warszawa – BMW 4 Cabrio z Kierowcą',
  metaDescription: `Cabrio do ślubu w Warszawie i Radomiu: BMW 4 Cabrio z kierowcą, dachem otwieranym w 18 s i dekoracją. Pakiety ${PRICE_MIN}–${PRICE_MAX} zł.`,
  eyebrow: 'Cabrio do ślubu — Warszawa, Radom, Mazowsze',
  h1: 'BMW 4',
  h1Accent: 'Cabrio',
  lead: 'Elektryczny miękki dach, koniakowa skóra i sportowy pakiet Maxton Design. Wjazd pod kościół z otwartym dachem to kadr, który Para Młoda i goście pamiętają latami.',
  gallery: [
    {
      full: '/images/bmw4/bmw4-front-villa-1600.jpg',
      webp: '/images/bmw4/bmw4-front-villa-800.webp',
      thumb: '/images/bmw4/bmw4-front-villa-800.jpg',
      alt: 'BMW 4 Cabrio G23 – białe auto ślubne przed willą, widok z przodu',
      caption: 'BMW 4 Cabrio — koniakowa tapicerka i pakiet Maxton Design',
    },
    {
      full: '/images/bmw4/bmw4-front-angle-1600.jpg',
      webp: '/images/bmw4/bmw4-front-angle-800.webp',
      thumb: '/images/bmw4/bmw4-front-angle-800.jpg',
      alt: 'BMW 4 Cabrio G23 – widok 3/4 z przodu, białe auto ślubne',
      caption: 'BMW 4 Cabrio — do zdjęć ślubnych i efektownego wjazdu',
    },
    {
      full: '/images/bmw4/bmw4-original-1600.jpg',
      webp: '/images/bmw4/bmw4-original-800.webp',
      thumb: '/images/bmw4/bmw4-original-800.jpg',
      alt: 'BMW 4 Cabrio G23 – białe auto ślubne z odkrytym dachem udekorowane kwiatami',
      caption: 'BMW 4 Cabrio — romantyczny kabriolet na Wasz ślub',
    },
  ],
  features: [
    { icon: 'wind', label: 'Elektryczny miękki dach — otwiera się w 18 sekund' },
    { icon: 'seat', label: 'Koniakowa tapicerka skórzana' },
    { icon: 'flame', label: 'Podgrzewane fotele i ogrzewanie szyi' },
    { icon: 'music', label: 'System audio Hi-Fi BMW' },
    { icon: 'gauge', label: 'Pakiet aerodynamiczny Maxton Design' },
    { icon: 'flower', label: 'Dekoracja florystyczna w cenie' },
    { icon: 'chauffeur', label: 'Elegancki szofer w cenie' },
  ],
  description: (
    <>
      <p>
        <strong>BMW 4 Cabrio G23</strong> wybierają Pary, które chcą wjazdu z otwartym dachem i zdjęć bez szyby między obiektywem a Parą Młodą.
        Dach otwiera się i zamyka elektrycznie w 18 sekund, więc przelotny deszcz nie psuje planu.
      </p>
      <p>
        Koniakowa skóra, podgrzewane fotele i ogrzewanie szyi sprawiają, że kabriolet jest wygodny także w chłodniejszy wieczór. Najlepiej
        wygląda na ślubach od maja do września, w słońcu i w plenerze.
      </p>
    </>
  ),
  faqs: [
    {
      question: 'Czy kabriolet nadaje się na ślub, gdy zapowiadają deszcz?',
      answer: 'Tak. Dach zamyka się w 18 sekund, więc szofer zamknie go przed kroplami, a otworzy pod kościołem na wyjście Pary. Na śluby od października do kwietnia polecamy jednak BMW 650i Gran Coupé.',
    },
    {
      question: 'Czy w BMW 4 Cabrio zmieści się suknia ślubna?',
      answer: 'Tak, Para Młoda siada z tyłu na kanapie dwuosobowej, a przy otwartym dachu wsiadanie w sukni jest wygodniejsze niż w zamkniętym aucie. Większe treny układamy razem przed ruszeniem.',
    },
    {
      question: 'Czy fryzura i welon przetrwają jazdę z otwartym dachem?',
      answer: 'Na krótkich odcinkach w mieście tak; szofer jedzie spokojnie, a wiatr przy niskiej prędkości jest niewielki. Dłuższe trasy między miejscowościami pokonujemy z zamkniętym dachem i otwieramy go przed celem.',
    },
  ],
}

export default function BMW4CabrioPage() {
  return <CarPage car={car} />
}
