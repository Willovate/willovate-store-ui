import React from 'react'
import type { SprintProduct } from '../types'

interface SprintProductCardProps {
  product: SprintProduct
  isWishlisted: boolean
  onToggleWishlist: (productId: string) => void
  onSelectProduct: (product: SprintProduct) => void
  onQuickAdd: (product: SprintProduct) => void
}

export const SprintProductCard: React.FC<SprintProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onQuickAdd,
}) => {
  const discountPercent = product.compareAtPrice
    ? Math.round(((product.compareAtPrice - product.price) / product.compareAtPrice) * 100)
    : 0

  return (
    <article
      className="sprint-product-card"
      onClick={() => onSelectProduct(product)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onSelectProduct(product)
        }
      }}
    >
      {/* Media container */}
      <div className="sprint-card-media">
        {product.badge && <span className="sprint-card-badge">{product.badge}</span>}

        <button
          type="button"
          className={`sprint-card-wishlist ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onToggleWishlist(product.id)
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>

        <img
          src={product.image}
          alt={product.name}
          className="sprint-card-img"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src =
              'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=80'
          }}
        />
      </div>

      {/* Body */}
      <div className="sprint-card-body">
        <div className="sprint-card-type-row">
          <span className="sprint-card-type-badge">{product.runningType} running</span>
          {product.cushionLevel && (
            <span className="sprint-card-cushion">{product.cushionLevel} cushion</span>
          )}
        </div>

        <h3 className="sprint-card-title">{product.name}</h3>
        <p className="sprint-card-subtitle">{product.subtitle}</p>

        {/* Running Specs Chips */}
        {(product.weight || product.drop) && (
          <div className="sprint-card-specs-row">
            {product.weight && <span className="sprint-spec-chip">{product.weight}</span>}
            {product.drop && <span className="sprint-spec-chip">{product.drop}</span>}
          </div>
        )}

        {/* Footer */}
        <div className="sprint-card-footer">
          <div className="sprint-card-price-wrap">
            <span className="sprint-card-price">${product.price}</span>
            {product.compareAtPrice && (
              <span className="sprint-card-compare">${product.compareAtPrice}</span>
            )}
            {discountPercent > 0 && (
              <span className="sprint-card-discount">{discountPercent}% OFF</span>
            )}
          </div>

          <button
            type="button"
            className="sprint-card-quick-add"
            onClick={(e) => {
              e.stopPropagation()
              onQuickAdd(product)
            }}
          >
            + Quick Add
          </button>
        </div>
      </div>
    </article>
  )
}

