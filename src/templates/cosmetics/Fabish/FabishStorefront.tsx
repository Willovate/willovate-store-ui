import { useState, useMemo, useEffect } from 'react'
import type {
  FabishProduct,
  FabishCartItem,
  FabishStorefrontProps,
} from './types'
import {
  FABISH_LOGO,
  FABISH_ANNOUNCEMENT,
  FABISH_HERO_SLIDES,
  FABISH_FEATURE_BADGES,
  FABISH_COLLAGE_CARDS,
  FABISH_PRODUCTS,
  FABISH_SERUM_STORY,
  FABISH_PEELING_BANNER,
  FABISH_TESTIMONIALS,
  FABISH_BLOG_POSTS,
  FABISH_INSTAGRAM_IMAGES,
  FABISH_RECENT_PURCHASE,
} from './data/fabishData'
import {
  StorefrontSearchModal,
  StorefrontWishlistDrawer,
  StorefrontAccountModal,
  StorefrontMobileNavDrawer,
  type MobileNavItem,
} from '../../common/StorefrontModals'
import './styles/fabish.css'

export function FabishStorefront({
  template: _template,
  device = 'desktop',
  deviceView,
  customAccentColor,
  onColorChange: _onColorChange,
  onUseTemplate: _onUseTemplate,
  onClose: _onClose,
  onBack: _onBack,
}: FabishStorefrontProps) {
  const effectiveDevice = (deviceView as string) || device || 'desktop'

  // Navigation & Category Tab state
  const [activeTab, setActiveTab] = useState<'all' | 'skin-care' | 'body-care' | 'hair-care'>('all')
  const [activeSlide, setActiveSlide] = useState(0)

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<FabishProduct | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [showToast, setShowToast] = useState(true)
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD')

  const formatPrice = (usdAmount: number) => {
    if (currency === 'INR') {
      return `₹${Math.round(usdAmount * 83).toLocaleString('en-IN')}`
    }
    return `$${usdAmount.toFixed(2)}`
  }

  // Interactive Collections
  const [wishlist, setWishlist] = useState<string[]>([])
  const [cartItems, setCartItems] = useState<FabishCartItem[]>([
    { product: FABISH_PRODUCTS[0], quantity: 1 },
    { product: FABISH_PRODUCTS[3], quantity: 2 },
  ])

  const navItems: MobileNavItem[] = [
    {
      label: 'Home',
      children: [
        { label: 'Hero Collection', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { label: 'Collage Highlights', onClick: () => { const el = document.getElementById('fabish-collage-grid'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Shop',
      children: [
        { label: 'All Products', onClick: () => { setActiveTab('all'); const el = document.getElementById('fabish-shop-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Skin Care', onClick: () => { setActiveTab('skin-care'); const el = document.getElementById('fabish-shop-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Body Care', onClick: () => { setActiveTab('body-care'); const el = document.getElementById('fabish-shop-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Hair Care', onClick: () => { setActiveTab('hair-care'); const el = document.getElementById('fabish-shop-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Collection',
      children: [
        { label: 'Peeling Creams Series', onClick: () => { const el = document.getElementById('fabish-shop-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Hydra Serum Story', onClick: () => { const el = document.getElementById('fabish-shop-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Pages',
      children: [
        { label: 'Customer Reviews', onClick: () => { const el = document.getElementById('fabish-testimonials'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Shipping & Delivery', onClick: () => alert('Free shipping worldwide on orders above $60') },
      ],
    },
    {
      label: 'Blog',
      children: [
        { label: 'Natural Glow Articles', onClick: () => { const el = document.getElementById('fabish-blog-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Contact',
      onClick: () => alert('Customer Support: support@fabishbeauty.com'),
    },
  ]

  // Filtered Products for Tabs
  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') return FABISH_PRODUCTS
    return FABISH_PRODUCTS.filter((p) => p.category === activeTab)
  }, [activeTab])

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }, [cartItems])

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0)
  }, [cartItems])

  // Actions
  const handleAddToCart = (product: FabishProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    setIsCartOpen(true)
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
        .filter(Boolean) as FabishCartItem[]
    )
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  // Auto slide interval
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % FABISH_HERO_SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const currentSlide = FABISH_HERO_SLIDES[activeSlide]

  return (
    <div
      className={`fabish-storefront device-${effectiveDevice}`}
      style={
        customAccentColor
          ? ({ '--fabish-pink': customAccentColor } as React.CSSProperties)
          : undefined
      }
    >
      {/* 1. Announcement Bar */}
      <div className="fabish-announcement">
        <div className="fabish-announcement-links" style={{ visibility: 'hidden' }}>
          <span>USD $</span>
        </div>
        <div className="fabish-announcement-text">{FABISH_ANNOUNCEMENT}</div>
        <div className="fabish-announcement-links" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as 'USD' | 'INR')}
            aria-label="Select Currency"
            style={{
              background: 'rgba(0,0,0,0.15)',
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
          <span>English</span>
          <button
            type="button"
            onClick={() => setIsAccountOpen(true)}
            style={{ color: '#ffffff', background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}
          >
            Account
          </button>
        </div>
      </div>

      {/* 2. Main Sticky Header */}
      <header className="fabish-header">
        <div className="fabish-header-inner">
          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="fabish-hamburger-btn"
            onClick={() => setIsMobileNavOpen(true)}
            title="Menu"
            aria-label="Open mobile menu"
          >
            ☰
          </button>

          {/* Logo */}
          <a href="#fabish" className="fabish-logo-link">
            <img src={FABISH_LOGO} alt="Fabish" className="fabish-logo-img" />
          </a>

          {/* Navigation Links */}
          <nav>
            <ul className="fabish-nav-menu">
              {navItems.map((item) => (
                <li key={item.label} className="wv-nav-dropdown-wrap">
                  <span
                    className="fabish-nav-link"
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
          </nav>

          {/* Header Action Buttons */}
          <div className="fabish-header-actions">
            <button
              className="fabish-action-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
              title="Search store"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </button>

            <button
              className="fabish-action-btn"
              onClick={() => setIsAccountOpen(true)}
              aria-label="User Account"
              title="Account"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            <button
              className="fabish-action-btn"
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Wishlist"
              title="Saved items"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlist.length > 0 && <span className="fabish-badge-count">{wishlist.length}</span>}
            </button>

            <button
              className="fabish-action-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              title="View Cart"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {totalCartCount > 0 && <span className="fabish-badge-count">{totalCartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* 3. Hero Section Slider */}
      <section className="fabish-hero-section">
        <div className="fabish-hero-container">
          <div className="fabish-hero-content">
            <span className="fabish-hero-eyebrow">{currentSlide.eyebrow}</span>
            <h1 className="fabish-hero-title">{currentSlide.title}</h1>
            <p className="fabish-hero-desc">{currentSlide.description}</p>
            <a
              href="#products"
              className="fabish-hero-btn"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('fabish-shop-catalog')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {currentSlide.buttonText}
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>

          <div className="fabish-hero-media">
            <div className="fabish-hero-img-wrap">
              <img
                src={currentSlide.image}
                alt={currentSlide.title}
                className="fabish-hero-img"
              />
            </div>
            {/* Dots */}
            <div className="fabish-hero-slider-nav">
              {FABISH_HERO_SLIDES.map((slide, index) => (
                <button
                  key={slide.id}
                  className={`fabish-slider-dot ${index === activeSlide ? 'active' : ''}`}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. 4 Feature Badges Bar */}
      <section className="fabish-features-section">
        <div className="fabish-features-grid">
          {FABISH_FEATURE_BADGES.map((badge) => (
            <div key={badge.id} className="fabish-feature-card">
              <div className="fabish-feature-icon">{badge.icon}</div>
              <div>
                <div className="fabish-feature-title">{badge.title}</div>
                <div className="fabish-feature-desc">{badge.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 4-Card Collage Grid */}
      <section className="fabish-collage-section">
        <div className="fabish-section-header">
          <div className="fabish-section-eyebrow">WORLDWIDE PREMIUM COLLECTION</div>
          <h2 className="fabish-section-title">Latest Worthwhile Collections</h2>
        </div>

        <div className="fabish-collage-grid">
          {FABISH_COLLAGE_CARDS.map((card) => (
            <div
              key={card.id}
              className={`fabish-collage-item ${card.gridArea}`}
              onClick={() => {
                document.getElementById('fabish-shop-catalog')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <img src={card.image} alt={card.title} className="fabish-collage-img" />
              <div className="fabish-collage-overlay">
                {card.tag && <span className="fabish-collage-tag">{card.tag}</span>}
                <div className="fabish-collage-title">{card.title}</div>
                <div className="fabish-collage-subtitle">{card.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. Deeply Nourishing Hair Serum Feature Story Split Section */}
      <section className="fabish-serum-section">
        <div className="fabish-serum-container">
          <div className="fabish-serum-media">
            <img
              src={FABISH_SERUM_STORY.image}
              alt={FABISH_SERUM_STORY.title}
              className="fabish-serum-img"
            />
          </div>
          <div className="fabish-serum-content">
            <span className="fabish-hero-eyebrow">{FABISH_SERUM_STORY.eyebrow}</span>
            <h2 className="fabish-hero-title" style={{ fontSize: '36px' }}>
              {FABISH_SERUM_STORY.title}
            </h2>
            <p className="fabish-hero-desc">{FABISH_SERUM_STORY.description}</p>
            <ul className="fabish-checklist">
              {FABISH_SERUM_STORY.features.map((feat, idx) => (
                <li key={idx} className="fabish-checklist-item">
                  <span className="fabish-check-icon">✓</span>
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <span style={{ fontSize: '28px', fontWeight: 700, color: '#2e5b4b' }}>
                {formatPrice(27)}
              </span>
              <button
                className="fabish-hero-btn"
                onClick={() => handleAddToCart(FABISH_PRODUCTS[11])}
              >
                {FABISH_SERUM_STORY.buttonText}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Full-width Luxurious Peeling Face Creams Banner */}
      <section className="fabish-wide-banner">
        <img
          src={FABISH_PEELING_BANNER.image}
          alt={FABISH_PEELING_BANNER.title}
          className="fabish-wide-bg"
        />
        <div className="fabish-wide-content">
          <span className="fabish-hero-eyebrow" style={{ backgroundColor: '#ffffff', color: '#2e5b4b' }}>
            {FABISH_PEELING_BANNER.eyebrow}
          </span>
          <h2 style={{ fontSize: '38px', fontWeight: 700, marginBottom: '16px' }}>
            {FABISH_PEELING_BANNER.title}
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.6, opacity: 0.95, marginBottom: '28px' }}>
            {FABISH_PEELING_BANNER.description}
          </p>
          <button
            className="fabish-hero-btn"
            style={{ backgroundColor: '#ffffff', color: '#2e5b4b' }}
            onClick={() => {
              document.getElementById('fabish-shop-catalog')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {FABISH_PEELING_BANNER.buttonText}
          </button>
        </div>
      </section>

      {/* 8. Tabbed Beauty Care Products Catalog */}
      <section className="fabish-products-section" id="fabish-shop-catalog">
        <div className="fabish-section-header">
          <div className="fabish-section-eyebrow">AURA BLOOM BOTANICALS</div>
          <h2 className="fabish-section-title">Beauty Care Products</h2>
        </div>

        {/* Tabs */}
        <div className="fabish-tabs-nav">
          <button
            className={`fabish-tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            All Products
          </button>
          <button
            className={`fabish-tab-btn ${activeTab === 'skin-care' ? 'active' : ''}`}
            onClick={() => setActiveTab('skin-care')}
          >
            Skin Care
          </button>
          <button
            className={`fabish-tab-btn ${activeTab === 'body-care' ? 'active' : ''}`}
            onClick={() => setActiveTab('body-care')}
          >
            Body Care
          </button>
          <button
            className={`fabish-tab-btn ${activeTab === 'hair-care' ? 'active' : ''}`}
            onClick={() => setActiveTab('hair-care')}
          >
            Hair Care
          </button>
        </div>

        {/* Product Grid */}
        <div className="fabish-products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="fabish-product-card" style={{ position: 'relative' }}>
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
              <div className="fabish-card-media">
                <img
                  src={product.image}
                  alt={product.name}
                  className="fabish-card-img"
                  onMouseEnter={(e) => {
                    if (product.hoverImage) {
                      e.currentTarget.src = product.hoverImage
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.src = product.image
                  }}
                />
                {product.discountBadge && (
                  <span className="fabish-discount-pill">{product.discountBadge}</span>
                )}

                {/* Quick Actions */}
                <div className="fabish-card-quick-actions">
                  <button
                    className="fabish-quick-btn"
                    title="Quick view"
                    onClick={() => setQuickViewProduct(product)}
                  >
                    <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  </button>
                  <button
                    className="fabish-quick-btn"
                    title={wishlist.includes(product.id) ? 'Remove wishlist' : 'Add to wishlist'}
                    onClick={() => toggleWishlist(product.id)}
                    style={{ color: wishlist.includes(product.id) ? '#e87868' : 'inherit' }}
                  >
                    <svg
                      width="18"
                      height="18"
                      fill={wishlist.includes(product.id) ? '#e87868' : 'none'}
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="fabish-card-body">
                <div className="fabish-card-stars">
                  {'★'.repeat(Math.round(product.rating))}
                  <span className="fabish-card-reviews">({product.reviewCount})</span>
                </div>
                <h3 className="fabish-card-title">{product.name}</h3>
                {product.volume && <span className="fabish-card-volume">{product.volume}</span>}
                <div className="fabish-card-footer">
                  <div className="fabish-card-prices">
                    <span className="fabish-card-price">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="fabish-card-original">{formatPrice(product.originalPrice)}</span>
                    )}
                  </div>
                  <button
                    className="fabish-card-add-btn"
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

      {/* 9. Verified Customer Testimonials */}
      <section className="fabish-testimonials-section">
        <div className="fabish-section-header">
          <div className="fabish-section-eyebrow">WHAT OUR CLIENTS SAY</div>
          <h2 className="fabish-section-title">Verified Customer Reviews</h2>
        </div>

        <div className="fabish-testimonials-grid">
          {FABISH_TESTIMONIALS.map((test) => (
            <div key={test.id} className="fabish-testimonial-card">
              <div className="fabish-card-stars" style={{ fontSize: '18px' }}>
                {'★'.repeat(test.rating)}
              </div>
              <p className="fabish-testimonial-text">"{test.content}"</p>
              <div className="fabish-testimonial-author">
                <img src={test.avatar} alt={test.author} className="fabish-author-avatar" />
                <div>
                  <div className="fabish-author-name">{test.author}</div>
                  <div className="fabish-author-role">
                    {test.role} • {test.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. From Our Blog */}
      <section className="fabish-blog-section">
        <div className="fabish-section-header">
          <div className="fabish-section-eyebrow">SKINCARE EXPERT INSIGHTS</div>
          <h2 className="fabish-section-title">From Our Editorial Blog</h2>
        </div>

        <div className="fabish-blog-grid">
          {FABISH_BLOG_POSTS.map((post) => (
            <article key={post.id} className="fabish-blog-card">
              <div className="fabish-blog-media">
                <img src={post.image} alt={post.title} className="fabish-blog-img" />
              </div>
              <div className="fabish-blog-body">
                <div className="fabish-blog-meta">
                  {post.category} • {post.date}
                </div>
                <h3 className="fabish-blog-title">{post.title}</h3>
                <p className="fabish-blog-excerpt">{post.excerpt}</p>
                <a href="#read" className="fabish-blog-link">
                  Read Article →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 11. Instagram Live Gallery */}
      <section className="fabish-insta-section">
        <div className="fabish-section-header" style={{ marginBottom: '24px' }}>
          <div className="fabish-section-eyebrow">@FABISH_OFFICIAL</div>
          <h2 className="fabish-section-title">Follow Us On Instagram</h2>
        </div>
        <div className="fabish-insta-grid">
          {FABISH_INSTAGRAM_IMAGES.map((img, i) => (
            <div key={i} className="fabish-insta-item">
              <img src={img} alt={`Instagram ${i + 1}`} className="fabish-insta-img" />
              <div className="fabish-insta-overlay">📸</div>
            </div>
          ))}
        </div>
      </section>

      {/* 12. Newsletter & 4-Column Footer */}
      <footer className="fabish-footer">
        <div className="fabish-footer-container">
          {/* Column 1: Brand & Newsletter */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
              <img src={FABISH_LOGO} alt="Fabish" style={{ height: '32px', filter: 'brightness(0) invert(1)' }} />
            </div>
            <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#a4b5ad', maxWidth: '320px' }}>
              Certified organic, vegan, cruelty-free formulas handcrafted for radiant, long-lasting wellness.
            </p>
            <div className="fabish-newsletter-form">
              <input
                type="email"
                placeholder="Enter your email"
                className="fabish-newsletter-input"
              />
              <button
                className="fabish-newsletter-btn"
                onClick={() => alert('Thank you for subscribing to Fabish updates!')}
              >
                Join
              </button>
            </div>
          </div>

          {/* Column 2: Presets & Shop */}
          <div>
            <h4 className="fabish-footer-title">PRESETS</h4>
            <ul className="fabish-footer-links">
              <li><a href="#shop" className="fabish-footer-link">Cleansers</a></li>
              <li><a href="#shop" className="fabish-footer-link">Hydrating Serums</a></li>
              <li><a href="#shop" className="fabish-footer-link">Moisturizers</a></li>
              <li><a href="#shop" className="fabish-footer-link">Hair Nourish Oils</a></li>
              <li><a href="#shop" className="fabish-footer-link">Sunscreen BB Cream</a></li>
            </ul>
          </div>

          {/* Column 3: Fabish Story */}
          <div>
            <h4 className="fabish-footer-title">FABISH</h4>
            <ul className="fabish-footer-links">
              <li><a href="#about" className="fabish-footer-link">Our Botanical Philosophy</a></li>
              <li><a href="#ingredients" className="fabish-footer-link">Ingredient Transparency</a></li>
              <li><a href="#sustainability" className="fabish-footer-link">Zero Waste Packaging</a></li>
              <li><a href="#careers" className="fabish-footer-link">Careers & Press</a></li>
              <li><a href="#privacy" className="fabish-footer-link">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Column 4: Customer Support */}
          <div>
            <h4 className="fabish-footer-title">GET ACTIVE</h4>
            <ul className="fabish-footer-links">
              <li><a href="#support" className="fabish-footer-link">Customer Care 24/7</a></li>
              <li><a href="#shipping" className="fabish-footer-link">Track Your Order</a></li>
              <li><a href="#returns" className="fabish-footer-link">30-Day Free Returns</a></li>
              <li><a href="#faqs" className="fabish-footer-link">Frequently Asked Questions</a></li>
              <li><a href="#contact" className="fabish-footer-link">hello@fabish-skincare.com</a></li>
            </ul>
          </div>
        </div>

        <div className="fabish-footer-bottom">
          <div>© 2026 Fabish Theme. All rights reserved. Powered by Shopify.</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>VISA</span>
            <span>MasterCard</span>
            <span>Apple Pay</span>
            <span>PayPal</span>
          </div>
        </div>
      </footer>

      {/* 13. Floating Recent Purchase Toast */}
      {showToast && (
        <div className="fabish-recent-toast">
          <img
            src={FABISH_RECENT_PURCHASE.image}
            alt={FABISH_RECENT_PURCHASE.productName}
            className="fabish-toast-img"
          />
          <div className="fabish-toast-info">
            <div className="fabish-toast-title">
              Someone purchased {FABISH_RECENT_PURCHASE.productName}
            </div>
            <div className="fabish-toast-meta">
              {FABISH_RECENT_PURCHASE.timeAgo} • {FABISH_RECENT_PURCHASE.location}
            </div>
          </div>
          <button
            className="fabish-toast-close"
            onClick={() => setShowToast(false)}
            aria-label="Dismiss toast"
          >
            ✕
          </button>
        </div>
      )}

      {/* 14. Cart Drawer */}
      {isCartOpen && (
        <div className="fabish-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="fabish-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="fabish-drawer-header">
              <div className="fabish-drawer-title">Shopping Cart ({totalCartCount})</div>
              <button
                className="fabish-drawer-close"
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="fabish-drawer-body">
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#6b7a72' }}>
                  <p>Your cart is empty</p>
                  <button
                    className="fabish-card-add-btn"
                    style={{ marginTop: '12px' }}
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.product.id} className="fabish-drawer-item">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="fabish-drawer-item-img"
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '14px', marginBottom: '4px' }}>
                        {item.product.name}
                      </div>
                      <div style={{ fontSize: '13px', color: '#2e5b4b', fontWeight: 700 }}>
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                        <button
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '4px',
                            border: '1px solid #e2e8e2',
                            background: '#ffffff',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleUpdateQuantity(item.product.id, -1)}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>{item.quantity}</span>
                        <button
                          style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '4px',
                            border: '1px solid #e2e8e2',
                            background: '#ffffff',
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
              <div className="fabish-drawer-footer">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 700 }}>
                  <span>Subtotal</span>
                  <span style={{ color: '#2e5b4b' }}>{formatPrice(cartSubtotal)}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#6b7a72', margin: '6px 0 12px' }}>
                  Taxes and shipping calculated at checkout
                </p>
                <button
                  className="fabish-checkout-btn"
                  onClick={() => alert(`Proceeding to checkout with subtotal: ${formatPrice(cartSubtotal)}`)}
                >
                  Proceed to Checkout →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 15. Quick View Modal */}
      {quickViewProduct && (
        <div className="fabish-modal-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="fabish-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              className="fabish-modal-close"
              onClick={() => setQuickViewProduct(null)}
            >
              ✕
            </button>
            <div style={{ background: '#f6f8f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{ width: '100%', maxHeight: '420px', objectFit: 'cover' }}
              />
            </div>
            <div style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
              <span className="fabish-hero-eyebrow">{quickViewProduct.category.toUpperCase()}</span>
              <h2 style={{ fontSize: '24px', fontWeight: 700, margin: '8px 0' }}>
                {quickViewProduct.name}
              </h2>
              <div className="fabish-card-stars" style={{ marginBottom: '12px' }}>
                {'★'.repeat(Math.round(quickViewProduct.rating))}
                <span className="fabish-card-reviews">({quickViewProduct.reviewCount} customer reviews)</span>
              </div>
              <div style={{ fontSize: '22px', fontWeight: 700, color: '#2e5b4b', marginBottom: '16px' }}>
                {formatPrice(quickViewProduct.price)}
                {quickViewProduct.originalPrice && (
                  <span style={{ fontSize: '15px', color: '#6b7a72', textDecoration: 'line-through', marginLeft: '10px' }}>
                    {formatPrice(quickViewProduct.originalPrice)}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#6b7a72', marginBottom: '24px' }}>
                {quickViewProduct.description}
              </p>
              <button
                className="fabish-hero-btn"
                style={{ marginTop: 'auto' }}
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
        products={FABISH_PRODUCTS.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category,
        }))}
        onSelectProduct={(p) => {
          const fullProd = FABISH_PRODUCTS.find((x) => x.id === p.id)
          if (fullProd) setQuickViewProduct(fullProd)
        }}
        accentColor={customAccentColor || '#2e5b4b'}
        currencyPrefix={currency === 'INR' ? '₹' : '$'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
        placeholder="Search skincare, hair serum, lotion..."
        popularTags={['Skin Care', 'Body Care', 'Hair Care']}
      />

      {/* Wishlist Drawer */}
      <StorefrontWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        allProducts={FABISH_PRODUCTS.map((p) => ({
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
          const fullProd = FABISH_PRODUCTS.find((x) => x.id === p.id)
          if (fullProd) handleAddToCart(fullProd)
        }}
        onOpenProduct={(p) => {
          const fullProd = FABISH_PRODUCTS.find((x) => x.id === p.id)
          if (fullProd) setQuickViewProduct(fullProd)
        }}
        accentColor={customAccentColor || '#2e5b4b'}
      />

      {/* Account Modal */}
      <StorefrontAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        brandName="Fabish"
        accentColor={customAccentColor || '#2e5b4b'}
      />

      {/* Mobile Navigation Drawer */}
      <StorefrontMobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        brandName="Fabish"
        navItems={navItems}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        cartCount={totalCartCount}
        contactPhone="+1 800 234-FABISH"
        contactEmail="support@fabishbeauty.com"
        accentColor={customAccentColor || '#2e5b4b'}
      />
    </div>
  )
}
export default FabishStorefront

