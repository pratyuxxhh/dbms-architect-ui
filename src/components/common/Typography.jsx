import { cn } from '../../utils/cn'

const variants = {
  h1: 'text-4xl font-bold tracking-tight sm:text-5xl',
  h2: 'text-2xl font-semibold tracking-tight sm:text-3xl',
  h3: 'text-lg font-semibold sm:text-xl',
  body: 'text-base leading-relaxed sm:text-lg',
  muted: 'text-sm text-secondary sm:text-base',
}

export default function Typography({ as: Component = 'p', variant = 'body', className, children }) {
  return <Component className={cn(variants[variant], className)}>{children}</Component>
}