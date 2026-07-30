import Navbar from '../Navbar/Navbar'
import PageWrapper from '../common/PageWrapper'

export default function AuthLayout({ children, activeLink = 'Dashboard' }) {
  return (
    <PageWrapper className="bg-grid-pattern relative">
      <div className="absolute top-0 left-0 w-full h-full bg-background/80 -z-10" />
      <Navbar variant="auth" activeLink={activeLink} />
      <main className="relative z-10">{children}</main>
    </PageWrapper>
  )
}
