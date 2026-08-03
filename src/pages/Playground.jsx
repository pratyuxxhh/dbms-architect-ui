import { useMemo, useRef, useState } from 'react'
import {
  HiOutlineCommandLine,
  HiOutlinePlay,
  HiOutlineExclamationTriangle,
  HiOutlineCheckCircle,
  HiOutlineClipboardDocument,
  HiOutlineTrash,
  HiOutlineBolt,
} from 'react-icons/hi2'
import { toast } from 'react-toastify'
import DashboardLayout from '../components/layout/DashboardLayout'
import Card from '../components/common/Card'

const DEFAULT_SQL = `CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  total NUMERIC(12, 2) NOT NULL,
  status VARCHAR(30) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);`

const SAMPLE_QUERIES = [
  {
    label: 'Valid schema',
    sql: DEFAULT_SQL,
  },
  {
    label: 'Missing semicolon',
    sql: `SELECT * FROM users
WHERE email LIKE '%@example.com'`,
  },
  {
    label: 'Broken parentheses',
    sql: `CREATE TABLE inventory (
  id INTEGER PRIMARY KEY,
  quantity INTEGER CHECK (quantity >= 0,
  updated_at TIMESTAMP
);`,
  },
]

function buildDiagnostics(sql) {
  const lines = sql.split('\n')
  const diagnostics = []
  const warnings = []

  if (!sql.trim()) {
    diagnostics.push({ type: 'error', line: 1, message: 'No SQL entered.' })
    return { diagnostics, warnings, statementCount: 0 }
  }

  const openParens = (sql.match(/\(/g) || []).length
  const closeParens = (sql.match(/\)/g) || []).length

  if (openParens !== closeParens) {
    diagnostics.push({
      type: 'error',
      line: Math.max(1, lines.findIndex((line) => line.includes('(')) + 1),
      message: 'Unbalanced parentheses detected.',
    })
  }

  const statements = sql
    .split(';')
    .map((statement) => statement.trim())
    .filter(Boolean)

  if (statements.length === 0) {
    diagnostics.push({ type: 'error', line: 1, message: 'No executable statement found.' })
  }

  if (sql.trim() && !sql.trim().endsWith(';')) {
    diagnostics.push({
      type: 'error',
      line: lines.length,
      message: 'Statement must end with a semicolon.',
    })
  }

  if (/\b(drop|delete|truncate)\b/i.test(sql)) {
    warnings.push({
      type: 'warning',
      line: Math.max(1, lines.findIndex((line) => /\b(drop|delete|truncate)\b/i.test(line)) + 1),
      message: 'Destructive operation detected. Review carefully before running.',
    })
  }

  if (/\bselect\b/i.test(sql) && !/\bfrom\b/i.test(sql)) {
    diagnostics.push({
      type: 'error',
      line: Math.max(1, lines.findIndex((line) => /\bselect\b/i.test(line)) + 1),
      message: 'SELECT statement is missing a FROM clause.',
    })
  }

  return {
    diagnostics,
    warnings,
    statementCount: statements.length,
  }
}

