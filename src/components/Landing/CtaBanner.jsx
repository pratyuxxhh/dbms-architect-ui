import Container from '../common/Container'
import { Link } from 'react-router-dom'
import { HiOutlineArrowRight, HiOutlineSparkles } from 'react-icons/hi2'
import Button from '../common/Button'

export default function CtaBanner() {
  return (
    <section className="py-20 relative overflow-hidden">
      <Container>
        <div className="relative rounded-[36px] bg-primary p-8 sm:p-14 text-center text-background shadow-2xl overflow-hidden group">
          {/* Subtle Accent Lights */}
          <div className="absolute -top-32 -left-32 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-background/15 px-4 py-2 text-xs font-mono font-bold text-amber-200 border border-background/20 backdrop-blur-md">
              <HiOutlineSparkles className="h-4 w-4 text-amber-300" />
              <span>Instant AI Schema Generation</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight">
              Ready to Architect Your Database in Seconds?
            </h2>

            <p className="text-base sm:text-xl text-background/90 max-w-2xl mx-auto leading-relaxed">
              Stop hand-crafting DDL scripts. Try our AI-powered schema generator now and download clean SQL files tailored to your application.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard">
                <Button
                  variant="primary"
                  className="bg-background text-primary hover:bg-background/90 px-8 py-3.5 text-base font-bold shadow-lg hover:scale-[1.03] flex items-center gap-2"
                >
                  <span>Open AI Schema Studio</span>
                  <HiOutlineArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/signup">
                <button
                  type="button"
                  className="px-6 py-3.5 text-base font-semibold text-background hover:text-amber-200 border border-background/30 rounded-2xl hover:border-background/60 transition-colors"
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
