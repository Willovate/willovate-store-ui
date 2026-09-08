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
  onNavigateToLogin,
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
          <span>Willovate One</span>
        </a>

        <p className="auth-topbar-switch">
          Already have an account?{' '}
          <button type="button" onClick={onNavigateToLogin}>
            Log in
          </button>
        </p>
      </header>

      <main className="auth-main">
        <button
          type="button"
          className="auth-back-link"
          onClick={onNavigateHome}
        >
          <span aria-hidden="true">←</span>
          Back to home
        </button>

        <section className="auth-card" aria-label="Create your Willovate account">
          {brandPanel}
          <div className="auth-form-panel">{children}</div>
        </section>
      </main>
    </div>
  )
}
