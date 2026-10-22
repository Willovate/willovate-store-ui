import React, { useState } from 'react'
import type {
  FootwearWorkDoProduct,
  FootwearWorkDoCartItem,
  FootwearWorkDoStorefrontProps,
} from './types'
import {
  FOOTWEAR_HERO_SLIDES,
  FOOTWEAR_CATEGORIES,
  FOOTWEAR_SNEAKERS_LOVE,
  FOOTWEAR_BESTSELLERS,
  FOOTWEAR_PROMO_BANNER,
  FOOTWEAR_FEATURE_CARDS,
  FOOTWEAR_TESTIMONIALS,
  FOOTWEAR_BLOGS,
  FOOTWEAR_MOST_LOVED_PRODUCTS,
} from './data/footwearWorkDoData'
import {
  StorefrontSearchModal,
  StorefrontWishlistDrawer,
  StorefrontAccountModal,
  StorefrontMobileNavDrawer,
  type MobileNavItem,
} from '../../common/StorefrontModals'
import './styles/footwearWorkDo.css'

export const FootwearWorkDoStorefront: React.FC<FootwearWorkDoStorefrontProps> = ({
  template: _template,
  device = 'desktop',
  customAccentColor,
  onUseTemplate,
  onClose,
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR')
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({
    'fwd-sneaker-1': 8,
    'fwd-sneaker-2': 9,
    'fwd-sneaker-3': 8,
    'fwd-sneaker-4': 9,
    'fwd-best-1': 9,
    'fwd-best-2': 8,
  })
  const [cart, setCart] = useState<FootwearWorkDoCartItem[]>([
    {
      product: FOOTWEAR_SNEAKERS_LOVE[0],
      quantity: 1,
      selectedSize: 8,
    },
  ])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<'All' | 'Men' | 'Women' | 'Casual'>('All')
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [quickViewProduct, setQuickViewProduct] = useState<FootwearWorkDoProduct | null>(null)

  const activeColor = customAccentColor || '#ffea28'

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

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

  const formatPrice = (priceInr: number) => {
    if (currency === 'USD') {
      const usd = Math.round(priceInr / 83)
      return `$${usd}.00 USD`
    }
    return `Rs. ${priceInr.toLocaleString('en-IN')}.00 INR`
  }

  const handleSelectSize = (productId: string, size: number) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }))
  }

  const handleAddToCart = (product: FootwearWorkDoProduct) => {
    const chosenSize = selectedSizes[product.id] || 8
    setCart((prev) => {
      const match = prev.find(
        (i) => i.product.id === product.id && i.selectedSize === chosenSize
      )
      if (match) {
        return prev.map((i) =>
          i.product.id === product.id && i.selectedSize === chosenSize
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { product, quantity: 1, selectedSize: chosenSize }]
    })
    showToast(`Added ${product.name} (Size ${chosenSize}) to cart!`)
  }

  const handleUpdateQty = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev]
      const next = updated[index].quantity + delta
      if (next <= 0) {
        updated.splice(index, 1)
      } else {
        updated[index].quantity = next
      }
      return updated
    })
  }

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const cartSubtotalInr = cart.reduce(
    (sum, item) => sum + item.product.priceInr * item.quantity,
    0
  )

  const navItems: MobileNavItem[] = [
    {
      label: 'All Categories',
      children: FOOTWEAR_CATEGORIES.map((c) => ({
        label: c.title,
        onClick: () => {
          const el = document.getElementById('fwd-sneakers-section')
          el?.scrollIntoView({ behavior: 'smooth' })
        },
      })),
    },
    {
      label: 'Products',
      children: [
        { label: 'Most Loved Sneakers', onClick: () => { const el = document.getElementById('fwd-sneakers-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Best Sellers', onClick: () => { const el = document.getElementById('fwd-bestsellers-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Casual Picks', onClick: () => { setActiveTab('Casual'); const el = document.getElementById('fwd-tabs-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Pages',
      children: [
        { label: 'About Footwear Co.', onClick: () => showToast('About Footwear WorkDo') },
        { label: 'Shipping & Returns', onClick: () => showToast('Free Shipping over ₹999') },
        { label: 'FAQs', onClick: () => showToast('Footwear WorkDo FAQs') },
      ],
    },
    {
      label: 'Services',
      children: [
        { label: 'Custom Fitting', onClick: () => showToast('Custom Shoe Fitting Service') },
        { label: 'VIP Sneaker Care', onClick: () => showToast('VIP Sneaker Care & Clean') },
      ],
    },
  ]

  const currentSlide = FOOTWEAR_HERO_SLIDES[currentSlideIndex]

  const filteredMostLoved =
    activeTab === 'All'
      ? FOOTWEAR_MOST_LOVED_PRODUCTS
      : FOOTWEAR_MOST_LOVED_PRODUCTS.filter((p) => p.category === activeTab)

  return (
    <div
      className={`fwd-root ${device !== 'desktop' ? `fwd-device-${device}` : ''}`}
      style={{ '--fwd-primary': activeColor } as React.CSSProperties}
    >
      {/* Optional Top Preview Banner */}
      {onUseTemplate && (
        <div
          style={{
            background: '#090a0c',
            borderBottom: '1px solid #27272a',
            color: '#ffffff',
            padding: '8px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '13px',
            position: 'relative',
            zIndex: 100,
          }}
        >
          <span>
            Previewing <strong>Footwear WorkDo Theme</strong>
          </span>
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={onUseTemplate}
              style={{
                background: activeColor,
                color: '#18191c',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '4px',
                fontWeight: 800,
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
                  color: '#a1a1aa',
                  border: '1px solid #3f3f46',
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

      {/* Top Utility Bar */}
      <div className="fwd-topbar">
        <div className="fwd-topbar-inner">
          <div className="fwd-topbar-links">
            <a href="#faqs">Faqs</a>
            <a href="#policy">Policy</a>
            <a href="#shipping">Shipping</a>
            <a href="#about">About Us</a>
          </div>

          <div className="fwd-topbar-meta">
            <div>
              <span>🇬🇧 </span>
              <select aria-label="Language selector">
                <option>English</option>
                <option>Spanish</option>
              </select>
            </div>
            <div>
              <span>🇮🇳 </span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as 'INR' | 'USD')}
                aria-label="Currency selector"
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </select>
            </div>
            <div className="fwd-call-pill">
              <span>Call Us : 610-403-403</span>
              <span>📱</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header with Floating Pill Navigation */}
      <header className="fwd-header">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="fwd-hamburger-btn"
          onClick={() => setIsMobileNavOpen(true)}
          title="Menu"
          aria-label="Open mobile menu"
        >
          ☰
        </button>

        <a href="#home" className="fwd-logo">
          Footwear<span>.</span>
        </a>

        <div className="fwd-nav-pill-bar">
          <nav className="fwd-nav-links">
            {navItems.map((item) => (
              <div key={item.label} className="wv-nav-dropdown-wrap">
                <span
                  className="fwd-nav-item"
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

          <div className="fwd-nav-actions">
            <button
              type="button"
              className="fwd-nav-action-btn"
              onClick={() => setIsSearchOpen(true)}
            >
              🔍 Search
            </button>
            <button
              type="button"
              className="fwd-nav-action-btn"
              onClick={() => setIsAccountOpen(true)}
            >
              👤 Account
            </button>
            <button
              type="button"
              className="fwd-nav-action-btn"
              onClick={() => setIsWishlistOpen(true)}
            >
              {wishlist.length > 0 ? '❤️' : '🤍'} Wishlist ({wishlist.length})
            </button>
            <button type="button" className="fwd-cart-btn" onClick={() => setIsCartOpen(true)}>
              🛒 Cart: {formatPrice(cartSubtotalInr)} ({totalCartCount})
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="fwd-hero" id="home">
        <div className="fwd-hero-content">
          <div className="fwd-hero-sub">{currentSlide.subtitle}</div>
          <h1 className="fwd-hero-title">{currentSlide.headline}</h1>
          <p className="fwd-hero-body">{currentSlide.bodyText}</p>

          <div className="fwd-hero-actions">
            <button
              className="fwd-btn-primary"
              onClick={() => {
                const target = FOOTWEAR_SNEAKERS_LOVE[0]
                handleAddToCart(target)
              }}
            >
              {currentSlide.buttonText}
            </button>
            <button
              className="fwd-btn-video"
              onClick={() => showToast('Playing footwear design video')}
            >
              <span>▶</span> {currentSlide.videoText}
            </button>
          </div>

          <div className="fwd-slider-index">
            <span>{currentSlide.slideNumber}</span>
            <div className="fwd-slider-progress">
              <div
                className="fwd-slider-progress-bar"
                style={{
                  width: currentSlideIndex === 0 ? '50%' : '100%',
                }}
              ></div>
            </div>
            <button
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--fwd-primary)',
                cursor: 'pointer',
                fontWeight: 700,
              }}
              onClick={() =>
                setCurrentSlideIndex((prev) => (prev + 1) % FOOTWEAR_HERO_SLIDES.length)
              }
            >
              Next →
            </button>
          </div>
        </div>

        <div className="fwd-hero-visual">
          <div className="fwd-hex-frame"></div>
          <img
            src={currentSlide.image}
            alt={currentSlide.headline}
            className="fwd-hero-shoe-img"
          />
        </div>
      </section>

      {/* Section 2: Shop By Category (Vibrant Yellow Container Banner) */}
      <section className="fwd-yellow-banner">
        <div className="fwd-banner-inner">
          <div className="fwd-banner-header">
            <h2>Shop By Category</h2>
            <button
              className="fwd-btn-dark"
              onClick={() => showToast('Viewing all footwear categories')}
            >
              View Products
            </button>
          </div>

          <div className="fwd-category-grid">
            {FOOTWEAR_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="fwd-category-card"
                onClick={() => showToast(`Exploring ${cat.title}`)}
                style={{ cursor: 'pointer' }}
              >
                <h3>{cat.title}</h3>
                <p>{cat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Animated Marquee */}
      <div className="fwd-marquee-strip">
        <div className="fwd-marquee-content">
          <span>Footwear</span>
          <span>•</span>
          <span>Performance</span>
          <span>•</span>
          <span>Sneakers</span>
          <span>•</span>
          <span>High Velocity</span>
          <span>•</span>
          <span>Footwear</span>
          <span>•</span>
          <span>Performance</span>
          <span>•</span>
          <span>Sneakers</span>
          <span>•</span>
          <span>High Velocity</span>
        </div>
      </div>

      {/* Section 4: Sneakers that you love */}
      <section className="fwd-section" id="fwd-sneakers-section">
        <div id="products"></div>
        <div className="fwd-section-header">
          <h2 className="fwd-section-title">Sneakers that you love</h2>
          <button
            className="fwd-btn-primary"
            style={{ padding: '8px 18px', fontSize: '13px' }}
            onClick={() => showToast('Opening all sneakers')}
          >
            View Products
          </button>
        </div>

        <div className="fwd-product-grid">
          {FOOTWEAR_SNEAKERS_LOVE.map((product) => {
            const currentSize = selectedSizes[product.id] || 8
            return (
              <div key={product.id} className="fwd-card-dark" style={{ position: 'relative' }}>
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
                <div
                  className="fwd-card-thumb-area"
                  onClick={() => setQuickViewProduct(product)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={product.image} alt={product.name} />
                </div>

                <h3 className="fwd-card-name">{product.name}</h3>
                <p className="fwd-card-desc">{product.description}</p>

                <div className="fwd-size-row">
                  <span className="fwd-size-label">Size:</span>
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      className={`fwd-size-btn ${currentSize === sz ? 'active' : ''}`}
                      onClick={() => handleSelectSize(product.id, sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                <div className="fwd-card-price">{formatPrice(product.priceInr)}</div>
                <div className="fwd-stars">★★★★★</div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button
                    className="fwd-card-add-btn"
                    style={{ flex: 1, margin: 0 }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart 🛒
                  </button>
                  <button
                    type="button"
                    title="View Details"
                    onClick={() => setQuickViewProduct(product)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#ffffff',
                      color: '#0f172a',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    👁️ View
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Section 5: Testimonials with Hex Showcase */}
      <section className="fwd-testimonials-section">
        <div>
          <h2 className="fwd-section-title" style={{ fontSize: '32px' }}>
            Testimonials
          </h2>
          <p style={{ color: 'var(--fwd-text-muted)', fontSize: '14px', lineHeight: '1.6' }}>
            Sneakerheads and daily athletes across India share their experiences with
            Footwear WorkDo limited edition shoes.
          </p>

          <div className="fwd-test-card">
            <div className="fwd-test-author">
              <img
                src={FOOTWEAR_TESTIMONIALS[0].avatar}
                alt={FOOTWEAR_TESTIMONIALS[0].name}
                className="fwd-test-avatar"
              />
              <div>
                <div style={{ fontWeight: 700 }}>{FOOTWEAR_TESTIMONIALS[0].name}</div>
                <div style={{ fontSize: '12px', color: 'var(--fwd-text-muted)' }}>
                  {FOOTWEAR_TESTIMONIALS[0].role}
                </div>
              </div>
            </div>
            <p className="fwd-test-quote">&ldquo;{FOOTWEAR_TESTIMONIALS[0].quote}&rdquo;</p>
            <div style={{ color: 'var(--fwd-primary)', marginTop: '8px' }}>★★★★★</div>
          </div>
        </div>

        <div className="fwd-hero-visual" style={{ minHeight: '360px' }}>
          <div className="fwd-hex-frame" style={{ width: '320px', height: '320px' }}></div>
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80"
            alt="Hexagon Testimonial Footwear"
            className="fwd-hero-shoe-img"
            style={{ maxHeight: '300px' }}
          />
        </div>
      </section>

      {/* Section 6: Bestseller Highlight Cards on Yellow */}
      <section id="fwd-bestsellers-section" className="fwd-section">
        <div className="fwd-section-header">
          <h2 className="fwd-section-title">Bestseller</h2>
          <button
            className="fwd-btn-primary"
            style={{ padding: '8px 18px', fontSize: '13px' }}
            onClick={() => showToast('Opening Bestsellers')}
          >
            View Products
          </button>
        </div>

        <div className="fwd-bestseller-grid">
          {FOOTWEAR_BESTSELLERS.map((best) => {
            const currentSize = selectedSizes[best.id] || 8
            return (
              <div key={best.id} className="fwd-bestseller-card">
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: 900, margin: '0 0 8px 0' }}>
                    {best.name}
                  </h3>
                  <p style={{ fontSize: '12px', color: '#27272a', lineHeight: '1.5', margin: '0 0 12px 0' }}>
                    {best.description}
                  </p>
                  <div className="fwd-size-row" style={{ marginBottom: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#18191c', fontWeight: 700 }}>
                      Size:
                    </span>
                    {best.sizes.map((sz) => (
                      <button
                        key={sz}
                        style={{
                          width: '26px',
                          height: '26px',
                          background: currentSize === sz ? '#18191c' : '#ffffff',
                          color: currentSize === sz ? '#ffea28' : '#18191c',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '11px',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                        onClick={() => handleSelectSize(best.id, sz)}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                  <div style={{ fontSize: '16px', fontWeight: 900 }}>
                    {formatPrice(best.priceInr)}
                  </div>
                  <button
                    className="fwd-bestseller-btn-black"
                    onClick={() => handleAddToCart(best)}
                  >
                    Add to Cart 🛒
                  </button>
                </div>
                <img src={best.image} alt={best.name} />
              </div>
            )
          })}
        </div>
      </section>

      {/* Section 7: Promo Banner */}
      <section className="fwd-promo-banner">
        <div className="fwd-promo-content">
          <span className="fwd-promo-tag">{FOOTWEAR_PROMO_BANNER.tag}</span>
          <h2 className="fwd-promo-title">{FOOTWEAR_PROMO_BANNER.title}</h2>
          <p style={{ color: 'var(--fwd-text-muted)', lineHeight: '1.6', marginBottom: '24px' }}>
            {FOOTWEAR_PROMO_BANNER.subtitle}
          </p>
          <button
            className="fwd-btn-primary"
            onClick={() => {
              const target = FOOTWEAR_SNEAKERS_LOVE[1]
              handleAddToCart(target)
            }}
          >
            {FOOTWEAR_PROMO_BANNER.buttonText} 🛒
          </button>
        </div>
        <img
          src={FOOTWEAR_PROMO_BANNER.image}
          alt={FOOTWEAR_PROMO_BANNER.title}
          className="fwd-promo-img"
        />
      </section>

      {/* Section 8: 3 Visual Category Cards */}
      <div className="fwd-visual-categories">
        {FOOTWEAR_FEATURE_CARDS.map((card) => (
          <div key={card.id} className="fwd-vis-card">
            <img src={card.image} alt={card.title} className="fwd-vis-bg" />
            <div className="fwd-vis-overlay"></div>
            <div className="fwd-vis-content">
              <h3 className="fwd-vis-title">{card.title}</h3>
              <button
                className="fwd-vis-btn"
                onClick={() => showToast(`Opening ${card.title} catalog`)}
              >
                {card.buttonText} →
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Section 9: Most Loved Shoes with Filter Tabs */}
      <section className="fwd-section">
        <div className="fwd-section-header">
          <div>
            <h2 className="fwd-section-title">Most Loved Shoes</h2>
          </div>
          <button
            className="fwd-btn-primary"
            style={{ padding: '8px 18px', fontSize: '13px' }}
            onClick={() => showToast('Opening all most loved kicks')}
          >
            View Products
          </button>
        </div>

        <div className="fwd-tabs-row">
          {(['All', 'Men', 'Women', 'Casual'] as const).map((tab) => (
            <button
              key={tab}
              className={`fwd-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === 'All' ? 'All Products' : tab}
            </button>
          ))}
        </div>

        <div className="fwd-product-grid">
          {filteredMostLoved.map((product) => {
            const currentSize = selectedSizes[product.id] || 8
            return (
              <div key={product.id} className="fwd-card-dark" style={{ position: 'relative' }}>
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
                <div
                  className="fwd-card-thumb-area"
                  onClick={() => setQuickViewProduct(product)}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={product.image} alt={product.name} />
                </div>
                <h3 className="fwd-card-name">{product.name}</h3>
                <p className="fwd-card-desc">{product.description}</p>
                <div className="fwd-size-row">
                  <span className="fwd-size-label">Size:</span>
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      className={`fwd-size-btn ${currentSize === sz ? 'active' : ''}`}
                      onClick={() => handleSelectSize(product.id, sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
                <div className="fwd-card-price">{formatPrice(product.priceInr)}</div>
                <div className="fwd-stars">★★★★★</div>
                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button
                    className="fwd-card-add-btn"
                    style={{ flex: 1, margin: 0 }}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart 🛒
                  </button>
                  <button
                    type="button"
                    title="View Details"
                    onClick={() => setQuickViewProduct(product)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: '1px solid #e2e8f0',
                      backgroundColor: '#ffffff',
                      color: '#0f172a',
                      fontSize: '12px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    👁️ View
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Section 10: Our Blogs */}
      <section className="fwd-section" id="blog">
        <div className="fwd-section-header">
          <h2 className="fwd-section-title">Our Blogs</h2>
          <button
            className="fwd-btn-primary"
            style={{ padding: '8px 18px', fontSize: '13px' }}
            onClick={() => showToast('Opening all Footwear Blogs')}
          >
            View All Blogs
          </button>
        </div>

        <div className="fwd-blogs-grid">
          {FOOTWEAR_BLOGS.map((blog) => (
            <div key={blog.id} className="fwd-blog-card">
              <img src={blog.image} alt={blog.title} className="fwd-blog-img" />
              <div className="fwd-blog-content">
                <span className="fwd-blog-badge">
                  {blog.category} • {blog.readTime}
                </span>
                <h3 className="fwd-blog-heading">{blog.title}</h3>
                <p className="fwd-blog-desc">{blog.excerpt}</p>
                <button
                  className="fwd-blog-btn"
                  onClick={() => showToast(`Reading ${blog.title}`)}
                >
                  View Blog
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 11: Dark Footer */}
      <footer className="fwd-footer">
        <div className="fwd-footer-grid">
          <div>
            <div className="fwd-footer-phone-box">
              <span style={{ fontSize: '12px', color: 'var(--fwd-text-muted)', display: 'block' }}>
                Call and take more info
              </span>
              <span className="fwd-footer-phone">+00 546-213-815</span>
            </div>
            <p style={{ fontSize: '13px', color: 'var(--fwd-text-muted)', lineHeight: '1.6' }}>
              Footwear WorkDo delivers limited-edition, ultra-cushioned running and
              streetwear silhouettes across India.
            </p>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', textTransform: 'uppercase', marginBottom: '16px' }}>
              Menu
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px' }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="#home" style={{ color: 'var(--fwd-text-muted)', textDecoration: 'none' }}>
                  Home
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#products" style={{ color: 'var(--fwd-text-muted)', textDecoration: 'none' }}>
                  Products
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#shipping" style={{ color: 'var(--fwd-text-muted)', textDecoration: 'none' }}>
                  Shipping Policy
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#terms" style={{ color: 'var(--fwd-text-muted)', textDecoration: 'none' }}>
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', textTransform: 'uppercase', marginBottom: '16px' }}>
              Navigation
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px' }}>
              <li style={{ marginBottom: '8px' }}>
                <a href="#about" style={{ color: 'var(--fwd-text-muted)', textDecoration: 'none' }}>
                  About Us
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#contact" style={{ color: 'var(--fwd-text-muted)', textDecoration: 'none' }}>
                  Contact Us
                </a>
              </li>
              <li style={{ marginBottom: '8px' }}>
                <a href="#faqs" style={{ color: 'var(--fwd-text-muted)', textDecoration: 'none' }}>
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: '14px', textTransform: 'uppercase', marginBottom: '16px' }}>
              Newsletter
            </h4>
            <p style={{ fontSize: '13px', color: 'var(--fwd-text-muted)', margin: 0 }}>
              Subscribe for drops, raffles, and flash discounts.
            </p>
            <form
              className="fwd-footer-input-row"
              onSubmit={(e) => {
                e.preventDefault()
                if (newsletterEmail) {
                  showToast(`Subscribed ${newsletterEmail}!`)
                  setNewsletterEmail('')
                }
              }}
            >
              <input
                type="email"
                placeholder="Enter email here..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="fwd-footer-input"
                required
              />
              <button type="submit" className="fwd-footer-btn" title="Subscribe">
                →
              </button>
            </form>
          </div>
        </div>

        <div className="fwd-bottom-strip">
          <span>© 2026 Footwear. Powered by Shopify</span>
          <div>Visa • MasterCard • UPI • PayPal</div>
        </div>
      </footer>

      {/* Cart Drawer */}
      {isCartOpen && (
        <div className="fwd-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="fwd-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="fwd-drawer-header">
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>
                Shopping Cart ({totalCartCount})
              </h3>
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  fontSize: '20px',
                  cursor: 'pointer',
                }}
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="fwd-drawer-body">
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--fwd-text-muted)' }}>
                  Your cart is currently empty.
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={`${item.product.id}-${item.selectedSize}`} className="fwd-drawer-item">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="fwd-drawer-item-img"
                    />
                    <div style={{ flexGrow: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: '14px', marginBottom: '4px' }}>
                        {item.product.name}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--fwd-text-muted)', marginBottom: '4px' }}>
                        Size: {item.selectedSize}
                      </div>
                      <div style={{ color: 'var(--fwd-primary)', fontWeight: 800, fontSize: '14px' }}>
                        {formatPrice(item.product.priceInr * item.quantity)}
                      </div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '8px' }}>
                        <button
                          style={{
                            width: '24px',
                            height: '24px',
                            background: '#25282d',
                            border: '1px solid #3f444e',
                            color: '#fff',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleUpdateQty(idx, -1)}
                        >
                          -
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          style={{
                            width: '24px',
                            height: '24px',
                            background: '#25282d',
                            border: '1px solid #3f444e',
                            color: '#fff',
                            cursor: 'pointer',
                          }}
                          onClick={() => handleUpdateQty(idx, 1)}
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
              <div style={{ padding: '20px', borderTop: '1px solid var(--fwd-border)', background: '#121315' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontWeight: 800,
                    marginBottom: '16px',
                  }}
                >
                  <span>Subtotal</span>
                  <span style={{ color: 'var(--fwd-primary)' }}>
                    {formatPrice(cartSubtotalInr)}
                  </span>
                </div>
                <button
                  className="fwd-btn-primary"
                  style={{ width: '100%', padding: '14px 0' }}
                  onClick={() => showToast('Initiating checkout')}
                >
                  Checkout Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="fwd-drawer-overlay" onClick={() => setQuickViewProduct(null)}>
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#18191c',
              border: '1px solid var(--fwd-gold-border)',
              borderRadius: '8px',
              padding: '32px',
              maxWidth: '560px',
              width: '90%',
              zIndex: 1100,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                color: '#fff',
                fontSize: '18px',
                cursor: 'pointer',
              }}
              onClick={() => setQuickViewProduct(null)}
            >
              ✕
            </button>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{ maxHeight: '200px', objectFit: 'contain' }}
              />
            </div>
            <h3 style={{ fontSize: '20px', margin: '0 0 8px 0' }}>{quickViewProduct.name}</h3>
            <p style={{ color: 'var(--fwd-text-muted)', fontSize: '13px', lineHeight: '1.6' }}>
              {quickViewProduct.description}
            </p>
            <div style={{ fontSize: '18px', fontWeight: 800, margin: '16px 0', color: 'var(--fwd-primary)' }}>
              {formatPrice(quickViewProduct.priceInr)}
            </div>
            <button
              className="fwd-btn-primary"
              style={{ width: '100%', padding: '12px 0' }}
              onClick={() => {
                handleAddToCart(quickViewProduct)
                setQuickViewProduct(null)
              }}
            >
              Add to Cart 🛒
            </button>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <StorefrontSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={[...FOOTWEAR_SNEAKERS_LOVE, ...FOOTWEAR_BESTSELLERS, ...FOOTWEAR_MOST_LOVED_PRODUCTS].map((p) => ({
          id: p.id,
          name: p.name,
          price: p.priceInr,
          originalPrice: p.originalPriceInr,
          image: p.image,
          category: p.category,
        }))}
        onSelectProduct={(p) => {
          const fullProd = [...FOOTWEAR_SNEAKERS_LOVE, ...FOOTWEAR_BESTSELLERS, ...FOOTWEAR_MOST_LOVED_PRODUCTS].find((x) => x.id === p.id)
          if (fullProd) setQuickViewProduct(fullProd)
        }}
        accentColor={activeColor}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
        placeholder="Search running shoes, velocity sneakers, boots..."
        popularTags={['Sneakers', 'Men', 'Women', 'Casual']}
      />

      {/* Wishlist Drawer */}
      <StorefrontWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        allProducts={[...FOOTWEAR_SNEAKERS_LOVE, ...FOOTWEAR_BESTSELLERS, ...FOOTWEAR_MOST_LOVED_PRODUCTS].map((p) => ({
          id: p.id,
          name: p.name,
          price: p.priceInr,
          originalPrice: p.originalPriceInr,
          image: p.image,
          category: p.category,
        }))}
        onRemoveWishlist={toggleWishlist}
        onAddToCart={(p) => {
          const fullProd = [...FOOTWEAR_SNEAKERS_LOVE, ...FOOTWEAR_BESTSELLERS, ...FOOTWEAR_MOST_LOVED_PRODUCTS].find((x) => x.id === p.id)
          if (fullProd) handleAddToCart(fullProd)
        }}
        onOpenProduct={(p) => {
          const fullProd = [...FOOTWEAR_SNEAKERS_LOVE, ...FOOTWEAR_BESTSELLERS, ...FOOTWEAR_MOST_LOVED_PRODUCTS].find((x) => x.id === p.id)
          if (fullProd) setQuickViewProduct(fullProd)
        }}
        accentColor={activeColor}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
      />

      {/* Account Modal */}
      <StorefrontAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        brandName="Footwear WorkDo"
        accentColor={activeColor}
      />

      {/* Mobile Navigation Drawer */}
      <StorefrontMobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        brandName="Footwear WorkDo"
        navItems={navItems}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        cartCount={totalCartCount}
        contactPhone="610-403-403"
        contactEmail="service@footwearworkdo.com"
        accentColor={activeColor}
      />

      {/* Toast Notification */}
      {toastMessage && <div className="fwd-toast">{toastMessage}</div>}
    </div>
  )
}
export default FootwearWorkDoStorefront
