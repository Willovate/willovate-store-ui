import React, { useMemo, useState } from 'react'
import './eliteSport.css'

export type EliteProduct = {
  id: string
  name: string
  category: string
  gender: 'Men' | 'Women' | 'Unisex'
  price: number
  compareAtPrice?: number
  image: string
  alternateImage: string
  color: string
  colorHex: string
  sizes: string[]
  technology: string
  description: string
  story: string
  badge?: 'NEW DROP' | 'BEST SELLER' | 'LIMITED' | 'EDITOR’S PICK'
  rating: number
  reviewCount: number
}

export type EliteCartLine = { product: EliteProduct; size: string; color: string; quantity: number }

const image = (id: string, width = 1200) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

const shoeSizes = ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11']
const apparelSizes = ['XS', 'S', 'M', 'L', 'XL']

export const ELITE_PRODUCTS: EliteProduct[] = [
  {
    id: 'aerion-carbon-01',
    name: 'Aerion Carbon 01',
    category: 'Footwear',
    gender: 'Unisex',
    price: 18900,
    compareAtPrice: 21500,
    image: image('photo-1539185441755-769473a23570'),
    alternateImage: image('photo-1552346154-21d32810aba3'),
    color: 'Stone / Carbon',
    colorHex: '#aaa79e',
    sizes: shoeSizes,
    technology: 'AERION CARBON PLATE · 178 G · 8 MM DROP',
    description: 'A precision road shoe tuned for fast, composed movement. A responsive carbon plate works with a sculpted foam platform for effortless forward drive.',
    story: 'Every contour is considered. Aerion pairs a barely-there engineered upper with a full-length carbon plate, balancing speed and restraint in one refined silhouette.',
    badge: 'NEW DROP',
    rating: 4.9,
    reviewCount: 142,
  },
  {
    id: 'altitude-shell',
    name: 'Altitude 3L Shell',
    category: 'Performance',
    gender: 'Men',
    price: 24600,
    compareAtPrice: 28000,
    image: image('photo-1544923246-77307dd654cb'),
    alternateImage: image('photo-1539533018447-63fcce2678e3'),
    color: 'Alpine Moss',
    colorHex: '#626c5b',
    sizes: apparelSizes,
    technology: '3-LAYER MEMBRANE · 20K WATERPROOF · SEALED SEAMS',
    description: 'A weatherproof shell with a quiet hand feel and an articulated cut. Built to move cleanly from exposed ridgelines to the city beyond.',
    story: 'Protection should never get in the way. Three bonded layers keep the elements outside and movement natural, without the usual technical bulk.',
    badge: 'LIMITED',
    rating: 4.95,
    reviewCount: 98,
  },
  {
    id: 'form-knit-1',
    name: 'Form Knit Long Sleeve',
    category: 'Performance',
    gender: 'Women',
    price: 8900,
    compareAtPrice: 10200,
    image: image('photo-1515886657613-9f3515b0c78f'),
    alternateImage: image('photo-1539533018447-63fcce2678e3'),
    color: 'Warm Chalk',
    colorHex: '#d9d6cc',
    sizes: apparelSizes,
    technology: 'SEAMLESS KNIT · BODY-MAPPED VENTILATION · UPF 40+',
    description: 'Soft, sculpted and distraction-free. An engineered knit follows the body without compression, with targeted ventilation where it matters.',
    story: 'A single refined knit structure replaces panels and seams. Light, breathable and beautifully considered from warm-up to the last mile.',
    badge: 'BEST SELLER',
    rating: 4.88,
    reviewCount: 215,
  },
  {
    id: 'court-arc-pro',
    name: 'Court Arc Pro',
    category: 'Footwear',
    gender: 'Unisex',
    price: 16400,
    compareAtPrice: 18500,
    image: image('photo-1552346154-21d32810aba3'),
    alternateImage: image('photo-1539185441755-769473a23570'),
    color: 'Porcelain / Ink',
    colorHex: '#e6e3db',
    sizes: shoeSizes,
    technology: 'STABILITY SHANK · ORTHOLITE INSOLE · COURT GRIP RUBBER',
    description: 'A stable, close-to-court profile with responsive cushioning and precise lateral support, finished in understated premium materials.',
    story: 'Made for the moments when control matters. The Court Arc Pro pairs a low, planted platform with a considered leather and mesh upper.',
    badge: 'NEW DROP',
    rating: 4.92,
    reviewCount: 86,
  },
  {
    id: 'meridian-track-pant',
    name: 'Meridian Track Pant',
    category: 'Performance',
    gender: 'Men',
    price: 11200,
    image: image('photo-1552902865-b72c031ac5ea'),
    alternateImage: image('photo-1506629905607-d9f9f6bb4f96'),
    color: 'Graphite',
    colorHex: '#454642',
    sizes: apparelSizes,
    technology: 'FOUR-WAY STRETCH · RECYCLED NYLON · LOW-PROFILE POCKETS',
    description: 'A tailored athletic trouser with four-way stretch, a clean tapered leg and secure pockets kept close to the body.',
    story: 'Technical construction, city-ready proportion. Meridian moves between training and everything that follows without changing pace.',
    badge: 'EDITOR’S PICK',
    rating: 4.85,
    reviewCount: 164,
  },
  {
    id: 'aerion-pace-vest',
    name: 'Aerion Pace Vest',
    category: 'Accessories',
    gender: 'Unisex',
    price: 7400,
    image: image('photo-1579952363873-27f3bade9f55'),
    alternateImage: image('photo-1538805060514-97d9cc17730c'),
    color: 'Deep Olive',
    colorHex: '#505647',
    sizes: ['XS/S', 'M/L', 'XL/XXL'],
    technology: 'LASER-CUT STORAGE · BOUNCE-FREE FIT · 110 G',
    description: 'A featherlight, close-fitting running vest with considered storage and clean lines. Carries essentials without interrupting the run.',
    story: 'Stripped to exactly what is needed. Aerion distributes weight close and evenly, so the kit disappears and the route takes over.',
    badge: 'BEST SELLER',
    rating: 4.96,
    reviewCount: 112,
  },
  {
    id: 'studio-training-top',
    name: 'Studio Training Top',
    category: 'Performance',
    gender: 'Women',
    price: 6800,
    image: image('photo-1539533018447-63fcce2678e3'),
    alternateImage: image('photo-1515886657613-9f3515b0c78f'),
    color: 'Black Olive',
    colorHex: '#353832',
    sizes: apparelSizes,
    technology: 'MOISTURE-MANAGEMENT YARN · FOUR-WAY STRETCH · FLAT SEAMS',
    description: 'A clean, supportive training layer with soft-touch stretch and flat seams. Made to feel composed through every movement.',
    story: 'Movement, without distraction. A refined base layer that holds its shape, breathes easily and feels soft against the skin.',
    rating: 4.89,
    reviewCount: 74,
  },
  {
    id: 'precision-cap',
    name: 'Precision Run Cap',
    category: 'Accessories',
    gender: 'Unisex',
    price: 3900,
    image: image('photo-1588850561407-ed78c282e89b'),
    alternateImage: image('photo-1521369909029-2afed882baee'),
    color: 'Natural / Black',
    colorHex: '#d3cdbc',
    sizes: ['One size'],
    technology: 'LASER-PERFORATED CROWN · QUICK-DRY BAND · 48 G',
    description: 'Light, breathable and balanced. A low-profile cap with a structured brim and considered technical detailing.',
    story: 'A study in useful simplicity: nothing extra, nothing out of place, and a fit that stays composed through the finish.',
    rating: 4.94,
    reviewCount: 153,
  },
]

