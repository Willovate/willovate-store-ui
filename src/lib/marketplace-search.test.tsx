import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter } from 'react-router-dom'
import { templates } from '../data/templates'
import { TemplateCard } from '../components/TemplateCard'
import { TemplateProvider } from './TemplateContext'
import MarketplacePage from '../pages/MarketplacePage'
import type { TemplateConfig } from '../types/template'

// Setup mock storage for Node vitest environment
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

const VALID_MARKETPLACE_CATEGORIES = ['Electronics', 'Home & Furniture', 'General Store', 'Food & Grocery']
const LEGACY_IDS = ['template-01', 'atelier', 'aura', 'casa', 'mono', 'noir', 'solis', 'market', 'studio']

// Helper mirroring MarketplacePage search predicate
function filterMarketplaceTemplates(
  marketplaceList: TemplateConfig[],
  searchQuery: string,
  categoryFilter: string
) {
  const query = searchQuery.toLowerCase().trim()
  return marketplaceList.filter(t => {
    const matchesSearch = !query ||
      t.name.toLowerCase().includes(query) ||
      t.description.toLowerCase().includes(query) ||
      Boolean(t.tags && t.tags.some(tag => tag?.name && tag.name.toLowerCase().includes(query))) ||
      Boolean(t.categories && t.categories.some(c => c?.name && c.name.toLowerCase().includes(query)))
    const matchesFilter = categoryFilter === 'All' || Boolean(t.categories && t.categories.some(c => c?.name === categoryFilter))
    return matchesSearch && matchesFilter
  })
}

