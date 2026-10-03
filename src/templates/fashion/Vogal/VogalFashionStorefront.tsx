import React, { useState, useEffect, useMemo } from 'react'
import type {
  VogalProduct,
  VogalCategoryType,
  VogalCartItem,
  VogalHotspotPin,
  VogalStorefrontProps,
} from './types'
import {
  VOGAL_PRODUCTS,
  VOGAL_CATEGORY_CARDS,
  VOGAL_HOTSPOTS,
  VOGAL_PROMO_BANNERS,
  VOGAL_TESTIMONIALS,
  VOGAL_MARQUEE_ITEMS,
  VOGAL_INSTAGRAM_POSTS,
  VOGAL_TRUST_BADGES,
  VOGAL_NAV_ITEMS,
  VOGAL_MEGA_MENU,
  VOGAL_SIZES,
} from './data/vogalData'
import './styles/vogalFashion.css'

export const VogalFashionStorefront: React.FC<VogalStorefrontProps> = ({
  template: _template,
  device = 'desktop',
  deviceView,
  customAccentColor,
  onUseTemplate: _onUseTemplate,
  onClose: _onClose,
  onBack: _onBack,
}) => {
  const effectiveDevice = deviceView || device || 'desktop'
  const isMobile = effectiveDevice === 'mobile'

  // View mode
  const [viewMode, setViewMode] = useState<'home' | 'collection' | 'product'>('home')
  const [selectedCategory, setSelectedCategory] = useState<VogalCategoryType>('All')
  const [selectedProductId, setSelectedProductId] = useState<string>(VOGAL_PRODUCTS[0].id)

  // Homepage tabs
  const [activeTab, setActiveTab] = useState<'trending' | 'new' | 'bestsellers' | 'sale'>('trending')

  // Modals & Drawers
  const [cartOpen, setCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<VogalProduct | null>(null)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)

  // Commerce State
  const [cartItems, setCartItems] = useState<VogalCartItem[]>([
    {
      product: VOGAL_PRODUCTS[0], // Signature Oversized Bomber
      size: 'L',
      color: 'Pitch Black',
      quantity: 1,
    },
    {
      product: VOGAL_PRODUCTS[4], // Raw Selvedge Carpenter Denim
      size: '32',
      color: 'Deep Indigo Selvedge',
      quantity: 1,
    },
  ])
  const [wishlist, setWishlist] = useState<string[]>([VOGAL_PRODUCTS[1].id, VOGAL_PRODUCTS[2].id])
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Shop the look pin
  const [activePin, setActivePin] = useState<VogalHotspotPin | null>(null)

  // Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)

  // Collection Filters & Sort
  const [collectionSort, setCollectionSort] = useState<'popular' | 'price-low' | 'price-high' | 'rating' | 'newest'>('popular')
  const [filterGender, setFilterGender] = useState<'All' | 'Women' | 'Men' | 'Unisex'>('All')
  const [filterPriceMax, setFilterPriceMax] = useState<number>(20000)
  const [filterSize, setFilterSize] = useState<string>('All')
  const [filterOnlySale, setFilterOnlySale] = useState(false)

  // Active PDP product
  const activeProduct = useMemo(() => {
    return VOGAL_PRODUCTS.find((p) => p.id === selectedProductId) || VOGAL_PRODUCTS[0]
  }, [selectedProductId])

  const [pdpImage, setPdpImage] = useState<string>(activeProduct.gallery[0] || activeProduct.image)
  const [pdpColor, setPdpColor] = useState<string>(activeProduct.colors[0]?.name || '')
  const [pdpSize, setPdpSize] = useState<string>(activeProduct.sizes[0] || 'M')
  const [pdpQuantity, setPdpQuantity] = useState<number>(1)
  const [pdpAccordions, setPdpAccordions] = useState({ details: true, materials: false, shipping: false })

  // Quick view state
  const [qvColor, setQvColor] = useState<string>('')
  const [qvSize, setQvSize] = useState<string>('')

  // Update PDP state when product changes
  useEffect(() => {
    setPdpImage(activeProduct.gallery[0] || activeProduct.image)
    setPdpColor(activeProduct.colors[0]?.name || '')
    setPdpSize(activeProduct.sizes[0] || 'M')
    setPdpQuantity(1)
  }, [activeProduct])

  // Countdown Timer for Deal of the Week
  const [timer, setTimer] = useState({ days: 3, hours: 18, minutes: 42, seconds: 15 })
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        if (prev.days > 0) return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        return { days: 3, hours: 23, minutes: 59, seconds: 59 }
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Cart operations
  const addToCart = (product: VogalProduct, size: string, color: string, qty = 1) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.product.id === product.id && i.size === size && i.color === color
      )
      if (idx > -1) {
        const copy = [...prev]
        copy[idx].quantity += qty
        return copy
      }
      return [...prev, { product, size, color, quantity: qty }]
    })
    triggerToast(`Added "${product.name}" (${size}) to bag`)
  }

  const updateCartQty = (idx: number, qty: number) => {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((_, i) => i !== idx))
    } else {
      setCartItems((prev) => {
        const next = [...prev]
        next[idx].quantity = qty
        return next
      })
    }
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId)
      if (exists) {
        triggerToast('Removed from wishlist')
        return prev.filter((id) => id !== productId)
      } else {
        triggerToast('Saved to wishlist')
        return [...prev, productId]
      }
    })
  }

  // Cart Subtotal & Free Shipping
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, i) => acc + (i.product.salePrice || i.product.price) * i.quantity, 0)
  }, [cartItems])

  const freeShippingGoal = 2999
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingGoal) * 100))
  const freeShippingRemaining = freeShippingGoal - cartSubtotal

  const openProduct = (productId: string) => {
    setSelectedProductId(productId)
    setViewMode('product')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openCollection = (cat: VogalCategoryType = 'All') => {
    setSelectedCategory(cat)
    setViewMode('collection')
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Filtered homepage tab products
  const tabProducts = useMemo(() => {
    if (activeTab === 'new') return VOGAL_PRODUCTS.filter((p) => p.isNew).slice(0, 8)
    if (activeTab === 'bestsellers') return VOGAL_PRODUCTS.filter((p) => p.isFeatured).slice(0, 8)
    if (activeTab === 'sale') return VOGAL_PRODUCTS.filter((p) => p.isSale).slice(0, 8)
    return VOGAL_PRODUCTS.filter((p) => p.isTrending).slice(0, 8)
  }, [activeTab])

  // Collection Products
  const collectionProducts = useMemo(() => {
    let list = [...VOGAL_PRODUCTS]

    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Sale') {
        list = list.filter((p) => p.isSale)
      } else {
        list = list.filter((p) => p.category === selectedCategory)
      }
    }

    if (filterGender !== 'All') {
      list = list.filter((p) => p.gender === filterGender || p.gender === 'Unisex')
    }

    list = list.filter((p) => (p.salePrice || p.price) <= filterPriceMax)

    if (filterOnlySale) {
      list = list.filter((p) => p.isSale)
    }

    if (filterSize !== 'All') {
      list = list.filter((p) => p.sizes.includes(filterSize))
    }

    if (collectionSort === 'price-low') {
      list.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
    } else if (collectionSort === 'price-high') {
      list.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
    } else if (collectionSort === 'rating') {
      list.sort((a, b) => b.rating - a.rating)
    } else if (collectionSort === 'newest') {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    }

    return list
  }, [selectedCategory, filterGender, filterPriceMax, filterOnlySale, filterSize, collectionSort])

  // Live search
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return VOGAL_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    )
  }, [searchQuery])

  // Frequently Bought Together combo
  const fbtCombo = useMemo(() => {
    const others = VOGAL_PRODUCTS.filter((p) => p.id !== activeProduct.id)
    return [activeProduct, others[0] || VOGAL_PRODUCTS[1], others[1] || VOGAL_PRODUCTS[2]]
  }, [activeProduct])

  const fbtTotal = useMemo(() => {
    return fbtCombo.reduce((acc, p) => acc + (p.salePrice || p.price), 0)
  }, [fbtCombo])

  const handleOpenQuickView = (p: VogalProduct) => {
    setQuickViewProduct(p)
    setQvColor(p.colors[0]?.name || '')
    setQvSize(p.sizes[0] || 'M')
  }

  return (
    <div
      className={`vogal-theme-root device-${effectiveDevice}`}
      style={{
        ...(customAccentColor ? ({ '--vogal-accent': customAccentColor } as React.CSSProperties) : {}),
      }}
    >
      {/* Toast Alert */}
      {toastMessage && <div className="vogal-toast">{toastMessage}</div>}

      {/* 1. SCROLLING MARQUEE TICKER */}
      <div className="vogal-top-bar">
        <div className="vogal-marquee-track">
          {VOGAL_MARQUEE_ITEMS.concat(VOGAL_MARQUEE_ITEMS).map((item, idx) => (
            <span key={idx} className="vogal-marquee-item">
              <span>{item}</span>
              <span className="vogal-marquee-dot">•</span>
            </span>
          ))}
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="vogal-header">
        <div className="vogal-header-inner">
          {/* Mobile Hamburger */}
          <button
            type="button"
            className="vogal-mobile-hamburger"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Logo */}
          <div
            className="vogal-logo"
            onClick={() => {
              setViewMode('home')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <h1>VOGAL</h1>
            <span className="vogal-logo-tagline">CONTEMPORARY ATELIER</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="vogal-desktop-nav">
            {VOGAL_NAV_ITEMS.map((cat) => {
              const hasMega = Boolean(VOGAL_MEGA_MENU[cat])
              return (
                <div
                  key={cat}
                  className="vogal-nav-wrapper"
                  onMouseEnter={() => hasMega && setActiveMegaMenu(cat)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <button
                    type="button"
                    className={`vogal-nav-link ${
                      viewMode === 'collection' && selectedCategory === cat ? 'is-active' : ''
                    }`}
                    onClick={() => openCollection(cat as VogalCategoryType)}
                  >
                    {cat}
                    {cat === 'Sale' && <span className="vogal-badge-sale-pill">HOT</span>}
                  </button>

                  {/* Mega Menu */}
                  {hasMega && activeMegaMenu === cat && (
                    <div className="vogal-mega-dropdown">
                      <div className="vogal-mega-grid">
                        {VOGAL_MEGA_MENU[cat].groups.map((grp, gIdx) => (
                          <div key={gIdx} className="vogal-mega-col">
                            <h4>{grp.heading}</h4>
                            <ul>
                              {grp.links.map((link, lIdx) => (
                                <li key={lIdx}>
                                  <a
                                    href="#category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      setActiveMegaMenu(null)
                                      openCollection(cat as VogalCategoryType)
                                    }}
                                  >
                                    {link}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        <div className="vogal-mega-featured-card">
                          <img
                            src={VOGAL_MEGA_MENU[cat].featuredImage}
                            alt={VOGAL_MEGA_MENU[cat].featuredTitle}
                          />
                          <div className="vogal-mega-featured-overlay">
                            <span>{VOGAL_MEGA_MENU[cat].featuredBadge}</span>
                            <h5>{VOGAL_MEGA_MENU[cat].featuredTitle}</h5>
                            <button
                              type="button"
                              onClick={() => {
                                setActiveMegaMenu(null)
                                openCollection(cat as VogalCategoryType)
                              }}
                            >
                              {VOGAL_MEGA_MENU[cat].featuredCta}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Action Icons */}
          <div className="vogal-header-actions">
            <button
              type="button"
              className="vogal-icon-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <button
              type="button"
              className="vogal-icon-btn"
              onClick={() => {
                openCollection('Outerwear')
                triggerToast(`Wishlist contains ${wishlist.length} item(s)`)
              }}
              aria-label="Wishlist"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlist.length > 0 && <span className="vogal-icon-badge">{wishlist.length}</span>}
            </button>

            <button
              type="button"
              className="vogal-icon-btn"
              onClick={() => setCartOpen(true)}
              aria-label="Cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              <span className="vogal-icon-badge">
                {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="vogal-cart-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="vogal-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="vogal-cart-header">
              <h3>VOGAL ATELIER</h3>
              <button
                type="button"
                className="vogal-icon-btn"
                onClick={() => setMobileMenuOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="vogal-cart-items-scroll">
              {VOGAL_NAV_ITEMS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  style={{
                    padding: '16px 0',
                    borderBottom: '1px solid #f4f4f5',
                    fontSize: '1.1rem',
                    fontWeight: 800,
                    textAlign: 'left',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                  onClick={() => openCollection(cat as VogalCategoryType)}
                >
                  <span>{cat}</span>
                  <span>→</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SEARCH MODAL */}
      {searchOpen && (
        <div className="vogal-modal-overlay" onClick={() => setSearchOpen(false)}>
          <div className="vogal-modal-card" onClick={(e) => e.stopPropagation()} style={{ padding: '32px' }}>
            <button
              type="button"
              className="vogal-modal-close-btn"
              onClick={() => setSearchOpen(false)}
            >
              ✕
            </button>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <input
                type="text"
                placeholder="Search bombers, blazers, raw selvedge, hoodies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                style={{
                  width: '100%',
                  padding: '14px 18px',
                  border: '1.5px solid #e4e4e7',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  outline: 'none',
                }}
              />
            </div>
            {searchQuery && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {searchResults.slice(0, 4).map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      cursor: 'pointer',
                      padding: '8px',
                      border: '1px solid #f4f4f5',
                      borderRadius: '4px',
                    }}
                    onClick={() => {
                      setSearchOpen(false)
                      openProduct(p.id)
                    }}
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      style={{ width: '60px', height: '75px', objectFit: 'cover' }}
                    />
                    <div>
                      <h4 style={{ fontSize: '0.88rem', fontWeight: 700 }}>{p.name}</h4>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>
                        ₹{(p.salePrice || p.price).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW MODE 1: HOMEPAGE
         ========================================================================= */}
      {viewMode === 'home' && (
        <main>
          {/* SECTION 1: DYNAMIC HERO */}
          <section className="vogal-hero">
            <div className="vogal-hero-bg">
              <img
                src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1800&auto=format&fit=crop&q=85"
                alt="Vogal Modern Collection"
              />
              <div className="vogal-hero-gradient"></div>
            </div>
            <div className="vogal-hero-content">
              <span className="vogal-hero-eyebrow">
                <span>✦ AUTUMN / WINTER 2026 EDITION</span>
              </span>
              <h2 className="vogal-hero-title">
                Defining Modern Silhouettes.
              </h2>
              <p className="vogal-hero-desc">
                High-density Japanese memory nylon, Kurabo raw selvedge, and deconstructed Italian
                wool tailoring engineered for the modern metropolis.
              </p>
              <div className="vogal-hero-actions">
                <button
                  type="button"
                  className="vogal-btn-primary"
                  onClick={() => openCollection('Women')}
                >
                  SHOP WOMEN
                </button>
                <button
                  type="button"
                  className="vogal-btn-secondary"
                  onClick={() => openCollection('Men')}
                >
                  SHOP MEN
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 2: CIRCULAR CATEGORY PILLS */}
          <section className="vogal-categories-bar">
            <div className="vogal-categories-grid">
              {VOGAL_CATEGORY_CARDS.map((cat) => (
                <div
                  key={cat.id}
                  className="vogal-cat-card"
                  onClick={() => openCollection(cat.slug)}
                >
                  <div className="vogal-cat-avatar-wrap">
                    <img src={cat.image} alt={cat.name} loading="lazy" />
                  </div>
                  <span className="vogal-cat-name">{cat.name}</span>
                  <span className="vogal-cat-count">{cat.itemCount}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: TABBED FEATURED COLLECTION */}
          <section className="vogal-section">
            <div className="vogal-section-header">
              <span className="vogal-section-subtitle">DISCOVER THE DROPS</span>
              <h2 className="vogal-section-title">The Definitive Collection</h2>
            </div>

            {/* Filter Tabs */}
            <div className="vogal-tabs-bar">
              <button
                type="button"
                className={`vogal-tab-btn ${activeTab === 'trending' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('trending')}
              >
                Trending Now
              </button>
              <button
                type="button"
                className={`vogal-tab-btn ${activeTab === 'new' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('new')}
              >
                New Releases
              </button>
              <button
                type="button"
                className={`vogal-tab-btn ${activeTab === 'bestsellers' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('bestsellers')}
              >
                Best Sellers
              </button>
              <button
                type="button"
                className={`vogal-tab-btn ${activeTab === 'sale' ? 'is-active' : ''}`}
                onClick={() => setActiveTab('sale')}
              >
                Private Sale
              </button>
            </div>

            {/* Product Cards */}
            <div className="vogal-product-grid">
              {tabProducts.map((p) => (
                <div key={p.id} className="vogal-product-card">
                  <div className="vogal-card-image-wrap" onClick={() => openProduct(p.id)}>
                    <img src={p.image} alt={p.name} className="vogal-card-img-primary" loading="lazy" />
                    <img src={p.alternateImage} alt={p.name} className="vogal-card-img-alt" loading="lazy" />

                    <div className="vogal-card-badges">
                      {p.badge && (
                        <span className={`vogal-badge ${p.badge.toLowerCase()}`}>
                          {p.badge}
                        </span>
                      )}
                    </div>

                    <button
                      type="button"
                      className={`vogal-card-wishlist ${wishlist.includes(p.id) ? 'is-active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWishlist(p.id)
                      }}
                      aria-label="Wishlist"
                    >
                      ♥
                    </button>

                    <button
                      type="button"
                      className="vogal-card-quickview-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenQuickView(p)
                      }}
                    >
                      Quick View
                    </button>
                  </div>

                  <div className="vogal-card-info">
                    <span className="vogal-card-category">{p.category}</span>
                    <h3 className="vogal-card-title" onClick={() => openProduct(p.id)}>
                      {p.name}
                    </h3>
                    <div className="vogal-card-prices">
                      <span className="vogal-price-current">
                        ₹{(p.salePrice || p.price).toLocaleString()}
                      </span>
                      {p.salePrice && (
                        <span className="vogal-price-orig">₹{p.price.toLocaleString()}</span>
                      )}
                    </div>

                    {/* Color Dots */}
                    <div className="vogal-card-swatches">
                      {p.colors.map((c, cIdx) => (
                        <span
                          key={cIdx}
                          className="vogal-swatch-dot"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>

                    <button
                      type="button"
                      className="vogal-card-quickadd"
                      onClick={() =>
                        addToCart(p, p.sizes[0] || 'M', p.colors[0]?.name || 'Standard')
                      }
                    >
                      + Quick Add
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: SPLIT EDITORIAL PROMO BANNERS */}
          <section className="vogal-split-banners">
            <div className="vogal-split-grid">
              {VOGAL_PROMO_BANNERS.map((banner) => (
                <div
                  key={banner.id}
                  className="vogal-promo-card"
                  onClick={() => openCollection(banner.linkCategory)}
                >
                  <img src={banner.image} alt={banner.title} loading="lazy" />
                  <div className="vogal-promo-overlay">
                    <span className="vogal-promo-sub">{banner.subtitle}</span>
                    <h3 className="vogal-promo-heading">{banner.title}</h3>
                    <p className="vogal-promo-desc">{banner.description}</p>
                    <button type="button" className="vogal-btn-primary">
                      {banner.buttonText} →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 5: SHOP THE LOOK (HOTSPOT OUTFIT PINS) */}
          <section className="vogal-stl-section">
            <div className="vogal-stl-container">
              <div className="vogal-stl-image-wrap">
                <img
                  src="https://images.unsplash.com/photo-1551028719-00167b16eac5?w=1200&auto=format&fit=crop&q=85"
                  alt="Shop the full outfit look"
                />

                {/* Hotspot Pins */}
                {VOGAL_HOTSPOTS.map((pin) => (
                  <div
                    key={pin.id}
                    className={`vogal-pin ${activePin?.id === pin.id ? 'is-active' : ''}`}
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    onMouseEnter={() => setActivePin(pin)}
                    onClick={() => setActivePin(pin)}
                  >
                    <span className="vogal-pin-pulse"></span>
                    <span>+</span>
                  </div>
                ))}

                {/* Pin Popover */}
                {activePin && (
                  <div
                    className="vogal-pin-popover"
                    style={{
                      left: `clamp(12px, ${activePin.x}%, calc(100% - 240px))`,
                      top: `clamp(12px, ${activePin.y - 10}%, calc(100% - 110px))`,
                    }}
                  >
                    <img src={activePin.image} alt={activePin.title} />
                    <div className="vogal-pin-popover-info">
                      <h5>{activePin.title}</h5>
                      <span>₹{(activePin.salePrice || activePin.price).toLocaleString()}</span>
                      <button
                        type="button"
                        onClick={() => openProduct(activePin.productId)}
                      >
                        View Piece →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Side Look Items List */}
              <div className="vogal-stl-sidebar">
                <h3>Shop The Complete Look</h3>
                <p>
                  Curated runway styling engineered from Japanese technical outerwear and raw indigo
                  selvedge. Tap the pins or select below.
                </p>
                <div className="vogal-stl-items-list">
                  {VOGAL_HOTSPOTS.map((pin) => (
                    <div
                      key={pin.id}
                      className="vogal-stl-item-row"
                      onClick={() => openProduct(pin.productId)}
                    >
                      <img src={pin.image} alt={pin.title} />
                      <div className="vogal-stl-item-meta">
                        <h4>{pin.title}</h4>
                        <span>₹{(pin.salePrice || pin.price).toLocaleString()}</span>
                      </div>
                      <button type="button" className="vogal-btn-dark" style={{ padding: '8px 16px', fontSize: '0.75rem' }}>
                        VIEW
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 6: DEAL OF THE WEEK (COUNTDOWN) */}
          <section className="vogal-countdown-banner">
            <div className="vogal-countdown-inner">
              <div className="vogal-countdown-copy">
                <span className="eyebrow">LIMITED ATELIER PROMOTION</span>
                <h2>Deal of the Week: Technical Trench & Bomber Edit</h2>
                <p>
                  Claim up to 30% off selected Japanese memory outerwear and tailoring garments.
                  Expires once the countdown ends.
                </p>

                <div className="vogal-timer-grid">
                  <div className="vogal-timer-box">
                    <span className="vogal-timer-num">{timer.days}</span>
                    <span className="vogal-timer-label">Days</span>
                  </div>
                  <span className="vogal-timer-sep">:</span>
                  <div className="vogal-timer-box">
                    <span className="vogal-timer-num">{String(timer.hours).padStart(2, '0')}</span>
                    <span className="vogal-timer-label">Hours</span>
                  </div>
                  <span className="vogal-timer-sep">:</span>
                  <div className="vogal-timer-box">
                    <span className="vogal-timer-num">{String(timer.minutes).padStart(2, '0')}</span>
                    <span className="vogal-timer-label">Mins</span>
                  </div>
                  <span className="vogal-timer-sep">:</span>
                  <div className="vogal-timer-box">
                    <span className="vogal-timer-num">{String(timer.seconds).padStart(2, '0')}</span>
                    <span className="vogal-timer-label">Secs</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="vogal-btn-primary"
                  onClick={() => openCollection('Sale')}
                >
                  SHOP SALE DROPS
                </button>
              </div>

              <div className="vogal-countdown-media">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1000&auto=format&fit=crop&q=85"
                  alt="Deal of the week collection"
                />
              </div>
            </div>
          </section>

          {/* SECTION 7: REVIEWS & CLIENT PRAISE */}
          <section className="vogal-section">
            <div className="vogal-section-header">
              <span className="vogal-section-subtitle">TESTED BY STYLISTS</span>
              <h2 className="vogal-section-title">Verified Customer Voices</h2>
            </div>
            <div className="vogal-testimonials-grid">
              {VOGAL_TESTIMONIALS.map((t) => (
                <div key={t.id} className="vogal-test-card">
                  <div>
                    <div className="vogal-test-stars">★★★★★</div>
                    <p className="vogal-test-quote">&ldquo;{t.quote}&rdquo;</p>
                  </div>
                  <div className="vogal-test-author">
                    <img src={t.avatar} alt={t.author} />
                    <div className="vogal-test-author-info">
                      <h4>{t.author}</h4>
                      <span>{t.role} • {t.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 8: INSTAGRAM COMMUNITY GRID */}
          <section className="vogal-section" style={{ paddingBottom: '32px' }}>
            <div className="vogal-section-header">
              <span className="vogal-section-subtitle">#VOGALATELIER</span>
              <h2 className="vogal-section-title">Follow Us on Instagram</h2>
            </div>
            <div className="vogal-insta-grid">
              {VOGAL_INSTAGRAM_POSTS.map((p) => (
                <div key={p.id} className="vogal-insta-tile">
                  <img src={p.image} alt="Vogal community style" loading="lazy" />
                  <div className="vogal-insta-overlay">
                    <span>♥ {p.likes}</span>
                    <span className="handle">{p.handle}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 9: TRUST BADGES */}
          <div className="vogal-trust-strip">
            <div className="vogal-trust-grid">
              {VOGAL_TRUST_BADGES.map((b, idx) => (
                <div key={idx} className="vogal-trust-item">
                  <div className="vogal-trust-icon">{b.icon}</div>
                  <div className="vogal-trust-text">
                    <h4>{b.title}</h4>
                    <p>{b.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SECTION 10: VIP NEWSLETTER CLUB */}
          <section className="vogal-newsletter-section">
            <div className="vogal-newsletter-card">
              <span className="vogal-section-subtitle">VIP ACCESS PASS</span>
              <h2>Unlock 15% Off Your Inaugural Order</h2>
              <p>
                Join the Vogal Concierge Club to receive early runway access, private showroom drops,
                and invitation-only trunk shows.
              </p>
              {newsletterSubscribed ? (
                <div className="vogal-nl-success">
                  ✓ Welcome! Your exclusive 15% VIP discount code is <strong>VOGAL15</strong>
                </div>
              ) : (
                <form
                  className="vogal-nl-form"
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (newsletterEmail.trim()) {
                      setNewsletterSubscribed(true)
                      triggerToast('Welcome to Vogal! Code: VOGAL15')
                    }
                  }}
                >
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="vogal-btn-dark">
                    SUBSCRIBE
                  </button>
                </form>
              )}
            </div>
          </section>
        </main>
      )}

      {/* =========================================================================
          VIEW MODE 2: COLLECTION LISTING PAGE
         ========================================================================= */}
      {viewMode === 'collection' && (
        <main className="vogal-collection-page">
          <div className="vogal-collection-banner">
            <div className="vogal-breadcrumb" style={{ justifyContent: 'center' }}>
              <span onClick={() => setViewMode('home')}>Home</span>
              <span>/</span>
              <span className="curr">{selectedCategory}</span>
            </div>
            <h1>{selectedCategory === 'All' ? 'Complete Collection' : selectedCategory}</h1>
            <p>Displaying {collectionProducts.length} contemporary pieces</p>
          </div>

          <div className="vogal-collection-layout">
            {/* Filter Sidebar */}
            <aside className="vogal-filters-sidebar">
              <div className="vogal-filter-group">
                <h4>Category</h4>
                <div className="vogal-filter-list">
                  {VOGAL_NAV_ITEMS.concat('All').map((cat) => (
                    <label key={cat} className="vogal-filter-label">
                      <input
                        type="radio"
                        name="collectionCategory"
                        checked={selectedCategory === cat}
                        onChange={() => setSelectedCategory(cat as VogalCategoryType)}
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="vogal-filter-group">
                <h4>Gender</h4>
                <div className="vogal-filter-list">
                  {(['All', 'Women', 'Men', 'Unisex'] as const).map((g) => (
                    <label key={g} className="vogal-filter-label">
                      <input
                        type="radio"
                        name="collectionGender"
                        checked={filterGender === g}
                        onChange={() => setFilterGender(g)}
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="vogal-filter-group">
                <h4>Max Price: ₹{filterPriceMax.toLocaleString()}</h4>
                <input
                  type="range"
                  min="2000"
                  max="20000"
                  step="1000"
                  value={filterPriceMax}
                  onChange={(e) => setFilterPriceMax(Number(e.target.value))}
                  className="vogal-price-range"
                />
              </div>

              <div className="vogal-filter-group">
                <h4>Size</h4>
                <div className="vogal-size-pills-wrap">
                  {['All', ...VOGAL_SIZES].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      className={`vogal-filter-size-btn ${filterSize === sz ? 'is-active' : ''}`}
                      onClick={() => setFilterSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div className="vogal-filter-group">
                <label className="vogal-filter-label">
                  <input
                    type="checkbox"
                    checked={filterOnlySale}
                    onChange={(e) => setFilterOnlySale(e.target.checked)}
                  />
                  <span>On Sale Only</span>
                </label>
              </div>

              <button
                type="button"
                className="vogal-btn-dark"
                style={{ width: '100%', padding: '12px', fontSize: '0.8rem' }}
                onClick={() => {
                  setSelectedCategory('All')
                  setFilterGender('All')
                  setFilterPriceMax(20000)
                  setFilterSize('All')
                  setFilterOnlySale(false)
                }}
              >
                Reset Filters
              </button>
            </aside>

            {/* Products Main Area */}
            <div>
              <div className="vogal-collection-toolbar">
                <span>Showing {collectionProducts.length} pieces</span>
                <select
                  className="vogal-sort-select"
                  value={collectionSort}
                  onChange={(e) => setCollectionSort(e.target.value as any)}
                >
                  <option value="popular">Most Popular</option>
                  <option value="newest">Newest Drops</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              <div className="vogal-product-grid">
                {collectionProducts.map((p) => (
                  <div key={p.id} className="vogal-product-card">
                    <div className="vogal-card-image-wrap" onClick={() => openProduct(p.id)}>
                      <img src={p.image} alt={p.name} className="vogal-card-img-primary" loading="lazy" />
                      <img src={p.alternateImage} alt={p.name} className="vogal-card-img-alt" loading="lazy" />

                      <div className="vogal-card-badges">
                        {p.badge && (
                          <span className={`vogal-badge ${p.badge.toLowerCase()}`}>
                            {p.badge}
                          </span>
                        )}
                      </div>

                      <button
                        type="button"
                        className={`vogal-card-wishlist ${wishlist.includes(p.id) ? 'is-active' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWishlist(p.id)
                        }}
                        aria-label="Wishlist"
                      >
                        ♥
                      </button>

                      <button
                        type="button"
                        className="vogal-card-quickview-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenQuickView(p)
                        }}
                      >
                        Quick View
                      </button>
                    </div>

                    <div className="vogal-card-info">
                      <span className="vogal-card-category">{p.category}</span>
                      <h3 className="vogal-card-title" onClick={() => openProduct(p.id)}>
                        {p.name}
                      </h3>
                      <div className="vogal-card-prices">
                        <span className="vogal-price-current">
                          ₹{(p.salePrice || p.price).toLocaleString()}
                        </span>
                        {p.salePrice && (
                          <span className="vogal-price-orig">₹{p.price.toLocaleString()}</span>
                        )}
                      </div>
                      <div className="vogal-card-swatches">
                        {p.colors.map((c, cIdx) => (
                          <span
                            key={cIdx}
                            className="vogal-swatch-dot"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                      <button
                        type="button"
                        className="vogal-card-quickadd"
                        onClick={() =>
                          addToCart(p, p.sizes[0] || 'M', p.colors[0]?.name || 'Standard')
                        }
                      >
                        + Quick Add
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          VIEW MODE 3: PRODUCT DETAIL PAGE (PDP)
         ========================================================================= */}
      {viewMode === 'product' && (
        <main className="vogal-pdp-view">
          <div className="vogal-breadcrumb">
            <span onClick={() => setViewMode('home')}>Home</span>
            <span>/</span>
            <span onClick={() => openCollection(activeProduct.category)}>{activeProduct.category}</span>
            <span>/</span>
            <span className="curr">{activeProduct.name}</span>
          </div>

          <div className="vogal-pdp-layout">
            {/* Gallery */}
            <div className="vogal-pdp-gallery">
              <div className="vogal-pdp-thumbs">
                {activeProduct.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`vogal-pdp-thumb-btn ${pdpImage === img ? 'is-active' : ''}`}
                    onClick={() => setPdpImage(img)}
                  >
                    <img src={img} alt="Thumbnail" />
                  </button>
                ))}
              </div>
              <div className="vogal-pdp-main-img-wrap">
                <img src={pdpImage} alt={activeProduct.name} />
              </div>
            </div>

            {/* Buying Details */}
            <div className="vogal-pdp-info">
              <span className="vogal-pdp-cat">
                {activeProduct.category} • {activeProduct.gender}
              </span>
              <h1 className="vogal-pdp-title">{activeProduct.name}</h1>
              <div className="vogal-pdp-reviews-row">
                <span style={{ color: '#f59e0b' }}>★★★★★</span>
                <strong>{activeProduct.rating} / 5.0</strong>
                <span>({activeProduct.reviewCount} verified reviews)</span>
                <span>• SKU: {activeProduct.sku}</span>
              </div>

              <div className="vogal-pdp-price-row">
                <span className="vogal-pdp-price-main">
                  ₹{(activeProduct.salePrice || activeProduct.price).toLocaleString()}
                </span>
                {activeProduct.salePrice && (
                  <span className="vogal-pdp-price-compare">
                    ₹{activeProduct.price.toLocaleString()}
                  </span>
                )}
              </div>

              <p className="vogal-pdp-desc">{activeProduct.description}</p>

              {/* Color selection */}
              <div>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                  COLOR: <strong>{pdpColor}</strong>
                </span>
                <div className="vogal-pdp-swatches-row">
                  {activeProduct.colors.map((c, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`vogal-pdp-swatch-btn ${pdpColor === c.name ? 'is-active' : ''}`}
                      style={{ backgroundColor: c.hex }}
                      onClick={() => setPdpColor(c.name)}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size selection */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 700 }}>SIZE:</span>
                  <button
                    type="button"
                    onClick={() => setSizeGuideOpen(true)}
                    style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--vogal-accent)', textDecoration: 'underline' }}
                  >
                    📏 Size Guide & Fit
                  </button>
                </div>
                <div className="vogal-pdp-sizes-row">
                  {activeProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      className={`vogal-pdp-size-pill ${pdpSize === sz ? 'is-active' : ''}`}
                      onClick={() => setPdpSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="vogal-pdp-atc-row">
                <div className="vogal-qty-stepper">
                  <button
                    type="button"
                    onClick={() => setPdpQuantity((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <span>{pdpQuantity}</span>
                  <button
                    type="button"
                    onClick={() => setPdpQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="vogal-btn-dark vogal-pdp-atc-btn"
                  onClick={() => addToCart(activeProduct, pdpSize, pdpColor, pdpQuantity)}
                >
                  ADD TO BAG • ₹{((activeProduct.salePrice || activeProduct.price) * pdpQuantity).toLocaleString()}
                </button>

                <button
                  type="button"
                  className={`vogal-pdp-wishlist-btn ${wishlist.includes(activeProduct.id) ? 'is-active' : ''}`}
                  onClick={() => toggleWishlist(activeProduct.id)}
                  aria-label="Wishlist"
                >
                  ♥
                </button>
              </div>

              <button
                type="button"
                className="vogal-btn-primary"
                style={{ width: '100%', backgroundColor: 'var(--vogal-primary)', color: '#ffffff' }}
                onClick={() => {
                  addToCart(activeProduct, pdpSize, pdpColor, pdpQuantity)
                  setCartOpen(true)
                }}
              >
                BUY IT NOW
              </button>

              {/* Accordions */}
              <div className="vogal-accordion-block">
                <div className="vogal-acc-item">
                  <button
                    type="button"
                    className="vogal-acc-btn"
                    onClick={() =>
                      setPdpAccordions((prev) => ({ ...prev, details: !prev.details }))
                    }
                  >
                    <span>Garment Details & Construction</span>
                    <span>{pdpAccordions.details ? '−' : '+'}</span>
                  </button>
                  {pdpAccordions.details && (
                    <div className="vogal-acc-body">
                      <ul>
                        {activeProduct.details.map((d, i) => (
                          <li key={i}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="vogal-acc-item">
                  <button
                    type="button"
                    className="vogal-acc-btn"
                    onClick={() =>
                      setPdpAccordions((prev) => ({ ...prev, materials: !prev.materials }))
                    }
                  >
                    <span>Fabrication & Care Instructions</span>
                    <span>{pdpAccordions.materials ? '−' : '+'}</span>
                  </button>
                  {pdpAccordions.materials && (
                    <div className="vogal-acc-body">
                      <p>{activeProduct.materialsAndCare}</p>
                    </div>
                  )}
                </div>

                <div className="vogal-acc-item">
                  <button
                    type="button"
                    className="vogal-acc-btn"
                    onClick={() =>
                      setPdpAccordions((prev) => ({ ...prev, shipping: !prev.shipping }))
                    }
                  >
                    <span>Tracked Shipping & Returns</span>
                    <span>{pdpAccordions.shipping ? '−' : '+'}</span>
                  </button>
                  {pdpAccordions.shipping && (
                    <div className="vogal-acc-body">
                      <p>{activeProduct.shippingAndReturns}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Frequently Bought Together Bundle */}
          <section className="vogal-fbt-wrap">
            <span className="vogal-section-subtitle">OUTFIT CURATION</span>
            <h2 className="vogal-section-title" style={{ fontSize: '2rem' }}>
              Frequently Curated Together
            </h2>
            <div className="vogal-fbt-flex">
              {fbtCombo.map((item, idx) => (
                <React.Fragment key={item.id}>
                  <div className="vogal-fbt-card" onClick={() => openProduct(item.id)}>
                    <img src={item.image} alt={item.name} />
                    <div>
                      <h4 style={{ fontSize: '0.88rem', fontWeight: 700 }}>{item.name}</h4>
                      <span style={{ fontSize: '0.85rem', fontWeight: 800 }}>
                        ₹{(item.salePrice || item.price).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  {idx < fbtCombo.length - 1 && (
                    <span style={{ fontSize: '1.4rem', fontWeight: 900 }}>+</span>
                  )}
                </React.Fragment>
              ))}

              <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
                <span style={{ display: 'block', fontSize: '0.85rem', color: '#71717a' }}>
                  Bundle Price:
                </span>
                <strong style={{ fontSize: '1.4rem', fontWeight: 900, display: 'block' }}>
                  ₹{fbtTotal.toLocaleString()}
                </strong>
                <button
                  type="button"
                  className="vogal-btn-dark"
                  style={{ marginTop: '8px', padding: '10px 24px', fontSize: '0.8rem' }}
                  onClick={() => {
                    fbtCombo.forEach((p) =>
                      addToCart(p, p.sizes[0] || 'M', p.colors[0]?.name || 'Standard', 1)
                    )
                    triggerToast('Added 3-piece look to bag!')
                  }}
                >
                  ADD 3-PIECE LOOK
                </button>
              </div>
            </div>
          </section>

          {/* Complementary recommendations */}
          <section className="vogal-section">
            <div className="vogal-section-header">
              <span className="vogal-section-subtitle">LOOKBOOK PICKS</span>
              <h2 className="vogal-section-title">You May Also Admire</h2>
            </div>
            <div className="vogal-product-grid">
              {VOGAL_PRODUCTS.filter((p) => p.id !== activeProduct.id && p.category === activeProduct.category)
                .slice(0, 4)
                .map((p) => (
                  <div key={p.id} className="vogal-product-card">
                    <div className="vogal-card-image-wrap" onClick={() => openProduct(p.id)}>
                      <img src={p.image} alt={p.name} className="vogal-card-img-primary" />
                      <img src={p.alternateImage} alt={p.name} className="vogal-card-img-alt" />
                    </div>
                    <div className="vogal-card-info">
                      <span className="vogal-card-category">{p.category}</span>
                      <h3 className="vogal-card-title" onClick={() => openProduct(p.id)}>
                        {p.name}
                      </h3>
                      <span className="vogal-price-current">
                        ₹{(p.salePrice || p.price).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </main>
      )}

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="vogal-modal-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="vogal-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="vogal-modal-close-btn"
              onClick={() => setQuickViewProduct(null)}
            >
              ✕
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
              <div style={{ aspectRatio: '3/4', background: '#f4f4f5' }}>
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <span className="vogal-card-category">{quickViewProduct.category}</span>
                <h2 style={{ fontSize: '1.6rem', fontWeight: 900 }}>{quickViewProduct.name}</h2>
                <div className="vogal-card-prices">
                  <span className="vogal-price-current">
                    ₹{(quickViewProduct.salePrice || quickViewProduct.price).toLocaleString()}
                  </span>
                  {quickViewProduct.salePrice && (
                    <span className="vogal-price-orig">
                      ₹{quickViewProduct.price.toLocaleString()}
                    </span>
                  )}
                </div>
                <p style={{ fontSize: '0.9rem', color: '#71717a' }}>{quickViewProduct.description}</p>

                <div className="vogal-pdp-sizes-row">
                  {quickViewProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      className={`vogal-pdp-size-pill ${qvSize === sz ? 'is-active' : ''}`}
                      onClick={() => setQvSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  <button
                    type="button"
                    className="vogal-btn-dark"
                    style={{ flex: 1 }}
                    onClick={() => {
                      addToCart(quickViewProduct, qvSize || quickViewProduct.sizes[0], qvColor || quickViewProduct.colors[0]?.name || 'Standard', 1)
                      setQuickViewProduct(null)
                    }}
                  >
                    ADD TO BAG
                  </button>
                  <button
                    type="button"
                    className="vogal-btn-secondary"
                    style={{ color: '#09090b', borderColor: '#09090b' }}
                    onClick={() => {
                      setQuickViewProduct(null)
                      openProduct(quickViewProduct.id)
                    }}
                  >
                    VIEW PDP →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SIZE GUIDE MODAL */}
      {sizeGuideOpen && (
        <div className="vogal-modal-overlay" onClick={() => setSizeGuideOpen(false)}>
          <div className="vogal-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="vogal-modal-close-btn"
              onClick={() => setSizeGuideOpen(false)}
            >
              ✕
            </button>
            <div className="vogal-size-table-wrap">
              <h2 style={{ fontFamily: 'var(--vogal-font-heading)', fontWeight: 900 }}>
                Vogal Size & Silhouette Guide
              </h2>
              <p style={{ color: '#71717a', fontSize: '0.9rem', marginTop: '6px' }}>
                All measurements are in inches. Garments cut with contemporary relaxed drape.
              </p>
              <table className="vogal-size-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Chest / Bust</th>
                    <th>Waist</th>
                    <th>Hips</th>
                    <th>Length</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>XS</strong></td>
                    <td>34 - 36&quot;</td>
                    <td>26 - 28&quot;</td>
                    <td>35 - 37&quot;</td>
                    <td>27&quot;</td>
                  </tr>
                  <tr>
                    <td><strong>S</strong></td>
                    <td>37 - 39&quot;</td>
                    <td>29 - 31&quot;</td>
                    <td>38 - 40&quot;</td>
                    <td>28&quot;</td>
                  </tr>
                  <tr>
                    <td><strong>M</strong></td>
                    <td>40 - 42&quot;</td>
                    <td>32 - 34&quot;</td>
                    <td>41 - 43&quot;</td>
                    <td>29&quot;</td>
                  </tr>
                  <tr>
                    <td><strong>L</strong></td>
                    <td>43 - 45&quot;</td>
                    <td>35 - 37&quot;</td>
                    <td>44 - 46&quot;</td>
                    <td>30&quot;</td>
                  </tr>
                  <tr>
                    <td><strong>XL</strong></td>
                    <td>46 - 48&quot;</td>
                    <td>38 - 40&quot;</td>
                    <td>47 - 49&quot;</td>
                    <td>31&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="vogal-cart-overlay" onClick={() => setCartOpen(false)}>
          <div className="vogal-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="vogal-cart-header">
              <h3>SHOPPING BAG ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</h3>
              <button
                type="button"
                className="vogal-icon-btn"
                onClick={() => setCartOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Free shipping goal bar */}
            <div className="vogal-cart-shipping-bar">
              {freeShippingRemaining > 0 ? (
                <p>
                  Add <strong>₹{freeShippingRemaining.toLocaleString()}</strong> more to claim{' '}
                  <strong>Free Express Courier</strong>
                </p>
              ) : (
                <p style={{ color: 'var(--vogal-accent)', fontWeight: 800 }}>
                  ✦ Free Express Courier Unlocked!
                </p>
              )}
              <div className="vogal-progress-track">
                <div
                  className="vogal-progress-fill"
                  style={{ width: `${freeShippingProgress}%` }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="vogal-cart-items-scroll">
              {cartItems.length === 0 ? (
                <p style={{ textAlign: 'center', color: '#71717a', padding: '40px 0' }}>
                  Your shopping bag is currently vacant.
                </p>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} className="vogal-cart-item-row">
                    <img src={item.product.image} alt={item.product.name} />
                    <div className="vogal-cart-item-info">
                      <div>
                        <h4 className="vogal-cart-item-title">{item.product.name}</h4>
                        <span className="vogal-cart-item-meta">
                          {item.color} • {item.size}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontWeight: 800, fontSize: '0.9rem' }}>
                          ₹{(item.product.salePrice || item.product.price).toLocaleString()}
                        </span>
                        <div className="vogal-qty-stepper" style={{ height: '36px' }}>
                          <button
                            type="button"
                            onClick={() => updateCartQty(idx, item.quantity - 1)}
                            style={{ width: '32px' }}
                          >
                            −
                          </button>
                          <span style={{ width: '32px', fontSize: '0.85rem' }}>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateCartQty(idx, item.quantity + 1)}
                            style={{ width: '32px' }}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="vogal-cart-footer">
                <div className="vogal-cart-subtotal-row">
                  <span>Estimated Subtotal</span>
                  <span>₹{cartSubtotal.toLocaleString()}</span>
                </div>
                <button
                  type="button"
                  className="vogal-btn-dark"
                  style={{ width: '100%', padding: '16px', fontSize: '0.9rem' }}
                  onClick={() => triggerToast('Proceeding to encrypted checkout...')}
                >
                  PROCEED TO CHECKOUT
                </button>
                <button
                  type="button"
                  style={{ width: '100%', marginTop: '10px', fontSize: '0.8rem', color: '#71717a' }}
                  onClick={() => setCartOpen(false)}
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="vogal-footer">
        <div className="vogal-footer-grid">
          <div className="vogal-footer-brand">
            <h2>VOGAL</h2>
            <p>
              Contemporary Urban Luxury & Multipurpose Ready-to-Wear. Designed between Tokyo and
              Milan, tailored for global modernists.
            </p>
            <div style={{ display: 'flex', gap: '14px', fontSize: '0.78rem', fontWeight: 800, color: 'var(--vogal-accent)' }}>
              <span>INSTAGRAM</span>
              <span>•</span>
              <span>TIKTOK</span>
              <span>•</span>
              <span>EDITORIAL</span>
            </div>
          </div>

          <div className="vogal-footer-col">
            <h4>COLLECTIONS</h4>
            <ul>
              <li><a href="#women" onClick={(e) => { e.preventDefault(); openCollection('Women'); }}>Women&apos;s Tailoring</a></li>
              <li><a href="#men" onClick={(e) => { e.preventDefault(); openCollection('Men'); }}>Men&apos;s Suiting</a></li>
              <li><a href="#street" onClick={(e) => { e.preventDefault(); openCollection('Streetwear'); }}>Heavyweight 480GSM</a></li>
              <li><a href="#denim" onClick={(e) => { e.preventDefault(); openCollection('Denim'); }}>Kurabo Selvedge</a></li>
              <li><a href="#sale" onClick={(e) => { e.preventDefault(); openCollection('Sale'); }}>Private Sale Archive</a></li>
            </ul>
          </div>

          <div className="vogal-footer-col">
            <h4>CUSTOMER CARE</h4>
            <ul>
              <li><a href="#tracking" onClick={(e) => { e.preventDefault(); triggerToast('Track your order 24/7'); }}>Order Tracking</a></li>
              <li><a href="#returns" onClick={(e) => { e.preventDefault(); triggerToast('30-day effortless doorstep returns'); }}>Returns & Pick-up</a></li>
              <li><a href="#concierge" onClick={(e) => { e.preventDefault(); triggerToast('Style concierge available'); }}>VIP Concierge</a></li>
              <li><a href="#stores" onClick={(e) => { e.preventDefault(); triggerToast('Flagship locations in Mumbai & Delhi'); }}>Flagship Boutiques</a></li>
            </ul>
          </div>

          <div className="vogal-footer-col">
            <h4>ATELIER HERITAGE</h4>
            <ul>
              <li><a href="#sustainability" onClick={(e) => { e.preventDefault(); triggerToast('100% GOTS Organic Cotton certified'); }}>Sustainable Craft</a></li>
              <li><a href="#materials" onClick={(e) => { e.preventDefault(); triggerToast('Japanese nylon and French calfskin'); }}>Material Integrity</a></li>
              <li><a href="#careers" onClick={(e) => { e.preventDefault(); triggerToast('Explore careers at Vogal'); }}>Careers</a></li>
              <li><a href="#press" onClick={(e) => { e.preventDefault(); triggerToast('Press kit upon request'); }}>Press Releases</a></li>
            </ul>
          </div>

          <div className="vogal-footer-col">
            <h4>ATELIER DISPATCH</h4>
            <p style={{ color: '#a1a1aa', fontSize: '0.84rem', marginBottom: '14px' }}>
              Subscribe for private previews and invitation-only drops.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                triggerToast('Subscribed to Vogal Dispatch!')
              }}
              style={{ display: 'flex', gap: '8px' }}
            >
              <input
                type="email"
                placeholder="Email address..."
                required
                style={{
                  padding: '10px 14px',
                  borderRadius: '4px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  backgroundColor: 'rgba(255,255,255,0.08)',
                  color: '#ffffff',
                  fontSize: '0.85rem',
                  outline: 'none',
                  flex: 1,
                }}
              />
              <button
                type="submit"
                className="vogal-btn-primary"
                style={{ padding: '10px 16px', fontSize: '0.78rem' }}
              >
                JOIN
              </button>
            </form>
          </div>
        </div>

        <div className="vogal-footer-bottom">
          <p>© 2026 VOGAL ATELIER INC. All rights reserved. Powered by Willovate Commerce.</p>
          <div className="vogal-payment-icons">
            <span className="vogal-payment-pill">VISA</span>
            <span className="vogal-payment-pill">MASTERCARD</span>
            <span className="vogal-payment-pill">AMEX</span>
            <span className="vogal-payment-pill">APPLE PAY</span>
            <span className="vogal-payment-pill">UPI</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default VogalFashionStorefront
