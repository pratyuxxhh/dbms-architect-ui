import { cn } from '../../utils/cn'

export default function PageWrapper({ children, className }) {
  return (
    <div
      className={cn(
        'animate-fade-in min-h-screen bg-background',
        className
      )}
    >
      {children}
    </div>
  )
}
