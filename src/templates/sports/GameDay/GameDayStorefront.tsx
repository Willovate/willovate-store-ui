import React, { useState, useEffect } from 'react'
import type { GameDayProduct, GameDayProductColor, GameDaySport, GameDayCartItem } from './types'
import { GAMEDAY_PRODUCTS } from './data/gameDayData'

import { GameDayHeader } from './components/GameDayHeader'
import { GameDayHero } from './components/GameDayHero'
import { GameDayChooseSport } from './components/GameDayChooseSport'
import { GameDayJerseyCollection } from './components/GameDayJerseyCollection'
import { GameDayFanEssentials } from './components/GameDayFanEssentials'
import { GameDayTrendingProducts } from './components/GameDayTrendingProducts'
import { GameDayNewDrops } from './components/GameDayNewDrops'
import { GameDayLimitedEdition } from './components/GameDayLimitedEdition'
import { GameDayMatchStories } from './components/GameDayMatchStories'
import { GameDayFanReviews } from './components/GameDayFanReviews'
import { GameDayNewsletter } from './components/GameDayNewsletter'
import { GameDayFooter } from './components/GameDayFooter'
import { GameDayProductPage } from './components/GameDayProductPage'
import { GameDayCollectionPage } from './components/GameDayCollectionPage'
import { GameDayCartDrawer } from './components/GameDayCartDrawer'

import './styles/GameDayStorefront.css'

export interface GameDayStorefrontProps {
  onBack?: () => void
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string
}

