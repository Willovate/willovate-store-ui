import React, { useState, useMemo } from 'react'
import type {
  FragranceProduct,
  FragranceFamily,
  FragranceCartItem,
  FragranceStorefrontProps,
  FragranceFilterState,
} from './types'
import {
  FRAGRANCE_PRODUCTS,
  FRAGRANCE_REVIEWS,
  FRAGRANCE_BLOGS,
  FRAGRANCE_PROMISES,
  FRAGRANCE_PARTNERS,
} from './data/fragranceData'
import './styles/fragranceFashion.css'

export const FragranceFashionStorefront: React.FC<FragranceStorefrontProps> = ({
  template: _template,
  device = 'desktop',
  customAccentColor,
  onColorChange: _onColorChange,
  onUseTemplate: _onUseTemplate,
  onClose,
}) => {
  // Navigation & View Mode
  const [viewMode, setViewMode] = useState<'home' | 'collection' | 'pdp'>('home')
  const [selectedProduct, setSelectedProduct] = useState<FragranceProduct>(FRAGRANCE_PRODUCTS[0])
  const [selectedFamilyTab, setSelectedFamilyTab] = useState<FragranceFamily>('All')
  
  // Hero Editorial Expansion
  const [isHeroExpanded, setIsHeroExpanded] = useState<boolean>(false)

  // Drawers & Modals
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState<boolean>(false)
  const [quickViewProduct, setQuickViewProduct] = useState<FragranceProduct>(FRAGRANCE_PRODUCTS[0])
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)

  // Cart & Wishlist & Compare States
  const [cartItems, setCartItems] = useState<FragranceCartItem[]>([
    {
      product: FRAGRANCE_PRODUCTS[0], // Old Wood Perfume
      volume: '100ml',
      quantity: 1,
    },
  ])
  const [wishlistIds, setWishlistIds] = useState<string[]>([FRAGRANCE_PRODUCTS[1].id])
  const [compareIds, setCompareIds] = useState<string[]>([])

  // Per-card selected volume state: productId -> volume string
  const [selectedCardVolumes, setSelectedCardVolumes] = useState<Record<string, string>>({})

  // PDP Variant States
  const [pdpSelectedImage, setPdpSelectedImage] = useState<string>(FRAGRANCE_PRODUCTS[0].image)
  const [pdpSelectedVolume, setPdpSelectedVolume] = useState<string>(FRAGRANCE_PRODUCTS[0].volumes[0] || '100ml')
  const [pdpQty, setPdpQty] = useState<number>(1)
  const [openAccordion, setOpenAccordion] = useState<string>('notes')

  // Search & Toast
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Collection Filters State
  const [filters, setFilters] = useState<FragranceFilterState>({
    family: 'All',
    concentration: 'All',
    selectedVolumes: [],
    priceRange: [0, 60],
    inStockOnly: false,
    sortBy: 'featured',
  })

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Cart Operations
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
      const current = next[idx]
      if (!current) return prev
      const newQty = current.quantity + delta
      if (newQty <= 0) {
        return prev.filter((_, i) => i !== idx)
      }
      next[idx] = { ...current, quantity: newQty }
      return next
    })
  }

  // Wishlist Toggle
  const toggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(id)
      const next = exists ? prev.filter((item) => item !== id) : [...prev, id]
      showToast(exists ? 'Removed from wishlist' : 'Saved to fragrance wishlist!')
      return next
    })
  }

  // Compare Toggle
  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((item) => item !== id)
      }
      if (prev.length >= 4) {
        showToast('You can compare up to 4 fragrances at once.')
        return prev
      }
      showToast('Added to fragrance comparison.')
      return [...prev, id]
    })
  }

  // Navigate to PDP
  const navigateToPDP = (product: FragranceProduct) => {
    setSelectedProduct(product)
    setPdpSelectedImage(product.image)
    setPdpSelectedVolume(product.volumes[0] || '100ml')
    setPdpQty(1)
    setViewMode('pdp')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }, [cartItems])

  const freeShippingThreshold = 100
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)

  // Filtered Products for Collection View
  const filteredProducts = useMemo(() => {
    return FRAGRANCE_PRODUCTS.filter((p) => {
      if (filters.family !== 'All' && p.family !== filters.family) return false
      if (filters.concentration !== 'All' && p.concentration !== filters.concentration) return false
      if (filters.inStockOnly && !p.inStock) return false
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false
      if (filters.selectedVolumes.length > 0 && !filters.selectedVolumes.some((v) => p.volumes.includes(v))) {
        return false
      }
      if (
        searchQuery.trim() &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.family.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.notes.top.join(' ').toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.notes.heart.join(' ').toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.notes.base.join(' ').toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false
      }
      return true
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price
      if (filters.sortBy === 'price-desc') return b.price - a.price
      if (filters.sortBy === 'rating') return b.rating - a.rating
      return 0
    })
  }, [filters, searchQuery])

  // "All the Perfume" Tab filtered list
  const tabFilteredPerfumes = useMemo(() => {
    if (selectedFamilyTab === 'All') return FRAGRANCE_PRODUCTS.slice(0, 8)
    return FRAGRANCE_PRODUCTS.filter((p) => p.family === selectedFamilyTab)
  }, [selectedFamilyTab])

  // Compared Products
  const comparedProducts = useMemo(() => {
    return FRAGRANCE_PRODUCTS.filter((p) => compareIds.includes(p.id))
  }, [compareIds])

  // Custom accent style override
  const inlineAccentStyle = customAccentColor
    ? ({ '--frg-accent': customAccentColor } as React.CSSProperties)
    : undefined

  return (
    <div
      className={`fragrance-storefront device-${device}`}
      style={inlineAccentStyle}
    >
      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="fragrance-topbar">
        <div className="fragrance-container fragrance-topbar-inner">
          <div className="fragrance-topbar-left">
            <span className="gold-sparkle">⚜️</span>
            <span>COMPLIMENTARY LUXURY SAMPLES WITH EVERY ORDER | EXPRESS WORLDWIDE COURIER</span>
          </div>

          <div className="fragrance-topbar-actions">
            <div className="fragrance-topbar-links">
              <span className="fragrance-topbar-link" onClick={() => showToast('Boutique Hours: Mon-Fri 8AM-9PM')}>
                Boutiques
              </span>
              <span className="fragrance-topbar-link" onClick={() => showToast('Scent Consultation is 24/7')}>
                Scent Advice
              </span>
              <span className="fragrance-topbar-link" onClick={() => showToast('Track your luxury dispatch')}>
                Track Order
              </span>
              <span className="fragrance-topbar-link" onClick={() => showToast('VIP Concierge: vip@fragrance-workdo.com')}>
                VIP Concierge
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <select className="fragrance-topbar-select" defaultValue="USD" aria-label="Currency">
                <option value="USD">USD $</option>
                <option value="EUR">EUR €</option>
                <option value="GBP">GBP £</option>
                <option value="AED">AED د.إ</option>
              </select>

              <select className="fragrance-topbar-select" defaultValue="EN" aria-label="Language">
                <option value="EN">English</option>
                <option value="AR">Arabic</option>
                <option value="FR">French</option>
                <option value="DE">German</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="fragrance-header">
        <div className="fragrance-container fragrance-header-inner">
          {/* Logo */}
          <div
            className="fragrance-brand-logo"
            onClick={() => {
              setViewMode('home')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <span style={{ fontSize: '24px' }}>👑</span>
            <span className="fragrance-brand-title">
              Fragrance<span style={{ color: 'var(--frg-accent)' }}>.</span>
            </span>
            <span className="fragrance-brand-subtitle">WORKDO</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="fragrance-nav" aria-label="Main Navigation">
            <button
              type="button"
              className={`fragrance-nav-item ${viewMode === 'home' ? 'active' : ''}`}
              onClick={() => {
                setViewMode('home')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              Home
            </button>
            <button
              type="button"
              className={`fragrance-nav-item ${viewMode === 'collection' && filters.family === 'All' ? 'active' : ''}`}
              onClick={() => {
                setFilters((f) => ({ ...f, family: 'All' }))
                setViewMode('collection')
              }}
            >
              All Perfumes
            </button>
            <button
              type="button"
              className={`fragrance-nav-item ${viewMode === 'collection' && filters.family === 'Woody' ? 'active' : ''}`}
              onClick={() => {
                setFilters((f) => ({ ...f, family: 'Woody' }))
                setViewMode('collection')
              }}
            >
              Woody & Oud
            </button>
            <button
              type="button"
              className={`fragrance-nav-item ${viewMode === 'collection' && filters.family === 'Oriental' ? 'active' : ''}`}
              onClick={() => {
                setFilters((f) => ({ ...f, family: 'Oriental' }))
                setViewMode('collection')
              }}
            >
              Oriental
            </button>
            <button
              type="button"
              className={`fragrance-nav-item ${viewMode === 'collection' && filters.family === 'Floral' ? 'active' : ''}`}
              onClick={() => {
                setFilters((f) => ({ ...f, family: 'Floral' }))
                setViewMode('collection')
              }}
            >
              Floral
            </button>
            <button
              type="button"
              className={`fragrance-nav-item ${viewMode === 'collection' && filters.family === 'Fresh & Citrus' ? 'active' : ''}`}
              onClick={() => {
                setFilters((f) => ({ ...f, family: 'Fresh & Citrus' }))
                setViewMode('collection')
              }}
            >
              Fresh & Citrus
            </button>
            <button
              type="button"
              className={`fragrance-nav-item ${viewMode === 'collection' && filters.family === 'Gourmand' ? 'active' : ''}`}
              onClick={() => {
                setFilters((f) => ({ ...f, family: 'Gourmand' }))
                setViewMode('collection')
              }}
            >
              Gourmand
            </button>
          </nav>

          {/* Header Actions */}
          <div className="fragrance-header-actions">
            {/* Search Input */}
            <div className="fragrance-search-box">
              <span className="fragrance-search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search scents, notes..."
                className="fragrance-search-input"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  if (viewMode !== 'collection') setViewMode('collection')
                }}
              />
            </div>

            {/* Compare Button */}
            <button
              type="button"
              className="fragrance-icon-btn"
              title="Compare Perfumes"
              onClick={() => {
                if (compareIds.length === 0) {
                  showToast('Select perfumes to compare first')
                } else {
                  setIsCompareModalOpen(true)
                }
              }}
            >
              ⚖️
              {compareIds.length > 0 && (
                <span className="fragrance-icon-badge">{compareIds.length}</span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              className="fragrance-icon-btn"
              title="Wishlist"
              onClick={() => {
                showToast(`You have ${wishlistIds.length} saved fragrance(s).`)
              }}
            >
              🤍
              {wishlistIds.length > 0 && (
                <span className="fragrance-icon-badge">{wishlistIds.length}</span>
              )}
            </button>

            {/* Cart Button */}
            <button
              type="button"
              className="fragrance-icon-btn"
              title="Shopping Bag"
              onClick={() => setIsCartOpen(true)}
            >
              🛍️
              <span className="fragrance-icon-badge">
                {cartItems.reduce((acc, it) => acc + it.quantity, 0)}
              </span>
            </button>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="fragrance-mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle Navigation"
            >
              ☰
            </button>

            {onClose && (
              <button
                type="button"
                onClick={onClose}
                className="fragrance-btn-secondary"
                style={{ padding: '8px 16px', fontSize: '12px', color: 'var(--frg-primary)', borderColor: 'var(--frg-border)' }}
              >
                ✕ Close Preview
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div
          className="fragrance-drawer-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="fragrance-cart-drawer"
            style={{ left: 0, right: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="fragrance-drawer-header">
              <h3 className="fragrance-drawer-title">Boutique Directory</h3>
              <button
                type="button"
                className="fragrance-icon-btn"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="fragrance-cart-items-wrap">
              {[
                'Home',
                'All Perfumes',
                'Woody & Oud',
                'Oriental',
                'Floral',
                'Fresh & Citrus',
                'Gourmand',
                'Discovery Sets',
              ].map((category) => (
                <button
                  key={category}
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: '16px',
                    fontWeight: 700,
                    padding: '12px 0',
                    borderBottom: '1px solid var(--frg-border)',
                    cursor: 'pointer',
                    color: 'var(--frg-primary)',
                    fontFamily: 'var(--frg-font-serif)',
                  }}
                  onClick={() => {
                    if (category === 'Home') {
                      setViewMode('home')
                    } else {
                      const fam = (category === 'Woody & Oud' ? 'Woody' : category === 'All Perfumes' ? 'All' : category) as FragranceFamily
                      setFilters((f) => ({ ...f, family: fam }))
                      setViewMode('collection')
                    }
                    setIsMobileMenuOpen(false)
                  }}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          VIEW MODE 1: HOME PAGE
          ===================================================================== */}
      {viewMode === 'home' && (
        <main>
          {/* HERO SECTION: Old Wood Perfume */}
          <section className="fragrance-hero">
            <div className="fragrance-container">
              <div className="fragrance-hero-grid">
                <div className="fragrance-hero-text">
                  <div className="fragrance-hero-badge">
                    <span>👑</span>
                    <span>MEN & UNISEX • HAUTE PERFUMERY</span>
                  </div>

                  <h1 className="fragrance-hero-title">
                    Old Wood Perfume — The Majesty of <span>Sacred Resins</span>
                  </h1>

                  <p className="fragrance-hero-desc">
                    The top notes of Mystic Essence burst forth with a burst of
                    sparkling bergamot and juicy mandarin, instantly uplifting your
                    spirits and awakening your senses. Infused with precious aged
                    agarwood, smoked sandalwood, and Haitian vetiver.
                  </p>

                  {/* Scent Notes preview bar */}
                  <div className="fragrance-hero-notes-bar">
                    <span className="fragrance-note-pill">
                      <strong>Top:</strong> Bergamot & Mandarin
                    </span>
                    <span className="fragrance-note-pill">
                      <strong>Heart:</strong> Rare Agarwood & Sandalwood
                    </span>
                    <span className="fragrance-note-pill">
                      <strong>Base:</strong> Amber & Bourbon Vanilla
                    </span>
                  </div>

                  <div className="fragrance-hero-actions">
                    <button
                      type="button"
                      className="fragrance-btn-primary"
                      onClick={() => navigateToPDP(FRAGRANCE_PRODUCTS[0])}
                    >
                      DISCOVER OLD WOOD — $24.00 →
                    </button>

                    <button
                      type="button"
                      className="fragrance-btn-secondary"
                      onClick={() => setIsHeroExpanded(!isHeroExpanded)}
                    >
                      {isHeroExpanded ? 'HIDE OLFACTORY NOTES ▲' : 'VIEW OLFACTORY NOTES ▼'}
                    </button>
                  </div>

                  {isHeroExpanded && (
                    <div
                      style={{
                        marginTop: '24px',
                        background: 'rgba(0, 36, 16, 0.85)',
                        border: '1px solid rgba(212, 175, 55, 0.4)',
                        borderRadius: 'var(--frg-radius-md)',
                        padding: '20px',
                        color: '#f8fafc',
                        fontSize: '13.5px',
                        lineHeight: 1.6,
                      }}
                    >
                      <p style={{ margin: 0 }}>
                        <strong>Master Parfumeur Formulation:</strong> Sourced from sustainable
                        aquilaria plantations in Assam. Macerated for 60 days in French oak casks
                        to ensure maximum depth, 24-hour skin adherence, and unmatched royal presence.
                      </p>
                    </div>
                  )}
                </div>

                {/* Hero Visual Card */}
                <div className="fragrance-hero-visual">
                  <div className="fragrance-hero-img-card">
                    <img
                      src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1200&auto=format&fit=crop&q=85"
                      alt="Old Wood Perfume"
                      className="fragrance-hero-img"
                    />
                  </div>

                  <div className="fragrance-hero-floating-card">
                    <div className="fragrance-floating-icon">⚜️</div>
                    <div className="fragrance-floating-content">
                      <h4>Grasse Extraction</h4>
                      <p>Pure botanical extracts • Cruelty-free</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* VALUE / PROMISES STRIP */}
          <section className="fragrance-promises-strip">
            <div className="fragrance-container">
              <div className="fragrance-promises-grid">
                {FRAGRANCE_PROMISES.map((item, idx) => (
                  <div key={idx} className="fragrance-promise-item">
                    <div className="fragrance-promise-icon">{item.icon}</div>
                    <div>
                      <h4 className="fragrance-promise-title">{item.title}</h4>
                      <p className="fragrance-promise-desc">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ALL THE PERFUME (TABBED CATALOG GRID) */}
          <section style={{ padding: '70px 0', backgroundColor: '#ffffff' }}>
            <div className="fragrance-container">
              <div className="fragrance-section-header">
                <span className="fragrance-section-eyebrow">HAUTE PARFUMERIE</span>
                <h2 className="fragrance-section-title">All the Perfume</h2>
                <p className="fragrance-section-desc">
                  Explore our signature catalog curated by scent families, featuring pure extracts,
                  rare floral absolutes, and smoky oriental blends.
                </p>
              </div>

              {/* Scent Family Tabs */}
              <div className="fragrance-tabs">
                {(['All', 'Woody', 'Floral', 'Oriental', 'Fresh & Citrus', 'Gourmand'] as FragranceFamily[]).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`fragrance-tab-btn ${selectedFamilyTab === tab ? 'active' : ''}`}
                    onClick={() => setSelectedFamilyTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Product Grid */}
              <div className="fragrance-product-grid">
                {tabFilteredPerfumes.map((product) => {
                  const cardSelectedVol =
                    selectedCardVolumes[product.id] || product.volumes[0] || '100ml'

                  return (
                    <div key={product.id} className="fragrance-product-card">
                      <div
                        className="fragrance-card-media"
                        onClick={() => navigateToPDP(product)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="fragrance-card-img"
                        />

                        {product.isSale && (
                          <span className="fragrance-card-badge fragrance-badge-sale">Sale</span>
                        )}
                        {!product.isSale && product.isNew && (
                          <span className="fragrance-card-badge fragrance-badge-new">New</span>
                        )}

                        <div
                          className="fragrance-card-actions"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            className={`fragrance-action-circle-btn ${wishlistIds.includes(product.id) ? 'active' : ''}`}
                            title="Save to Wishlist"
                            onClick={() => toggleWishlist(product.id)}
                          >
                            🤍
                          </button>
                          <button
                            type="button"
                            className="fragrance-action-circle-btn"
                            title="Quick View"
                            onClick={() => {
                              setQuickViewProduct(product)
                              setIsQuickViewOpen(true)
                            }}
                          >
                            👁️
                          </button>
                        </div>
                      </div>

                      <div className="fragrance-card-body">
                        <div className="fragrance-card-family">
                          <span>{product.family}</span>
                          <span className="fragrance-concentration-pill">{product.concentration}</span>
                        </div>

                        <h3
                          className="fragrance-card-title"
                          onClick={() => navigateToPDP(product)}
                        >
                          {product.name}
                        </h3>

                        {/* Top Notes Preview */}
                        <div className="fragrance-card-notes">
                          {product.notes.top.slice(0, 2).map((note, i) => (
                            <span key={i} className="fragrance-note-tag">
                              🌿 {note}
                            </span>
                          ))}
                        </div>

                        {/* Volume Chips */}
                        <div className="fragrance-card-volumes">
                          {product.volumes.map((v) => (
                            <button
                              key={v}
                              type="button"
                              className={`fragrance-volume-chip ${cardSelectedVol === v ? 'selected' : ''}`}
                              onClick={() => {
                                setSelectedCardVolumes((prev) => ({
                                  ...prev,
                                  [product.id]: v,
                                }))
                              }}
                            >
                              {v}
                            </button>
                          ))}
                        </div>

                        {/* Price & Add */}
                        <div className="fragrance-card-price-row">
                          <div className="fragrance-card-prices">
                            <span className="fragrance-card-price">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.compareAtPrice && (
                              <span className="fragrance-card-compare">
                                ${product.compareAtPrice.toFixed(2)}
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            className="fragrance-card-add-btn"
                            onClick={() => addToCart(product, cardSelectedVol)}
                          >
                            + Add
                          </button>
                        </div>

                        {/* Compare and Rating */}
                        <div className="fragrance-card-compare-row">
                          <label className="fragrance-compare-label">
                            <input
                              type="checkbox"
                              checked={compareIds.includes(product.id)}
                              onChange={() => toggleCompare(product.id)}
                            />
                            <span>Compare</span>
                          </label>
                          <span>
                            ⭐ {product.rating} ({product.reviewCount})
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* PERFUME PERSPECTIVES (OLFACTORY PYRAMID SECTION) */}
          <section className="fragrance-perspectives-section">
            <div className="fragrance-container">
              <div className="fragrance-section-header">
                <span className="fragrance-section-eyebrow">OLFACTORY SCIENCE</span>
                <h2 className="fragrance-section-title">Perfume Perspectives</h2>
                <p className="fragrance-section-desc">
                  Every masterpiece unfolds in three distinct acts. Understand the time-release
                  alchemy of volatile essences, heart blossoms, and anchor base woods.
                </p>
              </div>

              <div className="fragrance-pyramid-grid">
                {/* 1. Top Notes */}
                <div className="fragrance-pyramid-card">
                  <span className="fragrance-pyramid-tier">Act I • First 15-30 Minutes</span>
                  <h3 className="fragrance-pyramid-title">The Top Notes</h3>
                  <p className="fragrance-pyramid-desc">
                    The immediate sensory impression. Sparkling citrus, effervescent pink pepper,
                    and botanical herbs that awaken your senses upon initial application.
                  </p>
                  <ul className="fragrance-pyramid-list">
                    <li className="fragrance-pyramid-tag">Calabrian Bergamot</li>
                    <li className="fragrance-pyramid-tag">Mandarin Rind</li>
                    <li className="fragrance-pyramid-tag">Pink Peppercorn</li>
                    <li className="fragrance-pyramid-tag">Cardamom Pods</li>
                  </ul>
                </div>

                {/* 2. Heart Notes */}
                <div className="fragrance-pyramid-card">
                  <span className="fragrance-pyramid-tier">Act II • Hours 1 to 6</span>
                  <h3 className="fragrance-pyramid-title">The Heart Notes</h3>
                  <p className="fragrance-pyramid-desc">
                    The emotional core and personality of the perfume. Rich florals, warm exotic spices,
                    and lush woods that define your signature projection.
                  </p>
                  <ul className="fragrance-pyramid-list">
                    <li className="fragrance-pyramid-tag">Bulgarian Rose</li>
                    <li className="fragrance-pyramid-tag">Jasmine Sambac</li>
                    <li className="fragrance-pyramid-tag">Smoked Birch</li>
                    <li className="fragrance-pyramid-tag">Tuscan Leather</li>
                  </ul>
                </div>

                {/* 3. Base Notes */}
                <div className="fragrance-pyramid-card">
                  <span className="fragrance-pyramid-tier">Act III • 12 to 24+ Hours</span>
                  <h3 className="fragrance-pyramid-title">The Base Notes</h3>
                  <p className="fragrance-pyramid-desc">
                    The enduring foundation. Heavy molecular resins, rare oud, and amber crystals that
                    anchor the perfume onto your skin for a lingering, magnetic aura.
                  </p>
                  <ul className="fragrance-pyramid-list">
                    <li className="fragrance-pyramid-tag">Rare Cambodian Oud</li>
                    <li className="fragrance-pyramid-tag">Golden Ambergris</li>
                    <li className="fragrance-pyramid-tag">Bourbon Vanilla</li>
                    <li className="fragrance-pyramid-tag">Clean White Musk</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* DUAL PROMO BANNERS: "Body Perfume Ro ty" */}
          <section className="fragrance-dual-banners">
            <div className="fragrance-container">
              <div className="fragrance-banners-grid">
                {/* Banner 1: Body Perfume */}
                <div
                  className="fragrance-banner-card"
                  onClick={() => {
                    setFilters((f) => ({ ...f, concentration: 'Body Mist', family: 'All' }))
                    setViewMode('collection')
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=900&auto=format&fit=crop&q=80"
                    alt="Body Perfume Ro ty"
                    className="fragrance-banner-bg"
                  />
                  <div className="fragrance-banner-overlay" />
                  <div className="fragrance-banner-content">
                    <span className="fragrance-banner-tag">SIGNATURE MISTS</span>
                    <h3 className="fragrance-banner-title">Body Perfume Ro ty Collection</h3>
                    <span className="fragrance-banner-link">Explore Body & Hair Mists →</span>
                  </div>
                </div>

                {/* Banner 2: Pure Attars & Ouds */}
                <div
                  className="fragrance-banner-card"
                  onClick={() => {
                    setFilters((f) => ({ ...f, family: 'Woody', concentration: 'All' }))
                    setViewMode('collection')
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=900&auto=format&fit=crop&q=80"
                    alt="Royal Attars"
                    className="fragrance-banner-bg"
                  />
                  <div className="fragrance-banner-overlay" />
                  <div className="fragrance-banner-content">
                    <span className="fragrance-banner-tag">CONCENTRATED ATTARS</span>
                    <h3 className="fragrance-banner-title">Rare Dehn Al Oud & Pure Oils</h3>
                    <span className="fragrance-banner-link">Discover 100% Pure Attars →</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BESTSELLERS SECTION */}
          <section className="fragrance-bestsellers-section">
            <div className="fragrance-container">
              <div className="fragrance-section-header">
                <span className="fragrance-section-eyebrow">ICONS OF THE HOUSE</span>
                <h2 className="fragrance-section-title">Bestsellers</h2>
                <p className="fragrance-section-desc">
                  Our most celebrated creations, praised for extraordinary sillage and unforgettable aura.
                </p>
              </div>

              <div className="fragrance-product-grid">
                {FRAGRANCE_PRODUCTS.filter((p) => p.isBestseller)
                  .slice(0, 4)
                  .map((product) => {
                    const cardSelectedVol =
                      selectedCardVolumes[product.id] || product.volumes[0] || '100ml'

                    return (
                      <div key={product.id} className="fragrance-product-card">
                        <div
                          className="fragrance-card-media"
                          onClick={() => navigateToPDP(product)}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="fragrance-card-img"
                          />
                          <div
                            className="fragrance-card-actions"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              className={`fragrance-action-circle-btn ${wishlistIds.includes(product.id) ? 'active' : ''}`}
                              onClick={() => toggleWishlist(product.id)}
                            >
                              🤍
                            </button>
                            <button
                              type="button"
                              className="fragrance-action-circle-btn"
                              onClick={() => {
                                setQuickViewProduct(product)
                                setIsQuickViewOpen(true)
                              }}
                            >
                              👁️
                            </button>
                          </div>
                        </div>

                        <div className="fragrance-card-body">
                          <div className="fragrance-card-family">
                            <span>{product.family}</span>
                            <span className="fragrance-concentration-pill">{product.concentration}</span>
                          </div>

                          <h3
                            className="fragrance-card-title"
                            onClick={() => navigateToPDP(product)}
                          >
                            {product.name}
                          </h3>

                          <div className="fragrance-card-volumes">
                            {product.volumes.map((v) => (
                              <button
                                key={v}
                                type="button"
                                className={`fragrance-volume-chip ${cardSelectedVol === v ? 'selected' : ''}`}
                                onClick={() => {
                                  setSelectedCardVolumes((prev) => ({
                                    ...prev,
                                    [product.id]: v,
                                  }))
                                }}
                              >
                                {v}
                              </button>
                            ))}
                          </div>

                          <div className="fragrance-card-price-row">
                            <span className="fragrance-card-price">
                              ${product.price.toFixed(2)}
                            </span>

                            <button
                              type="button"
                              className="fragrance-card-add-btn"
                              onClick={() => addToCart(product, cardSelectedVol)}
                            >
                              + Add
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </div>
          </section>

          {/* TESTIMONIALS */}
          <section className="fragrance-testimonials">
            <div className="fragrance-container">
              <div className="fragrance-section-header">
                <span className="fragrance-section-eyebrow">CUSTOMER ACCLAIM</span>
                <h2 className="fragrance-section-title">Testimonials</h2>
                <p className="fragrance-section-desc">
                  Stories of timeless elegance from fragrance connoisseurs worldwide.
                </p>
              </div>

              <div className="fragrance-reviews-grid">
                {FRAGRANCE_REVIEWS.map((rev) => (
                  <div key={rev.id} className="fragrance-review-card">
                    <div className="fragrance-stars-row">★★★★★</div>
                    <h4 className="fragrance-review-headline">{rev.headline}</h4>
                    <p className="fragrance-review-comment">"{rev.comment}"</p>
                    <div className="fragrance-review-scent">Scent: {rev.scentPurchased}</div>
                    <div className="fragrance-review-author-row">
                      <span className="fragrance-review-author">{rev.author}</span>
                      {rev.verified && (
                        <span className="fragrance-review-verified">✓ Verified Scent Collector</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FROM OUR BLOG */}
          <section className="fragrance-blog-section">
            <div className="fragrance-container">
              <div className="fragrance-section-header">
                <span className="fragrance-section-eyebrow">PARFUMEUR JOURNAL</span>
                <h2 className="fragrance-section-title">From Our Blog</h2>
                <p className="fragrance-section-desc">
                  Essays on ancient extraction traditions, volatile note balance, and seasonal layering.
                </p>
              </div>

              <div className="fragrance-blog-grid">
                {FRAGRANCE_BLOGS.slice(0, 3).map((blog) => (
                  <div key={blog.id} className="fragrance-blog-card">
                    <div className="fragrance-blog-img-wrap">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="fragrance-blog-img"
                      />
                    </div>
                    <div className="fragrance-blog-content">
                      <div className="fragrance-blog-meta">
                        <span className="fragrance-blog-tag">{blog.tag}</span>
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                      </div>
                      <h3 className="fragrance-blog-title">{blog.title}</h3>
                      <p className="fragrance-blog-excerpt">{blog.excerpt}</p>
                      <span
                        className="fragrance-blog-link"
                        onClick={() => showToast(`Opening article: "${blog.title}"`)}
                      >
                        Read Journal Article →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BRAND PARTNERS */}
          <section className="fragrance-partners-section">
            <div className="fragrance-container">
              <div className="fragrance-partners-flex">
                {FRAGRANCE_PARTNERS.map((partner, idx) => (
                  <div key={idx} className="fragrance-partner-pill">
                    {partner.logo}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* GET 20% OFF DISCOUNT BANNER */}
          <section className="fragrance-discount-banner">
            <div className="fragrance-container">
              <div className="fragrance-discount-box">
                <h2 className="fragrance-discount-title">Get 20% off for first order</h2>
                <p className="fragrance-discount-desc">
                  Join our exclusive Fragrance Circle for private release access, invitation-only
                  Grasse harvests, and your instant 20% welcoming code.
                </p>
                <form
                  className="fragrance-newsletter-form"
                  onSubmit={(e) => {
                    e.preventDefault()
                    showToast('Welcome to Fragrance Circle! Use voucher code SCENT20 at checkout.')
                  }}
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email for 20% off..."
                    className="fragrance-newsletter-input"
                  />
                  <button type="submit" className="fragrance-newsletter-btn">
                    Unlock 20% Off
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* =====================================================================
          VIEW MODE 2: SHOP / COLLECTION CATALOG VIEW
          ===================================================================== */}
      {viewMode === 'collection' && (
        <main className="fragrance-container">
          <div className="fragrance-breadcrumbs" style={{ marginTop: '24px' }}>
            <button type="button" onClick={() => setViewMode('home')}>
              Home
            </button>
            <span>/</span>
            <span>Boutique Catalog</span>
            <span>/</span>
            <span style={{ color: 'var(--frg-primary)', fontWeight: 700 }}>
              {filters.family}
            </span>
          </div>

          <div className="fragrance-shop-layout">
            {/* Sidebar Filters */}
            <aside className="fragrance-sidebar-filters">
              <h3 className="fragrance-filter-title">Scent Filters</h3>

              {/* Scent Family */}
              <div className="fragrance-filter-group">
                <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>
                  Olfactory Family
                </h4>
                <div className="fragrance-filter-options">
                  {(
                    [
                      'All',
                      'Woody',
                      'Floral',
                      'Oriental',
                      'Fresh & Citrus',
                      'Gourmand',
                      'Aromatic',
                    ] as FragranceFamily[]
                  ).map((fam) => (
                    <label key={fam} className="fragrance-filter-checkbox">
                      <input
                        type="radio"
                        name="frag-family"
                        checked={filters.family === fam}
                        onChange={() => setFilters((f) => ({ ...f, family: fam }))}
                      />
                      <span>{fam}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Concentration */}
              <div className="fragrance-filter-group">
                <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>
                  Concentration
                </h4>
                <div className="fragrance-filter-options">
                  {['All', 'Eau De Parfum', 'Parfum Extrait', 'Eau De Toilette', 'Body Mist'].map((conc) => (
                    <label key={conc} className="fragrance-filter-checkbox">
                      <input
                        type="radio"
                        name="frag-conc"
                        checked={filters.concentration === conc}
                        onChange={() => setFilters((f) => ({ ...f, concentration: conc }))}
                      />
                      <span>{conc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Volume */}
              <div className="fragrance-filter-group">
                <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>
                  Flacon Volume
                </h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['50ml', '100ml', '150ml'].map((vol) => {
                    const isSelected = filters.selectedVolumes.includes(vol)
                    return (
                      <button
                        key={vol}
                        type="button"
                        className={`fragrance-volume-chip ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setFilters((f) => ({
                            ...f,
                            selectedVolumes: isSelected
                              ? f.selectedVolumes.filter((v) => v !== vol)
                              : [...f.selectedVolumes, vol],
                          }))
                        }}
                      >
                        {vol}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* In-Stock */}
              <div className="fragrance-filter-group">
                <label className="fragrance-filter-checkbox">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) =>
                      setFilters((f) => ({ ...f, inStockOnly: e.target.checked }))
                    }
                  />
                  <span>In-stock only</span>
                </label>
              </div>

              {/* Reset */}
              <button
                type="button"
                className="fragrance-btn-secondary"
                style={{
                  width: '100%',
                  padding: '10px',
                  fontSize: '12.5px',
                  color: 'var(--frg-primary)',
                  borderColor: 'var(--frg-border)',
                }}
                onClick={() => {
                  setFilters({
                    family: 'All',
                    concentration: 'All',
                    selectedVolumes: [],
                    priceRange: [0, 60],
                    inStockOnly: false,
                    sortBy: 'featured',
                  })
                  setSearchQuery('')
                }}
              >
                Reset All Filters
              </button>
            </aside>

            {/* Products Listing Area */}
            <div>
              <div className="fragrance-shop-controls">
                <span style={{ fontSize: '14px', color: 'var(--frg-muted)' }}>
                  Showing <strong>{filteredProducts.length}</strong> luxury fragrance(s)
                </span>

                <select
                  className="fragrance-sort-select"
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      sortBy: e.target.value as FragranceFilterState['sortBy'],
                    }))
                  }
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {filteredProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <h3>No perfumes found</h3>
                  <p style={{ color: 'var(--frg-muted)' }}>
                    Try broadening your scent family or volume criteria.
                  </p>
                </div>
              ) : (
                <div className="fragrance-product-grid">
                  {filteredProducts.map((product) => {
                    const cardSelectedVol =
                      selectedCardVolumes[product.id] || product.volumes[0] || '100ml'

                    return (
                      <div key={product.id} className="fragrance-product-card">
                        <div
                          className="fragrance-card-media"
                          onClick={() => navigateToPDP(product)}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="fragrance-card-img"
                          />
                          {product.isSale && (
                            <span className="fragrance-card-badge fragrance-badge-sale">Sale</span>
                          )}

                          <div
                            className="fragrance-card-actions"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              className={`fragrance-action-circle-btn ${wishlistIds.includes(product.id) ? 'active' : ''}`}
                              onClick={() => toggleWishlist(product.id)}
                            >
                              🤍
                            </button>
                            <button
                              type="button"
                              className="fragrance-action-circle-btn"
                              onClick={() => {
                                setQuickViewProduct(product)
                                setIsQuickViewOpen(true)
                              }}
                            >
                              👁️
                            </button>
                          </div>
                        </div>

                        <div className="fragrance-card-body">
                          <div className="fragrance-card-family">
                            <span>{product.family}</span>
                            <span className="fragrance-concentration-pill">{product.concentration}</span>
                          </div>

                          <h3
                            className="fragrance-card-title"
                            onClick={() => navigateToPDP(product)}
                          >
                            {product.name}
                          </h3>

                          <div className="fragrance-card-notes">
                            {product.notes.top.slice(0, 2).map((note, i) => (
                              <span key={i} className="fragrance-note-tag">
                                🌿 {note}
                              </span>
                            ))}
                          </div>

                          <div className="fragrance-card-volumes">
                            {product.volumes.map((v) => (
                              <button
                                key={v}
                                type="button"
                                className={`fragrance-volume-chip ${cardSelectedVol === v ? 'selected' : ''}`}
                                onClick={() => {
                                  setSelectedCardVolumes((prev) => ({
                                    ...prev,
                                    [product.id]: v,
                                  }))
                                }}
                              >
                                {v}
                              </button>
                            ))}
                          </div>

                          <div className="fragrance-card-price-row">
                            <span className="fragrance-card-price">
                              ${product.price.toFixed(2)}
                            </span>

                            <button
                              type="button"
                              className="fragrance-card-add-btn"
                              onClick={() => addToCart(product, cardSelectedVol)}
                            >
                              + Add
                            </button>
                          </div>

                          <div className="fragrance-card-compare-row">
                            <label className="fragrance-compare-label">
                              <input
                                type="checkbox"
                                checked={compareIds.includes(product.id)}
                                onChange={() => toggleCompare(product.id)}
                              />
                              <span>Compare</span>
                            </label>
                            <span>
                              ⭐ {product.rating}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          VIEW MODE 3: RICH PDP (PRODUCT DETAIL PAGE)
          ===================================================================== */}
      {viewMode === 'pdp' && (
        <main className="fragrance-container fragrance-pdp-section">
          {/* Breadcrumbs */}
          <div className="fragrance-breadcrumbs">
            <button type="button" onClick={() => setViewMode('home')}>
              Home
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => {
                setFilters((f) => ({ ...f, family: selectedProduct.family }))
                setViewMode('collection')
              }}
            >
              {selectedProduct.family} Fragrances
            </button>
            <span>/</span>
            <span style={{ color: 'var(--frg-primary)', fontWeight: 700 }}>
              {selectedProduct.name}
            </span>
          </div>

          <div className="fragrance-pdp-layout">
            {/* Gallery */}
            <div className="fragrance-pdp-gallery">
              <div className="fragrance-pdp-thumbnails">
                {selectedProduct.gallery.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`fragrance-thumb-btn ${pdpSelectedImage === img ? 'active' : ''}`}
                    onClick={() => setPdpSelectedImage(img)}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} />
                  </button>
                ))}
              </div>

              <div className="fragrance-pdp-main-media">
                <img
                  src={pdpSelectedImage}
                  alt={selectedProduct.name}
                  className="fragrance-pdp-main-img"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="fragrance-pdp-info">
              <span className="fragrance-pdp-family">
                {selectedProduct.family} • {selectedProduct.concentration}
              </span>
              <h1 className="fragrance-pdp-title">{selectedProduct.name}</h1>

              <div className="fragrance-pdp-rating-row">
                <span style={{ color: 'var(--frg-accent-gold)' }}>★★★★★</span>
                <span>
                  {selectedProduct.rating} ({selectedProduct.reviewCount} customer reviews)
                </span>
                <span>•</span>
                <span style={{ color: selectedProduct.inStock ? '#10b981' : '#be123c' }}>
                  {selectedProduct.inStock ? '✓ Ready to Ship' : 'Limited Allocation'}
                </span>
                <span>•</span>
                <span>SKU: {selectedProduct.sku}</span>
              </div>

              <div className="fragrance-pdp-price-box">
                <span className="fragrance-pdp-price">
                  ${selectedProduct.price.toFixed(2)}
                </span>
                {selectedProduct.compareAtPrice && (
                  <span className="fragrance-pdp-compare">
                    ${selectedProduct.compareAtPrice.toFixed(2)}
                  </span>
                )}
                {selectedProduct.isSale && (
                  <span className="fragrance-card-badge fragrance-badge-sale">
                    Limited Offer
                  </span>
                )}
              </div>

              <p className="fragrance-pdp-desc">{selectedProduct.description}</p>

              {/* Sillage & Longevity Metrics */}
              <div className="fragrance-pdp-metrics">
                <div>
                  <div className="fragrance-metric-label">Enduring Longevity</div>
                  <div className="fragrance-metric-val">⏱️ {selectedProduct.longevity}</div>
                </div>
                <div>
                  <div className="fragrance-metric-label">Projection & Sillage</div>
                  <div className="fragrance-metric-val">💨 {selectedProduct.sillage} Aura</div>
                </div>
              </div>

              {/* Volume Selector */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>
                  Bottle Volume: <strong>{pdpSelectedVolume}</strong>
                </div>
                <div className="fragrance-pdp-volumes">
                  {selectedProduct.volumes.map((v) => (
                    <button
                      key={v}
                      type="button"
                      className={`fragrance-pdp-vol-btn ${pdpSelectedVolume === v ? 'active' : ''}`}
                      onClick={() => setPdpSelectedVolume(v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Stepper & Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '10px' }}>
                <div className="fragrance-qty-controls">
                  <button
                    type="button"
                    className="fragrance-qty-btn"
                    onClick={() => setPdpQty((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span className="fragrance-qty-val">{pdpQty}</span>
                  <button
                    type="button"
                    className="fragrance-qty-btn"
                    onClick={() => setPdpQty((q) => q + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="fragrance-icon-btn"
                  style={{ border: '1px solid var(--frg-border)' }}
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  title="Wishlist"
                >
                  {wishlistIds.includes(selectedProduct.id) ? '❤️' : '🤍'}
                </button>

                <button
                  type="button"
                  className="fragrance-icon-btn"
                  style={{ border: '1px solid var(--frg-border)' }}
                  onClick={() => toggleCompare(selectedProduct.id)}
                  title="Compare"
                >
                  ⚖️
                </button>
              </div>

              <div className="fragrance-pdp-actions">
                <button
                  type="button"
                  className="fragrance-btn-add-pdp"
                  onClick={() =>
                    addToCart(selectedProduct, pdpSelectedVolume, pdpQty)
                  }
                >
                  Add to Shopping Bag • ${(selectedProduct.price * pdpQty).toFixed(2)}
                </button>
                <button
                  type="button"
                  className="fragrance-btn-buy-pdp"
                  onClick={() => {
                    addToCart(selectedProduct, pdpSelectedVolume, pdpQty)
                    setIsCartOpen(true)
                  }}
                >
                  Express Checkout
                </button>
              </div>

              {/* Accordions: Scent Pyramid, Ingredients, Tips */}
              <div className="fragrance-accordions">
                <div className="fragrance-accordion-item">
                  <button
                    type="button"
                    className="fragrance-accordion-header"
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'notes' ? '' : 'notes')
                    }
                  >
                    <span>Olfactory Pyramid & Scent Notes</span>
                    <span>{openAccordion === 'notes' ? '▲' : '▼'}</span>
                  </button>
                  {openAccordion === 'notes' && (
                    <div className="fragrance-accordion-body">
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
                        <div>
                          <strong>Top Notes:</strong>
                          <ul style={{ margin: '4px 0 0 0', paddingLeft: '18px' }}>
                            {selectedProduct.notes.top.map((n, i) => (
                              <li key={i}>{n}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <strong>Heart Notes:</strong>
                          <ul style={{ margin: '4px 0 0 0', paddingLeft: '18px' }}>
                            {selectedProduct.notes.heart.map((n, i) => (
                              <li key={i}>{n}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <strong>Base Notes:</strong>
                          <ul style={{ margin: '4px 0 0 0', paddingLeft: '18px' }}>
                            {selectedProduct.notes.base.map((n, i) => (
                              <li key={i}>{n}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="fragrance-accordion-item">
                  <button
                    type="button"
                    className="fragrance-accordion-header"
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'usage' ? '' : 'usage')
                    }
                  >
                    <span>How to Apply & Application Ritual</span>
                    <span>{openAccordion === 'usage' ? '▲' : '▼'}</span>
                  </button>
                  {openAccordion === 'usage' && (
                    <div className="fragrance-accordion-body">
                      <p>{selectedProduct.usageTips}</p>
                    </div>
                  )}
                </div>

                <div className="fragrance-accordion-item">
                  <button
                    type="button"
                    className="fragrance-accordion-header"
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'ing' ? '' : 'ing')
                    }
                  >
                    <span>Ingredients & Formulation Purity</span>
                    <span>{openAccordion === 'ing' ? '▲' : '▼'}</span>
                  </button>
                  {openAccordion === 'ing' && (
                    <div className="fragrance-accordion-body">
                      <p>{selectedProduct.ingredients}</p>
                    </div>
                  )}
                </div>

                <div className="fragrance-accordion-item">
                  <button
                    type="button"
                    className="fragrance-accordion-header"
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'ship' ? '' : 'ship')
                    }
                  >
                    <span>Complimentary Gift Packaging & Courier</span>
                    <span>{openAccordion === 'ship' ? '▲' : '▼'}</span>
                  </button>
                  {openAccordion === 'ship' && (
                    <div className="fragrance-accordion-body">
                      <p>{selectedProduct.shipping}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Perfumes */}
          <div style={{ marginTop: '60px' }}>
            <h3 style={{ fontFamily: 'var(--frg-font-serif)', fontSize: '26px', fontWeight: 700, marginBottom: '24px' }}>
              You May Also Like
            </h3>
            <div className="fragrance-product-grid">
              {FRAGRANCE_PRODUCTS.filter((p) => p.id !== selectedProduct.id)
                .slice(0, 4)
                .map((product) => (
                  <div key={product.id} className="fragrance-product-card">
                    <div
                      className="fragrance-card-media"
                      onClick={() => navigateToPDP(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="fragrance-card-img"
                      />
                    </div>
                    <div className="fragrance-card-body">
                      <div className="fragrance-card-family">
                        <span>{product.family}</span>
                        <span className="fragrance-concentration-pill">{product.concentration}</span>
                      </div>
                      <h4
                        className="fragrance-card-title"
                        onClick={() => navigateToPDP(product)}
                      >
                        {product.name}
                      </h4>
                      <div className="fragrance-card-price-row">
                        <span className="fragrance-card-price">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </main>
      )}

      {/* =====================================================================
          COMPARE TRAY & MODAL
          ===================================================================== */}
      {compareIds.length > 0 && (
        <div className="fragrance-compare-tray">
          <div className="fragrance-compare-items">
            <span style={{ fontWeight: 700, fontSize: '13px' }}>
              Compare Scents ({compareIds.length}/4):
            </span>
            {comparedProducts.map((p) => (
              <img
                key={p.id}
                src={p.image}
                alt={p.name}
                className="fragrance-compare-thumb"
                title={p.name}
              />
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="fragrance-btn-primary"
              style={{ padding: '8px 18px', fontSize: '12px' }}
              onClick={() => setIsCompareModalOpen(true)}
            >
              Compare Scent Profiles
            </button>
            <button
              type="button"
              className="fragrance-btn-secondary"
              style={{ padding: '8px 14px', fontSize: '12px' }}
              onClick={() => setCompareIds([])}
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* COMPARE MODAL */}
      {isCompareModalOpen && (
        <div
          className="fragrance-drawer-overlay"
          onClick={() => setIsCompareModalOpen(false)}
        >
          <div
            className="fragrance-modal-box"
            style={{ maxWidth: '860px' }}
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
              <h3 style={{ margin: 0, fontFamily: 'var(--frg-font-serif)', fontSize: '22px', fontWeight: 700 }}>
                Olfactory Scent Comparison
              </h3>
              <button
                type="button"
                className="fragrance-icon-btn"
                onClick={() => setIsCompareModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <table className="fragrance-compare-table">
              <tbody>
                <tr>
                  <th>Perfume</th>
                  {comparedProducts.map((p) => (
                    <td key={p.id} style={{ textAlign: 'center' }}>
                      <img
                        src={p.image}
                        alt={p.name}
                        style={{
                          width: '80px',
                          height: '90px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                        }}
                      />
                      <div style={{ fontFamily: 'var(--frg-font-serif)', fontWeight: 700, marginTop: '6px' }}>{p.name}</div>
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Price</th>
                  {comparedProducts.map((p) => (
                    <td key={p.id} style={{ fontWeight: 800 }}>
                      ${p.price.toFixed(2)}
                    </td>
                  ))}
                </tr>
                <tr>
                  <th>Olfactory Family</th>
                  {comparedProducts.map((p) => (
                    <td key={p.id}>{p.family}</td>
                  ))}
                </tr>
                <tr>
                  <th>Concentration</th>
                  {comparedProducts.map((p) => (
                    <td key={p.id}>{p.concentration}</td>
                  ))}
                </tr>
                <tr>
                  <th>Top Notes</th>
                  {comparedProducts.map((p) => (
                    <td key={p.id}>{p.notes.top.join(', ')}</td>
                  ))}
                </tr>
                <tr>
                  <th>Base Notes</th>
                  {comparedProducts.map((p) => (
                    <td key={p.id}>{p.notes.base.join(', ')}</td>
                  ))}
                </tr>
                <tr>
                  <th>Longevity</th>
                  {comparedProducts.map((p) => (
                    <td key={p.id}>{p.longevity}</td>
                  ))}
                </tr>
                <tr>
                  <th>Action</th>
                  {comparedProducts.map((p) => (
                    <td key={p.id}>
                      <button
                        type="button"
                        className="fragrance-btn-primary"
                        style={{ padding: '6px 12px', fontSize: '11px' }}
                        onClick={() => {
                          addToCart(p, p.volumes[0] || '100ml')
                          setIsCompareModalOpen(false)
                        }}
                      >
                        Add to Bag
                      </button>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {isQuickViewOpen && (
        <div
          className="fragrance-drawer-overlay"
          onClick={() => setIsQuickViewOpen(false)}
        >
          <div
            className="fragrance-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <span className="fragrance-card-family">
                {quickViewProduct.family} • {quickViewProduct.concentration}
              </span>
              <button
                type="button"
                className="fragrance-icon-btn"
                onClick={() => setIsQuickViewOpen(false)}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{
                  width: '100%',
                  aspectRatio: '1',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <div>
                <h3 style={{ fontFamily: 'var(--frg-font-serif)', fontSize: '22px', fontWeight: 700, margin: '0 0 10px 0' }}>
                  {quickViewProduct.name}
                </h3>
                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--frg-primary)', marginBottom: '14px' }}>
                  ${quickViewProduct.price.toFixed(2)}
                </div>
                <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.6 }}>
                  {quickViewProduct.description}
                </p>

                <div style={{ margin: '16px 0' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Available Volumes:
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {quickViewProduct.volumes.map((v) => (
                      <span key={v} className="fragrance-volume-chip selected">
                        {v}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="fragrance-btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => {
                    addToCart(quickViewProduct, quickViewProduct.volumes[0] || '100ml')
                    setIsQuickViewOpen(false)
                  }}
                >
                  Add to Shopping Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SLIDE-OVER CART DRAWER */}
      {isCartOpen && (
        <div
          className="fragrance-drawer-overlay"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="fragrance-cart-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="fragrance-drawer-header">
              <h3 className="fragrance-drawer-title">Shopping Bag</h3>
              <button
                type="button"
                className="fragrance-icon-btn"
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Free Shipping Goal Meter */}
            <div className="fragrance-free-shipping-goal">
              {cartSubtotal >= freeShippingThreshold ? (
                <span style={{ color: '#10b981', fontWeight: 700 }}>
                  🎉 Congratulations! You have unlocked Free Courier Delivery!
                </span>
              ) : (
                <span>
                  Add{' '}
                  <strong>
                    ${(freeShippingThreshold - cartSubtotal).toFixed(2)}
                  </strong>{' '}
                  more for <strong>Free Worldwide Courier</strong>!
                </span>
              )}
              <div className="fragrance-progress-bar">
                <div
                  className="fragrance-progress-fill"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="fragrance-cart-items-wrap">
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <p style={{ color: 'var(--frg-muted)' }}>Your shopping bag is empty.</p>
                  <button
                    type="button"
                    className="fragrance-btn-primary"
                    onClick={() => {
                      setIsCartOpen(false)
                      setViewMode('collection')
                    }}
                  >
                    Explore Boutique Scents
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={`${item.product.id}-${item.volume}-${idx}`} className="fragrance-cart-item">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="fragrance-cart-item-img"
                    />
                    <div className="fragrance-cart-item-info">
                      <h4 className="fragrance-cart-item-title">{item.product.name}</h4>
                      <div className="fragrance-cart-item-meta">
                        Volume: {item.volume} • {item.product.concentration}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div className="fragrance-qty-controls">
                          <button
                            type="button"
                            className="fragrance-qty-btn"
                            onClick={() => updateCartQty(idx, -1)}
                          >
                            -
                          </button>
                          <span className="fragrance-qty-val">{item.quantity}</span>
                          <button
                            type="button"
                            className="fragrance-qty-btn"
                            onClick={() => updateCartQty(idx, 1)}
                          >
                            +
                          </button>
                        </div>
                        <span style={{ fontWeight: 800 }}>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cartItems.length > 0 && (
              <div className="fragrance-drawer-footer">
                <div className="fragrance-subtotal-row">
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <button
                  type="button"
                  className="fragrance-checkout-btn"
                  onClick={() => {
                    showToast('Proceeding to secure luxury checkout...')
                    setIsCartOpen(false)
                  }}
                >
                  Proceed to Checkout →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && <div className="fragrance-toast">{toastMessage}</div>}

      {/* 4. FOOTER (FAITHFUL TO FRAGRANCE WORKDO) */}
      <footer className="fragrance-footer">
        <div className="fragrance-container">
          <div className="fragrance-footer-grid">
            {/* Col 1 */}
            <div className="fragrance-footer-logo-col">
              <span className="fragrance-brand-title" style={{ color: '#ffffff' }}>
                Fragrance<span style={{ color: 'var(--frg-accent-gold)' }}>.</span>
              </span>
              <p>
                Fragrance WorkDo is dedicated to high-end perfumery, bespoke scent design,
                and artisanal extraction. Discover the world’s most precious raw materials,
                hand-macerated for enduring elegance.
              </p>
              <div className="fragrance-footer-socials">
                <span className="fragrance-footer-social-btn" title="Instagram">📸</span>
                <span className="fragrance-footer-social-btn" title="Facebook">📘</span>
                <span className="fragrance-footer-social-btn" title="Pinterest">📌</span>
                <span className="fragrance-footer-social-btn" title="YouTube">📺</span>
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="fragrance-footer-title">Navigation</h4>
              <ul className="fragrance-footer-links">
                <li>
                  <span className="fragrance-footer-link" onClick={() => setViewMode('collection')}>
                    Search Fragrances
                  </span>
                </li>
                <li>
                  <span className="fragrance-footer-link" onClick={() => setViewMode('collection')}>
                    All collections
                  </span>
                </li>
                <li>
                  <span className="fragrance-footer-link" onClick={() => setViewMode('collection')}>
                    All perfumes
                  </span>
                </li>
                <li>
                  <span className="fragrance-footer-link" onClick={() => setIsCartOpen(true)}>
                    My Shopping Bag
                  </span>
                </li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="fragrance-footer-title">Scent House</h4>
              <ul className="fragrance-footer-links">
                <li>
                  <span className="fragrance-footer-link" onClick={() => showToast('About Grasse Atelier')}>
                    About the House
                  </span>
                </li>
                <li>
                  <span className="fragrance-footer-link" onClick={() => showToast('Fragrance Journals')}>
                    Perfume Articles
                  </span>
                </li>
                <li>
                  <span className="fragrance-footer-link" onClick={() => showToast(`Wishlist (${wishlistIds.length})`)}>
                    Fragrance Wishlist
                  </span>
                </li>
                <li>
                  <span className="fragrance-footer-link" onClick={() => showToast('Terms & Privacy')}>
                    Terms & Purity Standards
                  </span>
                </li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="fragrance-footer-title">Boutique Hours</h4>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#94a3b8', margin: '0 0 14px 0' }}>
                Monday - Friday: 8:00 AM - 9:00 PM<br />
                Saturday - Sunday: 9:00 AM - 6:00 PM
              </p>
              <div style={{ fontSize: '13px', color: '#94a3b8' }}>
                📍 12 Place Vendôme, Paris & Flagship Boutiques<br />
                📞 +1 (800) 555-FRAGRANCE
              </div>
            </div>
          </div>

          <div className="fragrance-footer-bottom">
            <span>© {new Date().getFullYear()} Fragrance by WorkDo. Powered by Willovate One.</span>
            <div style={{ display: 'flex', gap: '8px', fontSize: '18px' }}>
              <span>💳</span>
              <span>🔒</span>
              <span>💎</span>
              <span>🍎</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
