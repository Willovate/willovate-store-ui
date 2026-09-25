import React, { useState, useEffect } from 'react'
import type { PeakProduct, PeakProductColor, PeakCartItem, PeakActivity } from './types'
import { PEAK_PRODUCTS } from './data/peakData'

import { PeakHeader } from './components/PeakHeader'
import { PeakHero } from './components/PeakHero'
import { PeakExploreActivity } from './components/PeakExploreActivity'
import { PeakOutdoorEssentials } from './components/PeakOutdoorEssentials'
import { PeakBuiltForElements } from './components/PeakBuiltForElements'
import { PeakTrailPicks } from './components/PeakTrailPicks'
import { PeakAdventureStories } from './components/PeakAdventureStories'
import { PeakNewArrivals } from './components/PeakNewArrivals'
import { PeakBestSellers } from './components/PeakBestSellers'
import { PeakReviews } from './components/PeakReviews'
import { PeakNewsletter } from './components/PeakNewsletter'
import { PeakFooter } from './components/PeakFooter'
import { PeakProductPage } from './components/PeakProductPage'
import { PeakCollectionPage } from './components/PeakCollectionPage'
import { PeakCartDrawer } from './components/PeakCartDrawer'

import './styles/PeakStorefront.css'

export interface PeakStorefrontProps {
  onBack?: () => void
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string
}

