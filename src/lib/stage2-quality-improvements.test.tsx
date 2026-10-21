import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { handleHeroNavigation } from './heroNavigation'
import { HeroSection } from '../components/sections/HeroSection'
import { SplitHeroSection } from '../components/sections/SplitHeroSection'
import { FullWidthHeroSection } from '../components/sections/FullWidthHeroSection'
import { CategoryGridSection } from '../components/sections/CategoryGridSection'
import { CatalogSection } from '../components/sections/CatalogSection'
import { CategoryFilterContext } from './categoryFilterContextDef'
import type { Product } from '../types'

const testProducts: Product[] = [
  {
    id: 'prod-chair',
    slug: 'prod-chair',
    name: 'Executive Chair',
    description: 'Hand-stitched leather chair',
    category: 'Seating',
    price: 5400,
    compareAtPrice: 6000,
    stockQuantity: 5,
    visualTheme: 'sand',
    isFeatured: true,
  },
  {
    id: 'prod-table',
    slug: 'prod-table',
    name: 'Marble Dining Table',
    description: 'Carrara marble table',
    category: 'Tables',
    price: 8500,
    compareAtPrice: null,
    stockQuantity: 2,
    visualTheme: 'stone',
    isFeatured: false,
  },
  {
    id: 'prod-lamp',
    slug: 'prod-lamp',
    name: 'Minimalist Floor Lamp',
    description: 'Brass standing light',
    category: 'Lighting',
    price: 1200,
    compareAtPrice: null,
    stockQuantity: 8,
    visualTheme: 'ink',
    isFeatured: false,
  },
]

const mockDocument = {
  querySelector: vi.fn(),
  getElementById: vi.fn(),
}
globalThis.document = mockDocument as any
globalThis.window = {} as any

