import Container from '../common/Container'
import HeroBadge from './HeroBadge'
import HeroButtons from './HeroButtons'
import HeroStudioPreview from './HeroStudioPreview'
import { HiOutlineCheckCircle } from 'react-icons/hi2'

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex flex-col items-center pt-22 sm:pt-32 lg:pt-[130px] pb-10 sm:pb-16 text-center overflow-hidden bg-grid-pattern"
    >
      {/* Soft Background Glow Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[600px] h-[350px] bg-gradient-to-tr from-amber-200/40 via-amber-400/20 to-emerald-300/20 blur-[100px] rounded-full pointer-events-none" />

      <Container className="relative flex flex-col items-center z-10">
        <HeroBadge />

        <h1
          id="hero-heading"
          className="mt-5 sm:mt-6 max-w-4xl text-3xl  font-extrabold tracking-tight text-primary sm:text-6xl lg:text-7xl lg:leading-[1.1]"
        >
          Architect Production SQL Schemas{' '}
          <span className="bg-gradient-to-r z-10 from-amber-700 via-amber-800 to-amber-900 bg-clip-text text-transparent underline decoration-amber-400/50 decoration-wavy">
            In Seconds
          </span>
        </h1>

        <p className="mt-4 sm:mt-6 max-w-3xl text-sm font-normal text-primary/85 sm:text-xl md:text-2xl md:leading-relaxed">
          Transform natural language descriptions into fully-normalized 3NF relational schemas, primary/foreign key connections
        </p>

        <div className="mt-6 sm:mt-8 w-full flex justify-center">
          <HeroButtons />
        </div>

        {/* Quick Highlights Pills */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs sm:text-sm font-medium text-primary/75">
          <div className="flex items-center gap-1.5">
            <HiOutlineCheckCircle className="h-4 w-4 text-emerald-700" />
            <span>Supports Popular SQL Languages</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HiOutlineCheckCircle className="h-4 w-4 text-emerald-700" />
            <span>Automatic 3NF Normalization</span>
          </div>
          <div className="flex items-center gap-1.5">
            <HiOutlineCheckCircle className="h-4 w-4 text-emerald-700" />
            <span>Zero Configuration Required</span>
          </div>
        </div>

        {/* Hero Interactive Studio Mockup */}
        <HeroStudioPreview />
      </Container>
    </section>
  )
}
