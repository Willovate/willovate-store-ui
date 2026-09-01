interface SocialAuthButtonsProps {
  onProviderSelect: (provider: 'Google' | 'Microsoft') => void
  disabled?: boolean
}

function GoogleLogo() {
  return (
    <svg className="auth-google-mark" viewBox="0 0 18 18" aria-hidden="true">
      <path fill="#4285f4" d="M17.64 9.2c0-.64-.06-1.25-.17-1.84H9v3.48h4.84a4.1 4.1 0 0 1-1.8 2.69v2.26h2.91c1.7-1.56 2.69-3.87 2.69-6.59Z" />
      <path fill="#34a853" d="M9 18c2.43 0 4.47-.8 5.96-2.17l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.35 0-4.35-1.59-5.06-3.73H.94v2.33A9 9 0 0 0 9 18Z" />
      <path fill="#fbbc05" d="M3.94 10.7A5.4 5.4 0 0 1 3.66 9c0-.59.1-1.16.28-1.7V4.97H.94A9 9 0 0 0 0 9c0 1.45.35 2.82.94 4.03Z" />
      <path fill="#ea4335" d="M9 3.58c1.32 0 2.5.45 3.43 1.34l2.57-2.57C13.47.92 11.43 0 9 0A9 9 0 0 0 .94 4.97L3.94 7.3C4.65 5.17 6.65 3.58 9 3.58Z" />
    </svg>
  )
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
  disabled = false,
}: SocialAuthButtonsProps) {
  return (
    <div className="auth-provider-buttons">
      <button
        className="auth-provider-button"
        type="button"
        disabled={disabled}
        onClick={() => onProviderSelect('Google')}
      >
          <GoogleLogo />
        Continue with Google
      </button>

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