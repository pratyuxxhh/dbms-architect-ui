import { HiOutlineSparkles } from 'react-icons/hi2'

export default function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-surface/50 px-5 py-2.5 shadow-sm">
      <HiOutlineSparkles
        className="h-4 w-4 text-secondary"
        aria-hidden="true"
      />
      <span className="text-sm font-medium text-secondary sm:text-base">
        Production-ready SQL schemas in minutes
      </span>
    </div>
  )
}
