const features = [
  {
    icon: '💎',
    title: 'Ekskluzywne BMW do ślubu',
    desc: 'Oferujemy wynajem BMW do ślubu w Radomiu i Warszawie — Gran Coupé F06 i Cabrio G23. Każdy pojazd jest regularnie serwisowany i idealnie przygotowany na Twój wielki dzień.',
  },
  {
    icon: '👨‍✈️',
    title: 'Profesjonalni szoferzy',
    desc: 'Nasi kierowcy to profesjonaliści z wieloletnim doświadczeniem w obsłudze wesel. Punktualni, elegancko ubrani, dyskretni i skupieni wyłącznie na Parze Młodej.',
  },
  {
    icon: '📍',
    title: 'Auto do ślubu Radom i Warszawa',
    desc: 'Wynajmujemy auto do ślubu w Radomiu, Warszawie i całym województwie mazowieckim. Obsługujemy również Grójec, Kozienice, Białobrzegi, Zwoleń i okolice bez dopłat w promieniu 50 km.',
  },
  {
    icon: '🕐',
    title: 'Gwarancja punktualności',
    desc: 'Wiemy, że każda minuta na ślubie ma znaczenie. Zawsze stawiamy się z odpowiednim wyprzedzeniem, dbając o to, by samochód ślubny był gotowy dokładnie wtedy, kiedy go potrzebujesz.',
  },
  {
    icon: '🌹',
    title: 'Bezpłatna dekoracja florystyczna',
    desc: 'W cenie wynajmu auta do ślubu oferujemy elegancką dekorację kwiatową. Białe wstążki, bukiet na masce i dekoracja wnętrza — dostosowane do stylu Waszego wesela.',
  },
  {
    icon: '📸',
    title: 'Postój na sesję zdjęciową',
    desc: 'Zatrzymamy się w wybranym przez Was miejscu, aby fotograf mógł uwiecznić piękne chwile przy luksusowym BMW. Bez pośpiechu — to Wasz wyjątkowy dzień.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="features" id="cechy" aria-labelledby="features-title">
      <div className="container">
        <h2 className="section-title" id="features-title">Dlaczego Wybrać Złotą Karetę?</h2>
        <div className="section-divider" aria-hidden="true"></div>
        <p className="section-subtitle">
          Wynajem auta do ślubu w Radomiu i Warszawie z profesjonalną obsługą.
          Oto co wyróżnia Złotą Karetę spośród innych firm oferujących samochody ślubne w Mazowszu.
        </p>
        <div className="features__grid">
          {features.map((f, i) => (
            <article className="feature-card" key={i}>
              <span className="feature-card__icon" aria-hidden="true">{f.icon}</span>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__desc">{f.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
