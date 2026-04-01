const testimonials = [
  {
    stars: '★★★★★',
    quote:
      'Prestige Wedding Cars spełnił nasze najwyższe oczekiwania! Mercedes S-Class wyglądał przepięknie – biały z różanymi dekoracjami pasował idealnie do naszego ślubu w stylu glamour. Szofer był punktualny, elegancki i bardzo pomocny. Polecamy z całego serca każdej Parze Młodej z Radomia!',
    name: 'Anna i Tomasz Kowalski',
    location: 'Ślub w Radomiu',
    date: 'Sierpień 2024',
    avatar: '💑',
  },
  {
    stars: '★★★★★',
    quote:
      'Wynajęliśmy Rolls-Royce Phantom na nasz ślub w Warszawie i to było absolutnie magiczne doświadczenie! Wjechanie tym autem przed kościół na Krakowskim Przedmieściu to coś, czego nie zapomnimy do końca życia. Obsługa była profesjonalna, a kierowca znał Warszawę jak własną kieszeń. Dziękujemy!',
    name: 'Marta i Krzysztof Nowak',
    location: 'Ślub w Warszawie',
    date: 'Czerwiec 2024',
    avatar: '👫',
  },
  {
    stars: '★★★★★',
    quote:
      'Mieliśmy kameralny ślub w Grójcu i potrzebowaliśmy eleganckiego auta bez przepłacania. Wybraliśmy BMW 7 Series i byliśmy zachwyceni. Szofer zabrał nas na krótką sesję zdjęciową przy sadownikach – te zdjęcia wyglądają fantastycznie! Cena była fair, a jakość usługi – pierwsza klasa.',
    name: 'Karolina i Marek Wiśniewski',
    location: 'Ślub w Grójcu',
    date: 'Maj 2024',
    avatar: '🤵',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="testimonials" id="opinie" aria-labelledby="testimonials-title">
      <div className="container">
        <h2 className="section-title" id="testimonials-title">Co Mówią Nasze Pary Młode</h2>
        <div className="section-divider" aria-hidden="true"></div>
        <p className="section-subtitle">
          Zaufały nam setki par z Radomia, Warszawy i okolic. Przeczytaj ich opinie.
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
  )
}
