import { useState } from 'react'
import {
  HiOutlineSparkles,
  HiOutlineCpuChip,
  HiOutlineTableCells,
  HiOutlineLink,
  HiOutlineDocumentCheck,
  HiOutlineAdjustmentsHorizontal,
  HiOutlineXMark,
  HiOutlineCheck,
} from 'react-icons/hi2'
import { cn } from '../../utils/cn'

const DIALECTS = [
  { id: 'postgresql', name: 'PostgreSQL', icon: '🐘', desc: 'ANSI standard relational' },
  { id: 'mysql', name: 'MySQL / MariaDB', icon: '🐬', desc: 'Web & transactional' },
  { id: 'sqlite', name: 'SQLite 3', icon: '⚡', desc: 'Embedded & local' },
  { id: 'sqlserver', name: 'MS SQL Server', icon: '🟦', desc: 'Enterprise T-SQL' },
  { id: 'oracle', name: 'Oracle Database', icon: '🔴', desc: 'PL/SQL enterprise' },
]

export default function InspectorPanel({
  isOpen,
  onClose,
  width,
  selectedDialect,
  onSelectDialect,
  generationStatus = 'idle', // 'idle' | 'generating' | 'success'
  fileSizeKb = null,
  promptLength = 0,
}) {
  const [options, setOptions] = useState({
    normalization: true,
    foreignKeys: true,
    indexes: true,
    autoPKs: true,
  })

  const toggleOption = (key) => {
    setOptions((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  if (!isOpen) return null

  return (
    <aside
      style={{ width: `${width}px` }}
      className="fixed inset-y-0 right-0 z-30 flex flex-col border-l border-primary/15 bg-surface/95 backdrop-blur-xl transition-all duration-200 select-none hidden lg:flex"
      aria-label="Inspector Panel"
    >
      {/* Panel Header */}
      <div className="flex h-14 items-center justify-between border-b border-primary/15 px-4">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-primary uppercase tracking-wider">
          <HiOutlineAdjustmentsHorizontal className="h-4 w-4 text-amber-500" />
          <span>Inspector & Settings</span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-1.5 text-secondary hover:bg-background/80 hover:text-primary transition-colors"
          title="Close Inspector (Ctrl+B)"
        >
          <HiOutlineXMark className="h-4 w-4" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar text-xs">
        {/* AI Engine Status Card */}
        <div className="rounded-xl border border-primary/15 bg-background/60 p-3.5 space-y-3 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px] font-bold text-secondary uppercase tracking-widest">
              AI Engine Status
            </span>
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold border',
                generationStatus === 'generating'
                  ? 'bg-amber-500/15 text-amber-600 border-amber-500/30'
                  : generationStatus === 'success'
                  ? 'bg-emerald-500/15 text-emerald-600 border-emerald-500/30'
                  : 'bg-primary/10 text-primary/70 border-primary/20'
              )}
            >
              <span
                className={cn(
                  'h-1.5 w-1.5 rounded-full',
                  generationStatus === 'generating'
                    ? 'bg-amber-500 animate-ping'
                    : generationStatus === 'success'
                    ? 'bg-emerald-500'
                    : 'bg-primary/40'
                )}
              />
              {generationStatus === 'generating'
                ? 'Processing'
                : generationStatus === 'success'
                ? 'Ready'
                : 'Idle'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-1 font-mono">
            <div className="p-2 rounded-lg bg-surface border border-primary/10">
              <span className="text-[10px] text-secondary block">MODEL</span>
              <span className="font-semibold text-primary text-[11px]">Architect-v2.0</span>
            </div>
            <div className="p-2 rounded-lg bg-surface border border-primary/10">
              <span className="text-[10px] text-secondary block">LATENCY</span>
              <span className="font-semibold text-primary text-[11px]">
                {generationStatus === 'generating' ? '120ms' : '45ms'}
              </span>
            </div>
          </div>
        </div>

        {/* Target SQL Dialect */}
        <div className="space-y-2.5">
          <label className="font-mono text-[11px] font-bold text-secondary uppercase tracking-widest block">
            Target SQL Dialect
          </label>
          <div className="space-y-1.5">
            {DIALECTS.map((dialect) => {
              const isSelected = selectedDialect === dialect.id
              return (
                <button
                  key={dialect.id}
                  type="button"
                  onClick={() => onSelectDialect(dialect.id)}
                  className={cn(
                    'w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all',
                    isSelected
                      ? 'border-amber-500/50 bg-amber-500/10 text-primary shadow-sm'
                      : 'border-primary/10 bg-background/40 text-secondary hover:bg-background/80 hover:text-primary'
                  )}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-sm">{dialect.icon}</span>
                    <div className="truncate">
                      <p className="font-semibold text-[12px] truncate">{dialect.name}</p>
                      <p className="text-[10px] opacity-75 truncate">{dialect.desc}</p>
                    </div>
                  </div>
                  {isSelected && <HiOutlineCheck className="h-4 w-4 text-amber-600 shrink-0" />}
                </button>
              )
            })}
          </div>
        </div>

        {/* Schema Configuration Toggles */}
        <div className="space-y-2.5">
          <label className="font-mono text-[11px] font-bold text-secondary uppercase tracking-widest block">
            Schema Options
          </label>
          <div className="space-y-2 rounded-xl border border-primary/15 bg-background/40 p-3">
            {[
              { id: 'normalization', label: '3NF Normalization Rules', desc: 'Enforce non-transitive keys' },
              { id: 'foreignKeys', label: 'Foreign Key Constraints', desc: 'CASCADE & ON DELETE actions' },
              { id: 'indexes', label: 'Index Optimization', desc: 'Index FKs & query predicates' },
              { id: 'autoPKs', label: 'Auto-Increment Primary Keys', desc: 'SERIAL / IDENTITY column types' },
            ].map((item) => (
              <div key={item.id} className="flex items-center justify-between py-1">
                <div>
                  <p className="font-medium text-primary text-[12px]">{item.label}</p>
                  <p className="text-[10px] text-secondary">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() => toggleOption(item.id)}
                  className={cn(
                    'h-5 w-9 rounded-full transition-colors relative flex items-center px-0.5',
                    options[item.id] ? 'bg-amber-500' : 'bg-primary/20'
                  )}
                >
                  <span
                    className={cn(
                      'h-4 w-4 rounded-full bg-white transition-transform shadow-sm',
                      options[item.id] ? 'translate-x-4' : 'translate-x-0'
                    )}
                  />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Schema Statistics */}
        <div className="space-y-2.5">
          <label className="font-mono text-[11px] font-bold text-secondary uppercase tracking-widest block">
            Generation Metrics
          </label>
          <div className="grid grid-cols-2 gap-2 font-mono">
            <div className="p-2.5 rounded-xl border border-primary/10 bg-background/40">
              <div className="flex items-center gap-1.5 text-secondary">
                <HiOutlineTableCells className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-[10px]">ESTIMATED TABLES</span>
              </div>
              <p className="text-base font-extrabold text-primary mt-1">
                {promptLength > 50 ? '8 - 14' : promptLength > 0 ? '3 - 6' : '0'}
              </p>
            </div>
            <div className="p-2.5 rounded-xl border border-primary/10 bg-background/40">
              <div className="flex items-center gap-1.5 text-secondary">
                <HiOutlineLink className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-[10px]">RELATIONS</span>
              </div>
              <p className="text-base font-extrabold text-primary mt-1">
                {promptLength > 50 ? '12+' : promptLength > 0 ? '4+' : '0'}
              </p>
            </div>
            <div className="p-2.5 rounded-xl border border-primary/10 bg-background/40">
              <div className="flex items-center gap-1.5 text-secondary">
                <HiOutlineCpuChip className="h-3.5 w-3.5 text-amber-500" />
                <span className="text-[10px]">TOKENS USED</span>
              </div>
              <p className="text-base font-extrabold text-primary mt-1">
                {promptLength > 0 ? Math.round(promptLength * 2.4) : '0'}
              </p>
            </div>
            <div className="p-2.5 rounded-xl border border-primary/10 bg-background/40">
              <div className="flex items-center gap-1.5 text-secondary">
                <HiOutlineDocumentCheck className="h-3.5 w-3.5 text-emerald-500" />
                <span className="text-[10px]">FILE SIZE</span>
              </div>
              <p className="text-base font-extrabold text-primary mt-1">
                {fileSizeKb ? `${fileSizeKb} KB` : '0 KB'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="border-t border-primary/15 p-3 text-center text-[10px] font-mono text-secondary">
        DBMS Architect Studio v2.0 • Ready
      </div>
    </aside>
  )
}
