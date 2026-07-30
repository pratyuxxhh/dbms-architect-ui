import { HiOutlineExclamationTriangle, HiOutlineCheckCircle, HiOutlineXMark } from 'react-icons/hi2'
import { cn } from '../../utils/cn'

export default function AlertMessage({ type = 'error', message, onClose }) {
  if (!message) return null

  const isSuccess = type === 'success'

  return (
    <div
      role="alert"
      className={cn(
        'flex items-center justify-between gap-3 rounded-2xl border px-4 py-3.5 text-sm font-medium shadow-sm transition-all duration-200',
        isSuccess
          ? 'border-emerald-500/20 bg-emerald-500/10 text-emerald-800 dark:text-emerald-300'
          : 'border-red-500/20 bg-red-500/10 text-red-800 dark:text-red-300'
      )}
    >
      <div className="flex items-center gap-2.5 min-w-0">
        {isSuccess ? (
          <HiOutlineCheckCircle className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
        ) : (
          <HiOutlineExclamationTriangle className="h-5 w-5 shrink-0 text-red-600 dark:text-red-400" aria-hidden="true" />
        )}
        <span className="truncate">{message}</span>
      </div>

      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
          aria-label="Dismiss alert"
        >
          <HiOutlineXMark className="h-4 w-4" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}
