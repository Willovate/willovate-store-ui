import React, { useEffect, useState } from 'react'
import type { PeakActivity, PeakCartItem, PeakProduct, PeakProductColor } from './types'
import { PEAK_PRODUCTS } from './data/peakData'
import { PeakAdventureStories } from './components/PeakAdventureStories'
import { PeakBestSellers } from './components/PeakBestSellers'
import { PeakBuiltForElements } from './components/PeakBuiltForElements'
import { PeakCartDrawer } from './components/PeakCartDrawer'
import { PeakCollectionPage } from './components/PeakCollectionPage'
import { PeakExploreActivity } from './components/PeakExploreActivity'
import { PeakFooter } from './components/PeakFooter'
import { PeakHeader } from './components/PeakHeader'
import { PeakHero } from './components/PeakHero'
import { PeakNewArrivals } from './components/PeakNewArrivals'
import { PeakNewsletter } from './components/PeakNewsletter'
import { PeakOutdoorEssentials } from './components/PeakOutdoorEssentials'
import { PeakProductPage } from './components/PeakProductPage'
import { PeakReviews } from './components/PeakReviews'
import { PeakTrailPicks } from './components/PeakTrailPicks'
import './styles/PeakStorefront.css'

export interface PeakStorefrontProps {
  onBack?: () => void
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string
}

const PEAK_ACTIVITIES: PeakActivity[] = ['hiking', 'trekking', 'camping', 'cycling', 'trail-running']
const PEAK_CATEGORIES = ['outdoor-clothing', 'footwear', 'accessories', 'equipment', 'backpacks']

