import React from 'react'
import type { PeakCartItem } from '../types'

interface PeakCartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cart: PeakCartItem[]
  onUpdateQuantity: (index: number, qty: number) => void
  onRemoveItem: (index: number) => void
  onCheckout: () => void
}

export const PeakCartDrawer: React.FC<PeakCartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  const freeShippingThreshold = 1999
  const progressPercent = Math.min((subtotal / freeShippingThreshold) * 100, 100)
  const neededForFree = Math.max(freeShippingThreshold - subtotal, 0)

  return (
    <div className="pk-drawer-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="pk-cart-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="pk-cart-header">
          <h2 className="pk-cart-title">Your Expedition Pack ({cart.length})</h2>
          <button className="pk-cart-close" onClick={onClose} aria-label="Close cart">
            ✕
          </button>
        </div>

        {/* Free Shipping Progress Bar */}
        <div className="pk-shipping-bar">
          <p className="pk-shipping-bar-text">
            {neededForFree > 0 ? (
              <>
                Add <strong>₹{neededForFree.toLocaleString('en-IN')}</strong> more for{' '}
                <strong>Free Mountain Freight</strong>
              </>
            ) : (
              <strong>🎉 You've unlocked Free Expedition Shipping!</strong>
            )}
          </p>
          <div className="pk-shipping-track">
            <div className="pk-shipping-fill" style={{ width: `${progressPercent}%` }} />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="pk-cart-items">
          {cart.length === 0 ? (
            <div className="pk-cart-empty">
              <span className="pk-cart-empty-icon">🎒</span>
              <h3 className="pk-cart-empty-title">Your Pack is Empty</h3>
              <p className="pk-cart-empty-sub">
                No technical gear added yet. Explore our trail collection to pack your next journey.
              </p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.product.id}-${item.selectedSize}-${idx}`} className="pk-cart-item">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="pk-cart-item-img"
                />

                <div className="pk-cart-item-info">
                  <h4 className="pk-cart-item-name">{item.product.name}</h4>
                  <p className="pk-cart-item-meta">
                    Size: {item.selectedSize} · Color: {item.selectedColor.name}
                  </p>

                  <div className="pk-qty-row">
                    <div className="pk-qty-stepper">
                      <button
                        className="pk-qty-btn"
                        onClick={() => onUpdateQuantity(idx, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="pk-qty-val">{item.quantity}</span>
                      <button
                        className="pk-qty-btn"
                        onClick={() => onUpdateQuantity(idx, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <span className="pk-cart-item-price">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--pk-stone-muted)',
                    cursor: 'pointer',
                    fontSize: '0.8rem',
                    alignSelf: 'flex-start',
                  }}
                  onClick={() => onRemoveItem(idx)}
                  aria-label="Remove item from pack"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer / Summary */}
        {cart.length > 0 && (
          <div className="pk-cart-footer">
            <div className="pk-cart-totals">
              <div className="pk-cart-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="pk-cart-row">
                <span>Expedition Shipping</span>
                <span>{subtotal >= freeShippingThreshold ? 'FREE' : '₹199'}</span>
              </div>
              <div className="pk-cart-row total">
                <span>Total Expedition Value</span>
                <span>
                  ₹{(subtotal + (subtotal >= freeShippingThreshold ? 0 : 199)).toLocaleString(
                    'en-IN'
                  )}
                </span>
              </div>
            </div>

            <button type="button" className="pk-checkout-btn" onClick={onCheckout}>
              Proceed To Trail Checkout →
            </button>

            <p style={{ textAlign: 'center', fontSize: '0.7rem', color: 'var(--pk-stone-muted)' }}>
              🔒 256-bit Encrypted Checkout · 30-Night Trail Guarantee
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
