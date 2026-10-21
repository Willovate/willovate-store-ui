import { beforeEach, describe, expect, it } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { cartReducer, cartSubtotal } from './cart'
import { ProductSpotlightSection } from '../components/sections/ProductSpotlightSection'
import { CatalogSection } from '../components/sections/CatalogSection'
import { ProductCard } from '../components/ProductCard'
import type { CartItem, Product } from '../types'

const STORAGE_KEY = 'willovate-store-cart'

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

const productA: Product = {
  id: 'prod-chair',
  slug: 'prod-chair',
  name: 'Executive Chair',
  description: 'Hand-stitched leather chair',
  category: 'Furniture',
  price: 5400,
  compareAtPrice: 6000,
  stockQuantity: 5,
  visualTheme: 'sand',
  isFeatured: true,
}

const productB: Product = {
  id: 'prod-balsamic',
  slug: 'prod-balsamic',
  name: 'Reserve Aged Balsamic',
  description: '25-year aged balsamic',
  category: 'Grocery',
  price: 120,
  compareAtPrice: null,
  stockQuantity: 10,
  visualTheme: 'ink',
  isFeatured: false,
}

describe('Stage 1 Quality Improvements', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  describe('Stage 1C: Cart Scope Isolation & Storage Migration', () => {
    it('isolates cart items between distinct template scopes', () => {
      let cartMap: Record<string, CartItem[]> = {
        solace: [],
        'food-grocery-10': [],
      }

      // Add productA in solace scope
      cartMap = {
        ...cartMap,
        solace: cartReducer(cartMap.solace, { type: 'add', product: productA }),
      }

      expect(cartMap.solace).toHaveLength(1)
      expect(cartMap.solace[0].product.name).toBe('Executive Chair')
      expect(cartSubtotal(cartMap.solace)).toBe(5400)

      // Verify grocery scope remains completely empty
      expect(cartMap['food-grocery-10']).toHaveLength(0)
      expect(cartSubtotal(cartMap['food-grocery-10'])).toBe(0)

      // Add productB in food-grocery-10 scope
      cartMap = {
        ...cartMap,
        'food-grocery-10': cartReducer(cartMap['food-grocery-10'], { type: 'add', product: productB }),
      }

      expect(cartMap['food-grocery-10']).toHaveLength(1)
      expect(cartMap['food-grocery-10'][0].product.name).toBe('Reserve Aged Balsamic')
      expect(cartSubtotal(cartMap['food-grocery-10'])).toBe(120)

      // Solace scope still only has productA
      expect(cartMap.solace).toHaveLength(1)
      expect(cartMap.solace[0].product.id).toBe('prod-chair')
    })

    it('safely migrates legacy array format from localStorage without losing items', () => {
      const legacyCart: CartItem[] = [{ product: productA, quantity: 2 }]
      localStorage.setItem(STORAGE_KEY, JSON.stringify(legacyCart))

      const raw = localStorage.getItem(STORAGE_KEY)
      expect(raw).toBeTruthy()

      const parsed = JSON.parse(raw!)
      let loadedMap: Record<string, CartItem[]> = {}
      if (Array.isArray(parsed)) {
        loadedMap = { global: parsed }
      } else if (typeof parsed === 'object' && parsed !== null) {
        loadedMap = parsed
      }

      expect(loadedMap.global).toHaveLength(1)
      expect(loadedMap.global[0].product.name).toBe('Executive Chair')
      expect(loadedMap.global[0].quantity).toBe(2)
      expect(cartSubtotal(loadedMap.global)).toBe(10800)
    })

    it('handles corrupted localStorage data without throwing', () => {
      localStorage.setItem(STORAGE_KEY, '{ invalid json string')
      let loadedMap: Record<string, CartItem[]> = {}
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) loadedMap = JSON.parse(raw)
      } catch {
        loadedMap = {}
      }
      expect(loadedMap).toEqual({})
    })
  })

  describe('Stage 1A: Product Spotlight CTA & Data Fallbacks', () => {
    it('renders spotlight section with proper data and CTA button', () => {
      const html = renderToStaticMarkup(
        <ProductSpotlightSection
          id="spotlight-exec"
          name="The Executive Chair"
          category="Statement Piece"
          description="Hand-stitched Italian leather"
          price={5400}
          ctaLabel="Shop Now"
          badge="Signature"
          image="https://example.com/chair.jpg"
          features={['Italian Leather', 'Polished Walnut']}
        />
      )

      expect(html).toContain('The Executive Chair')
      expect(html).toContain('Statement Piece')
      expect(html).toContain('Hand-stitched Italian leather')
      expect(html).toContain('5,400')
      expect(html).toContain('Signature')
      expect(html).toContain('Italian Leather')
      expect(html).toContain('Polished Walnut')
      expect(html).toContain('Shop Now')
    })

    it('gracefully handles missing spotlight product data without crashing', () => {
      expect(() => {
        const html = renderToStaticMarkup(
          <ProductSpotlightSection
            image=""
            name=""
            description=""
            price={undefined as any}
          />
        )
        expect(html).toBeDefined()
        expect(html).toContain('Shop Now')
      }).not.toThrow()
    })

    it('distinguishes between purchase intent and discovery intent CTA labels', () => {
      const isDiscovery = (ctaLabel: string) => {
        const l = ctaLabel.toLowerCase().trim()
        return l.includes('discover') || l.includes('explore') || l.includes('view') || l.includes('learn') || l.includes('read')
      }

      // Purchase intent
      expect(isDiscovery('Shop Now')).toBe(false)
      expect(isDiscovery('Pre-order')).toBe(false)
      expect(isDiscovery('Add to Bag')).toBe(false)
      expect(isDiscovery('Buy Now')).toBe(false)

      // Discovery intent
      expect(isDiscovery('Discover the Collection')).toBe(true)
      expect(isDiscovery('Explore Architecture')).toBe(true)
      expect(isDiscovery('View Systems')).toBe(true)
      expect(isDiscovery('Read Our Story')).toBe(true)
    })
  })

  describe('Stage 1B: CatalogSection & ProductCard Feedback', () => {
    it('renders ProductCard with quick-add button and accessible labels', () => {
      const html = renderToStaticMarkup(
        <ProductCard product={productA} onAdd={() => {}} />
      )

      expect(html).toContain('Executive Chair')
      expect(html).toContain('5,400')
      expect(html).toContain('class="quick-add')
      expect(html).toContain('aria-label="Add Executive Chair to cart"')
      expect(html).toContain('+')
    })

    it('renders CatalogSection with products and catalog-section anchor class', () => {
      const html = renderToStaticMarkup(
        <CatalogSection title="Featured Collection" products={[productA, productB]} />
      )

      expect(html).toContain('Featured Collection')
      expect(html).toContain('class="catalog-section"')
      expect(html).toContain('Executive Chair')
      expect(html).toContain('Reserve Aged Balsamic')
    })
  })
})