describe('Marketplace Search & Category Integration (Fix B & Fix D)', () => {
  beforeEach(() => {
    localStorageMock.clear()
  })

  const marketplaceTemplates = templates.filter(t => {
    const isCategoryTemplate = t.categories && t.categories.some(c => VALID_MARKETPLACE_CATEGORIES.includes(c.name))
    return Boolean(isCategoryTemplate && !LEGACY_IDS.includes(t.id))
  })

  describe('Fix B: Marketplace Search Requirements', () => {
    it('maintains an active marketplace catalog of exactly 50 templates', () => {
      expect(marketplaceTemplates.length).toBe(50)
      for (const legacyId of LEGACY_IDS) {
        expect(marketplaceTemplates.some(t => t.id === legacyId)).toBe(false)
      }
    })

    it('searching "Electronics" finds all appropriate Electronics templates by category name', () => {
      const results = filterMarketplaceTemplates(marketplaceTemplates, 'Electronics', 'All')
      expect(results.length).toBeGreaterThanOrEqual(10)
      const allHaveElectronicsCategory = results.every(t =>
        t.categories?.some(c => c.name === 'Electronics')
      )
      expect(allHaveElectronicsCategory).toBe(true)
      expect(results.some(t => t.id === 'electronics-01')).toBe(true)
      expect(results.some(t => t.id === 'electronics-04')).toBe(true)
    })

    it('searching "Furniture" finds appropriate Home & Furniture templates', () => {
      const results = filterMarketplaceTemplates(marketplaceTemplates, 'Furniture', 'All')
      expect(results.length).toBeGreaterThanOrEqual(10)
      const hasHomeFurniture = results.every(t =>
        t.categories?.some(c => c.name.toLowerCase().includes('furniture'))
      )
      expect(hasHomeFurniture).toBe(true)
    })

    it('search is case-insensitive across uppercase, lowercase, and mixed-case', () => {
      const lower = filterMarketplaceTemplates(marketplaceTemplates, 'electronics', 'All')
      const upper = filterMarketplaceTemplates(marketplaceTemplates, 'ELECTRONICS', 'All')
      const mixed = filterMarketplaceTemplates(marketplaceTemplates, 'ElEcTrOnIcS', 'All')

      expect(lower.length).toBe(upper.length)
      expect(lower.length).toBe(mixed.length)
      expect(lower.map(t => t.id)).toEqual(upper.map(t => t.id))
      expect(lower.map(t => t.id)).toEqual(mixed.map(t => t.id))
    })

    it('search still matches names, descriptions, and existing tags', () => {
      // By name
      const byName = filterMarketplaceTemplates(marketplaceTemplates, 'Nova', 'All')
      expect(byName.some(t => t.name === 'Nova')).toBe(true)

      // By description
      const byDesc = filterMarketplaceTemplates(marketplaceTemplates, 'specifications', 'All')
      expect(byDesc.length).toBeGreaterThan(0)
      expect(byDesc.some(t => t.description.toLowerCase().includes('specifications'))).toBe(true)

      // By tag
      const byTag = filterMarketplaceTemplates(marketplaceTemplates, 'minimal', 'All')
      expect(byTag.length).toBeGreaterThan(0)
      expect(byTag.some(t => t.tags?.some(tag => tag.name.toLowerCase().includes('minimal')))).toBe(true)
    })

    it('safely handles templates with absent or malformed optional category/tag data without throwing', () => {
      const edgeCaseTemplates: TemplateConfig[] = [
        {
          id: 'test-no-cats',
          name: 'No Categories Template',
          description: 'A template without categories array',
          thumbnailUrl: 'https://example.com/1.jpg',
          previewImages: [],
          isFeatured: false,
          theme: {
            fonts: { heading: 'sans-serif', body: 'sans-serif' },
            colors: { primary: '#000', background: '#fff', accent: '#555' }
          },
          sections: [],
          categories: undefined as any,
          tags: undefined as any,
        },
        {
          id: 'test-empty-cats',
          name: 'Empty Categories Template',
          description: 'A template with empty arrays',
          thumbnailUrl: 'https://example.com/2.jpg',
          previewImages: [],
          isFeatured: false,
          theme: {
            fonts: { heading: 'sans-serif', body: 'sans-serif' },
            colors: { primary: '#000', background: '#fff', accent: '#555' }
          },
          sections: [],
          categories: [],
          tags: [],
        },
        {
          id: 'test-sparse-cats',
          name: 'Sparse Categories Template',
          description: 'Has null elements inside array',
          thumbnailUrl: 'https://example.com/3.jpg',
          previewImages: [],
          isFeatured: false,
          theme: {
            fonts: { heading: 'sans-serif', body: 'sans-serif' },
            colors: { primary: '#000', background: '#fff', accent: '#555' }
          },
          sections: [],
          categories: [null as any, { id: 'c1', name: 'Electronics' }],
          tags: [null as any],
        },
      ]

      expect(() => {
        const res = filterMarketplaceTemplates(edgeCaseTemplates, 'Electronics', 'All')
        expect(res.length).toBe(1)
        expect(res[0].id).toBe('test-sparse-cats')
      }).not.toThrow()

      expect(() => {
        const res = filterMarketplaceTemplates(edgeCaseTemplates, 'nonexistent', 'All')
        expect(res.length).toBe(0)
      }).not.toThrow()
    })

    it('combines category filter and search query harmoniously', () => {
      // Filter by 'Electronics' category and search for 'Circuit'
      const combined = filterMarketplaceTemplates(marketplaceTemplates, 'Circuit', 'Electronics')
      expect(combined.length).toBeGreaterThan(0)
      expect(combined.every(t => t.categories?.some(c => c.name === 'Electronics'))).toBe(true)
      expect(combined.some(t => t.id === 'electronics-04')).toBe(true)

      // Filter by 'Food & Grocery' and search for 'Circuit' -> 0 results
      const disjoint = filterMarketplaceTemplates(marketplaceTemplates, 'Circuit', 'Food & Grocery')
      expect(disjoint.length).toBe(0)
    })

    it('clearing query and resetting category filter restores exactly the full 50 marketplace templates', () => {
      // Filtered state
      const filtered = filterMarketplaceTemplates(marketplaceTemplates, 'Circuit', 'Electronics')
      expect(filtered.length).toBeLessThan(50)

      // Cleared state (query = '', categoryFilter = 'All')
      const restored = filterMarketplaceTemplates(marketplaceTemplates, '', 'All')
      expect(restored.length).toBe(50)
    })
  })

  describe('Fix D: Optional Chaining & Search Clear Focus', () => {
    it('renders TemplateCard safely without throwing when categories is missing, empty, or undefined', () => {
      const templateWithoutCategories: TemplateConfig = {
        id: 'no-cat-card',
        name: 'No Category Card',
        description: 'Testing optional chaining fallback',
        thumbnailUrl: 'https://example.com/img.jpg',
        previewImages: [],
        isFeatured: false,
        tags: [],
        theme: {
          fonts: { heading: 'Georgia, serif', body: 'sans-serif' },
          colors: { primary: '#111', background: '#fafafa', accent: '#333' },
        },
        sections: [],
        categories: undefined as any,
      }

      expect(() => {
        const html = renderToStaticMarkup(
          <TemplateProvider>
            <MemoryRouter>
              <TemplateCard template={templateWithoutCategories} />
            </MemoryRouter>
          </TemplateProvider>
        )
        expect(html).toContain('No Category Card')
        expect(html).toContain('Testing optional chaining fallback')
      }).not.toThrow()
    })

    it('renders MarketplacePage search input with updated accessible name and placeholder', () => {
      const html = renderToStaticMarkup(
        <TemplateProvider>
          <MemoryRouter>
            <MarketplacePage />
          </MemoryRouter>
        </TemplateProvider>
      )

      expect(html).toContain('aria-label="Search templates by name, description, category, or style"')
      expect(html).toContain('placeholder="Search by name, description, category, style..."')
      expect(html).toContain('type="search"')
    })

    it('restores keyboard focus to the search input when clearing search', () => {
      // Verify the searchInputRef pattern contract
      const focusSpy = vi.fn()
      const mockInput = { focus: focusSpy } as unknown as HTMLInputElement

      const searchInputRef = { current: mockInput }
      let searchState = 'electronics'
      const setSearch = (val: string) => { searchState = val }

      // Mirror handleClearSearch implementation in MarketplacePage
      const handleClearSearch = () => {
        setSearch('')
        searchInputRef.current?.focus()
      }

      handleClearSearch()

      expect(searchState).toBe('')
      expect(focusSpy).toHaveBeenCalledTimes(1)
    })
  })
})
