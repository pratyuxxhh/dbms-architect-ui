import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { HiOutlineBars3, HiOutlineUserCircle } from 'react-icons/hi2'
import { toast } from 'react-toastify'
import { cn } from '../../utils/cn'
import { mapUserEntityToProfile, saveUserProfile } from '../../utils/userProfile'

const API_URL = import.meta.env.VITE_API_URL

export default function Topbar({ onMenuClick }) {
  const username = localStorage.getItem('username') || 'Developer'
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const isProfilePage = pathname === '/profile'

  const fetchAndStoreProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_URL}/user/get-user`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token || ''}`,
        },
      })

      if (!response.ok) {
        const message = await response.text()
        throw new Error(message || 'Failed to load user profile.')
      }

      const data = await response.json()
      const mappedProfile = mapUserEntityToProfile(data)
      saveUserProfile(mappedProfile)
      toast.success('Profile loaded.')
      return true
    } catch (error) {
      console.error('Failed to load profile from topbar:', error)
      const errorMessage =
        error instanceof TypeError && error.message.includes('Failed to fetch')
          ? 'Connection refused. Please try again after some time.'
          : error instanceof Error
            ? error.message
            : 'Failed to load user profile.'
      toast.error(errorMessage)
      return false
    } finally {
      setIsLoadingProfile(false)
    }
  }

  const loadProfile = async () => {
    if (isLoadingProfile) return

    setIsLoadingProfile(true)
    const loaded = await fetchAndStoreProfile()
    if (loaded) {
      navigate('/profile')
    }
  }

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
        <button
          type="button"
          onClick={loadProfile}
          disabled={isLoadingProfile}
          className={cn(
            'inline-flex items-center gap-2 rounded-lg border px-2.5 py-1 font-mono text-[11px] transition-colors disabled:cursor-not-allowed disabled:opacity-70',
            isProfilePage
              ? 'border-amber-500/40 bg-amber-500/10 text-primary'
              : 'border-primary/15 bg-background/50 text-secondary hover:bg-background/80 hover:text-primary'
          )}
          title="Load profile"
        >
          <HiOutlineUserCircle className="h-4 w-4 text-amber-500" />
          <span className="hidden md:inline">{isLoadingProfile ? 'Loading...' : username}</span>
        </button>

      </div>
    </header>
  )
}