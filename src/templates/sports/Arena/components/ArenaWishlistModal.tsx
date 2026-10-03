import React from 'react'
import type { ArenaProduct } from '../types'
import { ARENA_PRODUCTS } from '../data/arenaData'

interface ArenaWishlistModalProps {
  isOpen: boolean
  onClose: () => void
  wishlistIds: string[]
  onRemoveFromWishlist: (productId: string) => void
  onSelectProduct: (product: ArenaProduct) => void
  onQuickAdd: (product: ArenaProduct) => void
}

export const ArenaWishlistModal: React.FC<ArenaWishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  onRemoveFromWishlist,
  onSelectProduct,
  onQuickAdd,
}) => {
  if (!isOpen) return null

  const wishlistedProducts = ARENA_PRODUCTS.filter((p) => wishlistIds.includes(p.id))

  return (
    <div className="arena-wishlist-backdrop" onClick={onClose}>
      <div className="arena-wishlist-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="arena-wishlist-header">
          <h3>
            Saved Locker Gear <span>({wishlistedProducts.length})</span>
          </h3>
          <button
            type="button"
            className="arena-modal-close-btn"
            onClick={onClose}
            aria-label="Close wishlist modal"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="arena-wishlist-body">
          {wishlistedProducts.length === 0 ? (
            <div className="arena-cart-empty">
              <div className="arena-cart-empty-icon">⭐</div>
              <h4 className="arena-cart-empty-title">Your Stadium Locker Is Empty</h4>
              <p className="arena-cart-empty-desc">
                Save your favorite cleats, match jerseys, or equipment here for quick access when you
                are ready to play.
              </p>
              <button
                type="button"
                className="arena-cta-primary"
                style={{ padding: '0.8rem 1.8rem' }}
                onClick={onClose}
              >
                Browse Arena Collection
              </button>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div key={product.id} className="arena-wishlist-row">
                <img
                  src={product.image}
                  alt={product.name}
                  className="arena-wishlist-thumb"
                  onClick={() => {
                    onSelectProduct(product)
                    onClose()
                  }}
                  style={{ cursor: 'pointer' }}
                />

                <div
                  className="arena-wishlist-row-info"
                  onClick={() => {
                    onSelectProduct(product)
                    onClose()
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <div
                    style={{
                      fontSize: '0.72rem',
                      color: 'var(--arena-text-dim)',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      marginBottom: '0.2rem',
                    }}
                  >
                    {product.sport} • {product.brand}
                  </div>
                  <h4>{product.name}</h4>
                  <div className="arena-wishlist-row-price">${product.price}</div>
                </div>

                <div className="arena-wishlist-row-actions">
                  <button
                    type="button"
                    className="arena-cta-primary"
                    style={{ padding: '0.55rem 1rem', fontSize: '0.78rem' }}
                    onClick={() => {
                      onQuickAdd(product)
                      onRemoveFromWishlist(product.id)
                    }}
                  >
                    Move To Cart
                  </button>

                  <button
                    type="button"
                    className="arena-cart-item-remove-btn"
                    onClick={() => onRemoveFromWishlist(product.id)}
                    aria-label={`Remove ${product.name} from wishlist`}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

