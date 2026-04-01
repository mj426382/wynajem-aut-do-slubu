import { useState } from 'react'

const faqs = [
  {
    question: 'Ile kosztuje wynajem auta do ślubu?',
    answer:
      'Ceny wynajmu zaczynają się od 800 zł za podstawowy pakiet (3 godziny z szoferem). Koszt zależy od wybranego pojazdu, czasu trwania wynajmu oraz trasy. BMW 650i xDrive Gran Coupé i BMW 4 Cabrio to nasz standard – oba pojazdy wyceniane są indywidualnie w zależności od szczegółów zlecenia. W cenie zawsze jest dekoracja auta kwiatami, elegancko ubrany szofer i postój na sesję zdjęciową. Skontaktuj się z nami, aby otrzymać indywidualną wycenę.',
  },
  {
    question: 'Jak wcześnie trzeba rezerwować auto do ślubu?',
    answer:
      'Terminy weselne wyprzedają się bardzo szybko – szczególnie na miesiące od maja do września. Zalecamy rezerwację z co najmniej 6-miesięcznym wyprzedzeniem. Niektóre popularne daty (soboty wakacyjne) bywają zarezerwowane z rocznym lub nawet dłuższym wyprzedzeniem. Rezerwacja wymaga wpłaty zadatku w wysokości 30% ceny usługi.',
  },
  {
    question: 'Czy możliwa jest dekoracja pojazdu?',
    answer:
      'Tak – bezpłatna dekoracja florystyczna jest wliczona w cenę każdego pakietu! Standardowo oferujemy białe wstążki, bukiet kwiatów na masce oraz dekorację wnętrza. Na życzenie możemy dostosować kolory i styl dekoracji do motywu przewodniego Waszego wesela. Przed ślubem omawiamy szczegóły dekoracji podczas spotkania konsultacyjnego.',
  },
  {
    question: 'Jaki jest obszar obsługi?',
    answer:
      'Obsługujemy wesela w Radomiu, Warszawie i całym województwie mazowieckim. Bezpłatny dojazd obejmuje promień do 50 km od Radomia lub Warszawy. Za dojazd poza ten promień naliczamy dodatkową opłatę w wysokości 3 zł/km. Obsługujemy również wesela w województwach łódzkim, świętokrzyskim i lubelskim na zamówienie.',
  },
  {
    question: 'Czy mogę wynająć kilka aut naraz (kortez weselny)?',
    answer:
      'Oczywiście! Oferujemy kompleksową organizację kortezów weselnych. Dysponujemy dwoma pojazdami, które można uzupełnić o zaprzyjaźnione samochody, tworząc elegancki orszak ślubny. Zapewniamy koordynację szoferów, synchronizację tras i opiekę nad całym kortezem. Skontaktuj się z nami, aby omówić szczegóły.',
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
        <h2 className="section-title" id="faq-title">Często Zadawane Pytania</h2>
        <div className="section-divider" aria-hidden="true"></div>
        <p className="section-subtitle">
          Masz pytania dotyczące wynajmu auta do ślubu? Znajdź odpowiedzi poniżej.
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
