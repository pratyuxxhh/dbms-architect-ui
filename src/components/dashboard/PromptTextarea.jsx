import { forwardRef } from 'react'
import { cn } from '../../utils/cn'

const PromptTextarea = forwardRef(function PromptTextarea(
  { id = 'schema-prompt', className, ...props },
  ref
) {
  return (
    <textarea
      ref={ref}
      id={id}
      className={cn(
        'h-55 w-full resize-none rounded-card border border-primary/10 bg-background px-5 py-5 text-[15px] leading-relaxed text-primary',
        'placeholder:text-secondary/75 transition-all duration-250',
        'focus:border-primary/20 focus:outline-none focus:ring-2 focus:ring-primary/15',
        className
      )}
      {...props}
    />
  )
})

export default PromptTextarea