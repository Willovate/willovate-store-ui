import { useState, useMemo } from 'react'
import type {
  DezelProduct,
  DezelCartItem,
  DezelStorefrontProps,
} from './types'
import {
  DEZEL_LOGO,
  DEZEL_HERO_SLIDES,
  DEZEL_NOTE_BADGES,
  DEZEL_PRODUCTS,
  DEZEL_2_MIDDLE_BANNERS,
  DEZEL_TESTIMONIAL,
  DEZEL_BLOG_POSTS,
} from './data/dezelData'
import {
  StorefrontSearchModal,
  StorefrontWishlistDrawer,
  StorefrontAccountModal,
  StorefrontMobileNavDrawer,
  type MobileNavItem,
} from '../../common/StorefrontModals'
import './styles/dezel.css'

export function DezelStorefront({
  template: _template,
  device = 'desktop',
  deviceView,
  customAccentColor,
  onColorChange: _onColorChange,
  onUseTemplate: _onUseTemplate,
  onClose: _onClose,
  onBack: _onBack,
}: DezelStorefrontProps) {
  const effectiveDevice = (deviceView as string) || device || 'desktop'

  // Slide state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const currentSlide = DEZEL_HERO_SLIDES[currentSlideIndex] || DEZEL_HERO_SLIDES[0]

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<DezelProduct | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterDone, setNewsletterDone] = useState(false)

  // Cart
  const [cartItems, setCartItems] = useState<DezelCartItem[]>([
    { product: DEZEL_PRODUCTS[0], quantity: 1 },
    { product: DEZEL_PRODUCTS[1], quantity: 1 },
  ])

  const navItems: MobileNavItem[] = [
    {
      label: 'HOME',
      children: [
        { label: 'Atelier Hero', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { label: 'Featured Essences', onClick: () => { const el = document.getElementById('popular'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'COLLECTIONS',
      children: [
        { label: 'Luxury Parfums', onClick: () => { const el = document.getElementById('popular'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Scent Stories', onClick: () => { const el = document.getElementById('notes'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'BEST SELLERS',
      children: [
        { label: 'Trending Fragrances', onClick: () => { const el = document.getElementById('popular'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'FRAGRANCE NOTES',
      children: [
        { label: 'Citrus, Amber & Rose', onClick: () => { const el = document.getElementById('notes'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'JOURNAL',
      children: [
        { label: 'The Art of Perfumery', onClick: () => { const el = document.getElementById('blog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'CONTACT',
      onClick: () => alert('Atelier Concierge: concierge@dezelperfume.com'),
    },
  ]

  // Cart stats
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }, [cartItems])

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0)
  }, [cartItems])

  // Handlers
  const handleAddToCart = (product: DezelProduct) => {
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
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean) as DezelCartItem[]
    )
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  return (
    <div
      className={`dezel-storefront device-${effectiveDevice}`}
      style={
        customAccentColor
          ? ({ '--dezel-gold': customAccentColor } as React.CSSProperties)
          : undefined
      }
    >
      {/* Top Banner Notice */}
      <div style={{ backgroundColor: '#051e25', color: '#c59d5f', fontSize: '12px', padding: '8px 0', textAlign: 'center', letterSpacing: '1px' }}>
        COMPLIMENTARY LUXURY GIFT SAMPLE ON ORDERS OVER Rs. 150 &bull; FREE WORLDWIDE SHIPPING
      </div>

      {/* Main Header */}
      <header className="dezel-header">
        <div className="dezel-container">
          <div className="dezel-header-inner">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="dezel-hamburger-btn"
              onClick={() => setIsMobileNavOpen(true)}
              title="Menu"
              aria-label="Open mobile menu"
            >
              ☰
            </button>

            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src={DEZEL_LOGO} alt="Dezel Perfume" className="dezel-logo-img" />
            </div>

            {/* Nav */}
            <nav>
              <ul className="dezel-nav-menu">
                {navItems.map((item) => (
                  <li key={item.label} className="wv-nav-dropdown-wrap">
                    <span
                      className="dezel-nav-link"
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

            {/* Actions */}
            <div className="dezel-header-actions">
              <button
                className="dezel-icon-btn"
                onClick={() => setIsSearchOpen(true)}
                title="Search Fragrances"
                aria-label="Search Fragrances"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>

              <button
                className="dezel-icon-btn"
                onClick={() => setIsAccountOpen(true)}
                title="Atelier Account"
                aria-label="Atelier Account"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>

              <button
                className="dezel-icon-btn"
                onClick={() => setIsWishlistOpen(true)}
                title={`Wishlist (${wishlist.length})`}
                aria-label={`Wishlist (${wishlist.length})`}
                style={{ position: 'relative' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.length > 0 ? '#c59d5f' : 'none'} stroke={wishlist.length > 0 ? '#c59d5f' : 'currentColor'} strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {wishlist.length > 0 && <span className="dezel-cart-badge">{wishlist.length}</span>}
              </button>

              <button
                className="dezel-icon-btn"
                onClick={() => setIsCartOpen(true)}
                title="View Cart"
                aria-label="View Cart"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {totalCartCount > 0 && <span className="dezel-cart-badge">{totalCartCount}</span>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Split Hero Section */}
      <section className="dezel-hero-section" id="hero">
        {/* Left Teal Column */}
        <div className="dezel-hero-left">
          <div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', opacity: 0.7, fontSize: '13px' }}>
              <span style={{ cursor: 'pointer' }}>FB</span>
              <span>/</span>
              <span style={{ cursor: 'pointer' }}>TW</span>
              <span>/</span>
              <span style={{ cursor: 'pointer' }}>IN</span>
            </div>

            {/* Featured Product Box */}
            <div className="dezel-hero-prod-card">
              <img
                src={currentSlide.featuredProduct.image}
                alt={currentSlide.featuredProduct.name}
                className="dezel-hero-prod-img"
              />
              <div className="dezel-hero-prod-title">{currentSlide.featuredProduct.name}</div>
              <div className="dezel-hero-prod-price">Rs. {currentSlide.featuredProduct.price.toFixed(2)}</div>
              <div
                className="dezel-hero-add-link"
                onClick={() => {
                  const match = DEZEL_PRODUCTS.find((p) => p.name === currentSlide.featuredProduct.name) || DEZEL_PRODUCTS[0]
                  handleAddToCart(match)
                }}
              >
                + ADD TO CART
              </div>
            </div>
          </div>

          <div className="dezel-hero-left-bottom">
            <p className="dezel-hero-quote">
              &ldquo;{currentSlide.subtitle}&rdquo;
            </p>
            <div className="dezel-hero-arrows">
              <button
                className="dezel-arrow-btn"
                onClick={() =>
                  setCurrentSlideIndex((prev) => (prev === 0 ? DEZEL_HERO_SLIDES.length - 1 : prev - 1))
                }
                aria-label="Previous Slide"
              >
                &larr;
              </button>
              <button
                className="dezel-arrow-btn"
                onClick={() =>
                  setCurrentSlideIndex((prev) => (prev === DEZEL_HERO_SLIDES.length - 1 ? 0 : prev + 1))
                }
                aria-label="Next Slide"
              >
                &rarr;
              </button>
            </div>
          </div>
        </div>

        {/* Right Marble/Spice Hero Column */}
        <div className="dezel-hero-right">
          <div className="dezel-hero-watermark">Perfume</div>
          <div className="dezel-hero-content">
            <div style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '2px', color: '#c59d5f', textTransform: 'uppercase', marginBottom: '16px' }}>
              HAUTE PARFUMERIE COLLECTION
            </div>
            <h1 className="dezel-hero-h1">{currentSlide.title}</h1>
            <p className="dezel-hero-sub">
              Duis at tellus at urna consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
            <a
              href="#popular"
              className="dezel-btn-explore"
              style={{ display: 'inline-block' }}
            >
              {currentSlide.buttonText} &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* 2 Middle Promo Grid */}
      <section className="dezel-promos-section" id="promos">
        <div className="dezel-container">
          <div className="dezel-promos-grid">
            {DEZEL_2_MIDDLE_BANNERS.map((banner) => (
              <div key={banner.id} className="dezel-promo-banner">
                <img src={banner.image} alt={banner.title} className="dezel-promo-img" />
                <div className="dezel-promo-content">
                  <h3 className="dezel-promo-title">{banner.title}</h3>
                  <p className="dezel-promo-desc">{banner.subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 Fragrance Note Badges */}
      <section className="dezel-notes-section" id="notes">
        <div className="dezel-container">
          <div className="dezel-notes-grid">
            {DEZEL_NOTE_BADGES.map((badge) => (
              <div key={badge.id} className="dezel-note-item">
                <img src={badge.icon} alt={badge.title} className="dezel-note-icon" />
                <h4 className="dezel-note-title">{badge.title}</h4>
                <p className="dezel-note-sub">{badge.subtitle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Transparent Glow Feature Section */}
      <section className="dezel-glow-section">
        <div className="dezel-container">
          <div className="dezel-glow-grid">
            <div>
              <img
                src="https://dezel-perfume.myshopify.com/cdn/shop/files/perdume-1.png"
                alt="Haute Glow Bottle"
                className="dezel-glow-img"
                style={{ backgroundColor: '#ffffff', padding: '40px', objectFit: 'contain', maxHeight: '450px' }}
              />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#c59d5f', textTransform: 'uppercase', marginBottom: '12px' }}>
                SIGNATURE ARTISANAL EXTRACTION
              </div>
              <h2 className="dezel-section-h2" style={{ textAlign: 'left', marginBottom: '20px' }}>
                Transparent glow of pure essence
              </h2>
              <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#698187', marginBottom: '24px' }}>
                Each elixir is hand-blended in small micro-batches using distilled spring waters, pure botanical tinctures, and sustainably harvested Mediterranean blossoms.
              </p>
              <div style={{ display: 'flex', gap: '30px', marginBottom: '32px' }}>
                <div>
                  <div style={{ fontSize: '28px', fontFamily: 'DM Serif Display, Georgia, serif', color: '#082e38' }}>14h+</div>
                  <div style={{ fontSize: '12px', color: '#698187' }}>Scent Longevity</div>
                </div>
                <div>
                  <div style={{ fontSize: '28px', fontFamily: 'DM Serif Display, Georgia, serif', color: '#082e38' }}>100%</div>
                  <div style={{ fontSize: '12px', color: '#698187' }}>Organic Botanical</div>
                </div>
                <div>
                  <div style={{ fontSize: '28px', fontFamily: 'DM Serif Display, Georgia, serif', color: '#082e38' }}>Grasse</div>
                  <div style={{ fontSize: '12px', color: '#698187' }}>French Heritage</div>
                </div>
              </div>
              <button
                className="dezel-card-btn"
                onClick={() => handleAddToCart(DEZEL_PRODUCTS[1])}
              >
                SHOP SIGNATURE ELIXIR
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Most Popular Perfumes */}
      <section className="dezel-popular-section" id="popular">
        <div className="dezel-container">
          <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#c59d5f', textTransform: 'uppercase', marginBottom: '8px' }}>
            AWARD WINNING FORMULATIONS
          </div>
          <h2 className="dezel-section-h2">Most Popular Perfumes</h2>

          <div className="dezel-popular-grid">
            {DEZEL_PRODUCTS.slice(0, 3).map((prod) => (
              <div
                key={prod.id}
                className="dezel-perfume-card"
                onClick={() => setQuickViewProduct(prod)}
              >
                <div style={{ position: 'relative', width: '100%' }}>
                  <img src={prod.image} alt={prod.name} className="dezel-card-img" />
                  <button
                    type="button"
                    className={`wv-card-wish-btn ${wishlist.includes(prod.id) ? 'active' : ''}`}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist(prod.id)
                    }}
                    title={wishlist.includes(prod.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    aria-label="Toggle Wishlist"
                  >
                    {wishlist.includes(prod.id) ? '❤️' : '🤍'}
                  </button>
                </div>

                <h3 className="dezel-card-name">{prod.name}</h3>
                <div className="dezel-card-notes">{prod.scentNotes}</div>
                <div className="dezel-card-price">
                  {prod.currencyPrefix || 'Rs. '}{prod.price.toFixed(2)}
                  {prod.originalPrice && (
                    <span style={{ fontSize: '13px', textDecoration: 'line-through', color: '#999', marginLeft: '8px', fontWeight: 400 }}>
                      {prod.currencyPrefix || 'Rs. '}{prod.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
                <button
                  className="dezel-card-btn"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleAddToCart(prod)
                  }}
                >
                  ADD TO CART
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="dezel-test-section">
        <div className="dezel-container">
          <img src={DEZEL_TESTIMONIAL.avatar} alt={DEZEL_TESTIMONIAL.author} className="dezel-test-avatar" />
          <p className="dezel-test-content">&ldquo;{DEZEL_TESTIMONIAL.content}&rdquo;</p>
          <div className="dezel-test-author">{DEZEL_TESTIMONIAL.author}</div>
          <div style={{ fontSize: '12px', color: '#698187', marginTop: '4px' }}>{DEZEL_TESTIMONIAL.role}</div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="dezel-blog-section" id="blog">
        <div className="dezel-container">
          <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '2px', color: '#c59d5f', textTransform: 'uppercase', marginBottom: '8px' }}>
            BEHIND THE SCENTS
          </div>
          <h2 className="dezel-section-h2">Latest From Our Journal</h2>

          <div className="dezel-blog-grid">
            {DEZEL_BLOG_POSTS.map((post) => (
              <div key={post.id} className="dezel-blog-card">
                <div className="dezel-blog-thumb">
                  <img src={post.image} alt={post.title} className="dezel-blog-img" />
                </div>
                <div className="dezel-blog-body">
                  <div className="dezel-blog-tag">{post.tag} &bull; {post.date}</div>
                  <h3 className="dezel-blog-title">{post.title}</h3>
                  <p className="dezel-blog-excerpt">{post.excerpt}</p>
                  <span className="dezel-blog-link" style={{ cursor: 'pointer' }}>
                    CONTINUE READING &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section style={{ backgroundColor: '#082e38', color: '#ffffff', padding: '60px 0', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="dezel-container" style={{ textAlign: 'center', maxWidth: '640px' }}>
          <div style={{ color: '#c59d5f', fontSize: '12px', fontWeight: 700, letterSpacing: '2px', marginBottom: '8px' }}>
            JOIN THE INNER CIRCLE
          </div>
          <h2 style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: '32px', marginBottom: '12px', color: '#ffffff' }}>
            Subscribe for Private Fragrance Releases
          </h2>
          <p style={{ fontSize: '14px', color: '#a8cfd6', marginBottom: '24px' }}>
            Receive private allocations, invitations to scent workshops, and 15% off your premiere flacon.
          </p>

          {newsletterDone ? (
            <div style={{ backgroundColor: '#0d404d', padding: '14px', borderRadius: '4px', color: '#c59d5f', fontSize: '14px' }}>
              &check; Thank you for subscribing! Your welcome gift code has been dispatched.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                if (newsletterEmail) setNewsletterDone(true)
              }}
              style={{ display: 'flex', gap: '8px' }}
            >
              <input
                type="email"
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                style={{
                  flex: 1,
                  padding: '12px 16px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backgroundColor: 'rgba(255,255,255,0.06)',
                  color: '#ffffff',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#c59d5f',
                  color: '#082e38',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '4px',
                  fontWeight: 700,
                  fontSize: '12px',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                }}
              >
                JOIN
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="dezel-footer" id="footer">
        <div className="dezel-container">
          <div className="dezel-footer-grid">
            <div>
              <img src={DEZEL_LOGO} alt="Dezel Logo" style={{ height: '36px', marginBottom: '16px' }} />
              <p style={{ fontSize: '13px', lineHeight: 1.7, maxWidth: '280px', color: '#a8cfd6' }}>
                Dezel Parfumerie is a tribute to the timeless craft of French artisanal perfumery, formulating evocative scents for rare souls.
              </p>
            </div>
            <div>
              <h4 className="dezel-footer-h4">Collections</h4>
              <ul className="dezel-footer-links">
                <li><a href="#popular" className="dezel-footer-link">Haute Parfumerie</a></li>
                <li><a href="#popular" className="dezel-footer-link">Eau de Parfum</a></li>
                <li><a href="#notes" className="dezel-footer-link">Botanical Essences</a></li>
                <li><a href="#hero" className="dezel-footer-link">Limited Crystal Flacons</a></li>
              </ul>
            </div>
            <div>
              <h4 className="dezel-footer-h4">Customer Care</h4>
              <ul className="dezel-footer-links">
                <li><a href="#footer" className="dezel-footer-link">Scent Consultation</a></li>
                <li><a href="#footer" className="dezel-footer-link">Track Your Order</a></li>
                <li><a href="#footer" className="dezel-footer-link">Shipping & Returns</a></li>
                <li><a href="#footer" className="dezel-footer-link">FAQ & Authenticity</a></li>
              </ul>
            </div>
            <div>
              <h4 className="dezel-footer-h4">Atelier Boutique</h4>
              <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#a8cfd6', margin: 0 }}>
                14 Rue Saint-Honor&eacute;, 75001 Paris, France
                <br />
                support@dezel-perfume.com
                <br />
                +33 1 42 68 55 00
              </p>
            </div>
          </div>

          <div className="dezel-footer-bottom">
            <div>&copy; 2026 Dezel Perfume. All Rights Reserved. Powered by Willovate.</div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Compliance</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="dezel-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="dezel-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="dezel-drawer-header">
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>Your Fragrance Bag ({totalCartCount})</h3>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '20px', cursor: 'pointer' }}
                aria-label="Close cart drawer"
              >
                &times;
              </button>
            </div>

            <div className="dezel-drawer-body">
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#698187' }}>
                  <p>Your bag is currently empty.</p>
                  <button
                    className="dezel-card-btn"
                    onClick={() => setIsCartOpen(false)}
                  >
                    DISCOVER PERFUMES
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      style={{
                        display: 'flex',
                        gap: '12px',
                        borderBottom: '1px solid #e2ece9',
                        paddingBottom: '12px',
                      }}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: '#082e38' }}>{item.product.name}</div>
                        <div style={{ fontSize: '13px', color: '#1a6f82', margin: '4px 0' }}>
                          Rs. {item.product.price.toFixed(2)}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, -1)}
                            style={{ width: '24px', height: '24px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}
                          >
                            -
                          </button>
                          <span style={{ fontSize: '13px' }}>{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, 1)}
                            style={{ width: '24px', height: '24px', border: '1px solid #ccc', background: '#fff', cursor: 'pointer' }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="dezel-drawer-footer">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 600 }}>
                  <span>Subtotal:</span>
                  <span style={{ color: '#082e38' }}>Rs. {cartSubtotal.toFixed(2)}</span>
                </div>
                <button
                  className="dezel-card-btn"
                  style={{ width: '100%', padding: '14px', borderRadius: '4px' }}
                  onClick={() => alert(`Proceeding to checkout with total: Rs. ${cartSubtotal.toFixed(2)}`)}
                >
                  PROCEED TO SECURE CHECKOUT
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="dezel-drawer-overlay" onClick={() => setQuickViewProduct(null)} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '6px',
              maxWidth: '680px',
              width: '90%',
              padding: '30px',
              position: 'relative',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuickViewProduct(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#698187',
              }}
              aria-label="Close product quick view"
            >
              &times;
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  style={{ width: '100%', maxHeight: '280px', objectFit: 'contain' }}
                />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#c59d5f', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  {quickViewProduct.category}
                </div>
                <h3 style={{ fontFamily: 'DM Serif Display, Georgia, serif', fontSize: '24px', margin: '8px 0', color: '#082e38' }}>
                  {quickViewProduct.name}
                </h3>
                <div style={{ fontSize: '13px', color: '#698187', marginBottom: '12px' }}>
                  {quickViewProduct.scentNotes}
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#1a6f82', marginBottom: '16px' }}>
                  Rs. {quickViewProduct.price.toFixed(2)}
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#698187', marginBottom: '20px' }}>
                  {quickViewProduct.description}
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    className="dezel-card-btn"
                    style={{ flex: 1 }}
                    onClick={() => {
                      handleAddToCart(quickViewProduct)
                      setQuickViewProduct(null)
                    }}
                  >
                    ADD TO CART
                  </button>
                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    style={{
                      border: '1px solid #e2ece9',
                      background: '#fff',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    title="Toggle Wishlist"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.includes(quickViewProduct.id) ? '#c59d5f' : 'none'} stroke={wishlist.includes(quickViewProduct.id) ? '#c59d5f' : '#698187'} strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Shared Interactive Modals & Drawers */}
      <StorefrontSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        brandName="DEZEL PERFUMES"
        accentColor={customAccentColor || '#1a6f82'}
        currencyPrefix="Rs. "
        products={DEZEL_PRODUCTS.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category || 'Parfums',
          rating: p.rating,
        }))}
        onAddToCart={(prod) => {
          const matched = DEZEL_PRODUCTS.find((p) => p.id === prod.id)
          if (matched) handleAddToCart(matched)
        }}
        onViewProduct={(prod) => {
          const matched = DEZEL_PRODUCTS.find((p) => p.id === prod.id)
          if (matched) setQuickViewProduct(matched)
        }}
      />

      <StorefrontWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        onToggleWishlist={toggleWishlist}
        brandName="DEZEL PERFUMES"
        accentColor={customAccentColor || '#1a6f82'}
        currencyPrefix="Rs. "
        products={DEZEL_PRODUCTS.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category || 'Parfums',
          rating: p.rating,
        }))}
        onAddToCart={(prod) => {
          const matched = DEZEL_PRODUCTS.find((p) => p.id === prod.id)
          if (matched) handleAddToCart(matched)
        }}
        onViewProduct={(prod) => {
          const matched = DEZEL_PRODUCTS.find((p) => p.id === prod.id)
          if (matched) setQuickViewProduct(matched)
        }}
      />

      <StorefrontAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        brandName="DEZEL PERFUMES"
        accentColor={customAccentColor || '#1a6f82'}
      />

      <StorefrontMobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        items={navItems}
        brandName="DEZEL PERFUMES"
        accentColor={customAccentColor || '#1a6f82'}
        contactEmail="concierge@dezelperfume.com"
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={wishlist.length}
      />
    </div>
  )
}

