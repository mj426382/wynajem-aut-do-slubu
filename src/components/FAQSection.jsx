import { useState } from 'react'

/**
 * Accordion FAQ. The FAQPage JSON-LD for these questions is emitted by the page through <SEO jsonLd>
 * (see faqSchema()) so each page has exactly one FAQPage block.
 */
export function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export default function FAQSection({ faqs, title = 'Pytania o wynajem auta do ślubu', subtitle, id = 'faq' }) {
  const [openIndex, setOpenIndex] = useState(0)
  const toggle = (index) => setOpenIndex(openIndex === index ? null : index)

  return (
    <section className="faq" id={id} aria-labelledby={`${id}-title`}>
      <div className="container">
        <h2 className="section-title" id={`${id}-title`}>{title}</h2>
        <div className="section-divider" aria-hidden="true"></div>
        {subtitle && <p className="section-subtitle">{subtitle}</p>}
        <div className="faq__list">
          {faqs.map((faq, i) => (
            <div className={`faq-item${openIndex === i ? ' faq-item--open' : ''}`} key={faq.question}>
              <h3 className="faq-item__heading">
                <button className="faq-item__question" onClick={() => toggle(i)} aria-expanded={openIndex === i} aria-controls={`${id}-answer-${i}`}>
                  {faq.question}
                  <span className="faq-item__arrow" aria-hidden="true">▼</span>
                </button>
              </h3>
              <div className="faq-item__answer" id={`${id}-answer-${i}`} role="region">
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
