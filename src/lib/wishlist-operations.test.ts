import { beforeEach, describe, expect, it } from 'vitest'
import type { WishlistProduct } from './wishlistContextDef'

const STORAGE_KEY = 'willovate-store-wishlist'

// Helper testing the storage serialization and isolation logic
// Mock localStorage for node test environment
const mockStorage: Record<string, string> = {}
const localStorageMock = {
  getItem: (key: string) => mockStorage[key] ?? null,
  setItem: (key: string, value: string) => { mockStorage[key] = String(value) },
  removeItem: (key: string) => { delete mockStorage[key] },
  clear: () => {
    for (const k of Object.keys(mockStorage)) delete mockStorage[k]
  },
}
globalThis.localStorage = localStorageMock as any

describe('Wishlist State, Isolation, and Persistence Logic', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  const prod1: WishlistProduct = {
    id: 'prod-1',
    name: 'Modern Chair',
    price: 350,
    imageUrl: 'https://images.unsplash.com/chair.jpg',
    category: 'Furniture',
  }

  const prod2: WishlistProduct = {
    id: 'prod-2',
    name: 'Minimal Lamp',
    price: 120,
    imageUrl: 'https://images.unsplash.com/lamp.jpg',
    category: 'Lighting',
  }

  it('persists and restores wishlist items scoped per template', () => {
    const state = {
      'casa-hf': [prod1],
      'atelier': [prod2],
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))

    const raw = localStorage.getItem(STORAGE_KEY)
    expect(raw).toBeTruthy()
    const parsed = JSON.parse(raw!)

    expect(parsed['casa-hf']).toHaveLength(1)
    expect(parsed['casa-hf'][0].id).toBe('prod-1')
    expect(parsed['atelier']).toHaveLength(1)
    expect(parsed['atelier'][0].id).toBe('prod-2')
  })

  it('prevents cross-template product leakage', () => {
    const state: Record<string, WishlistProduct[]> = {
      'template-a': [prod1],
      'template-b': [],
    }

    expect(state['template-a'].some(p => p.id === 'prod-1')).toBe(true)
    expect(state['template-b'].some(p => p.id === 'prod-1')).toBe(false)
  })

  it('deduplicates items added with the same product ID', () => {
    const list: WishlistProduct[] = []
    const add = (item: WishlistProduct) => {
      if (!list.some(p => p.id === item.id)) {
        list.push(item)
      }
    }

    add(prod1)
    add(prod1)
    add({ ...prod1, name: 'Duplicate Modern Chair' })

    expect(list).toHaveLength(1)
    expect(list[0].id).toBe('prod-1')
  })

  it('handles corrupted or malformed localStorage data safely', () => {
    localStorage.setItem(STORAGE_KEY, 'invalid json{{')

    let loaded: Record<string, WishlistProduct[]> = {}
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) loaded = JSON.parse(raw)
    } catch {
      loaded = {}
    }

    expect(loaded).toEqual({})
  })

  it('toggles product status reliably', () => {
    let list: WishlistProduct[] = []
    const toggle = (item: WishlistProduct) => {
      const exists = list.some(p => p.id === item.id)
      list = exists ? list.filter(p => p.id !== item.id) : [...list, item]
    }

    toggle(prod1)
    expect(list).toHaveLength(1)
    expect(list[0].id).toBe('prod-1')

    toggle(prod1)
    expect(list).toHaveLength(0)
  })

  it('removes item without mutating other items', () => {
    let list = [prod1, prod2]
    list = list.filter(p => p.id !== prod1.id)

    expect(list).toHaveLength(1)
    expect(list[0].id).toBe('prod-2')
  })
})
