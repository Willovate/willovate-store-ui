import React, { useState, useEffect } from 'react'
import type {
  ShoeZoneStorefrontProps,
  ShoeZoneProduct,
  ShoeZoneCartItem,
} from './types'
import {
  SHOEZONE_HERO_SLIDES,
  SHOEZONE_CATEGORIES,
  SHOEZONE_COSMOS_BANNER,
  SHOEZONE_NEW_ARRIVALS,
  SHOEZONE_BEST_SELLERS,
  SHOEZONE_PROMO_COUNTDOWN,
  SHOEZONE_VALUE_PROPS,
} from './data/shoeZoneData'
import {
  StorefrontSearchModal,
  StorefrontWishlistDrawer,
  StorefrontAccountModal,
  StorefrontMobileNavDrawer,
  type MobileNavItem,
} from '../../common/StorefrontModals'
import './styles/shoeZone.css'

export const ShoeZoneStorefront: React.FC<ShoeZoneStorefrontProps> = ({
  template,
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
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD')
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'Men' | 'Women' | 'Sneakers' | 'Boots'>('Men')
  const [cartItems, setCartItems] = useState<ShoeZoneCartItem[]>([
    {
      product: SHOEZONE_NEW_ARRIVALS[0],
      quantity: 1,
      selectedSize: 9,
    },
  ])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<ShoeZoneProduct | null>(null)
  const [selectedSize, setSelectedSize] = useState<number>(9)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [countdown, setCountdown] = useState({ days: 3, hours: 14, minutes: 28, seconds: 45 })

  // Slide autoplay or manual navigation
  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % SHOEZONE_HERO_SLIDES.length)
  }
  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + SHOEZONE_HERO_SLIDES.length) % SHOEZONE_HERO_SLIDES.length)
  }

  // Countdown timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Toast trigger
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Cart operations
  const handleAddToCart = (product: ShoeZoneProduct, size = 9) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { product, quantity: 1, selectedSize: size }]
    })
    showToast(`Added ${product.name} to cart!`)
  }

  const handleUpdateQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean) as ShoeZoneCartItem[]
    )
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId)
      if (exists) {
        showToast('Removed from wishlist')
        return prev.filter((id) => id !== productId)
      }
      showToast('Added to wishlist!')
      return [...prev, productId]
    })
  }

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )

  const formatPrice = (usdAmount: number) => {
    if (currency === 'INR') {
      return `₹${Math.round(usdAmount * 83).toLocaleString('en-IN')}`
    }
    return `$${usdAmount.toFixed(2)}`
  }

  const filteredBestSellers =
    activeTab === 'Men'
      ? SHOEZONE_BEST_SELLERS.filter((p) => p.gender === 'Men')
      : activeTab === 'Women'
      ? SHOEZONE_BEST_SELLERS.filter((p) => p.gender === 'Women')
      : SHOEZONE_BEST_SELLERS.filter((p) => p.category === activeTab)

  const navItems: MobileNavItem[] = [
    {
      label: 'Home',
      children: [
        { label: 'Home Default', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { label: 'Cosmos Special Edition', onClick: () => { const el = document.getElementById('sz-cosmos-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Collection',
      children: [
        { label: 'Men Shoes', onClick: () => { setActiveTab('Men'); const el = document.getElementById('sz-bestsellers-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Women Shoes', onClick: () => { setActiveTab('Women'); const el = document.getElementById('sz-bestsellers-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Sneakers & Casuals', onClick: () => { setActiveTab('Sneakers'); const el = document.getElementById('sz-bestsellers-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Boots & Climbing', onClick: () => { setActiveTab('Boots'); const el = document.getElementById('sz-bestsellers-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Shoes',
      children: [
        { label: 'New Arrivals', onClick: () => { const el = document.getElementById('sz-arrivals-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Trending Running Shoes', onClick: () => { const el = document.getElementById('sz-bestsellers-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Pages',
      children: [
        { label: 'Store Locator', onClick: () => showToast('ShoeZone Store Locator: 450+ retail locations') },
        { label: 'Track Order', onClick: () => showToast('Track Your ShoeZone Order') },
        { label: 'Customer Support', onClick: () => showToast('Support: info@somedomain.com') },
      ],
    },
  ]

  const activeSlide = SHOEZONE_HERO_SLIDES[currentSlideIndex]

  return (
    <div
      className={`sz-root device-${effectiveDevice}`}
      style={
        customAccentColor
          ? ({ '--sz-purple': customAccentColor } as React.CSSProperties)
          : undefined
      }
    >
      {/* 1. TOP UTILITY BAR */}
      <div className="sz-topbar">
        <div className="sz-topbar-left">
          <a href="tel:9876543210" className="sz-topbar-item">
            <span>📞</span> 9876543210
          </a>
          <span className="sz-topbar-sep">|</span>
          <a href="mailto:info@somedomain.com" className="sz-topbar-item">
            <span>✉️</span> info@somedomain.com
          </a>
        </div>
        <div className="sz-topbar-right">
          <a href="#store-locator" className="sz-topbar-item">
            Store Location
          </a>
          <span className="sz-topbar-sep">|</span>
          <a href="#track-order" className="sz-topbar-item">
            Track Your Order
          </a>
          <span className="sz-topbar-sep">|</span>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span>{currency === 'USD' ? '🇺🇸' : '🇮🇳'}</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as 'USD' | 'INR')}
              className="sz-topbar-select"
              style={{ background: 'transparent', color: 'inherit', border: 'none', cursor: 'pointer', outline: 'none', fontWeight: 600, fontSize: '12px' }}
              aria-label="Currency selector"
            >
              <option value="USD" style={{ color: '#000' }}>USD ($)</option>
              <option value="INR" style={{ color: '#000' }}>INR (₹)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="sz-header">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="sz-hamburger-btn"
          onClick={() => setIsMobileNavOpen(true)}
          title="Menu"
          aria-label="Open mobile menu"
        >
          ☰
        </button>

        <a href="#home" className="sz-logo-wrap">
          <div className="sz-logo-svg">
            <svg width="40" height="32" viewBox="0 0 100 80" fill="none">
              <path
                d="M10 50 C20 30, 45 20, 70 25 C85 28, 92 40, 88 52 C84 62, 65 65, 45 64 C25 63, 10 58, 10 50 Z"
                fill="#571f7c"
              />
              <path
                d="M20 48 C35 32, 60 30, 75 35 C80 38, 70 48, 50 48 C30 48, 22 52, 20 48 Z"
                fill="#b8247f"
              />
              <circle cx="28" cy="44" r="3" fill="#ffffff" />
              <circle cx="38" cy="42" r="3" fill="#ffffff" />
              <circle cx="48" cy="40" r="3" fill="#ffffff" />
            </svg>
          </div>
          <span className="sz-logo-text">
            <span className="sz-shoe">Shoe</span>
            <span className="sz-zone">Zone</span>
          </span>
        </a>

        <nav className="sz-nav">
          {navItems.map((item) => (
            <div key={item.label} className="wv-nav-dropdown-wrap">
              <span
                className="sz-nav-link"
                onClick={() => {
                  if (item.children && item.children.length > 0) {
                    item.children[0].onClick?.()
                  }
                }}
              >
                {item.label} ▾
              </span>
              {item.children && item.children.length > 0 && (
                <div className="wv-desktop-dropdown">
                  {item.children.map((sub) => (
                    <button
                      key={sub.label}
                      type="button"
                      className="wv-dropdown-item"
                      onClick={(e) => {
                        e.preventDefault()
                        sub.onClick?.()
                      }}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="sz-header-actions">
          <button
            type="button"
            className="sz-action-btn"
            aria-label="Search"
            onClick={() => setIsSearchOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
          <button
            type="button"
            className="sz-action-btn"
            aria-label="User Account"
            onClick={() => setIsAccountOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </button>
          <button
            type="button"
            className="sz-action-btn"
            aria-label="Wishlist"
            onClick={() => setIsWishlistOpen(true)}
            style={{ position: 'relative' }}
          >
            <span style={{ fontSize: 18 }}>{wishlist.length > 0 ? '❤️' : '🤍'}</span>
            {wishlist.length > 0 && <span className="sz-cart-badge">{wishlist.length}</span>}
          </button>
          <button
            type="button"
            className="sz-action-btn"
            aria-label="Shopping Bag Cart"
            onClick={() => setIsCartOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <span className="sz-cart-badge">{cartCount}</span>
          </button>
        </div>
      </header>

      {/* 3. HERO SLIDER */}
      <section className="sz-hero-stage">
        <div className="sz-hero-watermark">{activeSlide.tag}</div>

        <div className="sz-hero-container">
          <div className="sz-hero-content">
            <span className="sz-hero-tag">{activeSlide.tag}</span>
            <h1 className="sz-hero-title">{activeSlide.title}</h1>
            <p className="sz-hero-subtitle">{activeSlide.subtitle}</p>
            <a href={activeSlide.buttonLink} className="sz-hero-btn">
              {activeSlide.buttonText}
            </a>
          </div>

          <div className="sz-hero-image-wrap">
            <img
              src={activeSlide.image}
              alt={activeSlide.title}
              className="sz-hero-img"
            />
          </div>
        </div>

        {/* Carousel arrows */}
        <button
          type="button"
          className="sz-slider-nav-btn sz-slider-prev"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          type="button"
          className="sz-slider-nav-btn sz-slider-next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          ›
        </button>

        {/* Pagination Dots */}
        <div className="sz-slider-dots">
          {SHOEZONE_HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={`sz-slider-dot ${idx === currentSlideIndex ? 'active' : ''}`}
              onClick={() => setCurrentSlideIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 4. CATEGORIES 2x2 + COSMOS STORES BANNER */}
      <section className="sz-categories-section">
        {/* 2x2 Category Grid */}
        <div className="sz-category-grid">
          {SHOEZONE_CATEGORIES.map((cat) => (
            <a key={cat.id} href={cat.link} className="sz-cat-card">
              <div className="sz-cat-img-wrap">
                <img src={cat.image} alt={cat.title} className="sz-cat-img" />
              </div>
              <h3 className="sz-cat-title">{cat.title}</h3>
            </a>
          ))}
        </div>

        {/* Right Cosmos Stores Feature Card */}
        <div className="sz-cosmos-banner">
          <img
            src={SHOEZONE_COSMOS_BANNER.image}
            alt={SHOEZONE_COSMOS_BANNER.title}
            className="sz-cosmos-bg"
          />
          <div className="sz-cosmos-content">
            <span className="sz-cosmos-subtitle">{SHOEZONE_COSMOS_BANNER.tagline}</span>
            <h2 className="sz-cosmos-title">{SHOEZONE_COSMOS_BANNER.title}</h2>
            <p className="sz-cosmos-tagline">{SHOEZONE_COSMOS_BANNER.subtitle}</p>
            <a href="#cosmos" className="sz-cosmos-btn">
              {SHOEZONE_COSMOS_BANNER.buttonText} →
            </a>
          </div>
        </div>
      </section>

      {/* 5. NEW ARRIVALS */}
      <section className="sz-products-section">
        <div className="sz-section-header">
          <div className="sz-section-title-wrap">
            <span className="sz-title-bar" />
            <h2 className="sz-section-title">NEW ARRIVALS</h2>
          </div>
          <div className="sz-carousel-arrows">
            <button type="button" className="sz-arrow-btn" aria-label="Previous arrivals">‹</button>
            <button type="button" className="sz-arrow-btn" aria-label="Next arrivals">›</button>
          </div>
        </div>

        <div className="sz-product-grid">
          {SHOEZONE_NEW_ARRIVALS.map((product) => {
            const isFav = wishlist.includes(product.id)
            return (
              <div key={product.id} className="sz-product-card">
                {product.badge && <span className="sz-prod-badge">{product.badge}</span>}

                <div
                  className="sz-prod-img-wrap"
                  onClick={() => {
                    setQuickViewProduct(product)
                    setSelectedSize(product.sizes?.[0] || 9)
                  }}
                >
                  <img src={product.image} alt={product.name} className="sz-prod-img" />
                  <div className="sz-prod-actions-overlay">
                    <button
                      type="button"
                      className="sz-overlay-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWishlist(product.id)
                      }}
                      title="Add to wishlist"
                    >
                      {isFav ? '❤️' : '🤍'}
                    </button>
                    <button
                      type="button"
                      className="sz-overlay-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        setQuickViewProduct(product)
                        setSelectedSize(product.sizes?.[0] || 9)
                      }}
                      title="Quick View"
                    >
                      👁️
                    </button>
                  </div>
                </div>

                <div className="sz-prod-info">
                  <h3
                    className="sz-prod-name"
                    onClick={() => {
                      setQuickViewProduct(product)
                      setSelectedSize(product.sizes?.[0] || 9)
                    }}
                  >
                    {product.name}
                  </h3>
                  <div className="sz-prod-price-row">
                    <span className="sz-prod-price">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="sz-prod-compare-price">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="sz-prod-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    <span>🛍️</span> Add to Bag
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 6. PROMOTION SALE OFF 50% BANNER */}
      <section className="sz-promo-countdown-section">
        <img
          src={SHOEZONE_PROMO_COUNTDOWN.image}
          alt="Promotion Sale"
          className="sz-promo-bg-img"
        />
        <div className="sz-promo-container">
          <p className="sz-promo-tag">{SHOEZONE_PROMO_COUNTDOWN.tag}</p>
          <h2 className="sz-promo-title">
            PROMOTION <span className="sz-sale-red">SALE OFF 50%</span>
          </h2>
          <div className="sz-promo-watermark">{SHOEZONE_PROMO_COUNTDOWN.watermark}</div>
          <p className="sz-promo-subtitle">{SHOEZONE_PROMO_COUNTDOWN.subtitle}</p>

          <div className="sz-countdown-boxes">
            <div className="sz-cd-box">
              <span className="sz-cd-num">{countdown.days.toString().padStart(2, '0')}</span>
              <span className="sz-cd-label">Days</span>
            </div>
            <div className="sz-cd-box">
              <span className="sz-cd-num">{countdown.hours.toString().padStart(2, '0')}</span>
              <span className="sz-cd-label">Hours</span>
            </div>
            <div className="sz-cd-box">
              <span className="sz-cd-num">{countdown.minutes.toString().padStart(2, '0')}</span>
              <span className="sz-cd-label">Mins</span>
            </div>
            <div className="sz-cd-box">
              <span className="sz-cd-num">{countdown.seconds.toString().padStart(2, '0')}</span>
              <span className="sz-cd-label">Secs</span>
            </div>
          </div>

          <a href="#sale" className="sz-promo-btn">
            {SHOEZONE_PROMO_COUNTDOWN.buttonText}
          </a>
        </div>
      </section>

      {/* 7. BEST SELLERS */}
      <section id="sz-bestsellers-section" className="sz-products-section">
        <div className="sz-section-header">
          <div className="sz-section-title-wrap">
            <span className="sz-title-bar" />
            <h2 className="sz-section-title">BEST SELLERS</h2>
          </div>
          <div className="sz-tabs-row">
            {(['Men', 'Women', 'Sneakers', 'Boots'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                className={`sz-tab-btn ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="sz-product-grid">
          {filteredBestSellers.map((product) => {
            const isFav = wishlist.includes(product.id)
            return (
              <div key={product.id} className="sz-product-card">
                {product.badge && <span className="sz-prod-badge">{product.badge}</span>}

                <div
                  className="sz-prod-img-wrap"
                  onClick={() => {
                    setQuickViewProduct(product)
                    setSelectedSize(product.sizes?.[0] || 9)
                  }}
                >
                  <img src={product.image} alt={product.name} className="sz-prod-img" />
                  <div className="sz-prod-actions-overlay">
                    <button
                      type="button"
                      className="sz-overlay-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWishlist(product.id)
                      }}
                      title="Add to wishlist"
                    >
                      {isFav ? '❤️' : '🤍'}
                    </button>
                    <button
                      type="button"
                      className="sz-overlay-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        setQuickViewProduct(product)
                        setSelectedSize(product.sizes?.[0] || 9)
                      }}
                      title="Quick View"
                    >
                      👁️
                    </button>
                  </div>
                </div>

                <div className="sz-prod-info">
                  <h3
                    className="sz-prod-name"
                    onClick={() => {
                      setQuickViewProduct(product)
                      setSelectedSize(product.sizes?.[0] || 9)
                    }}
                  >
                    {product.name}
                  </h3>
                  <div className="sz-prod-price-row">
                    <span className="sz-prod-price">{formatPrice(product.price)}</span>
                    {product.originalPrice && (
                      <span className="sz-prod-compare-price">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="sz-prod-cart-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    <span>🛍️</span> Add to Bag
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 8. VALUE PROPS */}
      <section className="sz-value-props-section">
        <div className="sz-value-props-grid">
          {SHOEZONE_VALUE_PROPS.map((vp) => (
            <div key={vp.id} className="sz-vp-item">
              <span className="sz-vp-icon">{vp.icon}</span>
              <div>
                <h4 className="sz-vp-title">{vp.title}</h4>
                <p className="sz-vp-desc">{vp.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. COMMUNITY NEWSLETTER STRIP */}
      <section className="sz-newsletter-strip">
        <div className="sz-newsletter-wrap">
          <div className="sz-newsletter-left">
            <h3>Subscribe to ShoeZone VIP Drop Alerts</h3>
            <p>Get early access to limited sneaker releases, seasonal sales, and member-only discounts.</p>
          </div>
          <form
            className="sz-newsletter-form"
            onSubmit={(e) => {
              e.preventDefault()
              showToast('Thank you for subscribing to ShoeZone drops!')
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address..."
              required
              className="sz-news-input"
            />
            <button type="submit" className="sz-news-btn">Subscribe</button>
          </form>
        </div>
      </section>

      {/* 10. DARK FOOTER */}
      <footer className="sz-footer">
        <div className="sz-footer-grid">
          <div className="sz-footer-col">
            <h4>About ShoeZone</h4>
            <p style={{ lineHeight: 1.7, marginBottom: 16 }}>
              ShoeZone is your premier destination for high-performance athletic footwear, rugged outdoor boots, and refined leather dress shoes. Built for endurance, styled for city life.
            </p>
            <p><strong>Hotline:</strong> +1 (800) 489-3742</p>
          </div>
          <div className="sz-footer-col">
            <h4>Quick Links</h4>
            <ul className="sz-footer-links">
              <li><a href="#new">New Arrivals</a></li>
              <li><a href="#bestsellers">Best Sellers</a></li>
              <li><a href="#running">Running Footwear</a></li>
              <li><a href="#hiking">Hiking & Trail Boots</a></li>
              <li><a href="#sale">Special Deals (50% Off)</a></li>
            </ul>
          </div>
          <div className="sz-footer-col">
            <h4>Customer Support</h4>
            <ul className="sz-footer-links">
              <li><a href="#track">Track Your Package</a></li>
              <li><a href="#returns">Free 30-Day Returns</a></li>
              <li><a href="#size">Shoe Sizing Guide</a></li>
              <li><a href="#shipping">Shipping & Delivery</a></li>
              <li><a href="#faq">FAQs & Contact Us</a></li>
            </ul>
          </div>
          <div className="sz-footer-col">
            <h4>Store Hours</h4>
            <p style={{ margin: '0 0 8px' }}>Monday – Friday: 9am – 9pm</p>
            <p style={{ margin: '0 0 8px' }}>Saturday: 10am – 8pm</p>
            <p style={{ margin: '0 0 16px' }}>Sunday: 11am – 6pm</p>
            <p><strong>Location:</strong> 424 Broadway, Soho, New York, NY</p>
          </div>
        </div>

        <div className="sz-footer-bottom">
          <p>© 2026 ShoeZone Footwear Inc. All rights reserved.</p>
          <div className="sz-payment-badges">
            <span className="sz-pay-badge">VISA</span>
            <span className="sz-pay-badge">MASTERCARD</span>
            <span className="sz-pay-badge">AMEX</span>
            <span className="sz-pay-badge">PAYPAL</span>
            <span className="sz-pay-badge">APPLE PAY</span>
          </div>
        </div>
      </footer>

      {/* 11. CART DRAWER */}
      {isCartOpen && (
        <div className="sz-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="sz-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="sz-drawer-head">
              <h3>Shopping Bag ({cartCount})</h3>
              <button
                type="button"
                className="sz-drawer-close"
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="sz-drawer-items">
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6b7280' }}>
                  <p style={{ fontSize: 40, margin: '0 0 10px' }}>👟</p>
                  <p>Your bag is currently empty.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.product.id} className="sz-drawer-item">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="sz-drawer-item-img"
                    />
                    <div className="sz-drawer-item-info">
                      <h4 className="sz-drawer-item-title">{item.product.name}</h4>
                      <p className="sz-drawer-item-price">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      <div className="sz-drawer-qty-row">
                        <button
                          type="button"
                          className="sz-drawer-qty-btn"
                          onClick={() => handleUpdateQty(item.product.id, -1)}
                        >
                          -
                        </button>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>{item.quantity}</span>
                        <button
                          type="button"
                          className="sz-drawer-qty-btn"
                          onClick={() => handleUpdateQty(item.product.id, 1)}
                        >
                          +
                        </button>
                        <span style={{ fontSize: 11, color: '#6b7280', marginLeft: 'auto' }}>
                          Size: {item.selectedSize || 9}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="sz-drawer-foot">
              <div className="sz-drawer-subtotal">
                <span>Subtotal</span>
                <span>{formatPrice(cartSubtotal)}</span>
              </div>
              <button
                type="button"
                className="sz-drawer-checkout-btn"
                onClick={() => {
                  onUseTemplate?.(template?.id || 'shoes-shoezone')
                  showToast('Proceeding to checkout with ShoeZone!')
                }}
              >
                CHECKOUT NOW ({formatPrice(cartSubtotal)})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 12. QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="sz-qv-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="sz-qv-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="sz-qv-close"
              onClick={() => setQuickViewProduct(null)}
            >
              ✕
            </button>

            <div className="sz-qv-img-wrap">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="sz-qv-img"
              />
            </div>

            <div className="sz-qv-details">
              <h3 className="sz-qv-title">{quickViewProduct.name}</h3>
              <div className="sz-qv-price">{formatPrice(quickViewProduct.price)}</div>
              <p className="sz-qv-desc">
                {quickViewProduct.description ||
                  'Constructed with top tier materials, shock-absorbent cushioning, and ergonomic footbed support for maximum comfort.'}
              </p>

              <div className="sz-size-selector">
                <label>Select Size (US):</label>
                <div className="sz-sizes-list">
                  {(quickViewProduct.sizes || [7, 8, 9, 10, 11]).map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`sz-size-pill ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="button"
                className="sz-qv-cart-btn"
                onClick={() => {
                  handleAddToCart(quickViewProduct, selectedSize)
                  setQuickViewProduct(null)
                }}
              >
                <span>🛍️</span> Add to Shopping Bag
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <StorefrontSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={[...SHOEZONE_NEW_ARRIVALS, ...SHOEZONE_BEST_SELLERS].map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category,
        }))}
        onSelectProduct={(p) => {
          const fullProd = [...SHOEZONE_NEW_ARRIVALS, ...SHOEZONE_BEST_SELLERS].find((x) => x.id === p.id)
          if (fullProd) {
            setQuickViewProduct(fullProd)
            setSelectedSize(fullProd.sizes?.[0] || 9)
          }
        }}
        accentColor={customAccentColor || '#571f7c'}
        currencyPrefix={currency === 'INR' ? '₹' : '$'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
        placeholder="Search boots, running shoes, sneakers, climbing..."
        popularTags={['Running Shoes', 'Boots', 'Sneakers', 'Climbing']}
      />

      {/* Wishlist Drawer */}
      <StorefrontWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        allProducts={[...SHOEZONE_NEW_ARRIVALS, ...SHOEZONE_BEST_SELLERS].map((p) => ({
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
          const fullProd = [...SHOEZONE_NEW_ARRIVALS, ...SHOEZONE_BEST_SELLERS].find((x) => x.id === p.id)
          if (fullProd) handleAddToCart(fullProd, 9)
        }}
        onOpenProduct={(p) => {
          const fullProd = [...SHOEZONE_NEW_ARRIVALS, ...SHOEZONE_BEST_SELLERS].find((x) => x.id === p.id)
          if (fullProd) {
            setQuickViewProduct(fullProd)
            setSelectedSize(fullProd.sizes?.[0] || 9)
          }
        }}
        accentColor={customAccentColor || '#571f7c'}
      />

      {/* Account Modal */}
      <StorefrontAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        brandName="ShoeZone"
        accentColor={customAccentColor || '#571f7c'}
      />

      {/* Mobile Navigation Drawer */}
      <StorefrontMobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        brandName="ShoeZone"
        navItems={navItems}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        cartCount={cartCount}
        contactPhone="9876543210"
        contactEmail="info@somedomain.com"
        accentColor={customAccentColor || '#571f7c'}
      />

      {/* TOAST MESSAGE */}
      {toastMessage && <div className="sz-toast">{toastMessage}</div>}
    </div>
  )
}
