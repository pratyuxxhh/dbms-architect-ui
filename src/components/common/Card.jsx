import { cn } from '../../utils/cn'

const paddings = {
  none: '',
  sm: 'p-6',
  md: 'p-8',
  lg: 'p-10',
}

export default function Card({
  children,
  className,
  padding = 'lg',
  shadow = true,
  as: Component = 'div',
}) {
  return (
    <Component
      className={cn(
        'rounded-[16px] border border-primary/10 bg-surface',
        shadow && 'shadow-xl shadow-primary/8',
        paddings[padding],
        className
      )}
    >
      {children}
    </Component>
  )
}
