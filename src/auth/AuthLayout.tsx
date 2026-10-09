import type { ReactNode } from 'react'
import './auth.css'
import { WillovateLogo } from './WillovateLogo'

interface AuthLayoutProps {
  children: ReactNode
  brandPanel: ReactNode
  onNavigateToLogin?: () => void
  onNavigateHome?: () => void
}

export function AuthLayout({
  children,
  brandPanel,
  onNavigateHome,
}: AuthLayoutProps) {
  return (
    <div className="auth-page">
      <header className="auth-topbar">
        <a
          className="auth-brand"
          href="#top"
          onClick={(e) => {
            if (onNavigateHome) {
              e.preventDefault()
              onNavigateHome()
            }
          }}
          aria-label="Willovate One home"
        >
          <WillovateLogo className="auth-brand-mark" />
        </a>
      </header>

      <main className="auth-main">
        <section className="auth-card" aria-label="Create your Willovate account">
          {brandPanel}
          <div className="auth-form-panel">{children}</div>
        </section>
      </main>
    </div>
  )
}
