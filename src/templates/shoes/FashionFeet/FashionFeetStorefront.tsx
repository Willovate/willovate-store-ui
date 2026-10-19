import React, { useState, useEffect } from 'react'
import type {
  FashionFeetProduct,
  FashionFeetCartItem,
  FashionFeetStorefrontProps,
} from './types'
import {
  FASHIONFEET_HERO_SLIDES,
  FASHIONFEET_BEST_SALE_PRODUCTS,
  FASHIONFEET_LOAFER_BANNER,
  FASHIONFEET_ABOUT_US,
  FASHIONFEET_BRANDS,
  FASHIONFEET_REVIEWS,
  FASHIONFEET_BLOGS,
} from './data/fashionFeetData'
import './styles/fashionFeet.css'

export const FashionFeetStorefront: React.FC<FashionFeetStorefrontProps> = ({
  template: _template,
  device = 'desktop',
  customAccentColor,
  onUseTemplate,
  onClose,
}) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [cart, setCart] = useState<FashionFeetCartItem[]>([
    {
      product: FASHIONFEET_BEST_SALE_PRODUCTS[0],
      quantity: 1,
      selectedSize: 9,
    },
  ])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<FashionFeetProduct | null>(null)
  const [selectedSize, setSelectedSize] = useState<number>(9)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')

  const activeColor = customAccentColor || '#3d5afe'

  // Auto-slide hero
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % FASHIONFEET_HERO_SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleAddToCart = (product: FashionFeetProduct, size = 9) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedSize === size
      )
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1, selectedSize: size }]
    })
    showToast(`Added ${product.name} to cart!`)
    setIsCartOpen(true)
  }

  const handleUpdateQuantity = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev]
      const nextQty = updated[index].quantity + delta
      if (nextQty <= 0) {
        updated.splice(index, 1)
      } else {
        updated[index].quantity = nextQty
      }
      return updated
    })
  }

  const toggleWishlist = (id: string, name: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(id)
      if (exists) {
        showToast(`Removed ${name} from wishlist`)
        return prev.filter((item) => item !== id)
      } else {
        showToast(`Added ${name} to wishlist!`)
        return [...prev, id]
      }
    })
  }

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartSubtotal = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )

  const slide = FASHIONFEET_HERO_SLIDES[currentSlide]

  return (
    <div
      className={`ff-root ${device !== 'desktop' ? `ff-device-${device}` : ''}`}
      style={{ '--ff-primary': activeColor } as React.CSSProperties}
    >
      {/* Optional Template Top Bar */}
      {onUseTemplate && (
        <div
          style={{
            background: '#1e293b',
            color: '#ffffff',
            padding: '8px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '13px',
            zIndex: 100,
            position: 'relative',
          }}
        >
          <span>
            Previewing <strong>FashionFeet Men&apos;s Shoe Store</strong>
          </span>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={onUseTemplate}
              style={{
                background: activeColor,
                color: '#fff',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '4px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Use This Template
            </button>
            {onClose && (
              <button
                onClick={onClose}
                style={{
                  background: 'transparent',
                  color: '#94a3b8',
                  border: '1px solid #475569',
                  padding: '6px 12px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Close Preview
              </button>
            )}
          </div>
        </div>
      )}

      {/* Top Notification Bar */}
      <div className="ff-topbar">
        <div className="ff-topbar-inner">
          <span>⚡ Free worldwide express courier on all footwear orders over $120</span>
          <div className="ff-topbar-links">
            <a href="#track">Track Order</a>
            <a href="#help">Help Center</a>
            <a href="#stores">Stores</a>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="ff-header">
        <div className="ff-header-inner">
          <nav className="ff-nav-left">
            <a href="#home" className="ff-nav-link active">
              HOME
            </a>
            <a href="#shop" className="ff-nav-link">
              SHOP ▾
            </a>
            <a href="#pages" className="ff-nav-link">
              PAGES ▾
            </a>
            <a href="#products" className="ff-nav-link">
              PRODUCTS
            </a>
          </nav>

          <a href="#home" className="ff-brand-logo">
            <div className="ff-logo-stripes">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <span className="ff-logo-text">Mens Shoe</span>
          </a>

          <div className="ff-nav-right">
            <a href="#faq" className="ff-nav-link">
              FAQ
            </a>
            <a href="#blog" className="ff-nav-link">
              BLOG
            </a>
            <a href="#contact" className="ff-nav-link">
              CONTACT
            </a>
            <button
              className="ff-action-btn"
              title="Search footwear"
              onClick={() => showToast('Search drawer opened')}
            >
              🔍
            </button>
            <button
              className="ff-action-btn"
              title="View shopping cart"
              onClick={() => setIsCartOpen(true)}
            >
              🛒
              {totalCartCount > 0 && (
                <span className="ff-cart-badge">{totalCartCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Hero Slider */}
      <section className="ff-hero">
        <button
          className="ff-slider-nav-btn ff-slider-prev"
          onClick={() =>
            setCurrentSlide(
              (prev) =>
                (prev - 1 + FASHIONFEET_HERO_SLIDES.length) %
                FASHIONFEET_HERO_SLIDES.length
            )
          }
          aria-label="Previous slide"
        >
          ‹
        </button>

        <div className="ff-hero-container">
          <div className="ff-hero-content">
            <h1 className="ff-hero-title">{slide.title}</h1>
            <div className="ff-hero-accent-stripes">
              <span></span>
              <span></span>
              <span></span>
              <div className="ff-line"></div>
            </div>
            <p className="ff-hero-subtitle">{slide.subtitle}</p>
            <button
              className="ff-hero-btn"
              onClick={() => {
                const target = FASHIONFEET_BEST_SALE_PRODUCTS[0]
                handleAddToCart(target)
              }}
            >
              <span>{slide.buttonText}</span>
              <span className="ff-arrow-chevron"></span>
            </button>
          </div>

          <div className="ff-hero-visual">
            <img src={slide.image} alt={slide.title} />
          </div>
        </div>

        <div className="ff-hero-decor-bars">
          <span></span>
          <span></span>
          <span></span>
        </div>

        <button
          className="ff-slider-nav-btn ff-slider-next"
          onClick={() =>
            setCurrentSlide((prev) => (prev + 1) % FASHIONFEET_HERO_SLIDES.length)
          }
          aria-label="Next slide"
        >
          ›
        </button>
      </section>

      {/* Section 2: Best Sale Men's Collection */}
      <section className="ff-section-bestsale" id="shop">
        <div className="ff-bestsale-container">
          <div className="ff-bestsale-feature-box">
            <div>
              <h3>Best Sale Men&apos;s Collection</h3>
              <p>
                Crafted for everyday stamina, lightweight agility, and supreme foot
                contour ergonomics. Discover our trending silhouettes at limited-edition
                savings.
              </p>
            </div>
            <button
              className="ff-bestsale-cta-btn"
              onClick={() => showToast('Exploring all best sales!')}
            >
              <span>SHOP NOW</span>
              <span>→</span>
            </button>
          </div>

          <div className="ff-products-grid">
            {FASHIONFEET_BEST_SALE_PRODUCTS.map((product) => {
              const isWishlisted = wishlist.includes(product.id)
              return (
                <div key={product.id} className="ff-product-card">
                  <div className="ff-card-thumb">
                    <img src={product.image} alt={product.name} />
                    {product.badge && (
                      <span className={`ff-badge ff-badge-${product.badge.toLowerCase()}`}>
                        {product.badge}
                      </span>
                    )}
                    <div className="ff-card-actions">
                      <button
                        className="ff-action-icon-btn"
                        title="Wishlist"
                        style={{ color: isWishlisted ? '#ef4444' : undefined }}
                        onClick={() => toggleWishlist(product.id, product.name)}
                      >
                        ♥
                      </button>
                      <button
                        className="ff-action-icon-btn"
                        title="Quick View"
                        onClick={() => {
                          setQuickViewProduct(product)
                          setSelectedSize(9)
                        }}
                      >
                        👁
                      </button>
                    </div>
                  </div>

                  <div className="ff-card-body">
                    <span className="ff-card-category">{product.category}</span>
                    <h4 className="ff-card-title">{product.name}</h4>
                    <div className="ff-card-price-row">
                      <span className="ff-price">${product.price.toFixed(2)}</span>
                      {product.originalPrice && (
                        <span className="ff-original-price">
                          ${product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                    <button
                      className="ff-card-add-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      ADD TO CART
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section 3: Loafer Shoe & About Us Split Showcase */}
      <section className="ff-showcase-section">
        <div className="ff-showcase-grid">
          <div className="ff-showcase-card">
            <div className="ff-showcase-content">
              <h3>{FASHIONFEET_LOAFER_BANNER.title}</h3>
              <div className="ff-showcase-accent"></div>
              <p>{FASHIONFEET_LOAFER_BANNER.description}</p>
              <button
                className="ff-showcase-btn"
                onClick={() => showToast('Opening Loafer Shoe Collection')}
              >
                <span>{FASHIONFEET_LOAFER_BANNER.buttonText}</span>
                <span>→</span>
              </button>
            </div>
            <img
              src={FASHIONFEET_LOAFER_BANNER.image}
              alt={FASHIONFEET_LOAFER_BANNER.title}
              className="ff-showcase-img"
            />
          </div>

          <div className="ff-showcase-card">
            <div className="ff-showcase-content">
              <h3>{FASHIONFEET_ABOUT_US.title}</h3>
              <div className="ff-showcase-accent"></div>
              <p>{FASHIONFEET_ABOUT_US.paragraph}</p>
              <button
                className="ff-showcase-btn"
                onClick={() => showToast('Opening About Mens Shoe')}
              >
                <span>{FASHIONFEET_ABOUT_US.buttonText}</span>
                <span>→</span>
              </button>
            </div>
            <img
              src={FASHIONFEET_ABOUT_US.image}
              alt={FASHIONFEET_ABOUT_US.title}
              className="ff-showcase-img"
            />
          </div>
        </div>
      </section>

      {/* Section 4: Brands Strip */}
      <section className="ff-brands-section">
        <div className="ff-brands-container">
          <span className="ff-brands-title">Brands</span>
          {FASHIONFEET_BRANDS.map((brand) => (
            <div
              key={brand.name}
              className="ff-brand-item"
              onClick={() => showToast(`Filtering by ${brand.name}`)}
            >
              <span>{brand.icon}</span>
              <span>{brand.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Section 5: Customer Reviews */}
      <section className="ff-reviews-section">
        <div className="ff-reviews-container">
          <h2 className="ff-section-heading">Customer Reviews</h2>
          <div className="ff-review-card">
            <div className="ff-quote-mark">“</div>
            <p className="ff-review-quote">{FASHIONFEET_REVIEWS[0].quote}</p>
            <div className="ff-review-author">
              <img
                src={FASHIONFEET_REVIEWS[0].avatar}
                alt={FASHIONFEET_REVIEWS[0].name}
                className="ff-review-avatar"
              />
              <div className="ff-review-author-info">
                <div className="ff-review-author-name">
                  {FASHIONFEET_REVIEWS[0].name}
                </div>
                <div className="ff-review-author-loc">
                  {FASHIONFEET_REVIEWS[0].location} • Verified Buyer
                </div>
                <div className="ff-review-stars">★★★★★</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Blogs */}
      <section className="ff-blog-section" id="blog">
        <div className="ff-blog-container">
          <div className="ff-blog-feature-box">
            <div>
              <h3>Blog</h3>
              <p style={{ marginTop: '16px', opacity: 0.9, lineHeight: 1.6 }}>
                Footwear maintenance tips, arch ergonomics, and style guides curated by
                our master cordwainers.
              </p>
            </div>
            <button
              className="ff-bestsale-cta-btn"
              onClick={() => showToast('Opening Footwear Editorial Blog')}
            >
              <span>VIEW ALL</span>
              <span>→</span>
            </button>
          </div>

          {FASHIONFEET_BLOGS.map((blog) => (
            <div key={blog.id} className="ff-blog-card">
              <img src={blog.image} alt={blog.title} className="ff-blog-thumb" />
              <div className="ff-blog-body">
                <span className="ff-blog-meta">
                  {blog.category} • {blog.date}
                </span>
                <h4 className="ff-blog-title">{blog.title}</h4>
                <p className="ff-blog-excerpt">{blog.excerpt}</p>
                <a
                  href="#read"
                  className="ff-blog-btn"
                  onClick={(e) => {
                    e.preventDefault()
                    showToast(`Reading ${blog.title}`)
                  }}
                >
                  <span>READ ARTICLE</span>
                  <span>→</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 7: Newsletter Callout */}
      <section className="ff-newsletter-banner">
        <div className="ff-newsletter-inner">
          <div className="ff-newsletter-text">
            <h4>Get our latest discount & product drops</h4>
            <p>Subscribe to unlock 15% off your first sneaker order.</p>
          </div>
          <form
            className="ff-newsletter-form"
            onSubmit={(e) => {
              e.preventDefault()
              if (newsletterEmail) {
                showToast(`Subscribed ${newsletterEmail}! Check your inbox.`)
                setNewsletterEmail('')
              }
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="ff-newsletter-input"
              required
            />
            <button type="submit" className="ff-newsletter-submit" title="Subscribe">
              ✈
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="ff-footer">
        <div className="ff-footer-grid">
          <div className="ff-footer-col">
            <div
              className="ff-brand-logo"
              style={{ alignItems: 'flex-start', marginBottom: '16px' }}
            >
              <div className="ff-logo-stripes">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="ff-logo-text">Mens Shoe</span>
            </div>
            <p
              style={{
                fontSize: '13px',
                color: 'var(--ff-muted)',
                lineHeight: '1.6',
                maxWidth: '300px',
              }}
            >
              Supreme comfort engineering for running, gym agility, and formal poise.
              Designed with anatomical precision and timeless craftsmanship.
            </p>
          </div>

          <div className="ff-footer-col">
            <h5>Quick Links</h5>
            <ul>
              <li>
                <a href="#home">Home</a>
              </li>
              <li>
                <a href="#shop">Collection</a>
              </li>
              <li>
                <a href="#loafers">Loafers</a>
              </li>
              <li>
                <a href="#about">About Us</a>
              </li>
            </ul>
          </div>

          <div className="ff-footer-col">
            <h5>Customer Care</h5>
            <ul>
              <li>
                <a href="#track">Track Order</a>
              </li>
              <li>
                <a href="#returns">Returns & Exchange</a>
              </li>
              <li>
                <a href="#shipping">Shipping Policy</a>
              </li>
              <li>
                <a href="#faq">FAQs</a>
              </li>
            </ul>
          </div>

          <div className="ff-footer-col">
            <h5>Contact</h5>
            <p style={{ fontSize: '13px', color: 'var(--ff-muted)', lineHeight: '1.7' }}>
              📍 542 Footwear Plaza, Chicago, IL
              <br />
              📞 +1 (800) 456-7890
              <br />
              ✉️ support@mensshoe.com
            </p>
          </div>
        </div>

        <div className="ff-subfooter">
          <span>© 2026 FashionFeet Mens Shoe. All rights reserved.</span>
          <div className="ff-social-links">
            <a href="#facebook" title="Facebook">
              f
            </a>
            <a href="#twitter" title="Twitter">
              𝕏
            </a>
            <a href="#instagram" title="Instagram">
              📷
            </a>
          </div>
        </div>
      </footer>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="ff-modal-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="ff-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="ff-modal-close"
              onClick={() => setQuickViewProduct(null)}
            >
              ✕
            </button>
            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.name}
              className="ff-modal-img"
            />
            <div className="ff-modal-info">
              <span className="ff-card-category">{quickViewProduct.category}</span>
              <h3 style={{ margin: '0 0 12px 0', fontSize: '20px', fontWeight: 800 }}>
                {quickViewProduct.name}
              </h3>
              <div className="ff-card-price-row" style={{ marginBottom: '16px' }}>
                <span className="ff-price" style={{ fontSize: '22px' }}>
                  ${quickViewProduct.price.toFixed(2)}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="ff-original-price">
                    ${quickViewProduct.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              <p
                style={{
                  fontSize: '13px',
                  color: 'var(--ff-muted)',
                  lineHeight: '1.6',
                  margin: '0 0 16px 0',
                }}
              >
                {quickViewProduct.description}
              </p>

              <div>
                <label style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase' }}>
                  Select Size (US):
                </label>
                <div className="ff-size-pills">
                  {(quickViewProduct.sizes || [7, 8, 9, 10, 11]).map((sz) => (
                    <button
                      key={sz}
                      className={`ff-size-pill ${selectedSize === sz ? 'active' : ''}`}
                      onClick={() => setSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <button
                className="ff-card-add-btn"
                style={{ marginTop: 'auto', padding: '14px 0' }}
                onClick={() => {
                  handleAddToCart(quickViewProduct, selectedSize)
                  setQuickViewProduct(null)
                }}
              >
                ADD TO CART • ${quickViewProduct.price.toFixed(2)}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="ff-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="ff-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="ff-drawer-header">
              <h3>Shopping Bag ({totalCartCount})</h3>
              <button
                className="ff-drawer-close"
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="ff-drawer-body">
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--ff-muted)' }}>
                  <p>Your shopping bag is empty.</p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="ff-drawer-item">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="ff-drawer-item-img"
                    />
                    <div className="ff-drawer-item-info">
                      <h4 className="ff-drawer-item-title">{item.product.name}</h4>
                      {item.selectedSize && (
                        <div style={{ fontSize: '12px', color: 'var(--ff-muted)', marginBottom: '4px' }}>
                          Size: US {item.selectedSize}
                        </div>
                      )}
                      <div className="ff-drawer-item-price">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '8px' }}>
                        <button
                          style={{
                            width: '24px',
                            height: '24px',
                            border: '1px solid var(--ff-border)',
                            background: '#fff',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleUpdateQuantity(idx, -1)}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>{item.quantity}</span>
                        <button
                          style={{
                            width: '24px',
                            height: '24px',
                            border: '1px solid var(--ff-border)',
                            background: '#fff',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleUpdateQuantity(idx, 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="ff-drawer-footer">
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: 800,
                    fontSize: '16px',
                    marginBottom: '16px',
                  }}
                >
                  <span>Subtotal</span>
                  <span style={{ color: 'var(--ff-primary)' }}>
                    ${cartSubtotal.toFixed(2)}
                  </span>
                </div>
                <button
                  className="ff-checkout-btn"
                  onClick={() => showToast('Proceeding to checkout!')}
                >
                  Checkout Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Floating Toast Notification */}
      {toastMessage && <div className="ff-toast">{toastMessage}</div>}
    </div>
  )
}
export default FashionFeetStorefront
