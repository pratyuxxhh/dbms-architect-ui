import { HiOutlineSparkles } from 'react-icons/hi2'

export default function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-surface/70 px-4 py-2 shadow-sm backdrop-blur-md hover:border-primary/30 transition-all cursor-default">
      <span className="flex h-2 w-2 rounded-full bg-emerald-600 animate-pulse" />
      <HiOutlineSparkles
        className="h-4 w-4 text-amber-700"
        aria-hidden="true"
      />
      <span className="text-xs font-semibold tracking-wide text-primary sm:text-sm">
        Next-Gen AI Database Architect v2.0
      </span>
      <span className="ml-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-mono font-bold text-primary">
        3NF & DDL
      </span>
    </div>
  )
}
