import Container from '../common/Container'
import { Link } from 'react-router-dom'
import { RiDatabase2Line } from 'react-icons/ri'

const FOOTER_COLUMNS = [
  {
    title: 'Product',
    links: [
      { label: 'AI Schema Studio', href: '/dashboard' },
      { label: '3NF Normalization', href: '#features' },
      { label: 'ER Diagrams', href: '#features' },
      { label: 'SQL Dialects', href: '#features' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'PostgreSQL DDL Guide', href: '#how-it-works' },
      { label: 'MySQL Migration Tips', href: '#how-it-works' },
      { label: 'Supabase RLS Patterns', href: '#how-it-works' },
      { label: 'FAQ', href: '#faq' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#about' },
      { label: 'Security & Privacy', href: '#faq' },
      { label: 'Terms of Service', href: '#' },
      { label: 'Contact', href: '#' }
    ]
  }
]

export default function Footer() {
  return (
    <footer className="border-t border-primary/15 bg-surface/30 pt-16 pb-12">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-primary/10">
          {/* Brand Col */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[18px] bg-primary text-background shadow-sm">
                <RiDatabase2Line className="h-5 w-5 text-amber-300" />
              </div>
              <div>
                <span className="text-xl font-bold text-primary block leading-tight">
                  DBMS Architect
                </span>
                <span className="text-xs text-secondary">
                  AI Database Schema Generator
                </span>
              </div>
            </Link>

            <p className="text-sm text-primary/80 max-w-sm leading-relaxed">
              Empowering engineers and database administrators to design, normalize, and export production SQL schemas in seconds using next-gen AI.
            </p>

            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-800">
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>System Status: All Generators Operational</span>
            </div>
          </div>

          {/* Links Columns */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="text-xs font-mono uppercase tracking-wider font-bold text-primary mb-4">
                  {col.title}
                </h4>
                <ul className="space-y-2.5 text-sm text-primary/80">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('/') ? (
                        <Link
                          to={link.href}
                          className="hover:text-primary transition-colors"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          className="hover:text-primary transition-colors"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-secondary font-medium">
          <p>© {new Date().getFullYear()} DBMS Architect. All rights reserved.</p>
          <p className="font-mono">Built for DBAs, Developers & Systems Architects</p>
        </div>
      </Container>
    </footer>
  )
}
