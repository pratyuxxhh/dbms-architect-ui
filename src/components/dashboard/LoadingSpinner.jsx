import { cn } from '../../utils/cn'

export default function LoadingSpinner({ className = 'h-5 w-5', ariaLabel = 'Loading...' }) {
  return (
    <span
      className={cn(
        'inline-block animate-spin rounded-full border-2 border-current border-t-transparent',
        className
      )}
      role="status"
      aria-label={ariaLabel}
    >
      <span className="sr-only">{ariaLabel}</span>
    </span>
  )
}
