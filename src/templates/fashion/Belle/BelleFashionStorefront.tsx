import React, { useState, useEffect, useMemo } from 'react'
import type {
  BelleProduct,
  BelleCategoryType,
  BelleCartItem,
  BelleShopTheLookHotspot,
  BelleStorefrontProps,
} from './types'
import {
  BELLE_PRODUCTS,
  BELLE_SHOP_THE_LOOK_HOTSPOTS,
  BELLE_TESTIMONIALS,
} from './data/belleData'
import './styles/belleFashion.css'

export const BelleFashionStorefront: React.FC<BelleStorefrontProps> = ({
  template: _template,
  device = 'desktop',
  deviceView,
  customAccentColor,
  onUseTemplate: _onUseTemplate,
  onClose: _onClose,
  onBack: _onBack,
}) => {
  const effectiveDevice = deviceView || device || 'desktop'
  const isMobile = effectiveDevice === 'mobile'
  const accentColor = customAccentColor || '#D82253'

  // View Mode: 'home' | 'catalog' | 'pdp'
  const [viewMode, setViewMode] = useState<'home' | 'catalog' | 'pdp'>('home')
  const [selectedProduct, setSelectedProduct] = useState<BelleProduct>(BELLE_PRODUCTS[0])
  const [selectedCategory, setSelectedCategory] = useState<BelleCategoryType | 'All'>('All')
  const [activeTab, setActiveTab] = useState<'all' | 'new' | 'bestseller' | 'featured' | 'sale'>('all')

  // Hero Slider State
  const [activeSlide, setActiveSlide] = useState(0)

  // Drawers and Modals
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<BelleProduct | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)

  // Hotspot State
  const [activeHotspot, setActiveHotspot] = useState<BelleShopTheLookHotspot | null>(null)

  // Cart State
  const [cartItems, setCartItems] = useState<BelleCartItem[]>([
    {
      product: BELLE_PRODUCTS[0],
      color: BELLE_PRODUCTS[0].colors[0]?.name || 'Crimson Red',
      size: 'M',
      quantity: 1,
    },
  ])
  const [wishlistIds, setWishlistIds] = useState<string[]>([BELLE_PRODUCTS[1].id, BELLE_PRODUCTS[2].id])
  const [couponCode, setCouponCode] = useState('')
  const [couponDiscount, setCouponDiscount] = useState(0)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // PDP Variant State
  const [pdpColor, setPdpColor] = useState<string>(BELLE_PRODUCTS[0].colors[0]?.name || 'Crimson Red')
  const [pdpSize, setPdpSize] = useState<string>('M')
  const [pdpImageIdx, setPdpImageIdx] = useState<number>(0)
  const [pdpQty, setPdpQty] = useState<number>(1)
  const [pdpAccordion, setPdpAccordion] = useState<'details' | 'sizing' | 'shipping' | 'care'>('details')

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)

  // Deal of the Day Countdown Timer
  const [countdown, setCountdown] = useState({ hours: 18, minutes: 42, seconds: 19 })
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return { hours: 24, minutes: 0, seconds: 0 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Hero Slides
  const heroSlides = useMemo(
    () => [
      {
        id: 'slide-1',
        eyebrow: 'SPRING / SUMMER 2026',
        title: 'Contemporary Luxury & Effortless Grace',
        subtitle: 'Explore the definitive Ruby runway collection featuring bespoke silks, tailored silhouettes, and artisan details.',
        ctaPrimary: 'SHOP COLLECTION',
        ctaSecondary: 'EXPLORE LOOKBOOK',
        badge: 'NEW ARRIVALS 2026',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1600&auto=format&fit=crop&q=85',
      },
      {
        id: 'slide-2',
        eyebrow: 'EXCLUSIVE ATELIER DROP',
        title: 'Modern Tailoring & Structured Silhouettes',
        subtitle: 'Crafted with premium natural fibers and meticulous tailoring designed to transcend fleeting seasons.',
        ctaPrimary: 'DISCOVER TAILORING',
        ctaSecondary: 'VIEW SPECIAL OFFERS',
        badge: 'UP TO 40% OFF',
        image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1600&auto=format&fit=crop&q=85',
      },
      {
        id: 'slide-3',
        eyebrow: 'STATEMENT ACCESSORIES',
        title: 'Handcrafted Totes, Footwear & Accents',
        subtitle: 'Elevate every ensemble with Italian full-grain leather bags, minimalist footwear, and bespoke jewelry.',
        ctaPrimary: 'EXPLORE ACCESSORIES',
        ctaSecondary: 'READ OUR STORY',
        badge: 'BEST SELLERS',
        image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1600&auto=format&fit=crop&q=85',
      },
    ],
    []
  )

  // Auto-advance hero slides
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % heroSlides.length)
    }, 6000)
    return () => clearInterval(slideTimer)
  }, [heroSlides.length])

  // Toast feedback helper
  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Helper for product badge
  const getProductBadge = (p: BelleProduct) => {
    if (p.isNew) return 'NEW'
    if (p.isSale || p.salePrice) return 'SALE'
    if (p.isFeatured) return 'HOT'
    return null
  }

  // Helper for compare price
  const getComparePrice = (p: BelleProduct) => {
    if (p.salePrice) return p.price
    if (p.isSale) return Math.round(p.price * 1.3)
    return undefined
  }

  const getDisplayPrice = (p: BelleProduct) => {
    if (p.salePrice) return p.salePrice
    return p.price
  }

  // Cart operations
  const addToCart = (product: BelleProduct, color?: string, size = 'M', qty = 1) => {
    const chosenColor = color || product.colors[0]?.name || 'Standard'
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (i) => i.product.id === product.id && i.color === chosenColor && i.size === size
      )
      if (idx > -1) {
        const next = [...prev]
        next[idx].quantity += qty
        return next
      }
      return [
        ...prev,
        {
          product,
          color: chosenColor,
          size,
          quantity: qty,
        },
      ]
    })
    showToast(`Added ${product.name} to shopping bag.`)
  }

  const updateCartQty = (idx: number, delta: number) => {
    setCartItems((prev) => {
      const next = [...prev]
      const newQty = next[idx].quantity + delta
      if (newQty <= 0) {
        next.splice(idx, 1)
      } else {
        next[idx].quantity = newQty
      }
      return next
    })
  }

  const toggleWishlist = (productId: string) => {
    setWishlistIds((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed item from your wishlist.')
        return prev.filter((id) => id !== productId)
      }
      showToast('Saved item to your wishlist.')
      return [...prev, productId]
    })
  }

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    if (couponCode.trim().toUpperCase() === 'RUBY20') {
      setCouponDiscount(20)
      showToast('Coupon RUBY20 applied: $20.00 discount granted!')
    } else if (couponCode.trim()) {
      showToast('Invalid promo code. Use RUBY20 for $20 off.')
    }
  }

  // Cart calculations
  const cartSubtotal = cartItems.reduce((acc, item) => acc + getDisplayPrice(item.product) * item.quantity, 0)
  const freeShippingThreshold = 150
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100))
  const freeShippingDiff = Math.max(0, freeShippingThreshold - cartSubtotal)

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return BELLE_PRODUCTS.filter((product) => {
      // Category Filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false
      }
      // Tab Filter
      if (activeTab === 'new' && !product.isNew) {
        return false
      }
      if (activeTab === 'bestseller' && !product.isFeatured) {
        return false
      }
      if (activeTab === 'featured' && !product.isFeatured) {
        return false
      }
      if (activeTab === 'sale' && !product.isSale && !product.salePrice) {
        return false
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase()
        return (
          product.name.toLowerCase().includes(q) ||
          product.category.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q)
        )
      }
      return true
    })
  }, [selectedCategory, activeTab, searchQuery])

  // Open PDP
  const openPdp = (product: BelleProduct) => {
    setSelectedProduct(product)
    setPdpColor(product.colors[0]?.name || 'Standard')
    setPdpSize('M')
    setPdpImageIdx(0)
    setPdpQty(1)
    setViewMode('pdp')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Newsletter Submit
  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail.includes('@')) {
      setNewsletterSubscribed(true)
      showToast('Thank you for subscribing! Your 15% VIP discount code is RUBY15.')
      setNewsletterEmail('')
    }
  }

  return (
    <div
      className={`ruby-theme-root ${isMobile ? 'ruby-mobile' : ''} ${
        effectiveDevice === 'tablet' ? 'ruby-tablet' : ''
      }`}
      style={{ '--ruby-accent': accentColor } as React.CSSProperties}
    >
      {/* =========================================================================
          EMBEDDED STYLES: SELF-CONTAINED RUBY SHOPIFY THEME CSS
          ========================================================================= */}
      <style>{`
        /* RUBY THEME VARIABLES & FOUNDATION */
        .ruby-theme-root {
          --ruby-crimson: #D82253;
          --ruby-crimson-hover: #B01840;
          --ruby-dark: #1E1E24;
          --ruby-charcoal: #2A2B32;
          --ruby-light: #F9F9F9;
          --ruby-border: #E8E8E8;
          --ruby-text: #333333;
          --ruby-muted: #777777;
          --ruby-star: #F5A623;
          --ruby-font: 'Jost', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          font-family: var(--ruby-font);
          color: var(--ruby-text);
          background-color: #FFFFFF;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          line-height: 1.5;
          -webkit-font-smoothing: antialiased;
        }

        .ruby-theme-root *,
        .ruby-theme-root *::before,
        .ruby-theme-root *::after {
          box-sizing: border-box;
        }

        .ruby-container {
          max-width: 1320px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* TOP UTILITY ANNOUNCEMENT BAR */
        .ruby-topbar {
          background-color: #111115;
          color: #E2E2E6;
          font-size: 12px;
          letter-spacing: 0.04em;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 8px 0;
        }

        .ruby-topbar-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ruby-topbar-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ruby-topbar-left svg {
          color: var(--ruby-crimson);
          flex-shrink: 0;
        }

        .ruby-topbar-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .ruby-topbar-link {
          color: #BDBDC7;
          text-decoration: none;
          background: none;
          border: none;
          font-size: 12px;
          cursor: pointer;
          padding: 0;
          transition: color 0.2s ease;
        }

        .ruby-topbar-link:hover {
          color: #FFFFFF;
        }

        /* MAIN HEADER */
        .ruby-header {
          background: #FFFFFF;
          border-bottom: 1px solid var(--ruby-border);
          position: sticky;
          top: 0;
          z-index: 1000;
          transition: box-shadow 0.25s ease;
        }

        .ruby-header-inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 0;
          min-height: 80px;
        }

        .ruby-mobile-toggle {
          display: none;
          background: none;
          border: 1px solid var(--ruby-border);
          border-radius: 4px;
          padding: 8px;
          cursor: pointer;
          color: var(--ruby-dark);
          align-items: center;
          justify-content: center;
        }

        /* BRAND LOGO */
        .ruby-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: var(--ruby-dark);
          cursor: pointer;
          user-select: none;
        }

        .ruby-logo-gem {
          width: 34px;
          height: 34px;
          background: linear-gradient(135deg, var(--ruby-crimson), #8E0E32);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          font-size: 16px;
          box-shadow: 0 4px 12px rgba(216, 34, 83, 0.35);
          font-weight: 700;
        }

        .ruby-logo-text-wrap {
          display: flex;
          flex-direction: column;
        }

        .ruby-logo-title {
          font-size: 26px;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          line-height: 1;
          color: #111115;
        }

        .ruby-logo-tagline {
          font-size: 9px;
          font-weight: 600;
          letter-spacing: 0.26em;
          color: var(--ruby-crimson);
          text-transform: uppercase;
          margin-top: 4px;
        }

        /* DESKTOP NAVIGATION */
        .ruby-nav {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .ruby-nav-item {
          position: relative;
        }

        .ruby-nav-link {
          font-size: 13.5px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #222226;
          text-decoration: none;
          padding: 8px 0;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          cursor: pointer;
          background: none;
          border: none;
          transition: color 0.2s ease;
        }

        .ruby-nav-link:hover,
        .ruby-nav-link.active {
          color: var(--ruby-crimson);
        }

        .ruby-nav-link.active::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--ruby-crimson);
        }

        /* HEADER ACTIONS */
        .ruby-header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ruby-action-btn {
          background: none;
          border: 1px solid transparent;
          border-radius: 50%;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #222226;
          position: relative;
          transition: all 0.2s ease;
        }

        .ruby-action-btn:hover {
          background: #F4F4F8;
          color: var(--ruby-crimson);
        }

        .ruby-badge-count {
          position: absolute;
          top: 3px;
          right: 3px;
          background: var(--ruby-crimson);
          color: #FFFFFF;
          font-size: 10px;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #FFFFFF;
        }

        .ruby-cart-summary {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
        }

        .ruby-cart-details {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .ruby-cart-title {
          font-size: 11px;
          color: var(--ruby-muted);
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.05em;
        }

        .ruby-cart-amount {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--ruby-dark);
        }

        /* HERO SLIDER */
        .ruby-hero {
          position: relative;
          overflow: hidden;
          background: #111115;
          min-height: 580px;
        }

        .ruby-hero-slide {
          position: relative;
          min-height: 580px;
          display: flex;
          align-items: center;
          background-size: cover;
          background-position: center;
          transition: opacity 0.6s ease;
        }

        .ruby-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(17, 17, 21, 0.78) 0%, rgba(17, 17, 21, 0.45) 50%, rgba(17, 17, 21, 0.15) 100%);
        }

        .ruby-hero-content {
          position: relative;
          z-index: 2;
          max-width: 680px;
          padding: 80px 0;
          color: #FFFFFF;
        }

        .ruby-hero-eyebrow {
          display: inline-block;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #FFFFFF;
          background: var(--ruby-crimson);
          padding: 6px 14px;
          border-radius: 2px;
          margin-bottom: 20px;
        }

        .ruby-hero-title {
          font-size: 52px;
          font-weight: 800;
          line-height: 1.1;
          letter-spacing: -0.01em;
          margin: 0 0 18px 0;
          color: #FFFFFF;
        }

        .ruby-hero-subtitle {
          font-size: 16px;
          color: #D1D1DB;
          line-height: 1.6;
          margin: 0 0 32px 0;
          max-width: 540px;
        }

        .ruby-hero-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .ruby-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 30px;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border-radius: 4px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.25s ease;
          border: 2px solid transparent;
        }

        .ruby-btn-primary {
          background: var(--ruby-crimson);
          color: #FFFFFF;
          border-color: var(--ruby-crimson);
        }

        .ruby-btn-primary:hover {
          background: var(--ruby-crimson-hover);
          border-color: var(--ruby-crimson-hover);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(216, 34, 83, 0.4);
        }

        .ruby-btn-outline-white {
          background: transparent;
          color: #FFFFFF;
          border-color: rgba(255, 255, 255, 0.6);
        }

        .ruby-btn-outline-white:hover {
          background: #FFFFFF;
          color: #111115;
          border-color: #FFFFFF;
        }

        .ruby-hero-controls {
          position: absolute;
          bottom: 30px;
          right: 40px;
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .ruby-hero-dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.35);
          border: none;
          cursor: pointer;
          transition: all 0.25s ease;
        }

        .ruby-hero-dot.active {
          width: 32px;
          border-radius: 8px;
          background: var(--ruby-crimson);
        }

        /* POLICY / SERVICE STRIP */
        .ruby-services {
          background: #FFFFFF;
          border-bottom: 1px solid var(--ruby-border);
          padding: 34px 0;
        }

        .ruby-services-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .ruby-service-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 10px 16px;
        }

        .ruby-service-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #FFF1F4;
          color: var(--ruby-crimson);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 22px;
          flex-shrink: 0;
        }

        .ruby-service-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--ruby-dark);
          margin: 0 0 3px 0;
        }

        .ruby-service-desc {
          font-size: 12.5px;
          color: var(--ruby-muted);
          margin: 0;
        }

        /* PROMOTIONAL CATEGORY BANNERS */
        .ruby-promo-section {
          padding: 60px 0 20px 0;
        }

        .ruby-promo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .ruby-promo-card {
          position: relative;
          height: 380px;
          border-radius: 6px;
          overflow: hidden;
          background-size: cover;
          background-position: center;
          cursor: pointer;
          display: flex;
          align-items: flex-end;
          padding: 30px;
          text-decoration: none;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .ruby-promo-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(0deg, rgba(17, 17, 21, 0.85) 0%, rgba(17, 17, 21, 0.2) 65%, transparent 100%);
          transition: background 0.3s ease;
        }

        .ruby-promo-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
        }

        .ruby-promo-card:hover::before {
          background: linear-gradient(0deg, rgba(216, 34, 83, 0.88) 0%, rgba(17, 17, 21, 0.3) 70%, transparent 100%);
        }

        .ruby-promo-content {
          position: relative;
          z-index: 2;
          color: #FFFFFF;
        }

        .ruby-promo-tag {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #FFFFFF;
          margin-bottom: 8px;
        }

        .ruby-promo-title {
          font-size: 24px;
          font-weight: 800;
          line-height: 1.2;
          margin: 0 0 12px 0;
          color: #FFFFFF;
        }

        .ruby-promo-link {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #FFFFFF;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }

        /* SECTION HEADERS */
        .ruby-section-header {
          text-align: center;
          max-width: 640px;
          margin: 0 auto 36px auto;
        }

        .ruby-section-subtitle {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--ruby-crimson);
          margin-bottom: 8px;
        }

        .ruby-section-title {
          font-size: 34px;
          font-weight: 800;
          color: var(--ruby-dark);
          margin: 0 0 10px 0;
          line-height: 1.2;
        }

        .ruby-section-desc {
          font-size: 14px;
          color: var(--ruby-muted);
          margin: 0;
        }

        /* TABS */
        .ruby-tabs-bar {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 36px;
          flex-wrap: wrap;
        }

        .ruby-tab-pill {
          background: #F4F4F8;
          border: 1px solid transparent;
          color: var(--ruby-dark);
          padding: 10px 22px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ruby-tab-pill:hover {
          background: #EBEBF2;
        }

        .ruby-tab-pill.active {
          background: var(--ruby-crimson);
          color: #FFFFFF;
        }

        /* PRODUCT GRID */
        .ruby-products-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 26px;
        }

        .ruby-product-card {
          background: #FFFFFF;
          border: 1px solid var(--ruby-border);
          border-radius: 6px;
          overflow: hidden;
          transition: all 0.3s ease;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .ruby-product-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
          border-color: #DCDCE6;
        }

        .ruby-card-media {
          position: relative;
          height: 310px;
          overflow: hidden;
          background: #F9F9FC;
          cursor: pointer;
        }

        .ruby-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .ruby-product-card:hover .ruby-card-img {
          transform: scale(1.05);
        }

        .ruby-card-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: var(--ruby-crimson);
          color: #FFFFFF;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 3px;
          z-index: 3;
        }

        .ruby-card-badge.badge-new {
          background: #111115;
        }

        .ruby-card-badge.badge-hot {
          background: #E65100;
        }

        .ruby-card-actions {
          position: absolute;
          bottom: 12px;
          left: 50%;
          transform: translateX(-50%) translateY(20px);
          display: flex;
          align-items: center;
          gap: 8px;
          opacity: 0;
          transition: all 0.25s ease;
          z-index: 4;
        }

        .ruby-product-card:hover .ruby-card-actions {
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }

        .ruby-icon-action {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #FFFFFF;
          color: var(--ruby-dark);
          border: 1px solid var(--ruby-border);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: all 0.2s ease;
        }

        .ruby-icon-action:hover {
          background: var(--ruby-crimson);
          color: #FFFFFF;
          border-color: var(--ruby-crimson);
        }

        .ruby-icon-action.active-wish {
          background: var(--ruby-crimson);
          color: #FFFFFF;
        }

        .ruby-card-body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .ruby-card-category {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--ruby-muted);
          margin-bottom: 4px;
        }

        .ruby-card-title {
          font-size: 15px;
          font-weight: 700;
          color: var(--ruby-dark);
          margin: 0 0 8px 0;
          line-height: 1.35;
          cursor: pointer;
          transition: color 0.2s ease;
        }

        .ruby-card-title:hover {
          color: var(--ruby-crimson);
        }

        .ruby-card-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 10px;
          font-size: 12px;
          color: var(--ruby-star);
        }

        .ruby-card-review-count {
          font-size: 11.5px;
          color: var(--ruby-muted);
          margin-left: 2px;
        }

        .ruby-card-price-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: auto;
          padding-top: 10px;
          border-top: 1px solid #F2F2F6;
        }

        .ruby-card-price {
          font-size: 17px;
          font-weight: 800;
          color: var(--ruby-crimson);
        }

        .ruby-card-compare {
          font-size: 13px;
          color: var(--ruby-muted);
          text-decoration: line-through;
        }

        .ruby-card-quick-add {
          width: 100%;
          margin-top: 12px;
          padding: 9px 12px;
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          border-radius: 4px;
          border: 1px solid var(--ruby-dark);
          background: transparent;
          color: var(--ruby-dark);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ruby-card-quick-add:hover {
          background: var(--ruby-dark);
          color: #FFFFFF;
        }

        /* DEAL OF THE WEEK BANNER */
        .ruby-deal-section {
          margin: 70px 0;
          background: #F8F8FC;
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid var(--ruby-border);
        }

        .ruby-deal-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
        }

        .ruby-deal-image-wrap {
          height: 480px;
          position: relative;
          overflow: hidden;
        }

        .ruby-deal-image-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .ruby-deal-content {
          padding: 60px;
        }

        .ruby-deal-badge {
          display: inline-block;
          background: #FFF1F4;
          color: var(--ruby-crimson);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          padding: 5px 12px;
          border-radius: 20px;
          margin-bottom: 14px;
        }

        .ruby-deal-title {
          font-size: 36px;
          font-weight: 800;
          color: var(--ruby-dark);
          line-height: 1.15;
          margin: 0 0 14px 0;
        }

        .ruby-deal-desc {
          font-size: 14.5px;
          color: var(--ruby-muted);
          line-height: 1.6;
          margin: 0 0 24px 0;
        }

        .ruby-countdown-wrap {
          display: flex;
          gap: 16px;
          margin-bottom: 30px;
        }

        .ruby-countdown-box {
          background: #FFFFFF;
          border: 1px solid var(--ruby-border);
          border-radius: 6px;
          padding: 12px 18px;
          text-align: center;
          min-width: 72px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
        }

        .ruby-countdown-num {
          font-size: 24px;
          font-weight: 800;
          color: var(--ruby-crimson);
          display: block;
          line-height: 1;
        }

        .ruby-countdown-label {
          font-size: 10.5px;
          color: var(--ruby-muted);
          text-transform: uppercase;
          font-weight: 600;
          margin-top: 4px;
          display: block;
        }

        /* SHOP THE LOOK (HOTSPOTS) */
        .ruby-look-section {
          padding: 60px 0;
        }

        .ruby-look-wrap {
          position: relative;
          height: 520px;
          border-radius: 8px;
          overflow: hidden;
          background-size: cover;
          background-position: center;
        }

        .ruby-look-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0, 0, 0, 0.2);
        }

        .ruby-hotspot-pin {
          position: absolute;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: var(--ruby-crimson);
          color: #FFFFFF;
          border: 3px solid #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: bold;
          cursor: pointer;
          transform: translate(-50%, -50%);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.3);
          z-index: 5;
          transition: transform 0.2s ease;
        }

        .ruby-hotspot-pin:hover {
          transform: translate(-50%, -50%) scale(1.2);
        }

        .ruby-hotspot-card {
          position: absolute;
          background: #FFFFFF;
          border-radius: 6px;
          padding: 12px 16px;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.18);
          z-index: 10;
          width: 210px;
          transform: translate(-50%, 15px);
          border: 1px solid var(--ruby-border);
        }

        .ruby-hotspot-card h4 {
          font-size: 13px;
          font-weight: 700;
          margin: 0 0 4px 0;
          color: var(--ruby-dark);
        }

        .ruby-hotspot-card p {
          font-size: 12.5px;
          font-weight: 700;
          color: var(--ruby-crimson);
          margin: 0 0 8px 0;
        }

        .ruby-hotspot-add {
          width: 100%;
          padding: 6px;
          background: var(--ruby-dark);
          color: #FFFFFF;
          border: none;
          border-radius: 3px;
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          cursor: pointer;
        }

        /* TESTIMONIALS */
        .ruby-testimonials-section {
          padding: 70px 0;
          background: #FFFFFF;
        }

        .ruby-testimonials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .ruby-testimonial-card {
          background: #FAFAFC;
          border: 1px solid var(--ruby-border);
          border-radius: 6px;
          padding: 30px;
          display: flex;
          flex-direction: column;
          position: relative;
        }

        .ruby-testi-quote-icon {
          font-size: 32px;
          color: var(--ruby-crimson);
          line-height: 1;
          margin-bottom: 12px;
          opacity: 0.6;
        }

        .ruby-testi-text {
          font-size: 14.5px;
          color: #44444E;
          line-height: 1.65;
          margin: 0 0 20px 0;
          flex-grow: 1;
          font-style: italic;
        }

        .ruby-testi-author-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .ruby-testi-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: var(--ruby-crimson);
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          font-size: 15px;
        }

        .ruby-testi-meta h4 {
          font-size: 14px;
          font-weight: 700;
          margin: 0;
          color: var(--ruby-dark);
        }

        .ruby-testi-meta p {
          font-size: 12px;
          color: var(--ruby-muted);
          margin: 2px 0 0 0;
        }

        /* LATEST JOURNAL / BLOG SECTION */
        .ruby-blog-section {
          padding: 60px 0;
          border-top: 1px solid var(--ruby-border);
        }

        .ruby-blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 26px;
        }

        .ruby-blog-card {
          border: 1px solid var(--ruby-border);
          border-radius: 6px;
          overflow: hidden;
          background: #FFFFFF;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .ruby-blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .ruby-blog-img-wrap {
          height: 220px;
          overflow: hidden;
          background: #F4F4F8;
        }

        .ruby-blog-img-wrap img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .ruby-blog-card:hover .ruby-blog-img-wrap img {
          transform: scale(1.06);
        }

        .ruby-blog-content {
          padding: 22px;
        }

        .ruby-blog-meta {
          font-size: 11.5px;
          font-weight: 600;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ruby-crimson);
          margin-bottom: 8px;
        }

        .ruby-blog-title {
          font-size: 17px;
          font-weight: 700;
          color: var(--ruby-dark);
          line-height: 1.35;
          margin: 0 0 10px 0;
        }

        .ruby-blog-desc {
          font-size: 13.5px;
          color: var(--ruby-muted);
          line-height: 1.55;
          margin: 0 0 14px 0;
        }

        .ruby-blog-link {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--ruby-dark);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: color 0.2s ease;
        }

        .ruby-blog-link:hover {
          color: var(--ruby-crimson);
        }

        /* NEWSLETTER SECTION */
        .ruby-newsletter-section {
          background: #111115;
          color: #FFFFFF;
          padding: 60px 0;
          text-align: center;
        }

        .ruby-newsletter-inner {
          max-width: 620px;
          margin: 0 auto;
        }

        .ruby-newsletter-title {
          font-size: 32px;
          font-weight: 800;
          margin: 0 0 10px 0;
          color: #FFFFFF;
        }

        .ruby-newsletter-desc {
          font-size: 14.5px;
          color: #B5B5C2;
          margin: 0 0 26px 0;
          line-height: 1.6;
        }

        .ruby-newsletter-form {
          display: flex;
          gap: 8px;
          max-width: 520px;
          margin: 0 auto;
        }

        .ruby-newsletter-input {
          flex: 1;
          padding: 14px 18px;
          font-size: 13.5px;
          border: 1px solid rgba(255, 255, 255, 0.25);
          border-radius: 4px;
          background: rgba(255, 255, 255, 0.08);
          color: #FFFFFF;
          outline: none;
        }

        .ruby-newsletter-input:focus {
          border-color: var(--ruby-crimson);
          background: rgba(255, 255, 255, 0.12);
        }

        .ruby-newsletter-btn {
          padding: 14px 28px;
          background: var(--ruby-crimson);
          color: #FFFFFF;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s ease;
        }

        .ruby-newsletter-btn:hover {
          background: var(--ruby-crimson-hover);
        }

        /* FOOTER */
        .ruby-footer {
          background: #F8F8FC;
          border-top: 1px solid var(--ruby-border);
          padding: 60px 0 24px 0;
        }

        .ruby-footer-grid {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr 1fr;
          gap: 36px;
          margin-bottom: 48px;
        }

        .ruby-footer-col h4 {
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--ruby-dark);
          margin: 0 0 18px 0;
        }

        .ruby-footer-col ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .ruby-footer-col li {
          margin-bottom: 10px;
        }

        .ruby-footer-col a {
          color: var(--ruby-muted);
          text-decoration: none;
          font-size: 13.5px;
          transition: color 0.2s ease;
        }

        .ruby-footer-col a:hover {
          color: var(--ruby-crimson);
        }

        .ruby-footer-brand-p {
          font-size: 13.5px;
          color: var(--ruby-muted);
          line-height: 1.65;
          margin: 14px 0 16px 0;
        }

        .ruby-footer-contact-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13px;
          color: var(--ruby-text);
          margin-bottom: 6px;
        }

        .ruby-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid var(--ruby-border);
          font-size: 12.5px;
          color: var(--ruby-muted);
        }

        .ruby-payment-strip {
          display: flex;
          gap: 8px;
        }

        .ruby-payment-badge {
          background: #FFFFFF;
          border: 1px solid var(--ruby-border);
          border-radius: 3px;
          padding: 4px 8px;
          font-size: 10px;
          font-weight: 700;
          color: var(--ruby-dark);
        }

        /* DRAWER BACKDROP & SHEETS */
        .ruby-drawer-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(2px);
          z-index: 2000;
          display: flex;
          justify-content: flex-end;
        }

        .ruby-drawer {
          width: 420px;
          max-width: 100vw;
          background: #FFFFFF;
          height: 100%;
          display: flex;
          flex-direction: column;
          animation: slideDrawer 0.25s ease-out;
        }

        @keyframes slideDrawer {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .ruby-drawer-header {
          padding: 18px 22px;
          border-bottom: 1px solid var(--ruby-border);
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ruby-drawer-title {
          font-size: 17px;
          font-weight: 800;
          color: var(--ruby-dark);
          margin: 0;
        }

        .ruby-drawer-close {
          background: none;
          border: none;
          font-size: 22px;
          cursor: pointer;
          color: var(--ruby-muted);
        }

        .ruby-drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 22px;
        }

        .ruby-drawer-footer {
          padding: 20px 22px;
          border-top: 1px solid var(--ruby-border);
          background: #FAFAFC;
        }

        /* CART DRAWER SPECIFICS */
        .ruby-free-shipping-bar {
          background: #F4F4F8;
          border-radius: 6px;
          padding: 12px 14px;
          margin-bottom: 18px;
          font-size: 12.5px;
        }

        .ruby-meter-track {
          height: 6px;
          background: #E0E0EB;
          border-radius: 4px;
          margin-top: 6px;
          overflow: hidden;
        }

        .ruby-meter-fill {
          height: 100%;
          background: var(--ruby-crimson);
          border-radius: 4px;
          transition: width 0.3s ease;
        }

        .ruby-cart-item {
          display: flex;
          gap: 14px;
          padding-bottom: 16px;
          margin-bottom: 16px;
          border-bottom: 1px solid #F0F0F5;
        }

        .ruby-cart-item-img {
          width: 70px;
          height: 85px;
          border-radius: 4px;
          object-fit: cover;
          background: #F8F8FC;
        }

        .ruby-cart-item-info {
          flex: 1;
        }

        .ruby-cart-item-name {
          font-size: 13.5px;
          font-weight: 700;
          color: var(--ruby-dark);
          margin: 0 0 4px 0;
        }

        .ruby-cart-item-variant {
          font-size: 11.5px;
          color: var(--ruby-muted);
          margin: 0 0 6px 0;
        }

        .ruby-cart-item-price {
          font-size: 14px;
          font-weight: 700;
          color: var(--ruby-crimson);
        }

        .ruby-qty-control {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--ruby-border);
          border-radius: 3px;
          overflow: hidden;
          margin-top: 6px;
        }

        .ruby-qty-btn {
          background: #FFFFFF;
          border: none;
          padding: 4px 10px;
          font-size: 12px;
          cursor: pointer;
        }

        .ruby-qty-val {
          padding: 4px 10px;
          font-size: 12px;
          font-weight: 700;
        }

        /* MODAL POPUPS */
        .ruby-modal-backdrop {
          position: fixed;
          inset: 0;
          background: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(3px);
          z-index: 2100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .ruby-modal {
          background: #FFFFFF;
          border-radius: 8px;
          max-width: 820px;
          width: 100%;
          overflow: hidden;
          position: relative;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
          max-height: 90vh;
          overflow-y: auto;
        }

        .ruby-quickview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }

        .ruby-quickview-media {
          height: 440px;
          background: #F8F8FC;
        }

        .ruby-quickview-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .ruby-quickview-info {
          padding: 30px;
        }

        /* PDP VIEW */
        .ruby-pdp-section {
          padding: 40px 0 80px 0;
        }

        .ruby-pdp-breadcrumb {
          margin-bottom: 24px;
          font-size: 12.5px;
          color: var(--ruby-muted);
        }

        .ruby-pdp-breadcrumb a {
          color: var(--ruby-dark);
          text-decoration: none;
          font-weight: 600;
        }

        .ruby-pdp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
        }

        .ruby-pdp-gallery-main {
          height: 520px;
          border-radius: 6px;
          overflow: hidden;
          background: #F9F9FC;
          margin-bottom: 14px;
        }

        .ruby-pdp-gallery-main img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .ruby-pdp-thumbs {
          display: flex;
          gap: 12px;
        }

        .ruby-pdp-thumb {
          width: 80px;
          height: 95px;
          border-radius: 4px;
          overflow: hidden;
          border: 2px solid transparent;
          cursor: pointer;
        }

        .ruby-pdp-thumb.active {
          border-color: var(--ruby-crimson);
        }

        .ruby-pdp-thumb img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .ruby-pdp-title {
          font-size: 32px;
          font-weight: 800;
          color: var(--ruby-dark);
          margin: 0 0 10px 0;
          line-height: 1.2;
        }

        .ruby-pdp-price-wrap {
          display: flex;
          align-items: baseline;
          gap: 12px;
          margin: 16px 0;
        }

        .ruby-pdp-price {
          font-size: 26px;
          font-weight: 800;
          color: var(--ruby-crimson);
        }

        .ruby-pdp-compare {
          font-size: 17px;
          color: var(--ruby-muted);
          text-decoration: line-through;
        }

        .ruby-size-chips {
          display: flex;
          gap: 8px;
          margin-top: 8px;
        }

        .ruby-size-chip {
          padding: 8px 16px;
          border: 1px solid var(--ruby-border);
          border-radius: 4px;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          background: #FFFFFF;
        }

        .ruby-size-chip.active {
          background: var(--ruby-dark);
          color: #FFFFFF;
          border-color: var(--ruby-dark);
        }

        /* TOAST NOTIFICATION */
        .ruby-toast {
          position: fixed;
          bottom: 24px;
          right: 24px;
          background: #111115;
          color: #FFFFFF;
          padding: 14px 22px;
          border-radius: 6px;
          font-size: 13.5px;
          font-weight: 600;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
          z-index: 3000;
          display: flex;
          align-items: center;
          gap: 10px;
          animation: toastIn 0.25s ease-out;
        }

        @keyframes toastIn {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        /* RESPONSIVE: TABLET BREAKPOINT (768px - 1024px) */
        @media (max-width: 1024px) {
          .ruby-services-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .ruby-promo-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .ruby-promo-card:last-child {
            grid-column: span 2;
          }
          .ruby-products-grid {
            grid-template-columns: repeat(3, 1fr);
          }
          .ruby-deal-grid {
            grid-template-columns: 1fr;
          }
          .ruby-deal-image-wrap {
            height: 340px;
          }
          .ruby-deal-content {
            padding: 36px 24px;
          }
          .ruby-testimonials-grid {
            grid-template-columns: 1fr;
          }
          .ruby-blog-grid {
            grid-template-columns: 1fr;
          }
          .ruby-footer-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* RESPONSIVE: MOBILE BREAKPOINT (<= 768px) & SIMULATED MOBILE */
        @media (max-width: 768px), (max-width: 480px) {
          .ruby-topbar-right {
            display: none;
          }
          .ruby-topbar-inner {
            justify-content: center;
            font-size: 11px;
            text-align: center;
          }
          .ruby-nav {
            display: none;
          }
          .ruby-mobile-toggle {
            display: flex;
          }
          .ruby-header-inner {
            display: grid;
            grid-template-columns: 1fr auto 1fr;
            align-items: center;
            min-height: 60px;
            padding: 10px 0;
          }
          .ruby-mobile-toggle {
            justify-self: start;
          }
          .ruby-logo {
            justify-self: center;
          }
          .ruby-header-actions {
            justify-self: end;
            gap: 6px;
          }
          .ruby-cart-details {
            display: none;
          }
          .ruby-hero {
            min-height: 420px;
          }
          .ruby-hero-slide {
            min-height: 420px;
          }
          .ruby-hero-title {
            font-size: 32px;
          }
          .ruby-hero-subtitle {
            font-size: 14px;
          }
          .ruby-services-grid {
            grid-template-columns: 1fr;
          }
          .ruby-promo-grid {
            grid-template-columns: 1fr;
          }
          .ruby-promo-card:last-child {
            grid-column: span 1;
          }
          .ruby-products-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
          .ruby-card-media {
            height: 200px;
          }
          .ruby-pdp-grid {
            grid-template-columns: 1fr;
          }
          .ruby-quickview-grid {
            grid-template-columns: 1fr;
          }
          .ruby-newsletter-form {
            flex-direction: column;
          }
          .ruby-footer-grid {
            grid-template-columns: 1fr;
          }
          .ruby-footer-bottom {
            flex-direction: column;
            gap: 12px;
            text-align: center;
          }
        }

        /* SCOPED SIMULATED FRAME OVERRIDES */
        .ruby-theme-root.ruby-mobile .ruby-topbar-right { display: none !important; }
        .ruby-theme-root.ruby-mobile .ruby-nav { display: none !important; }
        .ruby-theme-root.ruby-mobile .ruby-mobile-toggle { display: flex !important; }
        .ruby-theme-root.ruby-mobile .ruby-header-inner {
          display: grid !important;
          grid-template-columns: 1fr auto 1fr !important;
          min-height: 56px !important;
          padding: 8px 0 !important;
        }
        .ruby-theme-root.ruby-mobile .ruby-mobile-toggle { justify-self: start !important; }
        .ruby-theme-root.ruby-mobile .ruby-logo { justify-self: center !important; }
        .ruby-theme-root.ruby-mobile .ruby-header-actions { justify-self: end !important; }
        .ruby-theme-root.ruby-mobile .ruby-cart-details { display: none !important; }
        .ruby-theme-root.ruby-mobile .ruby-products-grid {
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 10px !important;
        }
        .ruby-theme-root.ruby-mobile .ruby-card-media { height: 180px !important; }
        .ruby-theme-root.ruby-mobile .ruby-hero { min-height: 380px !important; }
        .ruby-theme-root.ruby-mobile .ruby-hero-slide { min-height: 380px !important; }
        .ruby-theme-root.ruby-mobile .ruby-hero-title { font-size: 26px !important; }
        .ruby-theme-root.ruby-mobile .ruby-services-grid,
        .ruby-theme-root.ruby-mobile .ruby-promo-grid,
        .ruby-theme-root.ruby-mobile .ruby-deal-grid,
        .ruby-theme-root.ruby-mobile .ruby-testimonials-grid,
        .ruby-theme-root.ruby-mobile .ruby-blog-grid,
        .ruby-theme-root.ruby-mobile .ruby-footer-grid,
        .ruby-theme-root.ruby-mobile .ruby-pdp-grid {
          grid-template-columns: 1fr !important;
        }
      `}</style>

      {/* =========================================================================
          SECTION 1: TOP ANNOUNCEMENT BAR
          ========================================================================= */}
      <div className="ruby-topbar">
        <div className="ruby-container ruby-topbar-inner">
          <div className="ruby-topbar-left">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
            <span>Free Shipping Worldwide On Orders Over $150 — 7 Days A Week</span>
          </div>

          <div className="ruby-topbar-right">
            <button
              type="button"
              className="ruby-topbar-link"
              onClick={() => showToast('Currency selected: USD ($)')}
            >
              USD ($) ▾
            </button>
            <button
              type="button"
              className="ruby-topbar-link"
              onClick={() => showToast('Order Tracking Concierge: Enter order ID')}
            >
              Track Order
            </button>
            <button
              type="button"
              className="ruby-topbar-link"
              onClick={() => setWishlistOpen(true)}
            >
              Wishlist ({wishlistIds.length})
            </button>
            <button
              type="button"
              className="ruby-topbar-link"
              onClick={() => showToast('VIP Stylist Support: Available 24/7')}
            >
              Need Help?
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SECTION 2: MAIN NAVIGATION & UTILITY HEADER
          ========================================================================= */}
      <header className="ruby-header">
        <div className="ruby-container ruby-header-inner">
          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className="ruby-mobile-toggle"
            aria-label="Open navigation menu"
            onClick={() => setMobileMenuOpen(true)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </button>

          {/* Ruby Brand Logo */}
          <div
            className="ruby-logo"
            onClick={() => {
              setViewMode('home')
              setSelectedCategory('All')
            }}
          >
            <div className="ruby-logo-gem">R</div>
            <div className="ruby-logo-text-wrap">
              <span className="ruby-logo-title">RUBY</span>
              <span className="ruby-logo-tagline">FASHION ATELIER</span>
            </div>
          </div>

          {/* Desktop Navigation Menu */}
          <nav>
            <ul className="ruby-nav">
              <li className="ruby-nav-item">
                <button
                  type="button"
                  className={`ruby-nav-link ${viewMode === 'home' && selectedCategory === 'All' ? 'active' : ''}`}
                  onClick={() => {
                    setViewMode('home')
                    setSelectedCategory('All')
                  }}
                >
                  Home
                </button>
              </li>
              <li className="ruby-nav-item">
                <button
                  type="button"
                  className={`ruby-nav-link ${viewMode === 'catalog' ? 'active' : ''}`}
                  onClick={() => setViewMode('catalog')}
                >
                  Shop
                </button>
              </li>
              <li className="ruby-nav-item">
                <button
                  type="button"
                  className={`ruby-nav-link ${selectedCategory === 'Women' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory('Women')
                    setViewMode('catalog')
                  }}
                >
                  Women
                </button>
              </li>
              <li className="ruby-nav-item">
                <button
                  type="button"
                  className={`ruby-nav-link ${selectedCategory === 'Men' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory('Men')
                    setViewMode('catalog')
                  }}
                >
                  Men
                </button>
              </li>
              <li className="ruby-nav-item">
                <button
                  type="button"
                  className={`ruby-nav-link ${selectedCategory === 'Accessories' ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCategory('Accessories')
                    setViewMode('catalog')
                  }}
                >
                  Accessories
                </button>
              </li>
              <li className="ruby-nav-item">
                <button
                  type="button"
                  className="ruby-nav-link"
                  onClick={() => showToast('Opening Ruby Lookbook Editorial')}
                >
                  Lookbook
                </button>
              </li>
              <li className="ruby-nav-item">
                <button
                  type="button"
                  className="ruby-nav-link"
                  onClick={() => showToast('Ruby Journal & Fashion Editorial')}
                >
                  Journal
                </button>
              </li>
            </ul>
          </nav>

          {/* Header Action Controls */}
          <div className="ruby-header-actions">
            {/* Search Button */}
            <button
              type="button"
              className="ruby-action-btn"
              title="Search store"
              onClick={() => setSearchOpen(!searchOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>

            {/* Wishlist Button */}
            <button
              type="button"
              className="ruby-action-btn"
              title="View Wishlist"
              onClick={() => setWishlistOpen(true)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistIds.length > 0 && <span className="ruby-badge-count">{wishlistIds.length}</span>}
            </button>

            {/* Shopping Bag Button */}
            <div className="ruby-cart-summary" onClick={() => setCartOpen(true)}>
              <div className="ruby-action-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
                <span className="ruby-badge-count">{cartItems.reduce((s, i) => s + i.quantity, 0)}</span>
              </div>
              <div className="ruby-cart-details">
                <span className="ruby-cart-title">My Bag</span>
                <span className="ruby-cart-amount">${cartSubtotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Live Search Bar Dropdown */}
        {searchOpen && (
          <div style={{ background: '#F9F9FC', padding: '12px 0', borderTop: '1px solid var(--ruby-border)' }}>
            <div className="ruby-container" style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Search Ruby collection (e.g., Blazer, Trench, Silk, Leather)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '12px 18px',
                  borderRadius: '4px',
                  border: '1px solid #D6D6E0',
                  fontSize: '14px',
                  outline: 'none',
                }}
                autoFocus
              />
              <button
                type="button"
                className="ruby-btn ruby-btn-primary"
                onClick={() => setViewMode('catalog')}
              >
                Search
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          VIEW MODE ROUTER: HOME VS CATALOG VS PDP
          ========================================================================= */}
      {viewMode === 'pdp' ? (
        /* PRODUCT DETAIL PAGE (PDP) */
        <main className="ruby-pdp-section">
          <div className="ruby-container">
            <div className="ruby-pdp-breadcrumb">
              <a href="#home" onClick={(e) => { e.preventDefault(); setViewMode('home') }}>Home</a> /{' '}
              <a href="#catalog" onClick={(e) => { e.preventDefault(); setViewMode('catalog') }}>{selectedProduct.category}</a> /{' '}
              <span>{selectedProduct.name}</span>
            </div>

            <div className="ruby-pdp-grid">
              {/* Media Gallery */}
              <div>
                <div className="ruby-pdp-gallery-main">
                  <img
                    src={selectedProduct.gallery[pdpImageIdx] || selectedProduct.image}
                    alt={selectedProduct.name}
                  />
                </div>
                <div className="ruby-pdp-thumbs">
                  {selectedProduct.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className={`ruby-pdp-thumb ${pdpImageIdx === idx ? 'active' : ''}`}
                      onClick={() => setPdpImageIdx(idx)}
                    >
                      <img src={img} alt={`Thumb ${idx}`} />
                    </div>
                  ))}
                </div>
              </div>

              {/* Product Info & Actions */}
              <div>
                <div style={{ fontSize: '12px', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--ruby-crimson)', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {selectedProduct.category} • SKU: {selectedProduct.id}
                </div>
                <h1 className="ruby-pdp-title">{selectedProduct.name}</h1>

                <div className="ruby-card-rating" style={{ fontSize: '14px', margin: '10px 0' }}>
                  {'★'.repeat(5)}
                  <span className="ruby-card-review-count">({selectedProduct.reviewCount} verified client reviews)</span>
                </div>

                <div className="ruby-pdp-price-wrap">
                  <span className="ruby-pdp-price">${getDisplayPrice(selectedProduct).toFixed(2)}</span>
                  {getComparePrice(selectedProduct) && (
                    <span className="ruby-pdp-compare">${getComparePrice(selectedProduct)?.toFixed(2)}</span>
                  )}
                  {getProductBadge(selectedProduct) && (
                    <span className="ruby-card-badge" style={{ position: 'static' }}>
                      {getProductBadge(selectedProduct)}
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '14.5px', color: '#555560', lineHeight: 1.6, marginBottom: '24px' }}>
                  {selectedProduct.description}
                </p>

                {/* Color Selector */}
                {selectedProduct.colors.length > 0 && (
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' }}>
                      Color: <span style={{ fontWeight: 500, color: 'var(--ruby-muted)' }}>{pdpColor}</span>
                    </label>
                    <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                      {selectedProduct.colors.map((c) => (
                        <button
                          key={c.name}
                          type="button"
                          onClick={() => setPdpColor(c.name)}
                          title={c.name}
                          style={{
                            width: '28px',
                            height: '28px',
                            borderRadius: '50%',
                            backgroundColor: c.hex,
                            border: pdpColor === c.name ? '3px solid var(--ruby-crimson)' : '1px solid #CCC',
                            cursor: 'pointer',
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <label style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase' }}>
                      Size: <span style={{ fontWeight: 500, color: 'var(--ruby-muted)' }}>{pdpSize}</span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setSizeGuideOpen(true)}
                      style={{ background: 'none', border: 'none', color: 'var(--ruby-crimson)', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                    >
                      Size Guide 📏
                    </button>
                  </div>
                  <div className="ruby-size-chips">
                    {selectedProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        className={`ruby-size-chip ${pdpSize === sz ? 'active' : ''}`}
                        onClick={() => setPdpSize(sz)}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & CTA */}
                <div style={{ display: 'flex', gap: '14px', alignItems: 'center', marginBottom: '32px' }}>
                  <div className="ruby-qty-control" style={{ padding: '6px' }}>
                    <button type="button" className="ruby-qty-btn" onClick={() => setPdpQty(Math.max(1, pdpQty - 1))}>-</button>
                    <span className="ruby-qty-val" style={{ fontSize: '15px' }}>{pdpQty}</span>
                    <button type="button" className="ruby-qty-btn" onClick={() => setPdpQty(pdpQty + 1)}>+</button>
                  </div>
                  <button
                    type="button"
                    className="ruby-btn ruby-btn-primary"
                    style={{ flex: 1 }}
                    onClick={() => addToCart(selectedProduct, pdpColor, pdpSize, pdpQty)}
                  >
                    ADD TO BAG • ${(getDisplayPrice(selectedProduct) * pdpQty).toFixed(2)}
                  </button>
                  <button
                    type="button"
                    className="ruby-action-btn"
                    title="Toggle Wishlist"
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    style={{ width: '48px', height: '48px', border: '1px solid var(--ruby-border)' }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill={wishlistIds.includes(selectedProduct.id) ? 'var(--ruby-crimson)' : 'none'} stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>

                {/* Accordions */}
                <div style={{ borderTop: '1px solid var(--ruby-border)' }}>
                  <div style={{ borderBottom: '1px solid var(--ruby-border)' }}>
                    <button
                      type="button"
                      onClick={() => setPdpAccordion(pdpAccordion === 'details' ? 'details' : 'details')}
                      style={{ width: '100%', padding: '16px 0', background: 'none', border: 'none', textAlign: 'left', fontWeight: 700, fontSize: '14px', cursor: 'pointer', display: 'flex', justifyContent: 'space-between' }}
                    >
                      <span>DETAILS & SPECIFICATIONS</span>
                      <span>▾</span>
                    </button>
                    {pdpAccordion === 'details' && (
                      <div style={{ paddingBottom: '16px', fontSize: '13.5px', color: '#555560', lineHeight: 1.6 }}>
                        <ul style={{ paddingLeft: '20px', margin: 0 }}>
                          {selectedProduct.details.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                          <li>Materials & Care: {selectedProduct.materialsAndCare}</li>
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        /* HOME / CATALOG VIEW */
        <main>
          {viewMode === 'home' && (
            <>
              {/* =========================================================================
                  SECTION 3: HERO SLIDESHOW
                  ========================================================================= */}
              <section className="ruby-hero">
                <div
                  className="ruby-hero-slide"
                  style={{ backgroundImage: `url(${heroSlides[activeSlide].image})` }}
                >
                  <div className="ruby-hero-overlay" />
                  <div className="ruby-container ruby-hero-content">
                    <span className="ruby-hero-eyebrow">{heroSlides[activeSlide].eyebrow}</span>
                    <h1 className="ruby-hero-title">{heroSlides[activeSlide].title}</h1>
                    <p className="ruby-hero-subtitle">{heroSlides[activeSlide].subtitle}</p>
                    <div className="ruby-hero-actions">
                      <button
                        type="button"
                        className="ruby-btn ruby-btn-primary"
                        onClick={() => setViewMode('catalog')}
                      >
                        {heroSlides[activeSlide].ctaPrimary} →
                      </button>
                      <button
                        type="button"
                        className="ruby-btn ruby-btn-outline-white"
                        onClick={() => showToast('Viewing Ruby 2026 Editorial Lookbook')}
                      >
                        {heroSlides[activeSlide].ctaSecondary}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Slider Pagination Dots */}
                <div className="ruby-hero-controls">
                  {heroSlides.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`ruby-hero-dot ${activeSlide === idx ? 'active' : ''}`}
                      onClick={() => setActiveSlide(idx)}
                      aria-label={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </section>

              {/* =========================================================================
                  SECTION 4: SERVICE & POLICY TRUST STRIP
                  ========================================================================= */}
              <section className="ruby-services">
                <div className="ruby-container ruby-services-grid">
                  <div className="ruby-service-item">
                    <div className="ruby-service-icon">🚚</div>
                    <div>
                      <h4 className="ruby-service-title">Free Worldwide Shipping</h4>
                      <p className="ruby-service-desc">On all orders over $150 — 7 days a week</p>
                    </div>
                  </div>

                  <div className="ruby-service-item">
                    <div className="ruby-service-icon">💬</div>
                    <div>
                      <h4 className="ruby-service-title">24/7 Dedicated Support</h4>
                      <p className="ruby-service-desc">Personalized styling & instant live chat</p>
                    </div>
                  </div>

                  <div className="ruby-service-item">
                    <div className="ruby-service-icon">🔄</div>
                    <div>
                      <h4 className="ruby-service-title">30-Day Money Back</h4>
                      <p className="ruby-service-desc">Hassle-free global returns & exchanges</p>
                    </div>
                  </div>

                  <div className="ruby-service-item">
                    <div className="ruby-service-icon">🔒</div>
                    <div>
                      <h4 className="ruby-service-title">100% Secure Checkout</h4>
                      <p className="ruby-service-desc">256-bit SSL encrypted transactions</p>
                    </div>
                  </div>
                </div>
              </section>

              {/* =========================================================================
                  SECTION 5: PROMOTIONAL CATEGORY BANNERS (3-TILE GRID)
                  ========================================================================= */}
              <section className="ruby-promo-section">
                <div className="ruby-container">
                  <div className="ruby-promo-grid">
                    <div
                      className="ruby-promo-card"
                      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80)` }}
                      onClick={() => {
                        setSelectedCategory('Women')
                        setViewMode('catalog')
                      }}
                    >
                      <div className="ruby-promo-content">
                        <span className="ruby-promo-tag">NEW COLLECTION</span>
                        <h3 className="ruby-promo-title">Women’s Runway Edit</h3>
                        <span className="ruby-promo-link">Shop Collection →</span>
                      </div>
                    </div>

                    <div
                      className="ruby-promo-card"
                      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80)` }}
                      onClick={() => {
                        setSelectedCategory('Men')
                        setViewMode('catalog')
                      }}
                    >
                      <div className="ruby-promo-content">
                        <span className="ruby-promo-tag">CONTEMPORARY MEN</span>
                        <h3 className="ruby-promo-title">Tailored Silhouettes</h3>
                        <span className="ruby-promo-link">Explore Now →</span>
                      </div>
                    </div>

                    <div
                      className="ruby-promo-card"
                      style={{ backgroundImage: `url(https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80)` }}
                      onClick={() => {
                        setSelectedCategory('Accessories')
                        setViewMode('catalog')
                      }}
                    >
                      <div className="ruby-promo-content">
                        <span className="ruby-promo-tag">SPECIAL DROP</span>
                        <h3 className="ruby-promo-title">Leather Bags & Accents</h3>
                        <span className="ruby-promo-link">Discover Details →</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* =========================================================================
              SECTION 6: FEATURED PRODUCTS & CATEGORY CATALOG
              ========================================================================= */}
          <section style={{ padding: '60px 0' }}>
            <div className="ruby-container">
              <div className="ruby-section-header">
                <span className="ruby-section-subtitle">HANDCRAFTED PERFECTION</span>
                <h2 className="ruby-section-title">
                  {viewMode === 'catalog' ? 'All Collection Products' : 'Featured Runway Pieces'}
                </h2>
                <p className="ruby-section-desc">
                  Curated luxury apparel, tailored silhouettes, and timeless essentials engineered for daily refinement.
                </p>
              </div>

              {/* Filter Tabs */}
              <div className="ruby-tabs-bar">
                <button
                  type="button"
                  className={`ruby-tab-pill ${activeTab === 'all' && selectedCategory === 'All' ? 'active' : ''}`}
                  onClick={() => {
                    setActiveTab('all')
                    setSelectedCategory('All')
                  }}
                >
                  All Items
                </button>
                <button
                  type="button"
                  className={`ruby-tab-pill ${activeTab === 'new' ? 'active' : ''}`}
                  onClick={() => setActiveTab('new')}
                >
                  New In
                </button>
                <button
                  type="button"
                  className={`ruby-tab-pill ${activeTab === 'bestseller' ? 'active' : ''}`}
                  onClick={() => setActiveTab('bestseller')}
                >
                  Best Sellers
                </button>
                <button
                  type="button"
                  className={`ruby-tab-pill ${activeTab === 'sale' ? 'active' : ''}`}
                  onClick={() => setActiveTab('sale')}
                >
                  On Sale
                </button>
                <button
                  type="button"
                  className={`ruby-tab-pill ${selectedCategory === 'Women' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('Women')}
                >
                  Women
                </button>
                <button
                  type="button"
                  className={`ruby-tab-pill ${selectedCategory === 'Men' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('Men')}
                >
                  Men
                </button>
                <button
                  type="button"
                  className={`ruby-tab-pill ${selectedCategory === 'Dresses' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('Dresses')}
                >
                  Dresses
                </button>
                <button
                  type="button"
                  className={`ruby-tab-pill ${selectedCategory === 'Bags' ? 'active' : ''}`}
                  onClick={() => setSelectedCategory('Bags')}
                >
                  Bags
                </button>
              </div>

              {/* Products Grid */}
              <div className="ruby-products-grid">
                {filteredProducts.slice(0, viewMode === 'home' ? 8 : 24).map((product) => (
                  <div key={product.id} className="ruby-product-card">
                    {/* Media Showcase */}
                    <div className="ruby-card-media" onClick={() => openPdp(product)}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="ruby-card-img"
                        loading="lazy"
                      />
                      {getProductBadge(product) && (
                        <span
                          className={`ruby-card-badge ${
                            product.isNew ? 'badge-new' : ''
                          }`}
                        >
                          {getProductBadge(product)}
                        </span>
                      )}

                      {/* Action Overlays */}
                      <div className="ruby-card-actions">
                        <button
                          type="button"
                          className="ruby-icon-action"
                          title="Quick View"
                          onClick={(e) => {
                            e.stopPropagation()
                            setQuickViewProduct(product)
                          }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          className={`ruby-icon-action ${wishlistIds.includes(product.id) ? 'active-wish' : ''}`}
                          title="Add to Wishlist"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleWishlist(product.id)
                          }}
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Card Body */}
                    <div className="ruby-card-body">
                      <span className="ruby-card-category">{product.category}</span>
                      <h3 className="ruby-card-title" onClick={() => openPdp(product)}>
                        {product.name}
                      </h3>

                      <div className="ruby-card-rating">
                        {'★'.repeat(5)}
                        <span className="ruby-card-review-count">({product.reviewCount})</span>
                      </div>

                      <div className="ruby-card-price-row">
                        <span className="ruby-card-price">${getDisplayPrice(product).toFixed(2)}</span>
                        {getComparePrice(product) && (
                          <span className="ruby-card-compare">${getComparePrice(product)?.toFixed(2)}</span>
                        )}
                      </div>

                      <button
                        type="button"
                        className="ruby-card-quick-add"
                        onClick={() => addToCart(product)}
                      >
                        Add to Bag +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {viewMode === 'home' && (
            <>
              {/* =========================================================================
                  SECTION 7: DEAL OF THE WEEK WITH COUNTDOWN BANNER
                  ========================================================================= */}
              <section className="ruby-container">
                <div className="ruby-deal-section">
                  <div className="ruby-deal-grid">
                    <div className="ruby-deal-image-wrap">
                      <img
                        src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1000&auto=format&fit=crop&q=85"
                        alt="Ruby Deal of the Week"
                      />
                    </div>
                    <div className="ruby-deal-content">
                      <span className="ruby-deal-badge">LIMITED ARCHIVE PROMO</span>
                      <h2 className="ruby-deal-title">Deal Of The Week — Up To 40% Off</h2>
                      <p className="ruby-deal-desc">
                        Our flagship Virgin Wool Belted Trench Coat and Italian Cashmere Sweaters are available at exclusive seasonal archive prices for 48 hours only.
                      </p>

                      <div className="ruby-countdown-wrap">
                        <div className="ruby-countdown-box">
                          <span className="ruby-countdown-num">{String(countdown.hours).padStart(2, '0')}</span>
                          <span className="ruby-countdown-label">Hours</span>
                        </div>
                        <div className="ruby-countdown-box">
                          <span className="ruby-countdown-num">{String(countdown.minutes).padStart(2, '0')}</span>
                          <span className="ruby-countdown-label">Mins</span>
                        </div>
                        <div className="ruby-countdown-box">
                          <span className="ruby-countdown-num">{String(countdown.seconds).padStart(2, '0')}</span>
                          <span className="ruby-countdown-label">Secs</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="ruby-btn ruby-btn-primary"
                        onClick={() => openPdp(BELLE_PRODUCTS[0])}
                      >
                        CLAIM DEAL NOW • $280.00 →
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* =========================================================================
                  SECTION 8: INTERACTIVE SHOP THE LOOK HOTSPOTS
                  ========================================================================= */}
              <section className="ruby-look-section">
                <div className="ruby-container">
                  <div className="ruby-section-header">
                    <span className="ruby-section-subtitle">STYLED BY ATELIER</span>
                    <h2 className="ruby-section-title">Shop The Runway Look</h2>
                    <p className="ruby-section-desc">Click any hotspot pin to inspect item details and add directly to your bag.</p>
                  </div>

                  <div
                    className="ruby-look-wrap"
                    style={{ backgroundImage: `url(https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1600&auto=format&fit=crop&q=85)` }}
                  >
                    <div className="ruby-look-overlay" />
                    {BELLE_SHOP_THE_LOOK_HOTSPOTS.map((h) => (
                      <div
                        key={h.id}
                        style={{ position: 'absolute', left: `${h.x}%`, top: `${h.y}%` }}
                      >
                        <button
                          type="button"
                          className="ruby-hotspot-pin"
                          onClick={() => setActiveHotspot(activeHotspot?.id === h.id ? null : h)}
                          aria-label={`Hotspot for ${h.name}`}
                        >
                          +
                        </button>

                        {activeHotspot?.id === h.id && (
                          <div className="ruby-hotspot-card">
                            <h4>{h.name}</h4>
                            <p>${h.price}</p>
                            <button
                              type="button"
                              className="ruby-hotspot-add"
                              onClick={() => {
                                const prod = BELLE_PRODUCTS.find((p) => p.id === h.productId) || BELLE_PRODUCTS[0]
                                addToCart(prod)
                                setActiveHotspot(null)
                              }}
                            >
                              Add To Bag +
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* =========================================================================
                  SECTION 9: VERIFIED CLIENT TESTIMONIALS
                  ========================================================================= */}
              <section className="ruby-testimonials-section">
                <div className="ruby-container">
                  <div className="ruby-section-header">
                    <span className="ruby-section-subtitle">CLIENT ENDORSEMENTS</span>
                    <h2 className="ruby-section-title">What Our Patrons Say</h2>
                    <p className="ruby-section-desc">Unsolicited feedback from verified buyers and fashion editors across the globe.</p>
                  </div>

                  <div className="ruby-testimonials-grid">
                    {BELLE_TESTIMONIALS.slice(0, 3).map((testi) => (
                      <div key={testi.id} className="ruby-testimonial-card">
                        <div className="ruby-testi-quote-icon">“</div>
                        <p className="ruby-testi-text">{testi.quote}</p>
                        <div className="ruby-testi-author-row">
                          <div className="ruby-testi-avatar">{testi.name.charAt(0)}</div>
                          <div className="ruby-testi-meta">
                            <h4>{testi.name}</h4>
                            <p>{testi.location}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

              {/* =========================================================================
                  SECTION 10: FROM THE JOURNAL / BLOG CARDS
                  ========================================================================= */}
              <section className="ruby-blog-section">
                <div className="ruby-container">
                  <div className="ruby-section-header">
                    <span className="ruby-section-subtitle">FASHION JOURNAL</span>
                    <h2 className="ruby-section-title">Editorial News & Styling</h2>
                    <p className="ruby-section-desc">Seasonal forecast, fabric care, and atelier stories curated by our design team.</p>
                  </div>

                  <div className="ruby-blog-grid">
                    <article className="ruby-blog-card">
                      <div className="ruby-blog-img-wrap">
                        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80" alt="Blog 1" />
                      </div>
                      <div className="ruby-blog-content">
                        <div className="ruby-blog-meta">OCTOBER 2026 • STYLE GUIDE</div>
                        <h3 className="ruby-blog-title">The Art of Layering: Autumn Knitwear & Structured Wool</h3>
                        <p className="ruby-blog-desc">Discover how master cutters combine fine gauge cashmere with heavy double-faced wool coats.</p>
                        <a href="#blog" className="ruby-blog-link" onClick={(e) => { e.preventDefault(); showToast('Opening article...') }}>
                          Read Article →
                        </a>
                      </div>
                    </article>

                    <article className="ruby-blog-card">
                      <div className="ruby-blog-img-wrap">
                        <img src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&auto=format&fit=crop&q=80" alt="Blog 2" />
                      </div>
                      <div className="ruby-blog-content">
                        <div className="ruby-blog-meta">SEPTEMBER 2026 • ATELIER REPORT</div>
                        <h3 className="ruby-blog-title">Sustainable Silks & Responsible European Mills</h3>
                        <p className="ruby-blog-desc">Inside our partner weaving mills in Como, Italy, where heritage looms produce closed-loop textiles.</p>
                        <a href="#blog" className="ruby-blog-link" onClick={(e) => { e.preventDefault(); showToast('Opening article...') }}>
                          Read Article →
                        </a>
                      </div>
                    </article>

                    <article className="ruby-blog-card">
                      <div className="ruby-blog-img-wrap">
                        <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80" alt="Blog 3" />
                      </div>
                      <div className="ruby-blog-content">
                        <div className="ruby-blog-meta">AUGUST 2026 • ACCESSORIES EDIT</div>
                        <h3 className="ruby-blog-title">Handbags That Withstand Time: Leather Longevity Guide</h3>
                        <p className="ruby-blog-desc">Practical tips from our leather artisans on preserving natural grain, patina, and structured edges.</p>
                        <a href="#blog" className="ruby-blog-link" onClick={(e) => { e.preventDefault(); showToast('Opening article...') }}>
                          Read Article →
                        </a>
                      </div>
                    </article>
                  </div>
                </div>
              </section>
            </>
          )}

          {/* =========================================================================
              SECTION 11: NEWSLETTER VIP SUBSCRIPTION
              ========================================================================= */}
          <section className="ruby-newsletter-section">
            <div className="ruby-container ruby-newsletter-inner">
              <h2 className="ruby-newsletter-title">Join The Ruby Atelier Circle</h2>
              <p className="ruby-newsletter-desc">
                Subscribe to receive private sale previews, 15% off your initial purchase, and seasonal lookbooks directly to your inbox.
              </p>
              {newsletterSubscribed ? (
                <div style={{ background: 'rgba(216, 34, 83, 0.2)', padding: '14px', borderRadius: '4px', border: '1px solid var(--ruby-crimson)' }}>
                  ✓ You are subscribed! Use promo code <strong>RUBY15</strong> at checkout for 15% off.
                </div>
              ) : (
                <form className="ruby-newsletter-form" onSubmit={handleNewsletter}>
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    className="ruby-newsletter-input"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="ruby-newsletter-btn">
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </section>
        </main>
      )}

      {/* =========================================================================
          SECTION 12: COMPLETE RUBY FOOTER
          ========================================================================= */}
      <footer className="ruby-footer">
        <div className="ruby-container">
          <div className="ruby-footer-grid">
            {/* Brand Intro */}
            <div className="ruby-footer-col">
              <div className="ruby-logo" onClick={() => setViewMode('home')}>
                <div className="ruby-logo-gem">R</div>
                <div className="ruby-logo-text-wrap">
                  <span className="ruby-logo-title">RUBY</span>
                  <span className="ruby-logo-tagline">FASHION ATELIER</span>
                </div>
              </div>
              <p className="ruby-footer-brand-p">
                Ruby is a contemporary fashion house curating high-end runway ready-to-wear, bespoke tailoring, and timeless accessories designed for discerning modern wardrobes worldwide.
              </p>
              <div className="ruby-footer-contact-item">
                📍 742 Evergreen Avenue, New York, NY 10012
              </div>
              <div className="ruby-footer-contact-item">
                📞 +1 (800) 582-RUBY (7829)
              </div>
              <div className="ruby-footer-contact-item">
                ✉️ concierge@ruby-shop-demo.com
              </div>
            </div>

            {/* Quick Links */}
            <div className="ruby-footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#home" onClick={(e) => { e.preventDefault(); setViewMode('home'); }}>Home Collection</a></li>
                <li><a href="#shop" onClick={(e) => { e.preventDefault(); setViewMode('catalog'); }}>Shop All Products</a></li>
                <li><a href="#lookbook" onClick={(e) => { e.preventDefault(); showToast('Lookbook gallery'); }}>Runway Lookbook</a></li>
                <li><a href="#journal" onClick={(e) => { e.preventDefault(); showToast('Journal stories'); }}>Fashion Journal</a></li>
                <li><a href="#stores" onClick={(e) => { e.preventDefault(); showToast('Flagship boutiques in NY, Paris & Milan'); }}>Boutiques & Stockists</a></li>
              </ul>
            </div>

            {/* Customer Care */}
            <div className="ruby-footer-col">
              <h4>Customer Care</h4>
              <ul>
                <li><a href="#shipping" onClick={(e) => { e.preventDefault(); showToast('Free insured delivery over $150'); }}>Shipping & Delivery</a></li>
                <li><a href="#returns" onClick={(e) => { e.preventDefault(); showToast('Free 30-day worldwide returns'); }}>Returns & Exchanges</a></li>
                <li><a href="#sizing" onClick={(e) => { e.preventDefault(); setSizeGuideOpen(true); }}>International Size Guide</a></li>
                <li><a href="#tracking" onClick={(e) => { e.preventDefault(); showToast('Enter your tracking number in order status'); }}>Track Your Order</a></li>
                <li><a href="#faq" onClick={(e) => { e.preventDefault(); showToast('Frequently Asked Questions'); }}>Frequently Asked Questions</a></li>
              </ul>
            </div>

            {/* Collections */}
            <div className="ruby-footer-col">
              <h4>Collections</h4>
              <ul>
                <li><a href="#women" onClick={(e) => { e.preventDefault(); setSelectedCategory('Women'); setViewMode('catalog'); }}>Women’s Ready-to-Wear</a></li>
                <li><a href="#men" onClick={(e) => { e.preventDefault(); setSelectedCategory('Men'); setViewMode('catalog'); }}>Men’s Tailoring</a></li>
                <li><a href="#dresses" onClick={(e) => { e.preventDefault(); setSelectedCategory('Dresses'); setViewMode('catalog'); }}>Evening & Silk Dresses</a></li>
                <li><a href="#bags" onClick={(e) => { e.preventDefault(); setSelectedCategory('Bags'); setViewMode('catalog'); }}>Leather Bags & Totes</a></li>
                <li><a href="#shoes" onClick={(e) => { e.preventDefault(); setSelectedCategory('Shoes'); setViewMode('catalog'); }}>Minimalist Footwear</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom Copyright & Payment Strip */}
          <div className="ruby-footer-bottom">
            <div>
              © 2026 Ruby Fashion Atelier. All Rights Reserved. Built for Willovate One.
            </div>
            <div className="ruby-payment-strip">
              <span className="ruby-payment-badge">VISA</span>
              <span className="ruby-payment-badge">MASTERCARD</span>
              <span className="ruby-payment-badge">AMEX</span>
              <span className="ruby-payment-badge">APPLE PAY</span>
              <span className="ruby-payment-badge">PAYPAL</span>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================================
          SLIDE-OVER SHOPPING BAG DRAWER
          ========================================================================= */}
      {cartOpen && (
        <div className="ruby-drawer-backdrop" onClick={() => setCartOpen(false)}>
          <div className="ruby-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="ruby-drawer-header">
              <h3 className="ruby-drawer-title">
                Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
              </h3>
              <button
                type="button"
                className="ruby-drawer-close"
                onClick={() => setCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="ruby-drawer-body">
              {/* Free Shipping Milestone Meter */}
              <div className="ruby-free-shipping-bar">
                {freeShippingDiff > 0 ? (
                  <span>
                    Add <strong>${freeShippingDiff.toFixed(2)}</strong> more to enjoy <strong>Free Worldwide Shipping</strong>!
                  </span>
                ) : (
                  <span style={{ color: 'var(--ruby-crimson)', fontWeight: 700 }}>
                    🎉 You have unlocked Free Worldwide Express Shipping!
                  </span>
                )}
                <div className="ruby-meter-track">
                  <div className="ruby-meter-fill" style={{ width: `${freeShippingProgress}%` }} />
                </div>
              </div>

              {/* Items List */}
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--ruby-muted)' }}>
                  <p style={{ fontSize: '36px', margin: 0 }}>🛍️</p>
                  <p style={{ fontSize: '15px', fontWeight: 600 }}>Your shopping bag is currently empty.</p>
                  <button
                    type="button"
                    className="ruby-btn ruby-btn-primary"
                    style={{ marginTop: '14px' }}
                    onClick={() => {
                      setCartOpen(false)
                      setViewMode('catalog')
                    }}
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} className="ruby-cart-item">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="ruby-cart-item-img"
                    />
                    <div className="ruby-cart-item-info">
                      <h4 className="ruby-cart-item-name">{item.product.name}</h4>
                      <p className="ruby-cart-item-variant">
                        Color: {item.color} • Size: {item.size}
                      </p>
                      <div className="ruby-cart-item-price">
                        ${(getDisplayPrice(item.product) * item.quantity).toFixed(2)}
                      </div>
                      <div className="ruby-qty-control">
                        <button type="button" className="ruby-qty-btn" onClick={() => updateCartQty(idx, -1)}>-</button>
                        <span className="ruby-qty-val">{item.quantity}</span>
                        <button type="button" className="ruby-qty-btn" onClick={() => updateCartQty(idx, 1)}>+</button>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => updateCartQty(idx, -item.quantity)}
                      style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '16px' }}
                      title="Remove Item"
                    >
                      ✕
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Footer / Subtotal & Promo */}
            {cartItems.length > 0 && (
              <div className="ruby-drawer-footer">
                <form onSubmit={applyCoupon} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  <input
                    type="text"
                    placeholder="Promo code (try RUBY20)..."
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    style={{ flex: 1, padding: '8px 12px', border: '1px solid var(--ruby-border)', borderRadius: '3px', fontSize: '12px', outline: 'none' }}
                  />
                  <button
                    type="submit"
                    style={{ padding: '8px 14px', background: 'var(--ruby-dark)', color: '#FFF', border: 'none', borderRadius: '3px', fontSize: '12px', fontWeight: 700, cursor: 'pointer' }}
                  >
                    Apply
                  </button>
                </form>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px', color: 'var(--ruby-muted)' }}>
                  <span>Bag Subtotal:</span>
                  <span>${cartSubtotal.toFixed(2)}</span>
                </div>

                {couponDiscount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '13px', color: 'var(--ruby-crimson)' }}>
                    <span>VIP Promo Discount:</span>
                    <span>-${couponDiscount.toFixed(2)}</span>
                  </div>
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '18px', fontSize: '17px', fontWeight: 800, color: 'var(--ruby-dark)' }}>
                  <span>Total Amount:</span>
                  <span>${Math.max(0, cartSubtotal - couponDiscount).toFixed(2)}</span>
                </div>

                <button
                  type="button"
                  className="ruby-btn ruby-btn-primary"
                  style={{ width: '100%' }}
                  onClick={() => showToast('Redirecting to Willovate Secure Express Checkout...')}
                >
                  Proceed To Checkout →
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          SLIDE-OVER WISHLIST DRAWER
          ========================================================================= */}
      {wishlistOpen && (
        <div className="ruby-drawer-backdrop" onClick={() => setWishlistOpen(false)}>
          <div className="ruby-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="ruby-drawer-header">
              <h3 className="ruby-drawer-title">Saved Wishlist ({wishlistIds.length})</h3>
              <button
                type="button"
                className="ruby-drawer-close"
                onClick={() => setWishlistOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="ruby-drawer-body">
              {wishlistIds.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--ruby-muted)' }}>
                  <p style={{ fontSize: '36px', margin: 0 }}>🤍</p>
                  <p style={{ fontSize: '15px', fontWeight: 600 }}>Your wishlist is currently empty.</p>
                </div>
              ) : (
                wishlistIds.map((id) => {
                  const product = BELLE_PRODUCTS.find((p) => p.id === id)
                  if (!product) return null
                  return (
                    <div key={id} className="ruby-cart-item">
                      <img src={product.image} alt={product.name} className="ruby-cart-item-img" />
                      <div className="ruby-cart-item-info">
                        <h4 className="ruby-cart-item-name">{product.name}</h4>
                        <div className="ruby-cart-item-price">${getDisplayPrice(product).toFixed(2)}</div>
                        <button
                          type="button"
                          className="ruby-card-quick-add"
                          style={{ marginTop: '8px', padding: '6px 10px' }}
                          onClick={() => {
                            addToCart(product)
                            toggleWishlist(product.id)
                          }}
                        >
                          Move To Bag +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(product.id)}
                        style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer' }}
                      >
                        ✕
                      </button>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          QUICK VIEW MODAL
          ========================================================================= */}
      {quickViewProduct && (
        <div className="ruby-modal-backdrop" onClick={() => setQuickViewProduct(null)}>
          <div className="ruby-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setQuickViewProduct(null)}
              style={{ position: 'absolute', top: '16px', right: '16px', zIndex: 10, background: '#FFF', border: '1px solid #DDD', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer' }}
            >
              ✕
            </button>

            <div className="ruby-quickview-grid">
              <div className="ruby-quickview-media">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} />
              </div>

              <div className="ruby-quickview-info">
                <span style={{ fontSize: '11px', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--ruby-crimson)', textTransform: 'uppercase' }}>
                  {quickViewProduct.category}
                </span>
                <h3 style={{ fontSize: '22px', fontWeight: 800, margin: '6px 0 10px 0', color: 'var(--ruby-dark)' }}>
                  {quickViewProduct.name}
                </h3>
                <div className="ruby-card-rating" style={{ marginBottom: '14px' }}>
                  {'★'.repeat(5)}
                  <span className="ruby-card-review-count">({quickViewProduct.reviewCount} reviews)</span>
                </div>
                <div style={{ fontSize: '20px', fontWeight: 800, color: 'var(--ruby-crimson)', marginBottom: '16px' }}>
                  ${getDisplayPrice(quickViewProduct).toFixed(2)}
                </div>
                <p style={{ fontSize: '13.5px', color: '#666', lineHeight: 1.6, marginBottom: '20px' }}>
                  {quickViewProduct.description}
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <button
                    type="button"
                    className="wv-full-pdp-btn"
                    onClick={() => {
                      setQuickViewProduct(null)
                      openPdp(quickViewProduct)
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    Full Description View →
                  </button>
                  <button
                    type="button"
                    className="ruby-btn ruby-btn-primary"
                    style={{ width: '100%' }}
                    onClick={() => {
                      addToCart(quickViewProduct)
                      setQuickViewProduct(null)
                    }}
                  >
                    Add To Bag +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MOBILE SLIDE-OVER NAVIGATION DRAWER
          ========================================================================= */}
      {mobileMenuOpen && (
        <div className="ruby-drawer-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div className="ruby-drawer" style={{ left: 0, right: 'auto', animation: 'slideFromLeft 0.25s ease-out' }} onClick={(e) => e.stopPropagation()}>
            <div className="ruby-drawer-header">
              <div className="ruby-logo">
                <div className="ruby-logo-gem">R</div>
                <span className="ruby-logo-title" style={{ fontSize: '20px' }}>RUBY</span>
              </div>
              <button type="button" className="ruby-drawer-close" onClick={() => setMobileMenuOpen(false)}>✕</button>
            </div>

            <div className="ruby-drawer-body">
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {['Home', 'Shop All', 'Women', 'Men', 'Dresses', 'Bags', 'Accessories', 'Lookbook', 'Journal'].map((item) => (
                  <li key={item} style={{ borderBottom: '1px solid #EEE' }}>
                    <button
                      type="button"
                      onClick={() => {
                        if (item === 'Home') setViewMode('home')
                        else if (item === 'Women' || item === 'Men' || item === 'Dresses' || item === 'Bags' || item === 'Accessories') {
                          setSelectedCategory(item as BelleCategoryType)
                          setViewMode('catalog')
                        } else {
                          setViewMode('catalog')
                        }
                        setMobileMenuOpen(false)
                      }}
                      style={{ width: '100%', textAlign: 'left', padding: '14px 0', background: 'none', border: 'none', fontSize: '14.5px', fontWeight: 600, color: 'var(--ruby-dark)', cursor: 'pointer' }}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: '24px', paddingTop: '18px', borderTop: '1px solid var(--ruby-border)' }}>
                <p style={{ fontSize: '12px', color: 'var(--ruby-muted)', margin: '0 0 8px 0' }}>CUSTOMER CARE</p>
                <p style={{ fontSize: '13px', margin: '0 0 6px 0' }}>📞 +1 (800) 582-7829</p>
                <p style={{ fontSize: '13px', margin: 0 }}>✉️ concierge@ruby-shop-demo.com</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          SIZE GUIDE MODAL
          ========================================================================= */}
      {sizeGuideOpen && (
        <div className="ruby-modal-backdrop" onClick={() => setSizeGuideOpen(false)}>
          <div className="ruby-modal" style={{ maxWidth: '560px', padding: '30px' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
              <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 800 }}>Ruby International Sizing Chart</h3>
              <button type="button" onClick={() => setSizeGuideOpen(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>✕</button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F8F8FC', borderBottom: '2px solid var(--ruby-border)' }}>
                  <th style={{ padding: '10px' }}>Size</th>
                  <th style={{ padding: '10px' }}>Bust (in)</th>
                  <th style={{ padding: '10px' }}>Waist (in)</th>
                  <th style={{ padding: '10px' }}>Hips (in)</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #EEE' }}><td style={{ padding: '10px' }}>XS</td><td style={{ padding: '10px' }}>32 - 33</td><td style={{ padding: '10px' }}>24 - 25</td><td style={{ padding: '10px' }}>34 - 35</td></tr>
                <tr style={{ borderBottom: '1px solid #EEE' }}><td style={{ padding: '10px' }}>S</td><td style={{ padding: '10px' }}>34 - 35</td><td style={{ padding: '10px' }}>26 - 27</td><td style={{ padding: '10px' }}>36 - 37</td></tr>
                <tr style={{ borderBottom: '1px solid #EEE' }}><td style={{ padding: '10px' }}>M</td><td style={{ padding: '10px' }}>36 - 37</td><td style={{ padding: '10px' }}>28 - 29</td><td style={{ padding: '10px' }}>38 - 39</td></tr>
                <tr style={{ borderBottom: '1px solid #EEE' }}><td style={{ padding: '10px' }}>L</td><td style={{ padding: '10px' }}>38 - 40</td><td style={{ padding: '10px' }}>30 - 32</td><td style={{ padding: '10px' }}>40 - 42</td></tr>
                <tr><td style={{ padding: '10px' }}>XL</td><td style={{ padding: '10px' }}>41 - 43</td><td style={{ padding: '10px' }}>33 - 35</td><td style={{ padding: '10px' }}>43 - 45</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* =========================================================================
          GLOBAL TOAST NOTIFICATION
          ========================================================================= */}
      {toastMessage && (
        <div className="ruby-toast">
          <span style={{ color: 'var(--ruby-crimson)' }}>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  )
}

export default BelleFashionStorefront
