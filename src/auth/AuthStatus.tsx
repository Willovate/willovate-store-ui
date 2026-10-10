import type { ReactNode } from 'react'

interface AuthStatusProps {
  tone: 'error' | 'info' | 'success'
  children: ReactNode
}

export function AuthStatus({ tone, children }: AuthStatusProps) {
  const role = tone === 'error' ? 'alert' : 'status'

  return (
    <p className={`auth-status auth-status-${tone}`} role={role}>
      {children}
    </p>
  )
}
