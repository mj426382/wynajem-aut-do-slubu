import CarPage from '../components/CarPage'
import { PRICE_MAX, PRICE_MIN } from '../data/site'

const car = {
  path: '/flota/bmw-650i-gran-coupe',
  name: 'BMW 650i xDrive Gran Coupé (F06)',
  shortName: 'BMW 650i Gran Coupé',
  metaTitle: 'BMW 650i Gran Coupé do Ślubu – Auto z Szoferem',
  metaDescription: `BMW 650i Gran Coupé do ślubu: V8, napęd 4×4, z szoferem, dekoracją i postojem na sesję. Warszawa, Radom, Mazowsze. Pakiety ${PRICE_MIN}–${PRICE_MAX} zł.`,
  eyebrow: 'Luksusowe auto ślubne — Warszawa i Radom',
  h1: 'BMW 650i xDrive',
  h1Accent: 'Gran Coupé',
  lead: 'Czterodrzwiowe coupé z silnikiem V8 450 KM i napędem xDrive. Wygodne dla sukni, imponujące pod kościołem, pewne na każdej drodze i w każdą pogodę.',
  heroDesktop: '/images/bmw6/bmw6-wedding-portrait-1600.jpg',
  gallery: [
    {
      full: '/images/bmw6/bmw6-wedding-1600.jpg',
      webp: '/images/bmw6/bmw6-wedding-800.webp',
      thumb: '/images/bmw6/bmw6-wedding-800.jpg',
      alt: 'Białe BMW 650i xDrive Gran Coupé z dekoracją ślubną, obok Para Młoda i fajerwerki',
      caption: 'BMW 650i Gran Coupé na ślubie — Para Młoda i pokaz fajerwerków',
    },
    {
      full: '/images/bmw6/bmw6-wedding-portrait-1600.jpg',
      webp: '/images/bmw6/bmw6-wedding-portrait-800.webp',
      thumb: '/images/bmw6/bmw6-wedding-portrait-800.jpg',
      alt: 'BMW 650i Gran Coupé i całująca się Para Młoda pod kurtyną fajerwerków',
      caption: 'Prawdziwy ślub z naszym BMW 650i — dekoracja w cenie wynajmu',
    },
  ],
  features: [
    { icon: 'gauge', label: 'Silnik V8 4,4 l, 450 KM, napęd xDrive 4×4' },
    { icon: 'seat', label: 'Skórzana tapicerka, dużo miejsca na suknię z tyłu' },
    { icon: 'flame', label: 'Podgrzewane fotele przednie i tylne' },
    { icon: 'music', label: 'System audio Harman Kardon' },
    { icon: 'sun', label: 'Panoramiczny szklany dach' },
    { icon: 'wind', label: 'Sportowy wydech — głęboki dźwięk V8' },
    { icon: 'flower', label: 'Dekoracja florystyczna w cenie' },
    { icon: 'chauffeur', label: 'Elegancki szofer w cenie' },
  ],
  description: (
    <>
      <p>
        <strong>BMW 650i xDrive Gran Coupé</strong> to auto do ślubu na każdą porę roku. Cztery drzwi ułatwiają wsiadanie w sukni, długa
        linia nadwozia dobrze wygląda na zdjęciach przed kościołem, a napęd 4×4 daje pewność jazdy w deszczu, na mokrym bruku i zimą.
      </p>
      <p>
        W środku: skórzana tapicerka, podgrzewane fotele i panoramiczny dach, pod maską silnik V8 o mocy 450 KM. Para Młoda siada z tyłu,
        szofer prowadzi, a goście słyszą charakterystyczny dźwięk wydechu, zanim auto pojawi się na ulicy.
      </p>
    </>
  ),
  faqs: [
    {
      question: 'Ile osób mieści BMW 650i Gran Coupé?',
      answer: 'Z tyłu wygodnie siedzi Para Młoda, także w obszernej sukni; auto ma cztery drzwi, więc wsiadanie jest łatwe. Z przodu jedzie szofer, a na przednim fotelu może usiąść świadek lub dziecko.',
    },
    {
      question: 'Czy BMW 650i sprawdzi się zimą i w deszczu?',
      answer: 'Tak, to najlepszy wybór na trudną pogodę: napęd xDrive 4×4, podgrzewane fotele i zamknięte nadwozie. Z tego powodu polecamy je na śluby od października do kwietnia.',
    },
    {
      question: 'Jaki jest kolor auta i dekoracji?',
      answer: 'Auto jest białe z jasną skórzaną tapicerką. Dekoracja to białe wstążki i bukiet w kolorach, które ustalamy z Parą Młodą, na przykład pod bukiet ślubny lub motyw wesela.',
    },
  ],
}

export default function BMW650iPage() {
  return <CarPage car={car} />
}
