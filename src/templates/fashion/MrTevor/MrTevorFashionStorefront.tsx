import React, { useState, useMemo } from 'react'
import {
  MR_TEVOR_LOGO_URL,
  MR_TEVOR_PRODUCTS,
  MR_TEVOR_HERO_SLIDES,
  MR_TEVOR_VALUE_PILLARS,
  MR_TEVOR_TESTIMONIALS,
  MR_TEVOR_LAPEL_GUIDE,
} from './data/mrTevorData'
import type {
  MrTevorProduct,
  MrTevorCartItem,
  MrTevorFilterState,
  SuitingCollection,
  LapelStyle,
  FitStyle,
  SuitingMaterial,
  MrTevorStorefrontProps,
  BespokeFittingForm,
} from './types'
import './styles/mrTevorFashion.css'

export const MrTevorFashionStorefront: React.FC<MrTevorStorefrontProps> = ({
  onBackToDirectory,
  onSelectProduct,
  device = 'desktop',
  deviceView,
}) => {
  const effectiveDevice = deviceView || device || 'desktop'
  const isMobile = effectiveDevice === 'mobile'
  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'storefront' | 'pdp' | 'tailor-guide'>('storefront')
  const [selectedProduct, setSelectedProduct] = useState<MrTevorProduct | null>(null)
  const [quickViewProduct, setQuickViewProduct] = useState<MrTevorProduct | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isBookingOpen, setIsBookingOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)

  // Cart & Wishlist State
  const [cart, setCart] = useState<MrTevorCartItem[]>([
    {
      product: MR_TEVOR_PRODUCTS[0],
      selectedSize: '40R',
      selectedColor: 'Midnight Jacquard',
      quantity: 1,
    },
  ])
  const [wishlist, setWishlist] = useState<string[]>(['mt-01', 'mt-08'])

  // Filter & Search State
  const [filterState, setFilterState] = useState<MrTevorFilterState>({
    collection: 'All',
    fit: 'All',
    lapel: 'All',
    material: 'All',
    searchQuery: '',
    sortBy: 'featured',
    maxPrice: 250,
  })

  // Bespoke Measurement Builder State
  const [bespokeModelId, setBespokeModelId] = useState<string>('mt-01')
  const [bespokeChest, setBespokeChest] = useState<number>(40)
  const [bespokeShoulder, setBespokeShoulder] = useState<number>(18.5)
  const [bespokeSleeve, setBespokeSleeve] = useState<number>(25.5)
  const [bespokeWaist, setBespokeWaist] = useState<number>(34)
  const [bespokeLining, setBespokeLining] = useState<string>('Royal Indigo Cupro Jacquard')
  const [bespokeMonogram, setBespokeMonogram] = useState<string>('M.T.')

  // Booking Form State
  const [bookingForm, setBookingForm] = useState<BespokeFittingForm>({
    fullName: '',
    email: '',
    phone: '',
    city: 'London',
    preferredDate: '',
    suitType: 'Double Breasted Obsidian Tuxedo',
    chestSize: 40,
    shoulderWidth: 18.5,
    sleeveLength: 25.5,
    waistSize: 34,
    fittingNotes: '',
  })
  const [bookingSubmitted, setBookingSubmitted] = useState(false)

  // PDP Configuration State
  const [pdpSelectedSize, setPdpSelectedSize] = useState<string>('40R')
  const [pdpSelectedColor, setPdpSelectedColor] = useState<string>('')
  const [pdpQuantity, setPdpQuantity] = useState<number>(1)
  const [pdpActiveImage, setPdpActiveImage] = useState<string>('')

  // Computed Products
  const filteredProducts = useMemo(() => {
    return MR_TEVOR_PRODUCTS.filter((prod) => {
      // Collection Filter
      if (filterState.collection !== 'All') {
        if (!prod.collections.includes(filterState.collection as SuitingCollection)) {
          return false
        }
      }
      // Fit Filter
      if (filterState.fit !== 'All' && prod.fit !== filterState.fit) {
        return false
      }
      // Lapel Filter
      if (filterState.lapel !== 'All' && prod.lapel !== filterState.lapel) {
        return false
      }
      // Material Filter
      if (filterState.material !== 'All' && prod.material !== filterState.material) {
        return false
      }
      // Price Filter
      if (prod.price > filterState.maxPrice) {
        return false
      }
      // Search Filter
      if (filterState.searchQuery.trim()) {
        const query = filterState.searchQuery.toLowerCase()
        const matchTitle = prod.title.toLowerCase().includes(query)
        const matchSub = prod.subtitle.toLowerCase().includes(query)
        const matchMat = prod.material.toLowerCase().includes(query)
        const matchLap = prod.lapel.toLowerCase().includes(query)
        if (!matchTitle && !matchSub && !matchMat && !matchLap) {
          return false
        }
      }
      return true
    }).sort((a, b) => {
      if (filterState.sortBy === 'price-asc') return a.price - b.price
      if (filterState.sortBy === 'price-desc') return b.price - a.price
      if (filterState.sortBy === 'rating') return b.rating - a.rating
      return 0
    })
  }, [filterState])

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  }, [cart])
  const cartTotalItems = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0)
  }, [cart])

  // Cart Handlers
  const handleAddToCart = (
    product: MrTevorProduct,
    size = '40R',
    color = product.colors[0]?.name || '',
    customMeasurements?: { chest: number; shoulder: number; sleeve: number; waist: number }
  ) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color &&
          !item.customMeasurements
      )
      if (existingIndex > -1 && !customMeasurements) {
        const updated = [...prev]
        updated[existingIndex].quantity += 1
        return updated
      }
      return [
        ...prev,
        {
          product,
          selectedSize: size,
          selectedColor: color,
          quantity: 1,
          customMeasurements,
        },
      ]
    })
    setIsCartOpen(true)
  }

  const handleUpdateQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      setCart((prev) => prev.filter((_, i) => i !== index))
    } else {
      setCart((prev) => {
        const updated = [...prev]
        updated[index].quantity = newQty
        return updated
      })
    }
  }

  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  const handleOpenPDP = (product: MrTevorProduct) => {
    setSelectedProduct(product)
    setPdpSelectedSize(product.sizes[0] || '40R')
    setPdpSelectedColor(product.colors[0]?.name || '')
    setPdpActiveImage(product.image)
    setPdpQuantity(1)
    setActiveTab('pdp')
    if (onSelectProduct) onSelectProduct(product)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleAddBespokeCustomSuit = () => {
    const model = MR_TEVOR_PRODUCTS.find((p) => p.id === bespokeModelId) || MR_TEVOR_PRODUCTS[0]
    handleAddToCart(model, 'Custom Bespoke', bespokeLining, {
      chest: bespokeChest,
      shoulder: bespokeShoulder,
      sleeve: bespokeSleeve,
      waist: bespokeWaist,
    })
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setBookingSubmitted(true)
    setTimeout(() => {
      setIsBookingOpen(false)
      setBookingSubmitted(false)
    }, 2500)
  }

  const currentHeroSlide = MR_TEVOR_HERO_SLIDES[currentSlideIndex]

  return (
    <div className={`mr-tevor-storefront ${isMobile ? 'mr-tevor-mobile device-mobile is-mobile' : `device-${effectiveDevice}`}`}>
      {/* Top Announcement Bar */}
      <div className="mt-announcement-bar">
        <div className="mt-announcement-content">
          <span className="mt-announcement-pill">Savile Row Heritage</span>
          <span>Complimentary Insured Worldwide Courier & Bespoke Garment Carrier with Heirloom Cedar Hanger</span>
        </div>
        <div className="mt-announcement-tools">
          <span>GBP (£) / USD ($)</span>
          <span>Valet Concierge: +44 (0)20 7946 0912</span>
        </div>
      </div>

      {/* Main Header */}
      <header className="mt-header">
        <div className="mt-header-inner">
          <div
            className="mt-brand"
            onClick={() => {
              setActiveTab('storefront')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <img src={MR_TEVOR_LOGO_URL} alt="Mr-Tevor Logo" className="mt-brand-logo-img" />
            <div className="mt-brand-text">
              <span className="mt-brand-name">MR-TEVOR</span>
              <span className="mt-brand-tagline">Haute Sartorial Suiting</span>
            </div>
          </div>

          <nav className="mt-nav">
            <span
              className={`mt-nav-link ${activeTab === 'storefront' && filterState.collection === 'All' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('storefront')
                setFilterState((prev) => ({ ...prev, collection: 'All' }))
              }}
            >
              Atelier Home
            </span>
            <span
              className={`mt-nav-link ${filterState.collection === 'Best Sellers' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('storefront')
                setFilterState((prev) => ({ ...prev, collection: 'Best Sellers' }))
                const el = document.getElementById('mt-catalog-view')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Best Sellers
              <span className="mt-nav-badge">Iconic</span>
            </span>
            <span
              className={`mt-nav-link ${filterState.collection === 'Lastest Arrivals' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('storefront')
                setFilterState((prev) => ({ ...prev, collection: 'Lastest Arrivals' }))
                const el = document.getElementById('mt-catalog-view')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Lastest Arrivals
            </span>
            <span
              className="mt-nav-link"
              onClick={() => {
                setActiveTab('storefront')
                const el = document.getElementById('mt-lapel-guide')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Lapel Guide
            </span>
            <span
              className="mt-nav-link"
              onClick={() => {
                setActiveTab('storefront')
                const el = document.getElementById('mt-customizer-section')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Bespoke Fitting
            </span>
            <span
              className={`mt-nav-link ${filterState.collection === 'Hot Deals' ? 'active' : ''}`}
              onClick={() => {
                setActiveTab('storefront')
                setFilterState((prev) => ({ ...prev, collection: 'Hot Deals' }))
                const el = document.getElementById('mt-catalog-view')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              Hot Deals
            </span>
          </nav>

          <div className="mt-header-actions">
            {onBackToDirectory && (
              <button
                className="mt-icon-btn"
                title="Return to Templates Directory"
                onClick={onBackToDirectory}
              >
                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
              </button>
            )}

            <button
              className="mt-icon-btn"
              title="Saved Suits Wishlist"
              onClick={() => {
                setFilterState((prev) => ({ ...prev, collection: 'All' }))
                setActiveTab('storefront')
              }}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {wishlist.length > 0 && <span className="mt-badge-counter">{wishlist.length}</span>}
            </button>

            <button
              className="mt-icon-btn"
              title="View Suit Garment Bag"
              onClick={() => setIsCartOpen(true)}
            >
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartTotalItems > 0 && <span className="mt-badge-counter">{cartTotalItems}</span>}
            </button>

            <button
              className="mt-bespoke-cta-btn"
              onClick={() => setIsBookingOpen(true)}
            >
              <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Book Tailor</span>
            </button>

            <button
              className="mt-mobile-menu-toggle"
              aria-label="Open Navigation Menu"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Luxury Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="mt-mobile-drawer-overlay" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="mt-mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mt-mobile-drawer-header">
              <div
                className="mt-brand"
                onClick={() => {
                  setActiveTab('storefront')
                  setIsMobileMenuOpen(false)
                }}
              >
                <img src={MR_TEVOR_LOGO_URL} alt="Mr-Tevor Logo" className="mt-brand-logo-img" style={{ height: '32px' }} />
                <div className="mt-brand-text">
                  <span className="mt-brand-name" style={{ fontSize: '1.2rem' }}>MR-TEVOR</span>
                  <span className="mt-brand-tagline">Haute Sartorial Suiting</span>
                </div>
              </div>
              <button
                className="mt-mobile-drawer-close"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close Navigation"
              >
                ✕
              </button>
            </div>

            <nav className="mt-mobile-nav">
              <button
                className={`mt-mobile-nav-link ${activeTab === 'storefront' && filterState.collection === 'All' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('storefront')
                  setFilterState((prev) => ({ ...prev, collection: 'All' }))
                  setIsMobileMenuOpen(false)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <span>Atelier Home</span>
                <span>→</span>
              </button>
              <button
                className={`mt-mobile-nav-link ${filterState.collection === 'Best Sellers' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('storefront')
                  setFilterState((prev) => ({ ...prev, collection: 'Best Sellers' }))
                  setIsMobileMenuOpen(false)
                  const el = document.getElementById('mt-catalog-view')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span>Best Sellers <span className="mt-nav-badge">Iconic</span></span>
                <span>→</span>
              </button>
              <button
                className={`mt-mobile-nav-link ${filterState.collection === 'Lastest Arrivals' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('storefront')
                  setFilterState((prev) => ({ ...prev, collection: 'Lastest Arrivals' }))
                  setIsMobileMenuOpen(false)
                  const el = document.getElementById('mt-catalog-view')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span>Lastest Arrivals</span>
                <span>→</span>
              </button>
              <button
                className="mt-mobile-nav-link"
                onClick={() => {
                  setActiveTab('storefront')
                  setIsMobileMenuOpen(false)
                  const el = document.getElementById('mt-lapel-guide')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span>Lapel Geometry Guide</span>
                <span>→</span>
              </button>
              <button
                className="mt-mobile-nav-link"
                onClick={() => {
                  setActiveTab('storefront')
                  setIsMobileMenuOpen(false)
                  const el = document.getElementById('mt-customizer-section')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span>Bespoke Fitting Studio</span>
                <span>→</span>
              </button>
              <button
                className={`mt-mobile-nav-link ${filterState.collection === 'Hot Deals' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('storefront')
                  setFilterState((prev) => ({ ...prev, collection: 'Hot Deals' }))
                  setIsMobileMenuOpen(false)
                  const el = document.getElementById('mt-catalog-view')
                  if (el) el.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                <span>Hot Deals</span>
                <span>→</span>
              </button>
            </nav>

            <div className="mt-mobile-drawer-footer">
              <button
                className="mt-btn-primary"
                style={{ width: '100%', justifyContent: 'center', marginBottom: '12px' }}
                onClick={() => {
                  setIsMobileMenuOpen(false)
                  setIsBookingOpen(true)
                }}
              >
                Book Tailor Consultation
              </button>
              <div style={{ fontSize: '0.75rem', color: '#9CA3AF', textAlign: 'center' }}>
                Savile Row Valet: +44 (0)20 7946 0912
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Router */}
      {activeTab === 'storefront' ? (
        <main>
          {/* Multi-Slide Hero Carousel */}
          <section className="mt-hero-carousel">
            <div className="mt-hero-slide">
              <div className="mt-hero-text">
                <div className="mt-hero-badge">
                  <span>✦</span>
                  <span>{currentHeroSlide.badge}</span>
                </div>
                <div className="mt-hero-kicker">{currentHeroSlide.kicker}</div>
                <h1 className="mt-hero-title">{currentHeroSlide.title}</h1>
                <p className="mt-hero-subtitle">{currentHeroSlide.subtitle}</p>

                <div className="mt-hero-actions">
                  <button
                    className="mt-btn-primary"
                    onClick={() => {
                      const el = document.getElementById('mt-catalog-view')
                      if (el) el.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    {currentHeroSlide.ctaPrimary}
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  <button
                    className="mt-btn-secondary"
                    onClick={() => setIsBookingOpen(true)}
                  >
                    {currentHeroSlide.ctaSecondary}
                  </button>
                </div>
              </div>

              <div className="mt-hero-visual">
                <div className="mt-hero-img-wrapper">
                  <img
                    src={currentHeroSlide.image}
                    alt={currentHeroSlide.title}
                    className="mt-hero-img"
                  />
                  <div className="mt-hero-floating-spec">
                    <div className="mt-spec-kicker">Signature Weave</div>
                    <div className="mt-spec-val">{currentHeroSlide.tag}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Carousel Navigation Indicators */}
            <div className="mt-hero-nav-dots">
              {MR_TEVOR_HERO_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  className={`mt-hero-dot ${idx === currentSlideIndex ? 'active' : ''}`}
                  onClick={() => setCurrentSlideIndex(idx)}
                  title={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          </section>

          {/* 3-Pillar Craftsmanship Value Bar */}
          <section className="mt-pillars-section">
            <div className="mt-pillars-grid">
              {MR_TEVOR_VALUE_PILLARS.map((p, idx) => (
                <div className="mt-pillar-card" key={idx}>
                  <div className="mt-pillar-icon-wrap">
                    <img src={p.icon} alt={p.title} className="mt-pillar-icon-img" />
                  </div>
                  <div>
                    <h3 className="mt-pillar-title">{p.title}</h3>
                    <p className="mt-pillar-desc">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Catalog & Filter Section */}
          <section className="mt-catalog-section" id="mt-catalog-view">
            <div className="mt-section-header">
              <div className="mt-section-kicker">The Official Sartorial Collection</div>
              <h2 className="mt-section-title">Savile Row Masterpiece Suiting</h2>
              <div className="mt-section-divider" />
              <p className="mt-section-subtitle">
                Explore hand-cut jackets, worsted wool blazers, and double-breasted tuxedo coats built
                with traditional full-canvas architecture and bespoke horn closures.
              </p>
            </div>

            {/* Collection Filter Tabs */}
            <div className="mt-tabs-nav">
              {(['All', 'Best Sellers', 'Lastest Arrivals', 'Hot Deals', 'Trending Products'] as const).map(
                (col) => (
                  <button
                    key={col}
                    className={`mt-tab-btn ${filterState.collection === col ? 'active' : ''}`}
                    onClick={() => setFilterState((prev) => ({ ...prev, collection: col }))}
                  >
                    {col === 'All' ? 'All Suiting (10)' : col}
                  </button>
                )
              )}
            </div>

            {/* Secondary Filter & Search Bar */}
            <div className="mt-filter-bar">
              <div className="mt-filter-group">
                <select
                  className="mt-filter-select"
                  value={filterState.fit}
                  onChange={(e) =>
                    setFilterState((prev) => ({ ...prev, fit: e.target.value as 'All' | FitStyle }))
                  }
                >
                  <option value="All">All Fits</option>
                  <option value="Slim Fit">Slim Fit</option>
                  <option value="Classic Fit">Classic Fit</option>
                  <option value="Modern Fit">Modern Fit</option>
                </select>

                <select
                  className="mt-filter-select"
                  value={filterState.lapel}
                  onChange={(e) =>
                    setFilterState((prev) => ({ ...prev, lapel: e.target.value as 'All' | LapelStyle }))
                  }
                >
                  <option value="All">All Lapels</option>
                  <option value="Notch Lapel">Notch Lapel</option>
                  <option value="Peak Lapel">Peak Lapel</option>
                  <option value="Shawl Lapel">Shawl Lapel</option>
                </select>

                <select
                  className="mt-filter-select"
                  value={filterState.material}
                  onChange={(e) =>
                    setFilterState((prev) => ({
                      ...prev,
                      material: e.target.value as 'All' | SuitingMaterial,
                    }))
                  }
                >
                  <option value="All">All Fabrics</option>
                  <option value="Super 150s Merino Wool">Super 150s Merino</option>
                  <option value="Scottish Tweed">Scottish Tweed</option>
                  <option value="Italian Wool-Linen Hopsack">Italian Wool-Linen</option>
                  <option value="Silk Micro-Jacquard">Silk Jacquard</option>
                  <option value="Flannel Wool">Flannel Wool</option>
                  <option value="Worsted Wool">Worsted Wool</option>
                </select>

                <select
                  className="mt-filter-select"
                  value={filterState.sortBy}
                  onChange={(e) =>
                    setFilterState((prev) => ({
                      ...prev,
                      sortBy: e.target.value as 'featured' | 'price-asc' | 'price-desc' | 'rating',
                    }))
                  }
                >
                  <option value="featured">Sort by: Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <div className="mt-search-box">
                <svg width="15" height="15" fill="none" stroke="#6B7280" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search suiting, fabric, lapel..."
                  className="mt-search-input"
                  value={filterState.searchQuery}
                  onChange={(e) => setFilterState((prev) => ({ ...prev, searchQuery: e.target.value }))}
                />
                {filterState.searchQuery && (
                  <button
                    style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CA3AF' }}
                    onClick={() => setFilterState((prev) => ({ ...prev, searchQuery: '' }))}
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>

            {/* Products Grid */}
            <div className="mt-products-grid">
              {filteredProducts.map((product) => {
                const isWishlisted = wishlist.includes(product.id)
                return (
                  <div className="mt-product-card" key={product.id}>
                    <div
                      className="mt-card-image-box"
                      onClick={() => handleOpenPDP(product)}
                    >
                      {product.badge && (
                        <span
                          className={`mt-card-badge ${
                            product.badge === 'Best Seller'
                              ? 'best-seller'
                              : product.badge === 'Hot Deal'
                              ? 'hot-deal'
                              : ''
                          }`}
                        >
                          {product.badge}
                        </span>
                      )}

                      <img src={product.image} alt={product.title} className="mt-card-image" />

                      <div
                        className="mt-card-quick-actions"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          className="mt-action-pill-btn"
                          onClick={() => setQuickViewProduct(product)}
                        >
                          Quick View
                        </button>
                        <button
                          className="mt-action-pill-btn"
                          onClick={() => handleToggleWishlist(product.id)}
                        >
                          {isWishlisted ? '♥ Saved' : '♡ Wishlist'}
                        </button>
                      </div>
                    </div>

                    <div className="mt-card-body">
                      <div className="mt-card-meta">
                        <span className="mt-card-lapel">{product.lapel}</span>
                        <span>{product.fit}</span>
                      </div>

                      <h3
                        className="mt-card-title"
                        onClick={() => handleOpenPDP(product)}
                      >
                        {product.title}
                      </h3>

                      <div className="mt-card-material">
                        <span>🧵</span>
                        <span>{product.material}</span>
                      </div>

                      <div className="mt-card-prices">
                        <span className="mt-current-price">${product.price}</span>
                        {product.compareAtPrice && (
                          <span className="mt-compare-price">${product.compareAtPrice}</span>
                        )}
                        <span style={{ marginLeft: 'auto', fontSize: '0.75rem', color: '#6B7280' }}>
                          ★ {product.rating} ({product.reviewsCount})
                        </span>
                      </div>

                      <div className="mt-card-footer">
                        <button
                          className="mt-btn-add-cart"
                          onClick={() => handleAddToCart(product)}
                        >
                          <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                          </svg>
                          Add to Garment Bag
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {filteredProducts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '60px 20px', background: '#FFFFFF', borderRadius: '4px', border: '1px solid #E8E5DD' }}>
                <p style={{ fontFamily: 'var(--mt-font-serif)', fontSize: '1.2rem', marginBottom: '8px' }}>
                  No Sartorial Pieces Matched Your Filter
                </p>
                <p style={{ color: '#6B7280', fontSize: '0.85rem', marginBottom: '16px' }}>
                  Try resetting lapel, fabric, or fit filters to view all available bespoke suiting models.
                </p>
                <button
                  className="mt-btn-primary"
                  onClick={() =>
                    setFilterState({
                      collection: 'All',
                      fit: 'All',
                      lapel: 'All',
                      material: 'All',
                      searchQuery: '',
                      sortBy: 'featured',
                      maxPrice: 250,
                    })
                  }
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </section>

          {/* Interactive Lapel Style Guide */}
          <section className="mt-lapel-guide-section" id="mt-lapel-guide">
            <div className="mt-section-header">
              <div className="mt-section-kicker">Sartorial Education</div>
              <h2 className="mt-section-title">The Master Lapel Guide</h2>
              <div className="mt-section-divider" />
              <p className="mt-section-subtitle">
                Understanding the architectural geometry of suit lapels. Choose the silhouette that aligns
                with your occasion, physique, and personal sartorial signature.
              </p>
            </div>

            <div className="mt-lapel-grid">
              {MR_TEVOR_LAPEL_GUIDE.map((lapel, idx) => (
                <div className="mt-lapel-card" key={idx}>
                  <div className="mt-lapel-img-box">
                    <img src={lapel.image} alt={lapel.type} className="mt-lapel-img" />
                  </div>
                  <div className="mt-lapel-content">
                    <div className="mt-lapel-tag">{lapel.type}</div>
                    <h3 className="mt-lapel-name">{lapel.heading}</h3>
                    <p className="mt-lapel-desc">{lapel.desc}</p>
                    <div className="mt-lapel-meta">
                      <div><strong>Formality:</strong> {lapel.formality}</div>
                      <div><strong>Cut Specification:</strong> {lapel.angle}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bespoke Measurement & Custom Suit Builder */}
          <section className="mt-customizer-section" id="mt-customizer-section">
            <div className="mt-customizer-box">
              <div>
                <div className="mt-customizer-kicker">Bespoke Fitting Studio</div>
                <h2 className="mt-customizer-title">Craft Your Made-to-Measure Suit</h2>
                <p className="mt-customizer-desc">
                  Input your exact anatomical measurements for hand-tailoring. Our master cutters in London
                  will draft a bespoke individual paper pattern, sculpt horsehair canvas, and sew your
                  personalized initials into the interior breast lining.
                </p>

                <div className="mt-customizer-inputs">
                  <div className="mt-input-group">
                    <label>Select Suit Model</label>
                    <select
                      value={bespokeModelId}
                      onChange={(e) => setBespokeModelId(e.target.value)}
                    >
                      {MR_TEVOR_PRODUCTS.map((p) => (
                        <option key={p.id} value={p.id}>
                          {p.title} (${p.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mt-input-group">
                    <label>Cupro Silk Interior Lining</label>
                    <select
                      value={bespokeLining}
                      onChange={(e) => setBespokeLining(e.target.value)}
                    >
                      <option value="Royal Indigo Cupro Jacquard">Royal Indigo Jacquard</option>
                      <option value="Champagne Gold Satin">Champagne Gold Satin</option>
                      <option value="Deep Crimson Bemberg">Deep Crimson Bemberg</option>
                      <option value="Paisley Emerald Silk">Paisley Emerald Silk</option>
                    </select>
                  </div>

                  <div className="mt-input-group">
                    <label>Chest Circumference (Inches)</label>
                    <input
                      type="number"
                      value={bespokeChest}
                      step="0.5"
                      min="34"
                      max="54"
                      onChange={(e) => setBespokeChest(Number(e.target.value))}
                    />
                  </div>

                  <div className="mt-input-group">
                    <label>Shoulder Width (Inches)</label>
                    <input
                      type="number"
                      value={bespokeShoulder}
                      step="0.25"
                      min="16"
                      max="22"
                      onChange={(e) => setBespokeShoulder(Number(e.target.value))}
                    />
                  </div>

                  <div className="mt-input-group">
                    <label>Sleeve Length (Inches)</label>
                    <input
                      type="number"
                      value={bespokeSleeve}
                      step="0.25"
                      min="22"
                      max="29"
                      onChange={(e) => setBespokeSleeve(Number(e.target.value))}
                    />
                  </div>

                  <div className="mt-input-group">
                    <label>Trouser Waist (Inches)</label>
                    <input
                      type="number"
                      value={bespokeWaist}
                      step="0.5"
                      min="28"
                      max="48"
                      onChange={(e) => setBespokeWaist(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className="mt-input-group" style={{ marginBottom: '24px' }}>
                  <label>Hand-Embroidered Monogram Initials</label>
                  <input
                    type="text"
                    maxLength={5}
                    value={bespokeMonogram}
                    onChange={(e) => setBespokeMonogram(e.target.value.toUpperCase())}
                    placeholder="e.g. A.S. or M.T."
                  />
                </div>

                <button
                  className="mt-btn-primary"
                  onClick={handleAddBespokeCustomSuit}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Commission Bespoke Piece
                </button>
              </div>

              <div className="mt-customizer-preview-box">
                <span className="mt-tape-measure-badge">Master Tailor Preview</span>
                <div style={{ margin: '20px 0', border: '1px dashed var(--mt-gold)', padding: '24px', borderRadius: '4px' }}>
                  <div style={{ fontFamily: 'var(--mt-font-serif)', fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '8px' }}>
                    [ {bespokeMonogram || 'M.T.'} ]
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--mt-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Golden Silk Monogram • Hand-Stitched Inside Breast
                  </div>
                </div>

                <div style={{ textAlign: 'left', fontSize: '0.82rem', color: '#C0C6D4', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div><strong>Drafted Pattern:</strong> Custom Anatomical Cut</div>
                  <div><strong>Chest Measurement:</strong> {bespokeChest}&quot;</div>
                  <div><strong>Shoulder Width:</strong> {bespokeShoulder}&quot;</div>
                  <div><strong>Sleeve Dimension:</strong> {bespokeSleeve}&quot; with working buttonholes</div>
                  <div><strong>Selected Lining:</strong> {bespokeLining}</div>
                  <div><strong>Estimated Hand-Basting:</strong> 3-4 Weeks with Valet Courier</div>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonial Section with Authentic Thread Spools Background */}
          <section className="mt-testimonial-section">
            <div className="mt-testimonial-container">
              <div className="mt-testi-quote-icon">“</div>
              <p className="mt-testi-quote-text">{MR_TEVOR_TESTIMONIALS[0].quote}</p>
              <div className="mt-testi-author">{MR_TEVOR_TESTIMONIALS[0].author}</div>
              <div className="mt-testi-location">{MR_TEVOR_TESTIMONIALS[0].location}</div>
              <div className="mt-testi-suit-pill">{MR_TEVOR_TESTIMONIALS[0].suitPurchased}</div>
            </div>
          </section>
        </main>
      ) : activeTab === 'pdp' && selectedProduct ? (
        /* Technical Product Detail Page (PDP) */
        <div className="mt-pdp-overlay">
          <div className="mt-pdp-top-bar">
            <div className="mt-pdp-breadcrumbs">
              <span
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => setActiveTab('storefront')}
              >
                Atelier Home
              </span>
              <span>/</span>
              <span>{selectedProduct.collections[0] || 'Suits'}</span>
              <span>/</span>
              <span style={{ color: 'var(--mt-crimson)', fontWeight: 600 }}>{selectedProduct.title}</span>
            </div>
          </div>

          <div className="mt-pdp-container">
            <div className="mt-pdp-gallery">
              <div className="mt-pdp-main-image-box">
                <img
                  src={pdpActiveImage || selectedProduct.image}
                  alt={selectedProduct.title}
                  className="mt-pdp-main-img"
                />
              </div>

              {selectedProduct.gallery.length > 1 && (
                <div className="mt-pdp-thumbs">
                  {selectedProduct.gallery.map((img, idx) => (
                    <img
                      key={idx}
                      src={img}
                      alt={`Angle ${idx + 1}`}
                      className={`mt-pdp-thumb ${pdpActiveImage === img ? 'active' : ''}`}
                      onClick={() => setPdpActiveImage(img)}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="mt-pdp-info">
              <div className="mt-pdp-kicker">Savile Row Bespoke Collection</div>
              <h1 className="mt-pdp-title">{selectedProduct.title}</h1>
              <p className="mt-pdp-subtitle">{selectedProduct.subtitle}</p>

              <div className="mt-pdp-price-row">
                <span className="mt-pdp-price">${selectedProduct.price}</span>
                {selectedProduct.compareAtPrice && (
                  <span className="mt-compare-price" style={{ fontSize: '1.2rem' }}>
                    ${selectedProduct.compareAtPrice}
                  </span>
                )}
                <span style={{ marginLeft: 'auto', fontSize: '0.85rem', color: '#6B7280' }}>
                  ★ {selectedProduct.rating} Rating ({selectedProduct.reviewsCount} verified gentlemen reviews)
                </span>
              </div>

              {/* Technical Tailoring Specifications Table */}
              <div className="mt-pdp-spec-table">
                <div className="mt-pdp-spec-item">
                  <strong>Fabric Weave</strong>
                  <span>{selectedProduct.material}</span>
                </div>
                <div className="mt-pdp-spec-item">
                  <strong>Lapel Geometry</strong>
                  <span>{selectedProduct.lapel}</span>
                </div>
                <div className="mt-pdp-spec-item">
                  <strong>Vent Architecture</strong>
                  <span>{selectedProduct.vent}</span>
                </div>
                <div className="mt-pdp-spec-item">
                  <strong>Pockets & Jettings</strong>
                  <span>{selectedProduct.pockets}</span>
                </div>
                <div className="mt-pdp-spec-item">
                  <strong>Interior Silk Lining</strong>
                  <span>{selectedProduct.lining}</span>
                </div>
                <div className="mt-pdp-spec-item">
                  <strong>Button Craftsmanship</strong>
                  <span>{selectedProduct.buttons}</span>
                </div>
                <div className="mt-pdp-spec-item">
                  <strong>Cloth Provenance</strong>
                  <span>{selectedProduct.fabricOrigin}</span>
                </div>
                <div className="mt-pdp-spec-item">
                  <strong>Chest Canvas</strong>
                  <span>Full Floating Horsehair Canvas</span>
                </div>
              </div>

              {/* Size Selector */}
              <div style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em' }}>
                    Select Jacket Chest Size
                  </label>
                  <span
                    style={{ fontSize: '0.75rem', color: 'var(--mt-crimson)', textDecoration: 'underline', cursor: 'pointer' }}
                    onClick={() => setIsBookingOpen(true)}
                  >
                    Bespoke Size Advisory
                  </span>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {selectedProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      style={{
                        padding: '10px 16px',
                        border: pdpSelectedSize === sz ? '2px solid var(--mt-crimson)' : '1px solid var(--mt-border)',
                        backgroundColor: pdpSelectedSize === sz ? 'var(--mt-crimson-tint)' : '#FFFFFF',
                        color: pdpSelectedSize === sz ? 'var(--mt-crimson)' : 'var(--mt-charcoal)',
                        fontFamily: 'var(--mt-font-serif)',
                        fontWeight: 700,
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                        borderRadius: '2px',
                      }}
                      onClick={() => setPdpSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Swatches */}
              <div style={{ marginBottom: '28px' }}>
                <label style={{ display: 'block', fontSize: '0.78rem', textTransform: 'uppercase', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '8px' }}>
                  Cloth Shade: {pdpSelectedColor || selectedProduct.colors[0]?.name}
                </label>
                <div style={{ display: 'flex', gap: '10px' }}>
                  {selectedProduct.colors.map((c) => (
                    <button
                      key={c.name}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: c.hex,
                        border: pdpSelectedColor === c.name ? '3px solid var(--mt-crimson)' : '2px solid #FFFFFF',
                        outline: '1px solid #D1D5DB',
                        cursor: 'pointer',
                      }}
                      title={c.name}
                      onClick={() => setPdpSelectedColor(c.name)}
                    />
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                <div style={{ display: 'flex', border: '1px solid var(--mt-border)', borderRadius: '2px' }}>
                  <button
                    style={{ padding: '0 14px', background: '#FFFFFF', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                    onClick={() => setPdpQuantity((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', fontWeight: 700 }}>
                    {pdpQuantity}
                  </span>
                  <button
                    style={{ padding: '0 14px', background: '#FFFFFF', border: 'none', cursor: 'pointer', fontSize: '1rem' }}
                    onClick={() => setPdpQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  className="mt-btn-primary"
                  style={{ flexGrow: 1, justifyContent: 'center' }}
                  onClick={() => {
                    handleAddToCart(
                      selectedProduct,
                      pdpSelectedSize,
                      pdpSelectedColor || selectedProduct.colors[0]?.name
                    )
                  }}
                >
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  Add to Garment Carrier (${selectedProduct.price * pdpQuantity})
                </button>
              </div>

              {/* Description & Care */}
              <div style={{ borderTop: '1px solid var(--mt-border)', paddingTop: '24px' }}>
                <h4 style={{ fontFamily: 'var(--mt-font-serif)', fontSize: '1rem', marginBottom: '8px' }}>
                  Tailor’s Architectural Notes
                </h4>
                <p style={{ fontSize: '0.88rem', lineHeight: '1.7', color: '#4B5563', marginBottom: '20px' }}>
                  {selectedProduct.description}
                </p>

                <h4 style={{ fontFamily: 'var(--mt-font-serif)', fontSize: '0.95rem', marginBottom: '8px' }}>
                  Care & Preservation Guide
                </h4>
                <ul style={{ paddingLeft: '20px', fontSize: '0.82rem', color: '#6B7280', lineHeight: '1.6' }}>
                  {selectedProduct.careInstructions.map((c, idx) => (
                    <li key={idx}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          className="mt-cart-drawer-overlay"
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              maxWidth: '680px',
              width: '90%',
              borderRadius: '4px',
              padding: '32px',
              position: 'relative',
              boxShadow: 'var(--mt-shadow-lg)',
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
                fontSize: '1.4rem',
                cursor: 'pointer',
              }}
              onClick={() => setQuickViewProduct(null)}
            >
              ✕
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'center' }}>
              <div style={{ backgroundColor: '#F8F9FA', padding: '20px', borderRadius: '4px', textAlign: 'center' }}>
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.title}
                  style={{ maxHeight: '280px', objectFit: 'contain' }}
                />
              </div>

              <div>
                <div style={{ fontSize: '0.72rem', color: 'var(--mt-crimson)', textTransform: 'uppercase', fontWeight: 700 }}>
                  {quickViewProduct.lapel} • {quickViewProduct.fit}
                </div>
                <h3 style={{ fontFamily: 'var(--mt-font-serif)', fontSize: '1.4rem', margin: '6px 0 12px 0' }}>
                  {quickViewProduct.title}
                </h3>
                <div style={{ fontFamily: 'var(--mt-font-serif)', fontSize: '1.5rem', color: 'var(--mt-crimson)', fontWeight: 800, marginBottom: '14px' }}>
                  ${quickViewProduct.price}
                </div>
                <p style={{ fontSize: '0.82rem', color: '#4B5563', lineHeight: '1.6', marginBottom: '20px' }}>
                  {quickViewProduct.subtitle}
                </p>

                <button
                  className="mt-btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginBottom: '10px' }}
                  onClick={() => {
                    handleAddToCart(quickViewProduct)
                    setQuickViewProduct(null)
                  }}
                >
                  Add to Garment Bag
                </button>
                <button
                  className="mt-btn-secondary"
                  style={{ width: '100%', justifyContent: 'center', color: 'var(--mt-charcoal)', borderColor: 'var(--mt-border)' }}
                  onClick={() => {
                    handleOpenPDP(quickViewProduct)
                    setQuickViewProduct(null)
                  }}
                >
                  View Complete Specifications
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-over Garment Cart Drawer */}
      {isCartOpen && (
        <div className="mt-cart-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="mt-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mt-cart-header">
              <h3>Tailored Garment Bag ({cartTotalItems})</h3>
              <button
                style={{ background: 'none', border: 'none', color: '#FFFFFF', fontSize: '1.2rem', cursor: 'pointer' }}
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Free Courier Progress Bar */}
            <div style={{ backgroundColor: 'var(--mt-linen)', padding: '12px 24px', borderBottom: '1px solid var(--mt-border)', fontSize: '0.78rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span>Complimentary Cedar Hanger & Courier:</span>
                <strong style={{ color: 'var(--mt-crimson)' }}>Unlocked!</strong>
              </div>
              <div style={{ height: '4px', backgroundColor: '#E5E7EB', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', backgroundColor: 'var(--mt-crimson)' }} />
              </div>
            </div>

            <div className="mt-cart-items-list">
              {cart.map((item, idx) => (
                <div className="mt-cart-item-card" key={idx}>
                  <img src={item.product.image} alt={item.product.title} className="mt-cart-item-img" />
                  <div style={{ flexGrow: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <h4 style={{ fontFamily: 'var(--mt-font-serif)', fontSize: '0.95rem', margin: '0 0 4px 0' }}>
                        {item.product.title}
                      </h4>
                      <button
                        style={{ background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', fontSize: '0.85rem' }}
                        onClick={() => handleUpdateQuantity(idx, 0)}
                      >
                        ✕
                      </button>
                    </div>

                    <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '8px' }}>
                      Size: {item.selectedSize} • Shade: {item.selectedColor}
                    </div>

                    {item.customMeasurements && (
                      <div style={{ fontSize: '0.7rem', color: 'var(--mt-gold)', backgroundColor: 'var(--mt-obsidian)', padding: '4px 8px', borderRadius: '2px', marginBottom: '8px' }}>
                        Bespoke: Chest {item.customMeasurements.chest}&quot; • Sleeve {item.customMeasurements.sleeve}&quot;
                      </div>
                    )}

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', border: '1px solid var(--mt-border)', borderRadius: '2px' }}>
                        <button
                          style={{ padding: '2px 8px', background: '#FFFFFF', border: 'none', cursor: 'pointer' }}
                          onClick={() => handleUpdateQuantity(idx, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span style={{ padding: '2px 10px', fontSize: '0.82rem', fontWeight: 700 }}>
                          {item.quantity}
                        </span>
                        <button
                          style={{ padding: '2px 8px', background: '#FFFFFF', border: 'none', cursor: 'pointer' }}
                          onClick={() => handleUpdateQuantity(idx, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>

                      <span style={{ fontFamily: 'var(--mt-font-serif)', fontWeight: 800, color: 'var(--mt-crimson)' }}>
                        ${item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {cart.length === 0 && (
                <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6B7280' }}>
                  <p style={{ fontFamily: 'var(--mt-font-serif)', fontSize: '1.1rem', marginBottom: '8px' }}>
                    Your Garment Bag is Empty
                  </p>
                  <p style={{ fontSize: '0.82rem' }}>
                    Add hand-tailored suits or tweed blazers to view courier delivery options.
                  </p>
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="mt-cart-footer">
                <div className="mt-cart-total-row">
                  <span>Subtotal</span>
                  <span>${cartSubtotal}</span>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#6B7280', marginBottom: '16px' }}>
                  Taxes, duty-paid delivery, and complimentary bespoke garment cover included.
                </div>
                <button
                  className="mt-btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                  onClick={() => alert(`Proceeding to Master Tailor Checkout: $${cartSubtotal}`)}
                >
                  Proceed to Private Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Book Master Tailor Consultation Modal */}
      {isBookingOpen && (
        <div
          className="mt-cart-drawer-overlay"
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onClick={() => setIsBookingOpen(false)}
        >
          <div
            style={{
              backgroundColor: '#FFFFFF',
              maxWidth: '540px',
              width: '90%',
              borderRadius: '4px',
              padding: '36px',
              position: 'relative',
              boxShadow: 'var(--mt-shadow-lg)',
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
                fontSize: '1.4rem',
                cursor: 'pointer',
              }}
              onClick={() => setIsBookingOpen(false)}
            >
              ✕
            </button>

            {bookingSubmitted ? (
              <div style={{ textAlign: 'center', padding: '40px 10px' }}>
                <span style={{ fontSize: '2.5rem', color: 'var(--mt-crimson)' }}>✓</span>
                <h3 style={{ fontFamily: 'var(--mt-font-serif)', fontSize: '1.5rem', marginTop: '12px' }}>
                  Atelier Consultation Reserved
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#6B7280', marginTop: '8px' }}>
                  Our Savile Row concierge will contact you within 2 business hours to confirm your private
                  fitting appointment and measurement protocol.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit}>
                <div style={{ fontSize: '0.75rem', color: 'var(--mt-crimson)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700 }}>
                  Private Concierge
                </div>
                <h3 style={{ fontFamily: 'var(--mt-font-serif)', fontSize: '1.6rem', margin: '6px 0 16px 0' }}>
                  Book Master Tailor Fitting
                </h3>
                <p style={{ fontSize: '0.82rem', color: '#6B7280', marginBottom: '24px' }}>
                  Enjoy a private one-on-one consultation in London, New York, or via live virtual video measurement.
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
                      Full Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="e.g. Lord Arthur Vance"
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '2px', fontSize: '0.82rem', boxSizing: 'border-box' }}
                      value={bookingForm.fullName}
                      onChange={(e) => setBookingForm({ ...bookingForm, fullName: e.target.value })}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="vance@heritage.co.uk"
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '2px', fontSize: '0.82rem', boxSizing: 'border-box' }}
                      value={bookingForm.email}
                      onChange={(e) => setBookingForm({ ...bookingForm, email: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '14px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
                      Atelier Location
                    </label>
                    <select
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '2px', fontSize: '0.82rem', boxSizing: 'border-box' }}
                      value={bookingForm.city}
                      onChange={(e) => setBookingForm({ ...bookingForm, city: e.target.value })}
                    >
                      <option value="London (Savile Row)">London (Savile Row)</option>
                      <option value="New York (Madison Ave)">New York (Madison Ave)</option>
                      <option value="Geneva (Rue du Rhône)">Geneva (Rue du Rhône)</option>
                      <option value="Virtual Video Tailor">Virtual Video Tailor</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
                      Preferred Date
                    </label>
                    <input
                      required
                      type="date"
                      style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '2px', fontSize: '0.82rem', boxSizing: 'border-box' }}
                      value={bookingForm.preferredDate}
                      onChange={(e) => setBookingForm({ ...bookingForm, preferredDate: e.target.value })}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 700, marginBottom: '4px' }}>
                    Occasion / Suiting Preference
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Autumn Wedding, Diplomatic Gala, Executive Wardrobe"
                    style={{ width: '100%', padding: '8px 12px', border: '1px solid #D1D5DB', borderRadius: '2px', fontSize: '0.82rem', boxSizing: 'border-box' }}
                    value={bookingForm.suitType}
                    onChange={(e) => setBookingForm({ ...bookingForm, suitType: e.target.value })}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Confirm Atelier Appointment
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Master Footer */}
      <footer className="mt-footer">
        <div className="mt-footer-grid">
          <div className="mt-footer-col">
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
              <img src={MR_TEVOR_LOGO_URL} alt="Mr-Tevor Logo" style={{ height: '36px', filter: 'brightness(1.5)' }} />
              <span style={{ fontFamily: 'var(--mt-font-serif)', fontSize: '1.25rem', color: '#FFFFFF', fontWeight: 800 }}>
                MR-TEVOR
              </span>
            </div>
            <p style={{ fontSize: '0.82rem', lineHeight: '1.6', color: '#9CA3AF' }}>
              Dedicated to bespoke suiting architecture, floating canvas construction, and the finest
              natural fibers from Biella, Yorkshire, and the Outer Hebrides.
            </p>
            <div style={{ marginTop: '16px', fontSize: '0.75rem', color: 'var(--mt-gold)' }}>
              Savile Row, London W1S • Madison Ave, New York 10022
            </div>
          </div>

          <div className="mt-footer-col">
            <h4>Bespoke Collections</h4>
            <ul className="mt-footer-links">
              <li><a href="#catalog" onClick={() => setFilterState((prev) => ({ ...prev, collection: 'Best Sellers' }))}>Best Sellers Suiting</a></li>
              <li><a href="#catalog" onClick={() => setFilterState((prev) => ({ ...prev, lapel: 'Peak Lapel' }))}>Peak Lapel Tuxedos</a></li>
              <li><a href="#catalog" onClick={() => setFilterState((prev) => ({ ...prev, material: 'Scottish Tweed' }))}>Scottish Tweed Jackets</a></li>
              <li><a href="#catalog" onClick={() => setFilterState((prev) => ({ ...prev, lapel: 'Notch Lapel' }))}>Executive Business Suits</a></li>
              <li><a href="#catalog" onClick={() => setFilterState((prev) => ({ ...prev, collection: 'Hot Deals' }))}>Archive Sartorial Pieces</a></li>
            </ul>
          </div>

          <div className="mt-footer-col">
            <h4>Atelier Concierge</h4>
            <ul className="mt-footer-links">
              <li><a href="#book" onClick={() => setIsBookingOpen(true)}>Book Fitting Session</a></li>
              <li><a href="#guide" onClick={() => {
                setActiveTab('storefront')
                const el = document.getElementById('mt-lapel-guide')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}>Lapel Geometry Guide</a></li>
              <li><a href="#custom" onClick={() => {
                setActiveTab('storefront')
                const el = document.getElementById('mt-customizer-section')
                if (el) el.scrollIntoView({ behavior: 'smooth' })
              }}>Measurement Calculator</a></li>
              <li><a href="#garment" onClick={() => setIsCartOpen(true)}>Valet Garment Bag</a></li>
              <li><a href="#care">Wool & Tweed Care Guide</a></li>
            </ul>
          </div>

          <div className="mt-footer-col">
            <h4>Sartorial Newsletter</h4>
            <p style={{ fontSize: '0.82rem', lineHeight: '1.6', color: '#9CA3AF', marginBottom: '14px' }}>
              Receive invitations to private seasonal cloth trunk shows and bespoke cloth releases.
            </p>
            <div style={{ display: 'flex' }}>
              <input
                type="email"
                placeholder="Enter gentleman's email..."
                style={{ padding: '8px 12px', background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)', color: '#FFFFFF', fontSize: '0.82rem', flexGrow: 1, outline: 'none' }}
              />
              <button
                className="mt-btn-primary"
                style={{ padding: '8px 16px', borderRadius: 0, fontSize: '0.75rem' }}
                onClick={() => alert('Thank you for subscribing to Mr. Tevor trunk shows.')}
              >
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-footer-bottom">
          <div>© {new Date().getFullYear()} Mr-Tevor Haute Sartorial Suiting. All Rights Reserved.</div>
          <div style={{ display: 'flex', gap: '20px' }}>
            <span>Privacy Policy</span>
            <span>Terms of Commission</span>
            <span>Bespoke Certificate</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
export default MrTevorFashionStorefront
