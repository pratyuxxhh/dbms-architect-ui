import { Link, useLocation } from 'react-router-dom'
import { HiOutlineBars3, HiOutlineAdjustmentsHorizontal, HiOutlineUserCircle } from 'react-icons/hi2'
import { cn } from '../../utils/cn'

export default function Topbar({ onMenuClick, onToggleInspector, isInspectorOpen }) {
  const username = localStorage.getItem('username') || 'Developer'
  const { pathname } = useLocation()
  const isProfilePage = pathname === '/profile'

  return (
    <header className="sticky top-0 z-20 h-14 border-b border-primary/15 bg-surface/95 backdrop-blur-xl flex items-center justify-between px-3 sm:px-6">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          type="button"
          onClick={onMenuClick}
          className="inline-flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg border border-primary/15 bg-background text-primary transition-colors hover:bg-background/80 lg:hidden shrink-0"
          aria-label="Open sidebar"
        >
          <HiOutlineBars3 className="h-4 w-4 sm:h-5 sm:w-5" aria-hidden="true" />
        </button>

        {/* Workspace Breadcrumbs */}
        <Link
          to="/"
          className="flex items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs text-secondary truncate transition-colors hover:text-primary"
          title="Go to landing page"
        >
          <span className="font-semibold text-primary truncate">DBMS Architect</span>
          <span>/</span>
          <span className="text-amber-600 font-bold">Studio</span>
          <span className="hidden sm:inline text-primary/40">•</span>
          <span className="hidden sm:inline text-primary/70 truncate">Welcome, {username}</span>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <Link
          to="/profile"
          className={cn(
            'inline-flex items-center gap-2 rounded-lg border px-2.5 py-1 font-mono text-[11px] transition-colors',
            isProfilePage
              ? 'border-amber-500/40 bg-amber-500/10 text-primary'
              : 'border-primary/15 bg-background/50 text-secondary hover:bg-background/80 hover:text-primary'
          )}
          aria-current={isProfilePage ? 'page' : undefined}
          title="Open profile"
        >
          <HiOutlineUserCircle className="h-4 w-4 text-amber-500" />
          <span className="hidden md:inline">{username}</span>
        </Link>

        {/* Inspector Toggle Button */}
        <button
          type="button"
          onClick={onToggleInspector}
          className={cn(
            'inline-flex h-9 items-center gap-2 rounded-lg border px-3 text-xs font-mono font-medium transition-all',
            isInspectorOpen
              ? 'border-amber-500/40 bg-amber-500/10 text-primary shadow-xs'
              : 'border-primary/15 bg-background/60 text-secondary hover:bg-background/90 hover:text-primary'
          )}
          title="Toggle Inspector Panel (Ctrl+B)"
        >
          <HiOutlineAdjustmentsHorizontal className="h-4 w-4 text-amber-500" />
          <span className="hidden sm:inline">Inspector</span>
        </button>
      </div>
    </header>
  )
}