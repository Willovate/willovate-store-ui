import React from 'react'
import type { GameDayProduct, GameDayProductColor } from '../types'

interface GameDayProductCardProps {
  product: GameDayProduct
  onSelect: (product: GameDayProduct) => void
  onAddToCart: (product: GameDayProduct, size: string, color: GameDayProductColor) => void
  isWishlisted: boolean
  onToggleWishlist: (id: string) => void
}

const getBadgeClass = (badge?: string): string => {
  if (!badge) return ''
  const b = badge.toLowerCase()
  if (b.includes('limited') || b.includes('collector')) return 'limited'
  if (b.includes('new') || b.includes('drop')) return 'new'
  if (b.includes('match')) return 'match'
  return 'trending'
}

export const GameDayProductCard: React.FC<GameDayProductCardProps> = ({
  product,
  onSelect,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  const stars = '★'.repeat(Math.round(product.rating)) + '☆'.repeat(5 - Math.round(product.rating))

  return (
    <div className="gd-product-card" onClick={() => onSelect(product)}>
      <div className="gd-product-img-wrap">
        <img
          src={product.image}
          alt={product.name}
          className="gd-product-img primary"
        />
        <img
          src={product.hoverImage}
          alt={`${product.name} alt view`}
          className="gd-product-img hover"
        />

        {product.badge && (
          <span className={`gd-product-badge ${getBadgeClass(product.badge)}`}>
            {product.badge}
          </span>
        )}

        <button
          className={`gd-product-wishlist${isWishlisted ? ' active' : ''}`}
          onClick={(e) => {
            e.stopPropagation()
            onToggleWishlist(product.id)
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          {isWishlisted ? '♥' : '♡'}
        </button>

        <button
          className="gd-product-quick-add"
          onClick={(e) => {
            e.stopPropagation()
            onAddToCart(product, product.sizes[0] || 'M', product.colors[0])
          }}
        >
          {product.canCustomize ? '+ CUSTOMISE & ADD' : '+ QUICK ADD'}
        </button>
      </div>

      <div className="gd-product-info">
        <p className="gd-product-sport">{product.sport.toUpperCase()}{product.teamName ? ` · ${product.teamName}` : ''}</p>
        <h3 className="gd-product-name">{product.name}</h3>
        <div className="gd-product-rating">
          <span className="gd-product-stars">{stars}</span>
          <span>{product.rating.toFixed(1)} ({product.reviewCount})</span>
        </div>
        <div className="gd-product-pricing">
          <span className="gd-product-price">₹{product.price.toLocaleString('en-IN')}</span>
          {product.compareAtPrice && (
            <span className="gd-product-compare">₹{product.compareAtPrice.toLocaleString('en-IN')}</span>
          )}
        </div>
        {product.colors.length > 0 && (
          <div className="gd-product-colors">
            {product.colors.map((c) => (
              <span
                key={c.name}
                className="gd-color-dot"
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
