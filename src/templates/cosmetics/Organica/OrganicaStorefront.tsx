import { useState, useMemo } from 'react'
import type {
  OrganicaProduct,
  OrganicaCartItem,
  OrganicaStorefrontProps,
} from './types'
import {
  ORGANICA_LOGO,
  ORGANICA_ANNOUNCEMENT,
  ORGANICA_PHONE,
  ORGANICA_TRUST_ITEMS,
  ORGANICA_HERO_SLIDES,
  ORGANICA_SIDE_BANNERS,
  ORGANICA_BRAND_LOGOS,
  ORGANICA_PRODUCTS,
  ORGANICA_DUAL_BANNERS,
  ORGANICA_CATEGORY_BOXES,
  ORGANICA_TESTIMONIAL,
  ORGANICA_BLOG_POSTS,
} from './data/organicaData'
import {
  StorefrontSearchModal,
  StorefrontWishlistDrawer,
  StorefrontAccountModal,
  StorefrontMobileNavDrawer,
  type MobileNavItem,
} from '../../../components/templates/StorefrontModals'
import { StorefrontProductDetailPage } from '../../../components/templates/StorefrontProductDetailPage'
import './styles/organica.css'

export function OrganicaStorefront({
  template: _template,
  device = 'desktop',
  deviceView,
  customAccentColor,
  onColorChange: _onColorChange,
  onUseTemplate: _onUseTemplate,
  onClose: _onClose,
  onBack: _onBack,
}: OrganicaStorefrontProps) {
  const effectiveDevice = (deviceView as string) || device || 'desktop'

  // Navigation & Category Tab state
  const [viewMode, setViewMode] = useState<'home' | 'pdp'>('home')
  const [selectedProduct, setSelectedProduct] = useState<OrganicaProduct | null>(null)
  const [activeTab, setActiveTab] = useState<'all' | 'beauty' | 'health' | 'newest'>('all')
  const [selectedSearchCategory, setSelectedSearchCategory] = useState('All Categories')
  const [activeSlide, setActiveSlide] = useState(0)

  // Drawers and Modals
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<OrganicaProduct | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const formatPrice = (usdAmount: number) => {
    if (currency === 'INR') {
      return `₹${Math.round(usdAmount * 83).toLocaleString('en-IN')}`
    }
    return `$${usdAmount.toFixed(2)}`
  }

  // Cart
  const [cartItems, setCartItems] = useState<OrganicaCartItem[]>([
    { product: ORGANICA_PRODUCTS[0], quantity: 2 },
    { product: ORGANICA_PRODUCTS[2], quantity: 1 },
  ])

  const navItems: MobileNavItem[] = [
    {
      label: 'Home',
      children: [
        { label: 'Organic Philosophy', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { label: 'Trust & Purity Badges', onClick: () => { const el = document.getElementById('organica-trust-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Organic Food',
      children: [
        { label: 'Fresh Greens & Fruits', onClick: () => { setActiveTab('health'); const el = document.getElementById('organica-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Farm Honey & Spices', onClick: () => { setActiveTab('all'); const el = document.getElementById('organica-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Health & Beauty',
      children: [
        { label: 'All Skincare & Beauty', onClick: () => { setActiveTab('beauty'); const el = document.getElementById('organica-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'New Arrivals', onClick: () => { setActiveTab('newest'); const el = document.getElementById('organica-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Natural Drinks',
      children: [
        { label: 'Pure Detox Cold Juices', onClick: () => { const el = document.getElementById('organica-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Blog',
      children: [
        { label: 'Holistic Living Articles', onClick: () => { const el = document.getElementById('organica-blog-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Pages',
      children: [
        { label: 'Customer Reviews', onClick: () => { const el = document.getElementById('organica-reviews'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Help & FAQ', onClick: () => alert('Support Helpline: ' + ORGANICA_PHONE) },
      ],
    },
  ]

  // Filtered Products for Tabs
  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') return ORGANICA_PRODUCTS
    return ORGANICA_PRODUCTS.filter((p) => p.category === activeTab)
  }, [activeTab])

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }, [cartItems])

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0)
  }, [cartItems])

  // Actions
  const handleAddToCart = (product: OrganicaProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    showToast(`Added "${product.name}" to cart!`)
  }

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean) as OrganicaCartItem[]
    )
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  const currentSlide = ORGANICA_HERO_SLIDES[activeSlide]

  return (
    <div
      className={`organica-storefront device-${effectiveDevice}`}
      style={
        customAccentColor
          ? ({ '--organica-green': customAccentColor } as React.CSSProperties)
          : undefined
      }
    >
      {/* 1. Announcement Top Bar */}
      <div className="organica-top-announcement">
        <div
          className="organica-container"
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
        >
          <span>{ORGANICA_ANNOUNCEMENT}</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', opacity: 0.9 }}>Currency:</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as 'USD' | 'INR')}
              aria-label="Select Currency"
              style={{
                background: 'rgba(0,0,0,0.18)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.4)',
                borderRadius: '4px',
                padding: '2px 6px',
                fontSize: '11px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              <option value="USD" style={{ color: '#000' }}>🇺🇸 USD ($)</option>
              <option value="INR" style={{ color: '#000' }}>🇮🇳 INR (₹)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Header Middle with Phone, Logo, Search, Wishlist, Cart */}
      <div className="organica-header-mid">
        <div className="organica-container">
          <div className="organica-mid-inner">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="organica-hamburger-btn wv-mobile-hamburger-btn"
              onClick={() => setIsMobileNavOpen(true)}
              title="Menu"
              aria-label="Open mobile menu"
            >
              <span className="wv-mobile-hamburger-bar" />
              <span className="wv-mobile-hamburger-bar" />
              <span className="wv-mobile-hamburger-bar" />
            </button>

            {/* Phone (Desktop Only) */}
            <div className="organica-phone-box">
              <span>📞</span>
              <div>
                <div>Do you have a question?</div>
                <strong>{ORGANICA_PHONE}</strong>
              </div>
            </div>

            {/* Logo */}
            <a href="#organica" style={{ display: 'flex', alignItems: 'center' }} onClick={(e) => { e.preventDefault(); setViewMode('home'); setSelectedProduct(null); window.scrollTo({ top: 0, behavior: 'smooth' }) }}>
              <img src={ORGANICA_LOGO} alt="Organica" className="organica-logo-img" />
            </a>

            {/* Search Bar with Category Dropdown (Desktop Only) */}
            <div className="organica-search-bar" onClick={() => setIsSearchOpen(true)} style={{ cursor: 'pointer' }}>
              <select
                className="organica-category-select"
                value={selectedSearchCategory}
                onChange={(e) => {
                  e.stopPropagation()
                  setSelectedSearchCategory(e.target.value)
                }}
              >
                <option value="All Categories">All Categories</option>
                <option value="Beauty">Beauty & Skincare</option>
                <option value="Health">Organic Health</option>
                <option value="Food">Organic Food</option>
              </select>
              <input
                type="text"
                readOnly
                placeholder="Search products..."
                className="organica-search-input"
              />
              <button
                type="button"
                className="organica-search-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  setIsSearchOpen(true)
                }}
              >
                SEARCH
              </button>
            </div>

            {/* Wishlist, Account & Cart */}
            <div className="organica-header-user">
              <button
                type="button"
                className="wv-mobile-action-btn organica-mobile-search-btn"
                title="Search"
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search"
              >
                <span>🔍</span>
              </button>

              <button
                type="button"
                className="organica-wishlist-btn organica-account-btn"
                onClick={() => setIsAccountOpen(true)}
                title="Account"
              >
                <span>👤</span>
                <span>Account</span>
              </button>

              <button
                type="button"
                className="wv-mobile-action-btn organica-wishlist-btn"
                onClick={() => setIsWishlistOpen(true)}
                title="Wishlist"
                style={{ position: 'relative' }}
              >
                <span>❤️</span>
                {wishlist.length > 0 && <span className="wv-mobile-badge-counter organica-badge-counter">{wishlist.length}</span>}
                <span className="organica-btn-text">Wishlist ({wishlist.length})</span>
              </button>

              <div
                className="wv-mobile-action-btn organica-cart-pill"
                onClick={() => setIsCartOpen(true)}
                title="Shopping Cart"
                style={{ position: 'relative' }}
              >
                <span className="organica-mobile-cart-icon">🛍️</span>
                {totalCartCount > 0 && (
                  <span className="wv-mobile-badge-counter">{totalCartCount}</span>
                )}
                <div className="organica-desktop-cart-wrap" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div className="organica-cart-icon-wrap">
                    <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                    </svg>
                    {totalCartCount > 0 && (
                      <span className="organica-cart-badge">{totalCartCount}</span>
                    )}
                  </div>
                  <div className="organica-cart-info">
                    <span className="organica-cart-label">Shopping Cart</span>
                    <span className="organica-cart-total">{formatPrice(cartSubtotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Main Horizontal Navigation Bar */}
      <nav className="organica-nav-bar">
        <div className="organica-container">
          <ul className="organica-nav-list">
            {navItems.map((item) => (
              <li key={item.label} className="wv-nav-dropdown-wrap">
                <span
                  className="organica-nav-link"
                  onClick={() => {
                    if (viewMode === 'pdp') {
                      setViewMode('home')
                      setSelectedProduct(null)
                    }
                    if (item.children && item.children.length > 0) {
                      item.children[0].onClick?.()
                    } else {
                      item.onClick?.()
                    }
                  }}
                >
                  {item.label} {item.children ? '▾' : ''}
                </span>
                {item.children && (
                  <div className="wv-desktop-dropdown">
                    {item.children.map((sub) => (
                      <div
                        key={sub.label}
                        className="wv-desktop-dropdown-item"
                        onClick={(e) => {
                          e.stopPropagation()
                          sub.onClick?.()
                        }}
                      >
                        {sub.label}
                      </div>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* 4. 3 Trust Badges Strip */}
      <section className="organica-trust-strip">
        <div className="organica-container">
          <div className="organica-trust-grid">
            {ORGANICA_TRUST_ITEMS.map((item) => (
              <div key={item.id} className="organica-trust-card">
                <span className="organica-trust-icon">{item.icon}</span>
                <div>
                  <div className="organica-trust-title">{item.title}</div>
                  <div className="organica-trust-subtitle">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {viewMode === 'pdp' && selectedProduct ? (
        <StorefrontProductDetailPage
          product={selectedProduct}
          brandName="Organica"
          accentColor="#77a43b"
          currencyPrefix={currency === 'INR' ? '₹' : '$'}
          formatPrice={formatPrice}
          onBack={() => {
            setViewMode('home')
            setSelectedProduct(null)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onAddToCart={(prod) => handleAddToCart(prod)}
          onBuyNow={(prod) => {
            handleAddToCart(prod)
            showToast('Instant checkout initiated!')
          }}
          relatedProducts={ORGANICA_PRODUCTS.filter((p) => p.id !== selectedProduct.id)}
          onSelectRelated={(p) => {
            setSelectedProduct(p as OrganicaProduct)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        />
      ) : (
        <>
          {/* 5. Split Hero Section (Main Slider + 2 Side Banners) */}
          <section className="organica-hero-section">
        <div className="organica-container">
          <div className="organica-hero-grid">
            {/* Main Hero Slider */}
            <div className="organica-hero-main">
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="organica-hero-bg"
              />
              <div className="organica-hero-overlay">
                <div className="organica-hero-content">
                  <div className="organica-hero-script">{currentSlide.subtitle}</div>
                  <h1 className="organica-hero-title">{currentSlide.title}</h1>
                  <div className="organica-hero-highlight">{currentSlide.highlight}</div>
                  <p className="organica-hero-desc">{currentSlide.description}</p>
                  <button
                    className="organica-btn"
                    onClick={() => {
                      document.getElementById('organica-catalog')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    {currentSlide.buttonText} →
                  </button>
                  <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
                    {ORGANICA_HERO_SLIDES.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setActiveSlide(i)}
                        style={{
                          width: i === activeSlide ? '24px' : '8px',
                          height: '8px',
                          borderRadius: '4px',
                          backgroundColor: i === activeSlide ? '#77a43b' : '#c9d4c2',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Side 2 Promotional Cards */}
            <div className="organica-hero-side">
              {ORGANICA_SIDE_BANNERS.map((banner) => (
                <div
                  key={banner.id}
                  className="organica-side-card"
                  onClick={() => {
                    document.getElementById('organica-catalog')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <img src={banner.image} alt={banner.title} className="organica-side-img" />
                  <div className="organica-side-overlay">
                    <div className="organica-side-title">{banner.title}</div>
                    <div className="organica-side-subtitle">{banner.subtitle}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Brand Logos Strip */}
      <section className="organica-brands-strip">
        <div className="organica-container">
          <div className="organica-brands-flex">
            {ORGANICA_BRAND_LOGOS.map((brand, idx) => (
              <span key={idx} className="organica-brand-item">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Featured Products Grid */}
      <section className="organica-container" style={{ padding: '60px 20px 40px' }} id="organica-catalog">
        <div className="organica-section-header">
          <div className="organica-script-subtitle">Special offers for you</div>
          <h2 className="organica-title-main">Featured products</h2>
        </div>

        <div className="organica-products-grid">
          {ORGANICA_PRODUCTS.slice(0, 8).map((product) => (
            <div key={product.id} className="organica-product-card" style={{ position: 'relative' }}>
              <button
                type="button"
                className={`wv-card-wish-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleWishlist(product.id)
                }}
                title={wishlist.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                aria-label="Toggle Wishlist"
              >
                {wishlist.includes(product.id) ? '❤️' : '🤍'}
              </button>
              <div className="organica-card-thumb">
                <img
                  src={product.image}
                  alt={product.name}
                  className="organica-product-img"
                  onMouseEnter={(e) => {
                    if (product.hoverImage) e.currentTarget.src = product.hoverImage
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.src = product.image
                  }}
                />
                {product.discountBadge && (
                  <span className="organica-badge-sale">{product.discountBadge}</span>
                )}
                <div className="organica-hover-actions">
                  <button
                    className="organica-action-circle"
                    title="Quick view"
                    onClick={() => setQuickViewProduct(product)}
                  >
                    👁
                  </button>
                  <button
                    className="organica-action-circle"
                    title="Wishlist"
                    onClick={() => toggleWishlist(product.id)}
                    style={{ color: wishlist.includes(product.id) ? '#e74c3c' : 'inherit' }}
                  >
                    ❤️
                  </button>
                </div>
              </div>

              <div className="organica-card-info">
                <div className="organica-stars">
                  {'★'.repeat(Math.round(product.rating))}
                </div>
                <h3 className="organica-prod-name">{product.name}</h3>
                <div className="organica-card-bottom">
                  <div className="organica-prices">
                    <span className="organica-price">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="organica-price-orig">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                  <button
                    className="organica-add-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. Dual Middle Promotional Banners */}
      <section className="organica-dual-section">
        <div className="organica-container">
          <div className="organica-dual-grid">
            {ORGANICA_DUAL_BANNERS.map((banner) => (
              <div key={banner.id} className="organica-dual-banner">
                <img src={banner.image} alt={banner.title} className="organica-dual-img" />
                <div className="organica-dual-content">
                  <span className="organica-dual-tag">{banner.tag}</span>
                  <h3 className="organica-dual-title">{banner.title}</h3>
                  <p className="organica-dual-sub">{banner.subtitle}</p>
                  <button
                    className="organica-btn"
                    style={{ alignSelf: 'flex-start' }}
                    onClick={() => {
                      document.getElementById('organica-catalog')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    {banner.buttonText} →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Tabbed Arrivals Products */}
      <section className="organica-container" style={{ padding: '40px 20px 60px' }}>
        <div className="organica-section-header">
          <div className="organica-script-subtitle">Handpicked natural formulas</div>
          <h2 className="organica-title-main">Arrivals products</h2>
        </div>

        {/* Tab Buttons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
          {(['all', 'beauty', 'health', 'newest'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                backgroundColor: activeTab === tab ? '#77a43b' : 'transparent',
                color: activeTab === tab ? '#ffffff' : '#2c3328',
                border: activeTab === tab ? 'none' : '1px solid #e3e8de',
                padding: '8px 24px',
                borderRadius: '20px',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                textTransform: 'uppercase',
                transition: 'all 0.2s ease',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="organica-products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="organica-product-card" style={{ position: 'relative' }}>
              <button
                type="button"
                className={`wv-card-wish-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleWishlist(product.id)
                }}
                title={wishlist.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                aria-label="Toggle Wishlist"
              >
                {wishlist.includes(product.id) ? '❤️' : '🤍'}
              </button>
              <div className="organica-card-thumb">
                <img src={product.image} alt={product.name} className="organica-product-img" />
                {product.discountBadge && (
                  <span className="organica-badge-sale">{product.discountBadge}</span>
                )}
                <div className="organica-hover-actions">
                  <button
                    className="organica-action-circle"
                    title="Quick view"
                    onClick={() => setQuickViewProduct(product)}
                  >
                    👁
                  </button>
                  <button
                    className="organica-action-circle"
                    title="Wishlist"
                    onClick={() => toggleWishlist(product.id)}
                    style={{ color: wishlist.includes(product.id) ? '#e74c3c' : 'inherit' }}
                  >
                    ❤️
                  </button>
                </div>
              </div>

              <div className="organica-card-info">
                <div className="organica-stars">
                  {'★'.repeat(Math.round(product.rating))}
                </div>
                <h3 className="organica-prod-name">{product.name}</h3>
                <div className="organica-card-bottom">
                  <div className="organica-prices">
                    <span className="organica-price">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="organica-price-orig">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                  <button
                    className="organica-add-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    Add +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. 3 Dark Organic Category Boxes */}
      <section className="organica-boxes-section">
        <div className="organica-container">
          <div className="organica-boxes-grid">
            {ORGANICA_CATEGORY_BOXES.map((box) => (
              <div
                key={box.id}
                className="organica-box-card"
                onClick={() => {
                  document.getElementById('organica-catalog')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <img src={box.image} alt={box.title} className="organica-box-img" />
                <div className="organica-box-overlay">
                  <div className="organica-box-title">{box.title}</div>
                  <div className="organica-box-sub">{box.subtitle}</div>
                  <span className="organica-box-link">{box.buttonText} →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Customer Testimonial */}
      <section className="organica-testimonial-section">
        <div className="organica-container">
          <div className="organica-testimonial-box">
            <div className="organica-quote-icon">“</div>
            <p className="organica-testimonial-text">"{ORGANICA_TESTIMONIAL.content}"</p>
            <div className="organica-testimonial-user">
              <img
                src={ORGANICA_TESTIMONIAL.avatar}
                alt={ORGANICA_TESTIMONIAL.author}
                className="organica-user-avatar"
              />
              <div>
                <div className="organica-user-name">{ORGANICA_TESTIMONIAL.author}</div>
                <div style={{ fontSize: '12px', color: '#757d72' }}>{ORGANICA_TESTIMONIAL.role}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. From Our Blog Posts */}
      <section className="organica-blog-section">
        <div className="organica-container">
          <div className="organica-section-header">
            <div className="organica-script-subtitle">Read our daily thoughts</div>
            <h2 className="organica-title-main">Blog posts</h2>
          </div>

          <div className="organica-blog-grid">
            {ORGANICA_BLOG_POSTS.map((post) => (
              <article key={post.id} className="organica-blog-item">
                <div className="organica-blog-thumb">
                  <img src={post.image} alt={post.title} className="organica-blog-img" />
                  <div className="organica-date-badge">
                    <div className="organica-date-day">{post.day}</div>
                    <div className="organica-date-month">{post.month}</div>
                  </div>
                </div>
                <div className="organica-blog-body">
                  <div className="organica-blog-author">By {post.author}</div>
                  <h3 className="organica-blog-title">{post.title}</h3>
                  <p className="organica-blog-excerpt">{post.excerpt}</p>
                  <a href="#read" className="organica-blog-read-more">
                    Read more →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 13. Newsletter Strip */}
      <section className="organica-newsletter-strip">
        <div className="organica-container">
          <div className="organica-newsletter-inner">
            <div>
              <div className="organica-newsletter-title">newsletter</div>
              <div className="organica-newsletter-sub">
                Get 20% off for your first order and stay updated with seasonal harvest alerts.
              </div>
            </div>
            <div className="organica-newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                className="organica-nl-input"
              />
              <button
                className="organica-nl-btn"
                onClick={() => alert('Subscribed to Organica newsletter!')}
              >
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 14. 4-Column Footer */}
      <footer className="organica-footer">
        <div className="organica-container">
          <div className="organica-footer-grid">
            {/* Col 1 */}
            <div>
              <img
                src={ORGANICA_LOGO}
                alt="Organica"
                style={{ height: '42px', filter: 'brightness(0) invert(1)', marginBottom: '16px' }}
              />
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#a4b39e', marginBottom: '14px' }}>
                Organic superfoods, certified organic skincare, and natural cold-pressed wellness tonics.
              </p>
              <div style={{ fontSize: '13px', color: '#ffffff' }}>Phone: {ORGANICA_PHONE}</div>
              <div style={{ fontSize: '13px', color: '#ffffff', marginTop: '4px' }}>
                Email: support@organica-store.com
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <h5 className="organica-footer-h5">Main menu</h5>
              <ul className="organica-footer-list">
                <li><a href="#about" className="organica-footer-link">About us</a></li>
                <li><a href="#delivery" className="organica-footer-link">Delivery Information</a></li>
                <li><a href="#privacy" className="organica-footer-link">Privacy Policy</a></li>
                <li><a href="#terms" className="organica-footer-link">Terms & Conditions</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h5 className="organica-footer-h5">Customer service</h5>
              <ul className="organica-footer-list">
                <li><a href="#contact" className="organica-footer-link">Contact us</a></li>
                <li><a href="#returns" className="organica-footer-link">Returns & Refunds</a></li>
                <li><a href="#sitemap" className="organica-footer-link">Site Map</a></li>
                <li><a href="#brands" className="organica-footer-link">Brands Directory</a></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h5 className="organica-footer-h5">My account</h5>
              <ul className="organica-footer-list">
                <li><a href="#account" className="organica-footer-link">My Account</a></li>
                <li><a href="#orders" className="organica-footer-link">Order History</a></li>
                <li><a href="#wishlist" className="organica-footer-link">Wish List</a></li>
                <li><a href="#newsletter" className="organica-footer-link">Newsletter Signup</a></li>
              </ul>
            </div>
          </div>

          <div className="organica-footer-bottom">
            <div>© 2026 Organica. All rights reserved. Powered by Shopify.</div>
            <div style={{ display: 'flex', gap: '16px', color: '#d1ded0' }}>
              <span>VISA</span>
              <span>MasterCard</span>
              <span>PayPal</span>
              <span>Stripe</span>
            </div>
          </div>
        </div>
      </footer>
      </>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="organica-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="organica-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="organica-drawer-header">
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
                Shopping Cart ({totalCartCount})
              </h3>
              <button
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#757d72' }}
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="organica-drawer-body">
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#757d72' }}>
                  <p>Your shopping cart is currently empty</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      paddingBottom: '14px',
                      marginBottom: '14px',
                      borderBottom: '1px solid #e3e8de',
                    }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{item.product.name}</div>
                      <div style={{ color: '#77a43b', fontWeight: 700, fontSize: '13px', margin: '4px 0' }}>
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          style={{
                            width: '22px',
                            height: '22px',
                            border: '1px solid #ccc',
                            background: '#fff',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleUpdateQuantity(item.product.id, -1)}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>{item.quantity}</span>
                        <button
                          style={{
                            width: '22px',
                            height: '22px',
                            border: '1px solid #ccc',
                            background: '#fff',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleUpdateQuantity(item.product.id, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="organica-drawer-footer">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 700 }}>
                  <span>Subtotal</span>
                  <span style={{ color: '#77a43b' }}>{formatPrice(cartSubtotal)}</span>
                </div>
                <button
                  className="organica-btn"
                  style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}
                  onClick={() => alert(`Checking out with total: ${formatPrice(cartSubtotal)}`)}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="organica-drawer-overlay" onClick={() => setQuickViewProduct(null)}>
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              maxWidth: '700px',
              width: '100%',
              margin: 'auto',
              padding: '24px',
              position: 'relative',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
              }}
              onClick={() => setQuickViewProduct(null)}
            >
              ✕
            </button>
            <div>
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{ width: '100%', borderRadius: '12px', objectFit: 'cover' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ color: '#77a43b', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase' }}>
                {quickViewProduct.category}
              </div>
              <h2 style={{ fontSize: '22px', fontWeight: 800, margin: '8px 0' }}>
                {quickViewProduct.name}
              </h2>
              <div style={{ color: '#f59e0b', fontSize: '13px', marginBottom: '12px' }}>
                {'★'.repeat(Math.round(quickViewProduct.rating))} ({quickViewProduct.reviewCount} reviews)
              </div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#77a43b', marginBottom: '14px' }}>
                {formatPrice(quickViewProduct.price)}
                {quickViewProduct.originalPrice && (
                  <span style={{ fontSize: '14px', color: '#757d72', textDecoration: 'line-through', marginLeft: '8px' }}>
                    {formatPrice(quickViewProduct.originalPrice)}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#757d72', marginBottom: '20px' }}>
                {quickViewProduct.description}
              </p>
              <button
                className="organica-btn"
                style={{ marginTop: 'auto', justifyContent: 'center' }}
                onClick={() => {
                  handleAddToCart(quickViewProduct)
                  setQuickViewProduct(null)
                }}
              >
                Add to Cart • {formatPrice(quickViewProduct.price)}
              </button>
              <button
                type="button"
                className="wv-full-pdp-btn"
                onClick={() => {
                  setSelectedProduct(quickViewProduct)
                  setViewMode('pdp')
                  setQuickViewProduct(null)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                Full Description View →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <StorefrontSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={ORGANICA_PRODUCTS.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category,
        }))}
        onSelectProduct={(p) => {
          const fullProd = ORGANICA_PRODUCTS.find((x) => x.id === p.id)
          if (fullProd) setQuickViewProduct(fullProd)
        }}
        accentColor={customAccentColor || '#77a43b'}
        currencyPrefix={currency === 'INR' ? '₹' : '$'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
        placeholder="Search organic teas, skincare, supplements..."
        popularTags={['Beauty', 'Health', 'Food']}
      />

      {/* Wishlist Drawer */}
      <StorefrontWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        allProducts={ORGANICA_PRODUCTS.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category,
        }))}
        currencyPrefix={currency === 'INR' ? '₹' : '$'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
        onRemoveWishlist={toggleWishlist}
        onAddToCart={(p) => {
          const fullProd = ORGANICA_PRODUCTS.find((x) => x.id === p.id)
          if (fullProd) handleAddToCart(fullProd)
        }}
        onOpenProduct={(p) => {
          const fullProd = ORGANICA_PRODUCTS.find((x) => x.id === p.id)
          if (fullProd) setQuickViewProduct(fullProd)
        }}
        accentColor={customAccentColor || '#77a43b'}
      />

      {/* Account Modal */}
      <StorefrontAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        brandName="Organica"
        accentColor={customAccentColor || '#77a43b'}
      />

      {/* Mobile Navigation Drawer */}
      <StorefrontMobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        brandName="Organica"
        navItems={navItems}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        cartCount={totalCartCount}
        contactPhone={ORGANICA_PHONE}
        contactEmail="service@organica-store.com"
        accentColor={customAccentColor || '#77a43b'}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            backgroundColor: '#18181b',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: 9999,
            fontSize: 13,
            fontWeight: 700,
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}
export default OrganicaStorefront

