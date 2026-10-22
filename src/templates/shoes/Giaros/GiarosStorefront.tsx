import React, { useState } from 'react'
import type {
  GiarosProduct,
  GiarosCartItem,
  GiarosStorefrontProps,
} from './types'
import {
  GIAROS_HERO_SLIDES,
  GIAROS_MODEL_CATEGORIES,
  GIAROS_NEW_ARRIVALS,
  GIAROS_BEST_SELLERS,
} from './data/giarosData'
import {
  StorefrontSearchModal,
  StorefrontWishlistDrawer,
  StorefrontAccountModal,
  StorefrontMobileNavDrawer,
  type MobileNavItem,
} from '../../common/StorefrontModals'
import './styles/giaros.css'

export const GiarosStorefront: React.FC<GiarosStorefrontProps> = ({
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
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD')
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [activeTab, setActiveTab] = useState<'Women Heels' | 'Boots Shoes' | 'Flats'>('Women Heels')
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<GiarosProduct | null>(null)
  const [selectedSize, setSelectedSize] = useState<number>(7)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [cartItems, setCartItems] = useState<GiarosCartItem[]>([
    {
      product: GIAROS_NEW_ARRIVALS[0],
      quantity: 1,
      selectedSize: 7,
    },
  ])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

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
      showToast('Added to Wishlist ❤️')
      return [...prev, productId]
    })
  }

  const handleAddToCart = (product: GiarosProduct, size = 7) => {
    setCartItems((prev) => {
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
      return [...prev, { product, quantity: 1, selectedSize: size }]
    })
    showToast(`Added "${product.name}" (Size ${size}) to shopping bag!`)
    setIsCartOpen(true)
  }

  const updateQuantity = (productId: string, size: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedSize === size) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean) as GiarosCartItem[]
    )
  }

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const formatPrice = (usdAmount: number) => {
    if (currency === 'INR') {
      return `₹${Math.round(usdAmount * 83).toLocaleString('en-IN')}`
    }
    return `$${usdAmount.toFixed(2)}`
  }

  const filteredBestSellers = GIAROS_BEST_SELLERS.filter(
    (p) => p.category === activeTab
  )

  const navItems: MobileNavItem[] = [
    {
      label: 'Home',
      children: [
        { label: 'Home Default', onClick: () => setCurrentSlideIndex(0) },
        { label: 'Couture Editorial', onClick: () => { const el = document.getElementById('gia-arrivals-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Shop',
      children: [
        { label: 'Women Heels', onClick: () => { setActiveTab('Women Heels'); const el = document.getElementById('gia-bestseller-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Boots Shoes', onClick: () => { setActiveTab('Boots Shoes'); const el = document.getElementById('gia-bestseller-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Flats & Sandals', onClick: () => { setActiveTab('Flats'); const el = document.getElementById('gia-bestseller-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Featured',
      children: [
        { label: 'New Arrivals', onClick: () => { const el = document.getElementById('gia-arrivals-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Best Sellers', onClick: () => { const el = document.getElementById('gia-bestseller-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Pages',
      children: [
        { label: 'About Giaros Atelier', onClick: () => showToast('Giaros: Handcrafted luxury footwear since 1994.') },
        { label: 'Size & Fit Guide', onClick: () => showToast('Size Guide: Standard European sizing, true to fit.') },
        { label: 'Customer Care', onClick: () => showToast('Customer Care: concierge@giaros.com') },
      ],
    },
    {
      label: 'Blogs',
      children: [
        { label: 'The Autumn Heel Guide', onClick: () => showToast('Opening: The Autumn Heel Styling Guide') },
        { label: 'Italian Leather Craft', onClick: () => showToast('Opening: Heritage of Italian Tuscan Leather') },
      ],
    },
  ]

  const activeSlide = GIAROS_HERO_SLIDES[currentSlideIndex]

  return (
    <div
      className={`gia-wrapper device-${effectiveDevice}`}
      style={customAccentColor ? ({ '--gia-accent': customAccentColor } as any) : undefined}
    >
      {/* Top Utility Bar */}
      <div className="gia-topbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 24px', background: '#0b1120', color: '#94a3b8', fontSize: '12px' }}>
        <span>⚡ Free Express Delivery on orders over {currency === 'INR' ? '₹12,000' : '$150'} &bull; 30-Day Easy Returns</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>{currency === 'USD' ? '🇺🇸' : '🇮🇳'}</span>
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as 'USD' | 'INR')}
            style={{ background: 'transparent', color: '#f8fafc', border: 'none', cursor: 'pointer', outline: 'none', fontSize: '12px', fontWeight: 600 }}
            aria-label="Currency Selector"
          >
            <option value="USD" style={{ color: '#000' }}>USD ($)</option>
            <option value="INR" style={{ color: '#000' }}>INR (₹)</option>
          </select>
        </div>
      </div>

      {/* Header */}
      <header className="gia-header">
        <div className="gia-header-inner">
          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="gia-hamburger-btn"
            onClick={() => setIsMobileNavOpen(true)}
            title="Menu"
            aria-label="Open mobile menu"
          >
            ☰
          </button>

          <div className="gia-logo-wrap" onClick={() => setCurrentSlideIndex(0)}>
            <div className="gia-logo">
              <span className="gia-logo-crescent">G</span>IAROS
            </div>
            <div className="gia-logo-sub">Footwear Premium</div>
          </div>

          <nav className="gia-nav">
            {navItems.map((item) => (
              <div key={item.label} className="wv-nav-dropdown-wrap">
                <span
                  className="gia-nav-link"
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

          <div className="gia-actions">
            <button
              type="button"
              className="gia-icon-btn"
              onClick={() => setIsSearchOpen(true)}
              title="Search"
            >
              🔍
            </button>
            <button
              type="button"
              className="gia-icon-btn"
              onClick={() => setIsAccountOpen(true)}
              title="Account"
            >
              👤
            </button>
            <button
              type="button"
              className="gia-icon-btn"
              onClick={() => setIsWishlistOpen(true)}
              title="Wishlist"
            >
              {wishlist.length > 0 ? '❤️' : '🤍'}
              {wishlist.length > 0 && (
                <span className="gia-badge-count">{wishlist.length}</span>
              )}
            </button>
            <button
              type="button"
              className="gia-icon-btn"
              onClick={() => setIsCartOpen(true)}
              title="Cart"
            >
              🛍️
              <span className="gia-badge-count">{cartItemCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="gia-hero">
        <div className="gia-hero-visual-wrap">
          <img
            src={activeSlide.heroImage}
            alt={activeSlide.title}
            className="gia-hero-main-img"
          />
          <div className="gia-spotlight-circle">
            <img
              src={activeSlide.spotlightImage}
              alt="Spotlight Shoe"
              className="gia-spotlight-img"
            />
          </div>
        </div>

        <div className="gia-hero-content">
          <div className="gia-hero-subtitle">{activeSlide.discountText}</div>
          <h1 className="gia-hero-title">{activeSlide.title}</h1>
          <p className="gia-hero-desc">{activeSlide.description}</p>
          <button
            type="button"
            className="gia-btn-black"
            onClick={() => {
              const el = document.getElementById('gia-bestseller-section')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            {activeSlide.buttonText}
          </button>

          <div className="gia-hero-dots">
            {GIAROS_HERO_SLIDES.map((_, i) => (
              <span
                key={i}
                className={`gia-dot ${i === currentSlideIndex ? 'active' : ''}`}
                onClick={() => setCurrentSlideIndex(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3 Model Categories Showcase */}
      <section className="gia-section">
        <div className="gia-model-grid">
          {GIAROS_MODEL_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              className="gia-model-card"
              onClick={() => showToast(`Filtering collection by ${cat.title}`)}
            >
              <img src={cat.image} alt={cat.title} className="gia-model-img" />
              <div className="gia-model-title">{cat.title}</div>
            </div>
          ))}
        </div>
      </section>

      {/* New Arrivals 2-Spotlight */}
      <section id="gia-arrivals-section" className="gia-section" style={{ paddingTop: 0 }}>
        <h2 className="gia-section-title">New Arrivals</h2>
        <div className="gia-arrivals-grid">
          {GIAROS_NEW_ARRIVALS.map((prod) => (
            <div
              key={prod.id}
              className="gia-arrival-card"
              style={{ position: 'relative' }}
              onClick={() => {
                setQuickViewProduct(prod)
                setSelectedSize(prod.availableSizes[0] || 7)
              }}
            >
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
              <img src={prod.image} alt={prod.name} className="gia-arrival-img" />
              <div className="gia-arrival-name">{prod.name}</div>
              <div className="gia-arrival-price">{formatPrice(prod.price)}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Video Presentation Banner */}
      <section className="gia-video-banner">
        <div className="gia-video-content">
          <button
            type="button"
            className="gia-play-btn"
            onClick={() => setIsVideoModalOpen(true)}
            title="Play presentation"
          >
            ▶
          </button>
          <h2 className="gia-video-title">GIAROS VIDEO PRESENTATION</h2>
          <p className="gia-video-sub">My Clothes Always Represent My Personality</p>
        </div>
      </section>

      {/* Our Best Seller (8 Product Grid with Tabs) */}
      <section id="gia-bestseller-section" className="gia-section">
        <h2 className="gia-section-title">Our Best Seller</h2>

        <div className="gia-tabs-row">
          {(['Women Heels', 'Boots Shoes', 'Flats'] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              className={`gia-tab-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="gia-bestseller-grid">
          {(filteredBestSellers.length > 0 ? filteredBestSellers : GIAROS_BEST_SELLERS).map(
            (prod) => (
              <div
                key={prod.id}
                className="gia-product-card"
                style={{ position: 'relative' }}
                onClick={() => {
                  setQuickViewProduct(prod)
                  setSelectedSize(prod.availableSizes[0] || 7)
                }}
              >
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
                <div className="gia-prod-img-wrap">
                  {prod.badge && <span className="gia-corner-ribbon">{prod.badge}</span>}
                  <img src={prod.image} alt={prod.name} className="gia-prod-img" />
                </div>
                <div className="gia-prod-name">{prod.name}</div>
                <div className="gia-prod-price">
                  {formatPrice(prod.price)}
                  {prod.originalPrice && (
                    <span className="gia-prod-compare">{formatPrice(prod.originalPrice)}</span>
                  )}
                </div>
              </div>
            )
          )}
        </div>
      </section>

      {/* La Boutique Destination Banner */}
      <section className="gia-destination-banner">
        <div className="gia-destination-content">
          <h2 className="gia-dest-title">The Latest Shoes From La</h2>
          <p className="gia-dest-sub">
            New England's destination for upscale vintage and designer shoes crafted with couture
            heritage.
          </p>
          <button
            type="button"
            className="gia-btn-black"
            style={{ backgroundColor: '#ffffff', color: '#000000', borderColor: '#ffffff' }}
            onClick={() => {
              const el = document.getElementById('gia-bestseller-section')
              el?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            SHOP NOW
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="gia-footer">
        <div className="gia-footer-inner">
          <div className="gia-footer-col">
            <div className="gia-logo" style={{ marginBottom: 12 }}>
              <span className="gia-logo-crescent">G</span>IAROS
            </div>
            <p style={{ fontSize: 13, color: '#666666', lineHeight: 1.6, maxWidth: 320 }}>
              Sophisticated modern footwear, custom couture stilettos and artisanal leather boots
              crafted for discerning tastemakers.
            </p>
            <div className="gia-social-row">
              <span>🐦</span>
              <span>📘</span>
              <span>💼</span>
              <span>📌</span>
            </div>
          </div>

          <div className="gia-footer-col">
            <h4>Help Information</h4>
            <ul>
              <li onClick={() => showToast('About Us')}>About Us</li>
              <li onClick={() => showToast('Privacy Policy')}>Privacy Policy</li>
              <li onClick={() => showToast('Terms & Conditions')}>Terms &amp; Conditions</li>
              <li onClick={() => showToast('Products Return')}>Products Return</li>
              <li onClick={() => showToast('Wholesale Policy')}>Wholesale Policy</li>
            </ul>
          </div>

          <div className="gia-footer-col">
            <h4>About Us</h4>
            <ul>
              <li onClick={() => showToast('Pagination')}>Pagination</li>
              <li onClick={() => showToast('Terms & Conditions')}>Terms &amp; Conditions</li>
              <li onClick={() => showToast('Contact')}>Contact</li>
              <li onClick={() => showToast('Accessories')}>Accessories</li>
              <li onClick={() => showToast('Home Page')}>Home Page</li>
            </ul>
          </div>

          <div className="gia-footer-col">
            <h4>Categories</h4>
            <ul>
              <li onClick={() => showToast('Menu item')}>Menu item</li>
              <li onClick={() => showToast('Help Center')}>Help Center</li>
              <li onClick={() => showToast('Our Service')}>Our Service</li>
              <li onClick={() => showToast('Privacy Policy')}>Privacy Policy</li>
              <li onClick={() => showToast('Terms & Conditions')}>Terms &amp; Conditions</li>
            </ul>
          </div>
        </div>

        <div className="gia-footer-bottom">
          <div>© Copyright 2024 - Powered by Shopify / Giaros Footwear Premium</div>
          <div style={{ display: 'flex', gap: 12, fontSize: 14 }}>
            <span>💳 Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
            <span>PayPal</span>
          </div>
        </div>
      </footer>

      {/* Video Presentation Modal */}
      {isVideoModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
          }}
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#111111',
              borderRadius: 12,
              padding: 32,
              maxWidth: 720,
              width: '100%',
              textAlign: 'center',
              color: '#ffffff',
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setIsVideoModalOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#ffffff', fontSize: 20, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
            <div style={{ fontSize: 54, margin: '20px 0' }}>👠 🎬</div>
            <h3 style={{ fontSize: 24, fontWeight: 800, marginBottom: 12 }}>
              Giaros High-Fashion Footwear Campaign
            </h3>
            <p style={{ fontSize: 14, color: '#cbd5e1', lineHeight: 1.6, marginBottom: 24 }}>
              Experience the artisan craftsmanship and runway styling of our handmade Italian velour
              and stiletto heels in dynamic motion.
            </p>
            <button
              type="button"
              className="gia-btn-black"
              style={{ backgroundColor: '#ffffff', color: '#000000' }}
              onClick={() => setIsVideoModalOpen(false)}
            >
              CLOSE PREVIEW
            </button>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              borderRadius: 8,
              maxWidth: 680,
              width: '100%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: 24, background: '#f7f7fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{ maxWidth: '100%', maxHeight: 280, objectFit: 'contain' }}
              />
            </div>
            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: '#888888', textTransform: 'uppercase', letterSpacing: 1 }}>
                    {quickViewProduct.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuickViewProduct(null)}
                    style={{ background: 'transparent', border: 'none', fontSize: 18, cursor: 'pointer' }}
                  >
                    ✕
                  </button>
                </div>

                <h3 style={{ fontSize: 24, fontWeight: 800, margin: '8px 0', color: '#000000' }}>
                  {quickViewProduct.name}
                </h3>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#e11d48', marginBottom: 12 }}>
                  {formatPrice(quickViewProduct.price)}
                </div>
                <p style={{ fontSize: 13, color: '#555555', lineHeight: 1.5, marginBottom: 18 }}>
                  {quickViewProduct.description}
                </p>

                <div style={{ marginBottom: 18 }}>
                  <label style={{ fontSize: 11, fontWeight: 800, textTransform: 'uppercase', display: 'block', marginBottom: 6 }}>
                    Select Size:
                  </label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {quickViewProduct.availableSizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        style={{
                          padding: '6px 14px',
                          border: selectedSize === sz ? '1.5px solid #000000' : '1px solid #dddddd',
                          backgroundColor: selectedSize === sz ? '#000000' : '#ffffff',
                          color: selectedSize === sz ? '#ffffff' : '#000000',
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                        onClick={() => setSelectedSize(sz)}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  type="button"
                  className="gia-btn-black"
                  style={{ flex: 1, backgroundColor: '#000000', color: '#ffffff', textAlign: 'center' }}
                  onClick={() => {
                    handleAddToCart(quickViewProduct, selectedSize)
                    setQuickViewProduct(null)
                  }}
                >
                  ADD TO BAG
                </button>
                <button
                  type="button"
                  style={{
                    padding: '12px 16px',
                    border: '1px solid #dddddd',
                    background: '#ffffff',
                    cursor: 'pointer',
                    fontSize: 16,
                  }}
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                >
                  {wishlist.includes(quickViewProduct.id) ? '❤️' : '🤍'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000,
            display: 'flex',
            justifyContent: 'flex-end',
          }}
          onClick={() => setIsCartOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#ffffff',
              width: '100%',
              maxWidth: 400,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-8px 0 24px rgba(0,0,0,0.2)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                padding: '24px',
                borderBottom: '1px solid #eeeeee',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800, textTransform: 'uppercase', letterSpacing: 1 }}>
                Shopping Bag ({cartItemCount})
              </h3>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'transparent', border: 'none', fontSize: 18, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#888888', marginTop: 40 }}>
                  <div style={{ fontSize: 44, marginBottom: 12 }}>👠</div>
                  <p>Your shopping bag is empty.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    style={{
                      display: 'flex',
                      gap: 14,
                      paddingBottom: 16,
                      borderBottom: '1px solid #eeeeee',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: 64, height: 64, objectFit: 'contain', background: '#f7f7fa' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#000000' }}>
                        {item.product.name}
                      </div>
                      <div style={{ fontSize: 11, color: '#888888' }}>
                        Size: {item.selectedSize}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#e11d48', marginTop: 4 }}>
                        {formatPrice(item.product.price)}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button
                        type="button"
                        style={{ width: 24, height: 24, border: '1px solid #dddddd', background: '#fff', cursor: 'pointer' }}
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                      >
                        -
                      </button>
                      <span style={{ fontSize: 12, fontWeight: 700 }}>{item.quantity}</span>
                      <button
                        type="button"
                        style={{ width: 24, height: 24, border: '1px solid #dddddd', background: '#fff', cursor: 'pointer' }}
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div style={{ padding: 24, borderTop: '1px solid #eeeeee', backgroundColor: '#fafafa' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontSize: 13, color: '#666666' }}>Subtotal</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#000000' }}>
                  {formatPrice(cartTotal)}
                </span>
              </div>
              <button
                type="button"
                className="gia-btn-black"
                style={{ width: '100%', backgroundColor: '#000000', color: '#ffffff', textAlign: 'center' }}
                onClick={() => {
                  showToast('Redirecting to checkout...')
                  onUseTemplate?.('shoes-giaros')
                }}
              >
                PROCEED TO CHECKOUT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <StorefrontSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={[...GIAROS_NEW_ARRIVALS, ...GIAROS_BEST_SELLERS].map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category,
        }))}
        onSelectProduct={(p) => {
          const fullProd = [...GIAROS_NEW_ARRIVALS, ...GIAROS_BEST_SELLERS].find((x) => x.id === p.id)
          if (fullProd) {
            setQuickViewProduct(fullProd)
            setSelectedSize(fullProd.availableSizes[0] || 7)
          }
        }}
        accentColor={customAccentColor || '#111827'}
        currencyPrefix={currency === 'INR' ? '₹' : '$'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
        placeholder="Search luxury heels, boots, flats..."
        popularTags={['Heels', 'Boots', 'Flats', 'Sandals']}
      />

      {/* Wishlist Drawer */}
      <StorefrontWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        allProducts={[...GIAROS_NEW_ARRIVALS, ...GIAROS_BEST_SELLERS].map((p) => ({
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
          const fullProd = [...GIAROS_NEW_ARRIVALS, ...GIAROS_BEST_SELLERS].find((x) => x.id === p.id)
          if (fullProd) handleAddToCart(fullProd, 7)
        }}
        onOpenProduct={(p) => {
          const fullProd = [...GIAROS_NEW_ARRIVALS, ...GIAROS_BEST_SELLERS].find((x) => x.id === p.id)
          if (fullProd) {
            setQuickViewProduct(fullProd)
            setSelectedSize(fullProd.availableSizes[0] || 7)
          }
        }}
        accentColor={customAccentColor || '#111827'}
      />

      {/* Account Modal */}
      <StorefrontAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        brandName="Giaros"
        accentColor={customAccentColor || '#111827'}
      />

      {/* Mobile Navigation Drawer */}
      <StorefrontMobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        brandName="Giaros"
        navItems={navItems}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        cartCount={cartItemCount}
        contactPhone="+1 (800) 555-GIAROS"
        contactEmail="concierge@giaros.com"
        accentColor={customAccentColor || '#111827'}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            backgroundColor: '#000000',
            color: '#ffffff',
            padding: '12px 24px',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: 1,
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

export default GiarosStorefront

