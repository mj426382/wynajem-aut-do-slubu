const steps = [
  { n: '1', title: 'Zapytanie o termin', desc: 'Piszecie lub dzwonicie: data, miejsce ślubu i wesela, wybrane auto. Odpowiadamy tego samego dnia z ceną.' },
  { n: '2', title: 'Rezerwacja i umowa', desc: 'Potwierdzamy termin, podpisujemy prostą umowę i przyjmujemy zadatek. Od tej chwili auto jest Wasze.' },
  { n: '3', title: 'Ustalenia przed ślubem', desc: 'Tydzień wcześniej omawiamy trasę, godziny, kolory dekoracji i miejsce sesji zdjęciowej.' },
  { n: '4', title: 'Dzień ślubu', desc: 'Szofer przyjeżdża udekorowanym BMW z zapasem czasu, wozi Was do kościoła, na sesję i na salę. Wy myślicie tylko o sobie.' },
]

/** Replaces the former testimonial cards: a real, verifiable description of how the booking works. */
export default function ProcessSection() {
  return (
    <section className="process" id="jak-to-dziala" aria-labelledby="process-title">
      <div className="container">
        <h2 className="section-title" id="process-title">Jak wygląda rezerwacja auta do ślubu</h2>
        <div className="section-divider" aria-hidden="true"></div>
        <p className="section-subtitle">Cztery kroki od pierwszej wiadomości do wjazdu pod kościół.</p>
        <ol className="process__list">
          {steps.map((s) => (
            <li className="process__step" key={s.n}>
              <span className="process__number" aria-hidden="true">{s.n}</span>
              <h3 className="process__title">{s.title}</h3>
              <p className="process__desc">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
