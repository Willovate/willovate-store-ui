import React, { useState, useMemo } from 'react'
import type {
  JoharyProduct,
  JoharyCategoryType,
  JoharyCartItem,
  JoharyStorefrontProps,
} from './types'
import {
  JOHARY_PRODUCTS,
  JOHARY_CATEGORIES,
  JOHARY_TESTIMONIALS,
  JOHARY_BLOG_POSTS,
} from './data/joharyData'

export const JoharyJewelryStorefront: React.FC<JoharyStorefrontProps> = ({
  device = 'desktop',
  deviceView,
  onClose: _onClose,
  initialView = 'home',
}) => {
  const effectiveDevice = deviceView || device || 'desktop'
  const isMobile = effectiveDevice === 'mobile'

  // View state: 'home' | 'catalog' | 'pdp'
  const [viewMode, setViewMode] = useState<'home' | 'catalog' | 'pdp'>(initialView)
  const [selectedProduct, setSelectedProduct] = useState<JoharyProduct>(JOHARY_PRODUCTS[0])
  const [selectedCategory, setSelectedCategory] = useState<JoharyCategoryType>('All')
  const [activeTab, setActiveTab] = useState<'All' | 'Bracelets' | 'Earrings' | 'Necklaces' | 'Rings'>('All')

  // Hero Slider
  const [activeSlide, setActiveSlide] = useState(0)

  // Drawers and Modals
  const [cartOpen, setCartOpen] = useState(false)
  const [wishlistOpen, setWishlistOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<JoharyProduct | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCurrency, setSelectedCurrency] = useState('USD ($)')
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false)

  // PDP Variant selection
  const [selectedMetal, setSelectedMetal] = useState<string>(JOHARY_PRODUCTS[0].metalOptions[0] || '18K Yellow Gold')
  const [selectedRingSize, setSelectedRingSize] = useState<string>('7 (US)')
  const [pdpQuantity, setPdpQuantity] = useState(1)

  // Newsletter & Promo state
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSuccess, setNewsletterSuccess] = useState(false)
  const [couponCode, setCouponCode] = useState('')
  const [couponApplied, setCouponApplied] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<JoharyCartItem[]>([
    {
      product: JOHARY_PRODUCTS[0],
      selectedMetal: '18K Yellow Gold',
      selectedSize: '7 (US)',
      quantity: 1,
    },
  ])
  const [wishlistIds, setWishlistIds] = useState<string[]>([JOHARY_PRODUCTS[1].id, JOHARY_PRODUCTS[2].id])

  // Calculated subtotal & discounts
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  }, [cartItems])

  const discountAmount = useMemo(() => {
    return couponApplied ? subtotal * 0.2 : 0
  }, [subtotal, couponApplied])

  const total = useMemo(() => {
    return Math.max(0, subtotal - discountAmount)
  }, [subtotal, discountAmount])

  const freeShippingThreshold = 199.0
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100)

  // Filtered Products for Catalog & Tabs
  const tabFilteredProducts = useMemo(() => {
    let prods = JOHARY_PRODUCTS
    if (selectedCategory !== 'All') {
      prods = prods.filter((p) => p.category === selectedCategory)
    }
    if (activeTab !== 'All') {
      prods = prods.filter((p) => p.category === activeTab)
    }
    return prods
  }, [activeTab, selectedCategory])


  const searchFilteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return JOHARY_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q)
    )
  }, [searchQuery])

  // Actions
  const handleAddToCart = (product: JoharyProduct, metal?: string, size?: string, qty: number = 1) => {
    const chosenMetal = metal || product.metalOptions[0] || '18K Yellow Gold'
    const chosenSize = size || '7 (US)'

    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.product.id === product.id &&
          item.selectedMetal === chosenMetal &&
          item.selectedSize === chosenSize
      )
      if (existing) {
        return prev.map((item) =>
          item === existing ? { ...item, quantity: item.quantity + qty } : item
        )
      }
      return [
        ...prev,
        {
          product,
          selectedMetal: chosenMetal,
          selectedSize: chosenSize,
          quantity: qty,
        },
      ]
    })
    showToast(`Added "${product.name}" to cart!`)
  }

  const handleUpdateCartQuantity = (index: number, delta: number) => {
    setCartItems((prev) => {
      return prev
        .map((item, i) => {
          if (i === index) {
            const newQty = item.quantity + delta
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean) as JoharyCartItem[]
    })
  }

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    )
  }

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    if (couponCode.trim().toUpperCase() === 'JOHARY20' || couponCode.trim().toUpperCase() === 'GET25OFF') {
      setCouponApplied(true)
    } else {
      alert('Invalid Promo Code. Try JOHARY20 or GET25OFF for 20% off.')
    }
  }

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newsletterEmail.includes('@')) {
      setNewsletterSuccess(true)
    }
  }

  const openPdp = (product: JoharyProduct) => {
    setSelectedProduct(product)
    setSelectedMetal(product.metalOptions[0] || '18K Yellow Gold')
    setPdpQuantity(1)
    setViewMode('pdp')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`jh-root ${isMobile ? 'jh-mobile-view' : ''}`}>
      {/* Scoped CSS Tokens & Styles */}
      <style>{`
        :root {
          --jh-gold: #c19417;
          --jh-gold-hover: #a1790f;
          --jh-gold-light: #e8c66e;
          --jh-dark: #111111;
          --jh-charcoal: #222222;
          --jh-muted: #666666;
          --jh-light-gray: #f5f5f5;
          --jh-cream: #f5f3ed;
          --jh-parchment: #f1efea;
          --jh-border: #e5e5e5;
          --jh-white: #ffffff;
        }

        .jh-root {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
          color: var(--jh-charcoal);
          background-color: var(--jh-white);
          line-height: 1.6;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .jh-root * {
          box-sizing: border-box;
        }

        .jh-container {
          max-width: 1440px;
          margin: 0 auto;
          padding: 0 32px;
        }

        @media (max-width: 768px) {
          .jh-container {
            padding: 0 16px;
          }
        }

        /* Serif Display Fonts */
        .jh-serif {
          font-family: "Playfair Display", "Georgia", "Times New Roman", serif;
        }

        /* Top Announcement Bar */
        .jh-topbar {
          background-color: var(--jh-charcoal);
          color: var(--jh-white);
          font-size: 13px;
          padding: 9px 0;
          letter-spacing: 0.3px;
        }

        .jh-topbar-inner {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .jh-topbar-link {
          color: var(--jh-white);
          text-decoration: underline;
          margin-left: 8px;
          font-weight: 500;
          transition: color 0.2s;
        }

        .jh-topbar-link:hover {
          color: var(--jh-gold);
        }

        .jh-topbar-right {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .jh-topbar-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #cccccc;
          text-decoration: none;
          font-size: 13px;
          cursor: pointer;
          background: none;
          border: none;
          padding: 0;
        }

        .jh-topbar-item:hover {
          color: var(--jh-white);
        }

        /* Header Normal */
        .jh-header-main {
          border-bottom: 1px solid var(--jh-border);
          padding: 24px 0;
          background-color: var(--jh-white);
          position: sticky;
          top: 0;
          z-index: 100;
          transition: box-shadow 0.3s;
        }

        .jh-header-grid {
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          gap: 20px;
        }

        @media (max-width: 991px) {
          .jh-header-grid {
            grid-template-columns: auto 1fr auto;
          }
        }

        /* Search input bar */
        .jh-search-box {
          display: flex;
          align-items: center;
          background-color: var(--jh-light-gray);
          border: 1px solid var(--jh-border);
          border-radius: 4px;
          max-width: 360px;
          height: 44px;
          overflow: hidden;
        }

        .jh-search-input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 0 14px;
          font-size: 14px;
          outline: none;
          color: var(--jh-charcoal);
        }

        .jh-search-btn {
          background: none;
          border: none;
          padding: 0 14px;
          cursor: pointer;
          color: var(--jh-charcoal);
          font-size: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .jh-search-btn:hover {
          color: var(--jh-gold);
        }

        /* Brand Logo */
        .jh-logo-wrap {
          text-align: center;
          text-decoration: none;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;
        }

        .jh-logo-symbol {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          margin-bottom: 2px;
          color: var(--jh-gold);
        }

        .jh-logo-title {
          font-size: 28px;
          letter-spacing: 4px;
          font-weight: 600;
          color: var(--jh-dark);
          margin: 0;
          line-height: 1;
        }

        .jh-logo-subtitle {
          font-size: 10px;
          letter-spacing: 2px;
          color: var(--jh-muted);
          text-transform: uppercase;
          margin-top: 4px;
        }

        /* Header Controls */
        .jh-header-actions {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 20px;
        }

        .jh-action-btn {
          background: none;
          border: none;
          cursor: pointer;
          color: var(--jh-charcoal);
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 14px;
          font-weight: 500;
          position: relative;
          padding: 6px;
          transition: color 0.2s;
        }

        .jh-action-btn:hover {
          color: var(--jh-gold);
        }

        .jh-badge {
          position: absolute;
          top: -4px;
          right: -6px;
          background-color: var(--jh-gold);
          color: var(--jh-white);
          font-size: 11px;
          font-weight: 700;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* Main Nav */
        .jh-nav {
          border-bottom: 1px solid var(--jh-border);
          background-color: var(--jh-white);
        }

        .jh-nav-list {
          display: flex;
          justify-content: center;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 36px;
        }

        .jh-nav-link {
          display: inline-block;
          padding: 14px 0;
          color: var(--jh-charcoal);
          font-size: 14px;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          text-decoration: none;
          position: relative;
          cursor: pointer;
          transition: color 0.2s;
        }

        .jh-nav-link:hover,
        .jh-nav-link.active {
          color: var(--jh-gold);
        }

        .jh-nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0%;
          height: 2px;
          background-color: var(--jh-gold);
          transition: width 0.3s;
        }

        .jh-nav-link:hover::after,
        .jh-nav-link.active::after {
          width: 100%;
        }

        /* Hero Slider */
        .jh-hero {
          position: relative;
          background-color: #1a1a1a;
          color: var(--jh-white);
          overflow: hidden;
          min-height: 640px;
          display: flex;
          align-items: center;
        }

        @media (max-width: 768px) {
          .jh-hero {
            min-height: 480px;
          }
        }

        .jh-hero-bg {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          transition: opacity 0.8s ease-in-out;
        }

        .jh-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(17,17,17,0.85) 0%, rgba(17,17,17,0.4) 60%, rgba(17,17,17,0.1) 100%);
        }

        .jh-hero-content {
          position: relative;
          z-index: 2;
          max-width: 650px;
          padding: 60px 0;
        }

        .jh-hero-eyebrow {
          color: var(--jh-gold-light);
          font-size: 13px;
          letter-spacing: 3px;
          text-transform: uppercase;
          font-weight: 600;
          margin-bottom: 16px;
          display: inline-block;
        }

        .jh-hero-title {
          font-size: 52px;
          line-height: 1.15;
          margin: 0 0 20px 0;
          font-weight: 500;
          color: var(--jh-white);
        }

        @media (max-width: 768px) {
          .jh-hero-title {
            font-size: 32px;
          }
        }

        .jh-hero-desc {
          font-size: 16px;
          color: #e0e0e0;
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 520px;
        }

        .jh-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background-color: var(--jh-gold);
          color: var(--jh-white);
          padding: 14px 34px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          text-decoration: none;
          border: none;
          border-radius: 2px;
          cursor: pointer;
          transition: background-color 0.2s, transform 0.2s;
        }

        .jh-btn-primary:hover {
          background-color: var(--jh-gold-hover);
          transform: translateY(-2px);
        }

        .jh-btn-outline {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          color: var(--jh-white);
          border: 1px solid var(--jh-white);
          padding: 14px 32px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          text-decoration: none;
          border-radius: 2px;
          cursor: pointer;
          margin-left: 14px;
          transition: all 0.2s;
        }

        .jh-btn-outline:hover {
          background-color: var(--jh-white);
          color: var(--jh-dark);
        }

        /* Circular Category Showcase */
        .jh-categories-section {
          padding: 70px 0;
          border-bottom: 1px solid var(--jh-border);
        }

        .jh-section-header {
          text-align: center;
          margin-bottom: 44px;
        }

        .jh-section-title {
          font-size: 34px;
          font-weight: 500;
          color: var(--jh-dark);
          margin: 0 0 10px 0;
        }

        .jh-section-sub {
          color: var(--jh-muted);
          font-size: 15px;
          margin: 0;
        }

        .jh-cat-grid {
          display: flex;
          justify-content: space-between;
          gap: 20px;
          overflow-x: auto;
          padding-bottom: 12px;
          scrollbar-width: thin;
        }

        .jh-cat-card {
          flex: 0 0 140px;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
          group: true;
        }

        .jh-cat-img-wrap {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          margin: 0 auto 14px auto;
          overflow: hidden;
          border: 2px solid var(--jh-border);
          transition: border-color 0.3s, transform 0.3s;
          background-color: var(--jh-light-gray);
        }

        .jh-cat-card:hover .jh-cat-img-wrap {
          border-color: var(--jh-gold);
          transform: scale(1.05);
        }

        .jh-cat-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .jh-cat-name {
          font-size: 15px;
          font-weight: 600;
          color: var(--jh-charcoal);
          margin: 0;
          transition: color 0.2s;
        }

        .jh-cat-card:hover .jh-cat-name {
          color: var(--jh-gold);
        }

        .jh-cat-count {
          font-size: 12px;
          color: var(--jh-muted);
          margin-top: 4px;
        }

        /* 3-Column Promotional Showcase */
        .jh-promo-section {
          padding: 70px 0;
        }

        .jh-promo-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        @media (max-width: 900px) {
          .jh-promo-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .jh-promo-card {
            height: 230px;
          }
          .jh-promo-content {
            padding: 20px;
          }
          .jh-promo-title {
            font-size: 19px;
            margin-bottom: 10px;
          }
        }

        .jh-mobile-view .jh-promo-grid {
          grid-template-columns: 1fr !important;
          gap: 16px !important;
        }

        .jh-mobile-view .jh-promo-card {
          height: 230px !important;
          width: 100% !important;
        }

        .jh-mobile-view .jh-promo-content {
          padding: 20px !important;
        }

        .jh-mobile-view .jh-promo-title {
          font-size: 19px !important;
          line-height: 1.25 !important;
          margin-bottom: 10px !important;
        }

        .jh-mobile-view .jh-promo-tag {
          font-size: 10.5px !important;
          padding: 4px 8px !important;
          margin-bottom: 8px !important;
        }

        .jh-promo-card {
          position: relative;
          height: 380px;
          border-radius: 4px;
          overflow: hidden;
          background-color: #1a1a1a;
          cursor: pointer;
        }

        .jh-promo-bg {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .jh-promo-card:hover .jh-promo-bg {
          transform: scale(1.06);
        }

        .jh-promo-content {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.7) 100%);
          padding: 30px;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          color: var(--jh-white);
        }

        .jh-promo-tag {
          align-self: flex-start;
          background-color: var(--jh-gold);
          color: var(--jh-white);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1px;
          padding: 4px 10px;
          margin-bottom: 14px;
          border-radius: 2px;
        }

        .jh-promo-title {
          font-size: 22px;
          font-weight: 500;
          line-height: 1.3;
          margin: 0 0 16px 0;
        }

        .jh-promo-btn {
          font-size: 13px;
          font-weight: 600;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          text-decoration: underline;
          color: var(--jh-white);
          transition: color 0.2s;
        }

        .jh-promo-card:hover .jh-promo-btn {
          color: var(--jh-gold);
        }

        /* Trending Products Section */
        .jh-products-section {
          padding: 70px 0;
          background-color: var(--jh-white);
        }

        .jh-tabs-nav {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .jh-tab-btn {
          background-color: var(--jh-light-gray);
          color: var(--jh-charcoal);
          border: none;
          padding: 10px 24px;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.2s;
        }

        .jh-tab-btn:hover,
        .jh-tab-btn.active {
          background-color: var(--jh-gold);
          color: var(--jh-white);
        }

        .jh-product-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        @media (max-width: 1100px) {
          .jh-product-grid {
            grid-template-columns: repeat(3, 1fr);
          }
        }

        @media (max-width: 768px) {
          .jh-product-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .jh-product-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }
        }

        .jh-mobile-view .jh-product-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          gap: 10px !important;
        }

        .jh-mobile-view .jh-product-card {
          min-width: 0 !important;
          width: 100% !important;
        }

        .jh-mobile-view .jh-product-info {
          padding: 10px 8px !important;
        }

        .jh-mobile-view .jh-product-cat {
          font-size: 10px !important;
          margin-bottom: 2px !important;
        }

        .jh-mobile-view .jh-product-name {
          font-size: 12.5px !important;
          line-height: 1.35 !important;
          min-height: 2.7em !important;
          margin: 0 0 4px 0 !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          display: -webkit-box !important;
          -webkit-line-clamp: 2 !important;
          -webkit-box-orient: vertical !important;
        }

        .jh-mobile-view .jh-product-rating {
          font-size: 11px !important;
          margin: 2px 0 !important;
        }

        .jh-mobile-view .jh-price-row {
          font-size: 13px !important;
          margin: 4px 0 8px 0 !important;
        }

        .jh-mobile-view .jh-current-price {
          font-size: 14px !important;
        }

        .jh-mobile-view .jh-old-price {
          font-size: 12px !important;
        }

        .jh-mobile-view .jh-add-cart-btn {
          width: 100% !important;
          padding: 8px 4px !important;
          font-size: 10.5px !important;
          white-space: nowrap !important;
          letter-spacing: 0.5px !important;
          box-sizing: border-box !important;
          text-align: center !important;
          font-weight: 700 !important;
        }

        .jh-product-card {
          background-color: var(--jh-white);
          border: 1px solid var(--jh-border);
          border-radius: 4px;
          overflow: hidden;
          transition: box-shadow 0.3s, transform 0.3s;
          position: relative;
          display: flex;
          flex-direction: column;
        }

        .jh-product-card:hover {
          box-shadow: 0 10px 24px rgba(0,0,0,0.08);
          transform: translateY(-4px);
        }

        .jh-product-thumb {
          position: relative;
          width: 100%;
          aspect-ratio: 1;
          overflow: hidden;
          background-color: var(--jh-light-gray);
          cursor: pointer;
        }

        .jh-product-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .jh-product-card:hover .jh-product-img {
          transform: scale(1.08);
        }

        .jh-product-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background-color: var(--jh-gold);
          color: var(--jh-white);
          font-size: 11px;
          font-weight: 700;
          padding: 4px 8px;
          border-radius: 2px;
          z-index: 2;
        }

        .jh-product-badge.sale {
          background-color: #d82253;
        }

        .jh-card-actions {
          position: absolute;
          bottom: 12px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: center;
          gap: 8px;
          opacity: 0;
          transform: translateY(10px);
          transition: all 0.3s ease;
          z-index: 2;
        }

        .jh-product-card:hover .jh-card-actions {
          opacity: 1;
          transform: translateY(0);
        }

        .jh-card-action-btn {
          width: 36px;
          height: 36px;
          background-color: var(--jh-white);
          color: var(--jh-charcoal);
          border: 1px solid var(--jh-border);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          font-size: 14px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          transition: all 0.2s;
        }

        .jh-card-action-btn:hover {
          background-color: var(--jh-gold);
          color: var(--jh-white);
          border-color: var(--jh-gold);
        }

        .jh-product-info {
          padding: 16px;
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .jh-product-cat {
          font-size: 11px;
          color: var(--jh-muted);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 4px;
        }

        .jh-product-name {
          font-size: 16px;
          font-weight: 500;
          color: var(--jh-dark);
          margin: 0 0 8px 0;
          line-height: 1.4;
          cursor: pointer;
          transition: color 0.2s;
        }

        .jh-product-name:hover {
          color: var(--jh-gold);
        }

        .jh-product-rating {
          display: flex;
          align-items: center;
          gap: 4px;
          font-size: 12px;
          color: #f5a623;
          margin-bottom: 10px;
        }

        .jh-rating-count {
          color: var(--jh-muted);
          font-size: 11px;
          margin-left: 4px;
        }

        .jh-price-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: auto;
          margin-bottom: 14px;
        }

        .jh-current-price {
          font-size: 18px;
          font-weight: 600;
          color: var(--jh-charcoal);
        }

        .jh-old-price {
          font-size: 14px;
          color: var(--jh-muted);
          text-decoration: line-through;
        }

        .jh-add-cart-btn {
          width: 100%;
          background-color: var(--jh-charcoal);
          color: var(--jh-white);
          border: none;
          padding: 10px 0;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          border-radius: 2px;
          cursor: pointer;
          transition: background-color 0.2s;
        }

        .jh-add-cart-btn:hover {
          background-color: var(--jh-gold);
        }

        /* Split Atelier Spotlight Section */
        .jh-split-section {
          padding: 80px 0;
          background-color: var(--jh-parchment);
        }

        .jh-split-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 50px;
          align-items: center;
        }

        @media (max-width: 900px) {
          .jh-split-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }

        .jh-mobile-view .jh-split-grid {
          grid-template-columns: 1fr !important;
          gap: 24px !important;
          width: 100% !important;
        }

        .jh-mobile-view .jh-story-title {
          font-size: 26px !important;
          line-height: 1.25 !important;
          margin-bottom: 14px !important;
        }

        .jh-mobile-view .jh-story-desc {
          font-size: 13.5px !important;
          line-height: 1.55 !important;
          margin-bottom: 16px !important;
        }

        .jh-story-title {
          font-size: 40px;
          font-weight: 500;
          color: var(--jh-dark);
          margin: 0 0 20px 0;
          line-height: 1.2;
        }

        .jh-story-desc {
          font-size: 16px;
          color: var(--jh-muted);
          line-height: 1.7;
          margin-bottom: 24px;
        }

        .jh-spotlight-card {
          background: var(--jh-white);
          border-radius: 4px;
          padding: 24px;
          border: 1px solid var(--jh-border);
          box-shadow: 0 12px 30px rgba(0,0,0,0.06);
          display: flex;
          gap: 20px;
          align-items: center;
        }

        @media (max-width: 600px) {
          .jh-spotlight-card {
            flex-direction: column;
            text-align: center;
          }
        }

        .jh-mobile-view .jh-spotlight-card {
          flex-direction: column !important;
          text-align: center !important;
          padding: 18px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          gap: 16px !important;
        }

        .jh-spotlight-img {
          width: 160px;
          height: 160px;
          object-fit: cover;
          border-radius: 4px;
        }

        .jh-mobile-view .jh-spotlight-img {
          width: 100% !important;
          max-width: 180px !important;
          height: auto !important;
          aspect-ratio: 1 !important;
          margin: 0 auto !important;
        }

        /* Full Width Parallax Atelier Banner */
        .jh-parallax-section {
          position: relative;
          min-height: 500px;
          background-image: url("https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1600&auto=format&fit=crop&q=85");
          background-attachment: fixed;
          background-position: center;
          background-size: cover;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: var(--jh-white);
          padding: 60px 20px;
        }

        .jh-parallax-overlay {
          position: absolute;
          inset: 0;
          background-color: rgba(17,17,17,0.7);
        }

        .jh-parallax-content {
          position: relative;
          z-index: 2;
          max-width: 700px;
        }

        .jh-parallax-title {
          font-size: 44px;
          font-weight: 500;
          margin: 0 0 20px 0;
          line-height: 1.2;
        }

        .jh-parallax-sub {
          font-size: 18px;
          color: #e5e5e5;
          margin-bottom: 32px;
        }

        /* 4 Value Pillars Strip */
        .jh-trust-strip {
          padding: 60px 0;
          border-bottom: 1px solid var(--jh-border);
          background-color: var(--jh-white);
        }

        .jh-trust-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }

        @media (max-width: 900px) {
          .jh-trust-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px 12px;
          }
        }

        @media (max-width: 500px) {
          .jh-trust-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px 10px;
          }
        }

        .jh-mobile-view .jh-trust-grid {
          grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          gap: 16px 10px !important;
          width: 100% !important;
          padding: 16px 0 !important;
        }

        .jh-mobile-view .jh-trust-item {
          flex-direction: column !important;
          align-items: center !important;
          text-align: center !important;
          gap: 8px !important;
          min-width: 0 !important;
        }

        .jh-mobile-view .jh-trust-icon {
          width: 44px !important;
          height: 44px !important;
          font-size: 20px !important;
          flex-shrink: 0 !important;
        }

        .jh-mobile-view .jh-trust-heading {
          font-size: 12.5px !important;
          margin: 0 !important;
        }

        .jh-mobile-view .jh-trust-desc {
          font-size: 11px !important;
          line-height: 1.4 !important;
          margin: 0 !important;
        }

        .jh-trust-item {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .jh-trust-icon {
          width: 48px;
          height: 48px;
          background-color: var(--jh-cream);
          color: var(--jh-gold);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          flex-shrink: 0;
        }

        .jh-trust-heading {
          font-size: 16px;
          font-weight: 600;
          color: var(--jh-dark);
          margin: 0 0 4px 0;
        }

        .jh-trust-text {
          font-size: 13px;
          color: var(--jh-muted);
          margin: 0;
        }

        /* Testimonials Section */
        .jh-testimonials-section {
          padding: 80px 0;
          background-color: var(--jh-cream);
          text-align: center;
        }

        .jh-testimonials-slider {
          max-width: 800px;
          margin: 0 auto;
        }

        .jh-quote-icon {
          font-size: 40px;
          color: var(--jh-gold);
          margin-bottom: 16px;
        }

        .jh-quote-text {
          font-size: 20px;
          font-style: italic;
          color: var(--jh-charcoal);
          line-height: 1.6;
          margin-bottom: 24px;
        }

        .jh-client-name {
          font-size: 16px;
          font-weight: 600;
          color: var(--jh-dark);
          margin: 0;
        }

        .jh-client-loc {
          font-size: 13px;
          color: var(--jh-muted);
          margin-top: 4px;
        }

        /* Journal / Blog Section */
        .jh-blog-section {
          padding: 80px 0;
          background-color: var(--jh-white);
        }

        .jh-blog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 30px;
        }

        @media (max-width: 850px) {
          .jh-blog-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }
        }

        :is(.jh-root.is-mobile, .simulated-frame.frame-mobile .jh-root, .preview-viewport-container.device-mobile .jh-root, .is-mobile .jh-root) .jh-blog-grid {
          grid-template-columns: 1fr !important;
          gap: 24px !important;
          width: 100% !important;
        }

        :is(.jh-root.is-mobile, .simulated-frame.frame-mobile .jh-root, .preview-viewport-container.device-mobile .jh-root, .is-mobile .jh-root) .jh-blog-card {
          width: 100% !important;
        }

        :is(.jh-root.is-mobile, .simulated-frame.frame-mobile .jh-root, .preview-viewport-container.device-mobile .jh-root, .is-mobile .jh-root) .jh-blog-img {
          width: 100% !important;
          height: 220px !important;
          object-fit: cover !important;
        }

        .jh-blog-card {
          border: 1px solid var(--jh-border);
          border-radius: 4px;
          overflow: hidden;
          transition: transform 0.3s;
        }

        .jh-blog-card:hover {
          transform: translateY(-4px);
        }

        .jh-blog-img {
          width: 100%;
          height: 220px;
          object-fit: cover;
        }

        .jh-blog-body {
          padding: 20px;
        }

        .jh-blog-meta {
          font-size: 12px;
          color: var(--jh-gold);
          font-weight: 600;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .jh-blog-title {
          font-size: 18px;
          font-weight: 600;
          color: var(--jh-dark);
          margin: 0 0 10px 0;
          line-height: 1.35;
        }

        .jh-blog-excerpt {
          font-size: 14px;
          color: var(--jh-muted);
          line-height: 1.6;
          margin-bottom: 16px;
        }

        .jh-blog-link {
          font-size: 13px;
          font-weight: 600;
          color: var(--jh-dark);
          text-decoration: underline;
          cursor: pointer;
        }

        .jh-blog-link:hover {
          color: var(--jh-gold);
        }

        /* Newsletter */
        .jh-newsletter-section {
          padding: 70px 0;
          background-color: var(--jh-charcoal);
          color: var(--jh-white);
          text-align: center;
        }

        .jh-newsletter-box {
          max-width: 620px;
          margin: 0 auto;
        }

        .jh-news-title {
          font-size: 34px;
          font-weight: 500;
          margin: 0 0 12px 0;
        }

        .jh-news-sub {
          font-size: 15px;
          color: #cccccc;
          margin-bottom: 28px;
        }

        .jh-news-form {
          display: flex;
          max-width: 500px;
          margin: 0 auto;
          gap: 8px;
        }

        .jh-mobile-view .jh-news-form {
          flex-direction: column !important;
          width: 100% !important;
          max-width: 100% !important;
          gap: 10px !important;
        }

        .jh-mobile-view .jh-news-input {
          width: 100% !important;
          height: 44px !important;
          box-sizing: border-box !important;
        }

        .jh-mobile-view .jh-news-btn {
          width: 100% !important;
          height: 44px !important;
        }

        .jh-news-input {
          flex: 1;
          height: 48px;
          padding: 0 16px;
          border: 1px solid #444444;
          background: #333333;
          color: var(--jh-white);
          border-radius: 2px;
          outline: none;
        }

        .jh-news-input:focus {
          border-color: var(--jh-gold);
        }

        /* Footer */
        .jh-footer {
          background-color: #171717;
          color: #b5b5b5;
          padding: 70px 0 20px 0;
          font-size: 14px;
        }

        .jh-footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 40px;
          margin-bottom: 50px;
        }

        @media (max-width: 900px) {
          .jh-footer-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 500px) {
          .jh-footer-grid {
            grid-template-columns: 1fr;
          }
        }

        .jh-mobile-view .jh-footer-grid {
          grid-template-columns: 1fr !important;
          gap: 24px !important;
          text-align: center !important;
        }

        .jh-mobile-view .jh-footer-col {
          align-items: center !important;
          text-align: center !important;
        }

        .jh-footer-col h4 {
          color: var(--jh-white);
          font-size: 16px;
          font-weight: 600;
          margin: 0 0 20px 0;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        .jh-footer-links {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .jh-footer-links li {
          margin-bottom: 10px;
        }

        .jh-footer-links a {
          color: #999999;
          text-decoration: none;
          transition: color 0.2s;
        }

        .jh-footer-links a:hover {
          color: var(--jh-gold);
        }

        .jh-footer-bottom {
          border-top: 1px solid #2a2a2a;
          padding-top: 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 13px;
        }

        /* Drawers */
        .jh-drawer-overlay {
          position: fixed;
          inset: 0;
          background-color: rgba(0,0,0,0.6);
          z-index: 1000;
          display: flex;
          justify-content: flex-end;
          animation: jhFadeIn 0.25s ease-out;
        }

        .jh-drawer {
          width: 420px;
          max-width: 90vw;
          height: 100%;
          background: var(--jh-white);
          display: flex;
          flex-direction: column;
          animation: jhSlideLeft 0.3s ease-out;
          box-shadow: -8px 0 24px rgba(0,0,0,0.15);
        }

        @keyframes jhFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes jhSlideLeft {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .jh-drawer-header {
          padding: 20px 24px;
          border-bottom: 1px solid var(--jh-border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .jh-drawer-title {
          font-size: 18px;
          font-weight: 600;
          margin: 0;
        }

        .jh-close-btn {
          background: none;
          border: none;
          font-size: 22px;
          cursor: pointer;
          color: var(--jh-charcoal);
        }

        .jh-drawer-body {
          flex: 1;
          overflow-y: auto;
          padding: 24px;
        }

        .jh-drawer-footer {
          padding: 20px 24px;
          border-top: 1px solid var(--jh-border);
          background-color: var(--jh-light-gray);
        }

        /* Free Shipping Bar */
        .jh-ship-bar-wrap {
          background: var(--jh-cream);
          padding: 12px;
          border-radius: 4px;
          margin-bottom: 20px;
        }

        .jh-ship-progress {
          height: 6px;
          background: var(--jh-border);
          border-radius: 3px;
          overflow: hidden;
          margin-top: 8px;
        }

        .jh-ship-fill {
          height: 100%;
          background: var(--jh-gold);
          transition: width 0.4s ease;
        }

        /* Cart Item Row */
        .jh-cart-item {
          display: flex;
          gap: 16px;
          margin-bottom: 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--jh-border);
        }

        .jh-cart-thumb {
          width: 75px;
          height: 75px;
          object-fit: cover;
          border-radius: 4px;
        }

        .jh-cart-info {
          flex: 1;
        }

        .jh-qty-stepper {
          display: inline-flex;
          align-items: center;
          border: 1px solid var(--jh-border);
          border-radius: 2px;
          margin-top: 8px;
        }

        .jh-qty-btn {
          background: none;
          border: none;
          width: 28px;
          height: 28px;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .jh-qty-num {
          padding: 0 10px;
          font-size: 13px;
          font-weight: 600;
        }

        /* PDP Page */
        .jh-pdp-section {
          padding: 50px 0 80px 0;
        }

        .jh-pdp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
        }

        @media (max-width: 900px) {
          .jh-pdp-grid {
            grid-template-columns: 1fr;
          }
        }

        .jh-pdp-gallery-main {
          width: 100%;
          aspect-ratio: 1;
          border-radius: 4px;
          overflow: hidden;
          background: var(--jh-light-gray);
          margin-bottom: 16px;
        }

        .jh-pdp-gallery-main img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .jh-swatch-list {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin: 12px 0 20px 0;
        }

        .jh-swatch-btn {
          border: 1px solid var(--jh-border);
          padding: 8px 16px;
          background: var(--jh-white);
          font-size: 13px;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.2s;
        }

        .jh-swatch-btn.active {
          border-color: var(--jh-gold);
          background-color: var(--jh-cream);
          color: var(--jh-gold-hover);
          font-weight: 600;
        }
      `}</style>

      {/* Top Announcement Bar */}
      <div className="jh-topbar">
        <div className="jh-container jh-topbar-inner">
          <div>
            <span>Free shipping worldwide for all orders over $199</span>
            <button
              onClick={() => {
                setViewMode('catalog')
                window.scrollTo({ top: 500, behavior: 'smooth' })
              }}
              className="jh-topbar-link"
              style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            >
              Shop Now &rarr;
            </button>
          </div>

          {!isMobile && (
            <div className="jh-topbar-right">
              <span className="jh-topbar-item">Help Center</span>
              <span className="jh-topbar-item">Track Order</span>
              <div style={{ position: 'relative' }}>
                <button
                  className="jh-topbar-item"
                  onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                >
                  {selectedCurrency} &#9662;
                </button>
                {currencyDropdownOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      right: 0,
                      backgroundColor: '#ffffff',
                      color: '#111111',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      borderRadius: '4px',
                      padding: '8px 0',
                      zIndex: 200,
                      minWidth: '110px',
                    }}
                  >
                    {['USD ($)', 'EUR (€)', 'GBP (£)', 'INR (₹)'].map((curr) => (
                      <div
                        key={curr}
                        onClick={() => {
                          setSelectedCurrency(curr)
                          setCurrencyDropdownOpen(false)
                        }}
                        style={{
                          padding: '6px 16px',
                          cursor: 'pointer',
                          fontSize: '13px',
                          backgroundColor: selectedCurrency === curr ? '#f5f3ed' : 'transparent',
                        }}
                      >
                        {curr}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Header */}
      <header className="jh-header-main">
        <div className="jh-container jh-header-grid">
          {/* Left column: Desktop Search or Mobile Hamburger */}
          {isMobile ? (
            <button
              className="jh-action-btn"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open Navigation"
              style={{ fontSize: '22px' }}
            >
              &#9776;
            </button>
          ) : (
            <div className="jh-search-box">
              <input
                type="text"
                placeholder="Search rings, necklaces, gemstones..."
                className="jh-search-input"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value)
                  if (!searchOpen) setSearchOpen(true)
                }}
                onFocus={() => setSearchOpen(true)}
              />
              <button
                className="jh-search-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                &#128269;
              </button>
            </div>
          )}

          {/* Center Column: Johary Logo */}
          <div
            className="jh-logo-wrap"
            onClick={() => {
              setViewMode('home')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <div className="jh-logo-symbol">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
              </svg>
            </div>
            <h1 className="jh-logo-title jh-serif">JOHARY</h1>
            <span className="jh-logo-subtitle">Handmade Jewelry Atelier</span>
          </div>

          {/* Right Column: Wishlist & Cart Actions */}
          <div className="jh-header-actions">
            {isMobile && (
              <button
                className="jh-action-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                &#128269;
              </button>
            )}

            <button
              className="jh-action-btn"
              onClick={() => setWishlistOpen(true)}
              aria-label="Wishlist"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistIds.length > 0 && <span className="jh-badge">{wishlistIds.length}</span>}
              {!isMobile && <span>Wishlist</span>}
            </button>

            <button
              className="jh-action-btn"
              onClick={() => setCartOpen(true)}
              aria-label="Shopping Cart"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {cartItems.length > 0 && <span className="jh-badge">{cartItems.length}</span>}
              {!isMobile && <span>${subtotal.toFixed(0)}</span>}
            </button>
          </div>
        </div>

        {/* Live Search Dropdown */}
        {searchOpen && (
          <div
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              backgroundColor: '#ffffff',
              borderBottom: '1px solid #e5e5e5',
              boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              padding: '24px 0',
              zIndex: 90,
            }}
          >
            <div className="jh-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', color: '#666' }}>
                  {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Jewelry Searches'}
                </span>
                <button
                  onClick={() => setSearchOpen(false)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '14px', color: '#888' }}
                >
                  Close &times;
                </button>
              </div>

              {searchQuery ? (
                searchFilteredProducts.length > 0 ? (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px' }}>
                    {searchFilteredProducts.map((prod) => (
                      <div
                        key={prod.id}
                        onClick={() => {
                          openPdp(prod)
                          setSearchOpen(false)
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          cursor: 'pointer',
                          padding: '8px',
                          borderRadius: '4px',
                          backgroundColor: '#f9f9f9',
                        }}
                      >
                        <img src={prod.images[0]} alt={prod.name} style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '2px' }} />
                        <div>
                          <div style={{ fontSize: '14px', fontWeight: 500, color: '#111' }}>{prod.name}</div>
                          <div style={{ fontSize: '13px', color: '#c19417', fontWeight: 600 }}>${prod.price.toFixed(2)}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ textAlign: 'center', padding: '20px 0', color: '#888' }}>
                    No artisanal pieces matched your query.
                  </div>
                )
              ) : (
                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {['18K Gold Hoops', 'Solitaire Rings', 'Baroque Pearls', 'Emerald Pendants', 'Diamond Eternity'].map((term) => (
                    <button
                      key={term}
                      onClick={() => setSearchQuery(term)}
                      style={{
                        padding: '6px 14px',
                        backgroundColor: '#f5f3ed',
                        border: '1px solid #e5e5e5',
                        borderRadius: '20px',
                        fontSize: '13px',
                        cursor: 'pointer',
                      }}
                    >
                      {term}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Desktop Main Navigation */}
      {!isMobile && (
        <nav className="jh-nav">
          <div className="jh-container">
            <ul className="jh-nav-list">
              {[
                { label: 'HOME', action: () => setViewMode('home') },
                { label: 'ALL JEWELRY', action: () => { setSelectedCategory('All'); setActiveTab('All'); setViewMode('home') } },
                { label: 'RINGS', action: () => { setActiveTab('Rings'); setViewMode('home') } },
                { label: 'EARRINGS', action: () => { setActiveTab('Earrings'); setViewMode('home') } },
                { label: 'NECKLACES', action: () => { setActiveTab('Necklaces'); setViewMode('home') } },
                { label: 'BRACELETS', action: () => { setActiveTab('Bracelets'); setViewMode('home') } },
                { label: 'ATELIER STORY', action: () => { document.getElementById('jh-story')?.scrollIntoView({ behavior: 'smooth' }) } },
                { label: 'PATRONS REVIEWS', action: () => { document.getElementById('jh-testimonials')?.scrollIntoView({ behavior: 'smooth' }) } },
                { label: 'JOURNAL', action: () => { document.getElementById('jh-journal')?.scrollIntoView({ behavior: 'smooth' }) } },
              ].map((item, idx) => (
                <li key={idx}>
                  <span
                    className={`jh-nav-link ${viewMode === 'home' && idx === 0 ? 'active' : ''}`}
                    onClick={item.action}
                  >
                    {item.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      )}

      {/* ============================================================== */}
      {/* VIEW: HOME VIEW */}
      {/* ============================================================== */}
      {viewMode === 'home' && (
        <main>
          {/* Section 1: Hero Carousel Banner */}
          <section className="jh-hero">
            <div
              className="jh-hero-bg"
              style={{
                backgroundImage:
                  activeSlide === 0
                    ? `url('https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&auto=format&fit=crop&q=85')`
                    : `url('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=1600&auto=format&fit=crop&q=85')`,
              }}
            />
            <div className="jh-hero-overlay" />
            <div className="jh-container" style={{ position: 'relative', width: '100%' }}>
              <div className="jh-hero-content">
                <span className="jh-hero-eyebrow">
                  {activeSlide === 0 ? 'NEW ARTISANAL ARRIVALS 2026' : 'HERITAGE COUTURE SOLITAIRES'}
                </span>
                <h2 className="jh-hero-title jh-serif">
                  {activeSlide === 0
                    ? 'Exclusive Handmade Jewelry For Every Moment'
                    : 'Timeless Allure & Organic Sculpted Gems'}
                </h2>
                <p className="jh-hero-desc">
                  {activeSlide === 0
                    ? 'Masterfully hand-forged by generational artisans using recycled 18K gold, natural freshwater pearls, and conflict-free gemstones.'
                    : 'Individually cast and polished in our historic workshop to celebrate your love, milestones, and daily elegance.'}
                </p>
                <div>
                  <button
                    className="jh-btn-primary"
                    onClick={() => {
                      document.getElementById('jh-trending')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    SHOP COLLECTION
                  </button>
                  <button
                    className="jh-btn-outline"
                    onClick={() => {
                      document.getElementById('jh-story')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    ATELIER STORY
                  </button>
                </div>
              </div>

              {/* Slider Dots */}
              <div
                style={{
                  position: 'absolute',
                  bottom: '-20px',
                  right: '20px',
                  display: 'flex',
                  gap: '8px',
                  zIndex: 10,
                }}
              >
                {[0, 1].map((slideIdx) => (
                  <button
                    key={slideIdx}
                    onClick={() => setActiveSlide(slideIdx)}
                    style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      border: 'none',
                      backgroundColor: activeSlide === slideIdx ? '#c19417' : 'rgba(255,255,255,0.4)',
                      cursor: 'pointer',
                    }}
                    aria-label={`Slide ${slideIdx + 1}`}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* Section 2: Circular Categories Showcase */}
          <section className="jh-categories-section">
            <div className="jh-container">
              <div className="jh-section-header">
                <h3 className="jh-section-title jh-serif">Curated Collections</h3>
                <p className="jh-section-sub">Explore bespoke categories sculpted by master goldsmiths</p>
              </div>

              <div className="jh-cat-grid">
                {JOHARY_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className="jh-cat-card"
                    onClick={() => {
                      if (cat.name === 'Bracelets') setActiveTab('Bracelets')
                      else if (cat.name === 'Earrings') setActiveTab('Earrings')
                      else if (cat.name === 'Necklaces') setActiveTab('Necklaces')
                      else if (cat.name === 'Rings') setActiveTab('Rings')
                      else setActiveTab('All')
                      document.getElementById('jh-trending')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    <div className="jh-cat-img-wrap">
                      <img src={cat.image} alt={cat.name} className="jh-cat-img" />
                    </div>
                    <h4 className="jh-cat-name">{cat.name}</h4>
                    <span className="jh-cat-count">{cat.itemCount} items</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section 3: 3-Column Promotional Showcase */}
          <section className="jh-promo-section">
            <div className="jh-container">
              <div className="jh-promo-grid">
                <div
                  className="jh-promo-card"
                  onClick={() => openPdp(JOHARY_PRODUCTS[1])}
                >
                  <img
                    src="https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80"
                    alt="Hoop Earrings"
                    className="jh-promo-bg"
                  />
                  <div className="jh-promo-content">
                    <span className="jh-promo-tag">UP TO 20% OFF</span>
                    <h3 className="jh-promo-title jh-serif">Gold-Plated Handcrafted Hoop Earrings</h3>
                    <span className="jh-promo-btn">SHOP NOW &rarr;</span>
                  </div>
                </div>

                <div
                  className="jh-promo-card"
                  onClick={() => openPdp(JOHARY_PRODUCTS[2])}
                >
                  <img
                    src="https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&auto=format&fit=crop&q=80"
                    alt="Rose Gold Hoops"
                    className="jh-promo-bg"
                  />
                  <div className="jh-promo-content">
                    <span className="jh-promo-tag">UP TO 30% OFF</span>
                    <h3 className="jh-promo-title jh-serif">Teardrop Half Rose Gold Hoop Earrings</h3>
                    <span className="jh-promo-btn">SHOP NOW &rarr;</span>
                  </div>
                </div>

                <div
                  className="jh-promo-card"
                  onClick={() => openPdp(JOHARY_PRODUCTS[3])}
                >
                  <img
                    src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&auto=format&fit=crop&q=80"
                    alt="Pearl Necklace"
                    className="jh-promo-bg"
                  />
                  <div className="jh-promo-content">
                    <span className="jh-promo-tag">UP TO 20% OFF</span>
                    <h3 className="jh-promo-title jh-serif">Fashion Gold Plated Pearls Necklace</h3>
                    <span className="jh-promo-btn">SHOP NOW &rarr;</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Trending Products with Category Tabs */}
          <section id="jh-trending" className="jh-products-section">
            <div className="jh-container">
              <div className="jh-section-header">
                <h3 className="jh-section-title jh-serif">Trending Products</h3>
                <p className="jh-section-sub">Handpicked creations celebrating balance and precious metals</p>
              </div>

              {/* Tabs */}
              <div className="jh-tabs-nav">
                {(['All', 'Bracelets', 'Earrings', 'Necklaces', 'Rings'] as const).map((tab) => (
                  <button
                    key={tab}
                    className={`jh-tab-btn ${activeTab === tab ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Product Grid */}
              <div className="jh-product-grid">
                {tabFilteredProducts.map((product) => {
                  const isWishlisted = wishlistIds.includes(product.id)
                  return (
                    <article key={product.id} className="jh-product-card">
                      <div className="jh-product-thumb" onClick={() => openPdp(product)}>
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="jh-product-img"
                          onError={(e) => {
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&auto=format&fit=crop&q=80'
                          }}
                        />
                        {product.isSale && <span className="jh-product-badge sale">SALE</span>}
                        {!product.isSale && product.isNew && <span className="jh-product-badge">NEW</span>}

                        {/* Floating quick action buttons */}
                        <div
                          className="jh-card-actions"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button
                            className="jh-card-action-btn"
                            onClick={() => setQuickViewProduct(product)}
                            title="Quick View"
                          >
                            &#128065;
                          </button>
                          <button
                            className="jh-card-action-btn"
                            onClick={() => handleToggleWishlist(product.id)}
                            title="Add to Wishlist"
                            style={{ color: isWishlisted ? '#d82253' : 'inherit' }}
                          >
                            {isWishlisted ? '♥' : '♡'}
                          </button>
                        </div>
                      </div>

                      <div className="jh-product-info">
                        <span className="jh-product-cat">{product.category}</span>
                        <h4 className="jh-product-name jh-serif" onClick={() => openPdp(product)}>
                          {product.name}
                        </h4>

                        <div className="jh-product-rating">
                          <span>★</span>
                          <span style={{ fontWeight: 600, color: '#333' }}>{product.rating.toFixed(2)}</span>
                          <span className="jh-rating-count">({product.reviewCount})</span>
                        </div>

                        <div className="jh-price-row">
                          <span className="jh-current-price">${product.price.toFixed(2)}</span>
                          {product.compareAtPrice && (
                            <span className="jh-old-price">${product.compareAtPrice.toFixed(2)}</span>
                          )}
                        </div>

                        <button
                          className="jh-add-cart-btn"
                          onClick={() => handleAddToCart(product)}
                        >
                          Add To Bag +
                        </button>
                      </div>
                    </article>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Section 5: Split Atelier Heritage & Spotlight */}
          <section id="jh-story" className="jh-split-section">
            <div className="jh-container">
              <div className="jh-split-grid">
                <div>
                  <span style={{ color: '#c19417', fontSize: '13px', fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase' }}>
                    THE HANDCRAFTED HERITAGE
                  </span>
                  <h3 className="jh-story-title jh-serif">The Soul of Johary Handcrafted Jewelry</h3>
                  <p className="jh-story-desc">
                    Every piece in our collection begins as raw 18K solid gold wire or recycled silver grain, shaped meticulously with handheld saws, fire, and planishing hammers. We preserve generational silversmithing techniques while guaranteeing 100% ethically sourced, conflict-free minerals.
                  </p>
                  <p className="jh-story-desc">
                    Unlike mass-produced accessories, our jewelry bears the subtle signature of the craftsman’s hands — ensuring no two creations are identical.
                  </p>
                  <button
                    className="jh-btn-primary"
                    onClick={() => {
                      document.getElementById('jh-trending')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    EXPLORE ATELIER CREATIONS
                  </button>
                </div>

                {/* Spotlight Box */}
                <div>
                  <div className="jh-spotlight-card">
                    <img
                      src={JOHARY_PRODUCTS[0].images[0]}
                      alt="Spotlight Jewelry"
                      className="jh-spotlight-img"
                    />
                    <div>
                      <span style={{ fontSize: '11px', color: '#c19417', fontWeight: 700, textTransform: 'uppercase' }}>
                        ATELIER SPOTLIGHT
                      </span>
                      <h4 className="jh-serif" style={{ fontSize: '20px', margin: '4px 0 8px 0', color: '#111' }}>
                        {JOHARY_PRODUCTS[0].name}
                      </h4>
                      <p style={{ fontSize: '13px', color: '#666', marginBottom: '12px', lineHeight: '1.4' }}>
                        {JOHARY_PRODUCTS[0].subtitle}
                      </p>
                      <div style={{ fontSize: '18px', fontWeight: 700, color: '#111', marginBottom: '14px' }}>
                        ${JOHARY_PRODUCTS[0].price.toFixed(2)}{' '}
                        <del style={{ fontSize: '14px', color: '#888', fontWeight: 400 }}>
                          ${JOHARY_PRODUCTS[0].compareAtPrice?.toFixed(2)}
                        </del>
                      </div>
                      <button
                        className="jh-btn-primary"
                        style={{ padding: '10px 20px', fontSize: '12px' }}
                        onClick={() => handleAddToCart(JOHARY_PRODUCTS[0])}
                      >
                        Claim Spotlight Piece
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 6: Full-Width Parallax Banner */}
          <section className="jh-parallax-section">
            <div className="jh-parallax-overlay" />
            <div className="jh-parallax-content">
              <span style={{ color: '#e8c66e', fontSize: '13px', fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase' }}>
                TIMELESS ARTISTRY
              </span>
              <h2 className="jh-parallax-title jh-serif">Handcrafted Luxury That Shines Forever</h2>
              <p className="jh-parallax-sub">
                Designed to be worn, loved, and passed down through generations. Crafted with recycled precious metals and certified natural stones.
              </p>
              <button
                className="jh-btn-primary"
                onClick={() => {
                  document.getElementById('jh-trending')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                EXPLORE COLLECTION
              </button>
            </div>
          </section>

          {/* Section 7: Store Service Highlights (4 Value Pillars) */}
          <section className="jh-trust-strip">
            <div className="jh-container">
              <div className="jh-trust-grid">
                <div className="jh-trust-item">
                  <div className="jh-trust-icon">&#128666;</div>
                  <div>
                    <h5 className="jh-trust-heading">Free Worldwide Shipping</h5>
                    <p className="jh-trust-text">Complimentary insured express delivery on orders over $199.</p>
                  </div>
                </div>

                <div className="jh-trust-item">
                  <div className="jh-trust-icon">&#9742;</div>
                  <div>
                    <h5 className="jh-trust-heading">24/7 Concierge Support</h5>
                    <p className="jh-trust-text">Expert jewelry stylists ready to advise on custom sizing & gifts.</p>
                  </div>
                </div>

                <div className="jh-trust-item">
                  <div className="jh-trust-icon">&#8635;</div>
                  <div>
                    <h5 className="jh-trust-heading">30-Day Money Back</h5>
                    <p className="jh-trust-text">Hassle-free complimentary returns & atelier ring resizing.</p>
                  </div>
                </div>

                <div className="jh-trust-item">
                  <div className="jh-trust-icon">&#128274;</div>
                  <div>
                    <h5 className="jh-trust-heading">100% Secure Checkout</h5>
                    <p className="jh-trust-text">Bank-grade encryption, certificate of provenance included.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 8: Patrons Testimonials */}
          <section id="jh-testimonials" className="jh-testimonials-section">
            <div className="jh-container">
              <div className="jh-testimonials-slider">
                <div className="jh-quote-icon">&#10077;</div>
                <p className="jh-quote-text jh-serif">
                  "{JOHARY_TESTIMONIALS[0].quote}"
                </p>
                <div style={{ color: '#c19417', fontSize: '18px', marginBottom: '8px' }}>
                  ★★★★★
                </div>
                <h5 className="jh-client-name">{JOHARY_TESTIMONIALS[0].author}</h5>
                <span className="jh-client-loc">{JOHARY_TESTIMONIALS[0].location}</span>
              </div>
            </div>
          </section>

          {/* Section 9: Journal / Blog Posts */}
          <section id="jh-journal" className="jh-blog-section">
            <div className="jh-container">
              <div className="jh-section-header">
                <h3 className="jh-section-title jh-serif">From The Atelier Journal</h3>
                <p className="jh-section-sub">Stories on antique metalwork, gemology insights, and jewelry care</p>
              </div>

              <div className="jh-blog-grid">
                {JOHARY_BLOG_POSTS.map((post) => (
                  <article key={post.id} className="jh-blog-card">
                    <img src={post.image} alt={post.title} className="jh-blog-img" />
                    <div className="jh-blog-body">
                      <div className="jh-blog-meta">
                        <span>{post.category}</span> &bull; <span>{post.readTime}</span>
                      </div>
                      <h4 className="jh-blog-title jh-serif">{post.title}</h4>
                      <p className="jh-blog-excerpt">{post.excerpt}</p>
                      <span className="jh-blog-link">Read Article &rarr;</span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Section 10: VIP Newsletter Subscription */}
          <section className="jh-newsletter-section">
            <div className="jh-container">
              <div className="jh-newsletter-box">
                <h3 className="jh-news-title jh-serif">Join The Johary Circle</h3>
                <p className="jh-news-sub">
                  Subscribe to receive private collection previews, secret trunk show invitations, and 15% off your first purchase.
                </p>

                {newsletterSuccess ? (
                  <div style={{ backgroundColor: '#2a4d33', padding: '16px', borderRadius: '4px', color: '#c3e6cb' }}>
                    <strong>Welcome to the Circle!</strong> Use code <strong>JOHARY15</strong> at checkout for 15% off.
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="jh-news-form">
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address..."
                      className="jh-news-input"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                    />
                    <button type="submit" className="jh-btn-primary" style={{ whiteSpace: 'nowrap' }}>
                      SUBSCRIBE
                    </button>
                  </form>
                )}
              </div>
            </div>
          </section>
        </main>
      )}

      {/* ============================================================== */}
      {/* VIEW: PRODUCT DETAIL PAGE (PDP) */}
      {/* ============================================================== */}
      {viewMode === 'pdp' && (
        <main className="jh-pdp-section">
          <div className="jh-container">
            {/* Breadcrumb */}
            <div style={{ fontSize: '13px', color: '#666', marginBottom: '24px' }}>
              <span
                onClick={() => setViewMode('home')}
                style={{ cursor: 'pointer', textDecoration: 'underline' }}
              >
                Home
              </span>{' '}
              / <span>{selectedProduct.category}</span> / <strong>{selectedProduct.name}</strong>
            </div>

            <div className="jh-pdp-grid">
              {/* Product Gallery */}
              <div>
                <div className="jh-pdp-gallery-main">
                  <img src={selectedProduct.images[0]} alt={selectedProduct.name} />
                </div>
                {selectedProduct.images.length > 1 && (
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {selectedProduct.images.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt="Thumbnail"
                        style={{
                          width: '70px',
                          height: '70px',
                          objectFit: 'cover',
                          borderRadius: '2px',
                          border: '1px solid #c19417',
                          cursor: 'pointer',
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Product Details & Purchase Form */}
              <div>
                <span style={{ fontSize: '12px', color: '#c19417', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>
                  {selectedProduct.category} &bull; {selectedProduct.karat || 'Handmade Gold'}
                </span>
                <h2 className="jh-serif" style={{ fontSize: '32px', margin: '8px 0 12px 0', color: '#111' }}>
                  {selectedProduct.name}
                </h2>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <span style={{ color: '#f5a623', fontSize: '16px' }}>★★★★★</span>
                  <span style={{ fontSize: '14px', color: '#666' }}>
                    {selectedProduct.rating.toFixed(2)} ({selectedProduct.reviewCount} customer reviews)
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '26px', fontWeight: 700, color: '#111' }}>
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  {selectedProduct.compareAtPrice && (
                    <span style={{ fontSize: '18px', color: '#888', textDecoration: 'line-through' }}>
                      ${selectedProduct.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                  {selectedProduct.isSale && (
                    <span style={{ backgroundColor: '#d82253', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '2px' }}>
                      SAVE 20%
                    </span>
                  )}
                </div>

                <p style={{ fontSize: '15px', color: '#555', lineHeight: '1.6', marginBottom: '24px' }}>
                  {selectedProduct.artisanDescription}
                </p>

                {/* Metal Selection */}
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ fontSize: '13px', fontWeight: 600, color: '#222', textTransform: 'uppercase' }}>
                    Select Metal: <strong>{selectedMetal}</strong>
                  </label>
                  <div className="jh-swatch-list">
                    {selectedProduct.metalOptions.map((metal) => (
                      <button
                        key={metal}
                        className={`jh-swatch-btn ${selectedMetal === metal ? 'active' : ''}`}
                        onClick={() => setSelectedMetal(metal)}
                      >
                        {metal}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ring Sizing (if Rings) */}
                {selectedProduct.category === 'Rings' && (
                  <div style={{ marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <label style={{ fontSize: '13px', fontWeight: 600, color: '#222', textTransform: 'uppercase' }}>
                        Ring Size (US): <strong>{selectedRingSize}</strong>
                      </label>
                      <span style={{ fontSize: '12px', color: '#c19417', textDecoration: 'underline', cursor: 'pointer' }}>
                        Size Chart & Sizing Guide
                      </span>
                    </div>
                    <div className="jh-swatch-list">
                      {['5 (US)', '6 (US)', '7 (US)', '8 (US)', '9 (US)', 'Bespoke Size'].map((sz) => (
                        <button
                          key={sz}
                          className={`jh-swatch-btn ${selectedRingSize === sz ? 'active' : ''}`}
                          onClick={() => setSelectedRingSize(sz)}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity and Add to Bag */}
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '30px' }}>
                  <div className="jh-qty-stepper" style={{ height: '48px' }}>
                    <button
                      className="jh-qty-btn"
                      onClick={() => setPdpQuantity(Math.max(1, pdpQuantity - 1))}
                    >
                      &minus;
                    </button>
                    <span className="jh-qty-num" style={{ fontSize: '15px' }}>{pdpQuantity}</span>
                    <button
                      className="jh-qty-btn"
                      onClick={() => setPdpQuantity(pdpQuantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="jh-btn-primary"
                    style={{ flex: 1, height: '48px' }}
                    onClick={() => handleAddToCart(selectedProduct, selectedMetal, selectedRingSize, pdpQuantity)}
                  >
                    Add to Bag &bull; ${(selectedProduct.price * pdpQuantity).toFixed(2)}
                  </button>
                </div>

                {/* Specifications List */}
                <div style={{ borderTop: '1px solid #e5e5e5', paddingTop: '20px' }}>
                  <h5 style={{ fontSize: '14px', textTransform: 'uppercase', marginBottom: '12px', color: '#111' }}>
                    Piece Specifications & Certifications
                  </h5>
                  <ul style={{ paddingLeft: '20px', color: '#666', fontSize: '14px', lineHeight: '1.8' }}>
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

      {/* Complete Johary Footer */}
      <footer className="jh-footer">
        <div className="jh-container">
          <div className="jh-footer-grid">
            <div className="jh-footer-col">
              <h3 className="jh-serif" style={{ color: '#ffffff', fontSize: '24px', letterSpacing: '3px', margin: '0 0 14px 0' }}>
                JOHARY
              </h3>
              <p style={{ lineHeight: '1.7', color: '#999999', marginBottom: '20px' }}>
                Johary is an independent haute atelier specializing in bespoke jewelry, hand-forged 18K recycled gold, ethical solitaires, and antique filigree craftsmanship.
              </p>
              <div style={{ color: '#cccccc', fontSize: '13px', lineHeight: '1.8' }}>
                <div>99 Atelier Guild St., New York, NY 10013</div>
                <div>concierge@johary-atelier.com &bull; +1 (800) 892-0556</div>
              </div>
            </div>

            <div className="jh-footer-col">
              <h4>Quick Links</h4>
              <ul className="jh-footer-links">
                <li><a href="#search">Search Catalog</a></li>
                <li><a href="#about">About Atelier</a></li>
                <li><a href="#shipping">Shipping & Insured Delivery</a></li>
                <li><a href="#returns">Returns & Sizing Exchange</a></li>
                <li><a href="#privacy">Privacy Policy</a></li>
              </ul>
            </div>

            <div className="jh-footer-col">
              <h4>Collections</h4>
              <ul className="jh-footer-links">
                <li><a href="#rings">Handmade Rings</a></li>
                <li><a href="#earrings">Organic Hoops & Studs</a></li>
                <li><a href="#necklaces">Baroque Pearl Necklaces</a></li>
                <li><a href="#bracelets">Solid Wire Bangles</a></li>
                <li><a href="#solitaires">Diamond Solitaires</a></li>
              </ul>
            </div>

            <div className="jh-footer-col">
              <h4>Customer Concierge</h4>
              <p style={{ color: '#999999', fontSize: '13px', marginBottom: '16px' }}>
                Need ring sizing advice or bespoke bridal consultation? Our gemologists are on standby.
              </p>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  className="jh-btn-primary"
                  style={{ padding: '10px 18px', fontSize: '11px', width: '100%' }}
                  onClick={() => alert('Consultation requested! Our stylist concierge will reach out within 2 hours.')}
                >
                  Book Stylist Appointment
                </button>
              </div>
            </div>
          </div>

          <div className="jh-footer-bottom">
            <div>
              &copy; 2026 Johary Handmade Jewelry Store. All Rights Reserved. Coexists within Willovate One.
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '12px', color: '#888' }}>Accepted Encrypted Payments:</span>
              <span style={{ color: '#ccc', fontWeight: 600 }}>VISA &bull; MC &bull; AMEX &bull; PAYPAL &bull; APPLE PAY</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Slide-out Cart Drawer */}
      {cartOpen && (
        <div className="jh-drawer-overlay" onClick={() => setCartOpen(false)}>
          <div className="jh-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="jh-drawer-header">
              <h3 className="jh-drawer-title jh-serif">Your Shopping Bag ({cartItems.length})</h3>
              <button className="jh-close-btn" onClick={() => setCartOpen(false)}>
                &times;
              </button>
            </div>

            <div className="jh-drawer-body">
              {/* Free Shipping Meter */}
              <div className="jh-ship-bar-wrap">
                <div style={{ fontSize: '13px', display: 'flex', justifyContent: 'space-between' }}>
                  <span>
                    {subtotal >= freeShippingThreshold ? (
                      <strong>🎉 Congratulations! You have unlocked Free Shipping.</strong>
                    ) : (
                      <>Add <strong>${(freeShippingThreshold - subtotal).toFixed(2)}</strong> more for Free Shipping</>
                    )}
                  </span>
                  <span>{freeShippingProgress.toFixed(0)}%</span>
                </div>
                <div className="jh-ship-progress">
                  <div className="jh-ship-fill" style={{ width: `${freeShippingProgress}%` }} />
                </div>
              </div>

              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>
                  <div style={{ fontSize: '40px', marginBottom: '12px' }}>🛍</div>
                  <p>Your shopping bag is currently empty.</p>
                  <button
                    className="jh-btn-primary"
                    onClick={() => {
                      setCartOpen(false)
                      setViewMode('home')
                    }}
                  >
                    Explore Jewelry
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} className="jh-cart-item">
                    <img src={item.product.images[0]} alt={item.product.name} className="jh-cart-thumb" />
                    <div className="jh-cart-info">
                      <div style={{ fontSize: '14px', fontWeight: 600, color: '#111' }}>
                        {item.product.name}
                      </div>
                      <div style={{ fontSize: '12px', color: '#666', marginTop: '2px' }}>
                        {item.selectedMetal} {item.selectedSize ? `• Size: ${item.selectedSize}` : ''}
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 700, color: '#c19417', marginTop: '4px' }}>
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </div>

                      <div className="jh-qty-stepper">
                        <button className="jh-qty-btn" onClick={() => handleUpdateCartQuantity(idx, -1)}>
                          &minus;
                        </button>
                        <span className="jh-qty-num">{item.quantity}</span>
                        <button className="jh-qty-btn" onClick={() => handleUpdateCartQuantity(idx, 1)}>
                          +
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={() => handleUpdateCartQuantity(idx, -item.quantity)}
                      style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '18px' }}
                      title="Remove Item"
                    >
                      &times;
                    </button>
                  </div>
                ))
              )}

              {/* Promo Code Input */}
              {cartItems.length > 0 && (
                <form onSubmit={handleApplyCoupon} style={{ marginTop: '20px', display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Coupon code (e.g. JOHARY20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: '1px solid #e5e5e5',
                      borderRadius: '2px',
                      fontSize: '13px',
                      outline: 'none',
                    }}
                  />
                  <button type="submit" className="jh-btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>
                    Apply
                  </button>
                </form>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="jh-drawer-footer">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px' }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {couponApplied && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '14px', color: '#2a7e43' }}>
                    <span>Promo Discount (20%)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '18px', fontWeight: 700, color: '#111' }}>
                  <span>Estimated Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <button
                  className="jh-btn-primary"
                  style={{ width: '100%', padding: '14px' }}
                  onClick={() => alert(`Proceeding to checkout with total: $${total.toFixed(2)}`)}
                >
                  PROCEED TO SECURE CHECKOUT
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Slide-out Wishlist Drawer */}
      {wishlistOpen && (
        <div className="jh-drawer-overlay" onClick={() => setWishlistOpen(false)}>
          <div className="jh-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="jh-drawer-header">
              <h3 className="jh-drawer-title jh-serif">Saved Wishlist ({wishlistIds.length})</h3>
              <button className="jh-close-btn" onClick={() => setWishlistOpen(false)}>
                &times;
              </button>
            </div>
            <div className="jh-drawer-body">
              {wishlistIds.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#888' }}>
                  <p>You have not saved any pieces yet.</p>
                </div>
              ) : (
                wishlistIds.map((id) => {
                  const product = JOHARY_PRODUCTS.find((p) => p.id === id)
                  if (!product) return null
                  return (
                    <div key={id} className="jh-cart-item">
                      <img src={product.images[0]} alt={product.name} className="jh-cart-thumb" />
                      <div className="jh-cart-info">
                        <div style={{ fontSize: '14px', fontWeight: 600 }}>{product.name}</div>
                        <div style={{ fontSize: '14px', fontWeight: 700, color: '#c19417', marginTop: '4px' }}>
                          ${product.price.toFixed(2)}
                        </div>
                        <button
                          className="jh-btn-primary"
                          style={{ padding: '6px 12px', fontSize: '11px', marginTop: '8px' }}
                          onClick={() => {
                            handleAddToCart(product)
                            handleToggleWishlist(product.id)
                          }}
                        >
                          Move To Bag +
                        </button>
                      </div>
                      <button
                        onClick={() => handleToggleWishlist(product.id)}
                        style={{ background: 'none', border: 'none', color: '#999', cursor: 'pointer', fontSize: '18px' }}
                      >
                        &times;
                      </button>
                    </div>
                  )
                })
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="jh-drawer-overlay" onClick={() => setQuickViewProduct(null)} style={{ alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              backgroundColor: '#fff',
              maxWidth: '700px',
              width: '90%',
              borderRadius: '6px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
              position: 'relative',
              animation: 'jhFadeIn 0.3s ease',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setQuickViewProduct(null)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                zIndex: 10,
              }}
            >
              &times;
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
              <img
                src={quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', minHeight: '320px' }}
              />
              <div style={{ padding: '28px' }}>
                <span style={{ fontSize: '11px', color: '#c19417', textTransform: 'uppercase', fontWeight: 600 }}>
                  {quickViewProduct.category}
                </span>
                <h3 className="jh-serif" style={{ fontSize: '22px', margin: '6px 0 10px 0' }}>
                  {quickViewProduct.name}
                </h3>
                <div style={{ fontSize: '20px', fontWeight: 700, color: '#111', marginBottom: '14px' }}>
                  ${quickViewProduct.price.toFixed(2)}
                </div>
                <p style={{ fontSize: '13px', color: '#666', lineHeight: '1.5', marginBottom: '20px' }}>
                  {quickViewProduct.subtitle}
                </p>
                <button
                  className="jh-btn-primary"
                  style={{ width: '100%', padding: '12px 0' }}
                  onClick={() => {
                    handleAddToCart(quickViewProduct)
                    setQuickViewProduct(null)
                  }}
                >
                  Add To Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Slide-out Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="jh-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="jh-drawer" style={{ width: '320px' }} onClick={(e) => e.stopPropagation()}>
            <div className="jh-drawer-header">
              <h3 className="jh-drawer-title jh-serif">JOHARY ATELIER</h3>
              <button className="jh-close-btn" onClick={() => setMobileMenuOpen(false)}>
                &times;
              </button>
            </div>
            <div className="jh-drawer-body">
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {[
                  { label: 'Home', action: () => { setViewMode('home'); setMobileMenuOpen(false) } },
                  { label: 'All Jewelry', action: () => { setActiveTab('All'); setViewMode('home'); setMobileMenuOpen(false) } },
                  { label: 'Rings & Bands', action: () => { setActiveTab('Rings'); setViewMode('home'); setMobileMenuOpen(false) } },
                  { label: 'Earrings & Hoops', action: () => { setActiveTab('Earrings'); setViewMode('home'); setMobileMenuOpen(false) } },
                  { label: 'Necklaces & Chokers', action: () => { setActiveTab('Necklaces'); setViewMode('home'); setMobileMenuOpen(false) } },
                  { label: 'Bracelets & Cuffs', action: () => { setActiveTab('Bracelets'); setViewMode('home'); setMobileMenuOpen(false) } },
                ].map((item, i) => (
                  <li key={i} style={{ borderBottom: '1px solid #eee' }}>
                    <span
                      onClick={item.action}
                      style={{
                        display: 'block',
                        padding: '14px 0',
                        fontSize: '15px',
                        fontWeight: 500,
                        cursor: 'pointer',
                        color: '#222',
                      }}
                    >
                      {item.label}
                    </span>
                  </li>
                ))}
              </ul>

              <div style={{ marginTop: '30px', padding: '16px', background: '#f5f3ed', borderRadius: '4px' }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#111', marginBottom: '6px' }}>Need Stylist Guidance?</div>
                <div style={{ fontSize: '12px', color: '#666' }}>Call our atelier: +1 (800) 892-0556</div>
              </div>
            </div>
          </div>
        </div>
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

export default JoharyJewelryStorefront

