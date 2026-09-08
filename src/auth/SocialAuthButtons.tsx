import { GoogleAuthButton } from './GoogleAuthButton'
import { MicrosoftAuthButton } from './MicrosoftAuthButton'

interface SocialAuthButtonsProps {
  onProviderSelect?: (provider: 'Microsoft') => void
  onGoogleSuccess?: () => void
  onGoogleError?: (message: string) => void
  onGoogleStart?: () => void
  onGoogleEnd?: () => void
  onMicrosoftSuccess?: () => void
  onMicrosoftError?: (message: string) => void
  onMicrosoftStart?: () => void
  onMicrosoftEnd?: () => void
  disabled?: boolean
}

export function SocialAuthButtons({
  onGoogleSuccess,
  onGoogleError,
  onGoogleStart,
  onGoogleEnd,
  onMicrosoftSuccess,
  onMicrosoftError,
  onMicrosoftStart,
  onMicrosoftEnd,
  disabled = false,
}: SocialAuthButtonsProps) {
  return (
    <div className="auth-provider-buttons">
      <GoogleAuthButton
        onAuthSuccess={onGoogleSuccess}
        onError={onGoogleError || (() => {})}
        onAuthStart={onGoogleStart}
        onAuthEnd={onGoogleEnd}
        disabled={disabled}
      />

      <MicrosoftAuthButton
        onAuthSuccess={onMicrosoftSuccess}
        onError={onMicrosoftError || (() => {})}
        onAuthStart={onMicrosoftStart}
        onAuthEnd={onMicrosoftEnd}
        disabled={disabled}
      />
    </div>
  )
}