describe('Stage 2 Quality Improvements', () => {
  describe('Hero CTA Navigation Logic & Section Anchors', () => {
    beforeEach(() => {
      vi.restoreAllMocks()
      mockDocument.querySelector = vi.fn()
      mockDocument.getElementById = vi.fn()
    })

    it('routes shopping CTAs to catalog section and focuses heading', () => {
      const scrollIntoViewMock = vi.fn()
      const focusMock = vi.fn()

      const catalogSection = {
        scrollIntoView: scrollIntoViewMock,
        querySelector: vi.fn().mockReturnValue({
          focus: focusMock,
          hasAttribute: () => false,
          setAttribute: vi.fn(),
        }),
      }

      mockDocument.getElementById = vi.fn().mockImplementation((id: string) => {
        if (id === 'catalog') return catalogSection as any
        return null
      })
      mockDocument.querySelector = vi.fn().mockImplementation((selector: string) => {
        if (selector.includes('catalog')) return catalogSection as any
        return null
      })

      handleHeroNavigation('Shop the Collection')

      expect(mockDocument.getElementById).toHaveBeenCalledWith('catalog')
      expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' })
      expect(focusMock).toHaveBeenCalledWith({ preventScroll: true })
    })

    it('routes story and philosophy CTAs to story section', () => {
      const scrollIntoViewMock = vi.fn()
      const storySection = {
        scrollIntoView: scrollIntoViewMock,
        querySelector: vi.fn().mockReturnValue(null),
      }

      mockDocument.querySelector = vi.fn().mockImplementation((selector: string) => {
        if (selector.includes('story')) return storySection as any
        return null
      })

      handleHeroNavigation('Read Our Story')
      expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' })
    })

    it('routes explicit ctaLink anchors directly', () => {
      const scrollIntoViewMock = vi.fn()
      const customSection = {
        scrollIntoView: scrollIntoViewMock,
        querySelector: vi.fn().mockReturnValue(null),
      }

      mockDocument.querySelector = vi.fn().mockImplementation((selector: string) => {
        if (selector === '#custom-anchor') return customSection as any
        return null
      })

      handleHeroNavigation('Explore', '#custom-anchor')
      expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' })
    })

    it('renders HeroSection with accessible semantic button and custom ctaLabel', () => {
      const html = renderToStaticMarkup(
        <HeroSection title="Bold Design" subtitle="Curated interiors" ctaLabel="Explore Spaces" />
      )

      expect(html).toContain('Bold Design')
      expect(html).toContain('Curated interiors')
      expect(html).toContain('Explore Spaces')
      expect(html).toContain('type="button"')
    })

    it('renders SplitHeroSection with primary and secondary CTA buttons', () => {
      const html = renderToStaticMarkup(
        <SplitHeroSection
          title="The Art of Food"
          subtitle="Heritage ingredients"
          ctaLabel="Explore the Collection"
          secondaryCtaLabel="Discover Our Story"
          image="https://example.com/food.jpg"
        />
      )

      expect(html).toContain('The Art of Food')
      expect(html).toContain('Explore the Collection')
      expect(html).toContain('Discover Our Story')
      expect(html).toContain('class="split-hero-section"')
    })

    it('renders FullWidthHeroSection with connected CTA button', () => {
      const html = renderToStaticMarkup(
        <FullWidthHeroSection
          title="Refined Living"
          subtitle="Minimalist homes"
          ctaLabel="Discover"
          image="https://example.com/hero.jpg"
        />
      )

      expect(html).toContain('Refined Living')
      expect(html).toContain('Discover')
      expect(html).toContain('type="button"')
      expect(html).toContain('class="full-width-hero-section"')
    })
  })

  describe('Category Grid Interaction & Catalog Filtering', () => {
    it('renders CategoryGridSection with semantic accessible category buttons', () => {
      const categories = [
        { name: 'Seating', image: 'https://example.com/seating.jpg' },
        { name: 'Tables', image: 'https://example.com/tables.jpg' },
      ]

      const html = renderToStaticMarkup(
        <CategoryGridSection title="Shop by Category" categories={categories} />
      )

      expect(html).toContain('Shop by Category')
      expect(html).toContain('Seating')
      expect(html).toContain('Tables')
      expect(html).toContain('category-tile-btn')
      expect(html).toContain('aria-label="Filter products by Seating category"')
      expect(html).toContain('aria-label="Filter products by Tables category"')
    })

    it('renders active indicator when a category is selected in CategoryGridSection', () => {
      const categories = [
        { name: 'Seating', image: 'https://example.com/seating.jpg' },
        { name: 'Tables', image: 'https://example.com/tables.jpg' },
      ]

      const html = renderToStaticMarkup(
        <CategoryFilterContext.Provider value={{ selectedCategory: 'Seating', setSelectedCategory: () => {} }}>
          <CategoryGridSection title="Collections" categories={categories} />
        </CategoryFilterContext.Provider>
      )

      expect(html).toContain('is-active')
      expect(html).toContain('Active')
      expect(html).toContain('aria-pressed="true"')
    })

    it('filters CatalogSection products when selectedCategory matches', () => {
      const html = renderToStaticMarkup(
        <CategoryFilterContext.Provider value={{ selectedCategory: 'Seating', setSelectedCategory: () => {} }}>
          <CatalogSection title="Catalog" products={testProducts} />
        </CategoryFilterContext.Provider>
      )

      // Only Executive Chair (Seating) should be rendered
      expect(html).toContain('Executive Chair')
      expect(html).not.toContain('Marble Dining Table')
      expect(html).not.toContain('Minimalist Floor Lamp')

      // Category filter badge rendered
      expect(html).toContain('Category: <strong>Seating</strong>')
      expect(html).toContain('aria-label="Clear Seating category filter"')
    })

    it('handles synonym / partial keyword category matching gracefully', () => {
      // Test matching "Table" against "Marble Dining Table" (category: Tables)
      const html = renderToStaticMarkup(
        <CategoryFilterContext.Provider value={{ selectedCategory: 'Tables', setSelectedCategory: () => {} }}>
          <CatalogSection title="Catalog" products={testProducts} />
        </CategoryFilterContext.Provider>
      )

      expect(html).toContain('Marble Dining Table')
      expect(html).not.toContain('Executive Chair')
      expect(html).not.toContain('Minimalist Floor Lamp')
    })

    it('matches electronics categories like Audio, Phones, and Watches correctly', () => {
      const electronicsProducts: Product[] = [
        { id: 'e1', name: 'Nova X Pro', description: 'Flagship Smartphone', price: 999 } as any,
        { id: 'e2', name: 'AeroBuds Pro', description: 'Active Noise Cancelling Earbuds', price: 249 } as any,
        { id: 'e3', name: 'Nova Watch Series 8', description: 'Advanced Health Tracking', price: 399 } as any,
      ]

      const audioHtml = renderToStaticMarkup(
        <CategoryFilterContext.Provider value={{ selectedCategory: 'Audio', setSelectedCategory: () => {} }}>
          <CatalogSection title="Electronics" products={electronicsProducts} />
        </CategoryFilterContext.Provider>
      )
      expect(audioHtml).toContain('AeroBuds Pro')
      expect(audioHtml).not.toContain('Nova X Pro')
      expect(audioHtml).not.toContain('Nova Watch Series 8')

      const phoneHtml = renderToStaticMarkup(
        <CategoryFilterContext.Provider value={{ selectedCategory: 'Phones', setSelectedCategory: () => {} }}>
          <CatalogSection title="Electronics" products={electronicsProducts} />
        </CategoryFilterContext.Provider>
      )
      expect(phoneHtml).toContain('Nova X Pro')
      expect(phoneHtml).not.toContain('AeroBuds Pro')
    })

    it('renders graceful empty state when no products match the selected category', () => {
      const html = renderToStaticMarkup(
        <CategoryFilterContext.Provider value={{ selectedCategory: 'Outdoor & Patio', setSelectedCategory: () => {} }}>
          <CatalogSection title="Catalog" products={testProducts} />
        </CategoryFilterContext.Provider>
      )

      expect(html).toContain('No products found in &quot;Outdoor &amp; Patio&quot;.')
      expect(html).toContain('Show All Products')
    })

    it('renders all products when no category is selected', () => {
      const html = renderToStaticMarkup(
        <CategoryFilterContext.Provider value={{ selectedCategory: null, setSelectedCategory: () => {} }}>
          <CatalogSection title="Catalog" products={testProducts} />
        </CategoryFilterContext.Provider>
      )

      expect(html).toContain('Executive Chair')
      expect(html).toContain('Marble Dining Table')
      expect(html).toContain('Minimalist Floor Lamp')
      expect(html).not.toContain('Clear')
    })
  })
})
