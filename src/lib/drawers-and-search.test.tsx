import { beforeEach, describe, expect, it, vi } from 'vitest'
import { renderToStaticMarkup } from 'react-dom/server'
import { templates } from '../data/templates'
import { CartContext, type CartContextValue } from './cartContextDef'
import { WishlistContext, type WishlistContextValue } from './wishlistContextDef'
import { CartDrawer } from '../components/CartDrawer'
import { WishlistDrawer } from '../components/WishlistDrawer'
import { StoreMenu } from '../components/sections/StoreMenu'
import { SearchOverlay } from '../components/SearchOverlay'
import { NavBarSection } from '../components/sections/NavBarSection'

// Mock react-dom createPortal so portal content can be inspected in SSR/unit test markup
vi.mock('react-dom', async () => {
  const actual = await vi.importActual<typeof import('react-dom')>('react-dom')
  return {
    ...actual,
    createPortal: (children: React.ReactNode) => children,
  }
})

describe('Global Responsive Drawers and Search Coverage', () => {
  beforeEach(() => {
    const hostEl = { id: 'storefront-overlay-host', nodeType: 1 }
    globalThis.document = {
      getElementById: (id: string) => (id === 'storefront-overlay-host' ? hostEl : null),
      body: { style: { overflow: '' }, nodeType: 1 },
      addEventListener: () => {},
      removeEventListener: () => {},
    } as any
    globalThis.window = {
      addEventListener: () => {},
      removeEventListener: () => {},
    } as any
  })

  const VALID_MARKETPLACE_CATEGORIES = ['Electronics', 'Home & Furniture', 'General Store', 'Food & Grocery']
  const LEGACY_IDS = ['template-01', 'atelier', 'aura', 'casa', 'mono', 'noir', 'solis', 'market', 'studio']
  const activeMarketplaceTemplates = templates.filter(t => {
    const isCat = t.categories && t.categories.some(c => VALID_MARKETPLACE_CATEGORIES.includes(c.name))
    return isCat && !LEGACY_IDS.includes(t.id)
  })

  describe('Section 4: Active 50 Marketplace Templates Coverage', () => {
    it('confirms exactly 50 active marketplace templates across 4 major categories', () => {
      expect(activeMarketplaceTemplates.length).toBe(50)
      const categoriesFound = new Set<string>()
      activeMarketplaceTemplates.forEach(t => {
        t.categories.forEach(c => categoriesFound.add(c.name))
      })
      for (const cat of VALID_MARKETPLACE_CATEGORIES) {
        expect(categoriesFound.has(cat)).toBe(true)
      }
    })

    it('confirms every active marketplace template has a responsive navbar section', () => {
      activeMarketplaceTemplates.forEach(t => {
        const nav = t.sections.find(s => s.type === 'navbar')
        expect(nav, `Template ${t.id} must define a navbar section`).toBeDefined()
      })
    })

    it('confirms templates from each category have catalog or spotlight products extractable by SearchOverlay', () => {
      const sampleCategories = ['Electronics', 'Home & Furniture', 'General Store', 'Food & Grocery']
      sampleCategories.forEach(cat => {
        const catTemplate = activeMarketplaceTemplates.find(t => t.categories.some(c => c.name === cat))
        expect(catTemplate).toBeDefined()
        const catalogSection = catTemplate?.sections.find(s => s.props?.products || s.props?.product || s.props?.hotspots)
        expect(catalogSection, `Template ${catTemplate?.id} in ${cat} should have searchable products`).toBeDefined()
      })
    })
  })

  describe('Section 2A: Cart Drawer Responsive & Empty/Populated States', () => {
    const createCartValue = (overrides?: Partial<CartContextValue>): CartContextValue => ({
      scope: 'global',
      setScope: () => {},
      items: [],
      count: 0,
      subtotal: 0,
      isCartOpen: false,
      add: () => {},
      decrease: () => {},
      remove: () => {},
      clear: () => {},
      setIsCartOpen: () => {},
      getScopedItems: () => [],
      getScopedCount: () => 0,
      getScopedSubtotal: () => 0,
      ...overrides,
    })

    it('returns null when cart is closed', () => {
      const html = renderToStaticMarkup(
        <CartContext.Provider value={createCartValue({ isCartOpen: false })}>
          <CartDrawer />
        </CartContext.Provider>
      )
      expect(html).toBe('')
    })

    it('verifies CartDrawer structure, positioning, and centered empty state markup when open', () => {
      const html = renderToStaticMarkup(
        <CartContext.Provider value={createCartValue({ isCartOpen: true, items: [], count: 0 })}>
          <CartDrawer />
        </CartContext.Provider>
      )

      expect(html).toContain('role="dialog"')
      expect(html).toContain('aria-label="Shopping bag"')
      expect(html).toContain('aria-label="Close shopping bag"')
      expect(html).toContain('Your bag is empty.')
      expect(html).toContain('cart-drawer')
      expect(html).toContain('position:absolute')
    })

    it('verifies CartDrawer populated state with subtotal, quantity controls, and checkout button', () => {
      const sampleProduct = {
        id: 'p1',
        slug: 'p1',
        name: 'Acoustic Headphones',
        description: 'Studio sound',
        category: 'Audio',
        price: 299,
        compareAtPrice: null,
        stockQuantity: 10,
        visualTheme: 'ink' as const,
        isFeatured: true,
      }

      const html = renderToStaticMarkup(
        <CartContext.Provider
          value={createCartValue({
            isCartOpen: true,
            items: [{ product: sampleProduct, quantity: 2 }],
            count: 2,
            subtotal: 598,
          })}
        >
          <CartDrawer />
        </CartContext.Provider>
      )

      expect(html).toContain('Acoustic Headphones')
      expect(html).toContain('Shopping bag (2)')
      expect(html).toContain('Continue to checkout')
      expect(html).toContain('aria-label="Decrease quantity of Acoustic Headphones"')
      expect(html).toContain('aria-label="Increase quantity of Acoustic Headphones"')
      expect(html).toContain('aria-label="Remove Acoustic Headphones from cart"')
    })
  })

  describe('Section 2B: Wishlist Drawer Responsive & Empty/Populated States', () => {
    const createWishlistValue = (overrides?: Partial<WishlistContextValue>): WishlistContextValue => ({
      scope: 'global',
      setScope: () => {},
      items: [],
      count: 0,
      isWishlistOpen: false,
      add: () => {},
      remove: () => {},
      toggle: () => {},
      clear: () => {},
      isInWishlist: () => false,
      setIsWishlistOpen: () => {},
      getScopedItems: () => [],
      getScopedCount: () => 0,
      ...overrides,
    })

    it('renders empty wishlist state with accessible markup and instructions', () => {
      const html = renderToStaticMarkup(
        <WishlistContext.Provider value={createWishlistValue({ isWishlistOpen: true, items: [], count: 0 })}>
          <WishlistDrawer />
        </WishlistContext.Provider>
      )

      expect(html).toContain('role="dialog"')
      expect(html).toContain('aria-label="Wishlist"')
      expect(html).toContain('aria-label="Close wishlist"')
      expect(html).toContain('Your wishlist is empty.')
      expect(html).toContain('Tap the heart icon on any product to save your favourite items.')
      expect(html).toContain('position:absolute')
    })

    it('renders populated wishlist state with product details, Add to bag button, and remove action', () => {
      const wishlistItem = {
        id: 'w1',
        slug: 'w1',
        name: 'Velvet Armchair',
        price: 850,
        category: 'Living',
      }

      const html = renderToStaticMarkup(
        <WishlistContext.Provider
          value={createWishlistValue({
            isWishlistOpen: true,
            items: [wishlistItem],
            count: 1,
          })}
        >
          <WishlistDrawer />
        </WishlistContext.Provider>
      )

      expect(html).toContain('Velvet Armchair')
      expect(html).toContain('Wishlist (1)')
      expect(html).toContain('Add to bag')
      expect(html).toContain('aria-label="Remove Velvet Armchair from wishlist"')
    })
  })

  describe('Section 2C: StoreMenu Mobile/Tablet Navigation Drawer', () => {
    it('renders left-docked Shopify pattern with brand, close button, and quick actions', () => {
      const html = renderToStaticMarkup(
        <StoreMenu
          isOpen={true}
          onClose={() => {}}
          brandName="NOVA AUDIO"
          navigation={[
            { label: 'Headphones', href: '#headphones' },
            { label: 'Speakers', href: '#speakers' },
          ]}
          features={[
            { id: 'custom-engraving', label: 'Custom Engraving', description: 'Laser engraved personalization' }
          ]}
        />
      )

      expect(html).toContain('role="dialog"')
      expect(html).toContain('aria-label="Store menu"')
      expect(html).toContain('aria-label="Close store menu"')
      expect(html).toContain('NOVA AUDIO')
      expect(html).toContain('Headphones')
      expect(html).toContain('Speakers')
      expect(html).toContain('Search Catalog')
      expect(html).toContain('Wishlist')
      expect(html).toContain('Custom Engraving')
      expect(html).toContain('justify-content:flex-start')
      expect(html).toContain('slideInLeft')
      expect(html).toContain('position:absolute')
    })

    it('supports nested navigation items cleanly with indented hierarchy', () => {
      const html = renderToStaticMarkup(
        <StoreMenu
          isOpen={true}
          onClose={() => {}}
          brandName="TERRA LIVING"
          navigation={[
            {
              label: 'Furniture',
              href: '#furniture',
              children: [
                { label: 'Dining Tables', href: '#dining' },
                { label: 'Lounge Chairs', href: '#chairs' },
              ]
            } as any
          ]}
        />
      )

      expect(html).toContain('Furniture')
      expect(html).toContain('Dining Tables')
      expect(html).toContain('Lounge Chairs')
    })
  })

  describe('Section 3: SearchOverlay Responsive Behavior & Controls', () => {
    it('renders search field contained in storefront overlay host with autofocus, search button, and products', () => {
      const html = renderToStaticMarkup(
        <SearchOverlay
          isOpen={true}
          onClose={() => {}}
          templateId="electronics-01"
        />
      )

      expect(html).toContain('role="search"')
      expect(html).toContain('role="dialog"')
      expect(html).toContain('aria-label="Product search"')
      expect(html).toContain('aria-label="Search products"')
      expect(html).toContain('aria-label="Submit search"')
      expect(html).toContain('aria-label="Close search"')
      expect(html).toContain('position:absolute')
      // Electronics 01 has products that are extracted and rendered in the grid
      expect(html).toContain('product-card')
    })

    it('renders empty prompt when opened with a template that has no local products', () => {
      const html = renderToStaticMarkup(
        <SearchOverlay
          isOpen={true}
          onClose={() => {}}
          templateId="non-existent-template"
        />
      )

      expect(html).toContain('Start typing to explore our collection.')
    })
  })

  describe('NavBarSection Responsive Integration', () => {
    it('renders responsive search, wishlist, cart buttons and hamburger trigger', () => {
      const template = activeMarketplaceTemplates[0]
      const html = renderToStaticMarkup(
        <NavBarSection brand="CIRCUIT LAB" style="minimal" template={template} />
      )

      expect(html).toContain('aria-label="Open store menu"')
      expect(html).toContain('aria-label="Search products"')
      expect(html).toContain('aria-label="Wishlist, 0 items"')
      expect(html).toContain('aria-label="Shopping cart, 0 items"')
      expect(html).toContain('@container (max-width: 768px)')
    })
  })
})
