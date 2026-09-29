import React from 'react'
import type { ProGearProduct } from '../types'

export interface ProGearWishlistModalProps {
  isOpen: boolean
  onClose: () => void
  wishlistIds: string[]
  products: ProGearProduct[]
  onRemoveFromWishlist: (productId: string) => void
  onSelectProduct: (product: ProGearProduct) => void
  onQuickAdd: (product: ProGearProduct) => void
}

export const ProGearWishlistModal: React.FC<ProGearWishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  products,
  onRemoveFromWishlist,
  onSelectProduct,
  onQuickAdd,
}) => {
  if (!isOpen) return null

  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id))

  return (
    <div className="progear-pdp-backdrop progear-wishlist-backdrop" onClick={onClose}>
      <div
        className="progear-wishlist-modal-card"
        style={{
          background: '#ffffff',
          borderRadius: 'var(--pg-radius-lg)',
          width: 'min(720px, 100%)',
          maxHeight: '85vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow: '0 24px 60px rgba(0,0,0,0.2)',
        }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Saved Equipment Wishlist"
      >
        <div
          style={{
            padding: '1.25rem 1.75rem',
            borderBottom: '1px solid var(--pg-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#0f172a' }}>
            Saved Equipment ({wishlistProducts.length})
          </h3>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              fontSize: '1.25rem',
              cursor: 'pointer',
              color: 'var(--pg-text)',
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {wishlistProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <span style={{ fontSize: '2.5rem' }}>♥</span>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 800, margin: '0.75rem 0 0.35rem 0' }}>
                Your saved wishlist is empty
              </h4>
              <p style={{ color: 'var(--pg-text-muted)', fontSize: '0.84rem' }}>
                Click the heart icon on any bat, ball, or equipment piece to save it for later.
              </p>
            </div>
          ) : (
            wishlistProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1rem',
                  border: '1px solid var(--pg-border)',
                  borderRadius: 'var(--pg-radius)',
                }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  style={{
                    width: '68px',
                    height: '68px',
                    objectFit: 'contain',
                    background: '#f8fafc',
                    borderRadius: '4px',
                  }}
                  onError={(e) => {
                    e.currentTarget.src =
                      'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&auto=format&fit=crop&q=80'
                  }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--pg-primary)', fontWeight: 800, textTransform: 'uppercase' }}>
                    {product.sport}
                  </div>
                  <strong
                    style={{
                      fontSize: '0.92rem',
                      color: '#0f172a',
                      display: 'block',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      onClose()
                      onSelectProduct(product)
                    }}
                  >
                    {product.name}
                  </strong>
                  <div style={{ fontSize: '0.86rem', fontWeight: 900, color: '#0f172a', marginTop: '0.2rem' }}>
                    ₹{product.price.toLocaleString('en-IN')}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className="progear-btn-primary"
                    style={{ padding: '0.5rem 0.95rem', fontSize: '0.76rem' }}
                    onClick={() => onQuickAdd(product)}
                  >
                    + Add to Cart
                  </button>
                  <button
                    type="button"
                    onClick={() => onRemoveFromWishlist(product.id)}
                    style={{
                      background: 'transparent',
                      border: '1px solid var(--pg-border)',
                      borderRadius: 'var(--pg-radius-sm)',
                      padding: '0.5rem',
                      color: '#ef4444',
                      cursor: 'pointer',
                    }}
                    title="Remove from saved"
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

