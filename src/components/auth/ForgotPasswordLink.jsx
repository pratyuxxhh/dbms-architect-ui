export default function ForgotPasswordLink({ href = '#forgot-password' }) {
  return (
    <a
      href={href}
      className="text-sm font-medium text-secondary transition-colors duration-250 hover:text-primary"
    >
      Forgot Password?
    </a>
  )
}
