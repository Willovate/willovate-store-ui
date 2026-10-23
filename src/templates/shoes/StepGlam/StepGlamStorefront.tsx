import React, { useState, useEffect } from 'react'
import type {
  StepGlamProduct,
  StepGlamCartItem,
  StepGlamStorefrontProps,
} from './types'
import {
  STEPGLAM_CATEGORIES,
  STEPGLAM_ACCORDION_ITEMS,
  STEPGLAM_NEW_COLLECTIONS,
  STEPGLAM_BLOGS,
  STEPGLAM_INSTAGRAM_IMAGES,
} from './data/stepglamData'
import {
  StorefrontSearchModal,
  StorefrontWishlistDrawer,
  StorefrontAccountModal,
  StorefrontMobileNavDrawer,
  type MobileNavItem,
} from '../../../components/templates/StorefrontModals'
import { StorefrontProductDetailPage } from '../../../components/templates/StorefrontProductDetailPage'
import './styles/stepglam.css'

export const StepGlamStorefront: React.FC<StepGlamStorefrontProps> = ({
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
  const [selectedProduct, setSelectedProduct] = useState<StepGlamProduct | null>(null)
  const [currency, setCurrency] = useState<'INR' | 'USD'>('USD')
  const [activeCategoryTab, setActiveCategoryTab] = useState<'All' | 'Juttis' | 'Mojaris' | 'Flats' | 'Slip-Ons'>('All')
  const [openAccordionId, setOpenAccordionId] = useState<string>('acc-1')
  const [selectedSizes, setSelectedSizes] = useState<Record<string, number>>({
    'sg-prod-1': 7,
    'sg-prod-2': 7,
    'sg-prod-3': 8,
  })
  const [cartItems, setCartItems] = useState<StepGlamCartItem[]>([
    {
      product: STEPGLAM_NEW_COLLECTIONS[0],
      quantity: 1,
      selectedSize: 7,
    },
  ])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<StepGlamProduct | null>(null)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')

  // Live countdown timer
  const [countdown, setCountdown] = useState({ days: 2, hours: 14, mins: 35, secs: 50 })

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.secs > 0) return { ...prev, secs: prev.secs - 1 }
        if (prev.mins > 0) return { ...prev, mins: 59, secs: 59 }
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 }
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 }
        return prev
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const formatPrice = (inr: number) => {
    if (currency === 'USD') {
      const usd = Math.round(inr / 83)
      return `$${usd}.00`
    }
    return `Rs. ${inr.toLocaleString('en-IN')}.00`
  }

  const handleSizeSelect = (productId: string, size: number) => {
    setSelectedSizes((prev) => ({ ...prev, [productId]: size }))
  }

  const handleAddToCart = (product: StepGlamProduct, size?: number) => {
    const finalSize = size || selectedSizes[product.id] || 7
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
        .filter(Boolean) as StepGlamCartItem[]
    )
  }

  const cartTotalInr = cartItems.reduce(
    (sum, item) => sum + item.product.priceInr * item.quantity,
    0
  )
  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address.')
      return
    }
    showToast('🎉 Thank you for subscribing to StepGlam updates!')
    setNewsletterEmail('')
  }

  const filteredProducts =
    activeCategoryTab === 'All'
      ? STEPGLAM_NEW_COLLECTIONS
      : STEPGLAM_NEW_COLLECTIONS.filter((p) => p.category === activeCategoryTab)

  const navItems: MobileNavItem[] = [
    {
      label: 'Home',
      children: [
        { label: 'Home Default', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { label: 'Royal Heritage Drop', onClick: () => { const el = document.getElementById('sg-categories-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'New Handmade Arrivals', onClick: () => { const el = document.getElementById('sg-products-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Products',
      children: [
        { label: 'Handcrafted Juttis', onClick: () => { setActiveCategoryTab('Juttis'); const el = document.getElementById('sg-products-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Ethnic Mojaris', onClick: () => { setActiveCategoryTab('Mojaris'); const el = document.getElementById('sg-products-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Designer Flats', onClick: () => { setActiveCategoryTab('Flats'); const el = document.getElementById('sg-products-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Slip-On Comfort', onClick: () => { setActiveCategoryTab('Slip-Ons'); const el = document.getElementById('sg-products-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Shop All',
      children: [
        { label: 'Complete Collection 2026', onClick: () => { setActiveCategoryTab('All'); const el = document.getElementById('sg-products-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Best Sellers', onClick: () => { const el = document.getElementById('sg-bestsellers-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Limited Edition Drops', onClick: () => { const el = document.getElementById('sg-countdown-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Pages',
      children: [
        { label: 'Why Choose Us', onClick: () => { const el = document.getElementById('sg-why-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Size & Fit Guide', onClick: () => showToast('Size Guide: True to EU size, padded memory insole.') },
        { label: 'Customer Reviews', onClick: () => { const el = document.getElementById('sg-reviews-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'FAQs & Support', onClick: () => showToast('Support available 7 days a week: +2146414547') },
      ],
    },
    {
      label: 'Blogs',
      children: [
        { label: 'The Art of Jutti Making', onClick: () => showToast('Reading: The Art of Traditional Handcrafted Juttis') },
        { label: 'Wedding Styling Guide', onClick: () => showToast('Reading: 5 Ways to Style Ethnic Mojaris') },
        { label: 'Pure Leather Care Tips', onClick: () => showToast('Reading: How to Care for Hand-Embroidered Juttis') },
      ],
    },
  ]

  return (
    <div
      className={`sg-wrapper device-${effectiveDevice}`}
      style={customAccentColor ? ({ '--sg-accent': customAccentColor } as any) : undefined}
    >
      {/* Top Announcement Bar */}
      <div className="sg-topbar">
        <div className="sg-topbar-left">
          <span className="sg-topbar-link">📞 +2146414547</span>
          <span className="sg-topbar-link">✉ Support@gmail.com</span>
        </div>
        <div className="sg-topbar-right">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value as any)}
            className="sg-topbar-select"
          >
            <option value="USD">🇺🇸 USD</option>
            <option value="INR">🇮🇳 INR</option>
          </select>
          <select className="sg-topbar-select">
            <option>🇬🇧 English</option>
            <option>🇮🇳 Hindi</option>
          </select>
        </div>
      </div>

      {/* Main Header */}
      <header className="sg-header">
        <div className="sg-header-inner">
          {/* Mobile Hamburger Menu Button */}
          <button
            type="button"
            className="sg-hamburger-btn wv-mobile-hamburger-btn"
            onClick={() => setIsMobileNavOpen(true)}
            title="Menu"
            aria-label="Open mobile menu"
          >
            <span className="wv-mobile-hamburger-bar" />
            <span className="wv-mobile-hamburger-bar" />
            <span className="wv-mobile-hamburger-bar" />
          </button>

          {/* Desktop Nav with Dropdowns */}
          <nav className="sg-nav-left">
            {navItems.map((item) => (
              <div key={item.label} className="wv-nav-dropdown-wrap">
                <span
                  className="sg-nav-item"
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

          <div className="sg-logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span>Step</span>
            <span style={{ color: '#d946ef' }}>glam</span>
            <span className="sg-logo-sparkle">✦</span>
          </div>

          <div className="sg-actions-right">
            <button
              type="button"
              className="wv-mobile-action-btn sg-action-btn"
              onClick={() => setIsSearchOpen(true)}
              title="Search"
            >
              <span>🔍</span>
            </button>
            <button
              type="button"
              className="sg-action-btn sg-account-btn"
              onClick={() => setIsAccountOpen(true)}
              title="Account"
            >
              <span>👤</span>
            </button>
            <button
              type="button"
              className="wv-mobile-action-btn sg-action-btn"
              onClick={() => setIsWishlistOpen(true)}
              title="Wishlist"
              style={{ position: 'relative' }}
            >
              <span>{wishlist.length > 0 ? '❤️' : '🤍'}</span>
              {wishlist.length > 0 && (
                <span className="wv-mobile-badge-counter sg-badge">{wishlist.length}</span>
              )}
            </button>
            <button
              type="button"
              className="wv-mobile-action-btn sg-action-btn"
              onClick={() => setIsCartOpen(true)}
              title="Bag"
              style={{ position: 'relative' }}
            >
              <span>🛍️</span>
              {cartItemCount > 0 && (
                <span className="wv-mobile-badge-counter sg-badge">{cartItemCount}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      {viewMode === 'pdp' && selectedProduct ? (
        <StorefrontProductDetailPage
          product={{
            id: selectedProduct.id,
            name: selectedProduct.name,
            price: selectedProduct.priceInr,
            originalPrice: selectedProduct.originalPriceInr,
            image: selectedProduct.image,
            description: selectedProduct.description,
            category: selectedProduct.category,
            rating: 4.9,
            reviewsCount: 42,
            inStock: true,
            sku: `SG-${selectedProduct.id.toUpperCase()}`,
            gallery: [selectedProduct.image],
            colors: ['#4a044e', '#f472b6', '#fef08a'],
            sizes: selectedProduct.availableSizes?.map(String) || ['6', '7', '8', '9'],
            specs: {
              Embroidery: 'Handcrafted Zardozi & Threadwork',
              Lining: 'Pure Vegetable Tanned Leather',
              Insole: 'Triple Layered Dual-Density Foam',
              Sole: 'Anti-Slip Genuine Buffalo Leather',
            },
            features: [
              'Zero-bite design with cushioned heel padding',
              'Artisan hand-embroidered by master craftsmen',
              'Breathable leather sole molds to the feet',
              'Includes bespoke satin travel pouch',
            ],
          }}
          brandName="StepGlam"
          accentColor={customAccentColor || '#4a044e'}
          currencyPrefix={currency === 'INR' ? '₹' : '$'}
          formatPrice={(p) => formatPrice(p)}
          relatedProducts={STEPGLAM_NEW_COLLECTIONS
            .filter((p) => p.id !== selectedProduct.id)
            .slice(0, 4)
            .map((p) => ({
              id: p.id,
              name: p.name,
              price: p.priceInr,
              originalPrice: p.originalPriceInr,
              image: p.image,
              category: p.category,
              rating: 4.8,
            }))}
          onBack={() => {
            setViewMode('home')
            setSelectedProduct(null)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
          onAddToCart={(_prod, _col, sz, qty) => {
            for (let i = 0; i < (qty || 1); i++) {
              handleAddToCart(selectedProduct, sz ? Number(sz) : 7)
            }
          }}
          onBuyNow={(_prod, _col, sz, qty) => {
            for (let i = 0; i < (qty || 1); i++) {
              handleAddToCart(selectedProduct, sz ? Number(sz) : 7)
            }
            setIsCartOpen(true)
            showToast('Instant checkout initiated!')
          }}
          onToggleWishlist={(id) => toggleWishlist(id)}
          isWishlisted={wishlist.includes(selectedProduct.id)}
        />
      ) : (
        <>
          {/* Hero Section */}
          <section className="sg-hero">
        <div className="sg-hero-left">
          <div>
            <h1 className="sg-hero-title">
              A New Generation Of <span className="sg-hero-juttis-pill">Juttis</span> Ingredients
            </h1>
            <p className="sg-hero-desc">
              Step into elegance with our handcrafted juttis, perfect for any occasion.
            </p>
            <button
              type="button"
              className="sg-btn-plum"
              onClick={() => {
                const el = document.getElementById('sg-products-section')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Shop Now
            </button>
          </div>

          <div className="sg-hero-thumb-wrap">
            <img
              src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=600&q=80"
              alt="Purple embroidered juttis"
            />
          </div>
        </div>

        <div className="sg-hero-center">
          <img
            src="https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=800&q=80"
            alt="Pink mirror work bridal juttis"
          />
        </div>

        <div className="sg-hero-right">
          <div className="sg-hero-right-top">
            <img
              src="https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=600&q=80"
              alt="Gold zardozi juttis"
            />
          </div>

          <div className="sg-hero-badge-card">
            <div>
              <div className="sg-badge-disc">
                25 <span>% OFF</span>
              </div>
              <div className="sg-badge-sub">Our All New Arrivals</div>
            </div>
            <div className="sg-stamp-circle">
              EXPLORE MORE • JUTTIS
            </div>
          </div>
        </div>
      </section>

      {/* Browse Our Modern Categories */}
      <section id="sg-categories-section" className="sg-section">
        <div className="sg-header-centered">
          <h2 className="sg-section-title">Browse Our Modern Categories</h2>
          <p className="sg-section-desc">
            Step into pure elegance and comfortable artisanal craftsmanship designed for celebrations.
          </p>

          <div className="sg-cat-pills-row">
            {(['All', 'Juttis', 'Mojaris', 'Flats', 'Slip-Ons'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                className={`sg-cat-pill-btn ${activeCategoryTab === tab ? 'active' : ''}`}
                onClick={() => setActiveCategoryTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="sg-arch-grid">
          {STEPGLAM_CATEGORIES.map((cat, idx) => (
            <div key={cat.id} className="sg-arch-card">
              <img
                src={cat.image}
                alt={cat.title}
                className="sg-arch-thumb"
              />
              <div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#9333ea', textTransform: 'uppercase' }}>
                  {idx === 0 ? 'Handmade' : idx === 1 ? 'Royal Heritage' : 'Summer Drop'}
                </span>
                <h3 style={{ fontSize: 22, fontWeight: 800, color: '#2e0929', margin: '6px 0 10px' }}>
                  {cat.title}
                </h3>
                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, marginBottom: 16 }}>
                  {cat.subtitle}
                </p>
                <button
                  type="button"
                  className="sg-btn-plum"
                  style={{ padding: '8px 20px', fontSize: 12 }}
                  onClick={() => {
                    const tabName = idx === 0 ? 'Juttis' : idx === 1 ? 'Mojaris' : 'Flats'
                    setActiveCategoryTab(tabName)
                    showToast(`Filtered by ${tabName}!`)
                  }}
                >
                  Explore Category
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Marquee Ribbon */}
      <div className="sg-marquee-ribbon">
        <div className="sg-marquee-track">
          ✦ HANDCRAFTED JUTTIS ✦ ETHNIC MOJARIS ✦ PREMIUM LEATHER ✦ ARTISANAL COMFORT ✦ 100% PURE EMBROIDERY
          &nbsp;&nbsp;&nbsp;&nbsp;✦ HANDCRAFTED JUTTIS ✦ ETHNIC MOJARIS ✦ PREMIUM LEATHER ✦ ARTISANAL COMFORT ✦ 100% PURE EMBROIDERY
        </div>
      </div>

      {/* Why Choose Us (Accordion) */}
      <section className="sg-plum-section">
        <div className="sg-plum-inner">
          <div>
            <h2 style={{ fontSize: 36, fontWeight: 800, marginBottom: 12 }}>Why Choose Us</h2>
            <p style={{ fontSize: 14, color: '#fce7f3', lineHeight: 1.6, marginBottom: 28 }}>
              Discover the art of traditional Indian craftsmanship combined with world-class memory
              foam ergonomics.
            </p>

            <div className="sg-accordion-list">
              {STEPGLAM_ACCORDION_ITEMS.map((item) => (
                <div key={item.id} className="sg-accordion-item">
                  <div
                    className="sg-accordion-header"
                    onClick={() =>
                      setOpenAccordionId(openAccordionId === item.id ? '' : item.id)
                    }
                  >
                    <div className="sg-accordion-num-title">
                      <span className="sg-accordion-num">{item.number}.</span>
                      <span>{item.title}</span>
                    </div>
                    <span>{openAccordionId === item.id ? '−' : '+'}</span>
                  </div>
                  {openAccordionId === item.id && (
                    <div className="sg-accordion-desc">{item.description}</div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="sg-arch-photo-duo">
            <img
              src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80"
              alt="Jutti detail 1"
              className="sg-arch-photo"
            />
            <img
              src="https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=400&q=80"
              alt="Jutti detail 2"
              className="sg-arch-photo"
              style={{ marginTop: 32 }}
            />
          </div>
        </div>
      </section>

      {/* Explore Our New Collections */}
      <section id="sg-products-section" className="sg-section">
        <div id="sg-bestsellers-section"></div>
        <div className="sg-header-centered">
          <h2 className="sg-section-title">Explore Our New Collections</h2>
          <p className="sg-section-desc">
            Handpicked bestsellers crafted in small batches to preserve exclusive design details.
          </p>
        </div>

        <div className="sg-products-grid">
          {filteredProducts.map((prod) => (
            <div key={prod.id} className="sg-product-card">
              {prod.badge && <span className="sg-badge-pill">{prod.badge}</span>}

              {/* Wishlist Like Button */}
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

              <div
                className="sg-prod-img-box"
                onClick={() => setQuickViewProduct(prod)}
                style={{ cursor: 'pointer' }}
              >
                <img src={prod.image} alt={prod.name} />
              </div>

              <div className="sg-prod-name">{prod.name}</div>
              <div className="sg-prod-price-row">
                <span className="sg-price-inr">{formatPrice(prod.priceInr)}</span>
                {prod.originalPriceInr && (
                  <span className="sg-compare-inr">{formatPrice(prod.originalPriceInr)}</span>
                )}
              </div>

              {/* Direct Size Selectors on Card */}
              <div className="sg-sizes-row">
                <span className="sg-size-label">Size:</span>
                {prod.availableSizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    className={`sg-size-btn ${selectedSizes[prod.id] === sz ? 'active' : ''}`}
                    onClick={() => handleSizeSelect(prod.id, sz)}
                  >
                    {sz}
                  </button>
                ))}
              </div>

              <div className="sg-card-actions" style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
                <button
                  type="button"
                  className="sg-add-btn"
                  style={{ flex: 1, margin: 0 }}
                  onClick={() => handleAddToCart(prod)}
                >
                  <span>Add To Bag</span>
                  <span>🛍️</span>
                </button>
                <button
                  type="button"
                  className="sg-view-btn"
                  title="View Details"
                  onClick={() => setQuickViewProduct(prod)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    border: '1px solid #e5e7eb',
                    backgroundColor: '#ffffff',
                    color: '#1f2937',
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
      </section>

      {/* Live Countdown Flash Promo */}
      <div className="sg-section" style={{ paddingTop: 0 }}>
        <div className="sg-countdown-card">
          <div>
            <span style={{ fontSize: 12, fontWeight: 800, color: '#581d4e', textTransform: 'uppercase', letterSpacing: 1 }}>
              Special Festive Deal
            </span>
            <h3 style={{ fontSize: 32, fontWeight: 800, color: '#2e0929', margin: '8px 0 12px' }}>
              Special Summer Offer Just for You
            </h3>
            <p style={{ fontSize: 14, color: '#6b7280', lineHeight: 1.6 }}>
              Get flat 25% off on all bridal collection juttis. Hand-embroidered resham and zardozi
              with complimentary matching potli bag.
            </p>

            <div className="sg-timer-boxes">
              <div className="sg-timer-box">
                <div className="sg-timer-num">{countdown.days}</div>
                <div className="sg-timer-unit">Days</div>
              </div>
              <div className="sg-timer-box">
                <div className="sg-timer-num">{countdown.hours}</div>
                <div className="sg-timer-unit">Hours</div>
              </div>
              <div className="sg-timer-box">
                <div className="sg-timer-num">{countdown.mins}</div>
                <div className="sg-timer-unit">Mins</div>
              </div>
              <div className="sg-timer-box">
                <div className="sg-timer-num">{countdown.secs}</div>
                <div className="sg-timer-unit">Secs</div>
              </div>
            </div>

            <button
              type="button"
              className="sg-btn-plum"
              onClick={() => showToast('Coupon code STEPGLAM25 activated!')}
            >
              ✦ Grab Offer Now
            </button>
          </div>

          <div className="sg-countdown-images" style={{ display: 'flex', gap: 16, justifyContent: 'center' }}>
            <img
              src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=320&q=80"
              alt="Deal shoe 1"
              className="sg-deal-img"
              style={{ width: '48%', height: 260, objectFit: 'cover', borderRadius: 9999 }}
            />
            <img
              src="https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&w=320&q=80"
              alt="Deal shoe 2"
              className="sg-deal-img"
              style={{ width: '48%', height: 260, objectFit: 'cover', borderRadius: 9999, marginTop: 24 }}
            />
          </div>
        </div>
      </div>

      {/* Customer Story */}
      <section className="sg-story-section sg-section" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #f3e8f0' }}>
        <div className="sg-story-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 40, alignItems: 'center' }}>
          <div className="sg-story-images" style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <img
              src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=200&q=80"
              alt="Customer Shoe"
              style={{ width: 140, height: 140, borderRadius: '50%', objectFit: 'cover' }}
            />
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
              alt="Customer portrait"
              style={{ width: 180, height: 220, borderRadius: 16, objectFit: 'cover' }}
            />
          </div>

          <div className="sg-story-content">
            <div style={{ fontSize: 16, color: '#f59e0b', marginBottom: 8 }}>★★★★★</div>
            <h3 style={{ fontSize: 26, fontWeight: 800, color: '#2e0929', marginBottom: 12 }}>
              My Story With StepGlam
            </h3>
            <p style={{ fontSize: 15, color: '#4b5563', lineHeight: 1.6, fontStyle: 'italic', marginBottom: 16 }}>
              "The embroidery and velvet lining are unmatched. Wore them to a 3-day wedding without a
              single blister! Everyone asked where I got them from."
            </p>
            <div style={{ fontSize: 14, fontWeight: 800, color: '#581d4e' }}>
              Ayesha Kapoor, Fashion Stylist
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="sg-section" style={{ paddingTop: 0 }}>
        <div className="sg-trust-strip">
          <div className="sg-trust-badge">
            <span className="sg-trust-icon">💖</span>
            <span className="sg-trust-text">Handmade with Love</span>
          </div>
          <div className="sg-trust-badge">
            <span className="sg-trust-icon">🌿</span>
            <span className="sg-trust-text">100% Genuine Leather</span>
          </div>
          <div className="sg-trust-badge">
            <span className="sg-trust-icon">👑</span>
            <span className="sg-trust-text">Custom Bridal Fitting</span>
          </div>
          <div className="sg-trust-badge">
            <span className="sg-trust-icon">✈️</span>
            <span className="sg-trust-text">Worldwide Express</span>
          </div>
        </div>
      </section>

      {/* Latest Blog */}
      <section className="sg-section" style={{ backgroundColor: '#fcf8fb' }}>
        <div className="sg-header-centered">
          <h2 className="sg-section-title">Our Latest Blog</h2>
          <p className="sg-section-desc">
            Tips, style guides, and care routines for artisanal handcrafted ethnic footwear.
          </p>
        </div>

        <div className="sg-blogs-grid">
          {STEPGLAM_BLOGS.map((b) => (
            <div key={b.id} className="sg-product-card sg-blog-card">
              <img
                src={b.image}
                alt={b.title}
                className="sg-blog-img"
                style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 12, marginBottom: 14 }}
              />
              <span className="sg-blog-meta" style={{ fontSize: 11, fontWeight: 700, color: '#581d4e' }}>
                {b.category} • {b.date}
              </span>
              <h4 className="sg-blog-title" style={{ fontSize: 17, fontWeight: 800, color: '#2e0929', margin: '8px 0' }}>
                {b.title}
              </h4>
              <p className="sg-blog-excerpt" style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, marginBottom: 16 }}>
                {b.excerpt}
              </p>
              <button
                type="button"
                className="sg-btn-plum sg-blog-btn"
                style={{ padding: '6px 18px', fontSize: 11 }}
                onClick={() => showToast(`Reading "${b.title}"...`)}
              >
                Read Article
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Instagram Polaroid Strip */}
      <section className="sg-section">
        <div className="sg-header-centered" style={{ marginBottom: 16 }}>
          <h2 className="sg-section-title">@stepglam_footwear</h2>
          <p className="sg-section-desc">Tag your celebrations with #StepGlamRoyalty on Instagram</p>
        </div>

        <div className="sg-insta-strip">
          {STEPGLAM_INSTAGRAM_IMAGES.map((img, i) => (
            <div key={i} className="sg-insta-item">
              <img src={img} alt={`Insta ${i}`} />
            </div>
          ))}
        </div>
      </section>
        </>
      )}

      {/* Footer */}
      <footer className="sg-footer">
        <div className="sg-footer-inner">
          <div className="sg-footer-col">
            <div className="sg-logo" style={{ color: '#ffffff', marginBottom: 12 }}>
              <span>Step</span>
              <span style={{ color: '#f472b6' }}>glam</span>
              <span className="sg-logo-sparkle">✦</span>
            </div>
            <p style={{ fontSize: 13, color: '#fce7f3', lineHeight: 1.6, maxWidth: 320 }}>
              StepGlam celebrates the rich tradition of Indian handcrafted juttis and mojaris,
              infused with modern comfort ergonomics for the modern queen.
            </p>
          </div>

          <div className="sg-footer-col">
            <h4>Information</h4>
            <ul>
              <li onClick={() => showToast('Home')}>Home</li>
              <li onClick={() => showToast('About Us')}>About Us</li>
              <li onClick={() => showToast('FAQs')}>FAQs</li>
              <li onClick={() => showToast('Privacy Policy')}>Privacy Policy</li>
              <li onClick={() => showToast('Terms & Conditions')}>Terms &amp; Conditions</li>
            </ul>
          </div>

          <div className="sg-footer-col">
            <h4>Customer Care</h4>
            <ul>
              <li onClick={() => showToast('Order Status')}>Order Status</li>
              <li onClick={() => showToast('Size Guide')}>Size Guide</li>
              <li onClick={() => showToast('Shipping Info')}>Shipping Info</li>
              <li onClick={() => showToast('Returns')}>Returns</li>
              <li onClick={() => showToast('Track Order')}>Track Order</li>
            </ul>
          </div>

          <div className="sg-footer-col">
            <h4>Contact Us</h4>
            <ul>
              <li>📍 100 Royal Heritage Walk, Delhi</li>
              <li>📞 +2146414547</li>
              <li>✉ Support@gmail.com</li>
            </ul>

            <form onSubmit={handleNewsletterSubmit} className="sg-newsletter-form">
              <input
                type="email"
                placeholder="Enter email..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="sg-newsletter-input"
              />
              <button type="submit" className="sg-newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div
          className="sg-footer-bottom"
          style={{
            maxWidth: 1440,
            margin: '0 auto',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            paddingTop: 24,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: 12,
            color: '#fce7f3',
          }}
        >
          <div>© 2024, StepGlam Powered by Shopify</div>
          <div className="sg-footer-payments" style={{ display: 'flex', gap: 10, fontSize: 16 }}>
            <span>💳 Visa</span>
            <span>Mastercard</span>
            <span>Amex</span>
            <span>PayPal</span>
            <span>UPI</span>
          </div>
        </div>
      </footer>

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
            <div style={{ padding: 24, background: '#fdf4fa', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{ maxWidth: '100%', maxHeight: 260, objectFit: 'cover', borderRadius: 12 }}
              />
            </div>
            <div style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#581d4e', textTransform: 'uppercase' }}>
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

                <h3 style={{ fontSize: 20, fontWeight: 800, margin: '8px 0', color: '#2e0929' }}>
                  {quickViewProduct.name}
                </h3>
                <div style={{ fontSize: 18, fontWeight: 800, color: '#581d4e', marginBottom: 12 }}>
                  {formatPrice(quickViewProduct.priceInr)}
                </div>
                <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5, marginBottom: 16 }}>
                  {quickViewProduct.description}
                </p>

                <div style={{ marginBottom: 16 }}>
                  <label style={{ fontSize: 12, fontWeight: 700, color: '#374151', display: 'block', marginBottom: 6 }}>
                    Select Size:
                  </label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {quickViewProduct.availableSizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        className={`sg-size-btn ${selectedSizes[quickViewProduct.id] === sz ? 'active' : ''}`}
                        onClick={() => handleSizeSelect(quickViewProduct.id, sz)}
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
                <div style={{ display: 'flex', gap: 10 }}>
                  <button
                    type="button"
                    className="sg-btn-plum"
                    style={{ flex: 1, textAlign: 'center' }}
                    onClick={() => {
                      handleAddToCart(quickViewProduct)
                      setQuickViewProduct(null)
                    }}
                  >
                    Add To Bag 🛍️
                  </button>
                  <button
                    type="button"
                    style={{
                      padding: '10px 14px',
                      border: '1px solid #e5e7eb',
                      borderRadius: 9999,
                      background: '#fff',
                      cursor: 'pointer',
                    }}
                    onClick={() => toggleWishlist(quickViewProduct.id)}
                  >
                    {wishlist.includes(quickViewProduct.id) ? '❤️' : '🤍'}
                  </button>
                </div>
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
                padding: '20px 24px',
                borderBottom: '1px solid #f3e8f0',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#581d4e',
                color: '#ffffff',
              }}
            >
              <h3 style={{ margin: 0, fontSize: 16, fontWeight: 800 }}>My Bag ({cartItemCount})</h3>
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
                <div style={{ textAlign: 'center', color: '#6b7280', marginTop: 40 }}>
                  <div style={{ fontSize: 44, marginBottom: 12 }}>👡</div>
                  <p>Your bag is empty.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.selectedSize}`}
                    style={{
                      display: 'flex',
                      gap: 14,
                      paddingBottom: 16,
                      borderBottom: '1px solid #f3e8f0',
                      alignItems: 'center',
                    }}
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 8 }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#2e0929' }}>
                        {item.product.name}
                      </div>
                      <div style={{ fontSize: 11, color: '#6b7280' }}>
                        Size: {item.selectedSize}
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#581d4e', marginTop: 4 }}>
                        {formatPrice(item.product.priceInr)}
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <button
                        type="button"
                        style={{ width: 24, height: 24, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', borderRadius: 4 }}
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, -1)}
                      >
                        -
                      </button>
                      <span style={{ fontSize: 12, fontWeight: 700 }}>{item.quantity}</span>
                      <button
                        type="button"
                        style={{ width: 24, height: 24, border: '1px solid #e5e7eb', background: '#fff', cursor: 'pointer', borderRadius: 4 }}
                        onClick={() => updateQuantity(item.product.id, item.selectedSize, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div style={{ padding: 24, borderTop: '1px solid #f3e8f0', backgroundColor: '#fdfbfd' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                <span style={{ fontSize: 13, color: '#6b7280' }}>Subtotal</span>
                <span style={{ fontSize: 16, fontWeight: 800, color: '#2e0929' }}>
                  {formatPrice(cartTotalInr)}
                </span>
              </div>
              <button
                type="button"
                className="sg-btn-plum"
                style={{ width: '100%', textAlign: 'center' }}
                onClick={() => {
                  showToast('Redirecting to checkout...')
                  onUseTemplate?.('shoes-stepglam')
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <StorefrontSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={STEPGLAM_NEW_COLLECTIONS.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.priceInr,
          originalPrice: p.originalPriceInr,
          image: p.image,
          category: p.category,
        }))}
        onSelectProduct={(p) => {
          const fullProd = STEPGLAM_NEW_COLLECTIONS.find((x) => x.id === p.id)
          if (fullProd) {
            setSelectedProduct(fullProd)
            setViewMode('pdp')
            setIsSearchOpen(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }}
        accentColor={customAccentColor || '#d946ef'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
        placeholder="Search handcrafted juttis, mojaris, flats..."
        popularTags={['Juttis', 'Mojaris', 'Flats', 'Slip-Ons']}
      />

      {/* Wishlist Slide-Over Drawer */}
      <StorefrontWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        allProducts={STEPGLAM_NEW_COLLECTIONS.map((p) => ({
          id: p.id,
          name: p.name,
          price: p.priceInr,
          originalPrice: p.originalPriceInr,
          image: p.image,
          category: p.category,
        }))}
        onRemoveWishlist={toggleWishlist}
        onAddToCart={(p) => {
          const fullProd = STEPGLAM_NEW_COLLECTIONS.find((x) => x.id === p.id)
          if (fullProd) handleAddToCart(fullProd)
        }}
        onOpenProduct={(p) => {
          const fullProd = STEPGLAM_NEW_COLLECTIONS.find((x) => x.id === p.id)
          if (fullProd) {
            setSelectedProduct(fullProd)
            setViewMode('pdp')
            setIsWishlistOpen(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }}
        accentColor={customAccentColor || '#d946ef'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
      />

      {/* Account Modal */}
      <StorefrontAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        brandName="StepGlam"
        accentColor={customAccentColor || '#d946ef'}
      />

      {/* Mobile Navigation Drawer */}
      <StorefrontMobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        brandName="StepGlam"
        navItems={navItems}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        cartCount={cartItemCount}
        contactPhone="+2146414547"
        contactEmail="Support@gmail.com"
        accentColor={customAccentColor || '#d946ef'}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            bottom: 24,
            right: 24,
            backgroundColor: '#581d4e',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: 9999,
            fontSize: 13,
            fontWeight: 700,
            boxShadow: '0 8px 24px rgba(88,29,78,0.3)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span>✦</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}

export default StepGlamStorefront
