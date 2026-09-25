import React, { useState, useEffect } from 'react'
import type {
  SprintProduct,
  SprintRunningType,
  SprintCategory,
  SprintGender,
  SprintCartItem,
  SprintColor,
  SprintCollectionFilterState,
  SprintViewMode,
} from './types'
import { SPRINT_PRODUCTS } from './data/sprintData'
import { SprintHeader } from './components/SprintHeader'
import { SprintHero } from './components/SprintHero'
import { SprintFindYourShoe } from './components/SprintFindYourShoe'
import { SprintBestRunningShoes } from './components/SprintBestRunningShoes'
import { SprintEngineeredSection } from './components/SprintEngineeredSection'
import { SprintEssentials } from './components/SprintEssentials'
import { SprintNewArrivalsSlider } from './components/SprintNewArrivalsSlider'
import { SprintReviews } from './components/SprintReviews'
import { SprintCollectionPage } from './components/SprintCollectionPage'
import { SprintProductPage } from './components/SprintProductPage'
import { SprintCartDrawer } from './components/SprintCartDrawer'
import { SprintWishlistModal } from './components/SprintWishlistModal'
import { SprintSearchModal } from './components/SprintSearchModal'
import { SprintFooter } from './components/SprintFooter'
import './styles/SprintStorefront.css'

export interface SprintStorefrontProps {
  onBack?: () => void
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string
}

const INITIAL_FILTERS: SprintCollectionFilterState = {
  runningTypes: [],
  shoeTypes: [],
  genders: [],
  categories: [],
  cushionLevels: [],
  sizes: [],
  minPrice: 0,
  maxPrice: 350,
  inStockOnly: false,
  sortBy: 'featured',
}

