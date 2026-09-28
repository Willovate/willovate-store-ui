import React, { useState, useEffect } from 'react'
import type {
  ArenaProduct,
  ArenaSport,
  ArenaCategory,
  ArenaCartItem,
  ArenaColor,
  ArenaCollectionFilterState,
  ArenaViewMode,
} from './types'
import { ARENA_PRODUCTS } from './data/arenaData'
import { ArenaHeader } from './components/ArenaHeader'
import { ArenaHero } from './components/ArenaHero'
import { ArenaShopBySport } from './components/ArenaShopBySport'
import { ArenaGameDayEssentials } from './components/ArenaGameDayEssentials'
import { ArenaOfficialLook } from './components/ArenaOfficialLook'
import { ArenaProPerformance } from './components/ArenaProPerformance'
import { ArenaTopPicks } from './components/ArenaTopPicks'
import { ArenaLimitedDrops } from './components/ArenaLimitedDrops'
import { ArenaTestimonials } from './components/ArenaTestimonials'
import { ArenaCollectionPage } from './components/ArenaCollectionPage'
import { ArenaProductPage } from './components/ArenaProductPage'
import { ArenaCartDrawer } from './components/ArenaCartDrawer'
import { ArenaWishlistModal } from './components/ArenaWishlistModal'
import { ArenaSearchModal } from './components/ArenaSearchModal'
import { ArenaFooter } from './components/ArenaFooter'
import './styles/ArenaStorefront.css'

export interface ArenaStorefrontProps {
  onBack?: () => void
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string
}

const INITIAL_FILTER_STATE: ArenaCollectionFilterState = {
  sports: [],
  categories: [],
  brands: [],
  sizes: [],
  minPrice: 0,
  maxPrice: 500,
  inStockOnly: false,
  sortBy: 'featured',
}

