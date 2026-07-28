import { RiDatabase2Line } from 'react-icons/ri'
import { cn } from '../../utils/cn'

export default function LogoIcon({ size = 'md', className }) {
  const sizes = {
    sm: { container: 'h-10 w-10', icon: 'h-5 w-5' },
    md: { container: 'h-12 w-12', icon: 'h-6 w-6' },
    lg: { container: 'h-14 w-14', icon: 'h-7 w-7' },
  }

  const { container, icon } = sizes[size]

  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-2xl bg-primary shadow-md shadow-primary/15',
        container,
        className
      )}
      aria-hidden="true"
    >
      <RiDatabase2Line className={cn('text-background', icon)} />
    </div>
  )
}
