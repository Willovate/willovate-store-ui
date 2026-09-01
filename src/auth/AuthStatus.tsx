interface AuthStatusProps {
  tone: 'error' | 'info' | 'success'
  children: string
}

export function AuthStatus({ tone, children }: AuthStatusProps) {
  const role = tone === 'error' ? 'alert' : 'status'

  return (
    <p className={`auth-status auth-status-${tone}`} role={role}>
      {children}
    </p>
  )
}