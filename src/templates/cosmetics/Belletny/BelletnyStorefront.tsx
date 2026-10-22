import { useState, useMemo } from 'react'
import type {
  BelletnyProduct,
  BelletnyCartItem,
  BelletnyStorefrontProps,
} from './types'
import {
  BELLETNY_LOGO,
  BELLETNY_PHONE,
  BELLETNY_HERO_SLIDES,
  BELLETNY_CATEGORIES,
  BELLETNY_MIDDLE_BANNERS,
  BELLETNY_PROD_WIDE_BANNER,
  BELLETNY_TRUST_BADGES,
  BELLETNY_PRODUCTS,
  BELLETNY_TESTIMONIAL,
  BELLETNY_BLOG_POSTS,
  BELLETNY_BRAND_LOGOS,
} from './data/belletnyData'
import {
  StorefrontSearchModal,
  StorefrontWishlistDrawer,
  StorefrontAccountModal,
  StorefrontMobileNavDrawer,
  type MobileNavItem,
} from '../../common/StorefrontModals'
import './styles/belletny.css'

export function BelletnyStorefront({
  template: _template,
  device = 'desktop',
  deviceView,
  customAccentColor,
  onColorChange: _onColorChange,
  onUseTemplate: _onUseTemplate,
  onClose: _onClose,
  onBack: _onBack,
}: BelletnyStorefrontProps) {
  const effectiveDevice = (deviceView as string) || device || 'desktop'

  // Navigation & Tabs
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeTab, setActiveTab] = useState<'all' | 'featured' | 'latest' | 'bestseller'>('featured')

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<BelletnyProduct | null>(null)
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
  const [cartItems, setCartItems] = useState<BelletnyCartItem[]>([
    { product: BELLETNY_PRODUCTS[0], quantity: 1 },
    { product: BELLETNY_PRODUCTS[6], quantity: 1 },
  ])

  const navItems: MobileNavItem[] = [
    {
      label: 'Home',
      children: [
        { label: 'Hero Collection', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { label: 'Categories Overview', onClick: () => { const el = document.getElementById('belletny-categories'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Hair Cream',
      children: [
        { label: 'Featured Formulas', onClick: () => { setActiveTab('featured'); const el = document.getElementById('belletny-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Bestseller Creams', onClick: () => { setActiveTab('bestseller'); const el = document.getElementById('belletny-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Collections',
      children: [
        { label: 'All Cosmetics', onClick: () => { setActiveTab('all'); const el = document.getElementById('belletny-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Latest Drops', onClick: () => { setActiveTab('latest'); const el = document.getElementById('belletny-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Concealer',
      children: [
        { label: 'High Coverage Sticks', onClick: () => { const el = document.getElementById('belletny-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Brushes',
      children: [
        { label: 'Professional Set', onClick: () => { const el = document.getElementById('belletny-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Blog',
      children: [
        { label: 'Beauty Tips & Tutorials', onClick: () => { const el = document.getElementById('belletny-blog-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
  ]

  // Filtered Products
  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') return BELLETNY_PRODUCTS
    return BELLETNY_PRODUCTS.filter((p) => p.category === activeTab)
  }, [activeTab])

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }, [cartItems])

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0)
  }, [cartItems])

  // Actions
  const handleAddToCart = (product: BelletnyProduct) => {
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
        .filter(Boolean) as BelletnyCartItem[]
    )
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  const currentSlide = BELLETNY_HERO_SLIDES[activeSlide]

  return (
    <div
      className={`belletny-storefront device-${effectiveDevice}`}
      style={
        customAccentColor
          ? ({ '--belletny-maroon': customAccentColor } as React.CSSProperties)
          : undefined
      }
    >
      {/* 1. Maroon Header Top */}
      <div className="belletny-header-top">
        <div className="belletny-container">
          <div className="belletny-top-inner">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="belletny-hamburger-btn"
              onClick={() => setIsMobileNavOpen(true)}
              title="Menu"
              aria-label="Open mobile menu"
            >
              ☰
            </button>

            {/* Phone & Currency */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div className="belletny-service-text">
                Customer Service : {BELLETNY_PHONE}
              </div>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as 'USD' | 'INR')}
                aria-label="Select Currency"
                style={{
                  background: 'rgba(0,0,0,0.2)',
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

            {/* Logo */}
            <a href="#belletny" className="belletny-logo-wrap">
              <img src={BELLETNY_LOGO} alt="Belletny" className="belletny-logo-img" />
            </a>

            {/* Search, Wishlist, User, Cart */}
            <div className="belletny-top-right">
              <div className="belletny-search-bar" onClick={() => setIsSearchOpen(true)} style={{ cursor: 'pointer' }}>
                <input
                  type="text"
                  readOnly
                  placeholder="Search"
                  className="belletny-search-input"
                />
                <button
                  type="button"
                  className="belletny-search-icon-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    setIsSearchOpen(true)
                  }}
                  title="Search"
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </button>
              </div>

              <button
                type="button"
                className="belletny-action-icon"
                onClick={() => setIsWishlistOpen(true)}
                title="Wishlist"
                style={{ position: 'relative' }}
              >
                <svg width="22" height="22" fill={wishlist.length > 0 ? '#8e2043' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {wishlist.length > 0 && <span className="belletny-cart-badge">{wishlist.length}</span>}
              </button>

              <button
                type="button"
                className="belletny-action-icon"
                onClick={() => setIsAccountOpen(true)}
                title="Account"
              >
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>

              <button
                type="button"
                className="belletny-action-icon"
                onClick={() => setIsCartOpen(true)}
                title="Shopping Bag"
              >
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span className="belletny-cart-badge">{totalCartCount}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Main Navigation Bar */}
      <nav className="belletny-nav-bar">
        <div className="belletny-container">
          <ul className="belletny-nav-list">
            {navItems.map((item) => (
              <li key={item.label} className="wv-nav-dropdown-wrap">
                <span
                  className="belletny-nav-link"
                  onClick={() => {
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

      {/* 3. Hero Section Slider */}
      <section className="belletny-hero-section">
        <img src={currentSlide.image} alt={currentSlide.title} className="belletny-hero-bg" />
        <div className="belletny-container" style={{ width: '100%' }}>
          <div className="belletny-hero-content">
            <div className="belletny-hero-subtitle">{currentSlide.subtitle}</div>
            <h1 className="belletny-hero-title">{currentSlide.title}</h1>
            <button
              className="belletny-btn-maroon"
              onClick={() => {
                document.getElementById('belletny-catalog')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {currentSlide.buttonText}
            </button>
          </div>
        </div>

        {/* Arrow Controls */}
        <button
          className="belletny-hero-arrow prev"
          onClick={() => setActiveSlide((prev) => (prev === 0 ? BELLETNY_HERO_SLIDES.length - 1 : prev - 1))}
        >
          ‹
        </button>
        <button
          className="belletny-hero-arrow next"
          onClick={() => setActiveSlide((prev) => (prev + 1) % BELLETNY_HERO_SLIDES.length)}
        >
          ›
        </button>
      </section>

      {/* 4. Shop By Categories */}
      <section className="belletny-categories-section">
        <div className="belletny-container">
          <h2 className="belletny-section-h2">Shop By Categories</h2>
          <div className="belletny-script-accent" />
          <div className="belletny-categories-flex">
            {BELLETNY_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="belletny-category-item"
                onClick={() => {
                  document.getElementById('belletny-catalog')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <div className="belletny-cat-circle">
                  <img src={cat.image} alt={cat.name} className="belletny-cat-circle-img" />
                </div>
                <div className="belletny-cat-name">{cat.name}</div>
                <div className="belletny-cat-count">{cat.itemCount}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 2 Middle Promo Banners */}
      <section className="belletny-middle-banners">
        <div className="belletny-container">
          <div className="belletny-mid-grid">
            {BELLETNY_MIDDLE_BANNERS.map((banner) => (
              <div
                key={banner.id}
                className="belletny-mid-card"
                onClick={() => {
                  document.getElementById('belletny-catalog')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <img src={banner.image} alt={banner.title} className="belletny-mid-img" />
                <div className="belletny-mid-overlay">
                  <div className="belletny-mid-tag">{banner.tag}</div>
                  <h3 className="belletny-mid-title">{banner.title}</h3>
                  <button className="belletny-btn-maroon" style={{ padding: '8px 24px', fontSize: '13px' }}>
                    {banner.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Trending Products Section with Tabs */}
      <section className="belletny-trending-section" id="belletny-catalog">
        <div className="belletny-container">
          <h2 className="belletny-section-h2">Trending Products</h2>
          <div className="belletny-script-accent" />

          {/* Tabs */}
          <div className="belletny-tabs-row">
            <button
              className={`belletny-tab-btn ${activeTab === 'featured' ? 'active' : ''}`}
              onClick={() => setActiveTab('featured')}
            >
              Featured
            </button>
            <button
              className={`belletny-tab-btn ${activeTab === 'latest' ? 'active' : ''}`}
              onClick={() => setActiveTab('latest')}
            >
              Latest
            </button>
            <button
              className={`belletny-tab-btn ${activeTab === 'bestseller' ? 'active' : ''}`}
              onClick={() => setActiveTab('bestseller')}
            >
              Bestseller
            </button>
          </div>

          {/* Product Grid */}
          <div className="belletny-products-grid">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="belletny-product-card"
                onClick={() => setQuickViewProduct(product)}
                style={{ cursor: 'pointer' }}
              >
                <div className="belletny-card-thumb">
                  <img src={product.image} alt={product.name} className="belletny-product-img" />
                  {product.discountBadge && (
                    <span className="belletny-badge-round">{product.discountBadge}</span>
                  )}
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
                </div>

                <div className="belletny-card-body">
                  <div className="belletny-card-stars">
                    {'★'.repeat(Math.round(product.rating))}
                  </div>
                  <h3 className="belletny-prod-title">{product.name}</h3>
                  <div className="belletny-prices-row">
                    <span className="belletny-price">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="belletny-orig-price">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                  <button
                    className="belletny-btn-maroon"
                    style={{ marginTop: '12px', padding: '8px 18px', fontSize: '12px', width: '100%', justifyContent: 'center' }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(product)
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '40px' }}>
            <button
              className="belletny-btn-maroon"
              onClick={() => setActiveTab('all')}
            >
              View More
            </button>
          </div>
        </div>
      </section>

      {/* 7. Full-width Promo Banner */}
      <section className="belletny-wide-banner">
        <img
          src={BELLETNY_PROD_WIDE_BANNER.image}
          alt={BELLETNY_PROD_WIDE_BANNER.title}
          className="belletny-wide-bg"
        />
        <div className="belletny-container" style={{ width: '100%' }}>
          <div className="belletny-wide-content">
            <div style={{ fontSize: '18px', color: '#555555', marginBottom: '8px' }}>
              {BELLETNY_PROD_WIDE_BANNER.subtitle}
            </div>
            <h2 className="belletny-hero-title" style={{ fontSize: '42px', marginBottom: '24px' }}>
              {BELLETNY_PROD_WIDE_BANNER.title}
            </h2>
            <button
              className="belletny-btn-maroon"
              onClick={() => {
                document.getElementById('belletny-catalog')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {BELLETNY_PROD_WIDE_BANNER.buttonText}
            </button>
          </div>
        </div>
      </section>

      {/* 8. 3 Trust Badges */}
      <section className="belletny-trust-section">
        <div className="belletny-container">
          <div className="belletny-trust-grid">
            {BELLETNY_TRUST_BADGES.map((badge) => (
              <div key={badge.id} className="belletny-trust-item">
                <img src={badge.icon} alt={badge.title} className="belletny-trust-icon-img" />
                <h4 className="belletny-trust-title">{badge.title}</h4>
                <p className="belletny-trust-desc">{badge.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. Customer Testimonial */}
      <section className="belletny-test-section">
        <div className="belletny-container">
          <div className="belletny-test-grid">
            <div>
              <img
                src={BELLETNY_TESTIMONIAL.image}
                alt={BELLETNY_TESTIMONIAL.author}
                className="belletny-test-img"
              />
            </div>
            <div>
              <h2 className="belletny-section-h2" style={{ textAlign: 'left' }}>
                What The Client Say
              </h2>
              <div className="belletny-script-accent" style={{ margin: '0 0 20px 0' }} />
              <p className="belletny-test-quote">
                "{BELLETNY_TESTIMONIAL.content}"
              </p>
              <div className="belletny-test-author">{BELLETNY_TESTIMONIAL.author}</div>
              <div className="belletny-test-role">{BELLETNY_TESTIMONIAL.role}</div>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Our Latest Blog */}
      <section className="belletny-blog-section">
        <div className="belletny-container">
          <h2 className="belletny-section-h2">Our Latest Blog</h2>
          <div className="belletny-script-accent" />
          <div className="belletny-blog-grid">
            {BELLETNY_BLOG_POSTS.map((post) => (
              <article key={post.id} className="belletny-blog-card">
                <div className="belletny-blog-thumb">
                  <img src={post.image} alt={post.title} className="belletny-blog-img" />
                </div>
                <div className="belletny-blog-body">
                  <div className="belletny-blog-date">{post.date}</div>
                  <h3 className="belletny-blog-title">{post.title}</h3>
                  <p className="belletny-blog-excerpt">{post.excerpt}</p>
                  <a href="#read" className="belletny-blog-link">
                    Read More →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 11. Brand Logos Strip */}
      <section className="belletny-brands-section">
        <div className="belletny-container">
          <div className="belletny-brands-flex">
            {BELLETNY_BRAND_LOGOS.map((logo, index) => (
              <img key={index} src={logo} alt={`Brand ${index + 1}`} className="belletny-brand-img" />
            ))}
          </div>
        </div>
      </section>

      {/* 12. Maroon Footer */}
      <footer className="belletny-footer">
        <div className="belletny-container">
          <div className="belletny-footer-grid">
            {/* Col 1 */}
            <div>
              <img
                src={BELLETNY_LOGO}
                alt="Belletny"
                style={{ height: '38px', marginBottom: '16px', filter: 'brightness(0) invert(1)' }}
              />
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#ebdcdb', marginBottom: '14px' }}>
                Organic clean skincare, certified cruelty-free botanical makeup, and natural fragrances.
              </p>
              <div style={{ fontSize: '13px', color: '#ffffff' }}>Phone: {BELLETNY_PHONE}</div>
              <div style={{ fontSize: '13px', color: '#ffffff', marginTop: '4px' }}>
                Email: care@belletny-store.com
              </div>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="belletny-footer-h4">Quick Links</h4>
              <ul className="belletny-footer-links">
                <li><a href="#privacy" className="belletny-footer-link">Privacy Policy</a></li>
                <li><a href="#about" className="belletny-footer-link">About Us</a></li>
                <li><a href="#terms" className="belletny-footer-link">Terms & Conditions</a></li>
                <li><a href="#contact" className="belletny-footer-link">Contact Us</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="belletny-footer-h4">Information</h4>
              <ul className="belletny-footer-links">
                <li><a href="#orders" className="belletny-footer-link">My Orders</a></li>
                <li><a href="#shipping" className="belletny-footer-link">Delivery Information</a></li>
                <li><a href="#returns" className="belletny-footer-link">Returns Policy</a></li>
                <li><a href="#site" className="belletny-footer-link">Site Map</a></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="belletny-footer-h4">Newsletter</h4>
              <p style={{ fontSize: '13px', color: '#ebdcdb' }}>
                Sign up for our newsletter to receive beauty trends and exclusive discounts.
              </p>
              <div className="belletny-nl-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="belletny-nl-input"
                />
                <button
                  className="belletny-nl-btn"
                  onClick={() => alert('Subscribed to Belletny newsletter!')}
                >
                  ➤
                </button>
              </div>
            </div>
          </div>

          <div className="belletny-footer-bottom">
            <div>© 2026 Belletny - Beauty Products Store. All Rights Reserved.</div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span>VISA</span>
              <span>MasterCard</span>
              <span>PayPal</span>
              <span>Apple Pay</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="belletny-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="belletny-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="belletny-drawer-header">
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#8e2043' }}>
                Shopping Cart ({totalCartCount})
              </h3>
              <button
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#666' }}
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="belletny-drawer-body">
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#666' }}>
                  Your cart is currently empty
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
                      borderBottom: '1px solid #ebdcdb',
                    }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: '60px', height: '60px', borderRadius: '6px', objectFit: 'contain' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{item.product.name}</div>
                      <div style={{ color: '#8e2043', fontWeight: 700, fontSize: '13px', margin: '4px 0' }}>
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
              <div className="belletny-drawer-footer">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 700 }}>
                  <span>Subtotal</span>
                  <span style={{ color: '#8e2043' }}>{formatPrice(cartSubtotal)}</span>
                </div>
                <button
                  className="belletny-btn-maroon"
                  style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}
                  onClick={() => alert(`Proceeding to checkout with total: ${formatPrice(cartSubtotal)}`)}
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
        <div className="belletny-drawer-overlay" onClick={() => setQuickViewProduct(null)}>
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              maxWidth: '650px',
              width: '100%',
              margin: 'auto',
              padding: '24px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
              position: 'relative',
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
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px' }}>
                {quickViewProduct.name}
              </h2>
              <div style={{ color: '#f59e0b', fontSize: '12px', marginBottom: '12px' }}>
                {'★'.repeat(Math.round(quickViewProduct.rating))} ({quickViewProduct.reviewCount} reviews)
              </div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#8e2043', marginBottom: '12px' }}>
                {formatPrice(quickViewProduct.price)}
              </div>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#666', marginBottom: '20px' }}>
                {quickViewProduct.description}
              </p>
              <button
                className="belletny-btn-maroon"
                style={{ marginTop: 'auto', justifyContent: 'center' }}
                onClick={() => {
                  handleAddToCart(quickViewProduct)
                  setQuickViewProduct(null)
                }}
              >
                Add to Cart • {formatPrice(quickViewProduct.price)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <StorefrontSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={BELLETNY_PRODUCTS.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category,
        }))}
        onSelectProduct={(p) => {
          const fullProd = BELLETNY_PRODUCTS.find((x) => x.id === p.id)
          if (fullProd) setQuickViewProduct(fullProd)
        }}
        accentColor={customAccentColor || '#8e2043'}
        currencyPrefix={currency === 'INR' ? '₹' : '$'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
        placeholder="Search hair creams, makeup brushes, concealers..."
        popularTags={['Hair Cream', 'Concealer', 'Brushes']}
      />

      {/* Wishlist Drawer */}
      <StorefrontWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        allProducts={BELLETNY_PRODUCTS.map((p) => ({
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
          const fullProd = BELLETNY_PRODUCTS.find((x) => x.id === p.id)
          if (fullProd) handleAddToCart(fullProd)
        }}
        onOpenProduct={(p) => {
          const fullProd = BELLETNY_PRODUCTS.find((x) => x.id === p.id)
          if (fullProd) setQuickViewProduct(fullProd)
        }}
        accentColor={customAccentColor || '#8e2043'}
      />

      {/* Account Modal */}
      <StorefrontAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        brandName="Belletny"
        accentColor={customAccentColor || '#8e2043'}
      />

      {/* Mobile Navigation Drawer */}
      <StorefrontMobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        brandName="Belletny"
        navItems={navItems}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        cartCount={totalCartCount}
        contactPhone={BELLETNY_PHONE}
        contactEmail="service@belletny.com"
        accentColor={customAccentColor || '#8e2043'}
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
export default BelletnyStorefront