export const ArenaStorefront: React.FC<ArenaStorefrontProps> = ({
  deviceView = 'desktop',
  customAccentColor,
}) => {
  // Navigation & View State
  const [viewMode, setViewMode] = useState<ArenaViewMode>('home')
  const [selectedProduct, setSelectedProduct] = useState<ArenaProduct | null>(null)

  // Collection Filters State
  const [filterState, setFilterState] =
    useState<ArenaCollectionFilterState>(INITIAL_FILTER_STATE)

  // Cart & Wishlist State
  const [cart, setCart] = useState<ArenaCartItem[]>([
    // Seed initial cart item for immediate matchday immersion
    {
      id: 'init-cart-1',
      product: ARENA_PRODUCTS[0], // Vanguard Elite Matchday Jersey
      selectedSize: 'L',
      selectedColor: ARENA_PRODUCTS[0].colors[0],
      quantity: 1,
    },
  ])
  const [wishlist, setWishlist] = useState<string[]>(['arn-fb-02', 'arn-cr-01'])

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Toast Helper
  const showToast = (message: string) => {
    setToastMessage(message)
  }

  useEffect(() => {
    if (!toastMessage) return
    const timer = setTimeout(() => setToastMessage(null), 3200)
    return () => clearTimeout(timer)
  }, [toastMessage])

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [viewMode])

  // Navigation Handlers
  const handleNavigateHome = () => {
    setViewMode('home')
    setSelectedProduct(null)
  }

  const handleNavigateCollection = (sport?: ArenaSport, category?: ArenaCategory) => {
    setFilterState({
      ...INITIAL_FILTER_STATE,
      sports: sport ? [sport] : [],
      categories: category && category !== 'all' ? [category] : [],
    })
    setViewMode('collection')
    setSelectedProduct(null)
  }

  // Wishlist Toggle
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId)
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId]
      showToast(exists ? 'Removed from your stadium locker' : 'Saved to your stadium locker ⭐')
      return next
    })
  }

  // Cart Handlers
  const handleAddToCart = (
    product: ArenaProduct,
    size: string,
    color: ArenaColor,
    qty: number
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (i) =>
          i.product.id === product.id &&
          i.selectedSize === size &&
          i.selectedColor.name === color.name
      )
      if (existingIdx >= 0) {
        const copy = [...prev]
        copy[existingIdx].quantity += qty
        return copy
      }
      return [
        ...prev,
        {
          id: `${product.id}-${size}-${color.name}-${Date.now()}`,
          product,
          selectedSize: size,
          selectedColor: color,
          quantity: qty,
        },
      ]
    })
    showToast(`Added ${product.name} (${size}) to Cart! 🛒`)
    setIsCartOpen(true)
  }

  const handleQuickAdd = (product: ArenaProduct) => {
    const size = product.sizes[0] || 'M'
    const color = product.colors[0] || { name: 'Standard', hex: '#ff5500' }
    handleAddToCart(product, size, color, 1)
  }

  const handleBuyNow = (
    product: ArenaProduct,
    size: string,
    color: ArenaColor,
    qty: number
  ) => {
    handleAddToCart(product, size, color, qty)
    setSelectedProduct(null)
  }

  const handleUpdateCartQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(itemId)
      return
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    )
  }

  const handleRemoveCartItem = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId))
    showToast('Item removed from cart')
  }

  const handleCheckout = () => {
    showToast('Matchday Checkout initiated! Order simulation complete. 🏆')
  }

  // Dynamic Root Styles
  const rootStyle = {
    ...(customAccentColor ? { '--arena-accent': customAccentColor } : {}),
  } as React.CSSProperties

  return (
    <div
      className={`arena-root simulated-frame frame-${deviceView}`}
      data-device-view={deviceView}
      style={rootStyle}
    >
      {/* Sticky Dark Header */}
      <ArenaHeader
        onNavigateHome={handleNavigateHome}
        onNavigateCollection={handleNavigateCollection}
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => showToast('Arena Athlete ID: PRO-99201 Active')}
      />

      {/* Main View Router */}
      <main>
        {viewMode === 'home' && (
          <>
            {/* Hero Section */}
            <ArenaHero
              onShopCollection={() => handleNavigateCollection()}
              onExploreTeams={() => handleNavigateCollection('football')}
            />

            {/* Section 2: Shop Your Sport */}
            <ArenaShopBySport
              onSelectSport={(sport) => handleNavigateCollection(sport)}
            />

            {/* Section 3: Game Day Essentials */}
            <ArenaGameDayEssentials
              onSelectProduct={(p) => setSelectedProduct(p)}
              onQuickAdd={handleQuickAdd}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
            />

            {/* Section 4: Official Look */}
            <ArenaOfficialLook
              onShopJerseys={() => handleNavigateCollection(undefined, 'jerseys')}
              onSelectProduct={(p) => setSelectedProduct(p)}
            />

            {/* Section 5: Pro Performance Split */}
            <ArenaProPerformance
              onExploreLab={() => handleNavigateCollection()}
            />

            {/* Section 6: Top Picks */}
            <ArenaTopPicks
              onSelectProduct={(p) => setSelectedProduct(p)}
              onQuickAdd={handleQuickAdd}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
            />

            {/* Section 7: Limited Drops */}
            <ArenaLimitedDrops
              onClaimDrop={() => {
                showToast('Drop allocation locked! Code STADIUM20 saved to clipboard.')
                setIsCartOpen(true)
              }}
            />

            {/* Section 8: Testimonials */}
            <ArenaTestimonials />
          </>
        )}

        {viewMode === 'collection' && (
          <ArenaCollectionPage
            products={ARENA_PRODUCTS}
            filterState={filterState}
            onUpdateFilters={setFilterState}
            onResetFilters={() => setFilterState(INITIAL_FILTER_STATE)}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onQuickAdd={handleQuickAdd}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}
      </main>

      {/* Product Detail Modal / Page */}
      {selectedProduct && (
        <ArenaProductPage
          product={selectedProduct}
          isWishlisted={wishlist.includes(selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onClose={() => setSelectedProduct(null)}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />
      )}

      {/* Cart Drawer */}
      <ArenaCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
        onSelectProduct={(p) => {
          setSelectedProduct(p)
          setIsCartOpen(false)
        }}
      />

      {/* Wishlist Modal */}
      <ArenaWishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectProduct={(p) => {
          setSelectedProduct(p)
          setIsWishlistOpen(false)
        }}
        onQuickAdd={handleQuickAdd}
      />

      {/* Search Modal */}
      <ArenaSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => {
          setSelectedProduct(p)
          setIsSearchOpen(false)
        }}
      />

      {/* Dark Premium Footer */}
      <ArenaFooter
        onSelectSport={(sport) => handleNavigateCollection(sport)}
        onOpenCollection={() => handleNavigateCollection()}
      />

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="arena-toast-container">
          <div className="arena-toast">
            <span>⚡</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  )
}
export default ArenaStorefront