export const PeakStorefront: React.FC<PeakStorefrontProps> = ({
  onBack: _onBack,
  deviceView: _deviceView = 'desktop',
  customAccentColor,
}) => {
  const [viewMode, setViewMode] = useState<'home' | 'collection' | 'product'>('home')
  const [selectedProduct, setSelectedProduct] = useState<PeakProduct | null>(null)
  const [collectionActivity, setCollectionActivity] = useState<string | undefined>(undefined)
  const [collectionCategory, setCollectionCategory] = useState<string | undefined>(undefined)

  // Seeded cart with Summit Ridge pack
  const [cart, setCart] = useState<PeakCartItem[]>([
    {
      product: PEAK_PRODUCTS[0],
      quantity: 1,
      selectedSize: 'M/L',
      selectedColor: PEAK_PRODUCTS[0].colors[0],
    },
  ])

  const [wishlist, setWishlist] = useState<string[]>(['pk-oc-01', 'pk-cp-01'])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => setToastMessage(msg)

  useEffect(() => {
    if (!toastMessage) return
    const t = setTimeout(() => setToastMessage(null), 3000)
    return () => clearTimeout(t)
  }, [toastMessage])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [viewMode, selectedProduct])

  // Navigation handlers
  const handleNavigateHome = () => {
    setViewMode('home')
    setSelectedProduct(null)
    setCollectionActivity(undefined)
    setCollectionCategory(undefined)
  }

  const handleNavigateCollection = (filterKey?: string) => {
    // Check if it matches an activity
    const isActivity = ['hiking', 'trekking', 'camping', 'cycling', 'trail-running'].includes(
      filterKey || ''
    )
    if (isActivity) {
      setCollectionActivity(filterKey)
      setCollectionCategory(undefined)
    } else {
      setCollectionActivity(undefined)
      setCollectionCategory(filterKey)
    }
    setSelectedProduct(null)
    setViewMode('collection')
  }

  const handleSelectProduct = (product: PeakProduct) => {
    setSelectedProduct(product)
    setViewMode('product')
  }

  const handleAddToCart = (
    product: PeakProduct,
    size: string,
    color: PeakProductColor
  ) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name
      )
      if (idx > -1) {
        const copy = [...prev]
        copy[idx].quantity += 1
        return copy
      }
      return [...prev, { product, quantity: 1, selectedSize: size, selectedColor: color }]
    })
    showToast(`Added ${product.name} to your Expedition Pack.`)
    setIsCartOpen(true)
  }

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(index)
      return
    }
    setCart((prev) => {
      const copy = [...prev]
      copy[index].quantity = quantity
      return copy
    })
  }

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
    showToast('Item removed from expedition pack.')
  }

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from trail wishlist.')
        return prev.filter((id) => id !== productId)
      }
      showToast('Saved to trail wishlist.')
      return [...prev, productId]
    })
  }

  const cartCount = cart.reduce((a, b) => a + b.quantity, 0)

  // Search filter
  const searchResults = searchQuery.trim()
    ? PEAK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.activity.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  return (
    <div
      className="peak-storefront"
      style={
        customAccentColor
          ? ({ '--pk-accent-pine': customAccentColor, '--pk-accent-moss': customAccentColor } as React.CSSProperties)
          : undefined
      }
    >
      <PeakHeader
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => {
          showToast(`You have ${wishlist.length} items saved in your expedition wishlist.`)
          handleNavigateCollection()
        }}
        onNavigateHome={handleNavigateHome}
        onNavigateCollection={handleNavigateCollection}
      />

      <main>
        {/* HOME VIEW */}
        {viewMode === 'home' && (
          <>
            <PeakHero
              onExploreOutdoor={() => handleNavigateCollection()}
              onExploreActivity={(act) => handleNavigateCollection(act)}
            />

            <PeakExploreActivity
              onSelectActivity={(act: PeakActivity) => handleNavigateCollection(act)}
            />

            <PeakOutdoorEssentials
              onSelectCategory={(cat) => handleNavigateCollection(cat)}
            />

            <PeakBuiltForElements />

            <PeakTrailPicks
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onViewAll={() => handleNavigateCollection()}
            />

            <PeakAdventureStories />

            <PeakNewArrivals
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onViewAll={() => handleNavigateCollection()}
            />

            <PeakBestSellers
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onViewAll={() => handleNavigateCollection()}
            />

            <PeakReviews />

            <PeakNewsletter />
          </>
        )}

        {/* COLLECTION VIEW */}
        {viewMode === 'collection' && (
          <>
            <PeakCollectionPage
              initialActivity={collectionActivity}
              initialCategory={collectionCategory}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onNavigateHome={handleNavigateHome}
            />
            <PeakNewsletter />
          </>
        )}

        {/* PRODUCT VIEW */}
        {viewMode === 'product' && selectedProduct && (
          <>
            <PeakProductPage
              product={selectedProduct}
              onAddToCart={handleAddToCart}
              isWishlisted={wishlist.includes(selectedProduct.id)}
              onToggleWishlist={handleToggleWishlist}
              onNavigateHome={handleNavigateHome}
              onNavigateCollection={handleNavigateCollection}
            />
            <PeakReviews />
            <PeakNewsletter />
          </>
        )}
      </main>

      <PeakFooter
        onNavigateHome={handleNavigateHome}
        onNavigateCollection={handleNavigateCollection}
      />

      {/* Cart Drawer */}
      <PeakCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          alert('Peak Trail Checkout: Expediting your mountain gear dispatch.')
        }}
      />

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          className="pk-drawer-backdrop"
          style={{ justifyContent: 'center', alignItems: 'flex-start' }}
          onClick={() => {
            setIsSearchOpen(false)
            setSearchQuery('')
          }}
        >
          <div
            style={{
              background: 'var(--pk-snow)',
              border: '1px solid var(--pk-border-light)',
              borderRadius: '12px',
              maxWidth: '620px',
              width: '92%',
              margin: '80px auto auto',
              padding: '28px',
              boxShadow: 'var(--pk-shadow-deep)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '16px',
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontFamily: 'var(--pk-font-display)',
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'var(--pk-text-dark)',
                }}
              >
                SEARCH EXPEDITION GEAR
              </h3>
              <button
                type="button"
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '1.1rem',
                  color: 'var(--pk-stone-muted)',
                  cursor: 'pointer',
                }}
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
              placeholder="Search shells, boots, packs, tents, merino..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="pk-newsletter-input"
              style={{
                width: '100%',
                background: 'var(--pk-cream-alt)',
                color: 'var(--pk-text-dark)',
                borderColor: 'var(--pk-border-light)',
                marginBottom: '16px',
              }}
            />

            {searchQuery && (
              <div
                style={{
                  maxHeight: '320px',
                  overflowY: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {searchResults.length === 0 ? (
                  <p style={{ color: 'var(--pk-stone-muted)', fontSize: '0.85rem' }}>
                    No outdoor gear matched "{searchQuery}".
                  </p>
                ) : (
                  searchResults.map((product) => (
                    <div
                      key={product.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px',
                        background: 'var(--pk-cream-alt)',
                        borderRadius: '6px',
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
                        style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 4 }}
                      />
                      <div style={{ flex: 1 }}>
                        <div
                          style={{
                            fontSize: '0.85rem',
                            fontWeight: 700,
                            color: 'var(--pk-text-dark)',
                          }}
                        >
                          {product.name}
                        </div>
                        <div
                          style={{
                            fontSize: '0.7rem',
                            color: 'var(--pk-accent-moss)',
                            fontFamily: 'var(--pk-font-label)',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                          }}
                        >
                          {product.activity} · {product.category}
                        </div>
                      </div>
                      <div
                        style={{
                          fontFamily: 'var(--pk-font-display)',
                          fontWeight: 700,
                          color: 'var(--pk-text-dark)',
                        }}
                      >
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
        <div className="pk-toast">
          <span>🌲</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
