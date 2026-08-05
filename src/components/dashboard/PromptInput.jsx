import { useState, useRef, useEffect } from 'react'
import {
  HiOutlineSparkles,
  HiOutlineCommandLine,
  HiOutlineChevronDown,
  HiOutlineArrowRight,
} from 'react-icons/hi2'
import Button from '../common/Button'
import LoadingSpinner from './LoadingSpinner'
import { cn } from '../../utils/cn'

const DIALECT_OPTIONS = [
  { id: 'postgresql', name: 'PostgreSQL' },
  { id: 'mysql', name: 'MySQL' },
  { id: 'microsoft_sql', name: 'Microsoft SQL Server' },
  { id: 'oracle_database', name: 'Oracle Database' },
]

const TEMPLATE_PROMPTS = [
  {
    label: '🛒 E-Commerce',
    prompt: `Design a scalable e-commerce database with customers, products, categories, inventory, shopping carts, orders, order items, payments, shipments, and product reviews.
Include relationships, constraints, and support for order tracking and stock management.`
  },
  {
    label: '💳 SaaS Billing',
    prompt: `Create a multi-tenant SaaS billing database containing organizations, users, roles, subscription plans, invoices, payment methods, usage tracking, and billing history.
Support subscription upgrades, renewals, and payment records.`
  },
  {
    label: '🚂 Railway Booking',
    prompt: `Design a railway reservation system with trains, stations, routes, schedules, coaches, seats, passengers, ticket bookings, and fare details.
Support seat availability, cancellations, and journey history.`
  },
  {
    label: '📊 Analytics Warehouse',
    prompt: `Build an analytics warehouse for storing user events, sessions, page views, devices, traffic sources, and daily aggregated metrics.
Optimize the schema for reporting, dashboards, and historical analysis.`
  },
  {
    label: '🏥 Hospital Management',
    prompt: `Create a hospital management database with patients, doctors, departments, appointments, admissions, prescriptions, laboratory tests, and billing.
Support patient medical history and treatment records.`
  },
  {
    label: '🎓 University Management',
    prompt: `Design a university database with students, faculty, departments, courses, enrollments, examinations, grades, attendance, and timetables.
Include prerequisites and semester-wise academic records.`
  },
  {
    label: '🏦 Banking System',
    prompt: `Build a banking database containing customers, accounts, branches, transactions, cards, loans, beneficiaries, and fund transfers.
Ensure accurate transaction history and account relationships.`
  },
  {
    label: '🍽️ Restaurant Ordering',
    prompt: `Design a restaurant management system with customers, menu items, tables, reservations, orders, order items, staff, and payments.
Support dine-in, takeaway, delivery, and order status tracking.`
  }
];

export default function PromptInput({
  prompt,
  onChange,
  onSubmit,
  selectedDialect,
  onSelectDialect,
  loading = false,
  disabled = false,
}) {
  const textareaRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)

  // Auto-resize textarea height based on content
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.max(100, textareaRef.current.scrollHeight)}px`
    }
  }, [prompt])

  const handleSubmit = (e) => {
    if (e) e.preventDefault()
    if (!prompt.trim() || loading || disabled) return
    onSubmit()
  }

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleDialectChange = (event) => {
    if (onSelectDialect) {
      onSelectDialect(event.target.value)
    }
  }

  const isButtonDisabled = disabled || loading || !prompt.trim()

  return (
    <div className="w-full space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-primary/10 pb-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-primary tracking-tight flex items-center gap-2">
            Schema Studio Editor
          </h1>
          <p className="text-xs text-secondary mt-0.5 font-sans">
            Describe your database domain model in plain English to generate a 3NF normalized SQL DDL script.
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-1.5 font-mono text-[11px] text-secondary self-start sm:self-auto bg-background/50 px-2.5 py-1 rounded-lg border border-primary/10">
          <HiOutlineCommandLine className="h-3.5 w-3.5 text-amber-500" />
          <span>Press <kbd className="font-bold text-primary px-1 bg-surface rounded border border-primary/20">Ctrl+Enter</kbd> to generate</span>
        </div>
      </div>

      {/* Quick Template Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 custom-scrollbar">
        <span className="text-[11px] font-mono text-secondary shrink-0 font-bold">TEMPLATES:</span>
        {TEMPLATE_PROMPTS.map((tmpl) => (
          <button
            key={tmpl.label}
            type="button"
            onClick={() => onChange(tmpl.prompt)}
            className="shrink-0 rounded-lg border border-primary/15 bg-background/50 px-2.5 py-1 text-xs text-secondary hover:border-amber-500/50 hover:bg-amber-500/10 hover:text-primary transition-colors font-medium"
          >
            {tmpl.label}
          </button>
        ))}
      </div>

      {/* Copilot-Style Prompt Container */}
      <div
        className={cn(
          'relative rounded-2xl border bg-background/80 p-3 shadow-md transition-all duration-200',
          isFocused
            ? 'border-amber-500 ring-2 ring-amber-500/15 shadow-lg shadow-amber-500/5'
            : 'border-primary/20 hover:border-primary/30'
        )}
      >
        <textarea
          ref={textareaRef}
          id="sql-prompt-input"
          value={prompt}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder='e.g. "Create a SaaS database with users, organizations, subscriptions, invoices, and usage logs with foreign key constraints."'
          disabled={loading || disabled}
          className="w-full bg-transparent font-sans text-sm text-primary placeholder:text-secondary/60 focus:outline-none resize-none leading-relaxed min-h-[100px]"
          rows={3}
        />

        {/* Editor Controls Bar */}
        <div className="flex flex-col gap-3 pt-3 border-t border-primary/10 mt-2 font-mono text-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3 text-secondary text-[11px]">
            <span>{prompt.length} / 2000 chars</span>
            <span>•</span>
            <span className="flex items-center gap-1 text-emerald-600 font-bold">
              <HiOutlineSparkles className="h-3.5 w-3.5" />
              ANSI SQL Ready
            </span>
          </div>

          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-end">
            <div className="relative w-full sm:w-52">
              <select
                value={selectedDialect || 'postgresql'}
                onChange={handleDialectChange}
                disabled={disabled || loading}
                aria-label="Select SQL dialect"
                className={cn(
                  'h-9 w-full appearance-none rounded-2xl border bg-background/80 px-3 pr-9 text-xs font-semibold text-primary outline-none transition-colors',
                  'border-primary/15 hover:border-amber-500/40 focus:border-amber-500 focus:ring-2 focus:ring-amber-500/15',
                  'disabled:cursor-not-allowed disabled:opacity-60'
                )}
              >
                {DIALECT_OPTIONS.map((dialect) => (
                  <option key={dialect.id} value={dialect.id}>
                    {dialect.name}
                  </option>
                ))}
              </select>
              <HiOutlineChevronDown className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-secondary" />
            </div>

            <Button
              type="button"
              onClick={handleSubmit}
              variant="primary"
              disabled={isButtonDisabled}
              loading={false}
              className="h-9 w-full px-4 text-xs font-bold shadow-md shadow-primary/10 transition-all hover:shadow-lg sm:w-auto"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <LoadingSpinner className="h-3.5 w-3.5" />
                  <span>Generating Schema...</span>
                </span>
              ) : (
                <span className="flex items-center justify-center gap-1.5">
                  <span>Generate SQL</span>
                  <HiOutlineArrowRight className="h-3.5 w-3.5" />
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
