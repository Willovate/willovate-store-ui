import React, { useState, useMemo } from 'react'
import type {
  VtOlightProduct,
  VtOlightCartItem,
  VtOlightFilterState,
  VtOlightStorefrontProps,
} from './types'
import {
  VT_OLIGHT_PRODUCTS,
  VT_OLIGHT_TESTIMONIALS,
  VT_OLIGHT_BLOG_POSTS,
  VT_OLIGHT_INSTAGRAM_IMAGES,
} from './data/vtOlightData'
import './styles/vtOlight.css'

export const VtOlightStorefront: React.FC<VtOlightStorefrontProps> = ({
  initialView = 'home',
  device = 'desktop',
  deviceView,
  onClose: _onClose,
  onBack: _onBack,
  onUseTemplate: _onUseTemplate,
}) => {
  const effectiveDevice = deviceView || device || 'desktop'
  const isMobile = effectiveDevice === 'mobile'

  const [viewMode, setViewMode] = useState<'home' | 'catalog' | 'pdp'>(initialView)
  const [selectedProduct, setSelectedProduct] = useState<VtOlightProduct>(VT_OLIGHT_PRODUCTS[0])

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<VtOlightProduct>(VT_OLIGHT_PRODUCTS[0])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isRingSizerOpen, setIsRingSizerOpen] = useState(false)
  const [wishlistIds, setWishlistIds] = useState<string[]>([])
  const [toastMsg, setToastMsg] = useState<string | null>(null)

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState('')

  // Active Category Filter for Best Sellers
  const [activeCategory, setActiveCategory] = useState<string>('All Collection')

  // Cart Items State
  const [cartItems, setCartItems] = useState<VtOlightCartItem[]>([
    {
      product: VT_OLIGHT_PRODUCTS[0],
      selectedMetal: '18K Yellow Gold',
      selectedRingSize: 'US 6.5',
      quantity: 1,
    },
    {
      product: VT_OLIGHT_PRODUCTS[1],
      selectedMetal: '18K Yellow Gold',
      selectedRingSize: 'US 7.0',
      quantity: 1,
    },
  ])

  // Catalog Filters
  const [filters, setFilters] = useState<VtOlightFilterState>({
    category: 'All',
    sortBy: 'featured',
    priceRange: [0, 5000],
  })

  // PDP State
  const [pdpSelectedMetal, setPdpSelectedMetal] = useState<string>(VT_OLIGHT_PRODUCTS[0].metals[0].name)
  const [pdpSelectedRingSize, setPdpSelectedRingSize] = useState<string>('US 6.5')
  const [pdpSelectedImage, setPdpSelectedImage] = useState<string>(VT_OLIGHT_PRODUCTS[0].images[0])
  const [pdpQty, setPdpQty] = useState<number>(1)

  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 3000)
  }

  const toggleWishlist = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation()
    if (wishlistIds.includes(id)) {
      setWishlistIds((prev) => prev.filter((item) => item !== id))
      showToast('Removed from Wishlist')
    } else {
      setWishlistIds((prev) => [...prev, id])
      showToast('Added to Wishlist ♡')
    }
  }

  const handleAddToCart = (product: VtOlightProduct, metal?: string, ringSize?: string, qty = 1) => {
    const chosenMetal = metal || product.metals[0].name
    const chosenSize = ringSize || 'US 6.5'
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedMetal === chosenMetal && i.selectedRingSize === chosenSize
      )
      if (idx > -1) {
        const next = [...prev]
        next[idx].quantity += qty
        return next
      }
      return [...prev, { product, selectedMetal: chosenMetal, selectedRingSize: chosenSize, quantity: qty }]
    })
    setIsCartOpen(true)
    showToast(`Added ${product.name} to Shopping Bag`)
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

  const openPdp = (product: VtOlightProduct) => {
    setSelectedProduct(product)
    setPdpSelectedMetal(product.metals[0].name)
    setPdpSelectedImage(product.images[0])
    setPdpQty(1)
    setViewMode('pdp')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openQuickView = (product: VtOlightProduct, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setQuickViewProduct(product)
    setIsQuickViewOpen(true)
  }

  // Filtered Best Sellers
  const filteredBestSellers = useMemo(() => {
    if (activeCategory === 'All Collection') {
      return VT_OLIGHT_PRODUCTS.slice(0, 3)
    }
    const match = VT_OLIGHT_PRODUCTS.filter((p) => p.category === activeCategory)
    return match.length > 0 ? match.slice(0, 3) : VT_OLIGHT_PRODUCTS.slice(0, 3)
  }, [activeCategory])

  // Catalog Products
  const filteredCatalog = useMemo(() => {
    return VT_OLIGHT_PRODUCTS.filter((p) => {
      if (filters.category !== 'All' && p.category !== filters.category) return false
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        return (
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [filters, searchQuery])

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0)
  const cartSubtotal = cartItems.reduce((acc, i) => acc + i.product.price * i.quantity, 0)

  return (
    <div className={`vto-root ${isMobile ? 'vto-mobile vto-mobile-view is-mobile' : `vto-${effectiveDevice}`}`}>

      {/* TOAST POPUP */}
      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#121315',
            color: '#c89e58',
            padding: '12px 28px',
            borderRadius: '999px',
            fontSize: '13.5px',
            fontWeight: 600,
            zIndex: 999999,
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
            border: '1px solid rgba(200, 158, 88, 0.4)',
          }}
        >
          {toastMsg}
        </div>
      )}

      {/* 1. TOP ANNOUNCEMENT STRIP */}
      <div className="vto-top-bar">
        <div className="vto-container vto-top-bar-inner">
          <div className="vto-top-marquee">
            <span>
              ✦ <span className="vto-top-highlight">SPECIAL DISCOUNT CODE: OLIGHT15</span> ✦ FREE WORLDWIDE SHIPPING ON ORDERS OVER $150 ✦ 100% GIA CERTIFIED SOLITAIRES
            </span>
          </div>
          <div className="vto-top-controls">
            <button type="button" className="vto-top-btn" onClick={() => showToast('Currency: USD ($)')}>
              <span>🇺🇸</span> USD ∨
            </button>
            <span style={{ opacity: 0.3 }}>|</span>
            <button type="button" className="vto-top-btn" onClick={() => showToast('Language: English')}>
              EN ∨
            </button>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="vto-header">
        <div className="vto-container">
          <div className="vto-header-inner">
            {/* Mobile Hamburger Menu Toggle */}
            <button
              type="button"
              className="vto-mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <span className="vto-burger-bar" />
              <span className="vto-burger-bar" />
              <span className="vto-burger-bar" />
            </button>

            {/* Left: Navigation Menu */}
            <nav className="vto-nav">
              <span
                className={`vto-nav-link ${viewMode === 'home' ? 'active' : ''}`}
                onClick={() => setViewMode('home')}
              >
                Home ∨
              </span>
              <span
                className={`vto-nav-link ${viewMode === 'catalog' ? 'active' : ''}`}
                onClick={() => {
                  setFilters((f) => ({ ...f, category: 'All' }))
                  setViewMode('catalog')
                }}
              >
                Shop ∨
              </span>
              <span
                className="vto-nav-link"
                onClick={() => {
                  setFilters((f) => ({ ...f, category: 'Rings' }))
                  setViewMode('catalog')
                }}
              >
                Products ∨
              </span>
              <span
                className="vto-nav-link"
                onClick={() => setIsRingSizerOpen(true)}
              >
                Pages ∨
              </span>
              <span
                className="vto-nav-link"
                onClick={() => {
                  const el = document.getElementById('vto-blog')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                  else {
                    setViewMode('home')
                    setTimeout(() => document.getElementById('vto-blog')?.scrollIntoView({ behavior: 'smooth' }), 100)
                  }
                }}
              >
                Blog ∨
              </span>
              <span
                className="vto-nav-link"
                onClick={() => showToast('Concierge: concierge@vt-olight.com')}
              >
                Contact
              </span>
            </nav>

            {/* Center: Brand Wordmark */}
            <div className="vto-brand-logo" onClick={() => setViewMode('home')}>
              <div className="vto-logo-text">
                Olight <span className="vto-logo-star">✦</span>
              </div>
            </div>

            {/* Right: Actions */}
            <div className="vto-actions">
              <button
                type="button"
                className="vto-icon-btn"
                title="Search"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8"></circle>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
              </button>

              <button
                type="button"
                className="vto-icon-btn"
                title="Account"
                onClick={() => showToast('Client Account Profile')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                  <circle cx="12" cy="7" r="4"></circle>
                </svg>
              </button>

              <button
                type="button"
                className="vto-icon-btn"
                title="Wishlist"
                onClick={() => showToast(`Wishlist contains ${wishlistIds.length} item(s)`)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
                {wishlistIds.length > 0 && <span className="vto-badge-count">{wishlistIds.length}</span>}
              </button>

              <button
                type="button"
                className="vto-cart-summary-btn"
                title="Shopping Bag"
                onClick={() => setIsCartOpen(true)}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <path d="M16 10a4 4 0 0 1-8 0"></path>
                </svg>
                <span>Bag ({totalCartCount}) • ${cartSubtotal.toLocaleString()}</span>
              </button>
            </div>
          </div>
        </div>

        {/* SEARCH DROPDOWN */}
        {isSearchOpen && (
          <div style={{ background: '#fdf8ee', borderTop: '1px solid #eae6df', padding: '16px 0' }}>
            <div className="vto-container" style={{ display: 'flex', gap: 12 }}>
              <input
                type="text"
                placeholder="Search solitaires, eternity rings, bracelets, necklaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  borderRadius: 999,
                  border: '1px solid #c89e58',
                  fontSize: 14,
                  outline: 'none',
                }}
              />
              <button
                type="button"
                className="vto-pill-btn vto-pill-btn-dark"
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

      {/* MOBILE NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="vto-drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="vto-mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="vto-mobile-nav-header">
              <div className="vto-logo-text" style={{ fontSize: '22px', margin: 0 }}>
                Olight <span className="vto-logo-star">✦</span>
              </div>
              <button
                type="button"
                className="vto-drawer-close"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <div className="vto-mobile-nav-links">
              <button
                type="button"
                className={`vto-mobile-link ${viewMode === 'home' ? 'active' : ''}`}
                onClick={() => {
                  setViewMode('home')
                  setIsMobileMenuOpen(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <span>Home</span>
                <span>›</span>
              </button>
              <button
                type="button"
                className={`vto-mobile-link ${viewMode === 'catalog' && filters.category === 'All' ? 'active' : ''}`}
                onClick={() => {
                  setFilters((f) => ({ ...f, category: 'All' }))
                  setViewMode('catalog')
                  setIsMobileMenuOpen(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <span>All Jewelry Collections</span>
                <span>›</span>
              </button>
              <button
                type="button"
                className={`vto-mobile-link ${viewMode === 'catalog' && filters.category === 'Rings' ? 'active' : ''}`}
                onClick={() => {
                  setFilters((f) => ({ ...f, category: 'Rings' }))
                  setViewMode('catalog')
                  setIsMobileMenuOpen(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <span>Solitaire & Engagement Rings</span>
                <span>›</span>
              </button>
              <button
                type="button"
                className={`vto-mobile-link ${viewMode === 'catalog' && filters.category === 'Necklaces' ? 'active' : ''}`}
                onClick={() => {
                  setFilters((f) => ({ ...f, category: 'Necklaces' }))
                  setViewMode('catalog')
                  setIsMobileMenuOpen(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <span>Diamond Necklaces</span>
                <span>›</span>
              </button>
              <button
                type="button"
                className={`vto-mobile-link ${viewMode === 'catalog' && filters.category === 'Earrings' ? 'active' : ''}`}
                onClick={() => {
                  setFilters((f) => ({ ...f, category: 'Earrings' }))
                  setViewMode('catalog')
                  setIsMobileMenuOpen(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <span>Earrings & Drops</span>
                <span>›</span>
              </button>
              <button
                type="button"
                className={`vto-mobile-link ${viewMode === 'catalog' && filters.category === 'Bracelets' ? 'active' : ''}`}
                onClick={() => {
                  setFilters((f) => ({ ...f, category: 'Bracelets' }))
                  setViewMode('catalog')
                  setIsMobileMenuOpen(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <span>Fine Bracelets</span>
                <span>›</span>
              </button>
              <button
                type="button"
                className="vto-mobile-link"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setIsRingSizerOpen(true)
                }}
              >
                <span>Ring Size Guide</span>
                <span>›</span>
              </button>
              <button
                type="button"
                className="vto-mobile-link"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  const el = document.getElementById('vto-blog')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                  else {
                    setViewMode('home')
                    setTimeout(() => document.getElementById('vto-blog')?.scrollIntoView({ behavior: 'smooth' }), 100)
                  }
                }}
              >
                <span>Editorial Blog</span>
                <span>›</span>
              </button>
              <button
                type="button"
                className="vto-mobile-link"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  showToast('Concierge: concierge@vt-olight.com')
                }}
              >
                <span>Contact Atelier</span>
                <span>›</span>
              </button>
            </div>
            <div className="vto-mobile-nav-footer">
              <div className="vto-mobile-currency" onClick={() => showToast('Currency: USD ($)')}>
                <span>Currency: USD ($)</span>
              </div>
              <button
                type="button"
                className="vto-mobile-vip-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  showToast('Welcome to Olight VIP Lounge')
                }}
              >
                VIP Client Sign In
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW MODE: HOME (100% MATCHING SCREENSHOT)
          ========================================================================= */}
      {viewMode === 'home' && (
        <>
          {/* SECTION 1: HERO (Find the Perfect Ring Make) */}
          <section className="vto-hero-section">
            <div className="vto-container">
              <div className="vto-hero-grid">
                {/* Left: Headline & Floating Ring Card */}
                <div className="vto-hero-content">
                  <span className="vto-hero-eyebrow">Trending Now</span>
                  <h1 className="vto-hero-title">
                    Find the Perfect<br />Ring Make
                  </h1>
                  <p className="vto-hero-desc">
                    Explore our handcrafted collection of certified solitaire rings, bespoke bridal designs, and fine 18K solid gold jewelry for every milestone.
                  </p>

                  {/* Floating Mini Product Card */}
                  <div
                    className="vto-hero-floating-card"
                    onClick={() => openPdp(VT_OLIGHT_PRODUCTS[0])}
                  >
                    <img
                      src={VT_OLIGHT_PRODUCTS[0].images[0]}
                      alt="Solitaire Diamond Ring"
                      className="vto-floating-thumb"
                    />
                    <div className="vto-floating-meta">
                      <h4>Solitaire Diamond Ring</h4>
                      <p>by Olight Atelier</p>
                      <span className="vto-floating-price">$2,450.00</span>
                    </div>
                    <span style={{ color: '#c89e58', fontWeight: 700, marginLeft: 10 }}>➔</span>
                  </div>
                </div>

                {/* Right: Editorial Model Wearing Gold Jewelry */}
                <div className="vto-hero-visual">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&auto=format&fit=crop&q=80"
                    alt="Editorial Model Wearing Gold Jewelry"
                    className="vto-hero-model-img"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 2: TWO PROMOTIONAL FEATURE CARDS */}
          <section className="vto-two-promo-section">
            <div className="vto-container">
              <div className="vto-two-promo-grid">
                {/* Card 1: Heart Pendant */}
                <div
                  className="vto-promo-card"
                  style={{
                    backgroundImage: 'url(https://jewels-workdo.myshopify.com/cdn/shop/files/card-img-3.png?v=1698821196)',
                  }}
                  onClick={() => openPdp(VT_OLIGHT_PRODUCTS[3])}
                >
                  <div className="vto-promo-overlay" />
                  <div className="vto-promo-content">
                    <span className="vto-promo-eyebrow">Special Offer</span>
                    <h3 className="vto-promo-title">Add Fire To Your Style Design.</h3>
                    <button type="button" className="vto-pill-btn vto-pill-btn-dark">
                      Shop Now
                    </button>
                  </div>
                </div>

                {/* Card 2: Engagement Rings */}
                <div
                  className="vto-promo-card"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80)',
                  }}
                  onClick={() => openPdp(VT_OLIGHT_PRODUCTS[4])}
                >
                  <div className="vto-promo-overlay" />
                  <div className="vto-promo-content">
                    <span className="vto-promo-eyebrow">Exclusive Cut</span>
                    <h3 className="vto-promo-title">Unique Engagement Rings</h3>
                    <p className="vto-promo-desc">
                      Express your eternal love with a handcrafted engagement ring.
                    </p>
                    <button type="button" className="vto-pill-btn vto-pill-btn-dark">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: GOLD MARQUEE TICKER RIBBON */}
          <section className="vto-ticker-strip">
            <div className="vto-ticker-content">
              {[1, 2, 3].map((cycle) => (
                <React.Fragment key={cycle}>
                  <span className="vto-ticker-item">
                    <span className="vto-ticker-star">✦</span> Best Price Guarantee
                  </span>
                  <span className="vto-ticker-item">
                    <span className="vto-ticker-star">✦</span> 30 Days Free Return
                  </span>
                  <span className="vto-ticker-item">
                    <span className="vto-ticker-star">✦</span> 100% Certified Diamond
                  </span>
                  <span className="vto-ticker-item">
                    <span className="vto-ticker-star">✦</span> Handcrafted with Care
                  </span>
                  <span className="vto-ticker-item">
                    <span className="vto-ticker-star">✦</span> Free Gift Packaging
                  </span>
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* SECTION 4: RAMADAN / FESTIVE ATELIER SPOTLIGHT (HANGING LANTERNS) */}
          <section className="vto-festive-section">
            {/* Hanging Lanterns Left & Right SVG */}
            <div className="vto-lantern-left">
              <svg viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="50" y1="0" x2="50" y2="60" stroke="#c89e58" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M50 60 C30 75 30 110 50 130 C70 110 70 75 50 60 Z" fill="rgba(200, 158, 88, 0.15)" stroke="#c89e58" strokeWidth="2" />
                <circle cx="50" cy="95" r="12" fill="#fff6dd" filter="blur(4px)" />
                <circle cx="50" cy="95" r="6" fill="#c89e58" />
                <line x1="50" y1="130" x2="50" y2="150" stroke="#c89e58" strokeWidth="2" />
              </svg>
            </div>
            <div className="vto-lantern-right">
              <svg viewBox="0 0 100 200" fill="none" xmlns="http://www.w3.org/2000/svg">
                <line x1="50" y1="0" x2="50" y2="80" stroke="#c89e58" strokeWidth="2" strokeDasharray="3 3" />
                <path d="M50 80 C30 95 30 130 50 150 C70 130 70 95 50 80 Z" fill="rgba(200, 158, 88, 0.15)" stroke="#c89e58" strokeWidth="2" />
                <circle cx="50" cy="115" r="12" fill="#fff6dd" filter="blur(4px)" />
                <circle cx="50" cy="115" r="6" fill="#c89e58" />
                <line x1="50" y1="150" x2="50" y2="170" stroke="#c89e58" strokeWidth="2" />
              </svg>
            </div>

            <div className="vto-container">
              <div className="vto-festive-icon">✦</div>
              <h2 className="vto-festive-title">
                Authentic Gems For The World's Finest Artisans
              </h2>
              <p className="vto-festive-desc">
                Our master jewelers handcraft each piece with ethically sourced diamonds and fine 18K/22K gold. Discover timeless heirlooms that celebrate life's most precious milestones.
              </p>
              <button
                type="button"
                className="vto-pill-btn vto-pill-btn-dark"
                onClick={() => {
                  setFilters((f) => ({ ...f, category: 'All' }))
                  setViewMode('catalog')
                }}
              >
                Explore Story ➔
              </button>
            </div>
          </section>

          {/* SECTION 5: OUR BEST SELLER CATALOG SECTION */}
          <section className="vto-catalog-section">
            <div className="vto-container">
              <div className="vto-section-header">
                <h2 className="vto-section-title">Our Best Seller</h2>
                <div className="vto-filter-tabs">
                  {['All Collection', 'Rings', 'Earrings', 'Necklaces', 'Bracelets'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      className={`vto-tab-btn ${activeCategory === cat ? 'active' : ''}`}
                      onClick={() => setActiveCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 3-Column Best Sellers Grid */}
              <div className="vto-products-grid">
                {filteredBestSellers.map((prod) => (
                  <div key={prod.id} className="vto-product-card">
                    <div className="vto-card-image-box" onClick={() => openPdp(prod)}>
                      {prod.isSale && <span className="vto-sale-badge">Sale</span>}
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="vto-card-img"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
                        }}
                      />

                      {/* Hover action bar */}
                      <div className="vto-card-actions-bar">
                        <button
                          type="button"
                          className="vto-action-pill"
                          title="Wishlist"
                          onClick={(e) => toggleWishlist(prod.id, e)}
                        >
                          {wishlistIds.includes(prod.id) ? '♥' : '♡'}
                        </button>
                        <button
                          type="button"
                          className="vto-action-pill"
                          title="Quick View"
                          onClick={(e) => openQuickView(prod, e)}
                        >
                          👁
                        </button>
                        <button
                          type="button"
                          className="vto-action-pill"
                          title="Compare"
                          onClick={(e) => {
                            e.stopPropagation()
                            showToast(`Compared ${prod.name}`)
                          }}
                        >
                          ⇄
                        </button>
                      </div>
                    </div>

                    <div className="vto-card-body">
                      <h3 className="vto-card-title" onClick={() => openPdp(prod)}>
                        {prod.name}
                      </h3>
                      <div className="vto-card-stars">★★★★★ ({prod.reviewCount})</div>
                      <div className="vto-card-pricing">
                        <span className="vto-card-price">${prod.price.toLocaleString()}</span>
                        {prod.compareAtPrice && (
                          <span className="vto-card-compare">${prod.compareAtPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <button
                        type="button"
                        className="vto-card-cart-btn"
                        onClick={() => handleAddToCart(prod)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 6: 4 LIFESTYLE CATEGORY TILES */}
          <section className="vto-lifestyle-section">
            <div className="vto-container">
              <div className="vto-lifestyle-grid">
                {[
                  {
                    title: 'Rings & Bands',
                    img: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80',
                    cat: 'Rings',
                  },
                  {
                    title: 'Gold Bracelets',
                    img: 'https://jewels-workdo.myshopify.com/cdn/shop/files/card-img-2.png?v=1698821196',
                    cat: 'Bracelets',
                  },
                  {
                    title: 'Fine Drop Earrings',
                    img: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80',
                    cat: 'Earrings',
                  },
                  {
                    title: 'Pendant Necklaces',
                    img: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&auto=format&fit=crop&q=80',
                    cat: 'Necklaces',
                  },
                ].map((tile) => (
                  <div
                    key={tile.title}
                    className="vto-lifestyle-tile"
                    onClick={() => {
                      setFilters((f) => ({ ...f, category: tile.cat }))
                      setViewMode('catalog')
                    }}
                  >
                    <img
                      src={tile.img}
                      alt={tile.title}
                      className="vto-lifestyle-img"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
                      }}
                    />
                    <div className="vto-lifestyle-overlay">
                      <h3 className="vto-lifestyle-title">{tile.title}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 7: 4 TRUST SERVICE PILLARS */}
          <section className="vto-trust-section">
            <div className="vto-container">
              <div className="vto-trust-grid">
                {[
                  { title: 'Free Shipping Worldwide', desc: 'Free shipping on all orders over $150', icon: '✈' },
                  { title: '100% Certified Gems', desc: 'GIA & IGI laser-inscribed diamonds', icon: '✦' },
                  { title: 'Secure Payments', desc: 'SSL 256-bit encrypted checkout', icon: '🔒' },
                  { title: '30-Day Return Guarantee', desc: 'Hassle-free exchange & refund', icon: '↺' },
                ].map((item) => (
                  <div key={item.title} className="vto-trust-item">
                    <div className="vto-trust-icon">{item.icon}</div>
                    <div className="vto-trust-meta">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 8: TREND PRODUCTS OF THE WEEK */}
          <section className="vto-catalog-section">
            <div className="vto-container">
              <div className="vto-section-header">
                <h2 className="vto-section-title">Trend Products Of The Week</h2>
                <p style={{ color: '#666666', fontSize: 15, margin: '8px auto 0', maxWidth: 600 }}>
                  Hand-selected by our master jewelers for unmatched brilliance and contemporary elegance.
                </p>
              </div>

              <div className="vto-products-grid">
                {VT_OLIGHT_PRODUCTS.slice(3, 6).map((prod) => (
                  <div key={prod.id} className="vto-product-card">
                    <div className="vto-card-image-box" onClick={() => openPdp(prod)}>
                      {prod.isSale && <span className="vto-sale-badge">Sale</span>}
                      <img
                        src={prod.images[0]}
                        alt={prod.name}
                        className="vto-card-img"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
                        }}
                      />

                      <div className="vto-card-actions-bar">
                        <button
                          type="button"
                          className="vto-action-pill"
                          title="Wishlist"
                          onClick={(e) => toggleWishlist(prod.id, e)}
                        >
                          {wishlistIds.includes(prod.id) ? '♥' : '♡'}
                        </button>
                        <button
                          type="button"
                          className="vto-action-pill"
                          title="Quick View"
                          onClick={(e) => openQuickView(prod, e)}
                        >
                          👁
                        </button>
                        <button
                          type="button"
                          className="vto-action-pill"
                          title="Compare"
                          onClick={(e) => {
                            e.stopPropagation()
                            showToast(`Compared ${prod.name}`)
                          }}
                        >
                          ⇄
                        </button>
                      </div>
                    </div>

                    <div className="vto-card-body">
                      <h3 className="vto-card-title" onClick={() => openPdp(prod)}>
                        {prod.name}
                      </h3>
                      <div className="vto-card-stars">★★★★★ ({prod.reviewCount})</div>
                      <div className="vto-card-pricing">
                        <span className="vto-card-price">${prod.price.toLocaleString()}</span>
                        {prod.compareAtPrice && (
                          <span className="vto-card-compare">${prod.compareAtPrice.toLocaleString()}</span>
                        )}
                      </div>
                      <button
                        type="button"
                        className="vto-card-cart-btn"
                        onClick={() => handleAddToCart(prod)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 9: SECOND SPLIT PROMOTIONAL BANNERS */}
          <section className="vto-two-promo-section" style={{ paddingTop: 0 }}>
            <div className="vto-container">
              <div className="vto-two-promo-grid">
                {/* Left: Best Price Jewelry */}
                <div
                  className="vto-promo-card"
                  style={{
                    backgroundImage: 'url(https://jewels-workdo.myshopify.com/cdn/shop/files/card-img-3.png?v=1698821196)',
                  }}
                  onClick={() => openPdp(VT_OLIGHT_PRODUCTS[3])}
                >
                  <div className="vto-promo-overlay" />
                  <div className="vto-promo-content">
                    <span className="vto-promo-eyebrow">Flash Offer</span>
                    <h3 className="vto-promo-title">Best Price Jewelry</h3>
                    <button type="button" className="vto-pill-btn vto-pill-btn-dark">
                      Shop Now
                    </button>
                  </div>
                </div>

                {/* Right: Diamond Stud Earrings */}
                <div
                  className="vto-promo-card"
                  style={{
                    backgroundImage: 'url(https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80)',
                  }}
                  onClick={() => openPdp(VT_OLIGHT_PRODUCTS[5])}
                >
                  <div className="vto-promo-overlay" />
                  <div className="vto-promo-content">
                    <span className="vto-promo-eyebrow">Handcrafted</span>
                    <h3 className="vto-promo-title">Diamond Stud Earrings</h3>
                    <button type="button" className="vto-pill-btn vto-pill-btn-dark">
                      Shop Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 10: SECOND SCROLLING TICKER */}
          <section className="vto-ticker-strip">
            <div className="vto-ticker-content" style={{ animationDirection: 'reverse' }}>
              {[1, 2, 3].map((cycle) => (
                <React.Fragment key={cycle}>
                  <span className="vto-ticker-item">
                    <span className="vto-ticker-star">✦</span> Fast Delivery On All Orders
                  </span>
                  <span className="vto-ticker-item">
                    <span className="vto-ticker-star">✦</span> Fast Delivery On All Orders
                  </span>
                  <span className="vto-ticker-item">
                    <span className="vto-ticker-star">✦</span> Fast Delivery On All Orders
                  </span>
                </React.Fragment>
              ))}
            </div>
          </section>

          {/* SECTION 11: ATELIER STORY BANNER ("All Of Our Jewelry Is Handmade") */}
          <section className="vto-container">
            <div
              className="vto-atelier-banner"
              style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1600&auto=format&fit=crop&q=85)',
              }}
            >
              <div className="vto-atelier-overlay" />
              <div className="vto-atelier-content">
                <h2 className="vto-atelier-title">
                  All Of Our Jewelry<br />Is Handmade.
                </h2>
                <p className="vto-atelier-desc">
                  Crafted with meticulous attention to detail, each heirloom is individually forged, set, and polished by master artisans in our private atelier.
                </p>
                <button
                  type="button"
                  className="vto-pill-btn vto-pill-btn-gold"
                  onClick={() => {
                    setFilters((f) => ({ ...f, category: 'All' }))
                    setViewMode('catalog')
                  }}
                >
                  Discover More ➔
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 12: WHAT OUR CLIENTS SAY (TESTIMONIALS) */}
          <section className="vto-testimonials-section">
            <div className="vto-container">
              <div className="vto-section-header">
                <h2 className="vto-section-title">What Our Clients Say</h2>
                <p style={{ color: '#666666', fontSize: 15, margin: '8px auto 0' }}>
                  Real stories from our valued patrons around the world.
                </p>
              </div>

              <div className="vto-testi-grid">
                {VT_OLIGHT_TESTIMONIALS.map((testi) => (
                  <div key={testi.id} className="vto-testi-card">
                    <div className="vto-testi-stars">★★★★★</div>
                    <h3 className="vto-testi-headline">{testi.headline}</h3>
                    <p className="vto-testi-quote">"{testi.quote}"</p>
                    <div className="vto-testi-author-row">
                      <img src={testi.avatar} alt={testi.author} className="vto-testi-avatar" />
                      <div className="vto-testi-author-info">
                        <h4>{testi.author}</h4>
                        <p>{testi.role} • {testi.city}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 13: LATEST TRENDS PARALLAX BANNER */}
          <section className="vto-trends-banner">
            <div className="vto-container">
              <h2 className="vto-trends-title">Shop The Latest Trends</h2>
              <p className="vto-trends-desc">
                Exclusive designs curated for timeless sophistication and lifetime memories.
              </p>
              <button
                type="button"
                className="vto-pill-btn vto-pill-btn-dark"
                onClick={() => {
                  setFilters((f) => ({ ...f, category: 'All' }))
                  setViewMode('catalog')
                }}
              >
                Shop Now ➔
              </button>
            </div>
          </section>

          {/* SECTION 14: OUR LATEST BLOG */}
          <section id="vto-blog" className="vto-blog-section">
            <div className="vto-container">
              <div className="vto-section-header">
                <h2 className="vto-section-title">Our Latest Blog</h2>
                <p style={{ color: '#666666', fontSize: 15, margin: '8px auto 0' }}>
                  News, inspiration and expert jewelry guides
                </p>
              </div>

              <div className="vto-blog-grid">
                {VT_OLIGHT_BLOG_POSTS.map((post) => (
                  <div key={post.id} className="vto-blog-card">
                    <img src={post.image} alt={post.title} className="vto-blog-img" />
                    <div className="vto-blog-content">
                      <div className="vto-blog-date">{post.date} • {post.category}</div>
                      <h3 className="vto-blog-card-title">{post.title}</h3>
                      <p className="vto-blog-excerpt">{post.excerpt}</p>
                      <span
                        className="vto-blog-link"
                        onClick={() => showToast(`Read: ${post.title}`)}
                      >
                        Read More ➔
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 15: NEWSLETTER SIGNUP */}
          <section className="vto-newsletter-section">
            <div className="vto-container">
              <h2 className="vto-nl-title">Subscribe To Our Newsletter</h2>
              <p className="vto-nl-desc">
                Get 15% off your first purchase and stay updated on secret sales and new drops.
              </p>
              <form
                className="vto-nl-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  if (newsletterEmail.trim()) {
                    showToast('Thank you for subscribing! Promo code OLIGHT15 sent.')
                    setNewsletterEmail('')
                  }
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="vto-nl-input"
                />
                <button type="submit" className="vto-pill-btn vto-pill-btn-gold">
                  Subscribe
                </button>
              </form>

              {/* SECTION 16: INSTAGRAM VISUAL GRID */}
              <div className="vto-insta-grid">
                {VT_OLIGHT_INSTAGRAM_IMAGES.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Olight Instagram ${i + 1}`}
                    className="vto-insta-img"
                    onClick={() => showToast('Opening Instagram @olightjewelry')}
                  />
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* =========================================================================
          VIEW MODE: CATALOG
          ========================================================================= */}
      {viewMode === 'catalog' && (
        <section className="vto-catalog-section" style={{ minHeight: '80vh', paddingTop: 40 }}>
          <div className="vto-container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 30 }}>
              <div>
                <button
                  onClick={() => setViewMode('home')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#c89e58',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontWeight: 600,
                    marginBottom: 8,
                  }}
                >
                  ← Back to Home
                </button>
                <h1 className="vto-section-title" style={{ textAlign: 'left', margin: 0 }}>
                  High Jewelry Catalog
                </h1>
              </div>

              {/* Category Pills */}
              <div className="vto-filter-tabs" style={{ margin: 0 }}>
                {['All', 'Rings', 'Earrings', 'Necklaces', 'Bracelets'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`vto-tab-btn ${filters.category === cat ? 'active' : ''}`}
                    onClick={() => setFilters((f) => ({ ...f, category: cat }))}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="vto-products-grid">
              {filteredCatalog.map((prod) => (
                <div key={prod.id} className="vto-product-card">
                  <div className="vto-card-image-box" onClick={() => openPdp(prod)}>
                    {prod.isSale && <span className="vto-sale-badge">Sale</span>}
                    <img
                      src={prod.images[0]}
                      alt={prod.name}
                      className="vto-card-img"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
                      }}
                    />

                    <div className="vto-card-actions-bar">
                      <button
                        type="button"
                        className="vto-action-pill"
                        title="Wishlist"
                        onClick={(e) => toggleWishlist(prod.id, e)}
                      >
                        {wishlistIds.includes(prod.id) ? '♥' : '♡'}
                      </button>
                      <button
                        type="button"
                        className="vto-action-pill"
                        title="Quick View"
                        onClick={(e) => openQuickView(prod, e)}
                      >
                        👁
                      </button>
                    </div>
                  </div>

                  <div className="vto-card-body">
                    <h3 className="vto-card-title" onClick={() => openPdp(prod)}>
                      {prod.name}
                    </h3>
                    <div className="vto-card-stars">★★★★★ ({prod.reviewCount})</div>
                    <div className="vto-card-pricing">
                      <span className="vto-card-price">${prod.price.toLocaleString()}</span>
                      {prod.compareAtPrice && (
                        <span className="vto-card-compare">${prod.compareAtPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="vto-card-cart-btn"
                      onClick={() => handleAddToCart(prod)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          VIEW MODE: PDP (PRODUCT DETAIL PAGE)
          ========================================================================= */}
      {viewMode === 'pdp' && (
        <section style={{ padding: '60px 0', minHeight: '80vh' }}>
          <div className="vto-container">
            <button
              onClick={() => setViewMode('home')}
              style={{
                background: 'none',
                border: 'none',
                color: '#c89e58',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 600,
                marginBottom: 24,
              }}
            >
              ← Back to Collection
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
              {/* Product Gallery */}
              <div>
                <div
                  style={{
                    background: '#fbf9f5',
                    borderRadius: 16,
                    padding: 40,
                    textAlign: 'center',
                    marginBottom: 20,
                  }}
                >
                  <img
                    src={pdpSelectedImage}
                    alt={selectedProduct.name}
                    style={{ maxWidth: '85%', maxHeight: 420, objectFit: 'contain' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 14 }}>
                  {selectedProduct.images.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt={`Thumbnail ${i + 1}`}
                      onClick={() => setPdpSelectedImage(img)}
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 10,
                        border: pdpSelectedImage === img ? '2px solid #c89e58' : '1px solid #e5e7eb',
                        padding: 6,
                        objectFit: 'contain',
                        cursor: 'pointer',
                        background: '#fbf9f5',
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* Product Info */}
              <div>
                <div style={{ color: '#c89e58', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: 1 }}>
                  {selectedProduct.category} • Certified Solitaire
                </div>
                <h1 style={{ fontFamily: 'Cinzel, serif', fontSize: 34, margin: '10px 0 14px', color: '#111' }}>
                  {selectedProduct.name}
                </h1>
                <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 16px' }}>{selectedProduct.subtitle}</p>

                <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '16px 0 24px' }}>
                  <span style={{ fontSize: 28, fontWeight: 700, color: '#111' }}>
                    ${selectedProduct.price.toLocaleString()}
                  </span>
                  {selectedProduct.compareAtPrice && (
                    <span style={{ fontSize: 20, textDecoration: 'line-through', color: '#9ca3af' }}>
                      ${selectedProduct.compareAtPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <p style={{ color: '#4b5563', lineHeight: 1.7, margin: '0 0 28px' }}>
                  {selectedProduct.description}
                </p>

                {/* Metal Variant Swatches */}
                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 700, textTransform: 'uppercase', marginBottom: 10 }}>
                    Select Precious Metal: <span style={{ color: '#c89e58' }}>{pdpSelectedMetal}</span>
                  </label>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {selectedProduct.metals.map((metal) => (
                      <button
                        key={metal.name}
                        type="button"
                        onClick={() => setPdpSelectedMetal(metal.name)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          padding: '8px 16px',
                          borderRadius: 999,
                          border: pdpSelectedMetal === metal.name ? '2px solid #c89e58' : '1px solid #d1d5db',
                          background: pdpSelectedMetal === metal.name ? '#fdf8ee' : '#fff',
                          cursor: 'pointer',
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        <span
                          style={{
                            width: 14,
                            height: 14,
                            borderRadius: '50%',
                            background: metal.hex,
                            border: '1px solid rgba(0,0,0,0.1)',
                          }}
                        />
                        {metal.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ring Size Selector if Ring */}
                {selectedProduct.category === 'Rings' && (
                  <div style={{ marginBottom: 28 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                      <label style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase' }}>
                        Ring Size (US):
                      </label>
                      <button
                        type="button"
                        onClick={() => setIsRingSizerOpen(true)}
                        style={{ background: 'none', border: 'none', color: '#c89e58', fontSize: 13, cursor: 'pointer', textDecoration: 'underline' }}
                      >
                        Size Guide
                      </button>
                    </div>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      {['US 5.0', 'US 5.5', 'US 6.0', 'US 6.5', 'US 7.0', 'US 7.5', 'US 8.0'].map((size) => (
                        <button
                          key={size}
                          type="button"
                          onClick={() => setPdpSelectedRingSize(size)}
                          style={{
                            padding: '8px 14px',
                            borderRadius: 6,
                            border: pdpSelectedRingSize === size ? '2px solid #c89e58' : '1px solid #e5e7eb',
                            background: pdpSelectedRingSize === size ? '#fdf8ee' : '#fff',
                            cursor: 'pointer',
                            fontSize: 13,
                            fontWeight: 600,
                          }}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & CTA */}
                <div style={{ display: 'flex', gap: 16 }}>
                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #d1d5db', borderRadius: 999, padding: '4px 12px' }}>
                    <button
                      type="button"
                      onClick={() => setPdpQty((q) => Math.max(1, q - 1))}
                      style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', padding: '0 8px' }}
                    >
                      −
                    </button>
                    <span style={{ fontWeight: 700, minWidth: 24, textAlign: 'center' }}>{pdpQty}</span>
                    <button
                      type="button"
                      onClick={() => setPdpQty((q) => q + 1)}
                      style={{ background: 'none', border: 'none', fontSize: 18, cursor: 'pointer', padding: '0 8px' }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    type="button"
                    className="vto-pill-btn vto-pill-btn-gold"
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => handleAddToCart(selectedProduct, pdpSelectedMetal, pdpSelectedRingSize, pdpQty)}
                  >
                    Add to Bag • ${(selectedProduct.price * pdpQty).toLocaleString()}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          16. FOOTER
          ========================================================================= */}
      <footer className="vto-footer">
        <div className="vto-container">
          <div className="vto-footer-grid">
            {/* Brand Col */}
            <div className="vto-footer-col">
              <div className="vto-logo-text" style={{ justifyContent: 'flex-start', marginBottom: 16 }}>
                Olight <span className="vto-logo-star">✦</span>
              </div>
              <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.7, maxWidth: 320 }}>
                Master-forged certified solitaires, fine 18K solid gold heirlooms, and artisanal gemstones since 1984.
              </p>
              <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                {['f', 'in', 'p', 'x'].map((s) => (
                  <span
                    key={s}
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: '#f3f4f6',
                      display: 'grid',
                      placeItems: 'center',
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: 'pointer',
                      color: '#374151',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="vto-footer-col">
              <h4>Quick Links</h4>
              <ul className="vto-footer-links">
                <li><a onClick={() => setViewMode('home')}>Home</a></li>
                <li><a onClick={() => setViewMode('catalog')}>All Products</a></li>
                <li><a onClick={() => { setFilters(f => ({ ...f, category: 'Rings' })); setViewMode('catalog'); }}>Rings & Bands</a></li>
                <li><a onClick={() => { setFilters(f => ({ ...f, category: 'Necklaces' })); setViewMode('catalog'); }}>Necklaces</a></li>
                <li><a onClick={() => { setFilters(f => ({ ...f, category: 'Earrings' })); setViewMode('catalog'); }}>Earrings</a></li>
              </ul>
            </div>

            {/* Customer Care */}
            <div className="vto-footer-col">
              <h4>Customer Care</h4>
              <ul className="vto-footer-links">
                <li><a onClick={() => setIsRingSizerOpen(true)}>Ring Sizer Guide</a></li>
                <li><a onClick={() => showToast('Track order: 24/7 Portal')}>Track Your Order</a></li>
                <li><a onClick={() => showToast('Returns & Exchanges: 30 Days')}>Returns & Refunds</a></li>
                <li><a onClick={() => showToast('GIA & IGI Laser Inscribed')}>Certification FAQ</a></li>
                <li><a onClick={() => showToast('Private Appointments Available')}>Bespoke Atelier</a></li>
              </ul>
            </div>

            {/* Information */}
            <div className="vto-footer-col">
              <h4>Information</h4>
              <ul className="vto-footer-links">
                <li><a onClick={() => showToast('Terms of Service')}>Terms of Service</a></li>
                <li><a onClick={() => showToast('Privacy Policy')}>Privacy Policy</a></li>
                <li><a onClick={() => showToast('Shipping Policy')}>Shipping & Taxes</a></li>
                <li><a onClick={() => showToast('Ethical Sourcing')}>Conflict-Free Gems</a></li>
                <li><a onClick={() => showToast('Careers at Olight')}>Careers</a></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="vto-footer-col">
              <h4>Atelier</h4>
              <p style={{ color: '#6b7280', fontSize: 13.5, lineHeight: 1.7, margin: 0 }}>
                740 5th Avenue, Atelier 14<br />
                New York, NY 10019<br />
                Email: atelier@vt-olight.com<br />
                Tel: +1 (800) 458-GEMS
              </p>
            </div>
          </div>

          <div className="vto-footer-bottom">
            <span>© 2024 Vt Olight Fine Jewelry. All rights reserved. Powered by Shopify 2.0.</span>
            <span>Accepted Payments: Visa • Mastercard • Amex • Apple Pay • PayPal</span>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          INTERACTIVE DRAWERS & MODALS
          ========================================================================= */}

      {/* CART DRAWER */}
      {isCartOpen && (
        <div className="vto-drawer-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="vto-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="vto-drawer-header">
              <h3>Shopping Bag ({totalCartCount})</h3>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '20px 0' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7280' }}>
                  <p>Your shopping bag is empty.</p>
                  <button
                    type="button"
                    className="vto-pill-btn vto-pill-btn-gold"
                    onClick={() => {
                      setIsCartOpen(false)
                      setViewMode('catalog')
                    }}
                  >
                    Explore Jewelry
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${idx}`}
                    style={{
                      display: 'flex',
                      gap: 16,
                      paddingBottom: 16,
                      marginBottom: 16,
                      borderBottom: '1px solid #f3f4f6',
                    }}
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      style={{ width: 70, height: 70, objectFit: 'contain', background: '#fbf9f5', borderRadius: 8 }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 4px', fontSize: 14, fontWeight: 700 }}>{item.product.name}</h4>
                      <p style={{ margin: '0 0 8px', fontSize: 12, color: '#6b7280' }}>
                        {item.selectedMetal} {item.selectedRingSize ? `• ${item.selectedRingSize}` : ''}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', borderRadius: 4 }}>
                          <button
                            type="button"
                            onClick={() => updateCartQty(idx, -1)}
                            style={{ background: 'none', border: 'none', padding: '2px 8px', cursor: 'pointer' }}
                          >
                            −
                          </button>
                          <span style={{ fontSize: 12, fontWeight: 600, minWidth: 18, textAlign: 'center' }}>
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQty(idx, 1)}
                            style={{ background: 'none', border: 'none', padding: '2px 8px', cursor: 'pointer' }}
                          >
                            +
                          </button>
                        </div>
                        <span style={{ fontWeight: 700, color: '#111' }}>
                          ${(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: 20 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontSize: 16, fontWeight: 600 }}>Subtotal</span>
                  <span style={{ fontSize: 18, fontWeight: 700, color: '#111' }}>
                    ${cartSubtotal.toLocaleString()}
                  </span>
                </div>
                <button
                  type="button"
                  className="vto-pill-btn vto-pill-btn-gold"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => showToast('Proceeding to Secure 256-bit Checkout...')}
                >
                  Checkout • ${cartSubtotal.toLocaleString()}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {isQuickViewOpen && (
        <div className="vto-modal-backdrop" onClick={() => setIsQuickViewOpen(false)}>
          <div className="vto-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsQuickViewOpen(false)}
              style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer' }}
            >
              ✕
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 36 }}>
              <div style={{ background: '#fbf9f5', borderRadius: 12, padding: 30, textAlign: 'center' }}>
                <img
                  src={quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  style={{ maxWidth: '90%', maxHeight: 300, objectFit: 'contain' }}
                />
              </div>

              <div>
                <span style={{ color: '#c89e58', fontSize: 12, fontWeight: 700, textTransform: 'uppercase' }}>
                  {quickViewProduct.category}
                </span>
                <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 24, margin: '8px 0 10px', color: '#111' }}>
                  {quickViewProduct.name}
                </h2>
                <div style={{ fontSize: 22, fontWeight: 700, color: '#111', marginBottom: 14 }}>
                  ${quickViewProduct.price.toLocaleString()}
                </div>
                <p style={{ color: '#555', fontSize: 13.5, lineHeight: 1.6, marginBottom: 20 }}>
                  {quickViewProduct.description}
                </p>

                <div style={{ display: 'flex', gap: 12 }}>
                  <button
                    type="button"
                    className="vto-pill-btn vto-pill-btn-gold"
                    style={{ flex: 1, justifyContent: 'center' }}
                    onClick={() => {
                      handleAddToCart(quickViewProduct)
                      setIsQuickViewOpen(false)
                    }}
                  >
                    Add to Bag
                  </button>
                  <button
                    type="button"
                    className="vto-pill-btn vto-pill-btn-outline"
                    onClick={() => {
                      setIsQuickViewOpen(false)
                      openPdp(quickViewProduct)
                    }}
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* RING SIZER GUIDE MODAL */}
      {isRingSizerOpen && (
        <div className="vto-modal-backdrop" onClick={() => setIsRingSizerOpen(false)}>
          <div className="vto-modal-dialog" onClick={(e) => e.stopPropagation()} style={{ maxWidth: 640 }}>
            <button
              type="button"
              onClick={() => setIsRingSizerOpen(false)}
              style={{ position: 'absolute', top: 20, right: 20, background: 'none', border: 'none', fontSize: 24, cursor: 'pointer' }}
            >
              ✕
            </button>
            <h2 style={{ fontFamily: 'Cinzel, serif', fontSize: 26, margin: '0 0 10px', color: '#111' }}>
              International Ring Sizing Guide
            </h2>
            <p style={{ color: '#6b7280', fontSize: 14, margin: '0 0 24px' }}>
              For bespoke comfort, measure the inner circumference of a well-fitting band or consult our atelier sizing scale:
            </p>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13.5, textAlign: 'left' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #c89e58' }}>
                  <th style={{ padding: '8px 12px' }}>US / Canada</th>
                  <th style={{ padding: '8px 12px' }}>UK / Australia</th>
                  <th style={{ padding: '8px 12px' }}>EU / France</th>
                  <th style={{ padding: '8px 12px' }}>Inner Diameter</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { us: '5.0', uk: 'J ½', eu: '49.3', dia: '15.7 mm' },
                  { us: '5.5', uk: 'L', eu: '50.6', dia: '16.1 mm' },
                  { us: '6.0', uk: 'M', eu: '51.9', dia: '16.5 mm' },
                  { us: '6.5', uk: 'N', eu: '53.1', dia: '16.9 mm' },
                  { us: '7.0', uk: 'O', eu: '54.4', dia: '17.3 mm' },
                  { us: '7.5', uk: 'P', eu: '55.7', dia: '17.7 mm' },
                  { us: '8.0', uk: 'Q', eu: '57.0', dia: '18.1 mm' },
                ].map((row, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>{row.us}</td>
                    <td style={{ padding: '8px 12px' }}>{row.uk}</td>
                    <td style={{ padding: '8px 12px' }}>{row.eu}</td>
                    <td style={{ padding: '8px 12px', color: '#6b7280' }}>{row.dia}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default VtOlightStorefront

