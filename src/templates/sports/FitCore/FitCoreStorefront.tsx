import React, { useState, useEffect } from 'react'
import type {
  FitCoreProduct,
  FitCoreProductColor,
  FitCoreWorkout,
  FitCoreCategory,
  FitCoreBundle,
  FitCoreCartItem,
} from './types'
import { FITCORE_PRODUCTS } from './data/fitcoreData'

import { FitCoreHeader } from './components/FitCoreHeader'
import { FitCoreHero } from './components/FitCoreHero'
import { FitCoreShopByWorkout } from './components/FitCoreShopByWorkout'
import { FitCoreTrainingEssentials } from './components/FitCoreTrainingEssentials'
import { FitCoreGymWear } from './components/FitCoreGymWear'
import { FitCorePerformanceTech } from './components/FitCorePerformanceTech'
import { FitCoreWorkoutEquipment } from './components/FitCoreWorkoutEquipment'
import { FitCoreCompleteTheWorkout } from './components/FitCoreCompleteTheWorkout'
import { FitCoreBestSellers } from './components/FitCoreBestSellers'
import { FitCoreFitnessStories } from './components/FitCoreFitnessStories'
import { FitCoreReviews } from './components/FitCoreReviews'
import { FitCoreNewsletter } from './components/FitCoreNewsletter'
import { FitCoreFooter } from './components/FitCoreFooter'
import { FitCoreProductPage } from './components/FitCoreProductPage'
import { FitCoreCollectionPage } from './components/FitCoreCollectionPage'
import { FitCoreCartDrawer } from './components/FitCoreCartDrawer'

import './styles/FitCoreStorefront.css'

export interface FitCoreStorefrontProps {
  onBack?: () => void
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string
}

