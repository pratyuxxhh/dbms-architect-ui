import { useMemo, useState } from 'react'
import {
  HiOutlineUserCircle,
  HiOutlineKey,
  HiOutlineTrash,
  HiOutlineCheckBadge,
  HiOutlineBolt,
} from 'react-icons/hi2'
import { toast } from 'react-toastify'
import Card from '../components/common/Card'
import DashboardLayout from '../components/layout/DashboardLayout'
import {
  getStoredUserProfile,
  saveUserProfile,
} from '../utils/userProfile'

const PLAN_OPTIONS = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Light usage for quick schema generation.',
    limit: '25k tokens / month',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Best for active builders and frequent runs.',
    limit: '250k tokens / month',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    description: 'Higher throughput and team-level controls.',
    limit: 'Unlimited with policy gates',
  },
]

function getStoredValue(key, fallback) {
  return localStorage.getItem(key) || fallback
}

export default function Profile() {
  const [profile, setProfile] = useState(() => {
    const storedProfile = getStoredUserProfile()

    return storedProfile || {
      id: getStoredValue('userId', '66f4c8e9d5b12a7e9f1a3c11'),
      username: getStoredValue('username', 'Developer'),
      firstName: getStoredValue('firstName', 'Dev'),
      lastName: getStoredValue('lastName', 'User'),
      role: 'USER',
      plan: 'pro',
      totalTokenUsed: 12840,
      inputTokens: 7820,
      outputTokens: 5020,
      history: ['schema_studio_v2.sql', 'orders_schema.sql', 'billing_schema.sql'],
      userPrompts: [
        'Create a SaaS billing schema with invoices and subscriptions.',
        'Generate an ecommerce schema with products, carts, and orders.',
      ],
      createdAt: '2026-01-18T10:42:00',
      updatedAt: '2026-08-02T14:05:00',
      password: '********',
    }
  })

  const [isDeleting, setIsDeleting] = useState(false)
  const [isLoadingProfile, setIsLoadingProfile] = useState(false)

  const fullName = useMemo(
    () => `${profile.firstName} ${profile.lastName}`.trim() || profile.username,
    [profile.firstName, profile.lastName, profile.username]
  )

  const fetchUserProfile = async () => {
    if (isLoadingProfile) return

    setIsLoadingProfile(true)
    try {
      const storedProfile = getStoredUserProfile()
      if (!storedProfile) {
        toast.error('No stored profile found. Use the topbar profile button first.')
        return
      }

      setProfile(storedProfile)
      toast.success('Profile loaded from local storage.')
    } catch (err) {
      console.error('Failed to load stored user profile:', err)
      toast.error('Failed to load user profile.')
    } finally {
      setIsLoadingProfile(false)
    }
  }

  const deleteUserId = () => {
    const confirmed = window.confirm('Delete this user id from the local profile view?')
    if (!confirmed) return

    setIsDeleting(true)
    setTimeout(() => {
      const nextProfile = {
        ...profile,
        id: 'deleted',
        updatedAt: new Date().toISOString().slice(0, 19),
      }

      setProfile(nextProfile)
      saveUserProfile(nextProfile)
      setIsDeleting(false)
      toast.info('User id deleted in the local profile view.')
    }, 300)
  }

  const changePlan = (planId) => {
    const nextProfile = {
      ...profile,
      plan: planId,
      updatedAt: new Date().toISOString().slice(0, 19),
    }

    setProfile(nextProfile)
    saveUserProfile(nextProfile)
    toast.success(`Plan changed to ${planId.toUpperCase()}.`)
  }

  return (
    <DashboardLayout
      selectedDialect="postgresql"
      onSelectDialect={() => {}}
      generationStatus="idle"
      promptLength={0}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-2 sm:px-4 lg:px-6">
        <div className="flex flex-col gap-3 border-b border-primary/10 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-amber-700">
              <HiOutlineUserCircle className="h-3.5 w-3.5" />
              Profile
            </div>
            <h1 className="text-2xl font-black tracking-tight text-primary sm:text-3xl">Account Profile</h1>
            <p className="max-w-2xl text-sm text-secondary">
              View your user record, usage stats, and account actions. The page mirrors the backend entity structure so the account state stays easy to inspect.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-secondary">
            <span className="rounded-full border border-primary/10 bg-surface px-3 py-1">Role: {profile.role}</span>
            <span className="rounded-full border border-primary/10 bg-surface px-3 py-1">Plan: {profile.plan.toUpperCase()}</span>
            <span className="rounded-full border border-primary/10 bg-surface px-3 py-1">History: {profile.history.length}</span>
          </div>
        </div>

        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(360px,0.9fr)]">
          <div className="space-y-6">
            <Card>
              <div className="flex items-start gap-4 border-b border-primary/10 pb-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-amber-500/25 bg-amber-500/10 text-amber-700">
                  <HiOutlineUserCircle className="h-8 w-8" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-xl font-bold text-primary truncate">{fullName}</h2>
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                      <HiOutlineCheckBadge className="h-3.5 w-3.5" /> Active
                    </span>
                  </div>
                  <p className="mt-1 font-mono text-sm text-secondary">@{profile.username}</p>
                  <p className="mt-2 text-sm text-secondary">
                    ObjectId-based account record with usage tracking, saved prompts, and history snapshots.
                  </p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  { label: 'username', value: profile.username },
                  { label: 'firstName', value: profile.firstName },
                  { label: 'lastName', value: profile.lastName },
                  { label: 'role', value: profile.role },
                  { label: 'totalTokenUsed', value: profile.totalTokenUsed.toLocaleString() },
                  { label: 'inputTokens', value: profile.inputTokens.toLocaleString() },
                  { label: 'outputTokens', value: profile.outputTokens.toLocaleString() },
                  { label: 'history', value: `${profile.history.length} saved files` },
                  { label: 'userPrompts', value: `${profile.userPrompts.length} prompts` },
                  { label: 'updatedAt', value: profile.updatedAt },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-primary/10 bg-background/60 p-3">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-secondary">{item.label}</p>
                    <p className="mt-1 break-all font-mono text-sm text-primary">{item.value}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          <div className="space-y-6">

            <Card>
              <div className="flex items-center gap-2 border-b border-primary/10 pb-3">
                <HiOutlineKey className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-secondary">Plan Options</p>
                  <p className="text-sm text-secondary">Switch the current subscription tier</p>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {PLAN_OPTIONS.map((plan) => {
                  const isSelected = profile.plan === plan.id
                  return (
                    <button
                      key={plan.id}
                      type="button"
                      onClick={() => changePlan(plan.id)}
                      className={`w-full rounded-xl border px-4 py-3 text-left transition-colors ${
                        isSelected
                          ? 'border-amber-500/40 bg-amber-500/10'
                          : 'border-primary/10 bg-background/60 hover:border-amber-500/30 hover:bg-background'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-sm font-semibold text-primary">{plan.name}</p>
                          <p className="mt-0.5 text-xs text-secondary">{plan.description}</p>
                        </div>
                        {isSelected && (
                          <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                            Current
                          </span>
                        )}
                      </div>
                      <p className="mt-2 font-mono text-[11px] text-secondary">{plan.limit}</p>
                    </button>
                  )
                })}
              </div>
            </Card>
            <Card>
              <div className="flex items-center gap-2 border-b border-primary/10 pb-3">
                <HiOutlineBolt className="h-5 w-5 text-amber-500" />
                <div>
                  <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-secondary">Account Actions</p>
                  </div>
              </div>

              <div className="mt-4 space-y-3">
                
                <button
                  type="button"
                  onClick={deleteUserId}
                  disabled={isDeleting}
                  className="flex w-full items-center justify-between rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-left transition-colors hover:border-red-500/40 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  <span>
                    <span className="block text-sm font-semibold text-red-700">Delete ID</span>
                    </span>
                  <HiOutlineTrash className="h-5 w-5 text-red-600" />
                </button>
              </div>
            </Card>

            

            
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}