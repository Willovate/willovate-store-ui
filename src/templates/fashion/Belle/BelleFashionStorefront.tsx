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
  BELLE_CATEGORY_CARDS,
  BELLE_SHOP_THE_LOOK_HOTSPOTS,
  BELLE_EDITORIAL_BLOCKS,
  BELLE_TESTIMONIALS,
  BELLE_TRUST_ITEMS,
  BELLE_INSTAGRAM_POSTS,
  BELLE_NAV_CATEGORIES,
  BELLE_MEGA_MENU,
  BELLE_SIZES,
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

  // View state: 'home' | 'collection' | 'product'
  const [viewMode, setViewMode] = useState<'home' | 'collection' | 'product'>('home')
  const [selectedCategory, setSelectedCategory] = useState<BelleCategoryType | 'All'>('All')
  const [selectedProductId, setSelectedProductId] = useState<string>(BELLE_PRODUCTS[0].id)

  // Modals & Drawers
  const [cartOpen, setCartOpen] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<BelleProduct | null>(null)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null)
  const [mobileActiveCategory, setMobileActiveCategory] = useState<string | null>(null)

  // User Commerce State
  const [cartItems, setCartItems] = useState<BelleCartItem[]>([
    {
      product: BELLE_PRODUCTS[0], // Cashmere Belted Trench Coat
      size: 'M',
      color: 'Camel Tan',
      quantity: 1,
    },
    {
      product: BELLE_PRODUCTS[10], // Calfskin Top Handle Bag
      size: 'One Size',
      color: 'Saddle Brown',
      quantity: 1,
    },
  ])
  const [wishlist, setWishlist] = useState<string[]>([BELLE_PRODUCTS[1].id, BELLE_PRODUCTS[4].id])
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Hotspot State for Shop The Look
  const [activeHotspot, setActiveHotspot] = useState<BelleShopTheLookHotspot | null>(null)

  // Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('')
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false)

  // Collection Page Filters & Sort
  const [collectionSort, setCollectionSort] = useState<'featured' | 'price-low' | 'price-high' | 'rating' | 'newest'>('featured')
  const [collectionLayout, setCollectionLayout] = useState<'grid' | 'list'>('grid')
  const [filterGender, setFilterGender] = useState<'All' | 'Women' | 'Men'>('All')
  const [filterPriceMax, setFilterPriceMax] = useState<number>(30000)
  const [filterOnlySale, setFilterOnlySale] = useState(false)
  const [filterSize, setFilterSize] = useState<string>('All')

  // PDP Specific State
  const activeProduct = useMemo(() => {
    return BELLE_PRODUCTS.find((p) => p.id === selectedProductId) || BELLE_PRODUCTS[0]
  }, [selectedProductId])

  const [pdpSelectedImage, setPdpSelectedImage] = useState<string>(activeProduct.gallery[0] || activeProduct.image)
  const [pdpSelectedColor, setPdpSelectedColor] = useState<string>(activeProduct.colors[0]?.name || '')
  const [pdpSelectedSize, setPdpSelectedSize] = useState<string>(activeProduct.sizes[0] || 'M')
  const [pdpQuantity, setPdpQuantity] = useState<number>(1)
  const [pdpAccordionOpen, setPdpAccordionOpen] = useState<{ details: boolean; materials: boolean; shipping: boolean }>({
    details: true,
    materials: false,
    shipping: false,
  })

  // Quick View State
  const [qvSelectedColor, setQvSelectedColor] = useState<string>('')
  const [qvSelectedSize, setQvSelectedSize] = useState<string>('')
  const [qvQuantity, setQvQuantity] = useState<number>(1)

  // Update PDP internal state when product changes
  useEffect(() => {
    setPdpSelectedImage(activeProduct.gallery[0] || activeProduct.image)
    setPdpSelectedColor(activeProduct.colors[0]?.name || '')
    setPdpSelectedSize(activeProduct.sizes[0] || 'M')
    setPdpQuantity(1)
  }, [activeProduct])

  // Countdown timer for Sale Section
  const [timeLeft, setTimeLeft] = useState({ hours: 14, minutes: 28, seconds: 45 })
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 }
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 }
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        return { hours: 23, minutes: 59, seconds: 59 }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Show Toast
  const triggerToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => {
      setToastMessage(null)
    }, 3000)
  }

  // Cart operations
  const addToCart = (product: BelleProduct, size: string, color: string, qty = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      )
      if (existingIdx > -1) {
        const next = [...prev]
        next[existingIdx].quantity += qty
        return next
      }
      return [...prev, { product, size, color, quantity: qty }]
    })
    triggerToast(`Added "${product.name}" (${size}) to bag`)
  }

  const updateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((_, i) => i !== index))
    } else {
      setCartItems((prev) => {
        const next = [...prev]
        next[index].quantity = newQty
        return next
      })
    }
  }

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId)
      if (exists) {
        triggerToast('Removed item from Wishlist')
        return prev.filter((id) => id !== productId)
      } else {
        triggerToast('Saved item to Wishlist')
        return [...prev, productId]
      }
    })
  }

  // Cart calculation
  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, item) => {
      const price = item.product.salePrice || item.product.price
      return acc + price * item.quantity
    }, 0)
  }, [cartItems])

  const freeShippingThreshold = 2999
  const freeShippingProgress = Math.min(100, Math.round((cartSubtotal / freeShippingThreshold) * 100))
  const freeShippingDiff = freeShippingThreshold - cartSubtotal

  // Open PDP
  const openProduct = (productId: string) => {
    setSelectedProductId(productId)
    setViewMode('product')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Open Collection
  const openCollection = (category: BelleCategoryType | 'All' = 'All') => {
    setSelectedCategory(category)
    setViewMode('collection')
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Filtered Products for Collection
  const collectionProducts = useMemo(() => {
    let list = [...BELLE_PRODUCTS]

    // Category
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Sale') {
        list = list.filter((p) => p.isSale)
      } else if (selectedCategory === 'New Arrivals') {
        list = list.filter((p) => p.isNew)
      } else if (selectedCategory === 'Collections') {
        list = list.filter((p) => p.isFeatured)
      } else {
        list = list.filter((p) => p.category === selectedCategory)
      }
    }

    // Gender
    if (filterGender !== 'All') {
      list = list.filter((p) => p.gender === filterGender || p.gender === 'Unisex')
    }

    // Max Price
    list = list.filter((p) => (p.salePrice || p.price) <= filterPriceMax)

    // Sale only
    if (filterOnlySale) {
      list = list.filter((p) => p.isSale)
    }

    // Size
    if (filterSize !== 'All') {
      list = list.filter((p) => p.sizes.includes(filterSize))
    }

    // Sort
    if (collectionSort === 'price-low') {
      list.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price))
    } else if (collectionSort === 'price-high') {
      list.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price))
    } else if (collectionSort === 'rating') {
      list.sort((a, b) => b.rating - a.rating)
    } else if (collectionSort === 'newest') {
      list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
    }

    return list
  }, [selectedCategory, filterGender, filterPriceMax, filterOnlySale, filterSize, collectionSort])

  // Search results
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.toLowerCase()
    return BELLE_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    )
  }, [searchQuery])

  // Frequently Bought Together combo items
  const frequentlyBoughtCombo = useMemo(() => {
    const others = BELLE_PRODUCTS.filter((p) => p.id !== activeProduct.id)
    return [activeProduct, others[0] || BELLE_PRODUCTS[1], others[1] || BELLE_PRODUCTS[2]]
  }, [activeProduct])

  const comboTotalPrice = useMemo(() => {
    return frequentlyBoughtCombo.reduce((acc, p) => acc + (p.salePrice || p.price), 0)
  }, [frequentlyBoughtCombo])

  const addComboToCart = () => {
    frequentlyBoughtCombo.forEach((p) => {
      addToCart(p, p.sizes[0] || 'M', p.colors[0]?.name || 'Standard', 1)
    })
    triggerToast('Added 3-piece complete edit to bag!')
  }

  // Handle Quick View trigger
  const handleOpenQuickView = (p: BelleProduct) => {
    setQuickViewProduct(p)
    setQvSelectedColor(p.colors[0]?.name || '')
    setQvSelectedSize(p.sizes[0] || 'M')
    setQvQuantity(1)
  }

  return (
    <div
      className={`belle-theme-root device-${effectiveDevice}`}
      style={{
        ...(customAccentColor ? ({ '--belle-primary': customAccentColor } as React.CSSProperties) : {}),
      }}
    >
      {/* Toast Notification */}
      {toastMessage && <div className="belle-toast">{toastMessage}</div>}

      {/* 1. TOP ANNOUNCEMENT BAR */}
      <div className="belle-top-bar">
        <div className="belle-top-bar-inner">
          <div className="belle-top-bar-left">
            <span>Complimentary worldwide express shipping on orders over ₹2,999</span>
            <span className="belle-top-bar-dot">•</span>
            <span>Free 30-day returns & exchanges</span>
          </div>
          <div className="belle-top-bar-right">
            <span>IN / INR (₹)</span>
            <span>Client Services</span>
            <span>Store Locator</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN HEADER */}
      <header className="belle-header">
        <div className="belle-header-inner">
          {/* Mobile Hamburger */}
          <button
            type="button"
            className="belle-mobile-menu-btn"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Brand Logo */}
          <div
            className="belle-brand-logo"
            onClick={() => {
              setViewMode('home')
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <h1>BELLE</h1>
            <span className="belle-brand-sub">H A U T E &nbsp; E D I T I O N</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="belle-nav-desktop">
            {BELLE_NAV_CATEGORIES.map((cat) => {
              const hasMega = Boolean(BELLE_MEGA_MENU[cat])
              return (
                <div
                  key={cat}
                  className="belle-nav-item-wrapper"
                  onMouseEnter={() => hasMega && setActiveMegaMenu(cat)}
                  onMouseLeave={() => setActiveMegaMenu(null)}
                >
                  <button
                    type="button"
                    className={`belle-nav-link ${
                      (viewMode === 'collection' && selectedCategory === cat) ||
                      (viewMode === 'home' && cat === 'New Arrivals')
                        ? 'is-active'
                        : ''
                    }`}
                    onClick={() => openCollection(cat as BelleCategoryType)}
                  >
                    {cat}
                    {cat === 'Sale' && <span className="belle-badge-hot">SALE</span>}
                  </button>

                  {/* Mega Menu Dropdown */}
                  {hasMega && activeMegaMenu === cat && (
                    <div className="belle-mega-dropdown">
                      <div className="belle-mega-inner">
                        {BELLE_MEGA_MENU[cat].columns.map((col, idx) => (
                          <div key={idx} className="belle-mega-col">
                            <h4 className="belle-mega-heading">{col.title}</h4>
                            <ul className="belle-mega-list">
                              {col.items.map((item, itemIdx) => (
                                <li key={itemIdx}>
                                  <a
                                    href="#category"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      setActiveMegaMenu(null)
                                      openCollection(cat as BelleCategoryType)
                                    }}
                                  >
                                    {item}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}

                        {/* Mega Menu Featured Banner */}
                        <div className="belle-mega-promo">
                          <img
                            src={BELLE_MEGA_MENU[cat].featuredImage}
                            alt={BELLE_MEGA_MENU[cat].featuredTitle}
                          />
                          <div className="belle-mega-promo-content">
                            <span className="belle-mega-promo-badge">FEATURED</span>
                            <h3>{BELLE_MEGA_MENU[cat].featuredTitle}</h3>
                            <button
                              type="button"
                              className="belle-btn-text"
                              onClick={() => {
                                setActiveMegaMenu(null)
                                openCollection(cat as BelleCategoryType)
                              }}
                            >
                              Explore Now →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </nav>

          {/* Action Icons */}
          <div className="belle-header-actions">
            <button
              type="button"
              className="belle-action-btn"
              onClick={() => setSearchOpen(true)}
              aria-label="Search Collection"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>

            <button
              type="button"
              className="belle-action-btn desktop-only"
              onClick={() => triggerToast('Account features are managed via client portal')}
              aria-label="Account"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>

            <button
              type="button"
              className="belle-action-btn"
              onClick={() => {
                openCollection('Collections')
                triggerToast(`Wishlist contains ${wishlist.length} item(s)`)
              }}
              aria-label="Wishlist"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              {wishlist.length > 0 && <span className="belle-badge-count">{wishlist.length}</span>}
            </button>

            <button
              type="button"
              className="belle-action-btn"
              onClick={() => setCartOpen(true)}
              aria-label="Bag"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <path d="M16 10a4 4 0 0 1-8 0"></path>
              </svg>
              <span className="belle-badge-count">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU DRAWER */}
      {mobileMenuOpen && (
        <div className="belle-mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="belle-mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="belle-mobile-drawer-header">
              <span className="belle-mobile-title">NAVIGATION</span>
              <button
                type="button"
                className="belle-drawer-close"
                onClick={() => setMobileMenuOpen(false)}
              >
                ✕
              </button>
            </div>
            <div className="belle-mobile-drawer-content">
              {BELLE_NAV_CATEGORIES.map((cat) => {
                const hasSub = Boolean(BELLE_MEGA_MENU[cat])
                const isOpen = mobileActiveCategory === cat
                return (
                  <div key={cat} className="belle-mobile-menu-row">
                    <div className="belle-mobile-nav-link-row">
                      <button
                        type="button"
                        className="belle-mobile-nav-link"
                        onClick={() => openCollection(cat as BelleCategoryType)}
                      >
                        {cat}
                      </button>
                      {hasSub && (
                        <button
                          type="button"
                          className="belle-mobile-expand-btn"
                          onClick={() => setMobileActiveCategory(isOpen ? null : cat)}
                        >
                          {isOpen ? '−' : '+'}
                        </button>
                      )}
                    </div>
                    {hasSub && isOpen && (
                      <div className="belle-mobile-subnav">
                        {BELLE_MEGA_MENU[cat].columns.map((col, idx) => (
                          <div key={idx} className="belle-mobile-subnav-group">
                            <strong>{col.title}</strong>
                            <ul>
                              {col.items.map((sub, sIdx) => (
                                <li key={sIdx}>
                                  <a
                                    href="#sub"
                                    onClick={(e) => {
                                      e.preventDefault()
                                      openCollection(cat as BelleCategoryType)
                                    }}
                                  >
                                    {sub}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
              <div className="belle-mobile-drawer-footer">
                <button
                  type="button"
                  className="belle-btn-secondary full-width"
                  onClick={() => {
                    setMobileMenuOpen(false)
                    setSearchOpen(true)
                  }}
                >
                  Search Store
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SEARCH OVERLAY / MODAL */}
      {searchOpen && (
        <div className="belle-search-overlay" onClick={() => setSearchOpen(false)}>
          <div className="belle-search-modal" onClick={(e) => e.stopPropagation()}>
            <div className="belle-search-input-wrap">
              <input
                type="text"
                placeholder="Search cashmere coats, silk dresses, leather bags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button
                type="button"
                className="belle-search-close"
                onClick={() => setSearchOpen(false)}
              >
                ✕
              </button>
            </div>
            {searchQuery && (
              <div className="belle-search-results">
                {searchResults.length === 0 ? (
                  <p className="belle-search-empty">No luxury pieces matching &ldquo;{searchQuery}&rdquo;</p>
                ) : (
                  <div className="belle-search-grid">
                    {searchResults.slice(0, 4).map((item) => (
                      <div
                        key={item.id}
                        className="belle-search-card"
                        onClick={() => {
                          setSearchOpen(false)
                          openProduct(item.id)
                        }}
                      >
                        <img src={item.image} alt={item.name} />
                        <div>
                          <h4>{item.name}</h4>
                          <span className="belle-price">₹{(item.salePrice || item.price).toLocaleString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* =========================================================================
          VIEW MODE 1: HOMEPAGE
         ========================================================================= */}
      {viewMode === 'home' && (
        <main className="belle-home-view">
          {/* SECTION 1: EDITORIAL HERO BANNER */}
          <section className="belle-hero">
            <div className="belle-hero-bg">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&auto=format&fit=crop&q=85"
                alt="Belle Haute Edition Collection"
              />
              <div className="belle-hero-overlay"></div>
            </div>
            <div className="belle-hero-content">
              <span className="belle-hero-sub">AUTUMN / WINTER 2026 COUTURE</span>
              <h2 className="belle-hero-title">
                Elegance Redefined,
                <br />
                Tailored for Eternity.
              </h2>
              <p className="belle-hero-desc">
                Discover modern silhouettes cut from Italian double-faced cashmere,
                mulberry silk, and supple Tuscan leather.
              </p>
              <div className="belle-hero-ctas">
                <button
                  type="button"
                  className="belle-btn-primary"
                  onClick={() => openCollection('Women')}
                >
                  EXPLORE WOMAN
                </button>
                <button
                  type="button"
                  className="belle-btn-ghost"
                  onClick={() => openCollection('Men')}
                >
                  EXPLORE MAN
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 2: SHOP BY CATEGORY CARDS */}
          <section className="belle-section belle-categories-section">
            <div className="belle-section-header">
              <span className="belle-section-subtitle">CURATED DEPARTMENTS</span>
              <h2 className="belle-section-title">Shop by Category</h2>
              <div className="belle-title-divider"></div>
            </div>
            <div className="belle-category-carousel">
              {BELLE_CATEGORY_CARDS.map((cat) => (
                <div
                  key={cat.id}
                  className="belle-category-tile"
                  onClick={() => openCollection(cat.linkCategory)}
                >
                  <div className="belle-category-img-wrap">
                    <img src={cat.image} alt={cat.title} loading="lazy" />
                  </div>
                  <div className="belle-category-info">
                    <h3>{cat.title}</h3>
                    <span className="belle-cat-count">{cat.itemCount}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 3: FEATURED PRODUCTS (BEST SELLERS) */}
          <section className="belle-section belle-featured-section">
            <div className="belle-section-header">
              <span className="belle-section-subtitle">ICONIC SILHOUETTES</span>
              <h2 className="belle-section-title">Featured Pieces</h2>
              <div className="belle-title-divider"></div>
            </div>
            <div className="belle-products-grid">
              {BELLE_PRODUCTS.filter((p) => p.isFeatured).slice(0, 8).map((product) => (
                <div key={product.id} className="belle-product-card">
                  <div
                    className="belle-product-thumb"
                    onClick={() => openProduct(product.id)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="belle-primary-img"
                      loading="lazy"
                    />
                    <img
                      src={product.alternateImage}
                      alt={`${product.name} alternative view`}
                      className="belle-alt-img"
                      loading="lazy"
                    />

                    {/* Badges */}
                    <div className="belle-product-badges">
                      {product.isSale && <span className="belle-badge badge-sale">SALE</span>}
                      {product.isNew && <span className="belle-badge badge-new">NEW</span>}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      className={`belle-card-wishlist ${wishlist.includes(product.id) ? 'is-active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWishlist(product.id)
                      }}
                      aria-label="Toggle Wishlist"
                    >
                      ♥
                    </button>

                    {/* Quick View Button */}
                    <button
                      type="button"
                      className="belle-quickview-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenQuickView(product)
                      }}
                    >
                      QUICK VIEW
                    </button>
                  </div>

                  <div className="belle-product-details">
                    <span className="belle-card-category">{product.category}</span>
                    <h3
                      className="belle-card-title"
                      onClick={() => openProduct(product.id)}
                    >
                      {product.name}
                    </h3>
                    <div className="belle-card-prices">
                      {product.salePrice ? (
                        <>
                          <span className="belle-price-sale">₹{product.salePrice.toLocaleString()}</span>
                          <span className="belle-price-original">₹{product.price.toLocaleString()}</span>
                        </>
                      ) : (
                        <span className="belle-price-regular">₹{product.price.toLocaleString()}</span>
                      )}
                    </div>

                    {/* Color Swatches */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="belle-card-swatches">
                        {product.colors.map((c, i) => (
                          <span
                            key={i}
                            className="belle-swatch-dot"
                            style={{ backgroundColor: c.hex }}
                            title={c.name}
                          />
                        ))}
                      </div>
                    )}

                    {/* Quick Add Button */}
                    <button
                      type="button"
                      className="belle-card-quickadd-btn"
                      onClick={() =>
                        addToCart(product, product.sizes[0] || 'M', product.colors[0]?.name || 'Standard')
                      }
                    >
                      + ADD TO BAG
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="belle-section-cta-wrap">
              <button
                type="button"
                className="belle-btn-secondary"
                onClick={() => openCollection('Collections')}
              >
                VIEW ENTIRE LOOKBOOK
              </button>
            </div>
          </section>

          {/* SECTION 4: FULL-WIDTH EDITORIAL PROMO BANNER */}
          <section className="belle-promo-banner">
            <div className="belle-promo-banner-inner">
              <span className="belle-promo-tag">THE LUXURY CAPSULE</span>
              <h2 className="belle-promo-heading">Understated Grandeur. Pure Silk & Cashmere.</h2>
              <p className="belle-promo-desc">
                Elevate your everyday wardrobe with our signature capsule collection. Each garment
                is tailored with sartorial rigor, marrying timeless proportions with organic
                sustainable fibers.
              </p>
              <button
                type="button"
                className="belle-btn-primary"
                onClick={() => openCollection('Dresses')}
              >
                DISCOVER THE CAPSULE
              </button>
            </div>
          </section>

          {/* SECTION 5: NEW ARRIVALS CAROUSEL/SHOWCASE */}
          <section className="belle-section belle-arrivals-section">
            <div className="belle-section-header">
              <span className="belle-section-subtitle">JUST UNVEILED</span>
              <h2 className="belle-section-title">Fresh Arrivals</h2>
              <div className="belle-title-divider"></div>
            </div>
            <div className="belle-products-grid">
              {BELLE_PRODUCTS.filter((p) => p.isNew).slice(0, 4).map((product) => (
                <div key={product.id} className="belle-product-card">
                  <div
                    className="belle-product-thumb"
                    onClick={() => openProduct(product.id)}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="belle-primary-img"
                      loading="lazy"
                    />
                    <img
                      src={product.alternateImage}
                      alt={`${product.name} alternate`}
                      className="belle-alt-img"
                      loading="lazy"
                    />
                    <div className="belle-product-badges">
                      <span className="belle-badge badge-new">NEW ARRIVAL</span>
                    </div>
                    <button
                      type="button"
                      className={`belle-card-wishlist ${wishlist.includes(product.id) ? 'is-active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleWishlist(product.id)
                      }}
                      aria-label="Wishlist"
                    >
                      ♥
                    </button>
                    <button
                      type="button"
                      className="belle-quickview-btn"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleOpenQuickView(product)
                      }}
                    >
                      QUICK VIEW
                    </button>
                  </div>
                  <div className="belle-product-details">
                    <span className="belle-card-category">{product.category}</span>
                    <h3
                      className="belle-card-title"
                      onClick={() => openProduct(product.id)}
                    >
                      {product.name}
                    </h3>
                    <div className="belle-card-prices">
                      <span className="belle-price-regular">₹{product.price.toLocaleString()}</span>
                    </div>
                    <button
                      type="button"
                      className="belle-card-quickadd-btn"
                      onClick={() =>
                        addToCart(product, product.sizes[0] || 'M', product.colors[0]?.name || 'Standard')
                      }
                    >
                      + ADD TO BAG
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: SHOP THE LOOK (INTERACTIVE HOTSPOTS) */}
          <section className="belle-section belle-shop-the-look">
            <div className="belle-section-header">
              <span className="belle-section-subtitle">EDITORIAL OUTFIT</span>
              <h2 className="belle-section-title">Shop The Look</h2>
              <p className="belle-section-desc">
                Hover or tap the pins below to unveil and purchase each hand-curated garment.
              </p>
              <div className="belle-title-divider"></div>
            </div>
            <div className="belle-stl-container">
              <div className="belle-stl-image-wrap">
                <img
                  src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1400&auto=format&fit=crop&q=85"
                  alt="Shop the look styling"
                  className="belle-stl-img"
                />

                {/* Hotspot Pins */}
                {BELLE_SHOP_THE_LOOK_HOTSPOTS.map((pin) => (
                  <div
                    key={pin.id}
                    className="belle-hotspot-pin"
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    onMouseEnter={() => setActiveHotspot(pin)}
                    onClick={() => setActiveHotspot(pin)}
                  >
                    <span className="belle-pin-pulse"></span>
                    <span className="belle-pin-dot">+</span>
                  </div>
                ))}

                {/* Hotspot Hover Card */}
                {activeHotspot && (
                  <div
                    className="belle-hotspot-popup"
                    style={{
                      left: `clamp(10px, ${activeHotspot.x}%, calc(100% - 240px))`,
                      top: `clamp(10px, ${activeHotspot.y - 12}%, calc(100% - 130px))`,
                    }}
                  >
                    <button
                      type="button"
                      className="belle-popup-close"
                      onClick={() => setActiveHotspot(null)}
                    >
                      ✕
                    </button>
                    <img src={activeHotspot.image} alt={activeHotspot.name} />
                    <div className="belle-popup-info">
                      <span className="belle-popup-cat">{activeHotspot.category}</span>
                      <h4>{activeHotspot.name}</h4>
                      <span className="belle-popup-price">₹{activeHotspot.price.toLocaleString()}</span>
                      <button
                        type="button"
                        className="belle-popup-btn"
                        onClick={() => openProduct(activeHotspot.productId)}
                      >
                        VIEW PIECE →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>

          {/* SECTION 7: EDITORIAL STORYTELLING BLOCKS (ALTERNATING) */}
          <section className="belle-editorial-blocks">
            {BELLE_EDITORIAL_BLOCKS.map((block) => (
              <div
                key={block.id}
                className={`belle-editorial-row ${block.reversed ? 'is-reversed' : ''}`}
              >
                <div className="belle-editorial-img-col">
                  <img src={block.image} alt={block.title} loading="lazy" />
                </div>
                <div className="belle-editorial-text-col">
                  <span className="belle-editorial-tag">{block.tag}</span>
                  <h2 className="belle-editorial-title">{block.title}</h2>
                  <div className="belle-title-divider left-align"></div>
                  <p className="belle-editorial-desc">{block.description}</p>
                  <button
                    type="button"
                    className="belle-btn-secondary"
                    onClick={() => openCollection('Women')}
                  >
                    {block.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </section>

          {/* SECTION 8: SALE COUNTDOWN SPOTLIGHT */}
          <section className="belle-sale-spotlight">
            <div className="belle-sale-inner">
              <div className="belle-sale-timer-wrap">
                <span className="belle-sale-subtitle">LIMITED SEASONAL PROMOTION</span>
                <h2 className="belle-sale-title">End-of-Season Private Sale</h2>
                <p className="belle-sale-desc">
                  Enjoy up to 35% off archival coats, wool trousers, and bespoke Italian knitwear.
                </p>
                <div className="belle-countdown-row">
                  <div className="belle-countdown-box">
                    <span className="belle-timer-num">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="belle-timer-lbl">Hours</span>
                  </div>
                  <span className="belle-timer-colon">:</span>
                  <div className="belle-countdown-box">
                    <span className="belle-timer-num">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="belle-timer-lbl">Minutes</span>
                  </div>
                  <span className="belle-timer-colon">:</span>
                  <div className="belle-countdown-box">
                    <span className="belle-timer-num">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="belle-timer-lbl">Seconds</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="belle-btn-primary"
                  onClick={() => openCollection('Sale')}
                >
                  SHOP PRIVATE SALE
                </button>
              </div>
            </div>
          </section>

          {/* SECTION 9: CLIENT TESTIMONIALS */}
          <section className="belle-section belle-testimonials-section">
            <div className="belle-section-header">
              <span className="belle-section-subtitle">VOICES OF CONNOISSEURS</span>
              <h2 className="belle-section-title">Client Praise</h2>
              <div className="belle-title-divider"></div>
            </div>
            <div className="belle-testimonials-grid">
              {BELLE_TESTIMONIALS.map((t) => (
                <div key={t.id} className="belle-testimonial-card">
                  <div className="belle-testimonial-stars">★★★★★</div>
                  <p className="belle-testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                  <div className="belle-testimonial-author">
                    <img src={t.avatar} alt={t.name} />
                    <div>
                      <h4>{t.name}</h4>
                      <span>{t.location} • Verified Buyer</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 10: BRAND VALUE PILLARS */}
          <section className="belle-trust-section">
            <div className="belle-trust-grid">
              {BELLE_TRUST_ITEMS.map((item, idx) => (
                <div key={idx} className="belle-trust-card">
                  <span className="belle-trust-icon">{item.icon}</span>
                  <h4>{item.title}</h4>
                  <p>{item.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 11: INSTAGRAM COMMUNITY 8-GRID */}
          <section className="belle-insta-section">
            <div className="belle-section-header">
              <span className="belle-section-subtitle">#BELLEFASHION</span>
              <h2 className="belle-section-title">Follow Us on Instagram</h2>
              <p className="belle-section-desc">
                Tag @BelleOfficial on Instagram to be featured on our global editorial feed.
              </p>
              <div className="belle-title-divider"></div>
            </div>
            <div className="belle-insta-grid">
              {BELLE_INSTAGRAM_POSTS.map((post) => (
                <div key={post.id} className="belle-insta-tile">
                  <img src={post.image} alt={post.caption} loading="lazy" />
                  <div className="belle-insta-overlay">
                    <span>♥ {post.likes}</span>
                    <span className="belle-insta-user">{post.handle}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 12: VIP NEWSLETTER CLUB */}
          <section className="belle-newsletter-section">
            <div className="belle-newsletter-card">
              <span className="belle-nl-sub">BELLE CONCIERGE CLUB</span>
              <h2 className="belle-nl-title">Receive 15% Off Your Inaugural Order</h2>
              <p className="belle-nl-desc">
                Subscribe to receive private preview access to our seasonal collections,
                exclusive invitations, and haute couture releases.
              </p>
              {newsletterSubscribed ? (
                <div className="belle-nl-success">
                  <span>✓ Thank you for subscribing. Your 15% VIP code has been dispatched.</span>
                </div>
              ) : (
                <form
                  className="belle-nl-form"
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (newsletterEmail.trim()) {
                      setNewsletterSubscribed(true)
                      triggerToast('Welcome to Belle VIP! Your 15% code is BELLE15')
                    }
                  }}
                >
                  <input
                    type="email"
                    placeholder="Enter your email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="belle-btn-primary">
                    SUBSCRIBE
                  </button>
                </form>
              )}
            </div>
          </section>
        </main>
      )}

      {/* =========================================================================
          VIEW MODE 2: COLLECTION LISTING PAGE
         ========================================================================= */}
      {viewMode === 'collection' && (
        <main className="belle-collection-view">
          {/* Collection Hero Header */}
          <div className="belle-collection-header">
            <div className="belle-breadcrumb">
              <span onClick={() => setViewMode('home')}>Home</span>
              <span className="sep">/</span>
              <span className="curr">{selectedCategory}</span>
            </div>
            <h1 className="belle-collection-title">
              {selectedCategory === 'All' ? 'Complete Collection' : selectedCategory}
            </h1>
            <p className="belle-collection-count">
              Presenting {collectionProducts.length} sartorial designs
            </p>
          </div>

          <div className="belle-collection-container">
            {/* Filter Sidebar */}
            <aside className="belle-collection-sidebar">
              <div className="belle-filter-group">
                <h4>Category</h4>
                <div className="belle-filter-options">
                  {(['All', 'Women', 'Men', 'Dresses', 'Tops', 'Shoes', 'Bags', 'Accessories', 'Sale'] as const).map(
                    (cat) => (
                      <label key={cat} className="belle-radio-label">
                        <input
                          type="radio"
                          name="categoryFilter"
                          checked={selectedCategory === cat}
                          onChange={() => setSelectedCategory(cat as any)}
                        />
                        <span>{cat}</span>
                      </label>
                    )
                  )}
                </div>
              </div>

              <div className="belle-filter-group">
                <h4>Gender</h4>
                <div className="belle-filter-options">
                  {(['All', 'Women', 'Men'] as const).map((g) => (
                    <label key={g} className="belle-radio-label">
                      <input
                        type="radio"
                        name="genderFilter"
                        checked={filterGender === g}
                        onChange={() => setFilterGender(g)}
                      />
                      <span>{g}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="belle-filter-group">
                <h4>Maximum Price: ₹{filterPriceMax.toLocaleString()}</h4>
                <input
                  type="range"
                  min="2000"
                  max="30000"
                  step="1000"
                  value={filterPriceMax}
                  onChange={(e) => setFilterPriceMax(Number(e.target.value))}
                  className="belle-price-slider"
                />
              </div>

              <div className="belle-filter-group">
                <h4>Size</h4>
                <div className="belle-size-pills-row">
                  {['All', ...BELLE_SIZES].map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      className={`belle-size-pill ${filterSize === sz ? 'is-active' : ''}`}
                      onClick={() => setFilterSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              <div className="belle-filter-group">
                <label className="belle-checkbox-label">
                  <input
                    type="checkbox"
                    checked={filterOnlySale}
                    onChange={(e) => setFilterOnlySale(e.target.checked)}
                  />
                  <span>On Sale Only</span>
                </label>
              </div>

              <button
                type="button"
                className="belle-btn-text reset-filters"
                onClick={() => {
                  setSelectedCategory('All')
                  setFilterGender('All')
                  setFilterPriceMax(30000)
                  setFilterSize('All')
                  setFilterOnlySale(false)
                }}
              >
                Reset All Filters
              </button>
            </aside>

            {/* Collection Main Area */}
            <div className="belle-collection-main">
              {/* Collection Controls Bar */}
              <div className="belle-collection-toolbar">
                <div className="belle-toolbar-left">
                  <span>Showing {collectionProducts.length} items</span>
                </div>
                <div className="belle-toolbar-right">
                  <div className="belle-sort-wrap">
                    <label>Sort by:</label>
                    <select
                      value={collectionSort}
                      onChange={(e) => setCollectionSort(e.target.value as any)}
                    >
                      <option value="featured">Featured Curations</option>
                      <option value="newest">Newest Arrivals</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                  <div className="belle-layout-toggles">
                    <button
                      type="button"
                      className={`belle-layout-btn ${collectionLayout === 'grid' ? 'is-active' : ''}`}
                      onClick={() => setCollectionLayout('grid')}
                      aria-label="Grid View"
                    >
                      ▦
                    </button>
                    <button
                      type="button"
                      className={`belle-layout-btn ${collectionLayout === 'list' ? 'is-active' : ''}`}
                      onClick={() => setCollectionLayout('list')}
                      aria-label="List View"
                    >
                      ☰
                    </button>
                  </div>
                </div>
              </div>

              {/* Product Grid or List */}
              {collectionProducts.length === 0 ? (
                <div className="belle-empty-collection">
                  <h3>No pieces match your selected criteria.</h3>
                  <p>Try resetting filters or adjusting the price range.</p>
                  <button
                    type="button"
                    className="belle-btn-secondary"
                    onClick={() => {
                      setSelectedCategory('All')
                      setFilterGender('All')
                      setFilterPriceMax(30000)
                      setFilterSize('All')
                      setFilterOnlySale(false)
                    }}
                  >
                    View All Products
                  </button>
                </div>
              ) : (
                <div
                  className={`belle-products-grid ${collectionLayout === 'list' ? 'is-list-view' : ''}`}
                >
                  {collectionProducts.map((product) => (
                    <div key={product.id} className="belle-product-card">
                      <div
                        className="belle-product-thumb"
                        onClick={() => openProduct(product.id)}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="belle-primary-img"
                          loading="lazy"
                        />
                        <img
                          src={product.alternateImage}
                          alt={`${product.name} alternate`}
                          className="belle-alt-img"
                          loading="lazy"
                        />
                        <div className="belle-product-badges">
                          {product.isSale && <span className="belle-badge badge-sale">SALE</span>}
                          {product.isNew && <span className="belle-badge badge-new">NEW</span>}
                        </div>
                        <button
                          type="button"
                          className={`belle-card-wishlist ${wishlist.includes(product.id) ? 'is-active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleWishlist(product.id)
                          }}
                          aria-label="Wishlist"
                        >
                          ♥
                        </button>
                        <button
                          type="button"
                          className="belle-quickview-btn"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleOpenQuickView(product)
                          }}
                        >
                          QUICK VIEW
                        </button>
                      </div>

                      <div className="belle-product-details">
                        <span className="belle-card-category">{product.category}</span>
                        <h3
                          className="belle-card-title"
                          onClick={() => openProduct(product.id)}
                        >
                          {product.name}
                        </h3>
                        <div className="belle-card-prices">
                          {product.salePrice ? (
                            <>
                              <span className="belle-price-sale">₹{product.salePrice.toLocaleString()}</span>
                              <span className="belle-price-original">₹{product.price.toLocaleString()}</span>
                            </>
                          ) : (
                            <span className="belle-price-regular">₹{product.price.toLocaleString()}</span>
                          )}
                        </div>
                        {collectionLayout === 'list' && (
                          <p className="belle-card-desc">{product.description}</p>
                        )}
                        <div className="belle-card-swatches">
                          {product.colors.map((c, i) => (
                            <span
                              key={i}
                              className="belle-swatch-dot"
                              style={{ backgroundColor: c.hex }}
                              title={c.name}
                            />
                          ))}
                        </div>
                        <button
                          type="button"
                          className="belle-card-quickadd-btn"
                          onClick={() =>
                            addToCart(product, product.sizes[0] || 'M', product.colors[0]?.name || 'Standard')
                          }
                        >
                          + ADD TO BAG
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </main>
      )}

      {/* =========================================================================
          VIEW MODE 3: PRODUCT DETAIL PAGE (PDP)
         ========================================================================= */}
      {viewMode === 'product' && (
        <main className="belle-pdp-view">
          {/* Breadcrumb */}
          <div className="belle-breadcrumb">
            <span onClick={() => setViewMode('home')}>Home</span>
            <span className="sep">/</span>
            <span onClick={() => openCollection(activeProduct.category)}>{activeProduct.category}</span>
            <span className="sep">/</span>
            <span className="curr">{activeProduct.name}</span>
          </div>

          <div className="belle-pdp-main">
            {/* Left: Gallery */}
            <div className="belle-pdp-gallery-col">
              <div className="belle-pdp-thumbnails">
                {activeProduct.gallery.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`belle-pdp-thumb-btn ${pdpSelectedImage === img ? 'is-active' : ''}`}
                    onClick={() => setPdpSelectedImage(img)}
                  >
                    <img src={img} alt={`${activeProduct.name} thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
              <div className="belle-pdp-main-image-wrap">
                <img
                  src={pdpSelectedImage}
                  alt={activeProduct.name}
                  className="belle-pdp-hero-img"
                />
                {activeProduct.isSale && <span className="belle-badge badge-sale">SALE</span>}
              </div>
            </div>

            {/* Right: Info & Buying Options */}
            <div className="belle-pdp-info-col">
              <span className="belle-pdp-category">{activeProduct.category} • {activeProduct.gender}</span>
              <h1 className="belle-pdp-title">{activeProduct.name}</h1>
              <div className="belle-pdp-rating-row">
                <span className="belle-pdp-stars">★★★★★</span>
                <span className="belle-pdp-rating-val">{activeProduct.rating} / 5.0</span>
                <span className="belle-pdp-review-count">({activeProduct.reviewCount} customer reviews)</span>
                <span className="belle-pdp-sku">SKU: {activeProduct.sku}</span>
              </div>

              <div className="belle-pdp-price-row">
                {activeProduct.salePrice ? (
                  <>
                    <span className="belle-pdp-sale-price">₹{activeProduct.salePrice.toLocaleString()}</span>
                    <span className="belle-pdp-orig-price">₹{activeProduct.price.toLocaleString()}</span>
                    <span className="belle-pdp-discount-tag">
                      Save ₹{(activeProduct.price - activeProduct.salePrice).toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="belle-pdp-regular-price">₹{activeProduct.price.toLocaleString()}</span>
                )}
              </div>

              <p className="belle-pdp-desc">{activeProduct.description}</p>

              {/* Color Selection */}
              <div className="belle-pdp-option-group">
                <div className="belle-option-label-row">
                  <span>Color:</span>
                  <strong>{pdpSelectedColor}</strong>
                </div>
                <div className="belle-pdp-colors-row">
                  {activeProduct.colors.map((c, i) => (
                    <button
                      key={i}
                      type="button"
                      className={`belle-pdp-color-btn ${pdpSelectedColor === c.name ? 'is-selected' : ''}`}
                      style={{ backgroundColor: c.hex }}
                      onClick={() => setPdpSelectedColor(c.name)}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selection & Size Guide */}
              <div className="belle-pdp-option-group">
                <div className="belle-option-label-row">
                  <span>Size:</span>
                  <button
                    type="button"
                    className="belle-size-guide-link"
                    onClick={() => setSizeGuideOpen(true)}
                  >
                    📏 Size Guide & Fit
                  </button>
                </div>
                <div className="belle-pdp-sizes-row">
                  {activeProduct.sizes.map((sz) => (
                    <button
                      key={sz}
                      type="button"
                      className={`belle-pdp-size-btn ${pdpSelectedSize === sz ? 'is-selected' : ''}`}
                      onClick={() => setPdpSelectedSize(sz)}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity Stepper & Actions */}
              <div className="belle-pdp-actions-row">
                <div className="belle-qty-stepper">
                  <button
                    type="button"
                    onClick={() => setPdpQuantity((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <span>{pdpQuantity}</span>
                  <button
                    type="button"
                    onClick={() => setPdpQuantity((q) => q + 1)}
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="belle-btn-primary belle-pdp-atc-btn"
                  onClick={() => addToCart(activeProduct, pdpSelectedSize, pdpSelectedColor, pdpQuantity)}
                >
                  ADD TO BAG • ₹{((activeProduct.salePrice || activeProduct.price) * pdpQuantity).toLocaleString()}
                </button>

                <button
                  type="button"
                  className={`belle-pdp-wishlist-btn ${wishlist.includes(activeProduct.id) ? 'is-active' : ''}`}
                  onClick={() => toggleWishlist(activeProduct.id)}
                  title="Wishlist"
                >
                  ♥
                </button>
              </div>

              <button
                type="button"
                className="belle-btn-secondary full-width belle-buynow-btn"
                onClick={() => {
                  addToCart(activeProduct, pdpSelectedSize, pdpSelectedColor, pdpQuantity)
                  setCartOpen(true)
                }}
              >
                BUY IT NOW
              </button>

              {/* Trust badges */}
              <div className="belle-pdp-guarantee">
                <div>📦 Free Express Courier on ₹2,999+</div>
                <div>🔄 30-Day Atelier Complimentary Returns</div>
                <div>✨ Certified 100% Genuine Sustainable Luxury</div>
              </div>

              {/* Accordions */}
              <div className="belle-pdp-accordions">
                {/* Details */}
                <div className="belle-accordion-item">
                  <button
                    type="button"
                    className="belle-accordion-btn"
                    onClick={() =>
                      setPdpAccordionOpen((prev) => ({ ...prev, details: !prev.details }))
                    }
                  >
                    <span>Garment Details & Cut</span>
                    <span>{pdpAccordionOpen.details ? '−' : '+'}</span>
                  </button>
                  {pdpAccordionOpen.details && (
                    <div className="belle-accordion-content">
                      <ul>
                        {activeProduct.details.map((d, idx) => (
                          <li key={idx}>{d}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Materials & Care */}
                <div className="belle-accordion-item">
                  <button
                    type="button"
                    className="belle-accordion-btn"
                    onClick={() =>
                      setPdpAccordionOpen((prev) => ({ ...prev, materials: !prev.materials }))
                    }
                  >
                    <span>Materials & Fabric Care</span>
                    <span>{pdpAccordionOpen.materials ? '−' : '+'}</span>
                  </button>
                  {pdpAccordionOpen.materials && (
                    <div className="belle-accordion-content">
                      <p>{activeProduct.materialsAndCare}</p>
                    </div>
                  )}
                </div>

                {/* Shipping & Returns */}
                <div className="belle-accordion-item">
                  <button
                    type="button"
                    className="belle-accordion-btn"
                    onClick={() =>
                      setPdpAccordionOpen((prev) => ({ ...prev, shipping: !prev.shipping }))
                    }
                  >
                    <span>Shipping & Concierge Returns</span>
                    <span>{pdpAccordionOpen.shipping ? '−' : '+'}</span>
                  </button>
                  {pdpAccordionOpen.shipping && (
                    <div className="belle-accordion-content">
                      <p>{activeProduct.shippingAndReturns}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Frequently Bought Together Bundle */}
          <section className="belle-fbt-section">
            <div className="belle-section-header">
              <span className="belle-section-subtitle">THE COMPLETE ATTIRE</span>
              <h2 className="belle-section-title">Frequently Curated Together</h2>
              <div className="belle-title-divider"></div>
            </div>
            <div className="belle-fbt-bundle">
              <div className="belle-fbt-items">
                {frequentlyBoughtCombo.map((item, idx) => (
                  <React.Fragment key={item.id}>
                    <div
                      className="belle-fbt-card"
                      onClick={() => openProduct(item.id)}
                    >
                      <img src={item.image} alt={item.name} />
                      <h4>{item.name}</h4>
                      <span className="belle-price">
                        ₹{(item.salePrice || item.price).toLocaleString()}
                      </span>
                    </div>
                    {idx < frequentlyBoughtCombo.length - 1 && (
                      <span className="belle-fbt-plus">+</span>
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="belle-fbt-summary">
                <span className="belle-fbt-label">Total for all 3 pieces:</span>
                <span className="belle-fbt-total">₹{comboTotalPrice.toLocaleString()}</span>
                <button
                  type="button"
                  className="belle-btn-primary"
                  onClick={addComboToCart}
                >
                  ADD 3-PIECE SET TO BAG
                </button>
              </div>
            </div>
          </section>

          {/* Related Products */}
          <section className="belle-section">
            <div className="belle-section-header">
              <span className="belle-section-subtitle">RECOMMENDED FOR YOU</span>
              <h2 className="belle-section-title">Complementary Pieces</h2>
              <div className="belle-title-divider"></div>
            </div>
            <div className="belle-products-grid">
              {BELLE_PRODUCTS.filter((p) => p.id !== activeProduct.id && p.gender === activeProduct.gender)
                .slice(0, 4)
                .map((product) => (
                  <div key={product.id} className="belle-product-card">
                    <div
                      className="belle-product-thumb"
                      onClick={() => openProduct(product.id)}
                    >
                      <img src={product.image} alt={product.name} className="belle-primary-img" />
                      <img src={product.alternateImage} alt={product.name} className="belle-alt-img" />
                      <button
                        type="button"
                        className="belle-quickview-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOpenQuickView(product)
                        }}
                      >
                        QUICK VIEW
                      </button>
                    </div>
                    <div className="belle-product-details">
                      <span className="belle-card-category">{product.category}</span>
                      <h3 className="belle-card-title" onClick={() => openProduct(product.id)}>
                        {product.name}
                      </h3>
                      <div className="belle-card-prices">
                        <span className="belle-price-regular">
                          ₹{(product.salePrice || product.price).toLocaleString()}
                        </span>
                      </div>
                      <button
                        type="button"
                        className="belle-card-quickadd-btn"
                        onClick={() =>
                          addToCart(product, product.sizes[0] || 'M', product.colors[0]?.name || 'Standard')
                        }
                      >
                        + ADD TO BAG
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </main>
      )}

      {/* QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="belle-modal-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="belle-qv-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="belle-modal-close"
              onClick={() => setQuickViewProduct(null)}
            >
              ✕
            </button>
            <div className="belle-qv-body">
              <div className="belle-qv-gallery">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} />
              </div>
              <div className="belle-qv-info">
                <span className="belle-card-category">{quickViewProduct.category}</span>
                <h2>{quickViewProduct.name}</h2>
                <div className="belle-card-prices">
                  {quickViewProduct.salePrice ? (
                    <>
                      <span className="belle-price-sale">₹{quickViewProduct.salePrice.toLocaleString()}</span>
                      <span className="belle-price-original">₹{quickViewProduct.price.toLocaleString()}</span>
                    </>
                  ) : (
                    <span className="belle-price-regular">₹{quickViewProduct.price.toLocaleString()}</span>
                  )}
                </div>
                <p className="belle-qv-desc">{quickViewProduct.description}</p>

                {/* Color swatches */}
                <div className="belle-qv-row">
                  <span>Color: <strong>{qvSelectedColor}</strong></span>
                  <div className="belle-card-swatches">
                    {quickViewProduct.colors.map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`belle-pdp-color-btn ${qvSelectedColor === c.name ? 'is-selected' : ''}`}
                        style={{ backgroundColor: c.hex }}
                        onClick={() => setQvSelectedColor(c.name)}
                      />
                    ))}
                  </div>
                </div>

                {/* Size options */}
                <div className="belle-qv-row">
                  <span>Size:</span>
                  <div className="belle-pdp-sizes-row">
                    {quickViewProduct.sizes.map((sz) => (
                      <button
                        key={sz}
                        type="button"
                        className={`belle-pdp-size-btn ${qvSelectedSize === sz ? 'is-selected' : ''}`}
                        onClick={() => setQvSelectedSize(sz)}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="belle-qv-actions">
                  <button
                    type="button"
                    className="belle-btn-primary full-width"
                    onClick={() => {
                      addToCart(quickViewProduct, qvSelectedSize, qvSelectedColor, qvQuantity)
                      setQuickViewProduct(null)
                    }}
                  >
                    ADD TO BAG
                  </button>
                  <button
                    type="button"
                    className="belle-btn-secondary full-width"
                    onClick={() => {
                      setQuickViewProduct(null)
                      openProduct(quickViewProduct.id)
                    }}
                  >
                    VIEW FULL DETAILS →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SIZE GUIDE MODAL */}
      {sizeGuideOpen && (
        <div className="belle-modal-overlay" onClick={() => setSizeGuideOpen(false)}>
          <div className="belle-size-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="belle-modal-close"
              onClick={() => setSizeGuideOpen(false)}
            >
              ✕
            </button>
            <div className="belle-size-modal-header">
              <h2>Atelier Sizing & Measurement Guide</h2>
              <p>Measurements are taken in inches. All pieces conform to European luxury proportions.</p>
            </div>
            <div className="belle-size-table-wrap">
              <table className="belle-size-table">
                <thead>
                  <tr>
                    <th>Size</th>
                    <th>Bust (in)</th>
                    <th>Waist (in)</th>
                    <th>Hips (in)</th>
                    <th>Length (in)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>XS</strong> (US 0-2 / EU 34)</td>
                    <td>32 - 33</td>
                    <td>24 - 25</td>
                    <td>34 - 35</td>
                    <td>42</td>
                  </tr>
                  <tr>
                    <td><strong>S</strong> (US 4-6 / EU 36)</td>
                    <td>34 - 35</td>
                    <td>26 - 27</td>
                    <td>36 - 37</td>
                    <td>43</td>
                  </tr>
                  <tr>
                    <td><strong>M</strong> (US 8-10 / EU 38)</td>
                    <td>36 - 37</td>
                    <td>28 - 29</td>
                    <td>38 - 39</td>
                    <td>44</td>
                  </tr>
                  <tr>
                    <td><strong>L</strong> (US 12-14 / EU 40)</td>
                    <td>38 - 40</td>
                    <td>30 - 32</td>
                    <td>40 - 42</td>
                    <td>45</td>
                  </tr>
                  <tr>
                    <td><strong>XL</strong> (US 16 / EU 42)</td>
                    <td>41 - 43</td>
                    <td>33 - 35</td>
                    <td>43 - 45</td>
                    <td>46</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="belle-size-tips">
              <h4>Tailor&apos;s Advice:</h4>
              <p>
                Our coats and overshirts feature a relaxed, modern drape. If you prefer a tailored,
                close-to-body silhouette, we recommend choosing one size smaller than your standard size.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="belle-cart-drawer-overlay" onClick={() => setCartOpen(false)}>
          <div className="belle-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="belle-cart-drawer-header">
              <h3>SHOPPING BAG ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</h3>
              <button
                type="button"
                className="belle-drawer-close"
                onClick={() => setCartOpen(false)}
              >
                ✕
              </button>
            </div>

            {/* Free shipping threshold progress bar */}
            <div className="belle-free-shipping-bar">
              {freeShippingDiff > 0 ? (
                <p>
                  Add <strong>₹{freeShippingDiff.toLocaleString()}</strong> more to unlock{' '}
                  <strong>Complimentary Express Shipping</strong>
                </p>
              ) : (
                <p className="belle-free-qualified">
                  ✨ Congratulations! You unlocked <strong>Complimentary Express Shipping</strong>
                </p>
              )}
              <div className="belle-progress-track">
                <div
                  className="belle-progress-fill"
                  style={{ width: `${freeShippingProgress}%` }}
                ></div>
              </div>
            </div>

            {/* Cart Items list */}
            <div className="belle-cart-drawer-items">
              {cartItems.length === 0 ? (
                <div className="belle-cart-empty">
                  <p>Your shopping bag is currently vacant.</p>
                  <button
                    type="button"
                    className="belle-btn-secondary"
                    onClick={() => {
                      setCartOpen(false)
                      openCollection('Women')
                    }}
                  >
                    EXPLORE COLLECTION
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={idx} className="belle-cart-item-row">
                    <img src={item.product.image} alt={item.product.name} />
                    <div className="belle-cart-item-info">
                      <h4>{item.product.name}</h4>
                      <span className="belle-cart-item-meta">
                        {item.color} • {item.size}
                      </span>
                      <span className="belle-cart-item-price">
                        ₹{(item.product.salePrice || item.product.price).toLocaleString()}
                      </span>
                      <div className="belle-cart-qty-row">
                        <div className="belle-qty-stepper small">
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(idx, item.quantity - 1)}
                          >
                            −
                          </button>
                          <span>{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateCartQuantity(idx, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          type="button"
                          className="belle-cart-remove-btn"
                          onClick={() => updateCartQuantity(idx, 0)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Drawer Footer */}
            {cartItems.length > 0 && (
              <div className="belle-cart-drawer-footer">
                <div className="belle-cart-summary-line">
                  <span>Subtotal</span>
                  <strong>₹{cartSubtotal.toLocaleString()}</strong>
                </div>
                <div className="belle-cart-summary-line">
                  <span>Shipping</span>
                  <span>{freeShippingDiff <= 0 ? 'Complimentary' : '₹499'}</span>
                </div>
                <div className="belle-cart-summary-line total">
                  <span>Estimated Total</span>
                  <strong>
                    ₹{(cartSubtotal + (freeShippingDiff <= 0 ? 0 : 499)).toLocaleString()}
                  </strong>
                </div>
                <button
                  type="button"
                  className="belle-btn-primary full-width"
                  onClick={() => triggerToast('Proceeding to luxury checkout gateway...')}
                >
                  PROCEED TO CHECKOUT
                </button>
                <button
                  type="button"
                  className="belle-btn-text full-width"
                  onClick={() => setCartOpen(false)}
                >
                  Continue Browsing
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MOBILE STICKY BOTTOM ATC (Only on PDP in mobile mode) */}
      {viewMode === 'product' && isMobile && (
        <div className="belle-mobile-sticky-atc">
          <div className="belle-sticky-info">
            <span className="belle-sticky-name">{activeProduct.name}</span>
            <span className="belle-sticky-price">
              ₹{(activeProduct.salePrice || activeProduct.price).toLocaleString()}
            </span>
          </div>
          <button
            type="button"
            className="belle-btn-primary"
            onClick={() => addToCart(activeProduct, pdpSelectedSize, pdpSelectedColor, 1)}
          >
            ADD TO BAG
          </button>
        </div>
      )}

      {/* FOOTER */}
      <footer className="belle-footer">
        <div className="belle-footer-container">
          <div className="belle-footer-col brand-col">
            <h3 className="belle-footer-logo">BELLE</h3>
            <p className="belle-footer-tagline">
              Haute Couture & Ready-to-Wear Sartorial Luxury for the Discerning Individual.
            </p>
            <div className="belle-social-links">
              <span>INSTAGRAM</span>
              <span>•</span>
              <span>PINTEREST</span>
              <span>•</span>
              <span>VOGUE</span>
            </div>
          </div>

          <div className="belle-footer-col">
            <h4>COLLECTIONS</h4>
            <ul>
              <li><a href="#women" onClick={(e) => { e.preventDefault(); openCollection('Women'); }}>Women&apos;s Couture</a></li>
              <li><a href="#men" onClick={(e) => { e.preventDefault(); openCollection('Men'); }}>Men&apos;s Tailoring</a></li>
              <li><a href="#dresses" onClick={(e) => { e.preventDefault(); openCollection('Dresses'); }}>Silk & Evening Gowns</a></li>
              <li><a href="#bags" onClick={(e) => { e.preventDefault(); openCollection('Bags'); }}>Leather Handbags</a></li>
              <li><a href="#sale" onClick={(e) => { e.preventDefault(); openCollection('Sale'); }}>Private Archive Sale</a></li>
            </ul>
          </div>

          <div className="belle-footer-col">
            <h4>CLIENT SERVICES</h4>
            <ul>
              <li><a href="#care" onClick={(e) => { e.preventDefault(); triggerToast('Concierge is available 24/7'); }}>Atelier Care & Repair</a></li>
              <li><a href="#returns" onClick={(e) => { e.preventDefault(); triggerToast('Free 30-day worldwide returns'); }}>Returns & Exchanges</a></li>
              <li><a href="#shipping" onClick={(e) => { e.preventDefault(); triggerToast('Complimentary shipping over ₹2,999'); }}>Shipping Logistics</a></li>
              <li><a href="#authenticity" onClick={(e) => { e.preventDefault(); triggerToast('All Belle items are 100% verified'); }}>Authenticity Guarantee</a></li>
              <li><a href="#stores" onClick={(e) => { e.preventDefault(); triggerToast('Find our flagship boutiques worldwide'); }}>Flagship Boutiques</a></li>
            </ul>
          </div>

          <div className="belle-footer-col">
            <h4>ATELIER</h4>
            <ul>
              <li><a href="#about" onClick={(e) => { e.preventDefault(); triggerToast('Belle was founded on slow fashion principles.'); }}>Our Heritage</a></li>
              <li><a href="#sustainability" onClick={(e) => { e.preventDefault(); triggerToast('100% GOTS Organic and OEKOTEX certified'); }}>Sustainable Commitments</a></li>
              <li><a href="#careers" onClick={(e) => { e.preventDefault(); triggerToast('Explore careers at Belle Haute'); }}>Careers & Apprenticeships</a></li>
              <li><a href="#press" onClick={(e) => { e.preventDefault(); triggerToast('Press kit available upon request'); }}>Editorial Press</a></li>
            </ul>
          </div>
        </div>

        <div className="belle-footer-bottom">
          <p>© 2026 Belle Fashion Inc. All rights reserved. Powered by Willovate Commerce.</p>
          <div className="belle-payment-badges">
            <span>VISA</span>
            <span>MASTERCARD</span>
            <span>AMEX</span>
            <span>APPLE PAY</span>
            <span>UPI</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
export default BelleFashionStorefront
