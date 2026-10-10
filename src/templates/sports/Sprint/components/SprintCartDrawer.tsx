import React, { useState } from 'react'
import type { SprintCartItem, SprintProduct } from '../types'

interface SprintCartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: SprintCartItem[]
  onUpdateQuantity: (itemId: string, newQty: number) => void
  onRemoveItem: (itemId: string) => void
  onCheckout: () => void
  onSelectProduct?: (product: SprintProduct) => void
}

const FREE_SHIPPING_THRESHOLD = 120

export const SprintCartDrawer: React.FC<SprintCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('')
  const [discountPercent, setDiscountPercent] = useState<number | null>(null)
  const [promoMsg, setPromoMsg] = useState<string | null>(null)

  if (!isOpen) return null

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const discount = discountPercent ? (subtotal * discountPercent) / 100 : 0
  const afterDiscount = Math.max(0, subtotal - discount)
  const freeShipping = afterDiscount >= FREE_SHIPPING_THRESHOLD
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - afterDiscount)
  const progressPercent = Math.min(100, (afterDiscount / FREE_SHIPPING_THRESHOLD) * 100)
  const shipping = freeShipping || items.length === 0 ? 0 : 12
  const total = afterDiscount + shipping

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = promoCode.trim().toUpperCase()
    if (trimmed === 'SPRINT15' || trimmed === 'RUNYOURWAY') {
      setDiscountPercent(15)
      setPromoMsg('15% runner discount applied!')
      setPromoCode('')
    } else {
      setPromoMsg('Invalid promo code. Try "SPRINT15"')
    }
  }

  return (
    <div className="sprint-cart-backdrop" onClick={onClose}>
      <aside className="sprint-cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="sprint-cart-header">
          <h3>
            Your Bag <span>({items.reduce((s, i) => s + i.quantity, 0)})</span>
          </h3>
          <button
            type="button"
            className="sprint-icon-btn"
            onClick={onClose}
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Indicator */}
        <div className="sprint-cart-fs-bar">
          <div className="sprint-cart-fs-text">
            {freeShipping ? (
              <span style={{ color: '#10b981', fontWeight: 700 }}>
                ✓ You Unlocked Complimentary Express Shipping!
              </span>
            ) : (
              <span>
                Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more for Free Delivery
              </span>
            )}
          </div>
          <div className="sprint-cart-fs-track">
            <div
              className="sprint-cart-fs-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        {items.length === 0 ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '2rem',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>👟</div>
            <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', fontWeight: 800 }}>
              Your Running Bag Is Empty
            </h4>
            <p style={{ color: 'var(--sprint-text-muted)', fontSize: '0.86rem', margin: '0 0 1.5rem 0' }}>
              Find your next daily trainer or marathon carbon racer to get rolling.
            </p>
            <button
              type="button"
              className="sprint-btn-primary"
              onClick={onClose}
            >
              Shop Running Shoes
            </button>
          </div>
        ) : (
          <>
            <div className="sprint-cart-items">
              {items.map((item) => (
                <div key={item.id} className="sprint-cart-item">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="sprint-cart-item-img"
                    onError={(e) => {
                      e.currentTarget.src =
                        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=80'
                    }}
                  />
                  <div>
                    <h4 style={{ fontSize: '0.88rem', fontWeight: 700, margin: '0 0 0.2rem 0' }}>
                      {item.product.name}
                    </h4>
                    <div style={{ fontSize: '0.74rem', color: 'var(--sprint-text-muted)' }}>
                      Size: {item.selectedSize} • Color: {item.selectedColor.name}
                    </div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 800, marginTop: '0.3rem' }}>
                      ${item.product.price}
                    </div>

                    <div className="sprint-cart-qty-ctrl">
                      <button
                        type="button"
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      >
                        –
                      </button>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, padding: '0 4px' }}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        style={{ background: 'transparent', border: 'none', cursor: 'pointer' }}
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#94a3b8' }}
                    aria-label={`Remove ${item.product.name}`}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Footer */}
            <div className="sprint-cart-footer">
              {/* Promo Form */}
              <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
                <input
                  type="text"
                  placeholder="PROMO CODE (TRY: SPRINT15)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  style={{
                    flex: 1,
                    border: '1px solid var(--sprint-border)',
                    borderRadius: 'var(--sprint-radius-sm)',
                    padding: '0.5rem 0.75rem',
                    fontSize: '0.8rem',
                    outline: 'none',
                    textTransform: 'uppercase',
                  }}
                />
                <button
                  type="submit"
                  className="sprint-btn-secondary"
                  style={{ padding: '0.5rem 0.9rem', fontSize: '0.78rem' }}
                >
                  Apply
                </button>
              </form>
              {promoMsg && (
                <div
                  style={{
                    fontSize: '0.74rem',
                    marginBottom: '0.85rem',
                    color: discountPercent ? '#10b981' : '#ef4444',
                    fontWeight: 600,
                  }}
                >
                  {promoMsg}
                </div>
              )}

              {/* Subtotal Breakdown */}
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', marginBottom: '0.5rem' }}>
                <span style={{ color: 'var(--sprint-text-muted)' }}>Subtotal</span>
                <strong>${subtotal.toFixed(2)}</strong>
              </div>

              {discountPercent && (
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', color: '#10b981', marginBottom: '0.5rem' }}>
                  <span>Runner Discount ({discountPercent}%)</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.86rem', marginBottom: '0.85rem' }}>
                <span style={{ color: 'var(--sprint-text-muted)' }}>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.15rem',
                  fontWeight: 800,
                  paddingTop: '0.85rem',
                  borderTop: '1px solid var(--sprint-border)',
                  marginBottom: '1.25rem',
                }}
              >
                <span>Estimated Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button
                type="button"
                className="sprint-btn-primary"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={onCheckout}
              >
                Proceed To Checkout →
              </button>

              <div
                style={{
                  textAlign: 'center',
                  fontSize: '0.72rem',
                  color: 'var(--sprint-text-muted)',
                  marginTop: '0.75rem',
                }}
              >
                🔒 30-Day Risk-Free Trial • Free Exchanges & Returns
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

