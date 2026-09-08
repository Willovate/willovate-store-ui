import { GoogleAuthButton } from './GoogleAuthButton'

interface SocialAuthButtonsProps {
  onProviderSelect: (provider: 'Microsoft') => void
  onGoogleSuccess?: () => void
  onGoogleError?: (message: string) => void
  onGoogleStart?: () => void
  onGoogleEnd?: () => void
  disabled?: boolean
}

function MicrosoftLogo() {
  return (
    <svg className="auth-microsoft-mark" viewBox="0 0 16 16" aria-hidden="true">
      <path fill="#f25022" d="M0 0h7.5v7.5H0z" />
      <path fill="#7fba00" d="M8.5 0H16v7.5H8.5z" />
      <path fill="#00a4ef" d="M0 8.5h7.5V16H0z" />
      <path fill="#ffb900" d="M8.5 8.5H16V16H8.5z" />
    </svg>
  )
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
        onError={onGoogleError || (() => {})}
        onAuthStart={onGoogleStart}
        onAuthEnd={onGoogleEnd}
        disabled={disabled}
      />

      <button
        className="auth-provider-button"
        type="button"
        disabled={disabled}
        onClick={() => onProviderSelect('Microsoft')}
      >
          <MicrosoftLogo />
        Continue with Microsoft
      </button>
    </div>
  )
}