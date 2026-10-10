import React, { useState } from 'react'
import type { FitCoreProduct, FitCoreProductColor } from '../types'

export interface FitCoreProductCardProps {
  product: FitCoreProduct
  onSelectProduct?: (product: FitCoreProduct) => void
  onAddToCart?: (product: FitCoreProduct, size: string, color: FitCoreProductColor) => void
  isWishlisted?: boolean
  onToggleWishlist?: (productId: string) => void
  showQuickAdd?: boolean
}

export const FitCoreProductCard: React.FC<FitCoreProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  isWishlisted = false,
  onToggleWishlist,
  showQuickAdd = true,
}) => {
  const [selectedColor, setSelectedColor] = useState<FitCoreProductColor>(
    product.colors[0] || { name: 'Standard', hex: '#000000' }
  )

  const handleCardClick = () => {
    onSelectProduct?.(product)
  }

  const handleQuickAdd = (e: React.MouseEvent, size: string) => {
    e.stopPropagation()
    onAddToCart?.(product, size, selectedColor)
  }

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    onToggleWishlist?.(product.id)
  }

  return (
    <div className="fitcore-card" onClick={handleCardClick}>
      {/* Image Gallery / Hover Aspect */}
      <div className="fitcore-card-img-wrap">
        <img
          src={selectedColor.image || product.image}
          alt={product.name}
          className="fitcore-card-img-primary"
          loading="lazy"
        />
        <img
          src={product.hoverImage}
          alt={`${product.name} alternate view`}
          className="fitcore-card-img-hover"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`fitcore-card-badge ${
              product.badge.toLowerCase().includes('best') ? 'bestseller' : ''
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          type="button"
          className={`fitcore-card-wish-btn ${isWishlisted ? 'active' : ''}`}
          aria-label="Save to Wishlist"
          onClick={handleWishlistToggle}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill={isWishlisted ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        {/* Quick Add Bar */}
        {showQuickAdd && product.sizes && product.sizes.length > 0 && (
          <div className="fitcore-card-quick-bar" onClick={(e) => e.stopPropagation()}>
            {product.sizes.slice(0, 5).map((size) => (
              <button
                key={size}
                type="button"
                className="fitcore-size-btn"
                title={`Quick Add Size ${size}`}
                onClick={(e) => handleQuickAdd(e, size)}
              >
                {size}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="fitcore-card-body">
        <div className="fitcore-card-meta">
          <span>{product.workout}</span>
          <div className="fitcore-card-rating">
            <span>★</span>
            <span>{product.rating.toFixed(1)}</span>
            <span>({product.reviewCount})</span>
          </div>
        </div>

        <h3 className="fitcore-card-title">{product.name}</h3>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 1 && (
          <div className="fitcore-swatches" onClick={(e) => e.stopPropagation()}>
            {product.colors.map((color) => (
              <button
                key={color.name}
                type="button"
                className={`fitcore-swatch-dot ${
                  selectedColor.name === color.name ? 'active' : ''
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        )}

        {/* Price & Action */}
        <div className="fitcore-card-footer">
          <div className="fitcore-price-wrap">
            <span className="fitcore-price-current">₹{product.price.toLocaleString('en-IN')}</span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="fitcore-price-compare">
                ₹{product.compareAtPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <button
            type="button"
            className="fitcore-card-add-btn"
            title="View Details"
            onClick={(e) => {
              e.stopPropagation()
              onSelectProduct?.(product)
            }}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
