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
        />
      </div>

      {/* Body */}
      <div className="sprint-card-body">
        <div className="sprint-card-type-row">
          <span>{product.runningType} running</span>
          {product.cushionLevel && <span>{product.cushionLevel} cushion</span>}
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

