import { HiOutlineSparkles } from 'react-icons/hi2'

export default function HeroBadge() {
  return (
    <div className="inline-flex max-w-full flex-wrap items-center justify-center gap-1.5 sm:gap-2 rounded-full border border-primary/20 bg-surface/70 px-3 py-1.5 sm:px-4 sm:py-2 shadow-sm backdrop-blur-md hover:border-primary/30 transition-all cursor-default">
      <div className="flex items-center gap-1.5">
        <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
        <HiOutlineSparkles
          className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-700"
          aria-hidden="true"
        />
        <span className="text-[11px] font-semibold tracking-wide text-primary sm:text-sm">
          Next-Gen AI Database Architect v2.0
        </span>
      </div>
      <span className="rounded-full bg-primary/10 px-1.5 py-0.5 text-[9px] sm:text-[10px] font-mono font-bold text-primary">
        3NF & DDL
      </span>
    </div>
  )
}