export const FitCoreStorefront: React.FC<FitCoreStorefrontProps> = ({
  onBack: _onBack,
  deviceView: _deviceView = 'desktop',
  customAccentColor,
}) => {
  const [viewMode, setViewMode] = useState<'home' | 'collection' | 'product'>('home')
  const [selectedProduct, setSelectedProduct] = useState<FitCoreProduct | null>(null)
  const [collectionWorkout, setCollectionWorkout] = useState<FitCoreWorkout | undefined>(undefined)
  const [collectionCategory, setCollectionCategory] = useState<FitCoreCategory | undefined>(undefined)

  // Seed cart with initial item for instant immersion
  const [cart, setCart] = useState<FitCoreCartItem[]>([
    {
      product: FITCORE_PRODUCTS[0],
      quantity: 1,
      selectedSize: 'L',
      selectedColor: FITCORE_PRODUCTS[0].colors[0],
    },
  ])

  // Seed wishlist
  const [wishlist, setWishlist] = useState<string[]>(['fc-run-01', 'fc-hiit-01'])

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
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
  }, [viewMode, selectedProduct])

  // Navigation Handlers
  const handleNavigateHome = () => {
    setViewMode('home')
    setSelectedProduct(null)
  }

  const handleNavigateCollection = (workout?: FitCoreWorkout, category?: FitCoreCategory) => {
    setCollectionWorkout(workout)
    setCollectionCategory(category)
    setSelectedProduct(null)
    setViewMode('collection')
  }

  const handleSelectProduct = (product: FitCoreProduct) => {
    setSelectedProduct(product)
    setViewMode('product')
  }

  // Cart Operations
  const handleAddToCart = (
    product: FitCoreProduct,
    size: string,
    color: FitCoreProductColor
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      )
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += 1
        return updated
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          selectedSize: size,
          selectedColor: color,
        },
      ]
    })
    showToast(`Added ${product.name} (${size}) to your bag.`)
    setIsCartOpen(true)
  }

  const handleAddBundleToCart = (bundle: FitCoreBundle) => {
    // Add each bundle item into the cart
    bundle.items.forEach((item) => {
      // Find matching product or create pseudo product
      const matchedProduct =
        FITCORE_PRODUCTS.find((p) => p.name.includes(item.name) || item.name.includes(p.name)) ||
        FITCORE_PRODUCTS[0]

      const bundleDiscountPrice = Math.round(item.price * (1 - bundle.discountPercent / 100))
      const discountedProduct: FitCoreProduct = {
        ...matchedProduct,
        id: `${item.id}-bundle`,
        name: `${item.name} (${bundle.workout.toUpperCase()} BUNDLE)`,
        price: bundleDiscountPrice,
      }

      setCart((prev) => [
        ...prev,
        {
          product: discountedProduct,
          quantity: 1,
          selectedSize: item.sizes[0] || 'One Size',
          selectedColor: { name: 'Standard', hex: '#1c1d21' },
        },
      ])
    })

    showToast(`Added full ${bundle.title} (4 items) to your bag with ${bundle.discountPercent}% discount!`)
    setIsCartOpen(true)
  }

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(index)
      return
    }
    setCart((prev) => {
      const updated = [...prev]
      updated[index].quantity = quantity
      return updated
    })
  }

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index))
    showToast('Item removed from your bag.')
  }

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed item from your wishlist.')
        return prev.filter((id) => id !== productId)
      } else {
        showToast('Saved item to your wishlist.')
        return [...prev, productId]
      }
    })
  }

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0)

  // Search Results
  const searchResults = searchQuery.trim()
    ? FITCORE_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.workout.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  return (
    <div
      className="fitcore-storefront"
      style={
        customAccentColor
          ? ({ '--fc-accent-crimson': customAccentColor } as React.CSSProperties)
          : undefined
      }
    >
      {/* Header */}
      <FitCoreHeader
        cartCount={cartTotalCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {
          showToast(`You have ${wishlist.length} saved items in your athlete wishlist.`)
          handleNavigateCollection()
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigateHome={handleNavigateHome}
        onNavigateCollection={handleNavigateCollection}
      />

      {/* Main Content Router */}
      <main>
        {viewMode === 'home' && (
          <>
            {/* 1. Hero */}
            <FitCoreHero
              onShopTraining={() => handleNavigateCollection('training')}
              onShopGymWear={() => handleNavigateCollection('strength', 'gym-wear')}
            />

            {/* 2. Shop By Workout */}
            <FitCoreShopByWorkout
              onSelectWorkout={(w) => handleNavigateCollection(w)}
            />

            {/* 3. Training Essentials (Studio Light Section) */}
            <FitCoreTrainingEssentials
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onViewAll={() => handleNavigateCollection('training')}
            />

            {/* 4. Gym Wear (Dark Gym Floor) */}
            <FitCoreGymWear
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onViewAllGymWear={() => handleNavigateCollection(undefined, 'gym-wear')}
            />

            {/* 5. Performance Technology */}
            <FitCorePerformanceTech />

            {/* 6. Workout Equipment */}
            <FitCoreWorkoutEquipment
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onViewAllEquipment={() => handleNavigateCollection(undefined, 'equipment')}
            />

            {/* 7. Complete The Workout (Outfit / Bundle Builder) */}
            <FitCoreCompleteTheWorkout
              onAddBundleToCart={handleAddBundleToCart}
              onSelectProduct={handleSelectProduct}
            />

            {/* 8. Best Sellers (Studio Light Section) */}
            <FitCoreBestSellers
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onViewAllBestSellers={() => handleNavigateCollection()}
            />

            {/* 9. Fitness Stories */}
            <FitCoreFitnessStories />

            {/* 10. Reviews */}
            <FitCoreReviews />

            {/* 11. Newsletter */}
            <FitCoreNewsletter />
          </>
        )}

        {viewMode === 'collection' && (
          <>
            <FitCoreCollectionPage
              initialWorkout={collectionWorkout}
              initialCategory={collectionCategory}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onNavigateHome={handleNavigateHome}
            />
            <FitCoreNewsletter />
          </>
        )}

        {viewMode === 'product' && selectedProduct && (
          <>
            <FitCoreProductPage
              product={selectedProduct}
              onAddToCart={handleAddToCart}
              isWishlisted={wishlist.includes(selectedProduct.id)}
              onToggleWishlist={handleToggleWishlist}
              onNavigateHome={handleNavigateHome}
              onNavigateCollection={handleNavigateCollection}
            />
            <FitCoreReviews />
            <FitCoreNewsletter />
          </>
        )}
      </main>

      {/* 12. Footer */}
      <FitCoreFooter
        onNavigateHome={handleNavigateHome}
        onNavigateCollection={handleNavigateCollection}
      />

      {/* Cart Drawer */}
      <FitCoreCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          alert('FitCore Secure Athlete Checkout: Processing your order with complimentary express shipping.')
        }}
      />

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          className="fitcore-drawer-backdrop"
          onClick={() => {
            setIsSearchOpen(false)
            setSearchQuery('')
          }}
        >
          <div
            style={{
              background: '#11151c',
              border: '1px solid var(--fc-border-dark)',
              borderRadius: '8px',
              maxWidth: '600px',
              width: '90%',
              margin: '80px auto auto',
              padding: '24px',
              boxShadow: '0 20px 50px rgba(0,0,0,0.8)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--fc-font-display)', fontSize: '1.25rem' }}>
                SEARCH FITCORE CATALOG
              </h3>
              <button
                type="button"
                style={{ background: 'none', border: 'none', color: '#cbd5e1', cursor: 'pointer', fontSize: '1.1rem' }}
                onClick={() => {
                  setIsSearchOpen(false)
                  setSearchQuery('')
                }}
              >
                ✕
              </button>
            </div>

            <input
              type="text"
              placeholder="Search gear, tees, barbells, running..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="fitcore-newsletter-input"
              style={{ width: '100%', marginBottom: 16 }}
            />

            {searchQuery && (
              <div style={{ maxHeight: '300px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 10 }}>
                {searchResults.length === 0 ? (
                  <p style={{ color: '#94a3b8', fontSize: '0.88rem' }}>No products found for "{searchQuery}".</p>
                ) : (
                  searchResults.map((product) => (
                    <div
                      key={product.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '8px',
                        background: 'rgba(255,255,255,0.03)',
                        borderRadius: '4px',
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setIsSearchOpen(false)
                        setSearchQuery('')
                        handleSelectProduct(product)
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        style={{ width: 44, height: 44, objectFit: 'cover', borderRadius: 4 }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>{product.name}</div>
                        <div style={{ fontSize: '0.75rem', color: '#ff5247' }}>{product.workout.toUpperCase()}</div>
                      </div>
                      <div style={{ fontWeight: 800, fontFamily: 'var(--fc-font-display)', color: '#fff' }}>
                        ₹{product.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fitcore-toast">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
