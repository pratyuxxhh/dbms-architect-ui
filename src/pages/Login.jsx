import AuthLayout from '../components/layout/AuthLayout'
import LoginCard from '../components/auth/LoginCard'
import DecorativePanel from '../components/auth/DecorativePanel'


export default function Login() {
  localStorage.removeItem("username");
  localStorage.removeItem("token");
  return (
    <AuthLayout activeLink="Dashboard">
      <div className="flex min-h-screen flex-col pt-28 lg:flex-row lg:items-stretch lg:gap-8 lg:px-8 lg:pb-8 lg:pt-28 xl:px-12">
        <DecorativePanel activeLink="Dashboard" />

        <div className="flex flex-1 items-center justify-center px-6 py-8 lg:py-12">
          <LoginCard />
        </div>
      </div>
    </AuthLayout>
  )
}
