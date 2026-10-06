import React, { useState, useMemo } from 'react'
import type {
  BaggoProduct,
  BaggoCartItem,
  BaggoFilterState,
  BaggoStorefrontProps,
  BagCategory,
} from './types'
import {
  BAGGO_HERO_SLIDES,
  BAGGO_COLLECTIONS,
  BAGGO_PRODUCTS,
  BAGGO_TESTIMONIALS,
  BAGGO_BRAND_LOGOS,
  BAGGO_VALUE_PILLARS,
} from './data/baggoData'
import './styles/baggoFashion.css'

export const BaggoFashionStorefront: React.FC<BaggoStorefrontProps> = ({
  initialView = 'home',
  templateData: _templateData,
  device = 'desktop',
  deviceView,
  onClose: _onClose,
}) => {
  const effectiveDevice = deviceView || device || 'desktop'
  const isMobile = effectiveDevice === 'mobile'
  const [viewMode, setViewMode] = useState<'home' | 'collection' | 'pdp'>(initialView)
  const [selectedProduct, setSelectedProduct] = useState<BaggoProduct>(BAGGO_PRODUCTS[0])
  const [activeHeroSlideIdx, setActiveHeroSlideIdx] = useState<number>(0)
  const [activeTestiIdx, setActiveTestiIdx] = useState<number>(0)

  // Drawers and Modals
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState<boolean>(false)
  const [quickViewProduct, setQuickViewProduct] = useState<BaggoProduct>(BAGGO_PRODUCTS[0])
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Monogram customizer state
  const [monogramInitials, setMonogramInitials] = useState<string>('JM')

  // Cart & Interactions
  const [cartItems, setCartItems] = useState<BaggoCartItem[]>([
    {
      product: BAGGO_PRODUCTS[0],
      selectedColor: 'Saddle Walnut',
      monogramInitials: 'JM',
      quantity: 1,
    },
  ])
  const [wishlistIds, setWishlistIds] = useState<string[]>([BAGGO_PRODUCTS[0].id])
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [selectedCardColors, setSelectedCardColors] = useState<Record<string, string>>({})

  // PDP Variant State
  const [pdpSelectedImage, setPdpSelectedImage] = useState<string>(BAGGO_PRODUCTS[0].image)
  const [pdpSelectedColor, setPdpSelectedColor] = useState<string>(BAGGO_PRODUCTS[0].colors[0]?.name || 'Saddle Walnut')
  const [pdpMonogram, setPdpMonogram] = useState<string>('')
  const [pdpQty, setPdpQty] = useState<number>(1)
  const [pdpAccordion, setPdpAccordion] = useState<'features' | 'leather' | 'dimensions' | 'warranty'>('features')

  // Collection Filters State
  const [filters, setFilters] = useState<BaggoFilterState>({
    category: 'All',
    leatherType: 'All',
    priceRange: [0, 800],
    inStockOnly: false,
    sortBy: 'featured',
  })

  // Toast feedback
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 2500)
  }

  // Cart Handlers
  const addToCart = (product: BaggoProduct, color: string, initials?: string, quantity = 1) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedColor === color && item.monogramInitials === initials
      )
      if (idx > -1) {
        const next = [...prev]
        next[idx].quantity += quantity
        return next
      }
      return [...prev, { product, selectedColor: color, monogramInitials: initials, quantity }]
    })
    showToast(`Added "${product.name}" (${color}) to Bag!`)
    setIsCartOpen(true)
  }

  const updateCartQty = (idx: number, delta: number) => {
    setCartItems((prev) => {
      const next = [...prev]
      next[idx].quantity += delta
      if (next[idx].quantity <= 0) {
        return next.filter((_, i) => i !== idx)
      }
      return next
    })
  }

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, it) => acc + it.product.price * it.quantity, 0).toFixed(2)
  }, [cartItems])

  const toggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(id)
      const prod = BAGGO_PRODUCTS.find((p) => p.id === id)
      const name = prod ? prod.name : 'Leather bag'
      if (exists) {
        showToast(`Removed "${name}" from wishlist`)
        return prev.filter((x) => x !== id)
      }
      showToast(`Saved "${name}" to wishlist ♥`)
      return [...prev, id]
    })
  }

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      const exists = prev.includes(id)
      if (exists) {
        return prev.filter((x) => x !== id)
      }
      if (prev.length >= 3) {
        showToast('You can compare at most 3 bags')
        return prev
      }
      showToast('Added to bag comparison')
      return [...prev, id]
    })
  }

  const openPdp = (p: BaggoProduct) => {
    setSelectedProduct(p)
    setPdpSelectedImage(p.image)
    setPdpSelectedColor(p.colors[0]?.name || 'Saddle Walnut')
    setPdpMonogram('')
    setPdpQty(1)
    setViewMode('pdp')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Filtered Collection
  const collectionProducts = useMemo(() => {
    let list = [...BAGGO_PRODUCTS]

    if (filters.category !== 'All') {
      list = list.filter((p) => p.category === filters.category)
    }
    if (filters.leatherType !== 'All') {
      list = list.filter((p) => p.leatherType === filters.leatherType)
    }
    list = list.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )
    if (filters.inStockOnly) {
      list = list.filter((p) => p.inStock)
    }

    if (filters.sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price)
    } else if (filters.sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating)
    }

    return list
  }, [filters])

  const currentHeroSlide = BAGGO_HERO_SLIDES[activeHeroSlideIdx]
  const currentTestimonial = BAGGO_TESTIMONIALS[activeTestiIdx]

  const wishlistProducts = useMemo(() => {
    return BAGGO_PRODUCTS.filter((p) => wishlistIds.includes(p.id))
  }, [wishlistIds])

  return (
    <div className={`baggo-root ${isMobile ? 'baggo-mobile device-mobile is-mobile' : `baggo-${effectiveDevice}`}`}>
      {/* TOAST POPUP */}
      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#27314C',
            color: '#FFFFFF',
            padding: '12px 28px',
            borderRadius: '4px',
            fontSize: 14,
            fontWeight: 700,
            zIndex: 99999,
            borderLeft: '4px solid #CC824C',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
          }}
        >
          {toastMsg}
        </div>
      )}

      {/* TOP NOTIFICATION BAR */}
      <div className="baggo-top-bar">
        <div className="baggo-container">
          <div className="baggo-top-bar-inner">
            <div className="baggo-top-notice">
              <span>EST. 1984</span> • <span>GENUINE HANDCRAFTED LEATHER</span> • <span className="baggo-top-highlight">FREE WORLDWIDE COURIER DELIVERY</span>
            </div>
            <div className="baggo-top-extra" style={{ display: 'flex', gap: 20 }}>
              <span>Lifetime Warranty</span>
              <span>Complimentary Monogramming</span>
            </div>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="baggo-header">
        <div className="baggo-container">
          <div className="baggo-header-inner">
            {/* Mobile Menu Toggle (Left) */}
            <button
              type="button"
              className="baggo-mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              ☰
            </button>

            {/* Logo */}
            <div className="baggo-logo" onClick={() => setViewMode('home')}>
              <div className="baggo-logo-icon">💼</div>
              <div>
                <div className="baggo-logo-title">Baggo</div>
                <div className="baggo-logo-sub">Leather Atelier</div>
              </div>
            </div>

            {/* Navigation (Desktop) */}
            <nav className="baggo-nav-desktop">
              <ul className="baggo-nav-list">
                <li>
                  <a
                    href="#home"
                    className={`baggo-nav-link ${viewMode === 'home' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault()
                      setViewMode('home')
                    }}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#catalog"
                    className={`baggo-nav-link ${viewMode === 'collection' && filters.category === 'All' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault()
                      setFilters((f) => ({ ...f, category: 'All' }))
                      setViewMode('collection')
                    }}
                  >
                    Catalog
                  </a>
                </li>
                <li>
                  <a
                    href="#casual-bags"
                    className={`baggo-nav-link ${viewMode === 'collection' && filters.category === 'Casual Bags' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault()
                      setFilters((f) => ({ ...f, category: 'Casual Bags' }))
                      setViewMode('collection')
                    }}
                  >
                    Casual Bags
                  </a>
                </li>
                <li>
                  <a
                    href="#formal-bags"
                    className={`baggo-nav-link ${viewMode === 'collection' && filters.category === 'Formal Bags' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault()
                      setFilters((f) => ({ ...f, category: 'Formal Bags' }))
                      setViewMode('collection')
                    }}
                  >
                    Formal Bags
                  </a>
                </li>
                <li>
                  <a
                    href="#party-bags"
                    className={`baggo-nav-link ${viewMode === 'collection' && filters.category === 'Party Bags' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault()
                      setFilters((f) => ({ ...f, category: 'Party Bags' }))
                      setViewMode('collection')
                    }}
                  >
                    Party Bags
                  </a>
                </li>
              </ul>
            </nav>

            {/* Actions */}
            <div className="baggo-actions">
              <button
                type="button"
                className="baggo-action-btn"
                title="Search"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                🔍
              </button>

              <button
                type="button"
                className="baggo-action-btn"
                title="Wishlist"
                onClick={() => setIsWishlistOpen(true)}
              >
                ♥
                {wishlistIds.length > 0 && <span className="baggo-badge">{wishlistIds.length}</span>}
              </button>

              <button
                type="button"
                className="baggo-action-btn baggo-compare-btn"
                title="Compare"
                onClick={() => {
                  if (compareIds.length === 0) {
                    showToast('Add bags to compare first!')
                  } else {
                    setIsCompareOpen(true)
                  }
                }}
              >
                ⇄
                {compareIds.length > 0 && (
                  <span className="baggo-badge" style={{ background: '#27314C' }}>
                    {compareIds.length}
                  </span>
                )}
              </button>

              <button
                type="button"
                className="baggo-action-btn"
                title="Bag Cart"
                onClick={() => setIsCartOpen(true)}
              >
                🛍
                <span className="baggo-badge">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Search Bar dropdown */}
        {isSearchOpen && (
          <div style={{ background: '#FAF3EE', padding: '16px 0', borderTop: '1px solid #E8DED6' }}>
            <div className="baggo-container" style={{ display: 'flex', gap: 12 }}>
              <input
                type="text"
                placeholder={isMobile ? "Search leather bags..." : "Search walnut leather bags, executive briefcases, weekend duffels..."}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  borderRadius: 4,
                  border: '1px solid #CC824C',
                  outline: 'none',
                  fontSize: 14,
                  fontFamily: 'Cambay, sans-serif',
                }}
              />
              <button
                type="button"
                className="baggo-btn baggo-btn-primary"
                onClick={() => {
                  if (searchQuery.trim()) {
                    setViewMode('collection')
                    showToast(`Searching for "${searchQuery}"...`)
                  }
                }}
              >
                Search
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div
          className="baggo-drawer-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="baggo-cart-drawer baggo-mobile-nav-drawer"
            style={{ left: 0, right: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="baggo-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 24 }}>💼</span>
                <div>
                  <div style={{ fontFamily: 'Frank Ruhl Libre, serif', fontSize: 18, fontWeight: 700, color: '#27314C' }}>
                    Baggo
                  </div>
                  <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#CC824C' }}>
                    Leather Atelier
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#27314C' }}
              >
                ✕
              </button>
            </div>

            <div className="baggo-drawer-body" style={{ padding: '16px 20px' }}>
              <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#CC824C', marginBottom: 12 }}>
                Navigation
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {[
                  { name: 'Home', cat: null },
                  { name: 'Catalog (All Bags)', cat: 'All' },
                  { name: 'Casual Bags', cat: 'Casual Bags' },
                  { name: 'Formal Bags', cat: 'Formal Bags' },
                  { name: 'Party Bags', cat: 'Party Bags' },
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
                      fontSize: 15,
                      cursor: 'pointer',
                      color: '#27314C',
                      borderBottom: '1px solid #F1ECE7',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                    onClick={() => {
                      if (item.cat === null) {
                        setViewMode('home')
                      } else {
                        setFilters((f) => ({ ...f, category: item.cat as any }))
                        setViewMode('collection')
                      }
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    <span>{item.name}</span>
                    <span style={{ color: '#CC824C', fontSize: 13 }}>→</span>
                  </button>
                ))}
              </div>

              {/* Quick Actions in Drawer */}
              <div style={{ marginTop: 24, paddingTop: 16, borderTop: '1px solid #E8DED6' }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', color: '#CC824C', marginBottom: 12 }}>
                  Quick Actions
                </div>
                <button
                  type="button"
                  style={{ width: '100%', padding: '10px 0', background: 'none', border: 'none', textAlign: 'left', fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', color: '#27314C' }}
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsCartOpen(true)
                  }}
                >
                  <span>🛍 Shopping Bag</span>
                  <span style={{ fontWeight: 700, color: '#CC824C' }}>{cartItems.reduce((acc, i) => acc + i.quantity, 0)} items</span>
                </button>
                <button
                  type="button"
                  style={{ width: '100%', padding: '10px 0', background: 'none', border: 'none', textAlign: 'left', fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', color: '#27314C' }}
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsWishlistOpen(true)
                  }}
                >
                  <span>♥ Saved Wishlist</span>
                  <span style={{ fontWeight: 700, color: '#CC824C' }}>{wishlistIds.length} items</span>
                </button>
                {compareIds.length > 0 && (
                  <button
                    type="button"
                    style={{ width: '100%', padding: '10px 0', background: 'none', border: 'none', textAlign: 'left', fontWeight: 600, fontSize: 14, cursor: 'pointer', display: 'flex', justifyContent: 'space-between', color: '#27314C' }}
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      setIsCompareOpen(true)
                    }}
                  >
                    <span>⇄ Compare Tray</span>
                    <span style={{ fontWeight: 700, color: '#CC824C' }}>{compareIds.length} bags</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================
          VIEW MODE: COLLECTION VIEW
          ========================================================= */}
      {viewMode === 'collection' && (
        <section style={{ padding: '60px 0', background: '#FFFFFF' }}>
          <div className="baggo-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <div>
                <h1 style={{ fontFamily: 'Frank Ruhl Libre, serif', fontSize: 36, margin: '0 0 6px', color: '#27314C' }}>
                  Artisan Bags Collection
                </h1>
                <p style={{ color: '#535353', margin: 0 }}>Showing {collectionProducts.length} handcrafted pieces</p>
              </div>
              <button className="baggo-btn baggo-btn-outline" onClick={() => setViewMode('home')}>
                ← Back to Home
              </button>
            </div>

            {/* Category Filter Pills */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 32 }}>
              {(['All', 'Casual Bags', 'Party Bags', 'Formal Bags', 'Festive Bags'] as BagCategory[]).map(
                (cat) => (
                  <button
                    key={cat}
                    className={`baggo-btn ${filters.category === cat ? 'baggo-btn-cognac' : 'baggo-btn-outline'}`}
                    style={{ padding: '8px 20px', fontSize: 12 }}
                    onClick={() => setFilters((f) => ({ ...f, category: cat }))}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>

            {/* Product Grid */}
            <div className="baggo-products-grid">
              {collectionProducts.map((p) => {
                const curColor = selectedCardColors[p.id] || p.colors[0]?.name || 'Saddle Walnut'
                return (
                  <div key={p.id} className="baggo-product-card">
                    <div className="baggo-product-media">
                      <img src={p.image} alt={p.name} />
                      {p.badge && <span className="baggo-product-badge">{p.badge}</span>}
                      <div className="baggo-card-actions">
                        <button
                          className="baggo-card-action-btn"
                          title="Quick View"
                          onClick={() => {
                            setQuickViewProduct(p)
                            setIsQuickViewOpen(true)
                          }}
                        >
                          👁
                        </button>
                        <button
                          type="button"
                          className={`baggo-card-action-btn ${wishlistIds.includes(p.id) ? 'active' : ''}`}
                          title={wishlistIds.includes(p.id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                          onClick={() => toggleWishlist(p.id)}
                        >
                          {wishlistIds.includes(p.id) ? '♥' : '♡'}
                        </button>
                        <button
                          className={`baggo-card-action-btn ${compareIds.includes(p.id) ? 'active' : ''}`}
                          title="Compare"
                          onClick={() => toggleCompare(p.id)}
                        >
                          ⇄
                        </button>
                      </div>
                    </div>

                    <div className="baggo-product-body">
                      <span className="baggo-product-vendor">{p.artisanVendor} Atelier • {p.capacityLiters}</span>
                      <h3 className="baggo-product-title" onClick={() => openPdp(p)}>
                        {p.name}
                      </h3>
                      <div className="baggo-product-rating">
                        {'★'.repeat(Math.round(p.rating))}
                        <span style={{ color: '#535353', fontSize: 12, marginLeft: 4 }}>({p.reviewCount})</span>
                      </div>

                      <div className="baggo-leather-pill">{p.leatherType}</div>

                      {/* Color dots */}
                      <div className="baggo-color-swatches">
                        {p.colors.map((c) => (
                          <span
                            key={c.name}
                            className={`baggo-color-dot ${curColor === c.name ? 'active' : ''}`}
                            style={{ backgroundColor: c.hex }}
                            title={`${c.name} (${c.finish})`}
                            onClick={() => setSelectedCardColors((prev) => ({ ...prev, [p.id]: c.name }))}
                          />
                        ))}
                      </div>

                      <div className="baggo-product-footer">
                        <div>
                          <span className="baggo-price">${p.price.toFixed(2)}</span>
                          {p.compareAtPrice && (
                            <span className="baggo-compare-price">${p.compareAtPrice.toFixed(2)}</span>
                          )}
                        </div>
                        <button
                          className="baggo-add-btn"
                          onClick={() => addToCart(p, curColor, undefined, 1)}
                        >
                          + Add to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          VIEW MODE: PDP (TECHNICAL LUXURY LEATHER DETAIL VIEW)
          ========================================================= */}
      {viewMode === 'pdp' && (
        <section style={{ padding: '60px 0', background: '#FFFFFF' }}>
          <div className="baggo-container">
            <button
              className="baggo-btn baggo-btn-outline"
              style={{ marginBottom: 32, padding: '8px 20px', fontSize: 12 }}
              onClick={() => setViewMode('home')}
            >
              ← Back to Catalog
            </button>

            <div className="baggo-pdp-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 50 }}>
              {/* Left: Gallery */}
              <div>
                <div
                  className="baggo-pdp-main-img-wrap"
                  style={{
                    borderRadius: 6,
                    overflow: 'hidden',
                    height: 520,
                    backgroundColor: '#F8F9FA',
                    marginBottom: 16,
                    border: '1px solid #E8DED6',
                  }}
                >
                  <img
                    src={pdpSelectedImage}
                    alt={selectedProduct.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {selectedProduct.gallery.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Thumbnail"
                      style={{
                        width: 85,
                        height: 100,
                        borderRadius: 4,
                        objectFit: 'cover',
                        cursor: 'pointer',
                        border: pdpSelectedImage === img ? '2px solid #CC824C' : '1px solid #E8DED6',
                      }}
                      onClick={() => setPdpSelectedImage(img)}
                    />
                  ))}
                </div>
              </div>

              {/* Right: Spec & Customizer */}
              <div>
                <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#CC824C', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                    {selectedProduct.artisanVendor} Atelier • {selectedProduct.category}
                  </span>
                  {selectedProduct.badge && (
                    <span className="baggo-product-badge" style={{ position: 'static' }}>
                      {selectedProduct.badge}
                    </span>
                  )}
                </div>

                <h1 style={{ fontFamily: 'Frank Ruhl Libre, serif', fontSize: 38, margin: '8px 0 12px', color: '#27314C' }}>
                  {selectedProduct.name}
                </h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ color: '#D97706', fontSize: 16 }}>
                    {'★'.repeat(Math.round(selectedProduct.rating))}
                  </div>
                  <span style={{ fontSize: 13, color: '#535353' }}>
                    {selectedProduct.rating} / 5.0 ({selectedProduct.reviewCount} verified client reviews)
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 24 }}>
                  <span style={{ fontFamily: 'Frank Ruhl Libre, serif', fontSize: 34, fontWeight: 700, color: '#27314C' }}>
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  {selectedProduct.compareAtPrice && (
                    <span style={{ fontSize: 20, color: '#9CA3AF', textDecoration: 'line-through' }}>
                      ${selectedProduct.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                  <span style={{ background: '#FAF3EE', color: '#CC824C', padding: '4px 10px', borderRadius: 4, fontSize: 12, fontWeight: 700, border: '1px solid #E8DED6' }}>
                    In Stock • Artisan Ready
                  </span>
                </div>

                <p style={{ color: '#535353', fontSize: 15, lineHeight: 1.8, marginBottom: 24 }}>
                  {selectedProduct.description}
                </p>

                {/* Color Selector */}
                <div style={{ marginBottom: 24 }}>
                  <span style={{ fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', marginBottom: 10 }}>
                    Select Shade: <b>{pdpSelectedColor}</b>
                  </span>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {selectedProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: '50%',
                          backgroundColor: c.hex,
                          border: '2px solid #FFFFFF',
                          outline: pdpSelectedColor === c.name ? '2px solid #27314C' : '1px solid #E8DED6',
                          cursor: 'pointer',
                        }}
                        title={`${c.name} (${c.finish})`}
                        onClick={() => setPdpSelectedColor(c.name)}
                      />
                    ))}
                  </div>
                </div>

                {/* Bespoke Monogramming Feature */}
                <div
                  style={{
                    background: '#FAF3EE',
                    border: '1px solid #E8DED6',
                    borderRadius: 6,
                    padding: 18,
                    marginBottom: 28,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#27314C' }}>
                      Complimentary 24K Gold Monogram
                    </span>
                    <span style={{ fontSize: 11, color: '#CC824C', fontWeight: 700 }}>FREE PERSONALIZATION</span>
                  </div>
                  <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <input
                      type="text"
                      maxLength={4}
                      placeholder="e.g. JM"
                      value={pdpMonogram}
                      onChange={(e) => setPdpMonogram(e.target.value.toUpperCase())}
                      style={{
                        width: 100,
                        padding: '8px 12px',
                        border: '1px solid #CC824C',
                        borderRadius: 4,
                        textAlign: 'center',
                        fontWeight: 800,
                        letterSpacing: '0.2em',
                        fontSize: 16,
                        outline: 'none',
                      }}
                    />
                    <span style={{ fontSize: 13, color: '#535353' }}>
                      {pdpMonogram ? `Hot-stamped as [ ${pdpMonogram} ] on hangtag` : 'Enter up to 4 initials'}
                    </span>
                  </div>
                </div>

                {/* Quantity and Actions */}
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 36 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #E8DED6',
                      borderRadius: 4,
                      padding: '8px 16px',
                    }}
                  >
                    <button
                      onClick={() => setPdpQty(Math.max(1, pdpQty - 1))}
                      style={{ border: 'none', background: 'none', fontSize: 16, cursor: 'pointer', padding: '0 8px' }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: 15, fontWeight: 700, margin: '0 12px' }}>{pdpQty}</span>
                    <button
                      onClick={() => setPdpQty(pdpQty + 1)}
                      style={{ border: 'none', background: 'none', fontSize: 16, cursor: 'pointer', padding: '0 8px' }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="baggo-btn baggo-btn-cognac"
                    style={{ flex: 1, padding: '16px 28px', fontSize: 14 }}
                    onClick={() => addToCart(selectedProduct, pdpSelectedColor, pdpMonogram || undefined, pdpQty)}
                  >
                    🛍 Add to Bag • ${(selectedProduct.price * pdpQty).toFixed(2)}
                  </button>

                  <button
                    className={`baggo-action-btn ${wishlistIds.includes(selectedProduct.id) ? 'active' : ''}`}
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    style={{ width: 48, height: 48 }}
                  >
                    ♥
                  </button>
                </div>

                {/* Accordion */}
                <div style={{ borderTop: '1px solid #E8DED6', paddingTop: 20 }}>
                  <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
                    {(['features', 'leather', 'dimensions', 'warranty'] as const).map((tab) => (
                      <button
                        key={tab}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontWeight: pdpAccordion === tab ? 700 : 500,
                          color: pdpAccordion === tab ? '#CC824C' : '#535353',
                          borderBottom: pdpAccordion === tab ? '2px solid #CC824C' : 'none',
                          paddingBottom: 6,
                          cursor: 'pointer',
                          textTransform: 'uppercase',
                          fontSize: 12,
                          letterSpacing: '0.08em',
                        }}
                        onClick={() => setPdpAccordion(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {pdpAccordion === 'features' && (
                    <ul style={{ paddingLeft: 18, color: '#535353', fontSize: 14, lineHeight: 1.8 }}>
                      {selectedProduct.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  )}

                  {pdpAccordion === 'leather' && (
                    <div style={{ fontSize: 14, color: '#535353', lineHeight: 1.7 }}>
                      <p><b>Leather Specification:</b> {selectedProduct.leatherType}</p>
                      <p><b>Hardware:</b> {selectedProduct.hardware}</p>
                      <p>{selectedProduct.careGuide}</p>
                    </div>
                  )}

                  {pdpAccordion === 'dimensions' && (
                    <div style={{ fontSize: 14, color: '#535353', lineHeight: 1.7 }}>
                      <p><b>Dimensions:</b> {selectedProduct.dimensions}</p>
                      <p><b>Internal Volume:</b> {selectedProduct.capacityLiters}</p>
                      <p><b>Weight:</b> {selectedProduct.weight}</p>
                    </div>
                  )}

                  {pdpAccordion === 'warranty' && (
                    <p style={{ fontSize: 14, color: '#535353', lineHeight: 1.7 }}>
                      {selectedProduct.warranty}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          VIEW MODE: HOMEPAGE (AUTHENTIC SECTIONS)
          ========================================================= */}
      {viewMode === 'home' && (
        <>
          {/* SECTION 1: HERO SLIDER */}
          <section className="baggo-hero">
            <div className="baggo-container">
              <div className="baggo-hero-inner">
                <div>
                  <span className="baggo-hero-subtitle">{currentHeroSlide.subtitle}</span>
                  <h1 className="baggo-hero-title">{currentHeroSlide.title}</h1>
                  <p className="baggo-hero-desc">{currentHeroSlide.tagline}</p>
                  <div style={{ display: 'flex', gap: 14 }}>
                    <button
                      className="baggo-btn baggo-btn-primary"
                      onClick={() => setViewMode('collection')}
                    >
                      {currentHeroSlide.buttonText} →
                    </button>
                    <button
                      className="baggo-btn baggo-btn-outline"
                      onClick={() => openPdp(BAGGO_PRODUCTS[0])}
                    >
                      View Specs
                    </button>
                  </div>
                </div>

                <div className="baggo-hero-image-wrap">
                  <img src={currentHeroSlide.image} alt={currentHeroSlide.title} />
                </div>
              </div>

              {/* Slider Dots */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, paddingBottom: 24 }}>
                {BAGGO_HERO_SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    style={{
                      width: activeHeroSlideIdx === idx ? 28 : 10,
                      height: 8,
                      borderRadius: 4,
                      background: activeHeroSlideIdx === idx ? '#CC824C' : '#CBD5E1',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                    }}
                    onClick={() => setActiveHeroSlideIdx(idx)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 2: 3 CATEGORY CARDS ("Choose your style") */}
          <section className="baggo-section" style={{ background: '#FFFFFF' }}>
            <div className="baggo-container">
              <div className="baggo-section-header">
                <div className="baggo-section-subtitle">Baggo Ateliers</div>
                <h2 className="baggo-section-title">Choose your style</h2>
                <p style={{ color: '#535353', maxWidth: 600, margin: '0 auto' }}>
                  Providing the best handcrafted bags for your style and journey has always been our relentless pursuit.
                </p>
                <div className="baggo-section-line" />
              </div>

              <div className="baggo-cat-grid">
                {BAGGO_COLLECTIONS.map((col) => (
                  <div
                    key={col.id}
                    className="baggo-cat-card"
                    onClick={() => {
                      setViewMode('collection')
                      showToast(`Viewing ${col.title}`)
                    }}
                  >
                    <img src={col.image} alt={col.title} />
                    <div className="baggo-cat-overlay">
                      <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#CC824C', marginBottom: 4 }}>
                        {col.itemCount}
                      </div>
                      <h3 className="baggo-cat-card-title">{col.title}</h3>
                      <p className="baggo-cat-card-desc">{col.description}</p>
                      <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#FFFFFF' }}>
                        Explore Collection →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 3: EXCLUSIVE COLLECTIONS PRODUCT CAROUSEL */}
          <section className="baggo-section" style={{ background: '#FAF3EE' }}>
            <div className="baggo-container">
              <div className="baggo-section-header">
                <div className="baggo-section-subtitle">Exclusive Collections</div>
                <h2 className="baggo-section-title">Finest Handcrafted Bags</h2>
                <p style={{ color: '#535353', maxWidth: 600, margin: '0 auto' }}>
                  Bags made from the finest leather and experienced handcraftsman of Baggo Leather Company.
                </p>
                <div className="baggo-section-line" />
              </div>

              <div className="baggo-products-grid">
                {BAGGO_PRODUCTS.slice(0, 4).map((p) => {
                  const curColor = selectedCardColors[p.id] || p.colors[0]?.name || 'Saddle Walnut'
                  return (
                    <div key={p.id} className="baggo-product-card">
                      <div className="baggo-product-media">
                        <img src={p.image} alt={p.name} />
                        {p.badge && <span className="baggo-product-badge">{p.badge}</span>}
                        <div className="baggo-card-actions">
                          <button
                            className="baggo-card-action-btn"
                            title="Quick View"
                            onClick={() => {
                              setQuickViewProduct(p)
                              setIsQuickViewOpen(true)
                            }}
                          >
                            👁
                          </button>
                          <button
                            type="button"
                            className={`baggo-card-action-btn ${wishlistIds.includes(p.id) ? 'active' : ''}`}
                            title={wishlistIds.includes(p.id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                            onClick={() => toggleWishlist(p.id)}
                          >
                            {wishlistIds.includes(p.id) ? '♥' : '♡'}
                          </button>
                          <button
                            className={`baggo-card-action-btn ${compareIds.includes(p.id) ? 'active' : ''}`}
                            title="Compare"
                            onClick={() => toggleCompare(p.id)}
                          >
                            ⇄
                          </button>
                        </div>
                      </div>

                      <div className="baggo-product-body">
                        <span className="baggo-product-vendor">{p.artisanVendor} Atelier • {p.capacityLiters}</span>
                        <h3 className="baggo-product-title" onClick={() => openPdp(p)}>
                          {p.name}
                        </h3>
                        <div className="baggo-product-rating">
                          {'★'.repeat(Math.round(p.rating))}
                          <span style={{ color: '#535353', fontSize: 12, marginLeft: 4 }}>({p.reviewCount})</span>
                        </div>

                        <div className="baggo-leather-pill">{p.leatherType}</div>

                        <div className="baggo-color-swatches">
                          {p.colors.map((c) => (
                            <span
                              key={c.name}
                              className={`baggo-color-dot ${curColor === c.name ? 'active' : ''}`}
                              style={{ backgroundColor: c.hex }}
                              title={`${c.name} (${c.finish})`}
                              onClick={() => setSelectedCardColors((prev) => ({ ...prev, [p.id]: c.name }))}
                            />
                          ))}
                        </div>

                        <div className="baggo-product-footer">
                          <div>
                            <span className="baggo-price">${p.price.toFixed(2)}</span>
                            {p.compareAtPrice && (
                              <span className="baggo-compare-price">${p.compareAtPrice.toFixed(2)}</span>
                            )}
                          </div>
                          <button
                            className="baggo-add-btn"
                            onClick={() => addToCart(p, curColor, undefined, 1)}
                          >
                            + Add to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* SECTION 4: VALUE PILLARS ("A Quality Hand Bag Baggo Providers") */}
          <section className="baggo-pillars-section">
            <div className="baggo-container">
              <div className="baggo-pillars-grid">
                {BAGGO_VALUE_PILLARS.map((vp) => (
                  <div key={vp.id} className="baggo-pillar-card">
                    <div className="baggo-pillar-icon">{vp.icon}</div>
                    <h4 className="baggo-pillar-title">{vp.title}</h4>
                    <p className="baggo-pillar-desc">{vp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 5: CRAFTSMANSHIP SPLIT STORY BANNER */}
          <section className="baggo-container">
            <div className="baggo-split-banner">
              <div className="baggo-split-img">
                <img
                  src="https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1000&auto=format&fit=crop&q=80"
                  alt="Artisan Leather Crafting"
                />
              </div>
              <div className="baggo-split-content">
                <span className="baggo-section-subtitle">Since 1984</span>
                <h2 style={{ fontFamily: 'Frank Ruhl Libre, serif', fontSize: 38, color: '#27314C', margin: '8px 0 16px', lineHeight: 1.2 }}>
                  Style in handcrafts, made by professionals for you
                </h2>
                <p style={{ color: '#535353', fontSize: 16, lineHeight: 1.8, marginBottom: 24 }}>
                  Every cut, edge-crease, and saddle stitch is performed by seasoned leather masters. We refuse shortcuts, using solid antique brass hardware, waxed linen thread, and unadulterated European vegetable hides that mature gracefully.
                </p>
                <button
                  className="baggo-btn baggo-btn-primary"
                  onClick={() => setViewMode('collection')}
                >
                  Explore Workshop Pieces →
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 6: CLIENT TESTIMONIALS */}
          <section className="baggo-section" style={{ background: '#FAF3EE' }}>
            <div className="baggo-container">
              <div className="baggo-section-header">
                <div className="baggo-section-subtitle">Client Experiences</div>
                <h2 className="baggo-section-title">Client Testimonials</h2>
                <div className="baggo-section-line" />
              </div>

              <div className="baggo-testimonial-card">
                <div style={{ color: '#D97706', fontSize: 20, marginBottom: 14 }}>
                  {'★'.repeat(Math.round(currentTestimonial.rating))}
                </div>
                <p className="baggo-testimonial-quote">"{currentTestimonial.quote}"</p>
                <div className="baggo-testimonial-author">{currentTestimonial.author}</div>
                <div className="baggo-testimonial-sub">{currentTestimonial.location} • Verified: {currentTestimonial.verifiedPurchase}</div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
                  {BAGGO_TESTIMONIALS.map((_, idx) => (
                    <button
                      key={idx}
                      style={{
                        width: activeTestiIdx === idx ? 24 : 8,
                        height: 8,
                        borderRadius: 4,
                        background: activeTestiIdx === idx ? '#CC824C' : '#CBD5E1',
                        border: 'none',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                      }}
                      onClick={() => setActiveTestiIdx(idx)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 7: BESPOKE MONOGRAM CALLOUT BANNER */}
          <section className="baggo-container" style={{ margin: '40px auto 60px' }}>
            <div
              className="baggo-monogram-banner"
              style={{
                background: '#FFFFFF',
                border: '2px solid #E8DED6',
                borderRadius: 8,
                padding: '48px 40px',
                display: 'grid',
                gridTemplateColumns: '1.2fr 1fr',
                gap: 40,
                alignItems: 'center',
              }}
            >
              <div>
                <span className="baggo-section-subtitle">Personal Heirloom</span>
                <h2 style={{ fontFamily: 'Frank Ruhl Libre, serif', fontSize: 34, color: '#27314C', margin: '8px 0 12px' }}>
                  Custom made bags for you
                </h2>
                <p style={{ color: '#535353', fontSize: 15, lineHeight: 1.7, marginBottom: 20 }}>
                  Personalize your companion with complimentary 24K gold foil or blind-debossed monogram initials. Enter your letters to preview your customized leather tag in real time.
                </p>
                <div style={{ display: 'flex', gap: 12 }}>
                  <input
                    type="text"
                    maxLength={4}
                    value={monogramInitials}
                    onChange={(e) => setMonogramInitials(e.target.value.toUpperCase())}
                    placeholder="INITIALS"
                    style={{
                      width: 120,
                      padding: '10px 14px',
                      border: '1px solid #CC824C',
                      borderRadius: 4,
                      textAlign: 'center',
                      fontWeight: 800,
                      letterSpacing: '0.2em',
                      fontSize: 18,
                    }}
                  />
                  <button
                    className="baggo-btn baggo-btn-primary"
                    onClick={() => {
                      showToast(`Monogram [ ${monogramInitials} ] applied to your profile!`)
                      setViewMode('collection')
                    }}
                  >
                    Customize Leather Bag
                  </button>
                </div>
              </div>

              <div
                style={{
                  background: '#FAF3EE',
                  borderRadius: 6,
                  padding: 30,
                  textAlign: 'center',
                  border: '1px dashed #CC824C',
                }}
              >
                <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#CC824C', marginBottom: 12 }}>
                  Live Monogram Foil Preview
                </div>
                <div
                  style={{
                    display: 'inline-block',
                    background: '#63432B',
                    color: '#FFD700',
                    padding: '16px 28px',
                    borderRadius: 4,
                    fontFamily: 'Frank Ruhl Libre, serif',
                    fontSize: 32,
                    fontWeight: 800,
                    letterSpacing: '0.25em',
                    boxShadow: '0 8px 20px rgba(0,0,0,0.2)',
                    border: '1px solid #CC824C',
                  }}
                >
                  {monogramInitials || 'YOUR INITIALS'}
                </div>
                <div style={{ fontSize: 12, color: '#535353', marginTop: 12 }}>
                  Solid brass heat-stamp with genuine 24-karat gold foil.
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 8: NEWSLETTER BANNER */}
          <section className="baggo-container" style={{ marginBottom: 60 }}>
            <div className="baggo-newsletter-banner">
              <h2 className="baggo-newsletter-title">Subscribe to Newsletter</h2>
              <p className="baggo-newsletter-desc">
                Receive private invitations to seasonal leather release archives, artisan video documentaries, and 10% off your initial order.
              </p>
              <form
                className="baggo-newsletter-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  showToast('Welcome to Baggo Atelier! Check your inbox for your 10% discount.')
                }}
              >
                <input
                  type="email"
                  className="baggo-newsletter-input"
                  placeholder="Enter your email address..."
                  required
                />
                <button type="submit" className="baggo-btn baggo-btn-cognac">
                  Subscribe
                </button>
              </form>
            </div>
          </section>

          {/* SECTION 9: BRAND PARTNER ALLIANCE */}
          <section className="baggo-container" style={{ paddingBottom: 50 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-around',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: 20,
                borderTop: '1px solid #E8DED6',
                paddingTop: 40,
              }}
            >
              {BAGGO_BRAND_LOGOS.map((brand) => (
                <img
                  key={brand.id}
                  src={brand.image}
                  alt={brand.name}
                  style={{ maxHeight: 42, opacity: 0.65, filter: 'grayscale(100%)' }}
                />
              ))}
            </div>
          </section>
        </>
      )}

      {/* FOOTER */}
      <footer className="baggo-footer">
        <div className="baggo-container">
          <div className="baggo-footer-grid">
            <div className="baggo-footer-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 24 }}>💼</span>
                <span style={{ fontFamily: 'Frank Ruhl Libre, serif', fontSize: 26, fontWeight: 800, color: '#FFFFFF', letterSpacing: '0.05em' }}>
                  Baggo
                </span>
              </div>
              <p style={{ color: '#94A3B8', lineHeight: 1.8, maxWidth: 320 }}>
                Baggo Leather Atelier creates lifetime companions for worldly explorers. Built with uncompromised Italian vegetable-tanned hides and classic saddlery methods.
              </p>
            </div>

            <div className="baggo-footer-col">
              <h4>We are here</h4>
              <ul>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); showToast('Atelier Story'); }}>Our Atelier Story</a></li>
                <li><a href="#tannery" onClick={(e) => { e.preventDefault(); showToast('Tannery Sourcing'); }}>Leather Sourcing</a></li>
                <li><a href="#craft" onClick={(e) => { e.preventDefault(); showToast('Master Craftsmanship'); }}>Artisan Craftsmanship</a></li>
                <li><a href="#custom" onClick={(e) => { e.preventDefault(); setViewMode('collection'); }}>Bespoke Monogramming</a></li>
              </ul>
            </div>

            <div className="baggo-footer-col">
              <h4>Contact us</h4>
              <ul>
                <li><a href="#faq" onClick={(e) => { e.preventDefault(); showToast('FAQ & Support'); }}>Help & FAQs</a></li>
                <li><a href="#wishlist" onClick={(e) => { e.preventDefault(); setIsWishlistOpen(true); }}>Saved Wishlist ({wishlistIds.length})</a></li>
                <li><a href="#shipping" onClick={(e) => { e.preventDefault(); showToast('Shipping Policies'); }}>Global Delivery</a></li>
                <li><a href="#warranty" onClick={(e) => { e.preventDefault(); showToast('Warranty Info'); }}>Lifetime Warranty</a></li>
                <li><a href="#care" onClick={(e) => { e.preventDefault(); showToast('Leather Care Guide'); }}>Leather Care Guide</a></li>
              </ul>
            </div>

            <div className="baggo-footer-col">
              <h4>Get us on Social</h4>
              <p style={{ color: '#94A3B8', marginBottom: 12 }}>
                154 Cobblestone Square, Florence, Italy<br />
                concierge@baggotheme.com
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 12 }}>
                <span style={{ cursor: 'pointer', color: '#CC824C' }}>Twitter</span> •{' '}
                <span style={{ cursor: 'pointer', color: '#CC824C' }}>Instagram</span> •{' '}
                <span style={{ cursor: 'pointer', color: '#CC824C' }}>Pinterest</span>
              </div>
            </div>
          </div>

          <div className="baggo-footer-bottom">
            <div>© 2026 Baggo Leather Atelier. All Rights Reserved.</div>
            <div style={{ display: 'flex', gap: 14 }}>
              <span>Amex</span> • <span>Visa</span> • <span>Mastercard</span> • <span>Apple Pay</span> • <span>PayPal</span>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================
          SLIDE-OVER CART DRAWER
          ========================================================= */}
      {isCartOpen && (
        <div className="baggo-drawer-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="baggo-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="baggo-drawer-header">
              <h3>Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</h3>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#27314C' }}
              >
                ✕
              </button>
            </div>

            <div className="baggo-drawer-body">
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#535353' }}>
                  <div style={{ fontSize: 44, marginBottom: 12 }}>💼</div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>Your shopping bag is empty</div>
                  <button
                    className="baggo-btn baggo-btn-primary"
                    style={{ marginTop: 16 }}
                    onClick={() => {
                      setIsCartOpen(false)
                      setViewMode('collection')
                    }}
                  >
                    Explore Leather Catalog
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={`${item.product.id}-${item.selectedColor}-${item.monogramInitials}`} className="baggo-drawer-item">
                    <img src={item.product.image} alt={item.product.name} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Frank Ruhl Libre, serif', fontSize: 17, fontWeight: 700, color: '#27314C' }}>
                        {item.product.name}
                      </div>
                      <div style={{ fontSize: 12, color: '#535353', margin: '2px 0 6px' }}>
                        Shade: {item.selectedColor} | ${item.product.price.toFixed(2)}
                      </div>
                      {item.monogramInitials && (
                        <div style={{ fontSize: 11, color: '#CC824C', fontWeight: 700, marginBottom: 6 }}>
                          Gold Monogram: [ {item.monogramInitials} ]
                        </div>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #E8DED6',
                            borderRadius: 3,
                            padding: '2px 8px',
                          }}
                        >
                          <button onClick={() => updateCartQty(idx, -1)} style={{ border: 'none', background: 'none', padding: '0 4px', cursor: 'pointer' }}>
                            -
                          </button>
                          <span style={{ fontSize: 13, fontWeight: 700, margin: '0 8px' }}>
                            {item.quantity}
                          </span>
                          <button onClick={() => updateCartQty(idx, 1)} style={{ border: 'none', background: 'none', padding: '0 4px', cursor: 'pointer' }}>
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => updateCartQty(idx, -item.quantity)}
                          style={{ background: 'none', border: 'none', fontSize: 12, color: '#EF4444', cursor: 'pointer' }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="baggo-drawer-footer">
                <div className="baggo-drawer-subtotal">
                  <span>Subtotal:</span>
                  <span style={{ color: '#CC824C' }}>${cartSubtotal}</span>
                </div>
                <button
                  className="baggo-btn baggo-btn-cognac"
                  style={{ width: '100%' }}
                  onClick={() => showToast('Proceeding to Secure Checkout...')}
                >
                  Checkout Now 🛍
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SLIDE-OVER WISHLIST DRAWER */}
      {isWishlistOpen && (
        <div className="baggo-drawer-backdrop" onClick={() => setIsWishlistOpen(false)}>
          <div className="baggo-cart-drawer baggo-wishlist-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="baggo-drawer-header">
              <h3>Saved Wishlist ({wishlistIds.length})</h3>
              <button
                type="button"
                onClick={() => setIsWishlistOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#27314C' }}
              >
                ✕
              </button>
            </div>

            <div className="baggo-drawer-body">
              {wishlistProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#535353' }}>
                  <div style={{ fontSize: 44, marginBottom: 12, color: '#CC824C' }}>♥</div>
                  <div style={{ fontWeight: 700, fontSize: 16, color: '#27314C' }}>Your Wishlist is Empty</div>
                  <p style={{ fontSize: 13, color: '#6B7280', margin: '8px 0 16px' }}>
                    Tap the heart icon on any handcrafted bag to save your favorites.
                  </p>
                  <button
                    type="button"
                    className="baggo-btn baggo-btn-primary"
                    onClick={() => {
                      setIsWishlistOpen(false)
                      setViewMode('collection')
                    }}
                  >
                    Explore Leather Catalog
                  </button>
                </div>
              ) : (
                wishlistProducts.map((p) => (
                  <div key={p.id} className="baggo-drawer-item">
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        openPdp(p)
                        setIsWishlistOpen(false)
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontFamily: 'Frank Ruhl Libre, serif',
                          fontSize: 16,
                          fontWeight: 700,
                          color: '#27314C',
                          cursor: 'pointer',
                        }}
                        onClick={() => {
                          openPdp(p)
                          setIsWishlistOpen(false)
                        }}
                      >
                        {p.name}
                      </div>
                      <div style={{ fontSize: 12, color: '#535353', margin: '2px 0 4px' }}>
                        {p.leatherType} • {p.capacityLiters}
                      </div>
                      <div style={{ color: '#CC824C', fontWeight: 700, fontSize: 16, marginBottom: 8 }}>
                        ${p.price.toFixed(2)}
                      </div>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        <button
                          type="button"
                          className="baggo-btn baggo-btn-cognac"
                          style={{ padding: '6px 14px', fontSize: 11 }}
                          onClick={() => {
                            addToCart(p, p.colors[0]?.name || 'Default', undefined, 1)
                            setIsWishlistOpen(false)
                          }}
                        >
                          + Add to Bag
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleWishlist(p.id)}
                          style={{ background: 'none', border: 'none', fontSize: 12, color: '#EF4444', cursor: 'pointer' }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {wishlistProducts.length > 0 && (
              <div className="baggo-drawer-footer">
                <button
                  type="button"
                  className="baggo-btn baggo-btn-cognac"
                  style={{ width: '100%', marginBottom: 10 }}
                  onClick={() => {
                    wishlistProducts.forEach((p) => {
                      addToCart(p, p.colors[0]?.name || 'Default', undefined, 1)
                    })
                    setIsWishlistOpen(false)
                    setIsCartOpen(true)
                  }}
                >
                  Move All to Bag →
                </button>
                <button
                  type="button"
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: 'none',
                    border: '1px solid #E8DED6',
                    borderRadius: 3,
                    color: '#6B7280',
                    fontSize: 13,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    setWishlistIds([])
                    showToast('Wishlist cleared')
                  }}
                >
                  Clear Wishlist
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {isQuickViewOpen && (
        <div className="baggo-drawer-backdrop" onClick={() => setIsQuickViewOpen(false)}>
          <div
            className="baggo-quickview-modal"
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#FFFFFF',
              padding: 32,
              borderRadius: 6,
              maxWidth: 720,
              width: '90%',
              maxHeight: '90vh',
              overflowY: 'auto',
              zIndex: 10002,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
              <button
                type="button"
                onClick={() => setIsQuickViewOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
            <div className="baggo-quickview-layout" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{ width: '100%', height: 350, objectFit: 'cover', borderRadius: 4 }}
              />
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#CC824C', textTransform: 'uppercase', letterSpacing: '0.15em' }}>
                  {quickViewProduct.artisanVendor} Atelier • {quickViewProduct.capacityLiters}
                </span>
                <h3 style={{ fontFamily: 'Frank Ruhl Libre, serif', fontSize: 26, margin: '6px 0 10px', color: '#27314C' }}>
                  {quickViewProduct.name}
                </h3>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#27314C', marginBottom: 12 }}>
                  ${quickViewProduct.price.toFixed(2)}
                </div>
                <p style={{ fontSize: 13, color: '#535353', lineHeight: 1.7, marginBottom: 20 }}>
                  {quickViewProduct.description}
                </p>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    className="baggo-btn baggo-btn-cognac"
                    style={{ flex: 1 }}
                    onClick={() => {
                      addToCart(quickViewProduct, quickViewProduct.colors[0]?.name || 'Default', undefined, 1)
                      setIsQuickViewOpen(false)
                    }}
                  >
                    Add to Bag
                  </button>
                  <button
                    type="button"
                    className={`baggo-action-btn ${wishlistIds.includes(quickViewProduct.id) ? 'active' : ''}`}
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    style={{ width: 44, height: 44, borderRadius: 4 }}
                    title={wishlistIds.includes(quickViewProduct.id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                  >
                    {wishlistIds.includes(quickViewProduct.id) ? '♥' : '♡'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMPARISON MODAL */}
      {isCompareOpen && (
        <div className="baggo-drawer-backdrop" onClick={() => setIsCompareOpen(false)}>
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#FFFFFF',
              padding: 32,
              borderRadius: 6,
              maxWidth: 840,
              width: '90%',
              zIndex: 10002,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'Frank Ruhl Libre, serif', fontSize: 24, margin: 0, color: '#27314C' }}>
                Compare Leather Bags ({compareIds.length})
              </h3>
              <button
                onClick={() => setIsCompareOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${compareIds.length}, 1fr)`, gap: 20 }}>
              {compareIds.map((id) => {
                const prod = BAGGO_PRODUCTS.find((p) => p.id === id)
                if (!prod) return null
                return (
                  <div key={prod.id} style={{ border: '1px solid #E8DED6', borderRadius: 4, padding: 16, textAlign: 'center' }}>
                    <img src={prod.image} alt={prod.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 4, marginBottom: 12 }} />
                    <h4 style={{ fontFamily: 'Frank Ruhl Libre, serif', fontSize: 17, margin: '0 0 6px', color: '#27314C' }}>{prod.name}</h4>
                    <div style={{ color: '#CC824C', fontWeight: 700, fontSize: 18, marginBottom: 6 }}>${prod.price.toFixed(2)}</div>
                    <div style={{ fontSize: 12, color: '#535353', marginBottom: 4 }}>{prod.leatherType}</div>
                    <div style={{ fontSize: 12, color: '#535353', marginBottom: 12 }}>{prod.capacityLiters}</div>
                    <button
                      className="baggo-btn baggo-btn-primary"
                      style={{ padding: '8px 16px', fontSize: 12, width: '100%' }}
                      onClick={() => {
                        addToCart(prod, prod.colors[0]?.name || 'Default', undefined, 1)
                        setIsCompareOpen(false)
                      }}
                    >
                      Add to Bag
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