const navItems = ['Collections', 'Men', 'Women', 'Performance', 'Footwear', 'Accessories', 'New Collection']
const formatPrice = (price: number) => `₹${price.toLocaleString('en-IN')}`
const defaultSize = (product: EliteProduct) => product.sizes.includes('UK 8') ? 'UK 8' : product.sizes.includes('M') ? 'M' : product.sizes[0]
const FREE_SHIPPING_THRESHOLD = 999

export interface EliteSportStorefrontProps {
  deviceView?: 'desktop' | 'tablet' | 'mobile' | 'fullscreen'
  customAccentColor?: string
  onBack?: () => void
  onClose?: () => void
  onUseTemplate?: (templateId: string) => void
}

export function EliteSportStorefront({
  deviceView = 'desktop',
  customAccentColor,
  onBack,
  onClose: _onClose,
  onUseTemplate,
}: EliteSportStorefrontProps) {
  const [view, setView] = useState<'home' | 'collection' | 'product'>('home')
  const [activeFilter, setActiveFilter] = useState('Collections')
  const [selectedProduct, setSelectedProduct] = useState<EliteProduct | null>(null)
  const [selectedSize, setSelectedSize] = useState('UK 8')
  const [selectedColor, setSelectedColor] = useState('')
  const [quickViewProduct, setQuickViewProduct] = useState<EliteProduct | null>(null)
  const [quickViewSize, setQuickViewSize] = useState('UK 8')
  const [cart, setCart] = useState<EliteCartLine[]>([])
  const [wishlist, setWishlist] = useState<string[]>(['aerion-carbon-01'])
  const [cartOpen, setCartOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mobileNavOpen, setMobileNavOpen] = useState(false)
  const [notice, setNotice] = useState('')

  const totalCartCount = useMemo(() => cart.reduce((sum, line) => sum + line.quantity, 0), [cart])
  const cartSubtotal = useMemo(() => cart.reduce((sum, line) => sum + line.product.price * line.quantity, 0), [cart])

  const filteredProducts = useMemo(() => {
    let result = ELITE_PRODUCTS
    if (activeFilter === 'Men' || activeFilter === 'Women') {
      result = result.filter((product) => product.gender === activeFilter || product.gender === 'Unisex')
    } else if (activeFilter === 'Performance' || activeFilter === 'Footwear' || activeFilter === 'Accessories') {
      result = result.filter((product) => product.category === activeFilter)
    } else if (activeFilter === 'New Collection') {
      result = result.slice(0, 4)
    } else if (activeFilter === 'Wishlist') {
      result = result.filter((product) => wishlist.includes(product.id))
    }
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase()
      result = result.filter((product) => `${product.name} ${product.category} ${product.technology} ${product.description}`.toLowerCase().includes(q))
    }
    return result
  }, [activeFilter, searchQuery, wishlist])

  const liveSearchResults = useMemo(() => {
    if (!searchQuery.trim()) return []
    const q = searchQuery.trim().toLowerCase()
    return ELITE_PRODUCTS.filter((product) =>
      `${product.name} ${product.category} ${product.technology}`.toLowerCase().includes(q)
    ).slice(0, 4)
  }, [searchQuery])

  const openProduct = (product: EliteProduct) => {
    setSelectedProduct(product)
    setSelectedSize(defaultSize(product))
    setSelectedColor(product.color)
    setView('product')
    setMobileNavOpen(false)
    setQuickViewProduct(null)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openQuickView = (product: EliteProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setQuickViewProduct(product)
    setQuickViewSize(defaultSize(product))
  }

  const addToCart = (product: EliteProduct, size = selectedSize, color = selectedColor || product.color, quantity = 1) => {
    setCart((current) => {
      const match = current.find((line) => line.product.id === product.id && line.size === size && line.color === color)
      return match
        ? current.map((line) => (line === match ? { ...line, quantity: line.quantity + quantity } : line))
        : [...current, { product, size, color, quantity }]
    })
    setNotice(`✓ ${product.name} added to your bag`)
    setCartOpen(true)
  }

  const updateCartQuantity = (index: number, delta: number) => {
    setCart((current) => {
      const target = current[index]
      if (!target) return current
      const nextQty = target.quantity + delta
      if (nextQty <= 0) {
        return current.filter((_, i) => i !== index)
      }
      return current.map((item, i) => (i === index ? { ...item, quantity: nextQty } : item))
    })
  }

  const removeCartItem = (index: number) => {
    setCart((current) => current.filter((_, i) => i !== index))
  }

  const navigate = (filter: string) => {
    setActiveFilter(filter)
    setSearchQuery('')
    setView('collection')
    setMobileNavOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const toggleWishlist = (product: EliteProduct, e?: React.MouseEvent) => {
    if (e) e.stopPropagation()
    setWishlist((current) => {
      const exists = current.includes(product.id)
      if (exists) {
        setNotice(`Removed ${product.name} from wishlist`)
        return current.filter((id) => id !== product.id)
      }
      setNotice(`♥ Saved ${product.name} to wishlist`)
      return [...current, product.id]
    })
  }

  const productCard = (product: EliteProduct, index: number) => {
    const isSaved = wishlist.includes(product.id)
    return (
      <article className="el-product-card" key={product.id}>
        <div className="el-product-photo" onClick={() => openProduct(product)} role="button" tabIndex={0} aria-label={`View ${product.name}`}>
          {product.badge && <span className="el-product-badge">{product.badge}</span>}
          <img src={product.image} alt={product.name} loading={index > 2 ? 'lazy' : 'eager'} />
          <img className="el-product-alternate" src={product.alternateImage} alt="" loading="lazy" />
          
          <button
            type="button"
            className="el-card-quick-add-btn"
            onClick={(e) => openQuickView(product, e)}
            title="Quick view & select size"
          >
            + Quick View
          </button>

          <span className="el-product-open" aria-hidden="true">
            VIEW PIECE <span>↗</span>
          </span>
        </div>

        <button
          type="button"
          className={`el-product-wishlist ${isSaved ? 'is-saved' : ''}`}
          aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          onClick={(e) => toggleWishlist(product, e)}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={isSaved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <div className="el-product-meta">
          <span className="el-meta-category">{product.category.toUpperCase()}</span>
          <div className="el-meta-price-row">
            <span className="el-meta-price">{formatPrice(product.price)}</span>
            {product.compareAtPrice && <del className="el-meta-compare-price">{formatPrice(product.compareAtPrice)}</del>}
          </div>
        </div>

        <button className="el-product-title" onClick={() => openProduct(product)}>
          {product.name}
        </button>

        <div className="el-product-card-footer">
          <div className="el-product-rating">
            <span className="el-star">★</span>
            <span>{product.rating.toFixed(1)}</span>
            <small>({product.reviewCount})</small>
          </div>
          <span className="el-color-swatch-dot" style={{ backgroundColor: product.colorHex }} title={product.color} />
        </div>
      </article>
    )
  }

  return (
    <div
      className="elite-sport"
      data-device-view={deviceView}
      style={customAccentColor ? ({ '--el-olive': customAccentColor, '--el-accent': customAccentColor } as React.CSSProperties) : undefined}
    >
      {/* Optional Preview Bar when rendered in marketplace modal */}
      {onBack && (
        <div className="el-preview-back-bar">
          <button onClick={onBack} className="el-preview-back-btn" aria-label="Back to marketplace">
            ← Back to Marketplace
          </button>
          {onUseTemplate && (
            <button
              onClick={() => onUseTemplate('sports-elitesport')}
              className="el-preview-use-btn"
            >
              Use EliteSport Template →
            </button>
          )}
        </div>
      )}

      {/* Top Micro Store Announcement Ticker */}
      <div className="el-store-announcement-bar">
        <span>⚡ NEW DROP: AERION CARBON 01 • FREE EXPRESS DELIVERY OVER ₹999 • 30-DAY RETURNS</span>
      </div>

      {/* Main Storefront Header */}
      <header className={`el-header ${view === 'home' ? 'el-header-over-hero' : ''}`}>
        <button
          className="el-menu-toggle"
          aria-label={mobileNavOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setMobileNavOpen((open) => !open)}
        >
          {mobileNavOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
        </button>

        <button
          className="el-logo"
          onClick={() => {
            setView('home')
            setActiveFilter('Collections')
          }}
          aria-label="EliteSport home"
        >
          ELITE<span>SPORT</span><sup>®</sup>
        </button>

        <nav className="el-main-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <button key={item} onClick={() => navigate(item)}>
              {item}
            </button>
          ))}
        </nav>

        <div className="el-header-tools">
          <button
            type="button"
            aria-label="Search Collection"
            className="el-tool-icon-btn"
            onClick={() => setSearchOpen((open) => !open)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <small>Search</small>
          </button>

          <button
            type="button"
            aria-label="Account"
            className="el-tool-icon-btn el-d-none-mobile"
            onClick={() => setNotice('Member portal access is active.')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            <small>Account</small>
          </button>

          <button
            type="button"
            aria-label="Wishlist"
            className="el-tool-icon-btn"
            onClick={() => navigate('Wishlist')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill={wishlist.length ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <small>Wishlist</small>
            {Boolean(wishlist.length) && <sup className="el-badge-count">{wishlist.length}</sup>}
          </button>

          <button
            type="button"
            aria-label="Shopping Cart Bag"
            className="el-tool-icon-btn el-cart-bag-btn"
            onClick={() => setCartOpen(true)}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <small>Bag</small>
            {Boolean(totalCartCount) && <sup className="el-badge-count el-bag-badge">{totalCartCount}</sup>}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileNavOpen && (
        <div className="el-mobile-menu-backdrop" onClick={() => setMobileNavOpen(false)}>
          <div className="el-mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="el-mobile-menu-head">
              <span>COLLECTIONS / 2025</span>
              <button className="el-mobile-close-btn" onClick={() => setMobileNavOpen(false)} aria-label="Close menu">
                ✕
              </button>
            </div>
            <div className="el-mobile-nav-list">
              {navItems.map((item) => (
                <button key={item} onClick={() => navigate(item)}>
                  {item}
                  <span>↗</span>
                </button>
              ))}
            </div>
            <div className="el-mobile-quick-actions">
              <button
                type="button"
                onClick={() => {
                  setMobileNavOpen(false)
                  setSearchOpen(true)
                }}
              >
                ⌕ Search Products
              </button>
              <button type="button" onClick={() => navigate('Wishlist')}>
                ♥ Saved ({wishlist.length})
              </button>
            </div>
            <div className="el-mobile-concierge-row">
              <span>NEED ADVICE?</span>
              <button onClick={() => setNotice('Concierge: concierge@elitesport.com')}>Chat with Gear Specialist ↗</button>
            </div>
            <p className="el-mobile-motto">ENGINEERED FOR EXCELLENCE · EST. 2025</p>
          </div>
        </div>
      )}

      {/* Interactive Search Modal / Drawer */}
      {searchOpen && (
        <div className="el-search-overlay-backdrop" onClick={() => { setSearchOpen(false); setSearchQuery('') }}>
          <div className="el-search-panel" onClick={(e) => e.stopPropagation()}>
            <div className="el-search-head">
              <span className="el-search-label">SEARCH THE ELITESPORT CATALOG</span>
              <button
                type="button"
                className="el-search-close-btn"
                onClick={() => {
                  setSearchOpen(false)
                  setSearchQuery('')
                }}
              >
                CLOSE ✕
              </button>
            </div>

            <div className="el-search-input-row">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                id="el-search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product, sport, technology..."
                autoFocus
              />
              {searchQuery && (
                <button type="button" className="el-search-clear" onClick={() => setSearchQuery('')}>
                  ✕
                </button>
              )}
            </div>

            {/* Trending Suggestion Pills */}
            <div className="el-search-suggestions">
              <span className="el-suggest-title">POPULAR SEARCHES:</span>
              <div className="el-suggest-pills">
                {['Aerion Carbon 01', 'Altitude Shell', 'Form Knit', 'Court Arc Pro', 'Track Pant', 'Pace Vest'].map((term) => (
                  <button key={term} type="button" onClick={() => setSearchQuery(term)}>
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Instant Search Results */}
            {searchQuery.trim() && (
              <div className="el-search-results-tray">
                <span className="el-results-count">{liveSearchResults.length} matching pieces found</span>
                <div className="el-search-results-list">
                  {liveSearchResults.map((prod) => (
                    <div key={prod.id} className="el-search-item" onClick={() => { openProduct(prod); setSearchOpen(false) }}>
                      <img src={prod.image} alt={prod.name} />
                      <div className="el-search-item-info">
                        <strong>{prod.name}</strong>
                        <span>{prod.category} · {prod.technology.split('·')[0]}</span>
                        <b>{formatPrice(prod.price)}</b>
                      </div>
                      <button
                        type="button"
                        className="el-search-item-add"
                        onClick={(e) => {
                          e.stopPropagation()
                          addToCart(prod, defaultSize(prod), prod.color)
                        }}
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                  {liveSearchResults.length === 0 && (
                    <p className="el-search-empty">No pieces found matching &ldquo;{searchQuery}&rdquo;. Try another term or explore all collections.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* HOME VIEW */}
      {view === 'home' && (
        <main>
          {/* Hero Section */}
          <section className="el-hero">
            <img className="el-hero-image" src={image('photo-1461896836934-ffe607ba8211', 2000)} alt="Athlete running on track" />
            <div className="el-hero-wash" />
            <div className="el-hero-copy">
              <span className="el-overline">PERFORMANCE, CONSIDERED / 01</span>
              <h1>
                ENGINEERED<br />
                <em>FOR EXCELLENCE</em>
              </h1>
              <p>Elevated equipment for movement without compromise.</p>
              <div className="el-hero-cta-cluster">
                <button className="el-hero-main-btn" onClick={() => navigate('New Collection')}>
                  DISCOVER COLLECTION <span>↗</span>
                </button>
                <div className="el-hero-stat-chip">
                  <span className="el-stat-dot" />
                  <span>120+ Performance Pieces · 178g Carbon Plate</span>
                </div>
              </div>
            </div>
            <span className="el-hero-caption">DESIGNED FOR THE PURSUIT</span>
            <span className="el-hero-index">01 — 04</span>
          </section>

          {/* Quick Categories Horizontal Pill Bar */}
          <section className="el-quick-categories-bar" aria-label="Product Categories">
            <div className="el-quick-cat-scroll">
              {['All', 'Footwear', 'Performance', 'Accessories', 'New Collection', 'Men', 'Women'].map((cat) => (
                <button
                  key={cat}
                  className={`el-cat-pill ${activeFilter === (cat === 'All' ? 'Collections' : cat) ? 'active' : ''}`}
                  onClick={() => navigate(cat === 'All' ? 'Collections' : cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </section>

          {/* New Collection Section */}
          <section className="el-new-collection el-section-shell">
            <div className="el-section-intro">
              <span className="el-overline">THE NEW COLLECTION / 01</span>
              <h2>
                Form follows<br />
                <em>forward.</em>
              </h2>
              <p>Precision pieces for the hours that matter. Thoughtful construction, a quieter expression.</p>
              <button className="el-underlined-link" onClick={() => navigate('New Collection')}>
                EXPLORE THE COLLECTION <span>↗</span>
              </button>
            </div>
            <div className="el-new-products">
              {ELITE_PRODUCTS.slice(0, 4).map(productCard)}
            </div>
          </section>

          {/* Performance Feature Section */}
          <section className="el-performance">
            <div className="el-performance-image">
              <img src={image('photo-1517836357463-d25dfeac3438', 1500)} alt="Focused athlete" />
              <span>PERFORMANCE / 02</span>
            </div>
            <div className="el-performance-copy">
              <span className="el-overline">A STUDY IN MOVEMENT</span>
              <h2>
                Beyond<br />
                the limits<br />
                <em>of ordinary.</em>
              </h2>
              <p>Purpose-built layers and footwear that adapt to the demands of training, competition and recovery.</p>
              <button className="el-underlined-link" onClick={() => navigate('Performance')}>
                SHOP PERFORMANCE <span>↗</span>
              </button>
            </div>
          </section>

          {/* Editorial Section */}
          <section className="el-editorial el-section-shell">
            <div className="el-editorial-image">
              <img src={image('photo-1476480862126-209bfaa8edc8', 1400)} alt="Athlete training early morning" />
              <span>FIELD NOTES / 008</span>
            </div>
            <div className="el-editorial-copy">
              <span className="el-overline">THE EDITORIAL / 03</span>
              <h2>
                Quiet focus.<br />
                <em>Clear intent.</em>
              </h2>
              <p>We spoke with the athletes who find their edge in the details: an early start, a familiar route, the right kit and the discipline to return.</p>
              <button className="el-underlined-link" onClick={() => setNotice('The full editorial is available in the Journal.')}>
                READ THE STORY <span>↗</span>
              </button>
              <span className="el-editorial-credit">A CONVERSATION ON THE ART OF SHOWING UP</span>
            </div>
          </section>

          {/* Innovation Pillars */}
          <section className="el-innovation">
            <div className="el-innovation-heading">
              <span className="el-overline">MATERIAL, MEASURED / 04</span>
              <h2>
                Technology<br />
                with <em>purpose.</em>
              </h2>
              <p>Every advancement earns its place. These are the principles behind the performance.</p>
            </div>
            <div className="el-innovation-list">
              <article onClick={() => navigate('Footwear')}>
                <span>01</span>
                <div>
                  <h3>ENERGY RETURN</h3>
                  <p>Responsive foam compounds return momentum with a stable, composed ride.</p>
                </div>
                <b>↗</b>
              </article>
              <article onClick={() => navigate('Performance')}>
                <span>02</span>
                <div>
                  <h3>ADAPTIVE KNIT</h3>
                  <p>Engineered yarn mapping creates targeted support and natural ventilation.</p>
                </div>
                <b>↗</b>
              </article>
              <article onClick={() => navigate('Collections')}>
                <span>03</span>
                <div>
                  <h3>RESPONSIBLE MATERIALS</h3>
                  <p>Recycled fibres and durable construction, chosen to extend every product&apos;s useful life.</p>
                </div>
                <b>↗</b>
              </article>
            </div>
          </section>

          {/* Exclusive Edition Capsule */}
          <section className="el-exclusive">
            <img src={image('photo-1544923246-77307dd654cb', 1800)} alt="Technical outerwear" />
            <div className="el-exclusive-copy">
              <span className="el-overline">THE EXCLUSIVE EDITION / 05</span>
              <h2>
                Made for<br />
                <em>the ascent.</em>
              </h2>
              <p>A limited technical capsule. Refined protection, considered down to the last seam.</p>
              <button onClick={() => openProduct(ELITE_PRODUCTS[1])}>
                DISCOVER ALTITUDE <span>↗</span>
              </button>
            </div>
            <span className="el-exclusive-note">LIMITED RELEASE · 01 OF 250</span>
          </section>

          {/* Journal Section: Horizontal Swipeable Rail */}
          <section className="el-journal el-section-shell">
            <div className="el-journal-header">
              <div>
                <span className="el-overline">THE ELITE JOURNAL / 06</span>
                <h2>
                  Ideas in<br />
                  <em>motion.</em>
                </h2>
              </div>
              <button className="el-underlined-link" onClick={() => setNotice('Journal archive is updated weekly.')}>
                VIEW THE JOURNAL <span>↗</span>
              </button>
            </div>
            <div className="el-journal-grid">
              <article>
                <img src={image('photo-1538805060514-97d9cc17730c', 900)} alt="Early morning running" />
                <span>TRAINING · 06 MIN</span>
                <h3>The value of a measured start</h3>
                <button onClick={() => setNotice('Opening article: The value of a measured start')}>READ ARTICLE ↗</button>
              </article>
              <article>
                <img src={image('photo-1552674605-db6ffd4facb5', 900)} alt="Trail athlete" />
                <span>FIELD NOTES · 04 MIN</span>
                <h3>Finding rhythm in the open air</h3>
                <button onClick={() => setNotice('Opening article: Finding rhythm in the open air')}>READ ARTICLE ↗</button>
              </article>
              <article>
                <img src={image('photo-1517836357463-d25dfeac3438', 900)} alt="Deliberate form training" />
                <span>IN PRACTICE · 08 MIN</span>
                <h3>Strength as a practice in patience</h3>
                <button onClick={() => setNotice('Opening article: Strength as a practice in patience')}>READ ARTICLE ↗</button>
              </article>
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="el-newsletter">
            <div>
              <span className="el-overline">A NOTE FROM THE FIELD / 07</span>
              <h2>
                Stay in<br />
                <em>your element.</em>
              </h2>
              <p>New releases, considered training notes, and stories worth the pause. Sent occasionally.</p>
            </div>
            <form onSubmit={(e) => { e.preventDefault(); setNotice('You are subscribed to the EliteSport list. Thank you.') }}>
              <label htmlFor="el-email">YOUR EMAIL ADDRESS</label>
              <div>
                <input id="el-email" type="email" placeholder="name@example.com" required />
                <button type="submit" aria-label="Subscribe to EliteSport journal">↗</button>
              </div>
              <small>By subscribing, you agree to receive occasional notes from EliteSport.</small>
            </form>
          </section>
        </main>
      )}

      {/* COLLECTION VIEW */}
      {view === 'collection' && (
        <main className="el-collection el-section-shell">
          <div className="el-collection-heading">
            <span className="el-overline">ELITESPORT / THE PERFORMANCE COLLECTION</span>
            <h1>{activeFilter === 'Collections' ? 'The Collection' : activeFilter}</h1>
            <p>Considered equipment for movement without compromise.</p>
          </div>
          <div className="el-collection-filters">
            {['Collections', 'Men', 'Women', 'Performance', 'Footwear', 'Accessories', 'New Collection', 'Wishlist'].map((filter) => (
              <button
                key={filter}
                className={activeFilter === filter ? 'is-active' : ''}
                onClick={() => setActiveFilter(filter)}
              >
                {filter === 'Wishlist' ? `Saved (${wishlist.length})` : filter}
              </button>
            ))}
          </div>
          <div className="el-collection-grid">
            {filteredProducts.map(productCard)}
          </div>
          {filteredProducts.length === 0 && (
            <div className="el-empty-collection">
              <p className="el-empty-msg">No equipment found matching this selection.</p>
              <button type="button" className="el-empty-btn" onClick={() => setActiveFilter('Collections')}>
                View All Pieces ↗
              </button>
            </div>
          )}
        </main>
      )}

      {/* PRODUCT DETAILS VIEW */}
      {view === 'product' && selectedProduct && (
        <main className="el-product-page el-section-shell">
          <button className="el-back-link" onClick={() => setView('collection')}>
            ← BACK TO COLLECTION
          </button>
          <div className="el-product-detail">
            <div className="el-gallery">
              <img className="el-gallery-primary" src={selectedProduct.image} alt={selectedProduct.name} />
              <img src={selectedProduct.alternateImage} alt={`${selectedProduct.name}, alternate angle`} />
              <span className="el-gallery-edition">ES / 01</span>
            </div>
            <div className="el-product-info">
              <span className="el-overline">{selectedProduct.category.toUpperCase()} / ELITESPORT EQUIPMENT</span>
              <h1>{selectedProduct.name}</h1>
              <div className="el-product-price-line">
                <span className="el-price">{formatPrice(selectedProduct.price)}</span>
                {selectedProduct.compareAtPrice && <del className="el-compare-price">{formatPrice(selectedProduct.compareAtPrice)}</del>}
                <small className="el-tax-tag">INCL. ALL TAXES</small>
              </div>
              <div className="el-detail-rule" />

              <label className="el-control-label">
                COLOUR <span>{selectedColor || selectedProduct.color}</span>
              </label>
              <button
                className="el-color-option active"
                aria-label={`Selected color ${selectedColor || selectedProduct.color}`}
                style={{ '--el-swatch': selectedProduct.colorHex } as React.CSSProperties}
                onClick={() => setSelectedColor(selectedProduct.color)}
              />

              <label className="el-control-label el-size-label">
                SELECT SIZE{' '}
                <button type="button" onClick={() => setNotice('Fit is true to size. Choose your standard measurement.')}>
                  SIZE &amp; FIT GUIDE
                </button>
              </label>
              <div className="el-size-options">
                {selectedProduct.sizes.map((size) => (
                  <button
                    className={selectedSize === size ? 'is-selected' : ''}
                    key={size}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>

              <div className="el-technology">
                <span className="el-overline">ENGINEERED SPECIFICATION</span>
                <p>{selectedProduct.technology}</p>
              </div>

              <p className="el-description">{selectedProduct.description}</p>

              <div className="el-shipping">
                <span>✓ COMPLIMENTARY EXPRESS DELIVERY</span>
                <span>✓ 30-DAY HASSLE-FREE RETURNS</span>
              </div>

              <button className="el-add-button" onClick={() => addToCart(selectedProduct)}>
                ADD TO BAG <span>{formatPrice(selectedProduct.price)} ↗</span>
              </button>
              <button
                className="el-buy-button"
                onClick={() => {
                  addToCart(selectedProduct)
                  setNotice('Your secure checkout is ready.')
                }}
              >
                BUY NOW WITH 1-CLICK CHECKOUT
              </button>

              <div className="el-product-story">
                <span className="el-overline">THE THINKING BEHIND THE PIECE</span>
                <p>{selectedProduct.story}</p>
              </div>
            </div>
          </div>

          <section className="el-related">
            <div>
              <span className="el-overline">COMPLETE THE KIT</span>
              <h2>Considered <em>companions.</em></h2>
            </div>
            <div className="el-collection-grid">
              {ELITE_PRODUCTS.filter((product) => product.id !== selectedProduct.id).slice(0, 4).map(productCard)}
            </div>
          </section>

          {/* Sticky Mobile Add-to-Bag Bar */}
          <button
            className="el-mobile-sticky-add"
            onClick={() => addToCart(selectedProduct)}
          >
            <span>ADD TO BAG · {formatPrice(selectedProduct.price)}</span>
            <span>↗</span>
          </button>
        </main>
      )}

      {/* QUICK VIEW POPOVER MODAL */}
      {quickViewProduct && (
        <div className="el-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="el-quickview-dialog" onClick={(e) => e.stopPropagation()}>
            <button className="el-quickview-close" onClick={() => setQuickViewProduct(null)}>✕</button>
            <div className="el-quickview-media">
              <img src={quickViewProduct.image} alt={quickViewProduct.name} />
            </div>
            <div className="el-quickview-body">
              <span className="el-overline">{quickViewProduct.category.toUpperCase()}</span>
              <h3>{quickViewProduct.name}</h3>
              <p className="el-price">{formatPrice(quickViewProduct.price)}</p>
              <p className="el-quickview-desc">{quickViewProduct.description}</p>
              <div className="el-size-options">
                {quickViewProduct.sizes.map((s) => (
                  <button key={s} className={quickViewSize === s ? 'is-selected' : ''} onClick={() => setQuickViewSize(s)}>
                    {s}
                  </button>
                ))}
              </div>
              <button
                className="el-add-button"
                onClick={() => {
                  addToCart(quickViewProduct, quickViewSize, quickViewProduct.color)
                  setQuickViewProduct(null)
                }}
              >
                ADD TO BAG <span>{formatPrice(quickViewProduct.price)} ↗</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SHOPIFY-STYLE CART DRAWER WITH FREE SHIPPING PROGRESS */}
      {cartOpen && (
        <div className="el-overlay" onClick={() => setCartOpen(false)}>
          <aside className="el-cart-panel" onClick={(e) => e.stopPropagation()}>
            <div className="el-cart-heading">
              <div>
                <span className="el-overline">YOUR SELECTED EQUIPMENT</span>
                <h2>Shopping bag <small>({totalCartCount})</small></h2>
              </div>
              <button aria-label="Close shopping bag" className="el-cart-close-btn" onClick={() => setCartOpen(false)}>
                ✕
              </button>
            </div>

            {/* Free Shipping Progress Indicator */}
            <div className="el-cart-shipping-bar">
              {cartSubtotal >= FREE_SHIPPING_THRESHOLD ? (
                <div className="el-shipping-unlocked">
                  <span>🎉</span>
                  <span>You have unlocked <strong>FREE Express Delivery</strong>!</span>
                </div>
              ) : (
                <div className="el-shipping-progress-info">
                  <span>Add <strong>₹{FREE_SHIPPING_THRESHOLD - cartSubtotal}</strong> more to get <strong>FREE Express Delivery</strong></span>
                  <div className="el-shipping-track">
                    <div
                      className="el-shipping-fill"
                      style={{ width: `${Math.min(100, Math.round((cartSubtotal / FREE_SHIPPING_THRESHOLD) * 100))}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {cart.length > 0 ? (
              <>
                <div className="el-cart-lines">
                  {cart.map((line, index) => (
                    <article key={`${line.product.id}-${line.size}-${line.color}-${index}`}>
                      <img src={line.product.image} alt={line.product.name} />
                      <div className="el-cart-item-detail">
                        <b>{line.product.name}</b>
                        <span className="el-cart-item-variant">{line.color} · {line.size}</span>
                        <span className="el-cart-item-price">{formatPrice(line.product.price * line.quantity)}</span>
                        <div className="el-cart-qty-stepper">
                          <button type="button" onClick={() => updateCartQuantity(index, -1)} aria-label="Decrease quantity">−</button>
                          <span>{line.quantity}</span>
                          <button type="button" onClick={() => updateCartQuantity(index, 1)} aria-label="Increase quantity">+</button>
                        </div>
                      </div>
                      <button
                        className="el-cart-item-remove"
                        aria-label={`Remove ${line.product.name}`}
                        onClick={() => removeCartItem(index)}
                      >
                        ✕
                      </button>
                    </article>
                  ))}
                </div>

                <div className="el-cart-footer">
                  <div className="el-cart-subtotal-row">
                    <span>SUBTOTAL</span>
                    <b>{formatPrice(cartSubtotal)}</b>
                  </div>
                  <div className="el-cart-meta-row">
                    <span>Shipping</span>
                    <span className="el-green-text">FREE</span>
                  </div>
                  <div className="el-cart-meta-row">
                    <span>Taxes</span>
                    <span>Included</span>
                  </div>

                  <button
                    className="el-add-button el-checkout-cta"
                    onClick={() => setNotice('Checkout API module connecting... Secure portal initialized.')}
                  >
                    PROCEED TO CHECKOUT <span>🔒</span>
                  </button>

                  <div className="el-cart-trust-row">
                    <span>🛡️ 256-Bit SSL</span>
                    <span>⚡ Dispatch 24h</span>
                    <span>🔄 30-Day Returns</span>
                  </div>

                  <button className="el-cart-continue-link" onClick={() => setCartOpen(false)}>
                    ← Or Continue Shopping
                  </button>
                </div>
              </>
            ) : (
              <div className="el-empty-cart-state">
                <span className="el-empty-icon">👜</span>
                <h3>Your bag is currently empty</h3>
                <p>Discover high-performance layers and shoes built for movement without compromise.</p>
                <button
                  type="button"
                  className="el-empty-explore-btn"
                  onClick={() => {
                    setCartOpen(false)
                    navigate('Collections')
                  }}
                >
                  Explore The Collection ↗
                </button>
              </div>
            )}
          </aside>
        </div>
      )}

      {/* Toast Notification */}
      {notice && (
        <button className="el-toast" onClick={() => setNotice('')}>
          <span>{notice}</span>
          <span className="el-toast-close">✕</span>
        </button>
      )}

      {/* Main Footer */}
      <footer className="el-footer">
        <div className="el-footer-main">
          <button
            className="el-logo"
            onClick={() => {
              setView('home')
              setActiveFilter('Collections')
            }}
          >
            ELITE<span>SPORT</span><sup>®</sup>
          </button>
          <p>
            ENGINEERED<br />
            FOR EXCELLENCE
          </p>
          <div>
            <span className="el-overline">FOLLOW THE PURSUIT</span>
            <button onClick={() => setNotice('Instagram: @elitesport')}>INSTAGRAM ↗</button>
            <button onClick={() => setNotice('Contact: concierge@elitesport.com')}>CONTACT CONCIERGE ↗</button>
          </div>
        </div>

        <div className="el-footer-payments-row">
          <span className="el-payment-badge">UPI</span>
          <span className="el-payment-badge">VISA</span>
          <span className="el-payment-badge">MASTERCARD</span>
          <span className="el-payment-badge">APPLE PAY</span>
          <span className="el-payment-badge">NET BANKING</span>
        </div>

        <div className="el-footer-bottom">
          <span>© ELITESPORT {new Date().getFullYear()}</span>
          <span>PERFORMANCE, CONSIDERED.</span>
          <button onClick={() => setNotice('Privacy and terms policies available online.')}>
            PRIVACY &amp; TERMS
          </button>
        </div>
      </footer>
    </div>
  )
}
export default EliteSportStorefront