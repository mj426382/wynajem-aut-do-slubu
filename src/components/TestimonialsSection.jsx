import { Helmet } from 'react-helmet-async'

const testimonials = [
  {
    stars: '★★★★★',
    quote:
      'AutoDoŚlubu Warszawa & Radom zapewniła nam wymarzone auto do ślubu w Radomiu! BMW 650i Gran Coupé wyglądało przepięknie — eleganckie, z kwiatowymi dekoracjami pasowało idealnie do naszego ślubu w stylu glamour. Szofer był punktualny i bardzo pomocny. Gorąco polecamy każdej Parze Młodej szukającej samochodu ślubnego w Radomiu!',
    name: 'Anna i Tomasz Kowalski',
    location: 'Ślub w Radomiu',
    date: 'Sierpień 2024',
    dateISO: '2024-08-10',
    avatar: '💑',
  },
  {
    stars: '★★★★★',
    quote:
      'Wynajęliśmy BMW 4 Cabrio na nasz ślub w Warszawie i to było absolutnie magiczne! Przyjazd z opuszczonym dachem pod kościół na Krakowskim Przedmieściu to coś, czego nie zapomnimy. AutoDoŚlubu Warszawa & Radom to najlepszy wybór, jeśli szukacie auta do ślubu w Warszawie. Obsługa profesjonalna, kierowca znał miasto doskonale.',
    name: 'Marta i Krzysztof Nowak',
    location: 'Ślub w Warszawie',
    date: 'Czerwiec 2024',
    dateISO: '2024-06-22',
    avatar: '👫',
  },
  {
    stars: '★★★★★',
    quote:
      'Mieliśmy kameralny ślub w okolicach Radomia i potrzebowaliśmy eleganckiego BMW. Wybraliśmy BMW 650i Gran Coupé — byliśmy zachwyceni. Szofer zabrał nas na krótką sesję zdjęciową — zdjęcia są fantastyczne! Cena uczciwa, jakość usługi najwyższa. Polecamy AutoDoŚlubu Warszawa & Radom jako samochód do ślubu w całym Mazowszu.',
    name: 'Karolina i Marek Wiśniewski',
    location: 'Ślub k. Radomia',
    date: 'Maj 2024',
    dateISO: '2024-05-18',
    avatar: '🤵',
  },
]

export default function TestimonialsSection() {
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'AutoDoŚlubu Warszawa & Radom',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '85',
      bestRating: '5',
      worstRating: '1',
    },
    review: testimonials.map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.name },
      reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
      reviewBody: t.quote,
      datePublished: t.dateISO,
    })),
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(reviewSchema)}</script>
      </Helmet>
    <section className="testimonials" id="opinie" aria-labelledby="testimonials-title">
      <div className="container">
        <h2 className="section-title" id="testimonials-title">Opinie Par Młodych z Radomia i Warszawy</h2>
        <div className="section-divider" aria-hidden="true"></div>
        <p className="section-subtitle">
          Zaufały nam pary z Radomia, Warszawy i całego Mazowsza szukające luksusowego auta do ślubu. Przeczytaj ich opinie.
        </p>
        <div className="testimonials__grid">
          {testimonials.map((t, i) => (
            <article className="testimonial-card" key={i}>
              <div className="testimonial-card__stars" aria-label="Ocena 5 na 5">{t.stars}</div>
              <blockquote className="testimonial-card__quote">{t.quote}</blockquote>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar" aria-hidden="true">{t.avatar}</div>
                <div>
                  <p className="testimonial-card__name">{t.name}</p>
                  <p className="testimonial-card__meta">{t.location} · {t.date}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
    </>
  )
}
