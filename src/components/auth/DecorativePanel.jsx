import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import LogoIcon from '../auth/LogoIcon'

const dummySQL = `-- AI Schema Generation in Progress...

CREATE TABLE users (
  id UUID PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE orders (
  order_id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(20) DEFAULT 'pending'
);

-- Indexing for optimized queries
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_order_status ON orders(status);`

export default function DecorativePanel() {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < dummySQL.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + dummySQL[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, Math.random() * 30 + 10) // random delay between 10-40ms for realistic typing
      return () => clearTimeout(timeout)
    } else {
      // Loop the animation after a delay
      const timeout = setTimeout(() => {
        setDisplayedText('')
        setCurrentIndex(0)
      }, 5000)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex])

  return (
    <aside
      className="relative hidden flex-col justify-between overflow-hidden rounded-[40px] border border-primary/20 bg-primary p-10 shadow-2xl lg:flex lg:w-[58%] group"
      aria-hidden="true"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px] pointer-events-none transition-transform duration-1000 group-hover:translate-x-10 group-hover:translate-y-10" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none transition-transform duration-1000 group-hover:-translate-x-10 group-hover:-translate-y-10" />

      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <Link
          to="/"
          className="inline-flex items-center gap-4 transition-opacity duration-250 hover:opacity-80 mb-10"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-background shadow-sm shadow-black/20 shrink-0">
            <LogoIcon size="lg" className="text-amber-500" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-background tracking-tight">DBMS Architect</p>
            <p className="text-sm font-medium text-amber-200/90 font-mono">AI schema generation v2.0</p>
          </div>
        </Link>

        {/* Code Editor Animation */}
        <div className="flex-1 flex flex-col relative w-full rounded-2xl bg-[#1e1e1e]/90 border border-white/10 shadow-2xl overflow-hidden backdrop-blur-md">
          {/* Mac window dots */}
          <div className="flex items-center gap-2 px-4 py-3 bg-black/40 border-b border-white/5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="ml-2 text-[10px] text-white/40 font-mono uppercase tracking-widest">schema_generator.sql</span>
          </div>
          <div className="p-6 font-mono text-sm md:text-base flex-1 overflow-y-auto">
            <pre className="text-amber-300/90 whitespace-pre-wrap leading-relaxed break-words">
              {displayedText}
              <span className="inline-block w-2.5 h-5 bg-amber-400 ml-1 align-middle animate-[pulse_1s_ease-in-out_infinite]" />
            </pre>
          </div>
        </div>
      </div>
    </aside>
  )
}
