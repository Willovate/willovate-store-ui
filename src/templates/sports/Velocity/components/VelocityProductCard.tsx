import React, { useState } from 'react'
import type { VelocityProduct, VelocityColor } from '../types'

interface VelocityProductCardProps {
  product: VelocityProduct
  isWishlisted: boolean
  onToggleWishlist: (productId: string) => void
  onQuickAdd: (product: VelocityProduct, size?: string, color?: VelocityColor) => void
  onQuickView: (product: VelocityProduct) => void
  onSelectProduct: (product: VelocityProduct) => void
}

export const VelocityProductCard: React.FC<VelocityProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickAdd,
  onQuickView,
  onSelectProduct,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState<VelocityColor>(product.colors[0])
  const [quickAddOpen, setQuickAddOpen] = useState(false)
  const [isAdding, setIsAdding] = useState(false)

  const hasDiscount = product.compareAtPrice > product.price
  const discountPercent = hasDiscount
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  const primaryImage = product.images[0]
  const hoverImage = product.images[1] || product.images[0]

  const handleQuickAddSize = (size: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setIsAdding(true)
    onQuickAdd(product, size, selectedColor)
    setTimeout(() => {
      setIsAdding(false)
      setQuickAddOpen(false)
    }, 600)
  }

  return (
    <article className="velocity-product-card" onClick={() => onSelectProduct(product)}>
      {/* Visual Top Container */}
      <div
        className="card-media-wrapper"
        onMouseEnter={() => setActiveImageIndex(1)}
        onMouseLeave={() => setActiveImageIndex(0)}
      >
        {/* Badges Container */}
        <div className="card-badge-cluster">
          {product.badge && <span className="card-badge volt-badge">{product.badge}</span>}
          {hasDiscount && <span className="card-badge discount-badge">−{discountPercent}%</span>}
          {product.isNew && <span className="card-badge new-badge">NEW</span>}
        </div>

        {/* Wishlist Floating Button */}
        <button
          type="button"
          className={`card-wishlist-btn ${isWishlisted ? 'is-active' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onToggleWishlist(product.id)
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          title={isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={isWishlisted ? '#ccff00' : 'none'} stroke={isWishlisted ? '#ccff00' : 'currentColor'} strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        {/* Product Imagery with Hover Swap */}
        <div className="card-image-display">
          <img
            src={activeImageIndex === 1 ? hoverImage : primaryImage}
            alt={product.name}
            className={`card-image ${activeImageIndex === 1 ? 'is-hover-image' : ''}`}
            loading="lazy"
          />
        </div>

        {/* Quick View Hover Trigger */}
        <div className="card-hover-actions">
          <button
            type="button"
            className="card-quick-view-btn"
            onClick={(e) => {
              e.stopPropagation()
              onQuickView(product)
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Quick View
          </button>
        </div>

        {/* Quick Add Slide-Up Panel */}
        <div
          className={`card-quick-add-panel ${quickAddOpen ? 'is-open' : ''}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="quick-add-header">
            <span>Select Size:</span>
            <button
              type="button"
              className="quick-add-close"
              onClick={() => setQuickAddOpen(false)}
            >
              ×
            </button>
          </div>
          <div className="quick-add-sizes-grid">
            {product.sizes.map((sz) => (
              <button
                key={sz}
                type="button"
                className="quick-size-pill"
                onClick={(e) => handleQuickAddSize(sz, e)}
              >
                {sz}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Information Body */}
      <div className="card-info-content">
        {/* Color Swatches */}
        {product.colors.length > 1 && (
          <div className="card-color-swatches" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                className={`swatch-circle ${selectedColor.name === c.name ? 'is-selected' : ''}`}
                style={{ backgroundColor: c.hex }}
                onClick={() => setSelectedColor(c)}
                title={c.name}
                aria-label={`Color ${c.name}`}
              />
            ))}
            <span className="swatches-count">+{product.colors.length}</span>
          </div>
        )}

        {/* Brand & Category Eyebrow */}
        <div className="card-eyebrow">
          <span className="brand-tag">{product.brand}</span>
          <span className="sport-tag">• {product.sport}</span>
        </div>

        {/* Product Title */}
        <h3 className="card-title" title={product.name}>
          {product.name}
        </h3>

        {/* Rating and Review Count */}
        <div className="card-rating-row">
          <div className="stars-cluster" aria-label={`Rating: ${product.rating} out of 5`}>
            {Array.from({ length: 5 }).map((_, i) => (
              <span key={i} className={`star-icon ${i < Math.floor(product.rating) ? 'is-filled' : ''}`}>
                ★
              </span>
            ))}
          </div>
          <span className="rating-score">{product.rating}</span>
          <span className="review-count">({product.reviewCount})</span>
        </div>

        {/* Price Row & Quick Add Button */}
        <div className="card-footer-row">
          <div className="price-stack">
            <span className="current-price">${product.price}</span>
            {hasDiscount && (
              <del className="compare-price">${product.compareAtPrice}</del>
            )}
          </div>

          <button
            type="button"
            className={`quick-add-trigger-btn ${isAdding ? 'is-adding' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              setQuickAddOpen(!quickAddOpen)
            }}
            aria-label={`Quick add ${product.name}`}
          >
            {isAdding ? (
              <span className="added-check">✓ Added</span>
            ) : (
              <>
                <span className="plus-symbol">+</span> Quick Add
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  )
}

