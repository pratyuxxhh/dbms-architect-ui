import { useState } from 'react'
import Container from '../common/Container'
import { HiOutlineChevronDown } from 'react-icons/hi2'

const FAQS = [
  {
    question: 'Which SQL database dialects are currently supported?',
    answer: 'DBMS Architect supports PostgreSQL, MySQL 8.0+, SQLite 3, and Supabase (with Row-Level Security policies). You can switch between dialects with a single click in the studio preview or download dialect-specific .sql scripts.'
  },
  {
    question: 'How does the AI ensure 3NF (Third Normal Form) compliance?',
    answer: 'Our AI engine evaluates table relations for transitive functional dependencies and repeating groups. It automatically breaks many-to-many relationships into junction tables and creates appropriate foreign key references.'
  },
  {
    question: 'Is the generated SQL syntactically valid and ready for production?',
    answer: 'Yes. Every generated schema includes valid ANSI DDL statements with primary key constraints, foreign key cascades/restricts, default timestamps, NOT NULL checks, and performance indexes.'
  },
  {
    question: 'Can I download the SQL file directly to import into my local DBMS?',
    answer: 'Absolutely. Clicking "Download SQL Schema" immediately downloads a ready-to-run `.sql` migration file named appropriately based on your prompt (e.g. `ecommerce_platform_schema.sql`).'
  },
  {
    question: 'Is any proprietary business logic or schema data saved on your servers?',
    answer: 'No. Prompts are processed strictly for schema synthesis and SQL file generation. We do not store your private application blueprints or data structures.'
  }
]

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0)

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? null : idx)
  }

  return (
    <section className="py-24 relative">
      <Container maxW="4xl">
        <div className="text-center mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-secondary font-bold bg-primary/10 px-3 py-1 rounded-full">
            Got Questions?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mt-4 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-primary/80 mt-4 leading-relaxed">
            Everything you need to know about DBMS Architect schema generation.
          </p>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = openIdx === idx
            return (
              <div
                key={idx}
                className="rounded-2xl border border-primary/15 bg-surface/60 overflow-hidden transition-all duration-200"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center justify-between p-6 text-left text-base sm:text-lg font-bold text-primary hover:bg-surface/80 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <HiOutlineChevronDown
                    className={`h-5 w-5 text-primary shrink-0 transition-transform duration-250 ${
                      isOpen ? 'rotate-180 text-amber-700' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-primary/85 leading-relaxed border-t border-primary/10 animate-slide-down">
                    {faq.answer}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
