import { Link, useLocation } from 'react-router-dom'
import { HiOutlineBars3, HiOutlineChevronDown } from 'react-icons/hi2'
import { RiDatabase2Line } from 'react-icons/ri'
import Card from '../common/Card'
import { cn } from '../../utils/cn'
import { dashboardNavigation } from '../../data/dashboardNavigation'
import { recentGenerations } from '../../data/recentGenerations'
import RecentGenerationCard from '../dashboard/RecentGenerationCard'

function SidebarNavItem({ item, active, onActivate }) {
  const baseClassName = cn(
    'group flex h-12 items-center gap-3 rounded-2xl px-4 text-[15px] font-medium transition-all duration-250',
    active
      ? 'bg-background text-primary shadow-md shadow-primary/8'
      : 'text-secondary hover:bg-background/55 hover:text-primary'
  )

  if (item.href.startsWith('/')) {
    return (
      <Link to={item.href} onClick={onActivate} className={baseClassName} aria-current={active ? 'page' : undefined}>
        <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
        <span>{item.label}</span>
      </Link>
    )
  }

  return (
    <a href={item.href} onClick={onActivate} className={baseClassName} aria-current={active ? 'page' : undefined}>
      <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span>{item.label}</span>
    </a>
  )
}

export default function Sidebar({ isOpen, onClose }) {
  const { pathname } = useLocation()
  const isActiveDashboard = pathname === '/' || pathname === '/dashboard'

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-primary/10 backdrop-blur-[2px] lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-40 flex w-65 flex-col border-r border-primary/20 bg-surface/80 px-5 py-6 shadow-2xl shadow-primary/10 transition-transform duration-250 ease-out backdrop-blur-2xl overflow-y-auto',
          isOpen ? 'translate-x-0' : '-translate-x-full',
          'lg:translate-x-0'
        )}
        aria-label="Sidebar"
      >
        <div className="flex items-center justify-between gap-3 pb-8 lg:pb-6">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-primary shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              <RiDatabase2Line className="h-6 w-6 text-amber-300" aria-hidden="true" />
            </div>
            <div className="leading-tight">
              <p className="text-[17px] font-extrabold text-primary tracking-tight">DBMS Architect</p>
              <p className="text-[11px] font-medium font-mono text-secondary">AI Schema Studio</p>
            </div>
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl p-2 text-secondary transition-colors duration-250 hover:bg-background/70 hover:text-primary lg:hidden"
            aria-label="Hide navigation"
          >
            <HiOutlineBars3 className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <nav aria-label="Dashboard navigation" className="space-y-2">
          {dashboardNavigation.map((item) => (
            <SidebarNavItem
              key={item.label}
              item={item}
              active={item.label === 'Dashboard' ? isActiveDashboard : false}
              onActivate={onClose}
            />
          ))}
        </nav>

        <div className="mt-5 border-t border-primary/10 pt-5">
          <Card padding="none" className="border-primary/10 bg-background/50 p-0 shadow-md shadow-primary/5">
            <div className="flex items-center justify-between border-b border-primary/10 px-4 py-4">
              <div>
                <p className="text-sm font-semibold text-primary">Recent Generations</p>
                <p className="text-xs text-secondary">Latest schema drafts</p>
              </div>
              <HiOutlineChevronDown className="h-4 w-4 text-secondary" aria-hidden="true" />
            </div>
            <RecentGenerationCard items={recentGenerations} />
          </Card>
        </div>
      </aside>
    </>
  )
}