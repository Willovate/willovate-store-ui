import type { ReactNode } from 'react'
import './auth.css'
import { WillovateLogo } from './WillovateLogo'

interface AuthLayoutProps {
  children: ReactNode
  brandPanel: ReactNode
}

export function AuthLayout({ children, brandPanel }: AuthLayoutProps) {
  return (
    <div className="auth-page">
      <header className="auth-topbar">
        <a className="auth-brand" href="#top" aria-label="Willovate One home">
          <WillovateLogo className="auth-brand-mark" />
          <span>Willovate One</span>
        </a>

        <p className="auth-topbar-switch">
          Already have an account?{' '}
          {/* TODO: Navigate to LoginPage when routing is introduced. */}
          <button type="button">Log in</button>
        </p>
      </header>

      <main className="auth-main">
        {/* TODO: Navigate to the storefront home when routing is introduced. */}
        <a className="auth-back-link" href="#top">
          <span aria-hidden="true">←</span>
          Back to home
        </a>

        <section className="auth-card" aria-label="Create your Willovate account">
          {brandPanel}
          <div className="auth-form-panel">{children}</div>
        </section>
      </main>
    </div>
  )
}