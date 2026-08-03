import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  HiOutlineMagnifyingGlass,
  HiOutlineDocumentText,
  HiOutlineXMark,
  HiOutlineArrowPath,
} from 'react-icons/hi2'
import { RiDatabase2Line } from 'react-icons/ri'
import { toast } from 'react-toastify'
import { cn } from '../../utils/cn'
import { dashboardNavigation } from '../../data/dashboardNavigation'

const API_URL = import.meta.env.VITE_API_URL

function parseHistoryResponse(data) {
  if (!Array.isArray(data)) return []
  return data.flatMap((entry) =>
    Object.entries(entry).map(([filename, content]) => ({
      filename,
      content: typeof content === 'string' ? content : String(content ?? ''),
    }))
  )
}

function SidebarNavItem({ item, active, onActivate }) {
  const baseClassName = cn(
    'group flex h-9 items-center gap-2.5 rounded-lg px-3 text-xs font-medium transition-colors',
    active
      ? 'bg-primary text-background font-semibold shadow-sm'
      : 'text-secondary hover:bg-background/80 hover:text-primary'
  )

  if (item.href.startsWith('/')) {
    return (
      <Link to={item.href} onClick={onActivate} className={baseClassName} aria-current={active ? 'page' : undefined}>
        <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span className="truncate">{item.label}</span>
      </Link>
    )
  }

  return (
    <a href={item.href} onClick={onActivate} className={baseClassName} aria-current={active ? 'page' : undefined}>
      <item.icon className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="truncate">{item.label}</span>
    </a>
  )
}

export default function Sidebar({ isOpen, onClose, width = 260, onSelectHistoryItem }) {
  const { pathname } = useLocation()
  const [searchQuery, setSearchQuery] = useState('')
  const [historyItems, setHistoryItems] = useState([])
  const [loadingHistory, setLoadingHistory] = useState(false)
  const isActiveDashboard = pathname === '/' || pathname === '/dashboard'

  const fetchHistory = useCallback(async () => {
    setLoadingHistory(true)
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/user/get-history`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token || ''}`,
        },
      })

      if (response.status === 200) {
        const data = await response.json()
        setHistoryItems(parseHistoryResponse(data))
      } else if (response.status === 401) {
        toast.error('Session expired. Please log in again.')
      } else {
        toast.error('Failed to load schema history.')
      }
    } catch (err) {
      console.error('Failed to fetch history:', err)
      const errorMessage =
        err instanceof TypeError && err.message.includes('Failed to fetch')
          ? 'Connection refused. Please try again after some time.'
          : 'Failed to load schema history.'
      toast.error(errorMessage)
    } finally {
      setLoadingHistory(false)
    }
  }, [])

  useEffect(() => {
    queueMicrotask(() => {
      fetchHistory()
    })
  }, [fetchHistory])

  const filteredHistory = historyItems.filter((item) =>
    item.filename.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <>
      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        style={{ width: `${width}px` }}
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-80 max-w-[85vw] flex-col border-r border-primary/15 bg-surface/95 px-3 py-4 shadow-xl shadow-primary/5 transition-transform duration-200 ease-out backdrop-blur-xl select-none',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
        aria-label="Sidebar Workspace Navigation"
      >
        {/* Brand Header */}
        <div className="flex items-center justify-between gap-2 px-2 pb-4 border-b border-primary/15">
          <Link to="/" className="flex items-center gap-2.5 group min-w-0" title="Go to landing page">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-amber-300 shadow-sm group-hover:scale-105 transition-transform shrink-0">
              <RiDatabase2Line className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="leading-tight truncate">
              <p className="text-sm font-extrabold text-primary tracking-tight truncate">DBMS Architect</p>
              <p className="text-[10px] font-medium font-mono text-secondary truncate">AI Studio v2.0</p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-secondary hover:bg-background/80 hover:text-primary lg:hidden"
            aria-label="Hide navigation"
          >
            <HiOutlineXMark className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        {/* Compact Workspace Navigation */}
        <nav aria-label="Dashboard navigation" className="mt-3 space-y-1">
          {dashboardNavigation.map((item) => (
            <SidebarNavItem
              key={item.label}
              item={item}
              active={item.label === 'Dashboard' ? isActiveDashboard : false}
              onActivate={onClose}
            />
          ))}
        </nav>

        {/* File-Explorer Style Schema History Section */}
        <div className="mt-5 flex-1 flex flex-col min-h-0 border-t border-primary/15 pt-4">
          <div className="flex items-center justify-between px-2 mb-2">
            <span className="font-mono text-[11px] font-bold text-secondary uppercase tracking-widest">
              Schema Explorer
            </span>
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-[10px] text-secondary/70">
                {filteredHistory.length} files
              </span>
              <button
                type="button"
                onClick={fetchHistory}
                disabled={loadingHistory}
                className="rounded-md p-1 text-secondary hover:bg-background/80 hover:text-amber-600 disabled:opacity-50 transition-colors"
                aria-label="Refresh schema history"
                title="Refresh history"
              >
                <HiOutlineArrowPath
                  className={cn('h-3.5 w-3.5', loadingHistory && 'animate-spin')}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative px-2 mb-3">
            <HiOutlineMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-secondary pointer-events-none" />
            <input
              type="text"
              placeholder="Filter history..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-8 rounded-lg border border-primary/15 bg-background/60 pl-8 pr-3 text-xs text-primary placeholder:text-secondary/60 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500/20"
            />
          </div>

          {/* File Explorer Tree */}
          <div className="flex-1 overflow-y-auto space-y-1 px-1 custom-scrollbar">
            {loadingHistory && historyItems.length === 0 ? (
              <div className="px-2 py-4 text-center text-xs text-secondary/70">
                Loading history...
              </div>
            ) : filteredHistory.length > 0 ? (
              filteredHistory.map((item) => (
                  <button
                    key={item.filename}
                    type="button"
                    onClick={() => {
                      if (onSelectHistoryItem) {
                        onSelectHistoryItem({ filename: item.filename, content: item.content })
                      }
                      if (onClose) onClose()
                    }}
                    className="w-full flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-xs transition-colors hover:bg-background/80 group"
                  >
                  <HiOutlineDocumentText className="h-4 w-4 shrink-0 text-amber-500 group-hover:scale-110 transition-transform" />
                  <div className="min-w-0 flex-1">
                    <p className="font-mono text-[11px] font-medium text-primary truncate group-hover:text-amber-600 transition-colors">
                      {item.filename}
                    </p>
                  </div>
                  </button>
              ))
            ) : (
              <div className="px-2 py-4 text-center text-xs text-secondary/70">
                {searchQuery ? 'No matching schemas found' : 'No schema history yet'}
              </div>
            )}
          </div>
        </div>

        {/* Footer User Badge */}
        <div className="mt-3 border-t border-primary/15 pt-3 px-2 flex items-center justify-between font-mono text-[11px]">
          <div className="flex items-center gap-2 min-w-0">
            <div className="h-6 w-6 rounded-full bg-amber-500/20 text-amber-600 flex items-center justify-center font-bold text-[10px] shrink-0">
              DA
            </div>
            <span className="truncate text-primary font-semibold">
              {localStorage.getItem('username') || 'Developer'}
            </span>
          </div>
          <span className="text-[10px] text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold">
            PRO
          </span>
        </div>
      </aside>
    </>
  )
}