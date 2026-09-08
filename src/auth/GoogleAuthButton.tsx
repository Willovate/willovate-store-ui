import { useEffect, useRef } from 'react'
import { authenticateWithGoogle, ApiError } from '../lib/api'
import { useAuth } from './AuthContext'

interface GoogleAuthButtonProps {
  onAuthSuccess?: () => void
  onError: (message: string) => void
  onAuthStart?: () => void
  onAuthEnd?: () => void
  disabled?: boolean
}

const SCRIPT_ID = 'google-gsi-client'

function GoogleLogo() {
  return (
    <svg className="auth-google-mark" viewBox="0 0 18 18" aria-hidden="true" style={{ width: '17px', height: '17px' }}>
      <path fill="#4285f4" d="M17.64 9.2c0-.64-.06-1.25-.17-1.84H9v3.48h4.84a4.1 4.1 0 0 1-1.8 2.69v2.26h2.91c1.7-1.56 2.69-3.87 2.69-6.59Z" />
      <path fill="#34a853" d="M9 18c2.43 0 4.47-.8 5.96-2.17l-2.91-2.26c-.81.54-1.84.86-3.05.86-2.35 0-4.35-1.59-5.06-3.73H.94v2.33A9 9 0 0 0 9 18Z" />
      <path fill="#fbbc05" d="M3.94 10.7A5.4 5.4 0 0 1 3.66 9c0-.59.1-1.16.28-1.7V4.97H.94A9 9 0 0 0 0 9c0 1.45.35 2.82.94 4.03Z" />
      <path fill="#ea4335" d="M9 3.58c1.32 0 2.5.45 3.43 1.34l2.57-2.57C13.47.92 11.43 0 9 0A9 9 0 0 0 .94 4.97L3.94 7.3C4.65 5.17 6.65 3.58 9 3.58Z" />
    </svg>
  )
}

interface GisCredentialResponse {
  credential?: string
}

interface GisInitOptions {
  client_id: string
  callback: (response: GisCredentialResponse) => void | Promise<void>
}

interface GisRenderOptions {
  type?: 'standard' | 'icon'
  theme?: 'outline' | 'filled_blue' | 'filled_black'
  size?: 'large' | 'medium' | 'small'
  text?: 'signin_with' | 'signup_with' | 'continue_with' | 'signin'
  shape?: 'rectangular' | 'pill' | 'circle' | 'square'
}

interface GoogleIdentityServices {
  accounts?: {
    id?: {
      initialize: (options: GisInitOptions) => void
      renderButton: (parent: HTMLElement, options: GisRenderOptions) => void
    }
  }
}

declare global {
  interface Window {
    google?: GoogleIdentityServices
  }
}

export function GoogleAuthButton({ onAuthSuccess, onError, onAuthStart, onAuthEnd, disabled }: GoogleAuthButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { setSession } = useAuth()
  
  const callbacks = useRef({ onAuthSuccess, onError, onAuthStart, onAuthEnd, setSession })
  useEffect(() => {
    callbacks.current = { onAuthSuccess, onError, onAuthStart, onAuthEnd, setSession }
  }, [onAuthSuccess, onError, onAuthStart, onAuthEnd, setSession])

  useEffect(() => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID
    if (!clientId) return

    const initGsi = () => {
      const google = window.google
      if (!google?.accounts?.id) return

      google.accounts.id.initialize({
        client_id: clientId,
        callback: async (response: GisCredentialResponse) => {
          if (callbacks.current.onAuthStart) callbacks.current.onAuthStart()

          try {
            if (!response.credential) {
              callbacks.current.onError('Google authentication returned no credential.')
              return
            }

            const authResponse = await authenticateWithGoogle(response.credential)
            callbacks.current.setSession(authResponse)
            if (callbacks.current.onAuthSuccess) callbacks.current.onAuthSuccess()
          } catch (err: unknown) {
            if (err instanceof ApiError) {
               callbacks.current.onError(err.message)
            } else {
               callbacks.current.onError('An unexpected error occurred during Google authentication. Please try again.')
            }
          } finally {
            if (callbacks.current.onAuthEnd) callbacks.current.onAuthEnd()
          }
        },
      })

      if (containerRef.current) {
         google.accounts.id.renderButton(containerRef.current, {
           type: 'standard',
           theme: 'outline',
           size: 'large',
           text: 'continue_with',
           shape: 'rectangular',
         })
      }
    }

    if (window.google?.accounts?.id) {
      initGsi()
    } else {
      let script = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null
      if (!script) {
        script = document.createElement('script')
        script.id = SCRIPT_ID
        script.src = 'https://accounts.google.com/gsi/client'
        script.async = true
        script.defer = true
        document.body.appendChild(script)
      }
      script.addEventListener('load', initGsi)
      script.addEventListener('error', () => {
        callbacks.current.onError('Failed to load Google Identity Services.')
      })
      return () => script?.removeEventListener('load', initGsi)
    }
  }, [])

  if (!import.meta.env.VITE_GOOGLE_CLIENT_ID) {
    return (
      <button
        className="auth-provider-button"
        type="button"
        disabled={disabled}
        onClick={() => callbacks.current.onError('Google authentication is not configured yet. (Missing VITE_GOOGLE_CLIENT_ID)')}
      >
        <GoogleLogo />
        Continue with Google
      </button>
    )
  }

  return (
    <div 
      className="google-btn-wrapper auth-provider-button"
      style={{ 
        opacity: disabled ? 0.58 : 1, 
        pointerEvents: disabled ? 'none' : 'auto', 
        padding: 0,
        overflow: 'hidden',
        border: 'none',
        display: 'flex',
        justifyContent: 'center',
        background: 'transparent'
      }}
    >
      <div ref={containerRef} />
    </div>
  )
}
