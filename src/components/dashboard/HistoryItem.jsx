import Typography from '../common/Typography'

export default function HistoryItem({ title, tablesCount, relationshipsCount, timeGenerated }) {
  return (
    <button
      type="button"
      className="group flex w-full flex-col rounded-2xl border border-primary/8 bg-background/70 px-4 py-3 text-left shadow-sm shadow-primary/5 transition-all duration-250 hover:-translate-y-0.5 hover:bg-background hover:shadow-md hover:shadow-primary/8"
    >
      <div className="flex items-start justify-between gap-4">
        <Typography as="h3" variant="h3" className="text-[15px]">
          {title}
        </Typography>
        <Typography as="span" variant="muted" className="shrink-0 text-xs">
          {timeGenerated}
        </Typography>
      </div>
      <Typography as="p" variant="muted" className="mt-1 text-xs">
        {tablesCount} tables · {relationshipsCount} relations
      </Typography>
    </button>
  )
}