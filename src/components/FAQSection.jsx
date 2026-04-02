import { useState } from 'react'

const faqs = [
  {
    question: 'Ile kosztuje wynajem auta do ślubu w Radomiu lub Warszawie?',
    answer:
      'Ceny wynajmu auta do ślubu w Radomiu i Warszawie zaczynają się od 800 zł za pakiet podstawowy (3 godziny z szoferem). Koszt wynajmu BMW 650i xDrive Gran Coupé lub BMW 4 Cabrio zależy od czasu trwania i trasy. W cenie zawsze zawarta jest dekoracja kwiatowa auta, elegancko ubrany szofer oraz postój na sesję zdjęciową. Skontaktuj się z nami po indywidualną wycenę.',
  },
  {
    question: 'Jak wcześnie trzeba rezerwować samochód do ślubu?',
    answer:
      'Terminy na wynajem auta do ślubu w Radomiu i Warszawie wyprzedają się bardzo szybko — szczególnie od maja do września. Zalecamy rezerwację z co najmniej 6-miesięcznym wyprzedzeniem. Popularne soboty letnie bywają zajęte z rocznym lub dłuższym wyprzedzeniem. Rezerwacja wymaga wpłaty zadatku w wysokości 30% ceny.',
  },
  {
    question: 'Czy auto ślubne jest dekorowane?',
    answer:
      'Tak — bezpłatna dekoracja florystyczna samochodu ślubnego jest wliczona w każdy pakiet! Oferujemy białe wstążki, bukiet kwiatów na masce i dekorację wnętrza. Na życzenie dostosowujemy kolory i styl do motywu Waszego wesela. Szczegóły ustalamy podczas spotkania konsultacyjnego.',
  },
  {
    question: 'Jaki obszar obejmuje wynajem auta do ślubu?',
    answer:
      'Obsługujemy wynajem auta do ślubu w Radomiu, Warszawie i całym województwie mazowieckim — m.in. Grójec, Kozienice, Białobrzegi, Zwoleń, Pionki, Nowe Miasto nad Pilicą. Bezpłatny dojazd do 50 km od Radomia lub Warszawy. Poza tym promieniem naliczana jest opłata 3 zł/km. Obsługujemy też wesela w województwach łódzkim, świętokrzyskim i lubelskim.',
  },
  {
    question: 'Czy mogę zamówić kilka aut do ślubu (kortez weselny)?',
    answer:
      'Tak! Organizujemy korteze weselne z kilkoma pojazdami. Dysponujemy dwoma BMW, które możemy uzupełnić o zaprzyjaźnione samochody ślubne — tworząc elegancki orszak. Zapewniamy koordynację szoferów i synchronizację tras. Skontaktuj się z nami, aby omówić szczegóły.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <div className="container">
        <h2 className="section-title" id="faq-title">Pytania o Wynajem Auta do Ślubu</h2>
        <div className="section-divider" aria-hidden="true"></div>
        <p className="section-subtitle">
          Planujesz wynajem auta do ślubu w Radomiu lub Warszawie? Znajdź odpowiedzi na najczęściej zadawane pytania.
        </p>
        <div className="faq__list" role="list">
          {faqs.map((faq, i) => (
            <div
              className={`faq-item${openIndex === i ? ' faq-item--open' : ''}`}
              key={i}
              role="listitem"
            >
              <button
                className="faq-item__question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
                aria-controls={`faq-answer-${i}`}
              >
                {faq.question}
                <span className="faq-item__arrow" aria-hidden="true">▼</span>
              </button>
              <div
                className="faq-item__answer"
                id={`faq-answer-${i}`}
                role="region"
              >
                <div className="faq-item__answer-inner">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
