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
  gallery: [
    {
      full: '/images/bmw6/bmw6-front-1600.jpg',
      webp: '/images/bmw6/bmw6-front-800.webp',
      thumb: '/images/bmw6/bmw6-front-800.jpg',
      alt: 'BMW 650i xDrive Gran Coupé z dekoracją ślubną z białych kwiatów przed kościołem',
      caption: 'BMW 650i Gran Coupé — elegancja i moc na Wasz ślub',
    },
    {
      full: '/images/bmw6/bmw6-side-1600.jpg',
      webp: '/images/bmw6/bmw6-side-800.webp',
      thumb: '/images/bmw6/bmw6-side-800.jpg',
      alt: 'BMW 650i xDrive Gran Coupé udekorowane kwiatami – bok auta ślubnego',
      caption: 'Dekoracja florystyczna w cenie wynajmu',
    },
  ],
  features: [
    { icon: '🏎️', label: 'Silnik V8 4,4 l, 450 KM, napęd xDrive 4×4' },
    { icon: '🪑', label: 'Skórzana tapicerka, dużo miejsca na suknię z tyłu' },
    { icon: '🔥', label: 'Podgrzewane fotele przednie i tylne' },
    { icon: '🎵', label: 'System audio Harman Kardon' },
    { icon: '🌤️', label: 'Panoramiczny szklany dach' },
    { icon: '💨', label: 'Sportowy wydech — głęboki dźwięk V8' },
    { icon: '💐', label: 'Dekoracja florystyczna w cenie' },
    { icon: '👨‍✈️', label: 'Elegancki szofer w cenie' },
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
