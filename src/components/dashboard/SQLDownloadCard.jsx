import { useState, useEffect } from 'react'
import {
  HiOutlineDocumentText,
  HiOutlineClipboardDocumentCheck,
  HiOutlineEye,
  HiOutlineArrowPath,
  HiOutlineCheck,
} from 'react-icons/hi2'
import { toast } from 'react-toastify'
import DownloadButton from './DownloadButton'
import { cn } from '../../utils/cn'

export default function SQLDownloadCard({
  blob,
  filename = 'database_schema.sql',
  onRegenerate,
}) {
  const hasFile = Boolean(blob)
  const fileSizeKb = blob ? (blob.size / 1024).toFixed(2) : null
  const [copied, setCopied] = useState(false)
  const [previewText, setPreviewText] = useState('')
  const [showPreview, setShowPreview] = useState(false)

  // Read text content from blob for copy and preview
  useEffect(() => {
    if (blob) {
      blob.text().then((text) => {
        setPreviewText(text)
      }).catch(() => {
        setPreviewText('-- SQL script ready for download')
      })
    } else {
      Promise.resolve().then(() => {
        setPreviewText('')
        setShowPreview(false)
      })
    }
  }, [blob])

  const handleCopyCode = async () => {
    if (!previewText) return
    try {
      await navigator.clipboard.writeText(previewText)
      setCopied(true)
      toast.success('SQL code copied to clipboard!')
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error('Failed to copy to clipboard')
    }
  }

  if (!hasFile) {
    return (
      <div className="rounded-2xl border border-dashed border-primary/20 bg-background/30 p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3">
          <HiOutlineDocumentText className="h-6 w-6 text-amber-500" />
        </div>
        <p className="text-sm font-bold text-primary font-mono">No SQL Schema Generated Yet</p>
        <p className="text-xs text-secondary mt-1 max-w-sm mx-auto">
          Enter a prompt above and click "Generate SQL" to create a production-ready relational database schema.
        </p>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-primary/20 bg-surface/90 p-5 shadow-lg shadow-primary/5 space-y-4 font-sans transition-all">
      {/* File Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-primary/15 pb-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber-500/15 text-amber-600 border border-amber-500/30">
            <HiOutlineDocumentText className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-mono font-bold text-primary truncate text-sm">
                {filename || 'database_schema.sql'}
              </p>
              <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold font-mono uppercase text-emerald-700 border border-emerald-500/30">
                Ready
              </span>
            </div>
            <p className="text-xs text-secondary mt-0.5 font-mono">
              {fileSizeKb} KB • ANSI SQL Migration Script
            </p>
          </div>
        </div>

        {/* Primary Download Action */}
        <div className="w-full sm:w-auto">
          <DownloadButton blob={blob} filename={filename} disabled={!hasFile} />
        </div>
      </div>

      {/* Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-2 font-mono text-xs pt-1">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={handleCopyCode}
            className="inline-flex items-center gap-1.5 rounded-lg border border-primary/15 bg-background/60 px-3 py-1.5 font-medium text-primary hover:bg-background hover:border-amber-500/40 transition-colors"
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
            onClick={() => setShowPreview((prev) => !prev)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-medium transition-colors',
              showPreview
                ? 'border-amber-500 bg-amber-500/10 text-amber-700'
                : 'border-primary/15 bg-background/60 text-primary hover:bg-background'
            )}
          >
            <HiOutlineEye className="h-4 w-4 text-amber-500" />
            <span>{showPreview ? 'Hide Preview' : 'Preview SQL'}</span>
          </button>
        </div>

        {onRegenerate && (
          <button
            type="button"
            onClick={onRegenerate}
            className="inline-flex items-center gap-1.5 text-xs text-secondary hover:text-primary transition-colors py-1"
          >
            <HiOutlineArrowPath className="h-3.5 w-3.5 text-amber-500" />
            <span>Regenerate</span>
          </button>
        )}
      </div>

      {/* Code Preview Terminal Window */}
      {showPreview && previewText && (
        <div className="rounded-xl border border-primary/20 bg-black/90 p-4 font-mono text-xs text-emerald-300 leading-relaxed max-h-72 overflow-y-auto overflow-x-auto custom-scrollbar">
          <div className="flex items-center justify-between text-[10px] text-white/50 border-b border-white/10 pb-2 mb-3 min-w-0">
            <span className="truncate pr-2">PREVIEW: {filename}</span>
            <span className="shrink-0">ANSI / POSTGRESQL</span>
          </div>
          <pre className="whitespace-pre-wrap break-words">{previewText}</pre>
        </div>
      )}
    </div>
  )
}
