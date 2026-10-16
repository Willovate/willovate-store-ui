import React, { useState, useMemo } from 'react'
import type {
  DiamondWorkDoProduct,
  DiamondWorkDoCartItem,
  DiamondWorkDoFilterState,
  DiamondWorkDoStorefrontProps,
} from './types'
import {
  DIAMOND_WORKDO_PRODUCTS,
  DIAMOND_WORKDO_TESTIMONIALS,
  DIAMOND_WORKDO_BLOG_POSTS,
} from './data/diamondWorkDoData'
import './styles/diamondWorkDo.css'

export const DiamondWorkDoStorefront: React.FC<DiamondWorkDoStorefrontProps> = ({
  initialView = 'home',
  templateData: _templateData,
  device = 'desktop',
  deviceView,
  onClose: _onClose,
  onBack: _onBack,
  onUseTemplate: _onUseTemplate,
}) => {
  const effectiveDevice = deviceView || device || 'desktop'
  const isMobile = effectiveDevice === 'mobile'

  const [viewMode, setViewMode] = useState<'home' | 'catalog' | 'pdp'>(initialView)
  const [selectedProduct, setSelectedProduct] = useState<DiamondWorkDoProduct>(DIAMOND_WORKDO_PRODUCTS[0])

  // Drawers and Modals
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState<boolean>(false)
  const [quickViewProduct, setQuickViewProduct] = useState<DiamondWorkDoProduct>(DIAMOND_WORKDO_PRODUCTS[0])
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [isRingSizerOpen, setIsRingSizerOpen] = useState<boolean>(false)

  // Cart & Interactions
  const [cartItems, setCartItems] = useState<DiamondWorkDoCartItem[]>([
    {
      product: DIAMOND_WORKDO_PRODUCTS[0],
      selectedMetal: '18K Yellow Gold',
      selectedRingSize: 'US 6.5',
      customEngraving: 'Forever Yours',
      quantity: 1,
    },
  ])

  // Catalog Filters
  const [filters, setFilters] = useState<DiamondWorkDoFilterState>({
    category: 'All',
    metal: 'All',
    caratRange: 'All',
    priceRange: [0, 10000],
    inStockOnly: false,
    sortBy: 'featured',
  })

  // PDP State
  const [pdpSelectedMetal, setPdpSelectedMetal] = useState<string>(DIAMOND_WORKDO_PRODUCTS[0].metals[0].name)
  const [pdpSelectedRingSize, setPdpSelectedRingSize] = useState<string>('US 6.5')
  const [pdpSelectedImage, setPdpSelectedImage] = useState<string>(DIAMOND_WORKDO_PRODUCTS[0].images[0])
  const [pdpQty, setPdpQty] = useState<number>(1)

  // Toast feedback
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 2500)
  }

  // Cart operations
  const addToCart = (
    product: DiamondWorkDoProduct,
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
    showToast(`Added "${product.name}" to Cart`)
  }

  const updateCartQty = (index: number, delta: number) => {
    setCartItems((prev) => {
      const next = [...prev]
      next[index].quantity += delta
      if (next[index].quantity <= 0) {
        return next.filter((_, i) => i !== index)
      }
      return next
    })
  }

  const openPdp = (product: DiamondWorkDoProduct) => {
    setSelectedProduct(product)
    setPdpSelectedMetal(product.metals[0].name)
    setPdpSelectedImage(product.images[0])
    setPdpQty(1)
    setViewMode('pdp')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openQuickView = (product: DiamondWorkDoProduct) => {
    setQuickViewProduct(product)
    setIsQuickViewOpen(true)
  }

  // Filtered Products for Catalog
  const filteredProducts = useMemo(() => {
    return DIAMOND_WORKDO_PRODUCTS.filter((p) => {
      if (filters.category !== 'All' && p.category !== filters.category) return false
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        const matches =
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        if (!matches) return false
      }
      return true
    })
  }, [filters, searchQuery])

  // Products for specific homepage sections
  const prodPearlNecklace = DIAMOND_WORKDO_PRODUCTS.find((p) => p.id === 'dwd-pearl-necklace') || DIAMOND_WORKDO_PRODUCTS[0]
  const prodRopeChain = DIAMOND_WORKDO_PRODUCTS.find((p) => p.id === 'dwd-rope-chain') || DIAMOND_WORKDO_PRODUCTS[1]
  const prodRubyRing = DIAMOND_WORKDO_PRODUCTS.find((p) => p.id === 'dwd-ruby-ring') || DIAMOND_WORKDO_PRODUCTS[2]
  const prodHeartRing = DIAMOND_WORKDO_PRODUCTS.find((p) => p.id === 'dwd-heart-ring') || DIAMOND_WORKDO_PRODUCTS[3]
  const prodFloralRing = DIAMOND_WORKDO_PRODUCTS.find((p) => p.id === 'dwd-floral-ring') || DIAMOND_WORKDO_PRODUCTS[4]
  const prodCocktailRing = DIAMOND_WORKDO_PRODUCTS.find((p) => p.id === 'dwd-cocktail-ring') || DIAMOND_WORKDO_PRODUCTS[5]
  const prodHuggieEarrings = DIAMOND_WORKDO_PRODUCTS.find((p) => p.id === 'dwd-huggie-earrings') || DIAMOND_WORKDO_PRODUCTS[6]
  const prodFloralStuds = DIAMOND_WORKDO_PRODUCTS.find((p) => p.id === 'dwd-floral-studs') || DIAMOND_WORKDO_PRODUCTS[7]
  const prodFiligreeBangle = DIAMOND_WORKDO_PRODUCTS.find((p) => p.id === 'dwd-filigree-bangle') || DIAMOND_WORKDO_PRODUCTS[8]
  const prodCharmBracelet = DIAMOND_WORKDO_PRODUCTS.find((p) => p.id === 'dwd-charm-bracelet') || DIAMOND_WORKDO_PRODUCTS[9]
  const prodTennisBracelet = DIAMOND_WORKDO_PRODUCTS.find((p) => p.id === 'dwd-tennis-bracelet') || DIAMOND_WORKDO_PRODUCTS[10]
  const prodEmeraldEarrings = DIAMOND_WORKDO_PRODUCTS.find((p) => p.id === 'dwd-emerald-earrings') || DIAMOND_WORKDO_PRODUCTS[11]

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0)
  const cartSubtotal = cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0)

  return (
    <div className={`diamond-workdo-root ${isMobile ? 'diamond-mobile device-mobile is-mobile' : `diamond-${effectiveDevice}`}`}>

      {/* TOAST POPUP */}
      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#16332c',
            color: '#FFFFFF',
            padding: '12px 28px',
            borderRadius: '999px',
            fontSize: 13,
            fontWeight: 600,
            zIndex: 999999,
            boxShadow: '0 10px 30px rgba(0,0,0,0.25)',
          }}
        >
          {toastMsg}
        </div>
      )}

      {/* TOP ANNOUNCEMENT BAR */}
      <div className="dwd-announcement-bar">
        <div className="dwd-container dwd-announcement-inner">
          <div className="dwd-announcement-welcome">
            Welcome to Diamond Store online store !
          </div>
          <div className="dwd-announcement-controls">
            <span className="dwd-special-offer">Special Offer ! 20% Off</span>
            <span className="dwd-announcement-sep">|</span>
            <button type="button" className="dwd-currency-btn" onClick={() => showToast('Currency: USD ($)')}>
              <span>🇺🇸</span> USD ∨
            </button>
            <span className="dwd-announcement-sep">|</span>
            <button type="button" className="dwd-currency-btn" onClick={() => showToast('Currency: EUR (€)')}>
              <span>🇪🇺</span> EUR ∨
            </button>
          </div>
        </div>
      </div>

      {/* MAIN HEADER */}
      <header className="dwd-header">
        <div className="dwd-container">
          <div className="dwd-header-inner">
            {/* Desktop Navigation (Left) */}
            <nav className="dwd-header-nav">
              <span
                className={`dwd-nav-link ${viewMode === 'home' ? 'active' : ''}`}
                onClick={() => setViewMode('home')}
              >
                Home ∨
              </span>
              <span
                className={`dwd-nav-link ${viewMode === 'catalog' ? 'active' : ''}`}
                onClick={() => {
                  setFilters((f) => ({ ...f, category: 'All' }))
                  setViewMode('catalog')
                }}
              >
                All Products ∨
              </span>
              <span
                className="dwd-nav-link"
                onClick={() => {
                  const blogEl = document.getElementById('dwd-blog-section')
                  if (blogEl) {
                    blogEl.scrollIntoView({ behavior: 'smooth' })
                  } else {
                    setViewMode('home')
                    setTimeout(() => {
                      document.getElementById('dwd-blog-section')?.scrollIntoView({ behavior: 'smooth' })
                    }, 100)
                  }
                }}
              >
                Blog
              </span>
              <span
                className="dwd-nav-link"
                onClick={() => setIsRingSizerOpen(true)}
              >
                Pages ∨
              </span>
              <span
                className="dwd-nav-link"
                onClick={() => showToast('Contact Concierge: support@diamond-store.com')}
              >
                Contact us
              </span>
            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="dwd-mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              ☰
            </button>

            {/* Brand Logo (Center) */}
            <div
              className="dwd-brand-logo"
              onClick={() => {
                setViewMode('home')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <span className="dwd-brand-wordmark">diamond</span>
              <span className="dwd-brand-sparkle-dot">✦</span>
            </div>

            {/* Header Actions (Right) */}
            <div className="dwd-header-actions">
              <button
                type="button"
                className="dwd-action-icon-btn"
                title="Search Jewelry"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>

              <button
                type="button"
                className="dwd-action-icon-btn"
                title="Account"
                onClick={() => showToast('Diamond Store Client Profile')}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>

              <button
                type="button"
                className="dwd-cart-pill-btn"
                title="Shopping Cart"
                onClick={() => setIsCartOpen(true)}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span>Cart ({totalCartCount})</span>
              </button>
            </div>
          </div>
        </div>

        {/* SEARCH BAR DROPDOWN */}
        {isSearchOpen && (
          <div style={{ background: '#faede3', borderTop: '1px solid rgba(22,51,44,0.08)', padding: '12px 0' }}>
            <div className="dwd-container" style={{ display: 'flex', gap: 10 }}>
              <input
                type="text"
                placeholder="Search certified diamonds, rings, bracelets, necklaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: 999,
                  border: '1px solid rgba(22,51,44,0.2)',
                  fontFamily: 'Jost, sans-serif',
                  fontSize: 13.5,
                  outline: 'none',
                }}
              />
              <button
                type="button"
                className="dwd-pill-btn dwd-pill-btn-forest"
                style={{ padding: '8px 22px' }}
                onClick={() => {
                  setViewMode('catalog')
                  setIsSearchOpen(false)
                }}
              >
                Search
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MOBILE MENU MODAL */}
      {isMobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 99999,
            display: 'flex',
          }}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div
            style={{
              width: '80%',
              maxWidth: 320,
              background: '#faede3',
              height: '100%',
              padding: 24,
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <span className="dwd-brand-wordmark" style={{ fontSize: 26 }}>diamond</span>
              <button
                type="button"
                style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#16332c' }}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ✕
              </button>
            </div>
            {['Home', 'All Products', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches'].map((item) => (
              <button
                key={item}
                type="button"
                style={{
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#16332c',
                  padding: '8px 0',
                  cursor: 'pointer',
                  borderBottom: '1px solid rgba(22,51,44,0.08)',
                }}
                onClick={() => {
                  if (item === 'Home') {
                    setViewMode('home')
                  } else if (item === 'All Products') {
                    setFilters((f) => ({ ...f, category: 'All' }))
                    setViewMode('catalog')
                  } else {
                    setFilters((f) => ({ ...f, category: item as any }))
                    setViewMode('catalog')
                  }
                  setIsMobileMenuOpen(false)
                }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW MODE: HOME (100% FAITHFUL SCREENSHOT REPLICA)
          ========================================================================= */}
      {viewMode === 'home' && (
        <>
          {/* SECTION 1: HERO - GOLD JEWELLERY & DIAMONDS */}
          <section className="dwd-hero-section">
            <div className="dwd-container">
              <div className="dwd-hero-grid">
                {/* Left Column */}
                <div className="dwd-hero-left">
                  <h1 className="dwd-hero-title">
                    Gold jewellery<br />& diamonds
                  </h1>
                  <p className="dwd-hero-desc">
                    We are a team of certified master gemologists, with an extensive background of over 100 years. We take pride in the custom jewelry work that we produce in our own onsite shop. Our goal is to make every customer feel confident and comfortable in their decision to purchase or create custom jewelry.
                  </p>
                  <div className="dwd-hero-actions">
                    <button
                      type="button"
                      className="dwd-pill-btn dwd-pill-btn-forest"
                      onClick={() => {
                        setFilters((f) => ({ ...f, category: 'All' }))
                        setViewMode('catalog')
                      }}
                    >
                      Check more products <span className="dwd-arrow">➔</span>
                    </button>
                  </div>
                  <div className="dwd-hero-pagination-bar">
                    <span className="dwd-pagination-num">01 / 02</span>
                    <div className="dwd-pagination-track">
                      <div className="dwd-pagination-indicator" />
                    </div>
                  </div>
                </div>

                {/* Center Column: Floating Eternity Band with badge */}
                <div className="dwd-hero-center">
                  <div className="dwd-hero-floating-ring-wrap">
                    <div className="dwd-circle-badge dwd-circle-badge-top">
                      <span>Trending</span>
                      <span>Ring</span>
                      <span className="dwd-badge-year">2024</span>
                      <span className="dwd-badge-sub">New</span>
                    </div>
                    <img
                      src="https://jewels-workdo.myshopify.com/cdn/shop/files/chocolate2.png?v=1698816835"
                      alt="Trending Ring 2024"
                      className="dwd-hero-ring-mid"
                    />
                  </div>
                </div>

                {/* Right Column: Macro Gold Diamond Ring with badge */}
                <div className="dwd-hero-right">
                  <div className="dwd-hero-macro-ring-wrap">
                    <div className="dwd-circle-badge dwd-circle-badge-macro">
                      <span>Ring</span>
                      <span>Collection</span>
                      <span className="dwd-badge-year">2024</span>
                      <span className="dwd-badge-sub">New</span>
                    </div>
                    <img
                      src="https://jewels-workdo.myshopify.com/cdn/shop/files/chocolate2.png?v=1698816835"
                      alt="Ring Collection 2024"
                      className="dwd-hero-ring-large"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: THREE CATEGORY CARDS */}
          <section className="dwd-cat-cards-section">
            <div className="dwd-container">
              <div className="dwd-cat-three-grid">
                {/* Card 1: Featured */}
                <div
                  className="dwd-cat-promo-card"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80)',
                  }}
                  onClick={() => {
                    setFilters((f) => ({ ...f, category: 'All' }))
                    setViewMode('catalog')
                  }}
                >
                  <div className="dwd-cat-promo-overlay" />
                  <div className="dwd-cat-promo-content">
                    <span className="dwd-cat-promo-eyebrow">Featured</span>
                    <h3 className="dwd-cat-promo-title">Featured</h3>
                    <button type="button" className="dwd-pill-btn dwd-pill-btn-forest">
                      View more products <span className="dwd-arrow">➔</span>
                    </button>
                  </div>
                </div>

                {/* Card 2: Bracelet */}
                <div
                  className="dwd-cat-promo-card"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1611591475870-87a414605ea2?w=900&auto=format&fit=crop&q=80)',
                  }}
                  onClick={() => {
                    setFilters((f) => ({ ...f, category: 'Bracelets' }))
                    setViewMode('catalog')
                  }}
                >
                  <div className="dwd-cat-promo-overlay" />
                  <div className="dwd-cat-promo-content">
                    <span className="dwd-cat-promo-eyebrow">Featured</span>
                    <h3 className="dwd-cat-promo-title">Bracelet</h3>
                    <button type="button" className="dwd-pill-btn dwd-pill-btn-forest">
                      View more products <span className="dwd-arrow">➔</span>
                    </button>
                  </div>
                </div>

                {/* Card 3: Earrings */}
                <div
                  className="dwd-cat-promo-card"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&auto=format&fit=crop&q=80)',
                  }}
                  onClick={() => {
                    setFilters((f) => ({ ...f, category: 'Earrings' }))
                    setViewMode('catalog')
                  }}
                >
                  <div className="dwd-cat-promo-overlay" />
                  <div className="dwd-cat-promo-content">
                    <span className="dwd-cat-promo-eyebrow">Featured</span>
                    <h3 className="dwd-cat-promo-title">Earrings</h3>
                    <button type="button" className="dwd-pill-btn dwd-pill-btn-forest">
                      View more products <span className="dwd-arrow">➔</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: TRUST PILLARS BAR */}
          <section className="dwd-trust-pillars-section">
            <div className="dwd-container">
              <div className="dwd-trust-pillars-row">
                <div className="dwd-trust-pillar-item">
                  <div className="dwd-trust-icon-box">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16332c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="6"></circle>
                      <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11"></path>
                    </svg>
                  </div>
                  <div>
                    <h4 className="dwd-trust-title">100% Secure delivery</h4>
                    <p className="dwd-trust-desc">Guaranteed on all orders</p>
                  </div>
                </div>

                <div className="dwd-trust-pillar-item">
                  <div className="dwd-trust-icon-box">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16332c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="dwd-trust-title">60 Days return guarantee</h4>
                    <p className="dwd-trust-desc">No question asked</p>
                  </div>
                </div>

                <div className="dwd-trust-pillar-item">
                  <div className="dwd-trust-icon-box">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#16332c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="3" width="15" height="13"></rect>
                      <polygon points="16 8 20 8 23 11 23 16 16 16 8"></polygon>
                      <circle cx="5.5" cy="18.5" r="2.5"></circle>
                      <circle cx="18.5" cy="18.5" r="2.5"></circle>
                    </svg>
                  </div>
                  <div>
                    <h4 className="dwd-trust-title">Free shipping</h4>
                    <p className="dwd-trust-desc">Orders over $150 or more</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 4: DIAMONDS & ENGAGEMENT RING */}
          <section className="dwd-engagement-section">
            <div className="dwd-container">
              <div className="dwd-engagement-split">
                {/* Left Description Column */}
                <div className="dwd-engagement-left">
                  <h2 className="dwd-engagement-heading">
                    Diamonds & Engagement<br />Ring
                  </h2>
                  <p className="dwd-engagement-text">
                    Combine the charm of fine craftsmanship with our exclusive fine jewelry pieces. Find bespoke handcrafted engagement rings and heirloom jewels that symbolize timeless romance and craftsmanship.
                  </p>
                  <button
                    type="button"
                    className="dwd-pill-btn dwd-pill-btn-forest"
                    onClick={() => {
                      setFilters((f) => ({ ...f, category: 'Necklaces' }))
                      setViewMode('catalog')
                    }}
                  >
                    Check more products <span className="dwd-arrow">➔</span>
                  </button>
                </div>

                {/* Right 2 Product Cards */}
                <div className="dwd-engagement-cards">
                  {[prodPearlNecklace, prodRopeChain].map((prod) => (
                    <article key={prod.id} className="dwd-product-card">
                      <div className="dwd-card-top">
                        {prod.isNewDrop && <span className="dwd-card-badge">NEW</span>}
                        <span className="dwd-card-cat-label">{prod.category === 'Necklaces' ? 'Necklace' : prod.category}</span>
                        <button
                          type="button"
                          className="dwd-card-quick-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            openQuickView(prod)
                          }}
                          title="Quick View"
                          aria-label="Quick View"
                        >
                          👁️
                        </button>
                      </div>
                      <h3 className="dwd-card-title" onClick={() => openPdp(prod)}>
                        {prod.name}
                      </h3>
                      <div className="dwd-card-img-wrap" onClick={() => openPdp(prod)}>
                        <img
                          src={prod.images[0]}
                          alt={prod.name}
                          className="dwd-card-img"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
                          }}
                        />
                      </div>
                      <div className="dwd-card-pricing">
                        <span className="dwd-price">${prod.price.toLocaleString()}.00</span>
                        {prod.compareAtPrice > prod.price && (
                          <span className="dwd-compare-price">${prod.compareAtPrice.toLocaleString()}.00</span>
                        )}
                      </div>
                      <div className="dwd-stars">★★★★★</div>
                      <button
                        type="button"
                        className="dwd-card-cart-btn"
                        onClick={() => addToCart(prod, prod.metals[0].name, 'US 6.5', undefined, 1)}
                      >
                        Add to Cart <span className="dwd-arrow">➔</span>
                      </button>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: FIND THE PERFECT DIAMOND FOR YOU */}
          <section className="dwd-peach-section">
            <div className="dwd-container">
              <div className="dwd-section-bar-header">
                <h2 className="dwd-serif-heading">Find the perfect diamond for you</h2>
                <button
                  type="button"
                  className="dwd-pill-btn dwd-pill-btn-forest"
                  onClick={() => {
                    setFilters((f) => ({ ...f, category: 'Rings' }))
                    setViewMode('catalog')
                  }}
                >
                  Check more products <span className="dwd-arrow">➔</span>
                </button>
              </div>

              <div className="dwd-four-products-grid">
                {[prodRubyRing, prodHeartRing, prodFloralRing, prodCocktailRing].map((prod) => (
                  <article key={prod.id} className="dwd-product-card">
                    <div className="dwd-card-top">
                      <span className="dwd-card-cat-label">{prod.category}</span>
                      <button
                        type="button"
                        className="dwd-card-quick-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          openQuickView(prod)
                        }}
                        title="Quick View"
                        aria-label="Quick View"
                      >
                        👁️
                      </button>
                    </div>
                    <h3 className="dwd-card-title" onClick={() => openPdp(prod)}>
                      {prod.name}
                    </h3>
                    <div className="dwd-card-img-wrap" onClick={() => openPdp(prod)}>
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="dwd-card-img"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
                        }}
                      />
                    </div>
                    <div className="dwd-card-pricing">
                      <span className="dwd-price">${prod.price.toLocaleString()}.00</span>
                      {prod.compareAtPrice > prod.price && (
                        <span className="dwd-compare-price">${prod.compareAtPrice.toLocaleString()}.00</span>
                      )}
                    </div>
                    <div className="dwd-stars">★★★★★</div>
                    <button
                      type="button"
                      className="dwd-card-cart-btn"
                      onClick={() => addToCart(prod, prod.metals[0].name, 'US 6.5', undefined, 1)}
                    >
                      Add to Cart <span className="dwd-arrow">➔</span>
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 6: GET THE BEST DIAMONDS FOR YOUR BUSINESS */}
          <section className="dwd-peach-section" style={{ paddingTop: 20 }}>
            <div className="dwd-container">
              <div className="dwd-business-split">
                <div className="dwd-business-left">
                  <h2 className="dwd-serif-heading dwd-business-title">
                    Get the best diamonds for<br />your business
                  </h2>
                  <p className="dwd-business-desc">
                    We are an experienced team in the diamond cutting and trading industry, providing high quality cut diamonds and excellent customer service.
                  </p>
                  <button
                    type="button"
                    className="dwd-pill-btn dwd-pill-btn-forest"
                    onClick={() => {
                      setFilters((f) => ({ ...f, category: 'All' }))
                      setViewMode('catalog')
                    }}
                  >
                    Check more products <span className="dwd-arrow">➔</span>
                  </button>
                </div>

                <div className="dwd-business-photos">
                  <div className="dwd-business-photo-box">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&auto=format&fit=crop&q=80"
                      alt="Business Collection Atelier"
                      className="dwd-business-photo"
                    />
                  </div>
                  <div className="dwd-business-photo-box">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                      alt="Bespoke High Jewelry"
                      className="dwd-business-photo"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 7: DIAMONDS ARE FOREVER */}
          <section className="dwd-forever-section">
            <div className="dwd-container">
              <div className="dwd-section-bar-header">
                <h2 className="dwd-serif-heading">Diamonds are forever</h2>
                <button
                  type="button"
                  className="dwd-pill-btn dwd-pill-btn-forest"
                  onClick={() => {
                    setFilters((f) => ({ ...f, category: 'Earrings' }))
                    setViewMode('catalog')
                  }}
                >
                  Check more products <span className="dwd-arrow">➔</span>
                </button>
              </div>

              <div className="dwd-split-wide-grid">
                {[prodHuggieEarrings, prodFloralStuds].map((prod) => (
                  <article key={prod.id} className="dwd-split-wide-card">
                    <div className="dwd-split-card-media" onClick={() => openPdp(prod)}>
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="dwd-split-card-img"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
                        }}
                      />
                    </div>
                    <div className="dwd-split-card-info">
                      <span className="dwd-card-cat-label">{prod.category}</span>
                      <h3 className="dwd-split-card-title" onClick={() => openPdp(prod)}>
                        {prod.name}
                      </h3>
                      <div className="dwd-card-pricing">
                        <span className="dwd-price">${prod.price.toLocaleString()}.00</span>
                      </div>
                      <div className="dwd-stars">★★★★★</div>
                      <button
                        type="button"
                        className="dwd-card-cart-btn"
                        onClick={() => addToCart(prod, prod.metals[0].name, 'US 6.5', undefined, 1)}
                      >
                        Add to Cart <span className="dwd-arrow">➔</span>
                      </button>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 8: DISCOVER THE WORLD OF JEWELLERY & DIAMONDS */}
          <section className="dwd-peach-section">
            <div className="dwd-container">
              <div className="dwd-section-bar-header">
                <h2 className="dwd-serif-heading">Discover the world of jewellery & diamonds</h2>
                <button
                  type="button"
                  className="dwd-pill-btn dwd-pill-btn-forest"
                  onClick={() => {
                    setFilters((f) => ({ ...f, category: 'Bracelets' }))
                    setViewMode('catalog')
                  }}
                >
                  Check more products <span className="dwd-arrow">➔</span>
                </button>
              </div>

              <div className="dwd-four-products-grid">
                {[prodFiligreeBangle, prodCharmBracelet, prodTennisBracelet, prodEmeraldEarrings].map((prod) => (
                  <article key={prod.id} className="dwd-product-card">
                    <div className="dwd-card-top">
                      <span className="dwd-card-cat-label">{prod.category}</span>
                      <button
                        type="button"
                        className="dwd-card-quick-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          openQuickView(prod)
                        }}
                        title="Quick View"
                        aria-label="Quick View"
                      >
                        👁️
                      </button>
                    </div>
                    <h3 className="dwd-card-title" onClick={() => openPdp(prod)}>
                      {prod.name}
                    </h3>
                    <div className="dwd-card-img-wrap" onClick={() => openPdp(prod)}>
                      <img src={prod.images[0]} alt={prod.name} className="dwd-card-img" />
                    </div>
                    <div className="dwd-card-pricing">
                      <span className="dwd-price">${prod.price.toLocaleString()}.00</span>
                      {prod.compareAtPrice > prod.price && (
                        <span className="dwd-compare-price">${prod.compareAtPrice.toLocaleString()}.00</span>
                      )}
                    </div>
                    <div className="dwd-stars">★★★★★</div>
                    <button
                      type="button"
                      className="dwd-card-cart-btn"
                      onClick={() => addToCart(prod, prod.metals[0].name, 'US 6.5', undefined, 1)}
                    >
                      Add to Cart <span className="dwd-arrow">➔</span>
                    </button>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 9: LUXURY JEWELLERY ONLINE BUY */}
          <section className="dwd-luxury-dark-section">
            <div className="dwd-container">
              <div className="dwd-luxury-dark-grid">
                <div className="dwd-luxury-dark-left">
                  <h2 className="dwd-luxury-dark-title">
                    Luxury Jewellery<br />Online Buy
                  </h2>
                  <p className="dwd-luxury-dark-desc">
                    All the diamond products we produce and export are tested and certified by independent international labs to assure our clients of their authentic quality and high value.
                  </p>
                  <button
                    type="button"
                    className="dwd-pill-btn dwd-pill-btn-cream"
                    onClick={() => {
                      setFilters((f) => ({ ...f, category: 'All' }))
                      setViewMode('catalog')
                    }}
                  >
                    Check more products <span className="dwd-arrow">➔</span>
                  </button>
                </div>

                <div className="dwd-luxury-dark-right">
                  <div className="dwd-luxury-ring-stage">
                    <img
                      src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80"
                      alt="Platinum Solitaire"
                      className="dwd-luxury-solitaire-main"
                    />
                    <div className="dwd-circle-badge dwd-circle-badge-cream">
                      <span>Trending</span>
                      <span>Ring</span>
                      <span className="dwd-badge-year">2024</span>
                      <span className="dwd-badge-sub">New</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 10: PARTNERS */}
          <section className="dwd-partners-section">
            <div className="dwd-container">
              <h3 className="dwd-partners-title">Partners</h3>
              <div className="dwd-partners-row">
                {['Jewellery', 'Jewellery', 'Jewellery', 'Jewellery', 'Jewellery', 'Jewellery'].map((brand, idx) => (
                  <span key={idx} className="dwd-partner-wordmark">
                    {brand}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 11: FLOATING LARGE CURVED ETERNITY BAND BANNER */}
          <section className="dwd-peach-section dwd-eternity-banner-section">
            <div className="dwd-container dwd-eternity-banner-container">
              <div className="dwd-eternity-banner-wrap">
                <img
                  src="https://jewels-workdo.myshopify.com/cdn/shop/files/chocolate2.png?v=1698816835"
                  alt="High Jewelry Diamond Eternity Band"
                  className="dwd-eternity-banner-img"
                />
              </div>
            </div>
          </section>

          {/* SECTION 12: SILVER JEWELLERY & DIAMONDS */}
          <section className="dwd-peach-section">
            <div className="dwd-container">
              <div className="dwd-silver-grid">
                <div className="dwd-silver-left">
                  <h2 className="dwd-serif-heading dwd-silver-title">
                    Silver jewellery &<br />diamonds
                  </h2>
                  <p className="dwd-silver-desc">
                    Choose the diamond of your dream online with our interactive Ring Builder. Start with a Ring Setting or Diamond to create a customized and truly unique piece.
                  </p>
                  <button
                    type="button"
                    className="dwd-pill-btn dwd-pill-btn-forest"
                    onClick={() => {
                      setFilters((f) => ({ ...f, category: 'All' }))
                      setViewMode('catalog')
                    }}
                  >
                    Check more products <span className="dwd-arrow">➔</span>
                  </button>
                </div>

                <div className="dwd-silver-cards">
                  <div
                    className="dwd-silver-card"
                    style={{
                      backgroundImage: 'url(https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&auto=format&fit=crop&q=80)',
                    }}
                    onClick={() => {
                      setFilters((f) => ({ ...f, category: 'Necklaces' }))
                      setViewMode('catalog')
                    }}
                  >
                    <div className="dwd-silver-card-overlay" />
                    <div className="dwd-silver-card-content">
                      <span className="dwd-cat-promo-eyebrow">Featured</span>
                      <h3 className="dwd-cat-promo-title">Necklace</h3>
                      <button type="button" className="dwd-pill-btn dwd-pill-btn-forest">
                        View more products <span className="dwd-arrow">➔</span>
                      </button>
                    </div>
                  </div>

                  <div
                    className="dwd-silver-card"
                    style={{
                      backgroundImage: 'url(https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80)',
                    }}
                    onClick={() => {
                      setFilters((f) => ({ ...f, category: 'Rings' }))
                      setViewMode('catalog')
                    }}
                  >
                    <div className="dwd-silver-card-overlay" />
                    <div className="dwd-silver-card-content">
                      <span className="dwd-cat-promo-eyebrow">Featured</span>
                      <h3 className="dwd-cat-promo-title">Rings</h3>
                      <button type="button" className="dwd-pill-btn dwd-pill-btn-forest">
                        View more products <span className="dwd-arrow">➔</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 13: TESTIMONIALS */}
          <section className="dwd-peach-section">
            <div className="dwd-container">
              <h2 className="dwd-serif-heading dwd-center-heading">Testimonials</h2>
              <div className="dwd-testimonials-grid">
                {DIAMOND_WORKDO_TESTIMONIALS.slice(0, 2).map((t, idx) => (
                  <div key={t.id} className="dwd-testi-card">
                    <div className="dwd-testi-thumb-wrap">
                      <img
                        src="https://jewels-workdo.myshopify.com/cdn/shop/files/chocolate2.png?v=1698816835"
                        alt="Diamond Ring"
                        className="dwd-testi-thumb"
                      />
                    </div>
                    <div>
                      <div className="dwd-testi-top">
                        <span className="dwd-testi-label">{idx === 0 ? 'Best Quality' : 'Great Service'}</span>
                        <span className="dwd-testi-score" style={{ color: '#d4ba9b', letterSpacing: 2 }}>★★★★★</span>
                      </div>
                      <p className="dwd-testi-quote">"{t.quote}"</p>
                      <div className="dwd-testi-author">{t.clientName}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 14: FROM OUR BLOG */}
          <section id="dwd-blog-section" className="dwd-peach-section">
            <div className="dwd-container">
              <h2 className="dwd-serif-heading dwd-center-heading">From our blog</h2>
              <div className="dwd-blog-grid">
                {DIAMOND_WORKDO_BLOG_POSTS.map((post) => (
                  <article key={post.id} className="dwd-blog-card">
                    <div className="dwd-blog-media">
                      <img src={post.image} alt={post.title} className="dwd-blog-img" />
                    </div>
                    <div className="dwd-blog-content">
                      <span className="dwd-blog-cat-tag">{post.category}</span>
                      <h3 className="dwd-blog-title">{post.title}</h3>
                      <p className="dwd-blog-excerpt">{post.excerpt}</p>
                      <div className="dwd-blog-footer">
                        <button
                          type="button"
                          className="dwd-pill-btn dwd-pill-btn-forest dwd-blog-read-btn"
                          onClick={() => showToast(`Reading: ${post.title}`)}
                        >
                          Read More
                        </button>
                        <span className="dwd-blog-date">{post.date}</span>
                      </div>
                    </div>
                  </article>
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
        <section style={{ minHeight: '80vh', padding: '50px 0', background: '#ffffff' }}>
          <div className="dwd-container">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#637570', marginBottom: 24 }}>
              <span style={{ cursor: 'pointer', color: '#16332c', fontWeight: 600 }} onClick={() => setViewMode('home')}>
                Home
              </span>
              <span>/</span>
              <span>Catalog</span>
              <span>/</span>
              <span style={{ color: '#16332c', fontWeight: 700 }}>{filters.category}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20, marginBottom: 30 }}>
              <div>
                <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, margin: '0 0 6px 0', color: '#16332c' }}>
                  {filters.category === 'All' ? 'Fine Diamond Jewelry Catalog' : `${filters.category} Collection`}
                </h1>
                <p style={{ color: '#637570', fontSize: 14, margin: 0 }}>
                  Showing {filteredProducts.length} certified handcrafted pieces
                </p>
              </div>

              {/* Category Filter Chips */}
              <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                {(['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Watches'] as const).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    style={{
                      padding: '8px 18px',
                      borderRadius: 999,
                      border: '1px solid #16332c',
                      background: filters.category === cat ? '#16332c' : '#ffffff',
                      color: filters.category === cat ? '#ffffff' : '#16332c',
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                    onClick={() => setFilters((f) => ({ ...f, category: cat }))}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Cards Grid */}
            <div className="dwd-four-products-grid">
              {filteredProducts.map((prod) => (
                <article key={prod.id} className="dwd-product-card">
                  <div className="dwd-card-top">
                    {prod.isNewDrop && <span className="dwd-card-badge">NEW</span>}
                    <span className="dwd-card-cat-label">{prod.category}</span>
                    <button
                      type="button"
                      className="dwd-card-quick-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        openQuickView(prod)
                      }}
                      title="Quick View"
                      aria-label="Quick View"
                    >
                      👁️
                    </button>
                  </div>
                  <h3 className="dwd-card-title" onClick={() => openPdp(prod)}>
                    {prod.name}
                  </h3>
                  <div className="dwd-card-img-wrap" onClick={() => openPdp(prod)}>
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="dwd-card-img"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
                      }}
                    />
                  </div>
                  <div className="dwd-card-pricing">
                    <span className="dwd-price">${prod.price.toLocaleString()}.00</span>
                    {prod.compareAtPrice > prod.price && (
                      <span className="dwd-compare-price">${prod.compareAtPrice.toLocaleString()}.00</span>
                    )}
                  </div>
                  <div className="dwd-stars">★★★★★</div>
                  <button
                    type="button"
                    className="dwd-card-cart-btn"
                    onClick={() => addToCart(prod, prod.metals[0].name, 'US 6.5', undefined, 1)}
                  >
                    Add to Cart <span className="dwd-arrow">➔</span>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          VIEW MODE: PDP (PRODUCT DETAILS PAGE)
          ========================================================================= */}
      {viewMode === 'pdp' && (
        <section style={{ minHeight: '80vh', padding: '50px 0', background: '#ffffff' }}>
          <div className="dwd-container">
            <button
              type="button"
              className="dwd-pill-btn dwd-pill-btn-forest"
              style={{ marginBottom: 30, padding: '8px 20px', fontSize: 12 }}
              onClick={() => setViewMode('home')}
            >
              ← Back to Store
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.1fr 1fr', gap: 50, alignItems: 'start' }}>
              <div>
                <div style={{ background: '#faf7f5', borderRadius: 16, padding: 24, textAlign: 'center', marginBottom: 16 }}>
                  <img
                    src={pdpSelectedImage}
                    alt={selectedProduct.name}
                    style={{ maxWidth: '100%', maxHeight: 420, objectFit: 'contain' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {selectedProduct.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Thumbnail"
                      style={{
                        width: 72,
                        height: 72,
                        objectFit: 'contain',
                        borderRadius: 8,
                        background: '#faf7f5',
                        cursor: 'pointer',
                        border: pdpSelectedImage === img ? '2px solid #16332c' : '1px solid rgba(0,0,0,0.1)',
                      }}
                      onClick={() => setPdpSelectedImage(img)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <span className="dwd-card-cat-label">{selectedProduct.category}</span>
                <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, color: '#16332c', margin: '8px 0 12px 0' }}>
                  {selectedProduct.name}
                </h1>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#16332c', marginBottom: 18 }}>
                  ${selectedProduct.price.toLocaleString()}.00
                  {selectedProduct.compareAtPrice > selectedProduct.price && (
                    <span style={{ fontSize: 16, color: '#9aa8a4', textDecoration: 'line-through', marginLeft: 10 }}>
                      ${selectedProduct.compareAtPrice.toLocaleString()}.00
                    </span>
                  )}
                </div>
                <p style={{ color: '#637570', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
                  {selectedProduct.description}
                </p>

                {/* Metal selector */}
                <div style={{ marginBottom: 20 }}>
                  <label style={{ fontSize: 13, fontWeight: 700, color: '#16332c', display: 'block', marginBottom: 8 }}>
                    Precious Metal: <span style={{ fontWeight: 500 }}>{pdpSelectedMetal}</span>
                  </label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {selectedProduct.metals.map((m) => (
                      <button
                        key={m.name}
                        type="button"
                        style={{
                          padding: '8px 16px',
                          borderRadius: 999,
                          border: pdpSelectedMetal === m.name ? '2px solid #16332c' : '1px solid rgba(0,0,0,0.2)',
                          background: pdpSelectedMetal === m.name ? '#faede3' : '#ffffff',
                          color: '#16332c',
                          fontSize: 12.5,
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                        onClick={() => setPdpSelectedMetal(m.name)}
                      >
                        {m.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ring Sizer & Size Selector */}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#16332c' }}>
                      Size: <span style={{ fontWeight: 500 }}>{pdpSelectedRingSize}</span>
                    </span>
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', color: '#16332c', fontSize: 12, textDecoration: 'underline', cursor: 'pointer' }}
                      onClick={() => setIsRingSizerOpen(true)}
                    >
                      Size Guide 📏
                    </button>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {['US 5', 'US 5.5', 'US 6', 'US 6.5', 'US 7', 'US 7.5', 'US 8', 'Standard'].map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        style={{
                          padding: '6px 12px',
                          borderRadius: 999,
                          border: pdpSelectedRingSize === sz ? '2px solid #16332c' : '1px solid rgba(0,0,0,0.15)',
                          background: pdpSelectedRingSize === sz ? '#16332c' : '#ffffff',
                          color: pdpSelectedRingSize === sz ? '#ffffff' : '#16332c',
                          fontSize: 12,
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                        onClick={() => setPdpSelectedRingSize(sz)}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ring Sizer & Qty */}
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(0,0,0,0.2)', borderRadius: 999, padding: '4px 8px' }}>
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', padding: '0 8px' }}
                      onClick={() => setPdpQty(Math.max(1, pdpQty - 1))}
                    >
                      -
                    </button>
                    <span style={{ padding: '0 10px', fontSize: 14, fontWeight: 700 }}>{pdpQty}</span>
                    <button
                      type="button"
                      style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', padding: '0 8px' }}
                      onClick={() => setPdpQty(pdpQty + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="dwd-pill-btn dwd-pill-btn-forest"
                    style={{ flex: 1, padding: '14px 28px' }}
                    onClick={() => addToCart(selectedProduct, pdpSelectedMetal, pdpSelectedRingSize, undefined, pdpQty)}
                  >
                    Add to Cart <span className="dwd-arrow">➔</span>
                  </button>
                </div>

                <ul style={{ color: '#637570', fontSize: 13, lineHeight: 1.8, paddingLeft: 18 }}>
                  {selectedProduct.details.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* QUICK VIEW MODAL */}
      {isQuickViewOpen && (
        <div className="dwd-drawer-backdrop" onClick={() => setIsQuickViewOpen(false)}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: 16,
              maxWidth: 580,
              width: '90%',
              margin: 'auto',
              padding: 28,
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}
              onClick={() => setIsQuickViewOpen(false)}
            >
              ✕
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24, alignItems: 'center' }}>
              <img
                src={quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                style={{ width: '100%', maxHeight: 220, objectFit: 'contain', background: '#faf7f5', borderRadius: 10 }}
              />
              <div>
                <span className="dwd-card-cat-label">{quickViewProduct.category}</span>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: '#16332c', margin: '4px 0 8px 0' }}>
                  {quickViewProduct.name}
                </h3>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#16332c', marginBottom: 12 }}>
                  ${quickViewProduct.price.toLocaleString()}.00
                </div>
                <p style={{ fontSize: 12.5, color: '#637570', lineHeight: 1.6, marginBottom: 16 }}>
                  {quickViewProduct.description}
                </p>
                <button
                  type="button"
                  className="dwd-pill-btn dwd-pill-btn-forest"
                  style={{ width: '100%', padding: '10px 18px', fontSize: 12 }}
                  onClick={() => {
                    addToCart(quickViewProduct, quickViewProduct.metals[0].name, 'US 6.5', undefined, 1)
                    setIsQuickViewOpen(false)
                  }}
                >
                  Add to Cart <span className="dwd-arrow">➔</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RING SIZER MODAL */}
      {isRingSizerOpen && (
        <div className="dwd-drawer-backdrop" onClick={() => setIsRingSizerOpen(false)}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: 16,
              maxWidth: 580,
              width: '90%',
              margin: 'auto',
              padding: 28,
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 20, cursor: 'pointer' }}
              onClick={() => setIsRingSizerOpen(false)}
            >
              ✕
            </button>
            <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, color: '#16332c', margin: '0 0 12px 0' }}>
              Ring Sizer Guide & 4Cs Education
            </h3>
            <p style={{ color: '#637570', fontSize: 13, lineHeight: 1.6, marginBottom: 18 }}>
              Complimentary bespoke sizing kit with every order. Discover the international diameter guide below:
            </p>
            <div style={{ background: '#faede3', padding: 16, borderRadius: 10, fontSize: 12.5, color: '#16332c' }}>
              <p><strong>US Size 6:</strong> 16.5mm diameter (Inside Circumference: 51.9mm)</p>
              <p><strong>US Size 7:</strong> 17.3mm diameter (Inside Circumference: 54.4mm)</p>
              <p><strong>US Size 8:</strong> 18.1mm diameter (Inside Circumference: 57.0mm)</p>
            </div>
            <button
              type="button"
              className="dwd-pill-btn dwd-pill-btn-forest"
              style={{ marginTop: 20, width: '100%' }}
              onClick={() => setIsRingSizerOpen(false)}
            >
              Close Guide
            </button>
          </div>
        </div>
      )}

      {/* SHOPPING BAG CART DRAWER */}
      {isCartOpen && (
        <div className="dwd-drawer-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="dwd-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="dwd-drawer-header">
              <h3 className="dwd-drawer-title">Shopping Cart ({totalCartCount})</h3>
              <button type="button" className="dwd-close-btn" onClick={() => setIsCartOpen(false)}>
                ✕
              </button>
            </div>

            <div style={{ flex: 1, padding: '20px 0' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#637570' }}>
                  <div style={{ fontSize: 36, marginBottom: 10 }}>🛍</div>
                  <p>Your shopping cart is currently empty</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  {cartItems.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: 'flex',
                        gap: 14,
                        paddingBottom: 16,
                        borderBottom: '1px solid rgba(22,51,44,0.08)',
                      }}
                    >
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        style={{ width: 68, height: 68, objectFit: 'contain', background: '#faf7f5', borderRadius: 8 }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <h4 style={{ margin: '0 0 4px 0', fontSize: 13.5, color: '#16332c' }}>
                            {item.product.name}
                          </h4>
                          <button
                            type="button"
                            style={{ background: 'none', border: 'none', color: '#8c9c98', cursor: 'pointer' }}
                            onClick={() => updateCartQty(idx, -item.quantity)}
                          >
                            ✕
                          </button>
                        </div>
                        <div style={{ fontSize: 12, color: '#8c9c98', marginBottom: 8 }}>
                          {item.selectedMetal} {item.selectedRingSize ? `• ${item.selectedRingSize}` : ''}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(0,0,0,0.15)', borderRadius: 999 }}>
                            <button
                              type="button"
                              style={{ background: 'none', border: 'none', padding: '2px 8px', cursor: 'pointer' }}
                              onClick={() => updateCartQty(idx, -1)}
                            >
                              -
                            </button>
                            <span style={{ fontSize: 12, fontWeight: 700, padding: '0 4px' }}>{item.quantity}</span>
                            <button
                              type="button"
                              style={{ background: 'none', border: 'none', padding: '2px 8px', cursor: 'pointer' }}
                              onClick={() => updateCartQty(idx, 1)}
                            >
                              +
                            </button>
                          </div>
                          <span style={{ fontSize: 14, fontWeight: 700, color: '#16332c' }}>
                            ${(item.product.price * item.quantity).toLocaleString()}.00
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div style={{ borderTop: '1px solid rgba(22,51,44,0.08)', paddingTop: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 14, fontSize: 16, fontWeight: 700, color: '#16332c' }}>
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toLocaleString()}.00</span>
                </div>
                <button
                  type="button"
                  className="dwd-pill-btn dwd-pill-btn-forest"
                  style={{ width: '100%' }}
                  onClick={() => showToast('Proceeding to Secure Checkout...')}
                >
                  Checkout Now ➔
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          SECTION 15: FOOTER (DARK FOREST GREEN)
          ========================================================================= */}
      <footer className="dwd-footer">
        <div className="dwd-container">
          <div className="dwd-footer-grid">
            {/* Column 1: Newsletter */}
            <div>
              <h3 className="dwd-footer-newsletter-title">
                Subscribe newsletter and get<br />-20% off
              </h3>
              <p className="dwd-footer-newsletter-desc">
                Subscribe to the newsletter to receive the latest updates about promotions, collections and special events.
              </p>
              <div className="dwd-footer-input-pill">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="dwd-footer-input"
                />
                <button
                  type="button"
                  className="dwd-footer-submit-circle"
                  onClick={() => showToast('Thank you for subscribing to Diamond Store.')}
                >
                  ➔
                </button>
              </div>
            </div>

            {/* Column 2: STORE */}
            <div>
              <h4 className="dwd-footer-heading">STORE</h4>
              <ul className="dwd-footer-links-list">
                <li><a href="#all" onClick={(e) => { e.preventDefault(); setFilters((f) => ({ ...f, category: 'All' })); setViewMode('catalog') }}>All Products</a></li>
                <li><a href="#jewelry" onClick={(e) => { e.preventDefault(); setFilters((f) => ({ ...f, category: 'All' })); setViewMode('catalog') }}>Jewelry</a></li>
                <li><a href="#earrings" onClick={(e) => { e.preventDefault(); setFilters((f) => ({ ...f, category: 'Earrings' })); setViewMode('catalog') }}>Earrings</a></li>
                <li><a href="#rings" onClick={(e) => { e.preventDefault(); setFilters((f) => ({ ...f, category: 'Rings' })); setViewMode('catalog') }}>Ring and</a></li>
              </ul>
            </div>

            {/* Column 3: ABOUT US */}
            <div>
              <h4 className="dwd-footer-heading">ABOUT US</h4>
              <ul className="dwd-footer-links-list">
                <li><a href="#about" onClick={(e) => { e.preventDefault(); showToast('Diamond Fine Jewelry Atelier since 2024.') }}>About us</a></li>
                <li><a href="#delivery" onClick={(e) => { e.preventDefault(); showToast('Free insured express delivery worldwide on orders over $150.') }}>Delivery & Return</a></li>
                <li><a href="#privacy" onClick={(e) => { e.preventDefault(); showToast('Privacy Policy: All customer data is encrypted & secured.') }}>Privacy Policy</a></li>
                <li><a href="#terms" onClick={(e) => { e.preventDefault(); showToast('Terms of Use: 60 Days return guarantee, no questions asked.') }}>Terms of Use</a></li>
                <li><a href="#faqs" onClick={(e) => { e.preventDefault(); showToast('Frequently Asked Questions & Ring Sizing Guide.') }}>FAQs</a></li>
              </ul>
            </div>

            {/* Column 4: FOLLOW US */}
            <div>
              <h4 className="dwd-footer-heading">FOLLOW US</h4>
              <div className="dwd-footer-social-row">
                <span className="dwd-footer-social-icon" title="Instagram">📷</span>
                <span className="dwd-footer-social-icon" title="Facebook">📘</span>
                <span className="dwd-footer-social-icon" title="Pinterest">📌</span>
                <span className="dwd-footer-social-icon" title="Twitter / X">🐦</span>
              </div>
            </div>
          </div>

          <div className="dwd-footer-bottom">
            <div>
              © 2024 Diamond Powered by Willovate
            </div>
            <div className="dwd-footer-payments">
              <span className="dwd-pay-badge">VISA</span>
              <span className="dwd-pay-badge">Mastercard</span>
              <span className="dwd-pay-badge">Maestro</span>
              <span className="dwd-pay-badge">PayPal</span>
              <span className="dwd-pay-badge">Apple Pay</span>
            </div>
            <div className="dwd-footer-bottom-links">
              <span onClick={() => showToast('Privacy Policy')}>Privacy Policy</span>
              <span>Terms & Conditions</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default DiamondWorkDoStorefront

