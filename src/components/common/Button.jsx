import { cn } from '../../utils/cn'

const variants = {
  primary:
    'bg-primary text-background shadow-lg shadow-primary/10 hover:shadow-xl hover:shadow-primary/15 hover:scale-[1.02]',
  secondary:
    'bg-background text-primary border border-primary/10 shadow-md shadow-primary/5 hover:shadow-lg hover:shadow-primary/10 hover:scale-[1.02]',
  outline:
    'border border-primary/10 bg-background text-primary shadow-sm shadow-primary/5 hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/10',
  ghost:
    'bg-transparent text-primary hover:bg-primary/5',
}

export default function Button({
  children,
  variant = 'primary',
  className,
  type = 'button',
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  onClick,
  ...props
}) {
  const isDisabled = disabled || loading

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      className={cn(
        'inline-flex h-[52px] items-center justify-center gap-2 rounded-2xl px-7 text-base font-medium',
        'transition-all duration-250 ease-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:pointer-events-none disabled:opacity-50',
        variants[variant],
        fullWidth && 'w-full',
        className
      )}
      {...props}
    >
      {loading ? (
        <span
          className="h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent"
          aria-hidden="true"
        />
      ) : (
        leftIcon
      )}
      {children}
      {!loading && rightIcon}
    </button>
  )
}
