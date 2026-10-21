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
import './styles/belletny.css'

export function BelletnyStorefront({
  template: _template,
  onColorChange: _onColorChange,
}: BelletnyStorefrontProps) {
  // Navigation & Tabs
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeTab, setActiveTab] = useState<'all' | 'featured' | 'latest' | 'bestseller'>('featured')
  const [searchQuery, setSearchQuery] = useState('')

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<BelletnyProduct | null>(null)
  const [wishlist, setWishlist] = useState<string[]>([])

  // Cart
  const [cartItems, setCartItems] = useState<BelletnyCartItem[]>([
    { product: BELLETNY_PRODUCTS[0], quantity: 1 },
    { product: BELLETNY_PRODUCTS[6], quantity: 1 },
  ])

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
    <div className="belletny-storefront">
      {/* 1. Maroon Header Top */}
      <div className="belletny-header-top">
        <div className="belletny-container">
          <div className="belletny-top-inner">
            {/* Phone */}
            <div className="belletny-service-text">
              Customer Service : {BELLETNY_PHONE}
            </div>

            {/* Logo */}
            <a href="#belletny" className="belletny-logo-wrap">
              <img src={BELLETNY_LOGO} alt="Belletny" className="belletny-logo-img" />
            </a>

            {/* Search, User, Cart */}
            <div className="belletny-top-right">
              <div className="belletny-search-bar">
                <input
                  type="text"
                  placeholder="Search"
                  className="belletny-search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  className="belletny-search-icon-btn"
                  onClick={() => {
                    if (searchQuery.trim()) {
                      document.getElementById('belletny-catalog')?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.35-4.35" />
                  </svg>
                </button>
              </div>

              <button
                className="belletny-action-icon"
                onClick={() => alert(`Saved wishlist items: ${wishlist.length}`)}
                title="Account"
              >
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>

              <button
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
            <li><a href="#home" className="belletny-nav-link active">Home</a></li>
            <li><a href="#hair-cream" className="belletny-nav-link">Hair Cream ▾</a></li>
            <li><a href="#collections" className="belletny-nav-link">Collections</a></li>
            <li><a href="#concealer" className="belletny-nav-link">Concealer ▾</a></li>
            <li><a href="#brushes" className="belletny-nav-link">Makeup Brushes</a></li>
            <li><a href="#blog" className="belletny-nav-link">Blog</a></li>
            <li><a href="#contact" className="belletny-nav-link">Contact</a></li>
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
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: '#ffffff',
                      border: '1px solid #ebdcdb',
                      color: wishlist.includes(product.id) ? '#8e2043' : '#888',
                      width: '30px',
                      height: '30px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist(product.id)
                    }}
                    title="Wishlist"
                  >
                    ♥
                  </button>
                </div>

                <div className="belletny-card-body">
                  <div className="belletny-card-stars">
                    {'★'.repeat(Math.round(product.rating))}
                  </div>
                  <h3 className="belletny-prod-title">{product.name}</h3>
                  <div className="belletny-prices-row">
                    <span className="belletny-price">${product.price.toFixed(2)}</span>
                    {product.originalPrice && (
                      <span className="belletny-orig-price">${product.originalPrice.toFixed(2)}</span>
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
                        ${item.product.price.toFixed(2)}
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
                  <span style={{ color: '#8e2043' }}>${cartSubtotal.toFixed(2)}</span>
                </div>
                <button
                  className="belletny-btn-maroon"
                  style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}
                  onClick={() => alert(`Proceeding to checkout with total: $${cartSubtotal.toFixed(2)}`)}
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
                ${quickViewProduct.price.toFixed(2)}
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
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default BelletnyStorefront
