import AuthLayout from '../components/layout/AuthLayout'
import SignupCard from '../components/auth/SignupCard'

export default function Signup() {
  return (
    <AuthLayout>
      <div className="flex min-h-screen items-center justify-center px-6 py-28">
        <SignupCard />
      </div>
    </AuthLayout>
  )
}
