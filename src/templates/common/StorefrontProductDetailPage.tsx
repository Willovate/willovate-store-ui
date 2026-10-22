import React, { useState, useMemo } from 'react'
import './storefrontModals.css'

export interface StorefrontPDPProduct {
  id: string
  name: string
  price: number | string
  originalPrice?: number | string
  compareAtPrice?: number | string
  category?: string
  image?: string
  images?: string[]
  gallery?: string[]
  description?: string
  story?: string
  subtitle?: string
  rating?: number
  reviewCount?: number
  reviewsCount?: number
  badge?: string
  sizes?: (string | number)[]
  availableSizes?: (string | number)[]
  colors?: ({ name: string; hex?: string } | string)[]
  metalOptions?: string[]
  ingredients?: string
  material?: string
  specs?: { label: string; value: string }[] | Record<string, any>
  features?: string[]
  howToUse?: string
  sku?: string
  inStock?: boolean
}

export interface StorefrontProductDetailPageProps {
  product: StorefrontPDPProduct
  onBack: () => void
  onAddToCart: (product: any, optionsOrColor?: any, size?: any, quantity?: any) => void
  onBuyNow?: (product: any, optionsOrColor?: any, size?: any, quantity?: any) => void
  onToggleWishlist?: (productId: string) => void
  isWishlisted?: boolean
  currencyPrefix?: string
  formatPrice?: (price: any) => string
  brandName?: string
  accentColor?: string
  relatedProducts?: StorefrontPDPProduct[]
  onSelectRelated?: (product: StorefrontPDPProduct) => void
}

