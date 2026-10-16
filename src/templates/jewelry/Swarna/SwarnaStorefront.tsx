import React, { useState, useMemo } from 'react'
import type {
  SwarnaProduct,
  SwarnaCartItem,
  SwarnaStorefrontProps,
} from './types'
import {
  SWARNA_PRODUCTS,
  SWARNA_METALS,
  SWARNA_FAQS,
} from './data/swarnaData'
import swarnaLogo from './assets/swarna-logo.png'
import swarnaHeroModel from './assets/swarna-hero-model.png'
import './styles/swarna.css'

export const SwarnaStorefront: React.FC<SwarnaStorefrontProps> = ({
  device = 'desktop',
  deviceView,
  onBack: _onBack,
  onClose: _onClose,
  onUseTemplate: _onUseTemplate,
}) => {
  const effectiveDevice = deviceView || device || 'desktop'
  const isMobile = effectiveDevice === 'mobile'

  // Navigation & View Mode
  const [viewMode, setViewMode] = useState<'home' | 'catalog' | 'pdp'>('home')
  const [selectedProduct, setSelectedProduct] = useState<SwarnaProduct>(SWARNA_PRODUCTS[0])
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [activeTab, setActiveTab] = useState<string>('Earrings')

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<SwarnaCartItem[]>([
    {
      product: SWARNA_PRODUCTS[0],
      selectedMetal: SWARNA_METALS[0].name,
      selectedRingSize: 'US 6.5',
      quantity: 1,
    },
  ])
  const [wishlistIds, setWishlistIds] = useState<string[]>([SWARNA_PRODUCTS[1].id])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<SwarnaProduct>(SWARNA_PRODUCTS[0])

  // FAQ Accordion State (item 1 open by default matching screenshot)
  const [openFaqId, setOpenFaqId] = useState<string>('faq-1')

  // Search & Toast
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [visibleProductCount, setVisibleProductCount] = useState(4)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3200)
  }

  // Cart Subtotal & Count
  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0)
  }, [cartItems])

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }, [cartItems])

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

  const handleAddToCart = (product: SwarnaProduct, metal?: string, ringSize?: string, qty = 1) => {
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

  const openPdp = (product: SwarnaProduct) => {
    setSelectedProduct(product)
    setViewMode('pdp')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openQuickView = (product: SwarnaProduct, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setQuickViewProduct(product)
    setIsQuickViewOpen(true)
  }

  // Filtered Newly Launched Catalog Products
  const filteredTabProducts = useMemo(() => {
    if (activeTab === 'All') return SWARNA_PRODUCTS
    return SWARNA_PRODUCTS.filter((p) => p.category === activeTab)
  }, [activeTab])

  // Filtered Catalog by activeCategory
  const filteredCatalogProducts = useMemo(() => {
    if (activeCategory === 'All') return SWARNA_PRODUCTS
    return SWARNA_PRODUCTS.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  return (
    <div className={`swarna-root ${isMobile ? 'swarna-mobile-view is-mobile' : ''}`}>
      {/* =========================================================================
          TOP ANNOUNCEMENT BAR (MATCHING media_1792043639081_b001652e.png EXACTLY)
          ========================================================================= */}
      <div className="swarna-top-announcement">
        <div className="swarna-announcement-container">
          {/* Left: Social Media Icons */}
          <div className="swarna-top-socials">
            <a href="#facebook" className="swarna-social-link" title="Facebook" onClick={(e) => { e.preventDefault(); showToast('Swarna Facebook'); }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#instagram" className="swarna-social-link" title="Instagram" onClick={(e) => { e.preventDefault(); showToast('Swarna Instagram'); }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </a>
            <a href="#youtube" className="swarna-social-link" title="YouTube" onClick={(e) => { e.preventDefault(); showToast('Swarna YouTube'); }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
            <a href="#tiktok" className="swarna-social-link" title="TikTok" onClick={(e) => { e.preventDefault(); showToast('Swarna TikTok'); }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.85.12V9.36a6.33 6.33 0 0 0-.85-.06A6.34 6.34 0 0 0 3 15.64 6.34 6.34 0 0 0 9.34 22a6.34 6.34 0 0 0 6.34-6.34V9.05a8.2 8.2 0 0 0 4.91 1.6V7.2a4.8 4.8 0 0 1-1-.51z"/>
              </svg>
            </a>
            <a href="#twitter" className="swarna-social-link" title="X (Twitter)" onClick={(e) => { e.preventDefault(); showToast('Swarna X'); }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>

          {/* Center: Exclusive Announcement */}
          <div className="swarna-announcement-center">
            Exclusive Engagement Rings — Your Perfect Choice!{' '}
            <span
              className="swarna-announcement-link"
              onClick={() => {
                setActiveCategory('Rings')
                setViewMode('catalog')
              }}
            >
              Shop Now
            </span>
          </div>

          {/* Right: Currency Selector */}
          <div className="swarna-currency-selector" onClick={() => showToast('Region: India (₹) INR')}>
            <span>India(₹)</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </div>
        </div>
      </div>

      {/* =========================================================================
          FIXED FLOATING RIGHT SIDE TABS (COMPARE & WISHLIST)
          ========================================================================= */}
      <div className="swarna-fixed-side-tabs">
        <button
          type="button"
          className="swarna-side-tab"
          title="Compare Products"
          onClick={() => showToast('Compare: 0 items selected')}
        >
          <span className="swarna-side-tab-label">Compare</span>
          <span className="swarna-side-tab-badge">0</span>
        </button>
        <button
          type="button"
          className="swarna-side-tab"
          title="Wishlist"
          onClick={() => showToast(`Wishlist: ${wishlistIds.length} items saved`)}
        >
          <span className="swarna-side-tab-label">Wishlist</span>
          <span className="swarna-side-tab-badge">{wishlistIds.length}</span>
        </button>
      </div>

      {/* =========================================================================
          1. MAIN HEADER & NAVIGATION (AUTHENTIC SWARNA)
          ========================================================================= */}
      <header className="swarna-header">
        <div className="swarna-header-container">
          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            className="swarna-mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="swarna-burger-bar" />
            <span className="swarna-burger-bar" />
            <span className="swarna-burger-bar" />
          </button>

          {/* Left: Navigation Menu */}
          <nav className="swarna-nav-left">
            <span
              className={`swarna-nav-link ${viewMode === 'home' ? 'active' : ''}`}
              onClick={() => setViewMode('home')}
            >
              Home
            </span>
            <div
              className="swarna-nav-dropdown-item"
              onClick={() => {
                setActiveCategory('All')
                setViewMode('catalog')
              }}
            >
              <span className={`swarna-nav-link ${viewMode === 'catalog' ? 'active' : ''}`}>Shop</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
            <span
              className="swarna-nav-link"
              onClick={() => {
                const el = document.getElementById('swarna-instagram')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
                else showToast('Swarna Atelier Blog & Journal')
              }}
            >
              Blog
            </span>
            <div
              className="swarna-nav-dropdown-item"
              onClick={() => {
                const el = document.getElementById('swarna-faq')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span className="swarna-nav-link">Pages</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
            <span
              className="swarna-nav-link"
              onClick={() => showToast('Swarna Concierge: concierge@swarna-theme.myshopify.com')}
            >
              Contact
            </span>
          </nav>

          {/* Center: Swarna Logo with floral mandala mark */}
          <div className="swarna-brand-logo-wrap" onClick={() => setViewMode('home')}>
            <img
              src={swarnaLogo}
              alt="Swarna Luxury Jewelry"
              className="swarna-brand-logo-img"
            />
          </div>

          {/* Right: Header Action Controls & Special Offers Button */}
          <div className="swarna-header-actions-right">
            <button
              type="button"
              className="swarna-icon-btn"
              title="Search"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            <button
              type="button"
              className="swarna-icon-btn"
              title="Account"
              onClick={() => showToast('Welcome to Swarna VIP Privileges')}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>

            <button
              type="button"
              className="swarna-icon-btn swarna-bag-btn"
              title="Shopping Bag"
              onClick={() => setIsCartOpen(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              {totalCartCount > 0 && <span className="swarna-badge-count">{totalCartCount}</span>}
            </button>

            {/* Solid rectangular gold button: Get Special Offers */}
            <button
              type="button"
              className="swarna-special-offers-btn"
              onClick={() => {
                setViewMode('catalog')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              Get Special Offers
            </button>
          </div>
        </div>

        {/* Live Search Bar Dropdown */}
        {isSearchOpen && (
          <div className="swarna-search-dropdown-bar">
            <div className="swarna-container" style={{ display: 'flex', gap: 12 }}>
              <input
                type="text"
                placeholder="Search gold hoops, pearl drops, solitaire rings, necklaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 20px',
                  borderRadius: 4,
                  border: '1px solid #c59b5f',
                  fontSize: 14,
                  outline: 'none',
                }}
              />
              <button
                type="button"
                className="swarna-special-offers-btn"
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
        <div className="swarna-drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="swarna-mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="swarna-mobile-nav-header">
              <img src={swarnaLogo} alt="Swarna" style={{ height: '28px', objectFit: 'contain' }} />
              <button
                type="button"
                className="swarna-drawer-close"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <div className="swarna-mobile-nav-links">
              <button
                type="button"
                className={`swarna-mobile-link ${viewMode === 'home' ? 'active' : ''}`}
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
                className={`swarna-mobile-link ${viewMode === 'catalog' && activeCategory === 'All' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('All')
                  setViewMode('catalog')
                  setIsMobileMenuOpen(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <span>All Collections</span>
                <span>›</span>
              </button>
              <button
                type="button"
                className={`swarna-mobile-link ${viewMode === 'catalog' && activeCategory === 'Rings' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('Rings')
                  setViewMode('catalog')
                  setIsMobileMenuOpen(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <span>Engagement Rings</span>
                <span>›</span>
              </button>
              <button
                type="button"
                className={`swarna-mobile-link ${viewMode === 'catalog' && activeCategory === 'Earrings' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('Earrings')
                  setViewMode('catalog')
                  setIsMobileMenuOpen(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <span>Earrings</span>
                <span>›</span>
              </button>
              <button
                type="button"
                className={`swarna-mobile-link ${viewMode === 'catalog' && activeCategory === 'Necklaces' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('Necklaces')
                  setViewMode('catalog')
                  setIsMobileMenuOpen(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <span>Necklaces</span>
                <span>›</span>
              </button>
              <button
                type="button"
                className={`swarna-mobile-link ${viewMode === 'catalog' && activeCategory === 'Bracelets' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('Bracelets')
                  setViewMode('catalog')
                  setIsMobileMenuOpen(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <span>Bracelets</span>
                <span>›</span>
              </button>
              <button
                type="button"
                className="swarna-mobile-link"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  const el = document.getElementById('swarna-instagram')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                  else showToast('Swarna Atelier Blog & Journal')
                }}
              >
                <span>Journal & Blog</span>
                <span>›</span>
              </button>
              <button
                type="button"
                className="swarna-mobile-link"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  showToast('Swarna Concierge: concierge@swarna-theme.myshopify.com')
                }}
              >
                <span>Contact Concierge</span>
                <span>›</span>
              </button>
            </div>
            <div className="swarna-mobile-nav-footer">
              <div className="swarna-mobile-currency" onClick={() => showToast('Currency: India (₹) INR')}>
                <span>Currency: India (₹) INR</span>
              </div>
              <button
                type="button"
                className="swarna-mobile-vip-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  showToast('Welcome to Swarna VIP Privileges')
                }}
              >
                VIP Member Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW MODE: HOME
          ========================================================================= */}
      {viewMode === 'home' && (
        <>
          {/* 2. HERO SECTION (100% IDENTICAL REPLICA OF media_1792043639081_b001652e.png) */}
          <section className="swarna-hero-section">
            <div className="swarna-hero-container">
              <div className="swarna-hero-grid">
                {/* Left: Eyebrow, Serif Title, Desc & Know More Button */}
                <div className="swarna-hero-content">
                  <span className="swarna-hero-eyebrow">TIMELESS BEAUTY</span>
                  <h2 className="swarna-hero-title">
                    Elegance In Every Chain<br />
                    Beauty Unchained
                  </h2>
                  <p className="swarna-hero-desc">
                    Sit nec quam bibendum finibus aliquam nisi mattis.scelerisque phasellus eros feugiat malesuada placerat adipiscing fringilla.
                  </p>
                  <button
                    type="button"
                    className="swarna-know-more-btn"
                    onClick={() => {
                      setViewMode('catalog')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    <span>Know More</span>
                    <span className="swarna-arrow-circle">➔</span>
                  </button>
                </div>

                {/* Right: Indian Bridal Model with seamless background blend */}
                <div className="swarna-hero-visual">
                  <div className="swarna-hero-model-container">
                    <img
                      src={swarnaHeroModel}
                      alt="Swarna Timeless Beauty - Elegance In Every Chain"
                      className="swarna-hero-model-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 3. MARQUEE / TAGLINE BAR */}
          <section className="swarna-marquee-section">
            <div className="swarna-container">
              <span className="swarna-marquee-eyebrow">Our Collection</span>
              <h3 className="swarna-marquee-title">
                Elevate Your Style Statement With Us
              </h3>
              <div className="swarna-marquee-tags">
                <span>Gemstone Jewellery</span>
                <span className="swarna-star">✦</span>
                <span>Bridal Jewellery</span>
                <span className="swarna-star">✦</span>
                <span>Chunky Ring</span>
                <span className="swarna-star">✦</span>
                <span>Casual Jewelry</span>
                <span className="swarna-star">✦</span>
                <span>Statement Pieces</span>
                <span className="swarna-star">✦</span>
                <span>Enamel Jewelry</span>
              </div>
            </div>
          </section>

          {/* 4. YOUR STYLE OUR CREATION (3 Category Cards) */}
          <section className="swarna-categories-section">
            <div className="swarna-container">
              <div className="swarna-section-header">
                <span className="swarna-section-eyebrow">Shop By Categories</span>
                <h3 className="swarna-section-title">Your Style, Our Creation</h3>
              </div>

              <div className="swarna-three-cards-grid">
                {SWARNA_PRODUCTS.slice(0, 3).map((product) => (
                  <div
                    key={product.id}
                    className="swarna-product-card"
                    onClick={() => openPdp(product)}
                  >
                    <div className="swarna-card-thumb-wrap">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="swarna-card-thumb-img"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
                        }}
                      />
                    </div>
                    <span className="swarna-card-cat-label">{product.category}</span>
                    <h4 className="swarna-card-name">{product.name}</h4>
                    <div className="swarna-card-price">
                      ${product.price.toFixed(2)}
                      {product.compareAtPrice && (
                        <span className="swarna-card-compare-price">
                          ${product.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Progress Bar Indicator matching screenshot */}
              <div className="swarna-progress-bar-wrap">
                <div className="swarna-progress-active" />
              </div>
            </div>
          </section>

          {/* 5. DARK EDITORIAL SECTION */}
          <section className="swarna-dark-section">
            <div className="swarna-container">
              <div className="swarna-dark-grid">
                <div>
                  <span className="swarna-dark-eyebrow">✦ Atelier Collection ✦</span>
                  <h3 className="swarna-dark-title">
                    Timeless Beauty, Diamonds That Speak Elegance
                  </h3>
                  <p className="swarna-dark-desc">
                    Precision craftsmanship meets breathtaking brilliance in our signature diamond fine jewelry pieces.
                  </p>
                  <button
                    type="button"
                    className="swarna-white-btn"
                    onClick={() => {
                      setViewMode('catalog')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    Shop Now ➔
                  </button>
                </div>

                <div className="swarna-dark-visual">
                  <div className="swarna-dark-img-wrap">
                    <img
                      src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1000&auto=format&fit=crop&q=80"
                      alt="Diamonds That Speak Elegance"
                      className="swarna-dark-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 6. BRAND STORY & TRUST METRICS */}
          <section className="swarna-story-section">
            <div className="swarna-container">
              <div className="swarna-story-grid">
                <div className="swarna-story-content">
                  <span className="swarna-section-eyebrow">About Our Brand</span>
                  <h3 className="swarna-section-title" style={{ textAlign: 'left', marginBottom: 16 }}>
                    Commitment Invested In Every Sparkling Jewel
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.7 }}>
                    From ethical gemstone sourcing to master goldsmith handcrafting, every piece tells a story of enduring brilliance and timeless heritage.
                  </p>

                  <div className="swarna-counters-row">
                    <div className="swarna-counter-box">
                      <span className="swarna-counter-val">20K+</span>
                      <span className="swarna-counter-label">Satisfied Clients</span>
                    </div>
                    <div className="swarna-counter-box">
                      <span className="swarna-counter-val">100+</span>
                      <span className="swarna-counter-label">Master Artists</span>
                    </div>
                    <div className="swarna-counter-box">
                      <span className="swarna-counter-val">5M+</span>
                      <span className="swarna-counter-label">Global Exports</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="swarna-navy-btn"
                    onClick={() => showToast('Our Story: Over 25 years of royal handcrafted gold jewelry')}
                  >
                    Read More ➔
                  </button>
                </div>

                <div className="swarna-story-visual-wrap">
                  <div className="swarna-arch-frame">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                      alt="Swarna Master Jewelry"
                      className="swarna-arch-img"
                    />
                  </div>
                  <div className="swarna-floating-avatar">
                    <img
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&auto=format&fit=crop&q=80"
                      alt="Artisan Jewelry"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 7. DARK NAVY SERVICE PILLARS */}
          <section className="swarna-pillars-strip">
            <div className="swarna-container">
              <div className="swarna-pillars-grid">
                <div className="swarna-pillar-item">
                  <svg className="swarna-pillar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                  <div className="swarna-pillar-text">
                    <h4>Free Delivery</h4>
                    <p>Free worldwide express delivery on all orders over $150</p>
                  </div>
                </div>

                <div className="swarna-pillar-item">
                  <svg className="swarna-pillar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <div className="swarna-pillar-text">
                    <h4>24/7 Support</h4>
                    <p>Dedicated customer support anytime you need assistance</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 8. NEWLY LAUNCHED PRODUCTS */}
          <section className="swarna-catalog-section">
            <div className="swarna-container">
              <div className="swarna-section-header">
                <span className="swarna-section-eyebrow">Top Recommendations</span>
                <h3 className="swarna-section-title">Newly Launched Products</h3>
              </div>

              {/* Category Filter Tabs */}
              <div className="swarna-catalog-tabs">
                {['Earrings', 'Necklaces', 'Rings', 'Bracelets'].map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    className={`swarna-tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* 4-Product Catalog Grid matching screenshot */}
              <div className="swarna-catalog-grid">
                {filteredTabProducts.slice(0, visibleProductCount).map((product) => (
                  <div
                    key={product.id}
                    className="swarna-product-card"
                    onClick={() => openPdp(product)}
                  >
                    <div className="swarna-card-thumb-wrap">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="swarna-card-thumb-img"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
                        }}
                      />
                    </div>
                    <span className="swarna-card-cat-label">{product.category}</span>
                    <h4 className="swarna-card-name">{product.name}</h4>
                    <div className="swarna-card-price">
                      ${product.price.toFixed(2)}
                      {product.compareAtPrice && (
                        <span className="swarna-card-compare-price">
                          ${product.compareAtPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <div style={{ marginTop: 16, display: 'flex', gap: 8, justifyContent: 'center' }}>
                      <button
                        type="button"
                        className="swarna-gold-btn"
                        style={{ padding: '8px 16px', fontSize: 12 }}
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddToCart(product)
                        }}
                      >
                        Add to Cart ➔
                      </button>
                      <button
                        type="button"
                        className="swarna-icon-btn"
                        title="Quick View"
                        onClick={(e) => openQuickView(product, e)}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="swarna-center-action">
                <button
                  type="button"
                  className="swarna-gold-btn"
                  onClick={() => {
                    setVisibleProductCount((c) => (c >= 6 ? 4 : c + 2))
                    showToast('Loaded more fine jewelry pieces')
                  }}
                >
                  Load More Products ➔
                </button>
              </div>
            </div>
          </section>

          {/* 9. NEW RING EDITION (3-Column Editorial Cards) */}
          <section className="swarna-edition-section">
            <div className="swarna-container">
              <div className="swarna-edition-header">
                <div>
                  <span className="swarna-section-eyebrow">Exclusive Drops</span>
                  <h3 className="swarna-section-title" style={{ textAlign: 'left', margin: 0 }}>
                    New Ring Edition
                  </h3>
                </div>
                <button
                  type="button"
                  className="swarna-navy-btn"
                  onClick={() => {
                    setActiveCategory('Rings')
                    setViewMode('catalog')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  Shop Now ➔
                </button>
              </div>

              <div className="swarna-edition-grid">
                <div className="swarna-edition-card">
                  <div className="swarna-edition-img-wrap">
                    <img
                      src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80"
                      alt="Radiant Gold Bands"
                      className="swarna-edition-img"
                    />
                  </div>
                  <div className="swarna-edition-body">
                    <h4>Radiant Gold Bands</h4>
                    <p>
                      Sculpted in solid 18k gold with hand-set brilliant cut accents for effortless everyday elegance.
                    </p>
                  </div>
                </div>

                <div className="swarna-edition-card">
                  <div className="swarna-edition-img-wrap">
                    <img
                      src="https://jewels-workdo.myshopify.com/cdn/shop/files/card-img-3.png?v=1698821196"
                      alt="Heart of Gold Pendant"
                      className="swarna-edition-img"
                    />
                  </div>
                  <div className="swarna-edition-body">
                    <h4>Heart of Gold Pendant</h4>
                    <p>
                      Symbolizing eternal affection, cast in radiant yellow gold with a smooth mirror polish finish.
                    </p>
                  </div>
                </div>

                <div className="swarna-edition-card">
                  <div className="swarna-edition-img-wrap">
                    <img
                      src="https://jewels-workdo.myshopify.com/cdn/shop/files/card-img-2.png?v=1698821196"
                      alt="Brilliant Tennis Bracelet"
                      className="swarna-edition-img"
                    />
                  </div>
                  <div className="swarna-edition-body">
                    <h4>Brilliant Diamond Bracelet</h4>
                    <p>
                      A continuous river of fiery natural diamonds that sparkles seamlessly from every angle.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 10. BRAND PARTNERS BAR */}
          <section className="swarna-partners-bar">
            <div className="swarna-container">
              <div className="swarna-partners-inner">
                <span className="swarna-partner-brand">Kalyan</span>
                <span className="swarna-star">✦</span>
                <span className="swarna-partner-brand">Solitaire</span>
                <span className="swarna-star">✦</span>
                <span className="swarna-partner-brand">CaratLane</span>
                <span className="swarna-star">✦</span>
                <span className="swarna-partner-brand">Tanishq</span>
              </div>
            </div>
          </section>

          {/* 11. FREQUENTLY ASKING QUESTIONS (FAQ) */}
          <section className="swarna-faq-section" id="swarna-faq">
            <div className="swarna-container">
              <div className="swarna-faq-grid">
                <div>
                  <span className="swarna-section-eyebrow">Customer Support</span>
                  <h3 className="swarna-section-title" style={{ textAlign: 'left', marginBottom: 16 }}>
                    Frequently Asking Questions
                  </h3>
                  <p style={{ color: '#6b7280', fontSize: 15, lineHeight: 1.7 }}>
                    Find clear answers to your questions about our fine jewelry, ethical sourcing, certifications, and worldwide delivery.
                  </p>

                  <div className="swarna-faq-info-card">
                    <h4 style={{ margin: '0 0 10px 0', fontSize: 18, color: '#232838' }}>Need Direct Assistance?</h4>
                    <p>
                      Our certified gemologists and concierge specialists are available around the clock to guide your bespoke selection.
                    </p>
                    <button
                      type="button"
                      className="swarna-navy-btn"
                      onClick={() => showToast('Opening Live Chat Concierge...')}
                    >
                      Contact Us ➔
                    </button>
                  </div>
                </div>

                <div className="swarna-accordion">
                  {SWARNA_FAQS.map((faq) => {
                    const isOpen = openFaqId === faq.id
                    return (
                      <div key={faq.id} className="swarna-accordion-item">
                        <div
                          className="swarna-accordion-header"
                          onClick={() => setOpenFaqId(isOpen ? '' : faq.id)}
                        >
                          <span>{faq.question}</span>
                          <span className="swarna-accordion-icon">{isOpen ? '−' : '+'}</span>
                        </div>
                        {isOpen && <div className="swarna-accordion-body">{faq.answer}</div>}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* 12. EXPLORE THE INSTAGRAM UNIVERSE */}
          <section className="swarna-insta-section">
            <div className="swarna-container">
              <span className="swarna-section-eyebrow">Follow Us On Instagram @Swarna</span>
              <h3 className="swarna-section-title">Explore The Instagram Universe</h3>
              <p style={{ color: '#6b7280', fontSize: 14, marginTop: 8 }}>
                Discover curated styling inspirations, bridal looks, and behind-the-scenes artistry.
              </p>

              <div className="swarna-insta-grid">
                {[
                  'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80',
                  'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600&auto=format&fit=crop&q=80',
                ].map((imgSrc, i) => (
                  <div key={i} className="swarna-insta-item" onClick={() => showToast('Follow @swarna on Instagram')}>
                    <img src={imgSrc} alt={`Swarna Instagram Story ${i + 1}`} className="swarna-insta-img" />
                  </div>
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
        <section style={{ padding: '60px 0', minHeight: '60vh' }}>
          <div className="swarna-container">
            <div style={{ marginBottom: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span className="swarna-section-eyebrow">Full Collection</span>
                <h2 className="swarna-section-title" style={{ textAlign: 'left' }}>All Swarna Fine Jewelry</h2>
              </div>
              <button
                type="button"
                className="swarna-navy-btn"
                onClick={() => setViewMode('home')}
              >
                ← Back to Home
              </button>
            </div>

            <div className="swarna-catalog-grid">
              {filteredCatalogProducts.map((product) => (
                <div
                  key={product.id}
                  className="swarna-product-card"
                  onClick={() => openPdp(product)}
                >
                  <div className="swarna-card-thumb-wrap">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="swarna-card-thumb-img"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
                      }}
                    />
                  </div>
                  <span className="swarna-card-cat-label">{product.category}</span>
                  <h4 className="swarna-card-name">{product.name}</h4>
                  <div className="swarna-card-price">
                    ${product.price.toFixed(2)}
                    {product.compareAtPrice && (
                      <span className="swarna-card-compare-price">
                        ${product.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  <div style={{ marginTop: 16 }}>
                    <button
                      type="button"
                      className="swarna-gold-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleAddToCart(product)
                      }}
                    >
                      Add to Cart ➔
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          VIEW MODE: PDP (PRODUCT DETAILS PAGE)
          ========================================================================= */}
      {viewMode === 'pdp' && (
        <section style={{ padding: '60px 0', minHeight: '70vh' }}>
          <div className="swarna-container">
            <button
              type="button"
              onClick={() => setViewMode('home')}
              style={{
                background: 'none',
                border: 'none',
                color: '#b5894b',
                cursor: 'pointer',
                fontWeight: 600,
                marginBottom: 32,
                fontSize: 14,
              }}
            >
              ← Back to Overview
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 56, alignItems: 'start' }}>
              <div style={{ background: '#fbf9f6', padding: 40, borderRadius: 12, textAlign: 'center' }}>
                <img
                  src={selectedProduct.images[0]}
                  alt={selectedProduct.name}
                  style={{ maxWidth: '80%', maxHeight: 400, objectFit: 'contain' }}
                />
              </div>

              <div>
                <span className="swarna-section-eyebrow">{selectedProduct.category}</span>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, margin: '8px 0 16px 0', color: '#232838' }}>
                  {selectedProduct.name}
                </h2>
                <div style={{ fontSize: 24, fontWeight: 700, color: '#232838', marginBottom: 20 }}>
                  ${selectedProduct.price.toFixed(2)}
                  {selectedProduct.compareAtPrice && (
                    <span style={{ fontSize: 18, color: '#9ca3af', textDecoration: 'line-through', marginLeft: 12 }}>
                      ${selectedProduct.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <p style={{ color: '#4b5563', lineHeight: 1.7, marginBottom: 24 }}>
                  {selectedProduct.description}
                </p>

                {selectedProduct.details && (
                  <ul style={{ paddingLeft: 20, color: '#6b7280', fontSize: 14, marginBottom: 32, lineHeight: 1.8 }}>
                    {selectedProduct.details.map((d, idx) => (
                      <li key={idx}>{d}</li>
                    ))}
                  </ul>
                )}

                <div style={{ display: 'flex', gap: 16 }}>
                  <button
                    type="button"
                    className="swarna-gold-btn"
                    style={{ padding: '14px 32px', fontSize: 14 }}
                    onClick={() => handleAddToCart(selectedProduct)}
                  >
                    Add to Shopping Bag ➔
                  </button>
                  <button
                    type="button"
                    className="swarna-navy-btn"
                    onClick={() => toggleWishlist(selectedProduct.id)}
                  >
                    {wishlistIds.includes(selectedProduct.id) ? 'Saved in Wishlist ♡' : 'Add to Wishlist ♡'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          13. FOOTER
          ========================================================================= */}
      <footer className="swarna-footer">
        <div className="swarna-container">
          <div className="swarna-footer-grid">
            {/* Column 1: Join Today */}
            <div className="swarna-footer-col">
              <h3>Join Today</h3>
              <p style={{ color: '#9ca3af', fontSize: 14, marginBottom: 16 }}>
                Subscribe for private invitations to new fine jewelry drops and bespoke atelier previews.
              </p>
              <div className="swarna-newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="swarna-newsletter-input"
                />
                <button
                  type="button"
                  className="swarna-newsletter-btn"
                  onClick={() => showToast('Thank you for subscribing to Swarna Privileges!')}
                >
                  ➔
                </button>
              </div>
              <div style={{ fontSize: 13, color: '#9ca3af', display: 'flex', flexDirection: 'column', gap: 6 }}>
                <span>📞 +1 (800) 234-5678</span>
                <span>✉ care@swarna-jewels.com</span>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="swarna-footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home" onClick={(e) => { e.preventDefault(); setViewMode('home') }}>Home</a></li>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); showToast('Swarna Heritage established in 1998') }}>About Us</a></li>
                <li><a href="#shop" onClick={(e) => { e.preventDefault(); setViewMode('catalog') }}>Shop Collection</a></li>
                <li><a href="#faq" onClick={(e) => { e.preventDefault(); document.getElementById('swarna-faq')?.scrollIntoView({ behavior: 'smooth' }) }}>FAQs</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); showToast('Concierge: concierge@swarna-jewels.com') }}>Contact Us</a></li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="swarna-footer-col">
              <h4>Services</h4>
              <ul>
                <li><a href="#sizing" onClick={(e) => { e.preventDefault(); showToast('Complimentary Ring Sizer guide available') }}>Ring Sizing Guide</a></li>
                <li><a href="#shipping" onClick={(e) => { e.preventDefault(); showToast('Free insured delivery on orders over $150') }}>Free Insured Shipping</a></li>
                <li><a href="#returns" onClick={(e) => { e.preventDefault(); showToast('30-Day returns & exchanges guarantee') }}>30-Day Returns</a></li>
                <li><a href="#custom" onClick={(e) => { e.preventDefault(); showToast('Bespoke engraving available on request') }}>Custom Engraving</a></li>
                <li><a href="#certificates" onClick={(e) => { e.preventDefault(); showToast('GIA & IGI Certified Diamonds') }}>Diamond Certificates</a></li>
              </ul>
            </div>

            {/* Column 4: Brand */}
            <div className="swarna-footer-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c59b5f" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
                <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, fontWeight: 700, letterSpacing: 2, color: '#fff' }}>
                  SWARNA
                </span>
              </div>
              <p style={{ color: '#9ca3af', fontSize: 13, lineHeight: 1.7, marginBottom: 20 }}>
                Crafting timeless heirloom jewelry since 1998. Designed with passion, worn with pride.
              </p>
              <div style={{ display: 'flex', gap: 14 }}>
                {['Instagram', 'Facebook', 'Pinterest', 'Twitter'].map((s) => (
                  <span
                    key={s}
                    style={{ color: '#9ca3af', cursor: 'pointer', fontSize: 13 }}
                    onClick={() => showToast(`Opening ${s}...`)}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="swarna-subfooter">
            <span>© 2026 Swarna Jewelry Theme. All rights reserved.</span>
            <div className="swarna-payments-row">
              <span style={{ padding: '2px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: 3, fontSize: 11 }}>VISA</span>
              <span style={{ padding: '2px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: 3, fontSize: 11 }}>MC</span>
              <span style={{ padding: '2px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: 3, fontSize: 11 }}>AMEX</span>
              <span style={{ padding: '2px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: 3, fontSize: 11 }}>PAYPAL</span>
              <span style={{ padding: '2px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: 3, fontSize: 11 }}>APPLE PAY</span>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          SLIDE-OUT SHOPPING BAG DRAWER
          ========================================================================= */}
      {isCartOpen && (
        <div className="swarna-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="swarna-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="swarna-drawer-header">
              <h3 style={{ margin: 0, fontFamily: 'Cormorant Garamond, serif', fontSize: 22, color: '#232838' }}>
                Shopping Bag ({totalCartCount})
              </h3>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer', color: '#6b7280' }}
              >
                ✕
              </button>
            </div>

            <div className="swarna-drawer-body">
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#9ca3af' }}>
                  <p>Your shopping bag is empty.</p>
                  <button
                    type="button"
                    className="swarna-gold-btn"
                    onClick={() => {
                      setIsCartOpen(false)
                      setViewMode('catalog')
                    }}
                  >
                    Browse Fine Jewelry
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
                      style={{ width: 70, height: 70, objectFit: 'contain', background: '#faf7f2', borderRadius: 4 }}
                    />
                    <div style={{ flex: 1 }}>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: 15, color: '#232838' }}>{item.product.name}</h4>
                      <div style={{ fontSize: 12, color: '#6b7280', marginBottom: 8 }}>
                        {item.selectedMetal} • {item.selectedRingSize}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <button
                            type="button"
                            onClick={() => updateCartQty(idx, -1)}
                            style={{ width: 24, height: 24, borderRadius: 2, border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer' }}
                          >
                            −
                          </button>
                          <span style={{ fontSize: 13, fontWeight: 600 }}>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateCartQty(idx, 1)}
                            style={{ width: 24, height: 24, borderRadius: 2, border: '1px solid #d1d5db', background: '#fff', cursor: 'pointer' }}
                          >
                            +
                          </button>
                        </div>
                        <span style={{ fontWeight: 600, color: '#232838' }}>
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="swarna-drawer-footer">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16, fontSize: 16, fontWeight: 700, color: '#232838' }}>
                  <span>Subtotal</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <button
                  type="button"
                  className="swarna-gold-btn"
                  style={{ width: '100%', justifyContent: 'center', padding: '14px 0' }}
                  onClick={() => {
                    showToast('Proceeding to Secure Checkout...')
                    setTimeout(() => setIsCartOpen(false), 1200)
                  }}
                >
                  Checkout Now ➔
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          QUICK VIEW MODAL
          ========================================================================= */}
      {isQuickViewOpen && (
        <div className="swarna-drawer-overlay" onClick={() => setIsQuickViewOpen(false)}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: 8,
              maxWidth: 700,
              width: '90%',
              margin: 'auto',
              padding: 32,
              position: 'relative',
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsQuickViewOpen(false)}
              style={{
                position: 'absolute',
                top: 16,
                right: 16,
                background: 'none',
                border: 'none',
                fontSize: 22,
                cursor: 'pointer',
                color: '#6b7280',
              }}
            >
              ✕
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'center' }}>
              <div style={{ background: '#fbf9f6', padding: 24, borderRadius: 8, textAlign: 'center' }}>
                <img
                  src={quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  style={{ maxWidth: '90%', maxHeight: 260, objectFit: 'contain' }}
                />
              </div>

              <div>
                <span className="swarna-card-cat-label">{quickViewProduct.category}</span>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 24, margin: '6px 0 12px 0', color: '#232838' }}>
                  {quickViewProduct.name}
                </h3>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#232838', marginBottom: 16 }}>
                  ${quickViewProduct.price.toFixed(2)}
                </div>
                <p style={{ fontSize: 13, color: '#4b5563', lineHeight: 1.6, marginBottom: 20 }}>
                  {quickViewProduct.description}
                </p>
                <button
                  type="button"
                  className="swarna-gold-btn"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => {
                    handleAddToCart(quickViewProduct)
                    setIsQuickViewOpen(false)
                  }}
                >
                  Add to Cart ➔
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TOAST NOTIFICATION */}
      {toastMessage && <div className="swarna-toast">{toastMessage}</div>}
    </div>
  )
}

export default SwarnaStorefront
