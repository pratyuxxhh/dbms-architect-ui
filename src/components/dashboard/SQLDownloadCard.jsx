import { HiOutlineDocumentText } from 'react-icons/hi2'
import Typography from '../common/Typography'
import DownloadButton from './DownloadButton'

export default function SQLDownloadCard({ blob, filename = 'database_schema.sql' }) {
  const hasFile = Boolean(blob)
  const fileSizeKb = blob ? (blob.size / 1024).toFixed(2) : null

  return (
    <div className="rounded-2xl border border-primary/20 bg-background/80 p-5 shadow-lg shadow-primary/5 space-y-4 transition-all hover:border-primary/30 group">
      <div className="flex items-center justify-between border-b border-primary/10 pb-3">
        <Typography as="h3" variant="h3" className="text-base font-bold text-primary group-hover:text-amber-700 transition-colors">
          Generated File
        </Typography>
        {hasFile && (
          <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-[11px] font-bold tracking-wide uppercase text-emerald-700 border border-emerald-500/30">
            Ready for Download
          </span>
        )}
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <HiOutlineDocumentText className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="font-semibold text-primary truncate text-base">
              {filename || 'database_schema.sql'}
            </p>
            <p className="text-xs text-secondary mt-0.5">
              {hasFile ? `${fileSizeKb} KB • SQL Migration Script` : 'No file generated yet'}
            </p>
          </div>
        </div>

        <div>
          <DownloadButton blob={blob} filename={filename} disabled={!hasFile} />
        </div>
      </div>
    </div>
  )
}
