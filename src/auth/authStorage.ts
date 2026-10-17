import type { AuthResponse, Customer } from '../types'

const AUTH_STORAGE_KEY = 'willovate_auth_session'

export interface StoredSession {
  accessToken: string
  customer: Customer
}

export const authStorage = {
  get(): StoredSession | null {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY)
      if (!raw) return null
      const parsed = JSON.parse(raw) as Partial<StoredSession>
      if (
        typeof parsed.accessToken === 'string' &&
        parsed.customer &&
        typeof parsed.customer.id === 'string' &&
        typeof parsed.customer.email === 'string'
      ) {
        return {
          accessToken: parsed.accessToken,
          customer: parsed.customer as Customer,
        }
      }
      return null
    } catch {
      return null
    }
  },

  set(response: AuthResponse): void {
    try {
      const session: StoredSession = {
        accessToken: response.accessToken,
        customer: response.customer,
      }
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session))
    } catch {
      // Ignore storage quota or disabled errors
    }
  },

  clear(): void {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY)
    } catch {
      // Ignore errors
    }
  },
}
