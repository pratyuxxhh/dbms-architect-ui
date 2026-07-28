import { cn } from '../../utils/cn'

export default function InputField({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  error,
  icon,
  required = false,
  disabled = false,
  id,
  name,
  autoComplete,
}) {
  const inputId = id || name

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label
          htmlFor={inputId}
          className="text-[15px] font-medium text-primary"
        >
          {label}
          {required && (
            <span className="ml-0.5 text-secondary" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-secondary">
            {icon}
          </span>
        )}

        <input
          id={inputId}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          aria-invalid={error ? 'true' : undefined}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={cn(
            'h-[52px] w-full rounded-2xl border border-primary/10 bg-background px-4 text-base text-primary',
            'placeholder:text-secondary/70',
            'transition-all duration-250',
            'focus:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/15',
            'disabled:cursor-not-allowed disabled:opacity-50',
            icon && 'pl-11',
            error && 'border-primary/30 ring-2 ring-primary/10'
          )}
        />
      </div>

      {error && (
        <p
          id={`${inputId}-error`}
          className="text-sm text-primary/80"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}
