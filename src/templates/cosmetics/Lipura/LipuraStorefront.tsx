import { useState, useMemo } from 'react'
import type {
  LipuraProduct,
  LipuraCartItem,
  LipuraStorefrontProps,
} from './types'
import {
  LIPURA_HERO_SLIDE,
  LIPURA_PROMO_BANNERS,
  LIPURA_PRODUCTS,
  LIPURA_ATTRIBUTES,
  LIPURA_LUXURY_AWAIT,
  LIPURA_ULTRA_LUXURY,
} from './data/lipuraData'
import {
  StorefrontSearchModal,
  StorefrontWishlistDrawer,
  StorefrontAccountModal,
  StorefrontMobileNavDrawer,
  type MobileNavItem,
} from '../../common/StorefrontModals'
import './styles/lipura.css'

export function LipuraStorefront({
  template: _template,
  device = 'desktop',
  deviceView,
  customAccentColor,
  onColorChange: _onColorChange,
  onUseTemplate: _onUseTemplate,
  onClose: _onClose,
  onBack: _onBack,
}: LipuraStorefrontProps) {
  const effectiveDevice = (deviceView as string) || device || 'desktop'

  // Filter state
  const [activeFinish, setActiveFinish] = useState<'all' | 'matte' | 'satin' | 'velvet'>('all')

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<LipuraProduct | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterDone, setNewsletterDone] = useState(false)
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD')

  const formatPrice = (usdAmount: number) => {
    if (currency === 'INR') {
      return `₹${Math.round(usdAmount * 83).toLocaleString('en-IN')}`
    }
    return `$${usdAmount.toFixed(2)}`
  }

  // Cart
  const [cartItems, setCartItems] = useState<LipuraCartItem[]>([
    { product: LIPURA_PRODUCTS[0], quantity: 1 },
    { product: LIPURA_PRODUCTS[5], quantity: 1 },
  ])

  const navItems: MobileNavItem[] = [
    {
      label: 'HOME',
      children: [
        { label: 'Couture Hero', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { label: 'Seasonal Lookbook', onClick: () => { const el = document.getElementById('promos'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'SHOPS',
      children: [
        { label: 'Velvet Lipsticks', onClick: () => { setActiveFinish('velvet'); const el = document.getElementById('products'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Matte Liquid Lip', onClick: () => { setActiveFinish('matte'); const el = document.getElementById('products'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Satin Luxury Lacquer', onClick: () => { setActiveFinish('satin'); const el = document.getElementById('products'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'PRODUCTS',
      children: [
        { label: 'All Lip Creations', onClick: () => { setActiveFinish('all'); const el = document.getElementById('products'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Bestselling Shades', onClick: () => { const el = document.getElementById('products'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'EDITORIAL',
      children: [
        { label: 'Luxury Lips Await', onClick: () => { const el = document.getElementById('await'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'PAGES',
      children: [
        { label: 'About Lipura Atelier', onClick: () => { const el = document.getElementById('footer'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'CONTACT',
      onClick: () => alert('Lipura Concierge: atelier@lipura-beauty.com'),
    },
  ]

  // Cart stats
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }, [cartItems])

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0)
  }, [cartItems])

  // Filtered products
  const displayedProducts = useMemo(() => {
    if (activeFinish === 'all') return LIPURA_PRODUCTS
    return LIPURA_PRODUCTS.filter((p) => p.finish === activeFinish)
  }, [activeFinish])

  // Handlers
  const handleAddToCart = (product: LipuraProduct) => {
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
        .filter(Boolean) as LipuraCartItem[]
    )
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  return (
    <div
      className={`lipura-storefront device-${effectiveDevice}`}
      style={
        customAccentColor
          ? ({ '--lipura-gold': customAccentColor } as React.CSSProperties)
          : undefined
      }
    >
      {/* Top Banner Notice */}
      <div style={{ backgroundColor: '#111111', color: '#ffffff', fontSize: '12px', padding: '6px 20px', letterSpacing: '1px' }}>
        <div className="lipura-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>COMPLIMENTARY LUXURY GIFT PACKAGING &bull; FREE EXPRESS SHIPPING OVER {formatPrice(100)}</span>
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

      {/* Main Header */}
      <header className="lipura-header">
        <div className="lipura-container">
          <div className="lipura-header-inner">
            {/* Mobile Hamburger Button */}
            <button
              className="lipura-hamburger-btn"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open mobile navigation menu"
            >
              ☰
            </button>

            {/* Logo */}
            <a href="#hero" className="lipura-brand-name">
              LIPURA
            </a>

            {/* Nav */}
            <nav className="lipura-nav">
              <ul className="lipura-nav-menu">
                <li className="wv-nav-dropdown-wrap">
                  <a href="#hero" className="lipura-nav-link active">HOME ▾</a>
                  <div className="wv-desktop-dropdown">
                    <a href="#hero">Couture Collection</a>
                    <a href="#promos">Lookbook Edition</a>
                  </div>
                </li>
                <li className="wv-nav-dropdown-wrap">
                  <a href="#promos" className="lipura-nav-link">SHOPS ▾</a>
                  <div className="wv-desktop-dropdown">
                    <button onClick={() => { setActiveFinish('matte'); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }) }}>Matte Collection</button>
                    <button onClick={() => { setActiveFinish('satin'); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }) }}>Satin Cream</button>
                    <button onClick={() => { setActiveFinish('velvet'); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }) }}>Velvet Pigment</button>
                  </div>
                </li>
                <li className="wv-nav-dropdown-wrap">
                  <a href="#products" className="lipura-nav-link">PRODUCTS ▾</a>
                  <div className="wv-desktop-dropdown">
                    <button onClick={() => { setActiveFinish('all'); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }) }}>All Lipstick Shades</button>
                    <a href="#products">Trending Now</a>
                  </div>
                </li>
                <li><a href="#await" className="lipura-nav-link">EDITORIAL</a></li>
                <li><a href="#footer" className="lipura-nav-link">PAGES</a></li>
              </ul>
            </nav>

            {/* Actions */}
            <div className="lipura-header-actions">
              <button
                className="lipura-icon-btn"
                onClick={() => setIsSearchOpen(true)}
                title="Search Shades"
                aria-label="Search Shades"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>

              <button
                className="lipura-icon-btn"
                onClick={() => setIsAccountOpen(true)}
                title="Account"
                aria-label="Account"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>

              <button
                className="lipura-icon-btn"
                onClick={() => setIsWishlistOpen(true)}
                title={`Wishlist (${wishlist.length})`}
                aria-label={`Wishlist (${wishlist.length})`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.length > 0 ? ((customAccentColor as string) || '#d32f2f') : 'none'} stroke={wishlist.length > 0 ? ((customAccentColor as string) || '#d32f2f') : 'currentColor'} strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {wishlist.length > 0 && <span className="lipura-cart-badge">{wishlist.length}</span>}
              </button>

              <button
                className="lipura-icon-btn"
                onClick={() => setIsCartOpen(true)}
                title="View Bag"
                aria-label="View Bag"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {totalCartCount > 0 && <span className="lipura-cart-badge">{totalCartCount}</span>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Giant Hero Section */}
      <section
        className="lipura-hero"
        id="hero"
        style={{ backgroundImage: `url(${LIPURA_HERO_SLIDE.image})` }}
      >
        <div className="lipura-hero-overlay" />
        <div className="lipura-container" style={{ position: 'relative', width: '100%' }}>
          <div className="lipura-hero-content">
            <h1 className="lipura-hero-h1">{LIPURA_HERO_SLIDE.title}</h1>
            <p className="lipura-hero-sub">{LIPURA_HERO_SLIDE.subtitle}</p>
            <a href="#products" className="lipura-btn-white">
              {LIPURA_HERO_SLIDE.buttonText} &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* 2 Middle Promo Grid */}
      <section className="lipura-promos-section" id="promos">
        <div className="lipura-container">
          <div className="lipura-promos-grid">
            {LIPURA_PROMO_BANNERS.map((banner) => (
              <div key={banner.id} className="lipura-promo-card">
                <img src={banner.image} alt={banner.title} className="lipura-promo-img" />
                <div className="lipura-promo-overlay">
                  <h3 className="lipura-promo-title">{banner.title}</h3>
                  <a href="#products" className="lipura-promo-link">
                    {banner.linkText} &rarr;
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Catalog */}
      <section className="lipura-products-section" id="products">
        <div className="lipura-container">
          <div className="lipura-filter-tabs">
            {(['all', 'matte', 'satin', 'velvet'] as const).map((finish) => (
              <button
                key={finish}
                className={`lipura-filter-tab ${activeFinish === finish ? 'active' : ''}`}
                onClick={() => setActiveFinish(finish)}
              >
                {finish === 'all' ? 'All Shades' : `${finish} Collection`}
              </button>
            ))}
          </div>

          <div className="lipura-products-grid">
            {displayedProducts.map((prod) => (
              <div
                key={prod.id}
                className="lipura-prod-card"
                onClick={() => setQuickViewProduct(prod)}
              >
                {prod.badge && <span className="lipura-ribbon">{prod.badge}</span>}
                <div className="lipura-prod-img-wrap">
                  <img src={prod.image} alt={prod.name} className="lipura-prod-img" />
                  <button
                    className="wv-card-wish-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist(prod.id)
                    }}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      left: '12px',
                      background: '#ffffff',
                      border: 'none',
                      borderRadius: '50%',
                      width: '32px',
                      height: '32px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      zIndex: 6,
                    }}
                    title="Add to Wishlist"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlist.includes(prod.id) ? '#d32f2f' : 'none'} stroke={wishlist.includes(prod.id) ? '#d32f2f' : '#777'} strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                <div className="lipura-prod-body">
                  <div>
                    {prod.swatchColor && (
                      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '8px' }}>
                        <span style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: prod.swatchColor, display: 'inline-block', border: '1px solid #ddd' }} />
                      </div>
                    )}
                    <h3 className="lipura-prod-name">{prod.name}</h3>
                    <div className="lipura-prod-shade">{prod.shade}</div>
                    <div className="lipura-prod-price">
                      {formatPrice(prod.price)}
                      {prod.originalPrice && (
                        <span style={{ fontSize: '13px', textDecoration: 'line-through', color: '#999', marginLeft: '8px', fontWeight: 400 }}>
                          {formatPrice(prod.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    className="lipura-prod-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAddToCart(prod)
                    }}
                  >
                    ADD TO BAG
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Luxury Lips Await Editorial Block */}
      <section className="lipura-await-section" id="await">
        <div className="lipura-container">
          <div className="lipura-await-content">
            <h2 className="lipura-await-h2">{LIPURA_LUXURY_AWAIT.title}</h2>
            <p className="lipura-await-desc">{LIPURA_LUXURY_AWAIT.description}</p>
            <a href="#products" className="lipura-btn-white" style={{ border: '1px solid #111111' }}>
              {LIPURA_LUXURY_AWAIT.buttonText} &rarr;
            </a>
          </div>
        </div>
      </section>

      {/* 4 Attributes Strip */}
      <section className="lipura-attrs-section">
        <div className="lipura-container">
          <div className="lipura-attrs-grid">
            {LIPURA_ATTRIBUTES.map((attr, idx) => (
              <div key={idx}>
                <div className="lipura-attr-icon">{attr.icon}</div>
                <div className="lipura-attr-title">{attr.title}</div>
                <div className="lipura-attr-desc">{attr.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ultra Luxury Split Feature */}
      <section className="lipura-ultra-section">
        <div className="lipura-container">
          <div className="lipura-ultra-grid">
            <div>
              <div className="lipura-ultra-eyebrow">{LIPURA_ULTRA_LUXURY.eyebrow}</div>
              <h2 className="lipura-ultra-h2">{LIPURA_ULTRA_LUXURY.title}</h2>
              <p className="lipura-ultra-desc">{LIPURA_ULTRA_LUXURY.description}</p>
              <button
                className="lipura-btn-white"
                style={{ backgroundColor: '#111111', color: '#ffffff' }}
                onClick={() => handleAddToCart(LIPURA_PRODUCTS[5])}
              >
                {LIPURA_ULTRA_LUXURY.buttonText} &rarr;
              </button>
            </div>
            <div>
              <img
                src={LIPURA_ULTRA_LUXURY.image}
                alt="Ultra Luxury Beauty"
                className="lipura-ultra-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="lipura-footer" id="footer">
        <div className="lipura-container">
          <div className="lipura-footer-grid">
            <div>
              <div className="lipura-footer-logo">LIPURA</div>
              <div className="lipura-footer-phone">+1 800 555 0199</div>
              <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#888888', maxWidth: '300px' }}>
                123 Beauty Boulevard, Suite 100
                <br />
                New York, NY 10001
                <br />
                support@lipura-atelier.com
              </p>
            </div>
            <div>
              <h4 className="lipura-footer-h4">Shops</h4>
              <ul className="lipura-footer-links">
                <li><a href="#products" className="lipura-footer-link">Matte Lipsticks</a></li>
                <li><a href="#products" className="lipura-footer-link">Satin Elixirs</a></li>
                <li><a href="#products" className="lipura-footer-link">Velvet Lip Creams</a></li>
                <li><a href="#products" className="lipura-footer-link">Holiday Gift Sets</a></li>
              </ul>
            </div>
            <div>
              <h4 className="lipura-footer-h4">Atelier</h4>
              <ul className="lipura-footer-links">
                <li><a href="#await" className="lipura-footer-link">Custom Engraving</a></li>
                <li><a href="#await" className="lipura-footer-link">Sustainability</a></li>
                <li><a href="#footer" className="lipura-footer-link">Shipping & Returns</a></li>
                <li><a href="#footer" className="lipura-footer-link">FAQ & Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="lipura-footer-h4">Newsletter</h4>
              <p style={{ fontSize: '13px', color: '#888888', marginBottom: '16px' }}>
                Join the Lipura Club for private shade launches and VIP invitations.
              </p>
              {newsletterDone ? (
                <div style={{ color: '#ffffff', fontSize: '13px', backgroundColor: '#222', padding: '10px' }}>
                  &check; Welcome to the Lipura Atelier.
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
                    placeholder="Enter email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      backgroundColor: '#222222',
                      border: '1px solid #333333',
                      color: '#ffffff',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      backgroundColor: '#ffffff',
                      color: '#000000',
                      border: 'none',
                      padding: '10px 20px',
                      fontWeight: 700,
                      fontSize: '11px',
                      letterSpacing: '1px',
                      cursor: 'pointer',
                    }}
                  >
                    JOIN
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="lipura-footer-bottom">
            <div>&copy; 2026 LIPURA. All Rights Reserved. Powered by Willovate.</div>
            <div style={{ display: 'flex', gap: '20px' }}>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Store Locator</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="lipura-modal-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="lipura-drawer" onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '24px', borderBottom: '1px solid #eee', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                Your Shopping Bag ({totalCartCount})
              </h3>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: '24px', cursor: 'pointer' }}
                aria-label="Close cart"
              >
                &times;
              </button>
            </div>

            <div style={{ padding: '24px', flex: 1, overflowY: 'auto' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#777' }}>
                  <p>Your bag is empty.</p>
                  <button
                    className="lipura-btn-white"
                    style={{ backgroundColor: '#111', color: '#fff' }}
                    onClick={() => setIsCartOpen(false)}
                  >
                    SHOP SHADES
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      style={{ display: 'flex', gap: '14px', borderBottom: '1px solid #f0f0f0', paddingBottom: '16px' }}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        style={{ width: '70px', height: '70px', objectFit: 'contain', backgroundColor: '#f9f9f9' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, fontSize: '14px', color: '#111' }}>{item.product.name}</div>
                        <div style={{ fontSize: '12px', color: '#777', margin: '4px 0' }}>{item.product.shade}</div>
                        <div style={{ fontSize: '13px', fontWeight: 700, marginBottom: '8px' }}>
                          {formatPrice(item.product.price * item.quantity)}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, -1)}
                            style={{ width: '26px', height: '26px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}
                          >
                            -
                          </button>
                          <span style={{ fontSize: '13px' }}>{item.quantity}</span>
                          <button
                            onClick={() => handleUpdateQuantity(item.product.id, 1)}
                            style={{ width: '26px', height: '26px', border: '1px solid #ddd', background: '#fff', cursor: 'pointer' }}
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
              <div style={{ padding: '24px', borderTop: '1px solid #eee', backgroundColor: '#fafafa' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px', fontWeight: 700 }}>
                  <span>SUBTOTAL:</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                <button
                  className="lipura-btn-white"
                  style={{ width: '100%', backgroundColor: '#111111', color: '#ffffff', textAlign: 'center' }}
                  onClick={() => alert(`Proceeding to checkout with total: ${formatPrice(cartSubtotal)}`)}
                >
                  PROCEED TO CHECKOUT
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="lipura-modal-overlay" onClick={() => setQuickViewProduct(null)} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '2px',
              maxWidth: '680px',
              width: '90%',
              padding: '36px',
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
                color: '#777777',
              }}
              aria-label="Close product quick view"
            >
              &times;
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'center' }}>
              <div style={{ textAlign: 'center', backgroundColor: '#f9f9f9', padding: '20px' }}>
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
                />
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#d32f2f', fontWeight: 800, letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                  {quickViewProduct.finish} FINISH
                </div>
                <h3 style={{ fontFamily: 'Playfair Display, Georgia, serif', fontSize: '24px', margin: '8px 0', color: '#111' }}>
                  {quickViewProduct.name}
                </h3>
                <div style={{ fontSize: '13px', color: '#777', marginBottom: '12px' }}>
                  Shade: <strong>{quickViewProduct.shade}</strong>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#111', marginBottom: '16px' }}>
                  {formatPrice(quickViewProduct.price)}
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#777', marginBottom: '24px' }}>
                  {quickViewProduct.description}
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    className="lipura-btn-white"
                    style={{ flex: 1, backgroundColor: '#111', color: '#fff', textAlign: 'center' }}
                    onClick={() => {
                      handleAddToCart(quickViewProduct)
                      setQuickViewProduct(null)
                    }}
                  >
                    ADD TO BAG
                  </button>
                  <button
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                    style={{
                      border: '1px solid #ddd',
                      background: '#fff',
                      padding: '10px 14px',
                      cursor: 'pointer',
                    }}
                    title="Toggle Wishlist"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.includes(quickViewProduct.id) ? '#d32f2f' : 'none'} stroke={wishlist.includes(quickViewProduct.id) ? '#d32f2f' : '#777'} strokeWidth="2">
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
        brandName="LIPURA"
        accentColor={customAccentColor || '#d32f2f'}
        currencyPrefix={currency === 'INR' ? '₹' : '$'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
        products={LIPURA_PRODUCTS.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.shade,
          rating: p.rating,
        }))}
        onAddToCart={(prod) => {
          const matched = LIPURA_PRODUCTS.find((p) => p.id === prod.id)
          if (matched) handleAddToCart(matched)
        }}
        onViewProduct={(prod) => {
          const matched = LIPURA_PRODUCTS.find((p) => p.id === prod.id)
          if (matched) setQuickViewProduct(matched)
        }}
      />

      <StorefrontWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        onToggleWishlist={toggleWishlist}
        brandName="LIPURA"
        accentColor={customAccentColor || '#d32f2f'}
        currencyPrefix={currency === 'INR' ? '₹' : '$'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
        products={LIPURA_PRODUCTS.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.shade,
          rating: p.rating,
        }))}
        onAddToCart={(prod) => {
          const matched = LIPURA_PRODUCTS.find((p) => p.id === prod.id)
          if (matched) handleAddToCart(matched)
        }}
        onViewProduct={(prod) => {
          const matched = LIPURA_PRODUCTS.find((p) => p.id === prod.id)
          if (matched) setQuickViewProduct(matched)
        }}
      />

      <StorefrontAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        brandName="LIPURA"
        accentColor={customAccentColor || '#d32f2f'}
      />

      <StorefrontMobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        items={navItems}
        brandName="LIPURA"
        accentColor={customAccentColor || '#d32f2f'}
        contactEmail="atelier@lipura-beauty.com"
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={wishlist.length}
      />
    </div>
  )
}

