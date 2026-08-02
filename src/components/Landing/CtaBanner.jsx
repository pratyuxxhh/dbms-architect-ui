import Container from '../common/Container'
import { Link } from 'react-router-dom'
import { HiOutlineArrowRight, HiOutlineSparkles } from 'react-icons/hi2'
import Button from '../common/Button'

export default function CtaBanner() {
  return (
    <section className="py-10 sm:py-20 relative overflow-hidden">
      <Container>
        <div className="relative rounded-[24px] sm:rounded-[36px] bg-primary p-5 sm:p-14 text-center text-background shadow-2xl overflow-hidden group">
          {/* Subtle Accent Lights */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full bg-background/15 px-3 py-1.5 sm:px-4 sm:py-2 text-[11px] sm:text-xs font-mono font-bold text-amber-200 border border-background/20 backdrop-blur-md">
              <HiOutlineSparkles className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-300" />
              <span>Instant AI Schema Generation</span>
            </div>

            <h2 className="text-2xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to Architect Your Database in Seconds?
            </h2>

            <p className="text-xs sm:text-xl text-background/90 max-w-2xl mx-auto leading-relaxed">
              Stop hand-crafting DDL scripts. Try our AI-powered schema generator now and download clean SQL files tailored to your application.
            </p>

            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Link to="/dashboard" className="w-full sm:w-auto">
              <Button
  variant="primary"
  className="w-full sm:w-auto bg-primary text-primary-foreground px-6 sm:px-8 py-3 text-sm sm:text-base font-bold shadow-lg flex items-center justify-center gap-2"
>
  <span>Open AI Schema Studio</span>
  <HiOutlineArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
</Button>
              </Link>
              <Link to="/signup" className="w-full sm:w-auto">
                <button
                  type="button"
                  className="w-full sm:w-auto px-6 py-3 text-sm sm:text-base font-semibold text-background hover:text-amber-200 border border-background/30 rounded-2xl hover:border-background/60 transition-colors"
                >
                  Create Free Account
                </button>
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
