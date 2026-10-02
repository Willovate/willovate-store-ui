import React, { useState, useMemo } from 'react'
import type {
  JenieProduct,
  JenieCartItem,
  JenieStorefrontProps,
  JenieFilterState,
  DenimWash,
} from './types'
import {
  JENIE_HERO_SLIDES,
  JENIE_COLLECTIONS,
  JENIE_PRODUCTS,
  JENIE_INSTAGRAM_POSTS,
} from './data/jenieData'
import './styles/jenieFashion.css'

export const JenieFashionStorefront: React.FC<JenieStorefrontProps> = ({
  template: _template,
  device: _device = 'desktop',
  customAccentColor: _customAccentColor,
  onColorChange: _onColorChange,
  onUseTemplate: _onUseTemplate,
  onClose,
}) => {
  // Navigation & View Mode
  const [viewMode, setViewMode] = useState<'home' | 'collection' | 'pdp'>('home')
  const [selectedProduct, setSelectedProduct] = useState<JenieProduct>(JENIE_PRODUCTS[0])
  const [activeTabProductV1, setActiveTabProductV1] = useState<'Lastest Products' | 'Best Sellers' | 'Featured Products'>('Lastest Products')

  // Hero Carousel State
  const [activeHeroSlideIdx, setActiveHeroSlideIdx] = useState<number>(0)

  // Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState<boolean>(false)
  const [quickViewProduct, setQuickViewProduct] = useState<JenieProduct>(JENIE_PRODUCTS[0])
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  // State: Cart, Wishlist, Compare
  const [cartItems, setCartItems] = useState<JenieCartItem[]>([
    {
      product: JENIE_PRODUCTS[0],
      size: '28',
      wash: 'Vintage Stone Wash',
      quantity: 1,
    },
  ])
  const [wishlistIds, setWishlistIds] = useState<string[]>([JENIE_PRODUCTS[0].id])
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [selectedCardSizes, setSelectedCardSizes] = useState<Record<string, string>>({})
  const [selectedCardWashes, setSelectedCardWashes] = useState<Record<string, DenimWash>>({})

  // PDP Variant State
  const [pdpSelectedImage, setPdpSelectedImage] = useState<string>(JENIE_PRODUCTS[0].image)
  const [pdpSelectedSize, setPdpSelectedSize] = useState<string>(JENIE_PRODUCTS[0].sizes[0] || '28')
  const [pdpSelectedWash, setPdpSelectedWash] = useState<DenimWash>(JENIE_PRODUCTS[0].wash)
  const [pdpQty, setPdpQty] = useState<number>(1)
  const [pdpAccordion, setPdpAccordion] = useState<'details' | 'care' | 'shipping'>('details')

  // Collection Filters State
  const [filters, setFilters] = useState<JenieFilterState>({
    category: 'All',
    fit: 'All',
    wash: 'All',
    selectedSizes: [],
    priceRange: [0, 200],
    inStockOnly: false,
    sortBy: 'featured',
  })

  // Toast feedback
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  // Cart operations
  const addToCart = (product: JenieProduct, size: string, wash: DenimWash, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size && item.wash === wash
      )
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size && item.wash === wash
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      }
      return [...prev, { product, size, wash, quantity: qty }]
    })
    showToast(`Added "${product.name}" (${size} / ${wash}) to bag!`)
    setIsCartOpen(true)
  }

  const updateCartQty = (idx: number, delta: number) => {
    setCartItems((prev) => {
      const next = [...prev]
      const cur = next[idx]
      if (!cur) return prev
      const newQty = cur.quantity + delta
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== idx)
      }
      next[idx] = { ...cur, quantity: newQty }
      return next
    })
  }

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }, [cartItems])

  const toggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(id)
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id]
      showToast(exists ? 'Removed from wishlist' : 'Saved to denim wishlist!')
      return next
    })
  }

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      const exists = prev.includes(id)
      if (exists) {
        return prev.filter((item) => item !== id)
      }
      if (prev.length >= 3) {
        showToast('You can compare up to 3 jeans simultaneously')
        return prev
      }
      showToast('Added to denim comparison')
      return [...prev, id]
    })
  }

  const openPdp = (product: JenieProduct) => {
    setSelectedProduct(product)
    setPdpSelectedImage(product.image)
    setPdpSelectedSize(product.sizes[0] || '28')
    setPdpSelectedWash(product.wash)
    setPdpQty(1)
    setViewMode('pdp')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Filtered Products for Product-v1 tabs
  const tabFilteredProducts = useMemo(() => {
    if (activeTabProductV1 === 'Lastest Products') {
      return JENIE_PRODUCTS.slice(0, 4)
    }
    if (activeTabProductV1 === 'Best Sellers') {
      return JENIE_PRODUCTS.filter((p) => p.isBestseller).slice(0, 4)
    }
    return JENIE_PRODUCTS.slice(4, 8)
  }, [activeTabProductV1])

  // Filtered Products for Collection View
  const collectionProducts = useMemo(() => {
    return JENIE_PRODUCTS.filter((p) => {
      if (filters.category !== 'All' && p.category !== filters.category) return false
      if (filters.fit !== 'All' && p.fit !== filters.fit) return false
      if (p.price > filters.priceRange[1]) return false
      if (filters.inStockOnly && !p.inStock) return false
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matchesName = p.name.toLowerCase().includes(q)
        const matchesDesc = p.description.toLowerCase().includes(q)
        if (!matchesName && !matchesDesc) return false
      }
      return true
    })
  }, [filters, searchQuery])

  const currentHeroSlide = JENIE_HERO_SLIDES[activeHeroSlideIdx] || JENIE_HERO_SLIDES[0]

  return (
    <div className="jenie-theme-root">
      {/* Toast Notification */}
      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: '#1E2C3D',
            color: '#FFFFFF',
            padding: '12px 24px',
            borderRadius: '0.8rem',
            fontSize: 13,
            fontWeight: 600,
            zIndex: 99999,
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          }}
        >
          {toastMsg}
        </div>
      )}

      {/* HEADER (.header-v15 - 3-COLUMN WIDE LAYOUT) */}
      <header className="jenie-header">
        <div className="jenie-container">
          <div className="jenie-header-inner">
            {/* Left Column: Navigation */}
            <nav>
              <ul className="jenie-nav-list">
                <li>
                  <a
                    href="#home"
                    className={`jenie-nav-link ${viewMode === 'home' ? 'active' : ''}`}
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
                    href="#shops"
                    className={`jenie-nav-link ${viewMode === 'collection' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault()
                      setViewMode('collection')
                    }}
                  >
                    Shops
                  </a>
                </li>
                <li>
                  <a
                    href="#products"
                    className="jenie-nav-link"
                    onClick={(e) => {
                      e.preventDefault()
                      if (viewMode !== 'home') setViewMode('home')
                      const el = document.getElementById('jenie-products-grid')
                      el?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Products
                  </a>
                </li>
                <li>
                  <a
                    href="#blog"
                    className="jenie-nav-link"
                    onClick={(e) => {
                      e.preventDefault()
                      const el = document.getElementById('jenie-promo')
                      el?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#pages"
                    className="jenie-nav-link"
                    onClick={(e) => {
                      e.preventDefault()
                      const el = document.getElementById('jenie-instagram')
                      el?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Pages
                  </a>
                </li>
              </ul>
            </nav>

            {/* Center Column: Logo */}
            <div style={{ textAlign: 'center' }}>
              <a
                href="#home"
                onClick={(e) => {
                  e.preventDefault()
                  setViewMode('home')
                }}
                className="jenie-logo"
              >
                Jenie
                <span>DENIM</span>
              </a>
            </div>

            {/* Right Column: Utilities */}
            <div className="jenie-header-utilities">
              <select className="jenie-selector-pill">
                <option>English</option>
                <option>Français</option>
                <option>日本語</option>
              </select>

              <select className="jenie-selector-pill">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>JPY (¥)</option>
                <option>CNY (¥)</option>
              </select>

              <button
                className="jenie-util-icon-btn"
                title="Search"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <svg viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" strokeWidth="2" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" strokeWidth="2" />
                </svg>
              </button>

              <button
                className="jenie-util-icon-btn"
                title="Login"
                onClick={() => showToast('Customer Account Sign In')}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" strokeWidth="2" />
                  <circle cx="12" cy="7" r="4" strokeWidth="2" />
                </svg>
              </button>

              <button
                className="jenie-util-icon-btn"
                title="Wishlist"
                onClick={() => showToast(`Wishlist contains ${wishlistIds.length} items`)}
              >
                <svg viewBox="0 0 24 24">
                  <path
                    d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                    strokeWidth="2"
                  />
                </svg>
                {wishlistIds.length > 0 && (
                  <div className="jenie-badge-counter">{wishlistIds.length}</div>
                )}
              </button>

              <button
                className="jenie-util-icon-btn"
                title="Bag"
                onClick={() => setIsCartOpen(true)}
              >
                <svg viewBox="0 0 24 24">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" strokeWidth="2" />
                  <line x1="3" y1="6" x2="21" y2="6" strokeWidth="2" />
                  <path d="M16 10a4 4 0 0 1-8 0" strokeWidth="2" />
                </svg>
                <div className="jenie-badge-counter">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                </div>
              </button>

              {onClose && (
                <button
                  onClick={onClose}
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    color: '#D97706',
                    marginLeft: 8,
                  }}
                >
                  ✕ Exit
                </button>
              )}
            </div>
          </div>

          {/* Quick Search Dropdown Bar */}
          {isSearchOpen && (
            <div style={{ padding: '12px 0 20px', borderTop: '1px solid #E5E7EB' }}>
              <input
                type="text"
                placeholder="Search jeans by cut, wash, size, or style..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setViewMode('collection')
                    setIsSearchOpen(false)
                  }
                }}
                style={{
                  width: '100%',
                  padding: '12px 20px',
                  borderRadius: '0.8rem',
                  border: '1px solid #1E2C3D',
                  outline: 'none',
                  fontSize: 14,
                }}
              />
            </div>
          )}
        </div>
      </header>

      {/* =========================================================
          VIEW MODE: COLLECTION VIEW
          ========================================================= */}
      {viewMode === 'collection' && (
        <section style={{ padding: '60px 0', minHeight: '60vh' }}>
          <div className="jenie-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 36 }}>
              <div>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 36, margin: '0 0 8px' }}>
                  All Denim Collections
                </h1>
                <p style={{ color: '#6B7280', margin: 0 }}>Showing {collectionProducts.length} premium denim styles</p>
              </div>
              <button className="jenie-btn jenie-btn-primary" onClick={() => setViewMode('home')}>
                ← Back to Home
              </button>
            </div>

            {/* Filter Chips */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 40 }}>
              {(['All', 'Denim', 'Vintage', 'Slimfit', 'Jackets'] as const).map((cat) => (
                <button
                  key={cat}
                  className={`jenie-tab-btn ${filters.category === cat ? 'active' : ''}`}
                  onClick={() => setFilters((f) => ({ ...f, category: cat }))}
                >
                  {cat === 'All' ? 'All Fits' : cat}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="jenie-products-grid">
              {collectionProducts.map((p) => {
                const curSize = selectedCardSizes[p.id] || p.sizes[0] || '28'
                const curWash = selectedCardWashes[p.id] || p.wash
                return (
                  <div key={p.id} className="jenie-product-card">
                    <div className="jenie-product-media">
                      <img src={p.image} alt={p.name} />
                      {p.badge && <span className="jenie-product-badge">{p.badge}</span>}
                      <div className="jenie-card-action-bar">
                        <button
                          className="jenie-card-icon-btn"
                          title="Quick View"
                          onClick={() => {
                            setQuickViewProduct(p)
                            setIsQuickViewOpen(true)
                          }}
                        >
                          👁
                        </button>
                        <button
                          className={`jenie-card-icon-btn ${wishlistIds.includes(p.id) ? 'active' : ''}`}
                          title="Wishlist"
                          onClick={() => toggleWishlist(p.id)}
                        >
                          ♥
                        </button>
                        <button
                          className="jenie-card-icon-btn"
                          title="Compare"
                          onClick={() => toggleCompare(p.id)}
                        >
                          ⇄
                        </button>
                      </div>
                    </div>
                    <div className="jenie-product-body">
                      <span className="jenie-product-cat">{p.category} • {p.fit}</span>
                      <h3 className="jenie-product-title" onClick={() => openPdp(p)}>
                        {p.name}
                      </h3>
                      <div className="jenie-product-rating">
                        {'★'.repeat(Math.round(p.rating))}
                        <span style={{ color: '#6B7280', marginLeft: 4 }}>({p.reviewCount})</span>
                      </div>
                      <div className="jenie-size-row">
                        {p.sizes.slice(0, 4).map((s) => (
                          <button
                            key={s}
                            className={`jenie-size-btn ${curSize === s ? 'active' : ''}`}
                            onClick={() => setSelectedCardSizes((prev) => ({ ...prev, [p.id]: s }))}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                      <div className="jenie-product-footer">
                        <div className="jenie-price-wrap">
                          <span className="jenie-price">${p.price}.00</span>
                          {p.compareAtPrice && (
                            <span className="jenie-compare-price">${p.compareAtPrice}.00</span>
                          )}
                        </div>
                        <button
                          className="jenie-quick-add-btn"
                          onClick={() => addToCart(p, curSize, curWash, 1)}
                        >
                          Add to Bag
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
          VIEW MODE: PDP (PRODUCT DETAILS PAGE)
          ========================================================= */}
      {viewMode === 'pdp' && (
        <section style={{ padding: '60px 0', background: '#FFFFFF' }}>
          <div className="jenie-container">
            <button
              className="jenie-btn jenie-btn-light"
              style={{ marginBottom: 32, border: '1px solid #E5E7EB' }}
              onClick={() => setViewMode('home')}
            >
              ← Back to Storefront
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 60, alignItems: 'start' }}>
              {/* Gallery */}
              <div>
                <div style={{ borderRadius: 12, overflow: 'hidden', height: 560, marginBottom: 16 }}>
                  <img
                    src={pdpSelectedImage}
                    alt={selectedProduct.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {selectedProduct.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setPdpSelectedImage(img)}
                      style={{
                        width: 90,
                        height: 90,
                        borderRadius: 8,
                        border: pdpSelectedImage === img ? '2px solid #1E2C3D' : '1px solid #E5E7EB',
                        overflow: 'hidden',
                      }}
                    >
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                <span className="jenie-product-cat">{selectedProduct.category} • {selectedProduct.fit}</span>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, margin: '8px 0 12px' }}>
                  {selectedProduct.name}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ color: '#F59E0B' }}>
                    {'★'.repeat(Math.round(selectedProduct.rating))} ({selectedProduct.reviewCount} Reviews)
                  </div>
                  <span style={{ color: '#6B7280' }}>• SKU: {selectedProduct.sku}</span>
                </div>

                <div className="jenie-price-wrap" style={{ marginBottom: 24 }}>
                  <span className="jenie-price" style={{ fontSize: 36 }}>${selectedProduct.price}.00</span>
                  {selectedProduct.compareAtPrice && (
                    <span className="jenie-compare-price" style={{ fontSize: 22 }}>${selectedProduct.compareAtPrice}.00</span>
                  )}
                </div>

                <p style={{ color: '#4B5563', lineHeight: 1.7, marginBottom: 24 }}>
                  {selectedProduct.description}
                </p>

                {/* Wash selection */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
                    Wash: <b>{pdpSelectedWash}</b>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {selectedProduct.washes.map((w) => (
                      <button
                        key={w.name}
                        onClick={() => setPdpSelectedWash(w.name)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: '50%',
                          background: w.hex,
                          border: pdpSelectedWash === w.name ? '3px solid #1E2C3D' : '1px solid #E5E7EB',
                        }}
                        title={w.name}
                      />
                    ))}
                  </div>
                </div>

                {/* Size selection */}
                <div style={{ marginBottom: 28 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8 }}>
                    Waist Size: <b>{pdpSelectedSize}</b>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {selectedProduct.sizes.map((s) => (
                      <button
                        key={s}
                        className={`jenie-size-btn ${pdpSelectedSize === s ? 'active' : ''}`}
                        style={{ padding: '8px 16px', fontSize: 13 }}
                        onClick={() => setPdpSelectedSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div style={{ display: 'flex', gap: 16, marginBottom: 36 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #E5E7EB',
                      borderRadius: '0.8rem',
                      padding: '4px 16px',
                    }}
                  >
                    <button onClick={() => setPdpQty(Math.max(1, pdpQty - 1))} style={{ fontSize: 18, padding: '4px 8px' }}>
                      -
                    </button>
                    <span style={{ fontWeight: 700, margin: '0 12px' }}>{pdpQty}</span>
                    <button onClick={() => setPdpQty(pdpQty + 1)} style={{ fontSize: 18, padding: '4px 8px' }}>
                      +
                    </button>
                  </div>
                  <button
                    className="jenie-btn jenie-btn-primary"
                    style={{ flex: 1 }}
                    onClick={() => addToCart(selectedProduct, pdpSelectedSize, pdpSelectedWash, pdpQty)}
                  >
                    Add to Bag
                  </button>
                  <button
                    className="jenie-card-icon-btn"
                    style={{ border: '1px solid #E5E7EB', width: 48, height: 48 }}
                    onClick={() => toggleWishlist(selectedProduct.id)}
                  >
                    ♥
                  </button>
                </div>

                {/* Denim Technical Accordions */}
                <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 20 }}>
                  <div style={{ display: 'flex', gap: 24, marginBottom: 16 }}>
                    <button
                      style={{
                        fontWeight: 700,
                        borderBottom: pdpAccordion === 'details' ? '2px solid #1E2C3D' : 'none',
                        paddingBottom: 6,
                        color: pdpAccordion === 'details' ? '#1E2C3D' : '#6B7280',
                      }}
                      onClick={() => setPdpAccordion('details')}
                    >
                      Fabric & Stretch
                    </button>
                    <button
                      style={{
                        fontWeight: 700,
                        borderBottom: pdpAccordion === 'care' ? '2px solid #1E2C3D' : 'none',
                        paddingBottom: 6,
                        color: pdpAccordion === 'care' ? '#1E2C3D' : '#6B7280',
                      }}
                      onClick={() => setPdpAccordion('care')}
                    >
                      Denim Care Guide
                    </button>
                    <button
                      style={{
                        fontWeight: 700,
                        borderBottom: pdpAccordion === 'shipping' ? '2px solid #1E2C3D' : 'none',
                        paddingBottom: 6,
                        color: pdpAccordion === 'shipping' ? '#1E2C3D' : '#6B7280',
                      }}
                      onClick={() => setPdpAccordion('shipping')}
                    >
                      Shipping & Returns
                    </button>
                  </div>

                  {pdpAccordion === 'details' && (
                    <div style={{ fontSize: 14, color: '#4B5563' }}>
                      <p><b>Composition:</b> {selectedProduct.fabricComposition}</p>
                      <p><b>Stretch Level:</b> {selectedProduct.stretchLevel}</p>
                      <p><b>Fit Category:</b> {selectedProduct.fit}</p>
                    </div>
                  )}

                  {pdpAccordion === 'care' && (
                    <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.6 }}>
                      {selectedProduct.careGuide}
                    </p>
                  )}

                  {pdpAccordion === 'shipping' && (
                    <p style={{ fontSize: 14, color: '#4B5563', lineHeight: 1.6 }}>
                      {selectedProduct.shippingInfo}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          VIEW MODE: HOMEPAGE (ALL AUTHENTIC SECTIONS)
          ========================================================= */}
      {viewMode === 'home' && (
        <>
          {/* SECTION 1: HERO SLIDESHOW (.slideshow-v2) */}
          <section
            className="jenie-hero-section"
            style={{ backgroundImage: `url(${currentHeroSlide.image})` }}
          >
            <div className="jenie-hero-overlay" />
            <div className="jenie-container">
              <div className="jenie-hero-content">
                <div className="jenie-hero-subtitle">{currentHeroSlide.subtitle}</div>
                <h1 className="jenie-hero-title">
                  {currentHeroSlide.title.split('\n').map((line, i) => (
                    <React.Fragment key={i}>
                      {line}
                      <br />
                    </React.Fragment>
                  ))}
                </h1>
                <p className="jenie-hero-desc">{currentHeroSlide.description}</p>
                <button
                  className="jenie-btn jenie-btn-light"
                  onClick={() => setViewMode('collection')}
                >
                  {currentHeroSlide.buttonText} →
                </button>
              </div>

              {/* Prev / Next controls */}
              <div className="jenie-hero-arrows">
                <button
                  className="jenie-hero-arrow-btn"
                  onClick={() =>
                    setActiveHeroSlideIdx(
                      (activeHeroSlideIdx - 1 + JENIE_HERO_SLIDES.length) % JENIE_HERO_SLIDES.length
                    )
                  }
                >
                  ‹
                </button>
                <button
                  className="jenie-hero-arrow-btn"
                  onClick={() =>
                    setActiveHeroSlideIdx((activeHeroSlideIdx + 1) % JENIE_HERO_SLIDES.length)
                  }
                >
                  ›
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 2: COLLECTION CATEGORIES (.collection-v2) */}
          <section className="jenie-collection-section">
            <div className="jenie-container">
              <div className="jenie-section-heading-wrap">
                <h2>Shop by Jenie's Shop</h2>
                <div className="jenie-heading-decor" />
              </div>

              <div className="jenie-collection-grid">
                {JENIE_COLLECTIONS.map((col) => (
                  <div
                    key={col.id}
                    className="jenie-collection-card"
                    onClick={() => {
                      setFilters((f) => ({ ...f, category: col.title as any }))
                      setViewMode('collection')
                    }}
                  >
                    <img src={col.image} alt={col.title} />
                    <div className="jenie-collection-overlay">
                      <span className="jenie-collection-tag">{col.tag}</span>
                      <h3 className="jenie-collection-title">
                        {col.title}
                        <span className="jenie-collection-arrow-icon">→</span>
                      </h3>
                      <span style={{ fontSize: 13, color: '#D1D5DB' }}>{col.itemCount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 3: TOP RATED PRODUCTS CAROUSEL (.product-v3) */}
          <section className="jenie-products-section">
            <div className="jenie-container">
              <div className="jenie-tab-bar">
                <button className="jenie-tab-btn active">Top Ratting</button>
              </div>

              <div className="jenie-products-grid">
                {JENIE_PRODUCTS.slice(0, 4).map((p) => {
                  const curSize = selectedCardSizes[p.id] || p.sizes[0] || '28'
                  const curWash = selectedCardWashes[p.id] || p.wash
                  return (
                    <div key={p.id} className="jenie-product-card">
                      <div className="jenie-product-media">
                        <img src={p.image} alt={p.name} />
                        {p.badge && <span className="jenie-product-badge">{p.badge}</span>}
                        <div className="jenie-card-action-bar">
                          <button
                            className="jenie-card-icon-btn"
                            title="Quick View"
                            onClick={() => {
                              setQuickViewProduct(p)
                              setIsQuickViewOpen(true)
                            }}
                          >
                            👁
                          </button>
                          <button
                            className={`jenie-card-icon-btn ${wishlistIds.includes(p.id) ? 'active' : ''}`}
                            title="Wishlist"
                            onClick={() => toggleWishlist(p.id)}
                          >
                            ♥
                          </button>
                          <button
                            className="jenie-card-icon-btn"
                            title="Compare"
                            onClick={() => toggleCompare(p.id)}
                          >
                            ⇄
                          </button>
                        </div>
                      </div>
                      <div className="jenie-product-body">
                        <span className="jenie-product-cat">{p.category}</span>
                        <h4 className="jenie-product-title" onClick={() => openPdp(p)}>
                          {p.name}
                        </h4>
                        <div className="jenie-product-rating">
                          {'★'.repeat(Math.round(p.rating))}
                          <span style={{ color: '#6B7280', marginLeft: 4 }}>({p.reviewCount})</span>
                        </div>
                        <div className="jenie-size-row">
                          {p.sizes.slice(0, 4).map((s) => (
                            <button
                              key={s}
                              className={`jenie-size-btn ${curSize === s ? 'active' : ''}`}
                              onClick={() => setSelectedCardSizes((prev) => ({ ...prev, [p.id]: s }))}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                        <div className="jenie-product-footer">
                          <div className="jenie-price-wrap">
                            <span className="jenie-price">${p.price}.00</span>
                            {p.compareAtPrice && (
                              <span className="jenie-compare-price">${p.compareAtPrice}.00</span>
                            )}
                          </div>
                          <button
                            className="jenie-quick-add-btn"
                            onClick={() => addToCart(p, curSize, curWash, 1)}
                          >
                            Add to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* SECTION 4: SPLIT PROMOTIONAL BANNER (.banner-v5) */}
          <section id="jenie-promo" className="jenie-promo-banner-section">
            <div className="jenie-promo-overlay" />
            <div className="jenie-container">
              <div className="jenie-promo-content">
                <div className="jenie-promo-subtitle">Welcome to Jenie's Shop</div>
                <h2 className="jenie-promo-title">Denim Staples and Beyond</h2>
                <p className="jenie-promo-desc">
                  Celebrate effortless style with our curated collection of jeans for every age and occasion. From timeless classics to modern cuts.
                </p>
                <button
                  className="jenie-btn jenie-btn-light"
                  onClick={() => setViewMode('collection')}
                >
                  Discover Now →
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 5: MULTI-TAB PRODUCT GRID (.product-v1) */}
          <section id="jenie-products-grid" className="jenie-products-section" style={{ background: '#FFFFFF' }}>
            <div className="jenie-container">
              <div className="jenie-tab-bar">
                {(['Lastest Products', 'Best Sellers', 'Featured Products'] as const).map((tab) => (
                  <button
                    key={tab}
                    className={`jenie-tab-btn ${activeTabProductV1 === tab ? 'active' : ''}`}
                    onClick={() => setActiveTabProductV1(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              <div className="jenie-products-grid">
                {tabFilteredProducts.map((p) => {
                  const curSize = selectedCardSizes[p.id] || p.sizes[0] || '28'
                  const curWash = selectedCardWashes[p.id] || p.wash
                  return (
                    <div key={p.id} className="jenie-product-card">
                      <div className="jenie-product-media">
                        <img src={p.image} alt={p.name} />
                        {p.badge && <span className="jenie-product-badge">{p.badge}</span>}
                        <div className="jenie-card-action-bar">
                          <button
                            className="jenie-card-icon-btn"
                            title="Quick View"
                            onClick={() => {
                              setQuickViewProduct(p)
                              setIsQuickViewOpen(true)
                            }}
                          >
                            👁
                          </button>
                          <button
                            className={`jenie-card-icon-btn ${wishlistIds.includes(p.id) ? 'active' : ''}`}
                            title="Wishlist"
                            onClick={() => toggleWishlist(p.id)}
                          >
                            ♥
                          </button>
                        </div>
                      </div>
                      <div className="jenie-product-body">
                        <span className="jenie-product-cat">{p.category}</span>
                        <h4 className="jenie-product-title" onClick={() => openPdp(p)}>
                          {p.name}
                        </h4>
                        <div className="jenie-product-rating">
                          {'★'.repeat(Math.round(p.rating))}
                          <span style={{ color: '#6B7280', marginLeft: 4 }}>({p.reviewCount})</span>
                        </div>
                        <div className="jenie-size-row">
                          {p.sizes.slice(0, 4).map((s) => (
                            <button
                              key={s}
                              className={`jenie-size-btn ${curSize === s ? 'active' : ''}`}
                              onClick={() => setSelectedCardSizes((prev) => ({ ...prev, [p.id]: s }))}
                            >
                              {s}
                            </button>
                          ))}
                        </div>
                        <div className="jenie-product-footer">
                          <div className="jenie-price-wrap">
                            <span className="jenie-price">${p.price}.00</span>
                            {p.compareAtPrice && (
                              <span className="jenie-compare-price">${p.compareAtPrice}.00</span>
                            )}
                          </div>
                          <button
                            className="jenie-quick-add-btn"
                            onClick={() => addToCart(p, curSize, curWash, 1)}
                          >
                            Add to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* SECTION 6: INSTAGRAM & UGC STREAM (.instagram-v1) */}
          <section id="jenie-instagram" className="jenie-instagram-section">
            <div className="jenie-container">
              <div className="jenie-instagram-header">
                <div className="jenie-instagram-icon-badge">
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </div>
                <h3>Made by us, Shared by you</h3>
                <p>Tag @JenieDenim to see your picture featured in our gallery #JenieDenim</p>
              </div>
            </div>

            <div className="jenie-instagram-grid">
              {JENIE_INSTAGRAM_POSTS.map((post) => (
                <div key={post.id} className="jenie-instagram-tile">
                  <img src={post.image} alt={post.handle} />
                  <div className="jenie-instagram-tile-overlay">
                    <span>{post.handle} • {post.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* SECTION 7: FOOTER (.footer-v4) */}
      <footer className="jenie-footer">
        <div className="jenie-container">
          <div className="jenie-footer-grid">
            <div className="jenie-footer-col">
              <div className="jenie-logo" style={{ color: '#FFFFFF', marginBottom: 16 }}>
                Jenie
                <span>DENIM</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
                Crafted for everyday adventures. Timeless American denim heritage re-engineered with sustainable organic cotton and premium ring-spun weaves.
              </p>
              <div className="jenie-footer-newsletter">
                <input type="email" placeholder="Enter your email" />
                <button
                  onClick={() => showToast('Thank you! Welcome code DENIM15 applied.')}
                >
                  Join
                </button>
              </div>
            </div>

            <div className="jenie-footer-col">
              <h4>Information</h4>
              <ul>
                <li><a href="#custom-service" onClick={() => showToast('Custom Service: help@jenie-denim.com')}>Custom Service</a></li>
                <li><a href="#faq" onClick={() => showToast('FAQs')}>F.A.Q.'s</a></li>
                <li><a href="#tracking" onClick={() => showToast('Track Your Denim Order')}>Ordering Tracking</a></li>
                <li><a href="#contact" onClick={() => showToast('Contact Us')}>Contact Us</a></li>
                <li><a href="#events" onClick={() => showToast('Denim Events')}>Events</a></li>
              </ul>
            </div>

            <div className="jenie-footer-col">
              <h4>Services</h4>
              <ul>
                <li><a href="#sitemap" onClick={() => setViewMode('collection')}>Sitemap</a></li>
                <li><a href="#privacy" onClick={() => showToast('Privacy Policy')}>Privacy Policy</a></li>
                <li><a href="#account" onClick={() => showToast('Your Account')}>Your Account</a></li>
                <li><a href="#fit-guide" onClick={() => showToast('Denim Fit Guide')}>Denim Fit Guide</a></li>
                <li><a href="#terms" onClick={() => showToast('Terms & Conditions')}>Terms & Conditions</a></li>
              </ul>
            </div>

            <div className="jenie-footer-col">
              <h4>Store Location</h4>
              <p style={{ fontSize: 13, lineHeight: 1.8 }}>
                742 Evergreen Terrace, Denim District<br />
                San Francisco, CA 94103<br />
                Mon – Sat: 9:00 AM – 7:00 PM EST<br />
                Tel: +1 (800) 555-DENIM
              </p>
            </div>
          </div>

          <div className="jenie-footer-bottom">
            <div>© 2026 Jenie - Jeans & Fashion Store Shopify 2.0 Theme. All Rights Reserved.</div>
            <div style={{ display: 'flex', gap: 16 }}>
              <span>Visa</span>
              <span>MasterCard</span>
              <span>Amex</span>
              <span>PayPal</span>
              <span>Apple Pay</span>
            </div>
          </div>
        </div>
      </footer>

      {/* SLIDE-OVER CART DRAWER */}
      <div
        className={`jenie-drawer-backdrop ${isCartOpen ? 'open' : ''}`}
        onClick={() => setIsCartOpen(false)}
      />
      <div className={`jenie-cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="jenie-drawer-header">
          <h3>Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</h3>
          <button onClick={() => setIsCartOpen(false)} style={{ fontSize: 20 }}>
            ✕
          </button>
        </div>

        <div className="jenie-drawer-body">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#6B7280' }}>
              Your shopping bag is currently empty.
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div key={`${item.product.id}-${item.size}-${item.wash}`} className="jenie-drawer-item">
                <img src={item.product.image} alt={item.product.name} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, margin: '0 0 4px' }}>
                    {item.product.name}
                  </h4>
                  <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 8 }}>
                    Size: {item.size} | {item.wash} | ${item.product.price}.00
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #E5E7EB',
                        borderRadius: '0.6rem',
                        padding: '2px 8px',
                      }}
                    >
                      <button onClick={() => updateCartQty(idx, -1)} style={{ padding: '0 4px' }}>
                        -
                      </button>
                      <span style={{ fontSize: 13, fontWeight: 700, margin: '0 8px' }}>
                        {item.quantity}
                      </span>
                      <button onClick={() => updateCartQty(idx, 1)} style={{ padding: '0 4px' }}>
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => updateCartQty(idx, -item.quantity)}
                      style={{ fontSize: 12, color: '#EF4444' }}
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
          <div className="jenie-drawer-footer">
            <div className="jenie-drawer-subtotal">
              <span>Subtotal:</span>
              <span>${cartSubtotal}.00</span>
            </div>
            <button
              className="jenie-btn jenie-btn-primary"
              style={{ width: '100%' }}
              onClick={() => showToast('Proceeding to Checkout...')}
            >
              Checkout Now
            </button>
          </div>
        )}
      </div>

      {/* QUICK VIEW MODAL */}
      {isQuickViewOpen && (
        <div className="jenie-drawer-backdrop open" onClick={() => setIsQuickViewOpen(false)}>
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#FFFFFF',
              padding: 36,
              borderRadius: 12,
              maxWidth: 720,
              width: '90%',
              zIndex: 10002,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
              <button onClick={() => setIsQuickViewOpen(false)} style={{ fontSize: 20 }}>
                ✕
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{ width: '100%', height: 380, objectFit: 'cover', borderRadius: 8 }}
              />
              <div>
                <span className="jenie-product-cat">{quickViewProduct.category}</span>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, margin: '8px 0' }}>
                  {quickViewProduct.name}
                </h3>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#1E2C3D', marginBottom: 12 }}>
                  ${quickViewProduct.price}.00
                </div>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, marginBottom: 16 }}>
                  {quickViewProduct.description}
                </p>
                <button
                  className="jenie-btn jenie-btn-primary"
                  onClick={() => {
                    addToCart(quickViewProduct, quickViewProduct.sizes[0] || '28', quickViewProduct.wash, 1)
                    setIsQuickViewOpen(false)
                  }}
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMPARISON MODAL */}
      {isCompareOpen && (
        <div className="jenie-drawer-backdrop open" onClick={() => setIsCompareOpen(false)}>
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#FFFFFF',
              padding: 36,
              borderRadius: 12,
              maxWidth: 880,
              width: '90%',
              zIndex: 10002,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', margin: 0 }}>
                Denim Style Comparison
              </h3>
              <button onClick={() => setIsCompareOpen(false)} style={{ fontSize: 20 }}>
                ✕
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${compareIds.length}, 1fr)`, gap: 20 }}>
              {compareIds.map((id) => {
                const prod = JENIE_PRODUCTS.find((p) => p.id === id)
                if (!prod) return null
                return (
                  <div
                    key={id}
                    style={{ border: '1px solid #E5E7EB', padding: 16, borderRadius: 8, textAlign: 'center' }}
                  >
                    <img src={prod.image} alt={prod.name} style={{ width: 120, height: 140, objectFit: 'cover' }} />
                    <h4 style={{ margin: '8px 0' }}>{prod.name}</h4>
                    <div style={{ fontWeight: 700, color: '#1E2C3D', marginBottom: 8 }}>${prod.price}.00</div>
                    <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>Fit: <b>{prod.fit}</b></div>
                    <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 12 }}>Stretch: <b>{prod.stretchLevel}</b></div>
                    <button
                      className="jenie-btn jenie-btn-primary"
                      style={{ fontSize: 12, padding: '6px 14px' }}
                      onClick={() => addToCart(prod, prod.sizes[0] || '28', prod.wash, 1)}
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
export default JenieFashionStorefront
