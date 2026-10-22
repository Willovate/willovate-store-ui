import { useState, useMemo } from 'react'
import type {
  ShadesProduct,
  ShadesCartItem,
  ShadesStorefrontProps,
} from './types'
import {
  SHADES_LOGO,
  SHADES_HERO_SLIDES,
  SHADES_3_CATEGORY_CARDS,
  SHADES_STYLIST_BANNER,
  SHADES_PRODUCTS,
  SHADES_2_MIDDLE_BANNERS,
  SHADES_READY_TO_IMPRESS,
  SHADES_TESTIMONIAL,
  SHADES_BLOG_POSTS,
  SHADES_GALLERY_IMAGES,
} from './data/shadesData'
import {
  StorefrontSearchModal,
  StorefrontWishlistDrawer,
  StorefrontAccountModal,
  StorefrontMobileNavDrawer,
  type MobileNavItem,
} from '../../common/StorefrontModals'
import './styles/shades.css'

export function ShadesStorefront({
  template: _template,
  device = 'desktop',
  deviceView,
  customAccentColor,
  onColorChange: _onColorChange,
  onUseTemplate: _onUseTemplate,
  onClose: _onClose,
  onBack: _onBack,
}: ShadesStorefrontProps) {
  const effectiveDevice = (deviceView as string) || device || 'desktop'

  // Navigation & Mega menu
  const [_isMegaMenuOpen, _setIsMegaMenuOpen] = useState(false)
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeTab, setActiveTab] = useState<'all' | 'most-popular' | 'special' | 'best-seller'>('most-popular')

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<ShadesProduct | null>(null)
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
  const [cartItems, setCartItems] = useState<ShadesCartItem[]>([
    { product: SHADES_PRODUCTS[0], quantity: 1 },
    { product: SHADES_PRODUCTS[1], quantity: 2 },
  ])

  const navItems: MobileNavItem[] = [
    {
      label: 'Home',
      children: [
        { label: 'Featured Series', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { label: 'Category Highlights', onClick: () => { const el = document.getElementById('shades-category-cards'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Catalog',
      children: [
        { label: 'Most Popular', onClick: () => { setActiveTab('most-popular'); const el = document.getElementById('shades-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Special Edition', onClick: () => { setActiveTab('special'); const el = document.getElementById('shades-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Best Sellers', onClick: () => { setActiveTab('best-seller'); const el = document.getElementById('shades-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Shop',
      children: [
        { label: 'All Shades Makeup', onClick: () => { setActiveTab('all'); const el = document.getElementById('shades-catalog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Stylist Picks', onClick: () => { const el = document.getElementById('shades-stylist-banner'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Products',
      children: [
        { label: 'Ready To Impress', onClick: () => { const el = document.getElementById('shades-ready-impress'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Blog',
      children: [
        { label: 'Glamour & Shades Journal', onClick: () => { const el = document.getElementById('shades-blog-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'More',
      children: [
        { label: 'Customer Reviews', onClick: () => { const el = document.getElementById('shades-testimonials'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Help & FAQ', onClick: () => alert('Customer Support: care@shadescosmetics.com') },
      ],
    },
  ]

  // Filtered Products
  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') return SHADES_PRODUCTS
    return SHADES_PRODUCTS.filter((p) => p.category === activeTab)
  }, [activeTab])

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }, [cartItems])

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0)
  }, [cartItems])

  // Actions
  const handleAddToCart = (product: ShadesProduct) => {
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
        .filter(Boolean) as ShadesCartItem[]
    )
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  const currentSlide = SHADES_HERO_SLIDES[activeSlide]

  return (
    <div
      className={`shades-storefront device-${effectiveDevice}`}
      style={
        customAccentColor
          ? ({ '--shades-gold': customAccentColor } as React.CSSProperties)
          : undefined
      }
    >
      {/* Top Announcement Bar */}
      <div
        className="shades-top-bar"
        style={{
          background: '#111111',
          color: '#ffffff',
          fontSize: '12px',
          padding: '6px 24px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>COMPLIMENTARY SHIPPING ON ORDERS OVER {formatPrice(75)} &bull; EXCLUSIVE GLAMOUR EDITIONS</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '11px', opacity: 0.85 }}>Currency:</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as 'USD' | 'INR')}
              aria-label="Select Currency"
              style={{
                background: 'rgba(255,255,255,0.12)',
                color: '#ffffff',
                border: '1px solid rgba(255,255,255,0.3)',
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

      {/* 1. Header with Mega Menu */}
      <header className="shades-header">
        <div className="shades-header-inner">
          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="shades-hamburger-btn"
            onClick={() => setIsMobileNavOpen(true)}
            title="Menu"
            aria-label="Open mobile menu"
          >
            ☰
          </button>

          {/* Logo */}
          <a href="#shades" style={{ display: 'flex', alignItems: 'center' }}>
            <img src={SHADES_LOGO} alt="Shades" className="shades-logo-img" />
          </a>

          {/* Navigation */}
          <nav>
            <ul className="shades-nav-menu">
              {navItems.map((item) => (
                <li key={item.label} className="shades-nav-item wv-nav-dropdown-wrap">
                  <span
                    className="shades-nav-link"
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

          {/* Header Action Icons */}
          <div className="shades-header-actions">
            <button
              className="shades-icon-btn"
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
              className="shades-icon-btn"
              onClick={() => setIsAccountOpen(true)}
              aria-label="Account"
              title="Account"
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            <button
              className="shades-icon-btn"
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Wishlist"
              title="Wishlist"
              style={{ position: 'relative' }}
            >
              <svg width="20" height="20" fill={wishlist.length > 0 ? '#e5a93c' : 'none'} stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlist.length > 0 && <span className="shades-cart-badge">{wishlist.length}</span>}
            </button>

            <button
              className="shades-icon-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
              title="Cart"
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="shades-cart-badge">{totalCartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section Slider */}
      <section className="shades-hero-section">
        <img src={currentSlide.image} alt={currentSlide.headline} className="shades-hero-bg" />
        <div className="shades-hero-container">
          <div className="shades-hero-content">
            <div className="shades-cursive-gold">{currentSlide.cursiveEyebrow}</div>
            <h1 className="shades-hero-h1">{currentSlide.headline}</h1>
            <div className="shades-hero-subhead">{currentSlide.subheadline}</div>
            <button
              className="shades-btn-pill"
              onClick={() => {
                document.getElementById('shades-catalog')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {currentSlide.buttonText}
            </button>
          </div>
        </div>

        {/* Prev / Next controls */}
        <button
          className="shades-hero-arrow prev"
          onClick={() => setActiveSlide((prev) => (prev === 0 ? SHADES_HERO_SLIDES.length - 1 : prev - 1))}
        >
          ‹
        </button>
        <button
          className="shades-hero-arrow next"
          onClick={() => setActiveSlide((prev) => (prev + 1) % SHADES_HERO_SLIDES.length)}
        >
          ›
        </button>
      </section>

      {/* 3. 3 Category Cards Section */}
      <section className="shades-3cards-section">
        {SHADES_3_CATEGORY_CARDS.map((card) => (
          <div
            key={card.id}
            className="shades-cat-card"
            onClick={() => {
              document.getElementById('shades-catalog')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <img src={card.image} alt={card.title} className="shades-cat-img" />
            <div className="shades-cat-overlay">
              <div className="shades-cursive-gold" style={{ fontSize: '32px' }}>
                {card.scriptTag}
              </div>
              <h3 className="shades-cat-title">{card.title}</h3>
              <button className="shades-btn-gold">{card.buttonText}</button>
            </div>
          </div>
        ))}
      </section>

      {/* 4. Stylist Split Banner */}
      <section className="shades-stylist-section">
        <div className="shades-stylist-content">
          <div className="shades-cursive-gold" style={{ fontSize: '34px' }}>
            {SHADES_STYLIST_BANNER.cursiveEyebrow}
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px' }}>
            {SHADES_STYLIST_BANNER.title}
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.7, color: '#9e9e9e', marginBottom: '28px' }}>
            {SHADES_STYLIST_BANNER.description}
          </p>
          <button
            className="shades-btn-pill"
            onClick={() => {
              document.getElementById('shades-catalog')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {SHADES_STYLIST_BANNER.buttonText}
          </button>
        </div>
        <div className="shades-stylist-media">
          <img
            src={SHADES_STYLIST_BANNER.image}
            alt={SHADES_STYLIST_BANNER.title}
            className="shades-stylist-img"
          />
        </div>
      </section>

      {/* 5. Trending Products Section with Tabs */}
      <section className="shades-products-section" id="shades-catalog">
        <div className="shades-section-header">
          <div className="shades-cursive-gold">Best Selling</div>
          <h2 className="shades-section-h2">TRENDING PRODUCTS</h2>
        </div>

        {/* Tabs */}
        <div className="shades-tabs-row">
          <button
            className={`shades-tab-btn ${activeTab === 'most-popular' ? 'active' : ''}`}
            onClick={() => setActiveTab('most-popular')}
          >
            Most Popular
          </button>
          <button
            className={`shades-tab-btn ${activeTab === 'special' ? 'active' : ''}`}
            onClick={() => setActiveTab('special')}
          >
            Special
          </button>
          <button
            className={`shades-tab-btn ${activeTab === 'best-seller' ? 'active' : ''}`}
            onClick={() => setActiveTab('best-seller')}
          >
            Best Seller
          </button>
        </div>

        {/* Product Cards */}
        <div className="shades-products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="shades-product-card">
              <div className="shades-card-thumb" onClick={() => setQuickViewProduct(product)} style={{ cursor: 'pointer' }}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="shades-product-img"
                  onMouseEnter={(e) => {
                    if (product.hoverImage) e.currentTarget.src = product.hoverImage
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.src = product.image
                  }}
                />
                {product.discountBadge && (
                  <span className="shades-discount-badge">{product.discountBadge}</span>
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

              <div className="shades-card-body">
                <h3 className="shades-card-title">{product.name}</h3>
                <div className="shades-card-stars">
                  {'★'.repeat(Math.round(product.rating))}
                </div>
                <div className="shades-card-prices">
                  <span className="shades-card-price">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="shades-card-orig">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
                <button
                  className="shades-card-add-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. 2 Middle Promotional Banners */}
      <section className="shades-mid-banners-section">
        {SHADES_2_MIDDLE_BANNERS.map((banner) => (
          <div
            key={banner.id}
            className="shades-mid-banner"
            onClick={() => {
              document.getElementById('shades-catalog')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            <img src={banner.image} alt={banner.title} className="shades-mid-img" />
            <div className="shades-mid-content">
              <div className="shades-cursive-gold" style={{ fontSize: '28px' }}>
                {banner.scriptTag}
              </div>
              <h3 style={{ fontSize: '28px', fontWeight: 800, margin: '8px 0 16px', textTransform: 'uppercase' }}>
                {banner.title}
              </h3>
              <button className="shades-btn-gold" style={{ alignSelf: 'flex-start' }}>
                {banner.buttonText}
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* 7. Ready To Impress Section */}
      <section className="shades-impress-section">
        <div className="shades-impress-media">
          <img
            src={SHADES_READY_TO_IMPRESS.image}
            alt={SHADES_READY_TO_IMPRESS.title}
            className="shades-impress-img"
          />
        </div>
        <div>
          <div className="shades-cursive-gold" style={{ fontSize: '38px' }}>
            {SHADES_READY_TO_IMPRESS.scriptTag}
          </div>
          <h2 style={{ fontSize: '36px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '16px' }}>
            {SHADES_READY_TO_IMPRESS.title}
          </h2>
          <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#9e9e9e', marginBottom: '28px' }}>
            {SHADES_READY_TO_IMPRESS.description}
          </p>
          <button
            className="shades-btn-pill"
            onClick={() => {
              document.getElementById('shades-catalog')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {SHADES_READY_TO_IMPRESS.buttonText}
          </button>
        </div>
      </section>

      {/* 8. Customer Testimonial */}
      <section className="shades-test-section">
        <div className="shades-test-box">
          <div className="shades-test-avatar-wrap">
            <img
              src={SHADES_TESTIMONIAL.avatar}
              alt={SHADES_TESTIMONIAL.author}
              className="shades-test-avatar"
            />
            <div className="shades-test-quote-icon">“</div>
          </div>
          <div>
            <p className="shades-test-text">"{SHADES_TESTIMONIAL.content}"</p>
            <div className="shades-test-author">{SHADES_TESTIMONIAL.author}</div>
            <div className="shades-test-role">{SHADES_TESTIMONIAL.role}</div>
          </div>
        </div>
      </section>

      {/* 9. Latest News Blog Section */}
      <section className="shades-blog-section">
        <div className="shades-section-header">
          <div className="shades-cursive-gold">Best Selling</div>
          <h2 className="shades-section-h2">LATEST NEWS</h2>
        </div>
        <div className="shades-blog-grid">
          {SHADES_BLOG_POSTS.map((post) => (
            <article key={post.id} className="shades-blog-card">
              <div className="shades-blog-thumb">
                <img src={post.image} alt={post.title} className="shades-blog-img" />
              </div>
              <div className="shades-blog-body">
                <h3 className="shades-blog-title">{post.title}</h3>
                <p className="shades-blog-excerpt">{post.excerpt}</p>
                <a href="#read" className="shades-blog-link">
                  READ MORE →
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 10. Newsletter Banner */}
      <section className="shades-newsletter-section">
        <img
          src="https://theme-shade.myshopify.com/cdn/shop/files/slider-01_1903x.jpg"
          alt="Newsletter"
          className="shades-nl-bg"
        />
        <div className="shades-nl-content">
          <h2 style={{ fontSize: '32px', fontWeight: 800, textTransform: 'uppercase', marginBottom: '8px' }}>
            SUBSCRIBE TO NEWSLETTER
          </h2>
          <p style={{ fontSize: '13px', color: '#cccccc' }}>
            Join our VIP beauty club for exclusive seasonal shade palettes, tutorials, and private discounts.
          </p>
          <div className="shades-nl-form">
            <input
              type="email"
              placeholder="Your email address"
              className="shades-nl-input"
            />
            <button
              className="shades-nl-btn"
              onClick={() => alert('Subscribed to Shades VIP newsletter!')}
            >
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>

      {/* 11. Footer with 6 Gallery Photos */}
      <footer className="shades-footer">
        <div className="shades-footer-container">
          {/* Col 1 */}
          <div>
            <h5 className="shades-footer-h5">OUR COMPANY</h5>
            <ul className="shades-footer-links">
              <li><a href="#search" className="shades-footer-link">Search</a></li>
              <li><a href="#about" className="shades-footer-link">About Us</a></li>
              <li><a href="#contact" className="shades-footer-link">Contact</a></li>
              <li><a href="#shipping" className="shades-footer-link">Shipping</a></li>
              <li><a href="#collections" className="shades-footer-link">Collections</a></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h5 className="shades-footer-h5">PRODUCT</h5>
            <ul className="shades-footer-links">
              <li><a href="#face" className="shades-footer-link">Face Powders</a></li>
              <li><a href="#eyes" className="shades-footer-link">Eye Makeup</a></li>
              <li><a href="#lips" className="shades-footer-link">Lip Gloss & Matte</a></li>
              <li><a href="#nails" className="shades-footer-link">Nail Lacquers</a></li>
              <li><a href="#brushes" className="shades-footer-link">All Skintones</a></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h5 className="shades-footer-h5">STORE INFORMATION</h5>
            <p style={{ fontSize: '13px', color: '#9e9e9e', lineHeight: 1.6, marginBottom: '12px' }}>
              Shades Luxury Cosmetics Inc.<br />
              455 Broadway, Soho New York, NY 10013<br />
              Email: contact@theme-shade.com<br />
              Phone: +1 (800) 555-0199
            </p>
          </div>

          {/* Col 4: Gallery */}
          <div>
            <h5 className="shades-footer-h5">Gallery</h5>
            <div className="shades-gallery-grid">
              {SHADES_GALLERY_IMAGES.map((img, i) => (
                <img key={i} src={img} alt={`Gallery ${i + 1}`} className="shades-gallery-thumb" />
              ))}
            </div>
          </div>
        </div>

        <div className="shades-footer-bottom">
          <div>Copyright © 2026 Shades Theme. All Rights Reserved.</div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span>VISA</span>
            <span>MasterCard</span>
            <span>Apple Pay</span>
            <span>PayPal</span>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="shades-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="shades-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="shades-drawer-header">
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800, textTransform: 'uppercase' }}>
                Shopping Cart ({totalCartCount})
              </h3>
              <button
                style={{ background: 'none', border: 'none', color: '#9e9e9e', fontSize: '20px', cursor: 'pointer' }}
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="shades-drawer-body">
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#9e9e9e' }}>
                  Your cart is empty
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    style={{
                      display: 'flex',
                      gap: '14px',
                      paddingBottom: '16px',
                      marginBottom: '16px',
                      borderBottom: '1px solid #2a2a2a',
                    }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: '64px', height: '64px', borderRadius: '6px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>
                        {item.product.name}
                      </div>
                      <div style={{ color: '#e5a93c', fontWeight: 800, fontSize: '14px' }}>
                        {formatPrice(item.product.price * item.quantity)}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                        <button
                          style={{
                            width: '24px',
                            height: '24px',
                            background: '#242424',
                            border: '1px solid #3a3a3a',
                            color: '#fff',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleUpdateQuantity(item.product.id, -1)}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '13px', fontWeight: 700 }}>{item.quantity}</span>
                        <button
                          style={{
                            width: '24px',
                            height: '24px',
                            background: '#242424',
                            border: '1px solid #3a3a3a',
                            color: '#fff',
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
              <div className="shades-drawer-footer">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 800 }}>
                  <span>Subtotal</span>
                  <span style={{ color: '#e5a93c' }}>{formatPrice(cartSubtotal)}</span>
                </div>
                <button
                  className="shades-btn-gold"
                  style={{ width: '100%', marginTop: '16px', padding: '14px' }}
                  onClick={() => alert(`Checking out: ${formatPrice(cartSubtotal)}`)}
                >
                  Checkout Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="shades-drawer-overlay" onClick={() => setQuickViewProduct(null)}>
          <div
            style={{
              backgroundColor: '#1a1a1a',
              borderRadius: '16px',
              maxWidth: '680px',
              width: '100%',
              margin: 'auto',
              padding: '28px',
              border: '1px solid #2a2a2a',
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
                color: '#9e9e9e',
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
                style={{ maxWidth: '100%', maxHeight: '320px', objectFit: 'contain' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff', margin: '0 0 10px' }}>
                {quickViewProduct.name}
              </h2>
              <div style={{ color: '#e5a93c', fontSize: '13px', marginBottom: '12px' }}>
                {'★'.repeat(Math.round(quickViewProduct.rating))} ({quickViewProduct.reviewCount} reviews)
              </div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#e5a93c', marginBottom: '14px' }}>
                {formatPrice(quickViewProduct.price)}
                {quickViewProduct.originalPrice && (
                  <span style={{ fontSize: '14px', color: '#888', textDecoration: 'line-through', marginLeft: '10px' }}>
                    {formatPrice(quickViewProduct.originalPrice)}
                  </span>
                )}
              </div>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#9e9e9e', marginBottom: '20px' }}>
                {quickViewProduct.description}
              </p>
              <button
                className="shades-btn-gold"
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
        products={SHADES_PRODUCTS.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category,
        }))}
        onSelectProduct={(p) => {
          const fullProd = SHADES_PRODUCTS.find((x) => x.id === p.id)
          if (fullProd) setQuickViewProduct(fullProd)
        }}
        accentColor={customAccentColor || '#e5a93c'}
        currencyPrefix={currency === 'INR' ? '₹' : '$'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
        placeholder="Search glamorous shades, lip kits, foundations..."
        popularTags={['Most Popular', 'Special', 'Best Seller']}
      />

      {/* Wishlist Drawer */}
      <StorefrontWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        allProducts={SHADES_PRODUCTS.map((p) => ({
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
          const fullProd = SHADES_PRODUCTS.find((x) => x.id === p.id)
          if (fullProd) handleAddToCart(fullProd)
        }}
        onOpenProduct={(p) => {
          const fullProd = SHADES_PRODUCTS.find((x) => x.id === p.id)
          if (fullProd) setQuickViewProduct(fullProd)
        }}
        accentColor={customAccentColor || '#e5a93c'}
      />

      {/* Account Modal */}
      <StorefrontAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        brandName="Shades"
        accentColor={customAccentColor || '#e5a93c'}
      />

      {/* Mobile Navigation Drawer */}
      <StorefrontMobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        brandName="Shades"
        navItems={navItems}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        cartCount={totalCartCount}
        contactPhone="+1 800 999-SHADES"
        contactEmail="care@shadescosmetics.com"
        accentColor={customAccentColor || '#e5a93c'}
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
export default ShadesStorefront
