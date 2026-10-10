import React, { useState, useMemo } from 'react'
import type {
  TrendyProduct,
  TrendyCategoryType,
  TrendyCartItem,
  TrendyStorefrontProps,
  TrendyFilterState,
} from './types'
import {
  TRENDY_PRODUCTS,
  TRENDY_REVIEWS,
  TRENDY_BLOGS,
  TRENDY_PROMISES,
} from './data/trendyData'
import './styles/trendyFashion.css'

export const TrendyFashionStorefront: React.FC<TrendyStorefrontProps> = ({
  template: _template,
  device = 'desktop',
  customAccentColor,
  onColorChange: _onColorChange,
  onUseTemplate: _onUseTemplate,
}) => {
  // Navigation & View State
  const [viewMode, setViewMode] = useState<'home' | 'collection' | 'pdp'>('home')
  const [selectedProduct, setSelectedProduct] = useState<TrendyProduct>(TRENDY_PRODUCTS[0])
  const [bestsellerTab, setBestsellerTab] = useState<'All Products' | 'Dresses' | 'Jackets' | 'Party wear'>('All Products')
  
  // Hero Editorial Expansion
  const [isHeroExpanded, setIsHeroExpanded] = useState<boolean>(false)
  const [isCatEditorialExpanded, setIsCatEditorialExpanded] = useState<boolean>(false)

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState<boolean>(false)
  const [quickViewProduct, setQuickViewProduct] = useState<TrendyProduct>(TRENDY_PRODUCTS[0])
  const [isCompareModalOpen, setIsCompareModalOpen] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false)

  // Cart & Wishlist & Compare States
  const [cartItems, setCartItems] = useState<TrendyCartItem[]>([
    {
      product: TRENDY_PRODUCTS[0], // Brown Crop Biker Jacket
      size: 'M',
      color: TRENDY_PRODUCTS[0].colors[0].name,
      quantity: 1,
    },
  ])
  const [wishlistIds, setWishlistIds] = useState<string[]>([TRENDY_PRODUCTS[1].id])
  const [compareIds, setCompareIds] = useState<string[]>([])
  
  // Per-card selected size state: productId -> size
  const [selectedCardSizes, setSelectedCardSizes] = useState<Record<string, string>>({})

  // PDP Variant States
  const [pdpSelectedImage, setPdpSelectedImage] = useState<string>(TRENDY_PRODUCTS[0].image)
  const [pdpSelectedSize, setPdpSelectedSize] = useState<string>(TRENDY_PRODUCTS[0].sizes[0] || 'M')
  const [pdpSelectedColor, setPdpSelectedColor] = useState<string>(TRENDY_PRODUCTS[0].colors[0]?.name || 'Standard')
  const [pdpQty, setPdpQty] = useState<number>(1)
  const [openAccordion, setOpenAccordion] = useState<string>('desc')

  // Search & Toast
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Collection Filters State
  const [filters, setFilters] = useState<TrendyFilterState>({
    category: 'All',
    selectedSizes: [],
    selectedColors: [],
    priceRange: [0, 50],
    inStockOnly: false,
    sortBy: 'featured',
  })

  // Show Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Handle Cart Operations
  const addToCart = (product: TrendyProduct, size: string, color: string, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      )
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + qty }
            : item
        )
      }
      return [...prev, { product, size, color, quantity: qty }]
    })
    showToast(`Added "${product.name}" (${size}) to your cart!`)
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
      const prod = TRENDY_PRODUCTS.find((p) => p.id === id)
      const name = prod ? prod.name : 'Item'
      showToast(exists ? `Removed "${name}" from wishlist` : `Saved "${name}" to wishlist!`)
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
        showToast('You can compare up to 4 items at once.')
        return prev
      }
      showToast('Added to comparison tray.')
      return [...prev, id]
    })
  }

  // Navigate to PDP
  const navigateToPDP = (product: TrendyProduct) => {
    setSelectedProduct(product)
    setPdpSelectedImage(product.image)
    setPdpSelectedSize(product.sizes[0] || 'M')
    setPdpSelectedColor(product.colors[0]?.name || 'Standard')
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
    return TRENDY_PRODUCTS.filter((p) => {
      if (filters.category !== 'All' && p.category !== filters.category) return false
      if (filters.inStockOnly && !p.inStock) return false
      if (p.price < filters.priceRange[0] || p.price > filters.priceRange[1]) return false
      if (filters.selectedSizes.length > 0 && !filters.selectedSizes.some((s) => p.sizes.includes(s))) {
        return false
      }
      if (
        filters.selectedColors.length > 0 &&
        !filters.selectedColors.some((c) => p.colors.some((pc) => pc.name.toLowerCase().includes(c.toLowerCase())))
      ) {
        return false
      }
      if (
        searchQuery.trim() &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
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

  // Bestsellers Tab filter
  const bestsellerProducts = useMemo(() => {
    if (bestsellerTab === 'All Products') return TRENDY_PRODUCTS.slice(0, 8)
    if (bestsellerTab === 'Dresses') return TRENDY_PRODUCTS.filter((p) => p.category === 'Dresses')
    if (bestsellerTab === 'Jackets') return TRENDY_PRODUCTS.filter((p) => p.category === 'Jackets')
    if (bestsellerTab === 'Party wear') return TRENDY_PRODUCTS.filter((p) => p.category === 'Party wear')
    return TRENDY_PRODUCTS.slice(0, 8)
  }, [bestsellerTab])

  // Compared Products
  const comparedProducts = useMemo(() => {
    return TRENDY_PRODUCTS.filter((p) => compareIds.includes(p.id))
  }, [compareIds])

  // Wishlist Products
  const wishlistProducts = useMemo(() => {
    return TRENDY_PRODUCTS.filter((p) => wishlistIds.includes(p.id))
  }, [wishlistIds])

  // Custom accent style override
  const inlineAccentStyle = customAccentColor
    ? ({ '--tr-accent': customAccentColor } as React.CSSProperties)
    : undefined

  return (
    <div
      className={`trendy-storefront device-${device} ${device === 'mobile' ? 'trendy-mobile device-mobile is-mobile' : ''}`}
      style={inlineAccentStyle}
    >
      {/* 1. TOP ANNOUNCEMENT / UTILITY BAR */}
      <div className="trendy-topbar">
        <div className="trendy-container trendy-topbar-inner">
          <div className="trendy-topbar-schedule">
            <span className="clock-icon">🕒</span>
            <span>Monday - Friday: 8:00 AM - 9:00 PM</span>
          </div>

          <div className="trendy-topbar-actions">
            <div className="trendy-topbar-links">
              <span className="trendy-topbar-link" onClick={() => showToast('Help Center is 24/7')}>
                Support
              </span>
              <span className="trendy-topbar-link" onClick={() => showToast('FAQ: Free delivery over $100')}>
                FAQ
              </span>
              <span className="trendy-topbar-link" onClick={() => showToast('About Us: Contemporary fashion since 2020')}>
                About Us
              </span>
              <span className="trendy-topbar-link" onClick={() => showToast('Contact: hello@trendy-fashion.com')}>
                Contact
              </span>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              <select className="trendy-topbar-select" defaultValue="USD" aria-label="Currency">
                <option value="USD">USD $</option>
                <option value="EUR">EUR €</option>
                <option value="GBP">GBP £</option>
                <option value="INR">INR ₹</option>
              </select>

              <select className="trendy-topbar-select" defaultValue="EN" aria-label="Language">
                <option value="EN">English</option>
                <option value="AR">Arabic</option>
                <option value="ES">Spanish</option>
                <option value="DE">German</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* 2. STICKY MAIN HEADER */}
      <header className="trendy-header">
        <div className="trendy-container trendy-header-inner">
          {/* Mobile Menu Toggle (Left) */}
          <button
            type="button"
            className="trendy-mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            ☰
          </button>

          {/* Logo */}
          <div
            className="trendy-brand-logo"
            onClick={() => {
              setViewMode('home')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <span className="trendy-brand-title">
              Trendy<span style={{ color: 'var(--tr-accent)' }}>.</span>
            </span>
            <span className="trendy-brand-tag">WORKDO</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="trendy-nav" aria-label="Main Navigation">
            <button
              type="button"
              className={`trendy-nav-item ${viewMode === 'home' ? 'active' : ''}`}
              onClick={() => {
                setViewMode('home')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              Home
            </button>
            <button
              type="button"
              className={`trendy-nav-item ${viewMode === 'collection' && filters.category === 'All' ? 'active' : ''}`}
              onClick={() => {
                setFilters((f) => ({ ...f, category: 'All' }))
                setViewMode('collection')
              }}
            >
              Shop
            </button>
            <button
              type="button"
              className={`trendy-nav-item ${viewMode === 'collection' && filters.category === 'Co-Ords' ? 'active' : ''}`}
              onClick={() => {
                setFilters((f) => ({ ...f, category: 'Co-Ords' }))
                setViewMode('collection')
              }}
            >
              Co-Ords
            </button>
            <button
              type="button"
              className={`trendy-nav-item ${viewMode === 'collection' && filters.category === 'Dresses' ? 'active' : ''}`}
              onClick={() => {
                setFilters((f) => ({ ...f, category: 'Dresses' }))
                setViewMode('collection')
              }}
            >
              Dresses
            </button>
            <button
              type="button"
              className={`trendy-nav-item ${viewMode === 'collection' && filters.category === 'Jackets' ? 'active' : ''}`}
              onClick={() => {
                setFilters((f) => ({ ...f, category: 'Jackets' }))
                setViewMode('collection')
              }}
            >
              Jackets
            </button>
            <button
              type="button"
              className={`trendy-nav-item ${viewMode === 'collection' && filters.category === 'Tops' ? 'active' : ''}`}
              onClick={() => {
                setFilters((f) => ({ ...f, category: 'Tops' }))
                setViewMode('collection')
              }}
            >
              Tops
            </button>
            <button
              type="button"
              className={`trendy-nav-item ${viewMode === 'collection' && filters.category === 'Bags' ? 'active' : ''}`}
              onClick={() => {
                setFilters((f) => ({ ...f, category: 'Bags' }))
                setViewMode('collection')
              }}
            >
              Bags
            </button>
          </nav>

          {/* Header Actions */}
          <div className="trendy-header-actions">
            {/* Desktop Search Input */}
            <div className="trendy-search-box trendy-desktop-search">
              <span className="trendy-search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search products..."
                className="trendy-search-input"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  if (viewMode !== 'collection') setViewMode('collection')
                }}
              />
            </div>

            {/* Mobile Search Toggle */}
            <button
              type="button"
              className="trendy-icon-btn trendy-mobile-search-toggle"
              title="Search"
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
              🔍
            </button>

            {/* Compare Badge / Button */}
            <button
              type="button"
              className="trendy-icon-btn trendy-compare-btn"
              title="Compare Items"
              onClick={() => {
                if (compareIds.length === 0) {
                  showToast('Select items to compare first')
                } else {
                  setIsCompareModalOpen(true)
                }
              }}
            >
              ⚖️
              {compareIds.length > 0 && (
                <span className="trendy-icon-badge">{compareIds.length}</span>
              )}
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              className="trendy-icon-btn"
              title="Wishlist"
              onClick={() => setIsWishlistOpen(true)}
            >
              🤍
              {wishlistIds.length > 0 && (
                <span className="trendy-icon-badge">{wishlistIds.length}</span>
              )}
            </button>

            {/* Cart Button */}
            <button
              type="button"
              className="trendy-icon-btn"
              title="Shopping Cart"
              onClick={() => setIsCartOpen(true)}
            >
              🛍️
              <span className="trendy-icon-badge">
                {cartItems.reduce((acc, it) => acc + it.quantity, 0)}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {isMobileSearchOpen && (
          <div className="trendy-mobile-search-bar">
            <div className="trendy-container">
              <div className="trendy-mobile-search-inner">
                <span className="trendy-search-icon">🔍</span>
                <input
                  type="text"
                  placeholder="Search all products..."
                  className="trendy-mobile-search-input"
                  value={searchQuery}
                  autoFocus
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    if (viewMode !== 'collection') setViewMode('collection')
                  }}
                />
                {searchQuery && (
                  <button
                    type="button"
                    className="trendy-mobile-search-clear"
                    onClick={() => setSearchQuery('')}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE DRAWER */}
      {isMobileMenuOpen && (
        <div
          className="trendy-drawer-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            className="trendy-cart-drawer"
            style={{ left: 0, right: 'auto' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="trendy-drawer-header">
              <h3 className="trendy-drawer-title">Navigation</h3>
              <button
                type="button"
                className="trendy-icon-btn"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="trendy-cart-items-wrap" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                'Home',
                'Shop',
                'Co-Ords',
                'Dresses',
                'Jackets',
                'Tops',
                'Bags',
                'Party wear',
              ].map((category) => (
                <button
                  key={category}
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    textAlign: 'left',
                    fontSize: '15px',
                    fontWeight: 700,
                    padding: '12px 0',
                    borderBottom: '1px solid var(--tr-border)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onClick={() => {
                    if (category === 'Home') {
                      setViewMode('home')
                    } else {
                      setFilters((f) => ({
                        ...f,
                        category: (category === 'Shop' ? 'All' : category) as TrendyCategoryType,
                      }))
                      setViewMode('collection')
                    }
                    setIsMobileMenuOpen(false)
                  }}
                >
                  <span>{category}</span>
                  <span style={{ color: 'var(--tr-muted)', fontSize: '13px' }}>→</span>
                </button>
              ))}

              {/* Utility Links in Drawer */}
              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid var(--tr-border)' }}>
                <div style={{ fontSize: '12px', fontWeight: 800, color: 'var(--tr-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  Quick Actions
                </div>
                <button
                  type="button"
                  style={{ width: '100%', padding: '10px 0', background: 'none', border: 'none', textAlign: 'left', fontWeight: 600, fontSize: '14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsCartOpen(true)
                  }}
                >
                  <span>🛍️ Shopping Bag</span>
                  <span>{cartItems.reduce((acc, it) => acc + it.quantity, 0)} items</span>
                </button>
                <button
                  type="button"
                  style={{ width: '100%', padding: '10px 0', background: 'none', border: 'none', textAlign: 'left', fontWeight: 600, fontSize: '14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
                  onClick={() => {
                    setIsMobileMenuOpen(false)
                    setIsWishlistOpen(true)
                  }}
                >
                  <span>🤍 Wishlist</span>
                  <span>{wishlistIds.length} items</span>
                </button>
                {compareIds.length > 0 && (
                  <button
                    type="button"
                    style={{ width: '100%', padding: '10px 0', background: 'none', border: 'none', textAlign: 'left', fontWeight: 600, fontSize: '14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
                    onClick={() => {
                      setIsMobileMenuOpen(false)
                      setIsCompareModalOpen(true)
                    }}
                  >
                    <span>⚖️ Compare Tray</span>
                    <span>{compareIds.length} items</span>
                  </button>
                )}

                <div style={{ marginTop: '16px', display: 'flex', gap: '8px', fontSize: '12px', color: 'var(--tr-muted)', flexWrap: 'wrap' }}>
                  <span style={{ cursor: 'pointer' }} onClick={() => showToast('Help Center is 24/7')}>Support</span>
                  <span>•</span>
                  <span style={{ cursor: 'pointer' }} onClick={() => showToast('Free Delivery over $100')}>FAQ</span>
                  <span>•</span>
                  <span style={{ cursor: 'pointer' }} onClick={() => showToast('Contemporary fashion since 2020')}>About Us</span>
                  <span>•</span>
                  <span style={{ cursor: 'pointer' }} onClick={() => showToast('hello@trendy-fashion.com')}>Contact</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          VIEW MODE 1: HOME PAGE (AUTHENTIC WORKDO STRUCTURE)
          ===================================================================== */}
      {viewMode === 'home' && (
        <main>
          {/* HERO SECTION */}
          <section className="trendy-hero">
            <div className="trendy-container">
              <div className="trendy-hero-grid">
                <div className="trendy-hero-text">
                  <div className="trendy-hero-badge">
                    <span>✨</span>
                    <span>WOMEN FASHION</span>
                  </div>

                  <h1 className="trendy-hero-title">
                    Trendy Fashion — Redefining <span>Contemporary</span> Silhouettes
                  </h1>

                  <p className="trendy-hero-desc">
                    Women's fashion is a captivating and ever-evolving realm of
                    self-expression, reflecting the essence of contemporary culture,
                    personal style, and individual identity. It is a fusion of art,
                    culture, and innovation that empowers and uplifts.
                  </p>

                  <div className="trendy-hero-actions">
                    <button
                      type="button"
                      className="trendy-btn-primary"
                      onClick={() => {
                        setFilters((f) => ({ ...f, category: 'All' }))
                        setViewMode('collection')
                      }}
                    >
                      SHOP COLLECTION →
                    </button>

                    <button
                      type="button"
                      className="trendy-btn-secondary"
                      onClick={() => setIsHeroExpanded(!isHeroExpanded)}
                    >
                      {isHeroExpanded ? 'SHOW LESS ▲' : 'SHOW MORE ▼'}
                    </button>
                  </div>

                  {/* Expandable Editorial Block */}
                  {isHeroExpanded && (
                    <div className="trendy-expandable-box">
                      <p>
                        Our seasonal drop highlights tailored crop bikers, breathable
                        accordion-pleat sets, and botanical floral prints designed to transition seamlessly
                        from daywear into formal evening galas. Every piece is crafted with
                        durable, high-recovery fabrics tailored for modern life.
                      </p>
                    </div>
                  )}
                </div>

                {/* Hero Visual Card */}
                <div className="trendy-hero-visual">
                  <div className="trendy-hero-img-card">
                    <img
                      src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&auto=format&fit=crop&q=85"
                      alt="Trendy Women Fashion"
                      className="trendy-hero-img"
                    />
                  </div>

                  <div className="trendy-hero-floating-card">
                    <div className="trendy-floating-icon">🛍️</div>
                    <div className="trendy-floating-content">
                      <h4>New Drops Available</h4>
                      <p>Over 25+ styles ready to ship today</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* PROMISES VALUE STRIP */}
          <section className="trendy-promises-strip">
            <div className="trendy-container">
              <div className="trendy-promises-grid">
                {TRENDY_PROMISES.map((item, idx) => (
                  <div key={idx} className="trendy-promise-item">
                    <div className="trendy-promise-icon">{item.icon}</div>
                    <div>
                      <h4 className="trendy-promise-title">{item.title}</h4>
                      <p className="trendy-promise-desc">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FEATURED PRODUCTS (CAROUSEL / GRID) */}
          <section style={{ padding: '70px 0', backgroundColor: '#ffffff' }}>
            <div className="trendy-container">
              <div className="trendy-section-header">
                <span className="trendy-section-eyebrow">CURATED SELECTION</span>
                <h2 className="trendy-section-title">Featured Products</h2>
                <p className="trendy-section-desc">
                  Discover our top-rated outerwear, co-ord sets, and seasonal statements.
                </p>
              </div>

              <div className="trendy-product-grid">
                {TRENDY_PRODUCTS.slice(0, 8).map((product) => {
                  const cardSelectedSize =
                    selectedCardSizes[product.id] || product.sizes[0] || 'M'

                  return (
                    <div key={product.id} className="trendy-product-card">
                      <div
                        className="trendy-card-media"
                        onClick={() => navigateToPDP(product)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="trendy-card-img"
                        />

                        {product.isSale && (
                          <span className="trendy-card-badge trendy-badge-sale">Sale</span>
                        )}
                        {!product.isSale && product.isNew && (
                          <span className="trendy-card-badge trendy-badge-new">New</span>
                        )}

                        <div
                          className="trendy-card-actions"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            className={`trendy-action-circle-btn ${wishlistIds.includes(product.id) ? 'active' : ''}`}
                            title={wishlistIds.includes(product.id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                            onClick={() => toggleWishlist(product.id)}
                          >
                            {wishlistIds.includes(product.id) ? '❤️' : '🤍'}
                          </button>
                          <button
                            type="button"
                            className="trendy-action-circle-btn"
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

                      <div className="trendy-card-body">
                        <span className="trendy-card-subtitle">{product.subtitle}</span>
                        <h3
                          className="trendy-card-title"
                          onClick={() => navigateToPDP(product)}
                        >
                          {product.name}
                        </h3>

                        {/* Inline Size Pills */}
                        <div className="trendy-card-sizes">
                          <span className="trendy-card-size-label">Size:</span>
                          {product.sizes.map((s) => (
                            <button
                              key={s}
                              type="button"
                              className={`trendy-size-chip ${cardSelectedSize === s ? 'selected' : ''}`}
                              onClick={() => {
                                setSelectedCardSizes((prev) => ({
                                  ...prev,
                                  [product.id]: s,
                                }))
                              }}
                            >
                              {s}
                            </button>
                          ))}
                        </div>

                        {/* Price and Add button */}
                        <div className="trendy-card-price-row">
                          <div className="trendy-card-prices">
                            <span className="trendy-card-price">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.compareAtPrice && (
                              <span className="trendy-card-compare">
                                ${product.compareAtPrice.toFixed(2)}
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            className="trendy-card-add-btn"
                            onClick={() =>
                              addToCart(
                                product,
                                cardSelectedSize,
                                product.colors[0]?.name || 'Standard'
                              )
                            }
                          >
                            + Add
                          </button>
                        </div>

                        {/* Compare Checkbox */}
                        <div className="trendy-card-compare-row">
                          <label className="trendy-compare-label">
                            <input
                              type="checkbox"
                              checked={compareIds.includes(product.id)}
                              onChange={() => toggleCompare(product.id)}
                            />
                            <span>Compare</span>
                          </label>
                          <span style={{ fontSize: '11px' }}>
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

          {/* DUAL PROMO BANNERS */}
          <section className="trendy-dual-banners">
            <div className="trendy-container">
              <div className="trendy-banners-grid">
                {/* Banner 1: Accessories */}
                <div
                  className="trendy-banner-card"
                  onClick={() => {
                    setFilters((f) => ({ ...f, category: 'Bags' }))
                    setViewMode('collection')
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=900&auto=format&fit=crop&q=80"
                    alt="Accessories Trending"
                    className="trendy-banner-bg"
                  />
                  <div className="trendy-banner-overlay" />
                  <div className="trendy-banner-content">
                    <span className="trendy-banner-tag">TRENDING COLLECTION</span>
                    <h3 className="trendy-banner-title">Accessories Trending Products</h3>
                    <span className="trendy-banner-link">Shop Leather Goods →</span>
                  </div>
                </div>

                {/* Banner 2: Women Fashion */}
                <div
                  className="trendy-banner-card"
                  onClick={() => {
                    setFilters((f) => ({ ...f, category: 'Co-Ords' }))
                    setViewMode('collection')
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&auto=format&fit=crop&q=80"
                    alt="Women Fashion See More"
                    className="trendy-banner-bg"
                  />
                  <div className="trendy-banner-overlay" />
                  <div className="trendy-banner-content">
                    <span className="trendy-banner-tag">NEW SEASON EDIT</span>
                    <h3 className="trendy-banner-title">Women Fashion See More</h3>
                    <span className="trendy-banner-link">Explore Co-Ords & Sets →</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* EDITORIAL CATEGORIES SPLIT BLOCK */}
          <section className="trendy-editorial-block">
            <div className="trendy-container">
              <div className="trendy-editorial-grid">
                <div className="trendy-editorial-content">
                  <span className="trendy-editorial-eyebrow">CATEGORIES</span>
                  <h2 className="trendy-editorial-title">Women Fabric Choice</h2>
                  <p className="trendy-editorial-body">
                    In today's fashion world, diversity is celebrated, and women are
                    free to explore an array of styles that cater to their unique
                    personalities and preferences. From the classic elegance of the
                    little black dress to the bold patterns of modern bohemian
                    co-ords, women's fashion offers a vast spectrum of creative choices.
                  </p>

                  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                    <button
                      type="button"
                      className="trendy-btn-primary"
                      onClick={() => {
                        setFilters((f) => ({ ...f, category: 'All' }))
                        setViewMode('collection')
                      }}
                    >
                      BROWSE ALL CATEGORIES →
                    </button>
                    <button
                      type="button"
                      className="trendy-btn-secondary"
                      onClick={() => setIsCatEditorialExpanded(!isCatEditorialExpanded)}
                    >
                      {isCatEditorialExpanded ? 'LESS INFO ▲' : 'READ MORE ▼'}
                    </button>
                  </div>

                  {isCatEditorialExpanded && (
                    <div className="trendy-expandable-box" style={{ marginTop: '20px' }}>
                      <p>
                        Each category in our WorkDo catalog is meticulously developed with
                        pure natural cottons, double-weave georgettes, and crease-resistant
                        crepes. We partner with responsible manufacturers committed to zero
                        synthetic water waste.
                      </p>
                    </div>
                  )}
                </div>

                {/* Featured split card */}
                <div className="trendy-featured-product-split">
                  <img
                    src="https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&auto=format&fit=crop&q=80"
                    alt="Featured Look"
                    className="trendy-split-img"
                  />
                  <div className="trendy-split-info">
                    <span className="trendy-card-subtitle">SPOTLIGHT LOOK</span>
                    <h3 style={{ fontSize: '18px', fontWeight: 800, margin: '6px 0 10px 0' }}>
                      Floral Print Pleated Bottom Set
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--tr-muted)', marginBottom: '16px' }}>
                      Sensational pleats with metallic floral accents for evening cocktail parties.
                    </p>
                    <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--tr-primary)', marginBottom: '16px' }}>
                      $25.00
                    </span>
                    <button
                      type="button"
                      className="trendy-btn-primary"
                      style={{ padding: '10px 20px', fontSize: '13px' }}
                      onClick={() => navigateToPDP(TRENDY_PRODUCTS[4])}
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* BESTSELLERS TABBED SECTION */}
          <section className="trendy-bestsellers-section">
            <div className="trendy-container">
              <div className="trendy-section-header">
                <span className="trendy-section-eyebrow">TRENDING CATALOG</span>
                <h2 className="trendy-section-title">Bestseller Products</h2>
                <p className="trendy-section-desc">
                  Curated picks from customer favorites across our signature collections.
                </p>
              </div>

              {/* Tabs */}
              <div className="trendy-tabs">
                {(['All Products', 'Dresses', 'Jackets', 'Party wear'] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`trendy-tab-btn ${bestsellerTab === tab ? 'active' : ''}`}
                    onClick={() => setBestsellerTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Grid */}
              <div className="trendy-product-grid">
                {bestsellerProducts.map((product) => {
                  const cardSelectedSize =
                    selectedCardSizes[product.id] || product.sizes[0] || 'M'

                  return (
                    <div key={product.id} className="trendy-product-card">
                      <div
                        className="trendy-card-media"
                        onClick={() => navigateToPDP(product)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="trendy-card-img"
                        />
                        {product.isSale && (
                          <span className="trendy-card-badge trendy-badge-sale">Sale</span>
                        )}

                        <div
                          className="trendy-card-actions"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            className={`trendy-action-circle-btn ${wishlistIds.includes(product.id) ? 'active' : ''}`}
                            title={wishlistIds.includes(product.id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                            onClick={() => toggleWishlist(product.id)}
                          >
                            {wishlistIds.includes(product.id) ? '❤️' : '🤍'}
                          </button>
                          <button
                            type="button"
                            className="trendy-action-circle-btn"
                            onClick={() => {
                              setQuickViewProduct(product)
                              setIsQuickViewOpen(true)
                            }}
                          >
                            👁️
                          </button>
                        </div>
                      </div>

                      <div className="trendy-card-body">
                        <span className="trendy-card-subtitle">{product.subtitle}</span>
                        <h3
                          className="trendy-card-title"
                          onClick={() => navigateToPDP(product)}
                        >
                          {product.name}
                        </h3>

                        <div className="trendy-card-sizes">
                          <span className="trendy-card-size-label">Size:</span>
                          {product.sizes.map((s) => (
                            <button
                              key={s}
                              type="button"
                              className={`trendy-size-chip ${cardSelectedSize === s ? 'selected' : ''}`}
                              onClick={() => {
                                setSelectedCardSizes((prev) => ({
                                  ...prev,
                                  [product.id]: s,
                                }))
                              }}
                            >
                              {s}
                            </button>
                          ))}
                        </div>

                        <div className="trendy-card-price-row">
                          <div className="trendy-card-prices">
                            <span className="trendy-card-price">
                              ${product.price.toFixed(2)}
                            </span>
                            {product.compareAtPrice && (
                              <span className="trendy-card-compare">
                                ${product.compareAtPrice.toFixed(2)}
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            className="trendy-card-add-btn"
                            onClick={() =>
                              addToCart(
                                product,
                                cardSelectedSize,
                                product.colors[0]?.name || 'Standard'
                              )
                            }
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
          <section className="trendy-testimonials">
            <div className="trendy-container">
              <div className="trendy-section-header">
                <span className="trendy-section-eyebrow">TESTIMONIALS</span>
                <h2 className="trendy-section-title">What Our Customers Say</h2>
                <p className="trendy-section-desc">
                  Real feedback from fashion enthusiasts worldwide.
                </p>
              </div>

              <div className="trendy-reviews-grid">
                {TRENDY_REVIEWS.map((rev) => (
                  <div key={rev.id} className="trendy-review-card">
                    <div className="trendy-stars-row">★★★★★</div>
                    <h4 className="trendy-review-headline">{rev.headline}</h4>
                    <p className="trendy-review-comment">"{rev.comment}"</p>
                    <div className="trendy-review-author-row">
                      <span className="trendy-review-author">{rev.author}</span>
                      {rev.verified && (
                        <span className="trendy-review-verified">✓ Verified Buyer</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* BLOGS */}
          <section className="trendy-blog-section">
            <div className="trendy-container">
              <div className="trendy-section-header">
                <span className="trendy-section-eyebrow">EDITORIAL JOURNAL</span>
                <h2 className="trendy-section-title">Latest Fashion News</h2>
                <p className="trendy-section-desc">
                  Insights, styling tutorials, and runway reviews from our trend team.
                </p>
              </div>

              <div className="trendy-blog-grid">
                {TRENDY_BLOGS.map((blog) => (
                  <div key={blog.id} className="trendy-blog-card">
                    <div className="trendy-blog-img-wrap">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="trendy-blog-img"
                      />
                    </div>
                    <div className="trendy-blog-content">
                      <div className="trendy-blog-meta">
                        <span className="trendy-blog-tag">{blog.tag}</span>
                        <span>{blog.date}</span>
                        <span>•</span>
                        <span>{blog.readTime}</span>
                      </div>
                      <h3 className="trendy-blog-title">{blog.title}</h3>
                      <p className="trendy-blog-excerpt">{blog.excerpt}</p>
                      <span
                        className="trendy-blog-link"
                        onClick={() => showToast(`Opening article: "${blog.title}"`)}
                      >
                        Read Article →
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* NEWSLETTER */}
          <section className="trendy-newsletter">
            <div className="trendy-container">
              <div className="trendy-newsletter-box">
                <h2 className="trendy-newsletter-title">
                  Subscribe newsletter and get -20% off
                </h2>
                <p className="trendy-newsletter-desc">
                  Be the first to hear about seasonal sales, VIP invites, and secret product drops.
                </p>
                <form
                  className="trendy-newsletter-form"
                  onSubmit={(e) => {
                    e.preventDefault()
                    showToast('Thank you for subscribing! Your 20% discount code is TRENDY20.')
                  }}
                >
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    className="trendy-newsletter-input"
                  />
                  <button type="submit" className="trendy-newsletter-btn">
                    Subscribe
                  </button>
                </form>
              </div>
            </div>
          </section>
        </main>
      )}

      {/* =====================================================================
          VIEW MODE 2: FULL COLLECTION / SHOP VIEW
          ===================================================================== */}
      {viewMode === 'collection' && (
        <main className="trendy-container">
          <div className="trendy-breadcrumbs" style={{ marginTop: '24px' }}>
            <button type="button" onClick={() => setViewMode('home')}>
              Home
            </button>
            <span>/</span>
            <span>Shop</span>
            <span>/</span>
            <span style={{ color: 'var(--tr-primary)', fontWeight: 700 }}>
              {filters.category}
            </span>
          </div>

          <div className="trendy-shop-layout">
            {/* Sidebar Filters */}
            <aside className="trendy-sidebar-filters">
              <h3 className="trendy-filter-title">Filters</h3>

              {/* Categories */}
              <div className="trendy-filter-group">
                <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>
                  Category
                </h4>
                <div className="trendy-filter-options">
                  {(
                    [
                      'All',
                      'Co-Ords',
                      'Dresses',
                      'Jackets',
                      'Tops',
                      'Bags',
                      'Party wear',
                    ] as TrendyCategoryType[]
                  ).map((cat) => (
                    <label key={cat} className="trendy-filter-checkbox">
                      <input
                        type="radio"
                        name="shop-cat"
                        checked={filters.category === cat}
                        onChange={() => setFilters((f) => ({ ...f, category: cat }))}
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size Filter */}
              <div className="trendy-filter-group">
                <h4 style={{ fontSize: '13px', fontWeight: 700, marginBottom: '10px' }}>
                  Sizes
                </h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {['S', 'M', 'L', 'XL'].map((size) => {
                    const isSelected = filters.selectedSizes.includes(size)
                    return (
                      <button
                        key={size}
                        type="button"
                        className={`trendy-size-chip ${isSelected ? 'selected' : ''}`}
                        onClick={() => {
                          setFilters((f) => ({
                            ...f,
                            selectedSizes: isSelected
                              ? f.selectedSizes.filter((s) => s !== size)
                              : [...f.selectedSizes, size],
                          }))
                        }}
                      >
                        {size}
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* In-Stock Filter */}
              <div className="trendy-filter-group">
                <label className="trendy-filter-checkbox">
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

              {/* Reset Filters */}
              <button
                type="button"
                className="trendy-btn-secondary"
                style={{ width: '100%', padding: '10px', fontSize: '12.5px' }}
                onClick={() => {
                  setFilters({
                    category: 'All',
                    selectedSizes: [],
                    selectedColors: [],
                    priceRange: [0, 50],
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
              <div className="trendy-shop-controls">
                <span style={{ fontSize: '14px', color: 'var(--tr-muted)' }}>
                  Showing <strong>{filteredProducts.length}</strong> product(s)
                </span>

                <select
                  className="trendy-sort-select"
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((f) => ({
                      ...f,
                      sortBy: e.target.value as TrendyFilterState['sortBy'],
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
                  <h3>No products found</h3>
                  <p style={{ color: 'var(--tr-muted)' }}>
                    Try adjusting your category or size filters.
                  </p>
                </div>
              ) : (
                <div className="trendy-product-grid">
                  {filteredProducts.map((product) => {
                    const cardSelectedSize =
                      selectedCardSizes[product.id] || product.sizes[0] || 'M'

                    return (
                      <div key={product.id} className="trendy-product-card">
                        <div
                          className="trendy-card-media"
                          onClick={() => navigateToPDP(product)}
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            className="trendy-card-img"
                          />
                          {product.isSale && (
                            <span className="trendy-card-badge trendy-badge-sale">Sale</span>
                          )}

                          <div
                            className="trendy-card-actions"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              className={`trendy-action-circle-btn ${wishlistIds.includes(product.id) ? 'active' : ''}`}
                              title={wishlistIds.includes(product.id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                              onClick={() => toggleWishlist(product.id)}
                            >
                              {wishlistIds.includes(product.id) ? '❤️' : '🤍'}
                            </button>
                            <button
                              type="button"
                              className="trendy-action-circle-btn"
                              onClick={() => {
                                setQuickViewProduct(product)
                                setIsQuickViewOpen(true)
                              }}
                            >
                              👁️
                            </button>
                          </div>
                        </div>

                        <div className="trendy-card-body">
                          <span className="trendy-card-subtitle">{product.subtitle}</span>
                          <h3
                            className="trendy-card-title"
                            onClick={() => navigateToPDP(product)}
                          >
                            {product.name}
                          </h3>

                          <div className="trendy-card-sizes">
                            <span className="trendy-card-size-label">Size:</span>
                            {product.sizes.map((s) => (
                              <button
                                key={s}
                                type="button"
                                className={`trendy-size-chip ${cardSelectedSize === s ? 'selected' : ''}`}
                                onClick={() => {
                                  setSelectedCardSizes((prev) => ({
                                    ...prev,
                                    [product.id]: s,
                                  }))
                                }}
                              >
                                {s}
                              </button>
                            ))}
                          </div>

                          <div className="trendy-card-price-row">
                            <div className="trendy-card-prices">
                              <span className="trendy-card-price">
                                ${product.price.toFixed(2)}
                              </span>
                              {product.compareAtPrice && (
                                <span className="trendy-card-compare">
                                  ${product.compareAtPrice.toFixed(2)}
                                </span>
                              )}
                            </div>

                            <button
                              type="button"
                              className="trendy-card-add-btn"
                              onClick={() =>
                                addToCart(
                                  product,
                                  cardSelectedSize,
                                  product.colors[0]?.name || 'Standard'
                                )
                              }
                            >
                              + Add
                            </button>
                          </div>

                          <div className="trendy-card-compare-row">
                            <label className="trendy-compare-label">
                              <input
                                type="checkbox"
                                checked={compareIds.includes(product.id)}
                                onChange={() => toggleCompare(product.id)}
                              />
                              <span>Compare</span>
                            </label>
                            <span style={{ fontSize: '11px' }}>
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
        <main className="trendy-container trendy-pdp-section">
          {/* Breadcrumbs */}
          <div className="trendy-breadcrumbs">
            <button type="button" onClick={() => setViewMode('home')}>
              Home
            </button>
            <span>/</span>
            <button
              type="button"
              onClick={() => {
                setFilters((f) => ({ ...f, category: selectedProduct.category }))
                setViewMode('collection')
              }}
            >
              {selectedProduct.category}
            </button>
            <span>/</span>
            <span style={{ color: 'var(--tr-primary)', fontWeight: 700 }}>
              {selectedProduct.name}
            </span>
          </div>

          <div className="trendy-pdp-layout">
            {/* Gallery */}
            <div className="trendy-pdp-gallery">
              <div className="trendy-pdp-thumbnails">
                {selectedProduct.gallery.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`trendy-thumb-btn ${pdpSelectedImage === img ? 'active' : ''}`}
                    onClick={() => setPdpSelectedImage(img)}
                  >
                    <img src={img} alt={`Thumbnail ${i + 1}`} />
                  </button>
                ))}
              </div>

              <div className="trendy-pdp-main-media">
                <img
                  src={pdpSelectedImage}
                  alt={selectedProduct.name}
                  className="trendy-pdp-main-img"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="trendy-pdp-info">
              <span className="trendy-pdp-subtitle">{selectedProduct.subtitle}</span>
              <h1 className="trendy-pdp-title">{selectedProduct.name}</h1>

              <div className="trendy-pdp-rating-row">
                <span style={{ color: 'var(--tr-gold)' }}>★★★★★</span>
                <span>
                  {selectedProduct.rating} ({selectedProduct.reviewCount} customer reviews)
                </span>
                <span>•</span>
                <span style={{ color: selectedProduct.inStock ? '#10b981' : '#ef4444' }}>
                  {selectedProduct.inStock ? '✓ In Stock' : 'Out of Stock'}
                </span>
                <span>•</span>
                <span>SKU: {selectedProduct.sku}</span>
              </div>

              <div className="trendy-pdp-price-box">
                <span className="trendy-pdp-price">
                  ${selectedProduct.price.toFixed(2)}
                </span>
                {selectedProduct.compareAtPrice && (
                  <span className="trendy-pdp-compare">
                    ${selectedProduct.compareAtPrice.toFixed(2)}
                  </span>
                )}
                {selectedProduct.isSale && (
                  <span className="trendy-card-badge trendy-badge-sale">Save 20%</span>
                )}
              </div>

              <p className="trendy-pdp-desc">{selectedProduct.description}</p>

              {/* Color Swatches */}
              <div className="trendy-variant-group">
                <div className="trendy-variant-label">
                  <span>Color: {pdpSelectedColor}</span>
                </div>
                <div className="trendy-color-swatches">
                  {selectedProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      className={`trendy-color-chip ${pdpSelectedColor === c.name ? 'active' : ''}`}
                      onClick={() => setPdpSelectedColor(c.name)}
                    >
                      <span
                        className="trendy-color-dot"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selectors */}
              <div className="trendy-variant-group">
                <div className="trendy-variant-label">
                  <span>Size: {pdpSelectedSize}</span>
                  <button
                    type="button"
                    style={{
                      background: 'none',
                      border: 'none',
                      textDecoration: 'underline',
                      fontSize: '12px',
                      color: 'var(--tr-muted)',
                      cursor: 'pointer',
                    }}
                    onClick={() => showToast('Size Chart: Model is 5\'9" wearing size M.')}
                  >
                    Size Guide
                  </button>
                </div>
                <div className="trendy-pdp-sizes">
                  {selectedProduct.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`trendy-pdp-size-btn ${pdpSelectedSize === s ? 'active' : ''}`}
                      onClick={() => setPdpSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '10px' }}>
                <div className="trendy-qty-controls">
                  <button
                    type="button"
                    className="trendy-qty-btn"
                    onClick={() => setPdpQty((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span className="trendy-qty-val">{pdpQty}</span>
                  <button
                    type="button"
                    className="trendy-qty-btn"
                    onClick={() => setPdpQty((q) => q + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="trendy-icon-btn"
                  style={{ border: '1px solid var(--tr-border)' }}
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  title="Wishlist"
                >
                  {wishlistIds.includes(selectedProduct.id) ? '❤️' : '🤍'}
                </button>

                <button
                  type="button"
                  className="trendy-icon-btn"
                  style={{ border: '1px solid var(--tr-border)' }}
                  onClick={() => toggleCompare(selectedProduct.id)}
                  title="Compare"
                >
                  ⚖️
                </button>
              </div>

              <div className="trendy-pdp-actions">
                <button
                  type="button"
                  className="trendy-btn-add-pdp"
                  onClick={() =>
                    addToCart(selectedProduct, pdpSelectedSize, pdpSelectedColor, pdpQty)
                  }
                >
                  Add to Cart • ${(selectedProduct.price * pdpQty).toFixed(2)}
                </button>
                <button
                  type="button"
                  className="trendy-btn-buy-pdp"
                  onClick={() => {
                    addToCart(selectedProduct, pdpSelectedSize, pdpSelectedColor, pdpQty)
                    setIsCartOpen(true)
                  }}
                >
                  Buy It Now
                </button>
              </div>

              {/* Accordions */}
              <div className="trendy-accordions">
                <div className="trendy-accordion-item">
                  <button
                    type="button"
                    className="trendy-accordion-header"
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'desc' ? '' : 'desc')
                    }
                  >
                    <span>Product Details & Specifications</span>
                    <span>{openAccordion === 'desc' ? '▲' : '▼'}</span>
                  </button>
                  {openAccordion === 'desc' && (
                    <div className="trendy-accordion-body">
                      <ul>
                        {selectedProduct.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="trendy-accordion-item">
                  <button
                    type="button"
                    className="trendy-accordion-header"
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'care' ? '' : 'care')
                    }
                  >
                    <span>Material & Fabric Care</span>
                    <span>{openAccordion === 'care' ? '▲' : '▼'}</span>
                  </button>
                  {openAccordion === 'care' && (
                    <div className="trendy-accordion-body">
                      <p>
                        <strong>Material:</strong> {selectedProduct.material}
                      </p>
                      <p>
                        <strong>Care:</strong> {selectedProduct.care}
                      </p>
                    </div>
                  )}
                </div>

                <div className="trendy-accordion-item">
                  <button
                    type="button"
                    className="trendy-accordion-header"
                    onClick={() =>
                      setOpenAccordion(openAccordion === 'ship' ? '' : 'ship')
                    }
                  >
                    <span>Shipping & Returns</span>
                    <span>{openAccordion === 'ship' ? '▲' : '▼'}</span>
                  </button>
                  {openAccordion === 'ship' && (
                    <div className="trendy-accordion-body">
                      <p>{selectedProduct.shipping}</p>
                      <p>
                        30-day effortless returns with prepaid courier labels provided.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div style={{ marginTop: '60px' }}>
            <h3 style={{ fontSize: '24px', fontWeight: 800, marginBottom: '24px' }}>
              You May Also Like
            </h3>
            <div className="trendy-product-grid">
              {TRENDY_PRODUCTS.filter((p) => p.id !== selectedProduct.id)
                .slice(0, 4)
                .map((product) => (
                  <div key={product.id} className="trendy-product-card">
                    <div
                      className="trendy-card-media"
                      onClick={() => navigateToPDP(product)}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="trendy-card-img"
                      />
                    </div>
                    <div className="trendy-card-body">
                      <span className="trendy-card-subtitle">{product.subtitle}</span>
                      <h4
                        className="trendy-card-title"
                        onClick={() => navigateToPDP(product)}
                      >
                        {product.name}
                      </h4>
                      <div className="trendy-card-prices">
                        <span className="trendy-card-price">
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
        <div className="trendy-compare-tray">
          <div className="trendy-compare-items">
            <span style={{ fontWeight: 700, fontSize: '13px' }}>
              Compare ({compareIds.length}/4):
            </span>
            {comparedProducts.map((p) => (
              <img
                key={p.id}
                src={p.image}
                alt={p.name}
                className="trendy-compare-thumb"
                title={p.name}
              />
            ))}
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button
              type="button"
              className="trendy-btn-primary"
              style={{ padding: '8px 18px', fontSize: '12px' }}
              onClick={() => setIsCompareModalOpen(true)}
            >
              Compare Now
            </button>
            <button
              type="button"
              className="trendy-btn-secondary"
              style={{
                padding: '8px 14px',
                fontSize: '12px',
                color: '#ffffff',
                borderColor: 'rgba(255,255,255,0.4)',
              }}
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
          className="trendy-drawer-overlay"
          onClick={() => setIsCompareModalOpen(false)}
        >
          <div
            className="trendy-modal-box"
            style={{ maxWidth: '840px' }}
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
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800 }}>
                Product Comparison
              </h3>
              <button
                type="button"
                className="trendy-icon-btn"
                onClick={() => setIsCompareModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <table className="trendy-compare-table">
              <tbody>
                <tr>
                  <th>Product</th>
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
                      <div style={{ fontWeight: 700, marginTop: '6px' }}>{p.name}</div>
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
                  <th>Category</th>
                  {comparedProducts.map((p) => (
                    <td key={p.id}>{p.category}</td>
                  ))}
                </tr>
                <tr>
                  <th>Sizes</th>
                  {comparedProducts.map((p) => (
                    <td key={p.id}>{p.sizes.join(', ')}</td>
                  ))}
                </tr>
                <tr>
                  <th>Material</th>
                  {comparedProducts.map((p) => (
                    <td key={p.id}>{p.material}</td>
                  ))}
                </tr>
                <tr>
                  <th>Action</th>
                  {comparedProducts.map((p) => (
                    <td key={p.id}>
                      <button
                        type="button"
                        className="trendy-btn-primary"
                        style={{ padding: '6px 12px', fontSize: '11px' }}
                        onClick={() => {
                          addToCart(
                            p,
                            p.sizes[0] || 'M',
                            p.colors[0]?.name || 'Standard'
                          )
                          setIsCompareModalOpen(false)
                        }}
                      >
                        Add to Cart
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
          className="trendy-drawer-overlay"
          onClick={() => setIsQuickViewOpen(false)}
        >
          <div
            className="trendy-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <span className="trendy-card-subtitle">
                {quickViewProduct.subtitle}
              </span>
              <button
                type="button"
                className="trendy-icon-btn"
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
                <h3 style={{ fontSize: '20px', fontWeight: 800, margin: '0 0 10px 0' }}>
                  {quickViewProduct.name}
                </h3>
                <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '14px' }}>
                  ${quickViewProduct.price.toFixed(2)}
                </div>
                <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.6 }}>
                  {quickViewProduct.description}
                </p>

                <div style={{ margin: '16px 0' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, marginBottom: '6px' }}>
                    Available Sizes:
                  </div>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {quickViewProduct.sizes.map((s) => (
                      <span key={s} className="trendy-size-chip selected">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
                  <button
                    type="button"
                    className="trendy-btn-primary"
                    style={{ flex: 1 }}
                    onClick={() => {
                      addToCart(
                        quickViewProduct,
                        quickViewProduct.sizes[0] || 'M',
                        quickViewProduct.colors[0]?.name || 'Standard'
                      )
                      setIsQuickViewOpen(false)
                    }}
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    className="trendy-icon-btn"
                    style={{
                      border: '1px solid var(--tr-border)',
                      width: '44px',
                      height: '44px',
                      borderRadius: 'var(--tr-radius)',
                      fontSize: '18px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                    title={wishlistIds.includes(quickViewProduct.id) ? 'Remove from Wishlist' : 'Save to Wishlist'}
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                  >
                    {wishlistIds.includes(quickViewProduct.id) ? '❤️' : '🤍'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SLIDE-OVER CART DRAWER */}
      {isCartOpen && (
        <div
          className="trendy-drawer-overlay"
          onClick={() => setIsCartOpen(false)}
        >
          <div
            className="trendy-cart-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="trendy-drawer-header">
              <h3 className="trendy-drawer-title">Shopping Cart</h3>
              <button
                type="button"
                className="trendy-icon-btn"
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Free Shipping Goal Meter */}
            <div className="trendy-free-shipping-goal">
              {cartSubtotal >= freeShippingThreshold ? (
                <span style={{ color: '#10b981', fontWeight: 700 }}>
                  🎉 Congratulations! You have unlocked Free Shipping!
                </span>
              ) : (
                <span>
                  Add{' '}
                  <strong>
                    ${(freeShippingThreshold - cartSubtotal).toFixed(2)}
                  </strong>{' '}
                  more to get <strong>Free Delivery</strong>!
                </span>
              )}
              <div className="trendy-progress-bar">
                <div
                  className="trendy-progress-fill"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items List */}
            <div className="trendy-cart-items-wrap">
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0' }}>
                  <p style={{ color: 'var(--tr-muted)' }}>Your cart is empty.</p>
                  <button
                    type="button"
                    className="trendy-btn-primary"
                    onClick={() => {
                      setIsCartOpen(false)
                      setViewMode('collection')
                    }}
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={`${item.product.id}-${item.size}-${idx}`} className="trendy-cart-item">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="trendy-cart-item-img"
                    />
                    <div className="trendy-cart-item-info">
                      <h4 className="trendy-cart-item-title">{item.product.name}</h4>
                      <div className="trendy-cart-item-meta">
                        Size: {item.size} • Color: {item.color}
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div className="trendy-qty-controls">
                          <button
                            type="button"
                            className="trendy-qty-btn"
                            onClick={() => updateCartQty(idx, -1)}
                          >
                            -
                          </button>
                          <span className="trendy-qty-val">{item.quantity}</span>
                          <button
                            type="button"
                            className="trendy-qty-btn"
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
              <div className="trendy-drawer-footer">
                <div className="trendy-subtotal-row">
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <button
                  type="button"
                  className="trendy-checkout-btn"
                  onClick={() => {
                    showToast('Proceeding to checkout with mock session...')
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

      {/* SLIDE-OVER WISHLIST DRAWER */}
      {isWishlistOpen && (
        <div
          className="trendy-drawer-overlay"
          onClick={() => setIsWishlistOpen(false)}
        >
          <div
            className="trendy-cart-drawer trendy-wishlist-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="trendy-drawer-header">
              <h3 className="trendy-drawer-title">
                Saved Wishlist ({wishlistIds.length})
              </h3>
              <button
                type="button"
                className="trendy-icon-btn"
                onClick={() => setIsWishlistOpen(false)}
                aria-label="Close Wishlist"
              >
                ✕
              </button>
            </div>

            <div
              style={{
                backgroundColor: 'var(--tr-light-bg)',
                padding: '12px 24px',
                borderBottom: '1px solid var(--tr-border)',
                fontSize: '13px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span>Saved Favorites</span>
              <strong style={{ color: 'var(--tr-accent)' }}>
                {wishlistIds.length} {wishlistIds.length === 1 ? 'item' : 'items'}
              </strong>
            </div>

            {/* Items List */}
            <div className="trendy-cart-items-wrap">
              {wishlistProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--tr-muted)' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🤍</div>
                  <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--tr-dark)', marginBottom: '8px' }}>
                    Your Wishlist is Empty
                  </h4>
                  <p style={{ fontSize: '13px', lineHeight: 1.5, marginBottom: '20px' }}>
                    Tap the heart icon on any product to save your favorite styles here.
                  </p>
                  <button
                    type="button"
                    className="trendy-btn-primary"
                    onClick={() => {
                      setIsWishlistOpen(false)
                      setViewMode('collection')
                    }}
                  >
                    Explore Products →
                  </button>
                </div>
              ) : (
                wishlistProducts.map((product) => (
                  <div key={product.id} className="trendy-cart-item">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="trendy-cart-item-img"
                      style={{ cursor: 'pointer' }}
                      onClick={() => {
                        navigateToPDP(product)
                        setIsWishlistOpen(false)
                      }}
                    />
                    <div className="trendy-cart-item-info">
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          gap: '8px',
                        }}
                      >
                        <h4
                          className="trendy-cart-item-title"
                          style={{ cursor: 'pointer', margin: 0 }}
                          onClick={() => {
                            navigateToPDP(product)
                            setIsWishlistOpen(false)
                          }}
                        >
                          {product.name}
                        </h4>
                        <button
                          type="button"
                          title="Remove from Wishlist"
                          onClick={() => toggleWishlist(product.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'var(--tr-muted)',
                            fontSize: '14px',
                            padding: '2px 4px',
                            lineHeight: 1,
                          }}
                        >
                          ✕
                        </button>
                      </div>

                      <div className="trendy-cart-item-meta" style={{ marginTop: '4px' }}>
                        {product.category} • {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </div>

                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginTop: '10px',
                        }}
                      >
                        <span
                          style={{
                            fontWeight: 800,
                            color: 'var(--tr-accent)',
                            fontSize: '15px',
                          }}
                        >
                          ${product.price.toFixed(2)}
                        </span>

                        <button
                          type="button"
                          className="trendy-btn-primary"
                          style={{
                            padding: '6px 14px',
                            fontSize: '12px',
                            fontWeight: 700,
                            borderRadius: 'var(--tr-radius)',
                          }}
                          onClick={() => {
                            addToCart(
                              product,
                              product.sizes[0] || 'M',
                              product.colors[0]?.name || 'Standard',
                              1
                            )
                            setIsWishlistOpen(false)
                          }}
                        >
                          + Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Wishlist Drawer Footer */}
            {wishlistProducts.length > 0 && (
              <div
                className="trendy-drawer-footer"
                style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
              >
                <button
                  type="button"
                  className="trendy-checkout-btn"
                  style={{ width: '100%' }}
                  onClick={() => {
                    wishlistProducts.forEach((p) => {
                      addToCart(
                        p,
                        p.sizes[0] || 'M',
                        p.colors[0]?.name || 'Standard',
                        1
                      )
                    })
                    setIsWishlistOpen(false)
                    setIsCartOpen(true)
                  }}
                >
                  Move All to Cart →
                </button>
                <button
                  type="button"
                  style={{
                    width: '100%',
                    padding: '8px',
                    background: 'none',
                    border: '1px solid var(--tr-border)',
                    borderRadius: 'var(--tr-radius)',
                    color: 'var(--tr-muted)',
                    fontSize: '13px',
                    fontWeight: 600,
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

      {/* TOAST NOTIFICATION */}
      {toastMessage && <div className="trendy-toast">{toastMessage}</div>}

      {/* =====================================================================
          4. FOOTER (FAITHFUL TO WORKDO MULTI-COLUMN DESIGN)
          ===================================================================== */}
      <footer className="trendy-footer">
        <div className="trendy-container">
          <div className="trendy-footer-grid">
            {/* Col 1: Brand & Bio */}
            <div className="trendy-footer-logo-col">
              <span className="trendy-brand-title" style={{ color: '#ffffff' }}>
                Trendy<span style={{ color: 'var(--tr-accent)' }}>.</span>
              </span>
              <p>
                Trendy WorkDo provides contemporary women's fashion combining
                architectural silhouettes, comfort stretch pleating, and responsible
                craftsmanship.
              </p>
              <div className="trendy-footer-socials">
                <span className="trendy-footer-social-btn" title="Instagram">📸</span>
                <span className="trendy-footer-social-btn" title="Facebook">📘</span>
                <span className="trendy-footer-social-btn" title="Pinterest">📌</span>
                <span className="trendy-footer-social-btn" title="YouTube">📺</span>
              </div>
            </div>

            {/* Col 2: Navigation */}
            <div>
              <h4 className="trendy-footer-title">Navigation</h4>
              <ul className="trendy-footer-links">
                <li>
                  <span className="trendy-footer-link" onClick={() => setViewMode('collection')}>
                    Search
                  </span>
                </li>
                <li>
                  <span className="trendy-footer-link" onClick={() => setViewMode('collection')}>
                    All collections
                  </span>
                </li>
                <li>
                  <span className="trendy-footer-link" onClick={() => setViewMode('collection')}>
                    All products
                  </span>
                </li>
                <li>
                  <span className="trendy-footer-link" onClick={() => setIsCartOpen(true)}>
                    My Cart
                  </span>
                </li>
                <li>
                  <span className="trendy-footer-link" onClick={() => setIsWishlistOpen(true)}>
                    My Wishlist ({wishlistIds.length})
                  </span>
                </li>
              </ul>
            </div>

            {/* Col 3: Extra */}
            <div>
              <h4 className="trendy-footer-title">Extra</h4>
              <ul className="trendy-footer-links">
                <li>
                  <span className="trendy-footer-link" onClick={() => showToast('About Us')}>
                    About Us
                  </span>
                </li>
                <li>
                  <span className="trendy-footer-link" onClick={() => showToast('Article Pages')}>
                    Article Pages
                  </span>
                </li>
                <li>
                  <span className="trendy-footer-link" onClick={() => showToast(`Wishlist (${wishlistIds.length})`)}>
                    Wishlist
                  </span>
                </li>
                <li>
                  <span className="trendy-footer-link" onClick={() => showToast('Terms & Conditions')}>
                    Terms & Conditions
                  </span>
                </li>
              </ul>
            </div>

            {/* Col 4: Store Info & Newsletter */}
            <div>
              <h4 className="trendy-footer-title">Store Hours</h4>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#9ca3af', margin: '0 0 14px 0' }}>
                Monday - Friday: 8:00 AM - 9:00 PM<br />
                Saturday - Sunday: 9:00 AM - 6:00 PM
              </p>
              <div style={{ fontSize: '13px', color: '#9ca3af' }}>
                📍 742 Evergreen Terrace, Fashion District<br />
                📞 +1 (800) 555-WORKDO
              </div>
            </div>
          </div>

          <div className="trendy-footer-bottom">
            <span>© {new Date().getFullYear()} Trendy Fashion by WorkDo. Powered by Willovate One.</span>
            <div className="trendy-payment-badges">
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
