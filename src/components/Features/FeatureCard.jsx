import { cn } from '../../utils/cn'

export default function FeatureCard({ title, description, icon: Icon }) {
  return (
    <article
      className={cn(
        'group flex flex-col rounded-[28px] border border-primary/8 bg-surface p-6 sm:p-7',
        'shadow-lg shadow-primary/5 transition-all duration-250',
        'hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10'
      )}
    >
      <div
        className="mb-5 flex h-12 w-12 items-center justify-center rounded-[18px] bg-background shadow-sm"
        aria-hidden="true"
      >
        <Icon className="h-6 w-6 text-secondary" />
      </div>

      <h3 className="text-lg font-semibold text-primary sm:text-xl">{title}</h3>

      <p className="mt-3 text-base leading-relaxed text-secondary sm:text-lg">
        {description}
      </p>
    </article>
  )
}
