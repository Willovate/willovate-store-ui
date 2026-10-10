import React, { useState } from 'react'
import type { PeakProduct, PeakProductColor } from '../types'
import { PEAK_PRODUCTS } from '../data/peakData'
import { PeakProductCard } from './PeakProductCard'

interface PeakProductPageProps {
  product: PeakProduct
  onAddToCart: (product: PeakProduct, size: string, color: PeakProductColor) => void
  isWishlisted: boolean
  onToggleWishlist: (id: string) => void
  onNavigateHome: () => void
  onNavigateCollection: (category?: string) => void
}

export const PeakProductPage: React.FC<PeakProductPageProps> = ({
  product,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  onNavigateHome,
  onNavigateCollection,
}) => {
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'One Size')
  const [selectedColor, setSelectedColor] = useState<PeakProductColor>(product.colors[0])
  const [activeImage, setActiveImage] = useState<string>(product.image)

  const stars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating))

  const related = PEAK_PRODUCTS.filter(
    (p) => p.activity === product.activity && p.id !== product.id
  ).slice(0, 4)

  const images = [product.image, product.hoverImage]

  return (
    <div className="pk-product-page">
      <div className="pk-container">
        {/* Breadcrumb */}
        <nav className="pk-breadcrumb" aria-label="Product Trail Breadcrumb">
          <button onClick={onNavigateHome}>Home</button>
          <span className="pk-breadcrumb-sep">/</span>
          <button onClick={() => onNavigateCollection(product.activity)}>
            {product.activity.replace('-', ' ').toUpperCase()}
          </button>
          <span className="pk-breadcrumb-sep">/</span>
          <button onClick={() => onNavigateCollection(product.category)}>
            {product.category.replace('-', ' ').toUpperCase()}
          </button>
          <span className="pk-breadcrumb-sep">/</span>
          <span style={{ color: 'var(--pk-text-dark)', fontWeight: 600 }}>{product.name}</span>
        </nav>

        <div className="pk-pdp-layout">
          {/* Gallery */}
          <div className="pk-gallery">
            <div className="pk-gallery-main">
              <img src={activeImage} alt={product.name} />
            </div>

            <div className="pk-gallery-thumbs">
              {images.map((img, idx) => (
                <div
                  key={idx}
                  className={`pk-gallery-thumb ${activeImage === img ? 'active' : ''}`}
                  onClick={() => setActiveImage(img)}
                  role="button"
                  tabIndex={0}
                >
                  <img src={img} alt={`Angle ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="pk-pdp-details">
            <div>
              <span className="pk-pdp-activity">
                {product.activity.replace('-', ' ').toUpperCase()} · {product.category.replace('-', ' ').toUpperCase()}
              </span>
              <h1 className="pk-pdp-name">{product.name}</h1>

              <div className="pk-pdp-rating">
                <span className="pk-pdp-stars">{stars}</span>
                <span>
                  {product.rating.toFixed(1)} / 5.0 · ({product.reviewCount} verified trail reviews)
                </span>
              </div>
            </div>

            <div className="pk-pdp-price-row">
              <span className="pk-pdp-price">₹{product.price.toLocaleString('en-IN')}</span>
              {product.compareAtPrice && (
                <span className="pk-pdp-compare">
                  ₹{product.compareAtPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.compareAtPrice && (
                <span className="pk-pdp-saving">
                  Save ₹{(product.compareAtPrice - product.price).toLocaleString('en-IN')}
                </span>
              )}
            </div>

            <p style={{ color: 'var(--pk-text-dark-muted)', fontSize: '0.9rem', lineHeight: '1.7' }}>
              {product.description}
            </p>

            {/* Technical Spec Table */}
            <div>
              <span className="pk-option-label">Technical Field Specifications</span>
              <div className="pk-tech-table">
                {product.material && (
                  <div className="pk-tech-row">
                    <span className="pk-tech-label">Material</span>
                    <span className="pk-tech-val">{product.material}</span>
                  </div>
                )}
                {product.weight && (
                  <div className="pk-tech-row">
                    <span className="pk-tech-label">Weight</span>
                    <span className="pk-tech-val">{product.weight}</span>
                  </div>
                )}
                {product.waterproofRating && (
                  <div className="pk-tech-row">
                    <span className="pk-tech-label">Waterproof Rating</span>
                    <span className="pk-tech-val">{product.waterproofRating}</span>
                  </div>
                )}
                {product.temperatureRating && (
                  <div className="pk-tech-row">
                    <span className="pk-tech-label">Temperature Limit</span>
                    <span className="pk-tech-val">{product.temperatureRating}</span>
                  </div>
                )}
                {product.terrain && (
                  <div className="pk-tech-row">
                    <span className="pk-tech-label">Intended Terrain</span>
                    <span className="pk-tech-val" style={{ textTransform: 'capitalize' }}>
                      {product.terrain}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Size Selector */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <span className="pk-option-label">Select Size</span>
                <div className="pk-sizes">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      type="button"
                      className={`pk-size-btn ${selectedSize === s ? 'active' : ''}`}
                      onClick={() => setSelectedSize(s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selector */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <span className="pk-option-label">Color: {selectedColor.name}</span>
                <div className="pk-colors">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      type="button"
                      className={`pk-color-btn ${selectedColor.name === c.name ? 'active' : ''}`}
                      onClick={() => setSelectedColor(c)}
                    >
                      <div
                        className="pk-color-swatch"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span className="pk-color-btn-label">{c.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* CTAs */}
            <div>
              <button
                type="button"
                className="pk-atc-btn"
                onClick={() => onAddToCart(product, selectedSize, selectedColor)}
              >
                Add To Expedition Pack — ₹{product.price.toLocaleString('en-IN')}
              </button>

              <button
                type="button"
                className="pk-buy-btn"
                onClick={() => {
                  onAddToCart(product, selectedSize, selectedColor)
                }}
              >
                Instant Trail Checkout
              </button>
            </div>

            {/* Wishlist toggle */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                type="button"
                onClick={() => onToggleWishlist(product.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '0.85rem',
                  color: isWishlisted ? 'var(--pk-accent-terra)' : 'var(--pk-stone-muted)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{isWishlisted ? '♥' : '♡'}</span>
                <span>{isWishlisted ? 'Saved in Expedition Wishlist' : 'Save in Wishlist'}</span>
              </button>
            </div>

            {/* Key Features List */}
            <div>
              <span className="pk-option-label">Field Design Highlights</span>
              <div className="pk-pdp-features">
                {product.features.map((f, i) => (
                  <div key={i} className="pk-pdp-feature">
                    {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related gear */}
        {related.length > 0 && (
          <div style={{ marginTop: '90px' }}>
            <div className="pk-section-head">
              <div>
                <span className="pk-eyebrow">Complete Your System</span>
                <h2 className="pk-section-heading">SIMILAR ADVENTURE GEAR</h2>
              </div>
            </div>
            <div className="pk-products-grid">
              {related.map((p) => (
                <PeakProductCard
                  key={p.id}
                  product={p}
                  onSelect={() => {
                    // Navigate to product by scrolling to top or letting parent handle it
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  onAddToCart={onAddToCart}
                  isWishlisted={false}
                  onToggleWishlist={onToggleWishlist}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Mobile Add To Cart */}
      <div className="pk-sticky-atc">
        <span className="pk-sticky-price">₹{product.price.toLocaleString('en-IN')}</span>
        <button
          type="button"
          className="pk-atc-btn"
          onClick={() => onAddToCart(product, selectedSize, selectedColor)}
        >
          Add To Pack
        </button>
      </div>
    </div>
  )
}
