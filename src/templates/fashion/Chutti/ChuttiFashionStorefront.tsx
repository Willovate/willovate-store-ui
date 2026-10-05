import React, { useState, useMemo } from 'react'
import type {
  ChuttiProduct,
  ChuttiCartItem,
  ChuttiFilterState,
  ChuttiStorefrontProps,
  KidAgeGroup,
} from './types'
import {
  CHUTTI_HERO_SLIDES,
  CHUTTI_CATEGORIES,
  CHUTTI_PRODUCTS,
  CHUTTI_TESTIMONIALS,
  CHUTTI_BLOG_POSTS,
  CHUTTI_BRAND_LOGOS,
} from './data/chuttiData'
import './styles/chuttiFashion.css'

export const ChuttiFashionStorefront: React.FC<ChuttiStorefrontProps> = ({
  initialView = 'home',
  templateData: _templateData,
  device = 'desktop',
  deviceView,
  onClose: _onClose,
}) => {
  const effectiveDevice = deviceView || device || 'desktop'
  const isMobile = effectiveDevice === 'mobile'
  const [viewMode, setViewMode] = useState<'home' | 'collection' | 'pdp'>(initialView)
  const [selectedProduct, setSelectedProduct] = useState<ChuttiProduct>(CHUTTI_PRODUCTS[0])
  const [activeHeroSlideIdx, setActiveHeroSlideIdx] = useState<number>(0)
  const [activeTestiIdx, setActiveTestiIdx] = useState<number>(0)

  // Drawers and Modals
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false)
  const [isQuickViewOpen, setIsQuickViewOpen] = useState<boolean>(false)
  const [quickViewProduct, setQuickViewProduct] = useState<ChuttiProduct>(CHUTTI_PRODUCTS[0])
  const [isCompareOpen, setIsCompareOpen] = useState<boolean>(false)
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false)
  const [searchQuery, setSearchQuery] = useState<string>('')

  // Cart & Interactions
  const [cartItems, setCartItems] = useState<ChuttiCartItem[]>([
    {
      product: CHUTTI_PRODUCTS[0],
      size: '1-2Y',
      color: 'Sky Turquoise',
      quantity: 1,
    },
  ])
  const [wishlistIds, setWishlistIds] = useState<string[]>([CHUTTI_PRODUCTS[0].id])
  const [compareIds, setCompareIds] = useState<string[]>([])
  const [selectedCardSizes, setSelectedCardSizes] = useState<Record<string, string>>({})
  const [selectedCardColors, setSelectedCardColors] = useState<Record<string, string>>({})

  // PDP Variant State
  const [pdpSelectedImage, setPdpSelectedImage] = useState<string>(CHUTTI_PRODUCTS[0].image)
  const [pdpSelectedSize, setPdpSelectedSize] = useState<string>(CHUTTI_PRODUCTS[0].sizes[0] || '1-2Y')
  const [pdpSelectedColor, setPdpSelectedColor] = useState<string>(CHUTTI_PRODUCTS[0].colors[0]?.name || 'Sky Turquoise')
  const [pdpQty, setPdpQty] = useState<number>(1)
  const [pdpAccordion, setPdpAccordion] = useState<'details' | 'care' | 'safety' | 'shipping'>('details')

  // Collection Filters State
  const [filters, setFilters] = useState<ChuttiFilterState>({
    category: 'All',
    gender: 'All',
    ageGroup: 'All',
    priceRange: [0, 50],
    inStockOnly: false,
    sortBy: 'featured',
  })

  // Toast feedback
  const [toastMsg, setToastMsg] = useState<string | null>(null)
  const showToast = (msg: string) => {
    setToastMsg(msg)
    setTimeout(() => setToastMsg(null), 2500)
  }

  // Cart Handlers
  const addToCart = (product: ChuttiProduct, size: string, color: string, quantity = 1) => {
    setCartItems((prev) => {
      const idx = prev.findIndex(
        (item) => item.product.id === product.id && item.size === size && item.color === color
      )
      if (idx > -1) {
        const next = [...prev]
        next[idx].quantity += quantity
        return next
      }
      return [...prev, { product, size, color, quantity }]
    })
    showToast(`Added "${product.name}" (${size}) to bag!`)
    setIsCartOpen(true)
  }

  const updateCartQty = (idx: number, delta: number) => {
    setCartItems((prev) => {
      const next = [...prev]
      next[idx].quantity += delta
      if (next[idx].quantity <= 0) {
        return next.filter((_, i) => i !== idx)
      }
      return next
    })
  }

  const cartSubtotal = useMemo(() => {
    return cartItems.reduce((acc, it) => acc + it.product.price * it.quantity, 0).toFixed(2)
  }, [cartItems])

  const toggleWishlist = (id: string) => {
    setWishlistIds((prev) => {
      const exists = prev.includes(id)
      if (exists) {
        showToast('Removed from favorites')
        return prev.filter((x) => x !== id)
      }
      showToast('Saved to baby favorites ♥')
      return [...prev, id]
    })
  }

  const toggleCompare = (id: string) => {
    setCompareIds((prev) => {
      const exists = prev.includes(id)
      if (exists) {
        return prev.filter((x) => x !== id)
      }
      if (prev.length >= 3) {
        showToast('You can compare at most 3 items')
        return prev
      }
      showToast('Added to comparison')
      return [...prev, id]
    })
  }

  const openPdp = (p: ChuttiProduct) => {
    setSelectedProduct(p)
    setPdpSelectedImage(p.image)
    setPdpSelectedSize(p.sizes[0] || '1-2Y')
    setPdpSelectedColor(p.colors[0]?.name || 'Sky Turquoise')
    setPdpQty(1)
    setViewMode('pdp')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Filtered Collection
  const collectionProducts = useMemo(() => {
    let list = [...CHUTTI_PRODUCTS]

    if (filters.category !== 'All') {
      list = list.filter((p) => p.category === filters.category)
    }
    if (filters.gender !== 'All') {
      list = list.filter((p) => p.gender === filters.gender || p.gender === 'Unisex')
    }
    if (filters.ageGroup !== 'All') {
      list = list.filter((p) => p.ageGroup === filters.ageGroup || p.sizes.includes(filters.ageGroup))
    }
    list = list.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    )
    if (filters.inStockOnly) {
      list = list.filter((p) => p.inStock)
    }

    if (filters.sortBy === 'price-low') {
      list.sort((a, b) => a.price - b.price)
    } else if (filters.sortBy === 'price-high') {
      list.sort((a, b) => b.price - a.price)
    } else if (filters.sortBy === 'rating') {
      list.sort((a, b) => b.rating - a.rating)
    }

    return list
  }, [filters])

  const currentHeroSlide = CHUTTI_HERO_SLIDES[activeHeroSlideIdx]
  const currentTestimonial = CHUTTI_TESTIMONIALS[activeTestiIdx]

  return (
    <div className={`chutti-root ${isMobile ? 'chutti-mobile device-mobile is-mobile' : `chutti-${effectiveDevice}`}`}>
      {/* TOAST POPUP */}
      {toastMsg && (
        <div
          style={{
            position: 'fixed',
            bottom: 30,
            left: '50%',
            transform: 'translateX(-50%)',
            background: '#FC6171',
            color: '#FFFFFF',
            padding: '12px 28px',
            borderRadius: '50px',
            fontSize: 14,
            fontWeight: 700,
            zIndex: 99999,
            boxShadow: '0 8px 24px rgba(252, 97, 113, 0.4)',
          }}
        >
          {toastMsg}
        </div>
      )}

      {/* MARQUEE RUNNER */}
      <div className="chutti-marquee-bar">
        <div className="chutti-marquee-track">
          <div className="chutti-marquee-item">
            <span className="star">★</span> Free deliveries worldwide! For more info Click Here
          </div>
          <div className="chutti-marquee-item">
            <span className="star">★</span> 100% Certified Organic Cotton
          </div>
          <div className="chutti-marquee-item">
            <span className="star">★</span> Non-Toxic Gentle Baby Safe Dyes
          </div>
          <div className="chutti-marquee-item">
            <span className="star">★</span> Flat 10% Off Orders Above $59.49 with Code CHUTTI10
          </div>
          <div className="chutti-marquee-item">
            <span className="star">★</span> Free deliveries worldwide! For more info Click Here
          </div>
          <div className="chutti-marquee-item">
            <span className="star">★</span> 100% Certified Organic Cotton
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="chutti-header">
        <div className="chutti-container">
          <div className="chutti-header-inner">
            {/* Logo */}
            <div
              className="chutti-logo-wrap"
              onClick={() => setViewMode('home')}
            >
              <div className="chutti-logo-icon">🧸</div>
              <div>
                <div className="chutti-logo-text">Chutti</div>
                <div className="chutti-logo-tagline">Kids Boutique</div>
              </div>
            </div>

            {/* Nav Menu */}
            <nav>
              <ul className="chutti-nav-menu">
                <li>
                  <a
                    href="#home"
                    className={`chutti-nav-link ${viewMode === 'home' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault()
                      setViewMode('home')
                    }}
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#category"
                    className={`chutti-nav-link ${viewMode === 'collection' ? 'active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault()
                      setViewMode('collection')
                    }}
                  >
                    Category
                  </a>
                </li>
                <li>
                  <a
                    href="#new-born"
                    className="chutti-nav-link"
                    onClick={(e) => {
                      e.preventDefault()
                      setFilters((f) => ({ ...f, ageGroup: '0-6M' }))
                      setViewMode('collection')
                    }}
                  >
                    New born
                  </a>
                </li>
                <li>
                  <a
                    href="#kids"
                    className="chutti-nav-link"
                    onClick={(e) => {
                      e.preventDefault()
                      setFilters((f) => ({ ...f, ageGroup: '2-3Y' }))
                      setViewMode('collection')
                    }}
                  >
                    Kids
                  </a>
                </li>
                <li>
                  <a
                    href="#accessories"
                    className="chutti-nav-link"
                    onClick={(e) => {
                      e.preventDefault()
                      setFilters((f) => ({ ...f, category: 'Accessories' }))
                      setViewMode('collection')
                    }}
                  >
                    Accessories
                  </a>
                </li>
              </ul>
            </nav>

            {/* Header Actions */}
            <div className="chutti-header-actions">
              <button
                className="chutti-action-icon-btn"
                title="Search"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                🔍
              </button>

              <button
                className="chutti-action-icon-btn"
                title="Wishlist"
                onClick={() => showToast(`Wishlist contains ${wishlistIds.length} items`)}
              >
                ♥
                {wishlistIds.length > 0 && (
                  <span className="chutti-badge-pill">{wishlistIds.length}</span>
                )}
              </button>

              <button
                className="chutti-action-icon-btn"
                title="Compare"
                onClick={() => {
                  if (compareIds.length === 0) {
                    showToast('No items in comparison yet!')
                  } else {
                    setIsCompareOpen(true)
                  }
                }}
              >
                ⇄
                {compareIds.length > 0 && (
                  <span className="chutti-badge-pill" style={{ background: '#11D6E1' }}>
                    {compareIds.length}
                  </span>
                )}
              </button>

              <button
                className="chutti-action-icon-btn"
                title="Cart Bag"
                onClick={() => setIsCartOpen(true)}
              >
                🛍
                <span className="chutti-badge-pill">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                </span>
              </button>

            </div>
          </div>
        </div>

        {/* Search Bar Dropdown */}
        {isSearchOpen && (
          <div style={{ background: '#FFF5F2', padding: '16px 0', borderTop: '1px dashed #F3EBE6' }}>
            <div className="chutti-container" style={{ display: 'flex', gap: 12 }}>
              <input
                type="text"
                placeholder="Search soft cotton dresses, baby rompers, graphic tees..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 20px',
                  borderRadius: '50px',
                  border: '1px solid #FC6171',
                  outline: 'none',
                  fontSize: 14,
                }}
              />
              <button
                className="chutti-btn chutti-btn-coral"
                onClick={() => {
                  if (searchQuery.trim()) {
                    setViewMode('collection')
                    showToast(`Showing search results for "${searchQuery}"`)
                  }
                }}
              >
                Search
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================
          VIEW MODE: COLLECTION VIEW
          ========================================================= */}
      {viewMode === 'collection' && (
        <section style={{ padding: '60px 0', background: '#FFFFFF' }}>
          <div className="chutti-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
              <div>
                <h1 style={{ fontFamily: 'Baloo Paaji 2, cursive', fontSize: 36, margin: '0 0 6px', color: '#363636' }}>
                  Kids Boutique Collection
                </h1>
                <p style={{ color: '#6B7280', margin: 0 }}>Showing {collectionProducts.length} happy playful styles</p>
              </div>
              <button className="chutti-btn chutti-btn-outline" onClick={() => setViewMode('home')}>
                ← Back to Home
              </button>
            </div>

            {/* Filter Chips */}
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
              {(['All', 'Baby Clothes', 'Accessories', 'Synthetic dress', 'Sleeveless Dress', 'Girls Party Dress', 'Tshirt & Sets'] as const).map(
                (cat) => (
                  <button
                    key={cat}
                    className={`chutti-btn ${filters.category === cat ? 'chutti-btn-coral' : 'chutti-btn-outline'}`}
                    style={{ padding: '8px 18px', fontSize: 13 }}
                    onClick={() => setFilters((f) => ({ ...f, category: cat }))}
                  >
                    {cat}
                  </button>
                )
              )}
            </div>

            {/* Age Filter Chips */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 36 }}>
              <span style={{ fontWeight: 700, fontSize: 14, color: '#363636' }}>Filter by Age:</span>
              {(['All', '0-6M', '6-12M', '1-2Y', '2-3Y', '3-4Y', '4-6Y'] as KidAgeGroup[]).map((age) => (
                <button
                  key={age}
                  className={`chutti-size-chip ${filters.ageGroup === age ? 'active' : ''}`}
                  style={{ padding: '6px 14px', fontSize: 12 }}
                  onClick={() => setFilters((f) => ({ ...f, ageGroup: age }))}
                >
                  {age}
                </button>
              ))}
            </div>

            {/* Product Grid */}
            <div className="chutti-products-grid">
              {collectionProducts.map((p) => {
                const curSize = selectedCardSizes[p.id] || p.sizes[0] || '1-2Y'
                const curColor = selectedCardColors[p.id] || p.colors[0]?.name || 'Sky Turquoise'
                return (
                  <div key={p.id} className="chutti-card">
                    <div className="chutti-card-media">
                      <img src={p.image} alt={p.name} />
                      {p.badge && <span className="chutti-card-badge">{p.badge}</span>}
                      <div className="chutti-card-actions">
                        <button
                          className="chutti-card-action-btn"
                          title="Quick View"
                          onClick={() => {
                            setQuickViewProduct(p)
                            setIsQuickViewOpen(true)
                          }}
                        >
                          👁
                        </button>
                        <button
                          className={`chutti-card-action-btn ${wishlistIds.includes(p.id) ? 'active' : ''}`}
                          title="Wishlist"
                          onClick={() => toggleWishlist(p.id)}
                        >
                          ♥
                        </button>
                        <button
                          className={`chutti-card-action-btn ${compareIds.includes(p.id) ? 'active' : ''}`}
                          title="Compare"
                          onClick={() => toggleCompare(p.id)}
                        >
                          ⇄
                        </button>
                      </div>
                    </div>

                    <div className="chutti-card-body">
                      <span className="chutti-card-category">{p.category} • {p.ageGroup}</span>
                      <h3 className="chutti-card-title" onClick={() => openPdp(p)}>
                        {p.name}
                      </h3>
                      <div className="chutti-card-rating">
                        {'★'.repeat(Math.round(p.rating))}
                        <span style={{ color: '#6B7280', fontSize: 12, marginLeft: 4 }}>({p.reviewCount})</span>
                      </div>

                      {/* Size Chips */}
                      <div className="chutti-card-sizes">
                        {p.sizes.slice(0, 4).map((s) => (
                          <button
                            key={s}
                            className={`chutti-size-chip ${curSize === s ? 'active' : ''}`}
                            onClick={() => setSelectedCardSizes((prev) => ({ ...prev, [p.id]: s }))}
                          >
                            {s}
                          </button>
                        ))}
                      </div>

                      {/* Color dots */}
                      <div style={{ display: 'flex', gap: 6, marginBottom: 12 }}>
                        {p.colors.map((c) => (
                          <span
                            key={c.name}
                            style={{
                              width: 14,
                              height: 14,
                              borderRadius: '50%',
                              backgroundColor: c.hex,
                              cursor: 'pointer',
                              outline: curColor === c.name ? '2px solid #FC6171' : 'none',
                              outlineOffset: 2,
                            }}
                            title={c.name}
                            onClick={() => setSelectedCardColors((prev) => ({ ...prev, [p.id]: c.name }))}
                          />
                        ))}
                      </div>

                      <div className="chutti-card-footer">
                        <div>
                          <span className="chutti-card-price">${p.price.toFixed(2)}</span>
                          {p.compareAtPrice && (
                            <span className="chutti-card-compare">${p.compareAtPrice.toFixed(2)}</span>
                          )}
                        </div>
                        <button
                          className="chutti-quick-add"
                          onClick={() => addToCart(p, curSize, curColor, 1)}
                        >
                          + Add to Bag
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          VIEW MODE: PDP (TECHNICAL KIDS PRODUCT DETAIL PAGE)
          ========================================================= */}
      {viewMode === 'pdp' && (
        <section style={{ padding: '60px 0', background: '#FFFFFF' }}>
          <div className="chutti-container">
            <button
              className="chutti-btn chutti-btn-outline"
              style={{ marginBottom: 32, padding: '8px 20px', fontSize: 13 }}
              onClick={() => setViewMode('home')}
            >
              ← Back to Store
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48 }}>
              {/* Gallery */}
              <div>
                <div
                  style={{
                    borderRadius: 24,
                    overflow: 'hidden',
                    height: 500,
                    backgroundColor: '#F8FAFC',
                    marginBottom: 16,
                    boxShadow: '0 12px 30px rgba(0,0,0,0.06)',
                  }}
                >
                  <img
                    src={pdpSelectedImage}
                    alt={selectedProduct.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 12 }}>
                  {selectedProduct.gallery.map((img, i) => (
                    <img
                      key={i}
                      src={img}
                      alt="Thumbnail"
                      style={{
                        width: 80,
                        height: 95,
                        borderRadius: 12,
                        objectFit: 'cover',
                        cursor: 'pointer',
                        border: pdpSelectedImage === img ? '3px solid #FC6171' : '1px solid #E5E7EB',
                      }}
                      onClick={() => setPdpSelectedImage(img)}
                    />
                  ))}
                </div>
              </div>

              {/* Details & Selectors */}
              <div>
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
                  <span className="chutti-promo-tag" style={{ background: '#11D6E1', color: '#FFFFFF' }}>
                    {selectedProduct.category}
                  </span>
                  {selectedProduct.badge && (
                    <span className="chutti-promo-tag" style={{ background: '#FC6171', color: '#FFFFFF' }}>
                      {selectedProduct.badge}
                    </span>
                  )}
                </div>

                <h1 style={{ fontFamily: 'Baloo Paaji 2, cursive', fontSize: 34, margin: '8px 0 12px', color: '#363636' }}>
                  {selectedProduct.name}
                </h1>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ color: '#F59E0B', fontSize: 16 }}>
                    {'★'.repeat(Math.round(selectedProduct.rating))}
                  </div>
                  <span style={{ fontSize: 13, color: '#6B7280' }}>
                    {selectedProduct.rating} / 5.0 ({selectedProduct.reviewCount} parent reviews)
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
                  <span style={{ fontFamily: 'Baloo Paaji 2, cursive', fontSize: 32, fontWeight: 800, color: '#FC6171' }}>
                    ${selectedProduct.price.toFixed(2)}
                  </span>
                  {selectedProduct.compareAtPrice && (
                    <span style={{ fontSize: 18, color: '#9CA3AF', textDecoration: 'line-through' }}>
                      ${selectedProduct.compareAtPrice.toFixed(2)}
                    </span>
                  )}
                  <span style={{ background: '#FFF0F5', color: '#FC6171', padding: '4px 10px', borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                    In Stock & Ready to Ship
                  </span>
                </div>

                <p style={{ color: '#4B5563', fontSize: 15, lineHeight: 1.7, marginBottom: 28 }}>
                  {selectedProduct.description}
                </p>

                {/* Size by Age */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 14 }}>Select Age / Size: <b>{pdpSelectedSize}</b></span>
                    <span style={{ fontSize: 12, color: '#11D6E1', cursor: 'pointer', fontWeight: 600 }}>📏 Baby Size Guide</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {selectedProduct.sizes.map((s) => (
                      <button
                        key={s}
                        className={`chutti-size-chip ${pdpSelectedSize === s ? 'active' : ''}`}
                        style={{ padding: '8px 18px', fontSize: 13 }}
                        onClick={() => setPdpSelectedSize(s)}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color swatches */}
                <div style={{ marginBottom: 28 }}>
                  <span style={{ fontWeight: 700, fontSize: 14, display: 'block', marginBottom: 8 }}>
                    Color: <b>{pdpSelectedColor}</b>
                  </span>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {selectedProduct.colors.map((c) => (
                      <button
                        key={c.name}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          backgroundColor: c.hex,
                          border: '2px solid #FFFFFF',
                          outline: pdpSelectedColor === c.name ? '3px solid #FC6171' : '1px solid #E5E7EB',
                          cursor: 'pointer',
                        }}
                        title={c.name}
                        onClick={() => setPdpSelectedColor(c.name)}
                      />
                    ))}
                  </div>
                </div>

                {/* Quantity and Add to Bag */}
                <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 36 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      border: '2px solid #F3EBE6',
                      borderRadius: 50,
                      padding: '6px 16px',
                    }}
                  >
                    <button
                      onClick={() => setPdpQty(Math.max(1, pdpQty - 1))}
                      style={{ border: 'none', background: 'transparent', fontSize: 18, cursor: 'pointer', padding: '0 8px' }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: 16, fontWeight: 700, margin: '0 12px' }}>{pdpQty}</span>
                    <button
                      onClick={() => setPdpQty(pdpQty + 1)}
                      style={{ border: 'none', background: 'transparent', fontSize: 18, cursor: 'pointer', padding: '0 8px' }}
                    >
                      +
                    </button>
                  </div>

                  <button
                    className="chutti-btn chutti-btn-coral"
                    style={{ flex: 1, padding: '14px 28px', fontSize: 16 }}
                    onClick={() => addToCart(selectedProduct, pdpSelectedSize, pdpSelectedColor, pdpQty)}
                  >
                    🛍 Add to Bag • ${(selectedProduct.price * pdpQty).toFixed(2)}
                  </button>

                  <button
                    className={`chutti-action-icon-btn ${wishlistIds.includes(selectedProduct.id) ? 'active' : ''}`}
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    style={{ width: 48, height: 48 }}
                  >
                    ♥
                  </button>
                </div>

                {/* Safe Kids Guarantee Badge */}
                <div
                  style={{
                    background: '#F0FBFC',
                    border: '1px dashed #11D6E1',
                    borderRadius: 16,
                    padding: 18,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 16,
                    marginBottom: 32,
                  }}
                >
                  <span style={{ fontSize: 32 }}>🌿</span>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 14, color: '#0EBCC6' }}>
                      Gentle & Certified Baby Safe
                    </div>
                    <div style={{ fontSize: 13, color: '#4B5563' }}>
                      {selectedProduct.safetyCertification}
                    </div>
                  </div>
                </div>

                {/* Tabs Accordion */}
                <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: 20 }}>
                  <div style={{ display: 'flex', gap: 20, marginBottom: 16 }}>
                    {(['details', 'care', 'safety', 'shipping'] as const).map((tab) => (
                      <button
                        key={tab}
                        style={{
                          background: 'none',
                          border: 'none',
                          fontWeight: pdpAccordion === tab ? 800 : 600,
                          color: pdpAccordion === tab ? '#FC6171' : '#6B7280',
                          borderBottom: pdpAccordion === tab ? '2px solid #FC6171' : 'none',
                          paddingBottom: 6,
                          cursor: 'pointer',
                          textTransform: 'capitalize',
                          fontSize: 14,
                        }}
                        onClick={() => setPdpAccordion(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  {pdpAccordion === 'details' && (
                    <div style={{ fontSize: 14, color: '#4B5563' }}>
                      <p><b>Material:</b> {selectedProduct.material}</p>
                      <p><b>Fit / Age:</b> {selectedProduct.ageGroup} ({selectedProduct.gender})</p>
                      <p><b>SKU:</b> {selectedProduct.sku}</p>
                    </div>
                  )}

                  {pdpAccordion === 'care' && (
                    <p style={{ fontSize: 14, color: '#4B5563' }}>{selectedProduct.careGuide}</p>
                  )}

                  {pdpAccordion === 'safety' && (
                    <p style={{ fontSize: 14, color: '#4B5563' }}>{selectedProduct.safetyCertification}</p>
                  )}

                  {pdpAccordion === 'shipping' && (
                    <p style={{ fontSize: 14, color: '#4B5563' }}>{selectedProduct.shippingInfo}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =========================================================
          VIEW MODE: HOMEPAGE (AUTHENTIC SECTIONS 1 - 11)
          ========================================================= */}
      {viewMode === 'home' && (
        <>
          {/* SECTION 1: HERO SLIDESHOW */}
          <section className="chutti-hero">
            <div className="chutti-container" style={{ width: '100%' }}>
              <div className="chutti-hero-content">
                <span className="chutti-hero-script">{currentHeroSlide.subtitle}</span>
                <h1 className="chutti-hero-title">{currentHeroSlide.title}</h1>
                <div className="chutti-hero-tagline">{currentHeroSlide.offerTagline}</div>
                <div>
                  <button
                    className="chutti-btn chutti-btn-coral"
                    onClick={() => setViewMode('collection')}
                  >
                    {currentHeroSlide.buttonText} →
                  </button>
                </div>
              </div>

              <div className="chutti-hero-visual">
                <img src={currentHeroSlide.image} alt={currentHeroSlide.title} />
              </div>

              <div className="chutti-hero-dots">
                {CHUTTI_HERO_SLIDES.map((slide, idx) => (
                  <div
                    key={slide.id}
                    className={`chutti-hero-dot ${activeHeroSlideIdx === idx ? 'active' : ''}`}
                    onClick={() => setActiveHeroSlideIdx(idx)}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 2: CATEGORY GRID */}
          <section className="chutti-section" style={{ background: '#FFFFFF' }}>
            <div className="chutti-container">
              <div className="chutti-section-header">
                <div className="chutti-section-sub">Shop by Category</div>
                <h2 className="chutti-section-title">Kids Shopping</h2>
                <div className="chutti-title-line" />
              </div>

              <div className="chutti-cat-grid">
                {CHUTTI_CATEGORIES.map((cat) => (
                  <div
                    key={cat.id}
                    className="chutti-cat-card"
                    style={{ backgroundColor: cat.bgColor }}
                    onClick={() => {
                      setFilters((f) => ({ ...f, category: cat.title }))
                      setViewMode('collection')
                    }}
                  >
                    <div className="chutti-cat-img-box">
                      <img src={cat.image} alt={cat.title} />
                    </div>
                    <div className="chutti-cat-title">{cat.title}</div>
                    <div className="chutti-cat-count">{cat.itemCount}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 3: NEW ARRIVALS */}
          <section className="chutti-section" style={{ background: '#FFFAF7' }}>
            <div className="chutti-container">
              <div className="chutti-section-header">
                <div className="chutti-section-sub">Special Kids Offer</div>
                <h2 className="chutti-section-title">New Arrivals</h2>
                <div className="chutti-title-line" />
              </div>

              <div className="chutti-products-grid">
                {CHUTTI_PRODUCTS.slice(0, 4).map((p) => {
                  const curSize = selectedCardSizes[p.id] || p.sizes[0] || '1-2Y'
                  const curColor = selectedCardColors[p.id] || p.colors[0]?.name || 'Sky Turquoise'
                  return (
                    <div key={p.id} className="chutti-card">
                      <div className="chutti-card-media">
                        <img src={p.image} alt={p.name} />
                        {p.badge && <span className="chutti-card-badge">{p.badge}</span>}
                        <div className="chutti-card-actions">
                          <button
                            className="chutti-card-action-btn"
                            title="Quick View"
                            onClick={() => {
                              setQuickViewProduct(p)
                              setIsQuickViewOpen(true)
                            }}
                          >
                            👁
                          </button>
                          <button
                            className={`chutti-card-action-btn ${wishlistIds.includes(p.id) ? 'active' : ''}`}
                            title="Wishlist"
                            onClick={() => toggleWishlist(p.id)}
                          >
                            ♥
                          </button>
                          <button
                            className={`chutti-card-action-btn ${compareIds.includes(p.id) ? 'active' : ''}`}
                            title="Compare"
                            onClick={() => toggleCompare(p.id)}
                          >
                            ⇄
                          </button>
                        </div>
                      </div>

                      <div className="chutti-card-body">
                        <span className="chutti-card-category">{p.category}</span>
                        <h3 className="chutti-card-title" onClick={() => openPdp(p)}>
                          {p.name}
                        </h3>
                        <div className="chutti-card-rating">
                          {'★'.repeat(Math.round(p.rating))}
                          <span style={{ color: '#6B7280', fontSize: 12, marginLeft: 4 }}>({p.reviewCount})</span>
                        </div>

                        {/* Size chips */}
                        <div className="chutti-card-sizes">
                          {p.sizes.slice(0, 4).map((s) => (
                            <button
                              key={s}
                              className={`chutti-size-chip ${curSize === s ? 'active' : ''}`}
                              onClick={() => setSelectedCardSizes((prev) => ({ ...prev, [p.id]: s }))}
                            >
                              {s}
                            </button>
                          ))}
                        </div>

                        <div className="chutti-card-footer">
                          <div>
                            <span className="chutti-card-price">${p.price.toFixed(2)}</span>
                            {p.compareAtPrice && (
                              <span className="chutti-card-compare">${p.compareAtPrice.toFixed(2)}</span>
                            )}
                          </div>
                          <button
                            className="chutti-quick-add"
                            onClick={() => addToCart(p, curSize, curColor, 1)}
                          >
                            + Add to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* SECTION 4: STYLIST COLLECTION */}
          <section className="chutti-section" style={{ background: '#FFFFFF' }}>
            <div className="chutti-container">
              <div className="chutti-section-header">
                <div className="chutti-section-sub">Trending Now</div>
                <h2 className="chutti-section-title">Stylist Collection</h2>
                <div className="chutti-title-line" />
              </div>

              <div className="chutti-products-grid">
                {CHUTTI_PRODUCTS.slice(4, 12).map((p) => {
                  const curSize = selectedCardSizes[p.id] || p.sizes[0] || '1-2Y'
                  const curColor = selectedCardColors[p.id] || p.colors[0]?.name || 'Sky Turquoise'
                  return (
                    <div key={p.id} className="chutti-card">
                      <div className="chutti-card-media">
                        <img src={p.image} alt={p.name} />
                        {p.badge && <span className="chutti-card-badge">{p.badge}</span>}
                        <div className="chutti-card-actions">
                          <button
                            className="chutti-card-action-btn"
                            title="Quick View"
                            onClick={() => {
                              setQuickViewProduct(p)
                              setIsQuickViewOpen(true)
                            }}
                          >
                            👁
                          </button>
                          <button
                            className={`chutti-card-action-btn ${wishlistIds.includes(p.id) ? 'active' : ''}`}
                            title="Wishlist"
                            onClick={() => toggleWishlist(p.id)}
                          >
                            ♥
                          </button>
                        </div>
                      </div>

                      <div className="chutti-card-body">
                        <span className="chutti-card-category">{p.category}</span>
                        <h3 className="chutti-card-title" onClick={() => openPdp(p)}>
                          {p.name}
                        </h3>
                        <div className="chutti-card-rating">
                          {'★'.repeat(Math.round(p.rating))}
                          <span style={{ color: '#6B7280', fontSize: 12, marginLeft: 4 }}>({p.reviewCount})</span>
                        </div>

                        <div className="chutti-card-sizes">
                          {p.sizes.slice(0, 4).map((s) => (
                            <button
                              key={s}
                              className={`chutti-size-chip ${curSize === s ? 'active' : ''}`}
                              onClick={() => setSelectedCardSizes((prev) => ({ ...prev, [p.id]: s }))}
                            >
                              {s}
                            </button>
                          ))}
                        </div>

                        <div className="chutti-card-footer">
                          <div>
                            <span className="chutti-card-price">${p.price.toFixed(2)}</span>
                            {p.compareAtPrice && (
                              <span className="chutti-card-compare">${p.compareAtPrice.toFixed(2)}</span>
                            )}
                          </div>
                          <button
                            className="chutti-quick-add"
                            onClick={() => addToCart(p, curSize, curColor, 1)}
                          >
                            + Add to Bag
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* SECTION 5: CALL TO ACTION BIG PROMO BANNER */}
          <section className="chutti-container">
            <div className="chutti-big-promo">
              <div className="chutti-promo-text">
                <span className="chutti-promo-tag">LIMITED SPECIAL OFFER</span>
                <h2 className="chutti-promo-title">The Biggest Kids Fashion Store</h2>
                <p className="chutti-promo-desc">
                  Explore thousands of cheerful organic cotton baby rompers, twirling party frocks, and soft playtime sets crafted with motherly care.
                </p>
                <button
                  className="chutti-btn chutti-btn-coral"
                  onClick={() => setViewMode('collection')}
                >
                  Shop Now →
                </button>
              </div>

              <div style={{ maxWidth: 360, textAlign: 'center' }}>
                <div style={{ fontSize: 80, lineHeight: 1 }}>🧸🎈</div>
                <div style={{ fontFamily: 'Baloo Paaji 2, cursive', fontSize: 28, fontWeight: 800, color: '#FC6171', marginTop: 12 }}>
                  Up to 70% Off
                </div>
                <div style={{ fontSize: 14, color: '#6B7280' }}>On newborn essentials & summer dresses</div>
              </div>
            </div>
          </section>

          {/* SECTION 7: TESTIMONIALS ("What Customers Say") */}
          <section className="chutti-section" style={{ background: '#FFF5F2' }}>
            <div className="chutti-container">
              <div className="chutti-section-header">
                <div className="chutti-section-sub">Parent Testimonials</div>
                <h2 className="chutti-section-title">What Customers Say</h2>
                <div className="chutti-title-line" />
              </div>

              <div className="chutti-testi-card">
                <div style={{ fontSize: 24, color: '#F59E0B', marginBottom: 16 }}>
                  {'★'.repeat(Math.round(currentTestimonial.rating))}
                </div>
                <p className="chutti-testi-quote">"{currentTestimonial.quote}"</p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}>
                  <img
                    src={currentTestimonial.avatar}
                    alt={currentTestimonial.author}
                    style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover', border: '2px solid #FC6171' }}
                  />
                  <div style={{ textAlign: 'left' }}>
                    <div className="chutti-testi-author">{currentTestimonial.author}</div>
                    <div className="chutti-testi-role">{currentTestimonial.role}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 24 }}>
                  {CHUTTI_TESTIMONIALS.map((t, idx) => (
                    <div
                      key={t.id}
                      className={`chutti-hero-dot ${activeTestiIdx === idx ? 'active' : ''}`}
                      onClick={() => setActiveTestiIdx(idx)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 9: BLOG UPDATES ("Our Fun & Exciting Updates") */}
          <section className="chutti-section" style={{ background: '#FFFFFF' }}>
            <div className="chutti-container">
              <div className="chutti-section-header">
                <div className="chutti-section-sub">Parenting & Stories</div>
                <h2 className="chutti-section-title">Our Fun & Exciting Updates</h2>
                <div className="chutti-title-line" />
              </div>

              <div className="chutti-blog-grid">
                {CHUTTI_BLOG_POSTS.map((post) => (
                  <div key={post.id} className="chutti-blog-card">
                    <div className="chutti-blog-media">
                      <img src={post.image} alt={post.title} />
                    </div>
                    <div className="chutti-blog-body">
                      <div className="chutti-blog-date">{post.date} • {post.category}</div>
                      <h3 className="chutti-blog-title">{post.title}</h3>
                      <p className="chutti-blog-excerpt">{post.excerpt}</p>
                      <button
                        className="chutti-btn chutti-btn-outline"
                        style={{ padding: '6px 18px', fontSize: 13 }}
                        onClick={() => showToast(`Reading "${post.title}"`)}
                      >
                        Read More →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 10: NEWSLETTER SIGNUP */}
          <section className="chutti-container" style={{ marginBottom: 60 }}>
            <div className="chutti-newsletter">
              <h2>Subscribe To Newsletter</h2>
              <p>Get instant access to private warehouse sales, cute styling guides, and exclusive 15% off coupon codes for your toddlers!</p>
              <form
                className="chutti-newsletter-form"
                onSubmit={(e) => {
                  e.preventDefault()
                  showToast('Thank you! Discount coupon BABY15 sent to your inbox!')
                }}
              >
                <input
                  type="email"
                  className="chutti-newsletter-input"
                  placeholder="Enter your email address..."
                  required
                />
                <button type="submit" className="chutti-btn chutti-btn-coral">
                  Submit
                </button>
              </form>
            </div>
          </section>

          {/* SECTION 11: BRAND PARTNER LOGOS */}
          <section className="chutti-container">
            <div className="chutti-partners-row">
              {CHUTTI_BRAND_LOGOS.map((brand) => (
                <img
                  key={brand.id}
                  src={brand.image}
                  alt={brand.name}
                  className="chutti-partner-img"
                />
              ))}
            </div>
          </section>
        </>
      )}

      {/* FOOTER */}
      <footer className="chutti-footer">
        <div className="chutti-container">
          <div className="chutti-footer-grid">
            <div className="chutti-footer-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                <span style={{ fontSize: 28 }}>🧸</span>
                <span style={{ fontFamily: 'Baloo Paaji 2, cursive', fontSize: 26, fontWeight: 800, color: '#FFFFFF' }}>
                  Chutti Kids
                </span>
              </div>
              <p style={{ color: '#94A3B8', lineHeight: 1.7, maxWidth: 320 }}>
                Chutti is an ethical kids fashion atelier celebrating childhood wonder with ultra-gentle certified organic fabrics, happy sunshine colors, and hypoallergenic playwear.
              </p>
            </div>

            <div className="chutti-footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><a href="#about" onClick={(e) => { e.preventDefault(); showToast('About Us Page'); }}>About Us</a></li>
                <li><a href="#shop" onClick={(e) => { e.preventDefault(); setViewMode('collection'); }}>Shop Catalog</a></li>
                <li><a href="#faq" onClick={(e) => { e.preventDefault(); showToast('Help & FAQs'); }}>Help & FAQs</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); showToast('Contact Form'); }}>Contact Us</a></li>
              </ul>
            </div>

            <div className="chutti-footer-col">
              <h4>Policies</h4>
              <ul>
                <li><a href="#privacy" onClick={(e) => { e.preventDefault(); showToast('Privacy Policy'); }}>Privacy Policy</a></li>
                <li><a href="#terms" onClick={(e) => { e.preventDefault(); showToast('Terms of Service'); }}>Terms of Service</a></li>
                <li><a href="#shipping" onClick={(e) => { e.preventDefault(); showToast('Shipping Guide'); }}>Worldwide Shipping</a></li>
                <li><a href="#returns" onClick={(e) => { e.preventDefault(); showToast('30-Day Returns'); }}>30-Day Returns</a></li>
              </ul>
            </div>

            <div className="chutti-footer-col">
              <h4>Store Location</h4>
              <p style={{ color: '#94A3B8', marginBottom: 12 }}>
                128 Rainbow Lane, Suite 400<br />
                Austin, TX 78701<br />
                support@chuttikids.com
              </p>
              <div style={{ fontSize: 13, color: '#11D6E1', fontWeight: 700 }}>
                Open Mon - Sat: 9:00 AM - 6:00 PM
              </div>
            </div>
          </div>

          <div className="chutti-footer-bottom">
            <div>© 2026 Chutti Kids Boutique. All Rights Reserved.</div>
            <div style={{ display: 'flex', gap: 12 }}>
              <span>Visa</span> • <span>Mastercard</span> • <span>Apple Pay</span> • <span>PayPal</span>
            </div>
          </div>
        </div>
      </footer>

      {/* =========================================================
          SLIDE-OVER CART DRAWER
          ========================================================= */}
      {isCartOpen && (
        <div className="chutti-drawer-backdrop" onClick={() => setIsCartOpen(false)}>
          <div className="chutti-cart-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="chutti-drawer-header">
              <h3>Shopping Bag ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</h3>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div className="chutti-drawer-body">
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#6B7280' }}>
                  <div style={{ fontSize: 50, marginBottom: 12 }}>🧸</div>
                  <div style={{ fontWeight: 700, fontSize: 16 }}>Your bag is currently empty</div>
                  <button
                    className="chutti-btn chutti-btn-coral"
                    style={{ marginTop: 16 }}
                    onClick={() => {
                      setIsCartOpen(false)
                      setViewMode('collection')
                    }}
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}`} className="chutti-drawer-item">
                    <img src={item.product.image} alt={item.product.name} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Baloo Paaji 2, cursive', fontSize: 16, fontWeight: 700, color: '#363636' }}>
                        {item.product.name}
                      </div>
                      <div style={{ fontSize: 12, color: '#6B7280', margin: '2px 0 8px' }}>
                        Size: {item.size} | {item.color} | ${item.product.price.toFixed(2)}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            border: '1px solid #E5E7EB',
                            borderRadius: 20,
                            padding: '2px 8px',
                          }}
                        >
                          <button onClick={() => updateCartQty(idx, -1)} style={{ border: 'none', background: 'none', padding: '0 4px', cursor: 'pointer' }}>
                            -
                          </button>
                          <span style={{ fontSize: 13, fontWeight: 700, margin: '0 8px' }}>
                            {item.quantity}
                          </span>
                          <button onClick={() => updateCartQty(idx, 1)} style={{ border: 'none', background: 'none', padding: '0 4px', cursor: 'pointer' }}>
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => updateCartQty(idx, -item.quantity)}
                          style={{ background: 'none', border: 'none', fontSize: 12, color: '#EF4444', cursor: 'pointer' }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="chutti-drawer-footer">
                <div className="chutti-drawer-subtotal">
                  <span>Subtotal:</span>
                  <span style={{ color: '#FC6171' }}>${cartSubtotal}</span>
                </div>
                <button
                  className="chutti-btn chutti-btn-coral"
                  style={{ width: '100%' }}
                  onClick={() => showToast('Proceeding to Checkout...')}
                >
                  Checkout Now 🛍
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* QUICK VIEW MODAL */}
      {isQuickViewOpen && (
        <div className="chutti-drawer-backdrop" onClick={() => setIsQuickViewOpen(false)}>
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#FFFFFF',
              padding: 32,
              borderRadius: 24,
              maxWidth: 700,
              width: '90%',
              zIndex: 10002,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
              <button
                onClick={() => setIsQuickViewOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                style={{ width: '100%', height: 350, objectFit: 'cover', borderRadius: 16 }}
              />
              <div>
                <span className="chutti-promo-tag" style={{ background: '#11D6E1', color: '#FFFFFF', fontSize: 11 }}>
                  {quickViewProduct.category}
                </span>
                <h3 style={{ fontFamily: 'Baloo Paaji 2, cursive', fontSize: 24, margin: '8px 0 10px', color: '#363636' }}>
                  {quickViewProduct.name}
                </h3>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#FC6171', marginBottom: 12 }}>
                  ${quickViewProduct.price.toFixed(2)}
                </div>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, marginBottom: 20 }}>
                  {quickViewProduct.description}
                </p>
                <button
                  className="chutti-btn chutti-btn-coral"
                  style={{ width: '100%' }}
                  onClick={() => {
                    addToCart(quickViewProduct, quickViewProduct.sizes[0] || '1-2Y', quickViewProduct.colors[0]?.name || 'Default', 1)
                    setIsQuickViewOpen(false)
                  }}
                >
                  Add to Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* COMPARISON MODAL */}
      {isCompareOpen && (
        <div className="chutti-drawer-backdrop" onClick={() => setIsCompareOpen(false)}>
          <div
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: '#FFFFFF',
              padding: 32,
              borderRadius: 24,
              maxWidth: 820,
              width: '90%',
              zIndex: 10002,
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'Baloo Paaji 2, cursive', fontSize: 24, margin: 0 }}>
                Compare Kids Outfits ({compareIds.length})
              </h3>
              <button
                onClick={() => setIsCompareOpen(false)}
                style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${compareIds.length}, 1fr)`, gap: 20 }}>
              {compareIds.map((id) => {
                const prod = CHUTTI_PRODUCTS.find((p) => p.id === id)
                if (!prod) return null
                return (
                  <div key={prod.id} style={{ border: '1px solid #E5E7EB', borderRadius: 16, padding: 16, textAlign: 'center' }}>
                    <img src={prod.image} alt={prod.name} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 12, marginBottom: 12 }} />
                    <h4 style={{ fontFamily: 'Baloo Paaji 2, cursive', fontSize: 16, margin: '0 0 6px' }}>{prod.name}</h4>
                    <div style={{ color: '#FC6171', fontWeight: 800, fontSize: 18, marginBottom: 8 }}>${prod.price.toFixed(2)}</div>
                    <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 12 }}>{prod.material}</div>
                    <button
                      className="chutti-btn chutti-btn-coral"
                      style={{ padding: '6px 16px', fontSize: 12, width: '100%' }}
                      onClick={() => {
                        addToCart(prod, prod.sizes[0] || '1-2Y', prod.colors[0]?.name || 'Default', 1)
                        setIsCompareOpen(false)
                      }}
                    >
                      Add to Bag
                    </button>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
