import React, { useState, useEffect } from 'react'
import type {
  ProGearProduct,
  ProGearBundle,
  ProGearSport,
  ProGearEquipmentType,
  ProGearCartItem,
  ProGearFilterState,
  ProGearViewMode,
} from './types'
import { PROGEAR_PRODUCTS } from './data/proGearData'
import { ProGearHeader } from './components/ProGearHeader'
import { ProGearHero } from './components/ProGearHero'
import { ProGearShopBySport } from './components/ProGearShopBySport'
import { ProGearTopEquipment } from './components/ProGearTopEquipment'
import { ProGearCompleteYourKit } from './components/ProGearCompleteYourKit'
import { ProGearProPicks } from './components/ProGearProPicks'
import { ProGearNewEquipment } from './components/ProGearNewEquipment'
import { ProGearWhyProGear } from './components/ProGearWhyProGear'
import { ProGearCollectionPage } from './components/ProGearCollectionPage'
import { ProGearProductPage } from './components/ProGearProductPage'
import { ProGearCartDrawer } from './components/ProGearCartDrawer'
import { ProGearWishlistModal } from './components/ProGearWishlistModal'
import { ProGearSearchModal } from './components/ProGearSearchModal'
import { ProGearFooter } from './components/ProGearFooter'
import './styles/ProGearStorefront.css'

export interface ProGearStorefrontProps {
  onBack?: () => void
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string
}

const INITIAL_FILTERS: ProGearFilterState = {
  sports: [],
  equipmentTypes: [],
  brands: [],
  materials: [],
  playerLevels: [],
  minPrice: 0,
  maxPrice: 30000,
  ratingThreshold: 0,
  inStockOnly: false,
  sortBy: 'featured',
}

