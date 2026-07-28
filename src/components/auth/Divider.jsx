export default function Divider({ text = 'OR CONTINUE WITH' }) {
  return (
    <div className="relative flex items-center py-1">
      <div className="grow border-t border-primary/10" aria-hidden="true" />
      <span className="mx-4 shrink-0 text-xs font-medium uppercase tracking-widest text-secondary">
        {text}
      </span>
      <div className="grow border-t border-primary/10" aria-hidden="true" />
    </div>
  )
}
