import Container from '../common/Container'
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCpuChip,
  HiOutlineArrowDownTray,
  HiOutlineArrowRight
} from 'react-icons/hi2'
import { Link } from 'react-router-dom'

const STEPS = [
  {
    step: '01',
    icon: HiOutlineChatBubbleBottomCenterText,
    title: 'Describe Your Application',
    description: 'Type plain English requirements (e.g. "Ride-sharing app with drivers, trips, billing, and GPS location history").',
    badge: 'Natural Language Input'
  },
  {
    step: '02',
    icon: HiOutlineCpuChip,
    title: 'AI Architecting & 3NF Normalization',
    description: 'Our domain-specific LLM structures tables, resolves junction tables, sets foreign key constraints, and creates indexes.',
    badge: 'Automated DDL Engineering'
  },
  {
    step: '03',
    icon: HiOutlineArrowDownTray,
    title: 'Download & Deploy SQL',
    description: 'Instantly download clean, formatted `.sql` migration files tailored for PostgreSQL, MySQL, SQLite, or Supabase.',
    badge: 'Instant Production DDL'
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-12 sm:py-20 lg:py-24 relative overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-secondary font-bold bg-primary/10 px-3 py-1 rounded-full">
            Simple 3-Step Process
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-primary mt-3 sm:mt-4 tracking-tight">
            How DBMS Architect Works
          </h2>
          <p className="text-sm sm:text-lg text-primary/80 mt-3 sm:mt-4 leading-relaxed">
            Eliminate hours of manual DDL syntax writing, foreign key debugging, and schema normalization hassle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 relative">
          {STEPS.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={item.step}
                className="relative flex flex-col p-5 sm:p-8 rounded-2xl sm:rounded-3xl bg-surface/60 border border-primary/15 shadow-lg shadow-primary/5 hover:border-primary/30 hover:bg-surface/80 transition-all duration-250 group"
              >
                {/* Step Number Badge */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-mono text-3xl font-extrabold text-primary/30 group-hover:text-amber-700 transition-colors">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-mono font-semibold bg-background px-3 py-1 rounded-full border border-primary/10 text-primary">
                    {item.badge}
                  </span>
                </div>

                {/* Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-background mb-6 shadow-md group-hover:scale-110 transition-transform">
                  <Icon className="h-7 w-7" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-sm text-primary/80 leading-relaxed flex-1">
                  {item.description}
                </p>

                {/* Connecting Arrow for Desktop */}
                {index < STEPS.length - 1 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-background border border-primary/20 text-primary shadow-sm">
                      <HiOutlineArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* CTA Bar below steps */}
        <div className="mt-12 text-center">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary text-background font-bold text-sm shadow-lg hover:bg-primary/90 transition-all hover:scale-[1.02]"
          >
            <span>Try Generating a Schema Now</span>
            <HiOutlineArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Container>
    </section>
  )
}
