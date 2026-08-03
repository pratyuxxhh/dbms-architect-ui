const USER_PROFILE_STORAGE_KEY = 'userProfile'

function formatDateTime(value) {
  if (!value) return 'N/A'
  return typeof value === 'string' ? value : String(value)
}

export function mapUserEntityToProfile(user) {
  return {
    id: user?.id || 'unknown',
    username: user?.username || 'Developer',
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    role: user?.role || 'USER',
    plan: 'pro',
    totalTokenUsed: Number(user?.totalTokenUsed ?? 0),
    inputTokens: Number(user?.inputTokens ?? 0),
    outputTokens: Number(user?.outputTokens ?? 0),
    history: Array.isArray(user?.history) ? user.history : [],
    userPrompts: Array.isArray(user?.userPrompts) ? user.userPrompts : [],
    createdAt: formatDateTime(user?.createdAt),
    updatedAt: formatDateTime(user?.updatedAt),
    password: user?.password || '********',
  }
}

export function getStoredUserProfile() {
  const storedProfile = localStorage.getItem(USER_PROFILE_STORAGE_KEY)
  if (!storedProfile) return null

  try {
    return JSON.parse(storedProfile)
  } catch (error) {
    console.error('Failed to parse stored user profile:', error)
    return null
  }
}

export function saveUserProfile(profile) {
  localStorage.setItem(USER_PROFILE_STORAGE_KEY, JSON.stringify(profile))

  if (profile?.username) {
    localStorage.setItem('username', profile.username)
  }

  if (profile?.id) {
    localStorage.setItem('userId', profile.id)
  }

  if (profile?.firstName) {
    localStorage.setItem('firstName', profile.firstName)
  }

  if (profile?.lastName) {
    localStorage.setItem('lastName', profile.lastName)
  }
}

export function clearUserProfile() {
  localStorage.removeItem(USER_PROFILE_STORAGE_KEY)
  localStorage.removeItem('username')
  localStorage.removeItem('userId')
  localStorage.removeItem('firstName')
  localStorage.removeItem('lastName')
}