import { Link } from 'react-router-dom'
import NavLinks from '../Navbar/NavLinks'
import { authNavigation } from '../../data/navigation'
import LogoIcon from '../auth/LogoIcon'

export default function DecorativePanel({ activeLink = 'Dashboard' }) {
  return (
    <aside
      className="relative hidden flex-col justify-between overflow-hidden rounded-[40px] border border-primary/10 bg-surface p-10 shadow-xl shadow-primary/8 lg:flex lg:w-[58%]"
      aria-hidden="true"
    >
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-4 transition-opacity duration-250 hover:opacity-80"
        >
          <LogoIcon size="lg" />
          <div>
            <p className="text-2xl font-bold text-primary">DBMS Architect</p>
            <p className="text-sm text-secondary">AI schema generation</p>
          </div>
        </Link>

        <div className="mt-12">
          <NavLinks
            links={authNavigation}
            activeLink={activeLink}
            showIcons
            className="flex-col items-start gap-6"
          />
        </div>
      </div>

      <div className="pointer-events-none select-none opacity-20">
        <div className="h-48 w-48 rounded-full bg-primary/10 blur-3xl" />
      </div>
    </aside>
  )
}
