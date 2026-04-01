const features = [
  {
    icon: '💎',
    title: 'Luksusowa flota',
    desc: "5 ekskluzywnych aut najwyższej klasy – od Mercedesa po Rolls-Royce'a. Każdy pojazd jest regularnie serwisowany i idealnie utrzymany.",
  },
  {
    icon: '👨‍✈️',
    title: 'Doświadczeni szoferzy',
    desc: 'Nasi kierowcy to profesjonaliści z wieloletnim doświadczeniem. Punktualni, elegancko ubrani, dyskretni i skupieni wyłącznie na Was.',
  },
  {
    icon: '📍',
    title: 'Radom i Warszawa',
    desc: 'Obsługujemy wesela w Radomiu, Warszawie i całym województwie mazowieckim. Szeroki zasięg bez dodatkowych opłat w promieniu 50 km.',
  },
  {
    icon: '🕐',
    title: 'Gwarancja punktualności',
    desc: 'Rozumiemy, że czas na ślubie ma kluczowe znaczenie. Zawsze stawiamy się z wyprzedzeniem i dbamy o to, aby wszystko przebiegło zgodnie z planem.',
  },
  {
    icon: '🌹',
    title: 'Bezpłatna dekoracja',
    desc: 'W cenie wynajmu oferujemy elegancką dekorację florystyczną auta. Białe wstążki, kwiaty i wieniec – dostosowane do Waszego stylu ślubu.',
  },
  {
    icon: '📸',
    title: 'Postój na sesję zdjęciową',
    desc: 'Zatrzymamy się w wybranym przez Was miejscu, aby fotograf mógł uwiecznić piękne wspomnienia przy luksusowym aucie. Bez pośpiechu.',
  },
]

export default function FeaturesSection() {
  return (
    <section className="features" id="cechy" aria-labelledby="features-title">
      <div className="container">
        <h2 className="section-title" id="features-title">Dlaczego Warto Wybrać Nas?</h2>
        <div className="section-divider" aria-hidden="true"></div>
        <p className="section-subtitle">
          Od ponad dekady sprawiamy, że ślubne przejazdy stają się niezapomnianymi wspomnieniami.
          Oto co wyróżnia Prestige Wedding Cars.
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
