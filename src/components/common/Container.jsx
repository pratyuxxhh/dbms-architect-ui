import { cn } from '../../utils/cn'

export default function Container({ children, className, as: Component = 'div' }) {
  return (
    <Component className={cn('mx-auto max-w-7xl px-6 lg:px-8', className)}>
      {children}
    </Component>
  )
}
