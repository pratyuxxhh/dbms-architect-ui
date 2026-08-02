import { useState } from 'react'
import {
  HiOutlineDocumentText,
  HiOutlineClipboardDocumentCheck,
  HiOutlineArrowDownTray,
  HiOutlineXMark,
  HiOutlineCheck,
} from 'react-icons/hi2'
import { toast } from 'react-toastify'
import { cn } from '../../utils/cn'

export default function HistoryFile({ filename, content, onClose }) {
  const [copied, setCopied] = useState(false)
  const fileSizeKb = content ? (new Blob([content]).size / 1024).toFixed(2) : null

  const handleCopy = async () => {
    if (!content) return
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      toast.success('SQL code copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy to clipboard')
    }
  }

  const handleDownload = () => {
    if (!content) return
    const blob = new Blob([content], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = filename || 'schema.sql'
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main className="flex-1 px-3 py-4 sm:px-6 lg:px-8 lg:py-6 w-full min-w-0">
      <div className="mx-auto flex w-full max-w-340 flex-col gap-4 sm:gap-5">
        <div className="rounded-2xl border border-primary/20 bg-surface/90 p-5 shadow-lg shadow-primary/5 space-y-4 font-sans">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-primary/15 pb-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 border border-amber-500/30">
                <HiOutlineDocumentText className="h-6 w-6" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <p className="font-mono font-bold text-primary truncate text-sm">
                    {filename}
                  </p>
                  <span className="inline-flex items-center rounded-full bg-amber-500/15 px-2.5 py-0.5 text-[10px] font-bold font-mono uppercase text-amber-700 border border-amber-500/30">
                    History
                  </span>
                </div>
                <p className="text-xs text-secondary mt-0.5 font-mono">
                  {fileSizeKb} KB • Saved schema
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 rounded-lg border border-primary/15 bg-background/60 px-3 py-1.5 font-mono text-xs font-medium text-primary hover:bg-background hover:border-amber-500/40 transition-colors"
              >
                {copied ? (
                  <HiOutlineCheck className="h-4 w-4 text-emerald-600" />
                ) : (
                  <HiOutlineClipboardDocumentCheck className="h-4 w-4 text-amber-500" />
                )}
                <span>{copied ? 'Copied' : 'Copy SQL'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-1.5 rounded-lg border border-primary/15 bg-background/60 px-3 py-1.5 font-mono text-xs font-medium text-primary hover:bg-background hover:border-amber-500/40 transition-colors"
              >
                <HiOutlineArrowDownTray className="h-4 w-4 text-amber-500" />
                <span>Download</span>
              </button>

              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-lg border border-primary/15 bg-background/60 px-3 py-1.5 font-mono text-xs font-medium text-secondary hover:bg-background hover:text-primary transition-colors'
                  )}
                >
                  <HiOutlineXMark className="h-4 w-4" />
                  <span>Close</span>
                </button>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-primary/20 bg-black/90 p-4 font-mono text-xs text-emerald-300 leading-relaxed max-h-[calc(100vh-16rem)] overflow-y-auto overflow-x-auto custom-scrollbar">
            <div className="flex items-center justify-between text-[10px] text-white/50 border-b border-white/10 pb-2 mb-3 min-w-0">
              <span className="truncate pr-2">PREVIEW: {filename}</span>
              <span className="shrink-0">SAVED SCHEMA</span>
            </div>
            <pre className="whitespace-pre-wrap break-words">{content}</pre>
          </div>
        </div>
      </div>
    </main>
  )
}
