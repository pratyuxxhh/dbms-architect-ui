import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const Input = forwardRef(function Input(
  { label, className, error, id, ...props },
  ref
) {
  return (
    <label className="flex flex-col gap-2 text-sm font-medium text-primary" htmlFor={id}>
      {label && <span>{label}</span>}
      <input
        ref={ref}
        id={id}
        className={cn(
          'h-13 w-full rounded-2xl border border-primary/10 bg-background px-4 text-base text-primary',
          'placeholder:text-secondary/70 transition-all duration-250',
          'focus:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/15',
          error && 'border-primary/25',
          className
        )}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
      />
      {error && (
        <span id={`${id}-error`} className="text-sm font-normal text-secondary">
          {error}
        </span>
      )}
    </label>
  )
})

export default Input