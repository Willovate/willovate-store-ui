import React, { useState, useMemo, useEffect } from 'react'
import type {
  DiamondJewelryProduct,
  DiamondCartItem,
  DiamondFilterState,
  DiamondStorefrontProps,
} from './types'
import {
  DIAMOND_HERO_SLIDES,
  DIAMOND_CATEGORIES,
  DIAMOND_PRODUCTS,
  DIAMOND_TESTIMONIALS,
  DIAMOND_VALUE_PILLARS,
} from './data/diamondData'
import './styles/diamondJewelry.css'

export const DiamondJewelryStorefront: React.FC<DiamondStorefrontProps> = ({
  initialView = 'home',
  templateData: _templateData,
  device = 'desktop',
  deviceView,
  onClose: _onClose,
}) => {
  const effectiveDevice = deviceView || device || 'desktop'
  const isMobile = effectiveDevice === 'mobile'

  const [viewMode, setViewMode] = useState<'home' | 'catalog' | 'pdp'>(initialView)
  const [selectedProduct, setSelectedProduct] = useState<DiamondJewelryProduct>(DIAMOND_PRODUCTS[0])
  const [activeHeroSlideIdx, setActiveHeroSlideIdx] = useState<number>(0)

  // Drawers and Modals
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState<boolean>(false)
  const [quickViewProduct, setQuickViewProduct] = useState<DiamondJewelryProduct>(DIAMOND_PRODUCTS[0])
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isRingSizerOpen, setIsRingSizerOpen] = useState<boolean>(false)

  // Cart & Interactions State
  const [cartItems, setCartItems] = useState<DiamondCartItem[]>([
    {
      product: DIAMOND_PRODUCTS[0],
      selectedMetal: '18K Yellow Gold',
      selectedRingSize: 'US 6.5',
      customEngraving: 'Forever Yours',
      quantity: 1,
    },
  ])
  const [wishlistIds, setWishlistIds] = useState<string[]>([DIAMOND_PRODUCTS[1].id])
  const [selectedCardMetals, setSelectedCardMetals] = useState<Record<string, string>>({})
  const [promoCode, setPromoCode] = useState<string>('')
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0)
  const [giftWrap, setGiftWrap] = useState<boolean>(false)

  // PDP Variant State
  const [pdpSelectedMetal, setPdpSelectedMetal] = useState<string>(DIAMOND_PRODUCTS[0].metals[0].name)
  const [pdpSelectedRingSize, setPdpSelectedRingSize] = useState<string>('US 6.5')
  const [pdpSelectedImage, setPdpSelectedImage] = useState<string>(DIAMOND_PRODUCTS[0].images[0])
  const [pdpQty, setPdpQty] = useState<number>(1)
  const [pdpEngraving, setPdpEngraving] = useState<string>('')
  const [pdpAccordion, setPdpAccordion] = useState<'specs' | 'atelier' | 'shipping' | 'warranty'>('specs')

  // Catalog Filter State
  const [filters, setFilters] = useState<DiamondFilterState>({
    category: 'All',
    metal: 'All',
    caratRange: 'All',
    priceRange: [0, 8000],
    inStockOnly: false,
    sortBy: 'featured',
  })

  // Toast feedback
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 2500)
  }

  // Countdown timer for Diamond of the Month
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 })
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return { hours: 24, minutes: 0, seconds: 0 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Cart operations
  const addToCart = (
    product: DiamondJewelryProduct,
    metal: string,
    size?: string,
    engraving?: string,
    qty = 1
  ) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedMetal === metal && i.selectedRingSize === size
      )
      if (idx > -1) {
        const next = [...prev]
        next[idx].quantity += qty
        return next
      }
      return [
        ...prev,
        {
          product,
          selectedMetal: metal,
          selectedRingSize: size,
          customEngraving: engraving,
          quantity: qty,
        },
      ]
    })
    showToast(`Added ${product.name} (${metal}) to bag.`)
    setIsCartOpen(true)
  }

  const updateCartQty = (idx: number, delta: number) => {
    setCartItems((prev) => {
      const next = [...prev]
      const newQty = next[idx].quantity + delta
      if (newQty <= 0) {
        next.splice(idx, 1)
      } else {
        next[idx].quantity = newQty
      }
      return next
    })
  }

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId)
      if (exists) {
        showToast('Removed from wishlist.')
        return prev.filter((id) => id !== productId)
      }
      showToast('Saved to your wishlist.')
      return [...prev, productId]
    })
  }

  const openQuickView = (product: DiamondJewelryProduct) => {
    setQuickViewProduct(product)
    setIsQuickViewOpen(true)
  }

  const openPdp = (product: DiamondJewelryProduct) => {
    setSelectedProduct(product)
    setPdpSelectedMetal(product.metals[0].name)
    setPdpSelectedImage(product.images[0])
    setPdpQty(1)
    setPdpEngraving('')
    setViewMode('pdp')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Filtered Products
  const filteredProducts = useMemo(() => {
    let list = [...DIAMOND_PRODUCTS]
    if (filters.category !== 'All') {
      list = list.filter((p) => p.category === filters.category)
    }
    if (filters.metal !== 'All') {
      list = list.filter((p) => p.metals.some((m) => m.name === filters.metal))
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase()
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.diamondCut.toLowerCase().includes(q)
      )
    }
    if (filters.inStockOnly) {
      list = list.filter((p) => p.stockCount > 0)
    }
    list = list.filter((p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1])

    if (filters.sortBy === 'price-low') list.sort((a, b) => a.price - b.price)
    else if (filters.sortBy === 'price-high') list.sort((a, b) => b.price - a.price)
    else if (filters.sortBy === 'rating') list.sort((a, b) => b.rating - a.rating)

    return list
  }, [filters, searchQuery])

  // Cart math
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0)
  }, [cartItems])
  const finalTotal = Math.max(0, cartSubtotal - appliedDiscount + (giftWrap ? 25 : 0))
  const freeShippingThreshold = 500
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100))

  const currentHeroSlide = DIAMOND_HERO_SLIDES[activeHeroSlideIdx]

  return (
    <div className={`diamond-root ${isMobile ? 'diamond-mobile device-mobile is-mobile' : `diamond-${effectiveDevice}`}`}>
      {/* TOAST POPUP */}
      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#111111',
            color: '#FFFFFF',
            padding: '12px 28px',
            borderRadius: '4px',
            fontSize: 13,
            fontWeight: 600,
            zIndex: 999999,
            borderLeft: '4px solid #C5A880',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          }}
        >
          {toastMsg}
        </div>
      )}

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="dia-announcement-bar">
        <div className="diamond-container dia-announcement-inner">
          <div className="dia-announcement-marquee">
            <span className="dia-gold-sparkle">✨</span>
            <span>FREE INSURED WORLDWIDE EXPRESS SHIPPING ON ORDERS OVER $250</span>
            <span>•</span>
            <span className="dia-gold-sparkle">💎</span>
            <span>GIA & IGI CERTIFIED CONFLICT-FREE DIAMONDS</span>
            <span>•</span>
            <span className="dia-gold-sparkle">📐</span>
            <span>COMPLIMENTARY BESPOKE RING SIZING & ENGRAVING</span>
          </div>
          <div className="dia-announcement-links">
            <button type="button" onClick={() => setIsRingSizerOpen(true)}>
              Ring Sizer Guide
            </button>
            <span style={{ opacity: 0.4 }}>|</span>
            <span>USD ($)</span>
          </div>
        </div>
      </div>

      {/* LUXURY STOREFRONT HEADER */}
      <header className="dia-header">
        <div className="diamond-container">
          <div className="dia-header-inner">
            {/* 1. Mobile Menu Button (Left Column in CSS Grid) */}
            <button
              type="button"
              className="dia-mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              ☰
            </button>

            {/* 2. Brand Logo (Center Column in CSS Grid) */}
            <div
              className="dia-logo"
              onClick={() => {
                setViewMode('home')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <div className="dia-logo-gem">💎</div>
              <div className="dia-logo-text-group">
                <span className="dia-logo-title">Diamond</span>
                <span className="dia-logo-subtitle">Fine Jewelry Atelier</span>
              </div>
            </div>

            {/* Desktop Navigation Menu (hidden on mobile) */}
            <nav className="dia-desktop-nav">
              <span
                className={`dia-nav-link ${viewMode === 'home' ? 'active' : ''}`}
                onClick={() => setViewMode('home')}
              >
                Home
              </span>
              <span
                className={`dia-nav-link ${viewMode === 'catalog' && filters.category === 'All' ? 'active' : ''}`}
                onClick={() => {
                  setFilters((f) => ({ ...f, category: 'All' }))
                  setViewMode('catalog')
                }}
              >
                All Jewels
              </span>
              <span
                className={`dia-nav-link ${viewMode === 'catalog' && filters.category === 'Rings' ? 'active' : ''}`}
                onClick={() => {
                  setFilters((f) => ({ ...f, category: 'Rings' }))
                  setViewMode('catalog')
                }}
              >
                Rings
              </span>
              <span
                className={`dia-nav-link ${viewMode === 'catalog' && filters.category === 'Necklaces' ? 'active' : ''}`}
                onClick={() => {
                  setFilters((f) => ({ ...f, category: 'Necklaces' }))
                  setViewMode('catalog')
                }}
              >
                Necklaces
              </span>
              <span
                className={`dia-nav-link ${viewMode === 'catalog' && filters.category === 'Earrings' ? 'active' : ''}`}
                onClick={() => {
                  setFilters((f) => ({ ...f, category: 'Earrings' }))
                  setViewMode('catalog')
                }}
              >
                Earrings
              </span>
              <span
                className={`dia-nav-link ${viewMode === 'catalog' && filters.category === 'Bracelets' ? 'active' : ''}`}
                onClick={() => {
                  setFilters((f) => ({ ...f, category: 'Bracelets' }))
                  setViewMode('catalog')
                }}
              >
                Bracelets
              </span>
              <span
                className={`dia-nav-link ${viewMode === 'catalog' && filters.category === 'Watches' ? 'active' : ''}`}
                onClick={() => {
                  setFilters((f) => ({ ...f, category: 'Watches' }))
                  setViewMode('catalog')
                }}
              >
                Watches
              </span>
            </nav>

            {/* 3. Header Action Buttons (Right Column in CSS Grid) */}
            <div className="dia-actions">
              <button
                type="button"
                className="dia-action-btn dia-search-btn"
                title="Search Jewelry"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                🔍
              </button>

              <button
                type="button"
                className="dia-action-btn dia-wishlist-btn"
                title="Wishlist"
                onClick={() => setIsWishlistOpen(true)}
              >
                ♥
                {wishlistIds.length > 0 && <span className="dia-badge">{wishlistIds.length}</span>}
              </button>

              <button
                type="button"
                className="dia-action-btn dia-cart-btn"
                title="Shopping Bag"
                onClick={() => setIsCartOpen(true)}
              >
                🛍
                <span className="dia-badge">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* QUICK SEARCH DROPDOWN */}
        {isSearchOpen && (
          <div className="dia-search-bar-wrap">
            <div className="diamond-container">
              <div className="dia-search-inner">
                <input
                  type="text"
                  className="dia-search-input"
                  placeholder={isMobile ? "Search diamonds, rings, pendants..." : "Search certified solitaires, oval cuts, diamond tennis bracelets, luxury watches..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  type="button"
                  className="dia-btn dia-btn-dark"
                  onClick={() => {
                    if (searchQuery.trim()) {
                      setViewMode('catalog')
                      showToast(`Searching for "${searchQuery}"...`)
                    }
                  }}
                >
                  Search
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="dia-drawer-backdrop" onClick={() => setIsMobileMenuOpen(false)}>
          <div
            className="dia-cart-drawer"
            style={{ left: 0, right: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="dia-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22 }}>💎</span>
                <div>
                  <div style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: 18, fontWeight: 700, color: '#111111' }}>
                    Diamond
                  </div>
                  <div style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#9F7E53' }}>
                    Fine Jewelry Atelier
                  </div>
                </div>
              </div>
              <button type="button" className="dia-close-btn" onClick={() => setIsMobileMenuOpen(false)}>
                ✕
              </button>
            </div>

            <div className="dia-drawer-body">
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#9F7E53', marginBottom: 14 }}>
                Atelier Collections
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {[
                  { name: 'Home Atelier', cat: null },
                  { name: 'All Jewelry (Catalog)', cat: 'All' },
                  { name: 'Engagement & Solitaire Rings', cat: 'Rings' },
                  { name: 'Diamond Necklaces & Pendants', cat: 'Necklaces' },
                  { name: 'Brilliant Studs & Earrings', cat: 'Earrings' },
                  { name: 'Tennis Bracelets & Bangles', cat: 'Bracelets' },
                  { name: 'Swiss Luxury Watches', cat: 'Watches' },
                ].map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    style={{
                      width: '100%',
                      padding: '12px 0',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      fontWeight: 600,
                      fontSize: 14.5,
                      cursor: 'pointer',
                      color: '#111111',
                      borderBottom: '1px solid #F5F0EB',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    onClick={() => {
                      if (item.cat === null) {
                        setViewMode('home')
                      } else {
                        setFilters((f) => ({ ...f, category: item.cat as any }))
                        setViewMode('catalog')
                      }
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <span>{item.name}</span>
                    <span style={{ color: '#C5A880' }}>→</span>
                  </button>
                ))}
              </div>

              <div style={{ marginTop: 28, paddingTop: 18, borderTop: '1px solid #EAE3DA' }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.16em', color: '#9F7E53', marginBottom: 12 }}>
                  Client Services
                </div>
                <button
                  type="button"
                  style={{ width: '100%', padding: '10px 0', background: 'none', border: 'none', textAlign: 'left', fontWeight: 600, fontSize: 14, cursor: 'pointer', color: '#111111', display: 'flex', justifyContent: 'space-between' }}
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsRingSizerOpen(true)
                  }}
                >
                  <span>📐 Ring Sizer & 4Cs Guide</span>
                  <span style={{ color: '#C5A880' }}>Open</span>
                </button>
                <button
                  type="button"
                  style={{ width: '100%', padding: '10px 0', background: 'none', border: 'none', textAlign: 'left', fontWeight: 600, fontSize: 14, cursor: 'pointer', color: '#111111', display: 'flex', justifyContent: 'space-between' }}
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsWishlistOpen(true)
                  }}
                >
                  <span>♥ Saved Wishlist</span>
                  <span style={{ fontWeight: 700, color: '#C5A880' }}>{wishlistIds.length} items</span>
                </button>
                <button
                  type="button"
                  style={{ width: '100%', padding: '10px 0', background: 'none', border: 'none', textAlign: 'left', fontWeight: 600, fontSize: 14, cursor: 'pointer', color: '#111111', display: 'flex', justifyContent: 'space-between' }}
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsCartOpen(true)
                  }}
                >
                  <span>🛍 Shopping Bag</span>
                  <span style={{ fontWeight: 700, color: '#C5A880' }}>{cartItems.reduce((acc, i) => acc + i.quantity, 0)} items</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW MODE: HOME
          ========================================================================= */}
      {viewMode === 'home' && (
        <>
          {/* HERO SLIDER SECTION */}
          <section className="dia-hero-section">
            <div
              className="dia-hero-slide"
              style={{ backgroundImage: `url(${currentHeroSlide.bgImage})` }}
            >
              <div className="dia-hero-overlay" />
              <div className="diamond-container">
                <div className="dia-hero-content">
                  <span className="dia-hero-eyebrow">{currentHeroSlide.eyebrow}</span>
                  <h1 className="dia-hero-title">{currentHeroSlide.title}</h1>
                  <p className="dia-hero-subtitle">{currentHeroSlide.subtitle}</p>
                  <div className="dia-hero-actions">
                    <button
                      type="button"
                      className="dia-btn dia-btn-gold"
                      onClick={() => {
                        setFilters((f) => ({ ...f, category: currentHeroSlide.ctaLink as any }))
                        setViewMode('catalog')
                      }}
                    >
                      {currentHeroSlide.ctaText} →
                    </button>
                    <button
                      type="button"
                      className="dia-btn dia-btn-outline"
                      style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.4)' }}
                      onClick={() => setIsRingSizerOpen(true)}
                    >
                      {currentHeroSlide.secondaryCta}
                    </button>
                  </div>
                  <div>
                    <span className="dia-hero-badge-pill">
                      <span>💎</span>
                      <span>{currentHeroSlide.badge}</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* SLIDER CONTROLS */}
            <button
              type="button"
              className="dia-slider-nav-btn dia-slider-prev"
              onClick={() =>
                setActiveHeroSlideIdx((prev) => (prev === 0 ? DIAMOND_HERO_SLIDES.length - 1 : prev - 1))
              }
              aria-label="Previous slide"
            >
              ‹
            </button>
            <button
              type="button"
              className="dia-slider-nav-btn dia-slider-next"
              onClick={() =>
                setActiveHeroSlideIdx((prev) => (prev === DIAMOND_HERO_SLIDES.length - 1 ? 0 : prev + 1))
              }
              aria-label="Next slide"
            >
              ›
            </button>
          </section>

          {/* SHOP BY CATEGORY SECTION */}
          <section className="dia-section">
            <div className="diamond-container">
              <div className="dia-section-header">
                <div className="dia-section-eyebrow">Curated Collections</div>
                <h2 className="dia-section-title">Shop by Jewelry Category</h2>
                <p className="dia-section-desc">
                  Explore bespoke certified solitaires, diamond tennis bracelets, and horological Swiss timepieces.
                </p>
              </div>

              <div className="dia-cat-grid">
                {DIAMOND_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className="dia-cat-card"
                    onClick={() => {
                      setFilters((f) => ({ ...f, category: cat.categoryKey }))
                      setViewMode('catalog')
                    }}
                  >
                    <img src={cat.image} alt={cat.name} className="dia-cat-card-img" />
                    <div className="dia-cat-overlay">
                      <div className="dia-cat-title">{cat.name}</div>
                      <div className="dia-cat-price">{cat.startingPrice} • {cat.itemCount} Pieces</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FEATURED / BESTSELLERS TABBED SECTION */}
          <section className="dia-section" style={{ background: '#FAF8F5' }}>
            <div className="diamond-container">
              <div className="dia-section-header">
                <div className="dia-section-eyebrow">Handcrafted Bestsellers</div>
                <h2 className="dia-section-title">Iconic Diamond Creations</h2>
                <p className="dia-section-desc">
                  Every jewel is sculpted with laser-inscribed GIA / IGI certification and conflict-free provenance.
                </p>
              </div>

              {/* TABS */}
              <div className="dia-catalog-nav">
                {(['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`dia-cat-tab-btn ${filters.category === cat ? 'active' : ''}`}
                    onClick={() => setFilters((f) => ({ ...f, category: cat }))}
                  >
                    {cat === 'All' ? 'All Diamonds' : cat}
                  </button>
                ))}
              </div>

              {/* PRODUCTS GRID */}
              <div className="dia-products-grid">
                {filteredProducts.slice(0, 8).map((product) => {
                  const activeMetal = selectedCardMetals[product.id] || product.metals[0].name
                  return (
                    <article key={product.id} className="dia-product-card">
                      <div className="dia-product-media" onClick={() => openPdp(product)}>
                        <img src={product.images[0]} alt={product.name} className="dia-product-img" />

                        {/* Badges */}
                        <div className="dia-card-badges">
                          {product.isBestSeller && <span className="dia-badge-pill dia-badge-best">Bestseller</span>}
                          {product.isNewDrop && <span className="dia-badge-pill dia-badge-new">New Drop</span>}
                          {product.isGiaCertified && <span className="dia-badge-pill dia-badge-gia">GIA Certified</span>}
                        </div>

                        {/* Quick Action Buttons */}
                        <div className="dia-card-quick-actions" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            className="dia-card-action-btn"
                            title="Quick View"
                            onClick={() => openQuickView(product)}
                          >
                            👁
                          </button>
                          <button
                            type="button"
                            className="dia-card-action-btn"
                            title="Save to Wishlist"
                            style={{ color: wishlistIds.includes(product.id) ? '#C5A880' : 'inherit' }}
                            onClick={() => toggleWishlist(product.id)}
                          >
                            {wishlistIds.includes(product.id) ? '♥' : '♡'}
                          </button>
                        </div>
                      </div>

                      <div className="dia-product-body">
                        <div className="dia-product-specs-row">
                          <span>{product.caratWeight} • {product.diamondCut}</span>
                          <span>★ {product.rating}</span>
                        </div>

                        <h3 className="dia-product-title" onClick={() => openPdp(product)}>
                          {product.name}
                        </h3>

                        {/* Metal Swatches */}
                        <div className="dia-product-metals">
                          {product.metals.map((metal) => (
                            <span
                              key={metal.name}
                              className={`dia-metal-dot ${activeMetal === metal.name ? 'active' : ''}`}
                              style={{ backgroundColor: metal.hex }}
                              title={metal.name}
                              onClick={() =>
                                setSelectedCardMetals((prev) => ({ ...prev, [product.id]: metal.name }))
                              }
                            />
                          ))}
                          <span style={{ fontSize: 11, color: '#736B63', marginLeft: 4 }}>
                            {activeMetal.split(' ')[0]}
                          </span>
                        </div>

                        <div className="dia-product-footer">
                          <div className="dia-price-group">
                            <span className="dia-price">${product.price.toLocaleString()}</span>
                            {product.compareAtPrice > product.price && (
                              <span className="dia-compare-price">${product.compareAtPrice.toLocaleString()}</span>
                            )}
                          </div>

                          <button
                            type="button"
                            className="dia-add-btn"
                            onClick={() => addToCart(product, activeMetal, 'US 6.5', undefined, 1)}
                          >
                            Add to Bag
                          </button>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>

              <div style={{ textAlign: 'center', marginTop: 44 }}>
                <button
                  type="button"
                  className="dia-btn dia-btn-dark"
                  onClick={() => {
                    setFilters((f) => ({ ...f, category: 'All' }))
                    setViewMode('catalog')
                  }}
                >
                  View Complete Atelier Catalog ({DIAMOND_PRODUCTS.length} Pieces) →
                </button>
              </div>
            </div>
          </section>

          {/* DIAMOND OF THE MONTH SPOTLIGHT (COUNTDOWN) */}
          <section
            style={{
              background: '#111111',
              color: '#FFFFFF',
              padding: '60px 0',
              borderTop: '1px solid rgba(197, 168, 128, 0.3)',
              borderBottom: '1px solid rgba(197, 168, 128, 0.3)',
            }}
          >
            <div className="diamond-container">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: 30,
                }}
              >
                <div>
                  <div style={{ color: '#C5A880', fontSize: 12, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 8 }}>
                    💎 Limited Solitaire Spotlight
                  </div>
                  <h2 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: 32, margin: '0 0 10px 0' }}>
                    The Imperial 3.50ct Cushion Cut Solitaire
                  </h2>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, margin: 0, maxWidth: 500 }}>
                    Rare D-Flawless clarity with bespoke platinum split-shank mounting. Exclusive reservation window closes soon.
                  </p>
                </div>

                {/* COUNTDOWN BOXES */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                  {[
                    { label: 'Hours', val: timeLeft.hours },
                    { label: 'Minutes', val: timeLeft.minutes },
                    { label: 'Seconds', val: timeLeft.seconds },
                  ].map((unit) => (
                    <div
                      key={unit.label}
                      style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(197, 168, 128, 0.4)',
                        padding: '14px 18px',
                        borderRadius: 4,
                        textAlign: 'center',
                        minWidth: 72,
                      }}
                    >
                      <div style={{ fontFamily: 'Cinzel, serif', fontSize: 28, fontWeight: 700, color: '#C5A880' }}>
                        {String(unit.val).padStart(2, '0')}
                      </div>
                      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'rgba(255,255,255,0.6)' }}>
                        {unit.label}
                      </div>
                    </div>
                  ))}

                  <button
                    type="button"
                    className="dia-btn dia-btn-gold"
                    style={{ marginLeft: 10 }}
                    onClick={() => openPdp(DIAMOND_PRODUCTS[0])}
                  >
                    Reserve Piece →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* CRAFTSMANSHIP / ATELIER STORY SPLIT SECTION */}
          <section className="dia-craft-section">
            <div className="diamond-container">
              <div className="dia-craft-grid">
                <div className="dia-craft-image-wrap">
                  <img
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1000&auto=format&fit=crop&q=80"
                    alt="Diamond Craftsmanship"
                    className="dia-craft-image"
                  />
                  <div className="dia-craft-floating-card">
                    <div style={{ fontSize: 24, marginBottom: 4 }}>🔬</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#111111' }}>
                      Place Vendôme Master Cutters
                    </div>
                    <div style={{ fontSize: 11, color: '#736B63', marginTop: 4 }}>
                      Over 40 hours of hand-sculpting per individual solitaire setting.
                    </div>
                  </div>
                </div>

                <div className="dia-craft-content">
                  <div className="dia-section-eyebrow">The Atelier Legacy</div>
                  <h2>Master Craftsmen, Uncompromising Ethics</h2>
                  <p>
                    Every stone in the Diamond WorkDo collection is hand-selected by our GIA-accredited gemologists. We adhere strictly to the Kimberley Process, casting solely from 100% recycled 18K solid gold and 950 platinum.
                  </p>

                  <div className="dia-craft-pillars">
                    <div className="dia-craft-pillar-item">
                      <span className="dia-pillar-icon">💎</span>
                      <div>
                        <div className="dia-pillar-title">Triple-Zero Ideal Cut</div>
                        <div className="dia-pillar-sub">Maximal light return, fire and brilliance.</div>
                      </div>
                    </div>
                    <div className="dia-craft-pillar-item">
                      <span className="dia-pillar-icon">🛡️</span>
                      <div>
                        <div className="dia-pillar-title">Laser Inscribed Dossier</div>
                        <div className="dia-pillar-sub">Unique certificate number on the girdle.</div>
                      </div>
                    </div>
                    <div className="dia-craft-pillar-item">
                      <span className="dia-pillar-icon">🌿</span>
                      <div>
                        <div className="dia-pillar-title">Conflict-Free Provenance</div>
                        <div className="dia-pillar-sub">Ethically mined and sustainable lab stones.</div>
                      </div>
                    </div>
                    <div className="dia-craft-pillar-item">
                      <span className="dia-pillar-icon">📐</span>
                      <div>
                        <div className="dia-pillar-title">Lifetime Ring Sizing</div>
                        <div className="dia-pillar-sub">Complimentary adjustments and polish.</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: 14 }}>
                    <button
                      type="button"
                      className="dia-btn dia-btn-dark"
                      onClick={() => setIsRingSizerOpen(true)}
                    >
                      Interactive 4Cs Guide →
                    </button>
                    <button
                      type="button"
                      className="dia-btn dia-btn-outline"
                      onClick={() => {
                        setFilters((f) => ({ ...f, category: 'Rings' }))
                        setViewMode('catalog')
                      }}
                    >
                      View Solitaire Rings
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* VALUE TRUST PILLARS BAR */}
          <section className="dia-pillars-bar">
            <div className="diamond-container">
              <div className="dia-pillars-grid">
                {DIAMOND_VALUE_PILLARS.map((pillar) => (
                  <div key={pillar.title} className="dia-pillar-card">
                    <span className="dia-pillar-card-icon">{pillar.icon}</span>
                    <h3 className="dia-pillar-card-title">{pillar.title}</h3>
                    <p className="dia-pillar-card-desc">{pillar.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* VERIFIED TESTIMONIALS */}
          <section className="dia-testimonials-section">
            <div className="diamond-container">
              <div className="dia-section-header">
                <div className="dia-section-eyebrow">Client Privileges</div>
                <h2 className="dia-section-title">Verified Atelier Testimonials</h2>
                <p className="dia-section-desc">
                  Stories from clients who celebrated life's most precious milestones with Diamond WorkDo.
                </p>
              </div>

              <div className="dia-testi-grid">
                {DIAMOND_TESTIMONIALS.map((t) => (
                  <div key={t.id} className="dia-testi-card">
                    <div className="dia-testi-stars">★★★★★</div>
                    <blockquote className="dia-testi-quote">"{t.quote}"</blockquote>
                    <div>
                      <div className="dia-testi-author">{t.clientName}</div>
                      <div className="dia-testi-city">{t.city} • Verified Client</div>
                      <div className="dia-testi-piece">Purchased: {t.purchasedPiece}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* =========================================================================
          VIEW MODE: CATALOG (ALL JEWELS)
          ========================================================================= */}
      {viewMode === 'catalog' && (
        <section className="dia-section" style={{ minHeight: '80vh' }}>
          <div className="diamond-container">
            {/* BREADCRUMB */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#736B63', marginBottom: 24 }}>
              <span style={{ cursor: 'pointer', color: '#111111', fontWeight: 600 }} onClick={() => setViewMode('home')}>
                Home
              </span>
              <span>/</span>
              <span>Catalog</span>
              <span>/</span>
              <span style={{ color: '#C5A880', fontWeight: 700 }}>{filters.category}</span>
            </div>

            {/* CATALOG HEADER & FILTER TABS */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 30 }}>
              <div>
                <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 36, margin: '0 0 6px 0' }}>
                  {filters.category === 'All' ? 'Fine Diamond Jewelry Catalog' : `${filters.category} Collection`}
                </h1>
                <p style={{ color: '#736B63', fontSize: 14, margin: 0 }}>
                  Showing {filteredProducts.length} certified handcrafted pieces
                </p>
              </div>

              {/* SORT & METAL FILTER DROPDOWNS */}
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <select
                  value={filters.metal}
                  onChange={(e) => setFilters((f) => ({ ...f, metal: e.target.value as any }))}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 4,
                    border: '1px solid #EAE3DA',
                    fontSize: 13,
                    fontFamily: 'Jost, sans-serif',
                    background: '#FFFFFF',
                    outline: 'none',
                  }}
                >
                  <option value="All">All Metals</option>
                  <option value="18K Yellow Gold">18K Yellow Gold</option>
                  <option value="18K White Gold">18K White Gold</option>
                  <option value="18K Rose Gold">18K Rose Gold</option>
                  <option value="Platinum 950">Platinum 950</option>
                </select>

                <select
                  value={filters.sortBy}
                  onChange={(e) => setFilters((f) => ({ ...f, sortBy: e.target.value as any }))}
                  style={{
                    padding: '10px 16px',
                    borderRadius: 4,
                    border: '1px solid #EAE3DA',
                    fontSize: 13,
                    fontFamily: 'Jost, sans-serif',
                    background: '#FFFFFF',
                    outline: 'none',
                  }}
                >
                  <option value="featured">Featured Pieces</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* CATEGORY FILTER CHIPS */}
            <div className="dia-catalog-nav" style={{ justifyContent: 'flex-start', marginBottom: 32 }}>
              {(['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches'] as const).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`dia-cat-tab-btn ${filters.category === cat ? 'active' : ''}`}
                  onClick={() => setFilters((f) => ({ ...f, category: cat }))}
                >
                  {cat === 'All' ? 'All Jewels' : cat}
                </button>
              ))}
            </div>

            {/* PRODUCTS GRID */}
            {filteredProducts.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px 0' }}>
                <div style={{ fontSize: 44, marginBottom: 12 }}>💎</div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 22 }}>No jewels match your active filters</h3>
                <p style={{ color: '#736B63', fontSize: 14 }}>Try resetting your search query or metal filter.</p>
                <button
                  type="button"
                  className="dia-btn dia-btn-dark"
                  onClick={() => {
                    setFilters({
                      category: 'All',
                      metal: 'All',
                      caratRange: 'All',
                      priceRange: [0, 8000],
                      inStockOnly: false,
                      sortBy: 'featured',
                    })
                    setSearchQuery('')
                  }}
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="dia-products-grid">
                {filteredProducts.map((product) => {
                  const activeMetal = selectedCardMetals[product.id] || product.metals[0].name
                  return (
                    <article key={product.id} className="dia-product-card">
                      <div className="dia-product-media" onClick={() => openPdp(product)}>
                        <img src={product.images[0]} alt={product.name} className="dia-product-img" />

                        <div className="dia-card-badges">
                          {product.isBestSeller && <span className="dia-badge-pill dia-badge-best">Bestseller</span>}
                          {product.isNewDrop && <span className="dia-badge-pill dia-badge-new">New Drop</span>}
                          {product.isGiaCertified && <span className="dia-badge-pill dia-badge-gia">GIA Certified</span>}
                        </div>

                        <div className="dia-card-quick-actions" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            className="dia-card-action-btn"
                            title="Quick View"
                            onClick={() => openQuickView(product)}
                          >
                            👁
                          </button>
                          <button
                            type="button"
                            className="dia-card-action-btn"
                            title="Save to Wishlist"
                            style={{ color: wishlistIds.includes(product.id) ? '#C5A880' : 'inherit' }}
                            onClick={() => toggleWishlist(product.id)}
                          >
                            {wishlistIds.includes(product.id) ? '♥' : '♡'}
                          </button>
                        </div>
                      </div>

                      <div className="dia-product-body">
                        <div className="dia-product-specs-row">
                          <span>{product.caratWeight} • {product.diamondCut}</span>
                          <span>★ {product.rating}</span>
                        </div>

                        <h3 className="dia-product-title" onClick={() => openPdp(product)}>
                          {product.name}
                        </h3>

                        <div className="dia-product-metals">
                          {product.metals.map((metal) => (
                            <span
                              key={metal.name}
                              className={`dia-metal-dot ${activeMetal === metal.name ? 'active' : ''}`}
                              style={{ backgroundColor: metal.hex }}
                              title={metal.name}
                              onClick={() =>
                                setSelectedCardMetals((prev) => ({ ...prev, [product.id]: metal.name }))
                              }
                            />
                          ))}
                          <span style={{ fontSize: 11, color: '#736B63', marginLeft: 4 }}>
                            {activeMetal.split(' ')[0]}
                          </span>
                        </div>

                        <div className="dia-product-footer">
                          <div className="dia-price-group">
                            <span className="dia-price">${product.price.toLocaleString()}</span>
                            {product.compareAtPrice > product.price && (
                              <span className="dia-compare-price">${product.compareAtPrice.toLocaleString()}</span>
                            )}
                          </div>

                          <button
                            type="button"
                            className="dia-add-btn"
                            onClick={() => addToCart(product, activeMetal, 'US 6.5', undefined, 1)}
                          >
                            Add to Bag
                          </button>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* =========================================================================
          VIEW MODE: PDP (PRODUCT DETAIL PAGE)
          ========================================================================= */}
      {viewMode === 'pdp' && (
        <section className="dia-section">
          <div className="diamond-container">
            {/* BREADCRUMB */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#736B63', marginBottom: 28 }}>
              <span style={{ cursor: 'pointer', color: '#111111', fontWeight: 600 }} onClick={() => setViewMode('home')}>
                Home
              </span>
              <span>/</span>
              <span
                style={{ cursor: 'pointer', color: '#111111', fontWeight: 600 }}
                onClick={() => {
                  setFilters((f) => ({ ...f, category: selectedProduct.category }))
                  setViewMode('catalog')
                }}
              >
                {selectedProduct.category}
              </span>
              <span>/</span>
              <span style={{ color: '#C5A880', fontWeight: 700 }}>{selectedProduct.name}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 0.9fr', gap: isMobile ? 30 : 60, alignItems: 'start' }}>
              {/* PDP GALLERY */}
              <div>
                <div style={{ width: '100%', height: isMobile ? 320 : 540, background: '#FAF8F5', borderRadius: 4, overflow: 'hidden', border: '1px solid #EAE3DA' }}>
                  <img
                    src={pdpSelectedImage}
                    alt={selectedProduct.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                {/* THUMBNAILS */}
                <div style={{ display: 'flex', gap: 12, marginTop: 14 }}>
                  {selectedProduct.images.map((img, i) => (
                    <div
                      key={img}
                      style={{
                        width: 76,
                        height: 76,
                        borderRadius: 4,
                        overflow: 'hidden',
                        cursor: 'pointer',
                        border: pdpSelectedImage === img ? '2px solid #C5A880' : '1px solid #EAE3DA',
                      }}
                      onClick={() => setPdpSelectedImage(img)}
                    >
                      <img src={img} alt={`Thumb ${i + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>

              {/* PDP INFO PANE */}
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9F7E53' }}>
                    {selectedProduct.caratWeight} • {selectedProduct.diamondCut}
                  </span>
                  {selectedProduct.isGiaCertified && (
                    <span style={{ fontSize: 10, fontWeight: 700, background: '#111111', color: '#FFFFFF', padding: '2px 6px', borderRadius: 2 }}>
                      GIA Verified
                    </span>
                  )}
                </div>

                <h1 style={{ fontFamily: 'Cinzel, Georgia, serif', fontSize: isMobile ? 26 : 34, margin: '0 0 12px 0', lineHeight: 1.2 }}>
                  {selectedProduct.name}
                </h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
                  <span style={{ fontSize: 24, fontWeight: 700, color: '#111111' }}>
                    ${selectedProduct.price.toLocaleString()}
                  </span>
                  {selectedProduct.compareAtPrice > selectedProduct.price && (
                    <span style={{ fontSize: 16, color: '#736B63', textDecoration: 'line-through' }}>
                      ${selectedProduct.compareAtPrice.toLocaleString()}
                    </span>
                  )}
                  <span style={{ fontSize: 12, color: '#059669', fontWeight: 600, background: '#ecfdf5', padding: '3px 8px', borderRadius: 4 }}>
                    Save ${(selectedProduct.compareAtPrice - selectedProduct.price).toLocaleString()}
                  </span>
                </div>

                <p style={{ color: '#736B63', fontSize: 14.5, lineHeight: 1.6, marginBottom: 24 }}>
                  {selectedProduct.description}
                </p>

                {/* METAL SELECTOR */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
                    Precious Metal: <span style={{ color: '#C5A880' }}>{pdpSelectedMetal}</span>
                  </label>
                  <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                    {selectedProduct.metals.map((m) => (
                      <button
                        key={m.name}
                        type="button"
                        style={{
                          padding: '10px 16px',
                          borderRadius: 4,
                          border: pdpSelectedMetal === m.name ? '2px solid #C5A880' : '1px solid #EAE3DA',
                          background: pdpSelectedMetal === m.name ? '#FAF8F5' : '#FFFFFF',
                          fontWeight: 600,
                          fontSize: 13,
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                        }}
                        onClick={() => setPdpSelectedMetal(m.name)}
                      >
                        <span style={{ width: 12, height: 12, borderRadius: '50%', background: m.hex, display: 'inline-block' }} />
                        <span>{m.name}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* RING SIZE SELECTOR (IF RINGS) */}
                {selectedProduct.category === 'Rings' && (
                  <div style={{ marginBottom: 20 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                      <label style={{ fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                        Ring Size (US): <span style={{ color: '#C5A880' }}>{pdpSelectedRingSize}</span>
                      </label>
                      <button
                        type="button"
                        style={{ background: 'none', border: 'none', fontSize: 11, color: '#9F7E53', textDecoration: 'underline', cursor: 'pointer' }}
                        onClick={() => setIsRingSizerOpen(true)}
                      >
                        Size Guide
                      </button>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {['US 5.0', 'US 5.5', 'US 6.0', 'US 6.5', 'US 7.0', 'US 7.5', 'US 8.0'].map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          style={{
                            width: 58,
                            height: 38,
                            borderRadius: 4,
                            border: pdpSelectedRingSize === sz ? '2px solid #C5A880' : '1px solid #EAE3DA',
                            background: pdpSelectedRingSize === sz ? '#111111' : '#FFFFFF',
                            color: pdpSelectedRingSize === sz ? '#FFFFFF' : '#111111',
                            fontWeight: 600,
                            fontSize: 12,
                            cursor: 'pointer',
                          }}
                          onClick={() => setPdpSelectedRingSize(sz)}
                        >
                          {sz.replace('US ', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* COMPLIMENTARY ENGRAVING INPUT */}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 6 }}>
                    Complimentary Atelier Laser Engraving (Max 18 chars)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Forever Yours 10.24"
                    maxLength={18}
                    value={pdpEngraving}
                    onChange={(e) => setPdpEngraving(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: 4,
                      border: '1px solid #EAE3DA',
                      fontFamily: 'Jost, sans-serif',
                      fontSize: 13,
                      outline: 'none',
                    }}
                  />
                </div>

                {/* QUANTITY & ADD TO BAG */}
                <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 24 }}>
                  <div style={{ display: 'flex', border: '1px solid #EAE3DA', borderRadius: 4, overflow: 'hidden' }}>
                    <button
                      type="button"
                      style={{ width: 38, height: 46, background: '#FAF8F5', border: 'none', cursor: 'pointer', fontSize: 16 }}
                      onClick={() => setPdpQty((q) => Math.max(1, q - 1))}
                    >
                      -
                    </button>
                    <span style={{ width: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 600, fontSize: 14 }}>
                      {pdpQty}
                    </span>
                    <button
                      type="button"
                      style={{ width: 38, height: 46, background: '#FAF8F5', border: 'none', cursor: 'pointer', fontSize: 16 }}
                      onClick={() => setPdpQty((q) => q + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="dia-btn dia-btn-gold"
                    style={{ flex: 1, height: 46 }}
                    onClick={() =>
                      addToCart(selectedProduct, pdpSelectedMetal, pdpSelectedRingSize, pdpEngraving, pdpQty)
                    }
                  >
                    Add to Bag • ${(selectedProduct.price * pdpQty).toLocaleString()}
                  </button>

                  <button
                    type="button"
                    className="dia-action-btn"
                    style={{ width: 46, height: 46 }}
                    title="Wishlist"
                    onClick={() => toggleWishlist(selectedProduct.id)}
                  >
                    {wishlistIds.includes(selectedProduct.id) ? '♥' : '♡'}
                  </button>
                </div>

                {/* ACCORDIONS */}
                <div style={{ borderTop: '1px solid #EAE3DA', marginTop: 24 }}>
                  {[
                    { id: 'specs', title: 'Gemstone & Diamond Specifications' },
                    { id: 'atelier', title: 'Atelier Craftsmanship & Ethics' },
                    { id: 'shipping', title: 'Insured White-Glove Shipping & Returns' },
                    { id: 'warranty', title: 'Lifetime Cleaning & Warranty' },
                  ].map((acc) => (
                    <div key={acc.id} style={{ borderBottom: '1px solid #EAE3DA' }}>
                      <button
                        type="button"
                        style={{
                          width: '100%',
                          padding: '14px 0',
                          background: 'none',
                          border: 'none',
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          fontWeight: 700,
                          fontSize: 13.5,
                          cursor: 'pointer',
                          textAlign: 'left',
                          color: '#111111',
                        }}
                        onClick={() => setPdpAccordion(acc.id as any)}
                      >
                        <span>{acc.title}</span>
                        <span>{pdpAccordion === acc.id ? '−' : '+'}</span>
                      </button>

                      {pdpAccordion === acc.id && (
                        <div style={{ paddingBottom: 16, fontSize: 13, color: '#736B63', lineHeight: 1.7 }}>
                          {acc.id === 'specs' && (
                            <ul style={{ paddingLeft: 18, margin: 0 }}>
                              <li>Center Stone: {selectedProduct.caratWeight} ({selectedProduct.diamondCut})</li>
                              <li>Color Grade: {selectedProduct.diamondColor}</li>
                              <li>Clarity: {selectedProduct.diamondClarity}</li>
                              <li>Certification: {selectedProduct.isGiaCertified ? 'GIA Verified Dossier' : 'Atelier Certified'}</li>
                              {selectedProduct.details.map((d) => (
                                <li key={d}>{d}</li>
                              ))}
                            </ul>
                          )}
                          {acc.id === 'atelier' && (
                            <p style={{ margin: 0 }}>
                              Cast in solid 18K recycled gold and 950 platinum in our Place Vendôme workshop. Meets all certified Kimberley conflict-free sourcing requirements.
                            </p>
                          )}
                          {acc.id === 'shipping' && (
                            <p style={{ margin: 0 }}>
                              Complimentary armored courier delivery with signed handoff. Insured for 100% replacement value. 30-day return window with complimentary returns.
                            </p>
                          )}
                          {acc.id === 'warranty' && (
                            <p style={{ margin: 0 }}>
                              Includes annual prong inspection, sonic ultrasonic cleaning, and complimentary re-rhodium dipping for the entire lifetime of ownership.
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          SLIDE-OVER SHOPPING BAG CART DRAWER
          ========================================================================= */}
      {isCartOpen && (
        <div className="dia-drawer-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="dia-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="dia-drawer-header">
              <h3 className="dia-drawer-title">
                Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>
              <button type="button" className="dia-close-btn" onClick={() => setIsCartOpen(false)}>
                ✕
              </button>
            </div>

            {/* FREE SHIPPING PROGRESS */}
            <div className="dia-free-ship-bar">
              {cartSubtotal >= freeShippingThreshold ? (
                <div style={{ fontWeight: 700, color: '#059669' }}>
                  🎉 You have unlocked Free Insured Armored Delivery!
                </div>
              ) : (
                <div>
                  Add <strong>${(freeShippingThreshold - cartSubtotal).toLocaleString()}</strong> more to unlock Free Insured Courier Delivery.
                </div>
              )}
              <div className="dia-ship-meter">
                <div className="dia-ship-progress" style={{ width: `${freeShippingProgress}%` }} />
              </div>
            </div>

            <div className="dia-drawer-body">
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#736B63' }}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>🛍</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#111111' }}>Your bag is currently empty</div>
                  <p style={{ fontSize: 13, marginTop: 4 }}>Discover our certified diamond solitaires</p>
                  <button
                    type="button"
                    className="dia-btn dia-btn-gold"
                    style={{ marginTop: 14 }}
                    onClick={() => {
                      setIsCartOpen(false)
                      setViewMode('catalog')
                    }}
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {cartItems.map((item, idx) => (
                    <div
                      key={`${item.product.id}-${item.selectedMetal}-${item.selectedRingSize}-${idx}`}
                      style={{
                        display: 'flex',
                        gap: 14,
                        paddingBottom: 16,
                        borderBottom: '1px solid #EAE3DA',
                      }}
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        style={{ width: 74, height: 74, objectFit: 'cover', borderRadius: 4, background: '#FAF8F5' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <h4 style={{ margin: 0, fontSize: 14, fontWeight: 700, color: '#111111' }}>
                            {item.product.name}
                          </h4>
                          <button
                            type="button"
                            style={{ background: 'none', border: 'none', color: '#736B63', cursor: 'pointer', fontSize: 14 }}
                            onClick={() => updateCartQty(idx, -item.quantity)}
                          >
                            ✕
                          </button>
                        </div>
                        <div style={{ fontSize: 11.5, color: '#9F7E53', marginTop: 2 }}>
                          {item.selectedMetal} {item.selectedRingSize ? `• ${item.selectedRingSize}` : ''}
                        </div>
                        {item.customEngraving && (
                          <div style={{ fontSize: 11, color: '#736B63', fontStyle: 'italic', marginTop: 2 }}>
                            Engraved: "{item.customEngraving}"
                          </div>
                        )}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
                          <div style={{ display: 'flex', border: '1px solid #EAE3DA', borderRadius: 2 }}>
                            <button
                              type="button"
                              style={{ width: 24, height: 26, background: 'none', border: 'none', cursor: 'pointer' }}
                              onClick={() => updateCartQty(idx, -1)}
                            >
                              -
                            </button>
                            <span style={{ width: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 600 }}>
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              style={{ width: 24, height: 26, background: 'none', border: 'none', cursor: 'pointer' }}
                              onClick={() => updateCartQty(idx, 1)}
                            >
                              +
                            </button>
                          </div>
                          <div style={{ fontWeight: 700, fontSize: 14 }}>
                            ${(item.product.price * item.quantity).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="dia-drawer-footer">
                {/* PROMO CODE */}
                <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
                  <input
                    type="text"
                    placeholder="Promo code (e.g. DIAMOND100)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      borderRadius: 4,
                      border: '1px solid #EAE3DA',
                      fontSize: 12,
                      fontFamily: 'Jost, sans-serif',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="button"
                    style={{
                      padding: '8px 14px',
                      background: '#111111',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: 4,
                      fontSize: 11,
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      if (promoCode.trim().toUpperCase() === 'DIAMOND100') {
                        setAppliedDiscount(100)
                        showToast('Applied $100 Atelier VIP discount!')
                      } else {
                        showToast('Invalid promo code. Use DIAMOND100')
                      }
                    }}
                  >
                    Apply
                  </button>
                </div>

                {/* GIFT WRAP CHECKBOX */}
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: '#111111', marginBottom: 16, cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={giftWrap}
                    onChange={(e) => setGiftWrap(e.target.checked)}
                  />
                  <span>Add Velvet Lacquer Box & Hand-Waxed Gift Wrap (+$25)</span>
                </label>

                {/* SUBTOTAL ROW */}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#736B63', marginBottom: 6 }}>
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toLocaleString()}</span>
                </div>
                {appliedDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#059669', marginBottom: 6 }}>
                    <span>VIP Promotion</span>
                    <span>-${appliedDiscount}</span>
                  </div>
                )}
                {giftWrap && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#736B63', marginBottom: 6 }}>
                    <span>Gift Wrap</span>
                    <span>+$25</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 18, fontWeight: 700, color: '#111111', marginBottom: 18, paddingTop: 8, borderTop: '1px solid #EAE3DA' }}>
                  <span>Total</span>
                  <span>${finalTotal.toLocaleString()}</span>
                </div>

                <button
                  type="button"
                  className="dia-btn dia-btn-gold"
                  style={{ width: '100%', padding: '14px 0' }}
                  onClick={() => {
                    showToast('Directing to Encrypted Checkout...')
                    setTimeout(() => setIsCartOpen(false), 1200)
                  }}
                >
                  Proceed to Secure Checkout →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          SLIDE-OVER WISHLIST DRAWER
          ========================================================================= */}
      {isWishlistOpen && (
        <div className="dia-drawer-backdrop" onClick={() => setIsWishlistOpen(false)}>
          <div className="dia-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="dia-drawer-header">
              <h3 className="dia-drawer-title">Saved Wishlist ({wishlistIds.length})</h3>
              <button type="button" className="dia-close-btn" onClick={() => setIsWishlistOpen(false)}>
                ✕
              </button>
            </div>

            <div className="dia-drawer-body">
              {wishlistIds.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#736B63' }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>♡</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#111111' }}>Your wishlist is empty</div>
                  <p style={{ fontSize: 13, marginTop: 4 }}>Save your dream solitaires and diamond heirlooms</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {DIAMOND_PRODUCTS.filter((p) => wishlistIds.includes(p.id)).map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        gap: 14,
                        paddingBottom: 16,
                        borderBottom: '1px solid #EAE3DA',
                      }}
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 4, background: '#FAF8F5' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <h4 style={{ margin: 0, fontSize: 13.5, fontWeight: 700, color: '#111111' }}>
                            {item.name}
                          </h4>
                          <button
                            type="button"
                            style={{ background: 'none', border: 'none', color: '#736B63', cursor: 'pointer' }}
                            onClick={() => toggleWishlist(item.id)}
                          >
                            ✕
                          </button>
                        </div>
                        <div style={{ fontSize: 11, color: '#9F7E53', marginTop: 2 }}>
                          {item.caratWeight} • {item.diamondCut}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                          <span style={{ fontWeight: 700, fontSize: 14 }}>
                            ${item.price.toLocaleString()}
                          </span>
                          <button
                            type="button"
                            className="dia-btn dia-btn-dark"
                            style={{ padding: '6px 12px', fontSize: 11 }}
                            onClick={() => {
                              addToCart(item, item.metals[0].name, 'US 6.5', undefined, 1)
                              toggleWishlist(item.id)
                            }}
                          >
                            Move to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          QUICK VIEW MODAL
          ========================================================================= */}
      {isQuickViewOpen && (
        <div className="dia-modal-backdrop" onClick={() => setIsQuickViewOpen(false)}>
          <div className="dia-quickview-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              style={{
                position: 'absolute',
                top: 18,
                right: 18,
                background: 'none',
                border: 'none',
                fontSize: 22,
                cursor: 'pointer',
                color: '#111111',
              }}
              onClick={() => setIsQuickViewOpen(false)}
            >
              ✕
            </button>

            <div className="dia-quickview-layout">
              <div>
                <img
                  src={quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  style={{ width: '100%', height: 360, objectFit: 'cover', borderRadius: 4, background: '#FAF8F5' }}
                />
              </div>

              <div>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#9F7E53', marginBottom: 4 }}>
                  {quickViewProduct.caratWeight} • {quickViewProduct.diamondCut}
                </div>
                <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 22, margin: '0 0 10px 0' }}>
                  {quickViewProduct.name}
                </h3>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#111111', marginBottom: 14 }}>
                  ${quickViewProduct.price.toLocaleString()}
                </div>
                <p style={{ color: '#736B63', fontSize: 13.5, lineHeight: 1.6, marginBottom: 20 }}>
                  {quickViewProduct.description}
                </p>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    type="button"
                    className="dia-btn dia-btn-gold"
                    style={{ flex: 1 }}
                    onClick={() => {
                      addToCart(quickViewProduct, quickViewProduct.metals[0].name, 'US 6.5', undefined, 1)
                      setIsQuickViewOpen(false)
                    }}
                  >
                    Add to Bag
                  </button>
                  <button
                    type="button"
                    className="dia-btn dia-btn-outline"
                    onClick={() => {
                      setIsQuickViewOpen(false)
                      openPdp(quickViewProduct)
                    }}
                  >
                    Full Details →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          INTERACTIVE RING SIZER & 4CS EDUCATIONAL MODAL
          ========================================================================= */}
      {isRingSizerOpen && (
        <div className="dia-modal-backdrop" onClick={() => setIsRingSizerOpen(false)}>
          <div className="dia-quickview-modal" style={{ maxWidth: 650 }} onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              style={{ position: 'absolute', top: 18, right: 18, background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#111111' }}
              onClick={() => setIsRingSizerOpen(false)}
            >
              ✕
            </button>

            <div style={{ textAlign: 'center', marginBottom: 24 }}>
              <span style={{ fontSize: 32 }}>📐</span>
              <h3 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, margin: '8px 0 6px 0' }}>
                Atelier Ring Sizer & 4Cs Guide
              </h3>
              <p style={{ color: '#736B63', fontSize: 13.5, margin: 0 }}>
                Measure your inner band diameter or reference international sizing standard.
              </p>
            </div>

            <div style={{ background: '#FAF8F5', borderRadius: 4, padding: 18, marginBottom: 20, border: '1px solid #EAE3DA' }}>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#9F7E53' }}>
                International Ring Conversion Table
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, fontSize: 12, textAlign: 'center' }}>
                <div style={{ fontWeight: 700 }}>US / Canada</div>
                <div style={{ fontWeight: 700 }}>UK / Aus</div>
                <div style={{ fontWeight: 700 }}>EU / ISO</div>
                <div style={{ fontWeight: 700 }}>Diameter (mm)</div>

                <div>5.0</div><div>J ½</div><div>49 mm</div><div>15.7 mm</div>
                <div>6.0</div><div>L ½</div><div>51.5 mm</div><div>16.5 mm</div>
                <div>6.5</div><div>M ½</div><div>53 mm</div><div>16.9 mm</div>
                <div>7.0</div><div>N ½</div><div>54 mm</div><div>17.3 mm</div>
                <div>8.0</div><div>P ½</div><div>57 mm</div><div>18.1 mm</div>
              </div>
            </div>

            <div style={{ fontSize: 13, color: '#736B63', lineHeight: 1.6 }}>
              <strong>Complimentary Sizing Guarantee:</strong> Every ring ordered from Diamond WorkDo includes a complimentary physical stainless steel sizing kit and free lifetime resizing adjustments.
            </div>

            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <button
                type="button"
                className="dia-btn dia-btn-dark"
                onClick={() => setIsRingSizerOpen(false)}
              >
                Got It, Return to Atelier
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          LUXURY FOOTER
          ========================================================================= */}
      <footer className="dia-footer">
        <div className="diamond-container">
          <div className="dia-footer-grid">
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{ fontSize: 24 }}>💎</span>
                <span style={{ fontFamily: 'Cinzel, serif', fontSize: 22, fontWeight: 700, color: '#FFFFFF', letterSpacing: '0.1em' }}>
                  DIAMOND
                </span>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13.5, lineHeight: 1.7, maxWidth: 360, margin: '0 0 20px 0' }}>
                Haute joaillerie atelier sculpting certified solitaires, recycled 18K solid gold heirlooms, and Swiss automatic diamond chronographs since 1988.
              </p>
              <div style={{ fontSize: 12, color: '#C5A880', fontWeight: 600 }}>
                12 Place Vendôme, 75001 Paris • 745 Fifth Avenue, New York
              </div>
            </div>

            <div>
              <h4 className="dia-footer-title">High Jewelry</h4>
              <ul className="dia-footer-links">
                <li><a href="#rings" onClick={(e) => { e.preventDefault(); setFilters((f) => ({ ...f, category: 'Rings' })); setViewMode('catalog') }}>Solitaire Rings</a></li>
                <li><a href="#necklaces" onClick={(e) => { e.preventDefault(); setFilters((f) => ({ ...f, category: 'Necklaces' })); setViewMode('catalog') }}>Diamond Pendants</a></li>
                <li><a href="#earrings" onClick={(e) => { e.preventDefault(); setFilters((f) => ({ ...f, category: 'Earrings' })); setViewMode('catalog') }}>Brilliant Studs</a></li>
                <li><a href="#bracelets" onClick={(e) => { e.preventDefault(); setFilters((f) => ({ ...f, category: 'Bracelets' })); setViewMode('catalog') }}>Tennis Bracelets</a></li>
                <li><a href="#watches" onClick={(e) => { e.preventDefault(); setFilters((f) => ({ ...f, category: 'Watches' })); setViewMode('catalog') }}>Swiss Timepieces</a></li>
              </ul>
            </div>

            <div>
              <h4 className="dia-footer-title">Client Services</h4>
              <ul className="dia-footer-links">
                <li><a href="#sizer" onClick={(e) => { e.preventDefault(); setIsRingSizerOpen(true) }}>Ring Sizer Guide</a></li>
                <li><a href="#4cs" onClick={(e) => { e.preventDefault(); setIsRingSizerOpen(true) }}>GIA 4Cs Education</a></li>
                <li><a href="#bespoke" onClick={(e) => { e.preventDefault(); showToast('Bespoke Atelier Concierge: concierge@diamond-workdo.com') }}>Bespoke Commission</a></li>
                <li><a href="#cleaning" onClick={(e) => { e.preventDefault(); showToast('Complimentary cleaning included with all pieces.') }}>Lifetime Care</a></li>
                <li><a href="#shipping" onClick={(e) => { e.preventDefault(); showToast('Insured global express delivery on all orders.') }}>Armored Shipping</a></li>
              </ul>
            </div>

            <div>
              <h4 className="dia-footer-title">Diamond VIP Club</h4>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13, marginBottom: 12 }}>
                Receive private previews of rare stone acquisitions and $100 off your inaugural bespoke solitaire.
              </p>
              <div style={{ display: 'flex', gap: 6 }}>
                <input
                  type="email"
                  placeholder="Enter private email"
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: 4,
                    border: '1px solid rgba(255,255,255,0.2)',
                    background: 'rgba(255,255,255,0.08)',
                    color: '#FFFFFF',
                    fontSize: 12.5,
                    fontFamily: 'Jost, sans-serif',
                    outline: 'none',
                  }}
                />
                <button
                  type="button"
                  className="dia-btn dia-btn-gold"
                  style={{ padding: '10px 18px', fontSize: 11 }}
                  onClick={() => showToast('Welcome to the Diamond Atelier Inner Circle.')}
                >
                  Join
                </button>
              </div>
            </div>
          </div>

          <div className="dia-footer-bottom">
            <div>
              © 2026 Diamond WorkDo Fine Jewelry Atelier. Inspired by diamond-workdo.myshopify.com. All rights reserved.
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              <span>GIA Certified</span>
              <span>•</span>
              <span>Kimberley Conflict-Free</span>
              <span>•</span>
              <span>100% Recycled Precious Metals</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DiamondJewelryStorefront
