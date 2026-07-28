import { cn } from '../../utils/cn'

export default function SocialButton({
  label,
  icon,
  onClick,
  disabled = false,
  className,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'inline-flex h-[52px] flex-1 items-center justify-center gap-2.5 rounded-2xl',
        'border border-primary/10 bg-background text-base font-medium text-primary',
        'shadow-sm shadow-primary/5 transition-all duration-250',
        'hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/10',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-surface',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
    >
      {icon}
      {label}
    </button>
  )
}
