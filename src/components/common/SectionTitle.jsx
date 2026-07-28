import { cn } from '../../utils/cn'

export default function SectionTitle({
  title,
  subtitle,
  className,
  titleClassName,
  subtitleClassName,
  align = 'center',
}) {
  const alignment = {
    center: 'text-center items-center',
    left: 'text-left items-start',
  }

  return (
    <div className={cn('flex flex-col gap-3', alignment[align], className)}>
      <h2
        className={cn(
          'text-3xl font-bold tracking-tight text-primary md:text-4xl lg:text-5xl',
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={cn(
            'max-w-2xl text-lg text-secondary md:text-xl',
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
