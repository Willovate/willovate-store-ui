import React from 'react'
import type { ArenaProduct } from '../types'

interface ArenaProductCardProps {
  product: ArenaProduct
  isWishlisted: boolean
  onToggleWishlist: (productId: string) => void
  onQuickAdd: (product: ArenaProduct) => void
  onSelectProduct: (product: ArenaProduct) => void
}

export const ArenaProductCard: React.FC<ArenaProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickAdd,
  onSelectProduct,
}) => {
  return (
    <article className="arena-product-card">
      <div className="arena-product-img-wrapper" onClick={() => onSelectProduct(product)}>
        <img
          src={product.image}
          alt={product.name}
          className="arena-product-img"
          loading="lazy"
        />

        {/* Badges */}
        <div className="arena-product-badges">
          {product.badge && (
            <span
              className={`arena-badge-pill ${
                product.compareAtPrice ? 'sale' : product.isOfficialKit ? 'official' : ''
              }`}
            >
              {product.badge}
            </span>
          )}
          {product.isLimitedDrop && <span className="arena-badge-pill sale">LIMITED DROP</span>}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          className={`arena-wishlist-toggle ${isWishlisted ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onToggleWishlist(product.id)
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
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
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      <div className="arena-product-card-body">
        <div>
          <div className="arena-product-sport-tag">{product.sport} • {product.category}</div>
          <h3 className="arena-product-title" onClick={() => onSelectProduct(product)}>
            {product.name}
          </h3>

          <div className="arena-product-rating-row">
            <span>★ {product.rating.toFixed(1)}</span>
            <span className="arena-rating-count">({product.reviewCount})</span>
          </div>

          <div className="arena-product-price-row">
            <span className="arena-price-current">${product.price}.00</span>
            {product.compareAtPrice && (
              <span className="arena-price-original">${product.compareAtPrice}.00</span>
            )}
          </div>
        </div>

        <button
          type="button"
          className="arena-quick-add-btn"
          onClick={() => onQuickAdd(product)}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Quick Add
        </button>
      </div>
    </article>
  )
}