export const PeakStorefront: React.FC<PeakStorefrontProps> = ({
  onBack: _onBack,
  deviceView = 'desktop',
  customAccentColor,
}) => {
  const [viewMode, setViewMode] = useState<'home' | 'collection' | 'product'>('home')
  const [selectedProduct, setSelectedProduct] = useState<PeakProduct | null>(null)
  const [collectionActivity, setCollectionActivity] = useState<string | undefined>()
  const [collectionCategory, setCollectionCategory] = useState<string | undefined>()
  const [cart, setCart] = useState<PeakCartItem[]>([])
  const [wishlist, setWishlist] = useState<string[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [toastMessage, setToastMessage] = useState('')

  useEffect(() => {
    if (!toastMessage) return
    const timeoutId = window.setTimeout(() => setToastMessage(''), 2800)
    return () => window.clearTimeout(timeoutId)
  }, [toastMessage])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [viewMode, selectedProduct])

  const handleNavigateHome = () => {
    setViewMode('home')
    setSelectedProduct(null)
    setCollectionActivity(undefined)
    setCollectionCategory(undefined)
  }

  const handleNavigateCollection = (filter?: string) => {
    const normalizedFilter = filter?.toLowerCase().replace(/\s+/g, '-')
    const selectedActivity = PEAK_ACTIVITIES.find((activity) => activity === normalizedFilter)
    setCollectionActivity(selectedActivity)
    setCollectionCategory(
      normalizedFilter && PEAK_CATEGORIES.includes(normalizedFilter)
        ? normalizedFilter
        : undefined,
    )
    setSelectedProduct(null)
    setViewMode('collection')
  }

  const handleSelectProduct = (product: PeakProduct) => {
    setSelectedProduct(product)
    setViewMode('product')
  }

  const handleSelectActivity = (activity: PeakActivity) => {
    setCollectionActivity(activity)
    setCollectionCategory(undefined)
    setSelectedProduct(null)
    setViewMode('collection')
  }

  const handleAddToCart = (
    product: PeakProduct,
    size: string,
    color: PeakProductColor,
  ) => {
    setCart((previousCart) => {
      const matchingItem = previousCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name,
      )
      if (matchingItem >= 0) {
        return previousCart.map((item, index) =>
          index === matchingItem ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...previousCart, { product, quantity: 1, selectedSize: size, selectedColor: color }]
    })
    setToastMessage(`${product.name} added to your expedition pack.`)
    setIsCartOpen(true)
  }

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) {
      setCart((previousCart) => previousCart.filter((_, itemIndex) => itemIndex !== index))
      return
    }
    setCart((previousCart) =>
      previousCart.map((item, itemIndex) =>
        itemIndex === index ? { ...item, quantity } : item,
      ),
    )
  }

  const handleRemoveItem = (index: number) => {
    setCart((previousCart) => previousCart.filter((_, itemIndex) => itemIndex !== index))
  }

  const handleToggleWishlist = (productId: string) => {
    setWishlist((previousWishlist) =>
      previousWishlist.includes(productId)
        ? previousWishlist.filter((id) => id !== productId)
        : [...previousWishlist, productId],
    )
  }

  const searchResults = searchQuery.trim()
    ? PEAK_PRODUCTS.filter((product) =>
        `${product.name} ${product.activity} ${product.category}`
          .toLowerCase()
          .includes(searchQuery.trim().toLowerCase()),
      )
    : []
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0)

  return (
    <div
      className="peak-storefront"
      data-device-view={deviceView}
      style={
        customAccentColor
          ? ({ '--pk-accent-moss': customAccentColor } as React.CSSProperties)
          : undefined
      }
    >
      <PeakHeader
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => {
          setSearchQuery('')
          setIsSearchOpen(true)
        }}
        onOpenWishlist={() => handleNavigateCollection()}
        onNavigateHome={handleNavigateHome}
        onNavigateCollection={handleNavigateCollection}
      />

      <main>
        {viewMode === 'home' && (
          <>
            <PeakHero
              onExploreOutdoor={() => handleNavigateCollection()}
              onExploreActivity={(activity) =>
                handleNavigateCollection(activity)
              }
            />
            <PeakExploreActivity onSelectActivity={handleSelectActivity} />
            <PeakOutdoorEssentials onSelectCategory={handleNavigateCollection} />
            <PeakBestSellers
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onViewAll={() => handleNavigateCollection()}
            />
            <PeakBuiltForElements />
            <PeakNewArrivals
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onViewAll={() => handleNavigateCollection()}
            />
            <PeakTrailPicks
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onViewAll={() => handleNavigateCollection()}
            />
            <PeakAdventureStories />
            <PeakReviews />
            <PeakNewsletter />
          </>
        )}

        {viewMode === 'collection' && (
          <PeakCollectionPage
            key={`${collectionActivity || 'all'}-${collectionCategory || 'all'}`}
            initialActivity={collectionActivity}
            initialCategory={collectionCategory}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            wishlist={wishlist}
            onToggleWishlist={handleToggleWishlist}
            onNavigateHome={handleNavigateHome}
          />
        )}

        {viewMode === 'product' && selectedProduct && (
          <PeakProductPage
            key={selectedProduct.id}
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            isWishlisted={wishlist.includes(selectedProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            onNavigateHome={handleNavigateHome}
            onNavigateCollection={handleNavigateCollection}
          />
        )}
      </main>

      <PeakFooter
        onNavigateHome={handleNavigateHome}
        onNavigateCollection={handleNavigateCollection}
      />

      <PeakCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => setToastMessage('Your expedition checkout is ready.')}
      />

      {isSearchOpen && (
        <div
          className="pk-search-backdrop"
          onClick={() => setIsSearchOpen(false)}
          role="presentation"
        >
          <section
            className="pk-search-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="pk-search-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="pk-search-dialog-header">
              <h2 id="pk-search-title">Find your next adventure</h2>
              <button type="button" onClick={() => setIsSearchOpen(false)} aria-label="Close search">
                ×
              </button>
            </div>
            <input
              autoFocus
              className="pk-search-dialog-input"
              type="search"
              placeholder="Search packs, footwear, camping gear..."
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
            />
            <div className="pk-search-results">
              {searchQuery.trim() &&
                (searchResults.length ? (
                  searchResults.map((product) => (
                    <button
                      className="pk-search-result"
                      key={product.id}
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false)
                        handleSelectProduct(product)
                      }}
                    >
                      <img src={product.image} alt="" />
                      <span>
                        <strong>{product.name}</strong>
                        <small>
                          {product.activity.replace('-', ' ')} · {product.category.replace('-', ' ')}
                        </small>
                      </span>
                      <b>₹{product.price.toLocaleString('en-IN')}</b>
                    </button>
                  ))
                ) : (
                  <p className="pk-search-empty">No expedition gear matched that search.</p>
                ))}
            </div>
          </section>
        </div>
      )}

      {toastMessage && <div className="pk-toast" role="status">{toastMessage}</div>}
    </div>
  )
}
