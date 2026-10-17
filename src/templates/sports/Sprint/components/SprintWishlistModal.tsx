import React from 'react'
import type { SprintProduct } from '../types'
import { SPRINT_PRODUCTS } from '../data/sprintData'

interface SprintWishlistModalProps {
  isOpen: boolean
  onClose: () => void
  wishlistIds: string[]
  onRemoveFromWishlist: (productId: string) => void
  onSelectProduct: (product: SprintProduct) => void
  onQuickAdd: (product: SprintProduct) => void
}

export const SprintWishlistModal: React.FC<SprintWishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistIds,
  onRemoveFromWishlist,
  onSelectProduct,
  onQuickAdd,
}) => {
  if (!isOpen) return null

  const items = SPRINT_PRODUCTS.filter((p) => wishlistIds.includes(p.id))

  return (
    <div className="sprint-wishlist-backdrop" onClick={onClose}>
      <div className="sprint-wishlist-card" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sprint-cart-header">
          <h3>
            Saved Gear <span>({items.length})</span>
          </h3>
          <button
            type="button"
            className="sprint-icon-btn"
            onClick={onClose}
            aria-label="Close wishlist"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem 1.75rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>♡</div>
              <h4 style={{ margin: '0 0 0.5rem 0', fontWeight: 800 }}>No Saved Shoes Yet</h4>
              <p style={{ color: 'var(--sprint-text-muted)', fontSize: '0.86rem', margin: '0 0 1.25rem 0' }}>
                Tap the heart on any shoe or apparel item to keep track of it for your rotation.
              </p>
              <button
                type="button"
                className="sprint-btn-primary"
                onClick={onClose}
              >
                Browse Sprint Shoes
              </button>
            </div>
          ) : (
            items.map((prod) => (
              <div
                key={prod.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '70px 1fr auto',
                  gap: '1rem',
                  alignItems: 'center',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--sprint-border-light)',
                }}
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  style={{
                    width: '70px',
                    height: '70px',
                    objectFit: 'contain',
                    background: '#f8fafc',
                    borderRadius: 'var(--sprint-radius-sm)',
                    border: '1px solid var(--sprint-border)',
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    onSelectProduct(prod)
                    onClose()
                  }}
                />

                <div
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    onSelectProduct(prod)
                    onClose()
                  }}
                >
                  <div style={{ fontSize: '0.72rem', color: 'var(--sprint-text-muted)', textTransform: 'uppercase' }}>
                    {prod.runningType} • {prod.category}
                  </div>
                  <h4 style={{ fontSize: '0.94rem', fontWeight: 700, margin: '0 0 0.2rem 0' }}>
                    {prod.name}
                  </h4>
                  <div style={{ fontSize: '0.9rem', fontWeight: 800 }}>${prod.price}</div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <button
                    type="button"
                    className="sprint-btn-primary"
                    style={{ padding: '0.45rem 0.85rem', fontSize: '0.76rem' }}
                    onClick={() => {
                      onQuickAdd(prod)
                      onRemoveFromWishlist(prod.id)
                    }}
                  >
                    Move To Bag
                  </button>

                  <button
                    type="button"
                    onClick={() => onRemoveFromWishlist(prod.id)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
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

