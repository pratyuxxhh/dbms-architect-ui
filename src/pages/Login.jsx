import AuthLayout from '../components/layout/AuthLayout'
import LoginCard from '../components/auth/LoginCard'
import DecorativePanel from '../components/auth/DecorativePanel'
import { clearUserProfile } from '../utils/userProfile'


export default function Login() {
  clearUserProfile()
  localStorage.removeItem('token')
  return (
    <AuthLayout activeLink="Dashboard">
      <div className="flex min-h-screen flex-col justify-center pt-24 pb-8 sm:pt-28 lg:flex-row lg:items-stretch lg:gap-8 lg:px-8 lg:pb-8 lg:pt-28 xl:px-12 max-w-7xl mx-auto w-full">
        <DecorativePanel activeLink="Dashboard" />

        <div className="flex flex-1 items-center justify-center px-3 sm:px-6 py-4 sm:py-8 lg:py-12">
          <LoginCard />
        </div>
      </div>
    </AuthLayout>
  )
}
