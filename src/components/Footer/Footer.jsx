import Container from '../common/Container'

const footerLinks = [
  { label: 'About', href: '#about' },
  { label: 'Docs', href: '#docs' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
]

export default function Footer() {
  return (
    <footer className="border-t border-primary/10 py-8">
      <Container>
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              {footerLinks.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    className="text-base text-secondary transition-colors duration-250 hover:text-primary"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="text-center text-sm text-secondary sm:text-base">
            © 2026 DBMS Architect. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  )
}
