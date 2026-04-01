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
  name: 'Prestige Wedding Cars',
  description: 'Wynajem luksusowych aut do ślubu w Radomiu i Warszawie',
  url: 'https://prestige-wedding-cars.pl',
  telephone: '+48501234567',
  email: 'kontakt@prestige-wedding-cars.pl',
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
  areaServed: ['Radom', 'Warszawa', 'Mazowsze'],
  priceRange: '$$',
}

export default function HomePage() {
  return (
    <>
      <SEO
        title="Wynajem Aut do Ślubu Radom Warszawa"
        description="Luksusowe auta do ślubu w Radomiu i Warszawie. Mercedes S-Class, BMW 7, Rolls-Royce, Bentley. Profesjonalna obsługa, dekoracja kwiatami. Zadzwoń: +48 501 234 567"
        canonical="https://prestige-wedding-cars.pl"
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
