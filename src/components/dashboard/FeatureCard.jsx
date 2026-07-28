import Card from '../common/Card'
import Typography from '../common/Typography'

export default function FeatureCard({ title, description, icon: Icon }) {
  return (
    <Card className="group rounded-3xl border-primary/10 bg-surface/85 p-5 shadow-lg shadow-primary/5 transition-all duration-250 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10" padding="none">
      <div className="flex h-full flex-col gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-background shadow-sm shadow-primary/5" aria-hidden="true">
          <Icon className="h-5 w-5 text-secondary transition-transform duration-250 group-hover:scale-105" />
        </div>
        <div>
          <Typography as="h3" variant="h3" className="text-[17px]">
            {title}
          </Typography>
          <Typography as="p" variant="muted" className="mt-2">
            {description}
          </Typography>
        </div>
      </div>
    </Card>
  )
}