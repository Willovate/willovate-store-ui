import React, { useState, useEffect } from 'react'
import type {
  ShoesWorkDoProduct,
  ShoesWorkDoCartItem,
  ShoesWorkDoStorefrontProps,
} from './types'
import {
  SHOES_WORKDO_HERO_SLIDES,
  SHOES_WORKDO_SIDEBAR_CATEGORIES,
  SHOES_WORKDO_FEATURED_CATEGORIES,
  SHOES_WORKDO_TODAY_DISCOUNTS,
  SHOES_WORKDO_BESTSELLERS,
  SHOES_WORKDO_RETRO_SHOES,
  SHOES_WORKDO_REVIEWS,
  SHOES_WORKDO_BLOGS,
} from './data/shoesWorkDoData'
import {
  StorefrontSearchModal,
  StorefrontWishlistDrawer,
  StorefrontAccountModal,
  StorefrontMobileNavDrawer,
  type MobileNavItem,
} from '../../../components/templates/StorefrontModals'
import { StorefrontProductDetailPage } from '../../../components/templates/StorefrontProductDetailPage'
import './styles/shoesWorkDo.css'

export const ShoesWorkDoStorefront: React.FC<ShoesWorkDoStorefrontProps> = ({
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
  const [viewMode, setViewMode] = useState<'home' | 'pdp'>('home')
  const [selectedProduct, setSelectedProduct] = useState<ShoesWorkDoProduct | null>(null)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [activeCategory, setActiveCategory] = useState('all')
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR')
  const [language, setLanguage] = useState<'English' | 'Spanish' | 'French'>('English')
  const [selectedBestsellerTab, setSelectedBestsellerTab] = useState('All Running Shoe')

  // Selected sizes per product id
  const [productSizes, setProductSizes] = useState<Record<string, number>>({
    'swd-td-1': 8,
    'swd-td-2': 9,
    'swd-td-3': 9,
    'swd-bs-1': 8,
    'swd-bs-2': 9,
    'swd-bs-3': 10,
  })

  // Cart & Wishlist
  const [cartItems, setCartItems] = useState<ShoesWorkDoCartItem[]>([
    {
      product: SHOES_WORKDO_TODAY_DISCOUNTS[0],
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
  const [quickViewProduct, setQuickViewProduct] = useState<ShoesWorkDoProduct | null>(null)
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [showSocialProof, setShowSocialProof] = useState(true)

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

  // Auto rotate hero slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % SHOES_WORKDO_HERO_SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const formatPrice = (inrAmount: number) => {
    if (currency === 'USD') {
      const usd = Math.round(inrAmount / 83)
      return `$${usd}.00 USD`
    }
    return `Rs. ${inrAmount.toLocaleString('en-IN')}.00 INR`
  }

  const handleSizeChange = (productId: string, size: number) => {
    setProductSizes((prev) => ({ ...prev, [productId]: size }))
  }

  const handleAddToCart = (product: ShoesWorkDoProduct, size?: number) => {
    const finalSize = size || productSizes[product.id] || product.availableSizes[0] || 9
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.selectedSize === finalSize
      )
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.selectedSize === finalSize
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { product, quantity: 1, selectedSize: finalSize }]
    })
    showToast(`Added "${product.name}" (Size ${finalSize}) to your bag!`)
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
        .filter(Boolean) as ShoesWorkDoCartItem[]
    )
  }

  const cartTotalINR = cartItems.reduce(
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
    showToast('🎉 Thank you for subscribing! Check your inbox for -20% off.')
    setNewsletterEmail('')
  }

  const navItems: MobileNavItem[] = [
    {
      label: 'Categories',
      children: SHOES_WORKDO_SIDEBAR_CATEGORIES.map((c) => ({
        label: c.name,
        onClick: () => {
          setActiveCategory(c.id)
          showToast(`Filtered by ${c.name}`)
        },
      })),
    },
    {
      label: 'Featured Collections',
      children: [
        { label: 'Running Shoes', onClick: () => { setSelectedBestsellerTab('All Running Shoe'); const el = document.getElementById('swd-bestsellers-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Sneakers & Casuals', onClick: () => { const el = document.getElementById('swd-discounts-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Retro Heritage Edition', onClick: () => { const el = document.getElementById('swd-retro-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Customer Support',
      children: [
        { label: 'FAQ', onClick: () => showToast('Opening FAQ...') },
        { label: 'Contact', onClick: () => showToast('Opening Contact...') },
        { label: 'About Us', onClick: () => showToast('Opening About Us...') },
      ],
    },
  ]

  const activeSlide = SHOES_WORKDO_HERO_SLIDES[currentSlideIndex]

  return (
    <div
      className={`swd-wrapper device-${effectiveDevice}`}
      style={customAccentColor ? ({ '--swd-accent': customAccentColor } as any) : undefined}
    >
      {/* Topbar Announcement */}
      <div className="swd-topbar">
        <div className="swd-topbar-inner">
          <div className="swd-topbar-left">
            <span className="swd-topbar-promo">
              -30% off for first order with 200 USD in the cart.
              <a onClick={() => showToast('Coupon code SHOES30 applied at checkout!')}>Show More</a>
            </span>
          </div>
          <div className="swd-topbar-right">
            <span className="swd-topbar-link" onClick={() => showToast('Opening FAQ...')}>Faq</span>
            <span className="swd-topbar-link" onClick={() => showToast('Opening Support...')}>Support</span>
            <span className="swd-topbar-link" onClick={() => showToast('Opening Contact...')}>Contact</span>
            <span className="swd-topbar-link" onClick={() => showToast('Opening About Us...')}>About Us</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="swd-header">
        <div className="swd-header-inner">
          {/* Mobile Hamburger Button */}
          <button
            type="button"
            className="swd-hamburger-btn wv-mobile-hamburger-btn"
            onClick={() => setIsMobileNavOpen(true)}
            title="Menu"
            aria-label="Open mobile menu"
          >
            <span className="wv-mobile-hamburger-bar" />
            <span className="wv-mobile-hamburger-bar" />
            <span className="wv-mobile-hamburger-bar" />
          </button>

          {/* Logo */}
          <div className="swd-logo" onClick={() => setActiveCategory('all')}>
            Shoes
          </div>

          {/* Search bar with collection dropdown */}
          <div className="swd-search-bar" onClick={() => setIsSearchOpen(true)} style={{ cursor: 'pointer' }}>
            <input
              type="text"
              readOnly
              placeholder="Search Product..."
              className="swd-search-input"
            />
            <span style={{ fontSize: 16, marginRight: 8 }}>🔍</span>
          </div>

          {/* Operating hours & support */}
          <div className="swd-support-info">
            <div className="swd-support-block">
              <span className="swd-support-label">Monday - Friday:</span>
              <span className="swd-support-value">8:00 AM - 9:00 PM</span>
            </div>
            <div className="swd-support-block">
              <span className="swd-support-label">Support 24/7:</span>
              <span className="swd-support-value">+12 002-224-111</span>
            </div>
          </div>

          {/* Currency, Language & Cart */}
          <div className="swd-header-actions">
            <button
              type="button"
              className="wv-mobile-action-btn swd-mobile-search-btn"
              title="Search Product"
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search"
            >
              <span>🔍</span>
            </button>

            <div className="swd-pill-select swd-desktop-pill">
              <span>{currency === 'INR' ? '🇮🇳' : '🇺🇸'}</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as 'INR' | 'USD')}
              >
                <option value="INR">INR</option>
                <option value="USD">USD</option>
              </select>
            </div>

            <div className="swd-pill-select swd-desktop-pill">
              <span>🇬🇧</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
              >
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
                <option value="French">French</option>
              </select>
            </div>

            <button
              type="button"
              className="swd-user-btn swd-account-btn"
              onClick={() => setIsAccountOpen(true)}
              title="My Account"
            >
              👤
            </button>

            <button
              type="button"
              className="wv-mobile-action-btn swd-user-btn"
              onClick={() => setIsWishlistOpen(true)}
              title="Wishlist"
              style={{ position: 'relative' }}
            >
              <span>{wishlist.length > 0 ? '❤️' : '🤍'}</span>
              {wishlist.length > 0 && (
                <span className="wv-mobile-badge-counter swd-cart-badge">{wishlist.length}</span>
              )}
            </button>

            <button
              type="button"
              className="wv-mobile-action-btn swd-cart-pill"
              onClick={() => setIsCartOpen(true)}
              title="View Cart"
              style={{ position: 'relative' }}
            >
              <span>🛒</span>
              {cartItemCount > 0 && <span className="wv-mobile-badge-counter swd-cart-mobile-counter">{cartItemCount}</span>}
              <span className="swd-cart-text">My Cart: {formatPrice(cartTotalINR)}</span>
              <span className="swd-cart-badge swd-cart-desktop-counter">{cartItemCount}</span>
            </button>
          </div>
        </div>
      </header>

      {viewMode === 'pdp' && selectedProduct ? (
        <StorefrontProductDetailPage
          product={{
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.price,
            originalPrice: selectedProduct.originalPrice,
            image: selectedProduct.image,
            description: selectedProduct.description,
            category: selectedProduct.category,
            rating: selectedProduct.rating || 4.9,
            reviewsCount: selectedProduct.reviewCount || 42,
            inStock: true,
            sku: `SWD-${selectedProduct.id.toUpperCase()}`,
            gallery: [selectedProduct.image],
            colors: ['#0f172a', '#ef4444', '#ffffff'],
            sizes: selectedProduct.availableSizes?.map(String) || ['7', '8', '9', '10', '11'],
            specs: {
              Brand: selectedProduct.brand || 'WorkDo Performance',
              Category: selectedProduct.category,
              Sole: 'Multi-Directional Rubber Lug Outsole',
              Insole: 'Ortholite High Rebound Sockliner',
            },
            features: [
              'High-abrasion rubber compound for all-day grip',
              'Breathable mesh construction keeps feet cool',
              'Energy-returning cushioning system',
              'Comfort padded collar and tongue',
            ],
          }}
          brandName="Shoes WorkDo"
          accentColor={customAccentColor || '#ef4444'}
          currencyPrefix={currency === 'USD' ? '$' : '₹'}
          formatPrice={(p) => formatPrice(p)}
          relatedProducts={[...SHOES_WORKDO_TODAY_DISCOUNTS, ...SHOES_WORKDO_BESTSELLERS]
            .filter((p) => p.id !== selectedProduct.id)
            .slice(0, 4)
            .map((p) => ({
              id: p.id,
              name: p.name,
              price: p.price,
              originalPrice: p.originalPrice,
              image: p.image,
              category: p.category,
              rating: p.rating || 4.8,
            }))}
          onBack={() => {
            setViewMode('home')
            setSelectedProduct(null)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onAddToCart={(_prod, _col, sz, qty) => {
            for (let i = 0; i < (qty || 1); i++) {
              handleAddToCart(selectedProduct, sz ? Number(sz) : undefined)
            }
          }}
          onBuyNow={(_prod, _col, sz, qty) => {
            for (let i = 0; i < (qty || 1); i++) {
              handleAddToCart(selectedProduct, sz ? Number(sz) : undefined)
            }
            setIsCartOpen(true)
            showToast('Instant checkout initiated!')
          }}
          onToggleWishlist={(id) => toggleWishlist(id)}
          isWishlisted={wishlist.includes(selectedProduct.id)}
        />
      ) : (
        <>
          {/* Hero & Category Sidebar Section */}
          <section className="swd-hero-section">
        <div className="swd-hero-container">
          {/* Left Column: Sidebar Menu + 24h Delivery Promo */}
          <div className="swd-sidebar">
            <div className="swd-category-menu">
              {SHOES_WORKDO_SIDEBAR_CATEGORIES.map((cat) => (
                <div
                  key={cat.id}
                  className={`swd-category-item ${activeCategory === cat.id ? 'active' : ''}`}
                  onClick={() => {
                    setActiveCategory(cat.id)
                    showToast(`Filtered by ${cat.name}`)
                  }}
                >
                  <div className="swd-category-item-left">
                    <span>{cat.icon}</span>
                    <span>{cat.name}</span>
                  </div>
                  <span>›</span>
                </div>
              ))}
            </div>

            <div className="swd-delivery-promo">
              <div className="swd-delivery-content">
                <span className="swd-promo-badge">Delivery Services</span>
                <div className="swd-delivery-title">Delivery in 24 hours</div>
                <div className="swd-delivery-desc">
                  These are casual shoes that are typically made of canvas or leather and have rubber...
                </div>
                <button
                  type="button"
                  className="swd-delivery-btn"
                  onClick={() => showToast('24-Hour express shipping details opened!')}
                >
                  <span>🛈</span> Show more ›
                </button>
              </div>
            </div>
          </div>

          {/* Main Hero Slider */}
          <div
            className="swd-hero-banner"
            style={{ backgroundImage: `url(${activeSlide.image})` }}
          >
            {activeSlide.discountBadge && (
              <div className="swd-discount-starburst">
                <div className="swd-discount-text">{activeSlide.discountBadge}</div>
              </div>
            )}

            <div className="swd-hero-content">
              <span className="swd-hero-tag">{activeSlide.tag}</span>
              <h1 className="swd-hero-title">{activeSlide.title}</h1>
              <p className="swd-hero-desc">{activeSlide.description}</p>

              <div className="swd-hero-actions">
                <button
                  type="button"
                  className="swd-hero-primary-btn"
                  onClick={() => {
                    const el = document.getElementById('swd-discounts-section')
                    el?.scrollIntoView({ behavior: 'smooth' })
                  }}
                >
                  <span>㗊</span> {activeSlide.buttonText} ›
                </button>

                <button
                  type="button"
                  className="swd-hero-arrow-btn"
                  onClick={() =>
                    setCurrentSlideIndex(
                      (prev) => (prev - 1 + SHOES_WORKDO_HERO_SLIDES.length) % SHOES_WORKDO_HERO_SLIDES.length
                    )
                  }
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="swd-hero-arrow-btn"
                  onClick={() =>
                    setCurrentSlideIndex((prev) => (prev + 1) % SHOES_WORKDO_HERO_SLIDES.length)
                  }
                >
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Love our categories */}
      <section className="swd-section">
        <div className="swd-section-inner">
          <div className="swd-section-header">
            <h2 className="swd-section-title">Love our categories</h2>
            <button
              type="button"
              className="swd-see-more-btn"
              onClick={() => showToast('Browsing full category catalog...')}
            >
              See more products ›
            </button>
          </div>

          <div className="swd-categories-grid">
            {SHOES_WORKDO_FEATURED_CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="swd-category-card"
                style={{ background: cat.gradient }}
              >
                <div>
                  <div className="swd-cat-name">{cat.name}</div>
                  <div className="swd-cat-desc">{cat.description}</div>
                </div>
                <button
                  type="button"
                  className="swd-cat-btn"
                  onClick={() => {
                    setActiveCategory(cat.name.toLowerCase())
                    showToast(`Switched category to ${cat.name}`)
                  }}
                >
                  Go to category ›
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Outdoor Adventure Shoes Banner */}
      <section className="swd-section-inner">
        <div className="swd-outdoor-banner">
          <div>
            <span className="swd-outdoor-tag">Trendy Collection</span>
            <h2 className="swd-outdoor-title">Outdoor Adventure Shoes</h2>
            <p className="swd-outdoor-desc">
              The shoes have a durable non-marking rubber outsole that provides traction and durability
              on a variety of indoor surfaces.
            </p>
            <button
              type="button"
              className="swd-see-more-btn"
              onClick={() => showToast('Exploring Outdoor Adventure footwear...')}
            >
              Show more products ›
            </button>
          </div>

          <div className="swd-outdoor-collage">
            <div className="swd-callout-pill">
              <span className="swd-callout-dots">
                <span className="swd-callout-dot"></span>
                <span className="swd-callout-dot"></span>
                <span className="swd-callout-dot"></span>
              </span>
              <span>"Sneakers that suit your mood."</span>
            </div>
            <div className="swd-callout-pill">
              <span className="swd-callout-dots">
                <span className="swd-callout-dot"></span>
                <span className="swd-callout-dot"></span>
                <span className="swd-callout-dot"></span>
              </span>
              <span>"Starting the Day in the Best Way with Soft Shoes"</span>
            </div>
            <div className="swd-callout-pill">
              <span className="swd-callout-dots">
                <span className="swd-callout-dot"></span>
                <span className="swd-callout-dot"></span>
                <span className="swd-callout-dot"></span>
              </span>
              <span>"Fresh Inspiration for Casual Shoes"</span>
            </div>
          </div>
        </div>
      </section>

      {/* Today Discounts */}
      <section id="swd-discounts-section" className="swd-section">
        <div className="swd-section-inner">
          <div className="swd-section-header">
            <h2 className="swd-section-title">Today Discounts</h2>
            <button
              type="button"
              className="swd-see-more-btn"
              onClick={() => showToast('Loading all discounted footwear...')}
            >
              See more products ›
            </button>
          </div>

          <div className="swd-products-grid">
            {SHOES_WORKDO_TODAY_DISCOUNTS.map((prod) => (
              <div key={prod.id} className="swd-product-card">
                {prod.badge && (
                  <div className="swd-product-badges">
                    <span className="swd-badge-sale">{prod.badge}</span>
                  </div>
                )}

                <div className="swd-product-actions">
                  <button
                    type="button"
                    className="swd-action-icon"
                    onClick={() => toggleWishlist(prod.id)}
                    title="Wishlist"
                  >
                    {wishlist.includes(prod.id) ? '❤️' : '🤍'}
                  </button>
                  <button
                    type="button"
                    className="swd-action-icon"
                    onClick={() => setQuickViewProduct(prod)}
                    title="Quick View"
                  >
                    👁️
                  </button>
                </div>

                <div className="swd-product-img-wrap">
                  <img src={prod.image} alt={prod.name} className="swd-product-img" />
                </div>

                <div className="swd-product-brand">{prod.brand}</div>
                <div className="swd-product-name">{prod.name}</div>
                <div className="swd-product-rating">
                  {'★'.repeat(Math.floor(prod.rating))}
                  {'☆'.repeat(5 - Math.floor(prod.rating))}
                  <span>({prod.reviewCount})</span>
                </div>

                <div className="swd-product-price-row">
                  <span className="swd-price-current">{formatPrice(prod.price)}</span>
                  {prod.originalPrice && (
                    <span className="swd-price-original">
                      {formatPrice(prod.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="swd-size-select-wrap">
                  <label className="swd-size-label">Size</label>
                  <select
                    className="swd-size-dropdown"
                    value={productSizes[prod.id] || 8}
                    onChange={(e) => handleSizeChange(prod.id, Number(e.target.value))}
                  >
                    {prod.availableSizes.map((sz) => (
                      <option key={sz} value={sz}>
                        Size {sz}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button
                    type="button"
                    className="swd-add-cart-btn"
                    style={{ flex: 1, margin: 0 }}
                    onClick={() => handleAddToCart(prod)}
                  >
                    <span>Add to Cart</span>
                    <span>›</span>
                  </button>
                  <button
                    type="button"
                    title="View Details"
                    onClick={() => setQuickViewProduct(prod)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
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
            ))}
          </div>
        </div>
      </section>

      {/* Our Bestsellers (Light Blue Section) */}
      <section id="swd-bestsellers-section" className="swd-blue-section">
        <div className="swd-section-inner">
          <div className="swd-section-header">
            <h2 className="swd-section-title">Our Bestsellers</h2>
            <button
              type="button"
              className="swd-see-more-btn"
              onClick={() => showToast('Loading all bestseller shoes...')}
            >
              See more products ›
            </button>
          </div>

          <div className="swd-filter-pills">
            {['All Running Shoe', 'Football', 'Running Shoes', 'Sneakers', 'Walking Shoes'].map(
              (tab) => (
                <button
                  key={tab}
                  type="button"
                  className={`swd-filter-pill ${selectedBestsellerTab === tab ? 'active' : ''}`}
                  onClick={() => setSelectedBestsellerTab(tab)}
                >
                  {tab}
                </button>
              )
            )}
          </div>

          <div className="swd-products-grid">
            {SHOES_WORKDO_BESTSELLERS.map((prod) => (
              <div key={prod.id} className="swd-product-card">
                {prod.badge && (
                  <div className="swd-product-badges">
                    <span className="swd-badge-new">{prod.badge}</span>
                  </div>
                )}

                <div className="swd-product-actions">
                  <button
                    type="button"
                    className="swd-action-icon"
                    onClick={() => toggleWishlist(prod.id)}
                    title="Wishlist"
                  >
                    {wishlist.includes(prod.id) ? '❤️' : '🤍'}
                  </button>
                  <button
                    type="button"
                    className="swd-action-icon"
                    onClick={() => setQuickViewProduct(prod)}
                    title="Quick View"
                  >
                    👁️
                  </button>
                </div>

                <div className="swd-product-img-wrap">
                  <img src={prod.image} alt={prod.name} className="swd-product-img" />
                </div>

                <div className="swd-product-brand">{prod.brand}</div>
                <div className="swd-product-name">{prod.name}</div>
                <div className="swd-product-rating">
                  {'★'.repeat(Math.floor(prod.rating))}
                  {'☆'.repeat(5 - Math.floor(prod.rating))}
                  <span>({prod.reviewCount})</span>
                </div>

                <div className="swd-product-price-row">
                  <span className="swd-price-current">{formatPrice(prod.price)}</span>
                  {prod.originalPrice && (
                    <span className="swd-price-original">
                      {formatPrice(prod.originalPrice)}
                    </span>
                  )}
                </div>

                <div className="swd-size-select-wrap">
                  <label className="swd-size-label">Size</label>
                  <select
                    className="swd-size-dropdown"
                    value={productSizes[prod.id] || 9}
                    onChange={(e) => handleSizeChange(prod.id, Number(e.target.value))}
                  >
                    {prod.availableSizes.map((sz) => (
                      <option key={sz} value={sz}>
                        Size {sz}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                  <button
                    type="button"
                    className="swd-add-cart-btn"
                    style={{ flex: 1, margin: 0 }}
                    onClick={() => handleAddToCart(prod)}
                  >
                    <span>Add to Cart</span>
                    <span>›</span>
                  </button>
                  <button
                    type="button"
                    title="View Details"
                    onClick={() => setQuickViewProduct(prod)}
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      border: '1px solid #cbd5e1',
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
            ))}
          </div>
        </div>
      </section>

      {/* Our Loved category */}
      <section className="swd-blue-section" style={{ paddingTop: 0 }}>
        <div className="swd-section-inner">
          <div className="swd-section-header">
            <h2 className="swd-section-title">Our Loved category</h2>
            <button
              type="button"
              className="swd-see-more-btn"
              onClick={() => showToast('Browsing Loved categories...')}
            >
              See more products ›
            </button>
          </div>

          <div className="swd-loved-grid">
            <div className="swd-loved-banner">
              <div className="swd-loved-content">
                <div style={{ fontSize: 24, fontWeight: 800, marginBottom: 8 }}>Shoes</div>
                <div style={{ fontSize: 13, color: '#e2e8f0', marginBottom: 16 }}>
                  The shoes have a durable non-marking rubber outsole that provides traction and durability.
                </div>
                <button
                  type="button"
                  className="swd-delivery-btn"
                  onClick={() => showToast('Opening featured shoe line...')}
                >
                  Go to category ›
                </button>
              </div>
            </div>

            <div className="swd-products-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              {SHOES_WORKDO_TODAY_DISCOUNTS.slice(0, 2).map((prod) => (
                <div key={prod.id} className="swd-product-card">
                  <div className="swd-product-actions">
                    <button
                      type="button"
                      className="swd-action-icon"
                      onClick={() => toggleWishlist(prod.id)}
                    >
                      {wishlist.includes(prod.id) ? '❤️' : '🤍'}
                    </button>
                    <button
                      type="button"
                      className="swd-action-icon"
                      onClick={() => setQuickViewProduct(prod)}
                    >
                      👁️
                    </button>
                  </div>

                  <div className="swd-product-img-wrap">
                    <img src={prod.image} alt={prod.name} className="swd-product-img" />
                  </div>

                  <div className="swd-product-brand">{prod.brand}</div>
                  <div className="swd-product-name">{prod.name}</div>
                  <div className="swd-product-rating">★★★★★ ({prod.reviewCount})</div>
                  <div className="swd-product-price-row">
                    <span className="swd-price-current">{formatPrice(prod.price)}</span>
                  </div>

                  <div className="swd-size-select-wrap">
                    <label className="swd-size-label">Size</label>
                    <select
                      className="swd-size-dropdown"
                      value={productSizes[prod.id] || 8}
                      onChange={(e) => handleSizeChange(prod.id, Number(e.target.value))}
                    >
                      {prod.availableSizes.map((sz) => (
                        <option key={sz} value={sz}>
                          Size {sz}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="button"
                    className="swd-add-cart-btn"
                    onClick={() => handleAddToCart(prod)}
                  >
                    <span>Add to Cart</span>
                    <span>›</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Retro-Inspired Athletic Shoes */}
      <section className="swd-section">
        <div className="swd-section-inner">
          <div className="swd-section-header">
            <h2 className="swd-section-title">Retro-Inspired Athletic Shoes</h2>
            <button
              type="button"
              className="swd-see-more-btn"
              onClick={() => showToast('Loading retro athletic collection...')}
            >
              See more products ›
            </button>
          </div>

          <div className="swd-retro-grid">
            {SHOES_WORKDO_RETRO_SHOES.map((prod) => (
              <div
                key={prod.id}
                className="swd-retro-card"
                style={{ backgroundImage: `url(${prod.image})`, backgroundSize: 'cover' }}
              >
                <div className="swd-retro-content">
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#93c5fd' }}>Shoes</div>
                  <div style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>{prod.name}</div>
                  <div style={{ fontSize: 13, color: '#f59e0b', marginBottom: 8 }}>★★★★★</div>
                  <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>
                    {formatPrice(prod.price)}
                  </div>
                  <button
                    type="button"
                    className="swd-hero-primary-btn"
                    style={{ padding: '8px 16px', fontSize: 12 }}
                    onClick={() => handleAddToCart(prod)}
                  >
                    Add to Cart ›
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual Runway-Inspired & Futuristic Performance Statement Shoes */}
      <section className="swd-section-inner" style={{ marginBottom: 60 }}>
        <div className="swd-dual-statement-grid">
          <div
            className="swd-statement-card"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80)',
              backgroundSize: 'cover',
            }}
          >
            <div className="swd-statement-content">
              <span className="swd-promo-badge">Casual Collection</span>
              <h3 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>
                Runway-Inspired Statement Shoes
              </h3>
              <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.5, marginBottom: 20 }}>
                Men casual shoes typically have a stylish and versatile look that can be worn for
                various casual occasions, such as running errands or hanging out with friends.
              </p>
              <button
                type="button"
                className="swd-see-more-btn"
                onClick={() => showToast('Opening Runway collection...')}
              >
                Show products ›
              </button>
            </div>
          </div>

          <div
            className="swd-statement-card"
            style={{
              backgroundImage:
                'url(https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80)',
              backgroundSize: 'cover',
            }}
          >
            <div className="swd-statement-content">
              <span className="swd-promo-badge">Lightweight Collection</span>
              <h3 style={{ fontSize: 28, fontWeight: 800, lineHeight: 1.2, marginBottom: 12 }}>
                Futuristic Performance Shoes
              </h3>
              <p style={{ fontSize: 13, color: '#cbd5e1', lineHeight: 1.5, marginBottom: 20 }}>
                Running shoes typically have a flexible and lightweight sole, as well as a breathable
                upper that allows air to circulate around the feet and keep them cool and dry.
              </p>
              <button
                type="button"
                className="swd-see-more-btn"
                onClick={() => showToast('Opening Performance footwear...')}
              >
                Show products ›
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="swd-section" style={{ backgroundColor: '#f8fafc' }}>
        <div className="swd-section-inner">
          <div className="swd-testimonials-grid">
            <div>
              <h2 className="swd-section-title" style={{ marginBottom: 14 }}>
                Testimonials
              </h2>
              <p style={{ fontSize: 14, color: '#64748b', lineHeight: 1.6 }}>
                Explore our reviews to discover how our high-quality shoes and top-notch customer
                service have made a lasting impression.
              </p>
            </div>

            <div className="swd-testimonial-cards">
              {SHOES_WORKDO_REVIEWS.map((rev) => (
                <div key={rev.id} className="swd-test-card">
                  <div style={{ color: '#f59e0b', fontSize: 14, marginBottom: 8 }}>★★★★★</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#0284c7', marginBottom: 6 }}>
                    {rev.shoeTag}
                  </div>
                  <p style={{ fontSize: 13, color: '#334155', fontStyle: 'italic', lineHeight: 1.5 }}>
                    "{rev.quote}"
                  </p>
                  <div className="swd-test-user">
                    <img src={rev.avatar} alt={rev.name} className="swd-test-avatar" />
                    <div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#0f172a' }}>
                        {rev.name}
                      </div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>{rev.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Blog & Articles */}
      <section className="swd-section">
        <div className="swd-section-inner">
          <div className="swd-section-header">
            <h2 className="swd-section-title">Blog & Articles</h2>
            <button
              type="button"
              className="swd-see-more-btn"
              onClick={() => showToast('Loading all blog articles...')}
            >
              See more products ›
            </button>
          </div>

          <div className="swd-blogs-grid">
            {SHOES_WORKDO_BLOGS.map((blog) => (
              <div key={blog.id} className="swd-blog-card">
                <img src={blog.image} alt={blog.title} className="swd-blog-img" />
                <div className="swd-blog-body">
                  <div>
                    <div style={{ fontSize: 11, color: '#64748b', marginBottom: 6 }}>
                      {blog.date} • {blog.readTime}
                    </div>
                    <div style={{ fontSize: 16, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>
                      {blog.title}
                    </div>
                    <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.5, marginBottom: 16 }}>
                      {blog.excerpt}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="swd-see-more-btn"
                    style={{ alignSelf: 'flex-start' }}
                    onClick={() => showToast(`Reading "${blog.title}"...`)}
                  >
                    Read more ›
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
        </>
      )}

      {/* Footer */}
      <footer className="swd-footer">
        <div className="swd-footer-grid">
          <div>
            <div className="swd-logo" style={{ color: '#0f172a', marginBottom: 14 }}>
              Shoes
            </div>
            <p style={{ fontSize: 13, color: '#475569', lineHeight: 1.6, maxWidth: 320 }}>
              Look more stunning and cool with our modern and sporty shoe collections designed for
              premium athletic performance and everyday street wear.
            </p>
          </div>

          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', marginBottom: 14 }}>
              Navigation
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 13, color: '#475569', lineHeight: 2 }}>
              <li style={{ cursor: 'pointer' }} onClick={() => showToast('Opening Search...')}>Search</li>
              <li style={{ cursor: 'pointer' }} onClick={() => showToast('Opening All Collections...')}>All Collections</li>
              <li style={{ cursor: 'pointer' }} onClick={() => showToast('Opening Contact Us...')}>Contact Us</li>
            </ul>
          </div>

          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', marginBottom: 14 }}>
              About Us
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 13, color: '#475569', lineHeight: 2 }}>
              <li style={{ cursor: 'pointer' }} onClick={() => showToast('Opening About Us...')}>About Us</li>
              <li style={{ cursor: 'pointer' }} onClick={() => showToast('Opening Contact Us...')}>Contact Us</li>
              <li style={{ cursor: 'pointer' }} onClick={() => showToast('Opening FAQs...')}>FAQs</li>
              <li style={{ cursor: 'pointer' }} onClick={() => showToast('Opening Privacy Policy...')}>Privacy Policy</li>
              <li style={{ cursor: 'pointer' }} onClick={() => showToast('Opening Terms & Conditions...')}>Terms & Conditions</li>
            </ul>
          </div>

          <div>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>
              Subscribe to our newsletter &lt;20% off
            </div>
            <p style={{ fontSize: 12, color: '#475569', lineHeight: 1.5, marginBottom: 14 }}>
              The last for a shoe store comes with three vital dimensions: length, ball width and ball
              girth. If you do not know about your exact foot shape, get professionally fitted by our
              shoe fitters.
            </p>
            <form onSubmit={handleNewsletterSubmit} className="swd-newsletter-input-wrap">
              <input
                type="email"
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="swd-newsletter-input"
              />
              <button type="submit" className="swd-newsletter-btn">
                ✈
              </button>
            </form>
          </div>
        </div>

        <div
          style={{
            maxWidth: 1400,
            margin: '0 auto',
            padding: '16px 24px 0',
            borderTop: '1px solid rgba(15, 23, 42, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: 12,
            fontSize: 12,
            color: '#64748b',
          }}
        >
          <div>© 2024, Shoes WorkDo Powered by Shopify</div>
          <div style={{ display: 'flex', gap: 8, fontSize: 16 }}>
            <span>💳 Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
            <span>PayPal</span>
            <span>Apple Pay</span>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <span style={{ cursor: 'pointer' }} onClick={() => showToast('Privacy Policy')}>Privacy Policy</span>
            <span style={{ cursor: 'pointer' }} onClick={() => showToast('Terms and conditions')}>Terms and conditions</span>
          </div>
        </div>
      </footer>

      {/* Floating social proof notification toast */}
      {showSocialProof && (
        <div className="swd-social-proof">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=80&q=80"
            alt="Shoe"
            style={{ width: 44, height: 44, borderRadius: 6, objectFit: 'cover' }}
          />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 10, color: '#94a3b8' }}>Someone recently purchased</div>
            <div style={{ fontSize: 12, fontWeight: 700 }}>Air Max Flyknit Racer</div>
            <div style={{ fontSize: 10, color: '#38bdf8' }}>12 mins ago • Verified Buyer</div>
          </div>
          <button
            type="button"
            onClick={() => setShowSocialProof(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#94a3b8',
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
              borderRadius: 16,
              maxWidth: 720,
              width: '100%',
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{ maxWidth: '100%', maxHeight: 260, objectFit: 'contain' }}
              />
            </div>
            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>
                    {quickViewProduct.brand}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuickViewProduct(null)}
                    style={{ background: 'transparent', border: 'none', fontSize: 18, cursor: 'pointer' }}
                  >
                    ✕
                  </button>
                </div>
                <h3 style={{ fontSize: 22, fontWeight: 800, margin: '8px 0', color: '#0f172a' }}>
                  {quickViewProduct.name}
                </h3>
                <div style={{ color: '#f59e0b', fontSize: 13, marginBottom: 8 }}>
                  ★★★★★ ({quickViewProduct.reviewCount} customer reviews)
                </div>
                <div style={{ fontSize: 20, fontWeight: 800, color: '#1e3a8a', marginBottom: 12 }}>
                  {formatPrice(quickViewProduct.price)}
                </div>
                <p style={{ fontSize: 13, color: '#64748b', lineHeight: 1.5, marginBottom: 16 }}>
                  {quickViewProduct.description}
                </p>
                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#334155', display: 'block', marginBottom: 6 }}>
                    Select Size
                  </label>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {quickViewProduct.availableSizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        style={{
                          padding: '6px 14px',
                          borderRadius: 6,
                          border:
                            (productSizes[quickViewProduct.id] || 8) === sz
                              ? '2px solid #1e3a8a'
                              : '1px solid #cbd5e1',
                          backgroundColor:
                            (productSizes[quickViewProduct.id] || 8) === sz
                              ? '#1e3a8a'
                              : '#ffffff',
                          color:
                            (productSizes[quickViewProduct.id] || 8) === sz
                              ? '#ffffff'
                              : '#1e293b',
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                        onClick={() => handleSizeChange(quickViewProduct.id, sz)}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <button
                  type="button"
                  className="wv-full-pdp-btn"
                  onClick={() => {
                    setSelectedProduct(quickViewProduct)
                    setViewMode('pdp')
                    setQuickViewProduct(null)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                >
                  Full Description View →
                </button>
                <button
                  type="button"
                  className="swd-add-cart-btn"
                  onClick={() => {
                    handleAddToCart(quickViewProduct)
                    setQuickViewProduct(null)
                  }}
                >
                  Add to Cart ›
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
              maxWidth: 420,
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
                borderBottom: '1px solid #e2e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#1e2a3c',
                color: '#ffffff',
              }}
            >
              <h3 style={{ margin: 0, fontSize: 18, fontWeight: 800 }}>Shopping Bag ({cartItemCount})</h3>
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
                <div style={{ textAlign: 'center', color: '#64748b', marginTop: 40 }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>👟</div>
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
                      borderBottom: '1px solid #e2e8f0',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: 64, height: 64, objectFit: 'contain', background: '#f8fafc', borderRadius: 8 }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#0f172a' }}>
                        {item.product.name}
                      </div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>
                        Size: {item.selectedSize}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#1e3a8a', marginTop: 4 }}>
                        {formatPrice(item.product.price)}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button
                        type="button"
                        style={{ width: 24, height: 24, borderRadius: 4, border: '1px solid #cbd5e1', cursor: 'pointer' }}
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                      >
                        -
                      </button>
                      <span style={{ fontSize: 13, fontWeight: 700 }}>{item.quantity}</span>
                      <button
                        type="button"
                        style={{ width: 24, height: 24, borderRadius: 4, border: '1px solid #cbd5e1', cursor: 'pointer' }}
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div style={{ padding: 24, borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontSize: 14, color: '#64748b' }}>Subtotal</span>
                <span style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>
                  {formatPrice(cartTotalINR)}
                </span>
              </div>
              <button
                type="button"
                className="swd-add-cart-btn"
                style={{ width: '100%', padding: '14px', fontSize: 14 }}
                onClick={() => {
                  showToast('Redirecting to secure Shopify Checkout...')
                  onUseTemplate?.('shoes-workdo')
                }}
              >
                Proceed to Checkout ›
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <StorefrontSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={[...SHOES_WORKDO_TODAY_DISCOUNTS, ...SHOES_WORKDO_BESTSELLERS, ...SHOES_WORKDO_RETRO_SHOES].map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category,
        }))}
        onSelectProduct={(p) => {
          const fullProd = [...SHOES_WORKDO_TODAY_DISCOUNTS, ...SHOES_WORKDO_BESTSELLERS, ...SHOES_WORKDO_RETRO_SHOES].find((x) => x.id === p.id)
          if (fullProd) {
            setSelectedProduct(fullProd)
            setViewMode('pdp')
            setIsSearchOpen(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }}
        accentColor={customAccentColor || '#f97316'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
        placeholder="Search running shoes, retro sneakers, football..."
        popularTags={['Running Shoes', 'Football', 'Sneakers', 'Walking']}
      />

      {/* Wishlist Drawer */}
      <StorefrontWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        allProducts={[...SHOES_WORKDO_TODAY_DISCOUNTS, ...SHOES_WORKDO_BESTSELLERS, ...SHOES_WORKDO_RETRO_SHOES].map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category,
        }))}
        onRemoveWishlist={toggleWishlist}
        onAddToCart={(p) => {
          const fullProd = [...SHOES_WORKDO_TODAY_DISCOUNTS, ...SHOES_WORKDO_BESTSELLERS, ...SHOES_WORKDO_RETRO_SHOES].find((x) => x.id === p.id)
          if (fullProd) handleAddToCart(fullProd, 8)
        }}
        onOpenProduct={(p) => {
          const fullProd = [...SHOES_WORKDO_TODAY_DISCOUNTS, ...SHOES_WORKDO_BESTSELLERS, ...SHOES_WORKDO_RETRO_SHOES].find((x) => x.id === p.id)
          if (fullProd) {
            setSelectedProduct(fullProd)
            setViewMode('pdp')
            setIsWishlistOpen(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }}
        accentColor={customAccentColor || '#f97316'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
      />

      {/* Account Modal */}
      <StorefrontAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        brandName="Shoes WorkDo"
        accentColor={customAccentColor || '#f97316'}
      />

      {/* Mobile Navigation Drawer */}
      <StorefrontMobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        brandName="Shoes WorkDo"
        navItems={navItems}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        cartCount={cartItemCount}
        contactPhone="+12 002-224-111"
        contactEmail="support@shoesworkdo.com"
        accentColor={customAccentColor || '#f97316'}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            backgroundColor: '#0f172a',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: 30,
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

export default ShoesWorkDoStorefront
