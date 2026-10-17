import React from 'react'
import type { GameDayCartItem } from '../types'

interface GameDayCartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cart: GameDayCartItem[]
  onUpdateQuantity: (index: number, quantity: number) => void
  onRemoveItem: (index: number) => void
  onCheckout: () => void
}

const FREE_SHIPPING_THRESHOLD = 1999

export const GameDayCartDrawer: React.FC<GameDayCartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  if (!isOpen) return null

  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0)
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const remaining = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0)

  return (
    <div className="gd-drawer-backdrop" onClick={onClose}>
      <div className="gd-cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="gd-cart-header">
          <h2 className="gd-cart-title">
            🛒 Your Kit Bag ({cart.reduce((a, i) => a + i.quantity, 0)})
          </h2>
          <button className="gd-cart-close" onClick={onClose} aria-label="Close cart">✕</button>
        </div>

        {/* Free Shipping Meter */}
        <div className="gd-shipping-meter">
          <p className="gd-shipping-meter-text">
            {remaining > 0
              ? <>Add <strong>₹{remaining.toLocaleString('en-IN')}</strong> more for FREE express matchday shipping</>
              : <><strong>🎉 Free express shipping unlocked!</strong></>
            }
          </p>
          <div className="gd-shipping-track">
            <div className="gd-shipping-fill" style={{ width: `${shippingProgress}%` }} />
          </div>
        </div>

        {/* Items */}
        <div className="gd-cart-items">
          {cart.length === 0 ? (
            <div className="gd-cart-empty">
              <div className="gd-cart-empty-icon">⚽</div>
              <h3 className="gd-cart-empty-title">Kit Bag Empty</h3>
              <p className="gd-cart-empty-sub">
                Your kit bag is waiting to be filled. Shop jerseys, scarves and fan gear.
              </p>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.product.id}-${idx}`} className="gd-cart-item">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="gd-cart-item-img"
                />
                <div className="gd-cart-item-info">
                  <p className="gd-cart-item-name">{item.product.name}</p>
                  <p className="gd-cart-item-meta">
                    {item.selectedSize} · {item.selectedColor.name}
                  </p>
                  {(item.customName || item.customNumber) && (
                    <p className="gd-cart-item-custom">
                      🔥 {item.customName && `#${item.customNumber} ${item.customName}`}
                    </p>
                  )}
                  <div className="gd-qty-row">
                    <div className="gd-qty-stepper">
                      <button className="gd-qty-btn" onClick={() => onUpdateQuantity(idx, item.quantity - 1)}>−</button>
                      <span className="gd-qty-val">{item.quantity}</span>
                      <button className="gd-qty-btn" onClick={() => onUpdateQuantity(idx, item.quantity + 1)}>+</button>
                    </div>
                    <span className="gd-cart-item-price">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
                <button
                  style={{ background: 'none', border: 'none', color: 'var(--gd-text-muted)', cursor: 'pointer', fontSize: '0.9rem', padding: '4px', alignSelf: 'flex-start', flexShrink: 0 }}
                  onClick={() => onRemoveItem(idx)}
                  aria-label="Remove item"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="gd-cart-footer">
            <div className="gd-cart-totals">
              <div className="gd-cart-totals-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="gd-cart-totals-row">
                <span>Shipping</span>
                <span style={{ color: subtotal >= FREE_SHIPPING_THRESHOLD ? '#10b981' : 'inherit' }}>
                  {subtotal >= FREE_SHIPPING_THRESHOLD ? 'FREE' : `₹${(99).toLocaleString('en-IN')}`}
                </span>
              </div>
              <div className="gd-cart-totals-row total">
                <span>Total</span>
                <span>₹{(subtotal + (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 99)).toLocaleString('en-IN')}</span>
              </div>
            </div>
            <button className="gd-checkout-btn" onClick={onCheckout}>
              CHECKOUT SECURELY →
            </button>
            <p style={{ fontSize: '0.7rem', color: 'var(--gd-text-muted)', textAlign: 'center' }}>
              🔒 Secure checkout · UPI · Cards · EMI available
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
