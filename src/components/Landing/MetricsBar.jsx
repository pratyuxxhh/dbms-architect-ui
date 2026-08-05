import Container from '../common/Container'
import {
  RiDatabase2Line,
  RiCheckDoubleLine,
  RiFlashlightLine,
  RiCodeSSlashLine
} from 'react-icons/ri'

const STATS = [
  {
    icon: RiDatabase2Line,
    value: '100,000+',
    label: 'Schemas Generated',
    description: 'Production tables built'
  },
  {
    icon: RiCheckDoubleLine,
    value: '99.9%',
    label: 'ANSI SQL Validity',
    description: 'Syntactically verified DDL'
  },
  {
    icon: RiCodeSSlashLine,
    value: '5+ Dialects',
    label: 'Multi-Engine Support',
    description: 'Postgres, MySQL, SQLite...'
  },
  {
    icon: RiFlashlightLine,
    value: '10x Faster',
    label: 'Development Speed',
    description: 'From prompt to schema'
  }
]

const DIALECT_BADGES = [
  { name: 'PostgreSQL', tag: 'PG 16+' },
  { name: 'MySQL', tag: '8.0+' },
  { name: 'Microsoft SQL Server', tag: '2022+' },
  { name: 'Oracle SQL', tag: 'Enterprise' }
]

export default function MetricsBar() {
  return (
    <section className="py-10 z-0sm:py-16 bg-surface/50 border-y border-primary/10 relative">
      <Container>
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
          {STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center p-3 sm:p-4 rounded-2xl bg-background/60 border border-primary/10 shadow-sm transition-all hover:border-primary/20 hover:shadow-md"
              >
                <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-2 sm:mb-3 shrink-0">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                </div>
                <span className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-primary">
                  {stat.value}
                </span>
                <span className="text-xs sm:text-sm font-semibold text-primary/90 mt-1">
                  {stat.label}
                </span>
                <span className="text-[10px] sm:text-xs text-secondary mt-0.5">
                  {stat.description}
                </span>
              </div>
            )
          })}
        </div>

        {/* Database Ecosystem Banner */}
        <div className="mt-8 sm:mt-12 flex flex-col items-center text-center">
          <p className="text-[10px] sm:text-xs font-mono uppercase tracking-widest text-secondary font-semibold mb-3 sm:mb-4">
            Supports All Major Relational Engines & ORMs
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {DIALECT_BADGES.map((badge) => (
              <div
                key={badge.name}
                className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl bg-background border border-primary/15 text-[11px] sm:text-xs font-medium text-primary shadow-xs hover:border-primary/30 transition-colors"
              >
                <span className="font-bold">{badge.name}</span>
                <span className="bg-primary/10 px-1.5 py-0.5 rounded text-[9px] sm:text-[10px] font-mono text-secondary">
                  {badge.tag}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
