import { useEffect, useState } from 'react'

/**
 * Reactive hook that returns the current window.location.hash string.
 * Updates automatically on hashchange and popstate events.
 * Zero dependencies — no router library needed.
 */
export function useHashRoute(): string {
  const [hash, setHash] = useState(() => window.location.hash || '')

  useEffect(() => {
    const sync = () => setHash(window.location.hash || '')
    window.addEventListener('hashchange', sync)
    window.addEventListener('popstate', sync)
    return () => {
      window.removeEventListener('hashchange', sync)
      window.removeEventListener('popstate', sync)
    }
  }, [])

  return hash
}

/** Programmatic navigation — sets the hash and triggers hashchange. */
export function navigateTo(hash: string): void {
  window.location.hash = hash
}