export const SprintStorefront: React.FC<SprintStorefrontProps> = ({
  onBack: _onBack,
  deviceView = 'desktop',
  customAccentColor,
}) => {
  const [viewMode, setViewMode] = useState<SprintViewMode>('home')
  const [selectedProduct, setSelectedProduct] = useState<SprintProduct | null>(null)
  const [filterState, setFilterState] = useState<SprintCollectionFilterState>(INITIAL_FILTERS)

  // Seed initial cart item with the flagship racer
  const [cart, setCart] = useState<SprintCartItem[]>([
    {
      id: 'init-sprint-1',
      product: SPRINT_PRODUCTS[0], // Strata Pro Carbon Racer
      selectedSize: '9.5',
      selectedColor: SPRINT_PRODUCTS[0].colors[0],
      quantity: 1,
    },
  ])
  const [wishlist, setWishlist] = useState<string[]>(['sprint-shoe-02', 'sprint-app-01'])

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToast(msg)
  }

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(t)
  }, [toast])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [viewMode])

  // Navigation
  const handleNavigateHome = () => {
    setViewMode('home')
    setSelectedProduct(null)
  }

  const handleNavigateCollection = (
    runningType?: SprintRunningType,
    category?: SprintCategory,
    gender?: SprintGender
  ) => {
    setFilterState({
      ...INITIAL_FILTERS,
      runningTypes: runningType ? [runningType] : [],
      categories: category ? [category] : [],
      genders: gender ? [gender] : [],
    })
    setViewMode('collection')
    setSelectedProduct(null)
  }

  // Wishlist toggle
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId)
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId]
      showToast(exists ? 'Removed from saved gear' : 'Saved to your running rotation ♡')
      return next
    })
  }

  // Cart operations
  const handleAddToCart = (
    product: SprintProduct,
    size: string,
    color: SprintColor,
    qty: number
  ) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (i) =>
          i.product.id === product.id &&
          i.selectedSize === size &&
          i.selectedColor.name === color.name
      )
      if (idx >= 0) {
        const copy = [...prev]
        copy[idx].quantity += qty
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
    showToast(`Added ${product.name} (US ${size}) to bag`)
    setIsCartOpen(true)
  }

  const handleQuickAdd = (product: SprintProduct) => {
    const size = product.sizes[0] || '9.5'
    const color = product.colors[0] || { name: 'Standard', hex: '#0f172a' }
    handleAddToCart(product, size, color, 1)
  }

  const handleBuyNow = (
    product: SprintProduct,
    size: string,
    color: SprintColor,
    qty: number
  ) => {
    handleAddToCart(product, size, color, qty)
    setSelectedProduct(null)
  }

  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId)
      return
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
    )
  }

  const handleRemoveItem = (itemId: string) => {
    setCart((prev) => prev.filter((i) => i.id !== itemId))
    showToast('Item removed from bag')
  }

  const handleCheckout = () => {
    showToast('Sprint Checkout initiated! 30-day trial activated 🏃')
  }

  const rootStyle = {
    ...(customAccentColor ? { '--sprint-highlight': customAccentColor } : {}),
  } as React.CSSProperties

  return (
    <div
      className={`sprint-root simulated-frame frame-${deviceView}`}
      style={rootStyle}
    >

      {/* Sticky Light Minimal Header */}
      <SprintHeader
        onNavigateHome={handleNavigateHome}
        onNavigateCollection={handleNavigateCollection}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => showToast('Sprint Runner ID: #84920 Active')}
      />

      <main>
        {viewMode === 'home' && (
          <>
            {/* 1. Hero */}
            <SprintHero
              onShopShoes={() => handleNavigateCollection(undefined, 'shoes')}
              onExplorePerformance={() => handleNavigateCollection('race', 'shoes')}
            />

            {/* 2. Find Your Running Shoe */}
            <SprintFindYourShoe
              onSelectCategory={(runningType) => handleNavigateCollection(runningType, 'shoes')}
            />

            {/* 3. Best Running Shoes */}
            <SprintBestRunningShoes
              products={SPRINT_PRODUCTS}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onQuickAdd={handleQuickAdd}
              onViewAllShoes={() => handleNavigateCollection(undefined, 'shoes')}
            />

            {/* 4. Engineered For Every Mile */}
            <SprintEngineeredSection
              onLearnMore={() => handleNavigateCollection('race', 'shoes')}
            />

            {/* 5. Running Essentials */}
            <SprintEssentials
              onSelectCategory={(cat) => handleNavigateCollection(undefined, cat)}
            />

            {/* 6. New Arrivals Slider */}
            <SprintNewArrivalsSlider
              products={SPRINT_PRODUCTS}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onSelectProduct={(p) => setSelectedProduct(p)}
              onQuickAdd={handleQuickAdd}
            />

            {/* 7. Runner Reviews */}
            <SprintReviews />
          </>
        )}

        {viewMode === 'collection' && (
          <SprintCollectionPage
            products={SPRINT_PRODUCTS}
            filterState={filterState}
            onUpdateFilters={setFilterState}
            onResetFilters={() => setFilterState(INITIAL_FILTERS)}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onQuickAdd={handleQuickAdd}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />
        )}
      </main>

      {/* Detailed Product Page Modal */}
      {selectedProduct && (
        <SprintProductPage
          product={selectedProduct}
          isWishlisted={wishlist.includes(selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          onClose={() => setSelectedProduct(null)}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />
      )}

      {/* Minimal Cart Drawer */}
      <SprintCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Wishlist Modal */}
      <SprintWishlistModal
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
      <SprintSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(p) => {
          setSelectedProduct(p)
          setIsSearchOpen(false)
        }}
      />

      {/* Footer */}
      <SprintFooter onNavigateCollection={handleNavigateCollection} />

      {/* Toast Notification */}
      {toast && (
        <div
          style={{
            position: 'fixed',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#0f172a',
            color: '#ffffff',
            padding: '0.75rem 1.5rem',
            borderRadius: '9999px',
            fontSize: '0.84rem',
            fontWeight: 600,
            zIndex: 1100,
            boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>👟</span>
          <span>{toast}</span>
        </div>
      )}
    </div>
  )
}
export default SprintStorefront

