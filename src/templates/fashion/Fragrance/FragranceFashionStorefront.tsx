import React, { useState, useMemo } from 'react'
import type {
  FragranceProduct,
  FragranceCartItem,
  FragranceStorefrontProps,
  FragranceFilterState,
} from './types'
import {
  FRAGRANCE_HERO_PRODUCT,
  FRAGRANCE_PRODUCTS,
  FRAGRANCE_REVIEWS,
  FRAGRANCE_BLOGS,
  FRAGRANCE_PARTNERS,
  FRAGRANCE_PROMISES,
} from './data/fragranceData'
import './styles/fragranceFashion.css'

export const FragranceFashionStorefront: React.FC<FragranceStorefrontProps> = ({
  template: _template,
  device: _device = 'desktop',
  customAccentColor: _customAccentColor,
  onColorChange: _onColorChange,
  onUseTemplate: _onUseTemplate,
}) => {
  // Navigation & View Mode
  const [viewMode, setViewMode] = useState<'home' | 'collection' | 'pdp'>('home')
  const [selectedProduct, setSelectedProduct] = useState<FragranceProduct>(FRAGRANCE_HERO_PRODUCT)
  const [bestsellerTab, setBestsellerTab] = useState<'Men' | 'Unisex' | 'Women' | 'Bestseller'>('Men')

  // Hero Section State
  const [heroImageIdx, setHeroImageIdx] = useState<number>(0)
  const [isHotspotOpen, setIsHotspotOpen] = useState<boolean>(false)
  const [heroSelectedSize, setHeroSelectedSize] = useState<string>('50ml')

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState<boolean>(false)
  const [quickViewProduct, setQuickViewProduct] = useState<FragranceProduct>(FRAGRANCE_HERO_PRODUCT)
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  // State: Cart, Wishlist, Compare
  const [cartItems, setCartItems] = useState<FragranceCartItem[]>([
    {
      product: FRAGRANCE_HERO_PRODUCT,
      volume: '50ml',
      quantity: 1,
    },
  ])
  const [wishlistIds, setWishlistIds] = useState<string[]>([FRAGRANCE_HERO_PRODUCT.id])
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [selectedCardSizes, setSelectedCardSizes] = useState<Record<string, string>>({})

  // PDP Variant State
  const [pdpSelectedImage, setPdpSelectedImage] = useState<string>(FRAGRANCE_HERO_PRODUCT.image)
  const [pdpSelectedSize, setPdpSelectedSize] = useState<string>('50ml')
  const [pdpQty, setPdpQty] = useState<number>(1)
  const [pdpTab, setPdpTab] = useState<'notes' | 'ingredients' | 'usage'>('notes')

  // Collection Filter State
  const [filters, setFilters] = useState<FragranceFilterState>({
    family: 'All',
    category: 'All',
    concentration: 'All',
    selectedVolumes: [],
    priceRange: [0, 80],
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
  const addToCart = (product: FragranceProduct, volume: string, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.volume === volume
      )
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.volume === volume
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      }
      return [...prev, { product, volume, quantity: qty }]
    })
    showToast(`Added "${product.name}" (${volume}) to your cart!`)
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
      showToast(exists ? 'Removed from wishlist' : 'Added to wishlist!')
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
        showToast('You can compare up to 3 fragrances simultaneously')
        return prev
      }
      showToast('Added to fragrance comparison')
      return [...prev, id]
    })
  }

  const openPdp = (product: FragranceProduct) => {
    setSelectedProduct(product)
    setPdpSelectedImage(product.image)
    setPdpSelectedSize(product.volumes[0] || '50ml')
    setPdpQty(1)
    setViewMode('pdp')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Filtered Products for Bestseller Tab
  const bestsellerProducts = useMemo(() => {
    if (bestsellerTab === 'Bestseller') {
      return FRAGRANCE_PRODUCTS.filter((p) => p.isBestseller)
    }
    return FRAGRANCE_PRODUCTS.filter((p) => p.category === bestsellerTab)
  }, [bestsellerTab])

  // Filtered Products for Collection View
  const collectionProducts = useMemo(() => {
    return FRAGRANCE_PRODUCTS.filter((p) => {
      if (filters.category !== 'All' && p.category !== filters.category) return false
      if (filters.family !== 'All' && p.family !== filters.family) return false
      if (filters.concentration !== 'All' && p.concentration !== filters.concentration) return false
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

  return (
    <div className="fragrance-theme-root">
      {/* Toast Notification */}
      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            background: '#013D29',
            color: '#FFFFFF',
            padding: '12px 24px',
            borderRadius: 30,
            fontSize: 13,
            fontWeight: 600,
            zIndex: 9999,
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
          }}
        >
          {toastMsg}
        </div>
      )}

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="fragrance-announcebar">
        <div className="fragrance-container">
          <div className="fragrance-announce-row">
            <div className="fragrance-announce-left">
              <span>
                <svg viewBox="0 0 12 12">
                  <path d="M11.87 1.16L7.6 10.72c-.1.2-.3.3-.5.3-.2 0-.4-.1-.5-.2L4.9 9.1 3.3 10.6c-.1.1-.3.2-.5.1-.2-.1-.3-.2-.3-.4l-.2-3.1-2.1-1.2c-.2-.1-.3-.3-.3-.5 0-.2.1-.4.3-.5L11.3 1c.2-.1.4 0 .5.1z" />
                </svg>
                <b>7 days a week</b> from 9:00 am to 7:00 pm
              </span>
              <a href="tel:610-403-403">
                <svg viewBox="0 0 12 18">
                  <path d="M.75 2.25C.75 1 1.76 0 3 0h6c1.24 0 2.25 1 2.25 2.25v13.5C11.25 17 10.24 18 9 18H3c-1.24 0-2.25-1-2.25-2.25V2.25z" />
                </svg>
                Call us: <b>610-403-403</b>
              </a>
            </div>
            <div className="fragrance-announce-right">
              <select className="fragrance-select-pill">
                <option>English</option>
                <option>العربية</option>
                <option>Deutsch</option>
                <option>Español</option>
              </select>
              <select className="fragrance-select-pill">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN NAVIGATION BAR */}
      <header className="fragrance-site-header">
        <div className="fragrance-container">
          <div className="fragrance-nav-row">
            {/* Brand Logo */}
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault()
                setViewMode('home')
              }}
              className="fragrance-logo"
            >
              FRAGRANCE
              <span>WORKDO</span>
            </a>

            {/* Navigation Links */}
            <ul className="fragrance-main-nav">
              <li className="fragrance-nav-item">
                <a
                  href="#scent"
                  className={`fragrance-nav-link ${viewMode === 'collection' ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault()
                    setViewMode('collection')
                  }}
                >
                  SCENT
                </a>
                {/* Mega Menu Dropdown */}
                <div className="fragrance-megamenu">
                  <div>
                    <div className="fragrance-megamenu-title">Curated Fragrances</div>
                    <ul className="fragrance-megamenu-list">
                      {FRAGRANCE_PRODUCTS.slice(0, 5).map((p) => (
                        <li key={p.id}>
                          <a
                            href={`#${p.id}`}
                            onClick={(e) => {
                              e.preventDefault()
                              openPdp(p)
                            }}
                          >
                            {p.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="fragrance-megamenu-title">Olfactory Families</div>
                    <ul className="fragrance-megamenu-list">
                      <li>
                        <a
                          href="#woody"
                          onClick={(e) => {
                            e.preventDefault()
                            setFilters((f) => ({ ...f, family: 'Woody' }))
                            setViewMode('collection')
                          }}
                        >
                          Woody & Agarwood
                        </a>
                      </li>
                      <li>
                        <a
                          href="#oriental"
                          onClick={(e) => {
                            e.preventDefault()
                            setFilters((f) => ({ ...f, family: 'Oriental' }))
                            setViewMode('collection')
                          }}
                        >
                          Oriental & Spices
                        </a>
                      </li>
                      <li>
                        <a
                          href="#fresh"
                          onClick={(e) => {
                            e.preventDefault()
                            setFilters((f) => ({ ...f, family: 'Fresh & Citrus' }))
                            setViewMode('collection')
                          }}
                        >
                          Fresh & Aquatic
                        </a>
                      </li>
                      <li>
                        <a
                          href="#floral"
                          onClick={(e) => {
                            e.preventDefault()
                            setFilters((f) => ({ ...f, family: 'Floral' }))
                            setViewMode('collection')
                          }}
                        >
                          Floral & Damascus
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </li>
              <li className="fragrance-nav-item">
                <a
                  href="#men"
                  className="fragrance-nav-link"
                  onClick={(e) => {
                    e.preventDefault()
                    setFilters((f) => ({ ...f, category: 'Men' }))
                    setViewMode('collection')
                  }}
                >
                  Men
                </a>
              </li>
              <li className="fragrance-nav-item">
                <a
                  href="#bestseller"
                  className="fragrance-nav-link"
                  onClick={(e) => {
                    e.preventDefault()
                    setBestsellerTab('Bestseller')
                    if (viewMode !== 'home') setViewMode('home')
                    const el = document.getElementById('bestseller-sec')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  Bestseller
                </a>
              </li>
              <li className="fragrance-nav-item">
                <a
                  href="#about"
                  className="fragrance-nav-link"
                  onClick={(e) => {
                    e.preventDefault()
                    const el = document.getElementById('testimonials-sec')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  About Us
                </a>
              </li>
            </ul>

            {/* Right Action Icons */}
            <div className="fragrance-menu-right">
              <button
                className="fragrance-icon-btn"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <svg viewBox="0 0 19 19">
                  <path d="M7 0C3.13 0 0 3.13 0 7s3.13 7 7 7c1.61 0 3.1-.55 4.28-1.47l5.6 5.6c.36.36.95.36 1.32 0s.36-.95 0-1.32l-5.6-5.6C13.45 10.1 14 8.61 14 7c0-3.87-3.13-7-7-7zm0 1.87c2.83 0 5.13 2.3 5.13 5.13s-2.3 5.13-5.13 5.13S1.87 9.83 1.87 7 4.17 1.87 7 1.87z" />
                </svg>
                <span>Search</span>
              </button>

              <button
                className="fragrance-icon-btn"
                onClick={() => showToast('Customer Concierge Profile')}
              >
                <svg viewBox="0 0 16 22">
                  <path d="M13.37 21.04H4.6c-.48 0-.88-.39-.88-.88s.4-.88.88-.88h8.77c.48 0 .88-.4.88-.88v-3.64c-.04-.5-.34-.93-.78-1.15-3.44-1.39-7.28-1.39-10.72 0-.44.22-.73.66-.78 1.15v5.39c0 .49-.4.88-.88.88s-.88-.39-.88-.88v-5.39c.04-1.21.77-2.29 1.88-2.78 3.86-1.56 8.17-1.56 12.03 0 1.11.49 1.84 1.57 1.88 2.78v3.64c0 1.45-1.18 2.63-2.63 2.63zM12.49 4.38C12.49 1.96 10.53 0 8.11 0S3.72 1.96 3.72 4.38s1.96 4.38 4.39 4.38 4.38-1.96 4.38-4.38z" />
                </svg>
                <span>My profile</span>
              </button>

              {compareIds.length > 0 && (
                <button
                  className="fragrance-icon-btn"
                  onClick={() => setIsCompareOpen(true)}
                  style={{ color: '#D4AF37' }}
                >
                  <span>Compare ({compareIds.length})</span>
                </button>
              )}

              <button
                className="fragrance-icon-btn fragrance-cart-bubble"
                onClick={() => setIsCartOpen(true)}
              >
                <svg viewBox="0 0 19 17">
                  <path d="M15.57 10.63H6.97c-1.16 0-2.16-.83-2.37-1.97L3.48 2.6c-.07-.39-.41-.67-.8-.67H.8C.36 1.93 0 1.57 0 1.13S.36.32.8.32h1.89c1.16 0 2.16.83 2.37 1.97l1.12 6.07c.07.39.41.67.8.66h8.59c.39 0 .73-.28.8-.66l1.02-5.48c.04-.24-.02-.48-.18-.66-.16-.18-.39-.29-.63-.29H7.25c-.44 0-.8-.36-.8-.8s.36-.8.8-.8h9.35c.78 0 1.48.37 1.93.99.45.62.58 1.4.37 2.15l-1.01 5.48c-.28 1.52-1.6 2.63-3.12 2.63z" />
                  <circle cx="6.5" cy="14.5" r="1.5" />
                  <circle cx="14.5" cy="14.5" r="1.5" />
                </svg>
                <div className="fragrance-cart-badge">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                </div>
              </button>
            </div>
          </div>

          {/* Quick Search Dropdown Bar */}
          {isSearchOpen && (
            <div style={{ padding: '12px 0 20px', borderTop: '1px solid #E8E3DA' }}>
              <input
                type="text"
                placeholder="Search perfumes by note, name, or accord..."
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
                  borderRadius: 30,
                  border: '1px solid #013D29',
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
          <div className="fragrance-container">
            <div className="section-title d-flex align-items-center justify-content-between">
              <div>
                <div className="subtitle">THE COLLECTION</div>
                <h2>Explore All <b>Fragrances</b></h2>
              </div>
              <button
                className="btn-secondary"
                onClick={() => setViewMode('home')}
              >
                Back to Home
              </button>
            </div>

            {/* Filter pills */}
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 36 }}>
              {(['All', 'Men', 'Unisex', 'Women'] as const).map((cat) => (
                <button
                  key={cat}
                  className={`fragrance-size-chip ${filters.category === cat ? 'active' : ''}`}
                  onClick={() => setFilters((f) => ({ ...f, category: cat }))}
                >
                  {cat === 'All' ? 'All Genders' : cat}
                </button>
              ))}
              {(['All', 'Woody', 'Oriental', 'Fresh & Citrus', 'Floral'] as const).map((fam) => (
                <button
                  key={fam}
                  className={`fragrance-size-chip ${filters.family === fam ? 'active' : ''}`}
                  onClick={() => setFilters((f) => ({ ...f, family: fam }))}
                >
                  {fam}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="fragrance-product-grid">
              {collectionProducts.map((p) => {
                const curSize = selectedCardSizes[p.id] || p.volumes[0] || '50ml'
                return (
                  <div key={p.id} className="fragrance-product-card">
                    <div className="fragrance-card-media">
                      <img src={p.image} alt={p.name} />
                      {p.badge && <span className="fragrance-card-badge-pill">{p.badge}</span>}
                      <div className="fragrance-hover-actions">
                        <button
                          className="fragrance-quick-btn"
                          title="Quick View"
                          onClick={() => {
                            setQuickViewProduct(p)
                            setIsQuickViewOpen(true)
                          }}
                        >
                          👁
                        </button>
                        <button
                          className={`fragrance-quick-btn ${wishlistIds.includes(p.id) ? 'active' : ''}`}
                          title="Wishlist"
                          onClick={() => toggleWishlist(p.id)}
                        >
                          ♥
                        </button>
                        <button
                          className="fragrance-quick-btn"
                          title="Compare"
                          onClick={() => toggleCompare(p.id)}
                        >
                          ⇄
                        </button>
                      </div>
                    </div>
                    <div className="fragrance-card-body">
                      <div className="fragrance-card-subtitle">{p.subtitle}</div>
                      <h4
                        className="fragrance-card-title"
                        style={{ cursor: 'pointer' }}
                        onClick={() => openPdp(p)}
                      >
                        {p.name}
                      </h4>
                      <div className="fragrance-card-sizes">
                        {p.volumes.map((vol) => (
                          <button
                            key={vol}
                            className={`fragrance-card-size-opt ${curSize === vol ? 'active' : ''}`}
                            onClick={() =>
                              setSelectedCardSizes((prev) => ({ ...prev, [p.id]: vol }))
                            }
                          >
                            {vol}
                          </button>
                        ))}
                      </div>
                      <div className="fragrance-card-rating">
                        {'★'.repeat(Math.round(p.rating))}
                        <span style={{ color: '#5C6E72', marginLeft: 4 }}>({p.reviewCount})</span>
                      </div>
                      <div className="fragrance-card-bottom">
                        <div className="fragrance-price-block">
                          <span className="fragrance-current-price">${p.price}</span>
                          {p.compareAtPrice && (
                            <span className="fragrance-compare-price">${p.compareAtPrice}</span>
                          )}
                        </div>
                        <button
                          className="fragrance-card-add-btn"
                          onClick={() => addToCart(p, curSize, 1)}
                        >
                          Add to Cart
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
          <div className="fragrance-container">
            <button
              className="btn-secondary"
              style={{ marginBottom: 32 }}
              onClick={() => setViewMode('home')}
            >
              ← Back to Storefront
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
              {/* Left Gallery */}
              <div>
                <div
                  style={{
                    background: '#F9F8F6',
                    borderRadius: 12,
                    padding: 30,
                    textAlign: 'center',
                    marginBottom: 16,
                  }}
                >
                  <img
                    src={pdpSelectedImage}
                    alt={selectedProduct.name}
                    style={{ width: '100%', maxHeight: 480, objectFit: 'contain' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {selectedProduct.gallery.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setPdpSelectedImage(img)}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 8,
                        border: pdpSelectedImage === img ? '2px solid #013D29' : '1px solid #E8E3DA',
                        overflow: 'hidden',
                        padding: 4,
                      }}
                    >
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right Product Specs */}
              <div>
                <span className="fragrance-badge-tag">{selectedProduct.concentration}</span>
                <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 38, margin: '8px 0 12px' }}>
                  {selectedProduct.name}
                </h1>
                <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 20 }}>
                  <div style={{ color: '#D4AF37' }}>
                    {'★'.repeat(Math.round(selectedProduct.rating))} ({selectedProduct.reviewCount} Reviews)
                  </div>
                  <span style={{ color: '#5C6E72' }}>• SKU: {selectedProduct.sku}</span>
                </div>

                <div className="fragrance-price-block" style={{ marginBottom: 24 }}>
                  <span className="fragrance-current-price" style={{ fontSize: 36 }}>
                    ${selectedProduct.price}.00
                  </span>
                  {selectedProduct.compareAtPrice && (
                    <span className="fragrance-compare-price" style={{ fontSize: 22 }}>
                      ${selectedProduct.compareAtPrice}.00
                    </span>
                  )}
                </div>

                <p style={{ color: '#5C6E72', lineHeight: 1.7, marginBottom: 24 }}>
                  {selectedProduct.description}
                </p>

                {/* Size Swatches */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 8, textTransform: 'uppercase' }}>
                    Select Flacon Volume:
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {selectedProduct.volumes.map((vol) => (
                      <button
                        key={vol}
                        className={`fragrance-size-chip ${pdpSelectedSize === vol ? 'active' : ''}`}
                        onClick={() => setPdpSelectedSize(vol)}
                      >
                        {vol}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Cart Actions */}
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 36 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '1px solid #E8E3DA',
                      borderRadius: 30,
                      padding: '4px 16px',
                    }}
                  >
                    <button
                      onClick={() => setPdpQty(Math.max(1, pdpQty - 1))}
                      style={{ fontSize: 18, padding: '4px 8px' }}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: 700, margin: '0 12px' }}>{pdpQty}</span>
                    <button
                      onClick={() => setPdpQty(pdpQty + 1)}
                      style={{ fontSize: 18, padding: '4px 8px' }}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="fragrance-btn-primary"
                    style={{ flex: 1 }}
                    onClick={() => addToCart(selectedProduct, pdpSelectedSize, pdpQty)}
                  >
                    Add to Cart
                  </button>
                  <button
                    className="fragrance-action-icon"
                    onClick={() => toggleWishlist(selectedProduct.id)}
                  >
                    ♥
                  </button>
                </div>

                {/* Tabs for Notes, Ingredients, Usage */}
                <div style={{ borderTop: '1px solid #E8E3DA', paddingTop: 24 }}>
                  <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
                    <button
                      style={{
                        fontWeight: 700,
                        borderBottom: pdpTab === 'notes' ? '2px solid #013D29' : 'none',
                        paddingBottom: 6,
                        color: pdpTab === 'notes' ? '#013D29' : '#5C6E72',
                      }}
                      onClick={() => setPdpTab('notes')}
                    >
                      Scent Notes
                    </button>
                    <button
                      style={{
                        fontWeight: 700,
                        borderBottom: pdpTab === 'ingredients' ? '2px solid #013D29' : 'none',
                        paddingBottom: 6,
                        color: pdpTab === 'ingredients' ? '#013D29' : '#5C6E72',
                      }}
                      onClick={() => setPdpTab('ingredients')}
                    >
                      Ingredients
                    </button>
                    <button
                      style={{
                        fontWeight: 700,
                        borderBottom: pdpTab === 'usage' ? '2px solid #013D29' : 'none',
                        paddingBottom: 6,
                        color: pdpTab === 'usage' ? '#013D29' : '#5C6E72',
                      }}
                      onClick={() => setPdpTab('usage')}
                    >
                      Ritual & Sillage
                    </button>
                  </div>

                  {pdpTab === 'notes' && (
                    <div style={{ fontSize: 14, color: '#4F4632' }}>
                      <p><b>Top Notes:</b> {selectedProduct.notes.top.join(', ')}</p>
                      <p><b>Heart Notes:</b> {selectedProduct.notes.heart.join(', ')}</p>
                      <p><b>Base Notes:</b> {selectedProduct.notes.base.join(', ')}</p>
                    </div>
                  )}

                  {pdpTab === 'ingredients' && (
                    <p style={{ fontSize: 13, color: '#5C6E72', lineHeight: 1.6 }}>
                      {selectedProduct.ingredients}
                    </p>
                  )}

                  {pdpTab === 'usage' && (
                    <div style={{ fontSize: 14, color: '#5C6E72' }}>
                      <p>{selectedProduct.usageTips}</p>
                      <p><b>Longevity:</b> {selectedProduct.longevity} | <b>Sillage:</b> {selectedProduct.sillage}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          VIEW MODE: HOMEPAGE (ALL 11 AUTHENTIC SECTIONS)
          ========================================================= */}
      {viewMode === 'home' && (
        <>
          {/* 1. HERO SECTION (.main-hiro-section) */}
          <section className="fragrance-hero-section">
            <div className="fragrance-container">
              {/* Centered Large Title */}
              <div className="fragrance-hero-center-title">
                <h2>Old Wood Perfume</h2>
                <span>MEN & UNISEX</span>
                <p>
                  The top notes of Mystic Essence burst forth with a burst of sparkling bergamot and juicy mandarin, instantly uplifting your spirits and awakening your senses.
                </p>
              </div>

              {/* Asymmetrical 2-Column Hero */}
              <div className="fragrance-hero-row">
                {/* Left Column: Big Flacon with Interactive Tooltip Pin */}
                <div className="fragrance-hero-left">
                  <div
                    className="fragrance-explore-link"
                    onClick={() => {
                      const el = document.getElementById('all-perfumes-sec')
                      el?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <span>
                      <svg viewBox="0 0 21 10" fill="none">
                        <path d="M20 2L13.7 8.3 7.3 2 1 8.3" stroke="#013D29" strokeWidth="1.7" />
                      </svg>
                    </span>
                    EXPLORE
                  </div>

                  <div className="fragrance-hero-bottle-wrap">
                    <img
                      src={FRAGRANCE_HERO_PRODUCT.gallery[heroImageIdx] || FRAGRANCE_HERO_PRODUCT.image}
                      alt="Old Wood Perfume"
                      className="fragrance-hero-bottle-img"
                    />

                    {/* Interactive Hotspot Tooltip Pin on the Flacon */}
                    <div className="fragrance-hotspot">
                      <div
                        className="fragrance-hotspot-pin"
                        onClick={() => setIsHotspotOpen(!isHotspotOpen)}
                        title="Click to view featured perfume"
                      >
                        +
                      </div>
                      {isHotspotOpen && (
                        <div className="fragrance-hotspot-card">
                          <img src={FRAGRANCE_HERO_PRODUCT.image} alt="Ajmal Khallab" />
                          <div>
                            <h4>Ajmal Khallab</h4>
                            <span>$25.00</span>
                            <div style={{ marginTop: 4 }}>
                              <a
                                href="#view"
                                onClick={(e) => {
                                  e.preventDefault()
                                  openPdp(FRAGRANCE_HERO_PRODUCT)
                                }}
                                style={{ fontSize: 11, color: '#013D29', fontWeight: 700 }}
                              >
                                View Specs →
                              </a>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Column: Floating White Product Card */}
                <div className="fragrance-hero-card">
                  <div className="fragrance-hero-card-header">
                    <svg className="fragrance-pulse-svg" viewBox="0 0 13 6" fill="none">
                      <path d="M1 4.7L4.7 1 8.3 4.7 12 1" stroke="#F3734D" strokeWidth="1.5" />
                    </svg>
                    <div className="fragrance-card-actions">
                      <button
                        className={`fragrance-action-icon ${wishlistIds.includes(FRAGRANCE_HERO_PRODUCT.id) ? 'active' : ''}`}
                        title="Wishlist"
                        onClick={() => toggleWishlist(FRAGRANCE_HERO_PRODUCT.id)}
                      >
                        ♥
                      </button>
                      <button
                        className="fragrance-action-icon"
                        title="Compare"
                        onClick={() => toggleCompare(FRAGRANCE_HERO_PRODUCT.id)}
                      >
                        ⇄
                      </button>
                      <button
                        className="fragrance-action-icon"
                        title="Quick View"
                        onClick={() => {
                          setQuickViewProduct(FRAGRANCE_HERO_PRODUCT)
                          setIsQuickViewOpen(true)
                        }}
                      >
                        👁
                      </button>
                    </div>
                  </div>

                  <h3>{FRAGRANCE_HERO_PRODUCT.name}</h3>
                  <div className="subtitle">scent</div>
                  <p>
                    Ajmal Khallab is described as an oriental and woody fragrance that combines various notes to create a rich and captivating scent. Features noble agarwood and velvety amber.
                  </p>
                  <a
                    href="#show-more"
                    onClick={(e) => {
                      e.preventDefault()
                      openPdp(FRAGRANCE_HERO_PRODUCT)
                    }}
                    style={{
                      fontSize: 12,
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      color: '#013D29',
                      display: 'inline-block',
                      marginBottom: 18,
                    }}
                  >
                    SHOW MORE →
                  </a>

                  {/* 3 Mini Thumbnails with Circle Plus Icons */}
                  <div className="fragrance-thumb-row">
                    {FRAGRANCE_HERO_PRODUCT.gallery.map((img, i) => (
                      <div
                        key={i}
                        className={`fragrance-thumb-btn ${heroImageIdx === i ? 'active' : ''}`}
                        onClick={() => setHeroImageIdx(i)}
                      >
                        <img src={img} alt="" />
                        <span>+</span>
                      </div>
                    ))}
                  </div>

                  {/* Size chips */}
                  <div className="fragrance-size-chips">
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#4F4632' }}>Size:</span>
                    {FRAGRANCE_HERO_PRODUCT.volumes.map((vol) => (
                      <button
                        key={vol}
                        className={`fragrance-size-chip ${heroSelectedSize === vol ? 'active' : ''}`}
                        onClick={() => setHeroSelectedSize(vol)}
                      >
                        {vol}
                      </button>
                    ))}
                  </div>

                  {/* Footer with price & Add to Cart */}
                  <div className="fragrance-card-footer">
                    <div className="fragrance-price-block">
                      <span className="fragrance-current-price">${FRAGRANCE_HERO_PRODUCT.price}.00</span>
                      {FRAGRANCE_HERO_PRODUCT.compareAtPrice && (
                        <span className="fragrance-compare-price">${FRAGRANCE_HERO_PRODUCT.compareAtPrice}.00</span>
                      )}
                    </div>
                    <button
                      className="fragrance-btn-primary"
                      onClick={() => addToCart(FRAGRANCE_HERO_PRODUCT, heroSelectedSize, 1)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. SECTION 2: MAJESTIC PERFUMES (.shoe-two-column-layput offset-left) */}
          <section className="fragrance-two-column-section">
            <div className="fragrance-container">
              <div className="fragrance-two-col-grid">
                <div className="fragrance-two-col-content">
                  <span className="fragrance-badge-tag">90N</span>
                  <div className="section-title" style={{ marginBottom: 16 }}>
                    <h3>Majestic Perfumes</h3>
                    <div className="subtitle">scent</div>
                  </div>
                  <p style={{ color: '#5C6E72', marginBottom: 20 }}>
                    Majestic Perfumes is a brand of fragrances that offers a range of perfumes and colognes. Boasts an opulent blend of royal woods, leather accords, and velvety spices.
                  </p>
                  <div className="fragrance-thumb-row">
                    {FRAGRANCE_PRODUCTS[2].gallery.map((img, i) => (
                      <div key={i} className="fragrance-thumb-btn">
                        <img src={img} alt="" />
                        <span>+</span>
                      </div>
                    ))}
                  </div>
                  <div className="fragrance-card-footer">
                    <div className="fragrance-price-block">
                      <span className="fragrance-current-price">${FRAGRANCE_PRODUCTS[2].price}.00</span>
                      <span className="fragrance-compare-price">${FRAGRANCE_PRODUCTS[2].compareAtPrice}.00</span>
                    </div>
                    <button
                      className="fragrance-btn-primary"
                      onClick={() => addToCart(FRAGRANCE_PRODUCTS[2], '50ml', 1)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>

                <div className="fragrance-two-col-media">
                  <img
                    src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=1000&auto=format&fit=crop&q=80"
                    alt="Majestic Perfumes Lifestyle"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 3. SECTION 3: ALL THE PERFUME (.all-the-shoes) */}
          <section id="all-perfumes-sec" className="fragrance-all-perfume-section">
            <div className="fragrance-container">
              <div className="section-title d-flex align-items-center justify-content-between">
                <div className="section-title-left">
                  <div className="subtitle">ALL PRODUCTS</div>
                  <h2>All the <b>Perfume</b></h2>
                </div>
                <button
                  className="btn-secondary"
                  onClick={() => setViewMode('collection')}
                >
                  <span className="btn-txt">SHOW MORE</span>
                  <span className="btn-ic">
                    <svg viewBox="0 0 10 5">
                      <path d="M0 2.5h8.2L7.2 3.9c-.2.2-.2.4 0 .6.2.2.4.2.6 0l1.6-1.6c.1-.1.2-.2.2-.3s-.1-.2-.2-.3L7.8.7c-.2-.2-.4-.2-.6 0-.2.2-.2.4 0 .6l1 1H0v.2z" />
                    </svg>
                  </span>
                </button>
              </div>

              {/* 4-Column Product Grid */}
              <div className="fragrance-product-grid">
                {FRAGRANCE_PRODUCTS.slice(3, 7).map((p) => {
                  const curSize = selectedCardSizes[p.id] || p.volumes[0] || '50ml'
                  return (
                    <div key={p.id} className="fragrance-product-card">
                      <div className="fragrance-card-media">
                        <img src={p.image} alt={p.name} />
                        {p.badge && <span className="fragrance-card-badge-pill">{p.badge}</span>}
                        <div className="fragrance-hover-actions">
                          <button
                            className="fragrance-quick-btn"
                            title="Quick View"
                            onClick={() => {
                              setQuickViewProduct(p)
                              setIsQuickViewOpen(true)
                            }}
                          >
                            👁
                          </button>
                          <button
                            className={`fragrance-quick-btn ${wishlistIds.includes(p.id) ? 'active' : ''}`}
                            title="Wishlist"
                            onClick={() => toggleWishlist(p.id)}
                          >
                            ♥
                          </button>
                          <button
                            className="fragrance-quick-btn"
                            title="Compare"
                            onClick={() => toggleCompare(p.id)}
                          >
                            ⇄
                          </button>
                        </div>
                      </div>
                      <div className="fragrance-card-body">
                        <div className="fragrance-card-subtitle">{p.subtitle}</div>
                        <h4
                          className="fragrance-card-title"
                          style={{ cursor: 'pointer' }}
                          onClick={() => openPdp(p)}
                        >
                          {p.name}
                        </h4>
                        <div className="fragrance-card-sizes">
                          {p.volumes.map((vol) => (
                            <button
                              key={vol}
                              className={`fragrance-card-size-opt ${curSize === vol ? 'active' : ''}`}
                              onClick={() =>
                                setSelectedCardSizes((prev) => ({ ...prev, [p.id]: vol }))
                              }
                            >
                              {vol}
                            </button>
                          ))}
                        </div>
                        <div className="fragrance-card-rating">
                          {'★'.repeat(Math.round(p.rating))}
                          <span style={{ color: '#5C6E72', marginLeft: 4 }}>({p.reviewCount})</span>
                        </div>
                        <div className="fragrance-card-bottom">
                          <div className="fragrance-price-block">
                            <span className="fragrance-current-price">${p.price}.00</span>
                            {p.compareAtPrice && (
                              <span className="fragrance-compare-price">${p.compareAtPrice}.00</span>
                            )}
                          </div>
                          <button
                            className="fragrance-card-add-btn"
                            onClick={() => addToCart(p, curSize, 1)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* 4. SECTION 4: BESTSELLERS (.bestseller-section.dark-bg) */}
          <section id="bestseller-sec" className="fragrance-bestseller-section">
            <div className="fragrance-container">
              <div className="section-title d-flex align-items-center justify-content-between dark-bg">
                <div className="section-title-left">
                  <h2 style={{ fontSize: 44 }}>
                    Best<b>sellers</b>
                  </h2>
                </div>
                <button
                  className="btn-secondary white-btn"
                  onClick={() => setViewMode('collection')}
                >
                  <span className="btn-txt">SHOW MORE</span>
                  <span className="btn-ic">
                    <svg viewBox="0 0 10 5">
                      <path d="M0 2.5h8.2L7.2 3.9c-.2.2-.2.4 0 .6.2.2.4.2.6 0l1.6-1.6c.1-.1.2-.2.2-.3s-.1-.2-.2-.3L7.8.7c-.2-.2-.4-.2-.6 0-.2.2-.2.4 0 .6l1 1H0v.2z" />
                    </svg>
                  </span>
                </button>
              </div>

              {/* Tabs: Men | Unisex | Women | Bestseller */}
              <div className="fragrance-tab-nav">
                {(['Men', 'Unisex', 'Women', 'Bestseller'] as const).map((tab) => (
                  <button
                    key={tab}
                    className={`fragrance-tab-btn ${bestsellerTab === tab ? 'active' : ''}`}
                    onClick={() => setBestsellerTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Bestseller Grid */}
              <div className="fragrance-bestseller-grid">
                {bestsellerProducts.slice(0, 4).map((p) => {
                  const curSize = selectedCardSizes[p.id] || p.volumes[0] || '50ml'
                  return (
                    <div key={p.id} className="fragrance-bestseller-card">
                      <div className="fragrance-card-media">
                        <img src={p.image} alt={p.name} />
                        {p.badge && <span className="fragrance-card-badge-pill">{p.badge}</span>}
                        <div className="fragrance-hover-actions">
                          <button
                            className="fragrance-quick-btn"
                            title="Quick View"
                            onClick={() => {
                              setQuickViewProduct(p)
                              setIsQuickViewOpen(true)
                            }}
                          >
                            👁
                          </button>
                          <button
                            className={`fragrance-quick-btn ${wishlistIds.includes(p.id) ? 'active' : ''}`}
                            title="Wishlist"
                            onClick={() => toggleWishlist(p.id)}
                          >
                            ♥
                          </button>
                        </div>
                      </div>
                      <div className="fragrance-card-body">
                        <div className="fragrance-card-subtitle" style={{ color: '#D4AF37' }}>
                          {p.subtitle}
                        </div>
                        <h4
                          className="fragrance-card-title"
                          style={{ cursor: 'pointer' }}
                          onClick={() => openPdp(p)}
                        >
                          {p.name}
                        </h4>
                        <div className="fragrance-card-sizes">
                          {p.volumes.map((vol) => (
                            <button
                              key={vol}
                              className={`fragrance-card-size-opt ${curSize === vol ? 'active' : ''}`}
                              onClick={() =>
                                setSelectedCardSizes((prev) => ({ ...prev, [p.id]: vol }))
                              }
                            >
                              {vol}
                            </button>
                          ))}
                        </div>
                        <div className="fragrance-card-bottom">
                          <div className="fragrance-price-block">
                            <span className="fragrance-current-price">${p.price}.00</span>
                          </div>
                          <button
                            className="fragrance-card-add-btn"
                            onClick={() => addToCart(p, curSize, 1)}
                          >
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* 5. SECTION 5: BODY PERFUME RO TY (.shoe-two-column-layput.twocol-dark) */}
          <section className="fragrance-two-column-section fragrance-two-col-dark">
            <div className="fragrance-container">
              <div className="fragrance-two-col-grid">
                <div className="fragrance-two-col-media">
                  <img
                    src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=1000&auto=format&fit=crop&q=80"
                    alt="Body Perfume Ro ty"
                  />
                </div>

                <div className="fragrance-two-col-content">
                  <span className="fragrance-badge-tag">Khalab</span>
                  <div className="section-title" style={{ marginBottom: 16 }}>
                    <h3 style={{ color: '#FFFFFF' }}>Body Perfume Ro ty</h3>
                    <div className="subtitle" style={{ color: '#D4AF37' }}>scent</div>
                  </div>
                  <p style={{ marginBottom: 20 }}>
                    Body perfumes are designed to provide a lighter scent compared to traditional perfumes. Infused with sparkling marine notes, crisp melon, and sunny citrus blossom.
                  </p>
                  <div className="fragrance-thumb-row">
                    {FRAGRANCE_PRODUCTS[1].gallery.map((img, i) => (
                      <div key={i} className="fragrance-thumb-btn">
                        <img src={img} alt="" />
                        <span>+</span>
                      </div>
                    ))}
                  </div>
                  <div className="fragrance-card-footer">
                    <div className="fragrance-price-block">
                      <span className="fragrance-current-price" style={{ color: '#D4AF37' }}>
                        ${FRAGRANCE_PRODUCTS[1].price}.00
                      </span>
                      <span className="fragrance-compare-price" style={{ color: 'rgba(255,255,255,0.5)' }}>
                        ${FRAGRANCE_PRODUCTS[1].compareAtPrice}.00
                      </span>
                    </div>
                    <button
                      className="fragrance-btn-primary"
                      onClick={() => addToCart(FRAGRANCE_PRODUCTS[1], '50ml', 1)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. SECTION 6: PERFUME PERSPECTIVES (.all-showes-second-grid) */}
          <section className="fragrance-perspectives-section">
            <div className="fragrance-container">
              <div className="section-title d-flex align-items-center justify-content-between">
                <div>
                  <div className="subtitle">ALL PRODUCTS</div>
                  <h2>Perfume <b>Perspectives</b></h2>
                </div>
                <button className="btn-secondary" onClick={() => setViewMode('collection')}>
                  SHOW MORE
                </button>
              </div>

              <div className="fragrance-perspectives-grid">
                {FRAGRANCE_PROMISES.slice(0, 3).map((p, i) => (
                  <div key={i} className="fragrance-perspective-card">
                    <div className="fragrance-perspective-icon">{p.icon}</div>
                    <h3>{p.title}</h3>
                    <p>{p.desc}</p>
                    <div className="fragrance-perspective-notes">
                      <span className="fragrance-note-pill">Top Notes</span>
                      <span className="fragrance-note-pill">Heart Accord</span>
                      <span className="fragrance-note-pill">Enduring Base</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 7. SECTION 7: TESTIMONIALS (.testimonial-section.dark-bg) */}
          <section id="testimonials-sec" className="fragrance-testimonial-section">
            <div className="fragrance-container">
              <div className="section-title text-center dark-bg" style={{ textAlign: 'center' }}>
                <div className="subtitle">ALL PRODUCTS</div>
                <h2>Testimonials</h2>
              </div>

              <div className="fragrance-testimonial-grid">
                {FRAGRANCE_REVIEWS.map((rev) => (
                  <div key={rev.id} className="fragrance-testi-card">
                    <div className="fragrance-testi-head">
                      <span className="fragrance-quote-mark">“</span>
                      <h3>{rev.headline}</h3>
                    </div>
                    <p className="fragrance-testi-content">{rev.comment}</p>
                    <div className="fragrance-testi-footer">
                      <div className="fragrance-testi-author">
                        {rev.avatar && (
                          <img src={rev.avatar} alt={rev.author} className="fragrance-testi-avatar" />
                        )}
                        <div>
                          <h6>{rev.author}</h6>
                          <span>{rev.role}</span>
                        </div>
                      </div>
                      <div className="fragrance-stars">{'★'.repeat(rev.rating)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 8. SECTION 8: FROM OUR BLOG (.our-blog-section.dark-bg) */}
          <section className="fragrance-blog-section">
            <div className="fragrance-container">
              <div className="section-title d-flex align-items-center justify-content-between dark-bg">
                <div>
                  <div className="subtitle">LATEST NEWS</div>
                  <h2>From <b>Our Blog</b></h2>
                </div>
                <button className="btn-secondary white-btn" onClick={() => showToast('Blog Archive')}>
                  SHOW MORE
                </button>
              </div>

              <div className="fragrance-blog-grid">
                {FRAGRANCE_BLOGS.map((blog) => (
                  <div key={blog.id} className="fragrance-blog-card">
                    <div className="fragrance-blog-img">
                      <img src={blog.image} alt={blog.title} />
                    </div>
                    <div className="fragrance-blog-body">
                      <div className="fragrance-blog-date">{blog.date}</div>
                      <h4 className="fragrance-blog-title">{blog.title}</h4>
                      <p className="fragrance-blog-excerpt">{blog.excerpt}</p>
                      <a
                        href={`#${blog.slug}`}
                        onClick={(e) => {
                          e.preventDefault()
                          showToast(`Reading "${blog.title}"`)
                        }}
                        style={{ color: '#D4AF37', fontSize: 12, fontWeight: 700 }}
                      >
                        READ ARTICLE →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 9. SECTION 9: PARTNERS (.our-client-section) */}
          <section className="fragrance-partners-section">
            <div className="fragrance-container">
              <div className="fragrance-partners-strip">
                {FRAGRANCE_PARTNERS.map((p) => (
                  <div key={p.id} className="fragrance-partner-item">
                    {p.name}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 10. SECTION 10: SUBSCRIPTION (.subscription-section) */}
          <section className="fragrance-subscription-section">
            <div className="fragrance-container">
              <div className="fragrance-sub-box">
                <h2>Get 20% off for first order</h2>
                <p>
                  Subscribe to receive private invitations to limited Extrait de Parfum releases and rare botanical formulations.
                </p>
                <form
                  className="fragrance-sub-form"
                  onSubmit={(e) => {
                    e.preventDefault()
                    showToast('Thank you! Your 20% privilege code is: SCENT20')
                  }}
                >
                  <input type="email" placeholder="Enter your email address" required />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>
          </section>
        </>
      )}

      {/* 11. SECTION 11: FOOTER (.site-footer) */}
      <footer className="fragrance-footer">
        <div className="fragrance-container">
          <div className="fragrance-footer-grid">
            <div>
              <div className="fragrance-logo" style={{ color: '#FFFFFF', marginBottom: 16 }}>
                FRAGRANCE
                <span>WORKDO</span>
              </div>
              <p style={{ fontSize: 13, lineHeight: 1.7, marginBottom: 16 }}>
                Artisanal perfume house dedicated to the preservation of sacred resins, Grasse floral maceration, and royal agarwood alchemy.
              </p>
              <div style={{ fontSize: 13, color: '#D4AF37' }}>
                Customer Concierge: <b>610-403-403</b>
              </div>
            </div>

            <div>
              <h4>Collections</h4>
              <ul>
                <li><a href="#woody" onClick={() => setViewMode('collection')}>Woody & Oud</a></li>
                <li><a href="#oriental" onClick={() => setViewMode('collection')}>Oriental Resins</a></li>
                <li><a href="#floral" onClick={() => setViewMode('collection')}>Floral Nectars</a></li>
                <li><a href="#citrus" onClick={() => setViewMode('collection')}>Fresh Citrus</a></li>
              </ul>
            </div>

            <div>
              <h4>Client Care</h4>
              <ul>
                <li><a href="#shipping" onClick={() => showToast('Free Shipping over $75')}>Shipping & Delivery</a></li>
                <li><a href="#returns" onClick={() => showToast('30-Day Bottle Returns')}>Returns & Guarantee</a></li>
                <li><a href="#authenticity" onClick={() => showToast('100% Authentic Grasse Essence')}>Authenticity Certificate</a></li>
                <li><a href="#contact" onClick={() => showToast('Concierge: concierge@fragrance-workdo.com')}>Contact Sommelier</a></li>
              </ul>
            </div>

            <div>
              <h4>Atelier</h4>
              <p style={{ fontSize: 13, lineHeight: 1.7 }}>
                7 days a week from 9:00 am to 7:00 pm EST.<br />
                Avenue des Parfumeurs, Grasse, France.
              </p>
            </div>
          </div>

          <div className="fragrance-footer-bottom">
            <div>© 2026 Fragrance WorkDo. All rights reserved.</div>
            <div style={{ display: 'flex', gap: 16 }}>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Fragrance Safety Standards</span>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================
          SLIDE-OVER CART DRAWER
          ========================================================= */}
      <div
        className={`fragrance-drawer-backdrop ${isCartOpen ? 'open' : ''}`}
        onClick={() => setIsCartOpen(false)}
      />
      <div className={`fragrance-cart-drawer ${isCartOpen ? 'open' : ''}`}>
        <div className="fragrance-drawer-header">
          <h3>Shopping Cart ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</h3>
          <button
            onClick={() => setIsCartOpen(false)}
            style={{ fontSize: 20, color: '#5C6E72' }}
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="fragrance-shipping-meter">
          {cartSubtotal >= 100 ? (
            <span style={{ color: '#013D29', fontWeight: 700 }}>
              🎉 You have qualified for Complimentary Insured Courier Shipping!
            </span>
          ) : (
            <span>
              Add <b>${100 - cartSubtotal}</b> more for Free Insured Courier Delivery.
            </span>
          )}
          <div className="fragrance-meter-bar">
            <div
              className="fragrance-meter-fill"
              style={{ width: `${Math.min(100, (cartSubtotal / 100) * 100)}%` }}
            />
          </div>
        </div>

        {/* Drawer Cart Items */}
        <div className="fragrance-drawer-items">
          {cartItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#5C6E72' }}>
              Your perfume cart is currently empty.
            </div>
          ) : (
            cartItems.map((item, idx) => (
              <div key={`${item.product.id}-${item.volume}`} className="fragrance-drawer-item">
                <img src={item.product.image} alt={item.product.name} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontFamily: 'Playfair Display, serif', fontSize: 16, margin: '0 0 4px' }}>
                    {item.product.name}
                  </h4>
                  <div style={{ fontSize: 12, color: '#5C6E72', marginBottom: 8 }}>
                    Volume: {item.volume} | ${item.product.price}.00
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        border: '1px solid #E8E3DA',
                        borderRadius: 20,
                        padding: '2px 8px',
                      }}
                    >
                      <button onClick={() => updateCartQty(idx, -1)} style={{ padding: '0 4px' }}>
                        -
                      </button>
                      <span style={{ fontSize: 13, fontWeight: 700, margin: '0 6px' }}>
                        {item.quantity}
                      </span>
                      <button onClick={() => updateCartQty(idx, 1)} style={{ padding: '0 4px' }}>
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => updateCartQty(idx, -item.quantity)}
                      style={{ fontSize: 12, color: '#F3734D' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="fragrance-drawer-footer">
            <div className="fragrance-drawer-subtotal">
              <span>Subtotal</span>
              <span>${cartSubtotal}.00</span>
            </div>
            <button
              className="fragrance-btn-primary"
              style={{ width: '100%', textAlign: 'center' }}
              onClick={() => showToast('Proceeding to Secure Checkout...')}
            >
              Checkout Now
            </button>
          </div>
        )}
      </div>

      {/* QUICK VIEW MODAL */}
      {isQuickViewOpen && (
        <div
          className="fragrance-drawer-backdrop open"
          onClick={() => setIsQuickViewOpen(false)}
        >
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
              zIndex: 1002,
              maxHeight: '90vh',
              overflowY: 'auto',
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
                style={{ width: '100%', borderRadius: 8 }}
              />
              <div>
                <span className="fragrance-badge-tag">{quickViewProduct.concentration}</span>
                <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, margin: '8px 0' }}>
                  {quickViewProduct.name}
                </h3>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#013D29', marginBottom: 12 }}>
                  ${quickViewProduct.price}.00
                </div>
                <p style={{ fontSize: 13, color: '#5C6E72', lineHeight: 1.6, marginBottom: 16 }}>
                  {quickViewProduct.description}
                </p>
                <button
                  className="fragrance-btn-primary"
                  onClick={() => {
                    addToCart(quickViewProduct, quickViewProduct.volumes[0] || '50ml', 1)
                    setIsQuickViewOpen(false)
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMPARISON MODAL */}
      {isCompareOpen && (
        <div
          className="fragrance-drawer-backdrop open"
          onClick={() => setIsCompareOpen(false)}
        >
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
              zIndex: 1002,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 24 }}>
              <h3 style={{ fontFamily: 'Playfair Display, serif', margin: 0 }}>
                Fragrance Comparison
              </h3>
              <button onClick={() => setIsCompareOpen(false)} style={{ fontSize: 20 }}>
                ✕
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${compareIds.length}, 1fr)`, gap: 20 }}>
              {compareIds.map((id) => {
                const prod = FRAGRANCE_PRODUCTS.find((p) => p.id === id)
                if (!prod) return null
                return (
                  <div
                    key={id}
                    style={{ border: '1px solid #E8E3DA', padding: 16, borderRadius: 8, textAlign: 'center' }}
                  >
                    <img src={prod.image} alt={prod.name} style={{ width: 100, height: 100, objectFit: 'contain' }} />
                    <h4 style={{ margin: '8px 0' }}>{prod.name}</h4>
                    <div style={{ fontWeight: 700, color: '#013D29', marginBottom: 8 }}>${prod.price}.00</div>
                    <div style={{ fontSize: 12, color: '#5C6E72', marginBottom: 4 }}>
                      Longevity: <b>{prod.longevity}</b>
                    </div>
                    <div style={{ fontSize: 12, color: '#5C6E72', marginBottom: 12 }}>
                      Sillage: <b>{prod.sillage}</b>
                    </div>
                    <button
                      className="fragrance-btn-primary"
                      style={{ fontSize: 11, padding: '8px 16px' }}
                      onClick={() => addToCart(prod, prod.volumes[0] || '50ml', 1)}
                    >
                      Add to Cart
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
export default FragranceFashionStorefront
