import HistoryItem from './HistoryItem'

export default function RecentGenerationCard({ items }) {
  return (
    <div className="max-h-60 space-y-2 overflow-y-auto px-3 py-3">
      {items.map((item) => (
        <HistoryItem key={item.title} {...item} />
      ))}
    </div>
  )
}