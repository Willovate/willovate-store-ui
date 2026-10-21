import { useState, useMemo } from 'react'
import type {
  SmeticProduct,
  SmeticCartItem,
  SmeticStorefrontProps,
} from './types'
import {
  SMETIC_LOGO,
  SMETIC_HERO_SLIDES,
  SMETIC_TRUST_ITEMS,
  SMETIC_PRODUCTS,
  SMETIC_PROMO_CARDS,
  SMETIC_WIDE_BANNER,
} from './data/smeticData'
import './styles/smetic.css'

export function SmeticStorefront({
  template: _template,
  onColorChange: _onColorChange,
}: SmeticStorefrontProps) {
  // Slider & Tabs
  const [activeSlide, setActiveSlide] = useState(0)
  const [activeTab, setActiveTab] = useState<'all' | 'new-arrivals' | 'best-sellers' | 'top-rates'>('new-arrivals')

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<SmeticProduct | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [wishlist, setWishlist] = useState<string[]>([])

  // Cart
  const [cartItems, setCartItems] = useState<SmeticCartItem[]>([
    { product: SMETIC_PRODUCTS[0], quantity: 1 },
    { product: SMETIC_PRODUCTS[2], quantity: 2 },
  ])

  // Filtered Products
  const filteredProducts = useMemo(() => {
    if (activeTab === 'all') return SMETIC_PRODUCTS
    return SMETIC_PRODUCTS.filter((p) => p.category === activeTab)
  }, [activeTab])

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }, [cartItems])

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0)
  }, [cartItems])

  // Actions
  const handleAddToCart = (product: SmeticProduct) => {
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
        .filter(Boolean) as SmeticCartItem[]
    )
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  const currentSlide = SMETIC_HERO_SLIDES[activeSlide]

  return (
    <div className="smetic-storefront">
      {/* 1. Header */}
      <header className="smetic-header">
        <div className="smetic-container">
          <div className="smetic-header-inner">
            {/* Logo */}
            <a href="#smetic" style={{ display: 'flex', alignItems: 'center' }}>
              <img src={SMETIC_LOGO} alt="Smetic Organic Cosmetic" className="smetic-logo-img" />
            </a>

            {/* Navigation */}
            <nav>
              <ul className="smetic-nav-menu">
                <li><a href="#home" className="smetic-nav-link active">HOME</a></li>
                <li className="smetic-nav-item">
                  <a href="#shop" className="smetic-nav-link">
                    <span className="smetic-badge-hot">HOT</span>
                    SHOP
                  </a>
                </li>
                <li><a href="#featured" className="smetic-nav-link">FEATURED</a></li>
                <li><a href="#blogs" className="smetic-nav-link">BLOGS</a></li>
                <li><a href="#page" className="smetic-nav-link">PAGE</a></li>
              </ul>
            </nav>

            {/* Actions */}
            <div className="smetic-header-actions">
              <button
                className="smetic-icon-btn"
                onClick={() => setIsSearchOpen(true)}
                title="Search"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
              </button>

              <button
                className="smetic-icon-btn"
                onClick={() => alert('Account login/signup')}
                title="Account"
              >
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>

              <button
                className="smetic-icon-btn"
                onClick={() => alert(`Saved items in wishlist: ${wishlist.length}`)}
                title="Wishlist"
              >
                <svg
                  width="20"
                  height="20"
                  fill={wishlist.length > 0 ? '#f99191' : 'none'}
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>

              <button
                className="smetic-icon-btn"
                onClick={() => setIsCartOpen(true)}
                title="Cart"
              >
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span className="smetic-cart-badge">{totalCartCount}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Hero Section Slider */}
      <section className="smetic-hero-section">
        <img src={currentSlide.image} alt={currentSlide.title} className="smetic-hero-bg" />
        <div className="smetic-container" style={{ width: '100%' }}>
          <div className="smetic-hero-content">
            <div className="smetic-hero-eyebrow">{currentSlide.eyebrow}</div>
            <h1 className="smetic-hero-title">{currentSlide.title}</h1>
            <p className="smetic-hero-desc">{currentSlide.description}</p>
            <button
              className="smetic-btn-coral"
              onClick={() => {
                document.getElementById('smetic-catalog')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {currentSlide.buttonText}
            </button>
          </div>
        </div>

        {/* Arrow Controls */}
        <button
          className="smetic-hero-arrow prev"
          onClick={() => setActiveSlide((prev) => (prev === 0 ? SMETIC_HERO_SLIDES.length - 1 : prev - 1))}
        >
          ‹
        </button>
        <button
          className="smetic-hero-arrow next"
          onClick={() => setActiveSlide((prev) => (prev + 1) % SMETIC_HERO_SLIDES.length)}
        >
          ›
        </button>
      </section>

      {/* 3. 4 Trust Badges Strip */}
      <section className="smetic-trust-section">
        <div className="smetic-container">
          <div className="smetic-trust-grid">
            {SMETIC_TRUST_ITEMS.map((item) => (
              <div key={item.id} className="smetic-trust-item">
                <span className="smetic-trust-icon">{item.icon}</span>
                <div>
                  <div className="smetic-trust-title">{item.title}</div>
                  <div className="smetic-trust-sub">{item.subtitle}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Section: Best Seller Grid (8 items) */}
      <section className="smetic-products-section" id="smetic-catalog">
        <div className="smetic-container">
          <div className="smetic-section-title">
            <h2>Best Seller</h2>
            <p>Best Seller / Trending Collection</p>
          </div>

          <div className="smetic-products-grid">
            {SMETIC_PRODUCTS.map((prod) => (
              <div
                key={prod.id}
                className="smetic-product-card"
                onClick={() => setQuickViewProduct(prod)}
                style={{ cursor: 'pointer' }}
              >
                <div className="smetic-card-thumb">
                  <img src={prod.image} alt={prod.name} className="smetic-product-img" />
                  {prod.discountBadge && (
                    <span className="smetic-badge-corner">{prod.discountBadge}</span>
                  )}
                  <button
                    style={{
                      position: 'absolute',
                      top: '10px',
                      left: '10px',
                      background: '#ffffff',
                      border: '1px solid #eee',
                      color: wishlist.includes(prod.id) ? '#f99191' : '#999',
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                    }}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist(prod.id)
                    }}
                    title="Wishlist"
                  >
                    ♥
                  </button>
                </div>

                <div className="smetic-card-body">
                  <div className="smetic-card-title">{prod.name}</div>
                  <div className="smetic-prices-row">
                    <span className="smetic-price">${prod.price.toFixed(2)}</span>
                    {prod.originalPrice && (
                      <span className="smetic-orig-price">${prod.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  {prod.swatches && (
                    <div className="smetic-swatches-row">
                      {prod.swatches.map((color, idx) => (
                        <span key={idx} className="smetic-swatch-dot" style={{ backgroundColor: color }} />
                      ))}
                    </div>
                  )}
                  <button
                    className="smetic-btn-coral"
                    style={{ marginTop: '12px', padding: '8px 16px', fontSize: '11px', width: '100%', justifyContent: 'center' }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(prod)
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 3 Middle Promo Cards */}
      <section className="smetic-promos-section">
        <div className="smetic-container">
          <div className="smetic-promos-grid">
            {SMETIC_PROMO_CARDS.map((card) => (
              <div
                key={card.id}
                className="smetic-promo-card"
                onClick={() => {
                  document.getElementById('smetic-catalog')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <div className="smetic-promo-img-wrap">
                  <img src={card.image} alt={card.title} className="smetic-promo-img" />
                </div>
                <h3 className="smetic-promo-title">{card.title}</h3>
                <p className="smetic-promo-sub">{card.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Our Best Seller with Filter Tabs */}
      <section className="smetic-products-section">
        <div className="smetic-container">
          <div className="smetic-section-title">
            <h2>Our Best Seller</h2>
          </div>

          <div className="smetic-tabs-row">
            <button
              className={`smetic-tab-btn ${activeTab === 'new-arrivals' ? 'active' : ''}`}
              onClick={() => setActiveTab('new-arrivals')}
            >
              NEW ARRIVAL
            </button>
            <button
              className={`smetic-tab-btn ${activeTab === 'best-sellers' ? 'active' : ''}`}
              onClick={() => setActiveTab('best-sellers')}
            >
              BEST SELLERS
            </button>
            <button
              className={`smetic-tab-btn ${activeTab === 'top-rates' ? 'active' : ''}`}
              onClick={() => setActiveTab('top-rates')}
            >
              TOP RATES
            </button>
          </div>

          <div className="smetic-products-grid">
            {filteredProducts.map((prod) => (
              <div
                key={prod.id}
                className="smetic-product-card"
                onClick={() => setQuickViewProduct(prod)}
                style={{ cursor: 'pointer' }}
              >
                <div className="smetic-card-thumb">
                  <img src={prod.image} alt={prod.name} className="smetic-product-img" />
                  {prod.discountBadge && (
                    <span className="smetic-badge-corner">{prod.discountBadge}</span>
                  )}
                </div>

                <div className="smetic-card-body">
                  <div className="smetic-card-title">{prod.name}</div>
                  <div className="smetic-prices-row">
                    <span className="smetic-price">${prod.price.toFixed(2)}</span>
                    {prod.originalPrice && (
                      <span className="smetic-orig-price">${prod.originalPrice.toFixed(2)}</span>
                    )}
                  </div>
                  <button
                    className="smetic-btn-coral"
                    style={{ marginTop: 'auto', padding: '8px 16px', fontSize: '11px', width: '100%', justifyContent: 'center' }}
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(prod)
                    }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Middle Wide Banner */}
      <section className="smetic-wide-banner">
        <img src={SMETIC_WIDE_BANNER.image} alt="Buyer Protection" className="smetic-wide-bg" />
        <div className="smetic-wide-content">
          <h2 style={{ fontFamily: 'DM Serif Display, serif', fontSize: '32px', marginBottom: '24px' }}>
            {SMETIC_WIDE_BANNER.heading}
          </h2>
          <button
            className="smetic-btn-coral"
            onClick={() => {
              document.getElementById('smetic-catalog')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {SMETIC_WIDE_BANNER.buttonText}
          </button>
        </div>
      </section>

      {/* 8. 3-Column Mini Showcase Strip */}
      <section className="smetic-mini-section">
        <div className="smetic-container">
          <div className="smetic-mini-grid">
            {/* Col 1 */}
            <div>
              <h3 className="smetic-mini-col-title">NEW ARRIVALS</h3>
              {SMETIC_PRODUCTS.slice(0, 3).map((prod) => (
                <div key={prod.id} className="smetic-mini-item" onClick={() => setQuickViewProduct(prod)}>
                  <img src={prod.image} alt={prod.name} className="smetic-mini-thumb" />
                  <div className="smetic-mini-info">
                    <h4>{prod.name}</h4>
                    <div style={{ color: '#f99191', fontWeight: 700, fontSize: '13px' }}>
                      ${prod.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Col 2 */}
            <div>
              <h3 className="smetic-mini-col-title">BEST SELLERS</h3>
              {SMETIC_PRODUCTS.slice(3, 6).map((prod) => (
                <div key={prod.id} className="smetic-mini-item" onClick={() => setQuickViewProduct(prod)}>
                  <img src={prod.image} alt={prod.name} className="smetic-mini-thumb" />
                  <div className="smetic-mini-info">
                    <h4>{prod.name}</h4>
                    <div style={{ color: '#f99191', fontWeight: 700, fontSize: '13px' }}>
                      ${prod.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Col 3 */}
            <div>
              <h3 className="smetic-mini-col-title">TOP RATES</h3>
              {SMETIC_PRODUCTS.slice(5, 8).map((prod) => (
                <div key={prod.id} className="smetic-mini-item" onClick={() => setQuickViewProduct(prod)}>
                  <img src={prod.image} alt={prod.name} className="smetic-mini-thumb" />
                  <div className="smetic-mini-info">
                    <h4>{prod.name}</h4>
                    <div style={{ color: '#f99191', fontWeight: 700, fontSize: '13px' }}>
                      ${prod.price.toFixed(2)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 9. Footer */}
      <footer className="smetic-footer">
        <div className="smetic-container">
          <div className="smetic-footer-grid">
            {/* Col 1 */}
            <div>
              <h4 className="smetic-footer-h4">Shop</h4>
              <ul className="smetic-footer-links">
                <li><a href="#about" className="smetic-footer-link">About Us</a></li>
                <li><a href="#privacy" className="smetic-footer-link">Privacy Policy</a></li>
                <li><a href="#terms" className="smetic-footer-link">Terms & Condition</a></li>
                <li><a href="#products" className="smetic-footer-link">Products Return</a></li>
              </ul>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="smetic-footer-h4">Information</h4>
              <ul className="smetic-footer-links">
                <li><a href="#faq" className="smetic-footer-link">Typography</a></li>
                <li><a href="#gallery" className="smetic-footer-link">Gallery Page</a></li>
                <li><a href="#contact" className="smetic-footer-link">Contact Us</a></li>
                <li><a href="#instructions" className="smetic-footer-link">Instructions</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="smetic-footer-h4">About</h4>
              <ul className="smetic-footer-links">
                <li><a href="#press" className="smetic-footer-link">Press Center</a></li>
                <li><a href="#store" className="smetic-footer-link">Our Store</a></li>
                <li><a href="#security" className="smetic-footer-link">Security Policy</a></li>
                <li><a href="#shipping" className="smetic-footer-link">Shipping & Delivery</a></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="smetic-footer-h4">Follow Us</h4>
              <div style={{ fontSize: '13px', color: '#777', lineHeight: 1.8 }}>
                📞 +1 123 456 789<br />
                ✉️ info@smetic-store.com<br />
                📍 7121 Broadway New York
              </div>
            </div>

            {/* Col 5 */}
            <div>
              <h4 className="smetic-footer-h4">Newsletter</h4>
              <p style={{ fontSize: '12px', color: '#777' }}>
                Be the first may know about our promotions.
              </p>
              <div className="smetic-nl-input-row">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="smetic-nl-input"
                />
                <button
                  className="smetic-nl-btn"
                  onClick={() => alert('Subscribed to Smetic beauty newsletter!')}
                >
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>

          <div className="smetic-footer-bottom">
            <img src={SMETIC_LOGO} alt="Smetic" style={{ height: '32px' }} />
            <div>© Copyright 2026 | Smetic Store Demo. Powered by Shopify.</div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="smetic-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="smetic-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="smetic-drawer-header">
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700 }}>
                Shopping Cart ({totalCartCount})
              </h3>
              <button
                style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#888' }}
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="smetic-drawer-body">
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
                  Your cart is empty
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
                      borderBottom: '1px solid #f0f0f0',
                    }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: '60px', height: '60px', borderRadius: '4px', objectFit: 'cover' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 600, fontSize: '14px' }}>{item.product.name}</div>
                      <div style={{ color: '#f99191', fontWeight: 700, fontSize: '14px', margin: '4px 0' }}>
                        ${item.product.price.toFixed(2)}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          style={{
                            width: '22px',
                            height: '22px',
                            border: '1px solid #ddd',
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
                            border: '1px solid #ddd',
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
              <div className="smetic-drawer-footer">
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: 700 }}>
                  <span>Subtotal</span>
                  <span style={{ color: '#f99191' }}>${cartSubtotal.toFixed(2)}</span>
                </div>
                <button
                  className="smetic-btn-coral"
                  style={{ width: '100%', marginTop: '16px', justifyContent: 'center' }}
                  onClick={() => alert(`Checking out: $${cartSubtotal.toFixed(2)}`)}
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
        <div className="smetic-drawer-overlay" onClick={() => setQuickViewProduct(null)}>
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
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
                style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'cover', borderRadius: '6px' }}
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ fontSize: '20px', fontWeight: 700, margin: '0 0 8px' }}>
                {quickViewProduct.name}
              </h2>
              <div style={{ color: '#f59e0b', fontSize: '12px', marginBottom: '12px' }}>
                {'★'.repeat(Math.round(quickViewProduct.rating))} ({quickViewProduct.reviewCount} reviews)
              </div>
              <div style={{ fontSize: '20px', fontWeight: 700, color: '#f99191', marginBottom: '12px' }}>
                ${quickViewProduct.price.toFixed(2)}
              </div>
              <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#666', marginBottom: '20px' }}>
                {quickViewProduct.description}
              </p>
              <button
                className="smetic-btn-coral"
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

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="smetic-drawer-overlay" onClick={() => setIsSearchOpen(false)}>
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              maxWidth: '550px',
              width: '100%',
              margin: 'auto',
              padding: '24px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Start typing and hit Enter</h3>
              <button
                style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer' }}
                onClick={() => setIsSearchOpen(false)}
              >
                ✕
              </button>
            </div>
            <input
              type="text"
              autoFocus
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 14px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '14px',
                outline: 'none',
                boxSizing: 'border-box',
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}
export default SmeticStorefront

