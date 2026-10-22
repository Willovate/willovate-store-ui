import React, { useState } from 'react'
import type {
  BeauxProduct,
  BeauxCartItem,
  BeauxStorefrontProps,
} from './types'
import {
  BEAUX_LOGO,
  BEAUX_HERO_SLIDES,
  BEAUX_COLLECTIONS_3GRID,
  BEAUX_WHATS_NEW_PRODUCTS,
  BEAUX_BLOCKBUSTER_PRODUCTS,
  BEAUX_BLOG_POSTS,
  BEAUX_INSTAGRAM_IMAGES,
} from './data/beauxData'
import {
  StorefrontSearchModal,
  StorefrontWishlistDrawer,
  StorefrontAccountModal,
  StorefrontMobileNavDrawer,
  type MobileNavItem,
} from '../../common/StorefrontModals'
import './styles/beaux.css'

export const BeauxStorefront: React.FC<BeauxStorefrontProps> = ({
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
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD')
  const [cartItems, setCartItems] = useState<BeauxCartItem[]>([
    {
      product: BEAUX_WHATS_NEW_PRODUCTS[0],
      quantity: 1,
    },
  ])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<BeauxProduct | null>(null)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')

  const navItems: MobileNavItem[] = [
    {
      label: 'Home',
      children: [
        { label: 'Featured Collections', onClick: () => { const el = document.getElementById('beaux-collections-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'New Arrivals', onClick: () => { const el = document.getElementById('beaux-whats-new-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Shop',
      children: [
        { label: 'All Products', onClick: () => { const el = document.getElementById('beaux-whats-new-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: "What's New", onClick: () => { const el = document.getElementById('beaux-whats-new-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Blockbuster Sellers', onClick: () => { const el = document.getElementById('beaux-blockbuster-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Beauty Deals', onClick: () => showToast('50% Off Beauty Deals applied!') },
      ],
    },
    {
      label: 'Blog',
      children: [
        { label: 'Skincare Secrets', onClick: () => { const el = document.getElementById('beaux-blog-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Pages',
      children: [
        { label: 'About Beaux', onClick: () => showToast('Beaux: Clean luxury botanical skincare.') },
        { label: 'Help & Contact', onClick: () => showToast('Customer Care: care@beauxbeauty.com') },
      ],
    },
  ]

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const formatPrice = (priceInUsd: number) => {
    if (currency === 'EUR') {
      return `€${(priceInUsd * 0.92).toFixed(2)}`
    }
    if (currency === 'GBP') {
      return `£${(priceInUsd * 0.79).toFixed(2)}`
    }
    return `$${priceInUsd.toFixed(2)}`
  }

  const handleNextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % BEAUX_HERO_SLIDES.length)
  }

  const handlePrevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + BEAUX_HERO_SLIDES.length) % BEAUX_HERO_SLIDES.length)
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId)
      if (exists) {
        showToast('Removed from your wishlist')
        return prev.filter((id) => id !== productId)
      } else {
        showToast('Added to your wishlist ❤️')
        return [...prev, productId]
      }
    })
  }

  const handleAddToCart = (product: BeauxProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    showToast(`Added "${product.name}" to your bag!`)
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
        .filter((item): item is BeauxCartItem => item !== null)
    )
  }

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail.trim()) return
    showToast('Thank you for signing up to the Beaux beauty fan club!')
    setNewsletterEmail('')
  }

  const cartTotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const currentHeroSlide = BEAUX_HERO_SLIDES[currentSlideIndex]

  const wrapperStyle = customAccentColor
    ? ({ '--beaux-primary': customAccentColor } as React.CSSProperties)
    : {}

  return (
    <div className={`beaux-wrapper device-${effectiveDevice}`} style={wrapperStyle}>
      {/* Top Announcement Bar */}
      <div className="beaux-announcement-bar">
        <span>
          25% off on all products enter code: <strong>cusbeaux</strong>
        </span>
      </div>

      {/* Main Header */}
      <header className="beaux-header-main">
        <div className="beaux-container beaux-header-inner">
          <div className="beaux-header-left">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="beaux-hamburger-btn"
              onClick={() => setIsMobileNavOpen(true)}
              title="Menu"
              aria-label="Open mobile menu"
            >
              ☰
            </button>
            <button className="beaux-icon-btn" title="Search" onClick={() => setIsSearchOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <select
              className="beaux-currency-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value as 'USD' | 'EUR' | 'GBP')}
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
            </select>
          </div>

          <div className="beaux-header-center">
            <a href="#home">
              <img src={BEAUX_LOGO} alt="Beaux Skincare" className="beaux-logo-img" />
            </a>
          </div>

          <div className="beaux-header-right">
            <button className="beaux-icon-btn" title="Account" onClick={() => setIsAccountOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <button className="beaux-icon-btn" title="Wishlist" onClick={() => setIsWishlistOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.length > 0 ? '#e87868' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlist.length > 0 && <span className="beaux-badge-count">{wishlist.length}</span>}
            </button>
            <button className="beaux-icon-btn" title="Shopping Bag" onClick={() => setIsCartOpen(true)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="beaux-badge-count">{cartCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className="beaux-navbar">
        <div className="beaux-container">
          <ul className="beaux-nav-menu">
            {navItems.map((item) => (
              <li key={item.label} className="beaux-nav-item wv-nav-dropdown-wrap">
                <span
                  className="beaux-nav-link"
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

      {/* Hero Slideshow */}
      <section className="beaux-hero-section">
        <button className="beaux-hero-nav-arrow prev" onClick={handlePrevSlide} aria-label="Previous Slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <button className="beaux-hero-nav-arrow next" onClick={handleNextSlide} aria-label="Next Slide">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        <div
          className="beaux-hero-slide-bg"
          style={{ backgroundImage: `url(${currentHeroSlide.modelImage})` }}
        >
          <div className="beaux-container">
            <div className="beaux-hero-slide-content">
              <span className="beaux-hero-eyebrow">{currentHeroSlide.eyebrow}</span>
              <h1 className="beaux-hero-title">{currentHeroSlide.title}</h1>
              <p className="beaux-hero-desc">{currentHeroSlide.description}</p>
              <button
                className="beaux-hero-btn"
                onClick={() => (onUseTemplate ? onUseTemplate('cosmetics-beaux') : showToast('Viewing Beaux Skincare Collection'))}
              >
                {currentHeroSlide.buttonText}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Rich Text: BEAUTY DEAL */}
      <div className="beaux-deal-banner">
        <div className="beaux-container">
          <h2 className="beaux-deal-title">BEAUTY DEAL</h2>
          <p className="beaux-deal-text">Pick your beauty products today. 50% OFF on the most popular cosmetic brands.</p>
        </div>
      </div>

      {/* Special Collections (3 Cards) */}
      <section className="beaux-special-col-section">
        <div className="beaux-container">
          <div className="beaux-section-head-center">
            <div className="beaux-sub-script">beauty forever</div>
            <h2 className="beaux-head-title">Special Colletions</h2>
          </div>

          <div className="beaux-special-grid">
            {BEAUX_COLLECTIONS_3GRID.map((col) => (
              <div
                key={col.id}
                className="beaux-special-card"
                style={{ backgroundImage: `url(${col.image})` }}
                onClick={() => showToast(`Opening Collection: ${col.title}`)}
              >
                <div className="beaux-special-card-overlay" />
                <div className="beaux-special-content">
                  <h3 className="beaux-special-card-title">{col.title}</h3>
                  <p className="beaux-special-card-sub">{col.subtitle}</p>
                  <span className="beaux-special-link">Shop Collection →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Full-width Banner: Bring out the hidden beauty */}
      <section
        className="beaux-hidden-beauty-banner"
        style={{ backgroundImage: `url('https://beaux-theme.myshopify.com/cdn/shop/files/bg-image.jpg?v=1614298416&width=1500')` }}
      >
        <div className="beaux-hidden-beauty-box">
          <h2 className="beaux-hidden-beauty-title">Bring out the hidden beauty</h2>
          <p className="beaux-hidden-beauty-desc">Get styled with the high-fashion products and transform yourself.</p>
          <button className="beaux-btn-secondary" onClick={() => showToast('Trending High-Fashion Cosmetics')}>
            Trending
          </button>
        </div>
      </section>

      {/* Products Section 1: What's New For You */}
      <section className="beaux-products-section">
        <div className="beaux-container">
          <div className="beaux-section-head-center">
            <div className="beaux-sub-script">cosmetic picks</div>
            <h2 className="beaux-head-title">What&apos;s New For You</h2>
          </div>

          <div className="beaux-products-grid">
            {BEAUX_WHATS_NEW_PRODUCTS.map((prod) => {
              const isWish = wishlist.includes(prod.id)
              return (
                <div key={prod.id} className="beaux-prod-card">
                  <div className="beaux-prod-img-box">
                    <img src={prod.image} alt={prod.name} />
                    {prod.badge && <span className="beaux-prod-badge">{prod.badge}</span>}
                    <div className="beaux-prod-actions">
                      <button
                        className={`beaux-action-btn ${isWish ? 'active' : ''}`}
                        title="Wishlist"
                        onClick={() => toggleWishlist(prod.id)}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill={isWish ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                      <button
                        className="beaux-action-btn"
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

                  <div className="beaux-prod-info">
                    <h3 className="beaux-prod-name">{prod.name}</h3>
                    <div className="beaux-prod-rating">
                      {'★'.repeat(Math.floor(prod.rating))}
                      {'☆'.repeat(5 - Math.floor(prod.rating))}
                    </div>
                    <div className="beaux-prod-price-row">
                      <span className="beaux-current-price">{formatPrice(prod.price)}</span>
                      {prod.originalPrice && (
                        <span className="beaux-old-price">{formatPrice(prod.originalPrice)}</span>
                      )}
                    </div>
                    <button className="beaux-card-add-btn" onClick={() => handleAddToCart(prod)}>
                      + Add To Cart
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Products Section 2: Blockbuster collections */}
      <section className="beaux-products-section" style={{ background: '#faf8f7' }}>
        <div className="beaux-container">
          <div className="beaux-section-head-center">
            <div className="beaux-sub-script">top essentials</div>
            <h2 className="beaux-head-title">Blockbuster collections</h2>
          </div>

          <div className="beaux-products-grid">
            {BEAUX_BLOCKBUSTER_PRODUCTS.map((prod) => {
              const isWish = wishlist.includes(prod.id)
              return (
                <div key={prod.id} className="beaux-prod-card">
                  <div className="beaux-prod-img-box">
                    <img src={prod.image} alt={prod.name} />
                    {prod.badge && <span className="beaux-prod-badge">{prod.badge}</span>}
                    <div className="beaux-prod-actions">
                      <button
                        className={`beaux-action-btn ${isWish ? 'active' : ''}`}
                        title="Wishlist"
                        onClick={() => toggleWishlist(prod.id)}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill={isWish ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                      <button
                        className="beaux-action-btn"
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

                  <div className="beaux-prod-info">
                    <h3 className="beaux-prod-name">{prod.name}</h3>
                    <div className="beaux-prod-rating">
                      {'★'.repeat(Math.floor(prod.rating))}
                      {'☆'.repeat(5 - Math.floor(prod.rating))}
                    </div>
                    <div className="beaux-prod-price-row">
                      <span className="beaux-current-price">{formatPrice(prod.price)}</span>
                      {prod.originalPrice && (
                        <span className="beaux-old-price">{formatPrice(prod.originalPrice)}</span>
                      )}
                    </div>
                    <button className="beaux-card-add-btn" onClick={() => handleAddToCart(prod)}>
                      + Add To Cart
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Blog Section: Beautilicious blog */}
      <section className="beaux-blog-section">
        <div className="beaux-container">
          <div className="beaux-section-head-center">
            <div className="beaux-sub-script">from the journal</div>
            <h2 className="beaux-head-title">Beautilicious blog</h2>
          </div>

          <div className="beaux-blog-grid">
            {BEAUX_BLOG_POSTS.map((blog) => (
              <article key={blog.id} className="beaux-blog-card">
                <div className="beaux-blog-img-box">
                  <img src={blog.image} alt={blog.title} />
                </div>
                <div className="beaux-blog-body">
                  <div className="beaux-blog-date">{blog.date}</div>
                  <h3 className="beaux-blog-title">{blog.title}</h3>
                  <p className="beaux-blog-excerpt">{blog.excerpt}</p>
                  <span className="beaux-blog-link" onClick={() => showToast(`Reading: ${blog.title}`)}>
                    Read More →
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Instagram 10-Grid Gallery */}
      <section className="beaux-insta-section">
        <div className="beaux-insta-grid">
          {BEAUX_INSTAGRAM_IMAGES.map((img, idx) => (
            <div key={idx} className="beaux-insta-item">
              <img src={img} alt={`Beaux Instagram ${idx + 1}`} />
              <div className="beaux-insta-overlay">
                <span>📸</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter: Sign-up the beauty fan club today */}
      <section className="beaux-newsletter-bar">
        <div className="beaux-container">
          <h3 className="beaux-newsletter-title">Sign-up the beauty fan club today</h3>
          <p className="beaux-newsletter-sub">Sign up for our newsletter to get more cosmetic information.</p>
          <form className="beaux-newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              className="beaux-newsletter-input"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button type="submit" className="beaux-newsletter-btn">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="beaux-footer">
        <div className="beaux-container">
          <div className="beaux-footer-grid">
            <div className="beaux-footer-col">
              <img src={BEAUX_LOGO} alt="Beaux" className="beaux-footer-logo-img" />
              <p style={{ lineHeight: '1.7', fontSize: '14px' }}>
                Pick your beauty products today. 50% OFF on the most popular cosmetic brands with organic botanical ingredients.
              </p>
            </div>

            <div className="beaux-footer-col">
              <h4>Information</h4>
              <ul className="beaux-footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#delivery">Delivery Information</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms & Conditions</a></li>
              </ul>
            </div>

            <div className="beaux-footer-col">
              <h4>Customer Service</h4>
              <ul className="beaux-footer-links">
                <li><a href="#contact">Contact Us</a></li>
                <li><a href="#returns">Returns</a></li>
                <li><a href="#sitemap">Site Map</a></li>
                <li><a href="#wishlist">Wish List</a></li>
              </ul>
            </div>

            <div className="beaux-footer-col">
              <h4>Contact Us</h4>
              <p style={{ lineHeight: '1.7', fontSize: '14px' }}>
                742 Evergreen Terrace, Suite 400<br />
                New York, NY 10012<br />
                support@beaux-theme.com<br />
                +1 (800) 555-BEAUX
              </p>
            </div>
          </div>

          <div className="beaux-footer-bottom">
            <div>© 2026 Beaux Skincare Theme. All rights reserved.</div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <span>VISA</span> • <span>MASTERCARD</span> • <span>AMEX</span> • <span>PAYPAL</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Shopping Bag Drawer */}
      {isCartOpen && (
        <div className="beaux-drawer-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="beaux-drawer" onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '20px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontFamily: 'Playfair Display, serif' }}>Your Bag ({cartCount})</h3>
              <button style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }} onClick={() => setIsCartOpen(false)}>✕</button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
              {cartItems.map((item) => (
                <div key={item.product.id} style={{ display: 'flex', gap: '14px', marginBottom: '16px', paddingBottom: '16px', borderBottom: '1px solid #f0e2dd' }}>
                  <img src={item.product.image} alt={item.product.name} style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: '4px' }} />
                  <div style={{ flex: 1 }}>
                    <h4 style={{ margin: '0 0 4px 0', fontSize: '14px' }}>{item.product.name}</h4>
                    <div style={{ fontSize: '13px', color: '#666', marginBottom: '8px' }}>{formatPrice(item.product.price)}</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <button style={{ width: '24px', height: '24px', border: '1px solid #ccc', background: '#fafafa', cursor: 'pointer' }} onClick={() => handleUpdateCartQty(item.product.id, -1)}>-</button>
                      <span>{item.quantity}</span>
                      <button style={{ width: '24px', height: '24px', border: '1px solid #ccc', background: '#fafafa', cursor: 'pointer' }} onClick={() => handleUpdateCartQty(item.product.id, 1)}>+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: '20px', borderTop: '1px solid #eee', background: '#faf8f7' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', fontWeight: 'bold' }}>
                <span>Subtotal:</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <button
                style={{ width: '100%', padding: '14px', background: '#222', color: '#fff', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}
                onClick={() => {
                  showToast('Proceeding to Checkout...')
                  if (onUseTemplate) onUseTemplate('cosmetics-beaux')
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="beaux-drawer-backdrop" onClick={() => setQuickViewProduct(null)}>
          <div
            style={{ background: '#fff', borderRadius: '8px', maxWidth: '720px', width: '90%', margin: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', overflow: 'hidden', position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuickViewProduct(null)}
              style={{ position: 'absolute', top: '12px', right: '12px', background: '#fff', border: '1px solid #ccc', borderRadius: '50%', width: '30px', height: '30px', cursor: 'pointer', zIndex: 10 }}
            >
              ✕
            </button>
            <img src={quickViewProduct.image} alt={quickViewProduct.name} style={{ width: '100%', height: '100%', minHeight: '320px', objectFit: 'cover' }} />
            <div style={{ padding: '30px', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ margin: '0 0 10px 0', fontFamily: 'Playfair Display, serif', fontSize: '22px' }}>{quickViewProduct.name}</h3>
              <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '12px', color: '#e87868' }}>{formatPrice(quickViewProduct.price)}</div>
              <p style={{ fontSize: '14px', lineHeight: '1.6', color: '#666', marginBottom: '20px' }}>{quickViewProduct.description}</p>
              <button
                style={{ marginTop: 'auto', width: '100%', padding: '12px', background: '#222', color: '#fff', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer' }}
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

      {/* Search Modal */}
      <StorefrontSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={[...BEAUX_WHATS_NEW_PRODUCTS, ...BEAUX_BLOCKBUSTER_PRODUCTS].map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category,
        }))}
        onSelectProduct={(p) => {
          const fullProd = [...BEAUX_WHATS_NEW_PRODUCTS, ...BEAUX_BLOCKBUSTER_PRODUCTS].find((x) => x.id === p.id)
          if (fullProd) setQuickViewProduct(fullProd)
        }}
        accentColor={customAccentColor || '#e87868'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
        placeholder="Search clean serums, creams, lip balms..."
        popularTags={['Serum', 'Creams', 'Masks', 'Cleanser']}
      />

      {/* Wishlist Drawer */}
      <StorefrontWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        allProducts={[...BEAUX_WHATS_NEW_PRODUCTS, ...BEAUX_BLOCKBUSTER_PRODUCTS].map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category,
        }))}
        onRemoveWishlist={toggleWishlist}
        onAddToCart={(p) => {
          const fullProd = [...BEAUX_WHATS_NEW_PRODUCTS, ...BEAUX_BLOCKBUSTER_PRODUCTS].find((x) => x.id === p.id)
          if (fullProd) handleAddToCart(fullProd)
        }}
        onOpenProduct={(p) => {
          const fullProd = [...BEAUX_WHATS_NEW_PRODUCTS, ...BEAUX_BLOCKBUSTER_PRODUCTS].find((x) => x.id === p.id)
          if (fullProd) setQuickViewProduct(fullProd)
        }}
        accentColor={customAccentColor || '#e87868'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
      />

      {/* Account Modal */}
      <StorefrontAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        brandName="Beaux Skincare"
        accentColor={customAccentColor || '#e87868'}
      />

      {/* Mobile Navigation Drawer */}
      <StorefrontMobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        brandName="Beaux Skincare"
        navItems={navItems}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        cartCount={cartCount}
        contactPhone="+1 (800) 232-BEAUX"
        contactEmail="care@beauxbeauty.com"
        accentColor={customAccentColor || '#e87868'}
      />

      {/* Toast Notification */}
      {toastMessage && <div className="beaux-toast">{toastMessage}</div>}
    </div>
  )
}
