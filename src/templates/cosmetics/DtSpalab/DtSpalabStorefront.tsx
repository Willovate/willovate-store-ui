import { useState, useMemo } from 'react'
import type {
  DtSpalabProduct,
  DtSpalabCartItem,
  DtSpalabStorefrontProps,
} from './types'
import {
  DTSPALAB_TOP_BAR,
  DTSPALAB_HERO_SLIDE,
  DTSPALAB_MASSAGE_BANNER,
  DTSPALAB_CATEGORIES,
  DTSPALAB_PROMO_CARDS,
  DTSPALAB_PRODUCTS,
  DTSPALAB_STATS,
  DTSPALAB_SPOTLIGHT,
  DTSPALAB_TESTIMONIAL,
  DTSPALAB_BLOG_POSTS,
  DTSPALAB_BRAND_LOGOS,
} from './data/dtSpalabData'
import {
  StorefrontSearchModal,
  StorefrontWishlistDrawer,
  StorefrontAccountModal,
  StorefrontMobileNavDrawer,
  type MobileNavItem,
} from '../../common/StorefrontModals'
import './styles/dtSpalab.css'

export function DtSpalabStorefront({
  template: _template,
  device = 'desktop',
  deviceView,
  customAccentColor,
  onColorChange: _onColorChange,
  onUseTemplate: _onUseTemplate,
  onClose: _onClose,
  onBack: _onBack,
}: DtSpalabStorefrontProps) {
  const effectiveDevice = (deviceView as string) || device || 'desktop'

  // Category filter state
  const [activeCategory, setActiveCategory] = useState<'all' | 'facial' | 'massage' | 'pedicure' | 'aromatherapy'>('all')

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<DtSpalabProduct | null>(null)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterDone, setNewsletterDone] = useState(false)
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
  const [cartItems, setCartItems] = useState<DtSpalabCartItem[]>([
    { product: DTSPALAB_PRODUCTS[0], quantity: 2 },
    { product: DTSPALAB_PRODUCTS[2], quantity: 1 },
  ])

  const navItems: MobileNavItem[] = [
    {
      label: 'HOME',
      children: [
        { label: 'Spa Sanctuary Hero', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { label: 'Special Offers', onClick: () => { const el = document.getElementById('about'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'SERVICES',
      children: [
        { label: 'Facial Mask Therapy', onClick: () => { setActiveCategory('facial'); const el = document.getElementById('products'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Body Massage', onClick: () => { setActiveCategory('massage'); const el = document.getElementById('products'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Pedicure & Spa', onClick: () => { setActiveCategory('pedicure'); const el = document.getElementById('products'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Aromatherapy Oils', onClick: () => { setActiveCategory('aromatherapy'); const el = document.getElementById('products'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'SHOP',
      children: [
        { label: 'All Formulations', onClick: () => { setActiveCategory('all'); const el = document.getElementById('products'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Bestselling Formulations', onClick: () => { const el = document.getElementById('products'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'ABOUT',
      children: [
        { label: 'Our Holistic Approach', onClick: () => { const el = document.getElementById('about'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Client Testimonials', onClick: () => { const el = document.getElementById('testimonials'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'JOURNAL',
      children: [
        { label: 'Spa & Wellness Journal', onClick: () => { const el = document.getElementById('blog'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'CONTACT',
      onClick: () => alert('Dt-Spalab Concierge: support@dtspalab.com'),
    },
  ]

  // Cart calculations
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }, [cartItems])

  const totalCartCount = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.quantity, 0)
  }, [cartItems])

  // Filtered products
  const displayedProducts = useMemo(() => {
    if (activeCategory === 'all') return DTSPALAB_PRODUCTS
    return DTSPALAB_PRODUCTS.filter((p) => p.category === activeCategory)
  }, [activeCategory])

  // Handlers
  const handleAddToCart = (product: DtSpalabProduct) => {
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
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean) as DtSpalabCartItem[]
    )
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  return (
    <div
      className={`dtspa-storefront device-${effectiveDevice}`}
      style={
        customAccentColor
          ? ({ '--dtspa-purple': customAccentColor } as React.CSSProperties)
          : undefined
      }
    >
      {/* Top Banner Notice */}
      <div className="dtspa-topbar">
        <div className="dtspa-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{DTSPALAB_TOP_BAR}</span>
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
      <header className="dtspa-header">
        <div className="dtspa-container">
          <div className="dtspa-header-inner">
            {/* Mobile Hamburger Button */}
            <button
              className="dtspa-hamburger-btn"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open mobile navigation menu"
            >
              ☰
            </button>

            {/* Brand Logo - User constraint: ONLY name show, no password buddha */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <a href="#hero" className="dtspa-logo-title">
                Dt-Spalab
              </a>
            </div>

            {/* Nav Menu */}
            <nav className="dtspa-nav">
              <ul className="dtspa-nav-menu">
                <li className="wv-nav-dropdown-wrap">
                  <a href="#hero" className="dtspa-nav-link active">HOME ▾</a>
                  <div className="wv-desktop-dropdown">
                    <a href="#hero">Spa Sanctuary</a>
                    <a href="#about">Special Offers</a>
                  </div>
                </li>
                <li className="wv-nav-dropdown-wrap">
                  <a href="#about" className="dtspa-nav-link">ABOUT ▾</a>
                  <div className="wv-desktop-dropdown">
                    <a href="#about">Our Philosophy</a>
                    <a href="#testimonials">Client Stories</a>
                  </div>
                </li>
                <li className="wv-nav-dropdown-wrap">
                  <a href="#services" className="dtspa-nav-link">SERVICES ▾</a>
                  <div className="wv-desktop-dropdown">
                    <button onClick={() => { setActiveCategory('facial'); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }) }}>Facial Mask</button>
                    <button onClick={() => { setActiveCategory('massage'); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }) }}>Therapeutic Massage</button>
                    <button onClick={() => { setActiveCategory('pedicure'); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }) }}>Pedicure Care</button>
                    <button onClick={() => { setActiveCategory('aromatherapy'); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }) }}>Aromatherapy</button>
                  </div>
                </li>
                <li className="wv-nav-dropdown-wrap">
                  <a href="#products" className="dtspa-nav-link">SHOP ▾</a>
                  <div className="wv-desktop-dropdown">
                    <button onClick={() => { setActiveCategory('all'); document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' }) }}>All Formulations</button>
                    <a href="#products">Popular Products</a>
                  </div>
                </li>
                <li><a href="#blog" className="dtspa-nav-link">BLOG</a></li>
                <li><a href="#footer" className="dtspa-nav-link">CONTACT</a></li>
              </ul>
            </nav>

            {/* Header Actions */}
            <div className="dtspa-header-actions">
              <button
                className="dtspa-icon-btn"
                onClick={() => setIsSearchOpen(true)}
                title="Search Products"
                aria-label="Search Products"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>

              <button
                className="dtspa-icon-btn"
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
                className="dtspa-icon-btn"
                onClick={() => setIsWishlistOpen(true)}
                title={`Wishlist (${wishlist.length})`}
                aria-label={`Wishlist (${wishlist.length})`}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.length > 0 ? '#e2a03f' : 'none'} stroke={wishlist.length > 0 ? '#e2a03f' : 'currentColor'} strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                {wishlist.length > 0 && <span className="dtspa-badge">{wishlist.length}</span>}
              </button>

              <button
                className="dtspa-icon-btn"
                onClick={() => setIsCartOpen(true)}
                title="View Bag"
                aria-label="View Bag"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                {totalCartCount > 0 && <span className="dtspa-badge">{totalCartCount}</span>}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="dtspa-hero" id="hero">
        <div className="dtspa-container">
          <div className="dtspa-hero-grid">
            <div>
              <div className="dtspa-eyebrow">
                <span style={{ fontSize: '18px' }}>🪷</span>
                <span>{DTSPALAB_HERO_SLIDE.eyebrow}</span>
              </div>
              <h1 className="dtspa-hero-h1">{DTSPALAB_HERO_SLIDE.title}</h1>
              <p className="dtspa-hero-desc">{DTSPALAB_HERO_SLIDE.description}</p>
              <a href="#products" className="dtspa-btn-primary">
                {DTSPALAB_HERO_SLIDE.buttonText} &rarr;
              </a>
            </div>

            {/* Overlapping Photo Frames */}
            <div className="dtspa-hero-visual">
              <div className="dtspa-frame-1">
                <img src={DTSPALAB_HERO_SLIDE.image1} alt="Facial Mask Treatment" className="dtspa-frame-img" />
              </div>
              <div className="dtspa-frame-2">
                <img src={DTSPALAB_HERO_SLIDE.image2} alt="Men's Skincare Treatment" className="dtspa-frame-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Massage Banner Section */}
      <section className="dtspa-massage-section" id="about">
        <div className="dtspa-container">
          <div
            className="dtspa-massage-card"
            style={{ backgroundImage: `url(${DTSPALAB_MASSAGE_BANNER.image})` }}
          >
            <div className="dtspa-massage-content">
              <div style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1.5px', color: '#56236b', marginBottom: '8px', textTransform: 'uppercase' }}>
                {DTSPALAB_MASSAGE_BANNER.eyebrow}
              </div>
              <h2 style={{ fontSize: '28px', color: '#56236b', marginBottom: '12px' }}>
                {DTSPALAB_MASSAGE_BANNER.title}
              </h2>
              <div style={{ display: 'inline-block', backgroundColor: '#e2a03f', color: '#ffffff', fontWeight: 800, padding: '4px 12px', borderRadius: '20px', fontSize: '13px', marginBottom: '14px' }}>
                {DTSPALAB_MASSAGE_BANNER.discount}
              </div>
              <p style={{ fontSize: '14px', color: '#736b68', lineHeight: 1.6, marginBottom: '20px' }}>
                {DTSPALAB_MASSAGE_BANNER.description}
              </p>
              <a href="#products" className="dtspa-btn-primary">
                {DTSPALAB_MASSAGE_BANNER.buttonText}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Category Circles */}
      <section className="dtspa-categories-section" id="services">
        <div className="dtspa-container">
          <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', color: '#56236b', textTransform: 'uppercase', marginBottom: '8px' }}>
            TAILORED WELLNESS TREATMENTS
          </div>
          <h2 style={{ fontSize: '32px', color: '#56236b', margin: 0 }}>
            Explore Our Spa Specializations
          </h2>

          <div className="dtspa-categories-grid">
            {DTSPALAB_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="dtspa-cat-item"
                onClick={() => {
                  if (cat.title.toLowerCase().includes('face')) setActiveCategory('facial')
                  else if (cat.title.toLowerCase().includes('massage')) setActiveCategory('massage')
                  else if (cat.title.toLowerCase().includes('pedicure')) setActiveCategory('pedicure')
                  else setActiveCategory('aromatherapy')
                }}
              >
                <div className="dtspa-cat-circle">
                  <img src={cat.image} alt={cat.title} className="dtspa-cat-img" />
                </div>
                <div className="dtspa-cat-title">{cat.title}</div>
                <div className="dtspa-cat-sub">{cat.subtitle}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4-Grid Promo Banners */}
      <section className="dtspa-promos-section">
        <div className="dtspa-container">
          <div className="dtspa-promos-grid">
            {DTSPALAB_PROMO_CARDS.map((promo) => (
              <div key={promo.id} className="dtspa-promo-card">
                <img src={promo.image} alt={promo.title} className="dtspa-promo-img" />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to right, rgba(86,35,107,0.7) 0%, rgba(86,35,107,0.1) 70%)',
                    padding: '30px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    color: '#ffffff',
                    maxWidth: '300px',
                  }}
                >
                  <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '1px', color: '#f3c47e' }}>
                    {promo.discount}
                  </span>
                  <h3 style={{ fontSize: '22px', margin: '8px 0 16px', lineHeight: 1.25 }}>
                    {promo.title}
                  </h3>
                  <span style={{ fontSize: '12px', fontWeight: 700, textDecoration: 'underline', letterSpacing: '1px' }}>
                    {promo.buttonText} &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="dtspa-products-section" id="products">
        <div className="dtspa-container">
          <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', color: '#56236b', textTransform: 'uppercase', marginBottom: '8px' }}>
            ORGANIC & DERMATOLOGICALLY TESTED
          </div>
          <h2 className="dtspa-section-title">Our Featured Spa Products</h2>

          {/* Filter Tabs */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '36px', flexWrap: 'wrap' }}>
            {(['all', 'facial', 'massage', 'pedicure', 'aromatherapy'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveCategory(tab)}
                style={{
                  background: activeCategory === tab ? '#56236b' : '#ffffff',
                  color: activeCategory === tab ? '#ffffff' : '#56236b',
                  border: '1px solid #56236b',
                  padding: '8px 20px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                {tab === 'all' ? 'All Products' : tab}
              </button>
            ))}
          </div>

          <div className="dtspa-products-grid">
            {displayedProducts.map((prod) => (
              <div
                key={prod.id}
                className="dtspa-product-card"
                onClick={() => setQuickViewProduct(prod)}
                style={{ cursor: 'pointer' }}
              >
                <div className="dtspa-prod-thumb">
                  {prod.badge && <span className="dtspa-prod-badge">{prod.badge}</span>}
                  <img src={prod.image} alt={prod.name} className="dtspa-prod-img" />
                  <button
                    className="wv-card-wish-btn"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleWishlist(prod.id)
                    }}
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
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
                      zIndex: 3,
                    }}
                    title="Add to Wishlist"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlist.includes(prod.id) ? '#e2a03f' : 'none'} stroke={wishlist.includes(prod.id) ? '#e2a03f' : '#736b68'} strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                <div className="dtspa-prod-name">{prod.name}</div>
                <div className="dtspa-prod-price">
                  {formatPrice(prod.price)}
                  {prod.originalPrice && (
                    <span style={{ fontSize: '13px', textDecoration: 'line-through', color: '#999', marginLeft: '8px', fontWeight: 400 }}>
                      {formatPrice(prod.originalPrice)}
                    </span>
                  )}
                </div>

                <button
                  className="dtspa-btn-add"
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

      {/* Stats Counter Strip */}
      <section className="dtspa-stats-strip">
        <div className="dtspa-container">
          <div className="dtspa-stats-grid">
            {DTSPALAB_STATS.map((stat, idx) => (
              <div key={idx}>
                <div className="dtspa-stat-value">{stat.value}</div>
                <div className="dtspa-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlight Feature Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="dtspa-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              <img
                src={DTSPALAB_SPOTLIGHT.image}
                alt={DTSPALAB_SPOTLIGHT.title}
                style={{ width: '100%', borderRadius: '8px', boxShadow: '0 12px 36px rgba(86,35,107,0.1)' }}
              />
            </div>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', color: '#56236b', textTransform: 'uppercase', marginBottom: '8px' }}>
                {DTSPALAB_SPOTLIGHT.subtitle}
              </div>
              <h2 style={{ fontSize: '34px', color: '#56236b', marginBottom: '20px' }}>
                {DTSPALAB_SPOTLIGHT.title}
              </h2>
              <p style={{ fontSize: '14px', lineHeight: 1.8, color: '#736b68', marginBottom: '24px' }}>
                Formulated using cold-pressed extracts, organic floral distillations, and bioactive botanicals to revive tired skin without irritation.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {DTSPALAB_SPOTLIGHT.features.map((feat, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: '#2c2523' }}>
                    <span style={{ color: '#56236b', fontWeight: 800 }}>&check;</span>
                    {feat}
                  </li>
                ))}
              </ul>
              <button
                className="dtspa-btn-primary"
                onClick={() => handleAddToCart(DTSPALAB_PRODUCTS[2])}
              >
                EXPERIENCE RESTORATIVE BALM
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section style={{ padding: '70px 0', backgroundColor: '#fdf8f4', textAlign: 'center' }}>
        <div className="dtspa-container" style={{ maxWidth: '680px' }}>
          <img
            src={DTSPALAB_TESTIMONIAL.avatar}
            alt={DTSPALAB_TESTIMONIAL.author}
            style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 16px', border: '3px solid #56236b' }}
          />
          <div style={{ color: '#e2a03f', fontSize: '18px', marginBottom: '14px' }}>
            ★★★★★
          </div>
          <p style={{ fontSize: '16px', fontStyle: 'italic', lineHeight: 1.8, color: '#2c2523', marginBottom: '16px' }}>
            &ldquo;{DTSPALAB_TESTIMONIAL.content}&rdquo;
          </p>
          <div style={{ fontWeight: 700, color: '#56236b', fontSize: '16px' }}>{DTSPALAB_TESTIMONIAL.author}</div>
          <div style={{ fontSize: '12px', color: '#736b68' }}>{DTSPALAB_TESTIMONIAL.role}</div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="dtspa-blog-section" id="blog">
        <div className="dtspa-container">
          <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '1.5px', color: '#e2a03f', textTransform: 'uppercase', marginBottom: '8px' }}>
            WELLNESS & HEALTH ADVICE
          </div>
          <h2 style={{ fontSize: '34px', color: '#ffffff', margin: 0 }}>
            Latest From Our Spa Journal
          </h2>

          <div className="dtspa-blog-grid">
            {DTSPALAB_BLOG_POSTS.map((post) => (
              <div key={post.id} className="dtspa-blog-card">
                <div className="dtspa-blog-thumb">
                  <img src={post.image} alt={post.title} className="dtspa-blog-img" />
                </div>
                <div className="dtspa-blog-body">
                  <div className="dtspa-blog-tag">{post.category} &bull; {post.date}</div>
                  <h3 className="dtspa-blog-title">{post.title}</h3>
                  <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#736b68', margin: '0 0 16px' }}>
                    {post.excerpt}
                  </p>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: '#56236b', cursor: 'pointer', textDecoration: 'underline' }}>
                    READ FULL ARTICLE &rarr;
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Partners */}
      <section style={{ padding: '40px 0', backgroundColor: '#ffffff', borderTop: '1px solid #ede1d3' }}>
        <div className="dtspa-container">
          <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', gap: '20px', opacity: 0.7 }}>
            {DTSPALAB_BRAND_LOGOS.map((logo, i) => (
              <img key={i} src={logo} alt="Brand Partner" style={{ maxHeight: '36px', filter: 'grayscale(100%)' }} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ padding: '60px 0', backgroundColor: '#56236b', color: '#ffffff', textAlign: 'center' }}>
        <div className="dtspa-container" style={{ maxWidth: '600px' }}>
          <h2 style={{ fontSize: '28px', marginBottom: '10px' }}>We make beauty easy for everyone</h2>
          <p style={{ fontSize: '14px', color: '#dfcfe6', marginBottom: '24px' }}>
            Subscribe to receive exclusive monthly discounts, skincare rituals, and spa appointment privileges.
          </p>

          {newsletterDone ? (
            <div style={{ backgroundColor: 'rgba(255,255,255,0.15)', padding: '12px', borderRadius: '4px', color: '#f3c47e' }}>
              &check; Thank you for subscribing! Your 10% welcome coupon is on its way.
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
                  padding: '12px 18px',
                  borderRadius: '4px',
                  border: 'none',
                  outline: 'none',
                  fontSize: '14px',
                }}
              />
              <button
                type="submit"
                style={{
                  backgroundColor: '#e2a03f',
                  color: '#ffffff',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '4px',
                  fontWeight: 700,
                  fontSize: '13px',
                  letterSpacing: '1px',
                  cursor: 'pointer',
                }}
              >
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="dtspa-footer" id="footer">
        <div className="dtspa-container">
          <div className="dtspa-footer-grid">
            <div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: '#ffffff', marginBottom: '16px' }}>
                Dt-Spalab
              </div>
              <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#dfcfe6', maxWidth: '300px' }}>
                Dedicated to clinical results and mindful holistic wellness, bringing organic botanical solutions to your daily self-care rituals.
              </p>
            </div>
            <div>
              <h4 className="dtspa-footer-h4">Our Services</h4>
              <ul className="dtspa-footer-links">
                <li><a href="#services" className="dtspa-footer-link">Laser Facial Clinics</a></li>
                <li><a href="#services" className="dtspa-footer-link">Therapeutic Massage</a></li>
                <li><a href="#services" className="dtspa-footer-link">Aromatherapy Spa</a></li>
                <li><a href="#services" className="dtspa-footer-link">Holistic Pedicure</a></li>
              </ul>
            </div>
            <div>
              <h4 className="dtspa-footer-h4">Customer Care</h4>
              <ul className="dtspa-footer-links">
                <li><a href="#footer" className="dtspa-footer-link">Book Appointment</a></li>
                <li><a href="#footer" className="dtspa-footer-link">Track Delivery</a></li>
                <li><a href="#footer" className="dtspa-footer-link">Returns Policy</a></li>
                <li><a href="#footer" className="dtspa-footer-link">Spa Membership</a></li>
              </ul>
            </div>
            <div>
              <h4 className="dtspa-footer-h4">Boutique Clinic</h4>
              <p style={{ fontSize: '13px', lineHeight: 1.7, color: '#dfcfe6', margin: 0 }}>
                450 Wellness Avenue, Suite 200
                <br />
                hello@dt-spalab.com
                <br />
                +1 (800) 456-7890
              </p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px', color: '#dfcfe6' }}>
            <div>&copy; 2026 Dt-Spalab. All Rights Reserved. Powered by Willovate.</div>
            <div style={{ display: 'flex', gap: '16px' }}>
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="dtspa-modal-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="dtspa-drawer" onClick={(e) => e.stopPropagation()}>
            <div style={{ padding: '20px', backgroundColor: '#56236b', color: '#ffffff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '16px' }}>Your Treatment Bag ({totalCartCount})</h3>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '22px', cursor: 'pointer' }}
                aria-label="Close cart"
              >
                &times;
              </button>
            </div>

            <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#736b68' }}>
                  <p>Your bag is empty.</p>
                  <button className="dtspa-btn-primary" onClick={() => setIsCartOpen(false)}>
                    EXPLORE PRODUCTS
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      style={{ display: 'flex', gap: '12px', borderBottom: '1px solid #ede1d3', paddingBottom: '12px' }}
                    >
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                      />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 600, fontSize: '14px', color: '#56236b' }}>{item.product.name}</div>
                        <div style={{ fontSize: '13px', color: '#736b68', margin: '4px 0' }}>
                          {formatPrice(item.product.price * item.quantity)}
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
              <div style={{ padding: '20px', borderTop: '1px solid #ede1d3', backgroundColor: '#fdf8f4' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontWeight: 700, color: '#56236b' }}>
                  <span>Subtotal:</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                <button
                  className="dtspa-btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => alert(`Proceeding to checkout with total: ${formatPrice(cartSubtotal)}`)}
                >
                  CHECKOUT
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="dtspa-modal-overlay" onClick={() => setQuickViewProduct(null)} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '8px',
              maxWidth: '650px',
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
                color: '#736b68',
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
                <div style={{ fontSize: '11px', color: '#56236b', fontWeight: 700, letterSpacing: '1px', textTransform: 'uppercase' }}>
                  {quickViewProduct.category}
                </div>
                <h3 style={{ fontSize: '22px', margin: '8px 0', color: '#56236b' }}>
                  {quickViewProduct.name}
                </h3>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#56236b', marginBottom: '16px' }}>
                  {formatPrice(quickViewProduct.price)}
                </div>
                <p style={{ fontSize: '13px', lineHeight: 1.6, color: '#736b68', marginBottom: '20px' }}>
                  {quickViewProduct.description}
                </p>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    className="dtspa-btn-primary"
                    style={{ flex: 1, justifyContent: 'center' }}
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
                      border: '1px solid #ede1d3',
                      background: '#fff',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    title="Toggle Wishlist"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill={wishlist.includes(quickViewProduct.id) ? '#e2a03f' : 'none'} stroke={wishlist.includes(quickViewProduct.id) ? '#e2a03f' : '#736b68'} strokeWidth="2">
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
        brandName="Dt-Spalab"
        accentColor={customAccentColor || '#56236b'}
        currencyPrefix={currency === 'INR' ? '₹' : '$'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
        products={DTSPALAB_PRODUCTS.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category,
          rating: p.rating,
        }))}
        onAddToCart={(prod) => {
          const matched = DTSPALAB_PRODUCTS.find((p) => p.id === prod.id)
          if (matched) handleAddToCart(matched)
        }}
        onViewProduct={(prod) => {
          const matched = DTSPALAB_PRODUCTS.find((p) => p.id === prod.id)
          if (matched) setQuickViewProduct(matched)
        }}
      />

      <StorefrontWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        onToggleWishlist={toggleWishlist}
        brandName="Dt-Spalab"
        accentColor={customAccentColor || '#56236b'}
        currencyPrefix={currency === 'INR' ? '₹' : '$'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
        products={DTSPALAB_PRODUCTS.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category,
          rating: p.rating,
        }))}
        onAddToCart={(prod) => {
          const matched = DTSPALAB_PRODUCTS.find((p) => p.id === prod.id)
          if (matched) handleAddToCart(matched)
        }}
        onViewProduct={(prod) => {
          const matched = DTSPALAB_PRODUCTS.find((p) => p.id === prod.id)
          if (matched) setQuickViewProduct(matched)
        }}
      />

      <StorefrontAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        brandName="Dt-Spalab"
        accentColor={customAccentColor || '#56236b'}
      />

      <StorefrontMobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        items={navItems}
        brandName="Dt-Spalab"
        accentColor={customAccentColor || '#56236b'}
        contactEmail="support@dtspalab.com"
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        wishlistCount={wishlist.length}
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

