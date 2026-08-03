import { useEffect, useMemo, useRef, useState } from 'react'
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

const PLAYGROUND_SQL_KEY = 'dbms-architect-playground-sql'

function getStoredSql() {
  const storedSql = localStorage.getItem(PLAYGROUND_SQL_KEY)
  return storedSql !== null ? storedSql : DEFAULT_SQL
}

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
  const lineNumberRef = useRef(null)
  const [sql, setSql] = useState(getStoredSql)
  const [dialect, setDialect] = useState('postgresql')
  const [runMode, setRunMode] = useState('idle')
  const [lastRunAt, setLastRunAt] = useState(null)
  const [history, setHistory] = useState([{ kind: 'info', text: 'Compiler ready.' }])

  useEffect(() => {
    localStorage.setItem(PLAYGROUND_SQL_KEY, sql)
  }, [sql])

  const lineNumbers = useMemo(() => sql.split('\n').map((_, index) => index + 1), [sql])

  const analysis = useMemo(() => buildDiagnostics(sql), [sql])
  const hasErrors = analysis.diagnostics.length > 0
  const hasWarnings = analysis.warnings.length > 0

  const runSql = (sqlText = sql) => {
    const executionAnalysis = buildDiagnostics(sqlText)
    const nextHistory = []
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    if (sqlText !== sql) {
      setSql(sqlText)
    }

    if (executionAnalysis.diagnostics.length > 0) {
      nextHistory.push({ kind: 'error', text: `Execution blocked with ${executionAnalysis.diagnostics.length} error(s).` })
      nextHistory.push(...executionAnalysis.diagnostics.map((item) => ({ kind: 'error', text: `L${item.line}: ${item.message}` })))
      setRunMode('error')
      toast.error('SQL compilation failed.')
    } else {
      nextHistory.push({ kind: 'success', text: `Parsed ${executionAnalysis.statementCount} statement(s) successfully.` })
      if (executionAnalysis.warnings.length > 0) {
        nextHistory.push(...executionAnalysis.warnings.map((item) => ({ kind: 'warning', text: `L${item.line}: ${item.message}` })))
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

  const handleEditorScroll = () => {
    if (!editorRef.current || !lineNumberRef.current) return
    lineNumberRef.current.scrollTop = editorRef.current.scrollTop
  }

  return (
    <DashboardLayout selectedDialect={dialect} onSelectDialect={setDialect} generationStatus={runMode} promptLength={sql.length}>
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-2 pb-6 sm:px-4 lg:px-6">
        <section className="rounded-3xl border border-primary/10 bg-linear-to-br from-surface via-surface to-amber-500/5 p-5 shadow-xl shadow-primary/5 sm:p-6">
          <div className="flex flex-col gap-4 border-b border-primary/10 pb-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-amber-700">
                <HiOutlineCommandLine className="h-3.5 w-3.5" />
                SQL Workbench
              </div>
              <h1 className="text-2xl font-black tracking-tight text-primary sm:text-3xl">SQL Compiler</h1>
              <p className="max-w-2xl text-sm leading-6 text-secondary">
                Write, validate, and refine SQL queries , just to check valid syntax.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-secondary">
              <span className="rounded-full border border-primary/10 bg-background/70 px-3 py-1">{dialect.toUpperCase()}</span>
              <span className="rounded-full border border-primary/10 bg-background/70 px-3 py-1">{sql.split('\n').length} lines</span>
              <span className="rounded-full border border-primary/10 bg-background/70 px-3 py-1">{analysis.statementCount} statements</span>
            </div>
          </div>
        </section>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_minmax(340px,0.8fr)]">
          <Card padding="none" className="overflow-hidden border-primary/10 shadow-xl shadow-primary/5">
            <div className="flex items-center justify-between border-b border-primary/10 bg-surface/90 px-4 py-3">
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-secondary">
                <HiOutlineBolt className="h-4 w-4 text-amber-500" />
                Editor
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={copySql} className="inline-flex items-center gap-1.5 rounded-lg border border-primary/10 bg-background/70 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:border-amber-500/40 hover:bg-background">
                  <HiOutlineClipboardDocument className="h-4 w-4 text-amber-500" />
                  Copy
                </button>
                <button type="button" onClick={clearEditor} className="inline-flex items-center gap-1.5 rounded-lg border border-primary/10 bg-background/70 px-3 py-1.5 text-xs font-medium text-primary transition-colors hover:border-amber-500/40 hover:bg-background">
                  <HiOutlineTrash className="h-4 w-4 text-amber-500" />
                  Clear
                </button>
                <button type="button" onClick={runSql} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-1.5 text-xs font-semibold text-background shadow-sm shadow-primary/10 transition-transform hover:scale-[1.01]">
                  <HiOutlinePlay className="h-4 w-4" />
                  Run SQL
                </button>
              </div>
            </div>

            <div className="border-b border-primary/10 bg-background/30 px-4 py-3">
              <div className="rounded-2xl border border-dashed border-primary/10 bg-surface/80 px-4 py-3">
                <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-secondary">
                  Validation Area
                </p>
                <p className="mt-1 text-sm leading-6 text-secondary">
                  Type your SQL in the editor, then run it to check syntax validity, missing semicolons, and bracket balance.
                </p>
              </div>
            </div>

            <div className="bg-surface p-4">
              <div className="mb-3 flex items-center justify-between text-[11px] font-mono text-secondary/80">
                <span className="inline-flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  main.sql
                </span>
                <span>{lastRunAt ? `Last run ${lastRunAt}` : 'Ready to execute'}</span>
              </div>
              <div className="flex min-h-130 overflow-hidden rounded-2xl border border-primary/10 bg-background/80 focus-within:border-amber-500/50 focus-within:ring-4 focus-within:ring-amber-500/10">
                <div
                  ref={lineNumberRef}
                  className="select-none border-r border-primary/10 bg-surface/80 px-3 py-4 font-mono text-xs leading-6 text-secondary/60 overflow-hidden"
                  aria-hidden="true"
                >
                  {lineNumbers.map((lineNumber) => (
                    <div key={lineNumber} className="h-6 text-right tabular-nums">
                      {lineNumber}
                    </div>
                  ))}
                </div>
                <textarea
                  ref={editorRef}
                  value={sql}
                  onChange={(e) => setSql(e.target.value)}
                  onKeyDown={handleEditorKeyDown}
                  onScroll={handleEditorScroll}
                  spellCheck={false}
                  className="min-h-130 flex-1 resize-y bg-transparent px-4 py-4 font-mono text-sm leading-6 text-primary outline-none placeholder:text-secondary/50 overflow-auto"
                  placeholder="Write SQL here..."
                />
              </div>
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