import { useEffect, useRef, useState } from 'react'
import { authenticateWithMicrosoft, ApiError } from '../lib/api'
import { useAuth } from './AuthContext'

interface MicrosoftAuthButtonProps {
  onAuthSuccess?: () => void
  onError: (message: string) => void
  onAuthStart?: () => void
  onAuthEnd?: () => void
  disabled?: boolean
}

const MSAL_SCRIPT_ID = 'msal-browser-script'
const MSAL_CDN_URL = 'https://alcdn.msauth.net/browser/2.38.3/js/msal-browser.min.js'

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

declare global {
  interface Window {
    msal?: {
      PublicClientApplication: new (config: any) => {
        initialize: () => Promise<void>
        loginPopup: (request?: any) => Promise<{ idToken: string }>
      }
    }
  }
}

export function MicrosoftAuthButton({
  onAuthSuccess,
  onError,
  onAuthStart,
  onAuthEnd,
  disabled = false,
}: MicrosoftAuthButtonProps) {
  const { setSession } = useAuth()
  const [msalInstance, setMsalInstance] = useState<any>(null)
  const [isInitializing, setIsInitializing] = useState(false)

  const callbacks = useRef({ onAuthSuccess, onError, onAuthStart, onAuthEnd, setSession })
  useEffect(() => {
    callbacks.current = { onAuthSuccess, onError, onAuthStart, onAuthEnd, setSession }
  }, [onAuthSuccess, onError, onAuthStart, onAuthEnd, setSession])

  useEffect(() => {
    const clientId = import.meta.env.VITE_MICROSOFT_CLIENT_ID
    if (!clientId) return

    let isMounted = true

    const initMsal = async () => {
      if (!window.msal?.PublicClientApplication) return
      try {
        setIsInitializing(true)
        const pca = new window.msal.PublicClientApplication({
          auth: {
            clientId,
            authority: 'https://login.microsoftonline.com/common',
            redirectUri: window.location.origin,
          },
          cache: {
            cacheLocation: 'sessionStorage',
            storeAuthStateInCookie: false,
          },
        })

        if (typeof pca.initialize === 'function') {
          await pca.initialize()
        }

        if (isMounted) {
          setMsalInstance(pca)
        }
      } catch (err: unknown) {
        if (isMounted) {
          const msg = err instanceof Error ? err.message : 'Failed to initialize Microsoft Authentication.'
          callbacks.current.onError(msg)
        }
      } finally {
        if (isMounted) {
          setIsInitializing(false)
        }
      }
    }

    if (window.msal?.PublicClientApplication) {
      initMsal()
    } else {
      let script = document.getElementById(MSAL_SCRIPT_ID) as HTMLScriptElement | null
      if (!script) {
        script = document.createElement('script')
        script.id = MSAL_SCRIPT_ID
        script.src = MSAL_CDN_URL
        script.async = true
        script.defer = true
        document.body.appendChild(script)
      }

      const handleLoad = () => {
        initMsal()
      }
      const handleError = () => {
        if (isMounted) {
          callbacks.current.onError('Failed to load Microsoft Authentication Services.')
        }
      }

      script.addEventListener('load', handleLoad)
      script.addEventListener('error', handleError)

      return () => {
        isMounted = false
        script?.removeEventListener('load', handleLoad)
        script?.removeEventListener('error', handleError)
      }
    }
  }, [])

  const handleMicrosoftLogin = async () => {
    const clientId = import.meta.env.VITE_MICROSOFT_CLIENT_ID
    if (!clientId) {
      callbacks.current.onError('Microsoft authentication is not configured yet. (Missing VITE_MICROSOFT_CLIENT_ID)')
      return
    }

    if (!msalInstance) {
      callbacks.current.onError('Microsoft authentication services are still loading. Please try again.')
      return
    }

    if (callbacks.current.onAuthStart) {
      callbacks.current.onAuthStart()
    }

    try {
      const loginResponse = await msalInstance.loginPopup({
        scopes: ['openid', 'profile', 'email'],
        prompt: 'select_account',
      })

      if (!loginResponse?.idToken) {
        callbacks.current.onError('Microsoft authentication returned no ID token.')
        return
      }

      const authResponse = await authenticateWithMicrosoft(loginResponse.idToken)
      callbacks.current.setSession(authResponse)

      if (callbacks.current.onAuthSuccess) {
        callbacks.current.onAuthSuccess()
      }
    } catch (err: unknown) {
      if (err instanceof ApiError) {
        callbacks.current.onError(err.message)
      } else {
        const errorMsg = err instanceof Error ? err.message : 'Microsoft authentication failed or was cancelled.'
        callbacks.current.onError(errorMsg)
      }
    } finally {
      if (callbacks.current.onAuthEnd) {
        callbacks.current.onAuthEnd()
      }
    }
  }

  return (
    <button
      className="auth-provider-button"
      type="button"
      disabled={disabled || isInitializing}
      onClick={handleMicrosoftLogin}
    >
      <MicrosoftLogo />
      Continue with Microsoft
    </button>
  )
}
