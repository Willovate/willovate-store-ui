import React, { useState, useMemo, useEffect } from 'react'
import type {
  LopezProduct,
  LopezCartItem,
  LopezStorefrontProps,
  LopezCategoryType,
} from './types'
import {
  LOPEZ_PRODUCTS,
  LOPEZ_SERVICES,
  LOPEZ_BANNERS,
  LOPEZ_TESTIMONIALS,
  LOPEZ_BLOG_POSTS,
  LOPEZ_BRANDS,
} from './data/lopezData'
import './styles/lopezJewelry.css'

// Zero-dependency SVG Icon components with explicit dimensions
interface IconProps {
  size?: number
  fill?: string
  className?: string
  style?: React.CSSProperties
}

const ShoppingBag = ({ size = 20, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
)

const Heart = ({ size = 20, fill = 'none', className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill={fill} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const Search = ({ size = 20, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
)

const Eye = ({ size = 20, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
)

const X = ({ size = 20, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
)

const Plus = ({ size = 14, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const Minus = ({ size = 14, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
)

const Check = ({ size = 16, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const Star = ({ size = 14, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="#c09578" stroke="#c09578" strokeWidth="1">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const ChevronLeft = ({ size = 16, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
)

const Truck = ({ size = 24, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
)

const Headphones = ({ size = 24, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
  </svg>
)

const ShieldCheck = ({ size = 24, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
)

const ArrowRight = ({ size = 16, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

const Menu = ({ size = 24, className = '', style }: IconProps) => (
  <svg width={size} height={size} className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
)

export const LopezJewelryStorefront: React.FC<LopezStorefrontProps> = ({
  templateData,
  device = 'desktop',
  deviceView,
  onClose,
  initialView = 'home',
  onUseTemplate,
}) => {
  const effectiveDevice = deviceView || device || 'desktop'
  const isMobile = effectiveDevice === 'mobile'

  // Navigation & View State
  const [activeTab, setActiveTab] = useState<'home' | 'shop' | 'about' | 'contact' | 'blog' | 'pdp'>(
    initialView === 'catalog' ? 'shop' : initialView || 'home'
  )
  const [selectedCategory, setSelectedCategory] = useState<LopezCategoryType>('All')
  const [activeHeroSlide, setActiveHeroSlide] = useState(0)
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Drawers & Modals
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<LopezProduct | null>(null)
  const [selectedProduct, setSelectedProduct] = useState<LopezProduct>(LOPEZ_PRODUCTS[0])
  const [pdpSelectedMetal, setPdpSelectedMetal] = useState<string>(LOPEZ_PRODUCTS[0].metalOptions[0])
  const [pdpQuantity, setPdpQuantity] = useState(1)
  const [pdpSelectedImageIdx, setPdpSelectedImageIdx] = useState(0)

  // Search State
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  // Currency State
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD')
  const currencyRates = { USD: 1, EUR: 0.92, GBP: 0.79 }
  const currencySymbols = { USD: '$', EUR: '€', GBP: '£' }

  // Cart & Wishlist State
  const [cart, setCart] = useState<LopezCartItem[]>([
    {
      product: LOPEZ_PRODUCTS[0], // Dangle Earrings ($39.00)
      selectedMetal: LOPEZ_PRODUCTS[0].metalOptions[0],
      quantity: 1,
    },
    {
      product: LOPEZ_PRODUCTS[3], // Hoop Earrings ($79.00)
      selectedMetal: LOPEZ_PRODUCTS[3].metalOptions[0],
      quantity: 1,
    },
  ])
  const [wishlist, setWishlist] = useState<string[]>([LOPEZ_PRODUCTS[1].id, LOPEZ_PRODUCTS[4].id])
  const [toastMessage, setToastMessage] = useState<string | null>(null)
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Currency Formatter
  const formatPrice = (amountInUsd: number) => {
    const converted = amountInUsd * currencyRates[currency]
    return `${currencySymbols[currency]}${converted.toFixed(2)}`
  }

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return LOPEZ_PRODUCTS.filter((product) => {
      const matchCategory = selectedCategory === 'All' || product.category === selectedCategory
      const matchSearch =
        !searchQuery ||
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      return matchCategory && matchSearch
    })
  }, [selectedCategory, searchQuery])

  // Cart Calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  }, [cart])

  const cartItemCount = useMemo(() => {
    return cart.reduce((count, item) => count + item.quantity, 0)
  }, [cart])

  const freeShippingThreshold = 100.0
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100)

  // Actions
  const addToCart = (product: LopezProduct, metal?: string, quantity = 1) => {
    const chosenMetal = metal || product.metalOptions[0]
    setCart((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.selectedMetal === chosenMetal
      )
      if (existingIdx > -1) {
        const next = [...prev]
        next[existingIdx].quantity += quantity
        return next
      }
      return [...prev, { product, selectedMetal: chosenMetal, quantity }]
    })
    showToast(`Added "${product.name}" to shopping bag.`)
  }

  const updateCartQuantity = (productId: string, metal: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.selectedMetal === metal) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean) as LopezCartItem[]
    )
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId)
      const next = exists ? prev.filter((id) => id !== productId) : [...prev, productId]
      const prod = LOPEZ_PRODUCTS.find((p) => p.id === productId)
      if (exists) {
        showToast(`Removed from wishlist.`)
      } else {
        showToast(`Saved "${prod?.name || 'Item'}" to wishlist.`)
      }
      return next
    })
  }

  const openProductDetail = (product: LopezProduct) => {
    setSelectedProduct(product)
    setPdpSelectedMetal(product.metalOptions[0])
    setPdpQuantity(1)
    setPdpSelectedImageIdx(0)
    setActiveTab('pdp')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Hero Slider Data (Exact Authentic Lopez Headline & Subtitle)
  const heroSlides = [
    {
      title: 'Summer Collection',
      tagline: 'Handmade Minimalist Jewelry',
      description:
        'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout, normal distribution of letters.',
      buttonText: 'Buy Now',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1600&auto=format&fit=crop&q=85',
      badge: 'NEW ARRIVALS 2026',
    },
    {
      title: 'Summer Collection',
      tagline: 'Contemporary Drops & Rings',
      description:
        'Crafted from hypoallergenic recycled metals and mirror-polished solid gold. Minimalist jewelry for every moment.',
      buttonText: 'Buy Now',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&auto=format&fit=crop&q=85',
      badge: 'POPULAR DROP',
    },
  ]

  // Auto-advance hero slides
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % heroSlides.length)
    }, 8000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  // Handle template selection
  const handleUseTemplateClick = () => {
    if (onUseTemplate && templateData) {
      onUseTemplate(templateData.id || 'jewelry-lopez')
    } else {
      showToast('Lopez Jewelry theme selected! Preparing your storefront...')
    }
  }

  return (
    <div className={`lp-root ${isMobile ? 'lp-mobile-view is-mobile' : ''}`} data-device={effectiveDevice}>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="lp-toast">
          <Check size={16} />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Utility Announcement Bar */}
      <div className="lp-topbar">
        <div className="lp-container">
          <div className="lp-topbar-inner">
            <span className="lp-topbar-text">
              Free worldwide courier shipping on orders over $100
            </span>
            <div className="lp-topbar-actions">
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '10px', color: '#999999' }}>Currency:</span>
                <select
                  aria-label="Currency"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="lp-currency-select"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                </select>
              </div>
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  className="lp-close-preview-btn"
                >
                  <X size={14} /> Close Preview
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* AUTHENTIC LOPEZ HEADER */}
      <header className="lp-header">
        <div className="lp-container">
          <div className="lp-header-inner">
            {/* Left: Brand Logo Wordmark */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('home')
                setSelectedCategory('All')
              }}
              className="lp-logo-link"
            >
              <span className="lp-logo-title">Lopez</span>
              <span className="lp-logo-subtitle">Handmade Jewelry</span>
            </button>

            {/* Center: Desktop Navigation Menu */}
            <nav>
              <ul className="lp-nav">
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('home')
                      setSelectedCategory('All')
                    }}
                    className={`lp-nav-link ${activeTab === 'home' ? 'active' : ''}`}
                  >
                    Home
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('shop')
                      setSelectedCategory('All')
                    }}
                    className={`lp-nav-link ${activeTab === 'shop' && selectedCategory === 'All' ? 'active' : ''}`}
                  >
                    Shop
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('shop')
                      setSelectedCategory('Earrings')
                    }}
                    className={`lp-nav-link ${activeTab === 'shop' && selectedCategory === 'Earrings' ? 'active' : ''}`}
                  >
                    Earrings
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('shop')
                      setSelectedCategory('Rings')
                    }}
                    className={`lp-nav-link ${activeTab === 'shop' && selectedCategory === 'Rings' ? 'active' : ''}`}
                  >
                    Rings
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveTab('about')}
                    className={`lp-nav-link ${activeTab === 'about' ? 'active' : ''}`}
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveTab('blog')}
                    className={`lp-nav-link ${activeTab === 'blog' ? 'active' : ''}`}
                  >
                    Blog
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveTab('contact')}
                    className={`lp-nav-link ${activeTab === 'contact' ? 'active' : ''}`}
                  >
                    Contact Us
                  </button>
                </li>
              </ul>
            </nav>

            {/* Right: Actions */}
            <div className="lp-header-actions">
              <button
                type="button"
                aria-label="Search"
                onClick={() => setSearchOpen(!searchOpen)}
                className="lp-icon-btn"
              >
                <Search size={20} />
              </button>

              <button
                type="button"
                aria-label="Wishlist"
                onClick={() => setWishlistOpen(true)}
                className="lp-icon-btn"
              >
                <Heart size={20} />
                {wishlist.length > 0 && (
                  <span className="lp-badge-counter">{wishlist.length}</span>
                )}
              </button>

              <button
                type="button"
                aria-label="Cart"
                onClick={() => setCartOpen(true)}
                className="lp-cart-trigger"
              >
                <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                  <ShoppingBag size={20} />
                  <span className="lp-badge-counter">{cartItemCount}</span>
                </div>
                <span className="lp-cart-total">{formatPrice(cartSubtotal)}</span>
              </button>

              {onUseTemplate && (
                <button
                  type="button"
                  onClick={handleUseTemplateClick}
                  className="lp-template-cta-btn"
                >
                  Use Template
                </button>
              )}

              <button
                type="button"
                aria-label="Toggle Menu"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lp-mobile-menu-btn"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Live Search Bar */}
        {searchOpen && (
          <div className="lp-search-bar">
            <div className="lp-search-inner">
              <span className="lp-search-icon"><Search size={18} /></span>
              <input
                type="text"
                placeholder="Search earrings, rings, necklaces, bracelets..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="lp-search-input"
                autoFocus
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="lp-search-clear"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lp-mobile-drawer">
            <button
              type="button"
              onClick={() => {
                setActiveTab('home')
                setSelectedCategory('All')
                setMobileMenuOpen(false)
              }}
              className="lp-mobile-drawer-link"
            >
              Home
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('shop')
                setSelectedCategory('All')
                setMobileMenuOpen(false)
              }}
              className="lp-mobile-drawer-link"
            >
              Shop All
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('shop')
                setSelectedCategory('Earrings')
                setMobileMenuOpen(false)
              }}
              className="lp-mobile-drawer-link"
            >
              Earrings Collection
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('shop')
                setSelectedCategory('Rings')
                setMobileMenuOpen(false)
              }}
              className="lp-mobile-drawer-link"
            >
              Rings Collection
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('about')
                setMobileMenuOpen(false)
              }}
              className="lp-mobile-drawer-link"
            >
              About Lopez
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('blog')
                setMobileMenuOpen(false)
              }}
              className="lp-mobile-drawer-link"
            >
              Recent News
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab('contact')
                setMobileMenuOpen(false)
              }}
              className="lp-mobile-drawer-link"
            >
              Contact Us
            </button>
          </div>
        )}
      </header>

      {/* ========================================================================= */}
      {/* VIEW: HOME (AUTHENTIC LOPEZ REFERENCE LAYOUT TOP-TO-BOTTOM) */}
      {/* ========================================================================= */}
      {activeTab === 'home' && (
        <main>
          {/* 1. HERO SLIDER AREA (Exact Lopez Summer Collection Hero) */}
          <section className="lp-hero-section">
            <div className="lp-container">
              <div className="lp-hero-grid">
                {/* Left Text */}
                <div className="lp-hero-text">
                  <span className="lp-hero-badge">
                    {heroSlides[activeHeroSlide].badge}
                  </span>
                  <h1 className="lp-hero-title">
                    {heroSlides[activeHeroSlide].title}
                  </h1>
                  <p className="lp-hero-desc">
                    {heroSlides[activeHeroSlide].description}
                  </p>
                  <div className="lp-hero-actions">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('shop')
                        setSelectedCategory('All')
                      }}
                      className="lp-btn lp-btn-primary"
                    >
                      <span>{heroSlides[activeHeroSlide].buttonText}</span>
                      <ArrowRight size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => openProductDetail(LOPEZ_PRODUCTS[0])}
                      className="lp-btn lp-btn-secondary"
                    >
                      View Spotlight
                    </button>
                  </div>
                </div>

                {/* Right Image Card */}
                <div>
                  <div className="lp-hero-image-wrap">
                    <img
                      src={heroSlides[activeHeroSlide].image}
                      alt={heroSlides[activeHeroSlide].title}
                      className="lp-hero-image"
                    />
                    <div className="lp-hero-image-caption">
                      <p className="lp-caption-tag">Featured Drop</p>
                      <p className="lp-caption-title">Dangle & Threader Earrings</p>
                      <p className="lp-caption-price">{formatPrice(39.0)}</p>
                    </div>
                  </div>

                  <div className="lp-hero-dots">
                    {heroSlides.map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setActiveHeroSlide(idx)}
                        aria-label={`Slide ${idx + 1}`}
                        className={`lp-dot ${activeHeroSlide === idx ? 'active' : ''}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. REPEATED FREE SHIPPING SERVICE HIGHLIGHTS (Exact Lopez 3-column Service Bar) */}
          <section className="lp-services-section">
            <div className="lp-container">
              <div className="lp-services-grid">
                {LOPEZ_SERVICES.map((srv, idx) => (
                  <div key={srv.id} className="lp-service-item">
                    <div className="lp-service-icon">
                      {idx === 0 && <Truck size={24} />}
                      {idx === 1 && <Headphones size={24} />}
                      {idx === 2 && <ShieldCheck size={24} />}
                    </div>
                    <div>
                      <h3 className="lp-service-title">{srv.title}</h3>
                      <p className="lp-service-desc">{srv.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 3. IMAGE-LED PROMOTIONAL COLLECTION BANNERS (handicraft-banner-area) */}
          <section className="lp-banners-section">
            <div className="lp-container">
              <div className="lp-banners-grid">
                {LOPEZ_BANNERS.map((banner) => (
                  <div
                    key={banner.id}
                    onClick={() => {
                      setActiveTab('shop')
                      setSelectedCategory(banner.id === 'ban-1' ? 'Earrings' : 'Rings')
                    }}
                    className="lp-banner-card"
                  >
                    <img
                      src={banner.image}
                      alt={banner.title}
                      className="lp-banner-image"
                    />
                    <div className="lp-banner-overlay">
                      <span className="lp-banner-tag">{banner.tag}</span>
                      <h3 className="lp-banner-title">{banner.title}</h3>
                      <p className="lp-banner-desc">{banner.subtitle}</p>
                      <div className="lp-banner-link">
                        <span>{banner.buttonText}</span>
                        <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* 4. NEW ARRIVAL PRODUCT GRID (Exact Lopez Product Grid & Card Styling) */}
          <section className="lp-products-section">
            <div className="lp-container">
              <div className="lp-section-header">
                <span className="lp-section-tag">Curated Catalog</span>
                <h2 className="lp-section-title">New Arrival</h2>
                <div className="lp-section-line" />
                <p className="lp-section-subtitle">
                  Contemporary minimalist fine jewelry handcrafted with purpose
                </p>
              </div>

              <div className="lp-products-grid">
                {LOPEZ_PRODUCTS.map((product) => {
                  const isWishlisted = wishlist.includes(product.id)
                  return (
                    <div key={product.id} className="lp-product-card">
                      {/* Image Wrap */}
                      <div
                        className="lp-card-thumb-wrap"
                        onClick={() => openProductDetail(product)}
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="lp-card-thumb"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
                          }}
                        />
                        {product.images[1] && (
                          <img
                            src={product.images[1]}
                            alt={product.name}
                            className="lp-card-thumb-hover"
                            onError={(e) => {
                              e.currentTarget.src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80'
                            }}
                          />
                        )}

                        {product.isSale && (
                          <span className="lp-card-badge sale">SALE</span>
                        )}
                        {!product.isSale && product.isNew && (
                          <span className="lp-card-badge">NEW</span>
                        )}

                        {/* Hover Actions */}
                        <div className="lp-card-actions">
                          <button
                            type="button"
                            aria-label="Quick View"
                            onClick={(e) => {
                              e.stopPropagation()
                              setQuickViewProduct(product)
                            }}
                            className="lp-card-action-btn"
                            title="Quick View"
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            type="button"
                            aria-label="Wishlist"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleWishlist(product.id)
                            }}
                            className={`lp-card-action-btn ${isWishlisted ? 'active' : ''}`}
                            title="Add to Wishlist"
                          >
                            <Heart size={16} fill={isWishlisted ? '#e11d48' : 'none'} />
                          </button>
                          <button
                            type="button"
                            aria-label="Add to Bag"
                            onClick={(e) => {
                              e.stopPropagation()
                              addToCart(product)
                            }}
                            className="lp-card-action-btn add-btn"
                            title="Add to Bag"
                          >
                            <ShoppingBag size={14} />
                            <span>Add</span>
                          </button>
                        </div>
                      </div>

                      {/* Card Body: Price first, Title below, Stars */}
                      <div className="lp-card-body">
                        <div className="lp-card-prices">
                          <span className="lp-card-price">{formatPrice(product.price)}</span>
                          {product.compareAtPrice && (
                            <span className="lp-card-compare-price">
                              {formatPrice(product.compareAtPrice)}
                            </span>
                          )}
                        </div>

                        <h4
                          onClick={() => openProductDetail(product)}
                          className="lp-card-title"
                          title={product.name}
                        >
                          {product.name}
                        </h4>

                        <div className="lp-card-stars">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} />
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div style={{ textAlign: 'center', marginTop: '48px' }}>
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('shop')
                    setSelectedCategory('All')
                  }}
                  className="lp-btn lp-btn-secondary"
                >
                  View Complete Catalog
                </button>
              </div>
            </div>
          </section>

          {/* 5. TESTIMONIAL SECTION */}
          <section className="lp-testimonial-section">
            <div className="lp-container">
              <div className="lp-section-header">
                <span className="lp-section-tag">Client Experiences</span>
                <h2 className="lp-section-title">Testimonial</h2>
                <div className="lp-section-line" />
              </div>

              <div className="lp-quote-wrap">
                <p className="lp-quote-text">
                  "{LOPEZ_TESTIMONIALS[activeTestimonial].quote}"
                </p>
                <h4 className="lp-author-name">
                  {LOPEZ_TESTIMONIALS[activeTestimonial].author}
                </h4>
                <p className="lp-author-role">
                  / {LOPEZ_TESTIMONIALS[activeTestimonial].role}
                </p>
              </div>

              <div className="lp-hero-dots" style={{ marginTop: '30px' }}>
                {LOPEZ_TESTIMONIALS.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveTestimonial(i)}
                    aria-label={`Testimonial ${i + 1}`}
                    className={`lp-dot ${activeTestimonial === i ? 'active' : ''}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* 6. PARTNER BRANDS ROW */}
          <section className="lp-brands-section">
            <div className="lp-container">
              <div className="lp-brands-row">
                {LOPEZ_BRANDS.map((b) => (
                  <span key={b.id} className="lp-brand-wordmark">
                    {b.name}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* 7. RECENT NEWS SECTION */}
          <section className="lp-news-section">
            <div className="lp-container">
              <div className="lp-section-header">
                <span className="lp-section-tag">Journal & Dispatches</span>
                <h2 className="lp-section-title">Recent News</h2>
                <div className="lp-section-line" />
              </div>

              <div className="lp-news-grid">
                {LOPEZ_BLOG_POSTS.map((post) => (
                  <article key={post.id} className="lp-news-card">
                    <div className="lp-news-thumb-wrap">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="lp-news-thumb"
                      />
                    </div>
                    <div className="lp-news-body">
                      <p className="lp-news-author">{post.author}</p>
                      <h3 className="lp-news-title">{post.title}</h3>
                      <div className="lp-news-meta">
                        <span>{post.date}</span>
                        <span>•</span>
                        <span>{post.commentsCount} comments</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* 8. GET ALL UPDATES (NEWSLETTER) */}
          <section className="lp-newsletter-section">
            <div className="lp-container">
              <div className="lp-newsletter-wrap">
                <span className="lp-newsletter-tag">VIP Salon Access</span>
                <h2 className="lp-newsletter-title">Get All Updates</h2>
                <p className="lp-newsletter-desc">
                  There are many variations of passages of available, but the majority have suffered alteration in some form.
                </p>

                {newsletterSubscribed ? (
                  <div style={{ color: '#c09578', fontSize: '13px', fontWeight: 600 }}>
                    ✓ Thank you for subscribing to Lopez updates.
                  </div>
                ) : (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault()
                      if (newsletterEmail) {
                        setNewsletterSubscribed(true)
                        showToast('Subscribed to Lopez VIP updates!')
                      }
                    }}
                    className="lp-newsletter-form"
                  >
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address..."
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      className="lp-newsletter-input"
                    />
                    <button type="submit" className="lp-newsletter-btn">
                      Subscribe
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ========================================================================= */}
      {/* VIEW: SHOP / CATALOG */}
      {/* ========================================================================= */}
      {activeTab === 'shop' && (
        <main style={{ padding: '60px 0', backgroundColor: '#ffffff' }}>
          <div className="lp-container">
            <div className="lp-section-header">
              <span className="lp-section-tag">Catalog</span>
              <h1 className="lp-section-title">Lopez Jewelry Collection</h1>
              <p className="lp-section-subtitle">
                Discover {filteredProducts.length} curated contemporary pieces
              </p>
            </div>

            <div className="lp-filter-chips">
              {(['All', 'Earrings', 'Rings', 'Necklaces', 'Bracelets'] as LopezCategoryType[]).map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`lp-chip ${selectedCategory === cat ? 'active' : ''}`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="lp-products-grid">
              {filteredProducts.map((product) => (
                <div key={product.id} className="lp-product-card">
                  <div
                    className="lp-card-thumb-wrap"
                    onClick={() => openProductDetail(product)}
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="lp-card-thumb"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
                      }}
                    />
                    {product.isSale && <span className="lp-card-badge sale">SALE</span>}

                    <div className="lp-card-actions">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          setQuickViewProduct(product)
                        }}
                        className="lp-card-action-btn"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWishlist(product.id)
                        }}
                        className={`lp-card-action-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                      >
                        <Heart size={16} fill={wishlist.includes(product.id) ? '#e11d48' : 'none'} />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(product)
                        }}
                        className="lp-card-action-btn add-btn"
                      >
                        <ShoppingBag size={14} /> Add
                      </button>
                    </div>
                  </div>

                  <div className="lp-card-body">
                    <div className="lp-card-prices">
                      <span className="lp-card-price">{formatPrice(product.price)}</span>
                      {product.compareAtPrice && (
                        <span className="lp-card-compare-price">
                          {formatPrice(product.compareAtPrice)}
                        </span>
                      )}
                    </div>
                    <h4
                      onClick={() => openProductDetail(product)}
                      className="lp-card-title"
                    >
                      {product.name}
                    </h4>
                    <div className="lp-card-stars">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={14} />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* VIEW: PRODUCT DETAIL PAGE (PDP) */}
      {/* ========================================================================= */}
      {activeTab === 'pdp' && selectedProduct && (
        <main style={{ padding: '60px 0', backgroundColor: '#ffffff' }}>
          <div className="lp-container">
            <button
              type="button"
              onClick={() => setActiveTab('shop')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '12px',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: '#666666',
                marginBottom: '32px',
              }}
            >
              <ChevronLeft size={16} /> Back to Catalog
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px' }}>
              <div>
                <div style={{ aspectRatio: '4/5', background: '#f8f8f8', border: '1px solid #eee', overflow: 'hidden' }}>
                  <img
                    src={selectedProduct.images[pdpSelectedImageIdx] || selectedProduct.images[0]}
                    alt={selectedProduct.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                  {selectedProduct.images.map((img, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setPdpSelectedImageIdx(i)}
                      style={{
                        width: '74px',
                        height: '90px',
                        border: pdpSelectedImageIdx === i ? '2px solid #c09578' : '1px solid #eee',
                        overflow: 'hidden',
                      }}
                    >
                      <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="lp-section-tag">{selectedProduct.category}</span>
                <h1 style={{ fontFamily: 'var(--lp-font-serif)', fontSize: '32px', color: '#242424', margin: '4px 0 16px' }}>
                  {selectedProduct.name}
                </h1>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 700, color: '#242424' }}>
                    {formatPrice(selectedProduct.price)}
                  </span>
                  {selectedProduct.compareAtPrice && (
                    <span style={{ fontSize: '16px', color: '#aaaaaa', textDecoration: 'line-through' }}>
                      {formatPrice(selectedProduct.compareAtPrice)}
                    </span>
                  )}
                  <span style={{ fontSize: '11px', color: '#047857', background: '#ecfdf5', padding: '3px 8px', fontWeight: 600 }}>
                    In Stock ({selectedProduct.stockCount} units)
                  </span>
                </div>

                <p style={{ fontSize: '14px', color: '#666666', lineHeight: '1.7', marginBottom: '24px' }}>
                  {selectedProduct.artisanDescription}
                </p>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '8px' }}>
                    Metal Variant: <span style={{ color: '#c09578' }}>{pdpSelectedMetal}</span>
                  </label>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {selectedProduct.metalOptions.map((metal) => (
                      <button
                        key={metal}
                        type="button"
                        onClick={() => setPdpSelectedMetal(metal)}
                        style={{
                          padding: '8px 16px',
                          fontSize: '12px',
                          border: pdpSelectedMetal === metal ? '1px solid #242424' : '1px solid #ddd',
                          background: pdpSelectedMetal === metal ? '#242424' : '#fff',
                          color: pdpSelectedMetal === metal ? '#fff' : '#242424',
                          fontWeight: 500,
                        }}
                      >
                        {metal}
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '14px', marginBottom: '32px' }}>
                  <div className="lp-qty-controls">
                    <button
                      type="button"
                      onClick={() => setPdpQuantity((q) => Math.max(1, q - 1))}
                      className="lp-qty-btn"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="lp-qty-val">{pdpQuantity}</span>
                    <button
                      type="button"
                      onClick={() => setPdpQuantity((q) => q + 1)}
                      className="lp-qty-btn"
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      addToCart(selectedProduct, pdpSelectedMetal, pdpQuantity)
                      setCartOpen(true)
                    }}
                    className="lp-btn lp-btn-primary"
                    style={{ flex: 1 }}
                  >
                    <ShoppingBag size={16} /> Add to Shopping Bag
                  </button>
                </div>

                <div style={{ borderTop: '1px solid #eee', paddingTop: '20px' }}>
                  <h4 style={{ fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: '10px' }}>
                    Craftsmanship & Specifications:
                  </h4>
                  <ul style={{ fontSize: '13px', color: '#666', lineHeight: '1.8', paddingLeft: '18px' }}>
                    {selectedProduct.details.map((detail, idx) => (
                      <li key={idx}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* VIEW: ABOUT US */}
      {/* ========================================================================= */}
      {activeTab === 'about' && (
        <main style={{ padding: '70px 0', backgroundColor: '#ffffff', textAlign: 'center' }}>
          <div className="lp-container" style={{ maxWidth: '840px' }}>
            <span className="lp-section-tag">The Lopez Philosophy</span>
            <h1 className="lp-section-title" style={{ margin: '8px 0 20px' }}>
              Simplicity is the Ultimate Sophistication
            </h1>
            <p style={{ fontSize: '15px', color: '#666666', lineHeight: '1.8', marginBottom: '36px' }}>
              Founded on the belief that everyday jewelry should feel weightless, sculptural, and enduring, Lopez reimagines timeless silhouettes into clean contemporary heirlooms. Every drop and setting is carefully engineered from responsibly sourced precious metals and certified gemstones.
            </p>
            <div style={{ aspectRatio: '16/9', overflow: 'hidden', border: '1px solid #eee' }}>
              <img
                src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&auto=format&fit=crop&q=80"
                alt="Lopez Studio"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* VIEW: BLOG / JOURNAL */}
      {/* ========================================================================= */}
      {activeTab === 'blog' && (
        <main style={{ padding: '70px 0', backgroundColor: '#ffffff' }}>
          <div className="lp-container">
            <div className="lp-section-header">
              <span className="lp-section-tag">Editorial</span>
              <h1 className="lp-section-title">Recent News & Gazette</h1>
              <div className="lp-section-line" />
            </div>

            <div className="lp-news-grid">
              {LOPEZ_BLOG_POSTS.map((post) => (
                <article key={post.id} className="lp-news-card">
                  <div className="lp-news-thumb-wrap">
                    <img src={post.image} alt={post.title} className="lp-news-thumb" />
                  </div>
                  <div className="lp-news-body">
                    <p className="lp-news-author">{post.author}</p>
                    <h3 className="lp-news-title">{post.title}</h3>
                    <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6', marginBottom: '16px' }}>
                      {post.excerpt}
                    </p>
                    <div className="lp-news-meta">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.commentsCount} comments</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* VIEW: CONTACT */}
      {/* ========================================================================= */}
      {activeTab === 'contact' && (
        <main style={{ padding: '70px 0', backgroundColor: '#ffffff', textAlign: 'center' }}>
          <div className="lp-container" style={{ maxWidth: '680px' }}>
            <span className="lp-section-tag">Get in Touch</span>
            <h1 className="lp-section-title" style={{ margin: '8px 0 16px' }}>
              Contact Lopez Concierge
            </h1>
            <p className="lp-section-subtitle" style={{ marginBottom: '32px' }}>
              We welcome private inquiries, bespoke sizing, and boutique appointments.
            </p>
            <div style={{ background: '#faf9f6', border: '1px solid #eee', padding: '36px', textAlign: 'left', lineHeight: '2', fontSize: '13px', color: '#444' }}>
              <p><strong>Address:</strong> 742 Evergreen Terrace, Diamond District, NY 10001</p>
              <p><strong>Email:</strong> concierge@lopezjewelry.com</p>
              <p><strong>Phone:</strong> +1 (800) 555-LOPEZ</p>
              <p><strong>Hours:</strong> Mon – Sat: 9:00 AM – 7:00 PM EST</p>
            </div>
          </div>
        </main>
      )}

      {/* ========================================================================= */}
      {/* 4-COLUMN FOOTER */}
      {/* ========================================================================= */}
      <footer className="lp-footer">
        <div className="lp-container">
          <div className="lp-footer-grid">
            <div>
              <h3 className="lp-footer-logo-title">Lopez</h3>
              <p className="lp-footer-desc">
                Ezone is a Multipurpose Powerful Design for your eCommerce Business. Crafted with love for modern connoisseurs.
              </p>
              <div style={{ display: 'flex', gap: '10px', fontSize: '11px', color: '#333' }}>
                <span style={{ fontWeight: 600 }}>Follow:</span>
                <span className="lp-footer-link">Instagram</span>
                <span>•</span>
                <span className="lp-footer-link">Pinterest</span>
                <span>•</span>
                <span className="lp-footer-link">Facebook</span>
              </div>
            </div>

            <div>
              <h4 className="lp-footer-col-title">My Account</h4>
              <ul className="lp-footer-links">
                <li><button type="button" onClick={() => setWishlistOpen(true)} className="lp-footer-link">My Account</button></li>
                <li><button type="button" onClick={() => setWishlistOpen(true)} className="lp-footer-link">Wishlist</button></li>
                <li><span className="lp-footer-link">Order Tracking</span></li>
                <li><span className="lp-footer-link">Privacy Policy</span></li>
                <li><span className="lp-footer-link">Shipping Information</span></li>
              </ul>
            </div>

            <div>
              <h4 className="lp-footer-col-title">Quick Links</h4>
              <ul className="lp-footer-links">
                <li><span className="lp-footer-link">New User</span></li>
                <li><span className="lp-footer-link">Help Center</span></li>
                <li><span className="lp-footer-link">Refund Policy</span></li>
                <li><span className="lp-footer-link">Report Spam</span></li>
                <li><span className="lp-footer-link">Account</span></li>
              </ul>
            </div>

            <div>
              <h4 className="lp-footer-col-title">Contact</h4>
              <p className="lp-footer-desc">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is dummy.
              </p>
              <div style={{ lineHeight: '1.8', color: '#444' }}>
                <p>Email: concierge@lopezjewelry.com</p>
                <p>Tel: +1 (800) 555-LOPEZ</p>
              </div>
            </div>
          </div>

          <div className="lp-footer-bottom">
            <p>Copyright © 2026 Willovate | Built with Lopez Theme.</p>
            <div style={{ display: 'flex', gap: '14px' }}>
              <span className="lp-footer-link">Terms & Conditions</span>
              <span>•</span>
              <span className="lp-footer-link">Privacy Policy</span>
              <span>•</span>
              <span className="lp-footer-link">Cookie Settings</span>
            </div>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* SLIDE-OUT CART DRAWER */}
      {/* ========================================================================= */}
      {cartOpen && (
        <div>
          <div className="lp-drawer-overlay" onClick={() => setCartOpen(false)} />
          <div className="lp-drawer">
            <div className="lp-drawer-header">
              <h3 className="lp-drawer-title">
                <ShoppingBag size={20} /> Shopping Bag ({cartItemCount})
              </h3>
              <button type="button" onClick={() => setCartOpen(false)} style={{ color: '#888' }}>
                <X size={20} />
              </button>
            </div>

            <div className="lp-free-shipping-meter">
              <div className="lp-meter-text">
                <span>
                  {cartSubtotal >= freeShippingThreshold
                    ? 'You unlocked FREE worldwide courier shipping!'
                    : `Add ${formatPrice(freeShippingThreshold - cartSubtotal)} more for free shipping`}
                </span>
                <span>{Math.round(freeShippingProgress)}%</span>
              </div>
              <div className="lp-meter-bar">
                <div className="lp-meter-fill" style={{ width: `${freeShippingProgress}%` }} />
              </div>
            </div>

            <div className="lp-drawer-body">
              {cart.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>
                  <ShoppingBag size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
                  <p style={{ fontSize: '14px' }}>Your shopping bag is empty.</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={`${item.product.id}-${item.selectedMetal}`} className="lp-drawer-item">
                    <img src={item.product.images[0]} alt={item.product.name} className="lp-drawer-thumb" />
                    <div className="lp-drawer-item-info">
                      <h4 className="lp-drawer-item-title">{item.product.name}</h4>
                      <p className="lp-drawer-item-variant">{item.selectedMetal}</p>
                      <p className="lp-drawer-item-price">{formatPrice(item.product.price)}</p>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div className="lp-qty-controls">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.product.id, item.selectedMetal, -1)}
                            className="lp-qty-btn"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="lp-qty-val">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(item.product.id, item.selectedMetal, 1)}
                            className="lp-qty-btn"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(item.product.id, item.selectedMetal, -item.quantity)}
                          style={{ fontSize: '11px', color: '#e11d48', textDecoration: 'underline' }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="lp-drawer-footer">
                <div className="lp-drawer-subtotal">
                  <span>Subtotal:</span>
                  <span>{formatPrice(cartSubtotal)}</span>
                </div>
                <p className="lp-drawer-note">
                  Taxes and insured courier calculated at checkout.
                </p>
                <button
                  type="button"
                  onClick={() => showToast('Redirecting to secure Lopez Checkout...')}
                  className="lp-btn lp-btn-primary"
                  style={{ width: '100%' }}
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* WISHLIST DRAWER */}
      {/* ========================================================================= */}
      {wishlistOpen && (
        <div>
          <div className="lp-drawer-overlay" onClick={() => setWishlistOpen(false)} />
          <div className="lp-drawer">
            <div className="lp-drawer-header">
              <h3 className="lp-drawer-title">
                <Heart size={20} fill="#e11d48" style={{ color: '#e11d48' }} /> Saved Wishlist ({wishlist.length})
              </h3>
              <button type="button" onClick={() => setWishlistOpen(false)} style={{ color: '#888' }}>
                <X size={20} />
              </button>
            </div>

            <div className="lp-drawer-body">
              {wishlist.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>
                  <Heart size={40} style={{ margin: '0 auto 12px', opacity: 0.4 }} />
                  <p style={{ fontSize: '14px' }}>Your wishlist is empty.</p>
                </div>
              ) : (
                wishlist.map((id) => {
                  const product = LOPEZ_PRODUCTS.find((p) => p.id === id)
                  if (!product) return null
                  return (
                    <div key={id} className="lp-drawer-item">
                      <img src={product.images[0]} alt={product.name} className="lp-drawer-thumb" />
                      <div className="lp-drawer-item-info">
                        <h4 className="lp-drawer-item-title">{product.name}</h4>
                        <p className="lp-drawer-item-price">{formatPrice(product.price)}</p>
                        <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                          <button
                            type="button"
                            onClick={() => {
                              addToCart(product)
                              toggleWishlist(product.id)
                            }}
                            className="lp-btn lp-btn-primary"
                            style={{ padding: '6px 14px', fontSize: '10px' }}
                          >
                            Move to Bag
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleWishlist(product.id)}
                            style={{ fontSize: '11px', color: '#888' }}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* QUICK VIEW MODAL */}
      {/* ========================================================================= */}
      {quickViewProduct && (
        <div className="lp-modal-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="lp-modal-dialog" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', color: '#888' }}
            >
              <X size={20} />
            </button>

            <div className="lp-modal-grid">
              <div style={{ aspectRatio: '4/5', background: '#f8f8f8', overflow: 'hidden' }}>
                <img
                  src={quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div>
                <span className="lp-section-tag">{quickViewProduct.category}</span>
                <h3 style={{ fontFamily: 'var(--lp-font-serif)', fontSize: '24px', color: '#242424', margin: '4px 0 10px' }}>
                  {quickViewProduct.name}
                </h3>
                <p style={{ fontSize: '18px', fontWeight: 700, color: '#242424', marginBottom: '12px' }}>
                  {formatPrice(quickViewProduct.price)}
                </p>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
                  {quickViewProduct.artisanDescription}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    addToCart(quickViewProduct)
                    setQuickViewProduct(null)
                    setCartOpen(true)
                  }}
                  className="lp-btn lp-btn-primary"
                  style={{ width: '100%', marginBottom: '8px' }}
                >
                  Add to Bag
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const p = quickViewProduct
                    setQuickViewProduct(null)
                    openProductDetail(p)
                  }}
                  className="lp-btn lp-btn-secondary"
                  style={{ width: '100%' }}
                >
                  View Full Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default LopezJewelryStorefront
