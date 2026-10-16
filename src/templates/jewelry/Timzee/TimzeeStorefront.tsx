import React, { useState, useEffect, useMemo } from 'react'
import type {
  TimzeeStorefrontProps,
  TimzeeProduct,
  TimzeeCartItem,
} from './types'
import {
  TIMZEE_HERO_SLIDES,
  TIMZEE_PROMO_CARDS,
  TIMZEE_PRODUCTS,
  TIMZEE_GALLERY_BLOCKS,
  TIMZEE_TESTIMONIALS,
  TIMZEE_BLOG_POSTS,
  TIMZEE_BRAND_PARTNERS,
  TIMZEE_APP_LOGOS,
} from './data/timzeeData'
import './styles/timzee.css'

export const TimzeeStorefront: React.FC<TimzeeStorefrontProps> = ({
  templateData: _templateData,
  device = 'desktop',
  deviceView,
  onClose,
  initialView: _initialView = 'home',
  onUseTemplate,
}) => {
  const activeDevice = deviceView || device

  // Hero Slider
  const [currentSlide, setCurrentSlide] = useState(0)

  // Popular in store tab & slider page
  const [popularTab, setPopularTab] = useState<'classic' | 'modern' | 'special'>('classic')
  const [popularPage, setPopularPage] = useState(0)

  // Product categories tab
  const [categoryTab, setCategoryTab] = useState<'classico' | 'executive' | 'sports' | 'dialer'>('classico')

  // Testimonial slider
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  // Countdown timer
  const [timeLeft, setTimeLeft] = useState({
    days: 42,
    hours: 14,
    minutes: 36,
    seconds: 58,
  })

  // Cart Drawer
  const [cartItems, setCartItems] = useState<TimzeeCartItem[]>([
    {
      product: TIMZEE_PRODUCTS[0],
      quantity: 1,
    },
  ])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Wishlist Drawer
  const [wishlistIds, setWishlistIds] = useState<string[]>(['tmz-analog-numeral', 'tmz-golden-automatic'])
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<TimzeeProduct | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)

  // Search Modal
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Currency
  const [currency, setCurrency] = useState('USD')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  // Newsletter
  const [newsletterEmail, setNewsletterEmail] = useState('')

  // Blog Page slider
  const [blogSlideIndex, setBlogSlideIndex] = useState(0)

  const displayedBlogPosts = useMemo(() => {
    return blogSlideIndex === 0 ? TIMZEE_BLOG_POSTS.slice(0, 2) : TIMZEE_BLOG_POSTS.slice(2, 4)
  }, [blogSlideIndex])

  // Ticking Countdown Timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 }
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const addToCart = (product: TimzeeProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { product, quantity: 1 }]
    })
    showToast(`Added ${product.name} to shopping bag`)
  }

  const updateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean) as TimzeeCartItem[]
    )
  }

  const removeCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId))
    showToast('Item removed from shopping bag')
  }

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(productId)
      if (exists) {
        showToast('Removed from wishlist')
        return prev.filter((id) => id !== productId)
      } else {
        showToast('Saved to wishlist')
        return [...prev, productId]
      }
    })
  }

  // Filtered Products for Popular In Store (3 per view for carousel)
  const popularFiltered = useMemo(() => {
    return TIMZEE_PRODUCTS.filter((p) => p.tabGroup.includes(popularTab))
  }, [popularTab])

  const visiblePopularProducts = useMemo(() => {
    const start = popularPage * 3
    const sliced = popularFiltered.slice(start, start + 3)
    if (sliced.length < 3) {
      return [...sliced, ...popularFiltered.slice(0, 3 - sliced.length)]
    }
    return sliced
  }, [popularFiltered, popularPage])

  // Filtered Products for Product Categories (5 watches: 3 top row, 2 bottom row)
  const categoryProducts5 = useMemo(() => {
    const list = TIMZEE_PRODUCTS.filter((p) => p.tabGroup.includes(categoryTab))
    const fallback = TIMZEE_PRODUCTS.slice(0, 5)
    return list.length >= 5 ? list.slice(0, 5) : fallback
  }, [categoryTab])

  // Search Results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return TIMZEE_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    )
  }, [searchQuery])

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  }, [cartItems])

  const freeShippingThreshold = 500
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)

  const wishlistProducts = useMemo(() => {
    return TIMZEE_PRODUCTS.filter((p) => wishlistIds.includes(p.id))
  }, [wishlistIds])

  const activeSlideData = TIMZEE_HERO_SLIDES[currentSlide]

  return (
    <div
      className={`tmz-root tmz-device-${activeDevice}`}
      data-testid="timzee-storefront"
    >
      {/* ================= 1. HEADER (AS OBSERVED IN SCREENSHOT) ================= */}
      <header className="tmz-header-bar">
        <div className="tmz-container tmz-header-content">
          {/* Logo & Category hamburger */}
          <div className="tmz-header-left">
            <button
              className="tmz-menu-toggle"
              aria-label="Toggle Navigation Menu"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="tmz-menu-bar" />
              <span className="tmz-menu-bar" />
              <span className="tmz-menu-bar" />
            </button>

            <a href="#home" style={{ display: 'flex', alignItems: 'center' }}>
              <img
                src="https://timzee-demo.myshopify.com/cdn/shop/files/logo_1.png?v=1645517921&width=250"
                alt="timzee"
                className="tmz-logo-img"
                onError={(e) => {
                  const target = e.currentTarget
                  target.style.display = 'none'
                  const parent = target.parentElement
                  if (parent && !parent.querySelector('.tmz-fallback-logo')) {
                    const txt = document.createElement('span')
                    txt.className = 'tmz-fallback-logo'
                    txt.style.fontFamily = 'var(--tmz-font-heading)'
                    txt.style.fontSize = '24px'
                    txt.style.fontWeight = 'bold'
                    txt.style.color = '#ffffff'
                    txt.innerText = 'timzee'
                    parent.appendChild(txt)
                  }
                }}
              />
            </a>
          </div>

          {/* Navigation Links */}
          <nav className="tmz-nav-center">
            <a href="#home" className="tmz-nav-link active">Home</a>
            <a href="#shop" className="tmz-nav-link">Shop</a>
            <a href="#collections" className="tmz-nav-link">Collections</a>
            <a href="#gallery" className="tmz-nav-link">Gallery</a>
            <a href="#journal" className="tmz-nav-link">Journal</a>
            <a href="#footer" className="tmz-nav-link">Contact</a>
          </nav>

          {/* Right Header Utilities: Search, Account, Cart, Currency */}
          <div className="tmz-header-right">
            {/* Search */}
            <button
              className="tmz-hdr-icon-btn"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search Catalog"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Account */}
            <button
              className="tmz-hdr-icon-btn"
              onClick={() => showToast('VIP Horology Client Portal')}
              aria-label="Client Account"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            {/* Wishlist */}
            <button
              className="tmz-hdr-icon-btn"
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Wishlist"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistIds.length > 0 && (
                <span className="tmz-hdr-badge">{wishlistIds.length}</span>
              )}
            </button>

            {/* Shopping Bag */}
            <button
              className="tmz-hdr-icon-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Bag"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-5z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartItems.length > 0 && (
                <span className="tmz-hdr-badge">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              )}
            </button>

            {/* Currency Selector */}
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="tmz-currency-dropdown"
              aria-label="Currency"
            >
              <option value="USD">USD $</option>
              <option value="EUR">EUR €</option>
              <option value="GBP">GBP £</option>
              <option value="INR">INR ₹</option>
            </select>

            {/* Use Template / Close Preview Buttons */}
            {onUseTemplate && (
              <button
                className="tmz-btn-gold-bordered"
                style={{ padding: '7px 16px', fontSize: '11px', marginLeft: '6px' }}
                onClick={() => onUseTemplate('jewelry-timzee')}
              >
                Use Template
              </button>
            )}

            {onClose && (
              <button
                className="tmz-hdr-icon-btn"
                onClick={onClose}
                aria-label="Close"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION DRAWER */}
      {isMobileMenuOpen && (
        <div className="tmz-drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="tmz-mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="tmz-mobile-nav-header">
              <span style={{ fontFamily: 'var(--tmz-font-heading)', fontSize: '20px', fontWeight: 'bold', color: '#ffffff', letterSpacing: '2px' }}>
                TIMZEE
              </span>
              <button
                type="button"
                className="tmz-drawer-close"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <div className="tmz-mobile-nav-links">
              <a
                href="#home"
                className="tmz-mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Home Horology</span>
                <span>›</span>
              </a>
              <a
                href="#shop"
                className="tmz-mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Luxury Timepieces (Shop)</span>
                <span>›</span>
              </a>
              <a
                href="#collections"
                className="tmz-mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Collections & Novelties</span>
                <span>›</span>
              </a>
              <a
                href="#gallery"
                className="tmz-mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Visual Gallery</span>
                <span>›</span>
              </a>
              <a
                href="#journal"
                className="tmz-mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Watchmakers Journal</span>
                <span>›</span>
              </a>
              <a
                href="#footer"
                className="tmz-mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span>Contact Atelier</span>
                <span>›</span>
              </a>
            </div>
            <div className="tmz-mobile-nav-footer">
              <div className="tmz-mobile-currency">
                <span>Currency: {currency}</span>
              </div>
              <button
                type="button"
                className="tmz-mobile-vip-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  showToast('VIP Horology Client Portal')
                }}
              >
                VIP Member Login
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 2. HERO SLIDESHOW ================= */}
      <section id="home" className="tmz-hero-viewport">
        <div className="tmz-container" style={{ width: '100%' }}>
          <div className="tmz-hero-layout">
            {/* Copy */}
            <div className="tmz-hero-copy">
              <span className="tmz-hero-pretitle-script">
                {activeSlideData.pretitle.toLowerCase()}...
              </span>
              <h1 className="tmz-hero-main-title">{activeSlideData.title}</h1>
              <p className="tmz-hero-paragraph">{activeSlideData.description}</p>

              {/* Price Callout */}
              <div className="tmz-hero-price-tag">
                <span className="tmz-hero-from">From</span>
                <span className="tmz-hero-gold-price">$1,200</span>
                <span className="tmz-hero-strike-price">$1,500</span>
              </div>

              {/* Button */}
              <div className="tmz-hero-btn-row">
                <a href="#shop" className="tmz-btn-gold-bordered">
                  {activeSlideData.buttonText}
                </a>
              </div>

              {/* Slide Nav Arrows */}
              <div className="tmz-hero-arrows">
                <button
                  className="tmz-square-nav-btn"
                  onClick={() =>
                    setCurrentSlide((prev) => (prev - 1 + TIMZEE_HERO_SLIDES.length) % TIMZEE_HERO_SLIDES.length)
                  }
                  aria-label="Previous Slide"
                >
                  ‹
                </button>
                <button
                  className="tmz-square-nav-btn"
                  onClick={() => setCurrentSlide((prev) => (prev + 1) % TIMZEE_HERO_SLIDES.length)}
                  aria-label="Next Slide"
                >
                  ›
                </button>
              </div>
            </div>

            {/* Watch Photo right */}
            <div className="tmz-hero-watch-wrap">
              <img
                src={TIMZEE_PRODUCTS[0].images[0]}
                alt="Timzee Mechanical Timepiece"
                className="tmz-hero-watch-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. FLASH SALE 3-PROMO CARDS (BLUE BORDERED) ================= */}
      <section className="tmz-flash-promos-wrap">
        <div className="tmz-container">
          <div className="tmz-flash-grid">
            {TIMZEE_PROMO_CARDS.map((card) => (
              <div
                key={card.id}
                className="tmz-flash-card"
                style={{ backgroundImage: `url(${card.image})` }}
              >
                <div className="tmz-flash-card-overlay" />
                <div className="tmz-flash-content">
                  <span className="tmz-flash-script">{card.subtitle}</span>
                  <h3 className="tmz-flash-title">{card.title}</h3>
                  <a href="#shop" className="tmz-flash-link">
                    Shop Now
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. POPULAR IN STORE ================= */}
      <section id="shop" className="tmz-popular-section">
        <div className="tmz-container">
          {/* Section Heading with Gold Underline */}
          <div className="tmz-heading-wrap">
            <h2 className="tmz-section-heading">
              <span className="tmz-heading-underline">Popular In Store</span>
            </h2>
          </div>

          {/* Tabs */}
          <div className="tmz-tabs-row">
            <button
              className={`tmz-tab-label ${popularTab === 'classic' ? 'active' : ''}`}
              onClick={() => {
                setPopularTab('classic')
                setPopularPage(0)
              }}
            >
              CLASSIC
            </button>
            <button
              className={`tmz-tab-label ${popularTab === 'modern' ? 'active' : ''}`}
              onClick={() => {
                setPopularTab('modern')
                setPopularPage(0)
              }}
            >
              MODERN
            </button>
            <button
              className={`tmz-tab-label ${popularTab === 'special' ? 'active' : ''}`}
              onClick={() => {
                setPopularTab('special')
                setPopularPage(0)
              }}
            >
              SPECIAL EDITION
            </button>
          </div>

          {/* 3 Watch Cards with Left/Right Arrows */}
          <div className="tmz-carousel-wrapper">
            <button
              className="tmz-side-arrow tmz-side-arrow-left"
              onClick={() => setPopularPage((prev) => (prev > 0 ? prev - 1 : 1))}
              aria-label="Previous Watches"
            >
              ‹
            </button>

            <div className="tmz-popular-grid-3">
              {visiblePopularProducts.map((watch) => (
                <div key={watch.id} className="tmz-watch-box">
                  {watch.badge && (
                    <span className="tmz-badge-gold-topright">{watch.badge}</span>
                  )}

                  <div
                    className="tmz-watch-img-slot"
                    onClick={() => {
                      setQuickViewProduct(watch)
                      setSelectedImageIndex(0)
                    }}
                  >
                    <img src={watch.images[0]} alt={watch.name} loading="lazy" />
                  </div>

                  <h3
                    className="tmz-watch-name"
                    onClick={() => {
                      setQuickViewProduct(watch)
                      setSelectedImageIndex(0)
                    }}
                  >
                    {watch.name}
                  </h3>

                  <div className="tmz-watch-price-row">
                    <span className="tmz-price-current">${watch.price.toFixed(2)}</span>
                    {watch.compareAtPrice && (
                      <span className="tmz-price-strikethrough">
                        ${watch.compareAtPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    className="tmz-quick-buy-btn"
                    onClick={() => addToCart(watch)}
                  >
                    Quick buy
                  </button>
                </div>
              ))}
            </div>

            <button
              className="tmz-side-arrow tmz-side-arrow-right"
              onClick={() => setPopularPage((prev) => (prev < 1 ? prev + 1 : 0))}
              aria-label="Next Watches"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* ================= 5. MOST WANTED OF THE YEAR PARALLAX DEAL BANNER ================= */}
      <section className="tmz-deal-countdown-section">
        <div className="tmz-deal-countdown-overlay" />
        <div className="tmz-container">
          <div className="tmz-deal-body">
            <div className="tmz-heading-wrap" style={{ marginBottom: '28px' }}>
              <h2 className="tmz-section-heading">
                <span className="tmz-heading-underline">Most wanted of the year</span>
              </h2>
            </div>

            {/* Countdown Clock */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '24px' }}>
              {[
                { val: timeLeft.days, lbl: 'Days' },
                { val: timeLeft.hours, lbl: 'Hours' },
                { val: timeLeft.minutes, lbl: 'Mins' },
                { val: timeLeft.seconds, lbl: 'Secs' },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(0, 0, 0, 0.85)',
                    border: '1px solid var(--tmz-gold)',
                    padding: '12px 18px',
                    minWidth: '75px',
                  }}
                >
                  <div style={{ fontFamily: 'var(--tmz-font-heading)', fontSize: '28px', color: 'var(--tmz-gold)', fontWeight: 600 }}>
                    {String(item.val).padStart(2, '0')}
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--tmz-text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                    {item.lbl}
                  </div>
                </div>
              ))}
            </div>

            <a href="#shop" className="tmz-btn-shopnow-box">
              shop now
            </a>
          </div>
        </div>
      </section>

      {/* ================= 6. ROMAN OR NUMERAL FEATURE SPOTLIGHT ================= */}
      <section id="collections" className="tmz-roman-numeral-section">
        <div className="tmz-container">
          <div className="tmz-roman-layout">
            <div>
              <div className="tmz-roman-badge-icon">◆</div>
              <h2 className="tmz-roman-heading">Roman or Numeral</h2>
              <p className="tmz-roman-desc">
                Limited Edition of 200 pieces world-wide. Watch Big Bang, 361.PE.2010.RW.1104.
                The stainless steel case and band are thick and prominent, creating a durable
                feel on the wrist. However, the dial is much more whimsical.
              </p>
              <p className="tmz-roman-desc">
                Accurate and Comfortable Imported Japanese quartz movement ensures precise time
                keeping. Its classic design of multi display watches and comfortable silicone
                material can provide to users excellent outdoor experiences.
              </p>
              <a href="#shop" className="tmz-btn-shopnow-box">
                shop now
              </a>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img
                src="https://timzee-demo.myshopify.com/cdn/shop/files/Bg2.jpg?v=1614300904&width=1500"
                alt="Roman or Numeral Limited Edition"
                className="tmz-roman-watch-img"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= 7. PURE WATCH PHOTO MOSAIC (6-IMAGE GRID) ================= */}
      <section id="gallery" className="tmz-photo-mosaic-section">
        <div className="tmz-container">
          <div className="tmz-photo-grid-6">
            {TIMZEE_GALLERY_BLOCKS.map((block) => (
              <div key={block.id} className="tmz-photo-slot">
                <img src={block.image} alt={block.title} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 8. TESTIMONIAL QUOTATION BOXES ================= */}
      <section className="tmz-quote-section">
        <div className="tmz-container">
          <div className="tmz-quote-container">
            <div className="tmz-gold-quote-box">“</div>

            <div className="tmz-quote-center">
              <p className="tmz-quote-words">
                {TIMZEE_TESTIMONIALS[currentTestimonial].quote}
              </p>
              <div className="tmz-quote-author">
                {TIMZEE_TESTIMONIALS[currentTestimonial].author}
              </div>
            </div>

            <div className="tmz-gold-quote-box">”</div>
          </div>

          {/* Dots */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '24px' }}>
            {TIMZEE_TESTIMONIALS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentTestimonial(i)}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: i === currentTestimonial ? 'var(--tmz-gold)' : 'rgba(255,255,255,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                }}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ================= 9. PRODUCT CATEGORIES (5-WATCH STAGGERED GRID) ================= */}
      <section className="tmz-categories-section">
        <div className="tmz-container">
          <div className="tmz-heading-wrap">
            <h2 className="tmz-section-heading">
              <span className="tmz-heading-underline">Product Categories</span>
            </h2>
          </div>

          {/* Tabs */}
          <div className="tmz-tabs-row">
            {(['classico', 'executive', 'sports', 'dialer'] as const).map((tab) => (
              <button
                key={tab}
                className={`tmz-tab-label ${categoryTab === tab ? 'active' : ''}`}
                onClick={() => setCategoryTab(tab)}
              >
                {tab.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Staggered 3 on top, 2 on bottom */}
          <div className="tmz-cat-grid-5">
            <div className="tmz-cat-row-top">
              {categoryProducts5.slice(0, 3).map((watch) => (
                <div key={watch.id} className="tmz-watch-box">
                  <div
                    className="tmz-watch-img-slot"
                    onClick={() => {
                      setQuickViewProduct(watch)
                      setSelectedImageIndex(0)
                    }}
                  >
                    <img src={watch.images[0]} alt={watch.name} loading="lazy" />
                  </div>
                  <h3
                    className="tmz-watch-name"
                    onClick={() => {
                      setQuickViewProduct(watch)
                      setSelectedImageIndex(0)
                    }}
                  >
                    {watch.name}
                  </h3>
                  <div className="tmz-watch-price-row">
                    <span className="tmz-price-current">${watch.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="tmz-cat-row-bottom">
              {categoryProducts5.slice(3, 5).map((watch) => (
                <div key={watch.id} className="tmz-watch-box">
                  <div
                    className="tmz-watch-img-slot"
                    onClick={() => {
                      setQuickViewProduct(watch)
                      setSelectedImageIndex(0)
                    }}
                  >
                    <img src={watch.images[0]} alt={watch.name} loading="lazy" />
                  </div>
                  <h3
                    className="tmz-watch-name"
                    onClick={() => {
                      setQuickViewProduct(watch)
                      setSelectedImageIndex(0)
                    }}
                  >
                    {watch.name}
                  </h3>
                  <div className="tmz-watch-price-row">
                    <span className="tmz-price-current">${watch.price.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 10. RECENT BLOG ASYMMETRIC MOSAIC ================= */}
      <section id="journal" className="tmz-recent-blog-section">
        <div className="tmz-container">
          <div className="tmz-heading-wrap">
            <h2 className="tmz-section-heading">
              <span className="tmz-heading-underline">Recent Blog</span>
            </h2>
          </div>

          <div className="tmz-blog-mosaic-grid">
            {/* Left large horizontal card */}
            <div className="tmz-blog-large-left">
              <img
                src={displayedBlogPosts[0]?.image || TIMZEE_BLOG_POSTS[0].image}
                alt={displayedBlogPosts[0]?.title || TIMZEE_BLOG_POSTS[0].title}
                className="tmz-blog-hero-img"
                loading="lazy"
              />
              <div className="tmz-blog-large-content">
                <span className="tmz-blog-date">{displayedBlogPosts[0]?.date || TIMZEE_BLOG_POSTS[0].date}</span>
                <h3 className="tmz-blog-heading-title">{displayedBlogPosts[0]?.title || TIMZEE_BLOG_POSTS[0].title}</h3>
                <a
                  href="#journal"
                  className="tmz-btn-readmore"
                  onClick={(e) => {
                    e.preventDefault()
                    showToast(`Opening article: ${displayedBlogPosts[0]?.title || TIMZEE_BLOG_POSTS[0].title}`)
                  }}
                >
                  Read More
                </a>
              </div>
            </div>

            {/* Right 2-tier column */}
            <div className="tmz-blog-right-column">
              <div className="tmz-blog-text-card">
                <span className="tmz-blog-date">{displayedBlogPosts[1]?.date || TIMZEE_BLOG_POSTS[1].date}</span>
                <h3 className="tmz-blog-heading-title">{displayedBlogPosts[1]?.title || TIMZEE_BLOG_POSTS[1].title}</h3>
                <a
                  href="#journal"
                  className="tmz-btn-readmore"
                  onClick={(e) => {
                    e.preventDefault()
                    showToast(`Opening article: ${displayedBlogPosts[1]?.title || TIMZEE_BLOG_POSTS[1].title}`)
                  }}
                >
                  Read More
                </a>
              </div>

              <div className="tmz-blog-model-card">
                <img
                  src={displayedBlogPosts[1]?.image || TIMZEE_BLOG_POSTS[1].image}
                  alt="Summer Horology"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Square slider arrows centered */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
            <button
              className="tmz-square-nav-btn"
              onClick={() => setBlogSlideIndex((prev) => (prev > 0 ? prev - 1 : 1))}
              aria-label="Previous Articles"
            >
              ‹
            </button>
            <button
              className="tmz-square-nav-btn"
              onClick={() => setBlogSlideIndex((prev) => (prev < 1 ? prev + 1 : 0))}
              aria-label="Next Articles"
            >
              ›
            </button>
          </div>
        </div>
      </section>

      {/* ================= 11. NEWSLETTER WITH WATCHES ON SIDES ================= */}
      <section className="tmz-newsletter-backdrop">
        <div className="tmz-newsletter-overlay-dark" />
        <div className="tmz-container">
          <div className="tmz-newsletter-core">
            <div className="tmz-heading-wrap" style={{ marginBottom: '16px' }}>
              <h2 className="tmz-section-heading">
                <span className="tmz-heading-underline">Newsletter</span>
              </h2>
            </div>

            <form
              className="tmz-subscribe-box"
              onSubmit={(e) => {
                e.preventDefault()
                if (newsletterEmail) {
                  showToast('Thank you for subscribing to Timzee newsletter.')
                  setNewsletterEmail('')
                }
              }}
            >
              <input
                type="email"
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
                className="tmz-sub-input"
              />
              <button type="submit" className="tmz-sub-btn">
                Subscribe
              </button>
            </form>

            <p className="tmz-privacy-note">
              Will be used in accordance with our Privacy policy
            </p>

            {/* 5 Square Social Buttons */}
            <div className="tmz-social-squares-row">
              {['Twitter', 'Facebook', 'Pinterest', 'Instagram', 'Tumblr'].map((net) => (
                <a
                  key={net}
                  href={`#${net.toLowerCase()}`}
                  className="tmz-social-sq-btn"
                  title={net}
                  onClick={(e) => {
                    e.preventDefault()
                    showToast(`Follow Timzee on ${net}`)
                  }}
                >
                  {net[0]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================= 12. THE GREAT EXPERIENCE (BRAND LOGOS) ================= */}
      <section className="tmz-brands-experience-section">
        <div className="tmz-container">
          <div className="tmz-heading-wrap" style={{ marginBottom: '32px' }}>
            <h2 className="tmz-section-heading">
              <span className="tmz-heading-underline">The great experience</span>
            </h2>
          </div>

          <div className="tmz-logos-row-sleek">
            {TIMZEE_BRAND_PARTNERS.map((p) => (
              <img key={p.id} src={p.image} alt={p.name} loading="lazy" />
            ))}
          </div>

          <div className="tmz-dots-indicator">
            <span className="tmz-small-dot active" />
            <span className="tmz-small-dot" />
            <span className="tmz-small-dot" />
          </div>
        </div>
      </section>

      {/* ================= 13. FOOTER WITH WATCH WATERMARK ================= */}
      <footer id="footer" className="tmz-footer-watermark">
        <div className="tmz-footer-overlay-tint" />
        <div className="tmz-container tmz-footer-inner-content">
          <div className="tmz-footer-cols-4">
            <div>
              <h4 className="tmz-ft-title">Help</h4>
              <ul className="tmz-ft-links-list">
                <li><a href="#search">Search</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#shipping">Shipping Details</a></li>
                <li><a href="#terms">Terms & Conditions</a></li>
              </ul>
            </div>

            <div>
              <h4 className="tmz-ft-title">Support</h4>
              <ul className="tmz-ft-links-list">
                <li><a href="#contact">Contact us</a></li>
                <li><a href="#about">About us</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#refunds">Refunds & Returns</a></li>
                <li><a href="#deliveries">Deliveries Information</a></li>
              </ul>
            </div>

            <div>
              <h4 className="tmz-ft-title">Information</h4>
              <ul className="tmz-ft-links-list">
                <li><a href="#search-terms">Search Terms</a></li>
                <li><a href="#advanced">Advanced Search</a></li>
                <li><a href="#faqs">Help & FAQ's</a></li>
                <li><a href="#location">Store Location</a></li>
                <li><a href="#orders">Orders & Returns</a></li>
              </ul>
            </div>

            <div>
              <h4 className="tmz-ft-title">Address</h4>
              <div className="tmz-ft-address-box">
                <p style={{ margin: '0 0 6px' }}>
                  No: 58 A, East Madison Street, Baltimore, MD, USA 4508
                </p>
                <p style={{ margin: '0 0 6px', color: 'var(--tmz-gold)' }}>
                  0000 - 123 - 456789
                </p>
                <p style={{ margin: 0 }}>info@example.com</p>
              </div>
            </div>
          </div>

          {/* Connect on left, Download our app on right */}
          <div className="tmz-footer-apps-connect-bar">
            <div className="tmz-ft-connect-left">
              <span className="tmz-ft-label-sub">Connect with us</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {['T', 'F', 'P', 'I', 'Y'].map((letter, i) => (
                  <span
                    key={i}
                    style={{
                      width: '28px',
                      height: '28px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '11px',
                      cursor: 'pointer',
                    }}
                    onClick={() => showToast('Opening social channel')}
                  >
                    {letter}
                  </span>
                ))}
              </div>
            </div>

            <div className="tmz-ft-apps-right">
              <span className="tmz-ft-label-sub">Download our app</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                {TIMZEE_APP_LOGOS.map((app) => (
                  <img
                    key={app.id}
                    src={app.image}
                    alt={app.name}
                    style={{ height: '32px', width: 'auto', cursor: 'pointer' }}
                    onClick={() => showToast(`Download Timzee for ${app.name}`)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & payment bar */}
        <div className="tmz-ft-bottom-strip">
          <div className="tmz-container tmz-ft-bottom-flex">
            <div>
              © 2026, Timzee (password: buddha) | Powered by Shopify
            </div>
            <div className="tmz-payment-cards-row">
              <span className="tmz-payment-pill">Diners Club</span>
              <span className="tmz-payment-pill">Discover</span>
              <span className="tmz-payment-pill">MasterCard</span>
              <span className="tmz-payment-pill">Visa</span>
              <span className="tmz-payment-pill">PayPal</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ================= 14. INTERACTIVE CART DRAWER ================= */}
      {isCartOpen && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000 }}
            onClick={() => setIsCartOpen(false)}
          />
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '400px',
              maxWidth: '90vw',
              height: '100vh',
              background: '#07111e',
              borderLeft: '1px solid var(--tmz-gold)',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 40px rgba(0,0,0,0.9)',
            }}
          >
            <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--tmz-font-heading)', color: '#fff' }}>
                Your Cart ({cartItems.reduce((a, b) => a + b.quantity, 0)})
              </h3>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: '14px 20px', background: 'rgba(0,0,0,0.4)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', marginBottom: '6px' }}>
                <span>
                  {cartSubtotal >= freeShippingThreshold
                    ? '🎉 Free Worldwide Express Shipping unlocked!'
                    : `Add $${(freeShippingThreshold - cartSubtotal).toFixed(2)} more for Free Shipping`}
                </span>
                <span style={{ color: 'var(--tmz-gold)' }}>{Math.round(freeShippingProgress)}%</span>
              </div>
              <div style={{ height: '4px', background: 'rgba(255,255,255,0.1)' }}>
                <div style={{ height: '100%', width: `${freeShippingProgress}%`, background: 'var(--tmz-gold)' }} />
              </div>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--tmz-text-muted)' }}>
                  Your shopping bag is empty.
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      paddingBottom: '16px',
                      marginBottom: '16px',
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      style={{ width: '60px', height: '60px', objectFit: 'contain', background: '#000', padding: '4px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h4 style={{ margin: '0 0 4px', fontSize: '14px', color: '#fff' }}>{item.product.name}</h4>
                        <button
                          onClick={() => removeCartItem(item.product.id)}
                          style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
                        >
                          ✕
                        </button>
                      </div>
                      <div style={{ color: 'var(--tmz-gold)', fontSize: '13px', marginBottom: '8px' }}>
                        ${item.product.price.toFixed(2)}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                          onClick={() => updateQuantity(item.product.id, -1)}
                          style={{ background: '#000', border: '1px solid #444', color: '#fff', width: '22px', height: '22px', cursor: 'pointer' }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '12px' }}>{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, 1)}
                          style={{ background: '#000', border: '1px solid #444', color: '#fff', width: '22px', height: '22px', cursor: 'pointer' }}
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
              <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)', background: '#030811' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span>Subtotal:</span>
                  <span style={{ color: 'var(--tmz-gold)', fontWeight: 'bold', fontSize: '16px' }}>
                    ${cartSubtotal.toFixed(2)}
                  </span>
                </div>
                <button
                  className="tmz-btn-shopnow-box"
                  style={{ width: '100%', margin: 0, textAlign: 'center' }}
                  onClick={() => showToast('Redirecting to secure checkout...')}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* ================= 15. WISHLIST DRAWER ================= */}
      {isWishlistOpen && (
        <>
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', zIndex: 1000 }}
            onClick={() => setIsWishlistOpen(false)}
          />
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '380px',
              maxWidth: '90vw',
              height: '100vh',
              background: '#07111e',
              borderLeft: '1px solid var(--tmz-gold)',
              zIndex: 1001,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-10px 0 40px rgba(0,0,0,0.9)',
            }}
          >
            <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--tmz-font-heading)', color: '#fff' }}>
                Wishlist ({wishlistProducts.length})
              </h3>
              <button
                onClick={() => setIsWishlistOpen(false)}
                style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '20px' }}>
              {wishlistProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: 'var(--tmz-text-muted)' }}>
                  Your wishlist is empty.
                </div>
              ) : (
                wishlistProducts.map((p) => (
                  <div
                    key={p.id}
                    style={{
                      display: 'flex',
                      gap: '12px',
                      paddingBottom: '14px',
                      marginBottom: '14px',
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <img
                      src={p.images[0]}
                      alt={p.name}
                      style={{ width: '60px', height: '60px', objectFit: 'contain', background: '#000', padding: '4px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <h4 style={{ margin: '0 0 4px', fontSize: '14px', color: '#fff' }}>{p.name}</h4>
                        <button
                          onClick={() => toggleWishlist(p.id)}
                          style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer' }}
                        >
                          ✕
                        </button>
                      </div>
                      <div style={{ color: 'var(--tmz-gold)', fontSize: '13px', marginBottom: '8px' }}>
                        ${p.price.toFixed(2)}
                      </div>
                      <button
                        className="tmz-btn-shopnow-box"
                        style={{ padding: '6px 14px', fontSize: '10px', marginTop: 0 }}
                        onClick={() => {
                          addToCart(p)
                          toggleWishlist(p.id)
                        }}
                      >
                        Add to Bag
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* ================= 16. QUICK VIEW MODAL ================= */}
      {quickViewProduct && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.85)',
            zIndex: 1100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
          }}
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            style={{
              background: '#091322',
              border: '1px solid var(--tmz-gold)',
              maxWidth: '840px',
              width: '100%',
              padding: '30px',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '30px',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuickViewProduct(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}
            >
              ✕
            </button>

            {/* Gallery */}
            <div>
              <div style={{ height: '320px', background: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '12px' }}>
                <img
                  src={quickViewProduct.images[selectedImageIndex] || quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain' }}
                />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                {quickViewProduct.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt="Thumbnail"
                    onClick={() => setSelectedImageIndex(idx)}
                    style={{
                      width: '55px',
                      height: '55px',
                      objectFit: 'contain',
                      background: '#000',
                      cursor: 'pointer',
                      border: idx === selectedImageIndex ? '1px solid var(--tmz-gold)' : '1px solid #333',
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Specs */}
            <div>
              <h2 style={{ fontFamily: 'var(--tmz-font-heading)', color: '#fff', margin: '0 0 10px', fontSize: '26px' }}>
                {quickViewProduct.name}
              </h2>
              <div style={{ color: 'var(--tmz-gold)', fontSize: '22px', fontWeight: 'bold', marginBottom: '14px' }}>
                ${quickViewProduct.price.toFixed(2)}
              </div>
              <p style={{ fontSize: '13px', color: 'var(--tmz-text-muted)', lineHeight: '1.6', marginBottom: '18px' }}>
                {quickViewProduct.description}
              </p>

              <div style={{ background: '#000', padding: '12px', fontSize: '12px', marginBottom: '20px', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                  <span style={{ color: '#888' }}>Movement:</span>
                  <span>{quickViewProduct.movement}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                  <span style={{ color: '#888' }}>Case Diameter:</span>
                  <span>{quickViewProduct.caseDiameter}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '3px 0' }}>
                  <span style={{ color: '#888' }}>Water Resistance:</span>
                  <span>{quickViewProduct.waterResistance}</span>
                </div>
              </div>

              <button
                className="tmz-btn-shopnow-box"
                style={{ width: '100%', margin: 0, textAlign: 'center' }}
                onClick={() => {
                  addToCart(quickViewProduct)
                  setQuickViewProduct(null)
                }}
              >
                Add to Shopping Bag
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= 17. SEARCH MODAL ================= */}
      {isSearchOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            style={{ background: '#081220', border: '1px solid var(--tmz-gold)', maxWidth: '600px', width: '100%', padding: '24px' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
              <h3 style={{ margin: 0, fontFamily: 'var(--tmz-font-heading)', color: '#fff' }}>Search Watches</h3>
              <button onClick={() => setIsSearchOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '18px', cursor: 'pointer' }}>✕</button>
            </div>
            <input
              type="text"
              placeholder="Search by model, calibre, case diameter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              className="tmz-sub-input"
              style={{ width: '100%', marginBottom: '14px' }}
            />
            <div style={{ maxHeight: '280px', overflowY: 'auto' }}>
              {searchResults.map((p) => (
                <div
                  key={p.id}
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', cursor: 'pointer' }}
                  onClick={() => {
                    setQuickViewProduct(p)
                    setIsSearchOpen(false)
                  }}
                >
                  <img src={p.images[0]} alt={p.name} style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#000' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontSize: '13px', fontWeight: 600 }}>{p.name}</div>
                    <div style={{ color: '#888', fontSize: '11px' }}>{p.movement}</div>
                  </div>
                  <div style={{ color: 'var(--tmz-gold)', fontWeight: 600, fontSize: '13px' }}>${p.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= 18. TOAST NOTIFICATION ================= */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#091526',
            border: '1px solid var(--tmz-gold)',
            color: '#fff',
            padding: '12px 20px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.8)',
            zIndex: 2000,
            fontSize: '13px',
          }}
        >
          {toastMessage}
        </div>
      )}
    </div>
  )
}

export default TimzeeStorefront
