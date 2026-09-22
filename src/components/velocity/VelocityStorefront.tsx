import React, { useState, useEffect } from 'react'
import type {
  VelocityProduct,
  VelocityCategory,
  VelocitySport,
  VelocityCartItem,
  VelocityColor,
  VelocityViewMode,
} from './types'
import { VELOCITY_PRODUCTS } from './velocityData'
import { VelocityHeader } from './VelocityHeader'
import { VelocityHero } from './VelocityHero'
import { VelocityShopBySport } from './VelocityShopBySport'
import { VelocityTrending } from './VelocityTrending'
import { VelocityPerformanceSplit } from './VelocityPerformanceSplit'
import { VelocityBestSellers } from './VelocityBestSellers'
import { VelocityNewArrivals } from './VelocityNewArrivals'
import { VelocityPromoBanner } from './VelocityPromoBanner'
import { VelocitySportsGrid } from './VelocitySportsGrid'
import { VelocityTestimonials } from './VelocityTestimonials'
import { VelocityNewsletter } from './VelocityNewsletter'
import { VelocityFooter } from './VelocityFooter'
import { VelocityCartDrawer } from './VelocityCartDrawer'
import { VelocityQuickViewModal } from './VelocityQuickViewModal'
import { VelocitySizeGuideModal } from './VelocitySizeGuideModal'
import { VelocitySearchModal } from './VelocitySearchModal'
import { VelocityWishlistModal } from './VelocityWishlistModal'
import { VelocityCollectionPage } from './VelocityCollectionPage'
import { VelocityProductPage } from './VelocityProductPage'
import '../../styles/VelocityStorefront.css'

export interface VelocityStorefrontProps {
  device?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  onClose?: () => void
  onUseTemplate?: (templateId: string) => void
  customAccentColor?: string | null
}

