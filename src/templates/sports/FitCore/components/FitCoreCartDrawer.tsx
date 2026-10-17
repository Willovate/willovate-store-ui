import React, { useEffect } from 'react'
import type { FitCoreCartItem } from '../types'

export interface FitCoreCartDrawerProps {
  isOpen: boolean
  onClose: () => void
  cart: FitCoreCartItem[]
  onUpdateQuantity: (index: number, quantity: number) => void
  onRemoveItem: (index: number) => void
  onCheckout: () => void
}

export const FitCoreCartDrawer: React.FC<FitCoreCartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const subtotal = cart.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  )
  const freeShippingThreshold = 999
  const progressPercent = Math.min(
    100,
    Math.round((subtotal / freeShippingThreshold) * 100)
  )
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal)

  return (
    <div className="fitcore-drawer-backdrop" onClick={onClose}>
      <div className="fitcore-cart-drawer" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="fitcore-drawer-header">
          <h3>Your Bag ({cart.reduce((a, b) => a + b.quantity, 0)})</h3>
          <button
            type="button"
            className="fitcore-drawer-close"
            onClick={onClose}
            aria-label="Close Bag"
          >
            ✕
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="fitcore-shipping-bar">
          <div className="fitcore-shipping-bar-text">
            {remainingForFreeShipping > 0 ? (
              <>
                Add <strong>₹{remainingForFreeShipping.toLocaleString('en-IN')}</strong> for{' '}
                <strong>FREE EXPRESS SHIPPING</strong>
              </>
            ) : (
              <span style={{ color: '#10b981', fontWeight: 700 }}>
                ✓ UNLOCKED FREE EXPRESS SHIPPING!
              </span>
            )}
          </div>
          <div className="fitcore-shipping-progress">
            <div
              className="fitcore-shipping-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="fitcore-drawer-items">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94a3b8' }}>
              <p style={{ fontSize: '1.1rem', margin: '0 0 16px' }}>Your training bag is empty.</p>
              <button
                type="button"
                className="fitcore-btn-secondary"
                onClick={onClose}
              >
                START SHOPPING
              </button>
            </div>
          ) : (
            cart.map((item, index) => (
              <div key={`${item.product.id}-${item.selectedSize}-${index}`} className="fitcore-cart-item">
                <img
                  src={item.selectedColor.image || item.product.image}
                  alt={item.product.name}
                  className="fitcore-cart-item-img"
                />

                <div className="fitcore-cart-item-details">
                  <div className="fitcore-cart-item-title">{item.product.name}</div>
                  <div className="fitcore-cart-item-variant">
                    Size: {item.selectedSize} | {item.selectedColor.name}
                  </div>

                  <div className="fitcore-cart-item-bottom">
                    <div className="fitcore-qty-picker">
                      <button
                        type="button"
                        className="fitcore-qty-btn"
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="fitcore-qty-val">{item.quantity}</span>
                      <button
                        type="button"
                        className="fitcore-qty-btn"
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>

                    <div className="fitcore-cart-item-price">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="fitcore-cart-item-remove"
                    onClick={() => onRemoveItem(index)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer */}
        {cart.length > 0 && (
          <div className="fitcore-drawer-footer">
            <div className="fitcore-subtotal-row">
              <span className="fitcore-subtotal-label">Subtotal</span>
              <span className="fitcore-subtotal-val">
                ₹{subtotal.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              type="button"
              className="fitcore-btn-primary fitcore-checkout-btn"
              onClick={onCheckout}
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
