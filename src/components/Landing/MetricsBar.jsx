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
  { name: 'SQLite', tag: '3.40+' },
  { name: 'Supabase', tag: 'RLS Ready' },
  { name: 'Prisma Schema', tag: 'ORM' },
  { name: 'Oracle SQL', tag: 'Enterprise' }
]

export default function MetricsBar() {
  return (
    <section className="py-16 bg-surface/50 border-y border-primary/10 relative">
      <Container>
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {STATS.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="flex flex-col items-center text-center p-4 rounded-2xl bg-background/60 border border-primary/10 shadow-sm transition-all hover:border-primary/20 hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                  <Icon className="h-6 w-6" />
                </div>
                <span className="text-3xl font-extrabold text-primary sm:text-4xl">
                  {stat.value}
                </span>
                <span className="text-sm font-semibold text-primary/90 mt-1">
                  {stat.label}
                </span>
                <span className="text-xs text-secondary mt-0.5">
                  {stat.description}
                </span>
              </div>
            )
          })}
        </div>

        {/* Database Ecosystem Banner */}
        <div className="mt-12 flex flex-col items-center">
          <p className="text-xs font-mono uppercase tracking-widest text-secondary font-semibold mb-4">
            Supports All Major Relational Engines & ORMs
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {DIALECT_BADGES.map((badge) => (
              <div
                key={badge.name}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background border border-primary/15 text-xs font-medium text-primary shadow-xs hover:border-primary/30 transition-colors"
              >
                <span className="font-bold">{badge.name}</span>
                <span className="bg-primary/10 px-2 py-0.5 rounded text-[10px] font-mono text-secondary">
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
