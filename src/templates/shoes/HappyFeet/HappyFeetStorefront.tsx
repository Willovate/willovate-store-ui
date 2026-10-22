import React, { useState, useEffect } from 'react'
import type {
  HappyFeetStorefrontProps,
  HappyFeetProduct,
  HappyFeetCartItem,
} from './types'
import {
  HAPPY_FEET_HERO_SLIDES,
  HAPPY_FEET_CATEGORIES,
  HAPPY_FEET_FRESH_PICKS,
  HAPPY_FEET_PROMO_BANNERS,
  HAPPY_FEET_FEATURED_DEALS,
  HAPPY_FEET_BRANDS,
  HAPPY_FEET_SUGGESTED_PRODUCTS,
  HAPPY_FEET_FAQS,
  HAPPY_FEET_BLOGS,
  HAPPY_FEET_VALUE_PROPS,
  HAPPY_FEET_INSTA_IMAGES,
} from './data/happyFeetData'
import {
  StorefrontSearchModal,
  StorefrontWishlistDrawer,
  StorefrontAccountModal,
  StorefrontMobileNavDrawer,
  type MobileNavItem,
} from '../../common/StorefrontModals'
import './styles/happyFeet.css'

export const HappyFeetStorefront: React.FC<HappyFeetStorefrontProps> = ({
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
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR')
  const [activeHeroSlide, setActiveHeroSlide] = useState(0)
  const [freshCategoryTab, setFreshCategoryTab] = useState<'All' | 'Men' | 'Women' | 'Kids' | 'Unisex'>('All')
  const [suggestedTab, setSuggestedTab] = useState<'All' | 'Men' | 'Women' | 'Unisex'>('All')
  const [cartItems, setCartItems] = useState<HappyFeetCartItem[]>([
    {
      product: HAPPY_FEET_FRESH_PICKS[0],
      quantity: 1,
      selectedColor: '#e1680b',
      selectedSize: 9,
    },
    {
      product: HAPPY_FEET_FRESH_PICKS[1],
      quantity: 1,
      selectedColor: '#1e293b',
      selectedSize: 10,
    },
  ])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [selectedProduct, setSelectedProduct] = useState<HappyFeetProduct | null>(null)
  const [openFaqId, setOpenFaqId] = useState<string | null>('faq-1')
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [countdown, setCountdown] = useState({ hours: 18, minutes: 42, seconds: 15 })

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId)
      if (exists) {
        showToast('Removed from Wishlist')
        return prev.filter((id) => id !== productId)
      }
      showToast('Saved to Wishlist ❤️')
      return [...prev, productId]
    })
  }

  const navItems: MobileNavItem[] = [
    {
      label: 'Home',
      children: [
        { label: 'Featured Drops', onClick: () => { const el = document.getElementById('hf-deals-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Fresh Picks', onClick: () => { const el = document.getElementById('hf-fresh-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Shop',
      children: [
        { label: 'Men Sneakers', onClick: () => { setFreshCategoryTab('Men'); const el = document.getElementById('hf-fresh-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Women Running', onClick: () => { setFreshCategoryTab('Women'); const el = document.getElementById('hf-fresh-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Kids Sports', onClick: () => { setFreshCategoryTab('Kids'); const el = document.getElementById('hf-fresh-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Blog',
      children: [
        { label: 'Shoe Trends & Care', onClick: () => { const el = document.getElementById('hf-blog-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Pages',
      children: [
        { label: 'Brand Stories', onClick: () => { const el = document.getElementById('hf-brands-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Customer FAQ', onClick: () => { const el = document.getElementById('hf-faq-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'About',
      onClick: () => { const el = document.getElementById('hf-brands-section'); el?.scrollIntoView({ behavior: 'smooth' }) },
    },
  ]

  // Countdown timer simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return { hours: 24, minutes: 0, seconds: 0 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const currentSlide = HAPPY_FEET_HERO_SLIDES[activeHeroSlide]

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleAddToCart = (product: HappyFeetProduct) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          selectedColor: product.colors[0],
          selectedSize: product.sizes ? product.sizes[0] : 9,
        },
      ]
    })
    showToast(`Added "${product.name}" to cart!`)
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
        .filter(Boolean) as HappyFeetCartItem[]
    )
  }

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )

  const formatPrice = (inrAmount: number) => {
    if (currency === 'USD') {
      const usd = Math.round(inrAmount / 83)
      return `$${usd}.00 USD`
    }
    return `Rs. ${inrAmount.toLocaleString('en-IN')}.00`
  }

  const filteredFreshPicks =
    freshCategoryTab === 'All'
      ? HAPPY_FEET_FRESH_PICKS
      : HAPPY_FEET_FRESH_PICKS.filter((p) => p.gender === freshCategoryTab)

  const filteredSuggested =
    suggestedTab === 'All'
      ? HAPPY_FEET_SUGGESTED_PRODUCTS
      : HAPPY_FEET_SUGGESTED_PRODUCTS.filter((p) => p.gender === suggestedTab)

  return (
    <div
      className={`hf-storefront-root device-${effectiveDevice}`}
      style={
        customAccentColor
          ? ({ '--hf-orange': customAccentColor } as React.CSSProperties)
          : undefined
      }
    >
      {/* 1. TOP UTILITY BAR */}
      <div className="hf-utility-bar">
        <div className="hf-social-pills">
          <a href="#twitter" className="hf-social-pill" title="X (Twitter)">𝕏</a>
          <a href="#facebook" className="hf-social-pill" title="Facebook">f</a>
          <a href="#instagram" className="hf-social-pill" title="Instagram">📸</a>
        </div>
        <div className="hf-utility-right">
          <div className="hf-utility-dropdown" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>{currency === 'INR' ? '🇮🇳' : '🇺🇸'}</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as 'INR' | 'USD')}
              style={{ background: 'transparent', border: 'none', color: 'inherit', fontWeight: 600, cursor: 'pointer', outline: 'none' }}
              aria-label="Currency Selector"
            >
              <option value="INR" style={{ color: '#000' }}>INR (Rs.)</option>
              <option value="USD" style={{ color: '#000' }}>USD ($)</option>
            </select>
          </div>
          <div className="hf-utility-dropdown">
            <span>English</span>
            <span style={{ fontSize: '10px' }}>▼</span>
          </div>
          <button
            type="button"
            className="hf-utility-auth"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', display: 'flex', alignItems: 'center', gap: '6px' }}
            onClick={() => setIsAccountOpen(true)}
          >
            <span>👤</span>
            <span>Sign in</span>
          </button>
        </div>
      </div>

      {/* 2. MAIN HEADER & NAVBAR */}
      <header className="hf-main-header">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="hf-hamburger-btn"
          onClick={() => setIsMobileNavOpen(true)}
          title="Menu"
          aria-label="Open mobile menu"
        >
          ☰
        </button>

        <a href="#home" className="hf-logo-wrap">
          <svg className="hf-logo-icon-svg" viewBox="0 0 48 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 22C12 22 18 19 23 15C27 12 32 10 38 10C42 10 44 12 44 14C44 17 38 21 34 23C28 26 21 27 15 27C10 27 6 25 6 22Z"
              fill="#ffffff"
            />
            <path
              d="M18 14C22 10 28 6 34 5C38 4 41 6 42 9C40 10 36 12 32 14C27 17 22 18 18 18V14Z"
              fill="var(--hf-orange)"
            />
            <path
              d="M4 25C10 28 20 29 28 28C36 27 42 24 46 20C45 23 40 26 33 28C26 30 14 30 4 25Z"
              fill="#ffffff"
            />
          </svg>
          <div className="hf-logo-text">
            <span>HAPPY</span>
            <span style={{ color: 'var(--hf-orange)' }}>FEET</span>
          </div>
        </a>

        <ul className="hf-nav-menu">
          {navItems.map((item) => (
            <li key={item.label} className="hf-nav-item wv-nav-dropdown-wrap">
              <span
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

        <div className="hf-header-actions">
          <form className="hf-search-form" onSubmit={(e) => { e.preventDefault(); setIsSearchOpen(true) }}>
            <input
              type="text"
              className="hf-search-input"
              placeholder="Search shoes..."
              onFocus={() => setIsSearchOpen(true)}
              onClick={() => setIsSearchOpen(true)}
              readOnly
            />
            <button type="button" className="hf-search-submit" title="Search" onClick={() => setIsSearchOpen(true)}>
              🔍
            </button>
          </form>

          <button
            type="button"
            className="hf-cart-btn"
            onClick={() => setIsWishlistOpen(true)}
            title="Wishlist"
            style={{ position: 'relative' }}
          >
            🤍
            {wishlist.length > 0 && (
              <span className="hf-cart-badge">{wishlist.length}</span>
            )}
          </button>

          <button
            type="button"
            className="hf-cart-btn"
            onClick={() => setIsCartOpen(true)}
            title="Shopping Cart"
          >
            🛒
            {totalCartCount > 0 && (
              <span className="hf-cart-badge">{totalCartCount}</span>
            )}
          </button>
        </div>
      </header>

      {/* 3. HERO BANNER STAGE */}
      <section className="hf-hero-section">
        <div className="hf-hero-container">
          <div className="hf-hero-content">
            <div className="hf-hero-pill-edition">{currentSlide.edition}</div>
            <h1 className="hf-hero-headline">{currentSlide.headline}</h1>
            <p className="hf-hero-description">{currentSlide.description}</p>
            <button
              type="button"
              className="hf-hero-cta-btn"
              onClick={() => {
                if (template && onUseTemplate) {
                  onUseTemplate(template)
                } else {
                  showToast('Navigating to collection...')
                }
              }}
            >
              {currentSlide.buttonText}
            </button>

            {/* Slide Navigation Dots */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
              {HAPPY_FEET_HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveHeroSlide(idx)}
                  style={{
                    width: activeHeroSlide === idx ? '28px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    backgroundColor:
                      activeHeroSlide === idx ? 'var(--hf-orange)' : 'rgba(0,0,0,0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                  }}
                  title={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          <div className="hf-hero-visual">
            <img
              src={currentSlide.image}
              alt="Happy Feet Hero Sneakers"
              className="hf-hero-sneaker-img"
            />

            {/* Rotating Stamp Badge */}
            <div className="hf-rotating-badge-wrap">
              <svg className="hf-rotating-badge-svg" viewBox="0 0 100 100">
                <path
                  id="textPathHero"
                  d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
                  fill="none"
                />
                <text font-size="8.5" font-weight="800" fill="#000000" letterSpacing="2">
                  <textPath href="#textPathHero" startOffset="0%">
                    {currentSlide.badgeText} •
                  </textPath>
                </text>
              </svg>
              <div className="hf-badge-center-indicator" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCT CATEGORIES (CIRCULAR SPLASH CARDS) */}
      <section className="hf-categories-section">
        <div className="hf-section-header">
          <h2 className="hf-section-title">OUR PRODUCT CATEGORY</h2>
          <p className="hf-section-subtitle">
            Step into style with our diverse shoe collection, crafted for every journey.
          </p>
        </div>

        <div className="hf-categories-grid">
          {HAPPY_FEET_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="hf-category-card"
              onClick={() => showToast(`Browsing ${cat.name} category`)}
            >
              <div
                className="hf-category-circle-wrap"
                style={{ backgroundColor: `${cat.splashColor}15` }}
              >
                <img src={cat.image} alt={cat.name} className="hf-category-img" />
              </div>
              <div className="hf-category-name">{cat.name}</div>
              <div className="hf-category-count">{cat.itemCount} Items</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. FRESH PICKS FOR YOU */}
      <section className="hf-fresh-picks-section">
        <div className="hf-section-header">
          <h2 className="hf-section-title">FRESH PICKS FOR YOU</h2>
          <p className="hf-section-subtitle">
            Discover the ultimate blend of comfort, style, and performance in every pair.
          </p>
        </div>

        <div className="hf-tabs-wrap">
          {(['All', 'Men', 'Women', 'Kids', 'Unisex'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              className={`hf-tab-pill ${freshCategoryTab === tab ? 'active' : ''}`}
              onClick={() => setFreshCategoryTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="hf-products-grid">
          {filteredFreshPicks.map((product) => (
            <div key={product.id} className="hf-product-card" style={{ position: 'relative' }}>
              <button
                type="button"
                className={`wv-card-wish-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleWishlist(product.id)
                }}
                title={wishlist.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                aria-label="Toggle Wishlist"
              >
                {wishlist.includes(product.id) ? '❤️' : '🤍'}
              </button>
              <div className="hf-product-img-wrap">
                <img
                  src={product.image}
                  alt={product.name}
                  className="hf-product-img"
                  onClick={() => setSelectedProduct(product)}
                />
                {product.discount && (
                  <span className="hf-product-badge sale">{product.discount}</span>
                )}
                {product.isHot && (
                  <span className="hf-product-badge hot">HOT</span>
                )}
                {product.isNew && (
                  <span className="hf-product-badge new">NEW</span>
                )}
              </div>

              <div className="hf-product-content">
                <div className="hf-swatches-row">
                  {product.colors.map((color, idx) => (
                    <span
                      key={idx}
                      className="hf-color-dot"
                      style={{ backgroundColor: color }}
                      title={`Color option ${idx + 1}`}
                    />
                  ))}
                </div>

                <div
                  className="hf-product-title"
                  onClick={() => setSelectedProduct(product)}
                >
                  {product.name}
                </div>

                <div className="hf-rating-row">
                  <span>★★★★★</span>
                  <span className="hf-reviews-count">({product.reviewCount})</span>
                </div>

                <div className="hf-product-price-row">
                  <div className="hf-price-box">
                    <span className="hf-current-price">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="hf-original-price">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    className="hf-add-cart-btn"
                    onClick={() => handleAddToCart(product)}
                    title="Add to cart"
                  >
                    🛒
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="hf-center-btn-row">
          <button
            type="button"
            className="hf-view-more-btn"
            onClick={() => showToast('Loading full catalog...')}
          >
            VIEW MORE
          </button>
        </div>
      </section>

      {/* 6. 3 HIGHLIGHT PROMO BANNERS */}
      <section className="hf-promo-banners-section">
        {HAPPY_FEET_PROMO_BANNERS.map((promo) => (
          <div key={promo.id} className={`hf-promo-card ${promo.bgTheme}`}>
            <div className="hf-promo-content">
              <div className="hf-promo-tag">{promo.tag}</div>
              <h3 className="hf-promo-title">{promo.title}</h3>
              <p className="hf-promo-sub">{promo.subtitle}</p>
              <button
                type="button"
                className="hf-promo-btn"
                onClick={() => showToast(`Opened ${promo.title}`)}
              >
                {promo.buttonText} →
              </button>
            </div>
            <div className="hf-promo-visual">
              <img src={promo.image} alt={promo.title} className="hf-promo-img" />
            </div>
          </div>
        ))}
      </section>

      {/* 7. TODAY'S FEATURED DEALS */}
      <section className="hf-deals-section">
        <div className="hf-section-header" style={{ textAlign: 'center' }}>
          <h2 className="hf-section-title">TODAY'S FEATURED DEALS</h2>
          <div className="hf-countdown-badge">
            <span>⏱ Hurry Up! Deals End In:</span>
            <span>
              {String(countdown.hours).padStart(2, '0')}h :{' '}
              {String(countdown.minutes).padStart(2, '0')}m :{' '}
              {String(countdown.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>

        <div className="hf-deals-grid">
          {HAPPY_FEET_FEATURED_DEALS.map((deal) => {
            const soldPercent = Math.round(
              ((deal.soldCount || 10) / (deal.stockCount || 50)) * 100
            )
            return (
              <div key={deal.id} className="hf-product-card" style={{ position: 'relative' }}>
                <button
                  type="button"
                  className={`wv-card-wish-btn ${wishlist.includes(deal.id) ? 'active' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation()
                    toggleWishlist(deal.id)
                  }}
                  title={wishlist.includes(deal.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  aria-label="Toggle Wishlist"
                >
                  {wishlist.includes(deal.id) ? '❤️' : '🤍'}
                </button>
                <div className="hf-product-img-wrap">
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="hf-product-img"
                    onClick={() => setSelectedProduct(deal)}
                  />
                  {deal.discount && (
                    <span className="hf-product-badge sale">{deal.discount}</span>
                  )}
                </div>

                <div className="hf-product-content">
                  <div
                    className="hf-product-title"
                    onClick={() => setSelectedProduct(deal)}
                  >
                    {deal.name}
                  </div>

                  <div className="hf-rating-row">
                    <span>★★★★★</span>
                    <span className="hf-reviews-count">({deal.reviewCount})</span>
                  </div>

                  <div className="hf-product-price-row">
                    <div className="hf-price-box">
                      <span className="hf-current-price">
                        {formatPrice(deal.price)}
                      </span>
                      {deal.originalPrice && (
                        <span className="hf-original-price">
                          {formatPrice(deal.originalPrice)}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      className="hf-add-cart-btn"
                      onClick={() => handleAddToCart(deal)}
                      title="Add to cart"
                    >
                      🛒
                    </button>
                  </div>

                  <div className="hf-progress-bar-wrap">
                    <div
                      className="hf-progress-fill"
                      style={{ width: `${soldPercent}%` }}
                    />
                  </div>
                  <div className="hf-stock-status-row">
                    <span>Available: {(deal.stockCount || 50) - (deal.soldCount || 10)}</span>
                    <span>Sold: {deal.soldCount || 10}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* 8. MOST POPULAR BRANDS */}
      <section className="hf-brands-section">
        <div className="hf-section-header">
          <h2 className="hf-section-title">MOST POPULAR BRANDS</h2>
          <p className="hf-section-subtitle">
            Explore iconic collaborations and heritage footwear from globally renowned labels.
          </p>
        </div>

        <div className="hf-brands-cards-grid">
          {HAPPY_FEET_BRANDS.map((brand) => (
            <div
              key={brand.id}
              className="hf-brand-showcase-card"
              onClick={() => showToast(`Selected brand: ${brand.name}`)}
            >
              <img
                src={brand.image}
                alt={brand.name}
                className="hf-brand-showcase-img"
              />
              <div className="hf-brand-overlay">
                <div className="hf-brand-name-pill">{brand.name}</div>
                <div className="hf-brand-tagline">{brand.tagline}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="hf-brand-logos-strip">
          <span className="hf-brand-logo-text">DIADORA</span>
          <span className="hf-brand-logo-text">LOTTO</span>
          <span className="hf-brand-logo-text">FILA</span>
          <span className="hf-brand-logo-text">PUMA</span>
          <span className="hf-brand-logo-text">NIKE</span>
        </div>
      </section>

      {/* 9. BIG SALE HORIZONTAL BANNER */}
      <div className="hf-big-sale-banner">
        <div className="hf-big-sale-text-col">
          <div className="hf-big-sale-neon-title">
            BIG SALE <span>BIG SALE</span>
          </div>
          <p className="hf-big-sale-sub">
            UP TO 50% OFF ON SELECTED HIGH-PERFORMANCE SNEAKERS & STREET TRAINERS
          </p>
          <button
            type="button"
            className="hf-big-sale-btn"
            onClick={() => showToast('Claiming sale discount...')}
          >
            SHOP SALE NOW →
          </button>
        </div>
      </div>

      {/* 10. SUGGESTED FOR YOU (COMPACT 2-COL LIST) */}
      <section className="hf-suggested-section">
        <div className="hf-section-header" style={{ textAlign: 'center' }}>
          <h2 className="hf-section-title">SUGGESTED FOR YOU</h2>
          <p className="hf-section-subtitle">
            Hand-selected favorites tailored to your personal aesthetic and active lifestyle.
          </p>
        </div>

        <div className="hf-tabs-wrap">
          {(['All', 'Men', 'Women', 'Unisex'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              className={`hf-tab-pill ${suggestedTab === tab ? 'active' : ''}`}
              onClick={() => setSuggestedTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="hf-suggested-grid">
          {filteredSuggested.map((item) => (
            <div key={item.id} className="hf-suggested-item-card">
              <div
                className="hf-suggested-thumb-wrap"
                onClick={() => setSelectedProduct(item)}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="hf-suggested-thumb"
                />
              </div>
              <div className="hf-suggested-info">
                <div
                  className="hf-suggested-title"
                  onClick={() => setSelectedProduct(item)}
                >
                  {item.name}
                </div>
                <div className="hf-rating-row" style={{ marginBottom: '6px' }}>
                  <span>★★★★★</span>
                </div>
                <div className="hf-suggested-price">
                  {formatPrice(item.price)}
                </div>
              </div>
              <button
                type="button"
                className="hf-add-cart-btn"
                style={{ width: '34px', height: '34px' }}
                onClick={() => handleAddToCart(item)}
                title="Quick add"
              >
                +
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* 11. TESTIMONIAL REVIEW SECTION */}
      <section className="hf-review-section">
        <div className="hf-review-container">
          <div className="hf-review-floating-card">
            <img
              src="https://bt-happy-feet.myshopify.com/cdn/shop/files/shoe07.1.jpg?v=1714803260&width=533"
              alt="Floating sneaker"
              className="hf-review-floating-thumb"
            />
            <div className="hf-review-floating-text">
              <div>Sunlight Soft Soled Walkers</div>
              <div style={{ color: 'var(--hf-orange)' }}>Rs. 2,499.00</div>
            </div>
          </div>

          <div style={{ color: '#ffeb3b', fontSize: '20px', marginBottom: '16px' }}>
            ★★★★★
          </div>

          <blockquote className="hf-review-quote">
            "The comfort level of Happy Feet sneakers is truly unmatched. I've worn them for 12-hour workdays and long marathon sessions with zero fatigue. The craftsmanship is flawless."
          </blockquote>

          <div className="hf-review-author-wrap">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80"
              alt="Sarah Jenkins"
              className="hf-review-avatar"
            />
            <div>
              <div className="hf-review-author-name">Sarah Jenkins</div>
              <div className="hf-review-author-role">Verified Buyer • Mumbai, IN</div>
            </div>
          </div>
        </div>
      </section>

      {/* 12. ARCH FEATURE SECTION */}
      <section className="hf-arch-section">
        <div className="hf-arch-frame-container">
          <img
            src="https://bt-happy-feet.myshopify.com/cdn/shop/files/Group141003.png?v=1702538837&width=533"
            alt="Craftsmanship showcase"
            className="hf-arch-img"
          />
          <button
            type="button"
            className="hf-arch-play-btn"
            onClick={() => showToast('Playing brand story film...')}
            title="Watch film"
          >
            ▶
          </button>
        </div>
      </section>

      {/* 13. FREQUENTLY ASKED QUESTIONS */}
      <section className="hf-faq-section">
        <div className="hf-section-header" style={{ textAlign: 'center' }}>
          <h2 className="hf-section-title">Frequently Asked Questions</h2>
          <p className="hf-section-subtitle">
            Find prompt answers to the most common queries about our sizing, materials, and shipping.
          </p>
        </div>

        <div className="hf-faq-container">
          {HAPPY_FEET_FAQS.map((faq) => {
            const isOpen = openFaqId === faq.id
            return (
              <div key={faq.id} className={`hf-faq-item ${isOpen ? 'open' : ''}`}>
                <div
                  className="hf-faq-question"
                  onClick={() => setOpenFaqId(isOpen ? null : faq.id)}
                >
                  <span>{faq.question}</span>
                  <span className="hf-faq-toggle-icon">{isOpen ? '−' : '+'}</span>
                </div>
                {isOpen && <div className="hf-faq-answer">{faq.answer}</div>}
              </div>
            )
          })}
        </div>
      </section>

      {/* 14. LATEST NEWS (BLOG SECTION) */}
      <section className="hf-blog-section">
        <div className="hf-section-header" style={{ textAlign: 'center' }}>
          <h2 className="hf-section-title">Latest News</h2>
          <p className="hf-section-subtitle">
            Insights, sneaker culture stories, and style guides from our design team.
          </p>
        </div>

        <div className="hf-blog-grid">
          {HAPPY_FEET_BLOGS.map((blog) => (
            <div key={blog.id} className="hf-blog-card">
              <div className="hf-blog-img-wrap">
                <img src={blog.image} alt={blog.title} className="hf-blog-img" />
              </div>
              <div className="hf-blog-info">
                <div className="hf-blog-meta">
                  {blog.date} • {blog.category}
                </div>
                <h3 className="hf-blog-title">{blog.title}</h3>
                <p className="hf-blog-excerpt">{blog.excerpt}</p>
                <a
                  href="#read"
                  className="hf-blog-link"
                  onClick={(e) => {
                    e.preventDefault()
                    showToast(`Reading "${blog.title}"`)
                  }}
                >
                  Read Article →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 15. VALUE PROPS (ORANGE BANNER) */}
      <div className="hf-value-props-bar">
        <div className="hf-value-props-grid">
          {HAPPY_FEET_VALUE_PROPS.map((vp) => (
            <div key={vp.id} className="hf-value-item">
              <div className="hf-value-icon-box">
                {vp.icon === 'truck' && '🚚'}
                {vp.icon === 'shield' && '🛡️'}
                {vp.icon === 'headphones' && '🎧'}
                {vp.icon === 'rotate-ccw' && '🔄'}
              </div>
              <div>
                <div className="hf-value-title">{vp.title}</div>
                <div className="hf-value-sub">{vp.subtitle}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 16. INSTAGRAM LIFESTYLE GALLERY */}
      <div className="hf-insta-section">
        {HAPPY_FEET_INSTA_IMAGES.map((img, idx) => (
          <div
            key={idx}
            className="hf-insta-card"
            onClick={() => showToast('Opening Instagram photo...')}
          >
            <img src={img} alt={`Insta showcase ${idx + 1}`} className="hf-insta-img" />
            <div className="hf-insta-overlay">📸</div>
          </div>
        ))}
      </div>

      {/* 17. DARK FOOTER */}
      <footer className="hf-footer">
        <div className="hf-footer-top">
          <div className="hf-footer-about">
            <div className="hf-logo-text" style={{ fontSize: '22px' }}>
              <span>HAPPY</span>
              <span style={{ color: 'var(--hf-orange)' }}>FEET</span>
            </div>
            <p className="hf-footer-desc">
              Crafting the world's most comfortable, stylish, and durable footwear for everyday explorers, runners, and athletes worldwide.
            </p>
            <div className="hf-footer-contacts">
              <div>📍 102 Footwear Blvd, Suite 400</div>
              <div>📞 +1 (800) 427-7933</div>
              <div>✉️ support@happyfeet.com</div>
            </div>
          </div>

          <div>
            <div className="hf-footer-col-title">Shop</div>
            <ul className="hf-footer-links">
              <li className="hf-footer-link">Men's Sneakers</li>
              <li className="hf-footer-link">Women's Collection</li>
              <li className="hf-footer-link">Running Shoes</li>
              <li className="hf-footer-link">Casual Walkers</li>
              <li className="hf-footer-link">Limited Edition Drops</li>
            </ul>
          </div>

          <div>
            <div className="hf-footer-col-title">Customer</div>
            <ul className="hf-footer-links">
              <li className="hf-footer-link">Track Your Order</li>
              <li className="hf-footer-link">Shipping Policy</li>
              <li className="hf-footer-link">Easy 30-Day Returns</li>
              <li className="hf-footer-link">Shoe Size Guide</li>
              <li className="hf-footer-link">FAQ & Support</li>
            </ul>
          </div>

          <div>
            <div className="hf-footer-col-title">Newsletter</div>
            <p style={{ fontSize: '13px', color: '#a3a3a3', lineHeight: '1.6' }}>
              Sign up to be the first to know about new collections, seasonal sales, and member-exclusive drops.
            </p>
            <form
              className="hf-newsletter-box"
              onSubmit={(e) => {
                e.preventDefault()
                showToast('Thank you for subscribing!')
              }}
            >
              <input
                type="email"
                className="hf-newsletter-input"
                placeholder="Enter your email"
                required
              />
              <button type="submit" className="hf-newsletter-submit" title="Subscribe">
                →
              </button>
            </form>
          </div>
        </div>

        <div className="hf-footer-bottom">
          <div>© 2026, Happy Feet. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '14px', fontSize: '18px' }}>
            <span>💳 Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
            <span>UPI</span>
          </div>
        </div>
      </footer>

      {/* 18. SLIDE-OUT CART DRAWER */}
      {isCartOpen && (
        <div className="hf-drawer-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="hf-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="hf-drawer-header">
              <h3 className="hf-drawer-title">Shopping Cart ({totalCartCount})</h3>
              <button
                type="button"
                className="hf-drawer-close"
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="hf-drawer-items">
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#888' }}>
                  Your cart is currently empty.
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.product.id} className="hf-cart-item-row">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="hf-cart-thumb"
                    />
                    <div className="hf-cart-item-info">
                      <div className="hf-cart-item-name">{item.product.name}</div>
                      <div className="hf-cart-item-price">
                        {formatPrice(item.product.price)}
                      </div>
                      <div className="hf-cart-qty-ctrl">
                        <button
                          type="button"
                          className="hf-qty-btn"
                          onClick={() => updateQuantity(item.product.id, -1)}
                        >
                          −
                        </button>
                        <span style={{ fontSize: '13px', fontWeight: 700 }}>
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          className="hf-qty-btn"
                          onClick={() => updateQuantity(item.product.id, 1)}
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
              <div className="hf-drawer-footer">
                <div className="hf-drawer-subtotal">
                  <span>Subtotal:</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                <button
                  type="button"
                  className="hf-checkout-btn"
                  onClick={() => {
                    setIsCartOpen(false)
                    showToast('Proceeding to checkout...')
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 19. QUICK VIEW MODAL */}
      {selectedProduct && (
        <div
          className="hf-drawer-backdrop"
          onClick={() => setSelectedProduct(null)}
          style={{ justifyContent: 'center', alignItems: 'center' }}
        >
          <div
            style={{
              background: '#ffffff',
              borderRadius: '16px',
              maxWidth: '600px',
              width: '90%',
              padding: '24px',
              position: 'relative',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '22px',
                cursor: 'pointer',
              }}
              onClick={() => setSelectedProduct(null)}
            >
              ✕
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div
                style={{
                  background: '#f8f8f8',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  style={{ width: '90%', height: 'auto', objectFit: 'contain' }}
                />
              </div>
              <div>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '20px' }}>
                  {selectedProduct.name}
                </h3>
                <div style={{ color: '#f59e0b', marginBottom: '12px' }}>
                  ★★★★★ ({selectedProduct.reviewCount} reviews)
                </div>
                <div style={{ fontSize: '22px', fontWeight: 800, marginBottom: '14px' }}>
                  {formatPrice(selectedProduct.price)}
                </div>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6' }}>
                  {selectedProduct.description ||
                    'Engineered with high-traction rubber outsole and dual-layer breathable knit canvas for unmatched support.'}
                </p>
                <button
                  type="button"
                  className="hf-checkout-btn"
                  style={{ marginTop: '16px' }}
                  onClick={() => {
                    handleAddToCart(selectedProduct)
                    setSelectedProduct(null)
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <StorefrontSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={[...HAPPY_FEET_FRESH_PICKS, ...HAPPY_FEET_FEATURED_DEALS, ...HAPPY_FEET_SUGGESTED_PRODUCTS].map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category,
        }))}
        onSelectProduct={(p) => {
          const fullProd = [...HAPPY_FEET_FRESH_PICKS, ...HAPPY_FEET_FEATURED_DEALS, ...HAPPY_FEET_SUGGESTED_PRODUCTS].find((x) => x.id === p.id)
          if (fullProd) setSelectedProduct(fullProd)
        }}
        accentColor={customAccentColor || '#e1680b'}
        currencyPrefix={currency === 'USD' ? '$' : 'Rs. '}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
        placeholder="Search running shoes, fresh picks, deals..."
        popularTags={['Sneakers', 'Running', 'Deals', 'Unisex']}
      />

      {/* Wishlist Drawer */}
      <StorefrontWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        allProducts={[...HAPPY_FEET_FRESH_PICKS, ...HAPPY_FEET_FEATURED_DEALS, ...HAPPY_FEET_SUGGESTED_PRODUCTS].map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category,
        }))}
        currencyPrefix={currency === 'USD' ? '$' : 'Rs. '}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
        onRemoveWishlist={toggleWishlist}
        onAddToCart={(p) => {
          const fullProd = [...HAPPY_FEET_FRESH_PICKS, ...HAPPY_FEET_FEATURED_DEALS, ...HAPPY_FEET_SUGGESTED_PRODUCTS].find((x) => x.id === p.id)
          if (fullProd) handleAddToCart(fullProd)
        }}
        onOpenProduct={(p) => {
          const fullProd = [...HAPPY_FEET_FRESH_PICKS, ...HAPPY_FEET_FEATURED_DEALS, ...HAPPY_FEET_SUGGESTED_PRODUCTS].find((x) => x.id === p.id)
          if (fullProd) setSelectedProduct(fullProd)
        }}
        accentColor={customAccentColor || '#e1680b'}
      />

      {/* Account Modal */}
      <StorefrontAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        brandName="Happy Feet"
        accentColor={customAccentColor || '#e1680b'}
      />

      {/* Mobile Navigation Drawer */}
      <StorefrontMobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        brandName="Happy Feet"
        navItems={navItems}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        cartCount={totalCartCount}
        contactPhone="+1 (800) 555-HAPP"
        contactEmail="support@happyfeet.com"
        accentColor={customAccentColor || '#e1680b'}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: '24px',
            right: '24px',
            background: '#111111',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '30px',
            fontSize: '14px',
            fontWeight: 600,
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}

export default HappyFeetStorefront
