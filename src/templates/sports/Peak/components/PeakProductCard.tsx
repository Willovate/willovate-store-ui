import React from 'react'
import type { PeakProduct, PeakProductColor } from '../types'

interface PeakProductCardProps {
  product: PeakProduct
  onSelect: (product: PeakProduct) => void
  onAddToCart: (product: PeakProduct, size: string, color: PeakProductColor) => void
  isWishlisted: boolean
  onToggleWishlist: (id: string) => void
}

const getBadgeModifier = (badge?: string): string => {
  if (!badge) return ''
  const b = badge.toLowerCase()
  if (b.includes('new')) return 'new'
  if (b.includes('best') || b.includes('pick')) return 'bestseller'
  if (b.includes('trail')) return 'trail'
  return ''
}

export const PeakProductCard: React.FC<PeakProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const stars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating))

  return (
    <div
      className="pk-product-card"
      onClick={() => onSelect(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelect(product)
        }
      }}
    >
      <div className="pk-product-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="pk-product-img primary-img"
          loading="lazy"
        />
        <img
          src={product.hoverImage}
          alt={`${product.name} detail view`}
          className="pk-product-img hover-img"
          loading="lazy"
        />

        {product.badge && (
          <span className={`pk-product-badge ${getBadgeModifier(product.badge)}`}>
            {product.badge}
          </span>
        )}

        <button
          className={`pk-product-wishlist${isWishlisted ? ' active' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onToggleWishlist(product.id)
          }}
          aria-label={isWishlisted ? 'Remove from trail wishlist' : 'Add to trail wishlist'}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>

        <button
          className="pk-product-quick-add"
          onClick={(e) => {
            e.stopPropagation()
            onAddToCart(product, product.sizes[0] || 'One Size', product.colors[0])
          }}
        >
          + Quick Add
        </button>
      </div>

      {/* Tech spec strip */}
      <div className="pk-product-spec-strip">
        <div className="pk-product-spec">
          <span className="pk-product-spec-label">Weight</span>
          <span className="pk-product-spec-val">{product.weight || '320g'}</span>
        </div>
        <div className="pk-product-spec">
          <span className="pk-product-spec-label">Terrain</span>
          <span className="pk-product-spec-val" style={{ textTransform: 'capitalize' }}>
            {product.terrain || 'Alpine'}
          </span>
        </div>
        <div className="pk-product-spec">
          <span className="pk-product-spec-label">Rating</span>
          <span className="pk-product-spec-val">{product.waterproofRating || 'Gore-Tex'}</span>
        </div>
      </div>

      <div className="pk-product-info">
        <span className="pk-product-activity">
          {product.activity.replace('-', ' ').toUpperCase()} · {product.category.replace('-', ' ').toUpperCase()}
        </span>

        <h3 className="pk-product-name">{product.name}</h3>

        <div className="pk-product-rating">
          <span className="pk-product-stars">{stars}</span>
          <span>{product.rating.toFixed(1)} ({product.reviewCount})</span>
        </div>

        <div className="pk-product-pricing">
          <span className="pk-product-price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.compareAtPrice && (
            <span className="pk-product-compare">
              ₹{product.compareAtPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {product.colors && product.colors.length > 0 && (
          <div className="pk-product-colors">
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="pk-color-dot"
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
