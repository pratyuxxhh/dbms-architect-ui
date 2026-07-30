import { Link } from 'react-router-dom'
import {
  HiOutlineSparkles,
  HiOutlineCircleStack,
  HiOutlineCpuChip,
  HiOutlineShieldCheck,
  HiOutlineBolt,
} from 'react-icons/hi2'
import LogoIcon from './LogoIcon'

const projectFeatures = [
  {
    icon: HiOutlineSparkles,
    title: 'AI Prompt-to-SQL',
    description: 'Describe your data model in plain English, get battle-tested DDL scripts instantly.',
  },
  {
    icon: HiOutlineCircleStack,
    title: 'Multi-Dialect Engine',
    description: 'Export optimized schemas for PostgreSQL, MySQL, SQLite, Oracle, and SQL Server.',
  },
  {
    icon: HiOutlineCpuChip,
    title: 'Automated 3NF Normalization',
    description: 'Built-in foreign keys, indexes, unique constraints, and schema validation rules.',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'Production Ready',
    description: 'Syntactically verified DDL code ready to pipe directly into your CI/CD pipelines.',
  },
]

export default function SignupDecorativePanel() {
  return (
    <aside
      className="relative hidden flex-col justify-between overflow-hidden rounded-[40px] border border-primary/20 bg-primary p-10 shadow-2xl lg:flex lg:w-[54%] group"
      aria-hidden="true"
    >
      <div className="absolute top-0 left-0 w-full h-full bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-amber-500/20 rounded-full blur-[100px] pointer-events-none transition-transform duration-1000 group-hover:translate-x-10 group-hover:translate-y-10" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] pointer-events-none transition-transform duration-1000 group-hover:-translate-x-10 group-hover:-translate-y-10" />

      <div className="relative z-10">
        {/* Header */}
        <Link
          to="/"
          className="inline-flex items-center gap-4 transition-opacity duration-250 hover:opacity-80"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-[18px] bg-background shadow-sm shadow-black/20 shrink-0">
            <LogoIcon size="lg" className="text-amber-500" />
          </div>
          <div>
            <p className="text-3xl font-extrabold text-background tracking-tight">DBMS Architect</p>
            <p className="text-sm font-medium text-amber-200/90 font-mono">Next-Gen Schema Engineering</p>
          </div>
        </Link>

        {/* Project Context Summary */}
        <div className="mt-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/20 px-3.5 py-1 text-xs font-semibold text-amber-200 border border-amber-400/30">
            <HiOutlineBolt className="h-3.5 w-3.5 animate-pulse" />
            <span>Why DBMS Architect?</span>
          </div>
          <h2 className="mt-4 text-2xl font-extrabold text-background tracking-tight leading-snug">
            Stop writing boilerplate SQL scripts manually. Let AI structure your databases.
          </h2>
          <p className="mt-2 text-sm text-background/80 leading-relaxed">
            From quick prototypes to complex enterprise relational architectures, generate clean, normalized, and optimized SQL schemas in seconds.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {projectFeatures.map((feat) => {
            const Icon = feat.icon
            return (
              <div
                key={feat.title}
                className="rounded-2xl border border-background/15 bg-background/10 p-4 backdrop-blur-md transition-all hover:bg-background/15"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/20 text-amber-300">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-bold text-background">{feat.title}</h3>
                </div>
                <p className="text-xs text-background/75 leading-relaxed">{feat.description}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Footer Metrics Banner */}
      <div className="relative z-10 mt-8 flex items-center justify-between rounded-2xl bg-black/30 border border-white/10 p-5 backdrop-blur-md">
        <div className="text-center">
          <p className="text-xl font-extrabold text-amber-300 font-mono">10k+</p>
          <p className="text-[11px] text-background/70 font-medium uppercase tracking-wider">Schemas Built</p>
        </div>
        <div className="h-8 w-px bg-white/15" />
        <div className="text-center">
          <p className="text-xl font-extrabold text-emerald-400 font-mono">99.9%</p>
          <p className="text-[11px] text-background/70 font-medium uppercase tracking-wider">Syntax Precision</p>
        </div>
        <div className="h-8 w-px bg-white/15" />
        <div className="text-center">
          <p className="text-xl font-extrabold text-amber-300 font-mono">5 Dialects</p>
          <p className="text-[11px] text-background/70 font-medium uppercase tracking-wider">Supported</p>
        </div>
      </div>
    </aside>
  )
}
