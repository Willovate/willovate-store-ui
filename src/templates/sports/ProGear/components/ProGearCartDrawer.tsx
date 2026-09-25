import React, { useState } from 'react'
import type { ProGearCartItem, ProGearProduct } from '../types'

export interface ProGearCartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cart: ProGearCartItem[]
  onUpdateQuantity: (cartItemId: string, newQty: number) => void
  onRemoveItem: (cartItemId: string) => void
  onCheckout: () => void
  recommendedAddons: ProGearProduct[]
  onAddRecommendation: (product: ProGearProduct) => void
}

const FREE_SHIPPING_THRESHOLD = 999 // ₹999 as explicitly requested

export const ProGearCartDrawer: React.FC<ProGearCartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  recommendedAddons,
  onAddRecommendation,
}) => {
  const [promoCode, setPromoCode] = useState('')
  const [discountApplied, setDiscountApplied] = useState(false)
  const [promoError, setPromoError] = useState('')

  if (!isOpen) return null

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const discountAmount = discountApplied ? Math.round(subtotal * 0.1) : 0
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const shippingFee = subtotal === 0 || isFreeShipping ? 0 : 99
  const total = subtotal - discountAmount + shippingFee

  const progressPercent = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100))

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    if (promoCode.trim().toUpperCase() === 'PROGEAR10') {
      setDiscountApplied(true)
      setPromoError('')
    } else {
      setPromoError('Invalid coupon code. Try PROGEAR10')
    }
  }

  return (
    <div className="progear-cart-backdrop" onClick={onClose}>
      <aside
        className="progear-cart-drawer"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Your ProGear Cart"
      >
        {/* Header */}
        <div className="progear-cart-header">
          <h3>
            Equipment Cart ({cart.reduce((s, i) => s + i.quantity, 0)})
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
            aria-label="Close cart"
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Progress Indicator (₹999 threshold) */}
        <div className="progear-cart-fs-bar">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 800 }}>
            {isFreeShipping ? (
              <span style={{ color: 'var(--pg-primary)' }}>
                🎉 You've unlocked FREE EXPRESS SHIPPING!
              </span>
            ) : (
              <span style={{ color: 'var(--pg-text)' }}>
                Add <strong>₹{amountToFreeShipping.toLocaleString('en-IN')}</strong> more for Free Shipping!
              </span>
            )}
            <span style={{ color: 'var(--pg-primary)' }}>{progressPercent}%</span>
          </div>
          <div className="progear-cart-fs-track">
            <div
              className="progear-cart-fs-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        {cart.length === 0 ? (
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
            <span style={{ fontSize: '3rem', marginBottom: '1rem' }}>🛒</span>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 900, marginBottom: '0.4rem' }}>
              Your equipment bag is empty
            </h4>
            <p style={{ color: 'var(--pg-text-muted)', fontSize: '0.84rem', marginBottom: '1.5rem' }}>
              Explore match balls, cricket bats, rackets and equipment bundles.
            </p>
            <button
              type="button"
              className="progear-btn-primary"
              onClick={onClose}
            >
              Start Shopping Equipment
            </button>
          </div>
        ) : (
          <div className="progear-cart-items">
            {cart.map((item) => (
              <div key={item.id} className="progear-cart-item">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="progear-cart-item-img"
                />

                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      color: 'var(--pg-primary)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {item.product.sport}
                  </span>
                  <strong style={{ fontSize: '0.88rem', color: '#0f172a', lineHeight: 1.25 }}>
                    {item.product.name}
                  </strong>
                  <span style={{ fontSize: '0.74rem', color: 'var(--pg-text-muted)', marginTop: '0.2rem' }}>
                    Variant: {item.selectedVariant}
                  </span>

                  {/* Quantity Controls */}
                  <div className="progear-cart-qty-ctrl">
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 800 }}
                    >
                      -
                    </button>
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, minWidth: '18px', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontWeight: 800 }}
                    >
                      +
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: 900, fontSize: '0.94rem', color: '#0f172a' }}>
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemoveItem(item.id)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--pg-text-dim)',
                      cursor: 'pointer',
                      fontSize: '0.74rem',
                      textDecoration: 'underline',
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            {/* Recommended Equipment Add-ons */}
            {recommendedAddons.length > 0 && (
              <div style={{ marginTop: '1.5rem', background: '#f8fafc', padding: '1rem', borderRadius: 'var(--pg-radius)', border: '1px solid var(--pg-border)' }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--pg-text-muted)', marginBottom: '0.75rem' }}>
                  ⚡ Recommended Matchday Add-ons
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {recommendedAddons.slice(0, 2).map((rec) => (
                    <div
                      key={rec.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '0.75rem',
                      }}
                    >
                      <img
                        src={rec.image}
                        alt={rec.name}
                        style={{ width: '40px', height: '40px', objectFit: 'contain', background: '#ffffff', borderRadius: '4px', border: '1px solid var(--pg-border)' }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {rec.name}
                        </div>
                        <div style={{ fontSize: '0.76rem', color: 'var(--pg-primary)', fontWeight: 800 }}>
                          ₹{rec.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => onAddRecommendation(rec)}
                        style={{
                          background: '#ffffff',
                          border: '1px solid var(--pg-primary)',
                          color: 'var(--pg-primary)',
                          borderRadius: '4px',
                          padding: '0.3rem 0.6rem',
                          fontSize: '0.74rem',
                          fontWeight: 800,
                          cursor: 'pointer',
                        }}
                      >
                        + Add
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Footer & Checkout */}
        {cart.length > 0 && (
          <div className="progear-cart-footer">
            {/* Promo code form */}
            <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <input
                type="text"
                placeholder="Coupon (e.g. PROGEAR10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.45rem 0.75rem',
                  border: '1px solid var(--pg-border)',
                  borderRadius: 'var(--pg-radius-sm)',
                  fontSize: '0.8rem',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                className="progear-btn-secondary"
                style={{ padding: '0.45rem 0.95rem', fontSize: '0.76rem' }}
              >
                Apply
              </button>
            </form>

            {promoError && (
              <div style={{ color: 'var(--pg-danger)', fontSize: '0.74rem', marginBottom: '0.5rem' }}>
                {promoError}
              </div>
            )}

            {/* Calculations Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.84rem', color: 'var(--pg-text)', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountApplied && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--pg-success)', fontWeight: 700 }}>
                  <span>PROGEAR10 (10% Off)</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Matchday Express Shipping</span>
                <span>{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontWeight: 900,
                  fontSize: '1.15rem',
                  color: '#0f172a',
                  borderTop: '1px solid var(--pg-border)',
                  paddingTop: '0.5rem',
                  marginTop: '0.2rem',
                }}
              >
                <span>Total Amount</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="button"
              className="progear-checkout-btn"
              onClick={onCheckout}
            >
              Proceed to Checkout • ₹{total.toLocaleString('en-IN')}
            </button>

            <div style={{ textAlign: 'center', marginTop: '0.75rem', fontSize: '0.72rem', color: 'var(--pg-text-dim)' }}>
              🔒 256-Bit SSL Encrypted • Verified Genuine Sports Equipment
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}

