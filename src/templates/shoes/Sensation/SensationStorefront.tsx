import React, { useState } from 'react'
import type {
  SensationProduct,
  SensationCartItem,
  SensationStorefrontProps,
} from './types'
import {
  SENSATION_HERO_SLIDES,
  SENSATION_TRENDING_PRODUCTS,
  SENSATION_SUNGLASSES_PRODUCTS,
  SENSATION_TESTIMONIALS,
  SENSATION_BLOGS,
} from './data/sensationData'
import {
  StorefrontSearchModal,
  StorefrontWishlistDrawer,
  StorefrontAccountModal,
  StorefrontMobileNavDrawer,
  type MobileNavItem,
} from '../../common/StorefrontModals'
import './styles/sensation.css'

export const SensationStorefront: React.FC<SensationStorefrontProps> = ({
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
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [currency, setCurrency] = useState<'USD' | 'INR' | 'EUR'>('USD')
  const [language, setLanguage] = useState<'English' | 'Spanish' | 'French'>('English')
  const [selectedCategory, setSelectedCategory] = useState('Clothes')
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false)
  const [isShopMenuOpen, setIsShopMenuOpen] = useState(false)

  // Sunglasses tab
  const [sunglassesTab, setSunglassesTab] = useState<'ALL' | 'ACCESSORIES'>('ALL')

  // Cart & Wishlist
  const [cartItems, setCartItems] = useState<SensationCartItem[]>([
    {
      product: SENSATION_TRENDING_PRODUCTS[0],
      quantity: 1,
      selectedColor: 'Black',
      selectedSize: '7',
    },
  ])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [quickViewProduct, setQuickViewProduct] = useState<SensationProduct | null>(null)
  const [selectedProductSize, setSelectedProductSize] = useState<string>('7')
  const [selectedProductColor, setSelectedProductColor] = useState<string>('Black')
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [showSocialProof, setShowSocialProof] = useState(true)

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

  const formatPrice = (usdAmount: number) => {
    if (currency === 'INR') {
      const inr = Math.round(usdAmount * 83)
      return `₹${inr.toLocaleString('en-IN')}.00`
    }
    if (currency === 'EUR') {
      const eur = Math.round(usdAmount * 0.92)
      return `€${eur}.00`
    }
    return `$${usdAmount.toFixed(2)}`
  }

  const handleAddToCart = (product: SensationProduct, color?: string, size?: string) => {
    const finalColor = color || product.colors?.[0]?.name || 'Standard'
    const finalSize = size || product.sizes?.[0] || 'One Size'

    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedColor === finalColor &&
          item.selectedSize === finalSize
      )
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id &&
          item.selectedColor === finalColor &&
          item.selectedSize === finalSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [
        ...prev,
        {
          product,
          quantity: 1,
          selectedColor: finalColor,
          selectedSize: finalSize,
        },
      ]
    })
    showToast(`Added "${product.name}" to cart!`)
    setIsCartOpen(true)
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
        .filter(Boolean) as SensationCartItem[]
    )
  }

  const cartTotalUSD = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  )
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.')
      return
    }
    showToast('🎉 Thank you for subscribing to Sensation emails!')
    setNewsletterEmail('')
  }

  const navItems: MobileNavItem[] = [
    {
      label: 'Shop Categories',
      children: [
        { label: 'Clothes & Apparel', onClick: () => { setSelectedCategory('Clothes'); showToast('Browsing Clothes') } },
        { label: 'Shoes & Footwear', onClick: () => { setSelectedCategory('Shoes & Footwear'); showToast('Browsing Footwear') } },
        { label: 'Sandals & Flats', onClick: () => { setSelectedCategory('Sandals & Flats'); showToast('Browsing Sandals') } },
        { label: 'Accessories & Sunglasses', onClick: () => { setSelectedCategory('Accessories'); showToast('Browsing Accessories') } },
      ],
    },
    {
      label: 'Featured Brands',
      children: [
        { label: 'Trending Picks', onClick: () => { const el = document.getElementById('sen-trending-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Best Sellers', onClick: () => { const el = document.getElementById('sen-sunglasses-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Pages & Support',
      children: [
        { label: 'Lookbook Journal', onClick: () => showToast('Opening Lookbook') },
        { label: 'About Sensation', onClick: () => showToast('About Sensation Atelier') },
        { label: 'Support 7 Days a Week', onClick: () => showToast('Support: 9am-7pm Daily') },
      ],
    },
  ]

  const activeSlide = SENSATION_HERO_SLIDES[currentSlideIndex]

  return (
    <div
      className={`sen-wrapper device-${effectiveDevice}`}
      style={customAccentColor ? ({ '--sen-accent': customAccentColor } as any) : undefined}
    >
      {/* Top Announcement Bar */}
      <div className="sen-topbar">
        <div>
          <span className="sen-topbar-center">7 Days A Week</span> From 9:00 Am To 7:00 Pm
        </div>

        <div className="sen-topbar-actions">
          <div className="sen-dropdown-pill">
            <span>🇬🇧 </span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value as any)}
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
            </select>
          </div>

          <div className="sen-dropdown-pill">
            <span>{currency === 'USD' ? '🇺🇸' : currency === 'INR' ? '🇮🇳' : '🇪🇺'} </span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as any)}
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
              <option value="EUR">EUR</option>
            </select>
          </div>

          <button
            type="button"
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: 14 }}
            onClick={() => showToast('Announcement dismissed')}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main Header */}
      <header className="sen-header">
        <div className="sen-header-inner">
          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="sen-hamburger-btn"
            onClick={() => setIsMobileNavOpen(true)}
            title="Menu"
            aria-label="Open mobile menu"
          >
            ☰
          </button>

          <div className="sen-logo" onClick={() => setCurrentSlideIndex(0)}>
            Sensation
          </div>

          {/* Navigation with Dropdowns */}
          <div className="sen-nav-group">
            {/* Clothes Category Dropdown Pill */}
            <div style={{ position: 'relative' }}>
              <button
                type="button"
                className="sen-cat-pill-btn"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
              >
                <span>{selectedCategory}</span>
                <span>▾</span>
              </button>

              {isCategoryMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: 8,
                    backgroundColor: '#ffffff',
                    color: '#18181b',
                    borderRadius: 12,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                    padding: '8px 0',
                    minWidth: 180,
                    zIndex: 200,
                  }}
                >
                  {['Clothes', 'Shoes & Footwear', 'Sandals & Flats', 'Accessories', 'Sunglasses'].map(
                    (cat) => (
                      <div
                        key={cat}
                        style={{
                          padding: '10px 20px',
                          fontSize: 13,
                          fontWeight: 600,
                          cursor: 'pointer',
                          backgroundColor: selectedCategory === cat ? '#f4f4f5' : 'transparent',
                        }}
                        onClick={() => {
                          setSelectedCategory(cat)
                          setIsCategoryMenuOpen(false)
                          showToast(`Category set to: ${cat}`)
                        }}
                      >
                        {cat}
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            {/* Shop All Dropdown */}
            <div style={{ position: 'relative' }}>
              <span
                className="sen-nav-link"
                onClick={() => setIsShopMenuOpen(!isShopMenuOpen)}
              >
                Shop All ▾
              </span>

              {isShopMenuOpen && (
                <div
                  style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: 8,
                    backgroundColor: '#ffffff',
                    color: '#18181b',
                    borderRadius: 12,
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                    padding: '8px 0',
                    minWidth: 160,
                    zIndex: 200,
                  }}
                >
                  {['New In', 'Footwear', 'Casuals', 'Formal', 'Sale -40%'].map((item) => (
                    <div
                      key={item}
                      style={{
                        padding: '8px 16px',
                        fontSize: 13,
                        fontWeight: 600,
                        cursor: 'pointer',
                      }}
                      onClick={() => {
                        setIsShopMenuOpen(false)
                        showToast(`Opened: ${item}`)
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <span className="sen-nav-link" onClick={() => showToast('Opening Brands...')}>
              Brands
            </span>
            <span className="sen-nav-link" onClick={() => showToast('Opening Bestseller...')}>
              Bestseller
            </span>
            <span className="sen-nav-link" onClick={() => showToast('Opening Pages...')}>
              Pages ▾
            </span>
          </div>

          {/* Right Action Icons */}
          <div className="sen-header-right">
            <button
              type="button"
              className="sen-circle-btn"
              onClick={() => setIsSearchOpen(true)}
              title="Search"
            >
              🔍
            </button>
            <button
              type="button"
              className="sen-circle-btn"
              onClick={() => setIsAccountOpen(true)}
              title="Account"
            >
              👤
            </button>
            <button
              type="button"
              className="sen-circle-btn"
              onClick={() => setIsWishlistOpen(true)}
              title="Wishlist"
              style={{ position: 'relative' }}
            >
              {wishlist.length > 0 ? '❤️' : '🤍'}
              {wishlist.length > 0 && <span className="sen-badge">{wishlist.length}</span>}
            </button>
            <button
              type="button"
              className="sen-cart-btn"
              onClick={() => setIsCartOpen(true)}
            >
              <span>Cart: 🛒 {cartItemCount}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section
        className="sen-hero"
        style={{ backgroundImage: `url(${activeSlide.image})` }}
      >
        <div className="sen-hero-inner">
          <div className="sen-hero-box">
            <div className="sen-hero-subtitle">{activeSlide.subtitle}</div>
            <h1 className="sen-hero-title">
              {activeSlide.title}{' '}
              <span style={{ fontWeight: 800 }}>{activeSlide.highlightedWord}</span>
            </h1>
            <p className="sen-hero-desc">{activeSlide.description}</p>
            <div className="sen-hero-actions">
              <button
                type="button"
                className="sen-btn-white"
                onClick={() => {
                  const el = document.getElementById('sen-trending-section')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                {activeSlide.primaryBtnText}
              </button>
              <button
                type="button"
                className="sen-btn-outline"
                onClick={() =>
                  setCurrentSlideIndex((prev) => (prev + 1) % SENSATION_HERO_SLIDES.length)
                }
              >
                {activeSlide.secondaryBtnText}
              </button>
            </div>

            {/* Slide Dots */}
            <div style={{ display: 'flex', gap: 8, marginTop: 32 }}>
              {SENSATION_HERO_SLIDES.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === currentSlideIndex ? 24 : 8,
                    height: 8,
                    borderRadius: 9999,
                    backgroundColor: i === currentSlideIndex ? '#ffffff' : 'rgba(255,255,255,0.4)',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onClick={() => setCurrentSlideIndex(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section id="sen-trending-section" className="sen-section">
        <div className="sen-container">
          <div className="sen-section-header">
            <h2 className="sen-section-title">Trending Products:</h2>
            <button
              type="button"
              className="sen-pill-link-btn"
              onClick={() => showToast('Opening all trending products...')}
            >
              Show More Products
            </button>
          </div>

          <div className="sen-products-grid">
            {SENSATION_TRENDING_PRODUCTS.map((prod) => (
              <div key={prod.id} className="sen-product-card" style={{ position: 'relative' }}>
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
                {prod.badge && <span className="sen-product-badge">{prod.badge}</span>}

                <div
                  className="sen-product-img-wrap"
                  onClick={() => {
                    setQuickViewProduct(prod)
                    setSelectedProductSize(prod.sizes?.[0] || '7')
                    setSelectedProductColor(prod.colors?.[0]?.name || 'Standard')
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={prod.image} alt={prod.name} className="sen-product-img" />
                </div>

                <div className="sen-product-name">{prod.name}</div>
                <div className="sen-product-price-row">
                  <span className="sen-price">{formatPrice(prod.price)}</span>
                  {prod.originalPrice && (
                    <span
                      style={{ fontSize: 13, color: '#a1a1aa', textDecoration: 'line-through' }}
                    >
                      {formatPrice(prod.originalPrice)}
                    </span>
                  )}
                </div>

                {prod.colors && (
                  <div className="sen-color-swatches">
                    {prod.colors.map((c) => (
                      <span
                        key={c.name}
                        className="sen-swatch-dot"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  className="sen-add-cart-btn"
                  onClick={() => handleAddToCart(prod)}
                >
                  <span>Add to Cart 🛍️</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tale of Exhilaration: Fashion Finds */}
      <section className="sen-container">
        <div className="sen-tale-banner">
          <div>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#18181b', marginBottom: 16 }}>
              Tale of Exhilaration: Fashion Finds
            </h2>
            <p style={{ fontSize: 14, color: '#52525b', lineHeight: 1.6, marginBottom: 24 }}>
              Embark on an exhilarating fashion expedition where every discovery is a thrill. From
              head-turning apparel to swoon-worthy shoes and accessories, find pieces that speak to
              your unique aesthetic.
            </p>
            <button
              type="button"
              className="sen-pill-link-btn"
              onClick={() => showToast('Opening catalog...')}
            >
              Go To Store
            </button>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80"
              alt="Fashion Friends"
              className="sen-tale-img"
            />
          </div>
        </div>
      </section>

      {/* Deep Olive Section: Journey Through Amazing Clothes */}
      <section className="sen-olive-section">
        <div className="sen-container">
          <h2 style={{ fontSize: 32, fontWeight: 800, marginBottom: 32 }}>
            Journey Through Amazing Clothes
          </h2>

          <div className="sen-journey-grid">
            <div className="sen-journey-card">
              <img
                src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&w=400&q=80"
                alt="Model"
                className="sen-journey-thumb"
              />
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
                  Exquisite Pieces Breed of Style
                </h3>
                <p style={{ fontSize: 13, color: '#e4e4e7', lineHeight: 1.5, marginBottom: 16 }}>
                  The subtle interplay of texture and cut produces silhouettes that are both timeless
                  and daring.
                </p>
                <button
                  type="button"
                  className="sen-btn-outline"
                  style={{ padding: '8px 20px', fontSize: 12 }}
                  onClick={() => showToast('Browsing Exquisite collection...')}
                >
                  Shop Now
                </button>
              </div>
            </div>

            <div className="sen-journey-card">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=400&q=80"
                alt="Street Style"
                className="sen-journey-thumb"
              />
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
                  Harmonious Fashion Scene
                </h3>
                <p style={{ fontSize: 13, color: '#e4e4e7', lineHeight: 1.5, marginBottom: 16 }}>
                  From chic coats to artisanal leather sandals, curate your personal runway wherever
                  you roam.
                </p>
                <button
                  type="button"
                  className="sen-btn-outline"
                  style={{ padding: '8px 20px', fontSize: 12 }}
                  onClick={() => showToast('Browsing Harmonious collection...')}
                >
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'center' }}>
            <span style={{ fontSize: 14, marginRight: 16 }}>Show more product</span>
            <button
              type="button"
              className="sen-btn-white"
              onClick={() => showToast('Opening all products...')}
            >
              Go to collection
            </button>
          </div>
        </div>
      </section>

      {/* Embracing Allure of Sunglasses */}
      <section className="sen-section">
        <div className="sen-container">
          <div className="sen-section-header">
            <div>
              <h2 className="sen-section-title">Embracing Allure of Sunglasses</h2>
              <div style={{ display: 'flex', gap: 16, marginTop: 8, fontSize: 12, fontWeight: 700 }}>
                <span
                  style={{
                    cursor: 'pointer',
                    color: sunglassesTab === 'ALL' ? '#656c4d' : '#a1a1aa',
                    textDecoration: sunglassesTab === 'ALL' ? 'underline' : 'none',
                  }}
                  onClick={() => setSunglassesTab('ALL')}
                >
                  ALL PRODUCT
                </span>
                <span
                  style={{
                    cursor: 'pointer',
                    color: sunglassesTab === 'ACCESSORIES' ? '#656c4d' : '#a1a1aa',
                    textDecoration: sunglassesTab === 'ACCESSORIES' ? 'underline' : 'none',
                  }}
                  onClick={() => setSunglassesTab('ACCESSORIES')}
                >
                  ACCESSORIES
                </span>
              </div>
            </div>

            <button
              type="button"
              className="sen-pill-link-btn"
              onClick={() => showToast('Opening sunglasses collection...')}
            >
              Go To Store
            </button>
          </div>

          <div className="sen-products-grid">
            {SENSATION_SUNGLASSES_PRODUCTS.map((prod) => (
              <div key={prod.id} className="sen-product-card" style={{ position: 'relative' }}>
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
                {prod.badge && <span className="sen-product-badge">{prod.badge}</span>}

                <div
                  className="sen-product-img-wrap"
                  onClick={() => {
                    setQuickViewProduct(prod)
                    setSelectedProductColor(prod.colors?.[0]?.name || 'Standard')
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <img src={prod.image} alt={prod.name} className="sen-product-img" />
                </div>

                <div className="sen-product-name">{prod.name}</div>
                <div className="sen-product-price-row">
                  <span className="sen-price">{formatPrice(prod.price)}</span>
                </div>

                {prod.colors && (
                  <div className="sen-color-swatches">
                    {prod.colors.map((c) => (
                      <span
                        key={c.name}
                        className="sen-swatch-dot"
                        style={{ backgroundColor: c.hex }}
                        title={c.name}
                      />
                    ))}
                  </div>
                )}

                <button
                  type="button"
                  className="sen-add-cart-btn"
                  onClick={() => handleAddToCart(prod)}
                >
                  <span>Add to Cart 🛍️</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terracotta Banner: Unraveling the Glamour of Fashion */}
      <section className="sen-copper-banner">
        <div className="sen-copper-inner">
          <div>
            <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 14 }}>
              Unraveling the Glamour of Fashion
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.6, color: '#fef08a', marginBottom: 24 }}>
              Step into the enchanted world of fashion where glamour takes center stage, and every
              outfit tells a tale of elegance and opulence.
            </p>
            <button
              type="button"
              className="sen-btn-white"
              onClick={() => showToast('Opening Glamour collection...')}
            >
              Go To Shop
            </button>
          </div>

          <div>
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80"
              alt="Glamour model"
              className="sen-copper-img"
            />
          </div>
        </div>
      </section>

      {/* Embracing Fashion for Every Body: 3 Visual Category Cards */}
      <section className="sen-section">
        <div className="sen-container">
          <div className="sen-section-header">
            <div>
              <h2 className="sen-section-title">Embracing Fashion for Every Body</h2>
              <p style={{ fontSize: 13, color: '#71717a', marginTop: 4 }}>
                A Global Movement Toward Inclusivity and Self-Love in the Fashion Industry - Explore
                &amp; Find your Perfect Style
              </p>
            </div>
            <button
              type="button"
              className="sen-pill-link-btn"
              onClick={() => showToast('Opening lookbook...')}
            >
              Go To Gallery
            </button>
          </div>

          <div className="sen-visual-cats-grid">
            <div
              className="sen-visual-cat-card"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=600&q=80)',
              }}
            >
              <div className="sen-visual-cat-content">
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
                  Secret of Ladies Bags and Purses
                </h3>
                <button
                  type="button"
                  className="sen-btn-white"
                  style={{ padding: '8px 18px', fontSize: 12 }}
                  onClick={() => showToast('Opening Bags collection...')}
                >
                  Read More
                </button>
              </div>
            </div>

            <div
              className="sen-visual-cat-card"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80)',
              }}
            >
              <div className="sen-visual-cat-content">
                <span style={{ fontSize: 11, fontWeight: 700, color: '#fef08a' }}>
                  Awakened Ladies Purses and Bags
                </span>
                <h3 style={{ fontSize: 22, fontWeight: 800, margin: '6px 0 12px' }}>
                  Fashion Essentials
                </h3>
                <button
                  type="button"
                  className="sen-btn-white"
                  style={{ padding: '8px 18px', fontSize: 12 }}
                  onClick={() => showToast('Shopping Purses...')}
                >
                  Shop Now
                </button>
              </div>
            </div>

            <div
              className="sen-visual-cat-card"
              style={{
                backgroundImage:
                  'url(https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80)',
              }}
            >
              <div className="sen-visual-cat-content">
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 8 }}>
                  Unveiling the Allure of Ladies' Hats
                </h3>
                <button
                  type="button"
                  className="sen-btn-white"
                  style={{ padding: '8px 18px', fontSize: 12 }}
                  onClick={() => showToast('Opening Hats collection...')}
                >
                  Read More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fashionably Satisfied (4 Testimonial Cards) */}
      <section className="sen-section" style={{ backgroundColor: '#fafafa' }}>
        <div className="sen-container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, color: '#18181b', marginBottom: 8 }}>
              Fashionably Satisfied
            </h2>
            <p style={{ fontSize: 14, color: '#71717a' }}>
              Find Inspiration in the Words of Satisfied Customers Who Have Found Their Fashion Nirvana
            </p>
          </div>

          <div className="sen-test-grid">
            {SENSATION_TESTIMONIALS.map((test) => (
              <div
                key={test.id}
                className={`sen-test-card ${test.highlighted ? 'highlighted' : ''}`}
              >
                <div>
                  <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>★★★★★</div>
                  <h4 style={{ fontSize: 16, fontWeight: 800, marginBottom: 12 }}>{test.title}</h4>
                  <p style={{ fontSize: 13, lineHeight: 1.5, opacity: 0.9 }}>"{test.quote}"</p>
                </div>
                <div style={{ marginTop: 20, fontSize: 12, fontWeight: 700 }}>
                  — {test.author}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Exclusive Fashion Delivered to Your Doorstep */}
      <section className="sen-container">
        <div className="sen-doorstep-banner">
          <div style={{ maxWidth: 540, position: 'relative', zIndex: 2 }}>
            <h2 style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>
              Exclusive Fashion Delivered to Your Doorstep
            </h2>
            <p style={{ fontSize: 14, color: '#e4e4e7', lineHeight: 1.5, marginBottom: 20 }}>
              Discover the latest fashion trends and must-have styles for your wardrobe from the
              comfort of your home with our exclusive fashion delivery service.
            </p>
            <button
              type="button"
              className="sen-btn-white"
              onClick={() => showToast('Opening exclusive delivery catalog...')}
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      {/* Style Chronicle Blogs */}
      <section className="sen-section">
        <div className="sen-container">
          <div className="sen-section-header">
            <div>
              <h2 className="sen-section-title">Style Chronicle</h2>
              <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
                {['CLOTHES', 'WOMEN', 'MEN', 'SPRING', 'SUMMER'].map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: tag === 'CLOTHES' ? '#656c4d' : '#a1a1aa',
                      cursor: 'pointer',
                    }}
                    onClick={() => showToast(`Filtered blogs by: ${tag}`)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button
              type="button"
              className="sen-pill-link-btn"
              onClick={() => showToast('Opening all articles...')}
            >
              View All Posts
            </button>
          </div>

          <div className="sen-blogs-grid">
            {SENSATION_BLOGS.map((blog) => (
              <div key={blog.id} className="sen-blog-card">
                <img src={blog.image} alt={blog.title} className="sen-blog-img" />
                <div className="sen-blog-body">
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#656c4d', marginBottom: 4 }}>
                    {blog.category} • {blog.date}
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 800, color: '#18181b', marginBottom: 8 }}>
                    {blog.title}
                  </h3>
                  <p style={{ fontSize: 13, color: '#71717a', lineHeight: 1.5, marginBottom: 16 }}>
                    {blog.excerpt}
                  </p>
                  <button
                    type="button"
                    className="sen-pill-link-btn"
                    style={{ padding: '6px 16px', fontSize: 12 }}
                    onClick={() => showToast(`Reading article "${blog.title}"...`)}
                  >
                    Continue Reading
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="sen-footer">
        <div className="sen-footer-grid">
          <div>
            <div className="sen-logo" style={{ color: '#18181b', marginBottom: 14 }}>
              Sensation
            </div>
            <p style={{ fontSize: 13, color: '#71717a', lineHeight: 1.6, maxWidth: 320 }}>
              Sensation Store is a premier online fashion store offering a wide selection of stylish
              and trendy clothing, footwear, and accessories for men and women.
            </p>
          </div>

          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#18181b', marginBottom: 14 }}>
              Quick Links
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 13, color: '#71717a', lineHeight: 2 }}>
              <li style={{ cursor: 'pointer' }} onClick={() => showToast('Opening FAQs...')}>FAQs</li>
              <li style={{ cursor: 'pointer' }} onClick={() => showToast('Opening Shipping Policy...')}>Shipping Policy</li>
              <li style={{ cursor: 'pointer' }} onClick={() => showToast('Opening Return Policy...')}>Return &amp; Refund Policy</li>
              <li style={{ cursor: 'pointer' }} onClick={() => showToast('Opening Privacy Policy...')}>Privacy Policy</li>
            </ul>
          </div>

          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#18181b', marginBottom: 14 }}>
              Information
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 13, color: '#71717a', lineHeight: 2 }}>
              <li style={{ cursor: 'pointer' }} onClick={() => showToast('About Us')}>About Us</li>
              <li style={{ cursor: 'pointer' }} onClick={() => showToast('Contact Us')}>Contact Us</li>
              <li style={{ cursor: 'pointer' }} onClick={() => showToast('Blog')}>Blog</li>
              <li style={{ cursor: 'pointer' }} onClick={() => showToast('Sizing Guide')}>Sizing Guide</li>
              <li style={{ cursor: 'pointer' }} onClick={() => showToast('Order Status')}>Order Status</li>
            </ul>
          </div>

          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#18181b', marginBottom: 10 }}>
              Connect to Sensation
            </div>
            <p style={{ fontSize: 12, color: '#71717a', lineHeight: 1.5, marginBottom: 14 }}>
              Subscribe to our emails to stay up-to-date with the latest trends and exclusive offers.
            </p>
            <form onSubmit={handleNewsletterSubmit} style={{ display: 'flex', gap: 8 }}>
              <input
                type="email"
                placeholder="Enter your email..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: 9999,
                  border: '1px solid #d4d4d8',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                className="sen-pill-link-btn"
                style={{ padding: '10px 20px', whiteSpace: 'nowrap' }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            padding: '20px 32px 0',
            borderTop: '1px solid #e4e4e7',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            fontSize: 12,
            color: '#71717a',
          }}
        >
          <div>© 2024, Sensation WorkDo Powered by Shopify</div>
          <div style={{ display: 'flex', gap: 10, fontSize: 16 }}>
            <span>💳 Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
            <span>PayPal</span>
            <span>Apple Pay</span>
          </div>
        </div>
      </footer>

      {/* Floating Social Proof Popup */}
      {showSocialProof && (
        <div className="sen-social-proof">
          <img
            src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=80&q=80"
            alt="Shoe"
            style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover' }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: '#fef08a' }}>Someone recently purchased</div>
            <div style={{ fontSize: 12, fontWeight: 700 }}>Women ARCOCO Stylish Leather</div>
            <div style={{ fontSize: 10, opacity: 0.8 }}>15 mins ago • Verified Buyer</div>
          </div>
          <button
            type="button"
            onClick={() => setShowSocialProof(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              fontSize: 14,
            }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
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
              borderRadius: 16,
              maxWidth: 700,
              width: '100%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: 24, background: '#fafafa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{ maxWidth: '100%', maxHeight: 260, objectFit: 'contain' }}
              />
            </div>
            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#656c4d', textTransform: 'uppercase' }}>
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
                <h3 style={{ fontSize: 20, fontWeight: 800, margin: '8px 0', color: '#18181b' }}>
                  {quickViewProduct.name}
                </h3>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#656c4d', marginBottom: 12 }}>
                  {formatPrice(quickViewProduct.price)}
                </div>
                <p style={{ fontSize: 13, color: '#71717a', lineHeight: 1.5, marginBottom: 16 }}>
                  {quickViewProduct.description}
                </p>

                {quickViewProduct.sizes && (
                  <div style={{ marginBottom: 14 }}>
                    <label style={{ fontSize: 12, fontWeight: 700, color: '#27272a', display: 'block', marginBottom: 6 }}>
                      Size:
                    </label>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {quickViewProduct.sizes.map((sz) => (
                        <button
                          key={sz}
                          type="button"
                          style={{
                            padding: '4px 12px',
                            borderRadius: 6,
                            border: selectedProductSize === sz ? '2px solid #656c4d' : '1px solid #d4d4d8',
                            backgroundColor: selectedProductSize === sz ? '#656c4d' : '#ffffff',
                            color: selectedProductSize === sz ? '#ffffff' : '#18181b',
                            fontSize: 12,
                            fontWeight: 700,
                            cursor: 'pointer',
                          }}
                          onClick={() => setSelectedProductSize(sz)}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                className="sen-add-cart-btn"
                onClick={() => {
                  handleAddToCart(quickViewProduct, selectedProductColor, selectedProductSize)
                  setQuickViewProduct(null)
                }}
              >
                Add to Cart 🛍️
              </button>
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
                padding: '20px 24px',
                borderBottom: '1px solid #e4e4e7',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#656c4d',
                color: '#ffffff',
              }}
            >
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Cart ({cartItemCount})</h3>
              <button
                type="button"
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'transparent', border: 'none', color: '#ffffff', fontSize: 18, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', color: '#71717a', marginTop: 40 }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🛍️</div>
                  <p>Your shopping bag is empty.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                    style={{
                      display: 'flex',
                      gap: 14,
                      paddingBottom: 16,
                      borderBottom: '1px solid #e4e4e7',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: 64, height: 64, objectFit: 'contain', background: '#fafafa', borderRadius: 8 }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#18181b' }}>
                        {item.product.name}
                      </div>
                      <div style={{ fontSize: 11, color: '#71717a' }}>
                        {item.selectedColor && `Color: ${item.selectedColor} `}
                        {item.selectedSize && `• Size: ${item.selectedSize}`}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#656c4d', marginTop: 4 }}>
                        {formatPrice(item.product.price)}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button
                        type="button"
                        style={{ width: 24, height: 24, borderRadius: 4, border: '1px solid #d4d4d8', cursor: 'pointer' }}
                        onClick={() => updateQuantity(item.product.id, -1)}
                      >
                        -
                      </button>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{item.quantity}</span>
                      <button
                        type="button"
                        style={{ width: 24, height: 24, borderRadius: 4, border: '1px solid #d4d4d8', cursor: 'pointer' }}
                        onClick={() => updateQuantity(item.product.id, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div style={{ padding: 24, borderTop: '1px solid #e4e4e7', backgroundColor: '#fafafa' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontSize: 14, color: '#71717a' }}>Estimated Total</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: '#18181b' }}>
                  {formatPrice(cartTotalUSD)}
                </span>
              </div>
              <button
                type="button"
                className="sen-add-cart-btn"
                style={{ width: '100%', padding: '14px', fontSize: 14 }}
                onClick={() => {
                  showToast('Redirecting to checkout...')
                  onUseTemplate?.('shoes-sensation')
                }}
              >
                Checkout Now
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <StorefrontSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={[...SENSATION_TRENDING_PRODUCTS, ...SENSATION_SUNGLASSES_PRODUCTS].map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category,
        }))}
        onSelectProduct={(p) => {
          const fullProd = [...SENSATION_TRENDING_PRODUCTS, ...SENSATION_SUNGLASSES_PRODUCTS].find((x) => x.id === p.id)
          if (fullProd) {
            setQuickViewProduct(fullProd)
            setSelectedProductSize(fullProd.sizes?.[0] || '7')
            setSelectedProductColor(fullProd.colors?.[0]?.name || 'Standard')
          }
        }}
        accentColor={customAccentColor || '#656c4d'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
        placeholder="Search trending sneakers, sunglasses, accessories..."
        popularTags={['Footwear', 'Clothes', 'Sunglasses', 'Accessories']}
      />

      {/* Wishlist Drawer */}
      <StorefrontWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        allProducts={[...SENSATION_TRENDING_PRODUCTS, ...SENSATION_SUNGLASSES_PRODUCTS].map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category,
        }))}
        onRemoveWishlist={toggleWishlist}
        onAddToCart={(p) => {
          const fullProd = [...SENSATION_TRENDING_PRODUCTS, ...SENSATION_SUNGLASSES_PRODUCTS].find((x) => x.id === p.id)
          if (fullProd) handleAddToCart(fullProd)
        }}
        onOpenProduct={(p) => {
          const fullProd = [...SENSATION_TRENDING_PRODUCTS, ...SENSATION_SUNGLASSES_PRODUCTS].find((x) => x.id === p.id)
          if (fullProd) {
            setQuickViewProduct(fullProd)
            setSelectedProductSize(fullProd.sizes?.[0] || '7')
            setSelectedProductColor(fullProd.colors?.[0]?.name || 'Standard')
          }
        }}
        accentColor={customAccentColor || '#656c4d'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
      />

      {/* Account Modal */}
      <StorefrontAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        brandName="Sensation"
        accentColor={customAccentColor || '#656c4d'}
      />

      {/* Mobile Navigation Drawer */}
      <StorefrontMobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        brandName="Sensation"
        navItems={navItems}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        cartCount={cartItemCount}
        contactPhone="+1 (800) 888-SENS"
        contactEmail="support@sensationstore.com"
        accentColor={customAccentColor || '#656c4d'}
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

export default SensationStorefront
