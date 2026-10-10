import { GoogleAuthButton } from './GoogleAuthButton'

interface SocialAuthButtonsProps {
  onProviderSelect?: (provider: 'Google') => void
  onGoogleSuccess?: () => void
  onGoogleError?: (message: string) => void
  onGoogleStart?: () => void
  onGoogleEnd?: () => void
  disabled?: boolean
}

export function SocialAuthButtons({
  onProviderSelect,
  onGoogleSuccess,
  onGoogleError,
  onGoogleStart,
  onGoogleEnd,
  disabled = false,
}: SocialAuthButtonsProps) {
  return (
    <div className="auth-provider-buttons">
      <GoogleAuthButton
        onAuthSuccess={onGoogleSuccess}
        onError={onGoogleError || ((msg) => onProviderSelect?.('Google') ?? console.warn(msg))}
        onAuthStart={onGoogleStart}
        onAuthEnd={onGoogleEnd}
        disabled={disabled}
      />
    </div>
  )
}