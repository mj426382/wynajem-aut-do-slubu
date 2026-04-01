import { Helmet } from 'react-helmet-async'
import SEO from '../components/SEO'
import HeroSection from '../components/HeroSection'
import FleetSection from '../components/FleetSection'
import FeaturesSection from '../components/FeaturesSection'
import TestimonialsSection from '../components/TestimonialsSection'
import FAQSection from '../components/FAQSection'
import CTASection from '../components/CTASection'

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Złota Kareta — Auto do Ślubu Radom Warszawa',
  description: 'Wynajem auta do ślubu w Radomiu i Warszawie — BMW 650i xDrive Gran Coupé F06 i BMW 4 Cabrio G23 z szoferem. Obsługujemy całe Mazowsze.',
  url: 'https://slubnakareta.pl',
  telephone: '+48501234567',
  email: 'kontakt@slubnakareta.pl',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'ul. Żeromskiego 1',
    addressLocality: 'Radom',
    postalCode: '26-600',
    addressCountry: 'PL',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 51.4027,
    longitude: 21.1471,
  },
  areaServed: ['Radom', 'Warszawa', 'Mazowsze', 'Grójec', 'Kozienice', 'Białobrzegi', 'Zwoleń', 'Pionki'],
  priceRange: '$$',
  keywords: 'auto do ślubu radom, auto do ślubu warszawa, wynajem auta do ślubu, samochód do ślubu radom, samochód do ślubu warszawa, BMW do ślubu, auto ślubne radom, auto ślubne warszawa, wynajem bmw do ślubu mazowsze',
}

export default function HomePage() {
  return (
    <>
      <SEO
        title="Auto do Ślubu Radom Warszawa — Wynajem BMW | Złota Kareta"
        description="Wynajem auta do ślubu w Radomiu i Warszawie. BMW 650i xDrive Gran Coupé F06 i BMW 4 Cabrio G23 z szoferem. Obsługujemy całe Mazowsze. Bezpłatna dekoracja kwiatowa. ☎ +48 501 234 567"
        canonical="https://slubnakareta.pl"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <HeroSection />
      <FleetSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
    </>
  )
}
