import React, { useState, useRef } from 'react'
import type { JewelsCategory, JewelsCartItem, JewelsProduct, JewelsStorefrontProps } from './types'
import {
  JEWELS_BLOG_POSTS,
  JEWELS_CATEGORIES,
  JEWELS_HERO_SLIDES,
  JEWELS_PRODUCTS,
  JEWELS_PROMO_TILES,
  JEWELS_REGAL_PRODUCTS,
  JEWELS_TESTIMONIALS,
  JEWELS_TRUST_FEATURES,
} from './data/jewelsData'
import { StorefrontProductDetailPage } from '../../../components/templates/StorefrontProductDetailPage'
import './styles/jewelsWorkDo.css'

export const JewelsWorkDoStorefront: React.FC<JewelsStorefrontProps> = ({
  device = 'desktop',
  deviceView,
  onBack: _onBack,
  onSelectTemplate: _onSelectTemplate,
  onUseTemplate: _onUseTemplate,
}) => {
  const effectiveDevice = deviceView || device || 'desktop'
  const isMobile = effectiveDevice === 'mobile'

  // Navigation & Category states
  const [activeCategory, setActiveCategory] = useState<JewelsCategory>('All')
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  // Interactive Cart Drawer state
  const [cartItems, setCartItems] = useState<JewelsCartItem[]>([
    {
      product: JEWELS_HERO_SLIDES[0].featuredProduct,
      quantity: 1,
      selectedMaterial: '22K',
    },
  ])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Quick View Modal state
  const [viewMode, setViewMode] = useState<'home' | 'pdp'>('home')
  const [pdpProduct, setPdpProduct] = useState<JewelsProduct | null>(null)
  const [quickViewProduct, setQuickViewProduct] = useState<JewelsProduct | null>(null)

  // Wishlist state
  const [wishlistIds, setWishlistIds] = useState<string[]>([])
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Video Modal state
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false)

  // Currency & Language dropdown states
  const [selectedCurrency, setSelectedCurrency] = useState('INR')
  const [selectedLanguage, setSelectedLanguage] = useState('English')

  // Newsletter feedback state
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)

  // Material selection tracking per product
  const [selectedMaterials, setSelectedMaterials] = useState<Record<string, string>>({
    'hero-prod-1': '22K',
    'jwd-1': '18K',
    'jwd-2': '18K Yellow',
    'jwd-4': '22K',
    'jwd-5': '22K',
    'regal-1': '22K',
  })

  const carouselRef = useRef<HTMLDivElement>(null)


  const scrollCarousel = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const offset = direction === 'left' ? -300 : 300
      carouselRef.current.scrollBy({ left: offset, behavior: 'smooth' })
    }
  }

  const currentSlide = JEWELS_HERO_SLIDES[currentSlideIndex]


  // Filtered catalog products
  const filteredProducts =
    activeCategory === 'All'
      ? JEWELS_PRODUCTS
      : JEWELS_PRODUCTS.filter((p) => p.category === activeCategory)

  // Cart calculations
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )

  const handleAddToCart = (product: JewelsProduct, material?: string) => {
    const mat = material || selectedMaterials[product.id] || product.materialOptions[0] || 'Standard'
    setCartItems((prev) => {
      const existing = prev.find(
        (i) => i.product.id === product.id && i.selectedMaterial === mat
      )
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.selectedMaterial === mat
            ? { ...i, quantity: i.quantity + 1 }
            : i
        )
      }
      return [...prev, { product, quantity: 1, selectedMaterial: mat }]
    })
    showToast(`Added "${product.title}" to cart!`)
  }

  const handleRemoveFromCart = (index: number) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index))
  }

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  const handleMaterialChange = (productId: string, mat: string) => {
    setSelectedMaterials((prev) => ({ ...prev, [productId]: mat }))
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail.trim()) {
      setNewsletterSubscribed(true)
      setTimeout(() => setNewsletterSubscribed(false), 4000)
      setNewsletterEmail('')
    }
  }

  return (
    <div className={`jwd-root ${isMobile ? 'jwd-mobile-view is-mobile' : ''}`}>

      {/* =====================================================================
          1. TOP UTILITY STRIP (STRICTLY SCREENSHOT 2)
          ===================================================================== */}
      <section className="jwd-top-bar" aria-label="Store Announcement">
        <div className="jwd-top-bar-inner">
          <div className="jwd-top-schedule">
            <span>Monday - Friday</span>
            <span style={{ color: '#cbd5e1' }}>|</span>
            <span>8:00 AM - 9:00 PM</span>
          </div>

          <div className="jwd-top-actions">
            <button
              className="jwd-top-pill"
              onClick={() =>
                setSelectedLanguage((prev) => (prev === 'English' ? 'Deutsch' : 'English'))
              }
              title="Change Language"
            >
              <span className="jwd-flag">🇬🇧</span>
              <span>{selectedLanguage}</span>
              <span style={{ fontSize: '10px' }}>∨</span>
            </button>

            <button
              className="jwd-top-pill"
              onClick={() =>
                setSelectedCurrency((prev) => (prev === 'INR' ? 'USD' : 'INR'))
              }
              title="Change Currency"
            >
              <span className="jwd-flag">🇮🇳</span>
              <span>{selectedCurrency}</span>
              <span style={{ fontSize: '10px' }}>∨</span>
            </button>

            <button
              type="button"
              className="jwd-top-pill"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              title="Search fine jewelry"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <span>Search</span>
            </button>

            <button
              type="button"
              className="jwd-top-pill"
              onClick={() => setIsWishlistOpen(true)}
              title="Saved Wishlist"
            >
              <span style={{ color: wishlistIds.length > 0 ? '#ef4444' : 'inherit' }}>
                {wishlistIds.length > 0 ? '♥' : '♡'}
              </span>
              <span>Wishlist ({wishlistIds.length})</span>
            </button>

            <a href="#faq" className="jwd-top-link">
              Faq
            </a>
            <a href="#about" className="jwd-top-link">
              About Us
            </a>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. MAIN HEADER & LOGO (STRICTLY SCREENSHOT 2)
          ===================================================================== */}
      <header className="jwd-main-header">
        <div className="jwd-main-header-inner">
          {/* Mobile Hamburger Menu Toggle */}
          <button
            type="button"
            className="jwd-mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className="jwd-burger-bar" />
            <span className="jwd-burger-bar" />
            <span className="jwd-burger-bar" />
          </button>

          <div className="jwd-header-left">
            <a href="#" className="jwd-brand-logo" aria-label="Jewels Homepage">
              <span className="jwd-brand-fallback">
                Jewels <span className="jwd-brand-sparkle">✦</span>
              </span>
            </a>

            <div className="jwd-nav-divider" />

            <nav aria-label="Main Navigation">
              <ul className="jwd-nav-menu">
                <li className="jwd-nav-item">
                  <span className="jwd-nav-link active">
                    All Categories <span className="jwd-nav-arrow">∨</span>
                  </span>
                  <div className="jwd-mega-dropdown">
                    {JEWELS_CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
                      <a
                        key={cat.slug}
                        href={`#${cat.slug}`}
                        className="jwd-mega-item"
                        onClick={(e) => {
                          e.preventDefault()
                          setActiveCategory(cat.name as JewelsCategory)
                        }}
                      >
                        <img
                          src={cat.image || 'https://jewels-workdo.myshopify.com/cdn/shop/files/menu-1.png?v=1740639793'}
                          alt={cat.name}
                          className="jwd-mega-img"
                        />
                        <div>
                          <div className="jwd-mega-title">{cat.name}</div>
                          <div className="jwd-mega-count">{cat.count} Items Available</div>
                        </div>
                      </a>
                    ))}
                  </div>
                </li>

                <li className="jwd-nav-item">
                  <a href="#catalog" className="jwd-nav-link">
                    Products <span className="jwd-nav-arrow">∨</span>
                  </a>
                </li>

                <li className="jwd-nav-item">
                  <a href="#about" className="jwd-nav-link">
                    Pages <span className="jwd-nav-arrow">∨</span>
                  </a>
                </li>

                <li className="jwd-nav-item">
                  <a
                    href="#bracelet"
                    className="jwd-nav-link"
                    onClick={(e) => {
                      e.preventDefault()
                      setActiveCategory('Bracelet')
                    }}
                  >
                    Bracelet
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="jwd-header-right">
            {/* Search Trigger */}
            <button
              type="button"
              className="jwd-icon-btn jwd-search-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              title="Search fine jewelry"
              aria-label="Search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Like / Wishlist Trigger */}
            <button
              type="button"
              className="jwd-icon-btn jwd-wishlist-btn"
              onClick={() => setIsWishlistOpen(true)}
              title="Saved Wishlist"
              aria-label="Wishlist"
              style={{ position: 'relative' }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={wishlistIds.length > 0 ? '#ef4444' : 'none'}
                stroke={wishlistIds.length > 0 ? '#ef4444' : 'currentColor'}
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistIds.length > 0 && (
                <span className="jwd-badge-count">{wishlistIds.length}</span>
              )}
            </button>

            <button
              type="button"
              className="jwd-avatar-btn"
              title="My Account"
              aria-label="User Account"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            <button
              type="button"
              className="jwd-cart-pill-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span>Rs. {cartSubtotal.toLocaleString()}.00</span>
              {totalCartCount > 0 && <span className="jwd-cart-badge">{totalCartCount}</span>}
            </button>
          </div>
        </div>

        {/* SEARCH BAR DROPDOWN */}
        {isSearchOpen && (
          <div className="jwd-search-bar-dropdown">
            <div className="jwd-search-bar-inner">
              <input
                type="text"
                placeholder="Search rings, necklaces, earrings, bracelets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="jwd-search-input"
              />
              <button
                type="button"
                className="jwd-btn-cart-camel"
                style={{ borderRadius: 999, padding: '9px 20px', fontSize: 13 }}
                onClick={() => {
                  const el = document.getElementById('catalog')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                Search
              </button>
              <button
                type="button"
                className="jwd-search-close"
                onClick={() => {
                  setIsSearchOpen(false)
                  setSearchQuery('')
                }}
                aria-label="Close search"
              >
                ✕
              </button>
            </div>

            {searchQuery.trim().length > 0 && (
              <div className="jwd-search-results">
                {JEWELS_PRODUCTS.filter((p) =>
                  p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  p.category.toLowerCase().includes(searchQuery.toLowerCase())
                ).slice(0, 5).map((prod) => (
                  <div
                    key={prod.id}
                    className="jwd-search-result-item"
                    onClick={() => {
                      setPdpProduct(prod)
                      setViewMode('pdp')
                      setIsSearchOpen(false)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    <img src={prod.image} alt={prod.title} className="jwd-search-thumb" />
                    <div style={{ flex: 1 }}>
                      <div className="jwd-search-res-title">{prod.title}</div>
                      <div className="jwd-search-res-price">Rs. {prod.price.toLocaleString()}.00 INR</div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </header>

      {viewMode === 'pdp' && pdpProduct ? (
        <StorefrontProductDetailPage
          product={{
            id: pdpProduct.id,
            name: pdpProduct.title,
            price: pdpProduct.price,
            originalPrice: pdpProduct.originalPrice,
            image: pdpProduct.image,
            description: pdpProduct.description || '',
            category: pdpProduct.category,
            rating: 4.9,
            reviewsCount: 46,
            inStock: true,
            sku: `JWD-${pdpProduct.id.toUpperCase()}`,
            gallery: [pdpProduct.image],
            colors: ['#c9a96e', '#c0c0c0', '#1e293b'],
            sizes: [],
            specs: {
              Metal: pdpProduct.materialOptions?.[0] || '22K Gold',
              Weight: 'Standard Weight (Approx. 4.5g - 8.2g)',
              Hallmark: 'BIS Hallmarked',
              Origin: 'Handcrafted in India',
            },
            features: [
              'Crafted by skilled artisans with generation expertise',
              'BIS Hallmarked for purity assurance',
              'Available with custom engraving service',
              'Comes in luxury velvet gift box',
            ],
          }}
          brandName="Jewels WorkDo"
          accentColor="#c9a96e"
          currencyPrefix="₹"
          formatPrice={(p) => `Rs. ${Math.round(p).toLocaleString()}.00 INR`}
          relatedProducts={[...JEWELS_PRODUCTS, ...JEWELS_REGAL_PRODUCTS]
            .filter((p) => p.id !== pdpProduct.id)
            .slice(0, 4)
            .map((p) => ({
              id: p.id,
              name: p.title,
              price: p.price,
              originalPrice: p.originalPrice,
              image: p.image,
              category: p.category,
              rating: 4.8,
            }))}
          onBack={() => {
            setViewMode('home')
            setPdpProduct(null)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onAddToCart={(_prod, _col, _sz, qty) => {
            for (let i = 0; i < (qty || 1); i++) {
              handleAddToCart(pdpProduct)
            }
          }}
          onBuyNow={(_prod, _col, _sz, qty) => {
            for (let i = 0; i < (qty || 1); i++) {
              handleAddToCart(pdpProduct)
            }
            setIsCartOpen(true)
            showToast('Instant checkout initiated!')
          }}
          onToggleWishlist={(id) => toggleWishlist(id)}
          isWishlisted={wishlistIds.includes(pdpProduct.id)}
        />
      ) : (
        <>
          {/* MOBILE NAVIGATION DRAWER */}
          {isMobileMenuOpen && (
        <div className="jwd-drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="jwd-mobile-nav-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="jwd-mobile-nav-header">
              <span className="jwd-brand-fallback" style={{ fontSize: '20px' }}>
                Jewels <span className="jwd-brand-sparkle">✦</span>
              </span>
              <button
                type="button"
                className="jwd-drawer-close"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>
            <div className="jwd-mobile-nav-links">
              <button
                type="button"
                className={`jwd-mobile-link ${activeCategory === 'All' ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory('All')
                  setIsMobileMenuOpen(false)
                  const el = document.getElementById('catalog')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span>All Categories</span>
                <span>›</span>
              </button>
              {JEWELS_CATEGORIES.filter((c) => c.slug !== 'all').map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  className={`jwd-mobile-link ${activeCategory === cat.name ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.name as JewelsCategory)
                    setIsMobileMenuOpen(false)
                    const el = document.getElementById('catalog')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <span>{cat.name}</span>
                  <span style={{ fontSize: '11px', color: '#94a3b8' }}>{cat.count} items ›</span>
                </button>
              ))}
              <button
                type="button"
                className="jwd-mobile-link"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  const el = document.getElementById('about')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span>About Atelier</span>
                <span>›</span>
              </button>
            </div>
            <div className="jwd-mobile-nav-footer">
              <div className="jwd-mobile-currency">
                <span>Currency: {selectedCurrency} (₹)</span>
              </div>
              <button
                type="button"
                className="jwd-mobile-vip-btn"
                onClick={() => {
                  setIsMobileMenuOpen(false)
                }}
              >
                Sign In to VIP Account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          3. HERO SECTION ("Modern and trending jewellery for everyone")
          ===================================================================== */}
      <section className="jwd-hero-section">
        <div className="jwd-hero-inner">
          <div className="jwd-hero-left">
            <div className="jwd-hero-badge">{currentSlide.badge}</div>
            <h1 className="jwd-hero-title">{currentSlide.headline}</h1>
            <p className="jwd-hero-desc">{currentSlide.description}</p>

            <div className="jwd-hero-actions">
              <button
                className="jwd-btn-gold"
                onClick={() => {
                  const el = document.getElementById('catalog')
                  el?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span>{currentSlide.buttonText}</span>
                <span className="jwd-btn-arrow-circle">➔</span>
              </button>

              <button
                className="jwd-btn-video"
                onClick={() => setIsVideoModalOpen(true)}
              >
                <span className="jwd-play-circle">▶</span>
                <span>play video</span>
              </button>
            </div>

            {/* 3 Service Highlights with authentic icons */}
            <div className="jwd-trust-row">
              {JEWELS_TRUST_FEATURES.map((item) => (
                <div key={item.id} className="jwd-trust-item">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="jwd-trust-icon"
                  />
                  <div className="jwd-trust-text">{item.title}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Floating Product Card & Vertical Slider (Matching Screenshot 3) */}
          <div className="jwd-hero-card-col">
            <div className="jwd-hero-product-card">
              {currentSlide.featuredProduct.badge && (
                <span className="jwd-badge-outline-pill">
                  {currentSlide.featuredProduct.badge}
                </span>
              )}

              <div className="jwd-card-stacked-actions">
                <button
                  className="jwd-stacked-btn"
                  title="Add to Wishlist"
                  onClick={() => toggleWishlist(currentSlide.featuredProduct.id)}
                  style={{
                    color: wishlistIds.includes(currentSlide.featuredProduct.id)
                      ? '#ef4444'
                      : undefined,
                  }}
                >
                  {wishlistIds.includes(currentSlide.featuredProduct.id) ? '♥' : '♡'}
                </button>
                <button className="jwd-stacked-btn" title="Compare">
                  ⇄
                </button>
                <button
                  className="jwd-stacked-btn"
                  title="Quick View"
                  onClick={() => setQuickViewProduct(currentSlide.featuredProduct)}
                >
                  👁
                </button>
              </div>

              <div className="jwd-hero-card-img-wrapper">
                <img
                  src={currentSlide.featuredProduct.image}
                  alt={currentSlide.featuredProduct.title}
                  className="jwd-hero-card-img"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
                  }}
                />
              </div>

              <div className="jwd-card-vendor">
                {currentSlide.featuredProduct.vendor}
              </div>

              <h2 className="jwd-card-title">
                {currentSlide.featuredProduct.title}
              </h2>

              <div className="jwd-material-row">
                <span className="jwd-material-label">Material:</span>
                <div className="jwd-material-pill-box">
                  <select
                    className="jwd-material-select-clean"
                    value={
                      selectedMaterials[currentSlide.featuredProduct.id] ||
                      currentSlide.featuredProduct.materialOptions[0]
                    }
                    onChange={(e) =>
                      handleMaterialChange(currentSlide.featuredProduct.id, e.target.value)
                    }
                  >
                    {currentSlide.featuredProduct.materialOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span style={{ fontSize: '13px', marginLeft: '6px' }}>↓</span>
                </div>
              </div>

              <div className="jwd-card-stars-outline">
                ☆ ☆ ☆ ☆ ☆
              </div>

              <div className="jwd-card-bottom-row">
                <div className="jwd-price-left">
                  <span className="jwd-price-current">
                    Rs. {currentSlide.featuredProduct.price.toLocaleString()}.00 INR
                  </span>
                  {currentSlide.featuredProduct.originalPrice && (
                    <span className="jwd-price-original">
                      Rs. {currentSlide.featuredProduct.originalPrice.toLocaleString()}.00 INR
                    </span>
                  )}
                </div>

                <button
                  className="jwd-btn-cart-camel"
                  onClick={() => handleAddToCart(currentSlide.featuredProduct)}
                >
                  <span>Add to Cart</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 14 16" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.1258 5.12596H2.87416C2.04526 5.12596 1.38823 5.82533 1.43994 6.65262L1.79919 12.4007C1.84653 13.1581 2.47458 13.7481 3.23342 13.7481H10.7666C11.5254 13.7481 12.1535 13.1581 12.2008 12.4007L12.5601 6.65262C12.6118 5.82533 11.9547 5.12596 11.1258 5.12596ZM2.87416 3.68893C1.21635 3.68893 -0.0977 5.08768 0.00571155 6.74226L0.364968 12.4904C0.459638 14.0051 1.71574 15.1851 3.23342 15.1851H10.7666C12.2843 15.1851 13.5404 14.0051 13.635 12.4904L13.9943 6.74226C14.0977 5.08768 12.7837 3.68893 11.1258 3.68893H2.87416Z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.40723 4.40744C3.40723 2.42332 5.01567 0.81488 6.99979 0.81488C8.9839 0.81488 10.5923 2.42332 10.5923 4.40744V5.84447C10.5923 6.24129 10.2707 6.56298 9.87384 6.56298C9.47701 6.56298 9.15532 6.24129 9.15532 5.84447V4.40744C9.15532 3.21697 8.19026 2.2519 6.99979 2.2519C5.80932 2.2519 4.84425 3.21697 4.84425 4.40744V5.84447C4.84425 6.24129 4.52256 6.56298 4.12574 6.56298C3.72892 6.56298 3.40723 6.24129 3.40723 5.84447V4.40744Z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Vertical Slider Navigation (Matching Screenshot 3) */}
            <div className="jwd-hero-vertical-slider">
              <button
                className="jwd-vert-arrow-btn"
                onClick={() =>
                  setCurrentSlideIndex((prev) =>
                    prev > 0 ? prev - 1 : JEWELS_HERO_SLIDES.length - 1
                  )
                }
                aria-label="Previous Slide"
              >
                ↑
              </button>
              <div className="jwd-vert-track">
                {JEWELS_HERO_SLIDES.map((_, idx) => (
                  <div
                    key={idx}
                    className={`jwd-vert-item ${
                      currentSlideIndex === idx ? 'active' : ''
                    }`}
                    onClick={() => setCurrentSlideIndex(idx)}
                  >
                    {currentSlideIndex === idx && (
                      <span className="jwd-vert-indicator" />
                    )}
                    <span>0{idx + 1}</span>
                  </div>
                ))}
              </div>
              <button
                className="jwd-vert-arrow-btn"
                onClick={() =>
                  setCurrentSlideIndex((prev) =>
                    prev < JEWELS_HERO_SLIDES.length - 1 ? prev + 1 : 0
                  )
                }
                aria-label="Next Slide"
              >
                ↓
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. "THE BEAUTY OF JEWELRY" + "ORGANIC INSPIRATIONS IN JEWELRY"
          COMBINED SEAMLESS SLATE-TEAL SECTION (MATCHING SCREENSHOT 2 & 1)
          ===================================================================== */}
      <section className="jwd-beauty-and-organic-section" id="about">
        {/* Decorative Top Border Image (earring on left, ring on right) */}
        <img
          src="https://jewels-workdo.myshopify.com/cdn/shop/files/cs.png?v=1698816744"
          alt="Atelier Jewelry Decor"
          className="jwd-beauty-cs-decor"
        />

        {/* The Beauty of Jewelry Content Row */}
        <div className="jwd-beauty-inner">
          <div className="jwd-beauty-content">
            <span className="jwd-beauty-tag">JEWELLWORLD</span>
            <h2 className="jwd-beauty-title">The Beauty of Jewelry</h2>
            <p className="jwd-beauty-text">
              Styles vary from simple and understated to ornate and intricate, with
              patterns, motifs, and symbols adding layers of meaning and cultural
              significance.
            </p>

            <div className="jwd-beauty-pills">
              <button
                className="jwd-btn-cart-camel"
                onClick={() => setActiveCategory('Earrings')}
              >
                <span>Earrings</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 14 16" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.1258 5.12596H2.87416C2.04526 5.12596 1.38823 5.82533 1.43994 6.65262L1.79919 12.4007C1.84653 13.1581 2.47458 13.7481 3.23342 13.7481H10.7666C11.5254 13.7481 12.1535 13.1581 12.2008 12.4007L12.5601 6.65262C12.6118 5.82533 11.9547 5.12596 11.1258 5.12596ZM2.87416 3.68893C1.21635 3.68893 -0.0977 5.08768 0.00571155 6.74226L0.364968 12.4904C0.459638 14.0051 1.71574 15.1851 3.23342 15.1851H10.7666C12.2843 15.1851 13.5404 14.0051 13.635 12.4904L13.9943 6.74226C14.0977 5.08768 12.7837 3.68893 11.1258 3.68893H2.87416Z" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.40723 4.40744C3.40723 2.42332 5.01567 0.81488 6.99979 0.81488C8.9839 0.81488 10.5923 2.42332 10.5923 4.40744V5.84447C10.5923 6.24129 10.2707 6.56298 9.87384 6.56298C9.47701 6.56298 9.15532 6.24129 9.15532 5.84447V4.40744C9.15532 3.21697 8.19026 2.2519 6.99979 2.2519C5.80932 2.2519 4.84425 3.21697 4.84425 4.40744V5.84447C4.84425 6.24129 4.52256 6.56298 4.12574 6.56298C3.72892 6.56298 3.40723 6.24129 3.40723 5.84447V4.40744Z" />
                </svg>
              </button>
              <button
                className="jwd-btn-cart-camel"
                onClick={() => setActiveCategory('Bracelet')}
              >
                <span>Bracelet</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 14 16" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.1258 5.12596H2.87416C2.04526 5.12596 1.38823 5.82533 1.43994 6.65262L1.79919 12.4007C1.84653 13.1581 2.47458 13.7481 3.23342 13.7481H10.7666C11.5254 13.7481 12.1535 13.1581 12.2008 12.4007L12.5601 6.65262C12.6118 5.82533 11.9547 5.12596 11.1258 5.12596ZM2.87416 3.68893C1.21635 3.68893 -0.0977 5.08768 0.00571155 6.74226L0.364968 12.4904C0.459638 14.0051 1.71574 15.1851 3.23342 15.1851H10.7666C12.2843 15.1851 13.5404 14.0051 13.635 12.4904L13.9943 6.74226C14.0977 5.08768 12.7837 3.68893 11.1258 3.68893H2.87416Z" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.40723 4.40744C3.40723 2.42332 5.01567 0.81488 6.99979 0.81488C8.9839 0.81488 10.5923 2.42332 10.5923 4.40744V5.84447C10.5923 6.24129 10.2707 6.56298 9.87384 6.56298C9.47701 6.56298 9.15532 6.24129 9.15532 5.84447V4.40744C9.15532 3.21697 8.19026 2.2519 6.99979 2.2519C5.80932 2.2519 4.84425 3.21697 4.84425 4.40744V5.84447C4.84425 6.24129 4.52256 6.56298 4.12574 6.56298C3.72892 6.56298 3.40723 6.24129 3.40723 5.84447V4.40744Z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="jwd-beauty-img-wrapper">
            <img
              src="https://jewels-workdo.myshopify.com/cdn/shop/files/chocolate2.png?v=1698816835"
              alt="Diamond Ring with Model Hands"
              className="jwd-beauty-ring-hands-img"
            />
            <p className="jwd-beauty-subtext">
              Diamonds, rubies, sapphires, emeralds, amethysts, and pearls are just a few
              examples of the gemstones that can be incorporated into jewelry.
            </p>
            <a
              href="#catalog"
              className="jwd-beauty-show-more"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Show More
            </a>
          </div>
        </div>

        {/* Organic Inspirations in Jewelry Horizontal Scroll Carousel (Matching Screenshot 1) */}
        <div className="jwd-organic-container" id="catalog">
          <div className="jwd-organic-header">
            <h3 className="jwd-organic-title">Organic Inspirations in Jewelry</h3>
            <div className="jwd-carousel-arrows-nav">
              <button
                type="button"
                className="jwd-carousel-arrow-btn"
                onClick={() => scrollCarousel('left')}
                aria-label="Previous Products"
              >
                ←
              </button>
              <button
                type="button"
                className="jwd-carousel-arrow-btn"
                onClick={() => scrollCarousel('right')}
                aria-label="Next Products"
              >
                →
              </button>
            </div>
          </div>

          <div className="jwd-carousel-wrapper">
            <div className="jwd-carousel-track" ref={carouselRef}>
              {filteredProducts.map((prod) => (
                <div key={prod.id} className="jwd-carousel-card">
                  {prod.badge && (
                    <span className="jwd-badge-outline-pill">{prod.badge}</span>
                  )}

                  <div className="jwd-card-stacked-actions">
                    <button
                      className="jwd-stacked-btn"
                      title="Add to Wishlist"
                      onClick={() => toggleWishlist(prod.id)}
                      style={{
                        color: wishlistIds.includes(prod.id) ? '#ef4444' : undefined,
                      }}
                    >
                      {wishlistIds.includes(prod.id) ? '♥' : '♡'}
                    </button>
                    <button className="jwd-stacked-btn" title="Compare">
                      ⇄
                    </button>
                    <button
                      className="jwd-stacked-btn"
                      title="Quick View"
                      onClick={() => setQuickViewProduct(prod)}
                    >
                      👁
                    </button>
                  </div>

                  <div className="jwd-carousel-card-img-wrap">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="jwd-carousel-card-img"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
                      }}
                    />
                  </div>

                  <div className="jwd-card-vendor">{prod.vendor}</div>
                  <h4 className="jwd-card-title">{prod.title}</h4>

                  <div className="jwd-material-row">
                    <span className="jwd-material-label">Material:</span>
                    <div className="jwd-material-pill-box">
                      <select
                        className="jwd-material-select-clean"
                        value={
                          selectedMaterials[prod.id] || prod.materialOptions[0]
                        }
                        onChange={(e) => handleMaterialChange(prod.id, e.target.value)}
                      >
                        {prod.materialOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <span style={{ fontSize: '13px', marginLeft: '6px' }}>↓</span>
                    </div>
                  </div>

                  <div className="jwd-card-stars-outline">
                    ☆ ☆ ☆ ☆ ☆
                  </div>

                  <div className="jwd-card-bottom-row">
                    <div className="jwd-price-left">
                      <span className="jwd-price-current">
                        Rs. {prod.price.toLocaleString()}.00 INR
                      </span>
                      {prod.originalPrice && (
                        <span className="jwd-price-original">
                          Rs. {prod.originalPrice.toLocaleString()}.00 INR
                        </span>
                      )}
                    </div>

                    <button
                      className="jwd-btn-cart-camel"
                      onClick={() => handleAddToCart(prod)}
                    >
                      <span>Add to Cart</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 14 16" fill="currentColor">
                        <path fillRule="evenodd" clipRule="evenodd" d="M11.1258 5.12596H2.87416C2.04526 5.12596 1.38823 5.82533 1.43994 6.65262L1.79919 12.4007C1.84653 13.1581 2.47458 13.7481 3.23342 13.7481H10.7666C11.5254 13.7481 12.1535 13.1581 12.2008 12.4007L12.5601 6.65262C12.6118 5.82533 11.9547 5.12596 11.1258 5.12596ZM2.87416 3.68893C1.21635 3.68893 -0.0977 5.08768 0.00571155 6.74226L0.364968 12.4904C0.459638 14.0051 1.71574 15.1851 3.23342 15.1851H10.7666C12.2843 15.1851 13.5404 14.0051 13.635 12.4904L13.9943 6.74226C14.0977 5.08768 12.7837 3.68893 11.1258 3.68893H2.87416Z" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M3.40723 4.40744C3.40723 2.42332 5.01567 0.81488 6.99979 0.81488C8.9839 0.81488 10.5923 2.42332 10.5923 4.40744V5.84447C10.5923 6.24129 10.2707 6.56298 9.87384 6.56298C9.47701 6.56298 9.15532 6.24129 9.15532 5.84447V4.40744C9.15532 3.21697 8.19026 2.2519 6.99979 2.2519C5.80932 2.2519 4.84425 3.21697 4.84425 4.40744V5.84447C4.84425 6.24129 4.52256 6.56298 4.12574 6.56298C3.72892 6.56298 3.40723 6.24129 3.40723 5.84447V4.40744Z" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================================
          6. "JEWELRY FROM AROUND THE GLOBE" (VIDEO BANNER)
          ===================================================================== */}
      <section className="jwd-video-section">
        <div className="jwd-video-content">
          <span className="jwd-video-tag">JEWELLWORLD</span>
          <h2 className="jwd-video-title">Jewelry from Around the Globe</h2>
          <p className="jwd-video-desc">
            Craftsmen and artisans often painstakingly work to create intricate patterns,
            delicate filigree, or bold and contemporary styles, catering to a wide
            spectrum of tastes and preferences.
          </p>

          <button
            className="jwd-big-play-btn"
            onClick={() => setIsVideoModalOpen(true)}
            aria-label="Play Atelier Film"
          >
            ▶
          </button>
        </div>
      </section>

      {/* =====================================================================
          7. "A REGAL COLLECTION OF JEWELRY FIT FOR QUEENS"
          ===================================================================== */}
      {/* =====================================================================
          7. "A REGAL COLLECTION OF JEWELRY FIT FOR QUEENS"
          ===================================================================== */}
      <section className="jwd-regal-section">
        <div className="jwd-regal-header-row">
          <div className="jwd-regal-header-left">
            <h2 className="jwd-section-title">
              A regal collection of jewelry fit for queens
            </h2>
            <p className="jwd-section-subtitle">
              A nod to the Art Deco era, this collection showcases geometric patterns and
              bold, vintage-inspired jewelry.
            </p>
          </div>
          <div className="jwd-regal-pills">
            {(['Necklace', 'Earrings', 'Charms'] as const).map((filter) => (
              <button
                key={filter}
                className="jwd-btn-cart-camel"
                onClick={() => setActiveCategory(filter as JewelsCategory)}
              >
                <span>{filter}</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 14 16" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.1258 5.12596H2.87416C2.04526 5.12596 1.38823 5.82533 1.43994 6.65262L1.79919 12.4007C1.84653 13.1581 2.47458 13.7481 3.23342 13.7481H10.7666C11.5254 13.7481 12.1535 13.1581 12.2008 12.4007L12.5601 6.65262C12.6118 5.82533 11.9547 5.12596 11.1258 5.12596ZM2.87416 3.68893C1.21635 3.68893 -0.0977 5.08768 0.00571155 6.74226L0.364968 12.4904C0.459638 14.0051 1.71574 15.1851 3.23342 15.1851H10.7666C12.2843 15.1851 13.5404 14.0051 13.635 12.4904L13.9943 6.74226C14.0977 5.08768 12.7837 3.68893 11.1258 3.68893H2.87416Z" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.40723 4.40744C3.40723 2.42332 5.01567 0.81488 6.99979 0.81488C8.9839 0.81488 10.5923 2.42332 10.5923 4.40744V5.84447C10.5923 6.24129 10.2707 6.56298 9.87384 6.56298C9.47701 6.56298 9.15532 6.24129 9.15532 5.84447V4.40744C9.15532 3.21697 8.19026 2.2519 6.99979 2.2519C5.80932 2.2519 4.84425 3.21697 4.84425 4.40744V5.84447C4.84425 6.24129 4.52256 6.56298 4.12574 6.56298C3.72892 6.56298 3.40723 6.24129 3.40723 5.84447V4.40744Z" />
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className="jwd-regal-grid">
          {JEWELS_REGAL_PRODUCTS.map((prod) => (
            <div key={prod.id} className="jwd-carousel-card">
              {prod.badge && (
                <span className="jwd-badge-outline-pill">{prod.badge}</span>
              )}

              <div className="jwd-card-stacked-actions">
                <button
                  className="jwd-stacked-btn"
                  title="Add to Wishlist"
                  onClick={() => toggleWishlist(prod.id)}
                  style={{
                    color: wishlistIds.includes(prod.id) ? '#ef4444' : undefined,
                  }}
                >
                  {wishlistIds.includes(prod.id) ? '♥' : '♡'}
                </button>
                <button className="jwd-stacked-btn" title="Compare">
                  ⇄
                </button>
                <button
                  className="jwd-stacked-btn"
                  title="Quick View"
                  onClick={() => setQuickViewProduct(prod)}
                >
                  👁
                </button>
              </div>

              <div className="jwd-carousel-card-img-wrap">
                <img
                  src={prod.image}
                  alt={prod.title}
                  className="jwd-carousel-card-img"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
                  }}
                />
              </div>

              <div className="jwd-card-vendor">{prod.vendor}</div>
              <h4 className="jwd-card-title">{prod.title}</h4>

              <div className="jwd-material-row">
                <span className="jwd-material-label">Material:</span>
                <div className="jwd-material-pill-box">
                  <select
                    className="jwd-material-select-clean"
                    value={
                      selectedMaterials[prod.id] || prod.materialOptions[0]
                    }
                    onChange={(e) => handleMaterialChange(prod.id, e.target.value)}
                  >
                    {prod.materialOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  <span style={{ fontSize: '13px', marginLeft: '6px' }}>↓</span>
                </div>
              </div>

              <div className="jwd-card-stars-outline">
                ☆ ☆ ☆ ☆ ☆
              </div>

              <div className="jwd-card-bottom-row">
                <div className="jwd-price-left">
                  <span className="jwd-price-current">
                    Rs. {prod.price.toLocaleString()}.00 INR
                  </span>
                  {prod.originalPrice && (
                    <span className="jwd-price-original">
                      Rs. {prod.originalPrice.toLocaleString()}.00 INR
                    </span>
                  )}
                </div>

                <button
                  className="jwd-btn-cart-camel"
                  onClick={() => handleAddToCart(prod)}
                >
                  <span>Add to Cart</span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 14 16" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M11.1258 5.12596H2.87416C2.04526 5.12596 1.38823 5.82533 1.43994 6.65262L1.79919 12.4007C1.84653 13.1581 2.47458 13.7481 3.23342 13.7481H10.7666C11.5254 13.7481 12.1535 13.1581 12.2008 12.4007L12.5601 6.65262C12.6118 5.82533 11.9547 5.12596 11.1258 5.12596ZM2.87416 3.68893C1.21635 3.68893 -0.0977 5.08768 0.00571155 6.74226L0.364968 12.4904C0.459638 14.0051 1.71574 15.1851 3.23342 15.1851H10.7666C12.2843 15.1851 13.5404 14.0051 13.635 12.4904L13.9943 6.74226C14.0977 5.08768 12.7837 3.68893 11.1258 3.68893H2.87416Z" />
                    <path fillRule="evenodd" clipRule="evenodd" d="M3.40723 4.40744C3.40723 2.42332 5.01567 0.81488 6.99979 0.81488C8.9839 0.81488 10.5923 2.42332 10.5923 4.40744V5.84447C10.5923 6.24129 10.2707 6.56298 9.87384 6.56298C9.47701 6.56298 9.15532 6.24129 9.15532 5.84447V4.40744C9.15532 3.21697 8.19026 2.2519 6.99979 2.2519C5.80932 2.2519 4.84425 3.21697 4.84425 4.40744V5.84447C4.84425 6.24129 4.52256 6.56298 4.12574 6.56298C3.72892 6.56298 3.40723 6.24129 3.40723 5.84447V4.40744Z" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          8. THREE PROMOTIONAL TILES (MATCHING SCREENSHOT)
          ===================================================================== */}
      <section className="jwd-promo-tiles-section">
        <div className="jwd-promo-grid">
          {JEWELS_PROMO_TILES.map((tile) => (
            <div key={tile.id} className="jwd-promo-card">
              <div className="jwd-promo-content">
                <h3 className="jwd-promo-title">{tile.title}</h3>
                <p className="jwd-promo-subtitle">{tile.subtitle}</p>
                <button
                  className="jwd-btn-gold"
                  onClick={() => {
                    const el = document.getElementById('catalog')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  style={{ alignSelf: 'flex-start' }}
                >
                  <span>{tile.buttonText}</span>
                  <span className="jwd-btn-arrow-circle">➔</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          9. MINIMALIST SILVER HOOP SPLIT SHOWCASE (MATCHING SCREENSHOT)
          ===================================================================== */}
      <section className="jwd-hoop-section">
        <div className="jwd-hoop-inner">
          <div className="jwd-hoop-left">
            <span className="jwd-beauty-tag">
              JEWELLWORLD
            </span>
            <h2 className="jwd-section-title" style={{ textAlign: 'left' }}>
              Minimalist Silver Hoop Earrings Collection
            </h2>
            <p className="jwd-hero-desc">
              Our hoop earrings are expertly made with precision, using high-quality
              sterling silver that reflects light beautifully and accompanies any
              ensemble with refined grace.
            </p>

            <div className="jwd-beauty-pills" style={{ marginBottom: '32px' }}>
              <button
                className="jwd-btn-cart-camel"
                onClick={() => setActiveCategory('Earrings')}
              >
                <span>Earrings</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 14 16" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.1258 5.12596H2.87416C2.04526 5.12596 1.38823 5.82533 1.43994 6.65262L1.79919 12.4007C1.84653 13.1581 2.47458 13.7481 3.23342 13.7481H10.7666C11.5254 13.7481 12.1535 13.1581 12.2008 12.4007L12.5601 6.65262C12.6118 5.82533 11.9547 5.12596 11.1258 5.12596ZM2.87416 3.68893C1.21635 3.68893 -0.0977 5.08768 0.00571155 6.74226L0.364968 12.4904C0.459638 14.0051 1.71574 15.1851 3.23342 15.1851H10.7666C12.2843 15.1851 13.5404 14.0051 13.635 12.4904L13.9943 6.74226C14.0977 5.08768 12.7837 3.68893 11.1258 3.68893H2.87416Z" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.40723 4.40744C3.40723 2.42332 5.01567 0.81488 6.99979 0.81488C8.9839 0.81488 10.5923 2.42332 10.5923 4.40744V5.84447C10.5923 6.24129 10.2707 6.56298 9.87384 6.56298C9.47701 6.56298 9.15532 6.24129 9.15532 5.84447V4.40744C9.15532 3.21697 8.19026 2.2519 6.99979 2.2519C5.80932 2.2519 4.84425 3.21697 4.84425 4.40744V5.84447C4.84425 6.24129 4.52256 6.56298 4.12574 6.56298C3.72892 6.56298 3.40723 6.24129 3.40723 5.84447V4.40744Z" />
                </svg>
              </button>
              <button
                className="jwd-btn-cart-camel"
                onClick={() => setActiveCategory('Charms')}
              >
                <span>Charms</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 14 16" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M11.1258 5.12596H2.87416C2.04526 5.12596 1.38823 5.82533 1.43994 6.65262L1.79919 12.4007C1.84653 13.1581 2.47458 13.7481 3.23342 13.7481H10.7666C11.5254 13.7481 12.1535 13.1581 12.2008 12.4007L12.5601 6.65262C12.6118 5.82533 11.9547 5.12596 11.1258 5.12596ZM2.87416 3.68893C1.21635 3.68893 -0.0977 5.08768 0.00571155 6.74226L0.364968 12.4904C0.459638 14.0051 1.71574 15.1851 3.23342 15.1851H10.7666C12.2843 15.1851 13.5404 14.0051 13.635 12.4904L13.9943 6.74226C14.0977 5.08768 12.7837 3.68893 11.1258 3.68893H2.87416Z" />
                  <path fillRule="evenodd" clipRule="evenodd" d="M3.40723 4.40744C3.40723 2.42332 5.01567 0.81488 6.99979 0.81488C8.9839 0.81488 10.5923 2.42332 10.5923 4.40744V5.84447C10.5923 6.24129 10.2707 6.56298 9.87384 6.56298C9.47701 6.56298 9.15532 6.24129 9.15532 5.84447V4.40744C9.15532 3.21697 8.19026 2.2519 6.99979 2.2519C5.80932 2.2519 4.84425 3.21697 4.84425 4.40744V5.84447C4.84425 6.24129 4.52256 6.56298 4.12574 6.56298C3.72892 6.56298 3.40723 6.24129 3.40723 5.84447V4.40744Z" />
                </svg>
              </button>
            </div>

            <button
              className="jwd-btn-gold"
              onClick={() => {
                const el = document.getElementById('catalog')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span>Check more products</span>
              <span className="jwd-btn-arrow-circle">➔</span>
            </button>
          </div>

          <div className="jwd-hoop-right-grid">
            {JEWELS_PRODUCTS.slice(1, 3).map((prod) => (
              <div key={prod.id} className="jwd-carousel-card">
                {prod.badge && (
                  <span className="jwd-badge-outline-pill">{prod.badge}</span>
                )}

                <div className="jwd-card-stacked-actions">
                  <button
                    className="jwd-stacked-btn"
                    title="Add to Wishlist"
                    onClick={() => toggleWishlist(prod.id)}
                    style={{
                      color: wishlistIds.includes(prod.id) ? '#ef4444' : undefined,
                    }}
                  >
                    {wishlistIds.includes(prod.id) ? '♥' : '♡'}
                  </button>
                  <button className="jwd-stacked-btn" title="Compare">
                    ⇄
                  </button>
                  <button
                    className="jwd-stacked-btn"
                    title="Quick View"
                    onClick={() => setQuickViewProduct(prod)}
                  >
                    👁
                  </button>
                </div>

                <div className="jwd-carousel-card-img-wrap">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="jwd-carousel-card-img"
                    onError={(e) => {
                      e.currentTarget.src = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
                    }}
                  />
                </div>

                <div className="jwd-card-vendor">{prod.vendor}</div>
                <h4 className="jwd-card-title">{prod.title}</h4>

                <div className="jwd-material-row">
                  <span className="jwd-material-label">Material:</span>
                  <div className="jwd-material-pill-box">
                    <select
                      className="jwd-material-select-clean"
                      value={
                        selectedMaterials[prod.id] || prod.materialOptions[0]
                      }
                      onChange={(e) => handleMaterialChange(prod.id, e.target.value)}
                    >
                      {prod.materialOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <span style={{ fontSize: '13px', marginLeft: '6px' }}>↓</span>
                  </div>
                </div>

                <div className="jwd-card-stars-outline">
                  ☆ ☆ ☆ ☆ ☆
                </div>

                <div className="jwd-card-bottom-row">
                  <div className="jwd-price-left">
                    <span className="jwd-price-current">
                      Rs. {prod.price.toLocaleString()}.00 INR
                    </span>
                  </div>

                  <button
                    className="jwd-btn-cart-camel"
                    onClick={() => handleAddToCart(prod)}
                  >
                    <span>Add to Cart</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="15" viewBox="0 0 14 16" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M11.1258 5.12596H2.87416C2.04526 5.12596 1.38823 5.82533 1.43994 6.65262L1.79919 12.4007C1.84653 13.1581 2.47458 13.7481 3.23342 13.7481H10.7666C11.5254 13.7481 12.1535 13.1581 12.2008 12.4007L12.5601 6.65262C12.6118 5.82533 11.9547 5.12596 11.1258 5.12596ZM2.87416 3.68893C1.21635 3.68893 -0.0977 5.08768 0.00571155 6.74226L0.364968 12.4904C0.459638 14.0051 1.71574 15.1851 3.23342 15.1851H10.7666C12.2843 15.1851 13.5404 14.0051 13.635 12.4904L13.9943 6.74226C14.0977 5.08768 12.7837 3.68893 11.1258 3.68893H2.87416Z" />
                      <path fillRule="evenodd" clipRule="evenodd" d="M3.40723 4.40744C3.40723 2.42332 5.01567 0.81488 6.99979 0.81488C8.9839 0.81488 10.5923 2.42332 10.5923 4.40744V5.84447C10.5923 6.24129 10.2707 6.56298 9.87384 6.56298C9.47701 6.56298 9.15532 6.24129 9.15532 5.84447V4.40744C9.15532 3.21697 8.19026 2.2519 6.99979 2.2519C5.80932 2.2519 4.84425 3.21697 4.84425 4.40744V5.84447C4.84425 6.24129 4.52256 6.56298 4.12574 6.56298C3.72892 6.56298 3.40723 6.24129 3.40723 5.84447V4.40744Z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          10. DOUBLE SPOTLIGHT BANNER WITH CENTER ROTATING RING
          ===================================================================== */}
      <section className="jwd-spotlight-section">
        <div className="jwd-spotlight-inner">
          <div className="jwd-spotlight-box">
            <span className="jwd-card-vendor" style={{ color: '#d4ba9b' }}>Limited Edition</span>
            <h3 className="jwd-promo-title">
              Whimsical Beach-Inspired Seashell Pendant
            </h3>
            <p className="jwd-promo-subtitle">
              Embrace the tranquil allure of the shoreline with our handcrafted pendant featuring natural textures and shimmering accents.
            </p>
            <button
              className="jwd-btn-gold"
              onClick={() => {
                const el = document.getElementById('catalog')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span>Check more products</span>
              <span className="jwd-btn-arrow-circle">➔</span>
            </button>
          </div>

          <div className="jwd-spotlight-center">
            <img
              src="https://jewels-workdo.myshopify.com/cdn/shop/files/chocolate4.png?v=1698823561"
              alt="Floating Solitaire Ring"
              className="jwd-floating-ring-img"
            />
          </div>

          <div className="jwd-spotlight-box">
            <span className="jwd-card-vendor" style={{ color: '#d4ba9b' }}>Haute Joaillerie</span>
            <h3 className="jwd-promo-title">
              Swarovski Crystal Chandelier Drop Earrings
            </h3>
            <p className="jwd-promo-subtitle">
              Intricately tiered crystals engineered for breathtaking light refraction and brilliant movement.
            </p>
            <button
              className="jwd-btn-gold"
              onClick={() => {
                const el = document.getElementById('catalog')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              <span>Check more products</span>
              <span className="jwd-btn-arrow-circle">➔</span>
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          11. NEWSLETTER SUBSCRIPTION BANNER
          ===================================================================== */}
      <section className="jwd-newsletter-section">
        <div className="jwd-newsletter-inner">
          <h2 className="jwd-newsletter-title">
            Subscribe newsletter and get -20% off
          </h2>
          <p className="jwd-newsletter-subtitle">
            Introducing our exclusive Jewelry Subscription, a gateway to endless
            elegance and personal expression. Receive insider previews and private salon
            invitations.
          </p>

          <form className="jwd-newsletter-form" onSubmit={handleNewsletterSubmit}>
            <input
              type="email"
              className="jwd-newsletter-input"
              placeholder="Enter your email address..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button type="submit" className="jwd-newsletter-submit" aria-label="Subscribe">
              ➔
            </button>
          </form>

          {newsletterSubscribed && (
            <p style={{ color: '#d4ba9b', marginTop: '16px', fontWeight: 600 }}>
              ✓ Thank you! Check your inbox for your exclusive -20% code.
            </p>
          )}
        </div>
      </section>

      {/* =====================================================================
          12. GEMSTONE INSIGHTS JEWELRY TRENDS (BLOG JOURNAL)
          ===================================================================== */}
      <section className="jwd-blog-section">
        <div className="jwd-section-header">
          <h2 className="jwd-section-title">Gemstone Insights Jewelry Trends</h2>
          <p className="jwd-section-subtitle">
            Discover the stories behind each gem, from the mesmerizing sapphire to the
            fiery ruby, and learn how to choose the perfect gemstone for your jewelry.
          </p>
        </div>

        <div className="jwd-blog-grid">
          {JEWELS_BLOG_POSTS.map((post) => (
            <article key={post.id} className="jwd-blog-card">
              <div className="jwd-blog-img-box">
                <img
                  src={post.image}
                  alt={post.title}
                  className="jwd-blog-img"
                />
              </div>
              <div className="jwd-blog-content">
                <div className="jwd-blog-meta">
                  <span className="jwd-blog-category">{post.category}</span>
                </div>
                <h3 className="jwd-blog-card-title">{post.title}</h3>
                <p className="jwd-blog-excerpt">{post.excerpt}</p>
                <div className="jwd-blog-bottom-action">
                  <button className="jwd-btn-read-more">
                    <span>READ MORE</span>
                    <span>➔</span>
                  </button>
                  <span className="jwd-blog-date">{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* =====================================================================
          13. SECONDARY TOP UTILITY BAR & MAIN HEADER ECHO (MATCHING SCREENSHOT)
          ===================================================================== */}
      <section className="jwd-top-bar jwd-top-bar-echo">
        <div className="jwd-top-bar-inner">
          <div className="jwd-top-schedule">
            <span>Free shipping on any order from $ 150</span>
          </div>

          <div className="jwd-top-actions">
            <button
              className="jwd-top-pill"
              onClick={() =>
                setSelectedLanguage((prev) =>
                  prev === 'English' ? 'French' : 'English'
                )
              }
              title="Change Language"
            >
              <span className="jwd-flag">🇬🇧</span>
              <span>{selectedLanguage}</span>
              <span style={{ fontSize: '10px' }}>∨</span>
            </button>

            <button
              className="jwd-top-pill"
              onClick={() =>
                setSelectedCurrency((prev) => (prev === 'INR' ? 'USD' : 'INR'))
              }
              title="Change Currency"
            >
              <span className="jwd-flag">🇮🇳</span>
              <span>{selectedCurrency}</span>
              <span style={{ fontSize: '10px' }}>∨</span>
            </button>

            <a href="#faq" className="jwd-top-link">
              Faq
            </a>
            <a href="#about" className="jwd-top-link">
              About Us
            </a>
          </div>
        </div>
      </section>

      <header className="jwd-main-header jwd-main-header-echo">
        <div className="jwd-main-header-inner">
          <div className="jwd-header-left">
            <a href="#" className="jwd-brand-logo" aria-label="Jewels Homepage">
              <span className="jwd-brand-fallback">
                Jewels <span className="jwd-brand-sparkle">✦</span>
              </span>
            </a>

            <div className="jwd-nav-divider" />

            <nav aria-label="Secondary Main Navigation">
              <ul className="jwd-nav-menu">
                <li className="jwd-nav-item">
                  <span className="jwd-nav-link active">
                    All Categories <span className="jwd-nav-arrow">∨</span>
                  </span>
                </li>
                <li className="jwd-nav-item">
                  <a href="#catalog" className="jwd-nav-link">
                    Products <span className="jwd-nav-arrow">∨</span>
                  </a>
                </li>
                <li className="jwd-nav-item">
                  <a href="#about" className="jwd-nav-link">
                    Pages <span className="jwd-nav-arrow">∨</span>
                  </a>
                </li>
                <li className="jwd-nav-item">
                  <a href="#bracelet" className="jwd-nav-link">
                    Bracelet
                  </a>
                </li>
              </ul>
            </nav>
          </div>

          <div className="jwd-header-right">
            <button
              type="button"
              className="jwd-icon-btn jwd-search-btn"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              title="Search fine jewelry"
              aria-label="Search"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            <button
              type="button"
              className="jwd-icon-btn jwd-wishlist-btn"
              onClick={() => setIsWishlistOpen(true)}
              title="Saved Wishlist"
              aria-label="Wishlist"
              style={{ position: 'relative' }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill={wishlistIds.length > 0 ? '#ef4444' : 'none'}
                stroke={wishlistIds.length > 0 ? '#ef4444' : 'currentColor'}
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistIds.length > 0 && (
                <span className="jwd-badge-count">{wishlistIds.length}</span>
              )}
            </button>

            <button className="jwd-avatar-btn" title="My Account" aria-label="User Account">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>

            <button
              className="jwd-cart-pill-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label="View Shopping Cart"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              <span>Rs. {cartSubtotal.toLocaleString()}.00</span>
              {totalCartCount > 0 && <span className="jwd-cart-badge">{totalCartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      {/* =====================================================================
          14. TESTIMONIALS (GOLDEN OUTLINE CARDS MATCHING SCREENSHOT)
          ===================================================================== */}
      <section className="jwd-testimonials-section">
        <div className="jwd-testimonials-grid">
          {JEWELS_TESTIMONIALS.map((test, idx) => (
            <div key={test.id} className="jwd-testimonial-gold-card">
              <div className="jwd-test-motif-col">
                {idx === 0 ? (
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#d4ba9b" strokeWidth="1.5">
                    <circle cx="12" cy="14" r="7" />
                    <path d="M12 7l-2-3h4l-2 3z" />
                    <path d="M9 7l1-3" />
                    <path d="M15 7l-1-3" />
                  </svg>
                ) : (
                  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#d4ba9b" strokeWidth="1.5">
                    <circle cx="12" cy="6" r="3" />
                    <path d="M12 9v5" />
                    <circle cx="12" cy="17" r="3" />
                    <path d="M12 20v2" />
                  </svg>
                )}
              </div>
              <div className="jwd-test-content-col">
                <div className="jwd-test-score-header">
                  <span className="jwd-test-score-title">{test.title.toUpperCase()}</span>
                  <span className="jwd-test-score-stars">★ ★ ★ ★ {test.rating >= 5 ? '★' : '☆'}</span>
                  <span className="jwd-test-score-num">{test.scoreText}</span>
                </div>
                <p className="jwd-test-quote-text">
                  "{test.quote}"
                </p>
                <div className="jwd-test-author-name">{test.author}, {test.location}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
        </>
      )}

      {/* =====================================================================
          15. PURE WHITE LUXURY FOOTER (MATCHING SCREENSHOT 100%)
          ===================================================================== */}
      <footer className="jwd-footer-white">
        <div className="jwd-footer-white-inner">
          {/* Column 1: Brand & Recent Purchase Toast */}
          <div className="jwd-footer-white-brand-col">
            <a href="#" className="jwd-brand-logo" aria-label="Jewels Homepage">
              <span className="jwd-brand-fallback" style={{ color: '#1e293b' }}>
                Jewels <span className="jwd-brand-sparkle">✦</span>
              </span>
            </a>
            <p className="jwd-footer-white-bio">
              Expertly crafted fine jewelry designed to elevate your everyday elegance. We believe every piece tells a unique story of beauty, devotion, and timeless luxury.
            </p>

            {/* Purchase Toast Card */}
            <div className="jwd-footer-toast-card">
              <img
                src="https://jewels-workdo.myshopify.com/cdn/shop/files/card-img-3.png?v=1698821196"
                alt="Recent Purchase"
                className="jwd-toast-thumb"
              />
              <div className="jwd-toast-body">
                <div className="jwd-toast-label">Someone recently bought</div>
                <div className="jwd-toast-title">Yellow Gold Saltwater Pearl Necklace</div>
                <div className="jwd-toast-meta">
                  <span>45 minutes ago</span>
                  <span className="jwd-toast-check">✓ Verified Purchase</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="jwd-footer-white-heading">Navigation</h4>
            <ul className="jwd-footer-white-list">
              <li><a href="#catalog" className="jwd-footer-white-link">Search</a></li>
              <li><a href="#catalog" className="jwd-footer-white-link">All Collections</a></li>
              <li><a href="#faq" className="jwd-footer-white-link">FAQs</a></li>
              <li><a href="#contact" className="jwd-footer-white-link">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 3: About Us */}
          <div>
            <h4 className="jwd-footer-white-heading">About Us</h4>
            <ul className="jwd-footer-white-list">
              <li><a href="#about" className="jwd-footer-white-link">About Us</a></li>
              <li><a href="#contact" className="jwd-footer-white-link">Contact</a></li>
              <li><a href="#privacy" className="jwd-footer-white-link">Privacy Policy</a></li>
              <li><a href="#shipping" className="jwd-footer-white-link">Shipping Policy</a></li>
              <li><a href="#terms" className="jwd-footer-white-link">Terms of Service</a></li>
              <li><a href="#faq" className="jwd-footer-white-link">FAQ</a></li>
            </ul>
          </div>

          {/* Column 4: Share */}
          <div>
            <h4 className="jwd-footer-white-heading">Share</h4>
            <div className="jwd-footer-white-socials">
              <a href="#" className="jwd-white-social-icon" aria-label="Facebook">f</a>
              <a href="#" className="jwd-white-social-icon" aria-label="Twitter">x</a>
              <a href="#" className="jwd-white-social-icon" aria-label="Instagram">ig</a>
              <a href="#" className="jwd-white-social-icon" aria-label="Pinterest">p</a>
            </div>
          </div>
        </div>

        {/* Footer Bottom Strip with Payment Badges */}
        <div className="jwd-footer-white-bottom">
          <div className="jwd-footer-copyright">
            © 2026 Jewels Powered by Willovate. All rights reserved.
          </div>
          <div className="jwd-payment-badges">
            <span className="jwd-pay-badge" style={{ backgroundColor: '#2563eb', color: '#fff' }}>VISA</span>
            <span className="jwd-pay-badge" style={{ backgroundColor: '#ea580c', color: '#fff' }}>Mastercard</span>
            <span className="jwd-pay-badge" style={{ backgroundColor: '#0284c7', color: '#fff' }}>Maestro</span>
            <span className="jwd-pay-badge" style={{ backgroundColor: '#003087', color: '#fff' }}>PayPal</span>
            <span className="jwd-pay-badge" style={{ backgroundColor: '#000000', color: '#fff' }}>Apple Pay</span>
          </div>
        </div>
      </footer>

      {/* =====================================================================
          15. SLIDE-OUT CART DRAWER
          ===================================================================== */}
      {isCartOpen && (
        <>
          <div
            className="jwd-drawer-backdrop"
            onClick={() => setIsCartOpen(false)}
          />
          <div className="jwd-cart-drawer" role="dialog" aria-label="Shopping Cart">
            <div className="jwd-drawer-header">
              <h3 className="jwd-drawer-title">
                My Cart ({totalCartCount})
              </h3>
              <button
                className="jwd-drawer-close-btn"
                onClick={() => setIsCartOpen(false)}
                aria-label="Close cart"
              >
                ✕
              </button>
            </div>

            <div className="jwd-drawer-body">
              {cartItems.length === 0 ? (
                <div className="jwd-drawer-empty">
                  <p>Your shopping bag is empty.</p>
                  <button
                    className="jwd-btn-gold"
                    style={{ marginTop: '16px' }}
                    onClick={() => setIsCartOpen(false)}
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div key={`${item.product.id}-${index}`} className="jwd-drawer-item">
                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="jwd-drawer-item-img"
                    />
                    <div className="jwd-drawer-item-info">
                      <div className="jwd-drawer-item-title">
                        {item.product.title}
                      </div>
                      <div className="jwd-drawer-item-meta">
                        Material: {item.selectedMaterial} • Qty: {item.quantity}
                      </div>
                      <div className="jwd-drawer-item-price">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}.00
                      </div>
                    </div>
                    <button
                      onClick={() => handleRemoveFromCart(index)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#94a3b8',
                        cursor: 'pointer',
                        fontSize: '16px',
                        alignSelf: 'flex-start',
                      }}
                      title="Remove"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="jwd-drawer-footer">
                <div className="jwd-drawer-subtotal">
                  <span>Subtotal</span>
                  <span>Rs. {cartSubtotal.toLocaleString()}.00 INR</span>
                </div>
                <button
                  className="jwd-btn-checkout"
                  onClick={() =>
                    alert('Order checkout initialized with Willovate Secure Payments!')
                  }
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {/* =====================================================================
          WISHLIST DRAWER
          ===================================================================== */}
      {isWishlistOpen && (
        <>
          <div
            className="jwd-drawer-backdrop"
            onClick={() => setIsWishlistOpen(false)}
          />
          <div className="jwd-cart-drawer">
            <div className="jwd-drawer-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 20, color: '#ef4444' }}>♥</span>
                <span className="jwd-drawer-title">Saved Wishlist ({wishlistIds.length})</span>
              </div>
              <button
                type="button"
                className="jwd-drawer-close"
                onClick={() => setIsWishlistOpen(false)}
                aria-label="Close wishlist"
              >
                ✕
              </button>
            </div>

            <div className="jwd-drawer-body">
              {wishlistIds.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px', color: '#cbd5e1' }}>♡</div>
                  <h4 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', margin: '0 0 8px' }}>
                    Your Wishlist is Empty
                  </h4>
                  <p style={{ fontSize: '14px', margin: '0 0 20px', color: '#64748b' }}>
                    Tap the heart icon on any jewelry item to save your favorite treasures.
                  </p>
                  <button
                    type="button"
                    className="jwd-btn-cart-camel"
                    style={{ margin: '0 auto', display: 'inline-flex' }}
                    onClick={() => {
                      setIsWishlistOpen(false)
                      document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    Explore Fine Jewelry
                  </button>
                </div>
              ) : (
                JEWELS_PRODUCTS.filter((p) => wishlistIds.includes(p.id)).map((item) => (
                  <div key={item.id} className="jwd-drawer-item">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="jwd-drawer-item-img"
                    />
                    <div style={{ flex: 1 }}>
                      <div className="jwd-drawer-item-title">{item.title}</div>
                      <div className="jwd-drawer-item-meta">{item.category} • Certified Fine Jewelry</div>
                      <div className="jwd-drawer-item-price">
                        Rs. {item.price.toLocaleString()}.00 INR
                      </div>
                      <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
                        <button
                          type="button"
                          className="jwd-btn-cart-camel"
                          style={{ padding: '6px 14px', fontSize: 11 }}
                          onClick={() => {
                            handleAddToCart(item)
                            setIsWishlistOpen(false)
                          }}
                        >
                          Add to Bag
                        </button>
                        <button
                          type="button"
                          style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', fontSize: 12 }}
                          onClick={() => toggleWishlist(item.id)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}

      {/* =====================================================================
          16. QUICK VIEW MODAL
          ===================================================================== */}
      {quickViewProduct && (
        <>
          <div
            className="jwd-drawer-backdrop"
            onClick={() => setQuickViewProduct(null)}
          />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '680px',
              width: '90%',
              zIndex: 1001,
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '24px',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.title}
                style={{
                  maxWidth: '100%',
                  maxHeight: '300px',
                  objectFit: 'contain',
                }}
              />
            </div>
            <div>
              <div
                style={{
                  fontSize: '12px',
                  color: '#94a3b8',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  marginBottom: '4px',
                }}
              >
                {quickViewProduct.category}
              </div>
              <h3
                style={{
                  fontFamily: 'var(--jwd-font-heading)',
                  fontSize: '22px',
                  color: '#284556',
                  margin: '0 0 12px',
                }}
              >
                {quickViewProduct.title}
              </h3>
              <p
                style={{
                  fontSize: '13.5px',
                  color: '#64748b',
                  lineHeight: '1.6',
                  marginBottom: '16px',
                }}
              >
                {quickViewProduct.description ||
                  'Exquisite handcrafted fine jewelry piece engineered with certified metals and ethical precious gemstones.'}
              </p>
              <div
                style={{
                  fontSize: '20px',
                  fontWeight: 700,
                  color: '#284556',
                  marginBottom: '20px',
                }}
              >
                Rs. {quickViewProduct.price.toLocaleString()}.00 INR
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                  type="button"
                  className="wv-full-pdp-btn"
                  onClick={() => {
                    setPdpProduct(quickViewProduct)
                    setViewMode('pdp')
                    setQuickViewProduct(null)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  Full Description View →
                </button>
                <button
                  className="jwd-btn-gold"
                  style={{ width: '100%' }}
                  onClick={() => {
                    handleAddToCart(quickViewProduct)
                    setQuickViewProduct(null)
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
            <button
              onClick={() => setQuickViewProduct(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '20px',
                cursor: 'pointer',
                color: '#64748b',
              }}
            >
              ✕
            </button>
          </div>
        </>
      )}

      {/* =====================================================================
          17. VIDEO MODAL
          ===================================================================== */}
      {isVideoModalOpen && (
        <>
          <div
            className="jwd-drawer-backdrop"
            onClick={() => setIsVideoModalOpen(false)}
          />
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              backgroundColor: '#000000',
              borderRadius: '12px',
              padding: '20px',
              maxWidth: '800px',
              width: '90%',
              zIndex: 1001,
              textAlign: 'center',
            }}
          >
            <h3 style={{ color: '#ffffff', margin: '0 0 16px' }}>
              Jewelry from Around the Globe — Atelier Craftsmanship
            </h3>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                title="Jewels Atelier Film"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  border: 'none',
                  borderRadius: '8px',
                }}
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </div>
            <button
              onClick={() => setIsVideoModalOpen(false)}
              style={{
                marginTop: '16px',
                background: '#d4ba9b',
                color: '#1e293b',
                border: 'none',
                padding: '8px 20px',
                borderRadius: '6px',
                fontWeight: 700,
                cursor: 'pointer',
              }}
            >
              Close Video
            </button>
          </div>
        </>
      )}

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

export default JewelsWorkDoStorefront

