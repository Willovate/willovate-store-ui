import React, { useState, useEffect, useMemo } from 'react'
import type {
  OptimalProduct,
  OptimalCategoryType,
  OptimalCartItem,
  OptimalStorefrontProps,
} from './types'
import {
  OPTIMAL_PRODUCTS,
  OPTIMAL_CATEGORIES,
  OPTIMAL_BLOG_POSTS,
  OPTIMAL_TESTIMONIALS,
  OPTIMAL_TRUST_PROMISES,
  OPTIMAL_BRANDS,
  OPTIMAL_NAV_LINKS,
} from './data/optimalData'
import './styles/optimalFashion.css'

export const OptimalFashionStorefront: React.FC<OptimalStorefrontProps> = ({
  template: _template,
  device = 'desktop',
  customAccentColor,
  onUseTemplate: _onUseTemplate,
  onClose: _onClose,
  onBack: _onBack,
}) => {
  // Navigation & View State
  const [activeView, setActiveView] = useState<'home' | 'collection' | 'pdp'>('home')
  const [activeCategory, setActiveCategory] = useState<OptimalCategoryType>('All')
  const [selectedProduct, setSelectedProduct] = useState<OptimalProduct>(OPTIMAL_PRODUCTS[0])
  const [quickViewProduct, setQuickViewProduct] = useState<OptimalProduct | null>(null)
  const [sizeChartOpen, setSizeChartOpen] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)
  const [browseDropdownOpen, setBrowseDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    const checkScreen = () => {
      setIsSmallScreen(window.innerWidth <= 768)
    }
    checkScreen()
    window.addEventListener('resize', checkScreen)
    return () => window.removeEventListener('resize', checkScreen)
  }, [])

  const isMobile = device === 'mobile' || isSmallScreen
  const [mobileFiltersExpanded, setMobileFiltersExpanded] = useState(false)
  const [homeTab, setHomeTab] = useState<'featured' | 'bestsellers' | 'new' | 'sale'>('featured')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('')
  const [headerSearchCat, setHeaderSearchCat] = useState<OptimalCategoryType>('All')
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured')
  const [selectedGenderFilter, setSelectedGenderFilter] = useState<'All' | 'Women' | 'Men' | 'Unisex'>('All')
  const [maxPriceFilter, setMaxPriceFilter] = useState<number>(20000)

  // PDP Local State
  const [pdpSelectedImage, setPdpSelectedImage] = useState<string>(OPTIMAL_PRODUCTS[0].image)
  const [pdpSelectedColor, setPdpSelectedColor] = useState<string>(OPTIMAL_PRODUCTS[0].colors[0]?.name || 'Standard')
  const [pdpSelectedSize, setPdpSelectedSize] = useState<string>(OPTIMAL_PRODUCTS[0].sizes[0] || 'M')
  const [pdpQuantity, setPdpQuantity] = useState(1)
  const [pdpSpecsTab, setPdpSpecsTab] = useState<'desc' | 'specs' | 'care' | 'shipping'>('desc')

  // Cart State (Initialized with demo item)
  const [cart, setCart] = useState<OptimalCartItem[]>([
    {
      product: OPTIMAL_PRODUCTS[0],
      size: 'L',
      color: 'Matte Obsidian',
      quantity: 1,
    },
    {
      product: OPTIMAL_PRODUCTS[4],
      size: 'EU 42',
      color: 'Vintage Brown',
      quantity: 1,
    },
  ])

  // Wishlist State
  const [wishlist, setWishlist] = useState<string[]>(['opt-01', 'opt-07'])

  // Deal Countdown Timer (Ticking every second)
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 36,
    seconds: 42,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return { hours: 24, minutes: 0, seconds: 0 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Sync PDP state when selectedProduct changes
  useEffect(() => {
    if (selectedProduct) {
      setPdpSelectedImage(selectedProduct.image)
      setPdpSelectedColor(selectedProduct.colors[0]?.name || 'Standard')
      setPdpSelectedSize(selectedProduct.sizes[0] || 'M')
      setPdpQuantity(1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [selectedProduct])

  // Trigger Toast Notification
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  // Wishlist toggle
  const toggleWishlist = (id: string, name: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(id)
      if (exists) {
        showToast(`Removed "${name}" from Wishlist`)
        return prev.filter((item) => item !== id)
      } else {
        showToast(`Added "${name}" to Wishlist`)
        return [...prev, id]
      }
    })
  }

  // Cart operations
  const addToCart = (product: OptimalProduct, size: string, color: string, qty = 1) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      )
      if (existingIndex > -1) {
        const next = [...prev]
        next[existingIndex].quantity += qty
        return next
      } else {
        return [...prev, { product, size, color, quantity: qty }]
      }
    })
    showToast(`Added "${product.name}" (${size}) to Cart`)
    setCartOpen(true)
  }

  const updateCartQty = (index: number, delta: number) => {
    setCart((prev) => {
      const next = [...prev]
      const newQty = next[index].quantity + delta
      if (newQty <= 0) {
        return next.filter((_, i) => i !== index)
      }
      next[index].quantity = newQty
      return next
    })
  }

  const removeCartItem = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index))
  }

  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }, [cart])

  const cartItemCount = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0)
  }, [cart])

  const freeShippingThreshold = 2999
  const shippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100))

  // Filtered Products for Home Tab
  const homeTabProducts = useMemo(() => {
    switch (homeTab) {
      case 'bestsellers':
        return OPTIMAL_PRODUCTS.filter((p) => p.isHot || p.rating >= 4.9).slice(0, 8)
      case 'new':
        return OPTIMAL_PRODUCTS.filter((p) => p.isNew).slice(0, 8)
      case 'sale':
        return OPTIMAL_PRODUCTS.filter((p) => p.isSale).slice(0, 8)
      case 'featured':
      default:
        return OPTIMAL_PRODUCTS.filter((p) => p.isFeatured).slice(0, 8)
    }
  }, [homeTab])

  // Filtered Products for Collection View
  const collectionProducts = useMemo(() => {
    return OPTIMAL_PRODUCTS.filter((p) => {
      if (activeCategory !== 'All' && p.category !== activeCategory) {
        if (activeCategory === 'Deals & Sale' && !p.isSale) return false
        if (activeCategory !== 'Deals & Sale') return false
      }
      if (selectedGenderFilter !== 'All' && p.gender !== selectedGenderFilter && p.gender !== 'Unisex') {
        return false
      }
      if (p.price > maxPriceFilter) return false
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase()
        const matchesName = p.name.toLowerCase().includes(query)
        const matchesBrand = p.brand.toLowerCase().includes(query)
        const matchesDesc = p.description.toLowerCase().includes(query)
        if (!matchesName && !matchesBrand && !matchesDesc) return false
      }
      return true
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price
      if (sortBy === 'price-desc') return b.price - a.price
      if (sortBy === 'rating') return b.rating - a.rating
      return 0
    })
  }, [activeCategory, selectedGenderFilter, maxPriceFilter, searchQuery, sortBy])

  // Deals of the day list
  const dealProducts = useMemo(() => {
    return OPTIMAL_PRODUCTS.filter((p) => p.dealOfTheDay).slice(0, 4)
  }, [])

  // Navigation handlers
  const handleNavCategory = (cat: OptimalCategoryType) => {
    setActiveCategory(cat)
    setActiveView('collection')
    setBrowseDropdownOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleOpenPdp = (prod: OptimalProduct) => {
    setSelectedProduct(prod)
    setActiveView('pdp')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (headerSearchCat !== 'All') {
      setActiveCategory(headerSearchCat)
    }
    setActiveView('collection')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Format currency helper
  const fmt = (num: number) => `₹${num.toLocaleString('en-IN')}`

  return (
    <div
      className={`optimal-root ${isMobile ? 'optimal-mobile device-mobile is-mobile' : `optimal-${device}`}`}
      style={
        {
          ...(customAccentColor ? { '--opt-primary': customAccentColor } : {}),
        } as React.CSSProperties
      }
    >
      {/* ================= TOP UTILITY BAR ================= */}
      <div className="optimal-topbar">
        <div className="optimal-container">
          <div className="optimal-topbar-inner">
            {!isMobile && (
              <div className="optimal-topbar-left">
                <span className="optimal-topbar-item">
                  <span>📞</span> 24/7 Concierge: +1 (800) 555-0199
                </span>
                <span className="optimal-topbar-item">
                  <span>📍</span> Store Locator
                </span>
                <span className="optimal-topbar-item">
                  <span>📦</span> Track Order
                </span>
              </div>
            )}
            <div className="optimal-topbar-center">
              🔥 FLASH SALE: Extra <strong>20% OFF</strong>! Code:{' '}
              <strong>OPTIMAL20</strong>
            </div>
            {!isMobile && (
              <div className="optimal-topbar-right">
                <select className="optimal-topbar-select" defaultValue="INR">
                  <option value="INR">INR (₹)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
                <select className="optimal-topbar-select" defaultValue="EN">
                  <option value="EN">English</option>
                  <option value="FR">Français</option>
                  <option value="DE">Deutsch</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ================= MAIN SEARCH HEADER ================= */}
      <header className="optimal-header-main">
        <div className="optimal-container">
          <div className="optimal-header-row">
            {/* Mobile Hamburger Toggle (Velocity Style) */}
            <button
              type="button"
              className="optimal-mobile-hamburger-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
            >
              <span className="optimal-hamburger-bar" />
              <span className="optimal-hamburger-bar" />
              <span className="optimal-hamburger-bar" />
            </button>

            {/* Logo */}
            <a
              href="#home"
              className="optimal-logo"
              onClick={(e) => {
                e.preventDefault()
                setActiveView('home')
                window.scrollTo({ top: 0, behavior: 'smooth' })
              }}
            >
              <div className="optimal-logo-mark">O</div>
              <div className="optimal-logo-text-block">
                <span className="optimal-logo-text">OPTIMAL</span>
                <span className="optimal-logo-accent">.</span>
                <span className="optimal-logo-tagline">Department Store</span>
              </div>
            </a>

            {/* Large Search Bar with Category Dropdown (Desktop Only) */}
            {!isMobile && (
              <form className="optimal-search-wrapper" onSubmit={handleSearchSubmit}>
                <select
                  className="optimal-search-category"
                  value={headerSearchCat}
                  onChange={(e) => setHeaderSearchCat(e.target.value as OptimalCategoryType)}
                >
                  <option value="All">All Categories</option>
                  <option value="Women">Women</option>
                  <option value="Men">Men</option>
                  <option value="Outerwear">Outerwear</option>
                  <option value="Dresses">Dresses</option>
                  <option value="Footwear">Footwear</option>
                  <option value="Bags & Luggage">Bags & Luggage</option>
                  <option value="Watches & Jewelry">Watches</option>
                  <option value="Accessories">Accessories</option>
                </select>
                <input
                  type="text"
                  className="optimal-search-input"
                  placeholder="Search over 2,500+ curated fashion pieces, coats, shoes..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="optimal-search-btn">
                  <span>🔍</span> Search
                </button>
              </form>
            )}

            {/* Quick Actions (Wishlist, Account, Cart) */}
            <div className="optimal-header-actions">
              {isMobile && (
                <button
                  type="button"
                  className="optimal-action-btn optimal-search-toggle-btn"
                  onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
                  title="Search"
                  aria-label="Search"
                >
                  <div className="optimal-action-icon-wrap">
                    <span>🔍</span>
                  </div>
                </button>
              )}

              <button
                type="button"
                className="optimal-action-btn"
                onClick={() => {
                  setActiveCategory('All')
                  setActiveView('collection')
                  showToast(`Showing ${wishlist.length} item(s) in your saved list`)
                }}
                title="Wishlist"
              >
                <div className="optimal-action-icon-wrap">
                  <span>♡</span>
                  {wishlist.length > 0 && <span className="optimal-badge-counter">{wishlist.length}</span>}
                </div>
                {!isMobile && (
                  <div className="optimal-action-text">
                    <span className="optimal-action-label">Favorite</span>
                    <span className="optimal-action-val">Wishlist</span>
                  </div>
                )}
              </button>

              <button
                type="button"
                className="optimal-action-btn"
                onClick={() => setCartOpen(true)}
                title="View Cart"
              >
                <div className="optimal-action-icon-wrap">
                  <span>🛍️</span>
                  {cartItemCount > 0 && <span className="optimal-badge-counter">{cartItemCount}</span>}
                </div>
                {!isMobile && (
                  <div className="optimal-action-text">
                    <span className="optimal-action-label">Your Bag</span>
                    <span className="optimal-action-val">{fmt(cartSubtotal)}</span>
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Collapsible Mobile Search Bar */}
          {isMobile && mobileSearchOpen && (
            <form className="optimal-mobile-search-bar" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="optimal-mobile-search-input"
                placeholder="Search coats, shoes, bags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button type="submit" className="optimal-mobile-search-submit">
                🔍
              </button>
            </form>
          )}
        </div>
      </header>

      {/* Mobile Drawer Navigation (Velocity Style) */}
      {mobileMenuOpen && (
        <div className="optimal-mobile-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="optimal-mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="optimal-mobile-drawer-header">
              <span className="optimal-mobile-drawer-title">Department Categories</span>
              <button
                type="button"
                className="optimal-mobile-drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <div className="optimal-mobile-drawer-body">
              <div className="optimal-mobile-drawer-nav">
                <button
                  type="button"
                  className={`optimal-mobile-drawer-link ${activeView === 'home' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveView('home')
                    setActiveCategory('All')
                    setMobileMenuOpen(false)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  <span>🏠 Home</span>
                  <span>›</span>
                </button>
                {OPTIMAL_NAV_LINKS.filter((c) => c !== 'Home').map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    className={`optimal-mobile-drawer-link ${activeCategory === cat && activeView === 'collection' ? 'active' : ''}`}
                    onClick={() => {
                      handleNavCategory(cat as OptimalCategoryType)
                      setMobileMenuOpen(false)
                    }}
                  >
                    <span>{cat}</span>
                    <span>›</span>
                  </button>
                ))}
              </div>
              <div className="optimal-mobile-drawer-footer">
                <div className="optimal-mobile-drawer-info">
                  <span>📞 24/7 Concierge</span>
                  <strong>+1 (800) 555-0199</strong>
                </div>
                <div className="optimal-mobile-drawer-info">
                  <span>📦 Track Order</span>
                  <span>📍 Store Locator</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= NAVIGATION BAR WITH CATEGORY FLYOUT (DESKTOP ONLY) ================= */}
      {!isMobile && (
        <nav className="optimal-navbar">
          <div className="optimal-container">
            <div className="optimal-nav-inner">
              {/* Browse Categories Flyout Button */}
              <div className="optimal-browse-categories-wrapper">
                <button
                  type="button"
                  className="optimal-browse-btn"
                  onClick={() => setBrowseDropdownOpen(!browseDropdownOpen)}
                >
                  <span className="optimal-browse-left">
                    <span>☰</span> BROWSE CATEGORIES
                  </span>
                  <span>{browseDropdownOpen ? '▲' : '▼'}</span>
                </button>

                {browseDropdownOpen && (
                  <div className="optimal-categories-dropdown">
                    {OPTIMAL_NAV_LINKS.filter((c) => c !== 'Home').map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        className={`optimal-category-flyout-item ${
                          activeCategory === cat ? 'active' : ''
                        }`}
                        onClick={() => handleNavCategory(cat as OptimalCategoryType)}
                      >
                        <span>{cat}</span>
                        <span>›</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Horizontal Nav Links */}
              <div className="optimal-nav-links">
                <button
                  type="button"
                  className={`optimal-nav-link ${activeView === 'home' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveView('home')
                    setActiveCategory('All')
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  Home
                </button>

                <button
                  type="button"
                  className={`optimal-nav-link ${activeCategory === 'Women' && activeView === 'collection' ? 'active' : ''}`}
                  onClick={() => handleNavCategory('Women')}
                >
                  Women <span className="optimal-nav-tag hot">HOT</span>
                </button>

                <button
                  type="button"
                  className={`optimal-nav-link ${activeCategory === 'Men' && activeView === 'collection' ? 'active' : ''}`}
                  onClick={() => handleNavCategory('Men')}
                >
                  Men
                </button>

                <button
                  type="button"
                  className={`optimal-nav-link ${activeCategory === 'Outerwear' && activeView === 'collection' ? 'active' : ''}`}
                  onClick={() => handleNavCategory('Outerwear')}
                >
                  Outerwear <span className="optimal-nav-tag new">NEW</span>
                </button>

                <button
                  type="button"
                  className={`optimal-nav-link ${activeCategory === 'Dresses' && activeView === 'collection' ? 'active' : ''}`}
                  onClick={() => handleNavCategory('Dresses')}
                >
                  Dresses
                </button>

                <button
                  type="button"
                  className={`optimal-nav-link ${activeCategory === 'Footwear' && activeView === 'collection' ? 'active' : ''}`}
                  onClick={() => handleNavCategory('Footwear')}
                >
                  Footwear
                </button>

                <button
                  type="button"
                  className={`optimal-nav-link ${activeCategory === 'Bags & Luggage' && activeView === 'collection' ? 'active' : ''}`}
                  onClick={() => handleNavCategory('Bags & Luggage')}
                >
                  Bags & Luggage
                </button>

                <button
                  type="button"
                  className={`optimal-nav-link ${activeCategory === 'Deals & Sale' && activeView === 'collection' ? 'active' : ''}`}
                  onClick={() => handleNavCategory('Deals & Sale')}
                >
                  Deals & Sale
                </button>
              </div>

              {/* Helpline / Support */}
              <div className="optimal-nav-help">
                <span>⚡ Need help?</span>
                <strong>+1 (800) 555-0199</strong>
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* ================= VIEW: HOME ================= */}
      {activeView === 'home' && (
        <main>
          {/* HERO CAROUSEL & PROMO SPLIT */}
          <section className="optimal-hero-section">
            <div className="optimal-container">
              <div className="optimal-hero-grid">
                {/* Main Hero Card */}
                <div
                  className="optimal-hero-main"
                  style={{
                    backgroundImage: `url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1400&q=85)`,
                  }}
                >
                  <div className="optimal-hero-overlay">
                    <div className="optimal-hero-content">
                      <div className="optimal-hero-pill">NEW SEASON 2026 DROP</div>
                      <h1 className="optimal-hero-title">Urban Elegance & High Performance Outerwear</h1>
                      <p className="optimal-hero-desc">
                        Explore our newest editorial collections crafted with Italian virgin wool, French lace, and
                        polar down insulation.
                      </p>
                      <div className="optimal-hero-btn-group">
                        <button
                          type="button"
                          className="optimal-btn-primary"
                          onClick={() => handleNavCategory('Outerwear')}
                        >
                          SHOP COLLECTION →
                        </button>
                        <button
                          type="button"
                          className="optimal-btn-outline"
                          onClick={() => handleNavCategory('Deals & Sale')}
                        >
                          EXPLORE DEALS
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stacked Side Promos */}
                <div className="optimal-hero-side">
                  <div
                    className="optimal-promo-card"
                    style={{
                      backgroundImage: `url(https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=800&q=85)`,
                    }}
                  >
                    <div className="optimal-promo-card-overlay" />
                    <div className="optimal-promo-card-content">
                      <div className="optimal-promo-badge">FOOTWEAR EDIT</div>
                      <h3 className="optimal-promo-title">Goodyear Welted Boots & Loafers</h3>
                      <button
                        type="button"
                        className="optimal-promo-link"
                        onClick={() => handleNavCategory('Footwear')}
                      >
                        Shop Footwear →
                      </button>
                    </div>
                  </div>

                  <div
                    className="optimal-promo-card"
                    style={{
                      backgroundImage: `url(https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=85)`,
                    }}
                  >
                    <div className="optimal-promo-card-overlay" />
                    <div className="optimal-promo-card-content">
                      <div className="optimal-promo-badge">LIMITED ACCESS</div>
                      <h3 className="optimal-promo-title">Tuscan Leather Bags & Totes</h3>
                      <button
                        type="button"
                        className="optimal-promo-link"
                        onClick={() => handleNavCategory('Bags & Luggage')}
                      >
                        Shop Handbags →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* TRUST PROMISES STRIP */}
          <section className="optimal-container">
            <div className="optimal-trust-strip">
              <div className="optimal-trust-grid">
                {OPTIMAL_TRUST_PROMISES.map((item, idx) => (
                  <div key={idx} className="optimal-trust-item">
                    <div className="optimal-trust-icon">{item.icon}</div>
                    <div className="optimal-trust-info">
                      <h4>{item.title}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* DEALS OF THE DAY / FLASH SALE WITH STOCK PROGRESS */}
          <section className="optimal-container">
            <div className="optimal-deals-section">
              <div className="optimal-deals-header">
                <div className="optimal-deals-title-wrap">
                  <span className="optimal-deals-badge">FLASH SALE</span>
                  <h2 className="optimal-deals-title">Deals of the Day</h2>
                </div>

                {/* Countdown */}
                <div className="optimal-countdown-timer">
                  <div className="optimal-countdown-box">
                    <div className="optimal-countdown-num">02</div>
                    <div className="optimal-countdown-lbl">Days</div>
                  </div>
                  <span className="optimal-countdown-colon">:</span>
                  <div className="optimal-countdown-box">
                    <div className="optimal-countdown-num">
                      {String(timeLeft.hours).padStart(2, '0')}
                    </div>
                    <div className="optimal-countdown-lbl">Hours</div>
                  </div>
                  <span className="optimal-countdown-colon">:</span>
                  <div className="optimal-countdown-box">
                    <div className="optimal-countdown-num">
                      {String(timeLeft.minutes).padStart(2, '0')}
                    </div>
                    <div className="optimal-countdown-lbl">Mins</div>
                  </div>
                  <span className="optimal-countdown-colon">:</span>
                  <div className="optimal-countdown-box">
                    <div className="optimal-countdown-num">
                      {String(timeLeft.seconds).padStart(2, '0')}
                    </div>
                    <div className="optimal-countdown-lbl">Secs</div>
                  </div>
                </div>
              </div>

              {/* Deal Cards Grid */}
              <div className="optimal-deals-grid">
                {dealProducts.map((prod) => {
                  const sold = prod.soldCount || 30
                  const total = prod.totalStock || 50
                  const percentSold = Math.round((sold / total) * 100)
                  const isWish = wishlist.includes(prod.id)

                  return (
                    <div key={prod.id} className="optimal-product-card">
                      <div
                        className="optimal-product-image-container"
                        onClick={() => handleOpenPdp(prod)}
                      >
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="optimal-product-image main"
                          loading="lazy"
                        />
                        <img
                          src={prod.alternateImage}
                          alt={prod.name}
                          className="optimal-product-image alt"
                          loading="lazy"
                        />

                        <div className="optimal-card-badges">
                          <span className="optimal-badge sale">-35% OFF</span>
                          <span className="optimal-badge hot">DEAL</span>
                        </div>

                        <div
                          className="optimal-card-actions"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            type="button"
                            className={`optimal-icon-action-btn ${isWish ? 'active' : ''}`}
                            onClick={() => toggleWishlist(prod.id, prod.name)}
                            title="Add to Wishlist"
                          >
                            {isWish ? '♥' : '♡'}
                          </button>
                          <button
                            type="button"
                            className="optimal-icon-action-btn"
                            onClick={() => setQuickViewProduct(prod)}
                            title="Quick View"
                          >
                            👁
                          </button>
                        </div>
                      </div>

                      <div className="optimal-product-body">
                        <div className="optimal-product-brand">{prod.brand}</div>
                        <h4
                          className="optimal-product-title"
                          onClick={() => handleOpenPdp(prod)}
                        >
                          {prod.name}
                        </h4>

                        <div className="optimal-product-rating">
                          <span className="optimal-stars">★★★★★</span>
                          <span>({prod.reviewCount})</span>
                        </div>

                        <div className="optimal-product-price-row">
                          <span className="optimal-current-price">{fmt(prod.price)}</span>
                          {prod.compareAtPrice && (
                            <span className="optimal-compare-price">
                              {fmt(prod.compareAtPrice)}
                            </span>
                          )}
                        </div>

                        {/* Stock Progress Bar */}
                        <div className="optimal-stock-progress-wrap">
                          <div className="optimal-stock-labels">
                            <span>
                              Sold: <strong>{sold}</strong>
                            </span>
                            <span>
                              Available: <strong>{total - sold}</strong>
                            </span>
                          </div>
                          <div className="optimal-progress-track">
                            <div
                              className="optimal-progress-fill"
                              style={{ width: `${percentSold}%` }}
                            />
                          </div>
                        </div>

                        <button
                          type="button"
                          className="optimal-quick-add-btn"
                          onClick={() =>
                            addToCart(
                              prod,
                              prod.sizes[0] || 'Standard',
                              prod.colors[0]?.name || 'Standard'
                            )
                          }
                        >
                          ⚡ QUICK ADD
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* DEPARTMENT TILES */}
          <section className="optimal-container optimal-category-section">
            <div className="optimal-section-heading">
              <div>
                <h2 className="optimal-section-title">Explore by Department</h2>
                <p className="optimal-section-subtitle">
                  Browse through our carefully segmented categories designed for every occasion
                </p>
              </div>
              <button
                type="button"
                className="optimal-view-all-link"
                onClick={() => handleNavCategory('All')}
              >
                View All Departments →
              </button>
            </div>

            <div className="optimal-category-grid">
              {OPTIMAL_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className="optimal-cat-card"
                  onClick={() => handleNavCategory(cat.category)}
                >
                  <div className="optimal-cat-img-wrap">
                    <img
                      src={cat.image}
                      alt={cat.title}
                      className="optimal-cat-img"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="optimal-cat-title">{cat.title}</h4>
                  <span className="optimal-cat-count">{cat.itemCount}</span>
                </div>
              ))}
            </div>
          </section>

          {/* TABBED FEATURED PRODUCTS SECTION */}
          <section className="optimal-container">
            <div className="optimal-tabs-header">
              <div>
                <h2 className="optimal-section-title">Featured Collections</h2>
                <p className="optimal-section-subtitle">
                  Selected pieces engineered for contemporary life and classic aesthetics
                </p>
              </div>

              <div className="optimal-tabs-list">
                <button
                  type="button"
                  className={`optimal-tab-btn ${homeTab === 'featured' ? 'active' : ''}`}
                  onClick={() => setHomeTab('featured')}
                >
                  Featured
                </button>
                <button
                  type="button"
                  className={`optimal-tab-btn ${homeTab === 'bestsellers' ? 'active' : ''}`}
                  onClick={() => setHomeTab('bestsellers')}
                >
                  Best Sellers
                </button>
                <button
                  type="button"
                  className={`optimal-tab-btn ${homeTab === 'new' ? 'active' : ''}`}
                  onClick={() => setHomeTab('new')}
                >
                  New Arrivals
                </button>
                <button
                  type="button"
                  className={`optimal-tab-btn ${homeTab === 'sale' ? 'active' : ''}`}
                  onClick={() => setHomeTab('sale')}
                >
                  On Sale
                </button>
              </div>
            </div>

            <div className="optimal-products-grid">
              {homeTabProducts.map((prod) => {
                const isWish = wishlist.includes(prod.id)
                return (
                  <div key={prod.id} className="optimal-product-card">
                    <div
                      className="optimal-product-image-container"
                      onClick={() => handleOpenPdp(prod)}
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="optimal-product-image main"
                        loading="lazy"
                      />
                      <img
                        src={prod.alternateImage}
                        alt={prod.name}
                        className="optimal-product-image alt"
                        loading="lazy"
                      />

                      <div className="optimal-card-badges">
                        {prod.isSale && <span className="optimal-badge sale">SALE</span>}
                        {prod.isNew && <span className="optimal-badge new">NEW</span>}
                        {prod.isHot && <span className="optimal-badge hot">HOT</span>}
                      </div>

                      <div
                        className="optimal-card-actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          className={`optimal-icon-action-btn ${isWish ? 'active' : ''}`}
                          onClick={() => toggleWishlist(prod.id, prod.name)}
                          title="Add to Wishlist"
                        >
                          {isWish ? '♥' : '♡'}
                        </button>
                        <button
                          type="button"
                          className="optimal-icon-action-btn"
                          onClick={() => setQuickViewProduct(prod)}
                          title="Quick View"
                        >
                          👁
                        </button>
                      </div>
                    </div>

                    <div className="optimal-product-body">
                      <div className="optimal-product-brand">{prod.brand}</div>
                      <h4
                        className="optimal-product-title"
                        onClick={() => handleOpenPdp(prod)}
                      >
                        {prod.name}
                      </h4>

                      <div className="optimal-product-rating">
                        <span className="optimal-stars">★★★★★</span>
                        <span>({prod.reviewCount})</span>
                      </div>

                      <div className="optimal-card-swatches">
                        {prod.colors.map((c, i) => (
                          <span
                            key={i}
                            className="optimal-swatch-dot"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>

                      <div className="optimal-product-price-row">
                        <span className="optimal-current-price">{fmt(prod.price)}</span>
                        {prod.compareAtPrice && (
                          <span className="optimal-compare-price">
                            {fmt(prod.compareAtPrice)}
                          </span>
                        )}
                        {prod.compareAtPrice && (
                          <span className="optimal-save-percent">
                            Save {Math.round(((prod.compareAtPrice - prod.price) / prod.compareAtPrice) * 100)}%
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        className="optimal-quick-add-btn"
                        onClick={() =>
                          addToCart(
                            prod,
                            prod.sizes[0] || 'Standard',
                            prod.colors[0]?.name || 'Standard'
                          )
                        }
                      >
                        🛒 ADD TO CART
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          {/* MID-PAGE CALLOUT BANNER */}
          <section className="optimal-container">
            <div className="optimal-callout-banner">
              <div className="optimal-callout-inner">
                <div className="optimal-callout-info">
                  <div className="optimal-callout-tag">LIMITED TIME ATELIER OFFER</div>
                  <h2 className="optimal-callout-title">The Sartorial Wardrobe Upgrade</h2>
                  <p className="optimal-callout-desc">
                    Enjoy up to 40% off on premium tailoring, cashmere knitwear, and handcrafted footwear.
                    Complimentary monogramming and luxury garment bag included.
                  </p>
                </div>
                <div className="optimal-callout-action">
                  <div className="optimal-coupon-badge">USE CODE: OPTIMAL20</div>
                  <button
                    type="button"
                    className="optimal-btn-primary"
                    onClick={() => handleNavCategory('Men')}
                  >
                    SHOP TAILORING →
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* VERIFIED CUSTOMER REVIEWS */}
          <section className="optimal-container">
            <div className="optimal-section-heading">
              <div>
                <h2 className="optimal-section-title">Verified Customer Experiences</h2>
                <p className="optimal-section-subtitle">
                  Read authentic feedback from collectors and discerning fashion patrons
                </p>
              </div>
            </div>

            <div className="optimal-testimonials-grid">
              {OPTIMAL_TESTIMONIALS.map((t) => (
                <div key={t.id} className="optimal-testimonial-card">
                  <div className="optimal-testimonial-stars">★★★★★</div>
                  <p className="optimal-testimonial-quote">"{t.comment}"</p>
                  <div className="optimal-testimonial-user">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="optimal-testimonial-avatar"
                      loading="lazy"
                    />
                    <div>
                      <h4 className="optimal-testimonial-name">{t.name}</h4>
                      <p className="optimal-testimonial-location">
                        {t.role} • {t.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* FASHION EDITORIAL BLOG */}
          <section className="optimal-container">
            <div className="optimal-section-heading">
              <div>
                <h2 className="optimal-section-title">From the Atelier Journal</h2>
                <p className="optimal-section-subtitle">
                  Guides on sartorial craftsmanship, textile engineering, and timeless wardrobe styling
                </p>
              </div>
            </div>

            <div className="optimal-blog-grid">
              {OPTIMAL_BLOG_POSTS.map((post) => (
                <article key={post.id} className="optimal-blog-card">
                  <div className="optimal-blog-thumb-wrap">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="optimal-blog-thumb"
                      loading="lazy"
                    />
                    <span className="optimal-blog-cat">{post.category}</span>
                  </div>
                  <div className="optimal-blog-body">
                    <div className="optimal-blog-meta">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="optimal-blog-title">{post.title}</h3>
                    <p className="optimal-blog-snippet">{post.snippet}</p>
                    <a
                      href="#read"
                      className="optimal-blog-link"
                      onClick={(e) => {
                        e.preventDefault()
                        showToast(`Opening article: "${post.title}"`)
                      }}
                    >
                      Read Full Article →
                    </a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* PARTNER BRANDS */}
          <section className="optimal-container">
            <div className="optimal-brands-strip">
              {OPTIMAL_BRANDS.map((brand, i) => (
                <span
                  key={i}
                  className="optimal-brand-item"
                  onClick={() => showToast(`Filtering brand: ${brand}`)}
                >
                  {brand}
                </span>
              ))}
            </div>
          </section>

          {/* NEWSLETTER STRIP */}
          <section className="optimal-container">
            <div className="optimal-newsletter-strip">
              <div className="optimal-newsletter-text">
                <h3>Join the Optimal Private Circle</h3>
                <p>
                  Receive early access to seasonal capsule launches, secret flash sales, and private styling previews.
                </p>
              </div>
              <form
                className="optimal-newsletter-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  showToast('Thank you for subscribing! Check your inbox for your 15% welcome voucher.')
                }}
              >
                <input
                  type="email"
                  className="optimal-newsletter-input"
                  placeholder="Enter your email address..."
                  required
                />
                <button type="submit" className="optimal-btn-primary">
                  SUBSCRIBE
                </button>
              </form>
            </div>
          </section>
        </main>
      )}

      {/* ================= VIEW: COLLECTION ================= */}
      {activeView === 'collection' && (
        <main className="optimal-container">
          {/* Mobile Category Quick-Scroll Pills Bar */}
          {isMobile && (
            <div className="optimal-mobile-cat-pills-bar">
              {(
                [
                  'All',
                  'Women',
                  'Men',
                  'Outerwear',
                  'Dresses',
                  'Footwear',
                  'Bags & Luggage',
                  'Accessories',
                  'Deals & Sale',
                ] as OptimalCategoryType[]
              ).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  className={`optimal-mobile-cat-pill ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}

          {/* Mobile Filters Toggle Button */}
          {isMobile && (
            <div className="optimal-mobile-filters-bar">
              <button
                type="button"
                className="optimal-mobile-filters-toggle"
                onClick={() => setMobileFiltersExpanded(!mobileFiltersExpanded)}
              >
                <span>⚙️ Filter: {activeCategory} {selectedGenderFilter !== 'All' ? `• ${selectedGenderFilter}` : ''}</span>
                <span>{mobileFiltersExpanded ? '▲ Hide Filters' : '▼ More Filters'}</span>
              </button>
            </div>
          )}

          <div className="optimal-collection-layout">
            {/* Filters Sidebar (Collapsible on Mobile, Persistent on Desktop) */}
            {(!isMobile || mobileFiltersExpanded) && (
              <aside className="optimal-filters-sidebar">
                <div className="optimal-filter-group">
                  <div className="optimal-filter-title">Categories</div>
                  <div className="optimal-filter-options">
                    {(['All', 'Women', 'Men', 'Outerwear', 'Dresses', 'Footwear', 'Bags & Luggage', 'Accessories', 'Deals & Sale'] as OptimalCategoryType[]).map((cat) => (
                      <label key={cat} className="optimal-filter-checkbox-label">
                        <input
                          type="radio"
                          name="collection-cat"
                          checked={activeCategory === cat}
                          onChange={() => setActiveCategory(cat)}
                        />
                        <span>{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="optimal-filter-group">
                  <div className="optimal-filter-title">Gender</div>
                  <div className="optimal-filter-options">
                    {(['All', 'Women', 'Men', 'Unisex'] as const).map((g) => (
                      <label key={g} className="optimal-filter-checkbox-label">
                        <input
                          type="radio"
                          name="collection-gender"
                          checked={selectedGenderFilter === g}
                          onChange={() => setSelectedGenderFilter(g)}
                        />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="optimal-filter-group">
                  <div className="optimal-filter-title">
                    Max Price: {fmt(maxPriceFilter)}
                  </div>
                  <input
                    type="range"
                    min={1000}
                    max={25000}
                    step={500}
                    value={maxPriceFilter}
                    onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                    style={{ width: '100%', cursor: 'pointer' }}
                  />
                </div>

                <button
                  type="button"
                  className="optimal-btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => {
                    setActiveCategory('All')
                    setSelectedGenderFilter('All')
                    setMaxPriceFilter(20000)
                    setSearchQuery('')
                    if (isMobile) setMobileFiltersExpanded(false)
                  }}
                >
                  Reset Filters
                </button>
              </aside>
            )}

            {/* Collection Grid Area */}
            <div className="optimal-collection-products-wrap">
              <div className="optimal-collection-toolbar">
                <div className="optimal-results-count">
                  Showing <strong>{collectionProducts.length}</strong> items for category{' '}
                  <strong>"{activeCategory}"</strong>
                </div>

                <select
                  className="optimal-sort-select"
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
                <div
                  style={{
                    textAlign: 'center',
                    padding: '80px 20px',
                    background: '#ffffff',
                    borderRadius: 'var(--opt-radius-md)',
                  }}
                >
                  <h3>No products found</h3>
                  <p style={{ color: 'var(--opt-muted)' }}>
                    Try adjusting your filters or search terms.
                  </p>
                  <button
                    type="button"
                    className="optimal-btn-primary"
                    onClick={() => {
                      setActiveCategory('All')
                      setMaxPriceFilter(20000)
                      setSearchQuery('')
                    }}
                  >
                    View All Products
                  </button>
                </div>
              ) : (
                <div className="optimal-products-grid">
                  {collectionProducts.map((prod) => {
                    const isWish = wishlist.includes(prod.id)
                    return (
                      <div key={prod.id} className="optimal-product-card">
                        <div
                          className="optimal-product-image-container"
                          onClick={() => handleOpenPdp(prod)}
                        >
                          <img
                            src={prod.image}
                            alt={prod.name}
                            className="optimal-product-image main"
                            loading="lazy"
                          />
                          <img
                            src={prod.alternateImage}
                            alt={prod.name}
                            className="optimal-product-image alt"
                            loading="lazy"
                          />

                          <div className="optimal-card-badges">
                            {prod.isSale && <span className="optimal-badge sale">SALE</span>}
                            {prod.isNew && <span className="optimal-badge new">NEW</span>}
                            {prod.isHot && <span className="optimal-badge hot">HOT</span>}
                          </div>

                          <div
                            className="optimal-card-actions"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <button
                              type="button"
                              className={`optimal-icon-action-btn ${isWish ? 'active' : ''}`}
                              onClick={() => toggleWishlist(prod.id, prod.name)}
                              title="Add to Wishlist"
                            >
                              {isWish ? '♥' : '♡'}
                            </button>
                            <button
                              type="button"
                              className="optimal-icon-action-btn"
                              onClick={() => setQuickViewProduct(prod)}
                              title="Quick View"
                            >
                              👁
                            </button>
                          </div>
                        </div>

                        <div className="optimal-product-body">
                          <div className="optimal-product-brand">{prod.brand}</div>
                          <h4
                            className="optimal-product-title"
                            onClick={() => handleOpenPdp(prod)}
                          >
                            {prod.name}
                          </h4>

                          <div className="optimal-product-rating">
                            <span className="optimal-stars">★★★★★</span>
                            <span>({prod.reviewCount})</span>
                          </div>

                          <div className="optimal-product-price-row">
                            <span className="optimal-current-price">{fmt(prod.price)}</span>
                            {prod.compareAtPrice && (
                              <span className="optimal-compare-price">
                                {fmt(prod.compareAtPrice)}
                              </span>
                            )}
                          </div>

                          <button
                            type="button"
                            className="optimal-quick-add-btn"
                            onClick={() =>
                              addToCart(
                                prod,
                                prod.sizes[0] || 'Standard',
                                prod.colors[0]?.name || 'Standard'
                              )
                            }
                          >
                            🛒 ADD TO CART
                          </button>
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

      {/* ================= VIEW: PDP (PRODUCT DETAIL PAGE) ================= */}
      {activeView === 'pdp' && selectedProduct && (
        <main className="optimal-container optimal-pdp-section">
          {/* Breadcrumb */}
          <div className="optimal-breadcrumb">
            <button
              type="button"
              className="optimal-breadcrumb-link"
              onClick={() => setActiveView('home')}
            >
              Home
            </button>
            <span>/</span>
            <button
              type="button"
              className="optimal-breadcrumb-link"
              onClick={() => handleNavCategory(selectedProduct.category)}
            >
              {selectedProduct.category}
            </button>
            <span>/</span>
            <span>{selectedProduct.name}</span>
          </div>

          <div className="optimal-pdp-grid">
            {/* Gallery */}
            <div className="optimal-pdp-gallery">
              <div className="optimal-pdp-thumbs">
                {selectedProduct.gallery.map((gImg, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`optimal-pdp-thumb-btn ${
                      pdpSelectedImage === gImg ? 'active' : ''
                    }`}
                    onClick={() => setPdpSelectedImage(gImg)}
                  >
                    <img src={gImg} alt={`Thumbnail ${i}`} />
                  </button>
                ))}
              </div>

              <div className="optimal-pdp-main-img-wrap">
                <img
                  src={pdpSelectedImage}
                  alt={selectedProduct.name}
                  className="optimal-pdp-main-img"
                />
              </div>
            </div>

            {/* Product Details */}
            <div className="optimal-pdp-details">
              <div className="optimal-pdp-brand">{selectedProduct.brand}</div>
              <h1 className="optimal-pdp-title">{selectedProduct.name}</h1>

              <div className="optimal-pdp-meta-row">
                <div className="optimal-product-rating">
                  <span className="optimal-stars">★★★★★</span>
                  <span>{selectedProduct.rating} ({selectedProduct.reviewCount} Reviews)</span>
                </div>
                <span className="optimal-pdp-sku">SKU: {selectedProduct.sku}</span>
                <span className="optimal-pdp-stock-badge">
                  ✓ {selectedProduct.inStock ? 'In Stock (Ready to ship)' : 'Pre-Order'}
                </span>
              </div>

              <div className="optimal-pdp-price-wrap">
                <span className="optimal-pdp-current-price">
                  {fmt(selectedProduct.price)}
                </span>
                {selectedProduct.compareAtPrice && (
                  <span className="optimal-pdp-compare-price">
                    {fmt(selectedProduct.compareAtPrice)}
                  </span>
                )}
                {selectedProduct.compareAtPrice && (
                  <span className="optimal-save-percent">
                    Save {Math.round(((selectedProduct.compareAtPrice - selectedProduct.price) / selectedProduct.compareAtPrice) * 100)}%
                  </span>
                )}
              </div>

              <p className="optimal-pdp-desc">{selectedProduct.description}</p>

              {/* Color Selector */}
              <div className="optimal-variant-block">
                <div className="optimal-variant-header">
                  <span>Color: <strong>{pdpSelectedColor}</strong></span>
                </div>
                <div className="optimal-color-options">
                  {selectedProduct.colors.map((c, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`optimal-color-chip ${
                        pdpSelectedColor === c.name ? 'active' : ''
                      }`}
                      onClick={() => setPdpSelectedColor(c.name)}
                    >
                      <span
                        className="optimal-color-circle"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div className="optimal-variant-block">
                <div className="optimal-variant-header">
                  <span>Size: <strong>{pdpSelectedSize}</strong></span>
                  <button
                    type="button"
                    className="optimal-size-chart-trigger"
                    onClick={() => setSizeChartOpen(true)}
                  >
                    📏 Size Guide & Measurements
                  </button>
                </div>
                <div className="optimal-size-options">
                  {selectedProduct.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`optimal-size-pill ${
                        pdpSelectedSize === s ? 'active' : ''
                      }`}
                      onClick={() => setPdpSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="optimal-pdp-actions-row">
                <div className="optimal-quantity-stepper">
                  <button
                    type="button"
                    className="optimal-step-btn"
                    onClick={() => setPdpQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span className="optimal-step-num">{pdpQuantity}</span>
                  <button
                    type="button"
                    className="optimal-step-btn"
                    onClick={() => setPdpQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="optimal-btn-primary optimal-pdp-add-btn"
                  onClick={() =>
                    addToCart(
                      selectedProduct,
                      pdpSelectedSize,
                      pdpSelectedColor,
                      pdpQuantity
                    )
                  }
                >
                  ADD TO CART
                </button>

                <button
                  type="button"
                  className="optimal-pdp-buy-btn"
                  onClick={() => {
                    addToCart(
                      selectedProduct,
                      pdpSelectedSize,
                      pdpSelectedColor,
                      pdpQuantity
                    )
                    setCartOpen(true)
                  }}
                >
                  BUY NOW
                </button>

                <button
                  type="button"
                  className="optimal-pdp-wish-btn"
                  onClick={() =>
                    toggleWishlist(selectedProduct.id, selectedProduct.name)
                  }
                  title="Save to Wishlist"
                >
                  {wishlist.includes(selectedProduct.id) ? '♥' : '♡'}
                </button>
              </div>

              {/* Frequently Bought Together Bundle */}
              <div className="optimal-bundle-card">
                <div className="optimal-bundle-title">FREQUENTLY BOUGHT TOGETHER</div>
                <div className="optimal-bundle-items">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="optimal-bundle-thumb"
                  />
                  <span className="optimal-bundle-plus">+</span>
                  <img
                    src={OPTIMAL_PRODUCTS[4].image}
                    alt={OPTIMAL_PRODUCTS[4].name}
                    className="optimal-bundle-thumb"
                  />
                  <span className="optimal-bundle-plus">+</span>
                  <img
                    src={OPTIMAL_PRODUCTS[5].image}
                    alt={OPTIMAL_PRODUCTS[5].name}
                    className="optimal-bundle-thumb"
                  />
                </div>
                <div className="optimal-bundle-cta-row">
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--opt-muted)' }}>
                      Total Bundle Price:
                    </span>
                    <div className="optimal-bundle-price">
                      {fmt(selectedProduct.price + OPTIMAL_PRODUCTS[4].price + OPTIMAL_PRODUCTS[5].price)}
                    </div>
                  </div>
                  <button
                    type="button"
                    className="optimal-bundle-btn"
                    onClick={() => {
                      addToCart(selectedProduct, pdpSelectedSize, pdpSelectedColor, 1)
                      addToCart(OPTIMAL_PRODUCTS[4], 'EU 42', 'Vintage Brown', 1)
                      addToCart(OPTIMAL_PRODUCTS[5], 'One Size', 'Cognac Tan', 1)
                      showToast('Bundle of 3 items added to cart!')
                    }}
                  >
                    ADD ALL 3 TO CART
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications Table */}
          <div className="optimal-specs-tabs">
            <div className="optimal-specs-tab-nav">
              <button
                type="button"
                className={`optimal-specs-nav-btn ${pdpSpecsTab === 'desc' ? 'active' : ''}`}
                onClick={() => setPdpSpecsTab('desc')}
              >
                Description
              </button>
              <button
                type="button"
                className={`optimal-specs-nav-btn ${pdpSpecsTab === 'specs' ? 'active' : ''}`}
                onClick={() => setPdpSpecsTab('specs')}
              >
                Specifications
              </button>
              <button
                type="button"
                className={`optimal-specs-nav-btn ${pdpSpecsTab === 'care' ? 'active' : ''}`}
                onClick={() => setPdpSpecsTab('care')}
              >
                Care & Washing
              </button>
              <button
                type="button"
                className={`optimal-specs-nav-btn ${pdpSpecsTab === 'shipping' ? 'active' : ''}`}
                onClick={() => setPdpSpecsTab('shipping')}
              >
                Shipping & Returns
              </button>
            </div>

            <div>
              {pdpSpecsTab === 'desc' && (
                <div style={{ lineHeight: 1.7, color: 'var(--opt-charcoal)' }}>
                  <p>{selectedProduct.description}</p>
                  <p>
                    Every item from the Optimal atelier undergoes triple-stage quality inspection and hand-finishing
                    to guarantee lasting performance through seasons of wear.
                  </p>
                </div>
              )}

              {pdpSpecsTab === 'specs' && (
                <table className="optimal-specs-table">
                  <tbody>
                    {selectedProduct.specifications.map((spec, i) => (
                      <tr key={i}>
                        <td className="optimal-specs-label">{spec.label}</td>
                        <td>{spec.value}</td>
                      </tr>
                    ))}
                    <tr>
                      <td className="optimal-specs-label">Category</td>
                      <td>{selectedProduct.category}</td>
                    </tr>
                    <tr>
                      <td className="optimal-specs-label">Gender</td>
                      <td>{selectedProduct.gender}</td>
                    </tr>
                    <tr>
                      <td className="optimal-specs-label">SKU</td>
                      <td>{selectedProduct.sku}</td>
                    </tr>
                  </tbody>
                </table>
              )}

              {pdpSpecsTab === 'care' && (
                <div style={{ lineHeight: 1.7, color: 'var(--opt-charcoal)' }}>
                  <p><strong>Care Instructions:</strong> {selectedProduct.careInstructions}</p>
                  <p>
                    For wool and silk blends, we advise professional eco-friendly dry cleaning. Store in breathable
                    cotton garment covers away from direct sun.
                  </p>
                </div>
              )}

              {pdpSpecsTab === 'shipping' && (
                <div style={{ lineHeight: 1.7, color: 'var(--opt-charcoal)' }}>
                  <p><strong>Shipping Details:</strong> {selectedProduct.shippingInfo}</p>
                  <p>
                    Enjoy 90-day hassle-free doorstep returns. All returns are picked up from your address with zero
                    restocking fees.
                  </p>
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {/* ================= RICH MULTI-COLUMN FOOTER ================= */}
      <footer className="optimal-footer">
        <div className="optimal-container">
          <div className="optimal-footer-grid">
            <div className="optimal-footer-col">
              <a href="#home" className="optimal-logo" style={{ color: '#ffffff', marginBottom: '16px' }}>
                <div className="optimal-logo-mark">O</div>
                <span>OPTIMAL</span>
              </a>
              <p className="optimal-footer-about">
                Optimal is a world-class fashion department storefront curated for modern connoisseurs. Delivering
                high-grade tailoring, technical winter outer layers, and artisan leather goods across 40+ countries.
              </p>
              <div className="optimal-footer-contact-item">
                <span>📍</span> 540 Madison Ave, New York, NY 10022
              </div>
              <div className="optimal-footer-contact-item">
                <span>✉️</span> concierge@optimal-store.com
              </div>
              <div className="optimal-footer-contact-item">
                <span>📞</span> +1 (800) 555-0199 (24/7 Support)
              </div>
            </div>

            <div className="optimal-footer-col">
              <h4>Shop Departments</h4>
              <ul className="optimal-footer-links">
                <li>
                  <button onClick={() => handleNavCategory('Women')}>Women's Collection</button>
                </li>
                <li>
                  <button onClick={() => handleNavCategory('Men')}>Men's Sartorial</button>
                </li>
                <li>
                  <button onClick={() => handleNavCategory('Outerwear')}>Outerwear & Parkas</button>
                </li>
                <li>
                  <button onClick={() => handleNavCategory('Dresses')}>Evening Dresses</button>
                </li>
                <li>
                  <button onClick={() => handleNavCategory('Footwear')}>Boots & Loafers</button>
                </li>
                <li>
                  <button onClick={() => handleNavCategory('Bags & Luggage')}>Leather Bags</button>
                </li>
                <li>
                  <button onClick={() => handleNavCategory('Deals & Sale')}>Flash Deals</button>
                </li>
              </ul>
            </div>

            <div className="optimal-footer-col">
              <h4>Customer Concierge</h4>
              <ul className="optimal-footer-links">
                <li><button onClick={() => setSizeChartOpen(true)}>Size & Fit Guide</button></li>
                <li><a href="#track" onClick={(e) => { e.preventDefault(); showToast('Track order status') }}>Order Tracking</a></li>
                <li><a href="#shipping" onClick={(e) => { e.preventDefault(); showToast('Shipping policy') }}>Worldwide Shipping</a></li>
                <li><a href="#returns" onClick={(e) => { e.preventDefault(); showToast('90-Day Returns') }}>90-Day Doorstep Returns</a></li>
                <li><a href="#care" onClick={(e) => { e.preventDefault(); showToast('Care instructions') }}>Garment Care Guide</a></li>
                <li><a href="#terms" onClick={(e) => { e.preventDefault(); showToast('Terms of Service') }}>Terms of Service</a></li>
              </ul>
            </div>

            <div className="optimal-footer-col">
              <h4>Atelier Services</h4>
              <ul className="optimal-footer-links">
                <li><a href="#bespoke" onClick={(e) => { e.preventDefault(); showToast('Bespoke tailoring') }}>Bespoke Tailoring</a></li>
                <li><a href="#private" onClick={(e) => { e.preventDefault(); showToast('Private appointment') }}>Book Private Appointment</a></li>
                <li><a href="#gift" onClick={(e) => { e.preventDefault(); showToast('Gift card') }}>Digital Gift Cards</a></li>
                <li><a href="#corporate" onClick={(e) => { e.preventDefault(); showToast('Corporate gifts') }}>Corporate Orders</a></li>
                <li><a href="#sustainability" onClick={(e) => { e.preventDefault(); showToast('Sustainability policy') }}>Eco-Sustainability Promise</a></li>
              </ul>
            </div>
          </div>

          <div className="optimal-footer-bottom">
            <div>
              © 2026 Optimal Multipurpose Fashion Storefront. All rights reserved. Built for Willovate UI.
            </div>
            <div className="optimal-payment-badges">
              <span className="optimal-pay-badge">VISA</span>
              <span className="optimal-pay-badge">MASTERCARD</span>
              <span className="optimal-pay-badge">AMEX</span>
              <span className="optimal-pay-badge">APPLE PAY</span>
              <span className="optimal-pay-badge">UPI / GPAY</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= CART SLIDE-OVER DRAWER ================= */}
      {cartOpen && (
        <div className="optimal-cart-drawer-overlay" onClick={() => setCartOpen(false)}>
          <div className="optimal-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="optimal-cart-drawer-header">
              <h3 className="optimal-cart-drawer-title">
                <span>🛍️</span> Your Shopping Bag ({cartItemCount})
              </h3>
              <button
                type="button"
                className="optimal-cart-close-btn"
                onClick={() => setCartOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Free Shipping Progress Meter */}
            <div className="optimal-shipping-meter">
              <div className="optimal-shipping-meter-text">
                {cartSubtotal >= freeShippingThreshold ? (
                  <span>
                    🎉 <strong>Congratulations!</strong> You qualify for FREE Express Shipping!
                  </span>
                ) : (
                  <span>
                    Add <strong>{fmt(freeShippingThreshold - cartSubtotal)}</strong> more to get{' '}
                    <strong>FREE Express Shipping</strong>!
                  </span>
                )}
              </div>
              <div className="optimal-shipping-meter-bar">
                <div
                  className="optimal-shipping-meter-fill"
                  style={{ width: `${shippingProgress}%` }}
                />
              </div>
            </div>

            {/* Cart Items List */}
            <div className="optimal-cart-items-list">
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--opt-muted)' }}>
                  <div style={{ fontSize: '36px', marginBottom: '12px' }}>🛍️</div>
                  <p>Your shopping bag is empty.</p>
                  <button
                    type="button"
                    className="optimal-btn-primary"
                    style={{ marginTop: '12px' }}
                    onClick={() => {
                      setCartOpen(false)
                      setActiveCategory('All')
                      setActiveView('collection')
                    }}
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="optimal-cart-item">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="optimal-cart-thumb"
                    />
                    <div className="optimal-cart-info">
                      <div className="optimal-cart-name">{item.product.name}</div>
                      <div className="optimal-cart-variant-tag">
                        Size: {item.size} • Color: {item.color}
                      </div>
                      <div className="optimal-cart-bottom-row">
                        <div className="optimal-quantity-stepper" style={{ height: '32px' }}>
                          <button
                            type="button"
                            className="optimal-step-btn"
                            style={{ height: '32px', width: '28px' }}
                            onClick={() => updateCartQty(idx, -1)}
                          >
                            -
                          </button>
                          <span className="optimal-step-num" style={{ width: '28px', fontSize: '13px' }}>
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="optimal-step-btn"
                            style={{ height: '32px', width: '28px' }}
                            onClick={() => updateCartQty(idx, 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="optimal-cart-price">
                          {fmt(item.product.price * item.quantity)}
                        </div>
                        <button
                          type="button"
                          className="optimal-cart-remove-btn"
                          onClick={() => removeCartItem(idx)}
                          title="Remove item"
                        >
                          🗑
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="optimal-cart-footer">
                <div className="optimal-cart-subtotal-row">
                  <span>Subtotal:</span>
                  <span>{fmt(cartSubtotal)}</span>
                </div>
                <button
                  type="button"
                  className="optimal-checkout-btn"
                  onClick={() => {
                    showToast('Directing to 256-bit SSL Secure Checkout...')
                  }}
                >
                  PROCEED TO CHECKOUT ({fmt(cartSubtotal)})
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ================= SIZE CHART MODAL ================= */}
      {sizeChartOpen && (
        <div className="optimal-modal-overlay" onClick={() => setSizeChartOpen(false)}>
          <div className="optimal-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="optimal-modal-header">
              <h3>Optimal Size & Measurement Guide</h3>
              <button
                type="button"
                className="optimal-cart-close-btn"
                onClick={() => setSizeChartOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="optimal-modal-body">
              <p style={{ fontSize: '13.5px', color: 'var(--opt-muted)', marginBottom: '16px' }}>
                All measurements are given in inches with corresponding international conversions.
              </p>
              <table className="optimal-specs-table">
                <thead>
                  <tr style={{ background: 'var(--opt-dark)', color: '#ffffff' }}>
                    <th style={{ padding: '8px 12px' }}>Size</th>
                    <th style={{ padding: '8px 12px' }}>Chest / Bust</th>
                    <th style={{ padding: '8px 12px' }}>Waist</th>
                    <th style={{ padding: '8px 12px' }}>Hips</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>XS (34)</strong></td>
                    <td>33" - 35"</td>
                    <td>26" - 28"</td>
                    <td>35" - 37"</td>
                  </tr>
                  <tr>
                    <td><strong>S (36)</strong></td>
                    <td>36" - 38"</td>
                    <td>29" - 31"</td>
                    <td>38" - 40"</td>
                  </tr>
                  <tr>
                    <td><strong>M (38-40)</strong></td>
                    <td>39" - 41"</td>
                    <td>32" - 34"</td>
                    <td>41" - 43"</td>
                  </tr>
                  <tr>
                    <td><strong>L (42)</strong></td>
                    <td>42" - 44"</td>
                    <td>35" - 37"</td>
                    <td>44" - 46"</td>
                  </tr>
                  <tr>
                    <td><strong>XL (44)</strong></td>
                    <td>45" - 47"</td>
                    <td>38" - 40"</td>
                    <td>47" - 49"</td>
                  </tr>
                  <tr>
                    <td><strong>XXL (46)</strong></td>
                    <td>48" - 50"</td>
                    <td>41" - 43"</td>
                    <td>50" - 52"</td>
                  </tr>
                </tbody>
              </table>
              <div style={{ marginTop: '16px', textAlign: 'right' }}>
                <button
                  type="button"
                  className="optimal-btn-primary"
                  onClick={() => setSizeChartOpen(false)}
                >
                  Close Guide
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= QUICK VIEW MODAL ================= */}
      {quickViewProduct && (
        <div className="optimal-modal-overlay" onClick={() => setQuickViewProduct(null)}>
          <div
            className="optimal-modal-box"
            style={{ maxWidth: '750px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="optimal-modal-header">
              <h3>Quick View: {quickViewProduct.name}</h3>
              <button
                type="button"
                className="optimal-cart-close-btn"
                onClick={() => setQuickViewProduct(null)}
              >
                ✕
              </button>
            </div>
            <div className="optimal-modal-body" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{ width: '100%', borderRadius: 'var(--opt-radius-md)', objectFit: 'cover' }}
              />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--opt-primary)' }}>
                  {quickViewProduct.brand}
                </div>
                <h4 style={{ fontSize: '18px', fontWeight: 800, margin: '6px 0 10px 0' }}>
                  {quickViewProduct.name}
                </h4>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--opt-primary)', marginBottom: '12px' }}>
                  {fmt(quickViewProduct.price)}
                </div>
                <p style={{ fontSize: '13px', color: 'var(--opt-muted)', lineHeight: 1.5, marginBottom: '16px' }}>
                  {quickViewProduct.description.slice(0, 150)}...
                </p>
                <button
                  type="button"
                  className="optimal-btn-primary"
                  style={{ marginBottom: '10px' }}
                  onClick={() => {
                    addToCart(
                      quickViewProduct,
                      quickViewProduct.sizes[0] || 'Standard',
                      quickViewProduct.colors[0]?.name || 'Standard'
                    )
                    setQuickViewProduct(null)
                  }}
                >
                  Add to Cart
                </button>
                <button
                  type="button"
                  className="optimal-btn-outline"
                  style={{ color: 'var(--opt-dark)', borderColor: 'var(--opt-border)' }}
                  onClick={() => {
                    handleOpenPdp(quickViewProduct)
                    setQuickViewProduct(null)
                  }}
                >
                  View Full Product Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= FLOATING TOAST NOTIFICATION ================= */}
      {toastMessage && (
        <div className="optimal-toast">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}

export default OptimalFashionStorefront