export const StorefrontProductDetailPage: React.FC<StorefrontProductDetailPageProps> = ({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted = false,
  currencyPrefix = '$',
  formatPrice,
  brandName = 'Store',
  accentColor = '#111827',
  relatedProducts = [],
  onSelectRelated,
}) => {
  const images = (product.images && product.images.length > 0)
    ? product.images
    : (product.gallery && product.gallery.length > 0)
    ? product.gallery
    : product.image
    ? [product.image]
    : []

  const [activeImage, setActiveImage] = useState(images[0] || product.image || '')
  const [selectedSize, setSelectedSize] = useState<string>(() => {
    const s = product.sizes || product.availableSizes
    return s && s.length > 0 ? String(s[0]) : ''
  })
  const [selectedColor, setSelectedColor] = useState<string>(() => {
    if (product.colors && product.colors.length > 0) {
      const c = product.colors[0]
      return typeof c === 'string' ? c : c.name
    }
    if (product.metalOptions && product.metalOptions.length > 0) {
      return product.metalOptions[0]
    }
    return ''
  })
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews' | 'shipping'>('details')

  const formatPriceFn = (price: any) => {
    if (formatPrice) return formatPrice(price)
    if (typeof price === 'number') return `${currencyPrefix}${price.toFixed(2)}`
    return String(price)
  }

  const rating = product.rating || 4.9
  const reviewCount = product.reviewCount || product.reviewsCount || 36
  const numPrice = typeof product.price === 'string' ? parseFloat(product.price.replace(/[^0-9.]/g, '')) || 0 : product.price
  const original = product.originalPrice || product.compareAtPrice
  const numOriginal = original ? (typeof original === 'string' ? parseFloat(original.replace(/[^0-9.]/g, '')) : original) : undefined

  const normalizedSpecs = useMemo(() => {
    if (!product.specs) return []
    if (Array.isArray(product.specs)) return product.specs
    return Object.entries(product.specs).map(([label, value]) => ({
      label,
      value: String(value),
    }))
  }, [product.specs])

  return (
    <div className="wv-pdp-root">
      <div className="wv-pdp-container">
        {/* Top Breadcrumb & Return Bar */}
        <div className="wv-pdp-nav-bar">
          <button type="button" className="wv-pdp-back-button" onClick={onBack}>
            <span style={{ fontSize: '16px' }}>←</span> Back to Storefront
          </button>
          <div className="wv-pdp-breadcrumbs">
            <span className="wv-pdp-crumb" onClick={onBack}>{brandName}</span>
            <span className="wv-pdp-separator">/</span>
            <span className="wv-pdp-crumb">{product.category || 'Collection'}</span>
            <span className="wv-pdp-separator">/</span>
            <span className="wv-pdp-crumb-current">{product.name}</span>
          </div>
        </div>

        {/* Main Product Section: Gallery + Purchase Column */}
        <div className="wv-pdp-main-grid">
          {/* Left Column: Gallery */}
          <div className="wv-pdp-gallery-column">
            <div className="wv-pdp-hero-image-wrap">
              <img src={activeImage || product.image} alt={product.name} className="wv-pdp-hero-img" />
              {product.badge && (
                <span className="wv-pdp-badge" style={{ backgroundColor: accentColor }}>
                  {product.badge}
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div className="wv-pdp-thumbnails-row">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`wv-pdp-thumb-btn ${activeImage === img ? 'active' : ''}`}
                    onClick={() => setActiveImage(img)}
                    style={{ borderColor: activeImage === img ? accentColor : undefined }}
                  >
                    <img src={img} alt={`${product.name} angle ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Checkout Options */}
          <div className="wv-pdp-info-column">
            {product.category && (
              <div className="wv-pdp-category-kicker">
                {product.category.toUpperCase()} • AUTHENTIC EDITION
              </div>
            )}

            <h1 className="wv-pdp-title">{product.name}</h1>

            {/* Rating Stars & Count */}
            <div className="wv-pdp-rating-row">
              <div className="wv-pdp-stars">
                {'★'.repeat(Math.round(rating))}
                {'☆'.repeat(Math.max(0, 5 - Math.round(rating)))}
              </div>
              <span className="wv-pdp-rating-score">{rating}</span>
              <span className="wv-pdp-review-count">({reviewCount} verified customer reviews)</span>
            </div>

            {/* Pricing Section */}
            <div className="wv-pdp-price-row">
              <span className="wv-pdp-price" style={{ color: accentColor }}>
                {formatPriceFn(numPrice)}
              </span>
              {numOriginal && numOriginal > numPrice && (
                <>
                  <del className="wv-pdp-original-price">{formatPriceFn(numOriginal)}</del>
                  <span className="wv-pdp-save-badge">
                    Save {Math.round(((numOriginal - numPrice) / numOriginal) * 100)}%
                  </span>
                </>
              )}
            </div>

            {/* In-Stock Notification */}
            <div className="wv-pdp-stock-status">
              <span className="wv-pdp-stock-dot" />
              <span>In Stock — Ships within 24-48 business hours</span>
            </div>

            {/* Description Summary */}
            <p className="wv-pdp-description">
              {product.description || product.subtitle || product.story || 'Premium craftsmanship with carefully selected ingredients, engineered for long-lasting quality, pure comfort, and standout everyday performance.'}
            </p>

            {/* Variant: Colors / Metal Options */}
            {(product.colors || product.metalOptions) && (
              <div className="wv-pdp-variant-block">
                <div className="wv-pdp-variant-label">
                  <strong>Color / Finish:</strong> <span>{selectedColor || 'Standard'}</span>
                </div>
                <div className="wv-pdp-swatches-row">
                  {(product.colors || product.metalOptions || []).map((c, idx) => {
                    const colorName = typeof c === 'string' ? c : c.name
                    const hex = typeof c === 'object' && c.hex ? c.hex : undefined
                    const isSelected = selectedColor === colorName
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`wv-pdp-color-pill ${isSelected ? 'active' : ''}`}
                        onClick={() => setSelectedColor(colorName)}
                        style={{
                          borderColor: isSelected ? accentColor : '#e5e7eb',
                          backgroundColor: isSelected ? '#f3f4f6' : '#ffffff',
                        }}
                      >
                        {hex && (
                          <span
                            className="wv-pdp-swatch-circle"
                            style={{ backgroundColor: hex }}
                          />
                        )}
                        <span>{colorName}</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Variant: Sizes */}
            {(product.sizes || product.availableSizes) && (
              <div className="wv-pdp-variant-block">
                <div className="wv-pdp-variant-label">
                  <strong>Select Size:</strong> <span>{selectedSize}</span>
                </div>
                <div className="wv-pdp-sizes-row">
                  {(product.sizes || product.availableSizes || []).map((sz, idx) => {
                    const sStr = String(sz)
                    const isSelected = selectedSize === sStr
                    return (
                      <button
                        key={idx}
                        type="button"
                        className={`wv-pdp-size-btn ${isSelected ? 'active' : ''}`}
                        onClick={() => setSelectedSize(sStr)}
                        style={{
                          borderColor: isSelected ? accentColor : '#d1d5db',
                          backgroundColor: isSelected ? accentColor : '#ffffff',
                          color: isSelected ? '#ffffff' : '#111827',
                        }}
                      >
                        {sStr}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="wv-pdp-actions-row">
              <div className="wv-pdp-quantity-selector">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="wv-pdp-qty-btn"
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span className="wv-pdp-qty-value">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="wv-pdp-qty-btn"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="wv-pdp-add-btn"
                style={{ backgroundColor: accentColor }}
                onClick={() => {
                  onAddToCart(product, { size: selectedSize, color: selectedColor, quantity })
                }}
              >
                Add to Cart • {formatPriceFn(numPrice * quantity)}
              </button>

              {onToggleWishlist && (
                <button
                  type="button"
                  className="wv-pdp-wish-btn"
                  onClick={() => onToggleWishlist(product.id)}
                  aria-label="Wishlist"
                  style={{
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    padding: '0 16px',
                    fontSize: '18px',
                    cursor: 'pointer',
                    background: isWishlisted ? '#fee2e2' : '#ffffff',
                    color: isWishlisted ? '#ef4444' : '#6b7280',
                  }}
                  title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                >
                  {isWishlisted ? '♥' : '♡'}
                </button>
              )}
            </div>

            {onBuyNow && (
              <button
                type="button"
                className="wv-pdp-buynow-btn"
                onClick={() => {
                  onBuyNow(product, { size: selectedSize, color: selectedColor, quantity })
                }}
              >
                Buy It Now — Instant Checkout
              </button>
            )}

            {/* Guarantee / Value Badges */}
            <div className="wv-pdp-trust-badges">
              <div className="wv-pdp-trust-item">
                <span className="wv-pdp-trust-icon">🚚</span>
                <div>
                  <strong>Free Express Shipping</strong>
                  <p>On all qualifying orders over {formatPriceFn(50)}</p>
                </div>
              </div>
              <div className="wv-pdp-trust-item">
                <span className="wv-pdp-trust-icon">🛡️</span>
                <div>
                  <strong>30-Day Satisfaction Guarantee</strong>
                  <p>Hassle-free 100% money-back returns</p>
                </div>
              </div>
              <div className="wv-pdp-trust-item">
                <span className="wv-pdp-trust-icon">✨</span>
                <div>
                  <strong>Verified Authentic Brand Quality</strong>
                  <p>Direct from certified atelier & certified lab</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="wv-pdp-tabs-section">
          <div className="wv-pdp-tab-headers">
            <button
              type="button"
              className={`wv-pdp-tab-header-btn ${activeTab === 'details' ? 'active' : ''}`}
              onClick={() => setActiveTab('details')}
              style={{ borderBottomColor: activeTab === 'details' ? accentColor : 'transparent' }}
            >
              Full Description & Highlights
            </button>
            <button
              type="button"
              className={`wv-pdp-tab-header-btn ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
              style={{ borderBottomColor: activeTab === 'specs' ? accentColor : 'transparent' }}
            >
              Specifications & Details
            </button>
            <button
              type="button"
              className={`wv-pdp-tab-header-btn ${activeTab === 'reviews' ? 'active' : ''}`}
              onClick={() => setActiveTab('reviews')}
              style={{ borderBottomColor: activeTab === 'reviews' ? accentColor : 'transparent' }}
            >
              Customer Reviews ({reviewCount})
            </button>
            <button
              type="button"
              className={`wv-pdp-tab-header-btn ${activeTab === 'shipping' ? 'active' : ''}`}
              onClick={() => setActiveTab('shipping')}
              style={{ borderBottomColor: activeTab === 'shipping' ? accentColor : 'transparent' }}
            >
              Shipping & Returns
            </button>
          </div>

          <div className="wv-pdp-tab-body">
            {activeTab === 'details' && (
              <div className="wv-pdp-tab-pane">
                <h3>Product Overview</h3>
                <p>
                  {product.description || product.story || 'Engineered with meticulous attention to detail and designed for effortless everyday wear and exceptional durability. Every batch is rigorously inspected to deliver superior aesthetics, consistent ergonomics, and pure reliability.'}
                </p>
                <h4>Highlights & Key Benefits:</h4>
                <ul className="wv-pdp-checklist">
                  <li>Formulated and constructed with certified high-grade, sustainable materials.</li>
                  <li>Dermatologically verified, ethically sourced, and cruelty-free.</li>
                  <li>Ergonomic design engineered for comfortable all-day usage.</li>
                  <li>Signature packaging suitable for gifting or luxury presentation.</li>
                </ul>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="wv-pdp-tab-pane">
                <h3>Technical Specifications</h3>
                <table className="wv-pdp-specs-table">
                  <tbody>
                    {product.material && (
                      <tr>
                        <td><strong>Material / Weave:</strong></td>
                        <td>{product.material}</td>
                      </tr>
                    )}
                    {product.ingredients && (
                      <tr>
                        <td><strong>Active Ingredients:</strong></td>
                        <td>{product.ingredients}</td>
                      </tr>
                    )}
                    {normalizedSpecs.map((sp, idx) => (
                      <tr key={idx}>
                        <td><strong>{sp.label}:</strong></td>
                        <td>{sp.value}</td>
                      </tr>
                    ))}
                    <tr>
                      <td><strong>Category:</strong></td>
                      <td>{product.category || 'Lifestyle / Essentials'}</td>
                    </tr>
                    <tr>
                      <td><strong>Item SKU:</strong></td>
                      <td>{product.sku || `WV-${product.id.slice(0, 8).toUpperCase()}`}</td>
                    </tr>
                    <tr>
                      <td><strong>Availability:</strong></td>
                      <td>{product.inStock === false ? 'Out of Stock' : 'Ready for Dispatch'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="wv-pdp-tab-pane">
                <div className="wv-pdp-reviews-summary">
                  <div className="wv-pdp-reviews-score">
                    <span className="wv-pdp-score-big">{rating}</span>
                    <div className="wv-pdp-stars">{'★'.repeat(Math.round(rating))}</div>
                    <span>Based on {reviewCount} customer reviews</span>
                  </div>
                  <div className="wv-pdp-reviews-bars">
                    <div className="wv-pdp-bar-row">
                      <span>5 Stars</span>
                      <div className="wv-pdp-bar"><div style={{ width: '88%' }} /></div>
                      <span>88%</span>
                    </div>
                    <div className="wv-pdp-bar-row">
                      <span>4 Stars</span>
                      <div className="wv-pdp-bar"><div style={{ width: '10%' }} /></div>
                      <span>10%</span>
                    </div>
                    <div className="wv-pdp-bar-row">
                      <span>3 Stars</span>
                      <div className="wv-pdp-bar"><div style={{ width: '2%' }} /></div>
                      <span>2%</span>
                    </div>
                  </div>
                </div>

                <div className="wv-pdp-review-cards">
                  <div className="wv-pdp-review-card">
                    <div className="wv-pdp-review-header">
                      <strong>Sophia M.</strong>
                      <span className="wv-pdp-verified">✓ Verified Purchaser</span>
                      <span className="wv-pdp-review-date">3 days ago</span>
                    </div>
                    <div className="wv-pdp-stars">★★★★★</div>
                    <p>“Absolutely delighted with this! The quality exceeded my expectations and it arrived beautifully packaged. Will definitely purchase again.”</p>
                  </div>
                  <div className="wv-pdp-review-card">
                    <div className="wv-pdp-review-header">
                      <strong>David K.</strong>
                      <span className="wv-pdp-verified">✓ Verified Purchaser</span>
                      <span className="wv-pdp-review-date">1 week ago</span>
                    </div>
                    <div className="wv-pdp-stars">★★★★★</div>
                    <p>“Perfect fit, high performance, and feels premium throughout. Highly recommend to anyone looking for genuine quality.”</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="wv-pdp-tab-pane">
                <h3>Delivery & Return Information</h3>
                <p>We pride ourselves on swift, insured deliveries and zero-hassle returns:</p>
                <ul className="wv-pdp-checklist">
                  <li><strong>Standard Delivery:</strong> 3-5 business days across the country.</li>
                  <li><strong>Express Shipping:</strong> Next-day dispatch available on all weekday orders before 2 PM.</li>
                  <li><strong>30-Day Return Guarantee:</strong> If you are not 100% satisfied, return within 30 days for a full refund or exchange.</li>
                  <li><strong>Tracked & Insured:</strong> Real-time SMS & email tracking updates with every package.</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Recommended / Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="wv-pdp-related-section">
            <h2 className="wv-pdp-related-title">You Might Also Like</h2>
            <div className="wv-pdp-related-grid">
              {relatedProducts.slice(0, 4).map((rel) => {
                const relPrice = typeof rel.price === 'string' ? parseFloat(rel.price.replace(/[^0-9.]/g, '')) || 0 : rel.price
                return (
                  <div
                    key={rel.id}
                    className="wv-pdp-related-card"
                    onClick={() => {
                      if (onSelectRelated) onSelectRelated(rel)
                      setActiveImage(rel.image || '')
                      window.scrollTo({ top: 0, behavior: 'smooth' })
                    }}
                  >
                    <div className="wv-pdp-related-img-wrap">
                      <img src={rel.image} alt={rel.name} />
                    </div>
                    <div className="wv-pdp-related-info">
                      <span className="wv-pdp-related-category">{rel.category || 'Recommended'}</span>
                      <h4 className="wv-pdp-related-name">{rel.name}</h4>
                      <div className="wv-pdp-related-price">{formatPriceFn(relPrice)}</div>
                      <button
                        type="button"
                        className="wv-pdp-related-view-btn"
                        onClick={(e) => {
                          e.stopPropagation()
                          if (onSelectRelated) onSelectRelated(rel)
                          setActiveImage(rel.image || '')
                          window.scrollTo({ top: 0, behavior: 'smooth' })
                        }}
                      >
                        View Full Details →
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

