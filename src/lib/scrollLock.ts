/**
 * Shared scroll lock manager for storefront overlays and drawers.
 *
 * Uses reference counting so multiple overlays (or transitioning overlays,
 * e.g. StoreMenu -> SearchOverlay) cleanly lock and unlock scrolling
 * without race conditions or wiping base styles.
 */

let activeLocks = 0

export function lockScroll(): () => void {
  activeLocks++
  if (activeLocks === 1) {
    if (typeof document !== 'undefined') {
      document.body.classList.add('storefront-scroll-locked')
      document.body.style.overflow = 'hidden'
      const sc = document.getElementById('storefront-scroll-container')
      if (sc) {
        sc.classList.add('storefront-scroll-locked')
        sc.style.overflowY = 'hidden'
      }
    }
  }

  let released = false
  return () => {
    if (released) return
    released = true
    activeLocks = Math.max(0, activeLocks - 1)
    if (activeLocks === 0) {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('storefront-scroll-locked')
        document.body.style.overflow = ''
        const sc = document.getElementById('storefront-scroll-container')
        if (sc) {
          sc.classList.remove('storefront-scroll-locked')
          sc.style.overflowY = 'auto'
          sc.style.overflowX = 'hidden'
        }
      }
    }
  }
}

export function forceUnlockScroll(): void {
  activeLocks = 0
  if (typeof document !== 'undefined') {
    document.body.classList.remove('storefront-scroll-locked')
    document.body.style.overflow = ''
    const sc = document.getElementById('storefront-scroll-container')
    if (sc) {
      sc.classList.remove('storefront-scroll-locked')
      sc.style.overflowY = 'auto'
      sc.style.overflowX = 'hidden'
    }
  }
}

export function getActiveScrollLocks(): number {
  return activeLocks
}
