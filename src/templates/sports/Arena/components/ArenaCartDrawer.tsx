import React, { useState } from 'react'
import type { ArenaCartItem, ArenaProduct } from '../types'
import { ARENA_PRODUCTS } from '../data/arenaData'

interface ArenaCartDrawerProps {
  isOpen: boolean
  onClose: () => void
  items: ArenaCartItem[]
  onUpdateQuantity: (itemId: string, newQty: number) => void
  onRemoveItem: (itemId: string) => void
  onCheckout: () => void
  onSelectProduct?: (product: ArenaProduct) => void
}

const FREE_SHIPPING_THRESHOLD = 100

export const ArenaCartDrawer: React.FC<ArenaCartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
  onSelectProduct,
}) => {
  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discountPct: number } | null>(
    null
  )
  const [promoError, setPromoError] = useState<string | null>(null)

  if (!isOpen) return null

  // Calculations
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const discountAmount = appliedPromo ? (subtotal * appliedPromo.discountPct) / 100 : 0
  const afterDiscount = Math.max(0, subtotal - discountAmount)
  const freeShippingUnlocked = afterDiscount >= FREE_SHIPPING_THRESHOLD
  const progressToFreeShipping = Math.min(100, (afterDiscount / FREE_SHIPPING_THRESHOLD) * 100)
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - afterDiscount)
  const shipping = freeShippingUnlocked || items.length === 0 ? 0 : 15
  const estimatedTax = afterDiscount > 0 ? afterDiscount * 0.08 : 0
  const finalTotal = afterDiscount + shipping + estimatedTax

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    const trimmed = promoCode.trim().toUpperCase()
    if (trimmed === 'STADIUM20' || trimmed === 'ARENAPRO') {
      setAppliedPromo({ code: trimmed, discountPct: 20 })
      setPromoError(null)
      setPromoCode('')
    } else {
      setPromoError('Invalid match code. Try "STADIUM20" or "ARENAPRO"')
    }
  }

  const handleRemovePromo = () => {
    setAppliedPromo(null)
  }

  // Quick upsell recommendations (items not currently in cart)
  const upsellItems = ARENA_PRODUCTS.filter(
    (p) => !items.some((item) => item.product.id === p.id)
  ).slice(0, 2)

  return (
    <div className="arena-drawer-backdrop" onClick={onClose}>
      <aside className="arena-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Drawer Header */}
        <div className="arena-drawer-header">
          <h3>
            Locker Cart <span>({items.reduce((s, i) => s + i.quantity, 0)})</span>
          </h3>
          <button
            type="button"
            className="arena-modal-close-btn"
            onClick={onClose}
            aria-label="Close cart drawer"
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="arena-free-shipping-bar">
          <div className="arena-fs-text">
            {freeShippingUnlocked ? (
              <span style={{ color: '#4ade80' }}>
                🎉 You Unlocked Free Stadium Express Shipping!
              </span>
            ) : (
              <span>
                Add <strong>${remainingForFreeShipping.toFixed(2)}</strong> more for FREE
                Matchday Shipping
              </span>
            )}
          </div>
          <div className="arena-fs-progress-track">
            <div
              className="arena-fs-progress-fill"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Drawer Body */}
        {items.length === 0 ? (
          <div className="arena-cart-empty">
            <div className="arena-cart-empty-icon">🏟️</div>
            <h4 className="arena-cart-empty-title">Your Cart Is Empty</h4>
            <p className="arena-cart-empty-desc">
              Gear up for match day. Add jerseys, carbon cleats, or pro bats from our latest drop.
            </p>
            <button
              type="button"
              className="arena-cta-primary"
              style={{ padding: '0.8rem 1.8rem' }}
              onClick={onClose}
            >
              Shop Championship Gear
            </button>
          </div>
        ) : (
          <>
            <div className="arena-drawer-items">
              {items.map((item) => (
                <div key={item.id} className="arena-cart-item">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="arena-cart-img"
                  />
                  <div>
                    <h4 className="arena-cart-item-title">{item.product.name}</h4>
                    <div className="arena-cart-item-meta">
                      Size: {item.selectedSize} • Color: {item.selectedColor.name}
                    </div>
                    <div
                      style={{
                        fontSize: '0.86rem',
                        fontWeight: 800,
                        color: 'var(--arena-accent)',
                        marginTop: '0.2rem',
                      }}
                    >
                      ${item.product.price}
                    </div>

                    <div className="arena-cart-qty-ctrl">
                      <button
                        type="button"
                        className="arena-qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        –
                      </button>
                      <span style={{ fontSize: '0.8rem', fontWeight: 700, padding: '0 4px' }}>
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        className="arena-qty-btn"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="arena-cart-item-remove-btn"
                    onClick={() => onRemoveItem(item.id)}
                    aria-label={`Remove ${item.product.name}`}
                  >
                    🗑
                  </button>
                </div>
              ))}

              {/* Locker Essentials Quick Recommendation */}
              {upsellItems.length > 0 && (
                <div style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                  <div
                    style={{
                      fontSize: '0.74rem',
                      fontWeight: 800,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: 'var(--arena-text-dim)',
                      marginBottom: '0.65rem',
                    }}
                  >
                    Matchday Add-Ons
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                    {upsellItems.map((upsell) => (
                      <div
                        key={upsell.id}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '48px 1fr auto',
                          gap: '0.75rem',
                          alignItems: 'center',
                          background: 'rgba(255,255,255,0.03)',
                          padding: '0.45rem 0.6rem',
                          borderRadius: '6px',
                          border: '1px solid rgba(255,255,255,0.05)',
                        }}
                      >
                        <img
                          src={upsell.image}
                          alt={upsell.name}
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px' }}
                        />
                        <div>
                          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ffffff' }}>
                            {upsell.name}
                          </div>
                          <div style={{ fontSize: '0.74rem', color: 'var(--arena-accent)', fontWeight: 800 }}>
                            ${upsell.price}
                          </div>
                        </div>
                        {onSelectProduct && (
                          <button
                            type="button"
                            className="arena-quick-add-btn"
                            style={{ padding: '0.35rem 0.65rem', fontSize: '0.72rem' }}
                            onClick={() => onSelectProduct(upsell)}
                          >
                            View
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Drawer Footer & Checkout */}
            <div className="arena-drawer-footer">
              {/* Promo Code Form */}
              {appliedPromo ? (
                <div className="arena-promo-applied">
                  <span>
                    ✓ Code <strong>{appliedPromo.code}</strong> applied ({appliedPromo.discountPct}% OFF)
                  </span>
                  <button
                    type="button"
                    onClick={handleRemovePromo}
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', fontWeight: 700 }}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="arena-promo-wrap">
                  <input
                    type="text"
                    placeholder="PROMO CODE (TRY: STADIUM20)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="arena-promo-input"
                  />
                  <button type="submit" className="arena-promo-btn">
                    Apply
                  </button>
                </form>
              )}
              {promoError && (
                <div style={{ color: '#ef4444', fontSize: '0.74rem', marginBottom: '0.75rem' }}>
                  {promoError}
                </div>
              )}

              {/* Subtotal breakdown */}
              <div className="arena-drawer-summary-row">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {appliedPromo && (
                <div className="arena-drawer-summary-row" style={{ color: '#4ade80' }}>
                  <span>Match Discount ({appliedPromo.discountPct}%)</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="arena-drawer-summary-row">
                <span>Matchday Express Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
              </div>

              <div className="arena-drawer-summary-row">
                <span>Estimated Tax (8%)</span>
                <span>${estimatedTax.toFixed(2)}</span>
              </div>

              <div className="arena-drawer-summary-row total">
                <span>Total Due</span>
                <span style={{ color: 'var(--arena-accent)' }}>${finalTotal.toFixed(2)}</span>
              </div>

              <button
                type="button"
                className="arena-checkout-btn"
                onClick={onCheckout}
              >
                <span>🔒 Complete Secure Order • ${finalTotal.toFixed(2)}</span>
              </button>

              <div
                style={{
                  textAlign: 'center',
                  fontSize: '0.72rem',
                  color: 'var(--arena-text-dim)',
                  marginTop: '0.75rem',
                }}
              >
                ⚡ 30-Day Pro Match Guarantee • Express Delivery
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  )
}

