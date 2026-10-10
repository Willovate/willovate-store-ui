import React, { useState, useEffect, useMemo } from 'react'
import type {
  NaturyaProduct,
  NaturyaCategoryType,
  NaturyaCartItem,
  NaturyaStorefrontProps,
} from './types'
import {
  NATURYA_PRODUCTS,
  NATURYA_HERO_SLIDES,
  NATURYA_PROMISES,
  NATURYA_BANNER_TRIO,
  NATURYA_CATEGORY_PILLS,
  NATURYA_REVIEWS,
  NATURYA_INSTAGRAM_POSTS,
} from './data/naturyaData'
import './styles/naturyaFashion.css'

export const NaturyaFashionStorefront: React.FC<NaturyaStorefrontProps> = ({
  template: _template,
  device = 'desktop',
  customAccentColor,
  onUseTemplate: _onUseTemplate,
  onClose: _onClose,
  onBack: _onBack,
}) => {
  // Navigation & View State
  const [activeView, setActiveView] = useState<'home' | 'collection' | 'pdp'>('home')
  const [activeCategory, setActiveCategory] = useState<NaturyaCategoryType>('All')
  const [selectedProduct, setSelectedProduct] = useState<NaturyaProduct>(NATURYA_PRODUCTS[0])
  const [quickViewProduct, setQuickViewProduct] = useState<NaturyaProduct | null>(null)
  const [cartOpen, setCartOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeGenderTab, setActiveGenderTab] = useState<'Women' | 'Men'>('Women')
  const [currentHeroSlide, setCurrentHeroSlide] = useState(0)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // PDP Accordions state
  const [accordionOpen, setAccordionOpen] = useState<{ [key: string]: boolean }>({
    details: true,
    composition: false,
    shipping: false,
  })

  // PDP Variant selection
  const [pdpImage, setPdpImage] = useState<string>(NATURYA_PRODUCTS[0].image)
  const [pdpColor, setPdpColor] = useState<string>(NATURYA_PRODUCTS[0].colors[0]?.name || 'Standard')
  const [pdpSize, setPdpSize] = useState<string>(NATURYA_PRODUCTS[0].sizes[0] || 'M')
  const [pdpQuantity, setPdpQuantity] = useState(1)

  // Search & Filter state
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured')
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(300)

  // Cart State (Initialized with 1 demo item)
  const [cart, setCart] = useState<NaturyaCartItem[]>([
    {
      product: NATURYA_PRODUCTS[2], // Canvas half-moon shoulder bag
      size: 'One Size',
      color: 'Natural Canvas / Cognac',
      quantity: 1,
    },
  ])

  // Automatic hero slide transition
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % NATURYA_HERO_SLIDES.length)
    }, 6000)
    return () => clearInterval(slideTimer)
  }, [])

  // Sync PDP state when selectedProduct changes
  useEffect(() => {
    if (selectedProduct) {
      setPdpImage(selectedProduct.image)
      setPdpColor(selectedProduct.colors[0]?.name || 'Standard')
      setPdpSize(selectedProduct.sizes[0] || 'M')
      setPdpQuantity(1)
    }
  }, [selectedProduct])

  // Toast notification helper
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  // Cart operations
  const addToCart = (product: NaturyaProduct, size: string, color: string, qty = 1) => {
    setCart((prev) => {
      const idx = prev.findIndex(
        (i) => i.product.id === product.id && i.size === size && i.color === color
      )
      if (idx > -1) {
        const next = [...prev]
        next[idx].quantity += qty
        return next
      }
      return [...prev, { product, size, color, quantity: qty }]
    })
    showToast(`Added "${product.name}" to your cart`)
    setCartOpen(true)
  }

  const updateCartQty = (idx: number, delta: number) => {
    setCart((prev) => {
      const next = [...prev]
      const newQty = next[idx].quantity + delta
      if (newQty <= 0) {
        return next.filter((_, i) => i !== idx)
      }
      next[idx].quantity = newQty
      return next
    })
  }

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }, [cart])

  const cartCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0)
  }, [cart])

  const freeShippingThreshold = 1000
  const freeShipProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100))
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - cartSubtotal)

  // Tabbed collection products
  const tabbedProducts = useMemo(() => {
    return NATURYA_PRODUCTS.filter((p) => p.gender === activeGenderTab || p.gender === 'Unisex').slice(0, 8)
  }, [activeGenderTab])

  // New arrivals products
  const newArrivals = useMemo(() => {
    return NATURYA_PRODUCTS.filter((p) => p.isNew || p.isSale).slice(0, 8)
  }, [])

  // Filtered collection list
  const collectionProducts = useMemo(() => {
    return NATURYA_PRODUCTS.filter((p) => {
      if (activeCategory !== 'All' && p.category !== activeCategory) {
        if (activeCategory === 'Sale' && !p.isSale) return false
        if (activeCategory !== 'Sale') return false
      }
      if (p.price > maxPriceFilter) return false
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesName = p.name.toLowerCase().includes(query)
        const matchesDesc = p.description.toLowerCase().includes(query)
        if (!matchesName && !matchesDesc) return false
      }
      return true
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })
  }, [activeCategory, maxPriceFilter, searchQuery, sortBy])

  // Format currency
  const fmt = (num: number) => `$${num.toFixed(2)}`

  const scrollContainersToTop = () => {
    try {
      window.scrollTo({ top: 0, behavior: 'instant' })
      const scrollParents = document.querySelectorAll(
        '.simulated-frame, .preview-viewport-container, .naturya-root, .preview-modal-body, body, html'
      )
      scrollParents.forEach((el) => {
        el.scrollTo({ top: 0, behavior: 'instant' })
      })
    } catch {
      // Fallback
    }
  }

  useEffect(() => {
    scrollContainersToTop()
  }, [activeView])

  const handleOpenPdp = (prod: NaturyaProduct) => {
    setSelectedProduct(prod)
    setActiveView('pdp')
    scrollContainersToTop()
  }

  const handleNavCategory = (cat: NaturyaCategoryType) => {
    setActiveCategory(cat)
    setActiveView('collection')
    scrollContainersToTop()
  }

  return (
    <div
      className={`naturya-root naturya-${device} ${device === 'mobile' ? 'naturya-mobile device-mobile is-mobile' : ''}`}
      style={
        {
          ...(customAccentColor ? { '--nat-highlight': customAccentColor } : {}),
        } as React.CSSProperties
      }
    >
      {/* ================= TOP ANNOUNCEMENT BAR ================= */}
      <div className="naturya-announcement-bar">
        <div className="naturya-container">
          <div className="naturya-announcement-content">
            <span>
              FIRST TIMER? Sign up and get <strong>20% off</strong> your first order
            </span>
            <button
              type="button"
              className="naturya-announcement-link"
              onClick={() => showToast('Enter your email in the footer to claim your 20% voucher!')}
            >
              Claim Offer
            </button>
          </div>
        </div>
      </div>

      {/* ================= MAIN HEADER & NAVIGATION ================= */}
      <header className="naturya-header">
        <div className="naturya-container">
          <div className="naturya-header-inner">
            {/* Mobile Hamburger */}
            <button
              type="button"
              className="naturya-mobile-hamburger"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>

            {/* Left Nav Menu (Desktop) */}
            <nav className="naturya-nav-menu">
              <button
                type="button"
                className={`naturya-nav-link ${activeView === 'home' ? 'active' : ''}`}
                onClick={() => {
                  setActiveView('home')
                  setActiveCategory('All')
                  scrollContainersToTop()
                }}
              >
                Home
              </button>
              <button
                type="button"
                className={`naturya-nav-link ${activeView === 'collection' && activeCategory === 'All' ? 'active' : ''}`}
                onClick={() => handleNavCategory('All')}
              >
                Shop
              </button>
              <button
                type="button"
                className={`naturya-nav-link ${activeCategory === 'Coats' ? 'active' : ''}`}
                onClick={() => handleNavCategory('Coats')}
              >
                Coats
              </button>
              <button
                type="button"
                className={`naturya-nav-link ${activeCategory === 'Sweaters' ? 'active' : ''}`}
                onClick={() => handleNavCategory('Sweaters')}
              >
                Sweaters
              </button>
              <button
                type="button"
                className={`naturya-nav-link ${activeCategory === 'Sale' ? 'active' : ''}`}
                onClick={() => handleNavCategory('Sale')}
              >
                Sale
              </button>
            </nav>

            {/* Center Logo */}
            <div
              className="naturya-logo"
              onClick={() => {
                setActiveView('home')
                setActiveCategory('All')
                scrollContainersToTop()
              }}
            >
              Naturya
            </div>

            {/* Right Actions */}
            <div className="naturya-header-actions">
              <button
                type="button"
                className="naturya-action-btn"
                onClick={() => {
                  setActiveView('collection')
                  showToast('Browse full catalog or use filters')
                }}
                title="Search"
              >
                🔍
              </button>

              <button
                type="button"
                className="naturya-action-btn"
                onClick={() => showToast('Account & Wishlist access')}
                title="Account"
              >
                👤
              </button>

              <button
                type="button"
                className="naturya-action-btn"
                onClick={() => setCartOpen(true)}
                title="Cart"
              >
                <span>🛍️</span>
                {cartCount > 0 && <span className="naturya-cart-badge">{cartCount}</span>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      {mobileMenuOpen && (
        <div className="naturya-cart-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="naturya-cart-drawer naturya-mobile-menu-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="naturya-cart-header">
              <h3>Naturya Atelier</h3>
              <button
                type="button"
                className="naturya-cart-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="naturya-cart-body" style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <button
                  type="button"
                  style={{
                    padding: '12px 0',
                    borderBottom: '1px solid #f0eee9',
                    background: 'none',
                    borderLeft: 'none',
                    borderRight: 'none',
                    borderTop: 'none',
                    textAlign: 'left',
                    fontFamily: 'var(--nat-font-heading)',
                    fontSize: '16px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                  onClick={() => {
                    setActiveView('home')
                    setActiveCategory('All')
                    setMobileMenuOpen(false)
                    scrollContainersToTop()
                  }}
                >
                  <span>Home</span>
                  <span>→</span>
                </button>
                {(['All', 'Coats', 'Jackets', 'Sweaters', 'T-shirts', 'Sweatshirts', 'Accessories', 'Sale'] as NaturyaCategoryType[]).map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    style={{
                      padding: '12px 0',
                      borderBottom: '1px solid #f0eee9',
                      background: 'none',
                      borderLeft: 'none',
                      borderRight: 'none',
                      borderTop: 'none',
                      textAlign: 'left',
                      fontFamily: 'var(--nat-font-heading)',
                      fontSize: '15px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      justifyContent: 'space-between',
                      color: cat === 'Sale' ? 'var(--nat-highlight)' : 'inherit',
                    }}
                    onClick={() => {
                      handleNavCategory(cat)
                      setMobileMenuOpen(false)
                    }}
                  >
                    <span>{cat === 'All' ? 'Shop All Collection' : cat}</span>
                    <span>→</span>
                  </button>
                ))}
              </div>

              <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <button
                  type="button"
                  className="naturya-checkout-btn"
                  style={{ width: '100%', padding: '12px', fontSize: '13px' }}
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setCartOpen(true)
                  }}
                >
                  View Shopping Bag ({cartCount})
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= VIEW: HOME ================= */}
      {activeView === 'home' && (
        <main>
          {/* HERO SLIDER SECTION */}
          <section className="naturya-hero-section">
            {NATURYA_HERO_SLIDES.map((slide, idx) => (
              <div
                key={slide.id}
                className={`naturya-hero-slide ${idx === currentHeroSlide ? 'active' : ''}`}
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="naturya-hero-overlay" />
                <div className="naturya-container">
                  <div className="naturya-hero-content">
                    <div className="naturya-hero-subtitle">{slide.subtitle}</div>
                    <h1 className="naturya-hero-title">{slide.headline}</h1>
                    <p className="naturya-hero-desc">{slide.description}</p>
                    <button
                      type="button"
                      className="naturya-btn-discovery"
                      onClick={() => handleNavCategory(slide.category)}
                    >
                      {slide.ctaText} →
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Page 1, Page 2, Page 3 Indicators */}
            <div className="naturya-hero-pagination">
              {NATURYA_HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`naturya-page-dot ${idx === currentHeroSlide ? 'active' : ''}`}
                  onClick={() => setCurrentHeroSlide(idx)}
                >
                  Page {idx + 1}
                </button>
              ))}
            </div>
          </section>

          {/* VALUE PROMISES STRIP */}
          <section className="naturya-promises-section">
            <div className="naturya-container">
              <div className="naturya-promises-grid">
                {NATURYA_PROMISES.map((item, idx) => (
                  <div key={idx} className="naturya-promise-item">
                    <span className="naturya-promise-icon">{item.icon}</span>
                    <div>
                      <h4 className="naturya-promise-title">{item.title}</h4>
                      <p className="naturya-promise-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* TRIPLE EDITORIAL BANNER TRIO */}
          <section className="naturya-container naturya-trio-section">
            <div className="naturya-trio-grid">
              {NATURYA_BANNER_TRIO.map((b) => (
                <div
                  key={b.id}
                  className="naturya-trio-card"
                  style={{ backgroundImage: `url(${b.image})` }}
                  onClick={() => handleNavCategory(b.category)}
                >
                  <div className="naturya-trio-content">
                    <div className="naturya-trio-subtitle">{b.subtitle}</div>
                    <h3 className="naturya-trio-title">{b.title}</h3>
                    <span className="naturya-trio-link">Shop now →</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* "YOU ARE INTERESTED IN" COLLECTION TABS */}
          <section className="naturya-container naturya-collection-section">
            <div className="naturya-section-header">
              <h2 className="naturya-section-title">You are interested in</h2>
              <div className="naturya-tabs-wrap">
                <button
                  type="button"
                  className={`naturya-tab-pill ${activeGenderTab === 'Women' ? 'active' : ''}`}
                  onClick={() => setActiveGenderTab('Women')}
                >
                  Women
                </button>
                <button
                  type="button"
                  className={`naturya-tab-pill ${activeGenderTab === 'Men' ? 'active' : ''}`}
                  onClick={() => setActiveGenderTab('Men')}
                >
                  Men
                </button>
              </div>
              <p className="naturya-section-subtext">
                A magical mix of enchanting prints and playful designs that bring out every personal silhouette.
              </p>
            </div>

            <div className="naturya-products-grid">
              {tabbedProducts.map((prod) => (
                <div key={prod.id} className="naturya-product-card">
                  <div className="naturya-card-media" onClick={() => handleOpenPdp(prod)}>
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="naturya-card-img main"
                      loading="lazy"
                    />
                    <img
                      src={prod.alternateImage}
                      alt={prod.name}
                      className="naturya-card-img alt"
                      loading="lazy"
                    />

                    {prod.isSale && <span className="naturya-card-sale-tag">Sale</span>}

                    <div className="naturya-card-actions" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="naturya-btn-card-action"
                        onClick={() => setQuickViewProduct(prod)}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="naturya-btn-card-action"
                        onClick={() =>
                          addToCart(
                            prod,
                            prod.sizes[0] || 'Standard',
                            prod.colors[0]?.name || 'Standard'
                          )
                        }
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>

                  <div className="naturya-card-body">
                    <span className="naturya-vendor-tag">Vendor: {prod.vendor}</span>
                    <h4 className="naturya-card-title" onClick={() => handleOpenPdp(prod)}>
                      {prod.name}
                    </h4>
                    <div className="naturya-price-row">
                      <span className="naturya-price-current">{fmt(prod.price)}</span>
                      {prod.compareAtPrice && (
                        <span className="naturya-price-compare">{fmt(prod.compareAtPrice)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* "SHOP BY CATEGORY" PILLS */}
          <section className="naturya-container naturya-categories-section">
            <div className="naturya-section-header">
              <h2 className="naturya-section-title">Shop by category</h2>
            </div>

            <div className="naturya-cat-pills-grid">
              {NATURYA_CATEGORY_PILLS.map((pill) => (
                <div
                  key={pill.id}
                  className="naturya-cat-pill-card"
                  onClick={() => handleNavCategory(pill.category)}
                >
                  <div className="naturya-cat-pill-img-wrap">
                    <img
                      src={pill.image}
                      alt={pill.title}
                      className="naturya-cat-pill-img"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="naturya-cat-pill-title">{pill.title}</h4>
                </div>
              ))}
            </div>
          </section>

          {/* "URBAN OASIS" EDITORIAL SPLIT SHOWCASE */}
          <section className="naturya-oasis-section">
            <div className="naturya-container">
              <div className="naturya-oasis-grid">
                <div className="naturya-oasis-media">
                  <img
                    src="https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&w=1200&q=85"
                    alt="Urban Oasis Collection"
                    className="naturya-oasis-img"
                    loading="lazy"
                  />
                </div>
                <div className="naturya-oasis-text">
                  <div className="naturya-oasis-tag">Editorial Drop</div>
                  <h2 className="naturya-oasis-title">Urban Oasis</h2>
                  <p className="naturya-oasis-desc">
                    A collection with modern, city-inspired pieces with a relaxed vibe. Focusing on classic,
                    sophisticated styles that never go out of fashion. Tailored from double-faced virgin wools and
                    breathable natural linens.
                  </p>
                  <button
                    type="button"
                    className="naturya-btn-discovery"
                    onClick={() => handleNavCategory('Coats')}
                  >
                    Explore Urban Oasis →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* "NEW ARRIVALS" CAROUSEL */}
          <section className="naturya-container naturya-collection-section">
            <div className="naturya-section-header">
              <h2 className="naturya-section-title">New Arrivals</h2>
            </div>

            <div className="naturya-products-grid">
              {newArrivals.map((prod) => (
                <div key={prod.id} className="naturya-product-card">
                  <div className="naturya-card-media" onClick={() => handleOpenPdp(prod)}>
                    <img
                      src={prod.image}
                      alt={prod.name}
                      className="naturya-card-img main"
                      loading="lazy"
                    />
                    <img
                      src={prod.alternateImage}
                      alt={prod.name}
                      className="naturya-card-img alt"
                      loading="lazy"
                    />

                    {prod.isSale && <span className="naturya-card-sale-tag">Sale</span>}

                    <div className="naturya-card-actions" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        className="naturya-btn-card-action"
                        onClick={() => setQuickViewProduct(prod)}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="naturya-btn-card-action"
                        onClick={() =>
                          addToCart(
                            prod,
                            prod.sizes[0] || 'Standard',
                            prod.colors[0]?.name || 'Standard'
                          )
                        }
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>

                  <div className="naturya-card-body">
                    <span className="naturya-vendor-tag">Vendor: {prod.vendor}</span>
                    <h4 className="naturya-card-title" onClick={() => handleOpenPdp(prod)}>
                      {prod.name}
                    </h4>
                    <div className="naturya-price-row">
                      <span className="naturya-price-current">{fmt(prod.price)}</span>
                      {prod.compareAtPrice && (
                        <span className="naturya-price-compare">{fmt(prod.compareAtPrice)}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* "HAPPY CLIENTS" TESTIMONIALS */}
          <section className="naturya-container naturya-reviews-section">
            <div className="naturya-section-header">
              <h2 className="naturya-section-title">Happy Clients</h2>
            </div>

            <div className="naturya-reviews-grid">
              {NATURYA_REVIEWS.map((rev) => (
                <div key={rev.id} className="naturya-review-card">
                  <div className="naturya-review-stars">★ ★ ★ ★ ★</div>
                  <div className="naturya-review-cat">{rev.categoryTag}</div>
                  <p className="naturya-review-text">"{rev.comment}"</p>
                  <div className="naturya-review-footer">
                    <h5 className="naturya-review-author">{rev.author}</h5>
                    <div className="naturya-review-role">{rev.role}</div>
                    <span className="naturya-review-prod-tag">{rev.productPurchased}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* "INSTAGRAM SHOP" UGC CAROUSEL */}
          <section className="naturya-container naturya-instagram-section">
            <div className="naturya-section-header">
              <h2 className="naturya-section-title">Instagram Shop</h2>
              <p className="naturya-section-subtext">
                Tag @naturya in your Instagram photos for a chance to be featured here.
              </p>
            </div>

            <div className="naturya-ig-grid">
              {NATURYA_INSTAGRAM_POSTS.map((post) => (
                <div
                  key={post.id}
                  className="naturya-ig-item"
                  onClick={() => showToast(`Instagram Post: ${post.username} wearing ${post.productName}`)}
                >
                  <img src={post.image} alt={post.productName} className="naturya-ig-img" loading="lazy" />
                  <div className="naturya-ig-overlay">
                    <span className="naturya-ig-icon">📷</span>
                    <span className="naturya-ig-handle">{post.username}</span>
                    <span style={{ fontSize: '11px', marginTop: '4px' }}>♥ {post.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* ================= VIEW: COLLECTION ================= */}
      {activeView === 'collection' && (
        <main className="naturya-container">
          <div className="naturya-collection-layout">
            {/* Sidebar Filters */}
            <aside className="naturya-filter-sidebar">
              <div className="naturya-filter-title">Categories</div>
              <div className="naturya-filter-options">
                {(['All', 'Coats', 'Jackets', 'Sweaters', 'T-shirts', 'Sweatshirts', 'Accessories', 'Footwear', 'Sale'] as NaturyaCategoryType[]).map((cat) => (
                  <label key={cat} className="naturya-filter-label">
                    <input
                      type="radio"
                      name="nat-category"
                      checked={activeCategory === cat}
                      onChange={() => setActiveCategory(cat)}
                    />
                    <span>{cat}</span>
                  </label>
                ))}
              </div>

              <div className="naturya-filter-title">Max Price: {fmt(maxPriceFilter)}</div>
              <input
                type="range"
                min={30}
                max={300}
                step={10}
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                style={{ width: '100%', marginBottom: '24px', cursor: 'pointer' }}
              />

              <button
                type="button"
                className="naturya-btn-discovery"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  setActiveCategory('All')
                  setMaxPriceFilter(300)
                  setSearchQuery('')
                }}
              >
                Reset Filters
              </button>
            </aside>

            {/* Collection Grid */}
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '24px',
                }}
              >
                <div style={{ fontSize: '14px', color: 'var(--nat-muted)' }}>
                  Showing <strong>{collectionProducts.length}</strong> items in "{activeCategory}"
                </div>

                <select
                  className="naturya-sort-select"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              {collectionProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0' }}>
                  <h3>No products found</h3>
                  <p style={{ color: 'var(--nat-muted)' }}>Try broadening your filters.</p>
                </div>
              ) : (
                <div className="naturya-products-grid">
                  {collectionProducts.map((prod) => (
                    <div key={prod.id} className="naturya-product-card">
                      <div className="naturya-card-media" onClick={() => handleOpenPdp(prod)}>
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="naturya-card-img main"
                          loading="lazy"
                        />
                        <img
                          src={prod.alternateImage}
                          alt={prod.name}
                          className="naturya-card-img alt"
                          loading="lazy"
                        />

                        {prod.isSale && <span className="naturya-card-sale-tag">Sale</span>}

                        <div className="naturya-card-actions" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            className="naturya-btn-card-action"
                            onClick={() => setQuickViewProduct(prod)}
                          >
                            View
                          </button>
                          <button
                            type="button"
                            className="naturya-btn-card-action"
                            onClick={() =>
                              addToCart(
                                prod,
                                prod.sizes[0] || 'Standard',
                                prod.colors[0]?.name || 'Standard'
                              )
                            }
                          >
                            Add to cart
                          </button>
                        </div>
                      </div>

                      <div className="naturya-card-body">
                        <span className="naturya-vendor-tag">Vendor: {prod.vendor}</span>
                        <h4 className="naturya-card-title" onClick={() => handleOpenPdp(prod)}>
                          {prod.name}
                        </h4>
                        <div className="naturya-price-row">
                          <span className="naturya-price-current">{fmt(prod.price)}</span>
                          {prod.compareAtPrice && (
                            <span className="naturya-price-compare">{fmt(prod.compareAtPrice)}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {/* ================= VIEW: PDP (PRODUCT DETAIL PAGE) ================= */}
      {activeView === 'pdp' && selectedProduct && (
        <main className="naturya-container naturya-pdp-section">
          {/* Breadcrumb */}
          <div className="naturya-breadcrumb">
            <button type="button" onClick={() => setActiveView('home')}>
              Home
            </button>
            <span>/</span>
            <button type="button" onClick={() => handleNavCategory(selectedProduct.category)}>
              {selectedProduct.category}
            </button>
            <span>/</span>
            <span>{selectedProduct.name}</span>
          </div>

          <div className="naturya-pdp-layout">
            {/* Gallery */}
            <div className="naturya-pdp-gallery-wrap">
              <div className="naturya-pdp-thumbs">
                {selectedProduct.gallery.map((gImg, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`naturya-pdp-thumb-btn ${pdpImage === gImg ? 'active' : ''}`}
                    onClick={() => setPdpImage(gImg)}
                  >
                    <img src={gImg} alt={`View ${i}`} />
                  </button>
                ))}
              </div>
              <div className="naturya-pdp-main-media">
                <img src={pdpImage} alt={selectedProduct.name} className="naturya-pdp-main-img" />
              </div>
            </div>

            {/* Product Info */}
            <div className="naturya-pdp-info">
              <span className="naturya-pdp-vendor">Vendor: {selectedProduct.vendor}</span>
              <h1 className="naturya-pdp-title">{selectedProduct.name}</h1>

              <div className="naturya-pdp-rating-row">
                <span style={{ color: 'var(--nat-highlight)' }}>★ ★ ★ ★ ★</span>
                <span>{selectedProduct.rating} ({selectedProduct.reviewCount} Reviews)</span>
                <span>• SKU: {selectedProduct.sku}</span>
              </div>

              <div className="naturya-pdp-price-row">
                <span className="naturya-pdp-price">{fmt(selectedProduct.price)}</span>
                {selectedProduct.compareAtPrice && (
                  <span className="naturya-pdp-compare">{fmt(selectedProduct.compareAtPrice)}</span>
                )}
              </div>

              <p className="naturya-pdp-desc">{selectedProduct.description}</p>

              {/* Color Swatches */}
              <div className="naturya-variant-group">
                <div className="naturya-variant-label">
                  Color: <strong>{pdpColor}</strong>
                </div>
                <div className="naturya-color-swatches">
                  {selectedProduct.colors.map((c, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`naturya-swatch-chip ${pdpColor === c.name ? 'active' : ''}`}
                      onClick={() => setPdpColor(c.name)}
                    >
                      <span className="naturya-swatch-dot" style={{ backgroundColor: c.hex }} />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="naturya-variant-group">
                <div className="naturya-variant-label">
                  Size: <strong>{pdpSize}</strong>
                </div>
                <div className="naturya-size-pills">
                  {selectedProduct.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`naturya-size-pill ${pdpSize === s ? 'active' : ''}`}
                      onClick={() => setPdpSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="naturya-pdp-actions">
                <div className="naturya-qty-control" style={{ height: '48px' }}>
                  <button
                    type="button"
                    className="naturya-qty-btn"
                    style={{ width: '38px', height: '48px' }}
                    onClick={() => setPdpQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span className="naturya-qty-val" style={{ width: '38px', fontSize: '15px' }}>
                    {pdpQuantity}
                  </span>
                  <button
                    type="button"
                    className="naturya-qty-btn"
                    style={{ width: '38px', height: '48px' }}
                    onClick={() => setPdpQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="naturya-btn-add-pdp"
                  onClick={() => addToCart(selectedProduct, pdpSize, pdpColor, pdpQuantity)}
                >
                  Add to cart
                </button>

                <button
                  type="button"
                  className="naturya-btn-buy-pdp"
                  onClick={() => {
                    addToCart(selectedProduct, pdpSize, pdpColor, pdpQuantity)
                    setCartOpen(true)
                  }}
                >
                  Buy it now
                </button>
              </div>

              {/* Collapsible Accordions */}
              <div>
                <div className="naturya-accordion-item">
                  <button
                    type="button"
                    className="naturya-accordion-header"
                    onClick={() =>
                      setAccordionOpen((prev) => ({ ...prev, details: !prev.details }))
                    }
                  >
                    <span>Product Details & Specifications</span>
                    <span>{accordionOpen.details ? '−' : '+'}</span>
                  </button>
                  {accordionOpen.details && (
                    <div className="naturya-accordion-body">
                      <ul>
                        {selectedProduct.details.map((d, i) => (
                          <li key={i} style={{ marginBottom: '4px' }}>
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="naturya-accordion-item">
                  <button
                    type="button"
                    className="naturya-accordion-header"
                    onClick={() =>
                      setAccordionOpen((prev) => ({ ...prev, composition: !prev.composition }))
                    }
                  >
                    <span>Fabric Composition & Care</span>
                    <span>{accordionOpen.composition ? '−' : '+'}</span>
                  </button>
                  {accordionOpen.composition && (
                    <div className="naturya-accordion-body">
                      <p>
                        <strong>Composition:</strong> {selectedProduct.composition}
                      </p>
                      <p>
                        <strong>Care:</strong> {selectedProduct.care}
                      </p>
                    </div>
                  )}
                </div>

                <div className="naturya-accordion-item">
                  <button
                    type="button"
                    className="naturya-accordion-header"
                    onClick={() =>
                      setAccordionOpen((prev) => ({ ...prev, shipping: !prev.shipping }))
                    }
                  >
                    <span>Shipping & 30-Day Returns</span>
                    <span>{accordionOpen.shipping ? '−' : '+'}</span>
                  </button>
                  {accordionOpen.shipping && (
                    <div className="naturya-accordion-body">
                      <p>{selectedProduct.shipping}</p>
                      <p>
                        Return any unworn item with original tags within 30 days for a full refund or exchange.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ================= RICH EARTH-TONE FOOTER ================= */}
      <footer className="naturya-footer">
        <div className="naturya-container">
          <div className="naturya-footer-grid">
            {/* Col 1 */}
            <div className="naturya-footer-col">
              <h3
                style={{
                  fontFamily: 'var(--nat-font-heading)',
                  fontSize: '24px',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '14px',
                }}
              >
                Naturya
              </h3>
              <p className="naturya-footer-about">
                Whether you're a trendsetter, a minimalist, or an adventurer at heart, Naturya has something for
                everyone. Our diverse range of styles caters to various personas.
              </p>
              <div className="naturya-social-icons">
                <span className="naturya-social-btn">f</span>
                <span className="naturya-social-btn">𝕏</span>
                <span className="naturya-social-btn">ig</span>
                <span className="naturya-social-btn">▶</span>
              </div>
            </div>

            {/* Col 2 */}
            <div className="naturya-footer-col">
              <h4>Information</h4>
              <ul className="naturya-footer-links">
                <li><button onClick={() => showToast('Our Story')}>Our Story</button></li>
                <li><button onClick={() => showToast('Mission & Values')}>Mission & Values</button></li>
                <li><button onClick={() => showToast('Meet the Team')}>Meet the Team</button></li>
                <li><button onClick={() => showToast('Sustainability Efforts')}>Sustainability Efforts</button></li>
                <li><button onClick={() => showToast('Brand Partnerships')}>Brand Partnerships</button></li>
                <li><button onClick={() => showToast('Influencer Collaborations')}>Influencer Collaborations</button></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div className="naturya-footer-col">
              <h4>Quick links</h4>
              <ul className="naturya-footer-links">
                <li><button onClick={() => showToast('Accessibility Statement')}>Accessibility Statement</button></li>
                <li><button onClick={() => showToast('Site Map')}>Site Map</button></li>
                <li><button onClick={() => showToast('Web Accessibility Options')}>Web Accessibility Options</button></li>
                <li><button onClick={() => showToast('ADA Compliance')}>ADA Compliance</button></li>
                <li><button onClick={() => showToast('Privacy Policy')}>Privacy Policy</button></li>
                <li><button onClick={() => showToast('Terms of Service')}>Terms of Service</button></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div className="naturya-footer-col">
              <h4>Let's get in touch</h4>
              <div className="naturya-newsletter-box">
                <form
                  className="naturya-newsletter-form"
                  onSubmit={(e) => {
                    e.preventDefault()
                    showToast('Thank you for subscribing! Your 10% welcome coupon has been sent.')
                  }}
                >
                  <input
                    type="email"
                    className="naturya-newsletter-input"
                    placeholder="Enter your email"
                    required
                  />
                  <button type="submit" className="naturya-newsletter-submit">
                    →
                  </button>
                </form>
                <p style={{ fontSize: '12px', color: '#888888', margin: 0 }}>
                  Sign up for our newsletter and receive 10% off your first order.
                </p>
              </div>
            </div>
          </div>

          <div className="naturya-footer-bottom">
            <div>© 2026 Naturya. Powered by Willovate UI.</div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span>Language: English</span>
              <span>Country/region: United States (USD $)</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= CART SLIDE-OVER DRAWER ================= */}
      {cartOpen && (
        <div className="naturya-cart-overlay" onClick={() => setCartOpen(false)}>
          <div className="naturya-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="naturya-cart-header">
              <h3>Shopping Cart ({cartCount})</h3>
              <button
                type="button"
                className="naturya-cart-close"
                onClick={() => setCartOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Free shipping goal bar */}
            <div className="naturya-free-ship-box">
              <div className="naturya-free-ship-text">
                {amountToFreeShipping === 0 ? (
                  <span>🎉 You have unlocked <strong>Free Worldwide Shipping!</strong></span>
                ) : (
                  <span>
                    Spend <strong>{fmt(amountToFreeShipping)}</strong> more to reach free shipping!
                  </span>
                )}
              </div>
              <div className="naturya-free-ship-bar">
                <div
                  className="naturya-free-ship-fill"
                  style={{ width: `${freeShipProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items */}
            <div className="naturya-cart-items">
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--nat-muted)' }}>
                  <p>Your cart is currently empty.</p>
                  <button
                    type="button"
                    className="naturya-btn-discovery"
                    style={{ marginTop: '14px' }}
                    onClick={() => {
                      setCartOpen(false)
                      setActiveView('collection')
                    }}
                  >
                    Continue shopping
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="naturya-cart-item">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="naturya-cart-thumb"
                    />
                    <div className="naturya-cart-info">
                      <div className="naturya-cart-prod-name">{item.product.name}</div>
                      <div className="naturya-cart-variant-tag">
                        {item.size} / {item.color}
                      </div>
                      <div className="naturya-cart-row-bottom">
                        <div className="naturya-qty-control">
                          <button
                            type="button"
                            className="naturya-qty-btn"
                            onClick={() => updateCartQty(idx, -1)}
                          >
                            -
                          </button>
                          <span className="naturya-qty-val">{item.quantity}</span>
                          <button
                            type="button"
                            className="naturya-qty-btn"
                            onClick={() => updateCartQty(idx, 1)}
                          >
                            +
                          </button>
                        </div>
                        <span className="naturya-cart-price">
                          {fmt(item.product.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="naturya-cart-footer">
                <div className="naturya-cart-subtotal-row">
                  <span>Subtotal:</span>
                  <span>{fmt(cartSubtotal)} USD</span>
                </div>
                <button
                  type="button"
                  className="naturya-checkout-btn"
                  onClick={() => showToast('Proceeding to Naturya Secure Checkout...')}
                >
                  Check out • {fmt(cartSubtotal)}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= QUICK VIEW MODAL ================= */}
      {quickViewProduct && (
        <div className="naturya-modal-overlay" onClick={() => setQuickViewProduct(null)}>
          <div
            className="naturya-modal-box"
            style={{ maxWidth: '750px' }}
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
              <h3 style={{ margin: 0, fontFamily: 'var(--nat-font-heading)' }}>
                {quickViewProduct.name}
              </h3>
              <button
                type="button"
                className="naturya-cart-close"
                onClick={() => setQuickViewProduct(null)}
              >
                ✕
              </button>
            </div>

            <div className="naturya-quickview-grid">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{ width: '100%', borderRadius: 'var(--nat-radius-img)', objectFit: 'cover' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '12px', color: 'var(--nat-highlight)', fontWeight: 600 }}>
                  Vendor: {quickViewProduct.vendor}
                </span>
                <div
                  style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    margin: '8px 0 12px 0',
                    color: 'var(--nat-dark)',
                  }}
                >
                  {fmt(quickViewProduct.price)}
                </div>
                <p style={{ fontSize: '13.5px', color: '#555555', lineHeight: 1.6, marginBottom: '20px' }}>
                  {quickViewProduct.description}
                </p>
                <button
                  type="button"
                  className="naturya-btn-discovery"
                  style={{ width: '100%', justifyContent: 'center', marginBottom: '10px' }}
                  onClick={() => {
                    addToCart(
                      quickViewProduct,
                      quickViewProduct.sizes[0] || 'Standard',
                      quickViewProduct.colors[0]?.name || 'Standard'
                    )
                    setQuickViewProduct(null)
                  }}
                >
                  Add to cart
                </button>
                <button
                  type="button"
                  style={{
                    background: 'transparent',
                    border: '1px solid var(--nat-border)',
                    padding: '12px',
                    borderRadius: 'var(--nat-radius-btn)',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    handleOpenPdp(quickViewProduct)
                    setQuickViewProduct(null)
                  }}
                >
                  View full details →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= FLOATING TOAST NOTIFICATION ================= */}
      {toastMessage && (
        <div className="naturya-toast">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}

export default NaturyaFashionStorefront
