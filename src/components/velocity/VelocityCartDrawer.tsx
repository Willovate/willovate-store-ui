import React, { useState, useEffect } from 'react'
import type { VelocityCartItem, VelocityProduct } from './types'

interface VelocityCartDrawerProps {
  isOpen: boolean
  items: VelocityCartItem[]
  onClose: () => void
  onUpdateQty: (itemId: string, delta: number) => void
  onRemoveItem: (itemId: string) => void
  onSelectProduct: (product: VelocityProduct) => void
  onCheckout: () => void
}

export const VelocityCartDrawer: React.FC<VelocityCartDrawerProps> = ({
  isOpen,
  items,
  onClose,
  onUpdateQty,
  onRemoveItem,
  onSelectProduct,
  onCheckout,
}) => {
  const [promoInput, setPromoInput] = useState('')
  const [discountPercent, setDiscountPercent] = useState<number>(0)
  const [promoError, setPromoError] = useState<string | null>(null)
  const [promoSuccess, setPromoSuccess] = useState<string | null>(null)

  // Prevent background scrolling on mobile when cart drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const FREE_SHIPPING_THRESHOLD = 150

  const subtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const discountAmount = Math.round(subtotal * (discountPercent / 100))
  const freeShippingProgress = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100))
  const remainingForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal)
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD || items.length === 0 ? 0 : 15
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee)

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault()
    const clean = promoInput.trim().toUpperCase()
    if (clean === 'HYPERSONIC' || clean === 'WELCOME15') {
      setDiscountPercent(15)
      setPromoSuccess('15% discount applied successfully!')
      setPromoError(null)
    } else if (clean === 'VELOCITY20') {
      setDiscountPercent(20)
      setPromoSuccess('20% VIP athlete discount applied!')
      setPromoError(null)
    } else {
      setPromoError('Invalid code. Try "HYPERSONIC" for 15% off.')
      setPromoSuccess(null)
    }
  }

  if (!isOpen) return null

  return (
    <div className="velocity-cart-drawer-backdrop" onClick={onClose}>
      <aside
        className="velocity-cart-drawer"
        onClick={(e) => e.stopPropagation()}
        aria-label="Shopping Cart Drawer"
      >
        {/* 1. Drawer Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title-group">
            <h3>YOUR SHOPPING BAG</h3>
            <span className="cart-items-count-badge">
              {items.reduce((acc, i) => acc + i.quantity, 0)} items
            </span>
          </div>
          <button
            type="button"
            className="cart-close-btn"
            onClick={onClose}
            aria-label="Close cart drawer"
          >
            ×
          </button>
        </div>

        {/* 2. Free Shipping Progress Bar */}
        <div className="free-shipping-bar-container">
          <div className="shipping-bar-text">
            {subtotal >= FREE_SHIPPING_THRESHOLD ? (
              <span className="unlocked-free-shipping">
                🎉 <strong>CONGRATULATIONS!</strong> You’ve unlocked Free Express Shipping!
              </span>
            ) : (
              <span>
                Add <strong className="volt-price">${remainingForFreeShipping}</strong> more for <strong>FREE Express Shipping</strong>
              </span>
            )}
          </div>
          <div className="shipping-progress-track">
            <div
              className="shipping-progress-fill"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* 3. Items List or Empty State */}
        <div className="cart-drawer-body">
          {items.length === 0 ? (
            <div className="cart-empty-state">
              <div className="empty-cart-icon">🛍️</div>
              <h4>YOUR BAG IS CURRENTLY EMPTY</h4>
              <p>Explore the 2026 Velocity performance drop and power your next personal record.</p>
              <button
                type="button"
                className="empty-cart-btn volt-btn"
                onClick={onClose}
              >
                Shop Velocity Gear →
              </button>
            </div>
          ) : (
            <div className="cart-items-list">
              {items.map((item) => (
                <div key={item.id} className="cart-item-card">
                  <div
                    className="cart-item-thumbnail"
                    onClick={() => {
                      onClose()
                      onSelectProduct(item.product)
                    }}
                  >
                    <img src={item.product.images[0]} alt={item.product.name} />
                  </div>

                  <div className="cart-item-details">
                    <div className="item-title-row">
                      <h4
                        className="item-name"
                        onClick={() => {
                          onClose()
                          onSelectProduct(item.product)
                        }}
                      >
                        {item.product.name}
                      </h4>
                      <button
                        type="button"
                        className="item-remove-btn"
                        onClick={() => onRemoveItem(item.id)}
                        aria-label={`Remove ${item.product.name}`}
                        title="Remove item"
                      >
                        🗑️
                      </button>
                    </div>

                    <div className="item-variants-pills">
                      <span className="variant-pill">
                        <span className="color-swatch-tiny" style={{ backgroundColor: item.selectedColor.hex }} />
                        {item.selectedColor.name}
                      </span>
                      <span className="variant-pill">Size: {item.selectedSize}</span>
                    </div>

                    <div className="item-bottom-row">
                      <div className="item-qty-selector">
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => onUpdateQty(item.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <span className="qty-number">{item.quantity}</span>
                        <button
                          type="button"
                          className="qty-btn"
                          onClick={() => onUpdateQty(item.id, 1)}
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="item-price-column">
                        <span className="item-total-price">
                          ${item.product.price * item.quantity}
                        </span>
                        {item.product.compareAtPrice > item.product.price && (
                          <del className="item-original-price">
                            ${item.product.compareAtPrice * item.quantity}
                          </del>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 4. Cart Footer / Checkout Summary */}
        {items.length > 0 && (
          <div className="cart-drawer-footer">
            {/* Promo Code Input Field */}
            <form className="cart-promo-form" onSubmit={handleApplyPromo}>
              <div className="promo-input-row">
                <input
                  type="text"
                  placeholder="Discount code (e.g. HYPERSONIC)"
                  value={promoInput}
                  onChange={(e) => setPromoInput(e.target.value)}
                  className="promo-input"
                />
                <button type="submit" className="promo-apply-btn">
                  Apply
                </button>
              </div>
              {promoSuccess && <span className="promo-msg success">{promoSuccess}</span>}
              {promoError && <span className="promo-msg error">{promoError}</span>}
            </form>

            {/* Calculations Breakdown */}
            <div className="cart-totals-breakdown">
              <div className="totals-row">
                <span>Subtotal</span>
                <strong>${subtotal}</strong>
              </div>

              {discountAmount > 0 && (
                <div className="totals-row discount-row">
                  <span>Discount ({discountPercent}%)</span>
                  <span className="volt-discount-text">−${discountAmount}</span>
                </div>
              )}

              <div className="totals-row">
                <span>Estimated Express Shipping</span>
                <span>{shippingFee === 0 ? <strong className="free-tag">FREE</strong> : `$${shippingFee}`}</span>
              </div>

              <div className="totals-row grand-total-row">
                <span>Estimated Total</span>
                <span className="grand-total-price">${grandTotal}</span>
              </div>
            </div>

            {/* Checkout Action Buttons */}
            <div className="cart-actions-stack">
              <button
                type="button"
                className="checkout-btn volt-btn"
                onClick={onCheckout}
              >
                Proceed to Checkout • ${grandTotal}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>

              <button
                type="button"
                className="continue-shopping-btn"
                onClick={onClose}
              >
                Continue Shopping
              </button>
            </div>

            <div className="cart-security-badge">
              <span>🔒 256-Bit SSL Encrypted Checkout • 30-Day Money-Back Guarantee</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  )
}

