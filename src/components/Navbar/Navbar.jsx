import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HiOutlineBars3 } from 'react-icons/hi2'
import { RiDatabase2Line } from 'react-icons/ri'
import Container from '../common/Container'
import Button from '../common/Button'
import NavLinks from './NavLinks'
import MobileMenu from './MobileMenu'
import { navLinks } from '../../data/navLinks'
import { authNavigation } from '../../data/navigation'

export default function Navbar({
  variant = 'landing',
  activeLink,
  links,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const isAuth = variant === 'auth'
  const navigationLinks = links ?? (isAuth ? authNavigation : navLinks)
  const currentActive =
    activeLink ?? (isAuth ? 'Dashboard' : 'Features')

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <header className="fixed inset-x-0 top-0 z-50 pt-3 sm:pt-6">
      <Container>
        <div className="nav-glass relative rounded-[22px] sm:rounded-[30px] border border-primary/10 shadow-lg shadow-primary/5">
          <div className="flex h-14 sm:h-16 items-center justify-between gap-3 px-3.5 sm:px-6">
            <Link
              to="/"
              className="flex min-w-0 items-center gap-3 transition-opacity duration-250 hover:opacity-80"
              aria-label="DBMS Architect home"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[18px] bg-background shadow-sm">
                <RiDatabase2Line
                  className="h-5 w-5 text-primary"
                  aria-hidden="true"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate text-base font-bold leading-tight text-primary sm:text-lg">
                  DBMS Architect
                </p>
                {!isAuth && (
                  <p className="truncate text-xs text-secondary sm:text-sm">
                    AI schema generation
                  </p>
                )}
              </div>
            </Link>

            <NavLinks
              links={navigationLinks}
              activeLink={currentActive}
              showIcons={isAuth}
              className="hidden lg:flex"
            />

            {!isAuth && (
              <div className="hidden items-center gap-5 lg:flex">
                <Link
                  to="/login"
                  className="text-base font-medium text-primary transition-colors duration-250 hover:text-primary/80"
                >
                  Login
                </Link>
                <Link to="/signup">
                  <Button variant="primary" className="px-6 py-2.5 text-base">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}

            <button
              type="button"
              onClick={toggleMobileMenu}
              className="rounded-[18px] p-2 text-primary transition-colors duration-250 hover:bg-background/60 lg:hidden"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <HiOutlineBars3 className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <MobileMenu
            isOpen={isMobileMenuOpen}
            onClose={closeMobileMenu}
            activeLink={currentActive}
            links={navigationLinks}
            variant={variant}
          />
        </div>
      </Container>
    </header>
  )
}
