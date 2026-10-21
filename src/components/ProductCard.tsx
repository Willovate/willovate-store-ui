import { useState } from 'react'
import { formatCurrency } from '../lib/currency'
import type { Product } from '../types'
import { useWishlist } from '../hooks/useWishlist'

export type ProductCardItem = Product & {
  imageUrl?: string
  image?: string
}

export function ProductCard({
  product,
  onAdd,
}: {
  product: ProductCardItem
  onAdd: (product: Product) => void
}) {
  const [justAdded, setJustAdded] = useState(false)
  const [imgError, setImgError] = useState(false)
  const hasDiscount = product.compareAtPrice != null
  const imageSrc = product.imageUrl || product.image
  const showImage = Boolean(imageSrc && !imgError)

  const wishlist = useWishlist()
  const isSaved = wishlist.isInWishlist(product.id)

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.stopPropagation()
    e.preventDefault()
    if (wishlist) {
      wishlist.toggle(product)
    }
  }

  return (
    <article className="product-card">
      <div className={`product-visual theme-${product.visualTheme}`}>
        {product.isFeatured && <span className="product-badge">Editor’s pick</span>}
        {showImage ? (
          <img
            src={imageSrc}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="product-shape" aria-hidden="true">
            <span>{product.name.slice(0, 1)}</span>
          </div>
        )}

        <button
          className="wishlist-btn"
          type="button"
          onClick={handleWishlistToggle}
          aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          aria-pressed={isSaved}
          style={{
            position: 'absolute',
            top: '14px',
            right: '14px',
            width: '36px',
            height: '36px',
            display: 'grid',
            placeItems: 'center',
            border: 'none',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.92)',
            color: isSaved ? '#e11d48' : '#1d211c',
            cursor: 'pointer',
            zIndex: 2,
            boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
            transition: 'transform 150ms ease, background 150ms ease, color 150ms ease',
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={isSaved ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>

        <button
          className={`quick-add ${justAdded ? 'is-added' : ''}`}
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            onAdd(product)
            setJustAdded(true)
            setTimeout(() => setJustAdded(false), 2000)
          }}
          aria-label={justAdded ? `Added ${product.name} to cart` : `Add ${product.name} to cart`}
          aria-live="polite"
          style={justAdded ? {
            backgroundColor: '#16a34a',
            color: '#ffffff',
            transform: 'scale(1.08)',
          } : undefined}
        >
          {justAdded ? '✓' : '+'}
        </button>
      </div>
      <div className="product-copy">
        <div>
          <p className="eyebrow">{product.category}</p>
          <h3>{product.name}</h3>
        </div>
        <div className="price-row">
          <span>{formatCurrency(product.price)}</span>
          {hasDiscount && (
            <del>{formatCurrency(product.compareAtPrice as number)}</del>
          )}
        </div>
        <p className="product-description">{product.description}</p>
      </div>
    </article>
  )
}
