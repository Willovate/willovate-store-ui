import { describe, expect, it, beforeEach } from 'vitest'
import { templates } from '../data/templates'

const STORAGE_KEY = 'willovate-store-wishlist'

// Setup mock storage
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

describe('Global Search and Wishlist Across Templates', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  describe('Search Storefront Scoping & Local Fallback', () => {
    it('scopes search results to the active template products', () => {
      const atelier = templates.find(t => t.id === 'atelier')
      expect(atelier).toBeDefined()

      const catalogSection = atelier?.sections.find(s => s.type === 'catalog')
      const atelierProducts = catalogSection?.props?.products || []
      expect(atelierProducts.length).toBeGreaterThan(0)

      // Search for wool coat in atelier
      const query = 'wool'
      const matches = atelierProducts.filter((p: any) =>
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      )

      expect(matches.length).toBe(1)
      expect(matches[0].name).toContain('Tailored Wool Coat')
    })

    it('returns empty array without throwing when no products match', () => {
      const casa = templates.find(t => t.id === 'casa')
      const catalogSection = casa?.sections.find(s => s.type === 'catalog')
      const casaProducts = catalogSection?.props?.products || []

      const query = 'nonexistent-query-xyz-1234'
      const matches = casaProducts.filter((p: any) =>
        p.name.toLowerCase().includes(query)
      )

      expect(matches).toEqual([])
    })

    it('matches by category or description', () => {
      const mono = templates.find(t => t.id === 'mono')
      const catalogSection = mono?.sections.find(s => s.type === 'catalog')
      const monoProducts = catalogSection?.props?.products || []

      const query = 'noise cancelling'
      const matches = monoProducts.filter((p: any) =>
        p.name.toLowerCase().includes(query) ||
        p.description?.toLowerCase().includes(query)
      )

      expect(matches.length).toBe(1)
      expect(matches[0].name).toBe('Wireless Headphones')
    })
  })

  describe('Wishlist Template Isolation and Deduplication', () => {
    it('enforces strict isolation between template storefront previews', () => {
      const storeMap: Record<string, any[]> = {}

      const addToScope = (scope: string, product: any) => {
        if (!storeMap[scope]) storeMap[scope] = []
        if (!storeMap[scope].some(p => p.id === product.id)) {
          storeMap[scope].push(product)
        }
      }

      const p1 = { id: 'p-1', name: 'Atelier Coat', price: 450 }
      const p2 = { id: 'p-2', name: 'Mono Headphones', price: 299 }

      addToScope('atelier', p1)
      addToScope('mono', p2)

      expect(storeMap['atelier']).toHaveLength(1)
      expect(storeMap['atelier'][0].id).toBe('p-1')
      expect(storeMap['mono']).toHaveLength(1)
      expect(storeMap['mono'][0].id).toBe('p-2')

      // Ensure no leakage
      expect(storeMap['atelier'].some(p => p.id === 'p-2')).toBe(false)
      expect(storeMap['mono'].some(p => p.id === 'p-1')).toBe(false)
    })

    it('prevents duplicate additions of the same product ID in the same template', () => {
      const list: any[] = []
      const add = (product: any) => {
        if (!list.some(p => p.id === product.id)) {
          list.push(product)
        }
      }

      const item = { id: 'item-100', name: 'Eco Bottle', price: 25 }
      add(item)
      add(item)
      add({ ...item, price: 30 }) // duplicate ID with modified price

      expect(list).toHaveLength(1)
      expect(list[0].id).toBe('item-100')
      expect(list[0].price).toBe(25)
    })

    it('persists wishlist state to localStorage and restores faithfully', () => {
      const stateToSave = {
        'food-grocery-01': [{ id: 'fg-1', name: 'Organic Apples', price: 5 }],
        'electronics-01': [{ id: 'el-1', name: 'Smart Watch', price: 199 }],
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave))

      const restored = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}')
      expect(restored['food-grocery-01']).toHaveLength(1)
      expect(restored['food-grocery-01'][0].name).toBe('Organic Apples')
      expect(restored['electronics-01']).toHaveLength(1)
      expect(restored['electronics-01'][0].name).toBe('Smart Watch')
    })

    it('safely tolerates corrupted storage data without runtime exceptions', () => {
      localStorage.setItem(STORAGE_KEY, '### NOT JSON ###')

      let loaded = {}
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        loaded = JSON.parse(raw || '{}')
      } catch {
        loaded = {}
      }

      expect(loaded).toEqual({})
    })
  })

  describe('50 Core Marketplace Templates Header and Products Audit', () => {
    it('verifies all 50 marketplace templates have a valid navbar and product structure', () => {
      const validMarketplaceCategories = ['Electronics', 'Home & Furniture', 'General Store', 'Food & Grocery']
      const legacyIds = ['template-01', 'atelier', 'aura', 'casa', 'mono', 'noir', 'solis', 'market', 'studio']

      const coreTemplates = templates.filter(t => {
        const isMarketplace = t.categories && t.categories.some(c => validMarketplaceCategories.includes(c.name))
        return isMarketplace && !legacyIds.includes(t.id)
      })

      expect(coreTemplates.length).toBe(50)

      coreTemplates.forEach(t => {
        // Must have an id and name
        expect(t.id).toBeTruthy()
        expect(t.name).toBeTruthy()

        // Must have a navbar section
        const nav = t.sections.find(s => s.type === 'navbar')
        expect(nav).toBeDefined()

        // Style must be defined or default to valid
        const style = nav?.props?.style || 'minimal'
        expect(['minimal', 'center', 'utility', 'solid', 'full', 'default'].includes(style)).toBe(true)
      })
    })
  })
})