export const GameDayStorefront: React.FC<GameDayStorefrontProps> = ({
  onBack: _onBack,
  deviceView: _deviceView = 'desktop',
  customAccentColor,
}) => {
  const [viewMode, setViewMode] = useState<'home' | 'collection' | 'product'>('home')
  const [selectedProduct, setSelectedProduct] = useState<GameDayProduct | null>(null)
  const [collectionSport, setCollectionSport] = useState<GameDaySport | undefined>(undefined)

  // Seed cart with a jersey already in bag for demo immersion
  const [cart, setCart] = useState<GameDayCartItem[]>([
    {
      product: GAMEDAY_PRODUCTS[0], // FC Barcelona Home Jersey
      quantity: 1,
      selectedSize: 'L',
      selectedColor: GAMEDAY_PRODUCTS[0].colors[0],
      customName: 'YAMAL',
      customNumber: '19',
    },
  ])

  const [wishlist, setWishlist] = useState<string[]>(['gd-cr-01', 'gd-bb-01'])
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

  // Navigation
  const handleNavigateHome = () => {
    setViewMode('home')
    setSelectedProduct(null)
    setCollectionSport(undefined)
  }

  const handleNavigateCollection = (sport?: string) => {
    setCollectionSport(sport as GameDaySport | undefined)
    setSelectedProduct(null)
    setViewMode('collection')
  }

  const handleSelectProduct = (product: GameDayProduct) => {
    setSelectedProduct(product)
    setViewMode('product')
  }

  // Cart
  const handleAddToCart = (
    product: GameDayProduct,
    size: string,
    color: GameDayProductColor,
    customName?: string,
    customNumber?: string,
  ) => {
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor.name === color.name &&
          item.customName === customName &&
          item.customNumber === customNumber,
      )
      if (existingIdx > -1) {
        const updated = [...prev]
        updated[existingIdx].quantity += 1
        return updated
      }
      return [
        ...prev,
        { product, quantity: 1, selectedSize: size, selectedColor: color, customName, customNumber },
      ]
    })
    const nameLabel = customName ? ` (#${customNumber} ${customName})` : ''
    showToast(`Added ${product.name}${nameLabel} to your kit bag.`)
    setIsCartOpen(true)
  }

  const handleUpdateQuantity = (index: number, quantity: number) => {
    if (quantity <= 0) { handleRemoveItem(index); return }
    setCart((prev) => {
      const updated = [...prev]
      updated[index].quantity = quantity
      return updated
    })
  }

  const handleRemoveItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
    showToast('Item removed from kit bag.')
  }

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from your wishlist.')
        return prev.filter((id) => id !== productId)
      }
      showToast('Saved to your wishlist.')
      return [...prev, productId]
    })
  }

  const cartCount = cart.reduce((a, i) => a + i.quantity, 0)

  // Search
  const searchResults = searchQuery.trim()
    ? GAMEDAY_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.sport.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (p.teamName?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false),
      )
    : []

  return (
    <div
      className="gameday-storefront"
      style={customAccentColor ? ({ '--gd-gold': customAccentColor } as React.CSSProperties) : undefined}
    >
      <GameDayHeader
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => {
          showToast(`You have ${wishlist.length} saved items in your wishlist.`)
          handleNavigateCollection()
        }}
        onNavigateHome={handleNavigateHome}
        onNavigateCollection={handleNavigateCollection}
      />

      <main>
        {/* ── HOME VIEW ── */}
        {viewMode === 'home' && (
          <>
            <GameDayHero
              onShopFanGear={() => handleNavigateCollection('fan-gear')}
              onExploreJerseys={() => handleNavigateCollection('jersey')}
            />

            <GameDayChooseSport
              onSelectSport={(sport) => handleNavigateCollection(sport)}
            />

            <GameDayJerseyCollection
              onSelectProduct={handleSelectProduct}
            />

            <GameDayFanEssentials
              onSelectCategory={(id) => handleNavigateCollection(id)}
            />

            <GameDayTrendingProducts
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onViewAll={() => handleNavigateCollection()}
            />

            <GameDayNewDrops
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
            />

            <GameDayLimitedEdition
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
            />

            <GameDayMatchStories />

            <GameDayFanReviews />

            <GameDayNewsletter />
          </>
        )}

        {/* ── COLLECTION VIEW ── */}
        {viewMode === 'collection' && (
          <>
            <GameDayCollectionPage
              initialSport={collectionSport}
              onSelectProduct={handleSelectProduct}
              onAddToCart={handleAddToCart}
              wishlist={wishlist}
              onToggleWishlist={handleToggleWishlist}
              onNavigateHome={handleNavigateHome}
            />
            <GameDayNewsletter />
          </>
        )}

        {/* ── PRODUCT VIEW ── */}
        {viewMode === 'product' && selectedProduct && (
          <>
            <GameDayProductPage
              product={selectedProduct}
              onAddToCart={handleAddToCart}
              isWishlisted={wishlist.includes(selectedProduct.id)}
              onToggleWishlist={handleToggleWishlist}
              onNavigateHome={handleNavigateHome}
              onNavigateCollection={handleNavigateCollection}
            />
            <GameDayFanReviews />
            <GameDayNewsletter />
          </>
        )}
      </main>

      <GameDayFooter
        onNavigateHome={handleNavigateHome}
        onNavigateCollection={handleNavigateCollection}
      />

      {/* Cart Drawer */}
      <GameDayCartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={() => {
          alert('GameDay Secure Checkout: Processing your order with express matchday delivery.')
        }}
      />

      {/* Search Modal */}
      {isSearchOpen && (
        <div
          className="gd-drawer-backdrop"
          style={{ justifyContent: 'center', alignItems: 'flex-start' }}
          onClick={() => { setIsSearchOpen(false); setSearchQuery('') }}
        >
          <div
            style={{
              background: 'var(--gd-bg-dark)',
              border: '1px solid var(--gd-border-dark)',
              borderRadius: '12px',
              maxWidth: '600px',
              width: '90%',
              margin: '80px auto auto',
              padding: '24px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--gd-font-display)', fontSize: '1.2rem', fontWeight: 900, textTransform: 'uppercase' }}>
                SEARCH GAMEDAY
              </h3>
              <button
                style={{ background: 'none', border: 'none', color: 'var(--gd-text-muted)', cursor: 'pointer', fontSize: '1.1rem' }}
                onClick={() => { setIsSearchOpen(false); setSearchQuery('') }}
              >
                ✕
              </button>
            </div>

            <input
              type="text"
              placeholder="Search jerseys, scarves, teams..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="gd-newsletter-input"
              style={{ width: '100%', marginBottom: 16 }}
            />

            {searchQuery && (
              <div style={{ maxHeight: '320px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {searchResults.length === 0 ? (
                  <p style={{ color: 'var(--gd-text-muted)', fontSize: '0.85rem' }}>No products found for "{searchQuery}".</p>
                ) : (
                  searchResults.map((product) => (
                    <div
                      key={product.id}
                      style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px', background: 'var(--gd-bg-surface)', borderRadius: '6px', cursor: 'pointer' }}
                      onClick={() => { setIsSearchOpen(false); setSearchQuery(''); handleSelectProduct(product) }}
                    >
                      <img src={product.image} alt={product.name} style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 4 }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gd-text-white)' }}>{product.name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--gd-gold)' }}>{product.sport.toUpperCase()}</div>
                      </div>
                      <div style={{ fontFamily: 'var(--gd-font-display)', fontWeight: 900, color: 'var(--gd-text-white)' }}>
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

      {/* Toast */}
      {toastMessage && (
        <div className="gd-toast">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
