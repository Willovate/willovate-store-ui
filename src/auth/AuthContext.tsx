import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from 'react'
import type { AuthResponse, Customer } from '../types'
import { authStorage } from './authStorage'

interface AuthContextValue {
  customer: Customer | null
  accessToken: string | null
  isAuthenticated: boolean
  setSession: (response: AuthResponse) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSessionState] = useState(() => authStorage.get())

  const setSession = (response: AuthResponse) => {
    authStorage.set(response)
    setSessionState({
      accessToken: response.accessToken,
      customer: response.customer,
    })
  }

  const logout = () => {
    authStorage.clear()
    setSessionState(null)
  }

  const value: AuthContextValue = {
    customer: session?.customer ?? null,
    accessToken: session?.accessToken ?? null,
    isAuthenticated: Boolean(session?.accessToken),
    setSession,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
