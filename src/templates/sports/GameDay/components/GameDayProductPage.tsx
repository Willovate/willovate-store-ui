import React, { useState } from 'react'
import type { GameDayProduct, GameDayProductColor } from '../types'
import { GAMEDAY_PRODUCTS } from '../data/gameDayData'

interface GameDayProductPageProps {
  product: GameDayProduct
  onAddToCart: (product: GameDayProduct, size: string, color: GameDayProductColor, customName?: string, customNumber?: string) => void
  isWishlisted: boolean
  onToggleWishlist: (id: string) => void
  onNavigateHome: () => void
  onNavigateCollection: () => void
}

export const GameDayProductPage: React.FC<GameDayProductPageProps> = ({
  product,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onNavigateHome,
  onNavigateCollection,
}) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes[1] || product.sizes[0] || 'M')
  const [selectedColor, setSelectedColor] = useState<GameDayProductColor>(product.colors[0])
  const [customName, setCustomName] = useState('')
  const [customNumber, setCustomNumber] = useState('')
  const [mainImage, setMainImage] = useState(product.image)
  const stars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating))

  const related = GAMEDAY_PRODUCTS.filter((p) => p.sport === product.sport && p.id !== product.id).slice(0, 4)

  const savings = product.compareAtPrice ? product.compareAtPrice - product.price : 0

  return (
    <div className="gd-product-page">
      <div className="gd-container">
        {/* Breadcrumb */}
        <nav className="gd-breadcrumb" aria-label="Breadcrumb">
          <button onClick={onNavigateHome}>Home</button>
          <span className="gd-breadcrumb-sep">/</span>
          <button onClick={onNavigateCollection}>{product.sport.charAt(0).toUpperCase() + product.sport.slice(1)}</button>
          <span className="gd-breadcrumb-sep">/</span>
          <span style={{ color: 'var(--gd-text-light)' }}>{product.name}</span>
        </nav>

        <div className="gd-product-layout">
          {/* Gallery */}
          <div className="gd-gallery">
            <div className="gd-gallery-main">
              <img src={mainImage} alt={product.name} />
            </div>
            <div className="gd-gallery-thumbs">
              {[product.image, product.hoverImage].map((img, idx) => (
                <button
                  key={idx}
                  className={`gd-gallery-thumb${mainImage === img ? ' active' : ''}`}
                  onClick={() => setMainImage(img)}
                  aria-label={`View image ${idx + 1}`}
                >
                  <img src={img} alt="" />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="gd-product-details">
            <div>
              <p className="gd-product-sport-tag">
                {product.sport.toUpperCase()}{product.teamName ? ` · ${product.teamName}` : ''}
                {product.kitEdition && ` · ${product.kitEdition.toUpperCase()} KIT`}
              </p>
              <h1 className="gd-product-full-name">{product.name}</h1>
            </div>

            <div className="gd-product-full-rating">
              <span className="gd-product-full-stars">{stars}</span>
              <span>{product.rating.toFixed(1)} · {product.reviewCount} reviews</span>
            </div>

            <div className="gd-product-full-price-row">
              <span className="gd-product-full-price">₹{product.price.toLocaleString('en-IN')}</span>
              {product.compareAtPrice && (
                <span className="gd-product-full-compare">₹{product.compareAtPrice.toLocaleString('en-IN')}</span>
              )}
              {savings > 0 && (
                <span className="gd-product-full-saving">SAVE ₹{savings.toLocaleString('en-IN')}</span>
              )}
            </div>

            {/* Colors */}
            <div>
              <span className="gd-color-label">Colour: {selectedColor.name}</span>
              <div className="gd-colors">
                {product.colors.map((color) => (
                  <div
                    key={color.name}
                    className={`gd-color-option${selectedColor.name === color.name ? ' active' : ''}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    <div
                      className="gd-color-swatch"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                    <span className="gd-color-option-label">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Size */}
            <div>
              <span className="gd-size-label">Size: {selectedSize}</span>
              <div className="gd-sizes">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`gd-size-btn${selectedSize === size ? ' active' : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Name & Number */}
            {product.canCustomize && (
              <div>
                <span className="gd-custom-label">🔥 Personalise Your Jersey (Optional)</span>
                <div className="gd-custom-inputs">
                  <input
                    type="text"
                    className="gd-custom-input"
                    placeholder="Player Name (e.g. YAMAL)"
                    value={customName}
                    onChange={(e) => setCustomName(e.target.value.toUpperCase())}
                    maxLength={16}
                    aria-label="Custom player name"
                  />
                  <input
                    type="text"
                    className="gd-custom-input gd-custom-number-input"
                    placeholder="#10"
                    value={customNumber}
                    onChange={(e) => setCustomNumber(e.target.value.replace(/[^0-9]/g, ''))}
                    maxLength={2}
                    aria-label="Custom player number"
                  />
                </div>
                {(customName || customNumber) && (
                  <p style={{ fontSize: '0.75rem', color: 'var(--gd-gold)', marginTop: 8, fontWeight: 600 }}>
                    Preview: #{customNumber || '??'} {customName || 'YOUR NAME'} — Heat-press included, +₹199
                  </p>
                )}
              </div>
            )}

            {/* Add to Cart */}
            <div>
              <button
                className="gd-atc-btn"
                onClick={() => onAddToCart(product, selectedSize, selectedColor, customName || undefined, customNumber || undefined)}
              >
                {product.canCustomize && (customName || customNumber) ? 'ADD CUSTOM JERSEY TO BAG' : 'ADD TO KIT BAG'}
              </button>
              <button className="gd-buy-now-btn">
                BUY NOW
              </button>
            </div>

            {/* Features */}
            <div>
              <p className="gd-size-label" style={{ marginBottom: 12 }}>Product Details</p>
              <div className="gd-product-features">
                {product.features.map((f) => (
                  <div key={f} className="gd-product-feature">{f}</div>
                ))}
              </div>
            </div>

            {/* Wishlist */}
            <button
              onClick={() => onToggleWishlist(product.id)}
              style={{
                background: 'none',
                border: '1px solid var(--gd-border-dark)',
                color: isWishlisted ? 'var(--gd-red)' : 'var(--gd-text-muted)',
                borderRadius: 'var(--gd-radius-sm)',
                padding: '10px 20px',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                transition: 'var(--gd-transition)',
              }}
            >
              {isWishlisted ? '♥ Saved to Wishlist' : '♡ Save to Wishlist'}
            </button>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div style={{ marginTop: 80 }}>
            <div className="gd-section-head">
              <div>
                <span className="gd-section-tag">More {product.sport.charAt(0).toUpperCase() + product.sport.slice(1)}</span>
                <h2 className="gd-section-title">YOU MAY ALSO LIKE</h2>
              </div>
            </div>
            <div className="gd-products-grid">
              {related.map((p) => (
                <div
                  key={p.id}
                  className="gd-product-card"
                  onClick={() => {
                    // handled by parent
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="gd-product-img-wrap">
                    <img src={p.image} alt={p.name} className="gd-product-img primary" />
                    <img src={p.hoverImage} alt="" className="gd-product-img hover" />
                    {p.badge && <span className="gd-product-badge">{p.badge}</span>}
                  </div>
                  <div className="gd-product-info">
                    <p className="gd-product-sport">{p.sport.toUpperCase()}</p>
                    <h3 className="gd-product-name">{p.name}</h3>
                    <div className="gd-product-pricing">
                      <span className="gd-product-price">₹{p.price.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile ATC */}
      <div className="gd-sticky-cart">
        <div className="gd-sticky-price">₹{product.price.toLocaleString('en-IN')}</div>
        <button
          className="gd-atc-btn"
          onClick={() => onAddToCart(product, selectedSize, selectedColor, customName || undefined, customNumber || undefined)}
        >
          ADD TO KIT BAG
        </button>
      </div>
    </div>
  )
}
