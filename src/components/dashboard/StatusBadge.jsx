export default function StatusBadge({ status = 'Idle' }) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-primary/10 bg-surface px-4 py-2 text-sm font-medium text-primary shadow-md shadow-primary/5"
      role="status"
      aria-label={`System status ${status}`}
    >
      <span className="h-2.5 w-2.5 rounded-full bg-[#6A7151]" aria-hidden="true" />
      <span>{status}</span>
    </div>
  )
}