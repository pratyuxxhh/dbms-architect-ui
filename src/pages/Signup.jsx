import AuthLayout from '../components/layout/AuthLayout'
import SignupCard from '../components/auth/SignupCard'
import AIWorkflowShowcase from '../components/auth/AIWorkflowShowcase'

export default function Signup() {
  return (
    <AuthLayout>
      <div className="flex min-h-[calc(100vh-80px)] flex-col justify-center pt-20 pb-8 lg:flex-row lg:items-center lg:gap-8 lg:px-8 lg:pt-22 xl:px-12">
        <AIWorkflowShowcase />

        <div className="flex flex-1 items-center justify-center px-4 py-4 lg:py-6">
          <SignupCard />
        </div>
      </div>
    </AuthLayout>
  )
}
