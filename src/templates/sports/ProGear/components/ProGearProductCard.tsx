import React from 'react'
import type { ProGearProduct } from '../types'

export interface ProGearProductCardProps {
  product: ProGearProduct
  onSelect: (product: ProGearProduct) => void
  onAddToCart: (product: ProGearProduct, size?: string) => void
  isWishlisted: boolean
  onToggleWishlist: (productId: string) => void
}

export const ProGearProductCard: React.FC<ProGearProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  return (
    <div
      className="progear-product-card"
      onClick={() => onSelect(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onSelect(product)
        }
      }}
    >
      {/* Badges */}
      {product.badge && (
        <span
          className={`progear-card-badge ${
            product.badge.toLowerCase().includes('fifa') ? 'fifa' : ''
          }`}
        >
          {product.badge}
        </span>
      )}

      {/* Wishlist Button */}
      <button
        type="button"
        className={`progear-card-wishlist-btn ${isWishlisted ? 'active' : ''}`}
        title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
        onClick={(e) => {
          e.stopPropagation()
          onToggleWishlist(product.id)
        }}
        aria-label="Wishlist"
      >
        <span style={{ fontSize: '1rem', lineHeight: 1 }}>
          {isWishlisted ? '♥' : '♡'}
        </span>
      </button>

      {/* Product Image */}
      <div className="progear-card-media">
        <img
          src={product.image}
          alt={product.name}
          className="progear-card-img"
          loading="lazy"
        />
      </div>

      {/* Body Details */}
      <div className="progear-card-body">
        <div className="progear-card-brand-row">
          <span>{product.brand}</span>
          <span style={{ color: 'var(--pg-primary)', fontWeight: 800 }}>
            {product.sport.toUpperCase()}
          </span>
        </div>

        <h3 className="progear-card-title" title={product.name}>
          {product.name}
        </h3>

        {/* Rating Row */}
        <div className="progear-card-rating-row">
          <span className="progear-star-badge">
            ★ {product.rating.toFixed(1)}
          </span>
          <span style={{ color: 'var(--pg-text-muted)' }}>
            ({product.reviewCount})
          </span>
          <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: 'var(--pg-text-dim)' }}>
            {product.playerLevel}
          </span>
        </div>

        {/* Pricing */}
        <div className="progear-card-price-row">
          <span className="progear-card-price">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.compareAtPrice && (
            <span className="progear-card-compare">
              ₹{product.compareAtPrice.toLocaleString('en-IN')}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="progear-card-discount">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Primary Spec Preview */}
        {product.specs && product.specs.length > 0 && (
          <div className="progear-card-specs-preview">
            <strong>{product.specs[0].label}:</strong> {product.specs[0].value}
          </div>
        )}

        {/* Quick Add Button */}
        <button
          type="button"
          className="progear-card-add-btn"
          onClick={(e) => {
            e.stopPropagation()
            onAddToCart(product, product.sizes?.[0])
          }}
        >
          + Quick Add
        </button>
      </div>
    </div>
  )
}

