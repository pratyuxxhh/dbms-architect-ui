import Container from '../common/Container'
import {
  HiOutlineXCircle,
  HiOutlineCheckCircle,
  HiOutlineClock,
  HiOutlineSparkles
} from 'react-icons/hi2'

const MANUAL_POINTS = [
  'Handwriting tedious DDL CREATE TABLE statements line-by-line',
  'Forgetting foreign key indexes leading to slow table joins',
  'Manual 3NF checking and missed junction tables for N:M relations',
  'Manual rewrite required when converting PostgreSQL to MySQL',
  'Spent 2 to 6 hours per application data model'
]

const AI_POINTS = [
  'Natural language prompt transforms into clean DDL instantly',
  'Automatic index creation on all foreign key reference columns',
  'Guaranteed 3NF normalization and foreign key integrity',
  'One-click multi-dialect conversion (Postgres, MySQL, SQLite, Supabase)',
  'Complete database schema ready in under 10 seconds'
]

export default function SchemaComparison() {
  return (
    <section className="py-24 relative overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-secondary font-bold bg-primary/10 px-3 py-1 rounded-full">
            Why Upgrade Your Workflow?
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary mt-4 tracking-tight">
            Traditional SQL vs DBMS Architect AI
          </h2>
          <p className="text-lg text-primary/80 mt-4 leading-relaxed">
            See how AI automation eliminates schema bugs, speeds up backend development, and improves database design quality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Manual Card */}
          <div className="rounded-3xl border border-red-900/10 bg-red-950/5 p-8 flex flex-col justify-between relative">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-red-900/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100 text-red-700 font-bold">
                    <HiOutlineClock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-primary">Manual Database Design</h3>
                    <p className="text-xs text-secondary font-mono">Slow & Error-Prone</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-red-700 bg-red-100 px-3 py-1 rounded-full font-bold">
                  2-6 Hours
                </span>
              </div>

              <div className="space-y-4">
                {MANUAL_POINTS.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-primary/80">
                    <HiOutlineXCircle className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-red-900/10 text-xs font-mono text-center text-red-700">
              High risk of schema refactoring & migration headaches later
            </div>
          </div>

          {/* DBMS Architect AI Card */}
          <div className="rounded-3xl border border-amber-500/30 bg-surface/90 p-8 flex flex-col justify-between relative shadow-xl shadow-amber-500/10">
            {/* Highlighting Glow */}
            <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
              <span className="bg-amber-600 text-white text-[11px] font-bold font-mono px-3 py-1 rounded-full shadow-md">
                RECOMMENDED
              </span>
            </div>

            <div>
              <div className="flex items-center justify-between pb-6 border-b border-primary/10 mb-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-background font-bold shadow-md">
                    <HiOutlineSparkles className="h-6 w-6 text-amber-300" />
                  </div>
                  <div>
                    <h3 className="text-xl font-extrabold text-primary">DBMS Architect AI</h3>
                    <p className="text-xs text-amber-800 font-mono font-bold">Instant & Optimized</p>
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full font-bold">
                  &lt; 10 Seconds
                </span>
              </div>

              <div className="space-y-4">
                {AI_POINTS.map((point, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm font-medium text-primary">
                    <HiOutlineCheckCircle className="h-5 w-5 text-emerald-700 shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-primary/10 text-xs font-mono text-center text-primary font-bold">
              ⚡ Production-ready DDL syntax guaranteed every single run
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