export const ProGearStorefront: React.FC<ProGearStorefrontProps> = ({
  // Note: onBack is accepted in props for interface compatibility,
  // but deliberately NOT rendered as a floating button per explicit design specification.
  deviceView = 'desktop',
  customAccentColor,
}) => {
  const [viewMode, setViewMode] = useState<ProGearViewMode>('home')
  const [selectedProduct, setSelectedProduct] = useState<ProGearProduct | null>(null)
  const [filterState, setFilterState] = useState<ProGearFilterState>(INITIAL_FILTERS)

  // Initial cart with a starter tournament ball
  const [cart, setCart] = useState<ProGearCartItem[]>([
    {
      id: 'init-progear-1',
      product: PROGEAR_PRODUCTS[0], // Striker Match Elite FIFA Pro Ball
      selectedVariant: 'Size 5 (Official)',
      quantity: 1,
    },
  ])

  // Saved equipment wishlist
  const [wishlist, setWishlist] = useState<string[]>([
    'pg-ck-01', // Master Stroke Grade 1 Willow Bat
    'pg-bb-01', // Overdrive Grip Ball
  ])

  // Modals state
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
  }

  useEffect(() => {
    if (!toastMessage) return
    const timer = setTimeout(() => setToastMessage(null), 3000)
    return () => clearTimeout(timer)
  }, [toastMessage])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [viewMode])

  // Navigation Handlers
  const handleNavigateHome = () => {
    setViewMode('home')
    setSelectedProduct(null)
  }

  const handleNavigateCollection = (
    sport?: ProGearSport,
    equipmentType?: ProGearEquipmentType
  ) => {
    setFilterState({
      ...INITIAL_FILTERS,
      sports: sport ? [sport] : [],
      equipmentTypes: equipmentType ? [equipmentType] : [],
    })
    setViewMode('collection')
    setSelectedProduct(null)
  }

  // Wishlist Toggle
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId)
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId]
      const prod = PROGEAR_PRODUCTS.find((p) => p.id === productId)
      const name = prod ? prod.name : 'Item'
      showToast(exists ? `Removed ${name} from saved gear` : `Saved ${name} to Wishlist`)
      return next
    })
  }

  // Cart Operations
  const handleAddToCart = (product: ProGearProduct, size?: string, quantity: number = 1) => {
    const variant = size || product.sizes?.[0] || 'Standard'
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedVariant === variant
      )
      if (existingIdx > -1) {
        const next = [...prev]
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity,
        }
        return next
      }
      return [
        ...prev,
        {
          id: `item-${product.id}-${Date.now()}`,
          product,
          selectedVariant: variant,
          quantity,
        },
      ]
    })
    showToast(`Added ${quantity}× ${product.name} to equipment cart!`)
    setIsCartOpen(true)
  }

  const handleAddBundleToCart = (bundle: ProGearBundle) => {
    // Treat bundle as a special bundled kit product
    const bundleProduct: ProGearProduct = {
      id: bundle.id,
      name: bundle.title,
      brand: 'ProGear Official Kits',
      sport: bundle.sport,
      equipmentType: 'bundle',
      price: bundle.price,
      compareAtPrice: bundle.compareAtPrice,
      rating: bundle.rating,
      reviewCount: bundle.reviewCount,
      inStock: true,
      badge: bundle.badge,
      image: bundle.image,
      gallery: [bundle.image],
      sizes: ['Full Complete Kit'],
      material: 'Multi-Component Tournament Kit',
      playerLevel: 'Advanced',
      warranty: 'Full Kit 1-Year Guarantee',
      description: bundle.description,
      specs: bundle.itemsIncluded.map((item) => ({
        label: item.name,
        value: `${item.quantity} (${item.spec})`,
      })),
      highlights: bundle.itemsIncluded.map((item) => `${item.quantity} × ${item.name}`),
      deliveryDays: 2,
      isProPick: true,
    }

    handleAddToCart(bundleProduct, 'Full Complete Kit', 1)
  }

  const handleUpdateCartQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(cartItemId)
      return
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    )
  }

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId))
    showToast('Equipment removed from cart.')
  }

  const handleBuyNow = (product: ProGearProduct, size: string, quantity: number) => {
    handleAddToCart(product, size, quantity)
    setSelectedProduct(null)
  }

  const handleCheckout = () => {
    alert(
      `ProGear Matchday Checkout:\n\nTotal: ₹${cart
        .reduce((sum, item) => sum + item.product.price * item.quantity, 0)
        .toLocaleString('en-IN')}\n\nProceeding to 256-bit SSL encrypted gateway for Indian PIN codes.`
    )
  }

  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  const rootStyle: React.CSSProperties = {
    ...(customAccentColor ? ({ '--pg-primary': customAccentColor } as React.CSSProperties) : {}),
  }

  // Recommended equipment add-ons
  const recommendedAddons = PROGEAR_PRODUCTS.filter(
    (p) => p.equipmentType === 'ball' || p.equipmentType === 'protective'
  )

  return (
    <div
      className={`progear-root progear-storefront device-${deviceView}`}
      data-device-view={deviceView}
      style={rootStyle}
    >
      {/* Sticky Header with 8-Sport Mega Menus & Search */}
      <ProGearHeader
        onNavigateHome={handleNavigateHome}
        onNavigateCollection={handleNavigateCollection}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        cartSubtotal={cartSubtotal}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => showToast('ProGear Coach & Athlete Pass #84920 Active')}
      />

      {/* Main Body: Switch between Home and Collection */}
      {viewMode === 'home' ? (
        <main>
          {/* Section 1: Hero */}
          <ProGearHero
            onShopEquipment={() => handleNavigateCollection()}
            onExploreKits={() => handleNavigateCollection(undefined, 'bundle')}
          />

          {/* Section 2: Shop By Sport (8 Large Cards) */}
          <ProGearShopBySport
            onSelectSport={(sport) => handleNavigateCollection(sport)}
          />

          {/* Section 3: Top Equipment (Product Grid with Sport Tabs) */}
          <ProGearTopEquipment
            products={PROGEAR_PRODUCTS}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p, size) => handleAddToCart(p, size)}
            wishlistIds={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onViewAll={() => handleNavigateCollection()}
          />

          {/* Section 4: Complete Your Kit (Bundled Equipment Cards) */}
          <ProGearCompleteYourKit
            onAddBundleToCart={handleAddBundleToCart}
          />

          {/* Section 5: Pro Picks (Carousel) */}
          <ProGearProPicks
            products={PROGEAR_PRODUCTS}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p, size) => handleAddToCart(p, size)}
            wishlistIds={wishlist}
            onToggleWishlist={handleToggleWishlist}
          />

          {/* Section 6: New Equipment */}
          <ProGearNewEquipment
            products={PROGEAR_PRODUCTS}
            onSelectProduct={(p) => setSelectedProduct(p)}
            onAddToCart={(p, size) => handleAddToCart(p, size)}
            wishlistIds={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onViewAllNew={() => handleNavigateCollection()}
          />

          {/* Section 7: Why ProGear (Feature Pillars) */}
          <ProGearWhyProGear />
        </main>
      ) : (
        <ProGearCollectionPage
          products={PROGEAR_PRODUCTS}
          filterState={filterState}
          onFilterChange={(newFilters) => setFilterState(newFilters)}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onAddToCart={(p, size) => handleAddToCart(p, size)}
          wishlistIds={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      {/* Product Detail Page (PDP) Modal */}
      {selectedProduct && (
        <ProGearProductPage
          product={selectedProduct}
          allProducts={PROGEAR_PRODUCTS}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={(p, size, qty) => handleAddToCart(p, size, qty)}
          onBuyNow={handleBuyNow}
          isWishlisted={wishlist.includes(selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
          onSelectProduct={(p) => setSelectedProduct(p)}
        />
      )}

      {/* Cart Drawer */}
      <ProGearCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={handleCheckout}
        recommendedAddons={recommendedAddons}
        onAddRecommendation={(p) => handleAddToCart(p)}
      />

      {/* Wishlist Modal */}
      <ProGearWishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        products={PROGEAR_PRODUCTS}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectProduct={(p) => {
          setSelectedProduct(p)
          setIsWishlistOpen(false)
        }}
        onQuickAdd={(p) => handleAddToCart(p)}
      />

      {/* Search Modal */}
      <ProGearSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={PROGEAR_PRODUCTS}
        onSelectProduct={(p) => {
          setSelectedProduct(p)
          setIsSearchOpen(false)
        }}
      />

      {/* Marketplace Footer */}
      <ProGearFooter
        onSelectSport={(sport) => handleNavigateCollection(sport)}
        onExploreBundles={() => handleNavigateCollection(undefined, 'bundle')}
      />

      {/* Toast Notification */}
      {toastMessage && (
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
            fontSize: '0.85rem',
            fontWeight: 700,
            zIndex: 1200,
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          <span>⚙️</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}

export default ProGearStorefront

