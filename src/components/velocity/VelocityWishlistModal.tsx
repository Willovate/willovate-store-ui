import React from 'react'
import type { VelocityProduct, VelocityColor } from './types'

interface VelocityWishlistModalProps {
  isOpen: boolean
  wishlistIds: Set<string>
  products: VelocityProduct[]
  onClose: () => void
  onRemove: (productId: string) => void
  onQuickAdd: (product: VelocityProduct, size?: string, color?: VelocityColor) => void
  onSelectProduct: (product: VelocityProduct) => void
}

export const VelocityWishlistModal: React.FC<VelocityWishlistModalProps> = ({
  isOpen,
  wishlistIds,
  products,
  onClose,
  onRemove,
  onQuickAdd,
  onSelectProduct,
}) => {
  if (!isOpen) return null

  const wishlistedProducts = products.filter((p) => wishlistIds.has(p.id))

  return (
    <div className="velocity-modal-backdrop" onClick={onClose}>
      <div
        className="velocity-wishlist-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Your Saved Wishlist"
      >
        <div className="wishlist-modal-header">
          <div>
            <h3>YOUR SAVED GEAR</h3>
            <span className="wishlist-counter-tag">{wishlistedProducts.length} items saved</span>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={onClose}
            aria-label="Close wishlist"
          >
            ×
          </button>
        </div>

        <div className="wishlist-modal-body">
          {wishlistedProducts.length === 0 ? (
            <div className="wishlist-empty-state">
              <span className="empty-heart-icon">♡</span>
              <h4>NO GEAR SAVED YET</h4>
              <p>Click the heart icon on any shoe, apparel, or equipment item to save it here for later.</p>
              <button
                type="button"
                className="empty-wishlist-btn volt-btn"
                onClick={onClose}
              >
                Browse Trending Products →
              </button>
            </div>
          ) : (
            <div className="wishlist-items-grid">
              {wishlistedProducts.map((prod) => (
                <div key={prod.id} className="wishlist-item-card">
                  <div
                    className="wishlist-media"
                    onClick={() => {
                      onClose()
                      onSelectProduct(prod)
                    }}
                  >
                    <img src={prod.images[0]} alt={prod.name} />
                  </div>

                  <div className="wishlist-info">
                    <span className="wishlist-brand">{prod.brand} • {prod.sport}</span>
                    <h4
                      className="wishlist-title"
                      onClick={() => {
                        onClose()
                        onSelectProduct(prod)
                      }}
                    >
                      {prod.name}
                    </h4>

                    <div className="wishlist-price-row">
                      <span className="current-price">${prod.price}</span>
                      {prod.compareAtPrice > prod.price && (
                        <del className="compare-price">${prod.compareAtPrice}</del>
                      )}
                    </div>

                    <div className="wishlist-actions-row">
                      <button
                        type="button"
                        className="wishlist-add-cart-btn volt-btn"
                        onClick={() => {
                          onQuickAdd(prod, prod.sizes[0], prod.colors[0])
                        }}
                      >
                        + Move to Bag
                      </button>

                      <button
                        type="button"
                        className="wishlist-delete-btn"
                        onClick={() => onRemove(prod.id)}
                        aria-label={`Remove ${prod.name} from wishlist`}
                        title="Remove"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

