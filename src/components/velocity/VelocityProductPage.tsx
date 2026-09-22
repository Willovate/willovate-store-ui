import React, { useState } from 'react'
import type {
  VelocityProduct,
  VelocityColor,
} from './types'
import { VelocityProductCard } from './VelocityProductCard'

interface VelocityProductPageProps {
  product: VelocityProduct
  allProducts: VelocityProduct[]
  wishlist: Set<string>
  onToggleWishlist: (productId: string) => void
  onAddToCart: (product: VelocityProduct, size: string, color: VelocityColor, qty: number) => void
  onBuyNow: (product: VelocityProduct, size: string, color: VelocityColor, qty: number) => void
  onOpenSizeGuide: () => void
  onSelectProduct: (product: VelocityProduct) => void
  onNavigateHome: () => void
  onNavigateCategory: (category: VelocityProduct['category']) => void
}

export const VelocityProductPage: React.FC<VelocityProductPageProps> = ({
  product,
  allProducts,
  wishlist,
  onToggleWishlist,
  onAddToCart,
  onBuyNow,
  onOpenSizeGuide,
  onSelectProduct,
  onNavigateHome,
  onNavigateCategory,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState<VelocityColor>(product.colors[0])
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'M')
  const [quantity, setQuantity] = useState(1)
  const [postalInput, setPostalInput] = useState('')
  const [deliveryResult, setDeliveryResult] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews' | 'delivery'>('specs')
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 })
  const [isAdding, setIsAdding] = useState(false)

  const isWishlisted = wishlist.has(product.id)
  const hasDiscount = product.compareAtPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  // Zoom image handler
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setZoomPos({ x, y })
  }

  const handlePostalCheck = (e: React.FormEvent) => {
    e.preventDefault()
    if (postalInput.trim()) {
      setDeliveryResult('⚡ Express Delivery Available: Estimated delivery in 2 business days.')
    }
  }

  const handleAdd = () => {
    setIsAdding(true)
    onAddToCart(product, selectedSize, selectedColor, quantity)
    setTimeout(() => setIsAdding(false), 800)
  }

  const handleBuy = () => {
    onBuyNow(product, selectedSize, selectedColor, quantity)
  }

  // Related products from same sport or category
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.sport === product.sport || p.category === product.category))
    .slice(0, 4)

  // Recently viewed
  const recentlyViewed = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 3)

  return (
    <div className="velocity-pdp-page">
      <div className="velocity-container">
        {/* 1. Breadcrumbs */}
        <nav className="pdp-breadcrumbs" aria-label="Breadcrumbs">
          <button type="button" onClick={onNavigateHome}>Home</button>
          <span className="crumb-sep">/</span>
          <button type="button" onClick={() => onNavigateCategory(product.category)}>
            {product.category}
          </button>
          <span className="crumb-sep">/</span>
          <span className="current-crumb">{product.name}</span>
        </nav>

        {/* 2. Main PDP Grid: Gallery (Left) + Details (Right) */}
        <div className="pdp-main-grid">
          {/* Gallery Column */}
          <div className="pdp-gallery-col">
            <div
              className="pdp-main-image-display"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                className={`pdp-hero-image ${isZoomed ? 'is-zoomed' : ''}`}
                style={
                  isZoomed
                    ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%`, transform: 'scale(1.7)' }
                    : undefined
                }
              />

              {/* Badges Overlay */}
              <div className="pdp-badges-overlay">
                {product.badge && <span className="card-badge volt-badge">{product.badge}</span>}
                {hasDiscount && <span className="card-badge discount-badge">−{discountPercent}%</span>}
              </div>

              <div className="zoom-hint">
                <span>🔍 Hover to Zoom</span>
              </div>
            </div>

            {/* Thumbnail Carousel */}
            {product.images.length > 1 && (
              <div className="pdp-thumbnails-strip">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`pdp-thumb-card ${activeImageIndex === idx ? 'is-active' : ''}`}
                    onClick={() => setActiveImageIndex(idx)}
                    aria-label={`View image angle ${idx + 1}`}
                  >
                    <img src={img} alt={`Angle ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Purchase Column */}
          <div className="pdp-details-col">
            <div className="pdp-brand-row">
              <span className="pdp-brand-name">{product.brand}</span>
              <span className="pdp-sport-badge">{product.sport} // PRO SERIES</span>
            </div>

            <h1 className="pdp-product-title">{product.name}</h1>

            {/* Rating Stars & Review Count */}
            <div className="pdp-ratings-bar">
              <div className="stars-cluster">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`star-icon ${i < Math.floor(product.rating) ? 'is-filled' : ''}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <span className="pdp-rating-number">{product.rating}</span>
              <a href="#reviews" className="pdp-reviews-anchor" onClick={() => setActiveTab('reviews')}>
                {product.reviewCount} Verified Athlete Reviews
              </a>
            </div>

            {/* Pricing Stack */}
            <div className="pdp-price-stack">
              <span className="pdp-current-price">${product.price}</span>
              {hasDiscount && (
                <del className="pdp-compare-price">${product.compareAtPrice}</del>
              )}
              {hasDiscount && (
                <span className="pdp-savings-badge">
                  Save ${product.compareAtPrice - product.price} ({discountPercent}% OFF)
                </span>
              )}
            </div>

            <div className="pdp-installment-note">
              <span>Or 4 interest-free payments of <strong>${(product.price / 4).toFixed(2)}</strong> with Klarna / Afterpay</span>
            </div>

            <hr className="pdp-divider" />

            {/* Color Swatches */}
            <div className="pdp-option-block">
              <div className="option-label-row">
                <span className="option-label">Colorway:</span>
                <strong className="option-val-text">{selectedColor.name}</strong>
              </div>
              <div className="pdp-colors-swatches">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    type="button"
                    className={`pdp-swatch-circle ${selectedColor.name === color.name ? 'is-selected' : ''}`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => setSelectedColor(color)}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selector + Size Guide Link */}
            <div className="pdp-option-block">
              <div className="option-label-row">
                <span className="option-label">Select Size:</span>
                <button
                  type="button"
                  className="size-guide-modal-trigger"
                  onClick={onOpenSizeGuide}
                >
                  📏 Size Guide & Sizing Chart
                </button>
              </div>

              <div className="pdp-sizes-grid">
                {product.sizes.map((sz, idx) => (
                  <button
                    key={sz}
                    type="button"
                    className={`pdp-size-btn ${selectedSize === sz ? 'is-selected' : ''}`}
                    onClick={() => setSelectedSize(sz)}
                  >
                    <span>{sz}</span>
                    {idx === 0 && <span className="size-stock-tag">Low Stock</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector & Primary Actions */}
            <div className="pdp-actions-container">
              <div className="pdp-qty-wrapper">
                <button
                  type="button"
                  className="qty-adjust-btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="qty-val">{quantity}</span>
                <button
                  type="button"
                  className="qty-adjust-btn"
                  onClick={() => setQuantity(quantity + 1)}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className={`pdp-add-to-cart-btn volt-btn ${isAdding ? 'is-added' : ''}`}
                onClick={handleAdd}
              >
                {isAdding ? '✓ Added to Shopping Bag' : `Add to Bag • $${product.price * quantity}`}
              </button>

              <button
                type="button"
                className={`pdp-wishlist-toggle-btn ${isWishlisted ? 'is-active' : ''}`}
                onClick={() => onToggleWishlist(product.id)}
                aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill={isWishlisted ? '#ccff00' : 'none'} stroke={isWishlisted ? '#ccff00' : 'currentColor'} strokeWidth="2">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
              </button>
            </div>

            {/* Instant Buy Now Button */}
            <button
              type="button"
              className="pdp-buy-now-btn"
              onClick={handleBuy}
            >
              Buy Now with Instant Express Checkout
            </button>

            {/* Postal Delivery Checker */}
            <div className="pdp-delivery-box">
              <span className="del-box-title">📍 Check Delivery & Store Availability</span>
              <form className="postal-check-form" onSubmit={handlePostalCheck}>
                <input
                  type="text"
                  placeholder="Enter postal code / zip code..."
                  value={postalInput}
                  onChange={(e) => setPostalInput(e.target.value)}
                  className="postal-input"
                />
                <button type="submit" className="postal-check-btn">
                  Check
                </button>
              </form>
              {deliveryResult && <span className="delivery-res-msg">{deliveryResult}</span>}
            </div>

            {/* Trust Perks List */}
            <div className="pdp-perks-list">
              <div className="perk-item">
                <span>⚡</span>
                <p><strong>Free Express Delivery:</strong> On all orders over $150 worldwide</p>
              </div>
              <div className="perk-item">
                <span>🔄</span>
                <p><strong>30-Day Road-Test Trial:</strong> Run or train in it. 100% money back if not satisfied</p>
              </div>
              <div className="perk-item">
                <span>🛡️</span>
                <p><strong>2-Year Laboratory Warranty:</strong> Authentic Velocity certified craftsmanship</p>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Expandable Technical Tabs: Description, Specs, Reviews, Delivery */}
        <div className="pdp-tabs-section" id="reviews">
          <div className="pdp-tabs-nav">
            <button
              type="button"
              className={`pdp-tab-nav-btn ${activeTab === 'specs' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Laboratory Specifications & Engineering
            </button>
            <button
              type="button"
              className={`pdp-tab-nav-btn ${activeTab === 'reviews' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Athlete Reviews ({product.reviews.length})
            </button>
            <button
              type="button"
              className={`pdp-tab-nav-btn ${activeTab === 'delivery' ? 'is-active' : ''}`}
              onClick={() => setActiveTab('delivery')}
            >
              Shipping & 30-Day Guarantee
            </button>
          </div>

          <div className="pdp-tab-content-panel">
            {activeTab === 'specs' && (
              <div className="specs-panel-grid">
                <div className="desc-left-col">
                  <h3>DESIGN PHILOSOPHY</h3>
                  <p className="full-description">{product.description}</p>
                  
                  <h4>KEY PERFORMANCE HIGHLIGHTS</h4>
                  <ul className="features-bullets-list">
                    {product.features.map((feat, i) => (
                      <li key={i}>
                        <span className="bullet-check">✓</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="specs-right-col">
                  <h3>TECHNICAL METRICS</h3>
                  <div className="specs-table-wrapper">
                    <table className="specs-data-table">
                      <tbody>
                        {product.specs.map((spec, i) => (
                          <tr key={i}>
                            <td className="spec-label">{spec.label}</td>
                            <td className="spec-value">{spec.value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="reviews-panel-wrapper">
                <div className="reviews-summary-card">
                  <div className="overall-score-box">
                    <span className="score-big">{product.rating}</span>
                    <div className="stars-cluster">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span key={i} className="star-icon is-filled">★</span>
                      ))}
                    </div>
                    <span className="based-on-text">Based on {product.reviewCount} customer ratings</span>
                  </div>

                  <div className="rating-bars-list">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="rating-bar-row">
                        <span className="stars-tag">{stars} Stars</span>
                        <div className="progress-track">
                          <div
                            className="progress-fill"
                            style={{
                              width: stars === 5 ? '85%' : stars === 4 ? '12%' : '3%',
                            }}
                          />
                        </div>
                        <span className="pct-tag">{stars === 5 ? '85%' : stars === 4 ? '12%' : '3%'}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="reviews-list-stack">
                  {product.reviews.map((rev) => (
                    <div key={rev.id} className="review-card-item">
                      <div className="review-head-line">
                        <div className="stars-cluster">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <span key={i} className="star-icon is-filled">★</span>
                          ))}
                        </div>
                        <span className="rev-date">{rev.date}</span>
                      </div>
                      <h4 className="rev-title">{rev.title}</h4>
                      <p className="rev-content">{rev.content}</p>
                      <div className="rev-author-bar">
                        <strong>{rev.author}</strong>
                        {rev.verified && <span className="verified-chip">✓ Verified Athlete</span>}
                        {rev.sport && <span className="sport-chip">{rev.sport}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="delivery-panel-wrapper">
                <div className="delivery-cards-grid">
                  <div className="del-card">
                    <h4>FAST GLOBAL DISPATCH</h4>
                    <p>All orders placed before 14:00 CET are packed and dispatched from our Zurich or regional hubs the same day. Tracking is emailed instantly.</p>
                  </div>
                  <div className="del-card">
                    <h4>30-DAY ATHLETE TRIAL</h4>
                    <p>Unlike standard fashion stores, we encourage you to actually run and train in our footwear and apparel. If you don’t feel the performance boost, return for a full refund.</p>
                  </div>
                  <div className="del-card">
                    <h4>FREE RETURNS & EXCHANGES</h4>
                    <p>Pre-printed prepaid return labels are included in every shipment. Free size exchanges dispatched immediately upon return scan.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 4. Related Products Carousel */}
        {relatedProducts.length > 0 && (
          <div className="pdp-related-section">
            <div className="section-head-row">
              <div>
                <span className="section-kicker">COMPLETE YOUR KIT</span>
                <h2 className="section-title">COMPATIBLE PERFORMANCE GEAR</h2>
              </div>
            </div>

            <div className="products-grid-4">
              {relatedProducts.map((prod) => (
                <VelocityProductCard
                  key={prod.id}
                  product={prod}
                  isWishlisted={wishlist.has(prod.id)}
                  onToggleWishlist={onToggleWishlist}
                  onQuickAdd={(p, s, c) => onAddToCart(p, s || p.sizes[0], c || p.colors[0], 1)}
                  onQuickView={(p) => onSelectProduct(p)}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          </div>
        )}

        {/* 5. Recently Viewed Bar */}
        {recentlyViewed.length > 0 && (
          <div className="pdp-recently-viewed-section">
            <h3 className="recently-viewed-title">RECENTLY VIEWED GEAR</h3>
            <div className="recently-viewed-row">
              {recentlyViewed.map((prod) => (
                <div
                  key={prod.id}
                  className="recent-card"
                  onClick={() => onSelectProduct(prod)}
                >
                  <img src={prod.images[0]} alt={prod.name} />
                  <div>
                    <h4>{prod.name}</h4>
                    <span>${prod.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

