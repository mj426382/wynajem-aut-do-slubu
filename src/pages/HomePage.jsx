import SEO from '../components/SEO'
import HeroSection from '../components/HeroSection'
import FleetSection from '../components/FleetSection'
import FeaturesSection from '../components/FeaturesSection'
import PricingSection from '../components/PricingSection'
import ProcessSection from '../components/ProcessSection'
import LatestPosts from '../components/LatestPosts'
import FAQSection, { faqSchema } from '../components/FAQSection'
import CTASection from '../components/CTASection'
import {
  CARS, DEPOSIT_PERCENT, EMAIL, EXTRA_KM_PRICE, FREE_RADIUS_KM, LOGO_URL, ORG_ID, PACKAGE_HOURS, PHONE_E164, PRICE_MAX, PRICE_MIN,
  SERVING_SINCE, SITE_NAME, SITE_URL, WEBSITE_ID,
} from '../data/site'

const faqs = [
  {
    question: 'Ile kosztuje wynajem auta do ślubu w Warszawie lub Radomiu?',
    answer: `Pakiet podstawowy, czyli ${PACKAGE_HOURS} godziny z szoferem, kosztuje od ${PRICE_MIN} zł do ${PRICE_MAX} zł w zależności od auta, miasta i terminu. W cenie jest dekoracja florystyczna, postój na sesję zdjęciową i dojazd do ${FREE_RADIUS_KM} km od Warszawy lub Radomia. Dokładną cenę dla Waszej daty podajemy po zapytaniu.`,
  },
  {
    question: 'Jak wcześnie trzeba rezerwować samochód do ślubu?',
    answer: `Soboty od maja do września rezerwowane są zwykle 6–12 miesięcy wcześniej, bywa, że i dłużej. Terminy jesienne i zimowe oraz dni powszednie są dostępne bliżej daty. Rezerwację potwierdza zadatek w wysokości ${DEPOSIT_PERCENT}% ceny.`,
  },
  {
    question: 'Czy auto ślubne jest dekorowane?',
    answer: 'Tak, dekoracja florystyczna jest w każdym pakiecie: białe wstążki, bukiet na masce i dekoracja wnętrza. Na życzenie dopasowujemy kolory do motywu wesela, ustalamy to w tygodniu przed ślubem.',
  },
  {
    question: 'Jaki obszar obejmuje wynajem auta do ślubu?',
    answer: `Obsługujemy Warszawę, Radom i całe województwo mazowieckie, między innymi Grójec, Kozienice, Białobrzegi, Piaseczno, Pruszków, Legionowo i Otwock. Dojazd do ${FREE_RADIUS_KM} km od Warszawy lub Radomia jest bezpłatny, dalej liczymy ${EXTRA_KM_PRICE} zł za kilometr. Jeździmy też do województw łódzkiego, świętokrzyskiego i lubelskiego.`,
  },
  {
    question: 'Czy można zamówić kilka aut na kortez weselny?',
    answer: 'Tak. Dysponujemy dwoma BMW, a przy większym orszaku uzupełniamy go autami zaprzyjaźnionych firm. Koordynujemy szoferów i trasę, tak aby cały kortez dojechał razem.',
  },
  {
    question: 'Które auto wybrać: BMW 650i Gran Coupé czy BMW 4 Cabrio?',
    answer: 'Gran Coupé to wybór na każdą pogodę i porę roku: cztery drzwi, dużo miejsca na suknię, napęd 4×4. Cabrio jest idealne od maja do września, gdy liczy się wjazd z otwartym dachem i zdjęcia. Jeśli pogoda zawiedzie, dach kabrioletu zamyka się w 18 sekund.',
  },
]

const organization = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'LimousineService'],
  '@id': ORG_ID,
  name: SITE_NAME,
  url: `${SITE_URL}/`,
  logo: LOGO_URL,
  image: `${SITE_URL}/og-image.jpg`,
  telephone: PHONE_E164,
  email: EMAIL,
  description: `Wynajem auta do ślubu z szoferem w Warszawie, Radomiu i na Mazowszu: BMW 650i xDrive Gran Coupé i BMW 4 Cabrio z dekoracją florystyczną i postojem na sesję zdjęciową. Pakiety ${PRICE_MIN}–${PRICE_MAX} zł.`,
  foundingDate: String(SERVING_SINCE),
  priceRange: `${PRICE_MIN}-${PRICE_MAX} PLN`,
  currenciesAccepted: 'PLN',
  areaServed: [
    { '@type': 'City', name: 'Warszawa' },
    { '@type': 'City', name: 'Radom' },
    { '@type': 'AdministrativeArea', name: 'województwo mazowieckie' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Auta do ślubu z szoferem',
    itemListElement: CARS.map((car) => ({
      '@type': 'Offer',
      itemOffered: { '@type': 'Service', name: `Wynajem ${car.name} do ślubu z szoferem`, url: `${SITE_URL}${car.path}` },
      priceSpecification: { '@type': 'PriceSpecification', minPrice: PRICE_MIN, maxPrice: PRICE_MAX, priceCurrency: 'PLN' },
      availability: 'https://schema.org/InStock',
    })),
  },
}

const website = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: SITE_NAME,
  inLanguage: 'pl-PL',
  publisher: { '@id': ORG_ID },
}

export default function HomePage() {
  return (
    <>
      <SEO
        title="Auto do Ślubu Warszawa i Radom – BMW z Szoferem"
        description={`Wynajem auta do ślubu w Warszawie, Radomiu i na Mazowszu: BMW 650i Gran Coupé lub BMW 4 Cabrio z szoferem, dekoracją i postojem na sesję. Pakiety ${PRICE_MIN}–${PRICE_MAX} zł.`}
        path="/"
        jsonLd={[organization, website, faqSchema(faqs)]}
      />
      <HeroSection />
      <FleetSection />
      <FeaturesSection />
      <PricingSection />
      <ProcessSection />
      <FAQSection faqs={faqs} subtitle="Odpowiedzi na pytania, które Pary Młode zadają nam najczęściej przed rezerwacją." />
      <LatestPosts />
      <CTASection title="Zarezerwuj auto do ślubu w Warszawie lub Radomiu" />
    </>
  )
}
