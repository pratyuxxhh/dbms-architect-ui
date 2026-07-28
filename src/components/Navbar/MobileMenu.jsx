import { Link } from 'react-router-dom'
import Button from '../common/Button'
import NavLinks from './NavLinks'
import { navLinks } from '../../data/navLinks'

export default function MobileMenu({
  isOpen,
  onClose,
  activeLink,
  links = navLinks,
  variant = 'landing',
}) {
  if (!isOpen) return null

  return (
    <div
      id="mobile-menu"
      className="animate-slide-down relative border-t border-primary/10 px-4 pb-5 pt-4 lg:hidden"
      role="dialog"
      aria-label="Mobile navigation menu"
    >
      <NavLinks
        links={links}
        activeLink={activeLink}
        showIcons={variant === 'auth'}
        className="flex-col items-start gap-5"
        onLinkClick={onClose}
      />

      {variant === 'landing' && (
        <div className="mt-6 flex flex-col gap-3 border-t border-primary/10 pt-5">
          <Link
            to="/login"
            onClick={onClose}
            className="text-center text-base font-medium text-primary transition-colors duration-250 hover:text-primary/80"
          >
            Login
          </Link>
          <Link to="/signup" onClick={onClose}>
            <Button variant="primary" className="w-full">
              Get Started
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
