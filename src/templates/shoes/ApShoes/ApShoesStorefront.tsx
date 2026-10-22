import React, { useState } from 'react'
import type {
  ApShoesProduct,
  ApShoesCartItem,
  ApShoesStorefrontProps,
} from './types'
import {
  AP_SHOES_HERO_SLIDES,
  AP_SHOES_VALUE_PROPS,
  AP_SHOES_COLLECTION_BANNERS,
  AP_SHOES_NEW_PRODUCTS,
  AP_SHOES_TESTIMONIALS,
  AP_SHOES_FOOTER_COLUMNS,
} from './data/apShoesData'
import {
  StorefrontSearchModal,
  StorefrontWishlistDrawer,
  StorefrontAccountModal,
  StorefrontMobileNavDrawer,
  type MobileNavItem,
} from '../../common/StorefrontModals'
import './styles/apShoes.css'

export const ApShoesStorefront: React.FC<ApShoesStorefrontProps> = ({
  template: _template,
  device = 'desktop',
  deviceView,
  customAccentColor,
  onColorChange: _onColorChange,
  onUseTemplate,
  onClose: _onClose,
  onBack: _onBack,
}) => {
  const currentDevice = deviceView || (device === 'fullscreen' ? 'desktop' : device)

  // State
  const [activeSlideIndex, setActiveSlideIndex] = useState<number>(0)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [cart, setCart] = useState<ApShoesCartItem[]>([
    {
      product: AP_SHOES_NEW_PRODUCTS[0],
      selectedSize: 9,
      quantity: 1,
    },
  ])
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false)
  const [isAccountOpen, setIsAccountOpen] = useState<boolean>(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false)
  const [quickViewProduct, setQuickViewProduct] = useState<ApShoesProduct | null>(null)
  const [selectedQuickViewSize, setSelectedQuickViewSize] = useState<number>(9)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState<string>('')
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Toast Helper
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev))
    }, 2800)
  }

  // Wishlist toggle
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId)
      if (exists) {
        showToast('Removed item from Wishlist')
        return prev.filter((id) => id !== productId)
      } else {
        showToast('Added item to Wishlist!')
        return [...prev, productId]
      }
    })
  }

  // Cart operations
  const addToCart = (product: ApShoesProduct, size: number = 9) => {
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
      return [...prev, { product, selectedSize: size, quantity: 1 }]
    })
    setIsCartOpen(true)
    showToast(`Added ${product.name} (Size ${size}) to Cart!`)
  }

  const updateCartQty = (productId: string, size: number, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter((item): item is ApShoesCartItem => item !== null)
    )
  }

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0)
  const cartSubtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )

  const currentSlide = AP_SHOES_HERO_SLIDES[activeSlideIndex]

  const nextSlide = () => {
    setActiveSlideIndex((prev) => (prev + 1) % AP_SHOES_HERO_SLIDES.length)
  }

  const prevSlide = () => {
    setActiveSlideIndex((prev) =>
      prev === 0 ? AP_SHOES_HERO_SLIDES.length - 1 : prev - 1
    )
  }

  const navItems: MobileNavItem[] = [
    {
      label: 'Home',
      children: [
        { label: 'Home Default', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { label: 'Modern Shoes', onClick: () => showToast('Browsing Modern Shoes') },
        { label: 'Streetstyle Shoes', onClick: () => showToast('Browsing Streetstyle Shoes') },
      ],
    },
    {
      label: 'Collections',
      children: [
        { label: 'Casual Sneakers', onClick: () => showToast('Browsing Casual Sneakers') },
        { label: 'Deck Shoes', onClick: () => showToast('Browsing Deck Shoes & Loafers') },
        { label: 'Skate & Street', onClick: () => showToast('Browsing Skate & Street Shoes') },
        { label: 'Spring Arrivals', onClick: () => showToast('Browsing Spring Arrivals') },
      ],
    },
    {
      label: 'Products',
      children: [
        { label: 'Product Grid', onClick: () => showToast('Browsing Full Product Grid') },
        { label: 'Sale Showcase', onClick: () => showToast('Browsing Sale Showcase') },
        { label: 'New Arrivals', onClick: () => showToast('Browsing New Arrivals') },
      ],
    },
    {
      label: 'Blog',
      children: [
        { label: 'Streetstyle Lookbook', onClick: () => showToast('Reading: Streetstyle Lookbook') },
        { label: 'Shoe Care Guide', onClick: () => showToast('Reading: Shoe Care Guide') },
      ],
    },
    {
      label: 'Pages',
      children: [
        { label: 'About Us', onClick: () => showToast('About N.O.Z Shoes') },
        { label: 'Contact Us', onClick: () => showToast('Contact N.O.Z Shoes') },
        { label: 'FAQs', onClick: () => showToast('N.O.Z Shoes FAQs') },
      ],
    },
  ]

  return (
    <div
      className={`ap-storefront device-${currentDevice}`}
      style={
        customAccentColor
          ? ({ '--ap-accent': customAccentColor } as React.CSSProperties)
          : undefined
      }
    >
      {/* ----------------------------------------------------------------------
          HEADER
         ---------------------------------------------------------------------- */}
      <header className="ap-header">
        <div className="ap-header-inner">
          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="ap-hamburger-btn"
            onClick={() => setIsMobileNavOpen(true)}
            title="Menu"
            aria-label="Open mobile menu"
          >
            ☰
          </button>

          {/* Logo */}
          <div className="ap-logo" onClick={() => showToast('N.O.Z Shoes Home')}>
            <span>N.</span>
            <span className="ap-logo-o">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#ea580c" strokeWidth="2.5" />
                <circle cx="12" cy="12" r="4.5" fill="#ea580c" />
                <path d="M12 2L15 6H9L12 2Z" fill="#ea580c" />
              </svg>
            </span>
            <span className="ap-logo-dot">.</span>
            <span>Z</span>
          </div>

          {/* Navigation with Dropdowns */}
          <nav>
            <ul className="ap-nav">
              <li className="ap-nav-item">
                <a className="ap-nav-link" href="#home" onClick={(e) => e.preventDefault()}>
                  HOME <span className="ap-nav-caret">▾</span>
                </a>
                <ul className="ap-dropdown">
                  <li><a href="#h1" onClick={(e) => { e.preventDefault(); showToast('Home Style 1') }}>Home Default</a></li>
                  <li><a href="#h2" onClick={(e) => { e.preventDefault(); showToast('Home Style 2') }}>Home Modern Shoes</a></li>
                  <li><a href="#h3" onClick={(e) => { e.preventDefault(); showToast('Home Style 3') }}>Home Streetstyle</a></li>
                </ul>
              </li>

              <li className="ap-nav-item">
                <a className="ap-nav-link" href="#collections" onClick={(e) => e.preventDefault()}>
                  COLLECTIONS <span className="ap-nav-caret">▾</span>
                </a>
                <ul className="ap-dropdown">
                  <li><a href="#c1" onClick={(e) => { e.preventDefault(); showToast('Casual Sneaker Collection') }}>Casual Sneakers</a></li>
                  <li><a href="#c2" onClick={(e) => { e.preventDefault(); showToast('Deck Shoes & Loafers') }}>Deck Shoes</a></li>
                  <li><a href="#c3" onClick={(e) => { e.preventDefault(); showToast('Skate & Street Shoes') }}>Skate &amp; Street</a></li>
                  <li><a href="#c4" onClick={(e) => { e.preventDefault(); showToast('Spring Arrivals') }}>Spring Arrivals</a></li>
                </ul>
              </li>

              <li className="ap-nav-item">
                <a className="ap-nav-link" href="#products" onClick={(e) => e.preventDefault()}>
                  PRODUCTS <span className="ap-nav-caret">▾</span>
                </a>
                <ul className="ap-dropdown">
                  <li><a href="#p1" onClick={(e) => { e.preventDefault(); showToast('Product Grid') }}>Product Grid</a></li>
                  <li><a href="#p2" onClick={(e) => { e.preventDefault(); showToast('Sale Products') }}>Sale Showcase</a></li>
                  <li><a href="#p3" onClick={(e) => { e.preventDefault(); showToast('New Arrivals') }}>New Arrivals</a></li>
                </ul>
              </li>

              <li className="ap-nav-item">
                <a className="ap-nav-link" href="#shortcode" onClick={(e) => e.preventDefault()}>
                  SHORTCODE <span className="ap-nav-caret">▾</span>
                </a>
                <ul className="ap-dropdown">
                  <li><a href="#s1" onClick={(e) => { e.preventDefault(); showToast('Promo Banners') }}>Promo Banners</a></li>
                  <li><a href="#s2" onClick={(e) => { e.preventDefault(); showToast('Testimonial Sliders') }}>Testimonial Carousel</a></li>
                </ul>
              </li>

              <li className="ap-nav-item">
                <a className="ap-nav-link active-cyan" href="#blog" onClick={(e) => e.preventDefault()}>
                  BLOG <span className="ap-nav-caret">▾</span>
                </a>
                <ul className="ap-dropdown">
                  <li><a href="#b1" onClick={(e) => { e.preventDefault(); showToast('Streetstyle Lookbook 2024') }}>Streetstyle Lookbook</a></li>
                  <li><a href="#b2" onClick={(e) => { e.preventDefault(); showToast('Shoe Care & Cleaning') }}>Shoe Care Guide</a></li>
                </ul>
              </li>

              <li className="ap-nav-item">
                <a className="ap-nav-link" href="#pages" onClick={(e) => e.preventDefault()}>
                  PAGES <span className="ap-nav-caret">▾</span>
                </a>
                <ul className="ap-dropdown">
                  <li><a href="#a1" onClick={(e) => { e.preventDefault(); showToast('About Us') }}>About Us</a></li>
                  <li><a href="#a2" onClick={(e) => { e.preventDefault(); showToast('Contact Us') }}>Contact Us</a></li>
                  <li><a href="#a3" onClick={(e) => { e.preventDefault(); showToast('Store FAQ') }}>FAQs</a></li>
                </ul>
              </li>
            </ul>
          </nav>

          {/* Right Icons */}
          <div className="ap-header-tools">
            <button
              type="button"
              className="ap-tool-btn"
              title="Search"
              onClick={() => setIsSearchOpen(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <button
              type="button"
              className="ap-tool-btn"
              title="Account"
              onClick={() => setIsAccountOpen(true)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            <button
              type="button"
              className="ap-tool-btn"
              title="Wishlist"
              onClick={() => setIsWishlistOpen(true)}
              style={{ position: 'relative' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlist.length > 0 ? '#ea580c' : 'none'} stroke="currentColor" strokeWidth="2">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              {wishlist.length > 0 && (
                <span className="ap-cart-count-badge" style={{ background: '#ea580c' }}>
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Bag */}
            <button
              type="button"
              className="ap-tool-btn ap-cart-bag"
              title="Shopping Cart"
              onClick={() => setIsCartOpen(true)}
            >
              <svg width="22" height="24" viewBox="0 0 24 24" fill="#000000">
                <path d="M16 7a4 4 0 0 0-8 0v2H4v13h16V9h-4V7zm-6 0a2 2 0 1 1 4 0v2h-4V7z" />
              </svg>
              <span className="ap-cart-count-badge">{totalCartCount}</span>
            </button>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {isSearchOpen && (
          <div style={{ background: '#f9fafb', padding: '12px 24px', borderTop: '1px solid #e5e7eb' }}>
            <div style={{ maxWidth: 600, margin: '0 auto', display: 'flex', gap: 8 }}>
              <input
                type="text"
                placeholder="Search casual sneakers, loafers, skate shoes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  border: '1px solid #d1d5db',
                  borderRadius: 3,
                  fontSize: 13,
                }}
              />
              <button
                type="button"
                className="ap-nl-btn"
                onClick={() => {
                  showToast(`Searching for "${searchQuery || 'shoes'}"...`)
                  setIsSearchOpen(false)
                }}
              >
                Search
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Floating Settings Side Tab */}
      <div className="ap-side-settings-tab" title="Theme Quick Options">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2">
          <line x1="4" y1="21" x2="4" y2="14" />
          <line x1="4" y1="10" x2="4" y2="3" />
          <line x1="12" y1="21" x2="12" y2="12" />
          <line x1="12" y1="8" x2="12" y2="3" />
          <line x1="20" y1="21" x2="20" y2="16" />
          <line x1="20" y1="12" x2="20" y2="3" />
          <line x1="1" y1="14" x2="7" y2="14" />
          <line x1="9" y1="8" x2="15" y2="8" />
          <line x1="17" y1="16" x2="23" y2="16" />
        </svg>
      </div>

      {/* ----------------------------------------------------------------------
          HERO SLIDER
         ---------------------------------------------------------------------- */}
      <section className="ap-hero-section">
        {/* Left Arrow */}
        <button
          type="button"
          className="ap-hero-arrow ap-hero-prev"
          onClick={prevSlide}
          aria-label="Previous Slide"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Slide Container */}
        <div className="ap-hero-container">
          <div className="ap-hero-image-wrap">
            <img
              src={currentSlide.image}
              alt={currentSlide.alt}
              className="ap-hero-image"
            />
          </div>

          <div className="ap-hero-content">
            <div className="ap-hero-subtitle">{currentSlide.subtitle}</div>
            <h1 className="ap-hero-title">{currentSlide.title}</h1>
          </div>
        </div>

        {/* Right Arrow (Red Box) */}
        <button
          type="button"
          className="ap-hero-arrow ap-hero-next"
          onClick={nextSlide}
          aria-label="Next Slide"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>

        {/* Dots */}
        <div className="ap-hero-dots">
          {AP_SHOES_HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={`ap-hero-dot ${idx === activeSlideIndex ? 'active' : ''}`}
              onClick={() => setActiveSlideIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          VALUE PROPOSITIONS (4-COLUMN STRIP)
         ---------------------------------------------------------------------- */}
      <section className="ap-value-props-section">
        <div className="ap-value-props-grid">
          {AP_SHOES_VALUE_PROPS.map((vp) => (
            <div key={vp.id} className="ap-value-prop-item">
              <div className="ap-vp-icon-wrap">
                {vp.icon === 'truck' && (
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 8h-3V4H3c-1.1 0-2 .9-2 2v11h2c0 1.66 1.34 3 3 3s3-1.34 3-3h6c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-4zM6 18.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm13.5-9l1.96 2.5H17V9.5h2.5zm-1.5 9c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
                  </svg>
                )}
                {vp.icon === 'refresh' && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6 0 1.01-.25 1.97-.7 2.8l1.46 1.46C19.54 15.03 20 13.57 20 12c0-4.42-3.58-8-8-8zm0 14c-3.31 0-6-2.69-6-6 0-1.01.25-1.97.7-2.8L5.24 7.74C4.46 8.97 4 10.43 4 12c0 4.42 3.58 8 8 8v3l4-4-4-4v3z" />
                  </svg>
                )}
                {vp.icon === 'gift' && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 6h-2.18c.11-.31.18-.65.18-1 0-1.66-1.34-3-3-3-1.05 0-1.96.54-2.5 1.35l-.5.65-.5-.65C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-5-2c.55 0 1 .45 1 1s-.45 1-1 1h-2v-1c0-.55.45-1 1-1zM9 4c.55 0 1 .45 1 1v1H8c-.55 0-1-.45-1-1s.45-1 1-1zm11 15H4v-2h16v2zm0-5H4V8h5.08L7 10.83 8.62 12 11 8.76V14h2V8.76L15.38 12 17 10.83 14.92 8H20v6z" />
                  </svg>
                )}
                {vp.icon === 'headphones' && (
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 1a9 9 0 0 0-9 9v7c0 1.66 1.34 3 3 3h3v-8H5v-2c0-3.87 3.13-7 7-7s7 3.13 7 7v2h-4v8h3c1.66 0 3-1.34 3-3v-7a9 9 0 0 0-9-9z" />
                  </svg>
                )}
              </div>
              <div>
                <h4 className="ap-vp-title">{vp.title}</h4>
                <p className="ap-vp-subtitle">{vp.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          2-BANNER SHOWCASE
         ---------------------------------------------------------------------- */}
      <section className="ap-banners-section">
        <div className="ap-banners-grid">
          {AP_SHOES_COLLECTION_BANNERS.map((banner) => (
            <div
              key={banner.id}
              className="ap-banner-card"
              onClick={() => showToast(`Selected collection: ${banner.title}`)}
            >
              {banner.hasStarBadge && (
                <div className="ap-banner-star-badge">
                  ★
                </div>
              )}
              <div className="ap-banner-text-side">
                <span className="ap-banner-tag">{banner.tag}</span>
                <h3 className="ap-banner-title">{banner.title}</h3>
              </div>
              <img
                src={banner.image}
                alt={banner.title}
                className="ap-banner-img"
              />
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          NEW PRODUCTS SECTION
         ---------------------------------------------------------------------- */}
      <section className="ap-products-section">
        <h2 className="ap-section-title">NEW PRODUCTS</h2>
        <p className="ap-section-subtitle">
          Mirum est notare quam littera gothica, quam nunc putamus parum claram, anteposuerit litterarum formas humanitatis.
        </p>

        <div className="ap-products-grid">
          {AP_SHOES_NEW_PRODUCTS.map((prod) => (
            <div key={prod.id} className="ap-prod-card">
              {prod.badge && (
                <div className="ap-prod-badge-sale">
                  {prod.badge}
                </div>
              )}

              <div
                className="ap-prod-thumb-wrap"
                onClick={() => {
                  setQuickViewProduct(prod)
                  setSelectedQuickViewSize(prod.availableSizes[0] || 9)
                }}
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="ap-prod-thumb"
                />
              </div>

              <h3
                className="ap-prod-name"
                onClick={() => {
                  setQuickViewProduct(prod)
                  setSelectedQuickViewSize(prod.availableSizes[0] || 9)
                }}
              >
                {prod.name}
              </h3>

              <div className="ap-prod-price-row">
                {prod.originalPrice && (
                  <span className="ap-price-orig">${prod.originalPrice.toFixed(2)}</span>
                )}
                <span className="ap-price-current">${prod.price.toFixed(2)}</span>
              </div>

              {/* 3 Cyan Circular Action Buttons */}
              <div className="ap-prod-actions">
                <button
                  type="button"
                  className="ap-circle-btn"
                  title="Quick View"
                  onClick={() => {
                    setQuickViewProduct(prod)
                    setSelectedQuickViewSize(prod.availableSizes[0] || 9)
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                </button>

                <button
                  type="button"
                  className={`ap-circle-btn ${wishlist.includes(prod.id) ? 'wishlist-active' : ''}`}
                  title="Add to Wishlist"
                  onClick={() => toggleWishlist(prod.id)}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>

                <button
                  type="button"
                  className="ap-circle-btn"
                  title="Add to Cart"
                  onClick={() => addToCart(prod, 9)}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          TESTIMONIALS SECTION
         ---------------------------------------------------------------------- */}
      <section className="ap-testimonial-section">
        <div className="ap-quote-icon">“</div>
        <div className="ap-testimonial-grid">
          {AP_SHOES_TESTIMONIALS.map((test) => (
            <div key={test.id} className="ap-test-card">
              <p className="ap-test-quote">{test.quote}</p>
              <div className="ap-test-author">{test.author}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          PRE-FOOTER (ABOUT US / FACEBOOK / INSTAGRAM)
         ---------------------------------------------------------------------- */}
      <section className="ap-prefooter-section">
        <div className="ap-prefooter-grid">
          {/* About Us */}
          <div>
            <h4 className="ap-prefooter-title">ABOUT US</h4>
            <img
              src="https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=500&q=80"
              alt="High Top Shoes"
              className="ap-about-img"
            />
            <p className="ap-about-text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          {/* Like Us On Facebook */}
          <div>
            <h4 className="ap-prefooter-title">LIKE US ON FACEBOOK</h4>
            <div className="ap-fb-box">
              <div style={{ fontSize: 13, fontWeight: 700, color: '#1f2937' }}>
                N.O.Z Shoes Official
              </div>
              <div style={{ fontSize: 12, color: '#6b7280', margin: '4px 0 12px' }}>
                128,400+ followers on Facebook
              </div>
              <button
                type="button"
                className="ap-fb-like-btn"
                onClick={() => showToast('Liked N.O.Z Shoes on Facebook!')}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Like Page
              </button>
            </div>
          </div>

          {/* Instagram */}
          <div className="ap-insta-wrap">
            <h4 className="ap-prefooter-title">INSTAGRAM</h4>
            <a
              href="#instagram"
              className="ap-insta-link"
              onClick={(e) => {
                e.preventDefault()
                showToast('Viewing Instagram @noz.shoes')
              }}
            >
              <span>📷 View on Instagram</span>
            </a>
            <div className="ap-insta-grid">
              <img
                src="https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=300&q=80"
                alt="Instagram 1"
                className="ap-insta-thumb"
              />
              <img
                src="https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=300&q=80"
                alt="Instagram 2"
                className="ap-insta-thumb"
              />
              <img
                src="https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=300&q=80"
                alt="Instagram 3"
                className="ap-insta-thumb"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          NEWSLETTER BAR
         ---------------------------------------------------------------------- */}
      <section className="ap-newsletter-strip">
        <div className="ap-nl-inner">
          <label className="ap-nl-label">Join Our Newsletter</label>
          <form
            className="ap-nl-form"
            onSubmit={(e) => {
              e.preventDefault()
              if (newsletterEmail) {
                showToast(`Thank you! ${newsletterEmail} subscribed.`)
                setNewsletterEmail('')
              }
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="ap-nl-input"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button type="submit" className="ap-nl-btn">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>

      {/* ----------------------------------------------------------------------
          6-COLUMN FOOTER
         ---------------------------------------------------------------------- */}
      <footer className="ap-footer">
        <div className="ap-footer-inner">
          <div className="ap-footer-cols">
            {AP_SHOES_FOOTER_COLUMNS.map((col, idx) => (
              <div key={idx}>
                <h5 className="ap-footer-col-title">{col.title}</h5>
                {col.isSchedule && col.lines ? (
                  <div>
                    {col.lines.map((line, lIdx) => (
                      <div key={lIdx} className="ap-schedule-line">
                        <span className="ap-schedule-label">{line.label}</span>
                        <span>{line.time}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <ul className="ap-footer-list">
                    {col.links?.map((link, lIdx) => (
                      <li key={lIdx}>
                        <a
                          href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={(e) => {
                            e.preventDefault()
                            showToast(`Navigated to ${link}`)
                          }}
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Social Icons */}
          <div className="ap-social-row">
            <a
              href="#facebook"
              className="ap-social-icon"
              onClick={(e) => { e.preventDefault(); showToast('Facebook') }}
              title="Facebook"
            >
              f
            </a>
            <a
              href="#twitter"
              className="ap-social-icon"
              onClick={(e) => { e.preventDefault(); showToast('Twitter') }}
              title="Twitter"
            >
              t
            </a>
            <a
              href="#googleplus"
              className="ap-social-icon"
              onClick={(e) => { e.preventDefault(); showToast('Google+') }}
              title="Google+"
            >
              g+
            </a>
            <a
              href="#rss"
              className="ap-social-icon"
              onClick={(e) => { e.preventDefault(); showToast('RSS') }}
              title="RSS"
            >
              rss
            </a>
            <a
              href="#youtube"
              className="ap-social-icon"
              onClick={(e) => { e.preventDefault(); showToast('YouTube') }}
              title="YouTube"
            >
              yt
            </a>
          </div>

          {/* Copyright */}
          <div className="ap-copyright">
            Ap shoes store © Copyright 2024. Powered by Shopify.
          </div>

          {/* Payment Badges */}
          <div className="ap-payment-badges">
            <span className="ap-pay-pill">VISA</span>
            <span className="ap-pay-pill">Mastercard</span>
            <span className="ap-pay-pill">Maestro</span>
            <span className="ap-pay-pill">Cirrus</span>
            <span className="ap-pay-pill">PayPal</span>
            <span className="ap-pay-pill">AMEX</span>
          </div>

          {onUseTemplate && (
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <button
                type="button"
                className="ap-btn-checkout"
                style={{ maxWidth: 280, margin: '0 auto', display: 'inline-block' }}
                onClick={() => onUseTemplate('shoes-ap-shoes')}
              >
                USE THIS TEMPLATE
              </button>
            </div>
          )}
        </div>
      </footer>

      {/* ----------------------------------------------------------------------
          CART DRAWER MODAL
         ---------------------------------------------------------------------- */}
      {isCartOpen && (
        <div className="ap-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="ap-drawer-content" onClick={(e) => e.stopPropagation()}>
            <div className="ap-drawer-header">
              <h3 className="ap-drawer-title">Shopping Bag ({totalCartCount})</h3>
              <button
                type="button"
                className="ap-drawer-close"
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="ap-drawer-items">
              {cart.length === 0 ? (
                <div className="ap-drawer-empty">
                  <p>Your shopping bag is empty.</p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div key={idx} className="ap-drawer-item">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="ap-drawer-item-img"
                    />
                    <div className="ap-drawer-item-info">
                      <h4 className="ap-drawer-item-name">{item.product.name}</h4>
                      <div className="ap-drawer-item-meta">
                        Size: {item.selectedSize}
                      </div>
                      <div className="ap-drawer-item-price">
                        ${item.product.price.toFixed(2)}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                        <button
                          type="button"
                          style={{
                            width: 22,
                            height: 22,
                            background: '#f3f4f6',
                            border: '1px solid #d1d5db',
                            cursor: 'pointer',
                          }}
                          onClick={() => updateCartQty(item.product.id, item.selectedSize, -1)}
                        >
                          -
                        </button>
                        <span style={{ fontSize: 12, fontWeight: 700 }}>{item.quantity}</span>
                        <button
                          type="button"
                          style={{
                            width: 22,
                            height: 22,
                            background: '#f3f4f6',
                            border: '1px solid #d1d5db',
                            cursor: 'pointer',
                          }}
                          onClick={() => updateCartQty(item.product.id, item.selectedSize, 1)}
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
              <div className="ap-drawer-footer">
                <div className="ap-drawer-subtotal">
                  <span>Subtotal:</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>
                <button
                  type="button"
                  className="ap-btn-checkout"
                  onClick={() => {
                    showToast('Proceeding to checkout...')
                    setIsCartOpen(false)
                  }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ----------------------------------------------------------------------
          QUICK VIEW MODAL
         ---------------------------------------------------------------------- */}
      {quickViewProduct && (
        <div className="ap-modal-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="ap-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="ap-modal-close"
              onClick={() => setQuickViewProduct(null)}
            >
              ✕
            </button>

            <div className="ap-modal-media">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="ap-modal-img"
              />
            </div>

            <div className="ap-modal-details">
              <h3 className="ap-modal-title">{quickViewProduct.name}</h3>
              <div className="ap-modal-price">
                ${quickViewProduct.price.toFixed(2)}
              </div>
              <p className="ap-modal-desc">{quickViewProduct.description}</p>

              <label
                style={{
                  fontSize: 11,
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  color: '#4b5563',
                  marginBottom: 8,
                }}
              >
                Select Size:
              </label>
              <div className="ap-modal-size-row">
                {quickViewProduct.availableSizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`ap-size-pill ${selectedQuickViewSize === size ? 'active' : ''}`}
                    onClick={() => setSelectedQuickViewSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <button
                type="button"
                className="ap-btn-add"
                onClick={() => {
                  addToCart(quickViewProduct, selectedQuickViewSize)
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
        products={AP_SHOES_NEW_PRODUCTS.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.subtitle || 'Shoes',
        }))}
        onSelectProduct={(p) => {
          const fullProd = AP_SHOES_NEW_PRODUCTS.find((x) => x.id === p.id)
          if (fullProd) {
            setQuickViewProduct(fullProd)
            setSelectedQuickViewSize(fullProd.availableSizes[0] || 9)
          }
        }}
        accentColor={customAccentColor || '#ea580c'}
        placeholder="Search casual sneakers, loafers, skate shoes..."
        popularTags={['Sneakers', 'Skate', 'Loafers', 'Running']}
      />

      {/* Wishlist Drawer */}
      <StorefrontWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        allProducts={AP_SHOES_NEW_PRODUCTS.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.subtitle || 'Shoes',
        }))}
        onRemoveWishlist={toggleWishlist}
        onAddToCart={(p) => {
          const fullProd = AP_SHOES_NEW_PRODUCTS.find((x) => x.id === p.id)
          if (fullProd) addToCart(fullProd, 9)
        }}
        onOpenProduct={(p) => {
          const fullProd = AP_SHOES_NEW_PRODUCTS.find((x) => x.id === p.id)
          if (fullProd) {
            setQuickViewProduct(fullProd)
            setSelectedQuickViewSize(fullProd.availableSizes[0] || 9)
          }
        }}
        accentColor={customAccentColor || '#ea580c'}
      />

      {/* Account Modal */}
      <StorefrontAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        brandName="N.O.Z Shoes"
        accentColor={customAccentColor || '#ea580c'}
      />

      {/* Mobile Navigation Drawer */}
      <StorefrontMobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        brandName="N.O.Z Shoes"
        navItems={navItems}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        cartCount={totalCartCount}
        contactPhone="+1 (800) 456-SHOE"
        contactEmail="service@nozshoes.com"
        accentColor={customAccentColor || '#ea580c'}
      />

      {/* ----------------------------------------------------------------------
          TOAST FEEDBACK
         ---------------------------------------------------------------------- */}
      {toastMessage && <div className="ap-toast">{toastMessage}</div>}
    </div>
  )
}

