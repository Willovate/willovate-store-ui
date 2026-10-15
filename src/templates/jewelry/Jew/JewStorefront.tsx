import React, { useState, useEffect, useMemo } from 'react'
import type { JewProduct, JewCartItem, JewStorefrontProps } from './types'
import {
  JEW_PRODUCTS,
  JEW_CATEGORIES,
  JEW_SERVICE_PILLARS,
  JEW_HERO_SLIDES,
  JEW_BLOG_POSTS,
  goldenGraceBanner,
  weddingRingsBanner,
} from './data/jewData'
import './styles/jew.css'

export const JewStorefront: React.FC<JewStorefrontProps> = () => {
  // View Mode: 'home' | 'catalog' | 'pdp'
  const [viewMode, setViewMode] = useState<'home' | 'catalog' | 'pdp'>('home')
  const [selectedProduct, setSelectedProduct] = useState<JewProduct>(JEW_PRODUCTS[0])
  const [activeCategory, setActiveCategory] = useState<string>('All')

  // Scroll to start/top on mount and view mode changes
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    const rootEl = document.querySelector('.jew-root')
    if (rootEl) {
      rootEl.scrollTop = 0
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [viewMode])

  // Hero Slider Auto-Scroll State
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  // Carousel 1: Shop By Collections auto-scroll index
  const [collectionsIndex, setCollectionsIndex] = useState(0)

  // Authentic product showcases matching user screenshots
  const goldenGraceProducts = useMemo(() => [
    JEW_PRODUCTS[0], // Leaf Earings
    JEW_PRODUCTS[1], // Gold Pendant (Sold Out)
    JEW_PRODUCTS[2], // Center Clip
  ], [])

  const weddingSectionProducts = useMemo(() => [
    JEW_PRODUCTS[3], // Opulence Necklace
    JEW_PRODUCTS[0], // Leaf Earings
    JEW_PRODUCTS[1], // Gold Pendant (Sold Out)
  ], [])

  // Cart & Wishlist State
  const [cartItems, setCartItems] = useState<JewCartItem[]>([
    {
      product: JEW_PRODUCTS[0],
      selectedMetal: '22K Yellow Gold',
      quantity: 1,
    },
  ])
  const [wishlistIds, setWishlistIds] = useState<string[]>([JEW_PRODUCTS[1].id])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<JewProduct>(JEW_PRODUCTS[0])

  // Search & Toast
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Auto-scroll Hero Slider every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % JEW_HERO_SLIDES.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  // Auto-scroll Shop by Collections every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCollectionsIndex((prev) => (prev + 1) % 5)
    }, 4000)
    return () => clearInterval(timer)
  }, [])

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

  const handleAddToCart = (product: JewProduct, metal?: string, qty = 1) => {
    const chosenMetal = metal || (product.metals ? product.metals[0] : '22K Gold')
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.product.id === product.id && i.selectedMetal === chosenMetal
      )
      if (idx > -1) {
        const next = [...prev]
        next[idx].quantity += qty
        return next
      }
      return [...prev, { product, selectedMetal: chosenMetal, quantity: qty }]
    })
    setIsCartOpen(true)
    showToast(`Added ${product.name} to Shopping Cart`)
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

  const openPdp = (product: JewProduct) => {
    setSelectedProduct(product)
    setViewMode('pdp')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openQuickView = (product: JewProduct, e?: React.MouseEvent) => {
    e?.stopPropagation()
    setQuickViewProduct(product)
    setIsQuickViewOpen(true)
  }

  const filteredCatalogProducts = useMemo(() => {
    if (activeCategory === 'All') return JEW_PRODUCTS
    return JEW_PRODUCTS.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentSlide = JEW_HERO_SLIDES[currentSlideIndex]

  return (
    <div className="jew-root">
      {/* =========================================================================
          1. TOP ANNOUNCEMENT STRIP (BURGUNDY #7d282b)
          ========================================================================= */}
      <div className="jew-top-bar">
        <div className="jew-container jew-top-bar-inner">
          <div className="jew-top-announcement">
            Festive Sale ! Buy 2, Get 15% off. Use code: COMBO15
          </div>
          <div className="jew-top-right-actions">
            <button
              type="button"
              className="jew-top-select-btn"
              onClick={() => showToast('Country selected: India (IN)')}
            >
              <span>IN</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            <button
              type="button"
              className="jew-top-select-btn"
              onClick={() => showToast('Language: English (US)')}
            >
              <span>English</span>
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </button>
            <div className="jew-top-auth-links">
              <span className="jew-top-auth-link" onClick={() => showToast('Log In to your JEW VIP Account')}>
                Log in
              </span>
              <span> / </span>
              <span className="jew-top-auth-link" onClick={() => showToast('Create a new JEW Account')}>
                Sign Up
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. MAIN HEADER (WHITE WITH JEW WORDMARK)
          ========================================================================= */}
      <header className="jew-header">
        <div className="jew-container jew-header-inner">
          {/* Left Navigation */}
          <nav className="jew-nav-left">
            <span
              className={`jew-nav-link ${viewMode === 'home' ? 'active' : ''}`}
              onClick={() => {
                setViewMode('home')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              Home
            </span>
            <div
              className="jew-nav-item"
              onClick={() => {
                setActiveCategory('All')
                setViewMode('catalog')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <span className={`jew-nav-link ${viewMode === 'catalog' ? 'active' : ''}`}>Shop</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
            <span
              className="jew-nav-link"
              onClick={() => {
                const el = document.getElementById('jew-blog')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
                else showToast('JEW Editorial Journal')
              }}
            >
              Blog
            </span>
            <span
              className="jew-nav-link"
              onClick={() => showToast('Concierge: concierge@jew-theme.myshopify.com')}
            >
              Contact
            </span>
            <div
              className="jew-nav-item"
              onClick={() => {
                const el = document.getElementById('jew-categories')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span className="jew-nav-link">Pages</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6"/>
              </svg>
            </div>
          </nav>

          {/* Center Brand Logo: JEW */}
          <div
            className="jew-logo-center"
            onClick={() => {
              setViewMode('home')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <h1 className="jew-logo-text">JEW</h1>
          </div>

          {/* Right Actions: Search, Cart, Log in */}
          <div className="jew-actions-right">
            <button
              type="button"
              className="jew-action-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <span>Search</span>
            </button>

            <button
              type="button"
              className="jew-action-btn"
              onClick={() => setIsCartOpen(true)}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1"/>
                <circle cx="20" cy="21" r="1"/>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
              </svg>
              <span>Cart</span>
              {totalCartCount > 0 && <span className="jew-cart-count">{totalCartCount}</span>}
            </button>

            <button
              type="button"
              className="jew-action-btn"
              onClick={() => showToast('VIP Member Sign-in')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
              </svg>
              <span>Log in</span>
            </button>
          </div>
        </div>

        {/* Live Search Bar */}
        {isSearchOpen && (
          <div className="jew-search-bar">
            <div className="jew-container" style={{ display: 'flex', gap: 12 }}>
              <input
                type="text"
                placeholder="Search leaf earrings, gold pendants, couple rings, necklaces..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  borderRadius: 2,
                  border: '1px solid #7d282b',
                  fontSize: 14,
                  outline: 'none',
                }}
              />
              <button
                type="button"
                className="jew-hero-btn"
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

      {/* =========================================================================
          VIEW MODE: HOME
          ========================================================================= */}
      {viewMode === 'home' && (
        <>
          {/* 3. HERO SLIDER SECTION (AUTO-SCROLLING AS REQUESTED) */}
          <section className="jew-hero-section">
            <div
              className="jew-hero-slide"
              style={{
                backgroundImage: `url(${currentSlide.image})`,
              }}
            >
              <div className="jew-container">
                <div className="jew-hero-overlay-content">
                  <div className="jew-hero-badge">
                    <span>✦</span>
                    <span>{currentSlide.badge}</span>
                  </div>
                  <h2 className="jew-hero-title">
                    {currentSlide.title1}<br />
                    {currentSlide.title2}
                  </h2>
                  <p className="jew-hero-subtitle">
                    {currentSlide.subtitle}
                  </p>
                  <button
                    type="button"
                    className="jew-hero-btn"
                    onClick={() => {
                      setViewMode('catalog')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    {currentSlide.buttonText}
                  </button>
                </div>
              </div>

              {/* Slider Dots */}
              <div className="jew-hero-slide-nav">
                {JEW_HERO_SLIDES.map((_, idx) => (
                  <span
                    key={idx}
                    className={`jew-hero-dot ${currentSlideIndex === idx ? 'active' : ''}`}
                    onClick={() => setCurrentSlideIndex(idx)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* 4. FOUR SERVICE HIGHLIGHT CARDS (DIAMOND ICONS) */}
          <section className="jew-services-section">
            <div className="jew-container">
              <div className="jew-services-grid">
                {JEW_SERVICE_PILLARS.map((srv) => (
                  <div key={srv.id} className="jew-service-card">
                    <div className="jew-diamond-icon-wrap">
                      <div className="jew-diamond-icon-inner">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 2 7 12 12 22 7 12 2"/>
                          <polyline points="2 17 12 22 22 17"/>
                          <polyline points="2 12 12 17 22 12"/>
                        </svg>
                      </div>
                    </div>
                    <div>
                      <h4 className="jew-service-title">{srv.title}</h4>
                      <p className="jew-service-subtitle">{srv.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 5. SHOP BY CATEGORY (3 CARDS) */}
          <section id="jew-categories" className="jew-category-section">
            <div className="jew-container">
              <h3 className="jew-section-title">Shop by Category</h3>
              <div className="jew-three-categories-grid">
                {JEW_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className="jew-category-card"
                    onClick={() => {
                      setActiveCategory(cat.name)
                      setViewMode('catalog')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    <div className="jew-category-img-wrap">
                      <img src={cat.image} alt={cat.name} className="jew-category-img" />
                    </div>
                    <h4 className="jew-category-name">{cat.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 6. SHOP BY COLLECTIONS (AUTO-SCROLLING CAROUSEL WITH DIAMOND DOTS) */}
          <section className="jew-collections-section">
            <div className="jew-container">
              <h3 className="jew-section-title">Shop by Collections</h3>

              {/* Diamond Carousel Dots */}
              <div className="jew-carousel-indicators">
                {[0, 1, 2, 3, 4].map((dotIdx) => (
                  <span
                    key={dotIdx}
                    className={`jew-diamond-dot ${collectionsIndex === dotIdx ? 'active' : ''}`}
                    onClick={() => setCollectionsIndex(dotIdx)}
                  />
                ))}
              </div>

              {/* Products Track */}
              <div className="jew-products-carousel-wrap">
                <div className="jew-products-track">
                  {JEW_PRODUCTS.slice(0, 4).map((product) => (
                    <div
                      key={product.id}
                      className="jew-product-card"
                      onClick={() => openPdp(product)}
                    >
                      {product.isSoldOut && (
                        <span className="jew-sold-out-badge">Sold Out</span>
                      )}

                      {/* Hover action buttons on right */}
                      <div className="jew-hover-actions">
                        <button
                          type="button"
                          className="jew-hover-action-btn"
                          title="Compare"
                          onClick={(e) => {
                            e.stopPropagation()
                            showToast(`Compared: ${product.name}`)
                          }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="23 4 23 10 17 10"/>
                            <polyline points="1 20 1 14 7 14"/>
                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="jew-hover-action-btn"
                          title="Quick View"
                          onClick={(e) => openQuickView(product, e)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="jew-hover-action-btn"
                          title="Wishlist"
                          onClick={(e) => toggleWishlist(product.id, e)}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill={wishlistIds.includes(product.id) ? '#ffffff' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                          </svg>
                        </button>
                      </div>

                      <div className="jew-product-img-wrap">
                        <img src={product.image} alt={product.name} className="jew-product-img" />
                      </div>

                      <span className="jew-product-brand">{product.brand}</span>
                      <h4 className="jew-product-name">{product.name}</h4>
                      <div className="jew-product-price">
                        Rs. {product.price.toLocaleString('en-IN')}.00
                      </div>
                      <div className="jew-stars-wrap">★★★★★</div>
                      <button
                        type="button"
                        className="jew-shop-now-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddToCart(product)
                        }}
                      >
                        Shop Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* 7. PROMOTIONAL HOLLYWOOD BANNER (25% OFF) */}
          <section className="jew-promo-banner-section">
            <div className="jew-container">
              <div className="jew-promo-banner">
                <div className="jew-promo-content">
                  <span className="jew-promo-badge">25% OFF</span>
                  <h3 className="jew-promo-title">HOLLYWOOD COLLECTION</h3>
                  <p className="jew-promo-desc">
                    Curated fine 18K solid gold layered choker necklaces and delicate drop pendants worn by international style icons.
                  </p>
                  <button
                    type="button"
                    className="jew-hero-btn"
                    onClick={() => {
                      setViewMode('catalog')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    Shop Now
                  </button>
                </div>
                <div style={{ maxWidth: '420px', borderRadius: 4, overflow: 'hidden' }}>
                  <img
                    src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80"
                    alt="Hollywood Collection Jewels"
                    style={{ width: '100%', height: 'auto', display: 'block' }}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 8. GIFTS FOR HIM & GIFTS FOR HER */}
          <section className="jew-gifting-dual-section">
            <div className="jew-container">
              <div className="jew-gifting-dual-grid">
                <div
                  className="jew-gifting-card"
                  onClick={() => {
                    setActiveCategory('All')
                    setViewMode('catalog')
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80"
                    alt="Gifts for Him"
                    className="jew-gifting-img"
                  />
                  <div className="jew-gifting-ribbon him">
                    <span className="jew-gifting-ribbon-text">GIFTS FOR HIM</span>
                  </div>
                </div>

                <div
                  className="jew-gifting-card"
                  onClick={() => {
                    setActiveCategory('All')
                    setViewMode('catalog')
                  }}
                >
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
                    alt="Gifts for Her"
                    className="jew-gifting-img"
                  />
                  <div className="jew-gifting-ribbon her">
                    <span className="jew-gifting-ribbon-text">GIFTS FOR HER</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 9. THE PERFECT GIFTING: GOLDEN GRACE SELECTION (4 EQUAL COLUMNS) */}
          <section className="jew-split-selection-section">
            <div className="jew-container">
              <div className="jew-quad-grid">
                {/* Col 1: Slate Bangles Banner Image */}
                <div className="jew-quad-banner-card">
                  <img
                    src={goldenGraceBanner}
                    alt="The Perfect Gifting: Golden Grace Selection"
                    className="jew-quad-banner-img"
                  />
                </div>

                {/* Col 2, 3, 4: The 3 Products (Leaf Earings, Gold Pendant, Center Clip) */}
                {goldenGraceProducts.map((product) => (
                  <div
                    key={`grace-${product.id}`}
                    className="jew-product-card"
                    onClick={() => openPdp(product)}
                  >
                    <div className="jew-product-img-wrap">
                      {product.isSoldOut && (
                        <span className="jew-sold-out-badge">Sold Out</span>
                      )}

                      <div className="jew-hover-actions">
                        <button
                          type="button"
                          className="jew-hover-action-btn"
                          title="Compare"
                          onClick={(e) => {
                            e.stopPropagation()
                            showToast('Added to comparison')
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="jew-hover-action-btn"
                          title="Quick View"
                          onClick={(e) => openQuickView(product, e)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="jew-hover-action-btn"
                          title="Wishlist"
                          onClick={(e) => toggleWishlist(product.id, e)}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill={wishlistIds.includes(product.id) ? '#ffffff' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                          </svg>
                        </button>
                      </div>

                      <img src={product.image} alt={product.name} className="jew-product-img" />
                    </div>

                    <span className="jew-product-brand">{product.brand}</span>
                    <h4 className="jew-product-name">{product.name}</h4>
                    <div className="jew-product-price">
                      Rs. {product.price.toLocaleString('en-IN')}.00
                    </div>
                    <div className="jew-stars-wrap">★★★★★</div>
                    <div className="jew-shop-now-wrap">
                      <button
                        type="button"
                        className="jew-shop-now-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddToCart(product)
                        }}
                      >
                        Shop Now
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 10. MATCHING COUPLE: WEDDING RINGS SELECTION (4 EQUAL COLUMNS) */}
          <section className="jew-split-selection-section" style={{ background: '#fbf9f7' }}>
            <div className="jew-container">
              <div className="jew-quad-grid">
                {/* Col 1, 2, 3: The 3 Products (Opulence Necklace, Leaf Earings, Gold Pendant) */}
                {weddingSectionProducts.map((product) => (
                  <div
                    key={`wed-${product.id}`}
                    className="jew-product-card"
                    onClick={() => openPdp(product)}
                  >
                    <div className="jew-product-img-wrap">
                      {product.isSoldOut && (
                        <span className="jew-sold-out-badge">Sold Out</span>
                      )}

                      <div className="jew-hover-actions">
                        <button
                          type="button"
                          className="jew-hover-action-btn"
                          title="Compare"
                          onClick={(e) => {
                            e.stopPropagation()
                            showToast('Added to comparison')
                          }}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67"/>
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="jew-hover-action-btn"
                          title="Quick View"
                          onClick={(e) => openQuickView(product, e)}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                        <button
                          type="button"
                          className="jew-hover-action-btn"
                          title="Wishlist"
                          onClick={(e) => toggleWishlist(product.id, e)}
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill={wishlistIds.includes(product.id) ? '#ffffff' : 'none'}
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
                          </svg>
                        </button>
                      </div>

                      <div className="jew-product-img-wrap">
                        <img src={product.image} alt={product.name} className="jew-product-img" />
                      </div>
                    </div>

                    <span className="jew-product-brand">{product.brand}</span>
                    <h4 className="jew-product-name">{product.name}</h4>
                    <div className="jew-product-price">
                      Rs. {product.price.toLocaleString('en-IN')}.00
                    </div>
                    <div className="jew-stars-wrap">★★★★★</div>
                    <div className="jew-shop-now-wrap">
                      <button
                        type="button"
                        className="jew-shop-now-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddToCart(product)
                        }}
                      >
                        Shop Now
                      </button>
                    </div>
                  </div>
                ))}

                {/* Col 4: Wedding Rings Banner Image */}
                <div className="jew-quad-banner-card">
                  <img
                    src={weddingRingsBanner}
                    alt="Matching Couple: Wedding Rings"
                    className="jew-quad-banner-img"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 11. CLIENT TESTIMONIAL QUOTE */}
          <section className="jew-testimonial-section">
            <div className="jew-container">
              <div className="jew-stars-wrap" style={{ fontSize: '18px', marginBottom: '16px' }}>
                ★★★★★
              </div>
              <blockquote className="jew-testimonial-quote">
                “The featherweight gold collection from JEW is breathtakingly delicate yet remarkably resilient. The craftsmanship and finish are unlike anything else I own.”
              </blockquote>
              <div className="jew-testimonial-author">
                — Jessica Alba, Verified Connoisseur
              </div>
            </div>
          </section>

          {/* 12. LATEST NEWS & FROM OUR BLOG (4 CARDS) */}
          <section id="jew-blog" className="jew-blog-section">
            <div className="jew-container">
              <h3 className="jew-section-title">Latest News & Blogs</h3>
              <div className="jew-blog-grid">
                {JEW_BLOG_POSTS.map((blog) => (
                  <div key={blog.id} className="jew-blog-card">
                    <div className="jew-blog-img-wrap">
                      <img src={blog.image} alt={blog.title} className="jew-blog-img" />
                    </div>
                    <div className="jew-blog-body">
                      <span className="jew-blog-date">{blog.date}</span>
                      <h4 className="jew-blog-title">{blog.title}</h4>
                      <p className="jew-blog-excerpt">{blog.excerpt}</p>
                      <button
                        type="button"
                        className="jew-blog-btn"
                        onClick={() => showToast(`Opening article: ${blog.title}`)}
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 13. INSTAGRAM GALLERY (5 TILES) */}
          <section className="jew-instagram-section">
            <div className="jew-insta-tile">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=600&auto=format&fit=crop&q=80"
                alt="Instagram 1"
                className="jew-insta-img"
              />
            </div>
            <div className="jew-insta-tile">
              <img
                src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&auto=format&fit=crop&q=80"
                alt="Instagram 2"
                className="jew-insta-img"
              />
            </div>
            <div className="jew-insta-tile jew-insta-center-card">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              <h4 className="jew-insta-center-title">
                FOLLOW US<br />ON INSTAGRAM
              </h4>
            </div>
            <div className="jew-insta-tile">
              <img
                src="https://images.unsplash.com/photo-1611591475155-4284ec289e61?w=600&auto=format&fit=crop&q=80"
                alt="Instagram 3"
                className="jew-insta-img"
              />
            </div>
            <div className="jew-insta-tile">
              <img
                src="https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&auto=format&fit=crop&q=80"
                alt="Instagram 4"
                className="jew-insta-img"
              />
            </div>
          </section>

          {/* 14. VIP NEWSLETTER STRIP */}
          <section className="jew-newsletter-section">
            <div className="jew-container">
              <div className="jew-newsletter-logo">JEW</div>
              <h4 className="jew-newsletter-title">JOIN OUR VIP PRIVILEGE CLUB</h4>
              <p className="jew-newsletter-desc">
                Subscribe to receive 15% off your next fine jewelry acquisition & private salon previews.
              </p>
              <form
                className="jew-newsletter-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  showToast('Thank you for subscribing to JEW VIP Club!')
                }}
              >
                <input
                  type="email"
                  placeholder="Enter your email address..."
                  required
                  className="jew-newsletter-input"
                />
                <button type="submit" className="jew-newsletter-submit">
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </section>
        </>
      )}

      {/* =========================================================================
          VIEW MODE: CATALOG
          ========================================================================= */}
      {viewMode === 'catalog' && (
        <section style={{ padding: '60px 0', background: '#f6f3f0', minHeight: '600px' }}>
          <div className="jew-container">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#7d282b', fontWeight: 600, letterSpacing: '1px' }}>
                  COLLECTIONS
                </span>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', color: '#111', margin: '4px 0 0' }}>
                  {activeCategory === 'All' ? 'All Jewelry Collections' : activeCategory}
                </h2>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['All', 'Earrings', 'Wedding Collection', 'Necklaces', 'Bracelets'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      background: activeCategory === cat ? '#7d282b' : '#ffffff',
                      color: activeCategory === cat ? '#ffffff' : '#222',
                      border: '1px solid #ddd',
                      padding: '8px 16px',
                      borderRadius: '2px',
                      fontSize: '12px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
              {filteredCatalogProducts.map((product) => (
                <div
                  key={product.id}
                  className="jew-product-card"
                  onClick={() => openPdp(product)}
                >
                  {product.isSoldOut && (
                    <span className="jew-sold-out-badge">Sold Out</span>
                  )}
                  <div className="jew-product-img-wrap">
                    <img src={product.image} alt={product.name} className="jew-product-img" />
                  </div>
                  <span className="jew-product-brand">{product.brand}</span>
                  <h4 className="jew-product-name">{product.name}</h4>
                  <div className="jew-product-price">
                    Rs. {product.price.toLocaleString('en-IN')}.00
                  </div>
                  <div className="jew-stars-wrap">★★★★★</div>
                  <button
                    type="button"
                    className="jew-shop-now-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(product)
                    }}
                  >
                    Shop Now
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          VIEW MODE: PDP (PRODUCT DETAIL VIEW)
          ========================================================================= */}
      {viewMode === 'pdp' && (
        <section style={{ padding: '60px 0', background: '#ffffff', minHeight: '600px' }}>
          <div className="jew-container">
            <button
              type="button"
              onClick={() => setViewMode('home')}
              style={{
                background: 'none',
                border: 'none',
                color: '#7d282b',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                marginBottom: '24px',
                padding: 0,
              }}
            >
              ← Back to Collection
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
              <div style={{ background: '#f8f5f2', padding: '40px', borderRadius: '4px', textAlign: 'center' }}>
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  style={{ maxWidth: '100%', maxHeight: '440px', objectFit: 'contain' }}
                />
              </div>

              <div>
                <span style={{ fontSize: '12px', color: '#7d282b', fontWeight: 600, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  {selectedProduct.brand} • {selectedProduct.category}
                </span>
                <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '42px', color: '#111', margin: '8px 0 12px' }}>
                  {selectedProduct.name}
                </h2>
                <div style={{ fontSize: '24px', fontWeight: 600, color: '#7d282b', marginBottom: '16px' }}>
                  Rs. {selectedProduct.price.toLocaleString('en-IN')}.00
                </div>
                <div className="jew-stars-wrap" style={{ marginBottom: '20px' }}>★★★★★ ({selectedProduct.reviewCount} customer reviews)</div>
                <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#555', marginBottom: '28px' }}>
                  {selectedProduct.description}
                </p>

                {selectedProduct.metals && (
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '8px', color: '#222' }}>
                      METAL SELECTION:
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {selectedProduct.metals.map((m, idx) => (
                        <button
                          key={m}
                          type="button"
                          style={{
                            background: idx === 0 ? '#7d282b' : '#ffffff',
                            color: idx === 0 ? '#ffffff' : '#333',
                            border: '1px solid #7d282b',
                            padding: '8px 14px',
                            fontSize: '12px',
                            fontWeight: 600,
                            borderRadius: '2px',
                            cursor: 'pointer',
                          }}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '16px' }}>
                  <button
                    type="button"
                    className="jew-hero-btn"
                    style={{ flex: 1, padding: '14px 28px' }}
                    onClick={() => handleAddToCart(selectedProduct)}
                  >
                    Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={(e) => toggleWishlist(selectedProduct.id, e)}
                    style={{
                      background: '#ffffff',
                      border: '1px solid #7d282b',
                      color: '#7d282b',
                      padding: '14px 20px',
                      borderRadius: '2px',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    {wishlistIds.includes(selectedProduct.id) ? '♥ Saved' : '♡ Wishlist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================================
          15. FOOTER
          ========================================================================= */}
      <footer className="jew-footer">
        <div className="jew-container">
          <div className="jew-footer-grid">
            <div>
              <h4 className="jew-footer-col-title">CONTACT US</h4>
              <ul className="jew-footer-links">
                <li className="jew-footer-link">JEW Fine Jewels Atelier</li>
                <li className="jew-footer-link">742 Evergreen Terrace, Mumbai, India</li>
                <li className="jew-footer-link">Phone: +91 98200 12345</li>
                <li className="jew-footer-link">Email: contact@jew-theme.myshopify.com</li>
                <li className="jew-footer-link">Mon - Sat: 10:00 AM - 8:00 PM</li>
              </ul>
            </div>

            <div>
              <h4 className="jew-footer-col-title">QUICK LINKS</h4>
              <ul className="jew-footer-links">
                <li className="jew-footer-link" onClick={() => setIsSearchOpen(true)}>Search</li>
                <li className="jew-footer-link" onClick={() => showToast('About JEW Luxury Story')}>About Us</li>
                <li className="jew-footer-link" onClick={() => showToast('Privacy Policy')}>Privacy Policy</li>
                <li className="jew-footer-link" onClick={() => showToast('Shipping Policy')}>Shipping Policy</li>
                <li className="jew-footer-link" onClick={() => showToast('Terms of Service')}>Terms of Service</li>
              </ul>
            </div>

            <div>
              <h4 className="jew-footer-col-title">CATEGORIES</h4>
              <ul className="jew-footer-links">
                {JEW_CATEGORIES.map((cat) => (
                  <li
                    key={cat.id}
                    className="jew-footer-link"
                    onClick={() => {
                      setActiveCategory(cat.name)
                      setViewMode('catalog')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    {cat.name}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="jew-footer-col-title">CUSTOMER CARE</h4>
              <ul className="jew-footer-links">
                <li className="jew-footer-link" onClick={() => showToast('International Ring Sizer Guide')}>Ring Sizer Guide</li>
                <li className="jew-footer-link" onClick={() => showToast('Order Tracking System')}>Track Order</li>
                <li className="jew-footer-link" onClick={() => showToast('Returns & Exchange Helpdesk')}>Returns & Exchanges</li>
                <li className="jew-footer-link" onClick={() => showToast('Jewelry Care Guide')}>Jewelry Care</li>
                <li className="jew-footer-link" onClick={() => showToast('Contact Master Gemologist')}>Ask a Gemologist</li>
              </ul>
            </div>
          </div>

          <div className="jew-footer-bottom">
            <div>
              © 2026, JEW Theme. Powered by Shopify. Replicated with 100% fidelity.
            </div>
            <div className="jew-payment-badges">
              <span style={{ padding: '2px 8px', background: '#f4f4f4', borderRadius: '3px', fontWeight: 600 }}>VISA</span>
              <span style={{ padding: '2px 8px', background: '#f4f4f4', borderRadius: '3px', fontWeight: 600 }}>MC</span>
              <span style={{ padding: '2px 8px', background: '#f4f4f4', borderRadius: '3px', fontWeight: 600 }}>AMEX</span>
              <span style={{ padding: '2px 8px', background: '#f4f4f4', borderRadius: '3px', fontWeight: 600 }}>PAYPAL</span>
              <span style={{ padding: '2px 8px', background: '#f4f4f4', borderRadius: '3px', fontWeight: 600 }}>UPI</span>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          16. FLOATING BACK TO TOP BUTTON (BLACK CIRCLE WITH ARROW)
          ========================================================================= */}
      <button
        type="button"
        className="jew-back-to-top"
        title="Scroll to Top"
        onClick={scrollToTop}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <line x1="12" y1="19" x2="12" y2="5"/>
          <polyline points="5 12 12 5 19 12"/>
        </svg>
      </button>

      {/* =========================================================================
          SLIDE-OUT SHOPPING CART DRAWER
          ========================================================================= */}
      {isCartOpen && (
        <div className="jew-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="jew-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="jew-drawer-header">
              <h3 className="jew-drawer-title">Shopping Cart ({totalCartCount})</h3>
              <button
                type="button"
                className="jew-drawer-close"
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 0' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
                  Your shopping bag is currently empty.
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${idx}`}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      padding: '12px 0',
                      borderBottom: '1px solid #eee',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: '60px', height: '60px', objectFit: 'contain', background: '#f9f9f9', borderRadius: '2px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: '#111' }}>{item.product.name}</div>
                      <div style={{ fontSize: '11px', color: '#7d282b' }}>{item.selectedMetal}</div>
                      <div style={{ fontSize: '12px', fontWeight: 600, marginTop: '4px' }}>
                        Rs. {(item.product.price * item.quantity).toLocaleString('en-IN')}.00
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => updateCartQty(idx, -1)}
                        style={{ width: '24px', height: '24px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '12px', fontWeight: 600 }}>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateCartQty(idx, 1)}
                        style={{ width: '24px', height: '24px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div style={{ borderTop: '1px solid #eee', paddingTop: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', fontWeight: 600 }}>
                  <span>Subtotal:</span>
                  <span style={{ color: '#7d282b', fontSize: '16px' }}>
                    Rs. {cartSubtotal.toLocaleString('en-IN')}.00
                  </span>
                </div>
                <button
                  type="button"
                  className="jew-hero-btn"
                  style={{ width: '100%', padding: '14px' }}
                  onClick={() => showToast('Proceeding to Secure Checkout...')}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          INTERACTIVE QUICK VIEW MODAL
          ========================================================================= */}
      {isQuickViewOpen && (
        <div
          className="jew-drawer-overlay"
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onClick={() => setIsQuickViewOpen(false)}
        >
          <div
            style={{
              background: '#ffffff',
              maxWidth: '680px',
              width: '90%',
              borderRadius: '4px',
              padding: '32px',
              position: 'relative',
              boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsQuickViewOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
              }}
            >
              ✕
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px', alignItems: 'center' }}>
              <div style={{ background: '#f8f5f2', padding: '24px', textAlign: 'center', borderRadius: '4px' }}>
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  style={{ maxWidth: '100%', maxHeight: '280px', objectFit: 'contain' }}
                />
              </div>
              <div>
                <span style={{ fontSize: '11px', color: '#7d282b', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  {quickViewProduct.brand} • {quickViewProduct.category}
                </span>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '28px', color: '#111', margin: '4px 0 8px' }}>
                  {quickViewProduct.name}
                </h3>
                <div style={{ fontSize: '18px', fontWeight: 600, color: '#7d282b', marginBottom: '12px' }}>
                  Rs. {quickViewProduct.price.toLocaleString('en-IN')}.00
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#666', marginBottom: '20px' }}>
                  {quickViewProduct.description}
                </p>
                <button
                  type="button"
                  className="jew-hero-btn"
                  style={{ width: '100%' }}
                  onClick={() => {
                    handleAddToCart(quickViewProduct)
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

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#111111',
            color: '#ffffff',
            padding: '10px 24px',
            borderRadius: '4px',
            fontSize: '13px',
            fontWeight: 500,
            zIndex: 10001,
            boxShadow: '0 4px 14px rgba(0,0,0,0.3)',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  )
}
