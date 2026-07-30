import Container from '../common/Container'
import { HiStar } from 'react-icons/hi2'
import { RiDoubleQuotesL } from 'react-icons/ri'

const TESTIMONIALS = [
  {
    quote: 'DBMS Architect generated a complex 12-table e-commerce PostgreSQL schema with junction tables and foreign keys in under 5 seconds. It saved us an entire sprint of database modeling!',
    author: 'Elena Rostova',
    role: 'Lead Backend Engineer at FinTech Cloud',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    stars: 5
  },
  {
    quote: 'The 3NF normalization checks and foreign key indexing recommendations are spot on. It eliminated missing index bugs before we pushed our migrations to production.',
    author: 'Marcus Vance',
    role: 'Principal Database Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    stars: 5
  },
  {
    quote: 'Switching between PostgreSQL DDL and MySQL syntax in a single click makes multi-cloud backend deployment completely effortless.',
    author: 'Sarah Lin',
    role: 'CTO at SaaS Flow',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
    stars: 5
  }
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-surface/40 border-y border-primary/10 relative">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-secondary font-bold bg-primary/10 px-3 py-1 rounded-full">
            Developer Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mt-4 tracking-tight">
            Loved by Developers & DBAs
          </h2>
          <p className="text-lg text-primary/80 mt-4 leading-relaxed">
            Here is what engineers are saying about building database schemas with DBMS Architect.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-8 rounded-3xl bg-background border border-primary/15 shadow-lg shadow-primary/5 relative hover:border-primary/30 transition-all hover:scale-[1.01]"
            >
              <div>
                {/* Quote Icon & Stars */}
                <div className="flex items-center justify-between mb-4">
                  <RiDoubleQuotesL className="h-8 w-8 text-primary/20" />
                  <div className="flex text-amber-500">
                    {[...Array(item.stars)].map((_, s) => (
                      <HiStar key={s} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                </div>

                <p className="text-sm sm:text-base text-primary/90 leading-relaxed italic mb-6">
                  "{item.quote}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-primary/10">
                <img
                  src={item.avatar}
                  alt={item.author}
                  className="h-11 w-11 rounded-full object-cover border border-primary/20"
                />
                <div>
                  <h4 className="text-sm font-bold text-primary">
                    {item.author}
                  </h4>
                  <p className="text-xs text-secondary font-medium">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
