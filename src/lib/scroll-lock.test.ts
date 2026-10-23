import { beforeEach, describe, expect, it } from 'vitest'
import {
  lockScroll,
  forceUnlockScroll,
  getActiveScrollLocks,
} from './scrollLock'

describe('Storefront Scroll Lifecycle & Reference Counting', () => {
  let mockBody: {
    style: { overflow: string }
    classList: {
      add: (cls: string) => void
      remove: (cls: string) => void
      contains: (cls: string) => boolean
    }
  }

  let mockContainer: {
    id: string
    style: { overflow: string; overflowY: string; overflowX: string }
    classList: {
      add: (cls: string) => void
      remove: (cls: string) => void
      contains: (cls: string) => boolean
    }
  } | null

  beforeEach(() => {
    forceUnlockScroll()

    const bodyClasses = new Set<string>()
    mockBody = {
      style: { overflow: '' },
      classList: {
        add: (cls: string) => bodyClasses.add(cls),
        remove: (cls: string) => bodyClasses.delete(cls),
        contains: (cls: string) => bodyClasses.has(cls),
      },
    }

    const containerClasses = new Set<string>()
    mockContainer = {
      id: 'storefront-scroll-container',
      style: { overflow: '', overflowY: 'auto', overflowX: 'hidden' },
      classList: {
        add: (cls: string) => containerClasses.add(cls),
        remove: (cls: string) => containerClasses.delete(cls),
        contains: (cls: string) => containerClasses.has(cls),
      },
    }

    globalThis.document = {
      body: mockBody,
      getElementById: (id: string) => (id === 'storefront-scroll-container' ? mockContainer : null),
    } as any
  })

  it('starts with 0 active scroll locks and unlocked base state', () => {
    expect(getActiveScrollLocks()).toBe(0)
    expect(mockBody.classList.contains('storefront-scroll-locked')).toBe(false)
    expect(mockContainer?.classList.contains('storefront-scroll-locked')).toBe(false)
    expect(mockContainer?.style.overflowY).toBe('auto')
  })

  it('locks scrolling when an overlay opens and restores when released', () => {
    const unlock = lockScroll()
    expect(getActiveScrollLocks()).toBe(1)
    expect(mockBody.style.overflow).toBe('hidden')
    expect(mockBody.classList.contains('storefront-scroll-locked')).toBe(true)
    expect(mockContainer?.style.overflowY).toBe('hidden')
    expect(mockContainer?.classList.contains('storefront-scroll-locked')).toBe(true)

    unlock()
    expect(getActiveScrollLocks()).toBe(0)
    expect(mockBody.style.overflow).toBe('')
    expect(mockBody.classList.contains('storefront-scroll-locked')).toBe(false)
    expect(mockContainer?.style.overflowY).toBe('auto')
    expect(mockContainer?.style.overflowX).toBe('hidden')
    expect(mockContainer?.classList.contains('storefront-scroll-locked')).toBe(false)
  })

  it('maintains lock across overlay-to-overlay transitions via reference counting', () => {
    // Drawer 1 (e.g. StoreMenu) opens
    const unlockMenu = lockScroll()
    expect(getActiveScrollLocks()).toBe(1)
    expect(mockContainer?.style.overflowY).toBe('hidden')

    // Drawer 2 (e.g. SearchOverlay) opens before or during transition
    const unlockSearch = lockScroll()
    expect(getActiveScrollLocks()).toBe(2)
    expect(mockContainer?.style.overflowY).toBe('hidden')

    // Drawer 1 closes
    unlockMenu()
    expect(getActiveScrollLocks()).toBe(1)
    // Container MUST STILL be locked because Drawer 2 is open!
    expect(mockContainer?.style.overflowY).toBe('hidden')
    expect(mockContainer?.classList.contains('storefront-scroll-locked')).toBe(true)

    // Drawer 2 finally closes
    unlockSearch()
    expect(getActiveScrollLocks()).toBe(0)
    expect(mockContainer?.style.overflowY).toBe('auto')
    expect(mockContainer?.classList.contains('storefront-scroll-locked')).toBe(false)
  })

  it('is idempotent on duplicate release calls', () => {
    const unlock = lockScroll()
    expect(getActiveScrollLocks()).toBe(1)

    unlock()
    expect(getActiveScrollLocks()).toBe(0)

    // Extra call should not decrement into negative numbers
    unlock()
    expect(getActiveScrollLocks()).toBe(0)
  })

  it('forceUnlockScroll resets all locks and cleans DOM state', () => {
    lockScroll()
    lockScroll()
    expect(getActiveScrollLocks()).toBe(2)

    forceUnlockScroll()
    expect(getActiveScrollLocks()).toBe(0)
    expect(mockBody.style.overflow).toBe('')
    expect(mockContainer?.style.overflowY).toBe('auto')
  })

  it('handles standalone mode gracefully when storefront-scroll-container is absent', () => {
    mockContainer = null
    const unlock = lockScroll()
    expect(getActiveScrollLocks()).toBe(1)
    expect(mockBody.style.overflow).toBe('hidden')

    unlock()
    expect(getActiveScrollLocks()).toBe(0)
    expect(mockBody.style.overflow).toBe('')
  })
})
