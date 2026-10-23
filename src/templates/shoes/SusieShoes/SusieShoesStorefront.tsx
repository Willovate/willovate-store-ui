import React, { useState } from 'react'
import type {
  SusieShoesStorefrontProps,
  SusieKidsShoeProduct,
  SusieCartItem,
} from './types'
import {
  SUSIE_HERO_SLIDES,
  SUSIE_COLLAGE_CATEGORIES,
  SUSIE_CENTER_COLLAGE_IMAGE,
  SUSIE_KIDS_PRODUCTS,
  SUSIE_FEATURE_CARDS,
  SUSIE_TESTIMONIALS,
  SUSIE_BLOG_POSTS,
  SUSIE_SERVICE_BADGES,
  SUSIE_RECENT_DROPS,
} from './data/susieShoesData'
import {
  StorefrontSearchModal,
  StorefrontWishlistDrawer,
  StorefrontAccountModal,
  StorefrontMobileNavDrawer,
  type MobileNavItem,
} from '../../../components/templates/StorefrontModals'
import { StorefrontProductDetailPage } from '../../../components/templates/StorefrontProductDetailPage'
import './styles/susieShoes.css'

export const SusieShoesStorefront: React.FC<SusieShoesStorefrontProps> = ({
  template,
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
  const [selectedProduct, setSelectedProduct] = useState<SusieKidsShoeProduct | null>(null)
  const [currency, setCurrency] = useState<'USD' | 'INR'>('USD')
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0)
  const [activeCategoryTab, setActiveCategoryTab] = useState<'All' | 'Girls' | 'Boys' | 'Toddler' | 'Baby'>('All')
  const [cartItems, setCartItems] = useState<SusieCartItem[]>([
    {
      product: SUSIE_KIDS_PRODUCTS[0],
      quantity: 1,
      selectedSize: 'Kids 8',
    },
  ])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isWishlistOpen, setIsWishlistOpen] = useState(false)
  const [isAccountOpen, setIsAccountOpen] = useState(false)
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false)
  const [wishlist, setWishlist] = useState<string[]>([])
  const [quickViewProduct, setQuickViewProduct] = useState<SusieKidsShoeProduct | null>(null)
  const [selectedSize, setSelectedSize] = useState<string>('Kids 8')
  const [toastMessage, setToastMessage] = useState<string | null>(null)

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

  const navItems: MobileNavItem[] = [
    {
      label: 'Home',
      children: [
        { label: 'Kids Hero Droplist', onClick: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { label: 'Color Play Collection', onClick: () => { const el = document.getElementById('susie-collage-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Collection',
      children: [
        { label: 'Girls Collection', onClick: () => { setActiveCategoryTab('Girls'); const el = document.getElementById('susie-bestsellers-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Boys Collection', onClick: () => { setActiveCategoryTab('Boys'); const el = document.getElementById('susie-bestsellers-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Toddler Shoes', onClick: () => { setActiveCategoryTab('Toddler'); const el = document.getElementById('susie-bestsellers-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Baby Soft Steps', onClick: () => { setActiveCategoryTab('Baby'); const el = document.getElementById('susie-bestsellers-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Shop',
      children: [
        { label: 'Best Sellers', onClick: () => { setActiveCategoryTab('All'); const el = document.getElementById('susie-bestsellers-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Recent Drops', onClick: () => { const el = document.getElementById('susie-recent-drops'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
    {
      label: 'Pages',
      children: [
        { label: 'Parent Reviews', onClick: () => { const el = document.getElementById('susie-testimonials-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
        { label: 'Kids Foot Care Blog', onClick: () => { const el = document.getElementById('susie-blog-section'); el?.scrollIntoView({ behavior: 'smooth' }) } },
      ],
    },
  ]

  const showToast = (msg: string) => {
    setToastMessage(msg)
    setTimeout(() => setToastMessage(null), 3000)
  }

  const handleAddToCart = (product: SusieKidsShoeProduct, size = 'Kids 8') => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      }
      return [...prev, { product, quantity: 1, selectedSize: size }]
    })
    showToast(`Added ${product.name} to cart!`)
  }

  const handleUpdateQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const nextQty = item.quantity + delta
            return nextQty > 0 ? { ...item, quantity: nextQty } : null
          }
          return item
        })
        .filter(Boolean) as SusieCartItem[]
    )
  }

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )

  const formatPrice = (usdAmount: number) => {
    if (currency === 'INR') {
      return `₹${Math.round(usdAmount * 83).toLocaleString('en-IN')}`
    }
    return `$${usdAmount.toFixed(2)}`
  }

  const filteredProducts =
    activeCategoryTab === 'All'
      ? SUSIE_KIDS_PRODUCTS
      : SUSIE_KIDS_PRODUCTS.filter((p) => p.category === activeCategoryTab)

  const activeHero = SUSIE_HERO_SLIDES[currentSlideIndex]

  const nextHero = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % SUSIE_HERO_SLIDES.length)
  }
  const prevHero = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + SUSIE_HERO_SLIDES.length) % SUSIE_HERO_SLIDES.length)
  }

  return (
    <div
      className={`susie-root device-${effectiveDevice}`}
      style={
        customAccentColor
          ? ({ '--susie-pink': customAccentColor } as React.CSSProperties)
          : undefined
      }
    >
      {/* 1. TOP HEADER */}
      <header className="susie-top-header">
        {/* Mobile Hamburger Button */}
        <button
          type="button"
          className="susie-hamburger-btn wv-mobile-hamburger-btn"
          onClick={() => setIsMobileNavOpen(true)}
          title="Menu"
          aria-label="Open mobile menu"
        >
          <span className="wv-mobile-hamburger-bar" />
          <span className="wv-mobile-hamburger-bar" />
          <span className="wv-mobile-hamburger-bar" />
        </button>

        <a href="#home" className="susie-logo-link">
          <div className="susie-bunny-avatar">🐰</div>
          <div className="susie-logo-brand">
            <span className="susie-logo-title">Susie</span>
            <span className="susie-logo-subtitle">Kids Shoes</span>
          </div>
        </a>

        <div className="susie-header-right">
          <button
            type="button"
            className="wv-mobile-action-btn susie-header-action"
            aria-label="Search"
            onClick={() => setIsSearchOpen(true)}
            title="Search shoes"
          >
            <span>🔍</span>
          </button>
          <button
            type="button"
            className="wv-mobile-action-btn susie-header-action"
            aria-label="Wishlist"
            onClick={() => setIsWishlistOpen(true)}
            title="Wishlist"
            style={{ position: 'relative' }}
          >
            <span>🤍</span>
            {wishlist.length > 0 && (
              <span className="wv-mobile-badge-counter wv-badge-count">{wishlist.length}</span>
            )}
          </button>
          <button
            type="button"
            className="susie-header-action susie-account-btn"
            aria-label="User Account"
            onClick={() => setIsAccountOpen(true)}
            title="Account"
          >
            <span>👤</span>
          </button>
          <div className="susie-header-action susie-currency-wrap" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
            <span>{currency === 'USD' ? '🇺🇸' : '🇮🇳'}</span>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value as 'USD' | 'INR')}
              style={{ background: 'transparent', color: 'inherit', border: 'none', cursor: 'pointer', outline: 'none', fontWeight: 600, fontSize: '12px' }}
              aria-label="Currency selector"
            >
              <option value="USD" style={{ color: '#000' }}>USD ($)</option>
              <option value="INR" style={{ color: '#000' }}>INR (₹)</option>
            </select>
          </div>
          <button
            type="button"
            className="wv-mobile-action-btn susie-cart-icon-btn"
            onClick={() => setIsCartOpen(true)}
            title="Shopping Cart"
            style={{ position: 'relative' }}
          >
            <span>🛍️</span>
            {cartCount > 0 && <span className="wv-mobile-badge-counter">{cartCount}</span>}
            <span className="susie-cart-text">{cartCount} Item{cartCount !== 1 ? 's' : ''}</span>
          </button>
        </div>
      </header>

      {/* 2. HOT PINK NAVIGATION BAR */}
      <nav className="susie-nav-bar">
        <div className="susie-nav-links">
          {navItems.map((item) => (
            <div key={item.label} className="wv-nav-dropdown-wrap">
              <span
                className="susie-nav-link"
                onClick={() => {
                  if (item.children && item.children.length > 0) {
                    item.children[0].onClick?.()
                  } else {
                    item.onClick?.()
                  }
                }}
              >
                {item.label} {item.children ? '▾' : ''}
              </span>
              {item.children && (
                <div className="wv-desktop-dropdown">
                  {item.children.map((sub) => (
                    <div
                      key={sub.label}
                      className="wv-desktop-dropdown-item"
                      onClick={(e) => {
                        e.stopPropagation()
                        sub.onClick?.()
                      }}
                    >
                      {sub.label}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

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
            reviewsCount: selectedProduct.reviewCount || 38,
            inStock: true,
            sku: `SUSIE-${selectedProduct.id.toUpperCase()}`,
            gallery: [selectedProduct.image],
            colors: ['#ff4081', '#38bdf8', '#fbbf24'],
            sizes: selectedProduct.sizes || ['Toddler 5', 'Toddler 6', 'Kids 7', 'Kids 8', 'Kids 9'],
            specs: {
              Gender: selectedProduct.category,
              Closure: 'Easy-Strap Hook & Loop Velcro',
              Material: 'Non-Toxic Breathable Canvas & Mesh',
              Sole: 'Anti-Slip Flexible Rubber Grip',
            },
            features: [
              'Extra wide toe box for natural foot growth',
              'Easy on/off hook-and-loop closure kids can do themselves',
              'Cushioned orthopedic arch support',
              'Machine washable easy-care materials',
            ],
          }}
          brandName="Susie Shoes"
          accentColor={customAccentColor || '#ff4081'}
          currencyPrefix={currency === 'USD' ? '$' : '₹'}
          formatPrice={(p) => formatPrice(p)}
          relatedProducts={SUSIE_KIDS_PRODUCTS
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
              handleAddToCart(selectedProduct, sz || 'Kids 8')
            }
          }}
          onBuyNow={(_prod, _col, sz, qty) => {
            for (let i = 0; i < (qty || 1); i++) {
              handleAddToCart(selectedProduct, sz || 'Kids 8')
            }
            setIsCartOpen(true)
            showToast('Instant checkout initiated!')
          }}
          onToggleWishlist={(id) => toggleWishlist(id)}
          isWishlisted={wishlist.includes(selectedProduct.id)}
        />
      ) : (
        <>
          {/* 3. HERO SLIDER */}
          <section className="susie-hero-stage">
        <div className="susie-hero-bg-watermark">{activeHero.tagline}</div>

        <div className="susie-hero-container">
          <div className="susie-hero-img-wrap">
            <img
              src={activeHero.image}
              alt={activeHero.title}
              className="susie-hero-img"
            />
          </div>

          <div className="susie-hero-card">
            <span className="susie-hero-tag">{activeHero.tagline}</span>
            <h1 className="susie-hero-title">{activeHero.title}</h1>
            <p className="susie-hero-cursive">{activeHero.cursiveSubtitle}</p>
            <p className="susie-hero-desc">{activeHero.description}</p>
            <a href="#shop" className="susie-hero-btn">
              {activeHero.buttonText}
            </a>
          </div>
        </div>

        <button
          type="button"
          className="susie-hero-arrow susie-arrow-prev"
          onClick={prevHero}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button
          type="button"
          className="susie-hero-arrow susie-arrow-next"
          onClick={nextHero}
          aria-label="Next slide"
        >
          ›
        </button>
      </section>

      {/* 4. COLLAGE CATEGORIES (5 Colorful Boxes + Center Photo) */}
      <section className="susie-collage-section">
        <div className="susie-collage-grid">
          {/* Top Left: Little Walkers */}
          <a
            href={SUSIE_COLLAGE_CATEGORIES[0].link}
            className="susie-collage-box"
            style={{ backgroundColor: SUSIE_COLLAGE_CATEGORIES[0].bgColor }}
          >
            <div className="susie-box-content">
              <h3 className="susie-box-title">{SUSIE_COLLAGE_CATEGORIES[0].title}</h3>
              <p className="susie-box-subtitle">{SUSIE_COLLAGE_CATEGORIES[0].subtitle}</p>
              <span className="susie-box-btn">{SUSIE_COLLAGE_CATEGORIES[0].btnText}</span>
            </div>
            <img
              src={SUSIE_COLLAGE_CATEGORIES[0].image}
              alt={SUSIE_COLLAGE_CATEGORIES[0].title}
              className="susie-box-img"
            />
          </a>

          {/* Center Tall Card */}
          <div className="susie-collage-center">
            <img
              src={SUSIE_CENTER_COLLAGE_IMAGE}
              alt="Kids Footwear Showcase"
              className="susie-center-img"
            />
          </div>

          {/* Top Right: School Days */}
          <a
            href={SUSIE_COLLAGE_CATEGORIES[2].link}
            className="susie-collage-box"
            style={{ backgroundColor: SUSIE_COLLAGE_CATEGORIES[2].bgColor }}
          >
            <div className="susie-box-content">
              <h3 className="susie-box-title">{SUSIE_COLLAGE_CATEGORIES[2].title}</h3>
              <p className="susie-box-subtitle">{SUSIE_COLLAGE_CATEGORIES[2].subtitle}</p>
              <span className="susie-box-btn">{SUSIE_COLLAGE_CATEGORIES[2].btnText}</span>
            </div>
            <img
              src={SUSIE_COLLAGE_CATEGORIES[2].image}
              alt={SUSIE_COLLAGE_CATEGORIES[2].title}
              className="susie-box-img"
            />
          </a>

          {/* Bottom Left: Sporty Kicks */}
          <a
            href={SUSIE_COLLAGE_CATEGORIES[1].link}
            className="susie-collage-box"
            style={{ backgroundColor: SUSIE_COLLAGE_CATEGORIES[1].bgColor }}
          >
            <div className="susie-box-content">
              <h3 className="susie-box-title">{SUSIE_COLLAGE_CATEGORIES[1].title}</h3>
              <p className="susie-box-subtitle">{SUSIE_COLLAGE_CATEGORIES[1].subtitle}</p>
              <span className="susie-box-btn">{SUSIE_COLLAGE_CATEGORIES[1].btnText}</span>
            </div>
            <img
              src={SUSIE_COLLAGE_CATEGORIES[1].image}
              alt={SUSIE_COLLAGE_CATEGORIES[1].title}
              className="susie-box-img"
            />
          </a>

          {/* Bottom Right: Party Glitter */}
          <a
            href={SUSIE_COLLAGE_CATEGORIES[3].link}
            className="susie-collage-box"
            style={{ backgroundColor: SUSIE_COLLAGE_CATEGORIES[3].bgColor }}
          >
            <div className="susie-box-content">
              <h3 className="susie-box-title">{SUSIE_COLLAGE_CATEGORIES[3].title}</h3>
              <p className="susie-box-subtitle">{SUSIE_COLLAGE_CATEGORIES[3].subtitle}</p>
              <span className="susie-box-btn">{SUSIE_COLLAGE_CATEGORIES[3].btnText}</span>
            </div>
            <img
              src={SUSIE_COLLAGE_CATEGORIES[3].image}
              alt={SUSIE_COLLAGE_CATEGORIES[3].title}
              className="susie-box-img"
            />
          </a>
        </div>
      </section>

      {/* 5. PROMOTION HURRY BANNER */}
      <section className="susie-promo-section">
        <p className="susie-promo-badge">
          PROMOTION <span>SALE OFF 50%</span>
        </p>
        <h2 className="susie-promo-hurry">HURRY</h2>
        <a href="#sale" className="susie-promo-btn">
          SHOP NOW
        </a>
      </section>

      {/* 6. BEST SELLERS KIDS SHOES GRID */}
      <section id="susie-bestsellers-section" style={{ maxWidth: 1240, margin: '40px auto' }}>
        <div className="susie-section-header">
          <h2 className="susie-section-title">Best Sellers For Kids</h2>
          <p className="susie-section-subtitle">
            Comfortable, orthopedic arch support and playground-durable footwear
          </p>
          <div className="susie-tabs-row">
            {(['All', 'Girls', 'Boys', 'Toddler', 'Baby'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                className={`susie-tab-btn ${activeCategoryTab === tab ? 'active' : ''}`}
                onClick={() => setActiveCategoryTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="susie-products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="susie-product-card" style={{ position: 'relative' }}>
              <button
                type="button"
                className={`wv-card-wish-btn ${wishlist.includes(product.id) ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation()
                  toggleWishlist(product.id)
                }}
                title={wishlist.includes(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                aria-label="Toggle Wishlist"
              >
                {wishlist.includes(product.id) ? '❤️' : '🤍'}
              </button>
              {product.badge && <span className="susie-prod-badge">{product.badge}</span>}

              <div
                className="susie-prod-img-wrap"
                onClick={() => {
                  setQuickViewProduct(product)
                  setSelectedSize(product.sizes?.[0] || 'Kids 8')
                }}
              >
                <img src={product.image} alt={product.name} className="susie-prod-img" />
              </div>

              <h3
                className="susie-prod-title"
                onClick={() => {
                  setQuickViewProduct(product)
                  setSelectedSize(product.sizes?.[0] || 'Kids 8')
                }}
              >
                {product.name}
              </h3>

              <div className="susie-prod-rating">
                {'★'.repeat(Math.floor(product.rating))} ({product.reviewCount})
              </div>

              <div className="susie-prod-price-row">
                <div>
                  <span className="susie-price-num">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="susie-compare-price">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    type="button"
                    className="susie-add-cart-btn"
                    onClick={() => handleAddToCart(product)}
                    aria-label="Add to cart"
                    title="Add to cart"
                  >
                    🛍️
                  </button>
                  <button
                    type="button"
                    className="susie-add-cart-btn"
                    style={{ background: '#f1f5f9', color: '#0f172a' }}
                    onClick={() => {
                      setQuickViewProduct(product)
                      setSelectedSize(product.sizes?.[0] || 'Kids 8')
                    }}
                    aria-label="Quick view"
                    title="View Product Details"
                  >
                    👁️
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. THREE COLORFUL FEATURE CARDS */}
      <section className="susie-features-section">
        <div className="susie-features-grid">
          {SUSIE_FEATURE_CARDS.map((card) => (
            <div key={card.id} className={`susie-feature-card ${card.colorTheme}`}>
              <div className="susie-feat-img-wrap">
                <img src={card.image} alt={card.title} className="susie-feat-img" />
              </div>
              <div className="susie-feat-body">
                <h3 className="susie-feat-title">{card.title}</h3>
                <p className="susie-feat-desc">{card.description}</p>
                <a href="#explore" className="susie-feat-btn">
                  {card.buttonText} →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="susie-testimonials-section">
        <div className="susie-section-header">
          <h2 className="susie-section-title">What Parents Say About Our Shoes</h2>
          <p className="susie-section-subtitle">Real experiences from happy families worldwide</p>
        </div>

        <div className="susie-testimonials-grid">
          {SUSIE_TESTIMONIALS.map((test) => (
            <div key={test.id} className="susie-test-card">
              <img src={test.avatar} alt={test.name} className="susie-test-avatar" />
              <div style={{ color: '#f59e0b', fontSize: 16 }}>{'★'.repeat(test.rating)}</div>
              <p className="susie-test-quote">"{test.quote}"</p>
              <div>
                <h4 className="susie-test-name">{test.name}</h4>
                <span className="susie-test-role">{test.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. SERVICE BADGES */}
      <section className="susie-service-badges-section">
        <div className="susie-service-grid">
          {SUSIE_SERVICE_BADGES.map((svc) => (
            <div key={svc.title} className="susie-svc-item">
              <span className="susie-svc-icon">{svc.icon}</span>
              <div>
                <h4 className="susie-svc-title">{svc.title}</h4>
                <p className="susie-svc-desc">{svc.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. BLOG & SHOE CARE TIPS */}
      <section className="susie-blog-section">
        <div className="susie-section-header">
          <h2 className="susie-section-title">Parenting & Little Feet Guide</h2>
          <p className="susie-section-subtitle">Expert foot health advice, sizing tips, and play ideas</p>
        </div>

        <div className="susie-blog-grid">
          {SUSIE_BLOG_POSTS.map((post) => (
            <div key={post.id} className="susie-blog-card">
              <img src={post.image} alt={post.title} className="susie-blog-img" />
              <div className="susie-blog-body">
                <span className="susie-blog-date">{post.date}</span>
                <h3 className="susie-blog-title">{post.title}</h3>
                <p className="susie-blog-excerpt">{post.excerpt}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. RECENT DROPS BANNER */}
      <section style={{ background: '#fdf2f8', padding: '50px 36px', margin: '40px 0' }}>
        <div style={{ maxWidth: 1240, margin: '0 auto' }}>
          <div className="susie-section-header">
            <h2 className="susie-section-title">New Little Steps Releases</h2>
            <p className="susie-section-subtitle">Fresh season drops for active girls and boys</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {SUSIE_RECENT_DROPS.map((drop) => (
              <div
                key={drop.id}
                style={{
                  background: '#ffffff',
                  padding: 12,
                  borderRadius: 12,
                  textAlign: 'center',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
                }}
              >
                <img
                  src={drop.image}
                  alt={drop.name}
                  style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8, marginBottom: 8 }}
                />
                <h4 style={{ fontSize: 13, fontWeight: 800, margin: '0 0 4px' }}>{drop.name}</h4>
                <span style={{ color: 'var(--susie-pink)', fontWeight: 900, fontSize: 14 }}>
                  {formatPrice(drop.price)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
        </>
      )}

      {/* 12. PLAYFUL FOOTER */}
      <footer className="susie-footer">
        <div className="susie-footer-doodle-strip">🐰 👟 🌈 🎈 🧸 🚀</div>

        <div className="susie-footer-newsletter">
          <h3>Join The Susie Kids Club</h3>
          <p>Get 15% off your first kids shoes order plus birthday surprises!</p>
          <form
            className="susie-newsletter-form"
            onSubmit={(e) => {
              e.preventDefault()
              showToast('Welcome to Susie Kids Club! Enjoy 15% off!')
            }}
          >
            <input
              type="email"
              placeholder="Enter your email address..."
              required
              className="susie-news-input"
            />
            <button type="submit" className="susie-news-btn">Subscribe</button>
          </form>
        </div>

        <div className="susie-footer-grid">
          <div className="susie-footer-col blue">
            <h4>Girls Footwear</h4>
            <ul className="susie-footer-links">
              <li><a href="#ballerinas">Party Ballerinas</a></li>
              <li><a href="#rainbow-kicks">Rainbow Kicks</a></li>
              <li><a href="#glitter-flats">Glitter Mary Janes</a></li>
              <li><a href="#toddler-boots">Soft Sole Booties</a></li>
            </ul>
          </div>
          <div className="susie-footer-col green">
            <h4>Boys Footwear</h4>
            <ul className="susie-footer-links">
              <li><a href="#light-up">Light-Up Trainers</a></li>
              <li><a href="#adventure-sneakers">Adventure Sneakers</a></li>
              <li><a href="#school-shoes">Scuff-Proof School Shoes</a></li>
              <li><a href="#water-sandals">Water Sandal Clogs</a></li>
            </ul>
          </div>
          <div className="susie-footer-col magenta">
            <h4>Customer Care</h4>
            <ul className="susie-footer-links">
              <li><a href="#sizing">Kids Printable Shoe Sizer</a></li>
              <li><a href="#track">Track Package</a></li>
              <li><a href="#shipping">Shipping & Returns</a></li>
              <li><a href="#podiatrist">Pediatric Foot Advice</a></li>
            </ul>
          </div>
          <div className="susie-footer-col yellow">
            <h4>About Susie</h4>
            <ul className="susie-footer-links">
              <li><a href="#story">Our Little Feet Mission</a></li>
              <li><a href="#sustainability">Eco-Friendly Materials</a></li>
              <li><a href="#stores">Boutique Locations</a></li>
              <li><a href="#contact">Contact Support</a></li>
            </ul>
          </div>
        </div>

        <div className="susie-footer-bottom">
          <p>© 2026 Susie Kids Shoes Inc. Made with love for happy growing feet.</p>
          <div style={{ display: 'flex', gap: 8 }}>
            <span>💳 VISA</span>
            <span>💳 MASTERCARD</span>
            <span>💳 PAYPAL</span>
            <span>💳 APPLE PAY</span>
          </div>
        </div>
      </footer>

      {/* 13. CART DRAWER */}
      {isCartOpen && (
        <div className="susie-drawer-overlay" onClick={() => setIsCartOpen(false)}>
          <div className="susie-drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="susie-drawer-head">
              <h3>Kids Shoe Bag ({cartCount})</h3>
              <button
                type="button"
                className="susie-drawer-close"
                onClick={() => setIsCartOpen(false)}
              >
                ✕
              </button>
            </div>

            <div className="susie-drawer-items">
              {cartItems.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: '#6b7280' }}>
                  <p style={{ fontSize: 40, margin: '0 0 10px' }}>👟</p>
                  <p>Your shoe bag is currently empty.</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.product.id} className="susie-drawer-item">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="susie-drawer-item-img"
                    />
                    <div className="susie-drawer-item-info">
                      <h4 className="susie-drawer-item-title">{item.product.name}</h4>
                      <p className="susie-drawer-item-price">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <button
                          type="button"
                          style={{
                            width: 24,
                            height: 24,
                            border: '1px solid #d1d5db',
                            background: '#fff',
                            borderRadius: 4,
                            cursor: 'pointer',
                          }}
                          onClick={() => handleUpdateQty(item.product.id, -1)}
                        >
                          -
                        </button>
                        <span style={{ fontSize: 13, fontWeight: 700 }}>{item.quantity}</span>
                        <button
                          type="button"
                          style={{
                            width: 24,
                            height: 24,
                            border: '1px solid #d1d5db',
                            background: '#fff',
                            borderRadius: 4,
                            cursor: 'pointer',
                          }}
                          onClick={() => handleUpdateQty(item.product.id, 1)}
                        >
                          +
                        </button>
                        <span style={{ fontSize: 11, color: '#6b7280', marginLeft: 'auto' }}>
                          Size: {item.selectedSize || 'Kids 8'}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="susie-drawer-foot">
              <div className="susie-drawer-subtotal">
                <span>Subtotal</span>
                <span style={{ color: 'var(--susie-pink)' }}>{formatPrice(cartSubtotal)}</span>
              </div>
              <button
                type="button"
                className="susie-drawer-checkout-btn"
                onClick={() => {
                  onUseTemplate?.(template?.id || 'shoes-susie')
                  showToast('Proceeding to checkout with Susie Kids Shoes!')
                }}
              >
                CHECKOUT ({formatPrice(cartSubtotal)})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 14. QUICK VIEW MODAL */}
      {quickViewProduct && (
        <div className="susie-qv-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="susie-qv-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="susie-qv-close"
              onClick={() => setQuickViewProduct(null)}
            >
              ✕
            </button>

            <div className="susie-qv-img-wrap">
              <img
                src={quickViewProduct.image}
                alt={quickViewProduct.name}
                className="susie-qv-img"
              />
            </div>

            <div className="susie-qv-details">
              <h3 className="susie-qv-title">{quickViewProduct.name}</h3>
              <div className="susie-qv-price">{formatPrice(quickViewProduct.price)}</div>
              <p className="susie-qv-desc">{quickViewProduct.description}</p>

              <div style={{ marginBottom: 20 }}>
                <label style={{ fontSize: 12, fontWeight: 700, color: '#6b7280', display: 'block', marginBottom: 8 }}>
                  Select Child Size:
                </label>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {(quickViewProduct.sizes || ['Toddler 5', 'Toddler 6', 'Kids 7', 'Kids 8', 'Kids 9']).map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`susie-size-pill ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
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
                  className="susie-qv-cart-btn"
                  onClick={() => {
                    handleAddToCart(quickViewProduct, selectedSize)
                    setQuickViewProduct(null)
                  }}
                >
                  🛍️ Add to Shoe Bag
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <StorefrontSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={[...SUSIE_KIDS_PRODUCTS, ...SUSIE_RECENT_DROPS].map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category,
        }))}
        onSelectProduct={(p) => {
          const fullProd = [...SUSIE_KIDS_PRODUCTS, ...SUSIE_RECENT_DROPS].find((x) => x.id === p.id)
          if (fullProd) {
            setSelectedProduct(fullProd)
            setViewMode('pdp')
            setIsSearchOpen(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }}
        accentColor={customAccentColor || '#ff2d87'}
        currencyPrefix={currency === 'INR' ? '₹' : '$'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
        placeholder="Search kids sneakers, light-up shoes, boots..."
        popularTags={['Girls', 'Boys', 'Toddler', 'Baby']}
      />

      {/* Wishlist Drawer */}
      <StorefrontWishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistIds={wishlist}
        allProducts={[...SUSIE_KIDS_PRODUCTS, ...SUSIE_RECENT_DROPS].map((p) => ({
          id: p.id,
          name: p.name,
          price: p.price,
          originalPrice: p.originalPrice,
          image: p.image,
          category: p.category,
        }))}
        currencyPrefix={currency === 'INR' ? '₹' : '$'}
        formatPrice={(p) => (typeof p === 'number' ? formatPrice(p) : String(p))}
        onRemoveWishlist={toggleWishlist}
        onAddToCart={(p) => {
          const fullProd = [...SUSIE_KIDS_PRODUCTS, ...SUSIE_RECENT_DROPS].find((x) => x.id === p.id)
          if (fullProd) handleAddToCart(fullProd)
        }}
        onOpenProduct={(p) => {
          const fullProd = [...SUSIE_KIDS_PRODUCTS, ...SUSIE_RECENT_DROPS].find((x) => x.id === p.id)
          if (fullProd) {
            setSelectedProduct(fullProd)
            setViewMode('pdp')
            setIsWishlistOpen(false)
            window.scrollTo({ top: 0, behavior: 'smooth' })
          }
        }}
        accentColor={customAccentColor || '#ff2d87'}
      />

      {/* Account Modal */}
      <StorefrontAccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        brandName="Susie Shoes"
        accentColor={customAccentColor || '#ff2d87'}
      />

      {/* Mobile Navigation Drawer */}
      <StorefrontMobileNavDrawer
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        brandName="Susie Shoes"
        navItems={navItems}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        cartCount={cartCount}
        contactPhone="+1 (800) 999-SUSIE"
        contactEmail="hello@susieshoes.com"
        accentColor={customAccentColor || '#ff2d87'}
      />

      {/* TOAST NOTIFICATION */}
      {toastMessage && <div className="susie-toast">{toastMessage}</div>}
    </div>
  )
}
