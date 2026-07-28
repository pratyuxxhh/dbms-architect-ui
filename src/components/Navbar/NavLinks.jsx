import { Link } from 'react-router-dom'
import { cn } from '../../utils/cn'

export default function NavLinks({
  links,
  activeLink,
  className,
  onLinkClick,
  showIcons = false,
}) {
  return (
    <nav aria-label="Main navigation">
      <ul className={cn('flex items-center gap-8', className)}>
        {links.map(({ label, href, icon: Icon }) => {
          const isActive = activeLink === label
          const isExternal = href.startsWith('#') || href.startsWith('http')

          const linkClassName = cn(
            'group relative inline-flex items-center gap-2 pb-1 text-base font-medium text-primary transition-colors duration-250',
            'hover:text-primary/80'
          )

          const underline = (
            <span
              className={cn(
                'absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-primary transition-all duration-250',
                showIcons ? 'w-0 group-hover:w-full' : 'left-1/2 -translate-x-1/2',
                isActive ? 'w-full' : !showIcons && 'w-0 group-hover:w-full',
                showIcons && isActive && 'w-full'
              )}
              aria-hidden="true"
            />
          )

          return (
            <li key={label}>
              {isExternal ? (
                <a
                  href={href}
                  onClick={onLinkClick}
                  className={linkClassName}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {showIcons && Icon && (
                    <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  )}
                  {label}
                  {underline}
                </a>
              ) : (
                <Link
                  to={href}
                  onClick={onLinkClick}
                  className={linkClassName}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {showIcons && Icon && (
                    <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                  )}
                  {label}
                  {underline}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
