import { HiOutlineBars3 } from 'react-icons/hi2'
import StatusBadge from '../dashboard/StatusBadge'
import Typography from '../common/Typography'

export default function Topbar({ onMenuClick }) {
  return (
    <header className="sticky top-0 z-20 border-b border-primary/10 bg-background/95 backdrop-blur-xl">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8 lg:py-5">
        <div className="flex min-w-0 items-center gap-3 lg:gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-primary/10 bg-surface text-primary shadow-sm shadow-primary/5 transition-all duration-250 hover:-translate-y-0.5 hover:shadow-md lg:hidden"
            aria-label="Open sidebar"
          >
            <HiOutlineBars3 className="h-5 w-5" aria-hidden="true" />
          </button>

          <div className="min-w-0">
            <Typography as="p" variant="muted" className="flex items-center gap-2">
              <span className="text-sm">✦</span>
              DBMS Architect
            </Typography>
            <Typography as="h1" variant="h2" className="truncate text-[22px] sm:text-[32px]">
              Welcome back, User!
            </Typography>
            <Typography as="p" variant="muted" className="mt-1 max-w-4xl">
              Design, generate, and refine production-ready database schemas with a clean, focused workflow.
            </Typography>
          </div>
        </div>

        <StatusBadge />
      </div>
    </header>
  )
}