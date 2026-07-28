import Navbar from '../Navbar/Navbar'
import PageWrapper from '../common/PageWrapper'

export default function AuthLayout({ children, activeLink = 'Dashboard' }) {
  return (
    <PageWrapper>
      <Navbar variant="auth" activeLink={activeLink} />
      <main>{children}</main>
    </PageWrapper>
  )
}