export const VelocityStorefront: React.FC<VelocityStorefrontProps> = ({
  device = 'desktop',
  onClose: _onClose,
  onUseTemplate: _onUseTemplate,
  customAccentColor,
}) => {
  // Navigation / View state
  const [viewMode, setViewMode] = useState<VelocityViewMode>('home')
  const [selectedCategory, setSelectedCategory] = useState<VelocityCategory | null>(null)
  const [selectedSport, setSelectedSport] = useState<VelocitySport | null>(null)
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null)
  const [activeProduct, setActiveProduct] = useState<VelocityProduct>(VELOCITY_PRODUCTS[0])

  // Cart State (Pre-populated with 1 signature item for rich initial UX)
  const [cartItems, setCartItems] = useState<VelocityCartItem[]>([
    {
      id: 'init-cart-1',
      product: VELOCITY_PRODUCTS[0],
      selectedColor: VELOCITY_PRODUCTS[0].colors[0],
      selectedSize: 'US 9.5',
      quantity: 1,
    },
  ])
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false)

  // Wishlist State (Pre-populated with 2 items)
  const [wishlist, setWishlist] = useState<Set<string>>(new Set(['vel-01', 'vel-03']))
  const [wishlistModalOpen, setWishlistModalOpen] = useState(false)

  // Modal states
  const [searchModalOpen, setSearchModalOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<VelocityProduct | null>(null)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)

  // Toast notifications
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (message: string) => {
    setToastMessage(message)
    setTimeout(() => {
      setToastMessage((curr) => (curr === message ? null : curr))
    }, 3000)
  }

  // Scroll to top on view mode change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [viewMode, activeProduct])

  // Cart Handlers
  const handleAddToCart = (
    product: VelocityProduct,
    size?: string,
    color?: VelocityColor,
    qty = 1
  ) => {
    const chosenSize = size || product.sizes[0] || 'Standard'
    const chosenColor = color || product.colors[0]
    const itemKey = `${product.id}-${chosenSize}-${chosenColor.name}`

    setCartItems((prev) => {
      const idx = prev.findIndex((i) => i.id === itemKey)
      if (idx > -1) {
        const next = [...prev]
        next[idx] = { ...next[idx], quantity: next[idx].quantity + qty }
        return next
      }
      return [
        ...prev,
        {
          id: itemKey,
          product,
          selectedColor: chosenColor,
          selectedSize: chosenSize,
          quantity: qty,
        },
      ]
    })

    showToast(`Added "${product.name}" (${chosenSize}) to your bag 🛍️`)
    setCartDrawerOpen(true)
  }

  const handleUpdateCartQty = (itemId: string, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean) as VelocityCartItem[]
    })
  }

  const handleRemoveCartItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId))
    showToast('Item removed from your bag')
  }

  const handleCheckout = () => {
    showToast('Redirecting to secure Velocity Checkout...')
    setTimeout(() => {
      alert('Velocity Checkout: Connected to 256-Bit SSL Payment Gateway.')
    }, 500)
  }

  // Wishlist Handlers
  const handleToggleWishlist = (productId: string) => {
    const prod = VELOCITY_PRODUCTS.find((p) => p.id === productId)
    setWishlist((prev) => {
      const next = new Set(prev)
      if (next.has(productId)) {
        next.delete(productId)
        showToast(`Removed "${prod?.name || 'Item'}" from wishlist`)
      } else {
        next.add(productId)
        showToast(`Added "${prod?.name || 'Item'}" to wishlist ♡`)
      }
      return next
    })
  }

  // Navigation Handlers
  const handleNavigateHome = () => {
    setSelectedCategory(null)
    setSelectedSport(null)
    setSelectedSubCategory(null)
    setViewMode('home')
  }

  const handleNavigateCategory = (
    category: VelocityCategory,
    sport?: VelocitySport,
    subCategory?: string
  ) => {
    setSelectedCategory(category)
    setSelectedSport(sport || null)
    setSelectedSubCategory(subCategory || null)
    setViewMode('collection')
  }

  const handleSelectSport = (sport: VelocitySport) => {
    setSelectedSport(sport)
    setSelectedCategory('Sports')
    setSelectedSubCategory(null)
    setViewMode('collection')
  }

  const handleSelectProduct = (product: VelocityProduct) => {
    setActiveProduct(product)
    setViewMode('product')
  }

  const handleBuyNow = (
    product: VelocityProduct,
    size: string,
    color: VelocityColor,
    qty: number
  ) => {
    handleAddToCart(product, size, color, qty)
    handleCheckout()
  }

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)

  return (
    <div
      className={`velocity-storefront-wrapper device-${device}`}
      style={
        customAccentColor
          ? ({
              '--vel-volt': customAccentColor,
              '--vel-volt-hover': customAccentColor,
              '--vel-volt-glow': `${customAccentColor}55`,
            } as React.CSSProperties)
          : undefined
      }
    >

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div className="velocity-toast-notification" role="alert">
          <span className="toast-bolt">⚡</span>
          <span className="toast-text">{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <VelocityHeader
        activeCategory={selectedCategory}
        cartCount={totalCartCount}
        wishlistCount={wishlist.size}
        onNavigateHome={handleNavigateHome}
        onNavigateCategory={handleNavigateCategory}
        onOpenCart={() => setCartDrawerOpen(true)}
        onOpenWishlist={() => setWishlistModalOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
        onSelectProduct={handleSelectProduct}
      />

      {/* ACTIVE PAGE VIEW */}
      <main className="velocity-main-content">
        {/* VIEW 1: HOMEPAGE (11 Complete Sections) */}
        {viewMode === 'home' && (
          <>
            {/* 1. Full-Width Hero Section */}
            <VelocityHero
              onShopMen={() => handleNavigateCategory('Men')}
              onShopWomen={() => handleNavigateCategory('Women')}
              onExploreLab={() => handleNavigateCategory('Shoes', 'Running')}
            />

            {/* 2. Shop By Sport (Running, Football, Cricket, Basketball, Gym, Tennis) */}
            <VelocityShopBySport onSelectSport={handleSelectSport} />

            {/* 3. Trending Products (8 Cards) */}
            <VelocityTrending
              products={VELOCITY_PRODUCTS}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onQuickAdd={handleAddToCart}
              onQuickView={(p) => setQuickViewProduct(p)}
              onSelectProduct={handleSelectProduct}
              onViewAll={() => handleNavigateCategory('Shoes')}
            />

            {/* 4. Performance Collection (Large Split Section) */}
            <VelocityPerformanceSplit
              onExploreCollection={() => handleNavigateCategory('Men', 'Running')}
            />

            {/* 5. Best Sellers */}
            <VelocityBestSellers
              products={VELOCITY_PRODUCTS}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onQuickAdd={handleAddToCart}
              onQuickView={(p) => setQuickViewProduct(p)}
              onSelectProduct={handleSelectProduct}
              onViewAll={() => handleNavigateCategory('Shoes')}
            />

            {/* 6. New Arrivals Horizontal Product Carousel */}
            <VelocityNewArrivals
              products={VELOCITY_PRODUCTS}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onQuickAdd={handleAddToCart}
              onQuickView={(p) => setQuickViewProduct(p)}
              onSelectProduct={handleSelectProduct}
              onViewAllNew={() => handleNavigateCategory('New Arrivals')}
            />

            {/* 7. Promotional Banner with Countdown */}
            <VelocityPromoBanner
              onShopSale={() => handleNavigateCategory('Sale')}
            />

            {/* 8. Sports Categories Grid */}
            <VelocitySportsGrid onSelectCategory={handleNavigateCategory} />

            {/* 9. Customer Testimonials */}
            <VelocityTestimonials />

            {/* 10. Newsletter */}
            <VelocityNewsletter />
          </>
        )}

        {/* VIEW 2: COLLECTION PAGE */}
        {viewMode === 'collection' && (
          <VelocityCollectionPage
            products={VELOCITY_PRODUCTS}
            initialCategory={selectedCategory}
            initialSport={selectedSport}
            initialSubCategory={selectedSubCategory}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onQuickAdd={handleAddToCart}
            onQuickView={(p) => setQuickViewProduct(p)}
            onSelectProduct={handleSelectProduct}
            onNavigateHome={handleNavigateHome}
          />
        )}

        {/* VIEW 3: PRODUCT DETAIL PAGE (PDP) */}
        {viewMode === 'product' && (
          <VelocityProductPage
            product={activeProduct}
            allProducts={VELOCITY_PRODUCTS}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onBuyNow={handleBuyNow}
            onOpenSizeGuide={() => setSizeGuideOpen(true)}
            onSelectProduct={handleSelectProduct}
            onNavigateHome={handleNavigateHome}
            onNavigateCategory={handleNavigateCategory}
          />
        )}
      </main>

      {/* 11. Large Multi-Column Footer */}
      <VelocityFooter onNavigateCategory={handleNavigateCategory} />

      {/* SHOPIFY-QUALITY CART DRAWER */}
      <VelocityCartDrawer
        isOpen={cartDrawerOpen}
        items={cartItems}
        onClose={() => setCartDrawerOpen(false)}
        onUpdateQty={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onSelectProduct={handleSelectProduct}
        onCheckout={handleCheckout}
      />

      {/* QUICK VIEW MODAL */}
      <VelocityQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onSelectProduct={handleSelectProduct}
      />

      {/* SIZE GUIDE MODAL */}
      <VelocitySizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />

      {/* SEARCH MODAL */}
      <VelocitySearchModal
        isOpen={searchModalOpen}
        products={VELOCITY_PRODUCTS}
        onClose={() => setSearchModalOpen(false)}
        onSelectProduct={handleSelectProduct}
      />

      {/* WISHLIST MODAL */}
      <VelocityWishlistModal
        isOpen={wishlistModalOpen}
        wishlistIds={wishlist}
        products={VELOCITY_PRODUCTS}
        onClose={() => setWishlistModalOpen(false)}
        onRemove={handleToggleWishlist}
        onQuickAdd={handleAddToCart}
        onSelectProduct={handleSelectProduct}
      />
    </div>
  )
}

