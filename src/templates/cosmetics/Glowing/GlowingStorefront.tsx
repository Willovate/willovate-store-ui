import React, { useState } from 'react'
import type {
  GlowingProduct,
  GlowingCartItem,
  GlowingStorefrontProps,
} from './types'
import {
  GLOWING_LOGO,
  GLOWING_WATERMARK_LOGO,
  GLOWING_HERO_SLIDES,
  GLOWING_FEATURED_PRODUCTS,
  GLOWING_FAVORITE_PRODUCTS,
  GLOWING_PRESS_QUOTES,
  GLOWING_VALUE_PROPS,
} from './data/glowingData'
import './styles/glowing.css'

export const GlowingStorefront: React.FC<GlowingStorefrontProps> = ({
  template: _template,
  device = 'desktop',
  deviceView,
  customAccentColor,
  onColorChange: _onColorChange,
  onUseTemplate,
  onClose: _onClose,
  onBack: _onBack,
}) => {
  const effectiveDevice = deviceView || device || 'desktop'

  // State
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'All Products' | 'Best Seller' | 'New Arrival' | 'On Sale'>('All Products')
  const [cartItems, setCartItems] = useState<GlowingCartItem[]>([
    {
      product: GLOWING_FEATURED_PRODUCTS[0],
      quantity: 1,
    },
  ])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<GlowingProduct | null>(null)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId)
      if (exists) {
        showToast('Removed from your favorites')
        return prev.filter((id) => id !== productId)
      } else {
        showToast('Added to your favorites ⭐')
        return [...prev, productId]
      }
    })
  }

  const handleAddToCart = (product: GlowingProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    showToast(`Added "${product.name}" to cart!`)
    setIsCartOpen(true)
  }

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter((item): item is GlowingCartItem => item !== null)
    )
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    showToast('Welcome to Glowing! Use code GLOW10 for 10% off.')
    setNewsletterEmail('')
  }

  const filteredFeaturedProducts = GLOWING_FEATURED_PRODUCTS.filter((prod) => {
    if (activeTab === 'All Products') return true
    if (activeTab === 'Best Seller') return prod.rating >= 4.9 || prod.badge === 'Hot'
    if (activeTab === 'New Arrival') return prod.badge === 'New' || prod.badge === 'Hot'
    if (activeTab === 'On Sale') return prod.badge === 'Sale' || !!prod.originalPrice
    return true
  })

  const cartTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const heroSlide = GLOWING_HERO_SLIDES[currentHeroIndex]

  const wrapperStyle = customAccentColor
    ? ({ '--glowing-primary': customAccentColor, '--glowing-accent': customAccentColor } as React.CSSProperties)
    : {}

  return (
    <div className={`glowing-wrapper device-${effectiveDevice}`} style={wrapperStyle}>
      {/* Announcement Bar */}
      <div className="glowing-announcement-bar">
        <div>
          Free shipping on all U.S. orders $50+{' '}
          <a href="#shipping" onClick={(e) => { e.preventDefault(); showToast('Free shipping details applied!') }}>
            Learn More
          </a>
        </div>
        <div className="glowing-announcement-right">
          <span>Need Help? +1 800 456-GLOW</span>
          <span>•</span>
          <span>USD ($)</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="glowing-header">
        <div className="glowing-container glowing-header-inner">
          <nav className="glowing-nav-left">
            <a href="#home" className="glowing-nav-link active">Home</a>
            <a href="#shop" className="glowing-nav-link" onClick={(e) => { e.preventDefault(); showToast('Browsing Clean Skincare Shop') }}>Shop</a>
            <a href="#pages" className="glowing-nav-link" onClick={(e) => { e.preventDefault(); showToast('Our Story & Philosophy') }}>Pages</a>
            <a href="#blog" className="glowing-nav-link" onClick={(e) => { e.preventDefault(); showToast('Wellness & Skin Journal') }}>Blog</a>
            <a href="#docs" className="glowing-nav-link" onClick={(e) => { e.preventDefault(); showToast('Botanical Ingredients Index') }}>Docs</a>
          </nav>

          <div className="glowing-logo-center">
            <a href="#home">
              <img src={GLOWING_LOGO} alt="GLOWING" className="glowing-logo-img" />
            </a>
          </div>

          <div className="glowing-actions-right">
            <button className="glowing-action-btn" title="Search" onClick={() => showToast('Search organic skincare...')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <button className="glowing-action-btn" title="Account" onClick={() => showToast('Sign In / Register')}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <button className="glowing-action-btn" title="Favorites" onClick={() => showToast(`Favorites: ${wishlist.length} item(s)`)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.length > 0 ? '#193833' : 'none'} stroke="currentColor" strokeWidth="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              {wishlist.length > 0 && <span className="glowing-badge">{wishlist.length}</span>}
            </button>
            <button className="glowing-action-btn" title="Shopping Bag" onClick={() => setIsCartOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="glowing-badge">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Slideshow */}
      <section
        className="glowing-hero"
        style={{ backgroundImage: `url(${heroSlide.image})` }}
      >
        <div className="glowing-container">
          <div className="glowing-hero-content">
            <span className="glowing-hero-eyebrow">{heroSlide.eyebrow}</span>
            <h1 className="glowing-hero-title">{heroSlide.title}</h1>
            <p className="glowing-hero-sub">{heroSlide.subtitle}</p>
            <button
              className="glowing-btn-dark"
              onClick={() => (onUseTemplate ? onUseTemplate('cosmetics-glowing') : showToast('Discovering Glowing Collection'))}
            >
              {heroSlide.buttonText}
            </button>
          </div>
        </div>

        {/* Hero Slider Dots */}
        <div className="glowing-hero-dots">
          {GLOWING_HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              className={`glowing-hero-dot ${currentHeroIndex === idx ? 'active' : ''}`}
              onClick={() => setCurrentHeroIndex(idx)}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="glowing-section">
        <div className="glowing-container">
          <div className="glowing-section-header">
            <h2 className="glowing-section-title">Our Featured Products</h2>
            <p className="glowing-section-sub">Get the skin you want to feel</p>
            <div className="glowing-tabs">
              {(['All Products', 'Best Seller', 'New Arrival', 'On Sale'] as const).map((tab) => (
                <button
                  key={tab}
                  className={`glowing-tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="glowing-products-grid">
            {filteredFeaturedProducts.map((prod) => {
              const isWish = wishlist.includes(prod.id)
              return (
                <div key={prod.id} className="glowing-product-card">
                  <div className="glowing-card-media">
                    <img src={prod.image} alt={prod.name} />
                    {prod.badge && <span className="glowing-badge-pill">{prod.badge}</span>}
                    <div className="glowing-card-actions">
                      <button
                        className={`glowing-quick-btn ${isWish ? 'active' : ''}`}
                        title="Add to Favorites"
                        onClick={() => toggleWishlist(prod.id)}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill={isWish ? '#ffffff' : 'none'} stroke="currentColor" strokeWidth="2">
                          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                      </button>
                      <button
                        className="glowing-quick-btn"
                        title="Quick View"
                        onClick={() => setQuickViewProduct(prod)}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="glowing-card-info">
                    <div className="glowing-card-rating">
                      {'★'.repeat(Math.floor(prod.rating))}
                      {'☆'.repeat(5 - Math.floor(prod.rating))}
                      <span>({prod.reviewCount})</span>
                    </div>
                    <h3 className="glowing-card-name">{prod.name}</h3>
                    {prod.subtitle && <p className="glowing-card-subtitle">{prod.subtitle}</p>}

                    <div className="glowing-card-bottom">
                      <div className="glowing-card-price">
                        <span className="glowing-price-curr">${prod.price.toFixed(2)}</span>
                        {prod.originalPrice && (
                          <span className="glowing-price-old">${prod.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      <button
                        className="glowing-card-add-btn"
                        onClick={() => handleAddToCart(prod)}
                      >
                        + Add
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Two Split Promo Banners */}
      <section className="glowing-promo-section">
        <div className="glowing-container">
          <div className="glowing-promo-grid">
            <div
              className="glowing-promo-card"
              style={{ backgroundImage: `url('https://glowing-theme.myshopify.com/cdn/shop/files/banner-01.jpg?v=1736504079')` }}
            >
              <div className="glowing-promo-inner">
                <span>NEW COLLECTION</span>
                <h3>Intensive Glow C+ Serum</h3>
                <button
                  className="glowing-promo-btn"
                  onClick={() => showToast('Opening Intensive Glow C+ Serum')}
                >
                  Explore More
                </button>
              </div>
            </div>

            <div
              className="glowing-promo-card"
              style={{ backgroundImage: `url('https://glowing-theme.myshopify.com/cdn/shop/files/banner-02.jpg?v=1736504079')` }}
            >
              <div className="glowing-promo-inner">
                <span>25% OFF EVERYTHING</span>
                <h3>Makeup with Extended Range</h3>
                <button
                  className="glowing-promo-btn"
                  onClick={() => showToast('Applied 25% Off Makeup')}
                >
                  Shop Sale
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Value Props Bar */}
      <section className="glowing-props-bar">
        <div className="glowing-container">
          <div className="glowing-props-grid">
            {GLOWING_VALUE_PROPS.map((prop, idx) => (
              <div key={idx} className="glowing-prop-item">
                <div className="glowing-prop-icon">{prop.icon}</div>
                <div>
                  <h4 className="glowing-prop-title">{prop.title}</h4>
                  <p className="glowing-prop-desc">{prop.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* As Seen In - Press Quotes */}
      <section className="glowing-press-section">
        <div className="glowing-container">
          <div className="glowing-press-label">AS SEEN IN</div>
          <div className="glowing-press-grid">
            {GLOWING_PRESS_QUOTES.map((item) => (
              <div key={item.id} className="glowing-quote-card">
                <p className="glowing-quote-text">“{item.quote}”</p>
                <div className="glowing-quote-author">— {item.source}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Customer Favorite Essentials (Banner on Left + 6 Products on Right) */}
      <section className="glowing-favorites-section">
        <div className="glowing-container">
          <div className="glowing-section-header">
            <h2 className="glowing-section-title">Customer favorite beauty essentials</h2>
            <p className="glowing-section-sub">Daily staples that deliver immediate hydration and healthy skin radiance.</p>
          </div>

          <div className="glowing-fav-split">
            <div
              className="glowing-fav-model-col"
              style={{ backgroundImage: `url('https://glowing-theme.myshopify.com/cdn/shop/files/banner-21.jpg?v=1736504096')` }}
            >
              <div className="glowing-fav-model-overlay">
                <div className="glowing-fav-model-sub">SPECIAL OFFER</div>
                <h3 className="glowing-fav-model-title">Empower Yourself</h3>
                <button
                  className="glowing-btn-dark"
                  onClick={() => showToast('Shopping Empower Yourself Routine')}
                >
                  Shop Now
                </button>
              </div>
            </div>

            <div className="glowing-fav-grid">
              {GLOWING_FAVORITE_PRODUCTS.map((prod) => (
                <div key={prod.id} className="glowing-fav-card">
                  <div className="glowing-fav-card-media">
                    <img src={prod.image} alt={prod.name} />
                  </div>
                  <div className="glowing-fav-card-info">
                    <h4 className="glowing-fav-name">{prod.name}</h4>
                    <div className="glowing-fav-price">${prod.price.toFixed(2)}</div>
                    <button
                      className="glowing-fav-btn"
                      onClick={() => handleAddToCart(prod)}
                    >
                      + Add To Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* More to Discover */}
      <section className="glowing-discover-section">
        <div className="glowing-container">
          <div className="glowing-discover-grid">
            <div
              className="glowing-discover-card"
              style={{ backgroundImage: `url('https://glowing-theme.myshopify.com/cdn/shop/files/image-box-01.jpg?v=1736504121')` }}
            >
              <div className="glowing-discover-inner">
                <span>FIND YOUR RECIPE</span>
                <h4>Summer Collection</h4>
                <span className="glowing-discover-link" onClick={() => showToast('Opening Summer Collection')}>
                  Shop Now →
                </span>
              </div>
            </div>

            <div
              className="glowing-discover-card"
              style={{ backgroundImage: `url('https://glowing-theme.myshopify.com/cdn/shop/files/image-box-02.jpg?v=1736504122')` }}
            >
              <div className="glowing-discover-inner">
                <span>BEST-SELLERS</span>
                <h4>From Our Blog</h4>
                <span className="glowing-discover-link" onClick={() => showToast('Reading Skin Blog Posts')}>
                  Explore More →
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Good Emails Newsletter */}
      <section className="glowing-newsletter-section">
        <div className="glowing-container">
          <div className="glowing-newsletter-box">
            <h3>Good emails.</h3>
            <p>Enter your email to receive a 10% discount on your first order.</p>
            <form className="glowing-newsletter-form" onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                className="glowing-newsletter-input"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button type="submit" className="glowing-newsletter-submit">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer with Watermark Logo */}
      <footer className="glowing-footer">
        <img src={GLOWING_WATERMARK_LOGO} alt="" className="glowing-footer-watermark-img" />
        <div className="glowing-container">
          <div className="glowing-footer-grid">
            <div className="glowing-footer-col">
              <h4>Company</h4>
              <ul className="glowing-footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#stores">Store Locator</a></li>
                <li><a href="#blog">Our Blog</a></li>
                <li><a href="#reviews">Reviews</a></li>
              </ul>
            </div>

            <div className="glowing-footer-col">
              <h4>Useful Links</h4>
              <ul className="glowing-footer-links">
                <li><a href="#new">New Products</a></li>
                <li><a href="#bestsellers">Best Sellers</a></li>
                <li><a href="#bundles">Bundle & Save</a></li>
                <li><a href="#giftcards">Online Gift Card</a></li>
              </ul>
            </div>

            <div className="glowing-footer-col">
              <h4>Information</h4>
              <ul className="glowing-footer-links">
                <li><a href="#returns">Start a Return</a></li>
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#faq">Shipping FAQ</a></li>
                <li><a href="#terms">Terms & Conditions</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
              </ul>
            </div>

            <div className="glowing-footer-col">
              <h4>Contact Us</h4>
              <p>
                1200 Broadway, 5th Floor<br />
                New York, NY 10001<br />
                concierge@glowing-beauty.com<br />
                +1 (800) 456-GLOW
              </p>
            </div>
          </div>

          <div className="glowing-footer-bottom">
            <div>© 2026 Glowing. All rights reserved.</div>
            <div>Privacy Policy • Terms of Service • Accessibility</div>
          </div>
        </div>
      </footer>

      {/* Bag Drawer */}
      {isCartOpen && (
        <div className="glowing-drawer-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="glowing-drawer" onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '20px 24px', borderBottom: '1px solid #e6e5df', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#193833' }}>Your Bag ({cartCount})</h3>
              <button style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer', color: '#666' }} onClick={() => setIsCartOpen(false)}>✕</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
              {cartItems.map((item) => (
                <div key={item.product.id} style={{ display: 'flex', gap: '14px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #eee' }}>
                  <img src={item.product.image} alt={item.product.name} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#193833' }}>{item.product.name}</h4>
                    <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>${item.product.price.toFixed(2)}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button style={{ width: '24px', height: '24px', border: '1px solid #ccc', background: '#fafafa', cursor: 'pointer' }} onClick={() => handleUpdateCartQty(item.product.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button style={{ width: '24px', height: '24px', border: '1px solid #ccc', background: '#fafafa', cursor: 'pointer' }} onClick={() => handleUpdateCartQty(item.product.id, 1)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: '20px 24px', borderTop: '1px solid #e6e5df', background: '#fcfcfc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '700', color: '#193833', marginBottom: '16px' }}>
                <span>Subtotal:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <button
                style={{ width: '100%', padding: '14px', background: '#193833', color: '#ffffff', border: 'none', borderRadius: '4px', fontSize: '14px', fontWeight: '700', cursor: 'pointer' }}
                onClick={() => {
                  showToast('Proceeding to Checkout...')
                  if (onUseTemplate) onUseTemplate('cosmetics-glowing')
                }}
              >
                Checkout • ${cartTotal.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="glowing-drawer-backdrop" onClick={() => setQuickViewProduct(null)}>
          <div
            style={{ background: '#fff', borderRadius: '8px', maxWidth: '700px', width: '90%', margin: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuickViewProduct(null)}
              style={{ position: 'absolute', top: '12px', right: '12px', background: '#fff', border: '1px solid #ccc', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', zIndex: 10 }}
            >
              ✕
            </button>
            <img src={quickViewProduct.image} alt={quickViewProduct.name} style={{ width: '100%', height: '100%', minHeight: '300px', objectFit: 'cover' }} />
            <div style={{ padding: '28px', display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '1px', color: '#777' }}>{quickViewProduct.category}</span>
              <h3 style={{ margin: '8px 0', fontSize: '20px', color: '#193833' }}>{quickViewProduct.name}</h3>
              <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#193833', marginBottom: '14px' }}>
                ${quickViewProduct.price.toFixed(2)}
              </div>
              <p style={{ fontSize: '13px', lineHeight: '1.6', color: '#666', marginBottom: '16px' }}>{quickViewProduct.description}</p>
              <button
                className="glowing-btn-dark"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  handleAddToCart(quickViewProduct)
                  setQuickViewProduct(null)
                }}
              >
                Add To Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && <div className="glowing-toast">{toastMessage}</div>}
    </div>
  )
}