export default function Playground() {
  const editorRef = useRef(null)
  const [sql, setSql] = useState(DEFAULT_SQL)
  const [dialect, setDialect] = useState('postgresql')
  const [runMode, setRunMode] = useState('idle')
  const [lastRunAt, setLastRunAt] = useState(null)
  const [history, setHistory] = useState([{ kind: 'info', text: 'Compiler ready.' }])

  const analysis = useMemo(() => buildDiagnostics(sql), [sql])
  const hasErrors = analysis.diagnostics.length > 0
  const hasWarnings = analysis.warnings.length > 0

  const runSql = () => {
    const nextHistory = []
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    if (analysis.diagnostics.length > 0) {
      nextHistory.push({ kind: 'error', text: `Execution blocked with ${analysis.diagnostics.length} error(s).` })
      nextHistory.push(...analysis.diagnostics.map((item) => ({ kind: 'error', text: `L${item.line}: ${item.message}` })))
      setRunMode('error')
      toast.error('SQL compilation failed.')
    } else {
      nextHistory.push({ kind: 'success', text: `Parsed ${analysis.statementCount} statement(s) successfully.` })
      if (analysis.warnings.length > 0) {
        nextHistory.push(...analysis.warnings.map((item) => ({ kind: 'warning', text: `L${item.line}: ${item.message}` })))
      }
      nextHistory.push({ kind: 'info', text: `Dialect: ${dialect.toUpperCase()} | Simulated execution completed.` })
      setRunMode('success')
      toast.success('SQL executed successfully in the playground.')
    }

    setHistory([
      { kind: 'info', text: `${timestamp} - Run completed.` },
      ...nextHistory,
    ])
    setLastRunAt(timestamp)
  }

  const loadSample = (nextSql) => {
    setSql(nextSql)
    setRunMode('idle')
    setHistory([{ kind: 'info', text: 'Sample loaded.' }])
  }

  const clearEditor = () => {
    setSql('')
    setRunMode('idle')
    setHistory([{ kind: 'info', text: 'Editor cleared.' }])
  }

  const copySql = async () => {
    try {
      await navigator.clipboard.writeText(sql)
      toast.success('SQL copied to clipboard.')
    } catch {
      toast.error('Failed to copy SQL.')
    }
  }

  const handleEditorKeyDown = (event) => {
    if (event.key !== 'Tab') return

    event.preventDefault()
    const textarea = editorRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const tabSize = '  '
    const nextValue = `${sql.slice(0, start)}${tabSize}${sql.slice(end)}`

    setSql(nextValue)

    queueMicrotask(() => {
      textarea.focus()
      textarea.setSelectionRange(start + tabSize.length, start + tabSize.length)
    })
  }

  return (
    <DashboardLayout selectedDialect={dialect} onSelectDialect={setDialect} generationStatus={runMode} promptLength={sql.length}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-2 sm:px-4 lg:px-6">
        <div className="flex flex-col gap-3 border-b border-primary/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-amber-700">
              <HiOutlineCommandLine className="h-3.5 w-3.5" />
              Playground
            </div>
            <h1 className="text-2xl font-black tracking-tight text-primary sm:text-3xl">SQL Compiler Playground</h1>
            <p className="max-w-2xl text-sm text-secondary">
              Write SQL, run a fast syntax pass, and review compiler-style errors, warnings, and execution notes in one place.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-secondary">
            <span className="rounded-full border border-primary/10 bg-surface px-3 py-1">{dialect.toUpperCase()}</span>
            <span className="rounded-full border border-primary/10 bg-surface px-3 py-1">{sql.split('\n').length} lines</span>
            <span className="rounded-full border border-primary/10 bg-surface px-3 py-1">{analysis.statementCount} statements</span>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(340px,0.8fr)]">
          <Card padding="none" className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-primary/10 bg-surface/80 px-4 py-3">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-secondary">
                <HiOutlineBolt className="h-4 w-4 text-amber-500" />
                Editor
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={copySql} className="rounded-lg border border-primary/10 bg-background/70 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:border-amber-500/40 hover:bg-background">
                  <span className="inline-flex items-center gap-1.5"><HiOutlineClipboardDocument className="h-4 w-4 text-amber-500" />Copy</span>
                </button>
                <button type="button" onClick={clearEditor} className="rounded-lg border border-primary/10 bg-background/70 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:border-amber-500/40 hover:bg-background">
                  <span className="inline-flex items-center gap-1.5"><HiOutlineTrash className="h-4 w-4 text-amber-500" />Clear</span>
                </button>
                <button type="button" onClick={runSql} className="rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-background shadow-sm transition-transform hover:scale-[1.01]">
                  <span className="inline-flex items-center gap-1.5"><HiOutlinePlay className="h-4 w-4" />Run SQL</span>
                </button>
              </div>
            </div>

            <div className="border-b border-primary/10 bg-background/40 px-4 py-3">
              <div className="flex flex-wrap gap-2">
                {SAMPLE_QUERIES.map((sample) => (
                  <button
                    key={sample.label}
                    type="button"
                    onClick={() => loadSample(sample.sql)}
                    className="rounded-full border border-primary/10 bg-surface px-3 py-1 text-[11px] font-medium text-secondary transition-colors hover:border-amber-500/40 hover:text-primary"
                  >
                    {sample.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-[#0e1117] p-4">
              <div className="mb-3 flex items-center justify-between text-[11px] font-mono text-white/50">
                <span>main.sql</span>
                <span>{lastRunAt ? `Last run ${lastRunAt}` : 'Ready to execute'}</span>
              </div>
              <textarea
                ref={editorRef}
                value={sql}
                onChange={(e) => setSql(e.target.value)}
                onKeyDown={handleEditorKeyDown}
                spellCheck={false}
                className="min-h-130 w-full resize-y rounded-xl border border-white/10 bg-[#0b0f14] px-4 py-4 font-mono text-sm leading-6 text-emerald-200 outline-none placeholder:text-white/30 focus:border-amber-500/50"
                placeholder="Write SQL here..."
              />
            </div>
          </Card>

          <div className="space-y-6">
            <Card>
              <div className="flex items-center justify-between border-b border-primary/10 pb-3">
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-secondary">Compiler Output</p>
                  <p className="text-sm text-secondary">Syntax checks and execution notes</p>
                </div>
                <div className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${hasErrors ? 'bg-red-500/10 text-red-700' : hasWarnings ? 'bg-amber-500/10 text-amber-700' : 'bg-emerald-500/10 text-emerald-700'}`}>
                  {hasErrors ? 'Errors found' : hasWarnings ? 'Warnings' : 'Ready'}
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {analysis.diagnostics.length === 0 && analysis.warnings.length === 0 ? (
                  <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/5 p-4 text-sm text-secondary">
                    No syntax errors detected in the current buffer.
                  </div>
                ) : (
                  [
                    ...analysis.diagnostics.map((item) => ({ ...item, tone: 'error' })),
                    ...analysis.warnings.map((item) => ({ ...item, tone: 'warning' })),
                  ].map((item, index) => (
                    <div key={`${item.type}-${index}`} className={`flex gap-3 rounded-xl border p-3 text-sm ${item.tone === 'error' ? 'border-red-500/20 bg-red-500/5 text-red-700' : 'border-amber-500/20 bg-amber-500/5 text-amber-700'}`}>
                      {item.tone === 'error' ? <HiOutlineExclamationTriangle className="mt-0.5 h-5 w-5 shrink-0" /> : <HiOutlineExclamationTriangle className="mt-0.5 h-5 w-5 shrink-0" />}
                      <div>
                        <p className="font-semibold">Line {item.line}</p>
                        <p>{item.message}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-2 border-b border-primary/10 pb-3">
                <HiOutlineCheckCircle className="h-5 w-5 text-emerald-600" />
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-secondary">Execution Log</p>
                  <p className="text-sm text-secondary">Simulated compiler console</p>
                </div>
              </div>

              <div className="mt-4 space-y-2 rounded-xl border border-primary/10 bg-[#0b0f14] p-4 font-mono text-xs leading-6 text-emerald-200">
                {history.map((entry, index) => (
                  <div key={`${entry.text}-${index}`} className={entry.kind === 'error' ? 'text-red-300' : entry.kind === 'warning' ? 'text-amber-300' : entry.kind === 'success' ? 'text-emerald-300' : 'text-slate-300'}>
                    {entry.text}
                  </div>
                ))}
              </div>
            </Card>

            <Card>
              <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-secondary">Query Stats</p>
              <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl border border-primary/10 bg-background/60 p-3">
                  <p className="text-xs text-secondary">Characters</p>
                  <p className="mt-1 font-bold text-primary">{sql.length}</p>
                </div>
                <div className="rounded-xl border border-primary/10 bg-background/60 p-3">
                  <p className="text-xs text-secondary">Errors</p>
                  <p className="mt-1 font-bold text-primary">{analysis.diagnostics.length}</p>
                </div>
                <div className="rounded-xl border border-primary/10 bg-background/60 p-3">
                  <p className="text-xs text-secondary">Warnings</p>
                  <p className="mt-1 font-bold text-primary">{analysis.warnings.length}</p>
                </div>
                <div className="rounded-xl border border-primary/10 bg-background/60 p-3">
                  <p className="text-xs text-secondary">Statements</p>
                  <p className="mt-1 font-bold text-primary">{analysis.statementCount}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}