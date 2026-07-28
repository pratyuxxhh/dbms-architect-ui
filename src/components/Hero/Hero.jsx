import Container from '../common/Container'
import HeroBadge from './HeroBadge'
import HeroButtons from './HeroButtons'

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="flex min-h-[70vh] flex-col items-center justify-center pt-[144px] text-center"
    >
      <Container className="flex flex-col items-center">
        <HeroBadge />

        <h1
          id="hero-heading"
          className="mt-8 text-5xl font-bold tracking-tight text-primary sm:text-6xl md:text-7xl lg:text-[72px] lg:leading-[1.05]"
        >
          DBMS Architect
        </h1>

        <p className="mt-6 max-w-2xl text-lg font-normal text-primary/90 sm:text-xl md:text-[22px] md:leading-relaxed">
          Generate production-ready SQL database schemas using AI.
        </p>

        <div className="mt-10">
          <HeroButtons />
        </div>
      </Container>
    </section>
  )
}
