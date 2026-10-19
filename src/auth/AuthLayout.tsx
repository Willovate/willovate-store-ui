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
  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault()
    if (onNavigateHome) {
      onNavigateHome()
    } else {
      window.location.hash = ''
    }
  }

  return (
    <div className="auth-page">
      <header className="auth-topbar">
        <a
          className="auth-brand"
          href="#top"
          onClick={handleHomeClick}
          aria-label="Willovate One home"
        >
          <WillovateLogo className="auth-brand-mark" />
        </a>

        <button
          type="button"
          className="auth-topbar-home-btn"
          onClick={handleHomeClick}
          aria-label="Back to home page"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M10 13L5 8l5-5" />
          </svg>
          <span>Back to home</span>
        </button>
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
